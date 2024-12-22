import { TestBed } from '@angular/core/testing';

import { TaxCalculatorService } from './tax-calculator.service';
import { INPUTS_TO_NET } from './inputs-to-net';

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
});
