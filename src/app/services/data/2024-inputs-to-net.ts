import { FamilySituation, SalaryCalculationInput, Status, WorkRegime } from "../tax-calculator.service";

interface Situation {
  input: SalaryCalculationInput;
  net: number;
};

export const simpleEmployee: SalaryCalculationInput = {
  revenueYear: 2024,
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
  monthlyGrossSalary: 0,
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


export const INPUTS_TO_NET: Situation[] = [
  { input: { ...simpleEmployee, monthlyGrossSalary: 2070.48 }, net: 1950.93 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2100 }, net: 1968.60 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2150 }, net: 1989.68 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2200 }, net: 1997.94 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2250 }, net: 2007.43 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2300 }, net: 2016.95 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2350 }, net: 2026.44 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2400 }, net: 2035.94 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2450 }, net: 2045.44 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2500 }, net: 2054.95 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2550 }, net: 2064.45 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2600 }, net: 2073.96 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2650 }, net: 2083.45 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2700 }, net: 2092.96 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2750 }, net: 2104.49 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2800 }, net: 2117.77 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2850 }, net: 2131.05 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2900 }, net: 2144.34 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2950 }, net: 2157.62 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 3000 }, net: 2170.90 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 3050 }, net: 2184.18 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 3100 }, net: 2197.47 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 3150 }, net: 2210.74 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 3200 }, net: 2224.02 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 3300 }, net: 2267.73 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 3400 }, net: 2311.70 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 3500 }, net: 2355.68 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 3600 }, net: 2399.65 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 3700 }, net: 2443.62 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 3800 }, net: 2486.16 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 3900 }, net: 2527.85 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 4000 }, net: 2569.54 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 4100 }, net: 2611.24 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 4200 }, net: 2655.22 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 4300 }, net: 2699.19 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 4400 }, net: 2743.17 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 4500 }, net: 2787.14 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 4600 }, net: 2831.11 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 4700 }, net: 2875.09 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 4800 }, net: 2919.06 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 4900 }, net: 2963.03 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 5000 }, net: 3007.01 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 5100 }, net: 3050.98 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 5200 }, net: 3094.31 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 5300 }, net: 3133.63 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 5400 }, net: 3172.95 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 5500 }, net: 3212.28 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 5600 }, net: 3251.6 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 5700 }, net: 3290.92 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 5800 }, net: 3330.24 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 5900 }, net: 3369.57 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 6000 }, net: 3408.89 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 6100 }, net: 3448.88 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 6200 }, net: 3489.3 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 6300 }, net: 3529.73 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 6400 }, net: 3570.15 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 6500 }, net: 3610.57 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 6600 }, net: 3650.99 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 6700 }, net: 3691.42 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 6800 }, net: 3731.84 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 6900 }, net: 3772.26 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 7000 }, net: 3812.68 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 7500 }, net: 4014.79 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 8000 }, net: 4216.91 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 8500 }, net: 4419.02 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 9000 }, net: 4621.13 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 9500 }, net: 4823.24 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 10000 }, net: 5025.36 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 11000 }, net: 5429.58 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 12000 }, net: 5833.81 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 13000 }, net: 6238.03 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 14000 }, net: 6642.25 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 15000 }, net: 7046.48 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 16000 }, net: 7450.7 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 17000 }, net: 7854.93 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 18000 }, net: 8259.15 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 19000 }, net: 8663.38 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 20000 }, net: 9067.6 },

  { input: { ...simpleWorker, monthlyGrossSalary: 2070.48 }, net: 1938.88 }, // Capped work bonus
  { input: { ...simpleWorker, monthlyGrossSalary: 2100 }, net: 1953.03 },    // Capped work bonus
  { input: { ...simpleWorker, monthlyGrossSalary: 2150 }, net: 1977 },       // Capped work bonus
  { input: { ...simpleWorker, monthlyGrossSalary: 2200 }, net: 2000.98 },    // Capped work bonus
  { input: { ...simpleWorker, monthlyGrossSalary: 2250 }, net: 2011.75 },
  { input: { ...simpleWorker, monthlyGrossSalary: 2300 }, net: 2019.74 },
  { input: { ...simpleWorker, monthlyGrossSalary: 2350 }, net: 2027.7 },
  { input: { ...simpleWorker, monthlyGrossSalary: 2400 }, net: 2035.68 },
  { input: { ...simpleWorker, monthlyGrossSalary: 2450 }, net: 2043.65 },
  { input: { ...simpleWorker, monthlyGrossSalary: 2500 }, net: 2051.63 },
  { input: { ...simpleWorker, monthlyGrossSalary: 2550 }, net: 2059.6 },
  { input: { ...simpleWorker, monthlyGrossSalary: 2600 }, net: 2067.57 },
  { input: { ...simpleWorker, monthlyGrossSalary: 2650 }, net: 2075.55 },
  { input: { ...simpleWorker, monthlyGrossSalary: 2700 }, net: 2083.54 },
  { input: { ...simpleWorker, monthlyGrossSalary: 2750 }, net: 2093.7 },
  { input: { ...simpleWorker, monthlyGrossSalary: 2800 }, net: 2105.75 },
  { input: { ...simpleWorker, monthlyGrossSalary: 2850 }, net: 2117.81 },
  { input: { ...simpleWorker, monthlyGrossSalary: 2900 }, net: 2129.86 },
  { input: { ...simpleWorker, monthlyGrossSalary: 2950 }, net: 2141.92 },
  { input: { ...simpleWorker, monthlyGrossSalary: 3000 }, net: 2153.97 },
  { input: { ...simpleWorker, monthlyGrossSalary: 3050 }, net: 2166.03 },
  { input: { ...simpleWorker, monthlyGrossSalary: 3100 }, net: 2178.08 },
  { input: { ...simpleWorker, monthlyGrossSalary: 3150 }, net: 2190.12 },
  { input: { ...simpleWorker, monthlyGrossSalary: 3200 }, net: 2202.18 },
  { input: { ...simpleWorker, monthlyGrossSalary: 3250 }, net: 2224.39 },
  { input: { ...simpleWorker, monthlyGrossSalary: 3300 }, net: 2246.94 },
  { input: { ...simpleWorker, monthlyGrossSalary: 3400 }, net: 2290.28 },
  { input: { ...simpleWorker, monthlyGrossSalary: 3500 }, net: 2332.64 },
  { input: { ...simpleWorker, monthlyGrossSalary: 3600 }, net: 2373.52 },
  { input: { ...simpleWorker, monthlyGrossSalary: 3700 }, net: 2414.4 },
  { input: { ...simpleWorker, monthlyGrossSalary: 3800 }, net: 2455.39 },
  { input: { ...simpleWorker, monthlyGrossSalary: 3900 }, net: 2498.73 },
  { input: { ...simpleWorker, monthlyGrossSalary: 4000 }, net: 2542.07 },
  { input: { ...simpleWorker, monthlyGrossSalary: 4100 }, net: 2585.41 },
  { input: { ...simpleWorker, monthlyGrossSalary: 4200 }, net: 2628.75 },
  { input: { ...simpleWorker, monthlyGrossSalary: 4300 }, net: 2672.1 },
  { input: { ...simpleWorker, monthlyGrossSalary: 4400 }, net: 2715.44 },
  { input: { ...simpleWorker, monthlyGrossSalary: 4500 }, net: 2758.78 },
  { input: { ...simpleWorker, monthlyGrossSalary: 4600 }, net: 2802.12 },
  { input: { ...simpleWorker, monthlyGrossSalary: 4700 }, net: 2845.47 },
  { input: { ...simpleWorker, monthlyGrossSalary: 4800 }, net: 2888.82 },
  { input: { ...simpleWorker, monthlyGrossSalary: 4900 }, net: 2932.16 },
  { input: { ...simpleWorker, monthlyGrossSalary: 5000 }, net: 2975.5 },
  { input: { ...simpleWorker, monthlyGrossSalary: 5100 }, net: 3018.84 },
  { input: { ...simpleWorker, monthlyGrossSalary: 5200 }, net: 3062.18 },
  { input: { ...simpleWorker, monthlyGrossSalary: 5300 }, net: 3103.2 },
  { input: { ...simpleWorker, monthlyGrossSalary: 5400 }, net: 3141.95 },
  { input: { ...simpleWorker, monthlyGrossSalary: 5500 }, net: 3180.69 },
  { input: { ...simpleWorker, monthlyGrossSalary: 5600 }, net: 3219.54 },
  { input: { ...simpleWorker, monthlyGrossSalary: 5700 }, net: 3259.48 },
  { input: { ...simpleWorker, monthlyGrossSalary: 5800 }, net: 3299.42 },
  { input: { ...simpleWorker, monthlyGrossSalary: 5900 }, net: 3339.35 },
  { input: { ...simpleWorker, monthlyGrossSalary: 6000 }, net: 3379.28 },
  { input: { ...simpleWorker, monthlyGrossSalary: 6100 }, net: 3419.22 },
  { input: { ...simpleWorker, monthlyGrossSalary: 6200 }, net: 3459.16 },
  { input: { ...simpleWorker, monthlyGrossSalary: 6300 }, net: 3499.1 },
  { input: { ...simpleWorker, monthlyGrossSalary: 6400 }, net: 3539.03 },
  { input: { ...simpleWorker, monthlyGrossSalary: 6500 }, net: 3578.97 },
  { input: { ...simpleWorker, monthlyGrossSalary: 6600 }, net: 3618.9 },
  { input: { ...simpleWorker, monthlyGrossSalary: 6700 }, net: 3658.84 },
  { input: { ...simpleWorker, monthlyGrossSalary: 6800 }, net: 3698.78 },
  { input: { ...simpleWorker, monthlyGrossSalary: 6900 }, net: 3738.71 },
  { input: { ...simpleWorker, monthlyGrossSalary: 7000 }, net: 3778.65 },
  { input: { ...simpleWorker, monthlyGrossSalary: 7500 }, net: 3978.33 },
  { input: { ...simpleWorker, monthlyGrossSalary: 8000 }, net: 4178.01 },
  { input: { ...simpleWorker, monthlyGrossSalary: 8500 }, net: 4377.69 },
  { input: { ...simpleWorker, monthlyGrossSalary: 9000 }, net: 4577.38 },
  { input: { ...simpleWorker, monthlyGrossSalary: 9500 }, net: 4777.06 },
  { input: { ...simpleWorker, monthlyGrossSalary: 10000 }, net: 4976.74 },
  { input: { ...simpleWorker, monthlyGrossSalary: 11000 }, net: 5376.1 },
  { input: { ...simpleWorker, monthlyGrossSalary: 12000 }, net: 5775.46 },
  { input: { ...simpleWorker, monthlyGrossSalary: 13000 }, net: 6174.82 },
  { input: { ...simpleWorker, monthlyGrossSalary: 14000 }, net: 6574.19 },
  { input: { ...simpleWorker, monthlyGrossSalary: 15000 }, net: 6973.55 },
  { input: { ...simpleWorker, monthlyGrossSalary: 16000 }, net: 7372.91 },
  { input: { ...simpleWorker, monthlyGrossSalary: 17000 }, net: 7772.27 },
  { input: { ...simpleWorker, monthlyGrossSalary: 18000 }, net: 8171.63 },
  { input: { ...simpleWorker, monthlyGrossSalary: 19000 }, net: 8571.0 },
  { input: { ...simpleWorker, monthlyGrossSalary: 20000 }, net: 8970.36 },

  { input: { ...partTimeEmployee, monthlyGrossSalary: 1743.56 }, net: 1741.64 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 1800 }, net: 1782.90 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 1900 }, net: 1803.27 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 2000 }, net: 1821.20 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 2100 }, net: 1837.11 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 2200 }, net: 1853.42 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 2300 }, net: 1872.98 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 2400 }, net: 1899.63 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 2500 }, net: 1926.22 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 2600 }, net: 1952.87 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 2700 }, net: 1979.45 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 2800 }, net: 2027.89 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 2900 }, net: 2076.51 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 3000 }, net: 2125.13 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 3100 }, net: 2173.76 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 3200 }, net: 2222.38 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 3300 }, net: 2267.73 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 3400 }, net: 2311.7 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 3500 }, net: 2355.68 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 4000 }, net: 2569.54 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 4500 }, net: 2787.14 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 5000 }, net: 3007.01 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 5500 }, net: 3212.28 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 6000 }, net: 3408.89 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 6500 }, net: 3610.57 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 7000 }, net: 3812.68 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 7500 }, net: 4014.79 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 8000 }, net: 4216.91 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 8500 }, net: 4419.02 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 9000 }, net: 4621.13 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 9500 }, net: 4823.24 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 10000 }, net: 5025.36 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 11000 }, net: 5429.58 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 12000 }, net: 5833.81 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 13000 }, net: 6238.03 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 14000 }, net: 6642.25 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 15000 }, net: 7046.48 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 16000 }, net: 7450.7 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 17000 }, net: 7854.93 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 18000 }, net: 8259.15 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 19000 }, net: 8663.38 },
  { input: { ...partTimeEmployee, monthlyGrossSalary: 20000 }, net: 9067.6 },

  { input: { ...marriedEmployeeOneIncome, monthlyGrossSalary: 2100 }, net: 2090.88 },
  { input: { ...marriedEmployeeOneIncome, monthlyGrossSalary: 2328.33 }, net: 2232.88 },
  { input: { ...marriedEmployeeOneIncome, monthlyGrossSalary: 2500 }, net: 2333.89 },
  { input: { ...marriedEmployeeOneIncome, monthlyGrossSalary: 3000 }, net: 2507.57 },
  { input: { ...marriedEmployeeOneIncome, monthlyGrossSalary: 4029.16 }, net: 3002.86 },
  { input: { ...marriedEmployeeOneIncome, monthlyGrossSalary: 5000 }, net: 3479.92 },

  { input: { ...marriedEmployeeWithDisabledPartner, monthlyGrossSalary: 2100 }, net: 2090.88 },
  { input: { ...marriedEmployeeWithDisabledPartner, monthlyGrossSalary: 2328.33 }, net: 2232.88 },
  { input: { ...marriedEmployeeWithDisabledPartner, monthlyGrossSalary: 2500 }, net: 2333.89 },
  { input: { ...marriedEmployeeWithDisabledPartner, monthlyGrossSalary: 3000 }, net: 2556.57 },
  { input: { ...marriedEmployeeWithDisabledPartner, monthlyGrossSalary: 4029.16 }, net: 3051.86 },
  { input: { ...marriedEmployeeWithDisabledPartner, monthlyGrossSalary: 5000 }, net: 3528.92 },

  { input: { ...marriedHalfTimeEmployeeOneIncome, monthlyGrossSalary: 1319.16 }, net: 1217.33 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, monthlyGrossSalary: 2100 }, net: 1816.41 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, monthlyGrossSalary: 2328.33 }, net: 2008.06 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, monthlyGrossSalary: 2500 }, net: 2155.40 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, monthlyGrossSalary: 3000 }, net: 2459.37 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, monthlyGrossSalary: 4029.16 }, net: 3002.86 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, monthlyGrossSalary: 5000 }, net: 3479.92 },

  { input: { ...marriedEmployeeTwoIncomes, monthlyGrossSalary: 2328.33 }, net: 2018.22 },
  { input: { ...marriedEmployeeTwoIncomes, monthlyGrossSalary: 2500 }, net: 2050.84 },
  { input: { ...marriedEmployeeTwoIncomes, monthlyGrossSalary: 3000 }, net: 2166.79 },
  { input: { ...marriedEmployeeTwoIncomes, monthlyGrossSalary: 4029.16 }, net: 2584.26 },
  { input: { ...marriedEmployeeTwoIncomes, monthlyGrossSalary: 5000 }, net: 3011.17 },

  { input: { ...marriedHalfTimeEmployeeTwoIncomes, monthlyGrossSalary: 1319.16 }, net: 1212.18 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, monthlyGrossSalary: 2000 }, net: 1632.40 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, monthlyGrossSalary: 2100 }, net: 1687.74 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, monthlyGrossSalary: 2328.33 }, net: 1794.43 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, monthlyGrossSalary: 2500 }, net: 1877.90 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, monthlyGrossSalary: 3000 }, net: 2121.02 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, monthlyGrossSalary: 4029.16 }, net: 2584.26 },

  { input: { ...divorcedEmployeeWithOneKid, monthlyGrossSalary: 2100 }, net: 2066.60 },
  { input: { ...divorcedEmployeeWithOneKid, monthlyGrossSalary: 2328.33 }, net: 2120.33 },
  { input: { ...divorcedEmployeeWithOneKid, monthlyGrossSalary: 2500 }, net: 2152.95 },
  { input: { ...divorcedEmployeeWithOneKid, monthlyGrossSalary: 3000 }, net: 2268.90 },
  { input: { ...divorcedEmployeeWithOneKid, monthlyGrossSalary: 4029.16 }, net: 2679.70 },
  { input: { ...divorcedEmployeeWithOneKid, monthlyGrossSalary: 5000 }, net: 3105.01 },

  { input: { ...widowedEmployeeWithOneKid, monthlyGrossSalary: 2100 }, net: 2066.60 },
  { input: { ...widowedEmployeeWithOneKid, monthlyGrossSalary: 2328.33 }, net: 2120.33 },
  { input: { ...widowedEmployeeWithOneKid, monthlyGrossSalary: 2500 }, net: 2152.95 },
  { input: { ...widowedEmployeeWithOneKid, monthlyGrossSalary: 3000 }, net: 2268.90 },
  { input: { ...widowedEmployeeWithOneKid, monthlyGrossSalary: 4029.16 }, net: 2679.70 },
  { input: { ...widowedEmployeeWithOneKid, monthlyGrossSalary: 5000 }, net: 3105.01 },

  { input: { ...widowedHalfTimeEmployeeWithOneKid, monthlyGrossSalary: 1319.16 }, net: 1217.33 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, monthlyGrossSalary: 2100 }, net: 1788.34 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, monthlyGrossSalary: 2328.33 }, net: 1896.54 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, monthlyGrossSalary: 2500 }, net: 1980.01 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, monthlyGrossSalary: 3000 }, net: 2223.13 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, monthlyGrossSalary: 4029.16 }, net: 2679.70 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, monthlyGrossSalary: 5000 }, net: 3105.01 },

  { input: { ...partTimeWorker, monthlyGrossSalary: 1743.56 }, net: 1743.56 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 1800 }, net: 1790.93 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 1900 }, net: 1803.88 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 2000 }, net: 1816.59 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 2100 }, net: 1831.63 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 2200 }, net: 1847.71 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 2300 }, net: 1864.26 },

  { input: { ...partTimeWorker, monthlyGrossSalary: 2400 }, net: 1888.46 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 2500 }, net: 1912.60 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 2600 }, net: 1936.79 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 2700 }, net: 1960.93 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 2800 }, net: 2008.68 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 2900 }, net: 2056.62 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 3000 }, net: 2104.55 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 3500 }, net: 2332.64 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 4000 }, net: 2542.07 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 4500 }, net: 2758.78 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 5000 }, net: 2975.5 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 5500 }, net: 3180.69 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 6000 }, net: 3379.28 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 6500 }, net: 3578.97 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 7000 }, net: 3778.65 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 7500 }, net: 3978.33 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 8000 }, net: 4178.01 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 8500 }, net: 4377.69 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 9000 }, net: 4577.38 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 10000 }, net: 4976.74 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 11000 }, net: 5376.1 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 12000 }, net: 5775.46 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 13000 }, net: 6174.82 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 14000 }, net: 6574.19 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 15000 }, net: 6973.55 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 16000 }, net: 7372.91 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 17000 }, net: 7772.27 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 18000 }, net: 8171.63 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 19000 }, net: 8571.0 },
  { input: { ...partTimeWorker, monthlyGrossSalary: 20000 }, net: 8970.36 },

  { input: { ...halfTimeEmployee, monthlyGrossSalary: 1319.16 }, net: 1217.33 },           // Withholding tier 1
  { input: { ...halfTimeEmployeeWithOneKid, monthlyGrossSalary: 1319.16 }, net: 1217.33 }, // Withholding tier 1
  { input: { ...employeeWithOneKid, monthlyGrossSalary: 2100 }, net: 2066.60 },            // Work bonus
  { input: { ...employeeWithOneKid, monthlyGrossSalary: 2328.33 }, net: 2120.33 },         // Withholding tier 2
  { input: { ...employeeWithOneKid, monthlyGrossSalary: 2500 }, net: 2152.95 },            // Work bonus
  { input: { ...employeeWithOneKid, monthlyGrossSalary: 3000 }, net: 2268.90 },            // Work bonus
  { input: { ...employeeWithOneKid, monthlyGrossSalary: 4029.16 }, net: 2679.70 },         // Withholding tier 3
  { input: { ...employeeWithOneKid, monthlyGrossSalary: 5000 }, net: 3105.01 },            // Withholding tier 4

  { input: { ...employeeWithOneDisabledKid, monthlyGrossSalary: 2100 }, net: 2093.48 },    // Work bonus
  { input: { ...employeeWithOneDisabledKid, monthlyGrossSalary: 2328.33 }, net: 2202.33 }, // Withholding tier 2
  { input: { ...employeeWithOneDisabledKid, monthlyGrossSalary: 2500 }, net: 2234.95 },    // Work bonus
  { input: { ...employeeWithOneDisabledKid, monthlyGrossSalary: 3000 }, net: 2350.90 },    // Work bonus
  { input: { ...employeeWithOneDisabledKid, monthlyGrossSalary: 4029.16 }, net: 2761.70 }, // Withholding tier 3
  { input: { ...employeeWithOneDisabledKid, monthlyGrossSalary: 5000 }, net: 3187.01 },    // Withholding tier 4

  { input: { ...employeeWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 2100 }, net: 2093.48 },    // Work bonus
  { input: { ...employeeWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 2328.33 }, net: 2236.99 }, // Withholding tier 2
  { input: { ...employeeWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 2500 }, net: 2338.00 },    // Work bonus
  { input: { ...employeeWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 3000 }, net: 2566.90 },    // Work bonus
  { input: { ...employeeWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 4029.16 }, net: 2977.70 }, // Withholding tier 3
  { input: { ...employeeWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 5000 }, net: 3403.01 },    // Withholding tier 4

  { input: { ...employeeWithFourKids, monthlyGrossSalary: 2100 }, net: 2093.48 },
  { input: { ...employeeWithFourKids, monthlyGrossSalary: 3000 }, net: 2639.32 },
  { input: { ...employeeWithFiveKids, monthlyGrossSalary: 4000 }, net: 3440.96 },
  { input: { ...employeeWithSixKids, monthlyGrossSalary: 5000 }, net: 4207.01 },
  { input: { ...employeeWithSevenKids, monthlyGrossSalary: 6000 }, net: 4886.89 },
  { input: { ...employeeWithEightKids, monthlyGrossSalary: 7000 }, net: 5595.68 },

  { input: { ...employeeWith100Kids, monthlyGrossSalary: 2100 }, net: 2093.48 },    // Work bonus
  { input: { ...employeeWith100Kids, monthlyGrossSalary: 2328.33 }, net: 2236.99 }, // Withholding tier 2
  { input: { ...employeeWith100Kids, monthlyGrossSalary: 2500 }, net: 2338.00 },    // Work bonus
  { input: { ...employeeWith100Kids, monthlyGrossSalary: 3000 }, net: 2639.32 },    // Work bonus
  { input: { ...employeeWith100Kids, monthlyGrossSalary: 4029.16 }, net: 3465.32 }, // Withholding tier 3
  { input: { ...employeeWith100Kids, monthlyGrossSalary: 5000 }, net: 4296.99 },    // Withholding tier 4

  { input: { ...disabledEmployee, monthlyGrossSalary: 2100 }, net: 2017.60 },    // Work bonus
  { input: { ...disabledEmployee, monthlyGrossSalary: 2328.33 }, net: 2071.33 }, // Withholding tier 2
  { input: { ...disabledEmployee, monthlyGrossSalary: 2500 }, net: 2103.95 },    // Work bonus
  { input: { ...disabledEmployee, monthlyGrossSalary: 3000 }, net: 2219.90 },    // Work bonus
  { input: { ...disabledEmployee, monthlyGrossSalary: 4029.16 }, net: 2630.70 }, // Withholding tier 3
  { input: { ...disabledEmployee, monthlyGrossSalary: 5000 }, net: 3056.01 },    // Withholding tier 4

  { input: { ...employeeWithGroupInsurance, monthlyGrossSalary: 2100 }, net: 1938.85 },    // Work bonus
  { input: { ...employeeWithGroupInsurance, monthlyGrossSalary: 2328.33 }, net: 1992.58 }, // Withholding tier 2
  { input: { ...employeeWithGroupInsurance, monthlyGrossSalary: 2500 }, net: 2025.20 },    // Work bonus
  { input: { ...employeeWithGroupInsurance, monthlyGrossSalary: 3000 }, net: 2141.15 },    // Work bonus
  { input: { ...employeeWithGroupInsurance, monthlyGrossSalary: 4029.16 }, net: 2551.95 }, // Withholding tier 3
  { input: { ...employeeWithGroupInsurance, monthlyGrossSalary: 5000 }, net: 2977.26 },    // Withholding tier 4

  { input: { ...employeeWithOtherNetIncome, monthlyGrossSalary: 2100 }, net: 2068.60 },    // Work bonus
  { input: { ...employeeWithOtherNetIncome, monthlyGrossSalary: 2328.33 }, net: 2122.33 }, // Withholding tier 2
  { input: { ...employeeWithOtherNetIncome, monthlyGrossSalary: 2500 }, net: 2154.95 },    // Work bonus
  { input: { ...employeeWithOtherNetIncome, monthlyGrossSalary: 3000 }, net: 2270.90 },    // Work bonus
  { input: { ...employeeWithOtherNetIncome, monthlyGrossSalary: 4029.16 }, net: 2681.70 }, // Withholding tier 3
  { input: { ...employeeWithOtherNetIncome, monthlyGrossSalary: 5000 }, net: 3107.01 },    // Withholding tier 4

  { input: { ...halfTimeWorker, monthlyGrossSalary: 1319.16 }, net: 1209.17 },           // Withholding tier 1
  { input: { ...halfTimeWorkerWithOneKid, monthlyGrossSalary: 1319.16 }, net: 1209.17 }, // Withholding tier 1
  { input: { ...workerWithOneKid, monthlyGrossSalary: 2100 }, net: 2051.03 },            // Work bonus
  { input: { ...workerWithOneKid, monthlyGrossSalary: 2328.33 }, net: 2122.25 },         // Withholding tier 2
  { input: { ...workerWithOneKid, monthlyGrossSalary: 2500 }, net: 2149.63 },            // Work bonus
  { input: { ...workerWithOneKid, monthlyGrossSalary: 3000 }, net: 2251.97 },            // Work bonus
  { input: { ...workerWithOneKid, monthlyGrossSalary: 4029.16 }, net: 2652.70 },         // Withholding tier 3
  { input: { ...workerWithOneKid, monthlyGrossSalary: 5000 }, net: 3073.50 },            // Withholding tier 4

  { input: { ...workerWithOneDisabledKid, monthlyGrossSalary: 2100 }, net: 2070.03 },    // Work bonus
  { input: { ...workerWithOneDisabledKid, monthlyGrossSalary: 2328.33 }, net: 2204.25 }, // Withholding tier 2
  { input: { ...workerWithOneDisabledKid, monthlyGrossSalary: 2500 }, net: 2231.63 },    // Work bonus
  { input: { ...workerWithOneDisabledKid, monthlyGrossSalary: 3000 }, net: 2333.97 },    // Work bonus
  { input: { ...workerWithOneDisabledKid, monthlyGrossSalary: 4029.16 }, net: 2734.70 }, // Withholding tier 3
  { input: { ...workerWithOneDisabledKid, monthlyGrossSalary: 5000 }, net: 3155.50 },    // Withholding tier 4

  { input: { ...workerWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 2100 }, net: 2070.03 },    // Work bonus
  { input: { ...workerWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 2328.33 }, net: 2228.57 }, // Withholding tier 2
  { input: { ...workerWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 2500 }, net: 2323.93 },    // Work bonus
  { input: { ...workerWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 3000 }, net: 2549.97 },    // Work bonus
  { input: { ...workerWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 4029.16 }, net: 2950.70 }, // Withholding tier 3
  { input: { ...workerWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 5000 }, net: 3371.50 },    // Withholding tier 4

  { input: { ...workerWith100Kids, monthlyGrossSalary: 2100 }, net: 2070.03 },    // Work bonus
  { input: { ...workerWith100Kids, monthlyGrossSalary: 2328.33 }, net: 2228.57 }, // Withholding tier 2
  { input: { ...workerWith100Kids, monthlyGrossSalary: 2500 }, net: 2323.93 },    // Work bonus
  { input: { ...workerWith100Kids, monthlyGrossSalary: 3000 }, net: 2609.35 },    // Work bonus
  { input: { ...workerWith100Kids, monthlyGrossSalary: 4029.16 }, net: 3418.04 }, // Withholding tier 3
  { input: { ...workerWith100Kids, monthlyGrossSalary: 5000 }, net: 4240.31 },    // Withholding tier 4

  { input: { ...disabledWorker, monthlyGrossSalary: 2100 }, net: 2002.03 },    // Work bonus
  { input: { ...disabledWorker, monthlyGrossSalary: 2328.33 }, net: 2073.25 }, // Withholding tier 2
  { input: { ...disabledWorker, monthlyGrossSalary: 2500 }, net: 2100.63 },    // Work bonus
  { input: { ...disabledWorker, monthlyGrossSalary: 3000 }, net: 2202.97 },    // Work bonus
  { input: { ...disabledWorker, monthlyGrossSalary: 4029.16 }, net: 2603.70 }, // Withholding tier 3
  { input: { ...disabledWorker, monthlyGrossSalary: 5000 }, net: 3024.50 },    // Withholding tier 4

  { input: { ...workerWithGroupInsurance, monthlyGrossSalary: 2100 }, net: 1923.28 },    // Work bonus
  { input: { ...workerWithGroupInsurance, monthlyGrossSalary: 2328.33 }, net: 1994.50 }, // Withholding tier 2
  { input: { ...workerWithGroupInsurance, monthlyGrossSalary: 2500 }, net: 2021.88 },    // Work bonus
  { input: { ...workerWithGroupInsurance, monthlyGrossSalary: 3000 }, net: 2124.22 },    // Work bonus
  { input: { ...workerWithGroupInsurance, monthlyGrossSalary: 4029.16 }, net: 2524.95 }, // Withholding tier 3
  { input: { ...workerWithGroupInsurance, monthlyGrossSalary: 5000 }, net: 2945.75 },    // Withholding tier 4

  { input: { ...workerWithOtherNetIncome, monthlyGrossSalary: 2100 }, net: 2053.03 },    // Work bonus
  { input: { ...workerWithOtherNetIncome, monthlyGrossSalary: 2328.33 }, net: 2124.25 }, // Withholding tier 2
  { input: { ...workerWithOtherNetIncome, monthlyGrossSalary: 2500 }, net: 2151.63 },    // Work bonus
  { input: { ...workerWithOtherNetIncome, monthlyGrossSalary: 3000 }, net: 2253.97 },    // Work bonus
  { input: { ...workerWithOtherNetIncome, monthlyGrossSalary: 4029.16 }, net: 2654.70 }, // Withholding tier 3
  { input: { ...workerWithOtherNetIncome, monthlyGrossSalary: 5000 }, net: 3075.50 },    // Withholding tier 4

  { input: { ...marriedWorkerOneIncome, monthlyGrossSalary: 2100 }, net: 2065.92 },    // Capped work bonus
  { input: { ...marriedWorkerOneIncome, monthlyGrossSalary: 2328.33 }, net: 2224.46 },
  { input: { ...marriedWorkerOneIncome, monthlyGrossSalary: 2500 }, net: 2319.82 },
  { input: { ...marriedWorkerOneIncome, monthlyGrossSalary: 3000 }, net: 2489.33 },
  { input: { ...marriedWorkerOneIncome, monthlyGrossSalary: 4029.16 }, net: 2973.20 },
  { input: { ...marriedWorkerOneIncome, monthlyGrossSalary: 5000 }, net: 3448.41 },

  { input: { ...marriedWorkerWithDisabledPartner, monthlyGrossSalary: 2100 }, net: 2065.92 },    // Capped work bonus
  { input: { ...marriedWorkerWithDisabledPartner, monthlyGrossSalary: 2328.33 }, net: 2224.46 },
  { input: { ...marriedWorkerWithDisabledPartner, monthlyGrossSalary: 2500 }, net: 2319.82 },
  { input: { ...marriedWorkerWithDisabledPartner, monthlyGrossSalary: 3000 }, net: 2538.33 },
  { input: { ...marriedWorkerWithDisabledPartner, monthlyGrossSalary: 4029.16 }, net: 3022.20 },
  { input: { ...marriedWorkerWithDisabledPartner, monthlyGrossSalary: 5000 }, net: 3497.41 },

  { input: { ...marriedHalfTimeWorkerOneIncome, monthlyGrossSalary: 2100 }, net: 1788.27 },
  { input: { ...marriedHalfTimeWorkerOneIncome, monthlyGrossSalary: 2328.33 }, net: 1981.66 },
  { input: { ...marriedHalfTimeWorkerOneIncome, monthlyGrossSalary: 2500 }, net: 2127.06 },
  { input: { ...marriedHalfTimeWorkerOneIncome, monthlyGrossSalary: 3000 }, net: 2437.27 },
  { input: { ...marriedHalfTimeWorkerOneIncome, monthlyGrossSalary: 4029.16 }, net: 2973.20 },
  { input: { ...marriedHalfTimeWorkerOneIncome, monthlyGrossSalary: 5000 }, net: 3448.41 },

  { input: { ...marriedHalfTimeWorkerTwoIncomes, monthlyGrossSalary: 2000 }, net: 1609.57 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, monthlyGrossSalary: 2100 }, net: 1669.00 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, monthlyGrossSalary: 2328.33 }, net: 1778.46 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, monthlyGrossSalary: 2500 }, net: 1860.75 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, monthlyGrossSalary: 3000 }, net: 2100.44 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, monthlyGrossSalary: 4029.16 }, net: 2558.87 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, monthlyGrossSalary: 5000 }, net: 2979.66 },

  { input: { ...marriedWorkerTwoIncomes, monthlyGrossSalary: 2100 }, net: 1948.92 },    // Capped work bonus
  { input: { ...marriedWorkerTwoIncomes, monthlyGrossSalary: 2328.33 }, net: 2020.14 },
  { input: { ...marriedWorkerTwoIncomes, monthlyGrossSalary: 2500 }, net: 2047.52 },
  { input: { ...marriedWorkerTwoIncomes, monthlyGrossSalary: 3000 }, net: 2149.86 },
  { input: { ...marriedWorkerTwoIncomes, monthlyGrossSalary: 4029.16 }, net: 2558.87 },
  { input: { ...marriedWorkerTwoIncomes, monthlyGrossSalary: 5000 }, net: 2979.66 },
  { input: { ...marriedWorkerTwoIncomes, monthlyGrossSalary: 6000 }, net: 3388.58 },

  { input: { ...marriedWorkerPartnerLowPension, monthlyGrossSalary: 4000 }, net: 2820.23 },
  { input: { ...marriedWorkerPartnerLowOtherRevenue, monthlyGrossSalary: 3000 }, net: 2287.36 },

  { input: { ...divorcedWorkerWithOneKid, monthlyGrossSalary: 2100 }, net: 2051.03 },            // Work bonus
  { input: { ...divorcedWorkerWithOneKid, monthlyGrossSalary: 2328.33 }, net: 2122.25 },         // Withholding tier 2
  { input: { ...divorcedWorkerWithOneKid, monthlyGrossSalary: 2500 }, net: 2149.63 },            // Work bonus
  { input: { ...divorcedWorkerWithOneKid, monthlyGrossSalary: 3000 }, net: 2251.97 },            // Work bonus
  { input: { ...divorcedWorkerWithOneKid, monthlyGrossSalary: 4029.16 }, net: 2652.70 },         // Withholding tier 3
  { input: { ...divorcedWorkerWithOneKid, monthlyGrossSalary: 5000 }, net: 3073.50 },            // Withholding tier 4

  { input: { ...widowedWorkerWithOneKid, monthlyGrossSalary: 2100 }, net: 2051.03 },            // Work bonus
  { input: { ...widowedWorkerWithOneKid, monthlyGrossSalary: 2328.33 }, net: 2122.25 },         // Withholding tier 2
  { input: { ...widowedWorkerWithOneKid, monthlyGrossSalary: 2500 }, net: 2149.63 },            // Work bonus
  { input: { ...widowedWorkerWithOneKid, monthlyGrossSalary: 3000 }, net: 2251.97 },            // Work bonus
  { input: { ...widowedWorkerWithOneKid, monthlyGrossSalary: 4029.16 }, net: 2652.70 },         // Withholding tier 3
  { input: { ...widowedWorkerWithOneKid, monthlyGrossSalary: 5000 }, net: 3073.50 },            // Withholding tier 4

  { input: { ...widowedHalfTimeWorkerWithOneKid, monthlyGrossSalary: 1319.16 }, net: 1209.17 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, monthlyGrossSalary: 2100 }, net: 1771.11 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, monthlyGrossSalary: 2328.33 }, net: 1880.57 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, monthlyGrossSalary: 2500 }, net: 1962.86 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, monthlyGrossSalary: 3000 }, net: 2202.55 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, monthlyGrossSalary: 4029.16 }, net: 2652.70 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, monthlyGrossSalary: 5000 }, net: 3073.50 },
]
