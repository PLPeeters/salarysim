import Decimal from "decimal.js";
import { TaxationInfo } from "./interfaces";

const D = (value: number | string | null): Decimal => new Decimal(value || 0);

export const taxationInfo: TaxationInfo = {
  year: 2024,
  isFinal: true,
  socialCotisationsPercentage: D(13.07),
  flatRateProfessionalExpenseTiers: [
    {
      from: D(0.01),
      to: D(19_166.67),
      flat_rate: D(0),
      percentage: D(30),
    },
    {
      from: D(19_166.68),
      to: D(Infinity),
      flat_rate: D(5_750.00),
      percentage: D(0),
    }
  ],
  taxTiers: [
    {
      from: D(0.01),
      to: D(10_580.00),
      percentage: D(0),
    },
    {
      from: D(10_580.01),
      to: D(15_830.00),
      percentage: D(26.75),
    },
    {
      from: D(15_830.01),
      to: D(27_940.00),
      percentage: D(42.80),
    },
    {
      from: D(27_940.01),
      to: D(48_350.00),
      percentage: D(48.15),
    },
    {
      from: D(48_350.01),
      to: D(Infinity),
      percentage: D(53.50),
    }
  ],

  // https://www.socialsecurity.be/employer/instructions/dmfa/fr/latest/instructions/special_contributions/other_specialcontributions/specialsocialsecuritycontribution.html
  specialSocialCotisationTiersIsolated: [
    {
      from: D(0.01),
      to: D(1_945.38),
      flatAmount: D(0),
      taxRate: D(0),
    },
    {
      from: D(1_945.39),
      to: D(2_190.18),
      flatAmount: D(0),
      includedInFlatAmount: D(1_945.38),
      taxRate: D(4.22),
    },
    {
      from: D(2_190.19),
      to: D(3_737.00),
      flatAmount: D(30.99).div(3),
      includedInFlatAmount: D(2_190.18),
      taxRate: D(1.1),
    },
    {
      from: D(3_737.01),
      to: D(4_100.00),
      flatAmount: D(82.05).div(3),
      includedInFlatAmount: D(3_737.00),
      taxRate: D(3.38),
    },
    {
      from: D(4_100.01),
      to: D(6_038.82),
      flatAmount: D(118.83).div(3),
      includedInFlatAmount: D(4_100.00),
      taxRate: D(1.10),
    },
    {
      from: D(6_038.83),
      to: D(Infinity),
      flatAmount: D(182.82).div(3),
      includedInFlatAmount: D(6_038.82),
      taxRate: D(0),
    }
  ],

  specialSocialCotisationTiersMarriedOneIncome: [
    {
      from: D(0.01),
      to: D(1_945.38),
      taxRate: D(0),
    },
    {
      from: D(1_945.39),
      to: D(2_190.18),
      includedInFlatAmount: D(1_945.38),
      taxRate: D(5.9),
    },
    {
      from: D(2_190.19),
      to: D(Infinity),
      flatAmount: D(43.32).div(3),
      includedInFlatAmount: D(2_190.18),
      taxRate: D(1.1),
      maxAmount: D(182.82).div(3),
    },
  ],

  specialSocialCotisationTiersMarriedTwoIncomes: [
    {
      from: D(0.01),
      to: D(3_285.29).div(3),
      taxRate: D(0),
    },
    {
      from: D(3_285.29).div(3).plus(0.01),
      to: D(5_836.14).div(3),
      flatAmount: D(15.45).div(3),
    },
    {
      from: D(5_836.14).div(3).plus(0.01),
      to: D(6_570.54).div(3),
      flatAmount: D(0),
      includedInFlatAmount: D(1_945.38),
      taxRate: D(5.9),
      minAmount: D(15.45).div(3),
    },
    {
      from: D(6_570.54).div(3).plus(0.01),
      to: D(Infinity),
      flatAmount: D(43.32).div(3),
      includedInFlatAmount: D(6_570.54).div(3),
      taxRate: D(1.1),
      maxAmount: D(154.92).div(3),
    },
  ],

  employmentBonusInfo: {
    employee: {
      partA: {
        maxSalary: D(3_207.40),
        flatAmount: D(118.22),
        multiplier: D(0.2442),
        amountToExclude: D(2_723.36),
      },
      partB: {
        maxSalary: D(2_723.36),
        flatAmount: D(159.43),
        multiplier: D(0.2699),
        amountToExclude: D(2_132.59),
      },
    },
    worker: {
      partA: {
        maxSalary: D(3_207.40),
        flatAmount: D(127.68),
        multiplier: D(0.2638),
        amountToExclude: D(2_723.36),
      },
      partB: {
        maxSalary: D(2_723.36),
        flatAmount: D(172.18),
        multiplier: D(0.2915),
        amountToExclude: D(2_132.59),
      },
    },
    partAProfessionalWithHoldingTaxReductionPercentage: D(33.14),
    partBProfessionalWithHoldingTaxReductionPercentage: D(52.54),
    maxYearlyAmount: D(3_331.8),
  },

  maxRevenueAttributedToPartner: D(13_060.0),
  taxExemptQuota: D(10_580.0),
  taxExemptQuotaTax: D(2_830.15),

  yearlyDependentChildrenReductions: {
    one: D(588.00),
    two: D(1_572.00),
    three: D(4_164.00),
    four: D(7_212.00),
    five: D(10_512.00),
    six: D(13_812.00),
    seven: D(17_148.00),
    aboveSeven: {
      flatAmount: D(20_808.00),
      numIncludedChildren: 8,
      amountPerChild: D(3_660.00),
    },
  },
  dependentRetireeAgeThreshold: 65,
  yearlyReductionPerDependentRetiree: D(588.00),
  yearlyReductionPerDependentOther: D(588.00),
  yearlyReductionIfDisabled: D(588.00),
  yearlyReductionIfPartnerDisabled: D(588.00),
  lowPensionJanuaryThreshold: 548,
  yearlyReductionIfPartnerLowPension: D(3_288.00),
  lowOtherRevenueJanuaryThreshold: 275,
  yearlyReductionIfPartnerLowOtherRevenue: D(1_650.00),
  noRevenueJanuaryThreshold: 165,
  yearlyReductionIfIsolatedWithChildren: D(588.00),

  exceptionalAllocationsTaxation: [
    {
      annualGrossRange: {
        from: D(0.01),
        to: D(10_115.00),
      },
      holidayPayPercentage: D(0),
      otherAllocationsPercentage: D(0),
    },
    {
      annualGrossRange: {
        from: D(10_115.01),
        to: D(12_930.00),
      },
      holidayPayPercentage: D(19.17),
      otherAllocationsPercentage: D(23.22),
    },
    {
      annualGrossRange: {
        from: D(12_930.01),
        to: D(16_460.00),
      },
      holidayPayPercentage: D(21.20),
      otherAllocationsPercentage: D(25.23),
    },
    {
      annualGrossRange: {
        from: D(16_460.01),
        to: D(19_740.00),
      },
      holidayPayPercentage: D(26.25),
      otherAllocationsPercentage: D(30.28),
    },
    {
      annualGrossRange: {
        from: D(19_740.01),
        to: D(22_330.00),
      },
      holidayPayPercentage: D(31.30),
      otherAllocationsPercentage: D(35.33),
    },
    {
      annualGrossRange: {
        from: D(22_330.01),
        to: D(24_940.00),
      },
      holidayPayPercentage: D(34.33),
      otherAllocationsPercentage: D(38.36),
    },
    {
      annualGrossRange: {
        from: D(24_940.01),
        to: D(30_150.00),
      },
      holidayPayPercentage: D(36.34),
      otherAllocationsPercentage: D(40.38),
    },
    {
      annualGrossRange: {
        from: D(30_150.01),
        to: D(32_800.00),
      },
      holidayPayPercentage: D(39.37),
      otherAllocationsPercentage: D(43.41),
    },
    {
      annualGrossRange: {
        from: D(32_800.01),
        to: D(43_440.00),
      },
      holidayPayPercentage: D(42.39),
      otherAllocationsPercentage: D(46.44),
    },
    {
      annualGrossRange: {
        from: D(43_440.01),
        to: D(56_730.00),
      },
      holidayPayPercentage: D(47.44),
      otherAllocationsPercentage: D(51.48),
    },
    {
      annualGrossRange: {
        from: D(56_730.01),
        to: D(Infinity),
      },
      holidayPayPercentage: D(53.5),
      otherAllocationsPercentage: D(53.5),
    },
  ],
  exceptionalAllocationsDependentChildrenExonerationTiers: [
    {
      numChildren: 1,
      limit: D(17_858),
    },
    {
      numChildren: 2,
      limit: D(21_280),
    },
    {
      numChildren: 3,
      limit: D(27_430),
    },
    {
      numChildren: 4,
      limit: D(34_280),
    },
    {
      numChildren: 5,
      limit: D(41_130),
    },
    {
      numChildren: 6,
      limit: D(47_980),
    },
    {
      numChildren: 7,
      limit: D(54_830),
    },
    {
      numChildren: 8,
      limit: D(61_680),
    },
    {
      numChildren: 9,
      limit: D(68_530),
    },
    {
      numChildren: 10,
      limit: D(75_380),
    },
    {
      numChildren: 11,
      limit: D(82_230),
    },
    {
      numChildren: 12,
      limit: D(89_080),
    },
  ],
  exceptionalAllocationsDependentChildrenReductionTiers: [
    {
      numChildren: 1,
      reductionPercentage: D(7.5),
      maxAnnualGross: D(27_410),
    },
    {
      numChildren: 2,
      reductionPercentage: D(20),
      maxAnnualGross: D(27_410),
    },
    {
      numChildren: 3,
      reductionPercentage: D(35),
      maxAnnualGross: D(30_150),
    },
    {
      numChildren: 4,
      reductionPercentage: D(55),
      maxAnnualGross: D(35_635),
    },
    {
      numChildren: 5,
      reductionPercentage: D(75),
      maxAnnualGross: D(38_375),
    },
  ],
};
