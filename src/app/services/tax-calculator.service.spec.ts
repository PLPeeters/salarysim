import { TestBed } from '@angular/core/testing';

import { FamilySituation, TaxCalculatorService } from './tax-calculator.service';
import { INPUTS_TO_NET, simpleEmployee } from './data/2024-inputs-to-net';

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
    const expectedNet = inputToNet.net;

    it(`should calculate a net of ${expectedNet} for situation ${input.status}/${input.workRegime.type}/${input.monthlyGrossSalary}`, () => {
      const result = service.calculateNetSalary(input);
      expect(result.netSalary).toBe(expectedNet);
    });
  });

  it('should throw an error when called with the _ISOLATED_IGNORE_EXEMPTED_TIER family situation', () => {
    const input = {
      ...simpleEmployee,
      familySituation: FamilySituation._ISOLATED_IGNORE_EXEMPTED_TIER,
    };

    expect(() => service.calculateNetSalary(input)).toThrow();
  });

  it('should throw an error when called with an unsupported year', () => {
    const input = {
      ...simpleEmployee,
      revenueYear: 2023,
    };

    expect(() => service.calculateNetSalary(input)).toThrow();
  });
});
