import { FamilySituation, MonthlyIncome, SalaryCalculationInput, Status, TaxationPeriod, WorkRegime, YearlySalaryCalculationInput } from "../tax-calculator.service";
import { Situation } from "./interfaces";

function getMonthlyIncomes(
  grossSalary: number,
  includeHolidayPay: boolean = true,
  include13thMonth: boolean = true,
): MonthlyIncome[] {
  const monthlyIncomes: MonthlyIncome[] = [];

  for (let i = 0; i < 12; i++) {
    monthlyIncomes.push({
      grossSalary: grossSalary,
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

export const simpleEmployee: SalaryCalculationInput = {
  period: TaxationPeriod.Monthly,
  revenueYear: 2025,
  status: Status.EMPLOYEE,
  workRegime: {
    type: WorkRegime.FULL_TIME,
    workedTimePerWeek: 38,
    fullTimeHoursPerWeek: 38,
  },
  familySituation: FamilySituation.ISOLATED,
  dependentPeople: {
    numDependentChildren: 0,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
  disabled: false,
  hasDisabledPartner: false,
  groupInsurancePersonalCotisation: 0,
  otherNetIncome: 0,
  grossSalary: 0,
};
const partTimeEmployee: SalaryCalculationInput = {
  ...simpleEmployee,
  workRegime: {
    type: WorkRegime.PART_TIME,
    workedTimePerWeek: 32,
    fullTimeHoursPerWeek: 38,
  },
};
const halfTimeEmployee: SalaryCalculationInput = {
  ...simpleEmployee,
  workRegime: {
    type: WorkRegime.PART_TIME,
    workedTimePerWeek: 19,
    fullTimeHoursPerWeek: 38,
  },
};
const halfTimeEmployeeWithOneKid: SalaryCalculationInput = {
  ...simpleEmployee,
  workRegime: {
    type: WorkRegime.PART_TIME,
    workedTimePerWeek: 19,
    fullTimeHoursPerWeek: 38,
  },
  dependentPeople: {
    numDependentChildren: 1,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const employeeWithOneKid: SalaryCalculationInput = {
  ...simpleEmployee,
  dependentPeople: {
    numDependentChildren: 1,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const employeeWithOneDisabledKid: SalaryCalculationInput = {
  ...simpleEmployee,
  dependentPeople: {
    numDependentChildren: 0,
    numDisabledDependentChildren: 1,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const employeeWithOneAbleAndOneDisabledKid: SalaryCalculationInput = {
  ...simpleEmployee,
  dependentPeople: {
    numDependentChildren: 1,
    numDisabledDependentChildren: 1,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const employeeWithFourKids: SalaryCalculationInput = {
  ...simpleEmployee,
  dependentPeople: {
    numDependentChildren: 4,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const employeeWithFiveKids: SalaryCalculationInput = {
  ...simpleEmployee,
  dependentPeople: {
    numDependentChildren: 5,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const employeeWithSixKids: SalaryCalculationInput = {
  ...simpleEmployee,
  dependentPeople: {
    numDependentChildren: 6,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const employeeWithSevenKids: SalaryCalculationInput = {
  ...simpleEmployee,
  dependentPeople: {
    numDependentChildren: 7,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const employeeWithEightKids: SalaryCalculationInput = {
  ...simpleEmployee,
  dependentPeople: {
    numDependentChildren: 8,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const employeeWith100Kids: SalaryCalculationInput = {
  ...simpleEmployee,
  dependentPeople: {
    numDependentChildren: 100,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const disabledEmployee: SalaryCalculationInput = {
  ...simpleEmployee,
  disabled: true,
};
const employeeWithGroupInsurance: SalaryCalculationInput = {
  ...simpleEmployee,
  groupInsurancePersonalCotisation: 42.5,
};
const employeeWithOtherNetIncome: SalaryCalculationInput = {
  ...simpleEmployee,
  otherNetIncome: 100,
};
const marriedEmployeeOneIncome: SalaryCalculationInput = {
  ...simpleEmployee,
  familySituation: FamilySituation.MARRIED_OR_COHABITANT_1_INCOME,
};
const marriedEmployeeWithDisabledPartner: SalaryCalculationInput = {
  ...marriedEmployeeOneIncome,
  hasDisabledPartner: true,
};
const marriedHalfTimeEmployeeOneIncome: SalaryCalculationInput = {
  ...halfTimeEmployee,
  familySituation: FamilySituation.MARRIED_OR_COHABITANT_1_INCOME,
};
const marriedEmployeeTwoIncomes: SalaryCalculationInput = {
  ...simpleEmployee,
  familySituation: FamilySituation.MARRIED_OR_COHABITANT_2_INCOMES,
};
const marriedHalfTimeEmployeeTwoIncomes: SalaryCalculationInput = {
  ...halfTimeEmployee,
  familySituation: FamilySituation.MARRIED_OR_COHABITANT_2_INCOMES,
};
const divorcedEmployeeWithOneKid: SalaryCalculationInput = {
  ...simpleEmployee,
  familySituation: FamilySituation.DIVORCED_OR_SEPARATED,
  dependentPeople: {
    numDependentChildren: 1,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const widowedEmployeeWithOneKid: SalaryCalculationInput = {
  ...simpleEmployee,
  familySituation: FamilySituation.NON_REMARRIED_WIDOW,
  dependentPeople: {
    numDependentChildren: 1,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const widowedHalfTimeEmployeeWithOneKid: SalaryCalculationInput = {
  ...halfTimeEmployee,
  familySituation: FamilySituation.NON_REMARRIED_WIDOW,
  dependentPeople: {
    numDependentChildren: 1,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const simpleEmployeeAnnual: YearlySalaryCalculationInput = {
  ...simpleEmployee,
  period: TaxationPeriod.Annual,
  monthlyIncomes: [],
};

const simpleWorker: SalaryCalculationInput = {
  ...simpleEmployee,
  status: Status.WORKER,
};
const partTimeWorker: SalaryCalculationInput = {
  ...simpleWorker,
  workRegime: {
    type: WorkRegime.PART_TIME,
    workedTimePerWeek: 32,
    fullTimeHoursPerWeek: 38,
  },
};
const halfTimeWorker: SalaryCalculationInput = {
  ...simpleWorker,
  workRegime: {
    type: WorkRegime.PART_TIME,
    workedTimePerWeek: 19,
    fullTimeHoursPerWeek: 38,
  },
};
const halfTimeWorkerWithOneKid: SalaryCalculationInput = {
  ...simpleWorker,
  workRegime: {
    type: WorkRegime.PART_TIME,
    workedTimePerWeek: 19,
    fullTimeHoursPerWeek: 38,
  },
  dependentPeople: {
    numDependentChildren: 1,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const workerWithOneKid: SalaryCalculationInput = {
  ...simpleWorker,
  dependentPeople: {
    numDependentChildren: 1,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const workerWithOneDisabledKid: SalaryCalculationInput = {
  ...simpleWorker,
  dependentPeople: {
    numDependentChildren: 0,
    numDisabledDependentChildren: 1,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const workerWithOneAbleAndOneDisabledKid: SalaryCalculationInput = {
  ...simpleWorker,
  dependentPeople: {
    numDependentChildren: 1,
    numDisabledDependentChildren: 1,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const workerWith100Kids: SalaryCalculationInput = {
  ...simpleWorker,
  dependentPeople: {
    numDependentChildren: 100,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const disabledWorker: SalaryCalculationInput = {
  ...simpleWorker,
  disabled: true,
};
const workerWithGroupInsurance: SalaryCalculationInput = {
  ...simpleWorker,
  groupInsurancePersonalCotisation: 42.5,
};
const workerWithOtherNetIncome: SalaryCalculationInput = {
  ...simpleWorker,
  otherNetIncome: 100,
};
const marriedWorkerOneIncome: SalaryCalculationInput = {
  ...simpleWorker,
  familySituation: FamilySituation.MARRIED_OR_COHABITANT_1_INCOME,
};
const marriedWorkerWithDisabledPartner: SalaryCalculationInput = {
  ...marriedWorkerOneIncome,
  hasDisabledPartner: true,
};
const marriedHalfTimeWorkerOneIncome: SalaryCalculationInput = {
  ...halfTimeWorker,
  familySituation: FamilySituation.MARRIED_OR_COHABITANT_1_INCOME,
};
const marriedWorkerTwoIncomes: SalaryCalculationInput = {
  ...simpleWorker,
  familySituation: FamilySituation.MARRIED_OR_COHABITANT_2_INCOMES,
};
const marriedWorkerPartnerLowPension: SalaryCalculationInput = {
  ...simpleWorker,
  familySituation: FamilySituation.MARRIED_OR_COHABITANT_2_INCOMES_PARTNER_LOW_PENSION,
};
const marriedWorkerPartnerLowOtherRevenue: SalaryCalculationInput = {
  ...simpleWorker,
  familySituation: FamilySituation.MARRIED_OR_COHABITANT_2_INCOMES_PARTNER_LOW_OTHER_REVENUE,
};
const marriedHalfTimeWorkerTwoIncomes: SalaryCalculationInput = {
  ...halfTimeWorker,
  familySituation: FamilySituation.MARRIED_OR_COHABITANT_2_INCOMES,
};
const divorcedWorkerWithOneKid: SalaryCalculationInput = {
  ...simpleWorker,
  familySituation: FamilySituation.DIVORCED_OR_SEPARATED,
  dependentPeople: {
    numDependentChildren: 1,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const widowedWorkerWithOneKid: SalaryCalculationInput = {
  ...simpleWorker,
  familySituation: FamilySituation.NON_REMARRIED_WIDOW,
  dependentPeople: {
    numDependentChildren: 1,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const widowedHalfTimeWorkerWithOneKid: SalaryCalculationInput = {
  ...halfTimeWorker,
  familySituation: FamilySituation.NON_REMARRIED_WIDOW,
  dependentPeople: {
    numDependentChildren: 1,
    numDisabledDependentChildren: 0,
    numDependentRetirees: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const simpleWorkerAnnual: YearlySalaryCalculationInput = {
  ...simpleWorker,
  period: TaxationPeriod.Annual,
  monthlyIncomes: [],
};


export const INPUTS_TO_NET: Situation[] = [
  { input: { ...simpleEmployee, grossSalary: 0 }, netSalary: 0 },
  { input: { ...simpleEmployee, grossSalary: 1 }, netSalary: 1 },
  { input: { ...simpleEmployee, grossSalary: 2070.48 }, netSalary: 1970.9 },
  { input: { ...simpleEmployee, grossSalary: 2100 }, netSalary: 1988.58 },
  { input: { ...simpleEmployee, grossSalary: 2150 }, netSalary: 2009.66 },
  { input: { ...simpleEmployee, grossSalary: 2200 }, netSalary: 2017.92 },
  { input: { ...simpleEmployee, grossSalary: 2250 }, netSalary: 2027.4 },
  { input: { ...simpleEmployee, grossSalary: 2300 }, netSalary: 2036.92 },
  { input: { ...simpleEmployee, grossSalary: 2350 }, netSalary: 2046.41 },
  { input: { ...simpleEmployee, grossSalary: 2400 }, netSalary: 2055.92 },
  { input: { ...simpleEmployee, grossSalary: 2450 }, netSalary: 2065.41 },
  { input: { ...simpleEmployee, grossSalary: 2500 }, netSalary: 2074.92 },
  { input: { ...simpleEmployee, grossSalary: 2550 }, netSalary: 2084.42 },
  { input: { ...simpleEmployee, grossSalary: 2600 }, netSalary: 2093.93 },
  { input: { ...simpleEmployee, grossSalary: 2650 }, netSalary: 2103.42 },
  { input: { ...simpleEmployee, grossSalary: 2700 }, netSalary: 2112.93 },
  { input: { ...simpleEmployee, grossSalary: 2750 }, netSalary: 2124.46 },
  { input: { ...simpleEmployee, grossSalary: 2800 }, netSalary: 2137.74 },
  { input: { ...simpleEmployee, grossSalary: 2850 }, netSalary: 2151.03 },
  { input: { ...simpleEmployee, grossSalary: 2900 }, netSalary: 2164.31 },
  { input: { ...simpleEmployee, grossSalary: 2950 }, netSalary: 2177.59 },
  { input: { ...simpleEmployee, grossSalary: 3000 }, netSalary: 2190.87 },
  { input: { ...simpleEmployee, grossSalary: 3050 }, netSalary: 2204.15 },
  { input: { ...simpleEmployee, grossSalary: 3100 }, netSalary: 2217.44 },
  { input: { ...simpleEmployee, grossSalary: 3150 }, netSalary: 2230.71 },
  { input: { ...simpleEmployee, grossSalary: 3200 }, netSalary: 2244 },
  { input: { ...simpleEmployee, grossSalary: 3300 }, netSalary: 2290.98 },
  { input: { ...simpleEmployee, grossSalary: 3400 }, netSalary: 2336.27 },
  { input: { ...simpleEmployee, grossSalary: 3500 }, netSalary: 2380.24 },
  { input: { ...simpleEmployee, grossSalary: 3600 }, netSalary: 2424.22 },
  { input: { ...simpleEmployee, grossSalary: 3700 }, netSalary: 2468.19 },
  { input: { ...simpleEmployee, grossSalary: 3800 }, netSalary: 2510.72 },
  { input: { ...simpleEmployee, grossSalary: 3900 }, netSalary: 2552.42 },
  { input: { ...simpleEmployee, grossSalary: 4000 }, netSalary: 2594.11 },
  { input: { ...simpleEmployee, grossSalary: 4100 }, netSalary: 2635.8 },
  { input: { ...simpleEmployee, grossSalary: 4200 }, netSalary: 2679.79 },
  { input: { ...simpleEmployee, grossSalary: 4300 }, netSalary: 2723.76 },
  { input: { ...simpleEmployee, grossSalary: 4400 }, netSalary: 2767.73 },
  { input: { ...simpleEmployee, grossSalary: 4500 }, netSalary: 2811.71 },
  { input: { ...simpleEmployee, grossSalary: 4600 }, netSalary: 2855.68 },
  { input: { ...simpleEmployee, grossSalary: 4700 }, netSalary: 2899.65 },
  { input: { ...simpleEmployee, grossSalary: 4800 }, netSalary: 2943.63 },
  { input: { ...simpleEmployee, grossSalary: 4900 }, netSalary: 2987.6 },
  { input: { ...simpleEmployee, grossSalary: 5000 }, netSalary: 3031.57 },
  { input: { ...simpleEmployee, grossSalary: 5100 }, netSalary: 3075.54 },
  { input: { ...simpleEmployee, grossSalary: 5200 }, netSalary: 3119.52 },
  { input: { ...simpleEmployee, grossSalary: 5300 }, netSalary: 3163.49 },
  { input: { ...simpleEmployee, grossSalary: 5400 }, netSalary: 3204.88 },
  { input: { ...simpleEmployee, grossSalary: 5500 }, netSalary: 3244.2 },
  { input: { ...simpleEmployee, grossSalary: 5600 }, netSalary: 3283.52 },
  { input: { ...simpleEmployee, grossSalary: 5700 }, netSalary: 3322.84 },
  { input: { ...simpleEmployee, grossSalary: 5800 }, netSalary: 3362.17 },
  { input: { ...simpleEmployee, grossSalary: 5900 }, netSalary: 3401.49 },
  { input: { ...simpleEmployee, grossSalary: 6000 }, netSalary: 3440.81 },
  { input: { ...simpleEmployee, grossSalary: 6100 }, netSalary: 3480.8 },
  { input: { ...simpleEmployee, grossSalary: 6200 }, netSalary: 3521.22 },
  { input: { ...simpleEmployee, grossSalary: 6300 }, netSalary: 3561.65 },
  { input: { ...simpleEmployee, grossSalary: 6400 }, netSalary: 3602.07 },
  { input: { ...simpleEmployee, grossSalary: 6500 }, netSalary: 3642.49 },
  { input: { ...simpleEmployee, grossSalary: 6600 }, netSalary: 3682.91 },
  { input: { ...simpleEmployee, grossSalary: 6700 }, netSalary: 3723.34 },
  { input: { ...simpleEmployee, grossSalary: 6800 }, netSalary: 3763.76 },
  { input: { ...simpleEmployee, grossSalary: 6900 }, netSalary: 3804.18 },
  { input: { ...simpleEmployee, grossSalary: 7000 }, netSalary: 3844.6 },
  { input: { ...simpleEmployee, grossSalary: 7500 }, netSalary: 4046.72 },
  { input: { ...simpleEmployee, grossSalary: 8000 }, netSalary: 4248.83 },
  { input: { ...simpleEmployee, grossSalary: 8500 }, netSalary: 4450.94 },
  { input: { ...simpleEmployee, grossSalary: 9000 }, netSalary: 4653.05 },
  { input: { ...simpleEmployee, grossSalary: 9500 }, netSalary: 4855.17 },
  { input: { ...simpleEmployee, grossSalary: 10000 }, netSalary: 5057.28 },
  { input: { ...simpleEmployee, grossSalary: 11000 }, netSalary: 5461.5 },
  { input: { ...simpleEmployee, grossSalary: 12000 }, netSalary: 5865.73 },
  { input: { ...simpleEmployee, grossSalary: 13000 }, netSalary: 6269.95 },
  { input: { ...simpleEmployee, grossSalary: 14000 }, netSalary: 6674.18 },
  { input: { ...simpleEmployee, grossSalary: 15000 }, netSalary: 7078.4 },
  { input: { ...simpleEmployee, grossSalary: 16000 }, netSalary: 7482.62 },
  { input: { ...simpleEmployee, grossSalary: 17000 }, netSalary: 7886.85 },
  { input: { ...simpleEmployee, grossSalary: 18000 }, netSalary: 8291.07 },
  { input: { ...simpleEmployee, grossSalary: 19000 }, netSalary: 8695.3 },
  { input: { ...simpleEmployee, grossSalary: 20000 }, netSalary: 9099.52 },

  { input: { ...simpleWorker, grossSalary: 2070.48 }, netSalary: 1958.86 },
  { input: { ...simpleWorker, grossSalary: 2100 }, netSalary: 1973.00 },
  { input: { ...simpleWorker, grossSalary: 2150 }, netSalary: 1996.98 },
  { input: { ...simpleWorker, grossSalary: 2200 }, netSalary: 2020.96 },
  { input: { ...simpleWorker, grossSalary: 2250 }, netSalary: 2031.72 },
  { input: { ...simpleWorker, grossSalary: 2300 }, netSalary: 2039.71 },
  { input: { ...simpleWorker, grossSalary: 2350 }, netSalary: 2047.67 },
  { input: { ...simpleWorker, grossSalary: 2400 }, netSalary: 2055.66 },
  { input: { ...simpleWorker, grossSalary: 2450 }, netSalary: 2063.63 },
  { input: { ...simpleWorker, grossSalary: 2500 }, netSalary: 2071.6 },
  { input: { ...simpleWorker, grossSalary: 2550 }, netSalary: 2079.57 },
  { input: { ...simpleWorker, grossSalary: 2600 }, netSalary: 2087.54 },
  { input: { ...simpleWorker, grossSalary: 2650 }, netSalary: 2095.52 },
  { input: { ...simpleWorker, grossSalary: 2700 }, netSalary: 2103.51 },
  { input: { ...simpleWorker, grossSalary: 2750 }, netSalary: 2113.67 },
  { input: { ...simpleWorker, grossSalary: 2800 }, netSalary: 2125.73 },
  { input: { ...simpleWorker, grossSalary: 2850 }, netSalary: 2137.77 },
  { input: { ...simpleWorker, grossSalary: 2900 }, netSalary: 2149.84 },
  { input: { ...simpleWorker, grossSalary: 2950 }, netSalary: 2161.89 },
  { input: { ...simpleWorker, grossSalary: 3000 }, netSalary: 2173.94 },
  { input: { ...simpleWorker, grossSalary: 3050 }, netSalary: 2186 },
  { input: { ...simpleWorker, grossSalary: 3100 }, netSalary: 2198.05 },
  { input: { ...simpleWorker, grossSalary: 3150 }, netSalary: 2210.1 },
  { input: { ...simpleWorker, grossSalary: 3200 }, netSalary: 2222.15 },
  { input: { ...simpleWorker, grossSalary: 3250 }, netSalary: 2244.37 },
  { input: { ...simpleWorker, grossSalary: 3300 }, netSalary: 2268.34 },
  { input: { ...simpleWorker, grossSalary: 3400 }, netSalary: 2314.85 },
  { input: { ...simpleWorker, grossSalary: 3500 }, netSalary: 2357.20 },
  { input: { ...simpleWorker, grossSalary: 3600 }, netSalary: 2398.09 },
  { input: { ...simpleWorker, grossSalary: 3700 }, netSalary: 2438.97 },
  { input: { ...simpleWorker, grossSalary: 3800 }, netSalary: 2479.95 },
  { input: { ...simpleWorker, grossSalary: 3900 }, netSalary: 2523.29 },
  { input: { ...simpleWorker, grossSalary: 4000 }, netSalary: 2566.64 },
  { input: { ...simpleWorker, grossSalary: 4100 }, netSalary: 2609.97 },
  { input: { ...simpleWorker, grossSalary: 4200 }, netSalary: 2653.31 },
  { input: { ...simpleWorker, grossSalary: 4300 }, netSalary: 2696.67 },
  { input: { ...simpleWorker, grossSalary: 4400 }, netSalary: 2740.00 },
  { input: { ...simpleWorker, grossSalary: 4500 }, netSalary: 2783.35 },
  { input: { ...simpleWorker, grossSalary: 4600 }, netSalary: 2826.69 },
  { input: { ...simpleWorker, grossSalary: 4700 }, netSalary: 2870.03 },
  { input: { ...simpleWorker, grossSalary: 4800 }, netSalary: 2913.38 },
  { input: { ...simpleWorker, grossSalary: 4900 }, netSalary: 2956.73 },
  { input: { ...simpleWorker, grossSalary: 5000 }, netSalary: 3000.06 },
  { input: { ...simpleWorker, grossSalary: 5100 }, netSalary: 3043.4 },
  { input: { ...simpleWorker, grossSalary: 5200 }, netSalary: 3086.75 },
  { input: { ...simpleWorker, grossSalary: 5300 }, netSalary: 3130.09 },
  { input: { ...simpleWorker, grossSalary: 5400 }, netSalary: 3173.44 },
  { input: { ...simpleWorker, grossSalary: 5500 }, netSalary: 3212.61 },
  { input: { ...simpleWorker, grossSalary: 5600 }, netSalary: 3251.47 },
  { input: { ...simpleWorker, grossSalary: 5700 }, netSalary: 3291.4 },
  { input: { ...simpleWorker, grossSalary: 5800 }, netSalary: 3331.33 },
  { input: { ...simpleWorker, grossSalary: 5900 }, netSalary: 3371.27 },
  { input: { ...simpleWorker, grossSalary: 6000 }, netSalary: 3411.20 },
  { input: { ...simpleWorker, grossSalary: 6100 }, netSalary: 3451.15 },
  { input: { ...simpleWorker, grossSalary: 6200 }, netSalary: 3491.08 },
  { input: { ...simpleWorker, grossSalary: 6300 }, netSalary: 3531.02 },
  { input: { ...simpleWorker, grossSalary: 6400 }, netSalary: 3570.95 },
  { input: { ...simpleWorker, grossSalary: 6500 }, netSalary: 3610.89 },
  { input: { ...simpleWorker, grossSalary: 6600 }, netSalary: 3650.82 },
  { input: { ...simpleWorker, grossSalary: 6700 }, netSalary: 3690.76 },
  { input: { ...simpleWorker, grossSalary: 6800 }, netSalary: 3730.7 },
  { input: { ...simpleWorker, grossSalary: 6900 }, netSalary: 3770.63 },
  { input: { ...simpleWorker, grossSalary: 7000 }, netSalary: 3810.57 },
  { input: { ...simpleWorker, grossSalary: 7500 }, netSalary: 4010.25 },
  { input: { ...simpleWorker, grossSalary: 8000 }, netSalary: 4209.93 },
  { input: { ...simpleWorker, grossSalary: 8500 }, netSalary: 4409.61 },
  { input: { ...simpleWorker, grossSalary: 9000 }, netSalary: 4609.3 },
  { input: { ...simpleWorker, grossSalary: 9500 }, netSalary: 4808.98 },
  { input: { ...simpleWorker, grossSalary: 10000 }, netSalary: 5008.66 },
  { input: { ...simpleWorker, grossSalary: 11000 }, netSalary: 5408.02 },
  { input: { ...simpleWorker, grossSalary: 12000 }, netSalary: 5807.38 },
  { input: { ...simpleWorker, grossSalary: 13000 }, netSalary: 6206.74 },
  { input: { ...simpleWorker, grossSalary: 14000 }, netSalary: 6606.11 },
  { input: { ...simpleWorker, grossSalary: 15000 }, netSalary: 7005.47 },
  { input: { ...simpleWorker, grossSalary: 16000 }, netSalary: 7404.83 },
  { input: { ...simpleWorker, grossSalary: 17000 }, netSalary: 7804.2 },
  { input: { ...simpleWorker, grossSalary: 18000 }, netSalary: 8203.56 },
  { input: { ...simpleWorker, grossSalary: 19000 }, netSalary: 8602.92 },
  { input: { ...simpleWorker, grossSalary: 20000 }, netSalary: 9002.28 },

  { input: { ...partTimeEmployee, grossSalary: 1743.56 }, netSalary: 1743.56 },
  { input: { ...partTimeEmployee, grossSalary: 1800 }, netSalary: 1794.04 },
  { input: { ...partTimeEmployee, grossSalary: 1900 }, netSalary: 1823.24 },
  { input: { ...partTimeEmployee, grossSalary: 2000 }, netSalary: 1841.17 },
  { input: { ...partTimeEmployee, grossSalary: 2100 }, netSalary: 1857.08 },
  { input: { ...partTimeEmployee, grossSalary: 2200 }, netSalary: 1873.39 },
  { input: { ...partTimeEmployee, grossSalary: 2300 }, netSalary: 1892.95 },
  { input: { ...partTimeEmployee, grossSalary: 2400 }, netSalary: 1919.6 },
  { input: { ...partTimeEmployee, grossSalary: 2500 }, netSalary: 1946.19 },
  { input: { ...partTimeEmployee, grossSalary: 2600 }, netSalary: 1972.85 },
  { input: { ...partTimeEmployee, grossSalary: 2700 }, netSalary: 1999.42 },
  { input: { ...partTimeEmployee, grossSalary: 2800 }, netSalary: 2047.86 },
  { input: { ...partTimeEmployee, grossSalary: 2900 }, netSalary: 2096.48 },
  { input: { ...partTimeEmployee, grossSalary: 3000 }, netSalary: 2145.11 },
  { input: { ...partTimeEmployee, grossSalary: 3100 }, netSalary: 2193.73 },
  { input: { ...partTimeEmployee, grossSalary: 3200 }, netSalary: 2242.35 },
  { input: { ...partTimeEmployee, grossSalary: 3300 }, netSalary: 2290.98 },
  { input: { ...partTimeEmployee, grossSalary: 3400 }, netSalary: 2336.27 },
  { input: { ...partTimeEmployee, grossSalary: 3500 }, netSalary: 2380.24 },
  { input: { ...partTimeEmployee, grossSalary: 4000 }, netSalary: 2594.11 },
  { input: { ...partTimeEmployee, grossSalary: 4500 }, netSalary: 2811.71 },
  { input: { ...partTimeEmployee, grossSalary: 5000 }, netSalary: 3031.57 },
  { input: { ...partTimeEmployee, grossSalary: 5500 }, netSalary: 3244.2 },
  { input: { ...partTimeEmployee, grossSalary: 6000 }, netSalary: 3440.81 },
  { input: { ...partTimeEmployee, grossSalary: 6500 }, netSalary: 3642.49 },
  { input: { ...partTimeEmployee, grossSalary: 7000 }, netSalary: 3844.6 },
  { input: { ...partTimeEmployee, grossSalary: 7500 }, netSalary: 4046.72 },
  { input: { ...partTimeEmployee, grossSalary: 8000 }, netSalary: 4248.83 },
  { input: { ...partTimeEmployee, grossSalary: 8500 }, netSalary: 4450.94 },
  { input: { ...partTimeEmployee, grossSalary: 9000 }, netSalary: 4653.05 },
  { input: { ...partTimeEmployee, grossSalary: 9500 }, netSalary: 4855.17 },
  { input: { ...partTimeEmployee, grossSalary: 10000 }, netSalary: 5057.28 },
  { input: { ...partTimeEmployee, grossSalary: 11000 }, netSalary: 5461.5 },
  { input: { ...partTimeEmployee, grossSalary: 12000 }, netSalary: 5865.73 },
  { input: { ...partTimeEmployee, grossSalary: 13000 }, netSalary: 6269.95 },
  { input: { ...partTimeEmployee, grossSalary: 14000 }, netSalary: 6674.18 },
  { input: { ...partTimeEmployee, grossSalary: 15000 }, netSalary: 7078.4 },
  { input: { ...partTimeEmployee, grossSalary: 16000 }, netSalary: 7482.62 },
  { input: { ...partTimeEmployee, grossSalary: 17000 }, netSalary: 7886.85 },
  { input: { ...partTimeEmployee, grossSalary: 18000 }, netSalary: 8291.07 },
  { input: { ...partTimeEmployee, grossSalary: 19000 }, netSalary: 8695.3 },
  { input: { ...partTimeEmployee, grossSalary: 20000 }, netSalary: 9099.52 },

  { input: { ...marriedEmployeeOneIncome, grossSalary: 2100 }, netSalary: 2090.88 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 2328.33 }, netSalary: 2232.88 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 2500 }, netSalary: 2333.89 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 3000 }, netSalary: 2533.96 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 4029.16 }, netSalary: 3029.25 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 5000 }, netSalary: 3518.75 },

  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 2100 }, netSalary: 2090.88 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 2328.33 }, netSalary: 2232.88 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 2500 }, netSalary: 2333.89 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 3000 }, netSalary: 2584.96 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 4029.16 }, netSalary: 3080.25 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 5000 }, netSalary: 3569.75 },

  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 1319.16 }, netSalary: 1217.33 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 2100 }, netSalary: 1816.41 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 2328.33 }, netSalary: 2008.06 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 2500 }, netSalary: 2155.4 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 3000 }, netSalary: 2485.75 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 4029.16 }, netSalary: 3029.25 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 5000 }, netSalary: 3518.75 },

  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 2328.33 }, netSalary: 2038.20 },
  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 2500 }, netSalary: 2070.81 },
  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 3000 }, netSalary: 2186.76 },
  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 4029.16 }, netSalary: 2608.82 },
  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 5000 }, netSalary: 3035.73 },

  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 1319.16 }, netSalary: 1212.18 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 2000 }, netSalary: 1643.54 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 2100 }, netSalary: 1703.25 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 2328.33 }, netSalary: 1814.41 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 2500 }, netSalary: 1897.88 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 3000 }, netSalary: 2141 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 4029.16 }, netSalary: 2608.82 },

  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 2100 }, netSalary: 2090.58 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 2328.33 }, netSalary: 2144.31 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 2500 }, netSalary: 2176.92 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 3000 }, netSalary: 2292.87 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 4029.16 }, netSalary: 2708.26 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 5000 }, netSalary: 3133.57 },

  { input: { ...widowedEmployeeWithOneKid, grossSalary: 2100 }, netSalary: 2090.58 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 2328.33 }, netSalary: 2144.31 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 2500 }, netSalary: 2176.92 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 3000 }, netSalary: 2292.87 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 4029.16 }, netSalary: 2708.26 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 5000 }, netSalary: 3133.57 },

  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 1319.16 }, netSalary: 1217.33 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 2100 }, netSalary: 1807.85 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 2328.33 }, netSalary: 1920.52 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 2500 }, netSalary: 2003.99 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 3000 }, netSalary: 2247.11 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 4029.16 }, netSalary: 2708.26 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 5000 }, netSalary: 3133.57 },

  { input: { ...partTimeWorker, grossSalary: 1743.56 }, netSalary: 1743.56 },
  { input: { ...partTimeWorker, grossSalary: 1800 }, netSalary: 1796.6 },
  { input: { ...partTimeWorker, grossSalary: 1900 }, netSalary: 1823.85 },
  { input: { ...partTimeWorker, grossSalary: 2000 }, netSalary: 1836.56 },
  { input: { ...partTimeWorker, grossSalary: 2100 }, netSalary: 1851.6 },
  { input: { ...partTimeWorker, grossSalary: 2200 }, netSalary: 1867.68 },
  { input: { ...partTimeWorker, grossSalary: 2300 }, netSalary: 1884.24 },

  { input: { ...partTimeWorker, grossSalary: 2400 }, netSalary: 1908.44 },
  { input: { ...partTimeWorker, grossSalary: 2500 }, netSalary: 1932.57 },
  { input: { ...partTimeWorker, grossSalary: 2600 }, netSalary: 1956.76 },
  { input: { ...partTimeWorker, grossSalary: 2700 }, netSalary: 1980.9 },
  { input: { ...partTimeWorker, grossSalary: 2800 }, netSalary: 2028.65 },
  { input: { ...partTimeWorker, grossSalary: 2900 }, netSalary: 2076.59 },
  { input: { ...partTimeWorker, grossSalary: 3000 }, netSalary: 2124.52 },
  { input: { ...partTimeWorker, grossSalary: 3500 }, netSalary: 2357.20 },
  { input: { ...partTimeWorker, grossSalary: 4000 }, netSalary: 2566.64 },
  { input: { ...partTimeWorker, grossSalary: 4500 }, netSalary: 2783.35 },
  { input: { ...partTimeWorker, grossSalary: 5000 }, netSalary: 3000.06 },
  { input: { ...partTimeWorker, grossSalary: 5500 }, netSalary: 3212.61 },
  { input: { ...partTimeWorker, grossSalary: 6000 }, netSalary: 3411.20 },
  { input: { ...partTimeWorker, grossSalary: 6500 }, netSalary: 3610.89 },
  { input: { ...partTimeWorker, grossSalary: 7000 }, netSalary: 3810.57 },
  { input: { ...partTimeWorker, grossSalary: 7500 }, netSalary: 4010.25 },
  { input: { ...partTimeWorker, grossSalary: 8000 }, netSalary: 4209.93 },
  { input: { ...partTimeWorker, grossSalary: 8500 }, netSalary: 4409.61 },
  { input: { ...partTimeWorker, grossSalary: 9000 }, netSalary: 4609.3 },
  { input: { ...partTimeWorker, grossSalary: 10000 }, netSalary: 5008.66 },
  { input: { ...partTimeWorker, grossSalary: 11000 }, netSalary: 5408.02 },
  { input: { ...partTimeWorker, grossSalary: 12000 }, netSalary: 5807.38 },
  { input: { ...partTimeWorker, grossSalary: 13000 }, netSalary: 6206.74 },
  { input: { ...partTimeWorker, grossSalary: 14000 }, netSalary: 6606.11 },
  { input: { ...partTimeWorker, grossSalary: 15000 }, netSalary: 7005.47 },
  { input: { ...partTimeWorker, grossSalary: 16000 }, netSalary: 7404.83 },
  { input: { ...partTimeWorker, grossSalary: 17000 }, netSalary: 7804.2 },
  { input: { ...partTimeWorker, grossSalary: 18000 }, netSalary: 8203.56 },
  { input: { ...partTimeWorker, grossSalary: 19000 }, netSalary: 8602.92 },
  { input: { ...partTimeWorker, grossSalary: 20000 }, netSalary: 9002.28 },

  { input: { ...halfTimeEmployee, grossSalary: 1319.16 }, netSalary: 1217.33 },
  { input: { ...halfTimeEmployeeWithOneKid, grossSalary: 1319.16 }, netSalary: 1217.33 },
  { input: { ...employeeWithOneKid, grossSalary: 2100 }, netSalary: 2090.58 },
  { input: { ...employeeWithOneKid, grossSalary: 2328.33 }, netSalary: 2144.31 },
  { input: { ...employeeWithOneKid, grossSalary: 2500 }, netSalary: 2176.92 },
  { input: { ...employeeWithOneKid, grossSalary: 3000 }, netSalary: 2292.87 },
  { input: { ...employeeWithOneKid, grossSalary: 4029.16 }, netSalary: 2708.26 },
  { input: { ...employeeWithOneKid, grossSalary: 5000 }, netSalary: 3133.57 },

  { input: { ...employeeWithOneDisabledKid, grossSalary: 2100 }, netSalary: 2093.48 },
  { input: { ...employeeWithOneDisabledKid, grossSalary: 2328.33 }, netSalary: 2227.31 },
  { input: { ...employeeWithOneDisabledKid, grossSalary: 2500 }, netSalary: 2259.92 },
  { input: { ...employeeWithOneDisabledKid, grossSalary: 3000 }, netSalary: 2375.87 },
  { input: { ...employeeWithOneDisabledKid, grossSalary: 4029.16 }, netSalary: 2791.26 },
  { input: { ...employeeWithOneDisabledKid, grossSalary: 5000 }, netSalary: 3216.57 },

  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 2100 }, netSalary: 2093.48 },
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 2328.33 }, netSalary: 2236.99 },
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 2500 }, netSalary: 2338 },
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 3000 }, netSalary: 2599.87 },
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 4029.16 }, netSalary: 3015.26 },
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 5000 }, netSalary: 3440.57 },

  { input: { ...employeeWithFourKids, grossSalary: 2100 }, netSalary: 2093.48 },
  { input: { ...employeeWithFourKids, grossSalary: 3000 }, netSalary: 2639.32 },
  { input: { ...employeeWithFiveKids, grossSalary: 4000 }, netSalary: 3440.96 },
  { input: { ...employeeWithSixKids, grossSalary: 5000 }, netSalary: 4268.57 },
  { input: { ...employeeWithSevenKids, grossSalary: 6000 }, netSalary: 4964.81 },
  { input: { ...employeeWithEightKids, grossSalary: 7000 }, netSalary: 5682.6 },

  { input: { ...employeeWith100Kids, grossSalary: 2100 }, netSalary: 2093.48 },
  { input: { ...employeeWith100Kids, grossSalary: 2328.33 }, netSalary: 2236.99 },
  { input: { ...employeeWith100Kids, grossSalary: 2500 }, netSalary: 2338 },
  { input: { ...employeeWith100Kids, grossSalary: 3000 }, netSalary: 2639.32 },
  { input: { ...employeeWith100Kids, grossSalary: 4029.16 }, netSalary: 3465.32 },
  { input: { ...employeeWith100Kids, grossSalary: 5000 }, netSalary: 4296.99 },

  { input: { ...disabledEmployee, grossSalary: 2100 }, netSalary: 2039.58 },
  { input: { ...disabledEmployee, grossSalary: 2328.33 }, netSalary: 2093.31 },
  { input: { ...disabledEmployee, grossSalary: 2500 }, netSalary: 2125.92 },
  { input: { ...disabledEmployee, grossSalary: 3000 }, netSalary: 2241.87 },
  { input: { ...disabledEmployee, grossSalary: 4029.16 }, netSalary: 2657.26 },
  { input: { ...disabledEmployee, grossSalary: 5000 }, netSalary: 3082.57 },

  { input: { ...employeeWithGroupInsurance, grossSalary: 2100 }, netSalary: 1958.83 },
  { input: { ...employeeWithGroupInsurance, grossSalary: 2328.33 }, netSalary: 2012.56 },
  { input: { ...employeeWithGroupInsurance, grossSalary: 2500 }, netSalary: 2045.17 },
  { input: { ...employeeWithGroupInsurance, grossSalary: 3000 }, netSalary: 2161.12 },
  { input: { ...employeeWithGroupInsurance, grossSalary: 4029.16 }, netSalary: 2576.51 },
  { input: { ...employeeWithGroupInsurance, grossSalary: 5000 }, netSalary: 3001.82 },

  { input: { ...employeeWithOtherNetIncome, grossSalary: 2100 }, netSalary: 2088.58 },
  { input: { ...employeeWithOtherNetIncome, grossSalary: 2328.33 }, netSalary: 2142.31 },
  { input: { ...employeeWithOtherNetIncome, grossSalary: 2500 }, netSalary: 2174.92 },
  { input: { ...employeeWithOtherNetIncome, grossSalary: 3000 }, netSalary: 2290.87 },
  { input: { ...employeeWithOtherNetIncome, grossSalary: 4029.16 }, netSalary: 2706.26 },
  { input: { ...employeeWithOtherNetIncome, grossSalary: 5000 }, netSalary: 3131.57 },

  { input: { ...halfTimeWorker, grossSalary: 1319.16 }, netSalary: 1209.17 },
  { input: { ...halfTimeWorkerWithOneKid, grossSalary: 1319.16 }, netSalary: 1209.17 },
  { input: { ...workerWithOneKid, grossSalary: 2100 }, netSalary: 2070.03 },
  { input: { ...workerWithOneKid, grossSalary: 2328.33 }, netSalary: 2146.22 },
  { input: { ...workerWithOneKid, grossSalary: 2500 }, netSalary: 2173.6 },
  { input: { ...workerWithOneKid, grossSalary: 3000 }, netSalary: 2275.94 },
  { input: { ...workerWithOneKid, grossSalary: 4029.16 }, netSalary: 2681.27 },
  { input: { ...workerWithOneKid, grossSalary: 5000 }, netSalary: 3102.06 },

  { input: { ...workerWithOneDisabledKid, grossSalary: 2100 }, netSalary: 2070.03 },
  { input: { ...workerWithOneDisabledKid, grossSalary: 2328.33 }, netSalary: 2228.57 },
  { input: { ...workerWithOneDisabledKid, grossSalary: 2500 }, netSalary: 2256.6 },
  { input: { ...workerWithOneDisabledKid, grossSalary: 3000 }, netSalary: 2358.94 },
  { input: { ...workerWithOneDisabledKid, grossSalary: 4029.16 }, netSalary: 2764.27 },
  { input: { ...workerWithOneDisabledKid, grossSalary: 5000 }, netSalary: 3185.06 },

  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 2100 }, netSalary: 2070.03 },
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 2328.33 }, netSalary: 2228.57 },
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 2500 }, netSalary: 2323.93 },
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 3000 }, netSalary: 2582.94 },
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 4029.16 }, netSalary: 2988.27 },
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 5000 }, netSalary: 3409.06 },

  { input: { ...workerWith100Kids, grossSalary: 2100 }, netSalary: 2070.03 },
  { input: { ...workerWith100Kids, grossSalary: 2328.33 }, netSalary: 2228.57 },
  { input: { ...workerWith100Kids, grossSalary: 2500 }, netSalary: 2323.93 },
  { input: { ...workerWith100Kids, grossSalary: 3000 }, netSalary: 2609.35 },
  { input: { ...workerWith100Kids, grossSalary: 4029.16 }, netSalary: 3418.04 },
  { input: { ...workerWith100Kids, grossSalary: 5000 }, netSalary: 4240.31 },

  { input: { ...disabledWorker, grossSalary: 2100 }, netSalary: 2024.00 },
  { input: { ...disabledWorker, grossSalary: 2328.33 }, netSalary: 2095.22 },
  { input: { ...disabledWorker, grossSalary: 2500 }, netSalary: 2122.6 },
  { input: { ...disabledWorker, grossSalary: 3000 }, netSalary: 2224.94 },
  { input: { ...disabledWorker, grossSalary: 4029.16 }, netSalary: 2630.27 },
  { input: { ...disabledWorker, grossSalary: 5000 }, netSalary: 3051.06 },

  { input: { ...workerWithGroupInsurance, grossSalary: 2100 }, netSalary: 1943.25 },
  { input: { ...workerWithGroupInsurance, grossSalary: 2328.33 }, netSalary: 2014.47 },
  { input: { ...workerWithGroupInsurance, grossSalary: 2500 }, netSalary: 2041.85 },
  { input: { ...workerWithGroupInsurance, grossSalary: 3000 }, netSalary: 2144.19 },
  { input: { ...workerWithGroupInsurance, grossSalary: 4029.16 }, netSalary: 2549.52 },
  { input: { ...workerWithGroupInsurance, grossSalary: 5000 }, netSalary: 2970.31 },

  { input: { ...workerWithOtherNetIncome, grossSalary: 2100 }, netSalary: 2073.00 },
  { input: { ...workerWithOtherNetIncome, grossSalary: 2328.33 }, netSalary: 2144.22 },
  { input: { ...workerWithOtherNetIncome, grossSalary: 2500 }, netSalary: 2171.6 },
  { input: { ...workerWithOtherNetIncome, grossSalary: 3000 }, netSalary: 2273.94 },
  { input: { ...workerWithOtherNetIncome, grossSalary: 4029.16 }, netSalary: 2679.27 },
  { input: { ...workerWithOtherNetIncome, grossSalary: 5000 }, netSalary: 3100.06 },

  { input: { ...marriedWorkerOneIncome, grossSalary: 2100 }, netSalary: 2065.92 },
  { input: { ...marriedWorkerOneIncome, grossSalary: 2328.33 }, netSalary: 2224.46 },
  { input: { ...marriedWorkerOneIncome, grossSalary: 2500 }, netSalary: 2319.82 },
  { input: { ...marriedWorkerOneIncome, grossSalary: 3000 }, netSalary: 2515.71 },
  { input: { ...marriedWorkerOneIncome, grossSalary: 4029.16 }, netSalary: 2999.58 },
  { input: { ...marriedWorkerOneIncome, grossSalary: 5000 }, netSalary: 3487.24 },

  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 2100 }, netSalary: 2065.92 },
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 2328.33 }, netSalary: 2224.46 },
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 2500 }, netSalary: 2319.82 },
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 3000 }, netSalary: 2566.71 },
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 4029.16 }, netSalary: 3050.58 },
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 5000 }, netSalary: 3538.24 },

  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 2100 }, netSalary: 1788.27 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 2328.33 }, netSalary: 1981.66 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 2500 }, netSalary: 2127.06 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 3000 }, netSalary: 2463.66 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 4029.16 }, netSalary: 2999.58 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 5000 }, netSalary: 3487.24 },

  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 2000 }, netSalary: 1620.72 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 2100 }, netSalary: 1680.98 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 2328.33 }, netSalary: 1798.43 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 2500 }, netSalary: 1880.72 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 3000 }, netSalary: 2120.41 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 4029.16 }, netSalary: 2583.44 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 5000 }, netSalary: 3004.22 },

  { input: { ...marriedWorkerTwoIncomes, grossSalary: 2100 }, netSalary: 1968.89 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 2328.33 }, netSalary: 2040.11 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 2500 }, netSalary: 2067.49 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 3000 }, netSalary: 2169.83 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 4029.16 }, netSalary: 2583.44 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 5000 }, netSalary: 3004.22 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 6000 }, netSalary: 3420.50 },

  { input: { ...marriedWorkerPartnerLowPension, grossSalary: 4000 }, netSalary: 2853.3 },
  { input: { ...marriedWorkerPartnerLowOtherRevenue, grossSalary: 3000 }, netSalary: 2311.33 },

  { input: { ...divorcedWorkerWithOneKid, grossSalary: 2100 }, netSalary: 2070.03 },
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 2328.33 }, netSalary: 2146.22 },
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 2500 }, netSalary: 2173.6 },
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 3000 }, netSalary: 2275.94 },
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 4029.16 }, netSalary: 2681.27 },
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 5000 }, netSalary: 3102.06 },

  { input: { ...widowedWorkerWithOneKid, grossSalary: 2100 }, netSalary: 2070.03 },
  { input: { ...widowedWorkerWithOneKid, grossSalary: 2328.33 }, netSalary: 2146.22 },
  { input: { ...widowedWorkerWithOneKid, grossSalary: 2500 }, netSalary: 2173.6 },
  { input: { ...widowedWorkerWithOneKid, grossSalary: 3000 }, netSalary: 2275.94 },
  { input: { ...widowedWorkerWithOneKid, grossSalary: 4029.16 }, netSalary: 2681.27 },
  { input: { ...widowedWorkerWithOneKid, grossSalary: 5000 }, netSalary: 3102.06 },

  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 1319.16 }, netSalary: 1209.17 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 2100 }, netSalary: 1787.09 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 2328.33 }, netSalary: 1904.54 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 2500 }, netSalary: 1986.83 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 3000 }, netSalary: 2226.52 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 4029.16 }, netSalary: 2681.27 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 5000 }, netSalary: 3102.06 },

  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(2100) }, netSalary: 23862.94, netIncome: 26200.74 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(2328.33) }, netSalary: 24507.64, netIncome: 27017.59 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(2500) }, netSalary: 24899.08, netIncome: 27594.09 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(3000) }, netSalary: 26290.50, netIncome: 29206.89 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(4029.16) }, netSalary: 31275.16, netIncome: 34836.60 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(5000) }, netSalary: 36378.86, netIncome: 40444.22 },

  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(2100) }, netSalary: 23676.09, netIncome: 26013.89 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(2328.33) }, netSalary: 24530.67, netIncome: 27040.62 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(2500) }, netSalary: 24859.25, netIncome: 27554.26 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(3000) }, netSalary: 26087.31, netIncome: 29003.70 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(4029.16) }, netSalary: 30951.23, netIncome: 34512.67 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(5000) }, netSalary: 36000.78, netIncome: 40066.14 },
]
