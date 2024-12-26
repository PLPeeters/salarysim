import Decimal from "decimal.js";
import { TaxationInfo } from "./interfaces";

const D = (value: number | string | null): Decimal => new Decimal(value || 0);

export const taxationInfo: TaxationInfo = {
  year: 2025,
  isFinal: false,
  socialCotisationsPercentage: D(13.07),
  flatRateProfessionalExpenseTiers: [
    {
      from: D(0.01),
      to: D(19_766.67),
      flat_rate: D(0),
      percentage: D(30),
    },
    {
      from: D(19_766.68),
      to: D(Infinity),
      flat_rate: D(5_930.00),
      percentage: D(0),
    }
  ],
  taxTiers: [
    {
      from: D(0.01),
      to: D(10_900.00),
      percentage: D(0),
    },
    {
      from: D(10_900.01),
      to: D(16_310.00),
      percentage: D(26.75),
    },
    {
      from: D(16_310.01),
      to: D(28_790.00),
      percentage: D(42.80),
    },
    {
      from: D(28_790.01),
      to: D(49_820.00),
      percentage: D(48.15),
    },
    {
      from: D(49_820.01),
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

  maxRevenueAttributedToPartner: D(13_460.0),
  taxExemptQuota: D(10_900.0),
  taxExemptQuotaTax: D(2_915.75),

  yearlyDependentChildrenReductions: {
    one: D(612.00),
    two: D(1_608.00),
    three: D(4_296.00),
    four: D(7_428.00),
    five: D(10_836.00),
    six: D(14_232.00),
    seven: D(17_676.00),
    aboveSeven: {
      flatAmount: D(21_444.00),
      numIncludedChildren: 8,
      amountPerChild: D(3_780.00),
    },
  },
  dependentRetireeAgeThreshold: 66,
  yearlyReductionPerDependentRetiree: D(612.00),
  yearlyReductionPerDependentOther: D(612.00),
  yearlyReductionIfDisabled: D(612.00),
  yearlyReductionIfPartnerDisabled: D(612.00),
  lowPensionJanuaryThreshold: 565,
  yearlyReductionIfPartnerLowPension: D(3_390.00),
  lowOtherRevenueJanuaryThreshold: 283,
  yearlyReductionIfPartnerLowOtherRevenue: D(1_698.00),
  noRevenueJanuaryThreshold: 170,
  yearlyReductionIfIsolatedWithChildren: D(612.00),
};
