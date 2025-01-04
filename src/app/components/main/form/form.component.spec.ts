import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent, Mode } from './form.component';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup } from '@angular/forms';
import { FuelType, SalaryCalculationInput, WorkRegime, YearlySalaryCalculationInput } from '../../../services/tax-calculator.service';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';


@Component({
  standalone: true,
  imports: [FormComponent],
  template: `<app-form (onNewInput)="onNewInput($event)" (onFormValueUpdate)="onFormValueUpdate($event)"> </app-form>`,
})
class TestHostComponent {
  input: SalaryCalculationInput | YearlySalaryCalculationInput | null = null;
  formValue: any = null;

  onNewInput(input: SalaryCalculationInput | YearlySalaryCalculationInput) {
    this.input = input;
  }

  onFormValueUpdate(formValue: any) {
    this.formValue = formValue;
  }
}

describe('FormComponent', () => {
  let hostComponent: TestHostComponent;
  let component: FormComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent, TestHostComponent, getTranslocoModule(), BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(FormComponent)).componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    hostComponent.input = null;
    hostComponent.formValue = null;
    component.salaryForm.get('mealVouchers')?.reset();
    component.salaryForm.get('mealVouchersValue')?.reset();
    component.salaryForm.get('mealVouchersPersonalContribution')?.reset();
    component.salaryForm.get('companyCar')?.reset();
    component.salaryForm.get('companyCarCatalogValue')?.reset();
    component.salaryForm.get('companyCarFuelType')?.reset();
    component.salaryForm.get('companyCarGramsCo2PerKm')?.reset();
    component.salaryForm.get('companyCarFirstPlateRegistrationMonth')?.reset();
    component.hasSavedData = false;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct validation when switching to monthly mode', () => {
    component.periodTabIndex = 0;
    component.onPeriodTabSelected();

    expect(component.salaryForm.get('mode')?.value).toBe(Mode.SingleMonth);
    expect(component.salaryForm.get('grossSalary')?.validator).toBeTruthy();

    component.monthlySalaryRows.controls.forEach(control => {
      expect(control.get('grossSalary')?.validator).toBeFalsy();
    });
  });

  it('should set correct validation when switching to yearly mode', () => {
    component.periodTabIndex = 1;
    component.onPeriodTabSelected();

    expect(component.salaryForm.get('mode')?.value).toBe(Mode.FullYear);
    expect(component.salaryForm.get('grossSalary')?.validator).toBeFalsy();

    component.monthlySalaryRows.controls.forEach(control => {
      expect(control.get('grossSalary')?.validator).toBeTruthy();
    });
  });

  it('should emit the form value when switching revenue years', () => {
    component.supportedRevenueYears.forEach(revenueYear => {
      component.salaryForm.get('revenueYear')?.setValue(revenueYear);
      expect(hostComponent.formValue).toBeTruthy();
    });
  });

  it('should crash when trying to change to an unsupported revenue year', () => {
    expect(() => component.onRevenueYearChanged({ year: 1999, isFinal: true })).toThrow();
  });

  it('should be able to copy monthly salary info to subsequent rows', () => {
    const controls = component.monthlySalaryRows.controls.slice(0) as FormGroup[];
    const firstControl = controls.splice(0, 1)[0] as FormGroup;

    firstControl.get('grossSalary')?.setValue(3000);
    firstControl.get('holidayPay')?.setValue(4000);
    firstControl.get('bonus')?.setValue(5000);
    firstControl.get('otherNetIncome')?.setValue(6000);

    component.copyMonthlySalaryRowToRest(0);

    controls.forEach((followingFormGroup: FormGroup) => {
      expect(followingFormGroup.get('grossSalary')?.value).toBe(3000);
      expect(followingFormGroup.get('holidayPay')?.value).toBe(4000);
      expect(followingFormGroup.get('bonus')?.value).toBe(5000);
      expect(followingFormGroup.get('otherNetIncome')?.value).toBe(6000);
    });
  });

  it('should set correct validation when switching to full time', () => {
    component.salaryForm.get('workRegime')?.setValue(WorkRegime.FULL_TIME);

    expect(component.salaryForm.get('workedTimePerWeek')?.validator).toBeFalsy();
    expect(component.salaryForm.get('fullTimeHoursPerWeek')?.validator).toBeFalsy();
  });

  it('should set correct validation when switching to part time', () => {
    component.salaryForm.get('workRegime')?.setValue(WorkRegime.PART_TIME);

    expect(component.salaryForm.get('workedTimePerWeek')?.validator).toBeTruthy();
    expect(component.salaryForm.get('fullTimeHoursPerWeek')?.validator).toBeTruthy();
  });

  it('should set correct validation when unchecking the dependents checkbox', () => {
    component.salaryForm.get('dependentPeople')?.setValue(false);

    expect(component.salaryForm.get('numDependentChildren')?.validator).toBeFalsy();
    expect(component.salaryForm.get('numDisabledDependentChildren')?.validator).toBeFalsy();
    expect(component.salaryForm.get('numDependentRetirees')?.validator).toBeFalsy();
    expect(component.salaryForm.get('numDependentOthers')?.validator).toBeFalsy();
    expect(component.salaryForm.get('numDisabledDependentOthers')?.validator).toBeFalsy();
  });

  it('should set correct validation when checking the dependents checkbox', () => {
    component.salaryForm.get('dependentPeople')?.setValue(true);

    expect(component.salaryForm.get('numDependentChildren')?.validator).toBeTruthy();
    expect(component.salaryForm.get('numDisabledDependentChildren')?.validator).toBeTruthy();
    expect(component.salaryForm.get('numDependentRetirees')?.validator).toBeTruthy();
    expect(component.salaryForm.get('numDependentOthers')?.validator).toBeTruthy();
    expect(component.salaryForm.get('numDisabledDependentOthers')?.validator).toBeTruthy();
  });

  it('should set correct validation when unchecking the meal vouchers checkbox', () => {
    component.salaryForm.get('mealVouchers')?.setValue(false);

    expect(component.salaryForm.get('mealVouchersValue')?.validator).toBeFalsy();
    expect(component.salaryForm.get('mealVouchersPersonalContribution')?.validator).toBeFalsy();
  });

  it('should set correct validation when checking the meal vouchers checkbox', () => {
    component.salaryForm.get('mealVouchers')?.setValue(true);

    expect(component.salaryForm.get('mealVouchersValue')?.validator).toBeTruthy();
    expect(component.salaryForm.get('mealVouchersPersonalContribution')?.validator).toBeTruthy();
  });

  it('should set correct validation when unchecking the company car checkbox', () => {
    component.salaryForm.get('companyCar')?.setValue(false);

    expect(component.salaryForm.get('companyCarCatalogValue')?.validator).toBeFalsy();
    expect(component.salaryForm.get('companyCarFuelType')?.validator).toBeFalsy();
    expect(component.salaryForm.get('companyCarGramsCo2PerKm')?.validator).toBeFalsy();
    expect(component.salaryForm.get('companyCarFirstPlateRegistrationMonth')?.validator).toBeFalsy();
  });

  it('should set correct validation when checking the company car checkbox', () => {
    component.salaryForm.get('companyCar')?.setValue(true);

    expect(component.salaryForm.get('companyCarCatalogValue')?.validator).toBeTruthy();
    expect(component.salaryForm.get('companyCarFuelType')?.validator).toBeTruthy();
    expect(component.salaryForm.get('companyCarGramsCo2PerKm')?.validator).toBeTruthy();
    expect(component.salaryForm.get('companyCarFirstPlateRegistrationMonth')?.validator).toBeTruthy();
  });

  it('should emit input to the host with no errors with holiday pay', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('holidayPay')?.setValue(3000);

    component.onSubmit();
    expect(hostComponent.input).toBeTruthy();
  });

  it('should emit input to the host with no errors with group insurance', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('groupInsurance')?.setValue(true);
    component.salaryForm.get('groupInsurancePersonalCotisation')?.setValue(50);

    component.onSubmit();
    expect(hostComponent.input).toBeTruthy();
  });

  it('should emit input to the host with no errors with group insurance checked but unset', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('groupInsurance')?.setValue(true);

    component.onSubmit();
    expect(hostComponent.input).toBeTruthy();
  });

  it('should emit input to the host with no errors with meal vouchers', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('mealVouchers')?.setValue(true);
    component.salaryForm.get('mealVouchersValue')?.setValue(8);
    component.salaryForm.get('mealVouchersPersonalContribution')?.setValue(1.09);

    component.onSubmit();
    expect(hostComponent.input).toBeTruthy();
  });

  it('should not emit input to the host with no errors with meal vouchers checked but unset', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('mealVouchers')?.setValue(true);

    component.onSubmit();
    expect(hostComponent.input).toBeNull();
  });

  it('should emit input to the host with no errors with a company car', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('companyCar')?.setValue(true);
    component.salaryForm.get('companyCarCatalogValue')?.setValue(25000);
    component.salaryForm.get('companyCarFuelType')?.setValue(FuelType.Diesel);
    component.salaryForm.get('companyCarGramsCo2PerKm')?.setValue(149);
    component.salaryForm.get('companyCarFirstPlateRegistrationMonth')?.setValue('01/2022');

    component.onSubmit();
    expect(hostComponent.input).toBeTruthy();
  });

  it('should not emit input to the host with no errors with a company car checked but unset', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('companyCar')?.setValue(true);

    component.onSubmit();
    expect(hostComponent.input).toBeNull();
  });

  it('should emit input to the host with no errors with a bonus', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('bonus')?.setValue(3000);

    component.onSubmit();
    expect(hostComponent.input).toBeTruthy();
  });

  it('should emit input to the host with no errors with other net income', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('otherNetIncome')?.setValue(1000);

    component.onSubmit();
    expect(hostComponent.input).toBeTruthy();
  });

  function setupYearlyCalculation() {
    component.periodTabIndex = 1;
    component.onPeriodTabSelected();

    component.monthlySalaryRows.controls.forEach(control => {
      control.get('grossSalary')?.setValue(3000);
    });

    component.monthlySalaryRows.controls[5].get('holidayPay')?.setValue(3000);
    component.monthlySalaryRows.controls[component.monthlySalaryRows.controls.length - 1].get('bonus')?.setValue(3000);
  }

  it('should emit yearly input to the host with no errors', () => {
    setupYearlyCalculation();
    expect(component.salaryForm.errors).toBeNull();
    expect(component.salaryForm.value.mode).toBe(Mode.FullYear);
    expect(component.salaryForm.valid).toBeTrue();

    component.onSubmit();
    expect(hostComponent.input).toBeTruthy();
  });

  it('should emit yearly input to the host with no errors with group insurance', () => {
    component.salaryForm.get('groupInsurance')?.setValue(true);
    component.salaryForm.get('groupInsurancePersonalCotisation')?.setValue(50);

    setupYearlyCalculation();
    expect(component.salaryForm.value.mode).toBe(Mode.FullYear);
    expect(component.salaryForm.errors).toBeNull();
    expect(component.salaryForm.valid).toBeTrue();

    component.onSubmit();
    expect(hostComponent.input).toBeTruthy();
  });

  it('should emit yearly input to the host with no errors with group insurance checked but unset', () => {
    component.salaryForm.get('groupInsurance')?.setValue(true);

    setupYearlyCalculation();

    component.onSubmit();
    expect(hostComponent.input).toBeTruthy();
  });

  it('should emit yearly input to the host with no errors with meal vouchers', () => {
    component.salaryForm.get('mealVouchers')?.setValue(true);
    component.salaryForm.get('mealVouchersValue')?.setValue(8);
    component.salaryForm.get('mealVouchersPersonalContribution')?.setValue(1.09);

    setupYearlyCalculation();

    component.onSubmit();
    expect(hostComponent.input).toBeTruthy();
  });

  it('should not emit yearly input to the host with no errors with meal vouchers checked but unset', () => {
    component.salaryForm.get('mealVouchers')?.setValue(true);

    setupYearlyCalculation();

    component.onSubmit();
    expect(hostComponent.input).toBeNull();
  });

  it('should emit yearly input to the host with no errors with a company car', () => {
    component.salaryForm.get('companyCar')?.setValue(true);
    component.salaryForm.get('companyCarCatalogValue')?.setValue(25000);
    component.salaryForm.get('companyCarFuelType')?.setValue(FuelType.Diesel);
    component.salaryForm.get('companyCarGramsCo2PerKm')?.setValue(149);
    component.salaryForm.get('companyCarFirstPlateRegistrationMonth')?.setValue('01/2022');

    setupYearlyCalculation();

    component.onSubmit();
    expect(hostComponent.input).toBeTruthy();
  });

  it('should not emit yearly input to the host with no errors with a company car checked but unset', () => {
    component.salaryForm.get('companyCar')?.setValue(true);

    setupYearlyCalculation();

    component.onSubmit();
    expect(hostComponent.input).toBeNull();
  });

  it('should save data when requested', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('keepData')?.setValue(true);

    component.onSubmit();
    expect(component.hasSavedData).toBeTrue();
  });

  it('should not save data when not requested', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('keepData')?.setValue(false);

    component.onSubmit();
    expect(component.hasSavedData).toBeFalse();
  });

  it('should clear data when requested', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('keepData')?.setValue(true);

    component.onSubmit();
    expect(component.hasSavedData).toBeTrue();
    component.clearFormFromLocalStorage();
    expect(component.hasSavedData).toBeFalse();
  });
});
