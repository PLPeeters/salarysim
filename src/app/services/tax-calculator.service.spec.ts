import { TestBed } from '@angular/core/testing';

import { INPUTS_TO_NET, simpleEmployee } from './data/2024-inputs-to-net';
import { FamilySituation, TaxationPeriod, TaxCalculatorService } from './tax-calculator.service';

describe('TaxCalculatorService', () => {
  let service: TaxCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  INPUTS_TO_NET.forEach(inputToNet => {
    const input = inputToNet.input;
    const expectedNetSalary = inputToNet.netSalary;
    const expectedNetIncome = inputToNet.netIncome;
    let grossSalary;

    if (input.period === TaxationPeriod.Monthly) {
      grossSalary = input.grossSalary;
    } else {
      grossSalary = input.monthlyIncomes[0]?.grossSalary;
    }

    it(`should calculate a net salary of ${expectedNetSalary} for situation ${input.period}/${input.status}/${input.workRegime.type}/${grossSalary}`, () => {
      const result = service.calculateTaxation(input);
      expect(result.netSalary).toBe(expectedNetSalary);
    });

    if (expectedNetIncome) {
      it(`should calculate a net income of ${expectedNetIncome} for situation ${input.period}/${input.status}/${input.workRegime.type}/${grossSalary}`, () => {
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
});
