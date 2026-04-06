import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { getTranslocoModule } from '../../transloco-testing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { simpleEmployee } from '../../services/data/2024-inputs-to-net';
import { FuelType, SalaryCalculationInput } from '../../services/tax-calculator.service';

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

  it('should change form pristine status', () => {
    component.onFormPristineChanged(false);

    expect(component.isFormPristine).toBeFalse();
  });

  it('should be able to set the locale', () => {
    component.setLocale('fr');

    expect(component.currentLocale).toBe('fr-BE');
  });

  it('should be able to fetch available languages', () => {
    expect(component.getAvailableLangs()).toContain('en');
  });

  it('should update charts when switching revenue years', () => {
    component.chartData = [];

    const newFormValue = {
      ...component.formValue,
      revenueYear: { year: 2024, isFinal: true },
    }

    component.onFormValueUpdate(newFormValue);
    expect(component.chartData).toBeTruthy();
  });

  it('should reset the graph minimum to the selected revenue year minimum salary', () => {
    component.chartData = [];
    component.graphsStartingSalary = 9999;

    component.onFormValueUpdate({
      ...component.formValue,
      revenueYear: { year: 2024, isFinal: true },
    });

    expect(component.graphsStartingSalary).toBe(2070.48);
  });

  it('should start at the minimum salary and then continue on step multiples for the selected year', () => {
    component.onFormValueUpdate({
      ...component.formValue,
      revenueYear: { year: 2026, isFinal: true },
    });
    component.graphsEndingSalary = 2200;
    component.graphsStep = 25;

    component.updateChartData();

    expect(component.chartData[0].series.map((point: { name: number }) => point.name)).toEqual([2154.11, 2175, 2200]);
  });

  it('should clamp the graph minimum to the selected revenue year minimum salary', () => {
    component.onFormValueUpdate({
      ...component.formValue,
      revenueYear: { year: 2025, isFinal: true },
    });

    component.graphsStartingSalary = 2000;
    component.graphsEndingSalary = 2200;
    component.updateChartData();

    expect(component.graphsStartingSalary).toBe(2111.89);
  });

  it('should snap the graph start back to the yearly minimum on blur when below it', () => {
    component.onFormValueUpdate({
      ...component.formValue,
      revenueYear: { year: 2026, isFinal: true },
    });
    component.graphsStartingSalary = 2000;

    const dispatchEvent = jasmine.createSpy('dispatchEvent');
    const input = { valueAsNumber: 2000, value: '2000', dispatchEvent } as unknown as HTMLInputElement;

    component.onGraphStartBlur(input);

    expect(component.graphsStartingSalary).toBe(2154.11);
    expect(input.value).toBe('2154.11');
    expect(dispatchEvent).toHaveBeenCalled();
  });

  it('should increment the custom graph start step from the yearly minimum to the first step-aligned salary', () => {
    component.onFormValueUpdate({
      ...component.formValue,
      revenueYear: { year: 2026, isFinal: true },
    });

    component.stepGraphStart(1);

    expect(component.graphsStartingSalary).toBe(2175);
  });

  it('should continue incrementing the custom graph start step after the first step-aligned salary', () => {
    component.onFormValueUpdate({
      ...component.formValue,
      revenueYear: { year: 2026, isFinal: true },
    });
    component.graphsStartingSalary = 2175;

    component.stepGraphStart(1);

    expect(component.graphsStartingSalary).toBe(2200);
  });

  it('should decrement the custom graph start step from the first step-aligned salary to the yearly minimum', () => {
    component.onFormValueUpdate({
      ...component.formValue,
      revenueYear: { year: 2026, isFinal: true },
    });
    component.graphsStartingSalary = 2175;

    component.stepGraphStart(-1);

    expect(component.graphsStartingSalary).toBe(2154.11);
  });

  it('should continue decrementing the custom graph start step across aligned values', () => {
    component.onFormValueUpdate({
      ...component.formValue,
      revenueYear: { year: 2026, isFinal: true },
    });
    component.graphsStartingSalary = 2800;

    component.stepGraphStart(-1);

    expect(component.graphsStartingSalary).toBe(2775);
  });

  it('should decrement the custom graph start step from the second aligned value to the first aligned value', () => {
    component.onFormValueUpdate({
      ...component.formValue,
      revenueYear: { year: 2026, isFinal: true },
    });
    component.graphsStartingSalary = 2200;

    component.stepGraphStart(-1);

    expect(component.graphsStartingSalary).toBe(2175);
  });

  it('should decrement the custom graph start step from the third aligned value to the second aligned value', () => {
    component.onFormValueUpdate({
      ...component.formValue,
      revenueYear: { year: 2026, isFinal: true },
    });
    component.graphsStartingSalary = 2225;

    component.stepGraphStart(-1);

    expect(component.graphsStartingSalary).toBe(2200);
  });

  it('should increment the graph end step by the configured graph step', () => {
    component.graphsStartingSalary = 2154.11;
    component.graphsEndingSalary = 6479.11;
    component.graphsStep = 20;

    component.stepGraphEnd(1);

    expect(component.graphsEndingSalary).toBe(6499.11);
  });

  it('should clamp the graph end step decrement to the graph start minimum', () => {
    component.graphsStartingSalary = 2154.11;
    component.graphsEndingSalary = 2160;
    component.graphsStep = 20;

    component.stepGraphEnd(-1);

    expect(component.graphsEndingSalary).toBe(2154.11);
  });

  it('should snap the graph end to start plus step on blur when below it', () => {
    component.graphsStartingSalary = 2154.11;
    component.graphsEndingSalary = 2160;
    component.graphsStep = 20;

    const dispatchEvent = jasmine.createSpy('dispatchEvent');
    const input = { valueAsNumber: 2160, value: '2160', dispatchEvent } as unknown as HTMLInputElement;

    component.onGraphEndBlur(input);

    expect(component.graphsEndingSalary).toBe(2174.11);
    expect(input.value).toBe('2174.11');
    expect(dispatchEvent).toHaveBeenCalled();
  });

  it('should increment the graph step field by ten', () => {
    component.graphsStep = 20;

    component.stepGraphStep(1);

    expect(component.graphsStep).toBe(30);
  });

  it('should clamp the graph step decrement to ten', () => {
    component.graphsStep = 10;

    component.stepGraphStep(-1);

    expect(component.graphsStep).toBe(10);
  });

  it('should update charts when receiving new input', () => {
    component.chartData = [];

    const input: SalaryCalculationInput = {
      ...simpleEmployee,
      grossSalary: 3000,
      otherNetIncome: 100,
      holidayPay: 3000,
      bonus: 1000,
    };

    component.onNewInput(input);
    expect(component.chartData).not.toEqual([]);
    expect(component.sankeyData).not.toEqual([]);
  });

  it('should update charts when receiving new input with meal vouchers', () => {
    component.chartData = [];

    const formValue = {
      ...component.formValue,
      mealVouchers: true,
    };
    const input: SalaryCalculationInput = {
      ...simpleEmployee,
      grossSalary: 3000,
    };

    component.onFormValueUpdate(formValue);
    component.onNewInput(input);
    expect(component.chartData).not.toEqual([]);
    expect(component.sankeyData).not.toEqual([]);
  });

  it('should update charts when receiving new input with meal vouchers checked but not defined', () => {
    component.chartData = [];

    const formValue = {
      ...component.formValue,
      mealVouchers: true,
      mealVouchersValue: null,
      mealVouchersPersonalContribution: null,
    };
    const input: SalaryCalculationInput = {
      ...simpleEmployee,
      grossSalary: 3000,
    };

    component.onFormValueUpdate(formValue);
    component.onNewInput(input);
    expect(component.chartData).not.toEqual([]);
    expect(component.sankeyData).not.toEqual([]);
  });

  it('should update charts when receiving new input with a company car', () => {
    component.chartData = [];

    const formValue = {
      ...component.formValue,
      companyCar: true,
      companyCarCatalogValue: 25000,
      companyCarFirstPlateRegistrationMonth: '01/2023',
      companyCarFuelType: FuelType.Diesel,
      companyCarGramsCo2PerKm: 149,
    };
    const input: SalaryCalculationInput = {
      ...simpleEmployee,
      grossSalary: 3000,
    };

    component.onFormValueUpdate(formValue);
    component.onNewInput(input);
    expect(component.chartData).not.toEqual([]);
    expect(component.sankeyData).not.toEqual([]);
  });

  it('should update charts when receiving new input with a company car checked but not defined', () => {
    component.chartData = [];

    const formValue = {
      ...component.formValue,
      companyCar: true,
      companyCarCatalogValue: null,
      companyCarFirstPlateRegistrationMonth: null,
      companyCarFuelType: null,
      companyCarGramsCo2PerKm: null,
    };
    const input: SalaryCalculationInput = {
      ...simpleEmployee,
      grossSalary: 3000,
    };

    component.onFormValueUpdate(formValue);
    component.onNewInput(input);
    expect(component.chartData).not.toEqual([]);
    expect(component.sankeyData).not.toEqual([]);
  });

  it('should update charts when receiving new input with group insurance checked', () => {
    component.chartData = [];

    const formValue = {
      ...component.formValue,
      groupInsurance: true,
      groupInsurancePersonalContribution: 50,
    };
    const input: SalaryCalculationInput = {
      ...simpleEmployee,
    };

    component.onFormValueUpdate(formValue);
    component.onNewInput(input);
    expect(component.chartData).not.toEqual([]);
    expect(component.sankeyData).not.toEqual([]);
  });

  it('should update charts when receiving new input with group insurance checked but not defined', () => {
    component.chartData = [];

    const formValue = {
      ...component.formValue,
      groupInsurance: true,
      groupInsurancePersonalContribution: null,
    };
    const input: SalaryCalculationInput = {
      ...simpleEmployee,
      // mealVoucherAmounts: {
      //   value: 0,
      //   personalContribution: 0,
      // },
      // numMealVouchers: 1,
    };

    component.onFormValueUpdate(formValue);
    component.onNewInput(input);
    expect(component.chartData).not.toEqual([]);
    expect(component.sankeyData).not.toEqual([]);
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

  it('should not lower the chart start below the selected revenue year minimum salary when providing an out-of-range salary', () => {
    component.chartData = [];
    component.relativeChartData = [];
    component.averageTaxRateChartData = [];
    component.taxData = [];
    component.taxDataProportional = [];

    component.graphsStartingSalary = 3000;
    component.graphsEndingSalary = 4000;
    component.updateChartData(2500);

    expect(component.graphsStartingSalary).toBe(2154.11);
    expect(component.chartData).not.toEqual([]);
    expect(component.relativeChartData).not.toEqual([]);
    expect(component.averageTaxRateChartData).not.toEqual([]);
    expect(component.taxData).not.toEqual([]);
    expect(component.taxDataProportional).not.toEqual([]);
  });
});
