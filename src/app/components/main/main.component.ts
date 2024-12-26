import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { LayoutModule, MediaMatcher } from '@angular/cdk/layout';
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
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { LangDefinition, TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { forkJoin, take } from 'rxjs';
import { FamilySituation, SalaryResult, Status, taxationInfo2024, taxationInfo2025, TaxCalculatorService, WorkRegime } from '../../services/tax-calculator.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


interface RevenueYear {
  year: number;
  isFinal: boolean;
}

@Component({
  selector: 'app-main',
  imports: [
    FormsModule,
    LayoutModule,
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
    MatTooltipModule,
    MatSelectModule,
    MatOptionModule,
    TranslocoModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  private translocoService = inject(TranslocoService);
  private taxCalculatorService = inject(TaxCalculatorService);
  salaryForm: FormGroup;
  result: SalaryResult | null = null;
  chartData: any[] = [];
  relativeChartData: any[] = [];
  averageTaxRateChartData: any[] = [];
  taxData: any[] = [];
  taxDataProportional: any[] = [];
  showWithHoldingTaxBreakdown = false;

  lowPensionJanuaryThreshold: number = -1;
  lowOtherRevenueJanuaryThreshold: number = -1;
  noRevenueJanuaryThreshold: number = -1;
  maxYearlyEmploymentBonus: number = -1;
  dependentRetireeAgeThreshold: number = -1;

  graphsStartingSalary = 2_100;
  graphsEndingSalary = 6_500;
  graphsStep = 25;

  availableLangs = this.getAvailableLangs();
  supportedRevenueYears: RevenueYear[] = [
    taxationInfo2024,
    taxationInfo2025,
  ].map(taxationInfo => {
    return {
      year: taxationInfo.year,
      isFinal: taxationInfo.isFinal,
    };
  });

  loading: boolean = true;
  currentLocale: String = '';
  private grossSalaryString: String = '';
  private netSalaryString: String = '';
  private relativeNetIncreaseString: String = '';
  private averageTaxRateString: String = '';
  private socialCotisationsString: String = '';
  private specialSocialCotisationString: String = '';
  private professionalWithholdingTaxString: String = '';

  formatAmountTickFormattingFn = this.formatAmount.bind(this);
  formatPctTickFormattingFn = this.formatPct.bind(this);
  formatPctRelativeTickFormattingFn = this.formatPctRelative.bind(this);

  private mediaQueries: MediaQueryList;
  private mediaQueryListener: (this: MediaQueryList, ev: MediaQueryListEvent) => void;
  isPortrait: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  LegendPosition = LegendPosition;

  max = Math.max;
  min = Math.min;
  window = window;

  WorkRegime = WorkRegime;
  Status = Status;
  FamilySituation = FamilySituation;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private mediaMatcher: MediaMatcher,
  ) {
    this.salaryForm = this.fb.group({
      revenueYear: [this.supportedRevenueYears[this.supportedRevenueYears.length - 1], Validators.required],
      status: [Status.EMPLOYEE, Validators.required],
      workRegime: [WorkRegime.FULL_TIME, Validators.required],
      workedTimePerWeek: [null],
      fullTimeHoursPerWeek: [38],
      familySituation: [FamilySituation.ISOLATED, Validators.required],
      disabled: [false],
      hasDisabledPartner: [false],
      dependentPeople: [false],
      numDependentChildren: [null],
      numDisabledDependentChildren: [null],
      numDependentRetirees: [null],
      numDependentOthers: [null],
      numDisabledDependentOthers: [null],
      groupInsurance: [false],
      groupInsurancePersonalCotisation: [null],
      grossSalary: [null, [Validators.required, Validators.min(0)]],
      otherNetIncome: [null],
      indexation: [null],
    });

    this.mediaQueries = this.mediaMatcher.matchMedia('(orientation: portrait)');
    this.mediaQueryListener = () => {
      this.cdr.detectChanges();
      this.onMediaQueriesUpdate();
    };

    this.mediaQueries.addEventListener('change', this.mediaQueryListener);
    this.onMediaQueriesUpdate();
  }

  onMediaQueriesUpdate() {
    this.isPortrait = this.mediaQueries.matches;

    if (this.isPortrait) {
      this.legendPosition = LegendPosition.Below;
    } else {
      this.legendPosition = LegendPosition.Right;
    }
  }

  ngOnInit() {
    // Watch for form changes to update validations
    this.salaryForm.get('dependentPeople')?.valueChanges.subscribe(this.onHasChildrenChanged.bind(this));
    this.salaryForm.get('revenueYear')?.valueChanges.subscribe(this.onRevenueYearChanged.bind(this));
    this.salaryForm.get('workRegime')?.valueChanges.subscribe(this.onWorkRegimeChanged.bind(this));

    this.onRevenueYearChanged(this.salaryForm.get('revenueYear')?.value);

    this.translocoService.langChanges$
      .subscribe(currentLang => {
        this.currentLocale = `${currentLang}-BE`;
        this.onLanguageChange();
      });
  }

  onLanguageChange() {
    forkJoin({
      grossSalary: this.translocoService.selectTranslate('gross_salary').pipe(take(1)),
      netSalary: this.translocoService.selectTranslate('net_salary').pipe(take(1)),
      relativeNetIncrease: this.translocoService.selectTranslate('relative_net_increase').pipe(take(1)),
      averageTaxRate: this.translocoService.selectTranslate('average_tax_rate').pipe(take(1)),
      socialCotisationsString: this.translocoService.selectTranslate('personal_social_contributions').pipe(take(1)),
      specialSocialCotisationString: this.translocoService.selectTranslate('special_social_cotisations').pipe(take(1)),
      professionalWithholdingTaxString: this.translocoService.selectTranslate('professional_withholding_tax').pipe(take(1)),
    }).subscribe(translations => {
      this.grossSalaryString = translations.grossSalary;
      this.netSalaryString = translations.netSalary;
      this.relativeNetIncreaseString = translations.relativeNetIncrease;
      this.averageTaxRateString = translations.averageTaxRate;
      this.socialCotisationsString = translations.socialCotisationsString;
      this.specialSocialCotisationString = translations.specialSocialCotisationString;
      this.professionalWithholdingTaxString = translations.professionalWithholdingTaxString;

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

  onRevenueYearChanged(revenueYear: RevenueYear) {
    let taxationInfo;

    switch (revenueYear.year) {
      case 2024:
        taxationInfo = taxationInfo2024;
        break;
      case 2025:
        taxationInfo = taxationInfo2025;
        break;
      default:
        throw Error(`Unexpected taxation year: ${revenueYear}.`);
    }

    this.lowPensionJanuaryThreshold = taxationInfo.lowPensionJanuaryThreshold;
    this.lowOtherRevenueJanuaryThreshold = taxationInfo.lowOtherRevenueJanuaryThreshold;
    this.noRevenueJanuaryThreshold = taxationInfo.noRevenueJanuaryThreshold;
    this.maxYearlyEmploymentBonus = taxationInfo.employmentBonusInfo.maxYearlyAmount.toNumber();
    this.dependentRetireeAgeThreshold = taxationInfo.dependentRetireeAgeThreshold;
  }

  onWorkRegimeChanged(workRegime: WorkRegime) {
    const workedTimePerWeek = this.salaryForm.get('workedTimePerWeek');
    const fullTimeHoursPerWeek = this.salaryForm.get('fullTimeHoursPerWeek');

    if (workRegime === WorkRegime.PART_TIME) {
      workedTimePerWeek?.setValidators([Validators.min(1)]);
      fullTimeHoursPerWeek?.setValidators([Validators.min(1)]);
    } else {
      workedTimePerWeek?.clearValidators();
      fullTimeHoursPerWeek?.clearValidators();
    }

    this.salaryForm.updateValueAndValidity();
  }

  onHasChildrenChanged(hasChildren: boolean) {
    const numChildren = this.salaryForm.get('numDependentChildren');
    const numDisabledChildren = this.salaryForm.get('numDisabledDependentChildren');
    const numRetirees = this.salaryForm.get('numDependentRetirees');
    const numOthers = this.salaryForm.get('numDependentOthers');
    const numDisabledOthers = this.salaryForm.get('numDisabledDependentOthers');

    if (hasChildren) {
      numChildren?.setValidators([Validators.min(0)]);
      numDisabledChildren?.setValidators([Validators.min(0)]);
      numRetirees?.setValidators([Validators.min(0)]);
      numOthers?.setValidators([Validators.min(0)]);
      numDisabledOthers?.setValidators([Validators.min(0)]);
    } else {
      numChildren?.clearValidators();
      numDisabledChildren?.clearValidators();
      numRetirees?.clearValidators();
      numOthers?.clearValidators();
      numDisabledOthers?.clearValidators();
    }

    this.salaryForm.updateValueAndValidity();
  }

  private calculateNetSalary(
    monthlyGrossSalary: number,
  ): SalaryResult {
    const salaryCalculatorInput = {
      revenueYear: this.salaryForm.value.revenueYear.year,
      status: this.salaryForm.value.status,
      workRegime: {
        type: this.salaryForm.value.workRegime,
        workedTimePerWeek: this.salaryForm.value.workedTimePerWeek,
        fullTimeHoursPerWeek: this.salaryForm.value.fullTimeHoursPerWeek
      },
      familySituation: this.salaryForm.value.familySituation,
      dependentPeople: {
        numDependentChildren: this.salaryForm.value.numDependentChildren || 0,
        numDisabledDependentChildren: this.salaryForm.value.numDisabledDependentChildren || 0,
        numDependentRetirees: this.salaryForm.value.numDependentRetirees || 0,
        numDependentOthers: this.salaryForm.value.numDependentOthers || 0,
        numDisabledDependentOthers: this.salaryForm.value.numDisabledDependentOthers || 0,
      },
      disabled: this.salaryForm.value.disabled,
      hasDisabledPartner: this.salaryForm.value.hasDisabledPartner,
      groupInsurancePersonalCotisation: this.salaryForm.value.groupInsurancePersonalCotisation || 0,
      otherNetIncome: this.salaryForm.value.otherNetIncome || 0,
      monthlyGrossSalary,
    };

    return this.taxCalculatorService.calculateNetSalary(salaryCalculatorInput);
  }

  onSubmit() {
    if (this.salaryForm.valid) {
      const monthlyGrossSalary = this.salaryForm.value.grossSalary;

      this.result = this.calculateNetSalary(monthlyGrossSalary);
      this.updateChartData(monthlyGrossSalary);

      this.salaryForm.markAsPristine();
    }
  }

  updateChartData(grossSalary: number | null = null) {
    if (grossSalary != null) {
      if (grossSalary > this.graphsEndingSalary) {
        this.graphsEndingSalary = Math.ceil(grossSalary / 1000) * 1000;
      } else if (grossSalary < this.graphsStartingSalary) {
        this.graphsStartingSalary = Math.floor(grossSalary / 1000) * 1000;
      }
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
        taxation: this.calculateNetSalary(salary),
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
            nextGross = salary.gross + this.graphsStep;
            nextNet = this.calculateNetSalary(nextGross).netSalary;
          }

          return {
            name: salary.gross,
            value: (nextNet - salary.taxation.netSalary) / (nextGross - salary.gross) * 100
          };
        })
    }];

    this.averageTaxRateChartData = [
      {
        name: this.averageTaxRateString,
        series: salaries.map(salary => ({
          name: salary.gross,
          value: salary.taxation.averageTaxRate
        }))
      },
    ];

    this.taxData = [
      {
        name: this.socialCotisationsString,
        series: salaries.map(salary => ({
          name: salary.gross,
          value: salary.taxation.socialCotisationsAfterReductions,
        }))
      },
      {
        name: this.professionalWithholdingTaxString,
        series: salaries.map(salary => ({
          name: salary.gross,
          value: salary.taxation.taxesAfterReductions,
        }))
      },
      {
        name: this.specialSocialCotisationString,
        series: salaries.map(salary => ({
          name: salary.gross,
          value: salary.taxation.specialSocialCotisations,
        }))
      },
    ];

    this.taxDataProportional = [
      {
        name: this.socialCotisationsString,
        series: salaries.map(salary => ({
          name: salary.gross,
          value: salary.taxation.socialCotisationsAfterReductionsProportion,
        }))
      },
      {
        name: this.professionalWithholdingTaxString,
        series: salaries.map(salary => ({
          name: salary.gross,
          value: salary.taxation.taxesAfterReductionsProportion,
        }))
      },
      {
        name: this.specialSocialCotisationString,
        series: salaries.map(salary => ({
          name: salary.gross,
          value: salary.taxation.specialSocialCotisationsProportion,
        }))
      },
    ];
  }

  formatAmount(value: any) {
    switch (this.currentLocale) {
      case 'fr-BE':
        return `${value.toLocaleString(this.currentLocale)} €`.replace(' ', ' ');
      case 'nl-BE':
        return `€ ${value.toLocaleString(this.currentLocale)}`
      default:
        return `€${value.toLocaleString(this.currentLocale)}`
    }
  }

  formatPct(value: any) {
    return `${value.toFixed(1).toLocaleString(this.currentLocale)}%`.replace(' ', ' ');
  }

  formatPctRelative(value: any) {
    if (value > 0) {
      return `+${value.toFixed(1).toLocaleString(this.currentLocale)}%`.replace(' ', ' ');
    } else {
      return `${value.toFixed(1).toLocaleString(this.currentLocale)}%`.replace(' ', ' ');
    }
  }
}
