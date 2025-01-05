import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormGroup, FormsModule, PristineChangeEvent, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { DisableScrollDirective } from '../../../directives/disable-scroll.directive';
import { FormattingService } from '../../../services/formatting.service';
import { FamilySituation, FuelType, SalaryCalculationInput, Status, taxationInfo2024, taxationInfo2025, TaxationPeriod, VehicleInfo, WorkRegime, YearlySalaryCalculationInput } from '../../../services/tax-calculator.service';
import { getDateFromMonthString, monthValidator } from '../month-validator';


interface RevenueYear {
  year: number;
  isFinal: boolean;
}

export enum Mode {
  SingleMonth = 'single_month',
  FullYear = 'full_year',
}

@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
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
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  @Output() onFormValueUpdate = new EventEmitter<any>();
  @Output() onNewInput = new EventEmitter<SalaryCalculationInput | YearlySalaryCalculationInput>();
  @Output() onPristineChange = new EventEmitter<boolean>();

  salaryForm: FormGroup;
  private translocoService = inject(TranslocoService);
  private formattingService = inject(FormattingService);
  periodTabIndex = 0;

  lowPensionJanuaryThreshold: number = -1;
  lowOtherRevenueJanuaryThreshold: number = -1;
  noRevenueJanuaryThreshold: number = -1;
  maxYearlyEmploymentBonus: number = -1;
  dependentRetireeAgeThreshold: number = -1;

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
  private readonly FORM_LOCAL_STORAGE_KEY = 'salary_form';
  hasSavedData = false;

  WorkRegime = WorkRegime;
  Status = Status;
  FamilySituation = FamilySituation;
  Mode = Mode;
  fuelTypes = Object.values(FuelType);

  formatAmount = this.formattingService.formatAmount;
  formatPct = this.formattingService.formatPct;
  formatPctRelative = this.formattingService.formatPctRelative;

  constructor(
    private fb: FormBuilder,
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
      groupInsurancePersonalContribution: [null],
      mealVouchers: [false],
      mealVouchersValue: [8],
      mealVouchersPersonalContribution: [1.09],
      companyCar: [false],
      companyCarCatalogValue: [null],
      companyCarFuelType: [FuelType.Diesel],
      companyCarGramsCo2PerKm: [null],
      companyCarFirstPlateRegistrationMonth: [null],
      companyCarPersonalContribution: [null, Validators.min(0)],
      mode: [Mode.SingleMonth, [Validators.required]],
      grossSalary: [null],
      numMealVouchers: [null, [Validators.min(0)]],
      holidayPay: [null, [Validators.min(0)]],
      bonus: [null, [Validators.min(0)]],
      otherNetIncome: [null, [Validators.min(0)]],
      incomeByMonth: this.fb.array(Array.from({ length: 12 }, () =>
        this.fb.group({
          grossSalary: [null],
          bonus: [null, [Validators.min(0)]],
          holidayPay: [null, [Validators.min(0)]],
          otherNetIncome: [null, [Validators.min(0)]],
          numMealVouchers: [null, [Validators.min(0)]],
        })
      )),
      keepData: [false],
    });

    this.salaryForm.valueChanges
      .subscribe(value => this.onFormValueUpdate.emit(value));

    this.salaryForm.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof PristineChangeEvent) {
        this.onPristineChange.emit(this.salaryForm.pristine);
      }
    });

    this.onFormValueUpdate.emit(this.salaryForm.value);

    this.onPeriodTabSelected();
  }

  ngOnInit() {
    // Watch for form changes to update validations
    this.salaryForm.get('dependentPeople')?.valueChanges.subscribe(this.onHasDependentPeopleChanged.bind(this));
    this.salaryForm.get('revenueYear')?.valueChanges.subscribe(this.onRevenueYearChanged.bind(this));
    this.salaryForm.get('workRegime')?.valueChanges.subscribe(this.onWorkRegimeChanged.bind(this));
    this.salaryForm.get('mode')?.valueChanges.subscribe(this.onModeChanged.bind(this));
    this.salaryForm.get('mealVouchers')?.valueChanges.subscribe(this.onHasMealVouchersChanged.bind(this));
    this.salaryForm.get('companyCar')?.valueChanges.subscribe(this.onHasCompanyCarChanged.bind(this));

    this.onRevenueYearChanged(this.salaryForm.get('revenueYear')?.value);
    this.onModeChanged(this.salaryForm.get('mode')?.value);

    this.translocoService.langChanges$
      .subscribe(currentLang => {
        this.currentLocale = `${currentLang}-BE`;
      });

    this.loadFormFromLocalStorage();

    if (this.salaryForm.valid) {
      this.onSubmit();
    }
  }

  get monthlySalaryRows(): FormArray {
    return this.salaryForm.get('incomeByMonth') as FormArray;
  }

  copyMonthlySalaryRowToRest(index: number) {
    const controls = this.monthlySalaryRows.controls.slice(index) as FormGroup[];
    const firstControl = controls.splice(0, 1)[0] as FormGroup;

    controls.forEach((followingFormGroup: FormGroup) => {
      const followingFormGroupControls = followingFormGroup.controls;

      for (let controlName in followingFormGroupControls) {
        const value = firstControl.controls[controlName].value;

        if (value) {
          followingFormGroupControls[controlName]
            .setValue(firstControl.controls[controlName].value);
        }
      }
    });
  }

  onPeriodTabSelected() {
    const mode = this.salaryForm.get('mode');

    if (this.periodTabIndex === 0) {
      mode?.setValue(Mode.SingleMonth);
    } else {
      mode?.setValue(Mode.FullYear);
    }

    mode?.markAsDirty();
  }

  onModeChanged(mode: Mode) {
    const grossSalary = this.salaryForm.get('grossSalary');
    const monthlySalaryRowControls = this.monthlySalaryRows.controls as FormGroup[];

    if (mode === Mode.SingleMonth) {
      grossSalary?.setValidators([Validators.required, Validators.min(0.01)]);
      grossSalary?.updateValueAndValidity();

      monthlySalaryRowControls.forEach(formGroup => {
        formGroup.controls['grossSalary'].clearValidators();
        formGroup.controls['grossSalary'].updateValueAndValidity();
      });

      this.periodTabIndex = 0;
    } else {
      grossSalary?.clearValidators();
      grossSalary?.updateValueAndValidity();

      monthlySalaryRowControls.forEach(formGroup => {
        formGroup.controls['grossSalary'].setValidators([Validators.required, Validators.min(0)]);
        formGroup.controls['grossSalary'].updateValueAndValidity();
      });

      this.periodTabIndex = 1;
    }
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
      workedTimePerWeek?.updateValueAndValidity();
      fullTimeHoursPerWeek?.setValidators([Validators.min(1)]);
      fullTimeHoursPerWeek?.updateValueAndValidity();
      ;
    } else {
      workedTimePerWeek?.clearValidators();
      workedTimePerWeek?.updateValueAndValidity();
      fullTimeHoursPerWeek?.clearValidators();
      fullTimeHoursPerWeek?.updateValueAndValidity();
    }

    this.salaryForm.updateValueAndValidity();
  }

  onHasDependentPeopleChanged(hasDependentPeople: boolean) {
    const numChildren = this.salaryForm.get('numDependentChildren');
    const numDisabledChildren = this.salaryForm.get('numDisabledDependentChildren');
    const numRetirees = this.salaryForm.get('numDependentRetirees');
    const numOthers = this.salaryForm.get('numDependentOthers');
    const numDisabledOthers = this.salaryForm.get('numDisabledDependentOthers');

    if (hasDependentPeople) {
      numChildren?.setValidators([Validators.min(0)]);
      numChildren?.updateValueAndValidity();
      numDisabledChildren?.setValidators([Validators.min(0)]);
      numDisabledChildren?.updateValueAndValidity();
      numRetirees?.setValidators([Validators.min(0)]);
      numRetirees?.updateValueAndValidity();
      numOthers?.setValidators([Validators.min(0)]);
      numOthers?.updateValueAndValidity();
      numDisabledOthers?.setValidators([Validators.min(0)]);
      numDisabledOthers?.updateValueAndValidity();
    } else {
      numChildren?.clearValidators();
      numChildren?.updateValueAndValidity();
      numDisabledChildren?.clearValidators();
      numDisabledChildren?.updateValueAndValidity();
      numRetirees?.clearValidators();
      numRetirees?.updateValueAndValidity();
      numOthers?.clearValidators();
      numOthers?.updateValueAndValidity();
      numDisabledOthers?.clearValidators();
      numDisabledOthers?.updateValueAndValidity();
    }
  }

  onHasMealVouchersChanged(hasMealVouchers: boolean) {
    const mealVouchersValue = this.salaryForm.get('mealVouchersValue');
    const mealVouchersPersonalContribution = this.salaryForm.get('mealVouchersPersonalContribution');

    if (hasMealVouchers) {
      mealVouchersValue?.setValidators([Validators.required, Validators.min(1.09)]);
      mealVouchersValue?.updateValueAndValidity();
      mealVouchersPersonalContribution?.setValidators([Validators.required, Validators.min(1.09)]);
      mealVouchersPersonalContribution?.updateValueAndValidity();
    } else {
      mealVouchersValue?.clearValidators();
      mealVouchersValue?.updateValueAndValidity();
      mealVouchersPersonalContribution?.clearValidators();
      mealVouchersPersonalContribution?.updateValueAndValidity();
    }
  }

  onHasCompanyCarChanged(hasCompanyCar: boolean) {
    const companyCarCatalogValue = this.salaryForm.get('companyCarCatalogValue');
    const companyCarFuelType = this.salaryForm.get('companyCarFuelType');
    const companyCarGramsCo2PerKm = this.salaryForm.get('companyCarGramsCo2PerKm');
    const companyCarFirstPlateRegistrationMonth = this.salaryForm.get('companyCarFirstPlateRegistrationMonth');

    if (hasCompanyCar) {
      companyCarCatalogValue?.setValidators([Validators.required, Validators.min(0.01)]);
      companyCarCatalogValue?.updateValueAndValidity();
      companyCarFuelType?.setValidators([Validators.required]);
      companyCarFuelType?.updateValueAndValidity();
      companyCarGramsCo2PerKm?.setValidators([Validators.min(0)]);
      companyCarGramsCo2PerKm?.updateValueAndValidity();
      companyCarFirstPlateRegistrationMonth?.setValidators([Validators.required, monthValidator()]);
      companyCarFirstPlateRegistrationMonth?.updateValueAndValidity();
    } else {
      companyCarCatalogValue?.clearValidators();
      companyCarCatalogValue?.updateValueAndValidity();
      companyCarFuelType?.clearValidators();
      companyCarFuelType?.updateValueAndValidity();
      companyCarGramsCo2PerKm?.clearValidators();
      companyCarGramsCo2PerKm?.updateValueAndValidity();
      companyCarFirstPlateRegistrationMonth?.clearValidators();
      companyCarFirstPlateRegistrationMonth?.updateValueAndValidity();
    }
  }

  private getCompanyCarInfo(): VehicleInfo | null {
    const formValue = this.salaryForm.value;

    if (!formValue.companyCar) {
      return null;
    }

    return {
      catalogValue: formValue.companyCarCatalogValue,
      firstPlateRegistrationMonth: getDateFromMonthString(formValue.companyCarFirstPlateRegistrationMonth),
      fuelType: formValue.companyCarFuelType,
      gramsCo2PerKm: formValue.companyCarGramsCo2PerKm,
      personalContribution: formValue.companyCarPersonalContribution,
    }
  }

  onSubmit() {
    if (this.salaryForm.valid) {
      let salaryCalculatorInput: YearlySalaryCalculationInput | SalaryCalculationInput;

      if (this.salaryForm.value.mode === Mode.SingleMonth) {
        salaryCalculatorInput = {
          period: TaxationPeriod.Monthly,
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
          mealVoucherAmounts: {
            value: this.salaryForm.value.mealVouchersValue || 0,
            personalContribution: this.salaryForm.value.mealVouchersPersonalContribution || 0,
          },
          companyCarInfo: this.getCompanyCarInfo(),
          disabled: this.salaryForm.value.disabled,
          hasDisabledPartner: this.salaryForm.value.hasDisabledPartner,
          groupInsurancePersonalContribution: this.salaryForm.value.groupInsurance ? this.salaryForm.value.groupInsurancePersonalContribution || 0 : 0,
          grossSalary: this.salaryForm.value.grossSalary,
          bonus: this.salaryForm.value.bonus,
          holidayPay: this.salaryForm.value.holidayPay,
          otherNetIncome: this.salaryForm.value.otherNetIncome,
          numMealVouchers: this.salaryForm.value.numMealVouchers,
        };
      } else {
        salaryCalculatorInput = {
          period: TaxationPeriod.Annual,
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
          mealVoucherAmounts: {
            value: this.salaryForm.value.mealVouchersValue || 0,
            personalContribution: this.salaryForm.value.mealVouchersPersonalContribution || 0,
          },
          companyCarInfo: this.getCompanyCarInfo(),
          disabled: this.salaryForm.value.disabled,
          hasDisabledPartner: this.salaryForm.value.hasDisabledPartner,
          groupInsurancePersonalContribution: this.salaryForm.value.groupInsurance ? this.salaryForm.value.groupInsurancePersonalContribution || 0 : 0,
          monthlyIncomes: this.salaryForm.value.incomeByMonth.map((incomeForMonth: any) => ({
            grossSalary: incomeForMonth.grossSalary,
            bonus: incomeForMonth.bonus,
            holidayPay: incomeForMonth.holidayPay,
            otherNetIncome: incomeForMonth.otherNetIncome,
            numMealVouchers: this.salaryForm.value.mealVouchers ? incomeForMonth.numMealVouchers || 0 : 0,
          })),
        };
      }
      this.onNewInput.emit(salaryCalculatorInput);
      this.salaryForm.markAsPristine();

      if (this.salaryForm.value.keepData) {
        this.persistFormToLocalStorage();
      }
    }
  }

  private persistFormToLocalStorage() {
    localStorage.setItem(this.FORM_LOCAL_STORAGE_KEY, JSON.stringify(this.salaryForm.value));
    this.hasSavedData = true;
  }

  loadFormFromLocalStorage() {
    try {
      const formDataString = localStorage.getItem(this.FORM_LOCAL_STORAGE_KEY)

      if (formDataString != null) {
        const formValue = JSON.parse(formDataString);
        formValue.revenueYear = this.supportedRevenueYears.find(o => o.year === formValue.revenueYear.year);

        this.salaryForm.setValue(formValue);
        this.hasSavedData = true;
      }
    } catch (e) {
      // Ignore
    }
  }

  clearFormFromLocalStorage() {
    localStorage.removeItem(this.FORM_LOCAL_STORAGE_KEY);
    this.hasSavedData = false;
  }
}
