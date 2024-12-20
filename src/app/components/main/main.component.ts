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

interface MonthlyTaxReductionsForLowSalaries {
  monthlyTaxReductionsForLowSalaries: number;
  employmentBonus: number;
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
  from: number,
  to: number,
  taxRate?: number,
  flatAmount?: number,
  minAmount?: number,
  maxAmount?: number,
}

interface TaxesForTier {
  toTax: number,
  percentage: number,
  taxes: number,
}

interface Taxes {
  taxesByTier: TaxesForTier[],
  total: number,
}

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

  graphsStartingSalary = 2_000;
  graphsEndingSalary = 6_000;
  graphsStep = 50;

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
      from: 0.01,
      to: 19_166.67,
      flat_rate: 0,
      percentage: 30
    },
    {
      from: 19_166.67,
      to: Infinity,
      flat_rate: 5_750.00,
      percentage: 0
    }
  ];

  private readonly taxTiers = [
    {
      from: 0.01,
      to: 10_580.00,
      percentage: 0
    },
    {
      from: 10_580.00,
      to: 15_830.00,
      percentage: 26.75
    },
    {
      from: 15_830.00,
      to: 27_940.00,
      percentage: 42.80
    },
    {
      from: 27_940.00,
      to: 48_350.00,
      percentage: 48.15
    },
    {
      from: 48_350.00,
      to: Infinity,
      percentage: 53.50
    }
  ];
  // https://www.socialsecurity.be/employer/instructions/dmfa/fr/latest/instructions/special_contributions/other_specialcontributions/specialsocialsecuritycontribution.html
  private readonly specialSocialCotisationTiersIsolated: SocialSecurityTier[] = [
    {
      'from': 0.01,
      'to': 1_945.38,
      'taxRate': 0,
    },
    {
      'from': 1_945.38,
      'to': 2_190.18,
      'taxRate': 4.22,
    },
    {
      'from': 2_190.18,
      'to': 3_737.00,
      'taxRate': 1.1,
    },
    {
      'from': 3_737.00,
      'to': 4_100.00,
      'taxRate': 3.38,
    },
    {
      'from': 4_100.00,
      'to': 6_038.82,
      'taxRate': 1.10,
    },
    {
      'from': 6_038.82,
      'to': Infinity,
      'taxRate': 0,
    }
  ];
  private readonly specialSocialCotisationTiersMarriedTwoIncomes = [
    {
      'from': 0.01,
      'to': 3_285.29 / 3,
      'taxRate': 0,
    },
    {
      'from': 3_285.29 / 3,
      'to': 5_836.14 / 3,
      'flatAmount': 15.45 / 3,
    },
    {
      'from': 5_836.14 / 3,
      'to': 6_570.54 / 3,
      'taxRate': 5.9,
      'minAmount': 15.45 / 3,
    },
    {
      'from': 6_570.54 / 3,
      'to': Infinity,
      'taxRate': 1.1,
      'maxAmount': (154.92 - 43.32) / 3,
    },
  ];
  private readonly specialSocialCotisationTiersMarriedOneIncome = [
    {
      'from': 0.01,
      'to': 1_945.38,
      'taxRate': 0,
    },
    {
      'from': 1_945.38,
      'to': 2_190.18,
      'taxRate': 5.9,
    },
    {
      'from': 2_190.18,
      'to': Infinity,
      'taxRate': 1.1,
      'maxAmount': (182.82 - 43.32) / 3,
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

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  private calculateAnnualBaseTax(
    familySituation: String,
    annualTaxableIncome: number,
  ): Taxes {
    let annualBaseTax = 0;
    const taxesByTier: TaxesForTier[] = [];

    if (familySituation === 'isolated' || familySituation === 'married_or_cohabitant_2_incomes') {
      let remainingToTax = annualTaxableIncome;
      let currentTier = 0;

      while (remainingToTax > 0) {
        const currentTaxTier = this.taxTiers[currentTier];
        const tierRange = currentTaxTier.to - currentTaxTier.from + 0.01;

        let toTax = Math.min(remainingToTax, tierRange);
        remainingToTax -= toTax;

        const tierTaxes = toTax * currentTaxTier.percentage / 100;
        taxesByTier.push({
          toTax,
          percentage: currentTaxTier.percentage,
          taxes: tierTaxes,
        });

        annualBaseTax += tierTaxes;
        currentTier++;
      }

      return {
        taxesByTier,
        total: this.round(annualBaseTax),
      }
    } else {
      let revenueAttributedToPartner = Math.min(this.round(annualTaxableIncome * 30.0 / 100), 13_060.0);
      let partnerRevenueTaxes = this.calculateAnnualBaseTax('isolated', revenueAttributedToPartner);

      let remainingToTax = annualTaxableIncome - revenueAttributedToPartner;

      let ownRevenueTaxes = this.calculateAnnualBaseTax('isolated', remainingToTax);

      return {
        taxesByTier: ownRevenueTaxes.taxesByTier,
        total: partnerRevenueTaxes.total + ownRevenueTaxes.total,
      };
    }
  }

  private calculateSpecialSocialCotisation(
    status: String,
    familySituation: String,
    grossSalary: number,
  ): number {
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
      grossSalary *= 1.08;
    }

    let specialSocialCotisation = 0;
    let remainingToTax = grossSalary;
    let currentTier = 0;

    while (remainingToTax > 0) {
      const currentSpecialSocialCotisationTier = currentSpecialSocialCotisationTiers[currentTier];
      const tierRange = currentSpecialSocialCotisationTier.to - currentSpecialSocialCotisationTier.from + 0.01;

      let toTax = Math.min(remainingToTax, tierRange);
      remainingToTax -= toTax;

      let tierCotisation = 0;

      if (currentSpecialSocialCotisationTier.flatAmount && remainingToTax == 0) {
        tierCotisation = currentSpecialSocialCotisationTier.flatAmount;
        break;
      }

      if (currentSpecialSocialCotisationTier.taxRate) {
        tierCotisation += toTax * currentSpecialSocialCotisationTier.taxRate / 100;
      }

      if (currentSpecialSocialCotisationTier.minAmount && tierCotisation < currentSpecialSocialCotisationTier.minAmount) {
        tierCotisation = Math.max(tierCotisation, currentSpecialSocialCotisationTier.minAmount);
      }

      if (currentSpecialSocialCotisationTier.maxAmount && tierCotisation > currentSpecialSocialCotisationTier.maxAmount) {
        tierCotisation = Math.min(tierCotisation, currentSpecialSocialCotisationTier.maxAmount);
      }

      specialSocialCotisation += tierCotisation;
      currentTier++;
    }

    return this.round(specialSocialCotisation);
  }

  private calculateEmploymentBonusAndTaxReductions(
    values: any,
    socialCotisations: number,
  ): MonthlyTaxReductionsForLowSalaries {
    // https://www.socialsecurity.be/employer/instructions/dmfa/fr/latest/instructions/deductions/workers_reductions/workbonus.html
    let grossSalaryForEmploymentBonus = values.grossSalary;

    if (values.workRegime == 'part_time') {
      grossSalaryForEmploymentBonus = this.round(values.grossSalary / values.workedTimePerWeek) * values.fullTimeHoursPerWeek;
    }

    let employmentBonus = 0;
    let monthlyTaxReductionsForLowSalaries = 0;

    if (grossSalaryForEmploymentBonus <= 3_207.40) {
      let employmentBonusA;

      if (values.status === 'employee') {
        employmentBonusA = Math.min(
          this.round(118.22 - (0.2442 * Math.max(grossSalaryForEmploymentBonus - 2_723.36, 0))),
          socialCotisations,
        );
      } else {
        employmentBonusA = Math.min(
          this.round(127.68 - (0.2638 * Math.max(grossSalaryForEmploymentBonus - 2_723.36, 0))),
          socialCotisations,
        );
      }

      employmentBonus += employmentBonusA;
      monthlyTaxReductionsForLowSalaries += employmentBonusA * 33.14 / 100;
    }

    if (grossSalaryForEmploymentBonus <= 2_723.36) {
      let employmentBonusB;

      if (values.status === 'employee') {
        employmentBonusB = Math.min(
          this.round(159.43 - (0.2699 * Math.max(grossSalaryForEmploymentBonus - 2_132.59, 0))),
          socialCotisations - employmentBonus,
        );
      } else {
        employmentBonusB = Math.min(
          this.round(172.18 - (0.2915 * Math.max(grossSalaryForEmploymentBonus - 2_132.59, 0))),
          socialCotisations - employmentBonus,
        );
      }

      employmentBonus += employmentBonusB;
      monthlyTaxReductionsForLowSalaries += employmentBonusB * 52.54 / 100;
    }

    monthlyTaxReductionsForLowSalaries = this.round(monthlyTaxReductionsForLowSalaries);

    return {
      employmentBonus: this.round(employmentBonus),
      monthlyTaxReductionsForLowSalaries: this.round(monthlyTaxReductionsForLowSalaries),
    };
  }

  private calculateNetSalary(values: any): SalaryResult {
    let grossSalary = values.grossSalary;
    let socialCotisations: number;

    if (values.status === 'employee') {
      socialCotisations = this.round(grossSalary * (13.07 / 100));
    } else {
      socialCotisations = this.round(grossSalary * 1.08 * (13.07 / 100));
    }

    const employmentBonusAndTaxReductions = this.calculateEmploymentBonusAndTaxReductions(
      values,
      socialCotisations,
    );
    const employmentBonus = employmentBonusAndTaxReductions.employmentBonus;
    const monthlyTaxReductionsForLowSalaries = employmentBonusAndTaxReductions.monthlyTaxReductionsForLowSalaries;

    const taxableIncome = this.round(grossSalary - socialCotisations + employmentBonus);
    const roundedMonthlyGrossIncome = this.round(taxableIncome);
    const roundedAnnualGrossIncome = roundedMonthlyGrossIncome * 12;

    // Calculate flat rate professional expenses
    let flatRateProfessionalExpenses = 0;

    for (const tier of this.flatRateProfessionalExpenseTiers) {
      if (roundedAnnualGrossIncome <= tier.to) {
        flatRateProfessionalExpenses = this.round(tier.flat_rate + roundedAnnualGrossIncome * tier.percentage / 100);
        break;
      }
    }

    const annualTaxableIncome = taxableIncome * 12 - flatRateProfessionalExpenses;

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
    let annualTaxReductions = 0;

    if (values.dependentPeople) {
      const numDependentChildren = values.numDependentChildren + values.numDisabledDependentChildren * 2;

      switch (numDependentChildren) {
        case 0:
          break;
        case 1:
          annualTaxReductions += 588.00;
          break;
        case 2:
          annualTaxReductions += 1_572.00;
          break;
        case 3:
          annualTaxReductions += 4_164.00;
          break;
        case 4:
          annualTaxReductions += 7_212.00;
          break;
        case 5:
          annualTaxReductions += 10_512.00;
          break;
        case 6:
          annualTaxReductions += 13_812.00;
          break;
        case 7:
          annualTaxReductions += 17_148.00;
          break;
        case 8:
          annualTaxReductions += 20_808.00;
          break;
        default:
          annualTaxReductions += 20_808.00;
          annualTaxReductions += 3_660.00 * (8 - numDependentChildren);
      }

      annualTaxReductions += 1_884.00 * values.numDependent65Plussers;

      const numDependentOthers = values.numDependentOthers + 2 * values.numDisabledDependentOthers;
      annualTaxReductions += 588.00 * numDependentOthers;
    }

    if (values.disabled) {
      annualTaxReductions += 588.00;
    }

    const monthlyTaxes = this.round(annualBaseTax / 12);
    const monthlyTaxReductions = this.round(annualTaxReductions / 12);
    const monthlyTaxReductionsForGroupInsurance = values.groupInsurance ?
      this.round(values.groupInsurancePersonalCotisation * 30 / 100) : 0;

    const netSalary = taxableIncome - Math.max(
      monthlyTaxes -
      monthlyTaxReductions -
      monthlyTaxReductionsForGroupInsurance -
      monthlyTaxReductionsForLowSalaries,
      0
    ) - specialSocialCotisations - (values.groupInsurance ? values.groupInsurancePersonalCotisation : 0) + values.otherNetIncome;

    const monthlyTaxesByTier: TaxesForTier[] = annualTaxes.taxesByTier.map(taxesForTier => ({
      toTax: this.round(taxesForTier.toTax / 12),
      percentage: this.round(taxesForTier.percentage),
      taxes: this.round(taxesForTier.taxes / 12),
    }));

    return {
      grossSalary: values.grossSalary,
      socialCotisations,
      specialSocialCotisations,
      employmentBonus,
      taxableIncome,
      monthlyTaxes,
      monthlyTaxesByTier,
      otherMonthlyTaxReductions: monthlyTaxReductions,
      monthlyTaxReductionsForLowSalaries,
      monthlyTaxReductionsForGroupInsurance,
      netToGrossRatio: netSalary / values.grossSalary * 100,
      averageTaxRate: (values.grossSalary - netSalary) / values.grossSalary * 100,
      netSalary,
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
