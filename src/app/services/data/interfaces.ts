import Decimal from "decimal.js";
import { SalaryCalculationInput, YearlySalaryCalculationInput } from "../tax-calculator.service";

export interface SocialSecurityTier {
  from: Decimal,
  to: Decimal,
  taxRate?: Decimal,
  flatAmount?: Decimal,
  includedInFlatAmount?: Decimal,
  minAmount?: Decimal,
  maxAmount?: Decimal,
};

export interface FlatRateProfessionalExpensesTier {
  from: Decimal,
  to: Decimal,
  flat_rate: Decimal,
  percentage: Decimal,
};

export interface TaxTier {
  from: Decimal,
  to: Decimal,
  percentage: Decimal,
};

export interface EmploymentBonusTierInfo {
  maxSalary: Decimal,
  flatAmount: Decimal,
  multiplier: Decimal,
  amountToExclude: Decimal,
};

export interface EmploymentBonusInfoForStatus {
  partA: EmploymentBonusTierInfo;
  partB: EmploymentBonusTierInfo;
};

export interface EmploymentBonusInfo {
  employee: EmploymentBonusInfoForStatus;
  worker: EmploymentBonusInfoForStatus;
  partAProfessionalWithHoldingTaxReductionPercentage: Decimal;
  partBProfessionalWithHoldingTaxReductionPercentage: Decimal;
  maxYearlyAmount: Decimal;
};

export interface DefaultDependentChildrenReduction {
  flatAmount: Decimal;
  numIncludedChildren: number;
  amountPerChild: Decimal;
}

export interface DependentChildrenReductions {
  one: Decimal;
  two: Decimal;
  three: Decimal;
  four: Decimal;
  five: Decimal;
  six: Decimal;
  seven: Decimal;
  aboveSeven: DefaultDependentChildrenReduction;
};

export interface DecimalRange {
  from: Decimal;
  to: Decimal;
}

export interface ExceptionalAllocationTaxationTier {
  annualGrossRange: DecimalRange;
  otherAllocationsPercentage: Decimal;
  holidayPayPercentage: Decimal;
};

export interface ExceptionalAllocationTaxationTier {
  annualGrossRange: DecimalRange;
  otherAllocationsPercentage: Decimal;
  holidayPayPercentage: Decimal;
};

export interface AnnualLimitBasedOnDependentChildren {
  numChildren: number;
  limit: Decimal;
};

export interface AnnualReductionBasedOnDependentChildren {
  numChildren: number;
  reductionPercentage: Decimal;
  maxAnnualGross: Decimal;
};

export interface TaxationInfo {
  year: number;
  isFinal: boolean;
  socialCotisationsPercentage: Decimal;
  flatRateProfessionalExpenseTiers: FlatRateProfessionalExpensesTier[];
  taxTiers: TaxTier[];
  specialSocialCotisationTiersIsolated: SocialSecurityTier[];
  specialSocialCotisationTiersMarriedOneIncome: SocialSecurityTier[];
  specialSocialCotisationTiersMarriedTwoIncomes: SocialSecurityTier[];

  employmentBonusInfo: EmploymentBonusInfo;

  maxRevenueAttributedToPartner: Decimal;
  taxExemptQuota: Decimal;
  taxExemptQuotaTax: Decimal;

  yearlyDependentChildrenReductions: DependentChildrenReductions;
  dependentRetireeAgeThreshold: number;
  yearlyReductionPerDependentRetiree: Decimal;
  yearlyReductionPerDependentOther: Decimal;
  yearlyReductionIfDisabled: Decimal;
  yearlyReductionIfPartnerDisabled: Decimal;
  lowPensionJanuaryThreshold: number;
  yearlyReductionIfPartnerLowPension: Decimal;
  lowOtherRevenueJanuaryThreshold: number;
  yearlyReductionIfPartnerLowOtherRevenue: Decimal;
  noRevenueJanuaryThreshold: number;
  yearlyReductionIfIsolatedWithChildren: Decimal;

  exceptionalAllocationsTaxation: ExceptionalAllocationTaxationTier[];
  exceptionalAllocationsDependentChildrenExonerationTiers: AnnualLimitBasedOnDependentChildren[];
  exceptionalAllocationsDependentChildrenReductionTiers: AnnualReductionBasedOnDependentChildren[];
};

export interface Situation {
  input: SalaryCalculationInput | YearlySalaryCalculationInput;
  netSalary: number;
  netIncome?: number;
};
