import { TestBed } from '@angular/core/testing';
import { getDateFromMonthString, monthValidator } from './month-validator';
import { FormControl } from '@angular/forms';


describe('month-validator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({})
      .compileComponents();
  });

  it('should return a date for a valid input', () => {
    const date = getDateFromMonthString('04/2022');

    expect(date).toEqual(new Date(2022, 3, 1));
  });

  it('should crash when trying to get a date for invalid input', () => {
    expect(() => getDateFromMonthString('13/2022')).toThrow();
  });

  it('should mark a control as valid if it contains a valid month input', () => {
    const fc = new FormControl('04/2022', [monthValidator()]);

    expect(fc.valid).toBeTrue();
  });

  it('should mark a control as invalid if it contains an invalid month input', () => {
    const fc = new FormControl('13/2022', [monthValidator()]);

    expect(fc.valid).toBeFalse();
  });
});
