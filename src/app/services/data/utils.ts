import { MonthlyIncome } from "../tax-calculator.service";


export function getMonthlyIncomes(
  grossSalary: number,
  includeHolidayPay: boolean = true,
  include13thMonth: boolean = true,
  numMealVouchers: number = 0,
): MonthlyIncome[] {
  const monthlyIncomes: MonthlyIncome[] = [];

  for (let i = 0; i < 12; i++) {
    monthlyIncomes.push({
      grossSalary: grossSalary,
      numMealVouchers: numMealVouchers,
    })
  }

  if (includeHolidayPay) {
    monthlyIncomes[5].holidayPay = grossSalary;
  }

  if (include13thMonth) {
    monthlyIncomes[11].bonus = grossSalary;
  }

  return monthlyIncomes;
}
