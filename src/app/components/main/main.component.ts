import { LayoutModule, MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { forkJoin, take } from 'rxjs';
import { DisableScrollDirective } from '../../directives/disable-scroll.directive';
import { FormattingService } from '../../services/formatting.service';
import { FamilySituation, FuelType, SalaryCalculationInput, Status, taxationInfo2024, taxationInfo2025, TaxationPeriod, TaxationResult, TaxCalculatorService, VehicleInfo, WorkRegime, YearlySalaryCalculationInput } from '../../services/tax-calculator.service';
import { FormComponent } from "./form/form.component";
import { getDateFromMonthString } from './month-validator';
import { WithholdingTaxBreakdownComponent } from "./withholding-tax-breakdown/withholding-tax-breakdown.component";


interface RevenueYear {
  year: number;
  isFinal: boolean;
}

export enum Mode {
  SingleMonth = 'single_month',
  FullYear = 'full_year',
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
    MatTabsModule,
    TranslocoModule,
    DisableScrollDirective,
    FormComponent,
    WithholdingTaxBreakdownComponent,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  private translocoService = inject(TranslocoService);
  private formattingService = inject(FormattingService);
  private taxCalculatorService = inject(TaxCalculatorService);
  isFormPristine: boolean = true;
  formValue: any;
  lastInput: SalaryCalculationInput | YearlySalaryCalculationInput | null = null;
  result: TaxationResult | null = null;
  sankeyData: any[] = [];
  chartData: any[] = [];
  relativeChartData: any[] = [];
  averageTaxRateChartData: any[] = [];
  taxData: any[] = [];
  taxDataProportional: any[] = [];
  showWithHoldingTaxBreakdown = false;
  periodTabIndex = 0;

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
  private doubleHolidayPayString: String = '';
  private bonusString: String = '';
  private otherNetIncomeString: String = '';
  private netSalaryString: String = '';
  private netIncomeString: String = '';
  private relativeNetIncreaseString: String = '';
  private averageTaxRateString: String = '';
  private socialCotisationsString: String = '';
  private specialSocialCotisationString: String = '';
  private professionalWithholdingTaxString: String = '';

  formatAmount = this.formattingService.formatAmount;
  formatPct = this.formattingService.formatPct;
  formatPctRelative = this.formattingService.formatPctRelative;
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
  Mode = Mode;
  TaxationPeriod = TaxationPeriod;
  fuelTypes = Object.values(FuelType);

  showChartsWarning = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private mediaMatcher: MediaMatcher,
  ) {
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
    this.translocoService.langChanges$
      .subscribe(currentLang => {
        this.currentLocale = `${currentLang}-BE`;
        this.onLanguageChange();
      });
  }

  onLanguageChange() {
    forkJoin({
      grossSalary: this.translocoService.selectTranslate('gross_salary').pipe(take(1)),
      doubleHolidayPay: this.translocoService.selectTranslate('double_holiday_pay').pipe(take(1)),
      bonus: this.translocoService.selectTranslate('bonus').pipe(take(1)),
      otherNetIncome: this.translocoService.selectTranslate('other_net_income').pipe(take(1)),
      netSalary: this.translocoService.selectTranslate('net_salary').pipe(take(1)),
      netIncome: this.translocoService.selectTranslate('net_income').pipe(take(1)),
      relativeNetIncrease: this.translocoService.selectTranslate('relative_net_increase').pipe(take(1)),
      averageTaxRate: this.translocoService.selectTranslate('average_tax_rate').pipe(take(1)),
      socialCotisationsString: this.translocoService.selectTranslate('personal_social_contributions').pipe(take(1)),
      specialSocialCotisationString: this.translocoService.selectTranslate('special_social_cotisations').pipe(take(1)),
      professionalWithholdingTaxString: this.translocoService.selectTranslate('professional_withholding_tax').pipe(take(1)),
    }).subscribe(translations => {
      this.grossSalaryString = translations.grossSalary;
      this.doubleHolidayPayString = translations.doubleHolidayPay;
      this.bonusString = translations.bonus;
      this.otherNetIncomeString = translations.otherNetIncome;
      this.netSalaryString = translations.netSalary;
      this.netIncomeString = translations.netIncome;
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
    return this.translocoService.getAvailableLangs() as string[];
  }

  setLocale(locale: string) {
    this.translocoService.setActiveLang(locale);
  }

  private getCompanyCarInfo(): VehicleInfo | null {
    if (!this.formValue.companyCar ||
        !this.formValue.companyCarCatalogValue ||
        !this.formValue.companyCarFirstPlateRegistrationMonth ||
        !this.formValue.companyCarFuelType ||
        !this.formValue.companyCarGramsCo2PerKm
    ) {
      return null;
    }

    return {
      catalogValue: this.formValue.companyCarCatalogValue,
      firstPlateRegistrationMonth: getDateFromMonthString(this.formValue.companyCarFirstPlateRegistrationMonth),
      fuelType: this.formValue.companyCarFuelType,
      gramsCo2PerKm: this.formValue.companyCarGramsCo2PerKm,
      personalContribution: this.formValue.companyCarPersonalContribution,
    }
  }

  private calculateMonthlyNetSalary(
    monthlyGrossSalary: number,
  ): TaxationResult {
    const salaryCalculatorInput: SalaryCalculationInput = {
      period: TaxationPeriod.Monthly,
      revenueYear: this.formValue.revenueYear.year,
      status: this.formValue.status,
      workRegime: {
        type: this.formValue.workRegime,
        workedTimePerWeek: this.formValue.workedTimePerWeek,
        fullTimeHoursPerWeek: this.formValue.fullTimeHoursPerWeek,
      },
      familySituation: this.formValue.familySituation,
      dependentPeople: {
        numDependentChildren: this.formValue.numDependentChildren || 0,
        numDisabledDependentChildren: this.formValue.numDisabledDependentChildren || 0,
        numDependentRetirees: this.formValue.numDependentRetirees || 0,
        numDependentOthers: this.formValue.numDependentOthers || 0,
        numDisabledDependentOthers: this.formValue.numDisabledDependentOthers || 0,
      },
      mealVoucherAmounts: {
        value: this.formValue.mealVouchersValue || 0,
        personalContribution: this.formValue.mealVouchersPersonalContribution || 0,
      },
      disabled: this.formValue.disabled,
      hasDisabledPartner: this.formValue.hasDisabledPartner,
      groupInsurancePersonalContribution: this.formValue.groupInsurance ? this.formValue.groupInsurancePersonalContribution || 0 : 0,
      otherNetIncome: this.formValue.otherNetIncome || 0,
      numMealVouchers: this.formValue.mealVouchers ? this.formValue.numMealVouchers || 0 : 0,
      companyCarInfo: this.getCompanyCarInfo(),
      grossSalary: monthlyGrossSalary,
    };

    return this.taxCalculatorService.calculateTaxation(salaryCalculatorInput);
  }

  onFormPristineChanged(isPristine: boolean) {
    this.isFormPristine = isPristine;
  }

  onFormValueUpdate(formValue: any) {
    const yearChanged = formValue.revenueYear !== this.formValue?.revenueYear;
    this.formValue = formValue;

    if (this.chartData.length === 0 || yearChanged) {
      this.updateChartData();
    }
  }

  onNewInput(input: SalaryCalculationInput | YearlySalaryCalculationInput) {
    this.lastInput = input;
    this.result = this.taxCalculatorService.calculateTaxation(input);
    this.updateChartData();
  }

  private updateSankeyData() {
    this.sankeyData = [];

    if (this.result != null) {
      if (this.result.socialCotisationsAfterReductions) {
        this.sankeyData.push({ source: this.grossSalaryString, target: this.socialCotisationsString, value: this.result.socialCotisationsAfterReductions });
      }

      if (this.result.professionalWithholdingTaxesAfterReductions) {
        this.sankeyData.push({ source: this.grossSalaryString, target: this.professionalWithholdingTaxString, value: this.result.professionalWithholdingTaxesAfterReductions });
      }

      if (this.result.specialSocialCotisations) {
        this.sankeyData.push({ source: this.grossSalaryString, target: this.specialSocialCotisationString, value: this.result.specialSocialCotisations });
      }

      if (this.result.otherNetIncome) {
        this.sankeyData.push({ source: this.otherNetIncomeString, target: this.netIncomeString, value: this.result.otherNetIncome });
      }

      if (this.result.holidayPayTaxation.grossAllocation) {
        this.sankeyData.push({ source: this.doubleHolidayPayString, target: this.socialCotisationsString, value: this.result.holidayPayTaxation.socialCotisations });
        this.sankeyData.push({ source: this.doubleHolidayPayString, target: this.professionalWithholdingTaxString, value: this.result.holidayPayTaxation.professionalWithholdingTax });
        this.sankeyData.push({ source: this.doubleHolidayPayString, target: this.netIncomeString, value: this.result.holidayPayTaxation.netExceptionalAllocation });
      }

      if (this.result.bonusTaxation.grossAllocation) {
        this.sankeyData.push({ source: this.bonusString, target: this.socialCotisationsString, value: this.result.bonusTaxation.socialCotisations });
        this.sankeyData.push({ source: this.bonusString, target: this.professionalWithholdingTaxString, value: this.result.bonusTaxation.professionalWithholdingTax });
        this.sankeyData.push({ source: this.bonusString, target: this.netIncomeString, value: this.result.bonusTaxation.netExceptionalAllocation });
      }

      this.sankeyData.push({ source: this.grossSalaryString, target: this.netIncomeString, value: this.result.netSalary - this.result.otherNetIncome });
    }
  }

  updateChartData(grossSalary: number | null = null) {
    if (!this.lastInput && !this.formValue) {
      return;
    }

    this.updateSankeyData();
    this.showChartsWarning = !!(this.chartData && (this.lastInput?.period === TaxationPeriod.Annual || this.lastInput?.bonus || this.lastInput?.holidayPay))

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
        taxation: this.calculateMonthlyNetSalary(salary),
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
            nextNet = this.calculateMonthlyNetSalary(nextGross).netSalary;
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
          value: salary.taxation.professionalWithholdingTaxesAfterReductions,
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
          value: salary.taxation.professionalWithholdingTaxesAfterReductionsProportion,
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
}
