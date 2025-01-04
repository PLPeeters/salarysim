import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


const MONTH_REGEX = new RegExp(/^(?<month>\d{1,2})\/(?<year>\d{4})$/)

export function getDateFromMonthString(value: string): Date {
  const match = MONTH_REGEX.exec(value);

  if (!match?.groups) {
    throw Error(`Not a valid date format: ${value}`);
  }

  const today = new Date();
  const maxYear = today.getFullYear();
  const maxMonth = today.getMonth() + 1;

  const month = parseInt(match.groups['month']);
  const year = parseInt(match.groups['year']);

  if (year > maxYear || year <= 1900 || (year === maxYear && month > maxMonth) || month > 12 || month <= 0) {
    throw Error(`Not a valid date: ${value}`);
  }

  return new Date(year, month - 1);
}

export function monthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    try {
      getDateFromMonthString(control.value);
    } catch (e) {
      return {
        invalidMonth: {
          value: control.value,
        }
      };
    }

    return null;
  };
}
