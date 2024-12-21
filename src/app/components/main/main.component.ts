import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LangDefinition, TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { forkJoin, take } from 'rxjs';
import { Decimal } from 'decimal.js';

interface MonthlyTaxReductionsForLowSalaries {
  monthlyTaxReductionsForLowSalaries: Decimal;
  employmentBonus: Decimal;
}

interface SalaryResult {
  grossSalary: number;
  socialCotisations: number;
  specialSocialCotisations: number;
  employmentBonus: number;
  taxableIncome: number;
  monthlyTaxes: number;
  monthlyTaxesByTier: TaxesForTier[];
  otherMonthlyTaxReductions: number;
  monthlyTaxReductionsForLowSalaries: number;
  monthlyTaxReductionsForGroupInsurance: number;
  netToGrossRatio: number;
  averageTaxRate: number;
  netSalary: number;
  groupInsurancePersonalCotisation: number;
}

interface SocialSecurityTier {
  from: Decimal,
  to: Decimal,
  taxRate?: Decimal,
  flatAmount?: Decimal,
  minAmount?: Decimal,
  maxAmount?: Decimal,
}

interface TaxesForTier {
  toTax: Decimal,
  percentage: Decimal,
  taxes: Decimal,
}

interface Taxes {
  taxesByTier: TaxesForTier[],
  total: Decimal,
}

const D = (value: number | string | null): Decimal => new Decimal(value || 0);

