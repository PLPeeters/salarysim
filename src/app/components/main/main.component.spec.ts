import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent, Mode } from './main.component';
import { getTranslocoModule } from '../../transloco-testing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup } from '@angular/forms';
import { WorkRegime } from '../../services/tax-calculator.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent, getTranslocoModule(), BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to fetch available languages', () => {
    expect(component.getAvailableLangs()).toContain('en');
  });

  it('should format numbers differently when switching locales', () => {
    component.setLocale('fr');
    expect(component.formatAmount(2000)).toEqual('2 000,00 €');

    component.setLocale('nl');
    expect(component.formatAmount(2000)).toEqual('€ 2.000,00');

    component.setLocale('en');
    expect(component.formatAmount(2000)).toEqual('€2.000,00');
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

  it('should update charts when switching revenue years', () => {
    component.supportedRevenueYears.forEach(revenueYear => {
      component.chartData = [];
      component.onRevenueYearChanged(revenueYear);
      expect(component.chartData).toBeTruthy();
    });
  });

  it('should crash when trying to change to an unsupported revenue year', () => {
    expect(() => component.onRevenueYearChanged({year: 1999, isFinal: true})).toThrow();
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
    component.onWorkRegimeChanged(WorkRegime.FULL_TIME);

    expect(component.salaryForm.get('workedTimePerWeek')?.validator).toBeFalsy();
    expect(component.salaryForm.get('fullTimeHoursPerWeek')?.validator).toBeFalsy();
  });

  it('should set correct validation when switching to part time', () => {
    component.onWorkRegimeChanged(WorkRegime.PART_TIME);

    expect(component.salaryForm.get('workedTimePerWeek')?.validator).toBeTruthy();
    expect(component.salaryForm.get('fullTimeHoursPerWeek')?.validator).toBeTruthy();
  });

  it('should set correct validation when unchecking the dependents checkbox', () => {
    component.onHasChildrenChanged(false);

    expect(component.salaryForm.get('numDependentChildren')?.validator).toBeFalsy();
    expect(component.salaryForm.get('numDisabledDependentChildren')?.validator).toBeFalsy();
    expect(component.salaryForm.get('numDependentRetirees')?.validator).toBeFalsy();
    expect(component.salaryForm.get('numDependentOthers')?.validator).toBeFalsy();
    expect(component.salaryForm.get('numDisabledDependentOthers')?.validator).toBeFalsy();
  });

  it('should set correct validation when checking the dependents checkbox', () => {
    component.onHasChildrenChanged(true);

    expect(component.salaryForm.get('numDependentChildren')?.validator).toBeTruthy();
    expect(component.salaryForm.get('numDisabledDependentChildren')?.validator).toBeTruthy();
    expect(component.salaryForm.get('numDependentRetirees')?.validator).toBeTruthy();
    expect(component.salaryForm.get('numDependentOthers')?.validator).toBeTruthy();
    expect(component.salaryForm.get('numDisabledDependentOthers')?.validator).toBeTruthy();
  });

  it('should run the calculation with no errors with holiday pay', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('holidayPay')?.setValue(3000);

    component.onSubmit();
    expect(component.result).toBeTruthy();
  });

  it('should run the calculation with no errors with group insurance', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('groupInsurance')?.setValue(true);
    component.salaryForm.get('groupInsurancePersonalCotisation')?.setValue(50);

    component.onSubmit();
    expect(component.result).toBeTruthy();
  });

  it('should run the calculation with no errors with group insurance checked but unset', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('groupInsurance')?.setValue(true);

    component.onSubmit();
    expect(component.result).toBeTruthy();
  });

  it('should run the calculation with no errors with a bonus', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('bonus')?.setValue(3000);

    component.onSubmit();
    expect(component.result).toBeTruthy();
  });

  it('should run the calculation with no errors with other net income', () => {
    component.salaryForm.get('grossSalary')?.setValue(3000);
    component.salaryForm.get('otherNetIncome')?.setValue(1000);

    component.onSubmit();
    expect(component.result).toBeTruthy();
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

  it('should run the yearly calculation with no errors', () => {
    setupYearlyCalculation();
    expect(component.salaryForm.errors).toBeNull();
    expect(component.salaryForm.value.mode).toBe(Mode.FullYear);
    expect(component.salaryForm.valid).toBeTrue();

    component.onSubmit();
    expect(component.result).toBeTruthy();
  });

  it('should run the yearly calculation with no errors with group insurance', () => {
    component.salaryForm.get('groupInsurance')?.setValue(true);
    component.salaryForm.get('groupInsurancePersonalCotisation')?.setValue(50);

    setupYearlyCalculation();
    expect(component.salaryForm.value.mode).toBe(Mode.FullYear);
    expect(component.salaryForm.errors).toBeNull();
    expect(component.salaryForm.valid).toBeTrue();

    component.onSubmit();
    expect(component.result).toBeTruthy();
  });

  it('should run the yearly calculation with no errors with group insurance checked but unset', () => {
    component.salaryForm.get('groupInsurance')?.setValue(true);

    setupYearlyCalculation();

    component.onSubmit();
    expect(component.result).toBeTruthy();
  });

  it('should not update chart data when the salary range is impossible', () => {
    component.chartData = [];
    component.relativeChartData = [];
    component.averageTaxRateChartData = [];
    component.taxData = [];
    component.taxDataProportional = [];

    component.graphsStartingSalary = 3000;
    component.graphsEndingSalary = 2000;
    component.updateChartData();

    expect(component.chartData).toEqual([]);
    expect(component.relativeChartData).toEqual([]);
    expect(component.averageTaxRateChartData).toEqual([]);
    expect(component.taxData).toEqual([]);
    expect(component.taxDataProportional).toEqual([]);
  });

  it('should not update chart data when the salary range is out of bounds', () => {
    component.chartData = [];
    component.relativeChartData = [];
    component.averageTaxRateChartData = [];
    component.taxData = [];
    component.taxDataProportional = [];

    component.graphsStartingSalary = -1;
    component.graphsEndingSalary = 2000;
    component.updateChartData();

    expect(component.chartData).toEqual([]);
    expect(component.relativeChartData).toEqual([]);
    expect(component.averageTaxRateChartData).toEqual([]);
    expect(component.taxData).toEqual([]);
    expect(component.taxDataProportional).toEqual([]);
  });

  it('should not update chart data when the input is incomplete', () => {
    component.chartData = [];
    component.relativeChartData = [];
    component.averageTaxRateChartData = [];
    component.taxData = [];
    component.taxDataProportional = [];

    // @ts-ignore
    component.graphsStartingSalary = undefined;
    component.updateChartData();

    expect(component.chartData).toEqual([]);
    expect(component.relativeChartData).toEqual([]);
    expect(component.averageTaxRateChartData).toEqual([]);
    expect(component.taxData).toEqual([]);
    expect(component.taxDataProportional).toEqual([]);
  });

  it('should round the chart bounds up to the nearest thousand when providing an out-of-range salary', () => {
    component.chartData = [];
    component.relativeChartData = [];
    component.averageTaxRateChartData = [];
    component.taxData = [];
    component.taxDataProportional = [];

    component.graphsStartingSalary = 2000;
    component.graphsEndingSalary = 3000;
    component.updateChartData(3500);

    expect(component.graphsEndingSalary).toBe(4000);
    expect(component.chartData).not.toEqual([]);
    expect(component.relativeChartData).not.toEqual([]);
    expect(component.averageTaxRateChartData).not.toEqual([]);
    expect(component.taxData).not.toEqual([]);
    expect(component.taxDataProportional).not.toEqual([]);
  });

  it('should round the chart bounds down to the nearest thousand when providing an out-of-range salary', () => {
    component.chartData = [];
    component.relativeChartData = [];
    component.averageTaxRateChartData = [];
    component.taxData = [];
    component.taxDataProportional = [];

    component.graphsStartingSalary = 3000;
    component.graphsEndingSalary = 4000;
    component.updateChartData(2500);

    expect(component.graphsStartingSalary).toBe(2000);
    expect(component.chartData).not.toEqual([]);
    expect(component.relativeChartData).not.toEqual([]);
    expect(component.averageTaxRateChartData).not.toEqual([]);
    expect(component.taxData).not.toEqual([]);
    expect(component.taxDataProportional).not.toEqual([]);
  });
});
