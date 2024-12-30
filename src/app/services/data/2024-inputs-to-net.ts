import { FamilySituation, SalaryCalculationInput, Status, TaxationPeriod, WorkRegime, YearlySalaryCalculationInput } from "../tax-calculator.service";
import { Situation } from "./interfaces";
import { getMonthlyIncomes } from "./utils";


export const simpleEmployee: SalaryCalculationInput = {
  period: TaxationPeriod.Monthly,
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
  { input: { ...simpleEmployee, grossSalary: 2070.48 }, netSalary: 1950.93 },
  { input: { ...simpleEmployee, grossSalary: 2100 }, netSalary: 1968.60 },
  { input: { ...simpleEmployee, grossSalary: 2150 }, netSalary: 1989.68 },
  { input: { ...simpleEmployee, grossSalary: 2200 }, netSalary: 1997.94 },
  { input: { ...simpleEmployee, grossSalary: 2250 }, netSalary: 2007.43 },
  { input: { ...simpleEmployee, grossSalary: 2300 }, netSalary: 2016.95 },
  { input: { ...simpleEmployee, grossSalary: 2350 }, netSalary: 2026.44 },
  { input: { ...simpleEmployee, grossSalary: 2400 }, netSalary: 2035.94 },
  { input: { ...simpleEmployee, grossSalary: 2450 }, netSalary: 2045.44 },
  { input: { ...simpleEmployee, grossSalary: 2500 }, netSalary: 2054.95 },
  { input: { ...simpleEmployee, grossSalary: 2550 }, netSalary: 2064.45 },
  { input: { ...simpleEmployee, grossSalary: 2600 }, netSalary: 2073.96 },
  { input: { ...simpleEmployee, grossSalary: 2650 }, netSalary: 2083.45 },
  { input: { ...simpleEmployee, grossSalary: 2700 }, netSalary: 2092.96 },
  { input: { ...simpleEmployee, grossSalary: 2750 }, netSalary: 2104.49 },
  { input: { ...simpleEmployee, grossSalary: 2800 }, netSalary: 2117.77 },
  { input: { ...simpleEmployee, grossSalary: 2850 }, netSalary: 2131.05 },
  { input: { ...simpleEmployee, grossSalary: 2900 }, netSalary: 2144.34 },
  { input: { ...simpleEmployee, grossSalary: 2950 }, netSalary: 2157.62 },
  { input: { ...simpleEmployee, grossSalary: 3000 }, netSalary: 2170.90 },
  { input: { ...simpleEmployee, grossSalary: 3050 }, netSalary: 2184.18 },
  { input: { ...simpleEmployee, grossSalary: 3100 }, netSalary: 2197.47 },
  { input: { ...simpleEmployee, grossSalary: 3150 }, netSalary: 2210.74 },
  { input: { ...simpleEmployee, grossSalary: 3200 }, netSalary: 2224.02 },
  { input: { ...simpleEmployee, grossSalary: 3300 }, netSalary: 2267.73 },
  { input: { ...simpleEmployee, grossSalary: 3400 }, netSalary: 2311.70 },
  { input: { ...simpleEmployee, grossSalary: 3500 }, netSalary: 2355.68 },
  { input: { ...simpleEmployee, grossSalary: 3600 }, netSalary: 2399.65 },
  { input: { ...simpleEmployee, grossSalary: 3700 }, netSalary: 2443.62 },
  { input: { ...simpleEmployee, grossSalary: 3800 }, netSalary: 2486.16 },
  { input: { ...simpleEmployee, grossSalary: 3900 }, netSalary: 2527.85 },
  { input: { ...simpleEmployee, grossSalary: 4000 }, netSalary: 2569.54 },
  { input: { ...simpleEmployee, grossSalary: 4100 }, netSalary: 2611.24 },
  { input: { ...simpleEmployee, grossSalary: 4200 }, netSalary: 2655.22 },
  { input: { ...simpleEmployee, grossSalary: 4300 }, netSalary: 2699.19 },
  { input: { ...simpleEmployee, grossSalary: 4400 }, netSalary: 2743.17 },
  { input: { ...simpleEmployee, grossSalary: 4500 }, netSalary: 2787.14 },
  { input: { ...simpleEmployee, grossSalary: 4600 }, netSalary: 2831.11 },
  { input: { ...simpleEmployee, grossSalary: 4700 }, netSalary: 2875.09 },
  { input: { ...simpleEmployee, grossSalary: 4800 }, netSalary: 2919.06 },
  { input: { ...simpleEmployee, grossSalary: 4900 }, netSalary: 2963.03 },
  { input: { ...simpleEmployee, grossSalary: 5000 }, netSalary: 3007.01 },
  { input: { ...simpleEmployee, grossSalary: 5100 }, netSalary: 3050.98 },
  { input: { ...simpleEmployee, grossSalary: 5200 }, netSalary: 3094.31 },
  { input: { ...simpleEmployee, grossSalary: 5300 }, netSalary: 3133.63 },
  { input: { ...simpleEmployee, grossSalary: 5400 }, netSalary: 3172.95 },
  { input: { ...simpleEmployee, grossSalary: 5500 }, netSalary: 3212.28 },
  { input: { ...simpleEmployee, grossSalary: 5600 }, netSalary: 3251.6 },
  { input: { ...simpleEmployee, grossSalary: 5700 }, netSalary: 3290.92 },
  { input: { ...simpleEmployee, grossSalary: 5800 }, netSalary: 3330.24 },
  { input: { ...simpleEmployee, grossSalary: 5900 }, netSalary: 3369.57 },
  { input: { ...simpleEmployee, grossSalary: 6000 }, netSalary: 3408.89 },
  { input: { ...simpleEmployee, grossSalary: 6100 }, netSalary: 3448.88 },
  { input: { ...simpleEmployee, grossSalary: 6200 }, netSalary: 3489.3 },
  { input: { ...simpleEmployee, grossSalary: 6300 }, netSalary: 3529.73 },
  { input: { ...simpleEmployee, grossSalary: 6400 }, netSalary: 3570.15 },
  { input: { ...simpleEmployee, grossSalary: 6500 }, netSalary: 3610.57 },
  { input: { ...simpleEmployee, grossSalary: 6600 }, netSalary: 3650.99 },
  { input: { ...simpleEmployee, grossSalary: 6700 }, netSalary: 3691.42 },
  { input: { ...simpleEmployee, grossSalary: 6800 }, netSalary: 3731.84 },
  { input: { ...simpleEmployee, grossSalary: 6900 }, netSalary: 3772.26 },
  { input: { ...simpleEmployee, grossSalary: 7000 }, netSalary: 3812.68 },
  { input: { ...simpleEmployee, grossSalary: 7500 }, netSalary: 4014.79 },
  { input: { ...simpleEmployee, grossSalary: 8000 }, netSalary: 4216.91 },
  { input: { ...simpleEmployee, grossSalary: 8500 }, netSalary: 4419.02 },
  { input: { ...simpleEmployee, grossSalary: 9000 }, netSalary: 4621.13 },
  { input: { ...simpleEmployee, grossSalary: 9500 }, netSalary: 4823.24 },
  { input: { ...simpleEmployee, grossSalary: 10000 }, netSalary: 5025.36 },
  { input: { ...simpleEmployee, grossSalary: 11000 }, netSalary: 5429.58 },
  { input: { ...simpleEmployee, grossSalary: 12000 }, netSalary: 5833.81 },
  { input: { ...simpleEmployee, grossSalary: 13000 }, netSalary: 6238.03 },
  { input: { ...simpleEmployee, grossSalary: 14000 }, netSalary: 6642.25 },
  { input: { ...simpleEmployee, grossSalary: 15000 }, netSalary: 7046.48 },
  { input: { ...simpleEmployee, grossSalary: 16000 }, netSalary: 7450.7 },
  { input: { ...simpleEmployee, grossSalary: 17000 }, netSalary: 7854.93 },
  { input: { ...simpleEmployee, grossSalary: 18000 }, netSalary: 8259.15 },
  { input: { ...simpleEmployee, grossSalary: 19000 }, netSalary: 8663.38 },
  { input: { ...simpleEmployee, grossSalary: 20000 }, netSalary: 9067.6 },

  { input: { ...simpleWorker, grossSalary: 2070.48 }, netSalary: 1938.88 }, // Capped work bonus
  { input: { ...simpleWorker, grossSalary: 2100 }, netSalary: 1953.03 },    // Capped work bonus
  { input: { ...simpleWorker, grossSalary: 2150 }, netSalary: 1977 },       // Capped work bonus
  { input: { ...simpleWorker, grossSalary: 2200 }, netSalary: 2000.98 },    // Capped work bonus
  { input: { ...simpleWorker, grossSalary: 2250 }, netSalary: 2011.75 },
  { input: { ...simpleWorker, grossSalary: 2300 }, netSalary: 2019.74 },
  { input: { ...simpleWorker, grossSalary: 2350 }, netSalary: 2027.7 },
  { input: { ...simpleWorker, grossSalary: 2400 }, netSalary: 2035.68 },
  { input: { ...simpleWorker, grossSalary: 2450 }, netSalary: 2043.65 },
  { input: { ...simpleWorker, grossSalary: 2500 }, netSalary: 2051.63 },
  { input: { ...simpleWorker, grossSalary: 2550 }, netSalary: 2059.6 },
  { input: { ...simpleWorker, grossSalary: 2600 }, netSalary: 2067.57 },
  { input: { ...simpleWorker, grossSalary: 2650 }, netSalary: 2075.55 },
  { input: { ...simpleWorker, grossSalary: 2700 }, netSalary: 2083.54 },
  { input: { ...simpleWorker, grossSalary: 2750 }, netSalary: 2093.7 },
  { input: { ...simpleWorker, grossSalary: 2800 }, netSalary: 2105.75 },
  { input: { ...simpleWorker, grossSalary: 2850 }, netSalary: 2117.81 },
  { input: { ...simpleWorker, grossSalary: 2900 }, netSalary: 2129.86 },
  { input: { ...simpleWorker, grossSalary: 2950 }, netSalary: 2141.92 },
  { input: { ...simpleWorker, grossSalary: 3000 }, netSalary: 2153.97 },
  { input: { ...simpleWorker, grossSalary: 3050 }, netSalary: 2166.03 },
  { input: { ...simpleWorker, grossSalary: 3100 }, netSalary: 2178.08 },
  { input: { ...simpleWorker, grossSalary: 3150 }, netSalary: 2190.12 },
  { input: { ...simpleWorker, grossSalary: 3200 }, netSalary: 2202.18 },
  { input: { ...simpleWorker, grossSalary: 3250 }, netSalary: 2224.39 },
  { input: { ...simpleWorker, grossSalary: 3300 }, netSalary: 2246.94 },
  { input: { ...simpleWorker, grossSalary: 3400 }, netSalary: 2290.28 },
  { input: { ...simpleWorker, grossSalary: 3500 }, netSalary: 2332.64 },
  { input: { ...simpleWorker, grossSalary: 3600 }, netSalary: 2373.52 },
  { input: { ...simpleWorker, grossSalary: 3700 }, netSalary: 2414.4 },
  { input: { ...simpleWorker, grossSalary: 3800 }, netSalary: 2455.39 },
  { input: { ...simpleWorker, grossSalary: 3900 }, netSalary: 2498.73 },
  { input: { ...simpleWorker, grossSalary: 4000 }, netSalary: 2542.07 },
  { input: { ...simpleWorker, grossSalary: 4100 }, netSalary: 2585.41 },
  { input: { ...simpleWorker, grossSalary: 4200 }, netSalary: 2628.75 },
  { input: { ...simpleWorker, grossSalary: 4300 }, netSalary: 2672.1 },
  { input: { ...simpleWorker, grossSalary: 4400 }, netSalary: 2715.44 },
  { input: { ...simpleWorker, grossSalary: 4500 }, netSalary: 2758.78 },
  { input: { ...simpleWorker, grossSalary: 4600 }, netSalary: 2802.12 },
  { input: { ...simpleWorker, grossSalary: 4700 }, netSalary: 2845.47 },
  { input: { ...simpleWorker, grossSalary: 4800 }, netSalary: 2888.82 },
  { input: { ...simpleWorker, grossSalary: 4900 }, netSalary: 2932.16 },
  { input: { ...simpleWorker, grossSalary: 5000 }, netSalary: 2975.5 },
  { input: { ...simpleWorker, grossSalary: 5100 }, netSalary: 3018.84 },
  { input: { ...simpleWorker, grossSalary: 5200 }, netSalary: 3062.18 },
  { input: { ...simpleWorker, grossSalary: 5300 }, netSalary: 3103.2 },
  { input: { ...simpleWorker, grossSalary: 5400 }, netSalary: 3141.95 },
  { input: { ...simpleWorker, grossSalary: 5500 }, netSalary: 3180.69 },
  { input: { ...simpleWorker, grossSalary: 5600 }, netSalary: 3219.54 },
  { input: { ...simpleWorker, grossSalary: 5700 }, netSalary: 3259.48 },
  { input: { ...simpleWorker, grossSalary: 5800 }, netSalary: 3299.42 },
  { input: { ...simpleWorker, grossSalary: 5900 }, netSalary: 3339.35 },
  { input: { ...simpleWorker, grossSalary: 6000 }, netSalary: 3379.28 },
  { input: { ...simpleWorker, grossSalary: 6100 }, netSalary: 3419.22 },
  { input: { ...simpleWorker, grossSalary: 6200 }, netSalary: 3459.16 },
  { input: { ...simpleWorker, grossSalary: 6300 }, netSalary: 3499.1 },
  { input: { ...simpleWorker, grossSalary: 6400 }, netSalary: 3539.03 },
  { input: { ...simpleWorker, grossSalary: 6500 }, netSalary: 3578.97 },
  { input: { ...simpleWorker, grossSalary: 6600 }, netSalary: 3618.9 },
  { input: { ...simpleWorker, grossSalary: 6700 }, netSalary: 3658.84 },
  { input: { ...simpleWorker, grossSalary: 6800 }, netSalary: 3698.78 },
  { input: { ...simpleWorker, grossSalary: 6900 }, netSalary: 3738.71 },
  { input: { ...simpleWorker, grossSalary: 7000 }, netSalary: 3778.65 },
  { input: { ...simpleWorker, grossSalary: 7500 }, netSalary: 3978.33 },
  { input: { ...simpleWorker, grossSalary: 8000 }, netSalary: 4178.01 },
  { input: { ...simpleWorker, grossSalary: 8500 }, netSalary: 4377.69 },
  { input: { ...simpleWorker, grossSalary: 9000 }, netSalary: 4577.38 },
  { input: { ...simpleWorker, grossSalary: 9500 }, netSalary: 4777.06 },
  { input: { ...simpleWorker, grossSalary: 10000 }, netSalary: 4976.74 },
  { input: { ...simpleWorker, grossSalary: 11000 }, netSalary: 5376.1 },
  { input: { ...simpleWorker, grossSalary: 12000 }, netSalary: 5775.46 },
  { input: { ...simpleWorker, grossSalary: 13000 }, netSalary: 6174.82 },
  { input: { ...simpleWorker, grossSalary: 14000 }, netSalary: 6574.19 },
  { input: { ...simpleWorker, grossSalary: 15000 }, netSalary: 6973.55 },
  { input: { ...simpleWorker, grossSalary: 16000 }, netSalary: 7372.91 },
  { input: { ...simpleWorker, grossSalary: 17000 }, netSalary: 7772.27 },
  { input: { ...simpleWorker, grossSalary: 18000 }, netSalary: 8171.63 },
  { input: { ...simpleWorker, grossSalary: 19000 }, netSalary: 8571.0 },
  { input: { ...simpleWorker, grossSalary: 20000 }, netSalary: 8970.36 },

  { input: { ...partTimeEmployee, grossSalary: 1743.56 }, netSalary: 1741.64 },
  { input: { ...partTimeEmployee, grossSalary: 1800 }, netSalary: 1782.90 },
  { input: { ...partTimeEmployee, grossSalary: 1900 }, netSalary: 1803.27 },
  { input: { ...partTimeEmployee, grossSalary: 2000 }, netSalary: 1821.20 },
  { input: { ...partTimeEmployee, grossSalary: 2100 }, netSalary: 1837.11 },
  { input: { ...partTimeEmployee, grossSalary: 2200 }, netSalary: 1853.42 },
  { input: { ...partTimeEmployee, grossSalary: 2300 }, netSalary: 1872.98 },
  { input: { ...partTimeEmployee, grossSalary: 2400 }, netSalary: 1899.63 },
  { input: { ...partTimeEmployee, grossSalary: 2500 }, netSalary: 1926.22 },
  { input: { ...partTimeEmployee, grossSalary: 2600 }, netSalary: 1952.87 },
  { input: { ...partTimeEmployee, grossSalary: 2700 }, netSalary: 1979.45 },
  { input: { ...partTimeEmployee, grossSalary: 2800 }, netSalary: 2027.89 },
  { input: { ...partTimeEmployee, grossSalary: 2900 }, netSalary: 2076.51 },
  { input: { ...partTimeEmployee, grossSalary: 3000 }, netSalary: 2125.13 },
  { input: { ...partTimeEmployee, grossSalary: 3100 }, netSalary: 2173.76 },
  { input: { ...partTimeEmployee, grossSalary: 3200 }, netSalary: 2222.38 },
  { input: { ...partTimeEmployee, grossSalary: 3300 }, netSalary: 2267.73 },
  { input: { ...partTimeEmployee, grossSalary: 3400 }, netSalary: 2311.7 },
  { input: { ...partTimeEmployee, grossSalary: 3500 }, netSalary: 2355.68 },
  { input: { ...partTimeEmployee, grossSalary: 4000 }, netSalary: 2569.54 },
  { input: { ...partTimeEmployee, grossSalary: 4500 }, netSalary: 2787.14 },
  { input: { ...partTimeEmployee, grossSalary: 5000 }, netSalary: 3007.01 },
  { input: { ...partTimeEmployee, grossSalary: 5500 }, netSalary: 3212.28 },
  { input: { ...partTimeEmployee, grossSalary: 6000 }, netSalary: 3408.89 },
  { input: { ...partTimeEmployee, grossSalary: 6500 }, netSalary: 3610.57 },
  { input: { ...partTimeEmployee, grossSalary: 7000 }, netSalary: 3812.68 },
  { input: { ...partTimeEmployee, grossSalary: 7500 }, netSalary: 4014.79 },
  { input: { ...partTimeEmployee, grossSalary: 8000 }, netSalary: 4216.91 },
  { input: { ...partTimeEmployee, grossSalary: 8500 }, netSalary: 4419.02 },
  { input: { ...partTimeEmployee, grossSalary: 9000 }, netSalary: 4621.13 },
  { input: { ...partTimeEmployee, grossSalary: 9500 }, netSalary: 4823.24 },
  { input: { ...partTimeEmployee, grossSalary: 10000 }, netSalary: 5025.36 },
  { input: { ...partTimeEmployee, grossSalary: 11000 }, netSalary: 5429.58 },
  { input: { ...partTimeEmployee, grossSalary: 12000 }, netSalary: 5833.81 },
  { input: { ...partTimeEmployee, grossSalary: 13000 }, netSalary: 6238.03 },
  { input: { ...partTimeEmployee, grossSalary: 14000 }, netSalary: 6642.25 },
  { input: { ...partTimeEmployee, grossSalary: 15000 }, netSalary: 7046.48 },
  { input: { ...partTimeEmployee, grossSalary: 16000 }, netSalary: 7450.7 },
  { input: { ...partTimeEmployee, grossSalary: 17000 }, netSalary: 7854.93 },
  { input: { ...partTimeEmployee, grossSalary: 18000 }, netSalary: 8259.15 },
  { input: { ...partTimeEmployee, grossSalary: 19000 }, netSalary: 8663.38 },
  { input: { ...partTimeEmployee, grossSalary: 20000 }, netSalary: 9067.6 },

  { input: { ...marriedEmployeeOneIncome, grossSalary: 2100 }, netSalary: 2090.88 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 2328.33 }, netSalary: 2232.88 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 2500 }, netSalary: 2333.89 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 3000 }, netSalary: 2507.57 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 4029.16 }, netSalary: 3002.86 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 5000 }, netSalary: 3479.92 },

  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 2100 }, netSalary: 2090.88 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 2328.33 }, netSalary: 2232.88 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 2500 }, netSalary: 2333.89 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 3000 }, netSalary: 2556.57 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 4029.16 }, netSalary: 3051.86 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 5000 }, netSalary: 3528.92 },

  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 1319.16 }, netSalary: 1217.33 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 2100 }, netSalary: 1816.41 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 2328.33 }, netSalary: 2008.06 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 2500 }, netSalary: 2155.40 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 3000 }, netSalary: 2459.37 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 4029.16 }, netSalary: 3002.86 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 5000 }, netSalary: 3479.92 },

  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 2328.33 }, netSalary: 2018.22 },
  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 2500 }, netSalary: 2050.84 },
  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 3000 }, netSalary: 2166.79 },
  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 4029.16 }, netSalary: 2584.26 },
  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 5000 }, netSalary: 3011.17 },

  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 1319.16 }, netSalary: 1212.18 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 2000 }, netSalary: 1632.40 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 2100 }, netSalary: 1687.74 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 2328.33 }, netSalary: 1794.43 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 2500 }, netSalary: 1877.90 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 3000 }, netSalary: 2121.02 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 4029.16 }, netSalary: 2584.26 },

  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 2100 }, netSalary: 2066.60 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 2328.33 }, netSalary: 2120.33 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 2500 }, netSalary: 2152.95 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 3000 }, netSalary: 2268.90 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 4029.16 }, netSalary: 2679.70 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 5000 }, netSalary: 3105.01 },

  { input: { ...widowedEmployeeWithOneKid, grossSalary: 2100 }, netSalary: 2066.60 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 2328.33 }, netSalary: 2120.33 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 2500 }, netSalary: 2152.95 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 3000 }, netSalary: 2268.90 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 4029.16 }, netSalary: 2679.70 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 5000 }, netSalary: 3105.01 },

  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 1319.16 }, netSalary: 1217.33 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 2100 }, netSalary: 1788.34 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 2328.33 }, netSalary: 1896.54 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 2500 }, netSalary: 1980.01 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 3000 }, netSalary: 2223.13 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 4029.16 }, netSalary: 2679.70 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 5000 }, netSalary: 3105.01 },

  { input: { ...partTimeWorker, grossSalary: 1743.56 }, netSalary: 1743.56 },
  { input: { ...partTimeWorker, grossSalary: 1800 }, netSalary: 1790.93 },
  { input: { ...partTimeWorker, grossSalary: 1900 }, netSalary: 1803.88 },
  { input: { ...partTimeWorker, grossSalary: 2000 }, netSalary: 1816.59 },
  { input: { ...partTimeWorker, grossSalary: 2100 }, netSalary: 1831.63 },
  { input: { ...partTimeWorker, grossSalary: 2200 }, netSalary: 1847.71 },
  { input: { ...partTimeWorker, grossSalary: 2300 }, netSalary: 1864.26 },

  { input: { ...partTimeWorker, grossSalary: 2400 }, netSalary: 1888.46 },
  { input: { ...partTimeWorker, grossSalary: 2500 }, netSalary: 1912.60 },
  { input: { ...partTimeWorker, grossSalary: 2600 }, netSalary: 1936.79 },
  { input: { ...partTimeWorker, grossSalary: 2700 }, netSalary: 1960.93 },
  { input: { ...partTimeWorker, grossSalary: 2800 }, netSalary: 2008.68 },
  { input: { ...partTimeWorker, grossSalary: 2900 }, netSalary: 2056.62 },
  { input: { ...partTimeWorker, grossSalary: 3000 }, netSalary: 2104.55 },
  { input: { ...partTimeWorker, grossSalary: 3500 }, netSalary: 2332.64 },
  { input: { ...partTimeWorker, grossSalary: 4000 }, netSalary: 2542.07 },
  { input: { ...partTimeWorker, grossSalary: 4500 }, netSalary: 2758.78 },
  { input: { ...partTimeWorker, grossSalary: 5000 }, netSalary: 2975.5 },
  { input: { ...partTimeWorker, grossSalary: 5500 }, netSalary: 3180.69 },
  { input: { ...partTimeWorker, grossSalary: 6000 }, netSalary: 3379.28 },
  { input: { ...partTimeWorker, grossSalary: 6500 }, netSalary: 3578.97 },
  { input: { ...partTimeWorker, grossSalary: 7000 }, netSalary: 3778.65 },
  { input: { ...partTimeWorker, grossSalary: 7500 }, netSalary: 3978.33 },
  { input: { ...partTimeWorker, grossSalary: 8000 }, netSalary: 4178.01 },
  { input: { ...partTimeWorker, grossSalary: 8500 }, netSalary: 4377.69 },
  { input: { ...partTimeWorker, grossSalary: 9000 }, netSalary: 4577.38 },
  { input: { ...partTimeWorker, grossSalary: 10000 }, netSalary: 4976.74 },
  { input: { ...partTimeWorker, grossSalary: 11000 }, netSalary: 5376.1 },
  { input: { ...partTimeWorker, grossSalary: 12000 }, netSalary: 5775.46 },
  { input: { ...partTimeWorker, grossSalary: 13000 }, netSalary: 6174.82 },
  { input: { ...partTimeWorker, grossSalary: 14000 }, netSalary: 6574.19 },
  { input: { ...partTimeWorker, grossSalary: 15000 }, netSalary: 6973.55 },
  { input: { ...partTimeWorker, grossSalary: 16000 }, netSalary: 7372.91 },
  { input: { ...partTimeWorker, grossSalary: 17000 }, netSalary: 7772.27 },
  { input: { ...partTimeWorker, grossSalary: 18000 }, netSalary: 8171.63 },
  { input: { ...partTimeWorker, grossSalary: 19000 }, netSalary: 8571.0 },
  { input: { ...partTimeWorker, grossSalary: 20000 }, netSalary: 8970.36 },

  { input: { ...halfTimeEmployee, grossSalary: 1319.16 }, netSalary: 1217.33 },           // Withholding tier 1
  { input: { ...halfTimeEmployeeWithOneKid, grossSalary: 1319.16 }, netSalary: 1217.33 }, // Withholding tier 1
  { input: { ...employeeWithOneKid, grossSalary: 2100 }, netSalary: 2066.60 },            // Work bonus
  { input: { ...employeeWithOneKid, grossSalary: 2328.33 }, netSalary: 2120.33 },         // Withholding tier 2
  { input: { ...employeeWithOneKid, grossSalary: 2500 }, netSalary: 2152.95 },            // Work bonus
  { input: { ...employeeWithOneKid, grossSalary: 3000 }, netSalary: 2268.90 },            // Work bonus
  { input: { ...employeeWithOneKid, grossSalary: 4029.16 }, netSalary: 2679.70 },         // Withholding tier 3
  { input: { ...employeeWithOneKid, grossSalary: 5000 }, netSalary: 3105.01 },            // Withholding tier 4

  { input: { ...employeeWithOneDisabledKid, grossSalary: 2100 }, netSalary: 2093.48 },    // Work bonus
  { input: { ...employeeWithOneDisabledKid, grossSalary: 2328.33 }, netSalary: 2202.33 }, // Withholding tier 2
  { input: { ...employeeWithOneDisabledKid, grossSalary: 2500 }, netSalary: 2234.95 },    // Work bonus
  { input: { ...employeeWithOneDisabledKid, grossSalary: 3000 }, netSalary: 2350.90 },    // Work bonus
  { input: { ...employeeWithOneDisabledKid, grossSalary: 4029.16 }, netSalary: 2761.70 }, // Withholding tier 3
  { input: { ...employeeWithOneDisabledKid, grossSalary: 5000 }, netSalary: 3187.01 },    // Withholding tier 4

  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 2100 }, netSalary: 2093.48 },    // Work bonus
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 2328.33 }, netSalary: 2236.99 }, // Withholding tier 2
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 2500 }, netSalary: 2338.00 },    // Work bonus
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 3000 }, netSalary: 2566.90 },    // Work bonus
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 4029.16 }, netSalary: 2977.70 }, // Withholding tier 3
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 5000 }, netSalary: 3403.01 },    // Withholding tier 4

  { input: { ...employeeWithFourKids, grossSalary: 2100 }, netSalary: 2093.48 },
  { input: { ...employeeWithFourKids, grossSalary: 3000 }, netSalary: 2639.32 },
  { input: { ...employeeWithFiveKids, grossSalary: 4000 }, netSalary: 3440.96 },
  { input: { ...employeeWithSixKids, grossSalary: 5000 }, netSalary: 4207.01 },
  { input: { ...employeeWithSevenKids, grossSalary: 6000 }, netSalary: 4886.89 },
  { input: { ...employeeWithEightKids, grossSalary: 7000 }, netSalary: 5595.68 },

  { input: { ...employeeWith100Kids, grossSalary: 2100 }, netSalary: 2093.48 },    // Work bonus
  { input: { ...employeeWith100Kids, grossSalary: 2328.33 }, netSalary: 2236.99 }, // Withholding tier 2
  { input: { ...employeeWith100Kids, grossSalary: 2500 }, netSalary: 2338.00 },    // Work bonus
  { input: { ...employeeWith100Kids, grossSalary: 3000 }, netSalary: 2639.32 },    // Work bonus
  { input: { ...employeeWith100Kids, grossSalary: 4029.16 }, netSalary: 3465.32 }, // Withholding tier 3
  { input: { ...employeeWith100Kids, grossSalary: 5000 }, netSalary: 4296.99 },    // Withholding tier 4

  { input: { ...disabledEmployee, grossSalary: 2100 }, netSalary: 2017.60 },    // Work bonus
  { input: { ...disabledEmployee, grossSalary: 2328.33 }, netSalary: 2071.33 }, // Withholding tier 2
  { input: { ...disabledEmployee, grossSalary: 2500 }, netSalary: 2103.95 },    // Work bonus
  { input: { ...disabledEmployee, grossSalary: 3000 }, netSalary: 2219.90 },    // Work bonus
  { input: { ...disabledEmployee, grossSalary: 4029.16 }, netSalary: 2630.70 }, // Withholding tier 3
  { input: { ...disabledEmployee, grossSalary: 5000 }, netSalary: 3056.01 },    // Withholding tier 4

  { input: { ...employeeWithGroupInsurance, grossSalary: 2100 }, netSalary: 1938.85 },    // Work bonus
  { input: { ...employeeWithGroupInsurance, grossSalary: 2328.33 }, netSalary: 1992.58 }, // Withholding tier 2
  { input: { ...employeeWithGroupInsurance, grossSalary: 2500 }, netSalary: 2025.20 },    // Work bonus
  { input: { ...employeeWithGroupInsurance, grossSalary: 3000 }, netSalary: 2141.15 },    // Work bonus
  { input: { ...employeeWithGroupInsurance, grossSalary: 4029.16 }, netSalary: 2551.95 }, // Withholding tier 3
  { input: { ...employeeWithGroupInsurance, grossSalary: 5000 }, netSalary: 2977.26 },    // Withholding tier 4

  { input: { ...employeeWithOtherNetIncome, grossSalary: 2100 }, netSalary: 2068.60 },    // Work bonus
  { input: { ...employeeWithOtherNetIncome, grossSalary: 2328.33 }, netSalary: 2122.33 }, // Withholding tier 2
  { input: { ...employeeWithOtherNetIncome, grossSalary: 2500 }, netSalary: 2154.95 },    // Work bonus
  { input: { ...employeeWithOtherNetIncome, grossSalary: 3000 }, netSalary: 2270.90 },    // Work bonus
  { input: { ...employeeWithOtherNetIncome, grossSalary: 4029.16 }, netSalary: 2681.70 }, // Withholding tier 3
  { input: { ...employeeWithOtherNetIncome, grossSalary: 5000 }, netSalary: 3107.01 },    // Withholding tier 4

  { input: { ...halfTimeWorker, grossSalary: 1319.16 }, netSalary: 1209.17 },           // Withholding tier 1
  { input: { ...halfTimeWorkerWithOneKid, grossSalary: 1319.16 }, netSalary: 1209.17 }, // Withholding tier 1
  { input: { ...workerWithOneKid, grossSalary: 2100 }, netSalary: 2051.03 },            // Work bonus
  { input: { ...workerWithOneKid, grossSalary: 2328.33 }, netSalary: 2122.25 },         // Withholding tier 2
  { input: { ...workerWithOneKid, grossSalary: 2500 }, netSalary: 2149.63 },            // Work bonus
  { input: { ...workerWithOneKid, grossSalary: 3000 }, netSalary: 2251.97 },            // Work bonus
  { input: { ...workerWithOneKid, grossSalary: 4029.16 }, netSalary: 2652.70 },         // Withholding tier 3
  { input: { ...workerWithOneKid, grossSalary: 5000 }, netSalary: 3073.50 },            // Withholding tier 4

  { input: { ...workerWithOneDisabledKid, grossSalary: 2100 }, netSalary: 2070.03 },    // Work bonus
  { input: { ...workerWithOneDisabledKid, grossSalary: 2328.33 }, netSalary: 2204.25 }, // Withholding tier 2
  { input: { ...workerWithOneDisabledKid, grossSalary: 2500 }, netSalary: 2231.63 },    // Work bonus
  { input: { ...workerWithOneDisabledKid, grossSalary: 3000 }, netSalary: 2333.97 },    // Work bonus
  { input: { ...workerWithOneDisabledKid, grossSalary: 4029.16 }, netSalary: 2734.70 }, // Withholding tier 3
  { input: { ...workerWithOneDisabledKid, grossSalary: 5000 }, netSalary: 3155.50 },    // Withholding tier 4

  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 2100 }, netSalary: 2070.03 },    // Work bonus
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 2328.33 }, netSalary: 2228.57 }, // Withholding tier 2
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 2500 }, netSalary: 2323.93 },    // Work bonus
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 3000 }, netSalary: 2549.97 },    // Work bonus
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 4029.16 }, netSalary: 2950.70 }, // Withholding tier 3
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 5000 }, netSalary: 3371.50 },    // Withholding tier 4

  { input: { ...workerWith100Kids, grossSalary: 2100 }, netSalary: 2070.03 },    // Work bonus
  { input: { ...workerWith100Kids, grossSalary: 2328.33 }, netSalary: 2228.57 }, // Withholding tier 2
  { input: { ...workerWith100Kids, grossSalary: 2500 }, netSalary: 2323.93 },    // Work bonus
  { input: { ...workerWith100Kids, grossSalary: 3000 }, netSalary: 2609.35 },    // Work bonus
  { input: { ...workerWith100Kids, grossSalary: 4029.16 }, netSalary: 3418.04 }, // Withholding tier 3
  { input: { ...workerWith100Kids, grossSalary: 5000 }, netSalary: 4240.31 },    // Withholding tier 4

  { input: { ...disabledWorker, grossSalary: 2100 }, netSalary: 2002.03 },    // Work bonus
  { input: { ...disabledWorker, grossSalary: 2328.33 }, netSalary: 2073.25 }, // Withholding tier 2
  { input: { ...disabledWorker, grossSalary: 2500 }, netSalary: 2100.63 },    // Work bonus
  { input: { ...disabledWorker, grossSalary: 3000 }, netSalary: 2202.97 },    // Work bonus
  { input: { ...disabledWorker, grossSalary: 4029.16 }, netSalary: 2603.70 }, // Withholding tier 3
  { input: { ...disabledWorker, grossSalary: 5000 }, netSalary: 3024.50 },    // Withholding tier 4

  { input: { ...workerWithGroupInsurance, grossSalary: 2100 }, netSalary: 1923.28 },    // Work bonus
  { input: { ...workerWithGroupInsurance, grossSalary: 2328.33 }, netSalary: 1994.50 }, // Withholding tier 2
  { input: { ...workerWithGroupInsurance, grossSalary: 2500 }, netSalary: 2021.88 },    // Work bonus
  { input: { ...workerWithGroupInsurance, grossSalary: 3000 }, netSalary: 2124.22 },    // Work bonus
  { input: { ...workerWithGroupInsurance, grossSalary: 4029.16 }, netSalary: 2524.95 }, // Withholding tier 3
  { input: { ...workerWithGroupInsurance, grossSalary: 5000 }, netSalary: 2945.75 },    // Withholding tier 4

  { input: { ...workerWithOtherNetIncome, grossSalary: 2100 }, netSalary: 2053.03 },    // Work bonus
  { input: { ...workerWithOtherNetIncome, grossSalary: 2328.33 }, netSalary: 2124.25 }, // Withholding tier 2
  { input: { ...workerWithOtherNetIncome, grossSalary: 2500 }, netSalary: 2151.63 },    // Work bonus
  { input: { ...workerWithOtherNetIncome, grossSalary: 3000 }, netSalary: 2253.97 },    // Work bonus
  { input: { ...workerWithOtherNetIncome, grossSalary: 4029.16 }, netSalary: 2654.70 }, // Withholding tier 3
  { input: { ...workerWithOtherNetIncome, grossSalary: 5000 }, netSalary: 3075.50 },    // Withholding tier 4

  { input: { ...marriedWorkerOneIncome, grossSalary: 2100 }, netSalary: 2065.92 },    // Capped work bonus
  { input: { ...marriedWorkerOneIncome, grossSalary: 2328.33 }, netSalary: 2224.46 },
  { input: { ...marriedWorkerOneIncome, grossSalary: 2500 }, netSalary: 2319.82 },
  { input: { ...marriedWorkerOneIncome, grossSalary: 3000 }, netSalary: 2489.33 },
  { input: { ...marriedWorkerOneIncome, grossSalary: 4029.16 }, netSalary: 2973.20 },
  { input: { ...marriedWorkerOneIncome, grossSalary: 5000 }, netSalary: 3448.41 },

  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 2100 }, netSalary: 2065.92 },    // Capped work bonus
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 2328.33 }, netSalary: 2224.46 },
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 2500 }, netSalary: 2319.82 },
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 3000 }, netSalary: 2538.33 },
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 4029.16 }, netSalary: 3022.20 },
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 5000 }, netSalary: 3497.41 },

  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 2100 }, netSalary: 1788.27 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 2328.33 }, netSalary: 1981.66 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 2500 }, netSalary: 2127.06 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 3000 }, netSalary: 2437.27 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 4029.16 }, netSalary: 2973.20 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 5000 }, netSalary: 3448.41 },

  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 2000 }, netSalary: 1609.57 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 2100 }, netSalary: 1669.00 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 2328.33 }, netSalary: 1778.46 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 2500 }, netSalary: 1860.75 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 3000 }, netSalary: 2100.44 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 4029.16 }, netSalary: 2558.87 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 5000 }, netSalary: 2979.66 },

  { input: { ...marriedWorkerTwoIncomes, grossSalary: 2100 }, netSalary: 1948.92 },    // Capped work bonus
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 2328.33 }, netSalary: 2020.14 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 2500 }, netSalary: 2047.52 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 3000 }, netSalary: 2149.86 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 4029.16 }, netSalary: 2558.87 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 5000 }, netSalary: 2979.66 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 6000 }, netSalary: 3388.58 },

  { input: { ...marriedWorkerPartnerLowPension, grossSalary: 4000 }, netSalary: 2820.23 },
  { input: { ...marriedWorkerPartnerLowOtherRevenue, grossSalary: 3000 }, netSalary: 2287.36 },

  { input: { ...divorcedWorkerWithOneKid, grossSalary: 2100 }, netSalary: 2051.03 },            // Work bonus
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 2328.33 }, netSalary: 2122.25 },         // Withholding tier 2
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 2500 }, netSalary: 2149.63 },            // Work bonus
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 3000 }, netSalary: 2251.97 },            // Work bonus
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 4029.16 }, netSalary: 2652.70 },         // Withholding tier 3
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 5000 }, netSalary: 3073.50 },            // Withholding tier 4

  { input: { ...widowedWorkerWithOneKid, grossSalary: 2100 }, netSalary: 2051.03 },            // Work bonus
  { input: { ...widowedWorkerWithOneKid, grossSalary: 2328.33 }, netSalary: 2122.25 },         // Withholding tier 2
  { input: { ...widowedWorkerWithOneKid, grossSalary: 2500 }, netSalary: 2149.63 },            // Work bonus
  { input: { ...widowedWorkerWithOneKid, grossSalary: 3000 }, netSalary: 2251.97 },            // Work bonus
  { input: { ...widowedWorkerWithOneKid, grossSalary: 4029.16 }, netSalary: 2652.70 },         // Withholding tier 3
  { input: { ...widowedWorkerWithOneKid, grossSalary: 5000 }, netSalary: 3073.50 },            // Withholding tier 4

  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 1319.16 }, netSalary: 1209.17 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 2100 }, netSalary: 1771.11 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 2328.33 }, netSalary: 1880.57 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 2500 }, netSalary: 1962.86 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 3000 }, netSalary: 2202.55 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 4029.16 }, netSalary: 2652.70 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 5000 }, netSalary: 3073.50 },

  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(2100) }, netSalary: 23_623.2, netIncome: 25_887 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(2328.33) }, netSalary: 24_267.96, netIncome: 26_777.91 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(2500) }, netSalary: 24_659.4, netIncome: 27_354.41 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(3000) }, netSalary: 26_050.8, netIncome: 28_967.19 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(4029.16) }, netSalary: 30_980.4, netIncome: 34_541.84 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(5000) }, netSalary: 36_084.12, netIncome: 40_149.48 },

  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(2100) }, netSalary: 23_436.36, netIncome: 25_700.16 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(2328.33) }, netSalary: 24_291, netIncome: 26_800.95 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(2500) }, netSalary: 24_619.56, netIncome: 27_314.57 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(3000) }, netSalary: 25_847.64, netIncome: 28_764.03 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(4029.16) }, netSalary: 30_656.4, netIncome: 34_217.84 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(5000) }, netSalary: 35_706, netIncome: 39_771.36 },
]