@Component({
  selector: 'app-main',
  imports: [
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    FlexLayoutModule,
    MatChipsModule,
    TranslocoModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  translocoService = inject(TranslocoService);
  salaryForm: FormGroup;
  result: SalaryResult | null = null;
  chartData: any[] = [];
  relativeChartData: any[] = [];
  averageTaxRateChartData: any[] = [];
  showWithHoldingTaxBreakdown = false;

  graphsStartingSalary = 2_050;
  graphsEndingSalary = 6_000;
  graphsStep = 25;

  availableLangs = this.getAvailableLangs();

  loading: boolean = true;
  currentLocale: String = '';
  grossSalaryString: String = '';
  netSalaryString: String = '';
  relativeNetIncreaseString: String = '';
  averageTaxString: String = '';

  formatAmountTickFormattingFn = this.formatAmount.bind(this);
  formatPctTickFormattingFn = this.formatPct.bind(this);
  formatPctRelativeTickFormattingFn = this.formatPctRelative.bind(this);

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  private readonly flatRateProfessionalExpenseTiers = [
    {
      from: D(0.01),
      to: D(19_166.67),
      flat_rate: D(0),
      percentage: D(30),
    },
    {
      from: D(19_166.68),
      to: D(Infinity),
      flat_rate: D(5_750.00),
      percentage: D(0),
    }
  ];

  private readonly taxTiers = [
    {
      from: D(0.01),
      to: D(10_580.00),
      percentage: D(0),
    },
    {
      from: D(10_580.01),
      to: D(15_830.00),
      percentage: D(26.75),
    },
    {
      from: D(15_830.01),
      to: D(27_940.00),
      percentage: D(42.80),
    },
    {
      from: D(27_940.01),
      to: D(48_350.00),
      percentage: D(48.15),
    },
    {
      from: D(48_350.01),
      to: D(Infinity),
      percentage: D(53.50),
    }
  ];
  // https://www.socialsecurity.be/employer/instructions/dmfa/fr/latest/instructions/special_contributions/other_specialcontributions/specialsocialsecuritycontribution.html
  private readonly specialSocialCotisationTiersIsolated: SocialSecurityTier[] = [
    {
      'from': D(0.01),
      'to': D(1_945.38),
      'taxRate': D(0),
    },
    {
      'from': D(1_945.39),
      'to': D(2_190.18),
      'taxRate': D(4.22),
    },
    {
      'from': D(2_190.19),
      'to': D(3_737.00),
      'taxRate': D(1.1),
    },
    {
      'from': D(3_737.01),
      'to': D(4_100.00),
      'taxRate': D(3.38),
    },
    {
      'from': D(4_100.01),
      'to': D(6_038.82),
      'taxRate': D(1.10),
    },
    {
      'from': D(6_038.83),
      'to': D(Infinity),
      'taxRate': D(0),
    }
  ];
  private readonly specialSocialCotisationTiersMarriedTwoIncomes = [
    {
      'from': D(0.01),
      'to': D(3_285.29).div(3),
      'taxRate': D(0),
    },
    {
      'from': D(3_285.29).div(3).plus(0.01),
      'to': D(5_836.14).div(3),
      'flatAmount': D(15.45).div(3),
    },
    {
      'from': D(5_836.14).div(3).plus(0.01),
      'to': D(6_570.54).div(3),
      'taxRate': D(5.9),
      'minAmount': D(15.45).div(3),
    },
    {
      'from': D(6_570.54).div(3).plus(0.01),
      'to': D(Infinity),
      'taxRate': D(1.1),
      'maxAmount': D(154.92).minus(D(43.32)).div(D(3)),
    },
  ];
  private readonly specialSocialCotisationTiersMarriedOneIncome = [
    {
      'from': D(0.01),
      'to': D(1_945.38),
      'taxRate': D(0),
    },
    {
      'from': D(1_945.39),
      'to': D(2_190.18),
      'taxRate': D(5.9),
    },
    {
      'from': D(2_190.19),
      'to': D(Infinity),
      'taxRate': D(1.1),
      'maxAmount': D(182.82).minus(D(43.32)).div(D(3)),
    },
  ];

  constructor(private fb: FormBuilder) {
    this.salaryForm = this.fb.group({
      status: ['employee', Validators.required],
      workRegime: ['full', Validators.required],
      workedTimePerWeek: [null],
      fullTimeHoursPerWeek: [38],
      familySituation: ['isolated', Validators.required],
      disabled: [false],
      dependentPeople: [false],
      numDependentChildren: [null],
      numDisabledDependentChildren: [null],
      numDependent65Plussers: [null],
      numDependentOthers: [null],
      numDisabledDependentOthers: [null],
      groupInsurance: [false],
      groupInsurancePersonalCotisation: [null],
      grossSalary: [null, [Validators.required, Validators.min(0)]],
      otherNetIncome: [null],
      indexation: [null],
    });
  }

  ngOnInit() {
    // Watch for form changes to update validations
    this.salaryForm.get('dependentPeople')?.valueChanges.subscribe(hasChildren => {
      const numChildren = this.salaryForm.get('numDependentChildren');
      const numDisabledChildren = this.salaryForm.get('numDisabledDependentChildren');
      const num65Plussers = this.salaryForm.get('numDependent65Plussers');
      const numOthers = this.salaryForm.get('numDependentOthers');
      const numDisabledOthers = this.salaryForm.get('numDisabledDependentOthers');

      if (hasChildren) {
        numChildren?.setValidators([Validators.min(0)]);
        numDisabledChildren?.setValidators([Validators.min(0)]);
        num65Plussers?.setValidators([Validators.min(0)]);
        numOthers?.setValidators([Validators.min(0)]);
        numDisabledOthers?.setValidators([Validators.min(0)]);
      } else {
        numChildren?.clearValidators();
        numDisabledChildren?.clearValidators();
        num65Plussers?.clearValidators();
        numOthers?.clearValidators();
        numDisabledOthers?.clearValidators();
      }

      this.salaryForm.updateValueAndValidity();
    });

    this.salaryForm.get('workRegime')?.valueChanges.subscribe(workRegime => {
      const workedTimePerWeek = this.salaryForm.get('workedTimePerWeek');
      const fullTimeHoursPerWeek = this.salaryForm.get('fullTimeHoursPerWeek');

      if (workRegime == 'part_time') {
        workedTimePerWeek?.setValidators([Validators.min(1)]);
        fullTimeHoursPerWeek?.setValidators([Validators.min(1)]);
      } else {
        workedTimePerWeek?.clearValidators();
        fullTimeHoursPerWeek?.clearValidators();
      }

      this.salaryForm.updateValueAndValidity();
    });

    this.translocoService.langChanges$
      .subscribe(currentLang => {
        this.currentLocale = `${currentLang}-BE`;
        this.onLanguageChange();
      });

    const userLang = (navigator.language || navigator.languages[0]).split('-')[0];

    if (this.availableLangs.indexOf(userLang) !== -1) {
      this.translocoService.setActiveLang(userLang);
    } else {
      this.translocoService.setActiveLang(this.translocoService.getDefaultLang());
    }
  }

  onLanguageChange() {
    forkJoin({
      grossSalary: this.translocoService.selectTranslate('gross_salary').pipe(take(1)),
      netSalary: this.translocoService.selectTranslate('net_salary').pipe(take(1)),
      relativeNetIncrease: this.translocoService.selectTranslate('relative_net_increase').pipe(take(1)),
    }).subscribe(translations => {
      this.grossSalaryString = translations.grossSalary;
      this.netSalaryString = translations.netSalary;
      this.relativeNetIncreaseString = translations.relativeNetIncrease;

      this.updateChartData();
      this.loading = false;;
    });
  }

  getAvailableLangs(): string[] {
    const availableLangs = this.translocoService.getAvailableLangs();

    if ((availableLangs[0] as LangDefinition).id) {
      return availableLangs.map(lang => (lang as LangDefinition).id);
    }

    return (availableLangs as string[]);
  }

  setLocale(locale: string) {
    this.translocoService.setActiveLang(locale);
  }

  onSubmit() {
    if (this.salaryForm.valid) {
      const formValues = this.salaryForm.value;
      this.result = this.calculateNetSalary(formValues);
      this.updateChartData(formValues.grossSalary);

      this.salaryForm.markAsPristine();
    }
  }

  private round(value: Decimal): Decimal {
    return value.times(100).toDP(2).div(100);
  }

  private calculateAnnualBaseTax(
    familySituation: String,
    annualTaxableIncome: Decimal,
  ): Taxes {
    let annualBaseTax = D(0);
    const taxesByTier: TaxesForTier[] = [];

    if (familySituation === 'isolated' || familySituation === 'married_or_cohabitant_2_incomes') {
      let remainingToTax = annualTaxableIncome;
      let currentTier = 0;

      while (remainingToTax.gt(0)) {
        const currentTaxTier = this.taxTiers[currentTier];
        const tierRange = currentTaxTier.to.minus(currentTaxTier.from).plus(0.01);

        let toTax = Decimal.min(remainingToTax, tierRange);
        remainingToTax = remainingToTax.minus(toTax);

        const tierTaxes = toTax.times(currentTaxTier.percentage).div(100);

        taxesByTier.push({
          toTax,
          percentage: currentTaxTier.percentage,
          taxes: tierTaxes,
        });

        annualBaseTax = annualBaseTax.plus(tierTaxes);
        currentTier++;
      }

      return {
        taxesByTier,
        total: annualBaseTax.toDP(2),
      }
    } else {
      let revenueAttributedToPartner = annualTaxableIncome.times(30).div(100);

      if (revenueAttributedToPartner.gt(13_060)) {
        revenueAttributedToPartner = D(13_060.0);
      }

      let partnerRevenueTaxes = this.calculateAnnualBaseTax('isolated', revenueAttributedToPartner);

      let remainingToTax = annualTaxableIncome.minus(revenueAttributedToPartner);

      let ownRevenueTaxes = this.calculateAnnualBaseTax('isolated', remainingToTax);

      return {
        taxesByTier: ownRevenueTaxes.taxesByTier,
        total: partnerRevenueTaxes.total.plus(ownRevenueTaxes.total),
      };
    }
  }

  private calculateSpecialSocialCotisation(
    status: String,
    familySituation: String,
    grossSalary: Decimal,
  ): Decimal {
    let currentSpecialSocialCotisationTiers: SocialSecurityTier[]

    switch (familySituation) {
      case 'isolated':
        currentSpecialSocialCotisationTiers = this.specialSocialCotisationTiersIsolated;
        break;
      case 'married_or_cohabitant_2_incomes':
        currentSpecialSocialCotisationTiers = this.specialSocialCotisationTiersMarriedTwoIncomes;
        break;
      case 'married_or_cohabitant_1_income':
        currentSpecialSocialCotisationTiers = this.specialSocialCotisationTiersMarriedOneIncome;
        break;
      default:
        throw Error("What the hell")
    }

    if (status == 'worker') {
      grossSalary = grossSalary.times(1.08);
    }

    let specialSocialCotisation = D(0);
    let remainingToTax = grossSalary;
    let currentTier = 0;

    while (remainingToTax.gt(0)) {
      const currentSpecialSocialCotisationTier = currentSpecialSocialCotisationTiers[currentTier];
      const tierRange = currentSpecialSocialCotisationTier.to
        .minus(currentSpecialSocialCotisationTier.from)
        .plus(0.01);

      let toTax = Decimal.min(remainingToTax, tierRange);
      remainingToTax = remainingToTax.minus(toTax);

      let tierCotisation = D(0);

      if (currentSpecialSocialCotisationTier.flatAmount && remainingToTax.isZero()) {
        tierCotisation = currentSpecialSocialCotisationTier.flatAmount;
        break;
      }

      if (currentSpecialSocialCotisationTier.taxRate) {
        tierCotisation = tierCotisation.plus(
          toTax.times(currentSpecialSocialCotisationTier.taxRate.div(100))
        );
      }

      if (currentSpecialSocialCotisationTier.minAmount && tierCotisation.lt(currentSpecialSocialCotisationTier.minAmount)) {
        tierCotisation = currentSpecialSocialCotisationTier.minAmount;
      }

      if (currentSpecialSocialCotisationTier.maxAmount && tierCotisation.gt(currentSpecialSocialCotisationTier.maxAmount)) {
        tierCotisation = currentSpecialSocialCotisationTier.maxAmount;
      }

      specialSocialCotisation = specialSocialCotisation.plus(tierCotisation);
      currentTier++;
    }

    return specialSocialCotisation.toDP(2);
  }

  private calculateEmploymentBonusAndTaxReductions(
    values: any,
    socialCotisations: Decimal,
  ): MonthlyTaxReductionsForLowSalaries {
    // https://www.socialsecurity.be/employer/instructions/dmfa/fr/latest/instructions/deductions/workers_reductions/workbonus.html
    let grossSalary = D(values.grossSalary);
    let grossSalaryForEmploymentBonus = grossSalary;
    let workedTimePerWeek = D(values.workedTimePerWeek);
    let fullTimeHoursPerWeek = D(values.fullTimeHoursPerWeek);

    if (values.workRegime == 'part_time') {
      grossSalaryForEmploymentBonus = grossSalary.div(workedTimePerWeek).toDP(2).times(fullTimeHoursPerWeek);
    }

    let employmentBonus = D(0);
    let monthlyTaxReductionsForLowSalaries = D(0);

    if (grossSalaryForEmploymentBonus.lte(3_207.40)) {
      let employmentBonusA;

      if (values.status === 'employee') {
        employmentBonusA = Decimal.min(
          D(118.22).minus(D(0.2442).times(Decimal.max(grossSalaryForEmploymentBonus.minus(2_723.36), 0))),
          socialCotisations,
        );
      } else {
        employmentBonusA = Decimal.min(
          D(127.68).minus(D(0.2638).times(Decimal.max(grossSalaryForEmploymentBonus.minus(2_723.36), 0))),
          socialCotisations,
        );
      }

      employmentBonus = employmentBonus.plus(employmentBonusA);
      monthlyTaxReductionsForLowSalaries = monthlyTaxReductionsForLowSalaries.plus(
        monthlyTaxReductionsForLowSalaries.plus(
          employmentBonusA.times(33.14).div(100)
        )
      );
    }

    if (grossSalaryForEmploymentBonus.lte(2_723.36)) {
      let employmentBonusB;

      if (values.status === 'employee') {
        employmentBonusB = Decimal.min(
          D(159.43).minus(D(0.2699).times(Decimal.max(grossSalaryForEmploymentBonus.minus(2_132.59), 0))),
          socialCotisations.minus(employmentBonus),
        );
      } else {
        employmentBonusB = Decimal.min(
          D(172.18).minus(D(0.2915).times(Decimal.max(grossSalaryForEmploymentBonus.minus(2_132.59), 0))),
          socialCotisations.minus(employmentBonus),
        );
      }

      employmentBonus = employmentBonus.plus(employmentBonusB);
      monthlyTaxReductionsForLowSalaries = monthlyTaxReductionsForLowSalaries.plus(
        employmentBonusB.times(52.54).div(100)
      );
    }

    monthlyTaxReductionsForLowSalaries = monthlyTaxReductionsForLowSalaries.toDP(2);

    return {
      employmentBonus: employmentBonus.toDP(2),
      monthlyTaxReductionsForLowSalaries: monthlyTaxReductionsForLowSalaries.toDP(2),
    };
  }

  private calculateNetSalary(values: any): SalaryResult {
    let grossSalary = new Decimal(values.grossSalary);
    let socialCotisations: Decimal;

    if (values.status === 'employee') {
      socialCotisations = grossSalary.times(13.07).div(100).toDP(2);
    } else {
      socialCotisations = grossSalary.times(1.08).times(13.07).div(100).toDP(2);
    }

    const employmentBonusAndTaxReductions = this.calculateEmploymentBonusAndTaxReductions(
      values,
      socialCotisations,
    );
    const employmentBonus = employmentBonusAndTaxReductions.employmentBonus;
    const monthlyTaxReductionsForLowSalaries = employmentBonusAndTaxReductions.monthlyTaxReductionsForLowSalaries;

    const taxableIncome = grossSalary.minus(socialCotisations).plus(employmentBonus);
    const roundedMonthlyGrossIncome = taxableIncome.toDP(2);
    const roundedAnnualGrossIncome = roundedMonthlyGrossIncome.times(12);

    // Calculate flat rate professional expenses
    let flatRateProfessionalExpenses = D(0);

    for (const tier of this.flatRateProfessionalExpenseTiers) {
      if (roundedAnnualGrossIncome <= tier.to) {
        flatRateProfessionalExpenses = tier.flat_rate.plus(roundedAnnualGrossIncome.times(tier.percentage).div(100)).toDP(2);
        break;
      }
    }

    const annualTaxableIncome = taxableIncome.times(12).minus(flatRateProfessionalExpenses);

    // Calculate annual base tax
    const annualTaxes = this.calculateAnnualBaseTax(
      values.familySituation,
      annualTaxableIncome,
    );
    const annualBaseTax = annualTaxes.total;
    const specialSocialCotisations = this.calculateSpecialSocialCotisation(
      values.status,
      values.familySituation,
      grossSalary,
    );
    let annualTaxReductions = D(0);

    if (values.dependentPeople) {
      const numDependentChildren = values.numDependentChildren + values.numDisabledDependentChildren * 2;

      switch (numDependentChildren) {
        case 0:
          break;
        case 1:
          annualTaxReductions = annualTaxReductions.plus(588.00);
          break;
        case 2:
          annualTaxReductions = annualTaxReductions.plus(1_572.00);
          break;
        case 3:
          annualTaxReductions = annualTaxReductions.plus(4_164.00);
          break;
        case 4:
          annualTaxReductions = annualTaxReductions.plus(7_212.00);
          break;
        case 5:
          annualTaxReductions = annualTaxReductions.plus(10_512.00);
          break;
        case 6:
          annualTaxReductions = annualTaxReductions.plus(13_812.00);
          break;
        case 7:
          annualTaxReductions = annualTaxReductions.plus(17_148.00);
          break;
        case 8:
          annualTaxReductions = annualTaxReductions.plus(20_808.00);
          break;
        default:
          annualTaxReductions = annualTaxReductions.plus(20_808.00);
          annualTaxReductions = annualTaxReductions.plus(3_660.00).times(8 - numDependentChildren);
      }

      annualTaxReductions = annualTaxReductions.plus(1_884.00).times(values.numDependent65Plussers);

      const numDependentOthers = values.numDependentOthers + 2 * values.numDisabledDependentOthers;
      annualTaxReductions = annualTaxReductions.plus(D(588.00).times(numDependentOthers));
    }

    if (values.disabled) {
      annualTaxReductions = annualTaxReductions.plus(588.00);
    }

    const monthlyTaxes = annualBaseTax.div(12).toDP(2);
    const monthlyTaxReductions = annualTaxReductions.div(12).toDP(2);
    const monthlyTaxReductionsForGroupInsurance = values.groupInsurance ?
      D(values.groupInsurancePersonalCotisation).times(30).div(100).toDP(2) : D(0);

    const netSalary = taxableIncome.minus(
      Decimal.max(
        monthlyTaxes
          .minus(monthlyTaxReductions)
          .minus(monthlyTaxReductionsForGroupInsurance)
          .minus(monthlyTaxReductionsForLowSalaries),
        0,
      )
    ).minus(specialSocialCotisations)
      .minus(values.groupInsurancePersonalCotisation || 0)
      .plus(values.otherNetIncome || 0);

    const monthlyTaxesByTier: TaxesForTier[] = annualTaxes.taxesByTier.map(taxesForTier => ({
      toTax: taxesForTier.toTax.div(12).toDP(2),
      percentage: taxesForTier.percentage,
      taxes: taxesForTier.taxes.div(12).toDP(2),
    }));

    return {
      grossSalary: values.grossSalary,
      socialCotisations: socialCotisations.toNumber(),
      specialSocialCotisations: specialSocialCotisations.toNumber(),
      employmentBonus: employmentBonus.toNumber(),
      taxableIncome: taxableIncome.toNumber(),
      monthlyTaxes: monthlyTaxes.toNumber(),
      monthlyTaxesByTier,
      otherMonthlyTaxReductions: monthlyTaxReductions.toNumber(),
      monthlyTaxReductionsForLowSalaries: monthlyTaxReductionsForLowSalaries.toNumber(),
      monthlyTaxReductionsForGroupInsurance: monthlyTaxReductionsForGroupInsurance.toNumber(),
      netToGrossRatio: netSalary.div(values.grossSalary).times(100).toNumber(),
      averageTaxRate: grossSalary.minus(netSalary).div(grossSalary).times(100).toNumber(),
      netSalary: netSalary.toNumber(),
      groupInsurancePersonalCotisation: values.groupInsurancePersonalCotisation
    };
  }

  updateChartData(grossSalary: number | null = null) {
    if (grossSalary != null && grossSalary > this.graphsEndingSalary) {
      this.graphsEndingSalary = Math.ceil(grossSalary / 1000) * 1000;
    }

    if (typeof this.graphsStartingSalary === 'undefined' ||
        typeof this.graphsEndingSalary === 'undefined' ||
        typeof this.graphsStep === 'undefined') {
      return;
    }

    if (this.graphsStartingSalary < 0 || this.graphsEndingSalary <= 0 || this.graphsStep < 10) {
      return;
    }

    if (this.graphsStartingSalary >= this.graphsEndingSalary) {
      return;
    }

    const salaryPoints: number[] = [];
    for (let salary = this.graphsStartingSalary; salary <= this.graphsEndingSalary; salary += this.graphsStep) {
      salaryPoints.push(salary);
    }

    const salaries = salaryPoints.map(salary => {
      return {
        gross: salary,
        taxation: this.calculateNetSalary({
          ...this.salaryForm.value,
          grossSalary: salary
        })
      }
    });

    this.chartData = [
      {
        name: this.grossSalaryString,
        series: salaries.map(salary => ({
          name: salary.gross,
          value: salary.gross
        }))
      },
      {
        name: this.netSalaryString,
        series: salaries.map(salary => ({
          name: salary.gross,
          value: salary.taxation.netSalary
        }))
      }
    ];

    // Relative chart data (perceived increase)
    this.relativeChartData = [{
      name: this.relativeNetIncreaseString,
      series: salaries
        .map((salary, index) => {
          let nextGross;
          let nextNet;

          if (index < salaries.length - 1) {
            nextGross = salaries[index + 1].taxation.grossSalary;
            nextNet = salaries[index + 1].taxation.netSalary;
          } else {
            nextGross = salary.gross + this.graphsStep

            nextNet = this.calculateNetSalary({
              ...this.salaryForm.value,
              grossSalary: nextGross
            }).netSalary;
          }

          return {
            name: salary.gross,
            value: (nextNet - salary.taxation.netSalary) / (nextGross - salary.gross) * 100
          };
        })
    }];

    this.averageTaxRateChartData = [
      {
        name: this.translocoService.translate('average_tax_rate'),
        series: salaries.map(salary => ({
          name: salary.gross,
          value: salary.taxation.averageTaxRate
        }))
      },
    ];
  }

  formatAmount(value: any) {
    switch (this.currentLocale) {
      case 'fr-BE':
        return `${value.toLocaleString(this.currentLocale)} €`
      case 'nl-BE':
        return `€ ${value.toLocaleString(this.currentLocale)}`
      default:
        return `€${value.toLocaleString(this.currentLocale)}`
    }
  }

  formatPct(value: any) {
    return `${value.toFixed(1).toLocaleString(this.currentLocale)}%`
  }

  formatPctRelative(value: any) {
    if (value > 0) {
      return `+${value.toFixed(1).toLocaleString(this.currentLocale)}%`
    } else {
      return `${value.toFixed(1).toLocaleString(this.currentLocale)}%`
    }
  }
}
