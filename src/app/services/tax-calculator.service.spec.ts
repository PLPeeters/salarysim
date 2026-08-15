import { TestBed } from '@angular/core/testing';

import { INPUTS_TO_NET as INPUTS_TO_NET_2024, simpleEmployee } from './data/2024-inputs-to-net';
import { INPUTS_TO_NET as INPUTS_TO_NET_2025 } from './data/2025-inputs-to-net';
import { INPUTS_TO_NET as INPUTS_TO_NET_2026 } from './data/2026-inputs-to-net';
import { FamilySituation, FuelType, Status, TaxationPeriod, TaxCalculatorService } from './tax-calculator.service';


describe('TaxCalculatorService', () => {
  let service: TaxCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  INPUTS_TO_NET_2024.forEach((inputToNet, index) => {
    const input = inputToNet.input;
    const expectedNetSalary = inputToNet.netSalary;
    const expectedNetIncome = inputToNet.netIncome;
    let grossSalary;

    if (input.period === TaxationPeriod.Monthly) {
      grossSalary = input.grossSalary;
    } else {
      grossSalary = input.monthlyIncomes[0]?.grossSalary;
    }

    it(`should calculate a net salary of ${expectedNetSalary} for situation ${index} (${input.revenueYear}/${input.period}/${input.status}/${input.workRegime.type}/${grossSalary})`, () => {
      const result = service.calculateTaxation(input);
      expect(result.netSalary).toBe(expectedNetSalary);
    });

    if (expectedNetIncome) {
      it(`should calculate a net income of ${expectedNetIncome} for situation ${index} (${input.revenueYear}/${input.period}/${input.status}/${input.workRegime.type}/${grossSalary})`, () => {
        const result = service.calculateTaxation(input);
        expect(result.netIncome).toBe(expectedNetIncome);
      });
    }
  });

  INPUTS_TO_NET_2025.forEach((inputToNet, index) => {
    const input = inputToNet.input;
    const expectedNetSalary = inputToNet.netSalary;
    const expectedNetIncome = inputToNet.netIncome;
    let grossSalary;

    if (input.period === TaxationPeriod.Monthly) {
      grossSalary = input.grossSalary;
    } else {
      grossSalary = input.monthlyIncomes[0]?.grossSalary;
    }

    it(`should calculate a net salary of ${expectedNetSalary} for situation ${index} (${input.revenueYear}/${input.period}/${input.status}/${input.workRegime.type}/${grossSalary})`, () => {
      const result = service.calculateTaxation(input);
      expect(result.netSalary).toBe(expectedNetSalary);
    });

    if (expectedNetIncome) {
      it(`should calculate a net income of ${expectedNetIncome} for situation ${index} (${input.revenueYear}/${input.period}/${input.status}/${input.workRegime.type}/${grossSalary})`, () => {
        const result = service.calculateTaxation(input);
        expect(result.netIncome).toBe(expectedNetIncome);
      });
    }
  });

  INPUTS_TO_NET_2026.forEach((inputToNet, index) => {
    const input = inputToNet.input;
    const expectedNetSalary = inputToNet.netSalary;
    const expectedNetIncome = inputToNet.netIncome;
    let grossSalary;

    if (input.period === TaxationPeriod.Monthly) {
      grossSalary = input.grossSalary;
    } else {
      grossSalary = input.monthlyIncomes[0]?.grossSalary;
    }

    it(`should calculate a net salary of ${expectedNetSalary} for 2026 situation ${index} (${input.revenueYear}/${input.period}/${input.status}/${input.workRegime.type}/${grossSalary})`, () => {
      const result = service.calculateTaxation(input);
      expect(result.netSalary).toBe(expectedNetSalary);
    });

    if (expectedNetIncome) {
      it(`should calculate a net income of ${expectedNetIncome} for 2026 situation ${index} (${input.revenueYear}/${input.period}/${input.status}/${input.workRegime.type}/${grossSalary})`, () => {
        const result = service.calculateTaxation(input);
        expect(result.netIncome).toBe(expectedNetIncome);
      });
    }
  });

  it('should throw an error when called with the _ISOLATED_IGNORE_EXEMPTED_TIER family situation', () => {
    const input = {
      ...simpleEmployee,
      familySituation: FamilySituation._ISOLATED_IGNORE_EXEMPTED_TIER,
    };

    expect(() => service.calculateTaxation(input)).toThrow();
  });

  it('should throw an error when called with an unsupported year', () => {
    const input = {
      ...simpleEmployee,
      revenueYear: 2023,
    };

    expect(() => service.calculateTaxation(input)).toThrow();
  });

  it('should use the February 2025 ONSS worker work-bonus amounts', () => {
    const input = {
      ...simpleEmployee,
      revenueYear: 2025,
      month: 2,
      status: Status.WORKER,
      grossSalary: 2500,
    };

    const result = service.calculateTaxation(input);

    expect(result.employmentBonus).toBe(211.21);
  });

  it('should support the January 2026 ONSS worker work-bonus values', () => {
    const input = {
      ...simpleEmployee,
      revenueYear: 2026,
      month: 1,
      status: Status.WORKER,
      grossSalary: 2500,
    };

    const result = service.calculateTaxation(input);

    expect(result.employmentBonus).toBe(229.99);
  });

  it('should switch to the March 2026 ONSS worker work-bonus values', () => {
    const input = {
      ...simpleEmployee,
      revenueYear: 2026,
      month: 3,
      status: Status.WORKER,
      grossSalary: 3000,
    };

    const result = service.calculateTaxation(input);

    expect(result.employmentBonus).toBe(88.88);
  });

  it('should switch to the April 2026 ONSS worker work-bonus values', () => {
    const input = {
      ...simpleEmployee,
      revenueYear: 2026,
      month: 4,
      status: Status.WORKER,
      grossSalary: 3000,
    };

    const result = service.calculateTaxation(input);

    expect(result.employmentBonus).toBe(99.65);
  });

  it('should switch to the July 2026 ONSS worker work-bonus values', () => {
    const input = {
      ...simpleEmployee,
      revenueYear: 2026,
      month: 7,
      status: Status.WORKER,
      grossSalary: 3000,
    };

    const result = service.calculateTaxation(input);

    expect(result.employmentBonus).toBe(116.31);
  });

  it('should switch to the September 2026 ONSS worker work-bonus values', () => {
    const input = {
      ...simpleEmployee,
      revenueYear: 2026,
      month: 9,
      status: Status.WORKER,
      grossSalary: 3000,
    };

    const result = service.calculateTaxation(input);

    expect(result.employmentBonus).toBe(119.38);
  });

  it('should use the 2026 minimum taxable company-car benefit', () => {
    const input = {
      ...simpleEmployee,
      revenueYear: 2026,
      grossSalary: 3000,
      companyCarInfo: {
        catalogValue: 1,
        firstPlateRegistrationMonth: new Date(2026, 0, 1),
        fuelType: FuelType.Electric,
        gramsCo2PerKm: 0,
      },
    };

    const result = service.calculateTaxation(input);

    expect(result.companyCarBenefitInKindValue).toBe(140.83);
  });
});
