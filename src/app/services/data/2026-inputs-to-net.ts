import { FamilySituation, FuelType, SalaryCalculationInput, Status, TaxationPeriod, WorkRegime, YearlySalaryCalculationInput } from "../tax-calculator.service";
import { Situation } from "./interfaces";
import { getMonthlyIncomes } from "./utils";

export const simpleEmployee: SalaryCalculationInput = {
  period: TaxationPeriod.Monthly,
  revenueYear: 2026,
  month: 1,
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
  groupInsurancePersonalContribution: 0,
  otherNetIncome: 0,
  mealVoucherAmounts: {
    value: 8,
    personalContribution: 1.09,
  },
  numMealVouchers: 0,
  companyCarInfo: null,
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
  groupInsurancePersonalContribution: 42.5,
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
const employeeWithDieselCar: SalaryCalculationInput = {
  ...simpleEmployee,
  companyCarInfo: {
    catalogValue: 25000,
    firstPlateRegistrationMonth: new Date(2024, 0, 21),
    fuelType: FuelType.Diesel,
    gramsCo2PerKm: 149,
  },
};
const employeeWithDieselCarUnknownEmissions: SalaryCalculationInput = {
  ...simpleEmployee,
  companyCarInfo: {
    catalogValue: 25000,
    firstPlateRegistrationMonth: new Date(2024, 0, 21),
    fuelType: FuelType.Diesel,
    gramsCo2PerKm: null,
  },
};
const employeeWithDieselCarAndPersonalContribution: SalaryCalculationInput = {
  ...simpleEmployee,
  companyCarInfo: {
    catalogValue: 25000,
    firstPlateRegistrationMonth: new Date(2024, 0, 21),
    fuelType: FuelType.Diesel,
    gramsCo2PerKm: 149,
    personalContribution: 100,
  },
};
const employeeWithGasolineCar: SalaryCalculationInput = {
  ...simpleEmployee,
  companyCarInfo: {
    catalogValue: 32000,
    firstPlateRegistrationMonth: new Date(2024, 0, 21),
    fuelType: FuelType.Gasoline,
    gramsCo2PerKm: 137,
  },
};
const employeeWithElectricCar: SalaryCalculationInput = {
  ...simpleEmployee,
  companyCarInfo: {
    catalogValue: 40000,
    firstPlateRegistrationMonth: new Date(2024, 0, 21),
    fuelType: FuelType.Electric,
    gramsCo2PerKm: 0,
  },
};
const employeeWithHybridCar: SalaryCalculationInput = {
  ...simpleEmployee,
  companyCarInfo: {
    catalogValue: 32000,
    firstPlateRegistrationMonth: new Date(2022, 0, 21),
    fuelType: FuelType.Hybrid,
    gramsCo2PerKm: 108,
  },
};
const employeeWithNaturalGasCar: SalaryCalculationInput = {
  ...simpleEmployee,
  companyCarInfo: {
    catalogValue: 50000,
    firstPlateRegistrationMonth: new Date(2024, 5, 1),
    fuelType: FuelType.NaturalGas,
    gramsCo2PerKm: 144,
  },
};
const employeeWithMoreRecentDieselCar: SalaryCalculationInput = {
  ...employeeWithDieselCar,
  companyCarInfo: {
    ...employeeWithDieselCar.companyCarInfo!!,
    firstPlateRegistrationMonth: new Date(2023, 5, 21),
  },
};
const employeeWithMoreRecentDieselCarUnknownEmissions: SalaryCalculationInput = {
  ...employeeWithDieselCarUnknownEmissions,
  companyCarInfo: {
    ...employeeWithDieselCarUnknownEmissions.companyCarInfo!!,
    firstPlateRegistrationMonth: new Date(2023, 5, 21),
  },
};
const employeeWithMoreRecentDieselCarAndPersonalContribution: SalaryCalculationInput = {
  ...employeeWithDieselCarAndPersonalContribution,
  companyCarInfo: {
    ...employeeWithDieselCarAndPersonalContribution.companyCarInfo!!,
    firstPlateRegistrationMonth: new Date(2023, 5, 21),
  },
};
const employeeWithMoreRecentGasolineCar: SalaryCalculationInput = {
  ...employeeWithGasolineCar,
  companyCarInfo: {
    ...employeeWithGasolineCar.companyCarInfo!!,
    firstPlateRegistrationMonth: new Date(2023, 5, 21),
  },
};
const employeeWithMoreRecentElectricCar: SalaryCalculationInput = {
  ...employeeWithElectricCar,
  companyCarInfo: {
    ...employeeWithElectricCar.companyCarInfo!!,
    firstPlateRegistrationMonth: new Date(2023, 5, 21),
  },
};
const employeeWithMoreRecentHybridCar: SalaryCalculationInput = {
  ...employeeWithHybridCar,
  companyCarInfo: {
    ...employeeWithHybridCar.companyCarInfo!!,
    firstPlateRegistrationMonth: new Date(2022, 5, 21),
  },
};
const employeeWithMoreRecentNaturalGasCar: SalaryCalculationInput = {
  ...employeeWithNaturalGasCar,
  companyCarInfo: {
    ...employeeWithNaturalGasCar.companyCarInfo!!,
    firstPlateRegistrationMonth: new Date(2025, 0, 1),
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
  groupInsurancePersonalContribution: 42.5,
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
  { input: { ...simpleEmployee, grossSalary: 2070.48 }, netSalary: 1986.35 },
  { input: { ...simpleEmployee, grossSalary: 2100 }, netSalary: 2004.01 },
  { input: { ...simpleEmployee, grossSalary: 2150 }, netSalary: 2033.94 },
  { input: { ...simpleEmployee, grossSalary: 2200 }, netSalary: 2064.16 },
  { input: { ...simpleEmployee, grossSalary: 2250 }, netSalary: 2080.67 },
  { input: { ...simpleEmployee, grossSalary: 2300 }, netSalary: 2090.18 },
  { input: { ...simpleEmployee, grossSalary: 2350 }, netSalary: 2099.68 },
  { input: { ...simpleEmployee, grossSalary: 2400 }, netSalary: 2109.19 },
  { input: { ...simpleEmployee, grossSalary: 2450 }, netSalary: 2118.67 },
  { input: { ...simpleEmployee, grossSalary: 2500 }, netSalary: 2128.19 },
  { input: { ...simpleEmployee, grossSalary: 2550 }, netSalary: 2137.68 },
  { input: { ...simpleEmployee, grossSalary: 2600 }, netSalary: 2147.2 },
  { input: { ...simpleEmployee, grossSalary: 2650 }, netSalary: 2156.68 },
  { input: { ...simpleEmployee, grossSalary: 2700 }, netSalary: 2166.2 },
  { input: { ...simpleEmployee, grossSalary: 2750 }, netSalary: 2175.69 },
  { input: { ...simpleEmployee, grossSalary: 2800 }, netSalary: 2185.21 },
  { input: { ...simpleEmployee, grossSalary: 2850 }, netSalary: 2195.42 },
  { input: { ...simpleEmployee, grossSalary: 2900 }, netSalary: 2207.06 },
  { input: { ...simpleEmployee, grossSalary: 2950 }, netSalary: 2218.69 },
  { input: { ...simpleEmployee, grossSalary: 3000 }, netSalary: 2230.33 },
  { input: { ...simpleEmployee, grossSalary: 3050 }, netSalary: 2241.96 },
  { input: { ...simpleEmployee, grossSalary: 3100 }, netSalary: 2253.59 },
  { input: { ...simpleEmployee, grossSalary: 3150 }, netSalary: 2265.23 },
  { input: { ...simpleEmployee, grossSalary: 3200 }, netSalary: 2276.85 },
  { input: { ...simpleEmployee, grossSalary: 3300 }, netSalary: 2307.34 },
  { input: { ...simpleEmployee, grossSalary: 3400 }, netSalary: 2355.97 },
  { input: { ...simpleEmployee, grossSalary: 3500 }, netSalary: 2400.4 },
  { input: { ...simpleEmployee, grossSalary: 3600 }, netSalary: 2444.37 },
  { input: { ...simpleEmployee, grossSalary: 3700 }, netSalary: 2488.34 },
  { input: { ...simpleEmployee, grossSalary: 3800 }, netSalary: 2530.88 },
  { input: { ...simpleEmployee, grossSalary: 3900 }, netSalary: 2572.57 },
  { input: { ...simpleEmployee, grossSalary: 4000 }, netSalary: 2614.26 },
  { input: { ...simpleEmployee, grossSalary: 4100 }, netSalary: 2655.95 },
  { input: { ...simpleEmployee, grossSalary: 4200 }, netSalary: 2699.94 },
  { input: { ...simpleEmployee, grossSalary: 4300 }, netSalary: 2743.91 },
  { input: { ...simpleEmployee, grossSalary: 4400 }, netSalary: 2787.88 },
  { input: { ...simpleEmployee, grossSalary: 4500 }, netSalary: 2831.86 },
  { input: { ...simpleEmployee, grossSalary: 4600 }, netSalary: 2875.83 },
  { input: { ...simpleEmployee, grossSalary: 4700 }, netSalary: 2919.8 },
  { input: { ...simpleEmployee, grossSalary: 4800 }, netSalary: 2963.78 },
  { input: { ...simpleEmployee, grossSalary: 4900 }, netSalary: 3007.75 },
  { input: { ...simpleEmployee, grossSalary: 5000 }, netSalary: 3051.72 },
  { input: { ...simpleEmployee, grossSalary: 5100 }, netSalary: 3095.7 },
  { input: { ...simpleEmployee, grossSalary: 5200 }, netSalary: 3139.67 },
  { input: { ...simpleEmployee, grossSalary: 5300 }, netSalary: 3183.64 },
  { input: { ...simpleEmployee, grossSalary: 5400 }, netSalary: 3227.62 },
  { input: { ...simpleEmployee, grossSalary: 5500 }, netSalary: 3270.46 },
  { input: { ...simpleEmployee, grossSalary: 5600 }, netSalary: 3309.78 },
  { input: { ...simpleEmployee, grossSalary: 5700 }, netSalary: 3349.1 },
  { input: { ...simpleEmployee, grossSalary: 5800 }, netSalary: 3388.43 },
  { input: { ...simpleEmployee, grossSalary: 5900 }, netSalary: 3427.75 },
  { input: { ...simpleEmployee, grossSalary: 6000 }, netSalary: 3467.07 },
  { input: { ...simpleEmployee, grossSalary: 6100 }, netSalary: 3507.06 },
  { input: { ...simpleEmployee, grossSalary: 6200 }, netSalary: 3547.48 },
  { input: { ...simpleEmployee, grossSalary: 6300 }, netSalary: 3587.91 },
  { input: { ...simpleEmployee, grossSalary: 6400 }, netSalary: 3628.33 },
  { input: { ...simpleEmployee, grossSalary: 6500 }, netSalary: 3668.75 },
  { input: { ...simpleEmployee, grossSalary: 6600 }, netSalary: 3709.17 },
  { input: { ...simpleEmployee, grossSalary: 6700 }, netSalary: 3749.6 },
  { input: { ...simpleEmployee, grossSalary: 6800 }, netSalary: 3790.02 },
  { input: { ...simpleEmployee, grossSalary: 6900 }, netSalary: 3830.44 },
  { input: { ...simpleEmployee, grossSalary: 7000 }, netSalary: 3870.86 },
  { input: { ...simpleEmployee, grossSalary: 7500 }, netSalary: 4072.98 },
  { input: { ...simpleEmployee, grossSalary: 8000 }, netSalary: 4275.09 },
  { input: { ...simpleEmployee, grossSalary: 8500 }, netSalary: 4477.2 },
  { input: { ...simpleEmployee, grossSalary: 9000 }, netSalary: 4679.31 },
  { input: { ...simpleEmployee, grossSalary: 9500 }, netSalary: 4881.43 },
  { input: { ...simpleEmployee, grossSalary: 10000 }, netSalary: 5083.54 },
  { input: { ...simpleEmployee, grossSalary: 11000 }, netSalary: 5487.76 },
  { input: { ...simpleEmployee, grossSalary: 12000 }, netSalary: 5891.99 },
  { input: { ...simpleEmployee, grossSalary: 13000 }, netSalary: 6296.21 },
  { input: { ...simpleEmployee, grossSalary: 14000 }, netSalary: 6700.44 },
  { input: { ...simpleEmployee, grossSalary: 15000 }, netSalary: 7104.66 },
  { input: { ...simpleEmployee, grossSalary: 16000 }, netSalary: 7508.88 },
  { input: { ...simpleEmployee, grossSalary: 17000 }, netSalary: 7913.11 },
  { input: { ...simpleEmployee, grossSalary: 18000 }, netSalary: 8317.33 },
  { input: { ...simpleEmployee, grossSalary: 19000 }, netSalary: 8721.56 },
  { input: { ...simpleEmployee, grossSalary: 20000 }, netSalary: 9125.78 },

  { input: { ...simpleWorker, grossSalary: 2070.48 }, netSalary: 1991.38 },
  { input: { ...simpleWorker, grossSalary: 2100 }, netSalary: 2011.46 },
  { input: { ...simpleWorker, grossSalary: 2150 }, netSalary: 2045.41 },
  { input: { ...simpleWorker, grossSalary: 2200 }, netSalary: 2079.27 },
  { input: { ...simpleWorker, grossSalary: 2250 }, netSalary: 2092.28 },
  { input: { ...simpleWorker, grossSalary: 2300 }, netSalary: 2095.93 },
  { input: { ...simpleWorker, grossSalary: 2350 }, netSalary: 2103.89 },
  { input: { ...simpleWorker, grossSalary: 2400 }, netSalary: 2111.87 },
  { input: { ...simpleWorker, grossSalary: 2450 }, netSalary: 2119.85 },
  { input: { ...simpleWorker, grossSalary: 2500 }, netSalary: 2127.82 },
  { input: { ...simpleWorker, grossSalary: 2550 }, netSalary: 2135.79 },
  { input: { ...simpleWorker, grossSalary: 2600 }, netSalary: 2143.76 },
  { input: { ...simpleWorker, grossSalary: 2650 }, netSalary: 2151.74 },
  { input: { ...simpleWorker, grossSalary: 2700 }, netSalary: 2159.72 },
  { input: { ...simpleWorker, grossSalary: 2750 }, netSalary: 2167.68 },
  { input: { ...simpleWorker, grossSalary: 2800 }, netSalary: 2175.67 },
  { input: { ...simpleWorker, grossSalary: 2850 }, netSalary: 2184.43 },
  { input: { ...simpleWorker, grossSalary: 2900 }, netSalary: 2194.71 },
  { input: { ...simpleWorker, grossSalary: 2950 }, netSalary: 2204.98 },
  { input: { ...simpleWorker, grossSalary: 3000 }, netSalary: 2215.25 },
  { input: { ...simpleWorker, grossSalary: 3050 }, netSalary: 2225.52 },
  { input: { ...simpleWorker, grossSalary: 3100 }, netSalary: 2235.79 },
  { input: { ...simpleWorker, grossSalary: 3150 }, netSalary: 2246.07 },
  { input: { ...simpleWorker, grossSalary: 3200 }, netSalary: 2256.34 },
  { input: { ...simpleWorker, grossSalary: 3250 }, netSalary: 2266.61 },
  { input: { ...simpleWorker, grossSalary: 3300 }, netSalary: 2284.71 },
  { input: { ...simpleWorker, grossSalary: 3400 }, netSalary: 2332.64 },
  { input: { ...simpleWorker, grossSalary: 3500 }, netSalary: 2377.36 },
  { input: { ...simpleWorker, grossSalary: 3600 }, netSalary: 2418.24 },
  { input: { ...simpleWorker, grossSalary: 3700 }, netSalary: 2459.12 },
  { input: { ...simpleWorker, grossSalary: 3800 }, netSalary: 2500.11 },
  { input: { ...simpleWorker, grossSalary: 3900 }, netSalary: 2543.44 },
  { input: { ...simpleWorker, grossSalary: 4000 }, netSalary: 2586.79 },
  { input: { ...simpleWorker, grossSalary: 4100 }, netSalary: 2630.13 },
  { input: { ...simpleWorker, grossSalary: 4200 }, netSalary: 2673.46 },
  { input: { ...simpleWorker, grossSalary: 4300 }, netSalary: 2716.82 },
  { input: { ...simpleWorker, grossSalary: 4400 }, netSalary: 2760.16 },
  { input: { ...simpleWorker, grossSalary: 4500 }, netSalary: 2803.5 },
  { input: { ...simpleWorker, grossSalary: 4600 }, netSalary: 2846.84 },
  { input: { ...simpleWorker, grossSalary: 4700 }, netSalary: 2890.19 },
  { input: { ...simpleWorker, grossSalary: 4800 }, netSalary: 2933.53 },
  { input: { ...simpleWorker, grossSalary: 4900 }, netSalary: 2976.88 },
  { input: { ...simpleWorker, grossSalary: 5000 }, netSalary: 3020.22 },
  { input: { ...simpleWorker, grossSalary: 5100 }, netSalary: 3063.55 },
  { input: { ...simpleWorker, grossSalary: 5200 }, netSalary: 3106.9 },
  { input: { ...simpleWorker, grossSalary: 5300 }, netSalary: 3150.25 },
  { input: { ...simpleWorker, grossSalary: 5400 }, netSalary: 3193.59 },
  { input: { ...simpleWorker, grossSalary: 5500 }, netSalary: 3236.93 },
  { input: { ...simpleWorker, grossSalary: 5600 }, netSalary: 3277.73 },
  { input: { ...simpleWorker, grossSalary: 5700 }, netSalary: 3317.66 },
  { input: { ...simpleWorker, grossSalary: 5800 }, netSalary: 3357.6 },
  { input: { ...simpleWorker, grossSalary: 5900 }, netSalary: 3397.53 },
  { input: { ...simpleWorker, grossSalary: 6000 }, netSalary: 3437.47 },
  { input: { ...simpleWorker, grossSalary: 6100 }, netSalary: 3477.41 },
  { input: { ...simpleWorker, grossSalary: 6200 }, netSalary: 3517.34 },
  { input: { ...simpleWorker, grossSalary: 6300 }, netSalary: 3557.28 },
  { input: { ...simpleWorker, grossSalary: 6400 }, netSalary: 3597.21 },
  { input: { ...simpleWorker, grossSalary: 6500 }, netSalary: 3637.15 },
  { input: { ...simpleWorker, grossSalary: 6600 }, netSalary: 3677.08 },
  { input: { ...simpleWorker, grossSalary: 6700 }, netSalary: 3717.02 },
  { input: { ...simpleWorker, grossSalary: 6800 }, netSalary: 3756.96 },
  { input: { ...simpleWorker, grossSalary: 6900 }, netSalary: 3796.89 },
  { input: { ...simpleWorker, grossSalary: 7000 }, netSalary: 3836.83 },
  { input: { ...simpleWorker, grossSalary: 7500 }, netSalary: 4036.51 },
  { input: { ...simpleWorker, grossSalary: 8000 }, netSalary: 4236.19 },
  { input: { ...simpleWorker, grossSalary: 8500 }, netSalary: 4435.87 },
  { input: { ...simpleWorker, grossSalary: 9000 }, netSalary: 4635.56 },
  { input: { ...simpleWorker, grossSalary: 9500 }, netSalary: 4835.24 },
  { input: { ...simpleWorker, grossSalary: 10000 }, netSalary: 5034.92 },
  { input: { ...simpleWorker, grossSalary: 11000 }, netSalary: 5434.28 },
  { input: { ...simpleWorker, grossSalary: 12000 }, netSalary: 5833.64 },
  { input: { ...simpleWorker, grossSalary: 13000 }, netSalary: 6233 },
  { input: { ...simpleWorker, grossSalary: 14000 }, netSalary: 6632.37 },
  { input: { ...simpleWorker, grossSalary: 15000 }, netSalary: 7031.73 },
  { input: { ...simpleWorker, grossSalary: 16000 }, netSalary: 7431.09 },
  { input: { ...simpleWorker, grossSalary: 17000 }, netSalary: 7830.46 },
  { input: { ...simpleWorker, grossSalary: 18000 }, netSalary: 8229.82 },
  { input: { ...simpleWorker, grossSalary: 19000 }, netSalary: 8629.18 },
  { input: { ...simpleWorker, grossSalary: 20000 }, netSalary: 9028.54 },

  { input: { ...partTimeEmployee, grossSalary: 1743.56 }, netSalary: 1743.56 },
  { input: { ...partTimeEmployee, grossSalary: 1800 }, netSalary: 1800 },
  { input: { ...partTimeEmployee, grossSalary: 1900 }, netSalary: 1868.58 },
  { input: { ...partTimeEmployee, grossSalary: 2000 }, netSalary: 1888.53 },
  { input: { ...partTimeEmployee, grossSalary: 2100 }, netSalary: 1904.44 },
  { input: { ...partTimeEmployee, grossSalary: 2200 }, netSalary: 1920.75 },
  { input: { ...partTimeEmployee, grossSalary: 2300 }, netSalary: 1939.78 },
  { input: { ...partTimeEmployee, grossSalary: 2400 }, netSalary: 1959.52 },
  { input: { ...partTimeEmployee, grossSalary: 2500 }, netSalary: 1982.81 },
  { input: { ...partTimeEmployee, grossSalary: 2600 }, netSalary: 2006.17 },
  { input: { ...partTimeEmployee, grossSalary: 2700 }, netSalary: 2029.47 },
  { input: { ...partTimeEmployee, grossSalary: 2800 }, netSalary: 2064.22 },
  { input: { ...partTimeEmployee, grossSalary: 2900 }, netSalary: 2112.85 },
  { input: { ...partTimeEmployee, grossSalary: 3000 }, netSalary: 2161.47 },
  { input: { ...partTimeEmployee, grossSalary: 3100 }, netSalary: 2210.09 },
  { input: { ...partTimeEmployee, grossSalary: 3200 }, netSalary: 2258.72 },
  { input: { ...partTimeEmployee, grossSalary: 3300 }, netSalary: 2307.34 },
  { input: { ...partTimeEmployee, grossSalary: 3400 }, netSalary: 2355.97 },
  { input: { ...partTimeEmployee, grossSalary: 3500 }, netSalary: 2400.4 },
  { input: { ...partTimeEmployee, grossSalary: 4000 }, netSalary: 2614.26 },
  { input: { ...partTimeEmployee, grossSalary: 4500 }, netSalary: 2831.86 },
  { input: { ...partTimeEmployee, grossSalary: 5000 }, netSalary: 3051.72 },
  { input: { ...partTimeEmployee, grossSalary: 5500 }, netSalary: 3270.46 },
  { input: { ...partTimeEmployee, grossSalary: 6000 }, netSalary: 3467.07 },
  { input: { ...partTimeEmployee, grossSalary: 6500 }, netSalary: 3668.75 },
  { input: { ...partTimeEmployee, grossSalary: 7000 }, netSalary: 3870.86 },
  { input: { ...partTimeEmployee, grossSalary: 7500 }, netSalary: 4072.98 },
  { input: { ...partTimeEmployee, grossSalary: 8000 }, netSalary: 4275.09 },
  { input: { ...partTimeEmployee, grossSalary: 8500 }, netSalary: 4477.2 },
  { input: { ...partTimeEmployee, grossSalary: 9000 }, netSalary: 4679.31 },
  { input: { ...partTimeEmployee, grossSalary: 9500 }, netSalary: 4881.43 },
  { input: { ...partTimeEmployee, grossSalary: 10000 }, netSalary: 5083.54 },
  { input: { ...partTimeEmployee, grossSalary: 11000 }, netSalary: 5487.76 },
  { input: { ...partTimeEmployee, grossSalary: 12000 }, netSalary: 5891.99 },
  { input: { ...partTimeEmployee, grossSalary: 13000 }, netSalary: 6296.21 },
  { input: { ...partTimeEmployee, grossSalary: 14000 }, netSalary: 6700.44 },
  { input: { ...partTimeEmployee, grossSalary: 15000 }, netSalary: 7104.66 },
  { input: { ...partTimeEmployee, grossSalary: 16000 }, netSalary: 7508.88 },
  { input: { ...partTimeEmployee, grossSalary: 17000 }, netSalary: 7913.11 },
  { input: { ...partTimeEmployee, grossSalary: 18000 }, netSalary: 8317.33 },
  { input: { ...partTimeEmployee, grossSalary: 19000 }, netSalary: 8721.56 },
  { input: { ...partTimeEmployee, grossSalary: 20000 }, netSalary: 9125.78 },

  { input: { ...marriedEmployeeOneIncome, grossSalary: 2100 }, netSalary: 2090.88 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 2328.33 }, netSalary: 2267.35 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 2500 }, netSalary: 2368.36 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 3000 }, netSalary: 2580.1 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 4029.16 }, netSalary: 3051.07 },
  { input: { ...marriedEmployeeOneIncome, grossSalary: 5000 }, netSalary: 3550.8 },

  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 2100 }, netSalary: 2090.88 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 2328.33 }, netSalary: 2267.35 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 2500 }, netSalary: 2368.36 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 3000 }, netSalary: 2632.1 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 4029.16 }, netSalary: 3103.07 },
  { input: { ...marriedEmployeeWithDisabledPartner, grossSalary: 5000 }, netSalary: 3602.8 },

  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 1319.16 }, netSalary: 1234.56 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 2100 }, netSalary: 1816.41 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 2328.33 }, netSalary: 2008.06 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 2500 }, netSalary: 2155.4 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 3000 }, netSalary: 2507.57 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 4029.16 }, netSalary: 3051.07 },
  { input: { ...marriedHalfTimeEmployeeOneIncome, grossSalary: 5000 }, netSalary: 3550.8 },

  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 2328.33 }, netSalary: 2091.45 },
  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 2500 }, netSalary: 2124.08 },
  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 3000 }, netSalary: 2226.22 },
  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 4029.16 }, netSalary: 2628.98 },
  { input: { ...marriedEmployeeTwoIncomes, grossSalary: 5000 }, netSalary: 3055.88 },

  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 1319.16 }, netSalary: 1229.41 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 2000 }, netSalary: 1652.68 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 2100 }, netSalary: 1712.39 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 2328.33 }, netSalary: 1830.77 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 2500 }, netSalary: 1914.24 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 3000 }, netSalary: 2157.36 },
  { input: { ...marriedHalfTimeEmployeeTwoIncomes, grossSalary: 4029.16 }, netSalary: 2628.98 },

  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 2100 }, netSalary: 2093.48 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 2328.33 }, netSalary: 2199.56 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 2500 }, netSalary: 2232.19 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 3000 }, netSalary: 2334.33 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 4029.16 }, netSalary: 2730.42 },
  { input: { ...divorcedEmployeeWithOneKid, grossSalary: 5000 }, netSalary: 3155.72 },

  { input: { ...widowedEmployeeWithOneKid, grossSalary: 2100 }, netSalary: 2093.48 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 2328.33 }, netSalary: 2199.56 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 2500 }, netSalary: 2232.19 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 3000 }, netSalary: 2334.33 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 4029.16 }, netSalary: 2730.42 },
  { input: { ...widowedEmployeeWithOneKid, grossSalary: 5000 }, netSalary: 3155.72 },

  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 1319.16 }, netSalary: 1234.56 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 2100 }, netSalary: 1818.99 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 2328.33 }, netSalary: 1938.88 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 2500 }, netSalary: 2022.35 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 3000 }, netSalary: 2265.47 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 4029.16 }, netSalary: 2730.42 },
  { input: { ...widowedHalfTimeEmployeeWithOneKid, grossSalary: 5000 }, netSalary: 3155.72 },

  { input: { ...partTimeWorker, grossSalary: 1743.56 }, netSalary: 1743.56 },
  { input: { ...partTimeWorker, grossSalary: 1800 }, netSalary: 1800 },
  { input: { ...partTimeWorker, grossSalary: 1900 }, netSalary: 1871.49 },
  { input: { ...partTimeWorker, grossSalary: 2000 }, netSalary: 1886.4 },
  { input: { ...partTimeWorker, grossSalary: 2100 }, netSalary: 1901.44 },
  { input: { ...partTimeWorker, grossSalary: 2200 }, netSalary: 1917.52 },
  { input: { ...partTimeWorker, grossSalary: 2300 }, netSalary: 1933.5 },

  { input: { ...partTimeWorker, grossSalary: 2400 }, netSalary: 1950.23 },
  { input: { ...partTimeWorker, grossSalary: 2500 }, netSalary: 1970.81 },
  { input: { ...partTimeWorker, grossSalary: 2600 }, netSalary: 1991.46 },
  { input: { ...partTimeWorker, grossSalary: 2700 }, netSalary: 2012.04 },
  { input: { ...partTimeWorker, grossSalary: 2800 }, netSalary: 2045.01 },
  { input: { ...partTimeWorker, grossSalary: 2900 }, netSalary: 2092.95 },
  { input: { ...partTimeWorker, grossSalary: 3000 }, netSalary: 2140.89 },
  { input: { ...partTimeWorker, grossSalary: 3500 }, netSalary: 2377.36 },
  { input: { ...partTimeWorker, grossSalary: 4000 }, netSalary: 2586.79 },
  { input: { ...partTimeWorker, grossSalary: 4500 }, netSalary: 2803.5 },
  { input: { ...partTimeWorker, grossSalary: 5000 }, netSalary: 3020.22 },
  { input: { ...partTimeWorker, grossSalary: 5500 }, netSalary: 3236.93 },
  { input: { ...partTimeWorker, grossSalary: 6000 }, netSalary: 3437.47 },
  { input: { ...partTimeWorker, grossSalary: 6500 }, netSalary: 3637.15 },
  { input: { ...partTimeWorker, grossSalary: 7000 }, netSalary: 3836.83 },
  { input: { ...partTimeWorker, grossSalary: 7500 }, netSalary: 4036.51 },
  { input: { ...partTimeWorker, grossSalary: 8000 }, netSalary: 4236.19 },
  { input: { ...partTimeWorker, grossSalary: 8500 }, netSalary: 4435.87 },
  { input: { ...partTimeWorker, grossSalary: 9000 }, netSalary: 4635.56 },
  { input: { ...partTimeWorker, grossSalary: 10000 }, netSalary: 5034.92 },
  { input: { ...partTimeWorker, grossSalary: 11000 }, netSalary: 5434.28 },
  { input: { ...partTimeWorker, grossSalary: 12000 }, netSalary: 5833.64 },
  { input: { ...partTimeWorker, grossSalary: 13000 }, netSalary: 6233 },
  { input: { ...partTimeWorker, grossSalary: 14000 }, netSalary: 6632.37 },
  { input: { ...partTimeWorker, grossSalary: 15000 }, netSalary: 7031.73 },
  { input: { ...partTimeWorker, grossSalary: 16000 }, netSalary: 7431.09 },
  { input: { ...partTimeWorker, grossSalary: 17000 }, netSalary: 7830.46 },
  { input: { ...partTimeWorker, grossSalary: 18000 }, netSalary: 8229.82 },
  { input: { ...partTimeWorker, grossSalary: 19000 }, netSalary: 8629.18 },
  { input: { ...partTimeWorker, grossSalary: 20000 }, netSalary: 9028.54 },

  { input: { ...halfTimeEmployee, grossSalary: 1319.16 }, netSalary: 1234.56 },
  { input: { ...halfTimeEmployeeWithOneKid, grossSalary: 1319.16 }, netSalary: 1234.56 },
  { input: { ...employeeWithOneKid, grossSalary: 2100 }, netSalary: 2093.48 },
  { input: { ...employeeWithOneKid, grossSalary: 2328.33 }, netSalary: 2199.56 },
  { input: { ...employeeWithOneKid, grossSalary: 2500 }, netSalary: 2232.19 },
  { input: { ...employeeWithOneKid, grossSalary: 3000 }, netSalary: 2334.33 },
  { input: { ...employeeWithOneKid, grossSalary: 4029.16 }, netSalary: 2730.42 },
  { input: { ...employeeWithOneKid, grossSalary: 5000 }, netSalary: 3155.72 },

  { input: { ...employeeWithOneDisabledKid, grossSalary: 2100 }, netSalary: 2093.48 },
  { input: { ...employeeWithOneDisabledKid, grossSalary: 2328.33 }, netSalary: 2271.46 },
  { input: { ...employeeWithOneDisabledKid, grossSalary: 2500 }, netSalary: 2318.19 },
  { input: { ...employeeWithOneDisabledKid, grossSalary: 3000 }, netSalary: 2420.33 },
  { input: { ...employeeWithOneDisabledKid, grossSalary: 4029.16 }, netSalary: 2816.42 },
  { input: { ...employeeWithOneDisabledKid, grossSalary: 5000 }, netSalary: 3241.72 },

  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 2100 }, netSalary: 2093.48 },
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 2328.33 }, netSalary: 2271.46 },
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 2500 }, netSalary: 2372.47 },
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 3000 }, netSalary: 2649.33 },
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 4029.16 }, netSalary: 3045.42 },
  { input: { ...employeeWithOneAbleAndOneDisabledKid, grossSalary: 5000 }, netSalary: 3470.72 },

  { input: { ...employeeWithFourKids, grossSalary: 2100 }, netSalary: 2093.48 },
  { input: { ...employeeWithFourKids, grossSalary: 3000 }, netSalary: 2664.88 },
  { input: { ...employeeWithFiveKids, grossSalary: 4000 }, netSalary: 3440.96 },
  { input: { ...employeeWithSixKids, grossSalary: 5000 }, netSalary: 4296.99 },
  { input: { ...employeeWithSevenKids, grossSalary: 6000 }, netSalary: 5029.07 },
  { input: { ...employeeWithEightKids, grossSalary: 7000 }, netSalary: 5755.86 },

  { input: { ...employeeWith100Kids, grossSalary: 2100 }, netSalary: 2093.48 },
  { input: { ...employeeWith100Kids, grossSalary: 2328.33 }, netSalary: 2271.46 },
  { input: { ...employeeWith100Kids, grossSalary: 2500 }, netSalary: 2372.47 },
  { input: { ...employeeWith100Kids, grossSalary: 3000 }, netSalary: 2664.88 },
  { input: { ...employeeWith100Kids, grossSalary: 4029.16 }, netSalary: 3465.32 },
  { input: { ...employeeWith100Kids, grossSalary: 5000 }, netSalary: 4296.99 },

  { input: { ...disabledEmployee, grossSalary: 2100 }, netSalary: 2056.01 },
  { input: { ...disabledEmployee, grossSalary: 2328.33 }, netSalary: 2147.56 },
  { input: { ...disabledEmployee, grossSalary: 2500 }, netSalary: 2180.19 },
  { input: { ...disabledEmployee, grossSalary: 3000 }, netSalary: 2282.33 },
  { input: { ...disabledEmployee, grossSalary: 4029.16 }, netSalary: 2678.42 },
  { input: { ...disabledEmployee, grossSalary: 5000 }, netSalary: 3103.72 },

  { input: { ...employeeWithGroupInsurance, grossSalary: 2100 }, netSalary: 2016.76, netIncome: 1974.26 },
  { input: { ...employeeWithGroupInsurance, grossSalary: 2328.33 }, netSalary: 2108.31, netIncome: 2065.81 },
  { input: { ...employeeWithGroupInsurance, grossSalary: 2500 }, netSalary: 2140.94, netIncome: 2098.44 },
  { input: { ...employeeWithGroupInsurance, grossSalary: 3000 }, netSalary: 2243.08, netIncome: 2200.58 },
  { input: { ...employeeWithGroupInsurance, grossSalary: 4029.16 }, netSalary: 2639.17, netIncome: 2596.67 },
  { input: { ...employeeWithGroupInsurance, grossSalary: 5000 }, netSalary: 3064.47, netIncome: 3021.97 },

  { input: { ...employeeWithOtherNetIncome, grossSalary: 2100 }, netSalary: 2004.01, netIncome: 2104.01 },
  { input: { ...employeeWithOtherNetIncome, grossSalary: 2328.33 }, netSalary: 2095.56, netIncome: 2195.56 },
  { input: { ...employeeWithOtherNetIncome, grossSalary: 2500 }, netSalary: 2128.19, netIncome: 2228.19 },
  { input: { ...employeeWithOtherNetIncome, grossSalary: 3000 }, netSalary: 2230.33, netIncome: 2330.33 },
  { input: { ...employeeWithOtherNetIncome, grossSalary: 4029.16 }, netSalary: 2626.42, netIncome: 2726.42 },
  { input: { ...employeeWithOtherNetIncome, grossSalary: 5000 }, netSalary: 3051.72, netIncome: 3151.72 },

  { input: { ...employeeWithDieselCar, grossSalary: 3000 }, netSalary: 2131.29 },
  { input: { ...employeeWithDieselCarUnknownEmissions, grossSalary: 3000 }, netSalary: 2108.05 },
  { input: { ...employeeWithDieselCarAndPersonalContribution, grossSalary: 3000 }, netSalary: 2174.13, netIncome: 2074.13 },
  { input: { ...employeeWithGasolineCar, grossSalary: 3000 }, netSalary: 2124.39 },
  { input: { ...employeeWithElectricCar, grossSalary: 3000 }, netSalary: 2170.35 },
  { input: { ...employeeWithHybridCar, grossSalary: 3000 }, netSalary: 2160.61 },
  { input: { ...employeeWithNaturalGasCar, grossSalary: 3000 }, netSalary: 2039.49 },

  { input: { ...employeeWithMoreRecentDieselCar, grossSalary: 3000 }, netSalary: 2133.47 },
  { input: { ...employeeWithMoreRecentDieselCarUnknownEmissions, grossSalary: 3000 }, netSalary: 2110.84 },
  { input: { ...employeeWithMoreRecentDieselCarAndPersonalContribution, grossSalary: 3000 }, netSalary: 2176.38, netIncome: 2076.38 },
  { input: { ...employeeWithMoreRecentGasolineCar, grossSalary: 3000 }, netSalary: 2126.71 },
  { input: { ...employeeWithMoreRecentElectricCar, grossSalary: 3000 }, netSalary: 2170.63 },
  { input: { ...employeeWithMoreRecentHybridCar, grossSalary: 3000 }, netSalary: 2156.91 },
  { input: { ...employeeWithMoreRecentNaturalGasCar, grossSalary: 3000 }, netSalary: 2035.04 },

  { input: { ...halfTimeWorker, grossSalary: 1319.16 }, netSalary: 1227.78 },
  { input: { ...halfTimeWorkerWithOneKid, grossSalary: 1319.16 }, netSalary: 1227.78 },
  { input: { ...workerWithOneKid, grossSalary: 2100 }, netSalary: 2088.81 },
  { input: { ...workerWithOneKid, grossSalary: 2328.33 }, netSalary: 2204.44 },
  { input: { ...workerWithOneKid, grossSalary: 2500 }, netSalary: 2231.82 },
  { input: { ...workerWithOneKid, grossSalary: 3000 }, netSalary: 2319.25 },
  { input: { ...workerWithOneKid, grossSalary: 4029.16 }, netSalary: 2703.42 },
  { input: { ...workerWithOneKid, grossSalary: 5000 }, netSalary: 3124.22 },

  { input: { ...workerWithOneDisabledKid, grossSalary: 2100 }, netSalary: 2088.81 },
  { input: { ...workerWithOneDisabledKid, grossSalary: 2328.33 }, netSalary: 2265.8 },
  { input: { ...workerWithOneDisabledKid, grossSalary: 2500 }, netSalary: 2317.82 },
  { input: { ...workerWithOneDisabledKid, grossSalary: 3000 }, netSalary: 2405.25 },
  { input: { ...workerWithOneDisabledKid, grossSalary: 4029.16 }, netSalary: 2789.42 },
  { input: { ...workerWithOneDisabledKid, grossSalary: 5000 }, netSalary: 3210.22 },

  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 2100 }, netSalary: 2088.81 },
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 2328.33 }, netSalary: 2265.8 },
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 2500 }, netSalary: 2361.16 },
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 3000 }, netSalary: 2634.25 },
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 4029.16 }, netSalary: 3018.42 },
  { input: { ...workerWithOneAbleAndOneDisabledKid, grossSalary: 5000 }, netSalary: 3439.22 },

  { input: { ...workerWith100Kids, grossSalary: 2100 }, netSalary: 2088.81 },
  { input: { ...workerWith100Kids, grossSalary: 2328.33 }, netSalary: 2265.8 },
  { input: { ...workerWith100Kids, grossSalary: 2500 }, netSalary: 2361.16 },
  { input: { ...workerWith100Kids, grossSalary: 3000 }, netSalary: 2636.96 },
  { input: { ...workerWith100Kids, grossSalary: 4029.16 }, netSalary: 3418.04 },
  { input: { ...workerWith100Kids, grossSalary: 5000 }, netSalary: 4240.31 },

  { input: { ...disabledWorker, grossSalary: 2100 }, netSalary: 2063.46 },
  { input: { ...disabledWorker, grossSalary: 2328.33 }, netSalary: 2152.44 },
  { input: { ...disabledWorker, grossSalary: 2500 }, netSalary: 2179.82 },
  { input: { ...disabledWorker, grossSalary: 3000 }, netSalary: 2267.25 },
  { input: { ...disabledWorker, grossSalary: 4029.16 }, netSalary: 2651.42 },
  { input: { ...disabledWorker, grossSalary: 5000 }, netSalary: 3072.22 },

  { input: { ...workerWithGroupInsurance, grossSalary: 2100 }, netSalary: 2024.21, netIncome: 1981.71 },
  { input: { ...workerWithGroupInsurance, grossSalary: 2328.33 }, netSalary: 2113.19, netIncome: 2070.69 },
  { input: { ...workerWithGroupInsurance, grossSalary: 2500 }, netSalary: 2140.57, netIncome: 2098.07 },
  { input: { ...workerWithGroupInsurance, grossSalary: 3000 }, netSalary: 2228, netIncome: 2185.5 },
  { input: { ...workerWithGroupInsurance, grossSalary: 4029.16 }, netSalary: 2612.17, netIncome: 2569.67 },
  { input: { ...workerWithGroupInsurance, grossSalary: 5000 }, netSalary: 3032.97, netIncome: 2990.47 },

  { input: { ...workerWithOtherNetIncome, grossSalary: 2100 }, netSalary: 2011.46, netIncome: 2111.46 },
  { input: { ...workerWithOtherNetIncome, grossSalary: 2328.33 }, netSalary: 2100.44, netIncome: 2200.44 },
  { input: { ...workerWithOtherNetIncome, grossSalary: 2500 }, netSalary: 2127.82, netIncome: 2227.82 },
  { input: { ...workerWithOtherNetIncome, grossSalary: 3000 }, netSalary: 2215.25, netIncome: 2315.25 },
  { input: { ...workerWithOtherNetIncome, grossSalary: 4029.16 }, netSalary: 2599.42, netIncome: 2699.42 },
  { input: { ...workerWithOtherNetIncome, grossSalary: 5000 }, netSalary: 3020.22, netIncome: 3120.22 },

  { input: { ...marriedWorkerOneIncome, grossSalary: 2100 }, netSalary: 2084.7 },
  { input: { ...marriedWorkerOneIncome, grossSalary: 2328.33 }, netSalary: 2261.69 },
  { input: { ...marriedWorkerOneIncome, grossSalary: 2500 }, netSalary: 2357.05 },
  { input: { ...marriedWorkerOneIncome, grossSalary: 3000 }, netSalary: 2563.8 },
  { input: { ...marriedWorkerOneIncome, grossSalary: 4029.16 }, netSalary: 3021.4 },
  { input: { ...marriedWorkerOneIncome, grossSalary: 5000 }, netSalary: 3516.59 },

  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 2100 }, netSalary: 2084.7 },
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 2328.33 }, netSalary: 2261.69 },
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 2500 }, netSalary: 2357.05 },
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 3000 }, netSalary: 2615.8 },
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 4029.16 }, netSalary: 3073.4 },
  { input: { ...marriedWorkerWithDisabledPartner, grossSalary: 5000 }, netSalary: 3568.59 },

  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 2100 }, netSalary: 1788.27 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 2328.33 }, netSalary: 1981.66 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 2500 }, netSalary: 2127.06 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 3000 }, netSalary: 2485.48 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 4029.16 }, netSalary: 3021.4 },
  { input: { ...marriedHalfTimeWorkerOneIncome, grossSalary: 5000 }, netSalary: 3516.59 },

  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 2000 }, netSalary: 1629.86 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 2100 }, netSalary: 1690.12 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 2328.33 }, netSalary: 1814.79 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 2500 }, netSalary: 1897.09 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 3000 }, netSalary: 2136.78 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 4029.16 }, netSalary: 2603.59 },
  { input: { ...marriedHalfTimeWorkerTwoIncomes, grossSalary: 5000 }, netSalary: 3024.38 },

  { input: { ...marriedWorkerTwoIncomes, grossSalary: 2100 }, netSalary: 2007.35 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 2328.33 }, netSalary: 2096.33 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 2500 }, netSalary: 2123.71 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 3000 }, netSalary: 2211.14 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 4029.16 }, netSalary: 2603.59 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 5000 }, netSalary: 3024.38 },
  { input: { ...marriedWorkerTwoIncomes, grossSalary: 6000 }, netSalary: 3446.77 },

  { input: { ...marriedWorkerPartnerLowPension, grossSalary: 4000 }, netSalary: 2880.45 },
  { input: { ...marriedWorkerPartnerLowOtherRevenue, grossSalary: 3000 }, netSalary: 2356.14 },

  { input: { ...divorcedWorkerWithOneKid, grossSalary: 2100 }, netSalary: 2088.81 },
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 2328.33 }, netSalary: 2204.44 },
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 2500 }, netSalary: 2231.82 },
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 3000 }, netSalary: 2319.25 },
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 4029.16 }, netSalary: 2703.42 },
  { input: { ...divorcedWorkerWithOneKid, grossSalary: 5000 }, netSalary: 3124.22 },

  { input: { ...widowedWorkerWithOneKid, grossSalary: 2100 }, netSalary: 2088.81 },
  { input: { ...widowedWorkerWithOneKid, grossSalary: 2328.33 }, netSalary: 2204.44 },
  { input: { ...widowedWorkerWithOneKid, grossSalary: 2500 }, netSalary: 2231.82 },
  { input: { ...widowedWorkerWithOneKid, grossSalary: 3000 }, netSalary: 2319.25 },
  { input: { ...widowedWorkerWithOneKid, grossSalary: 4029.16 }, netSalary: 2703.42 },
  { input: { ...widowedWorkerWithOneKid, grossSalary: 5000 }, netSalary: 3124.22 },

  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 1319.16 }, netSalary: 1227.78 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 2100 }, netSalary: 1792.38 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 2328.33 }, netSalary: 1922.9 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 2500 }, netSalary: 2005.2 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 3000 }, netSalary: 2244.89 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 4029.16 }, netSalary: 2703.42 },
  { input: { ...widowedHalfTimeWorkerWithOneKid, grossSalary: 5000 }, netSalary: 3124.22 },

  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(2100) }, netSalary: 24048.13, netIncome: 26385.93 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(2328.33) }, netSalary: 25146.75, netIncome: 27656.7 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(2500) }, netSalary: 25538.32, netIncome: 28233.33 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(3000) }, netSalary: 26818.96, netIncome: 29735.35 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(4029.16) }, netSalary: 31516.99, netIncome: 35078.43 },
  { input: { ...simpleEmployeeAnnual, monthlyIncomes: getMonthlyIncomes(5000) }, netSalary: 36620.69, netIncome: 40686.05 },

  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(2100) }, netSalary: 24008.12, netIncome: 26345.92 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(2328.33) }, netSalary: 25205.29, netIncome: 27715.24 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(2500) }, netSalary: 25533.86, netIncome: 28228.87 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(3000) }, netSalary: 26642.26, netIncome: 29558.65 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(4029.16) }, netSalary: 31193.06, netIncome: 34754.5 },
  { input: { ...simpleWorkerAnnual, monthlyIncomes: getMonthlyIncomes(5000) }, netSalary: 36242.6, netIncome: 40307.96 },
]
