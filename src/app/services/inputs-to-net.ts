import { FamilySituation, SalaryCalculationInput, Status, WorkRegime } from "./tax-calculator.service";

interface Situation {
  input: SalaryCalculationInput;
  net: number;
}

const simpleEmployee: SalaryCalculationInput = {
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
    numDependent65Plussers: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
  disabled: false,
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
    numDependent65Plussers: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const employeeWithOneKid: SalaryCalculationInput = {
  ...simpleEmployee,
  dependentPeople: {
    numDependentChildren: 1,
    numDisabledDependentChildren: 0,
    numDependent65Plussers: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const employeeWithOneDisabledKid: SalaryCalculationInput = {
  ...simpleEmployee,
  dependentPeople: {
    numDependentChildren: 0,
    numDisabledDependentChildren: 1,
    numDependent65Plussers: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const employeeWithOneAbleAndOneDisabledKid: SalaryCalculationInput = {
  ...simpleEmployee,
  dependentPeople: {
    numDependentChildren: 1,
    numDisabledDependentChildren: 1,
    numDependent65Plussers: 0,
    numDependentOthers: 0,
    numDisabledDependentOthers: 0,
  },
};
const employeeWith100Kids: SalaryCalculationInput = {
  ...simpleEmployee,
  dependentPeople: {
    numDependentChildren: 100,
    numDisabledDependentChildren: 0,
    numDependent65Plussers: 0,
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

export const INPUTS_TO_NET: Situation[] = [
  { input: { ...simpleEmployee, monthlyGrossSalary: 2070.48 }, net: 1952.30 },
  { input: { ...simpleEmployee, monthlyGrossSalary: 2100 }, net: 1969.22 },
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

  { input: { ...simpleWorker, monthlyGrossSalary: 2070.48 }, net: 1940.35 }, // Capped work bonus
  { input: { ...simpleWorker, monthlyGrossSalary: 2100 }, net: 1953.69 },    // Capped work bonus
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

  { input: { ...partTimeEmployee, monthlyGrossSalary: 1743.56 }, net: 1742.68 },
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
  { input: { ...employeeWithOneKid, monthlyGrossSalary: 2100 }, net: 2018.22 },            // Work bonus
  { input: { ...employeeWithOneKid, monthlyGrossSalary: 2328.33 }, net: 2071.33 },         // Withholding tier 2
  { input: { ...employeeWithOneKid, monthlyGrossSalary: 2500 }, net: 2103.95 },            // Work bonus
  { input: { ...employeeWithOneKid, monthlyGrossSalary: 3000 }, net: 2219.90 },            // Work bonus
  { input: { ...employeeWithOneKid, monthlyGrossSalary: 4029.16 }, net: 2630.70 },         // Withholding tier 3
  { input: { ...employeeWithOneKid, monthlyGrossSalary: 5000 }, net: 3056.01 },            // Withholding tier 4

  { input: { ...employeeWithOneDisabledKid, monthlyGrossSalary: 2100 }, net: 2093.48 },    // Work bonus
  { input: { ...employeeWithOneDisabledKid, monthlyGrossSalary: 2328.33 }, net: 2153.33 }, // Withholding tier 2
  { input: { ...employeeWithOneDisabledKid, monthlyGrossSalary: 2500 }, net: 2185.95 },    // Work bonus
  { input: { ...employeeWithOneDisabledKid, monthlyGrossSalary: 3000 }, net: 2301.90 },    // Work bonus
  { input: { ...employeeWithOneDisabledKid, monthlyGrossSalary: 4029.16 }, net: 2712.70 }, // Withholding tier 3
  { input: { ...employeeWithOneDisabledKid, monthlyGrossSalary: 5000 }, net: 3138.01 },    // Withholding tier 4

  { input: { ...employeeWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 2100 }, net: 2093.48 },    // Work bonus
  { input: { ...employeeWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 2328.33 }, net: 2236.99 }, // Withholding tier 2
  { input: { ...employeeWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 2500 }, net: 2338.00 },    // Work bonus
  { input: { ...employeeWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 3000 }, net: 2517.9 },     // Work bonus
  { input: { ...employeeWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 4029.16 }, net: 2928.7 },  // Withholding tier 3
  { input: { ...employeeWithOneAbleAndOneDisabledKid, monthlyGrossSalary: 5000 }, net: 3354.01 },    // Withholding tier 4

  { input: { ...employeeWith100Kids, monthlyGrossSalary: 2100 }, net: 2093.48 },    // Work bonus
  { input: { ...employeeWith100Kids, monthlyGrossSalary: 2328.33 }, net: 2236.99 }, // Withholding tier 2
  { input: { ...employeeWith100Kids, monthlyGrossSalary: 2500 }, net: 2338.00 },    // Work bonus
  { input: { ...employeeWith100Kids, monthlyGrossSalary: 3000 }, net: 2639.32 },    // Work bonus
  { input: { ...employeeWith100Kids, monthlyGrossSalary: 4029.16 }, net: 3465.32 }, // Withholding tier 3
  { input: { ...employeeWith100Kids, monthlyGrossSalary: 5000 }, net: 4296.99 },    // Withholding tier 4

  { input: { ...disabledEmployee, monthlyGrossSalary: 2100 }, net: 2018.22 },    // Work bonus
  { input: { ...disabledEmployee, monthlyGrossSalary: 2328.33 }, net: 2071.33 }, // Withholding tier 2
  { input: { ...disabledEmployee, monthlyGrossSalary: 2500 }, net: 2103.95 },    // Work bonus
  { input: { ...disabledEmployee, monthlyGrossSalary: 3000 }, net: 2219.90 },    // Work bonus
  { input: { ...disabledEmployee, monthlyGrossSalary: 4029.16 }, net: 2630.70 }, // Withholding tier 3
  { input: { ...disabledEmployee, monthlyGrossSalary: 5000 }, net: 3056.01 },    // Withholding tier 4

  { input: { ...employeeWithGroupInsurance, monthlyGrossSalary: 2100 }, net: 1939.47 },    // Work bonus
  { input: { ...employeeWithGroupInsurance, monthlyGrossSalary: 2328.33 }, net: 1992.58 }, // Withholding tier 2
  { input: { ...employeeWithGroupInsurance, monthlyGrossSalary: 2500 }, net: 2025.20 },    // Work bonus
  { input: { ...employeeWithGroupInsurance, monthlyGrossSalary: 3000 }, net: 2141.15 },    // Work bonus
  { input: { ...employeeWithGroupInsurance, monthlyGrossSalary: 4029.16 }, net: 2551.95 }, // Withholding tier 3
  { input: { ...employeeWithGroupInsurance, monthlyGrossSalary: 5000 }, net: 2977.26 },    // Withholding tier 4

  { input: { ...employeeWithOtherNetIncome, monthlyGrossSalary: 2100 }, net: 2069.22 },    // Work bonus
  { input: { ...employeeWithOtherNetIncome, monthlyGrossSalary: 2328.33 }, net: 2122.33 }, // Withholding tier 2
  { input: { ...employeeWithOtherNetIncome, monthlyGrossSalary: 2500 }, net: 2154.95 },    // Work bonus
  { input: { ...employeeWithOtherNetIncome, monthlyGrossSalary: 3000 }, net: 2270.90 },    // Work bonus
  { input: { ...employeeWithOtherNetIncome, monthlyGrossSalary: 4029.16 }, net: 2681.70 }, // Withholding tier 3
  { input: { ...employeeWithOtherNetIncome, monthlyGrossSalary: 5000 }, net: 3107.01 },    // Withholding tier 4
]
