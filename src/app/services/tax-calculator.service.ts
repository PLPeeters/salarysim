import { Injectable } from '@angular/core';
import { Decimal } from 'decimal.js';
import { taxationInfo as taxationInfo2024 } from './data/2024';
import { taxationInfo as taxationInfo2025 } from './data/2025';
import { TaxationInfo } from './data/interfaces';


interface MonthlyTaxReductionsForLowSalaries {
  monthlyProfessionalWithholdingTaxReductionsForLowSalaries: Decimal;
  employmentBonus: Decimal;
  employmentBonusWasCapped: boolean;
}

export enum TaxationPeriod {
  Monthly = 'monthly',
  Annual = 'annual',
}

enum ExceptionalAllocationType {
  HolidayPay = 'double_holiday_pay',
  Bonus = 'bonus',
}

export { taxationInfo2024, taxationInfo2025 };

export interface TaxationResultInternal {
  grossSalary: Decimal;
  socialCotisations: Decimal;
  specialSocialCotisations: Decimal;
  specialSocialCotisationsProportionOfTaxes: Decimal;
  specialSocialCotisationsProportionOfGross: Decimal;
  employmentBonus: Decimal;
  employmentBonusWasCapped: boolean;
  socialCotisationsAfterReductions: Decimal;
  socialCotisationsAfterReductionsProportionOfTaxes: Decimal;
  socialCotisationsAfterReductionsProportionOfGross: Decimal;
  companyCarBenefitInKindValue: Decimal;
  taxableIncome: Decimal;
  taxableIncomeIncludingBenefitsInKind: Decimal;
  flatRateProfessionalExpenses: Decimal;
  professionalWithholdingTaxes: Decimal;
  professionalWithholdingTaxesByTier: TaxesForTierInternal[];
  otherProfessionalWithholdingTaxReductions: Decimal;
  monthlyProfessionalWithholdingTaxReductionsForLowSalaries: Decimal;
  monthlyProfessionalWithholdingTaxReductionsForGroupInsurance: Decimal;
  otherNetIncome: Decimal;
  mealVouchersCost: Decimal;
  mealVouchersValue: Decimal;
  mealVouchersEmployerContribution: Decimal;
  companyCarPersonalContribution: Decimal;
  professionalWithholdingTaxesAfterReductions: Decimal;
  professionalWithholdingTaxesAfterReductionsProportionOfTaxes: Decimal;
  professionalWithholdingTaxesAfterReductionsProportionOfGross: Decimal;
  netToGrossRatio: Decimal;
  averageTaxRate: Decimal;
  netSalary: Decimal;
  groupInsurancePersonalContribution: number;
  bonusTaxation: ExceptionalAllocationTaxationInternal;
  holidayPayTaxation: ExceptionalAllocationTaxationInternal;
  netIncome: Decimal;
}

export interface TaxationResult {
  grossSalary: number;
  socialCotisations: number;
  specialSocialCotisations: number;
  specialSocialCotisationsProportionOfTaxes: number;
  specialSocialCotisationsProportionOfGross: number;
  employmentBonus: number;
  employmentBonusWasCapped: boolean;
  socialCotisationsAfterReductions: number;
  socialCotisationsAfterReductionsProportionOfTaxes: number;
  socialCotisationsAfterReductionsProportionOfGross: number;
  companyCarBenefitInKindValue: number;
  taxableIncome: number;
  taxableIncomeIncludingBenefitsInKind: number;
  flatRateProfessionalExpenses: number;
  professionalWithholdingTaxes: number;
  professionalWithholdingTaxesByTier: TaxesForTier[];
  otherProfessionalWithholdingTaxReductions: number;
  monthlyProfessionalWithholdingTaxReductionsForLowSalaries: number;
  monthlyProfessionalWithholdingTaxReductionsForGroupInsurance: number;
  otherNetIncome: number;
  mealVouchersCost: number;
  mealVouchersValue: number;
  mealVouchersEmployerContribution: number;
  companyCarPersonalContribution: number;
  professionalWithholdingTaxesAfterReductions: number;
  professionalWithholdingTaxesAfterReductionsProportionOfTaxes: number;
  professionalWithholdingTaxesAfterReductionsProportionOfGross: number;
  netToGrossRatio: number;
  averageTaxRate: number;
  netSalary: number;
  groupInsurancePersonalContribution: number;
  bonusTaxation: ExceptionalAllocationTaxation;
  holidayPayTaxation: ExceptionalAllocationTaxation;
  netIncome: number;
}

interface SocialSecurityTier {
  from: Decimal,
  to: Decimal,
  taxRate?: Decimal,
  flatAmount?: Decimal,
  includedInFlatAmount?: Decimal,
  minAmount?: Decimal,
  maxAmount?: Decimal,
}

interface TaxesForTierInternal {
  toTax: Decimal,
  percentage: Decimal,
  taxes: Decimal,
}

interface TaxesForTier {
  toTax: number,
  percentage: number,
  taxes: number,
}

interface Taxes {
  taxesByTier: TaxesForTierInternal[],
  total: Decimal,
}

export enum Status {
  EMPLOYEE = 'employee',
  WORKER = 'worker',
}

export enum WorkRegime {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
}

export interface WorkRegimeDetails {
  type: WorkRegime;
  workedTimePerWeek: number;
  fullTimeHoursPerWeek: number;
}

export enum FamilySituation {
  ISOLATED = 'isolated',
  MARRIED_OR_COHABITANT_1_INCOME = 'married_or_cohabitant_1_income',
  MARRIED_OR_COHABITANT_2_INCOMES = 'married_or_cohabitant_2_incomes',
  MARRIED_OR_COHABITANT_2_INCOMES_PARTNER_LOW_PENSION = 'married_or_cohabitant_2_incomes_partner_low_pension',
  MARRIED_OR_COHABITANT_2_INCOMES_PARTNER_LOW_OTHER_REVENUE = 'married_or_cohabitant_2_incomes_partner_low_other_revenue',
  NON_REMARRIED_WIDOW = 'non_remarried_widow',
  DIVORCED_OR_SEPARATED = 'divorced_or_separated',
  _ISOLATED_IGNORE_EXEMPTED_TIER = 'isolated_ignore_exempted_tier',
}

interface DependentPeople {
  numDependentChildren: number;
  numDisabledDependentChildren: number;
  numDependentRetirees: number;
  numDependentOthers: number;
  numDisabledDependentOthers: number;
}

export interface MonthlyIncome {
  grossSalary: number;
  holidayPay?: number;
  bonus?: number;
  otherNetIncome?: number;
  numMealVouchers: number;
}

export interface SalaryCalculationInput extends MonthlyIncome {
  period: TaxationPeriod.Monthly;
  revenueYear: number;
  status: Status;
  workRegime: WorkRegimeDetails;
  familySituation: FamilySituation;
  dependentPeople: DependentPeople;
  disabled: boolean;
  hasDisabledPartner: boolean;
  yearlyGrossIncome?: number;
  groupInsurancePersonalContribution: number;
  mealVoucherAmounts: MealVoucherAmounts;
  companyCarInfo: VehicleInfo | null;
}

export interface YearlySalaryCalculationInput {
  period: TaxationPeriod.Annual;
  revenueYear: number;
  status: Status;
  workRegime: WorkRegimeDetails;
  familySituation: FamilySituation;
  dependentPeople: DependentPeople;
  disabled: boolean;
  hasDisabledPartner: boolean;
  groupInsurancePersonalContribution: number;
  mealVoucherAmounts: MealVoucherAmounts;
  companyCarInfo: VehicleInfo | null;
  monthlyIncomes: MonthlyIncome[];
}

interface ExceptionalAllocationTaxationInternal {
  grossAllocation: Decimal;
  socialCotisations: Decimal;
  professionalWithholdingTax: Decimal;
  netExceptionalAllocation: Decimal;
}

interface ExceptionalAllocationTaxation {
  grossAllocation: number;
  socialCotisations: number;
  professionalWithholdingTax: number;
  netExceptionalAllocation: number;
}

interface MealVoucherAmounts {
  value: number;
  personalContribution: number;
}

export enum FuelType {
  Electric = 'electric',
  Hybrid = 'hybrid',
  Diesel = 'diesel',
  Gasoline = 'gasoline',
  NaturalGas = 'natural_gas',
};

export interface VehicleInfo {
  catalogValue: number,
  firstPlateRegistrationMonth: Date,
  fuelType: FuelType,
  gramsCo2PerKm: number | null,
  personalContribution?: number,
};

const D = (value: number | string | null): Decimal => new Decimal(value || 0);

@Injectable({
  providedIn: 'root'
})
export class TaxCalculatorService {
  private calculateAnnualBaseTax(
    taxationInfo: TaxationInfo,
    familySituation: String,
    annualTaxableIncome: Decimal,
  ): Taxes {
    let annualBaseTax = D(0);
    const taxesByTier: TaxesForTierInternal[] = [];

    if (familySituation !== FamilySituation.MARRIED_OR_COHABITANT_1_INCOME) {
      let remainingToTax = annualTaxableIncome;
      let currentTier = 0;
      let taxTiers = taxationInfo.taxTiers.map(tier => Object.create(tier));

      if (familySituation === FamilySituation._ISOLATED_IGNORE_EXEMPTED_TIER) {
        const firstTaxTier = taxTiers.splice(0, 1)[0];
        taxTiers[0].from = firstTaxTier.from;
        currentTier = 0;

        taxesByTier.push({
          toTax: firstTaxTier.to.minus(firstTaxTier.from).plus(0.01),
          percentage: D(0),
          taxes: D(0),
        });
      }

      while (remainingToTax.gt(0)) {
        const currentTaxTier = taxTiers[currentTier];
        const tierRange = currentTaxTier.to.minus(currentTaxTier.from).plus(0.01);

        let toTax = Decimal.min(remainingToTax, tierRange);
        remainingToTax = remainingToTax.minus(toTax);

        const tierTaxes = toTax.times(currentTaxTier.percentage).div(100).toDP(2);

        taxesByTier.push({
          toTax,
          percentage: currentTaxTier.percentage,
          taxes: tierTaxes,
        });

        annualBaseTax = annualBaseTax.plus(tierTaxes);
        currentTier++;
      }

      return {
        taxesByTier,
        total: annualBaseTax.toDP(2),
      }
    } else {
      let revenueAttributedToPartner = annualTaxableIncome.times(30).div(100);

      if (revenueAttributedToPartner.gt(taxationInfo.maxRevenueAttributedToPartner)) {
        revenueAttributedToPartner = taxationInfo.maxRevenueAttributedToPartner;
      }

      let partnerRevenueTaxes = this.calculateAnnualBaseTax(
        taxationInfo,
        FamilySituation._ISOLATED_IGNORE_EXEMPTED_TIER,
        revenueAttributedToPartner,
      );
      let remainingToTax = annualTaxableIncome.minus(revenueAttributedToPartner);

      let ownRevenueTaxes = this.calculateAnnualBaseTax(
        taxationInfo,
        FamilySituation._ISOLATED_IGNORE_EXEMPTED_TIER,
        remainingToTax,
      );

      const partnerRevenueTaxesByTier = partnerRevenueTaxes.taxesByTier;
      const taxesByTier = ownRevenueTaxes.taxesByTier.reduce<TaxesForTierInternal[]>((taxesByTier, taxesForTier, tierIndex) => {
        let partnerToTax;
        let partnerTaxes;

        if (tierIndex < partnerRevenueTaxesByTier.length) {
          partnerToTax = partnerRevenueTaxesByTier[tierIndex].toTax;
          partnerTaxes = partnerRevenueTaxesByTier[tierIndex].taxes;
        } else {
          partnerToTax = 0;
          partnerTaxes = 0;
        }

        let toTax;
        let taxes;

        const totalTaxes = taxesForTier.taxes.plus(partnerTaxes);
        const totalToTax = taxesForTier.toTax.plus(partnerToTax);

        if (tierIndex === 1) {
          const exemptedAmount = Decimal.min(taxationInfo.taxExemptQuota.times(2), totalToTax);
          const exemptedTaxes = Decimal.min(taxationInfo.taxExemptQuotaTax.times(2), totalTaxes);

          taxesByTier[tierIndex - 1].toTax = taxesByTier[tierIndex - 1].toTax.plus(exemptedAmount);

          toTax = totalToTax.minus(exemptedAmount);
          taxes = totalTaxes.minus(exemptedTaxes);
        } else {
          toTax = totalToTax;
          taxes = totalTaxes;
        }

        taxesByTier.push({
          toTax,
          percentage: taxesForTier.percentage,
          taxes,
        });

        return taxesByTier;
      }, []);

      return {
        taxesByTier: taxesByTier,
        total: partnerRevenueTaxes.total.plus(ownRevenueTaxes.total).minus(taxationInfo.taxExemptQuotaTax.times(2)).clampedTo(0, Infinity).toDP(2),
      };
    }
  }

  private calculateSpecialSocialCotisation(
    taxationInfo: TaxationInfo,
    status: Status,
    familySituation: FamilySituation,
    grossSalary: Decimal,
    averageGrossSalaryForTrimester: Decimal,
  ): Decimal {
    let currentSpecialSocialCotisationTiers: SocialSecurityTier[]

    switch (familySituation) {
      case FamilySituation.ISOLATED:
      case FamilySituation.DIVORCED_OR_SEPARATED:
      case FamilySituation.NON_REMARRIED_WIDOW:
        currentSpecialSocialCotisationTiers = taxationInfo.specialSocialCotisationTiersIsolated;
        break;
      case FamilySituation.MARRIED_OR_COHABITANT_2_INCOMES:
        currentSpecialSocialCotisationTiers = taxationInfo.specialSocialCotisationTiersMarriedTwoIncomes;
        break;
      // Par 'conjoint qui a des revenus professionnels', il faut entendre le conjoint qui,
      // conformément à la réglementation en matière de précompte professionnel,
      // a des revenus professionnels dont le montant est supérieur au plafond fixé
      // pour l'application de la réduction du précompte professionnel pour autres charges de famille,
      // accordée lorsque l'autre conjoint bénéficie également de revenus professionnels.
      case FamilySituation.MARRIED_OR_COHABITANT_1_INCOME:
      case FamilySituation.MARRIED_OR_COHABITANT_2_INCOMES_PARTNER_LOW_PENSION:
      case FamilySituation.MARRIED_OR_COHABITANT_2_INCOMES_PARTNER_LOW_OTHER_REVENUE:
        currentSpecialSocialCotisationTiers = taxationInfo.specialSocialCotisationTiersMarriedOneIncome;
        break;
      default:
        throw Error(`Unexpected family situation: ${familySituation}.`)
    }

    if (status === Status.WORKER) {
      grossSalary = grossSalary.times(1.08);

      if (averageGrossSalaryForTrimester != null) {
        averageGrossSalaryForTrimester = averageGrossSalaryForTrimester.times(1.08);
      }
    }

    let specialSocialCotisation = D(0);
    let tierFound = false;
    let currentTier = 0;

    while (!tierFound) {
      const currentSpecialSocialCotisationTier = currentSpecialSocialCotisationTiers[currentTier];

      if (averageGrossSalaryForTrimester.gt(currentSpecialSocialCotisationTier.to)) {
        currentTier++;
        continue;
      }

      tierFound = true;

      if (currentSpecialSocialCotisationTier.flatAmount) {
        specialSocialCotisation = currentSpecialSocialCotisationTier.flatAmount;
      }

      if (currentSpecialSocialCotisationTier.taxRate) {
        specialSocialCotisation = specialSocialCotisation.plus(
          grossSalary
            .minus(currentSpecialSocialCotisationTier.includedInFlatAmount || 0)
            .times(currentSpecialSocialCotisationTier.taxRate.div(100))
        );
      }

      if (currentSpecialSocialCotisationTier.minAmount && specialSocialCotisation.lt(currentSpecialSocialCotisationTier.minAmount)) {
        specialSocialCotisation = currentSpecialSocialCotisationTier.minAmount;
      }

      if (currentSpecialSocialCotisationTier.maxAmount && specialSocialCotisation.gt(currentSpecialSocialCotisationTier.maxAmount)) {
        specialSocialCotisation = currentSpecialSocialCotisationTier.maxAmount;
      }
    }

    return specialSocialCotisation.toDP(2);
  }

  // https://www.socialsecurity.be/employer/instructions/dmfa/fr/latest/instructions/deductions/workers_reductions/workbonus.html
  private calculateEmploymentBonusAndTaxReductions(
    taxationInfo: TaxationInfo,
    status: Status,
    workRegime: WorkRegimeDetails,
    grossSalary: Decimal,
    socialCotisations: Decimal,
    alreadyPaidEmploymentBonusThisYear: Decimal,
    remainingMonths: number,
  ): MonthlyTaxReductionsForLowSalaries {
    let grossSalaryForEmploymentBonus = grossSalary;
    let employmentBonusMultiplier = D(1);

    if (workRegime.type == WorkRegime.PART_TIME) {
      grossSalaryForEmploymentBonus = grossSalary.div(workRegime.workedTimePerWeek).toDP(2).times(workRegime.fullTimeHoursPerWeek);
      employmentBonusMultiplier = Decimal.min(
        D(workRegime.workedTimePerWeek).div(workRegime.fullTimeHoursPerWeek).toDP(2),
        D(1),
      );
    }

    let employmentBonus = D(0);
    let monthlyProfessionalWithholdingTaxReductionsForLowSalaries = D(0);

    let employmentBonusInfo;

    if (status === Status.EMPLOYEE) {
      employmentBonusInfo = taxationInfo.employmentBonusInfo.employee;
    } else {
      employmentBonusInfo = taxationInfo.employmentBonusInfo.worker;
    }

    let employmentBonusA = D(0);
    let employmentBonusB = D(0);

    [employmentBonusInfo.partA, employmentBonusInfo.partB].forEach((partInfo, index) => {
      if (grossSalaryForEmploymentBonus.lte(partInfo.maxSalary)) {
        const bonus = partInfo.flatAmount.minus(
          partInfo.multiplier.times(
            Decimal.max(grossSalaryForEmploymentBonus.minus(partInfo.amountToExclude), 0)
          )
        ).toDP(2);

        if (index === 0) {
          employmentBonusA = bonus;
        } else {
          employmentBonusB = bonus;
        }
      }
    });

    employmentBonusA = employmentBonusA.times(employmentBonusMultiplier);
    employmentBonusB = employmentBonusB.times(employmentBonusMultiplier);

    employmentBonus = employmentBonusA.plus(employmentBonusB).toDP(2);

    if (employmentBonus.gt(socialCotisations)) {
      // L'éventuel écrêtement en raison d'une insuffisance de cotisations personnelles
      // s'effectue sur le calcul basé sur le volet B et ensuite sur le calcul basé sur le volet A.
      // 277.65 (159.43 B & 118.22 A) (max)
      const exceedingAmount = employmentBonus.minus(socialCotisations);
      const removeFromB = Decimal.min(employmentBonusB, exceedingAmount);
      const removeFromA = Decimal.min(employmentBonusA, exceedingAmount.minus(removeFromB));

      employmentBonusB = employmentBonusB.minus(removeFromB);
      employmentBonusA = employmentBonusA.minus(removeFromA);
      employmentBonus = employmentBonusA.plus(employmentBonusB).toDP(2);
    }

    // Le montant total de la réduction par travailleur ne peut être supérieur à 3.331,80 EUR par année calendrier à partir du 1er mai 2024.
    const monthlyMaximum = taxationInfo.employmentBonusInfo.maxYearlyAmount.minus(alreadyPaidEmploymentBonusThisYear).div(remainingMonths);
    let employmentBonusWasCapped = false;

    if (employmentBonus.gt(monthlyMaximum)) {
      const exceedingAmount = employmentBonus.minus(monthlyMaximum);
      const removeFromB = Decimal.min(employmentBonusB, exceedingAmount);
      const removeFromA = Decimal.min(employmentBonusA, exceedingAmount.minus(removeFromB));

      employmentBonusB = employmentBonusB.minus(removeFromB);
      employmentBonusA = employmentBonusA.minus(removeFromA);
      employmentBonus = employmentBonusA.plus(employmentBonusB).toDP(2);
      employmentBonusWasCapped = true;
    }

    monthlyProfessionalWithholdingTaxReductionsForLowSalaries = monthlyProfessionalWithholdingTaxReductionsForLowSalaries
      .plus(
        employmentBonusA
          .times(taxationInfo.employmentBonusInfo.partAProfessionalWithHoldingTaxReductionPercentage)
          .div(100)
      ).plus(
        employmentBonusB
          .times(taxationInfo.employmentBonusInfo.partBProfessionalWithHoldingTaxReductionPercentage)
          .div(100)
      ).toDP(2);

    return {
      employmentBonus,
      monthlyProfessionalWithholdingTaxReductionsForLowSalaries,
      employmentBonusWasCapped,
    };
  }

  private getTaxationInfo(revenueYear: number): TaxationInfo {
    switch (revenueYear) {
      case 2024:
        return taxationInfo2024;
      case 2025:
        return taxationInfo2025;
      default:
        throw Error(`Unsupported year: ${revenueYear}.`)
    }
  }

  calculateExceptionalAllocationTaxation(
    taxationInfo: TaxationInfo,
    annualGross: Decimal,
    exceptionalAllocationAmount: Decimal,
    numDependentChildren: number,
    exceptionalAllocationType: ExceptionalAllocationType,
  ): ExceptionalAllocationTaxationInternal {
    let taxationPercentage = D(0);

    for (let taxationTier of taxationInfo.exceptionalAllocationsTaxation) {
      if (annualGross <= taxationTier.annualGrossRange.to) {
        if (exceptionalAllocationType === ExceptionalAllocationType.HolidayPay) {
          taxationPercentage = taxationTier.holidayPayPercentage;
        } else {
          taxationPercentage = taxationTier.otherAllocationsPercentage;
        }

        break;
      }
    }

    let exoneratedAmount = D(0);
    let reductionPercentage = D(0);

    if (numDependentChildren > 0) {
      for (let exonerationTier of taxationInfo.exceptionalAllocationsDependentChildrenExonerationTiers) {
        if (numDependentChildren === exonerationTier.numChildren && annualGross.lte(exonerationTier.limit)) {
          exoneratedAmount = exonerationTier.limit.minus(annualGross);
          break;
        }
      }

      for (let reductionTier of taxationInfo.exceptionalAllocationsDependentChildrenReductionTiers) {
        if (numDependentChildren === reductionTier.numChildren && annualGross.lte(reductionTier.maxAnnualGross)) {
          reductionPercentage = reductionTier.reductionPercentage;
          break;
        }
      }
    }

    let socialCotisations;

    if (exceptionalAllocationType === ExceptionalAllocationType.HolidayPay) {
      socialCotisations = exceptionalAllocationAmount.times(D(85).div(92)).times(taxationInfo.socialCotisationsPercentage.div(100)).toDP(2);
    } else {
      socialCotisations = exceptionalAllocationAmount.times(taxationInfo.socialCotisationsPercentage.div(100)).toDP(2);
    }

    const taxableExceptionalAllocation = exceptionalAllocationAmount.minus(socialCotisations);
    const professionalWithholdingTax = Decimal.max(taxableExceptionalAllocation.minus(exoneratedAmount), 0)
      .times(taxationPercentage.div(100))
      .times(D(1).minus(reductionPercentage.div(100)))
      .toDP(2);
    // const professionalWithholdingTax = taxableExceptionalAllocation.times(taxationPercentage.div(100)).toDP(2);
    const netExceptionalAllocation = taxableExceptionalAllocation.minus(professionalWithholdingTax);

    return {
      grossAllocation: exceptionalAllocationAmount,
      socialCotisations: socialCotisations,
      professionalWithholdingTax: professionalWithholdingTax,
      netExceptionalAllocation: netExceptionalAllocation,
    };
  }

  calculateTaxation(input: SalaryCalculationInput | YearlySalaryCalculationInput): TaxationResult {
    let totalGross = D(0);
    let grossSalary = D(0);
    let socialCotisations = D(0);
    let socialCotisationsAfterReductions = D(0);
    let specialSocialCotisations = D(0);
    let employmentBonus = D(0);
    let employmentBonusWasCapped = false;
    let companyCarBenefitInKindValue = D(0);
    let taxableIncome = D(0);
    let taxableIncomeIncludingBenefitsInKind = D(0);
    let flatRateProfessionalExpenses = D(0);
    let professionalWithholdingTaxes = D(0);
    let professionalWithholdingTaxesByTierInternal: TaxesForTierInternal[] = [];
    let monthlyProfessionalWithholdingTaxReductionsForLowSalaries = D(0);
    let monthlyProfessionalWithholdingTaxReductionsForGroupInsurance = D(0);
    let otherNetIncome = D(0);
    let mealVouchersCost = D(0);
    let mealVouchersValue = D(0);
    let mealVouchersEmployerContribution = D(0);
    let companyCarPersonalContribution = D(0);
    let otherProfessionalWithholdingTaxReductions = D(0);
    let professionalWithholdingTaxesAfterReductions = D(0);
    let netSalary = D(0);
    let groupInsurancePersonalContributions = D(0);
    let totalHolidayPayTaxation: ExceptionalAllocationTaxationInternal = {
      grossAllocation: D(0),
      socialCotisations: D(0),
      professionalWithholdingTax: D(0),
      netExceptionalAllocation: D(0),
    };
    let totalBonusTaxation: ExceptionalAllocationTaxationInternal = {
      grossAllocation: D(0),
      socialCotisations: D(0),
      professionalWithholdingTax: D(0),
      netExceptionalAllocation: D(0),
    };
    let netIncome = D(0);
    let netToGrossRatio = D(0);
    let averageTaxRate = D(0);

    switch (input.period) {
      case TaxationPeriod.Annual:
        const yearlyTaxation = this.calculateYearlyTaxation(input);

        totalGross = yearlyTaxation.grossSalary
          .plus(yearlyTaxation.bonusTaxation.grossAllocation)
          .plus(yearlyTaxation.holidayPayTaxation.grossAllocation)
          .plus(yearlyTaxation.otherNetIncome);
        grossSalary = yearlyTaxation.grossSalary;
        socialCotisations = yearlyTaxation.socialCotisations;
        socialCotisationsAfterReductions = yearlyTaxation.socialCotisationsAfterReductions;
        specialSocialCotisations = yearlyTaxation.specialSocialCotisations;
        employmentBonus = yearlyTaxation.employmentBonus;
        employmentBonusWasCapped = yearlyTaxation.employmentBonusWasCapped;
        companyCarBenefitInKindValue = yearlyTaxation.companyCarBenefitInKindValue;
        taxableIncome = yearlyTaxation.taxableIncome;
        taxableIncomeIncludingBenefitsInKind = yearlyTaxation.taxableIncomeIncludingBenefitsInKind;
        flatRateProfessionalExpenses = yearlyTaxation.flatRateProfessionalExpenses;
        professionalWithholdingTaxes = yearlyTaxation.professionalWithholdingTaxes;
        professionalWithholdingTaxesByTierInternal = yearlyTaxation.professionalWithholdingTaxesByTier;
        monthlyProfessionalWithholdingTaxReductionsForLowSalaries = yearlyTaxation.monthlyProfessionalWithholdingTaxReductionsForLowSalaries;
        monthlyProfessionalWithholdingTaxReductionsForGroupInsurance = yearlyTaxation.monthlyProfessionalWithholdingTaxReductionsForGroupInsurance;
        mealVouchersCost = yearlyTaxation.mealVouchersCost;
        mealVouchersValue = yearlyTaxation.mealVouchersValue;
        mealVouchersEmployerContribution = yearlyTaxation.mealVouchersEmployerContribution;
        companyCarPersonalContribution = yearlyTaxation.companyCarPersonalContribution;
        otherNetIncome = yearlyTaxation.otherNetIncome;
        otherProfessionalWithholdingTaxReductions = yearlyTaxation.otherProfessionalWithholdingTaxReductions;
        professionalWithholdingTaxesAfterReductions = yearlyTaxation.professionalWithholdingTaxesAfterReductions;
        netSalary = yearlyTaxation.netSalary;
        groupInsurancePersonalContributions = D(yearlyTaxation.groupInsurancePersonalContribution);

        totalHolidayPayTaxation.grossAllocation = yearlyTaxation.holidayPayTaxation.grossAllocation;
        totalHolidayPayTaxation.socialCotisations = yearlyTaxation.holidayPayTaxation.socialCotisations;
        totalHolidayPayTaxation.professionalWithholdingTax = yearlyTaxation.holidayPayTaxation.professionalWithholdingTax;
        totalHolidayPayTaxation.netExceptionalAllocation = yearlyTaxation.holidayPayTaxation.netExceptionalAllocation;

        totalBonusTaxation.grossAllocation = yearlyTaxation.bonusTaxation.grossAllocation;
        totalBonusTaxation.socialCotisations = yearlyTaxation.bonusTaxation.socialCotisations;
        totalBonusTaxation.professionalWithholdingTax = yearlyTaxation.bonusTaxation.professionalWithholdingTax;
        totalBonusTaxation.netExceptionalAllocation = yearlyTaxation.bonusTaxation.netExceptionalAllocation;

        netIncome = yearlyTaxation.netIncome;
        netToGrossRatio = yearlyTaxation.netToGrossRatio;
        averageTaxRate = yearlyTaxation.averageTaxRate;

        break;
      case TaxationPeriod.Monthly:
        const monthlyTaxation = this.calculateMonthlyTaxation(input);

        totalGross = D(input.grossSalary)
          .plus(companyCarBenefitInKindValue || 0)
          .plus(input.bonus || 0)
          .plus(input.holidayPay || 0)
          .plus(input.otherNetIncome || 0);
        grossSalary = monthlyTaxation.grossSalary;
        socialCotisations = monthlyTaxation.socialCotisations;
        socialCotisationsAfterReductions = monthlyTaxation.socialCotisationsAfterReductions;
        specialSocialCotisations = monthlyTaxation.specialSocialCotisations;
        employmentBonus = monthlyTaxation.employmentBonus;
        employmentBonusWasCapped = monthlyTaxation.employmentBonusWasCapped;
        companyCarBenefitInKindValue = monthlyTaxation.companyCarBenefitInKindValue;
        taxableIncome = monthlyTaxation.taxableIncome;
        taxableIncomeIncludingBenefitsInKind = monthlyTaxation.taxableIncomeIncludingBenefitsInKind;
        flatRateProfessionalExpenses = monthlyTaxation.flatRateProfessionalExpenses;
        professionalWithholdingTaxes = monthlyTaxation.professionalWithholdingTaxes;
        professionalWithholdingTaxesByTierInternal = monthlyTaxation.professionalWithholdingTaxesByTier;
        monthlyProfessionalWithholdingTaxReductionsForLowSalaries = monthlyTaxation.monthlyProfessionalWithholdingTaxReductionsForLowSalaries;
        monthlyProfessionalWithholdingTaxReductionsForGroupInsurance = monthlyTaxation.monthlyProfessionalWithholdingTaxReductionsForGroupInsurance;
        mealVouchersCost = monthlyTaxation.mealVouchersCost;
        mealVouchersValue = monthlyTaxation.mealVouchersValue;
        mealVouchersEmployerContribution = monthlyTaxation.mealVouchersEmployerContribution;
        companyCarPersonalContribution = monthlyTaxation.companyCarPersonalContribution;
        otherNetIncome = monthlyTaxation.otherNetIncome;
        otherProfessionalWithholdingTaxReductions = monthlyTaxation.otherProfessionalWithholdingTaxReductions;
        professionalWithholdingTaxesAfterReductions = monthlyTaxation.professionalWithholdingTaxesAfterReductions;
        netSalary = monthlyTaxation.netSalary;
        groupInsurancePersonalContributions = D(input.groupInsurancePersonalContribution);

        totalHolidayPayTaxation.grossAllocation = monthlyTaxation.holidayPayTaxation.grossAllocation;
        totalHolidayPayTaxation.socialCotisations = monthlyTaxation.holidayPayTaxation.socialCotisations;
        totalHolidayPayTaxation.professionalWithholdingTax = monthlyTaxation.holidayPayTaxation.professionalWithholdingTax;
        totalHolidayPayTaxation.netExceptionalAllocation = monthlyTaxation.holidayPayTaxation.netExceptionalAllocation;

        totalBonusTaxation.grossAllocation = monthlyTaxation.bonusTaxation.grossAllocation;
        totalBonusTaxation.socialCotisations = monthlyTaxation.bonusTaxation.socialCotisations;
        totalBonusTaxation.professionalWithholdingTax = monthlyTaxation.bonusTaxation.professionalWithholdingTax;
        totalBonusTaxation.netExceptionalAllocation = monthlyTaxation.bonusTaxation.netExceptionalAllocation;

        netIncome = monthlyTaxation.netIncome;
        netToGrossRatio = monthlyTaxation.netToGrossRatio;
        averageTaxRate = monthlyTaxation.averageTaxRate;

        break;
    }

    const professionalWithholdingTaxesByTier: TaxesForTier[] = professionalWithholdingTaxesByTierInternal.map(tier => ({
      toTax: tier.toTax.toNumber(),
      percentage: tier.percentage.toNumber(),
      taxes: tier.taxes.toNumber(),
    }));

    const taxationGrandTotal = socialCotisationsAfterReductions
      .plus(professionalWithholdingTaxesAfterReductions)
      .plus(specialSocialCotisations);

    let specialSocialCotisationsProportionOfTaxes = D(0);
    let specialSocialCotisationsProportionOfGross = D(0);
    let socialCotisationsAfterReductionsProportionOfTaxes = D(0);
    let socialCotisationsAfterReductionsProportionOfGross = D(0);
    let professionalWithholdingTaxesAfterReductionsProportionOfTaxes = D(0);
    let professionalWithholdingTaxesAfterReductionsProportionOfGross = D(0);

    if (!taxationGrandTotal.isZero()) {
      specialSocialCotisationsProportionOfTaxes = specialSocialCotisations.div(taxationGrandTotal).mul(100);
      specialSocialCotisationsProportionOfGross = specialSocialCotisations.div(grossSalary).mul(100);
      socialCotisationsAfterReductionsProportionOfTaxes = socialCotisationsAfterReductions.div(taxationGrandTotal).mul(100);
      socialCotisationsAfterReductionsProportionOfGross = socialCotisationsAfterReductions.div(grossSalary).mul(100);
      professionalWithholdingTaxesAfterReductionsProportionOfTaxes = professionalWithholdingTaxesAfterReductions.div(taxationGrandTotal).mul(100);
      professionalWithholdingTaxesAfterReductionsProportionOfGross = professionalWithholdingTaxesAfterReductions.div(grossSalary).mul(100);
    }

    return {
      grossSalary: grossSalary.toNumber(),
      socialCotisations: socialCotisations.toNumber(),
      specialSocialCotisations: specialSocialCotisations.toNumber(),
      specialSocialCotisationsProportionOfTaxes: specialSocialCotisationsProportionOfTaxes.toNumber(),
      specialSocialCotisationsProportionOfGross: specialSocialCotisationsProportionOfGross.toNumber(),
      employmentBonus: employmentBonus.toNumber(),
      employmentBonusWasCapped: employmentBonusWasCapped,
      socialCotisationsAfterReductions: socialCotisationsAfterReductions.toNumber(),
      socialCotisationsAfterReductionsProportionOfTaxes: socialCotisationsAfterReductionsProportionOfTaxes.toNumber(),
      socialCotisationsAfterReductionsProportionOfGross: socialCotisationsAfterReductionsProportionOfGross.toNumber(),
      companyCarBenefitInKindValue: companyCarBenefitInKindValue.toNumber(),
      taxableIncome: taxableIncome.toNumber(),
      taxableIncomeIncludingBenefitsInKind: taxableIncomeIncludingBenefitsInKind.toNumber(),
      flatRateProfessionalExpenses: flatRateProfessionalExpenses.toNumber(),
      professionalWithholdingTaxes: professionalWithholdingTaxes.toNumber(),
      professionalWithholdingTaxesByTier,
      otherProfessionalWithholdingTaxReductions: otherProfessionalWithholdingTaxReductions.toNumber(),
      monthlyProfessionalWithholdingTaxReductionsForLowSalaries: monthlyProfessionalWithholdingTaxReductionsForLowSalaries.toNumber(),
      monthlyProfessionalWithholdingTaxReductionsForGroupInsurance: monthlyProfessionalWithholdingTaxReductionsForGroupInsurance.toNumber(),
      otherNetIncome: otherNetIncome.toNumber(),
      mealVouchersCost: mealVouchersCost.toNumber(),
      mealVouchersValue: mealVouchersValue.toNumber(),
      mealVouchersEmployerContribution: mealVouchersEmployerContribution.toNumber(),
      companyCarPersonalContribution: companyCarPersonalContribution.toNumber(),
      professionalWithholdingTaxesAfterReductions: professionalWithholdingTaxesAfterReductions.toNumber(),
      professionalWithholdingTaxesAfterReductionsProportionOfTaxes: professionalWithholdingTaxesAfterReductionsProportionOfTaxes.toNumber(),
      professionalWithholdingTaxesAfterReductionsProportionOfGross: professionalWithholdingTaxesAfterReductionsProportionOfGross.toNumber(),
      netToGrossRatio: netToGrossRatio.toNumber(),
      averageTaxRate: averageTaxRate.toNumber(),
      netSalary: netSalary.toNumber(),
      groupInsurancePersonalContribution: groupInsurancePersonalContributions.toNumber(),
      holidayPayTaxation: {
        grossAllocation: totalHolidayPayTaxation.grossAllocation.toNumber(),
        socialCotisations: totalHolidayPayTaxation.socialCotisations.toNumber(),
        professionalWithholdingTax: totalHolidayPayTaxation.professionalWithholdingTax.toNumber(),
        netExceptionalAllocation: totalHolidayPayTaxation.netExceptionalAllocation.toNumber(),
      },
      bonusTaxation: {
        grossAllocation: totalBonusTaxation.grossAllocation.toNumber(),
        socialCotisations: totalBonusTaxation.socialCotisations.toNumber(),
        professionalWithholdingTax: totalBonusTaxation.professionalWithholdingTax.toNumber(),
        netExceptionalAllocation: totalBonusTaxation.netExceptionalAllocation.toNumber(),
      },
      netIncome: netIncome.toNumber(),
    };
  }

  private calculateYearlyTaxation(input: YearlySalaryCalculationInput): TaxationResultInternal {
    const taxationInfo = this.getTaxationInfo(input.revenueYear);
    const employmentBonusAndTaxReductions: MonthlyTaxReductionsForLowSalaries = {
      monthlyProfessionalWithholdingTaxReductionsForLowSalaries: D(0),
      employmentBonus: D(0),
      employmentBonusWasCapped: false,
    }
    let specialSocialCotisations = D(0);

    let yearlyGrossSalary = D(0);
    let yearlyGroupInsurancePersonalContribution = D(0);
    let yearlyOtherNetIncome = D(0);
    let yearlyBonus = D(0);
    let yearlyHolidayPay = D(0);
    let grossSalaryPerTrimester: Decimal[] = [D(0), D(0), D(0), D(0)];
    let numMealVouchers = 0;

    input.monthlyIncomes.forEach((monthlyIncome, index) => {
      yearlyGrossSalary = yearlyGrossSalary.plus(monthlyIncome.grossSalary);
      grossSalaryPerTrimester[Math.floor(index / 3)] = grossSalaryPerTrimester[Math.floor(index / 3)].plus(monthlyIncome.grossSalary);
      yearlyOtherNetIncome = yearlyOtherNetIncome.plus(monthlyIncome.otherNetIncome || 0);

      if (monthlyIncome.grossSalary) {
        yearlyGroupInsurancePersonalContribution = yearlyGroupInsurancePersonalContribution.plus(input.groupInsurancePersonalContribution);
      }

      yearlyBonus = yearlyBonus.plus(monthlyIncome.bonus || 0);
      yearlyHolidayPay = yearlyHolidayPay.plus(monthlyIncome.holidayPay || 0);

      let monthSocialCotisations;

      if (input.status === Status.EMPLOYEE) {
        monthSocialCotisations = D(monthlyIncome.grossSalary).times(taxationInfo.socialCotisationsPercentage).div(100).toDP(2);
      } else {
        monthSocialCotisations = D(monthlyIncome.grossSalary).times(1.08).times(taxationInfo.socialCotisationsPercentage).div(100).toDP(2);
      }

      let monthEmploymentBonusAndTaxReductions = this.calculateEmploymentBonusAndTaxReductions(
        taxationInfo,
        input.status,
        input.workRegime,
        D(monthlyIncome.grossSalary),
        monthSocialCotisations,
        employmentBonusAndTaxReductions.employmentBonus,
        12 - index,
      );

      employmentBonusAndTaxReductions.employmentBonus = employmentBonusAndTaxReductions.employmentBonus
        .plus(monthEmploymentBonusAndTaxReductions.employmentBonus);
      employmentBonusAndTaxReductions.monthlyProfessionalWithholdingTaxReductionsForLowSalaries = employmentBonusAndTaxReductions.monthlyProfessionalWithholdingTaxReductionsForLowSalaries
        .plus(monthEmploymentBonusAndTaxReductions.monthlyProfessionalWithholdingTaxReductionsForLowSalaries);
      employmentBonusAndTaxReductions.employmentBonusWasCapped = employmentBonusAndTaxReductions.employmentBonusWasCapped || monthEmploymentBonusAndTaxReductions.employmentBonusWasCapped;

      numMealVouchers += monthlyIncome.numMealVouchers;
    });

    input.monthlyIncomes.forEach((monthlyIncome, index) => {
      const monthGrossSalary = D(monthlyIncome.grossSalary);
      const averageGrossSalaryForTrimester = grossSalaryPerTrimester[Math.floor(index / 3)].div(3);

      const monthSpecialSocialCotisation = this.calculateSpecialSocialCotisation(
        taxationInfo,
        input.status,
        input.familySituation,
        monthGrossSalary,
        averageGrossSalaryForTrimester,
      );

      specialSocialCotisations = specialSocialCotisations.plus(monthSpecialSocialCotisation);
    });

    let socialCotisations: Decimal;

    if (input.status === Status.EMPLOYEE) {
      socialCotisations = yearlyGrossSalary.times(taxationInfo.socialCotisationsPercentage).div(100).toDP(2);
    } else {
      socialCotisations = yearlyGrossSalary.times(1.08).times(taxationInfo.socialCotisationsPercentage).div(100).toDP(2);
    }

    const employmentBonus = employmentBonusAndTaxReductions.employmentBonus;
    const employmentBonusWasCapped = employmentBonusAndTaxReductions.employmentBonusWasCapped;
    const monthlyProfessionalWithholdingTaxReductionsForLowSalaries = employmentBonusAndTaxReductions.monthlyProfessionalWithholdingTaxReductionsForLowSalaries;
    let companyCarBenefitInKindValue = D(0);
    let companyCarPersonalContribution = D(0);

    if (input.companyCarInfo) {
      for (let month = 1; month < 13; month++) {
        const monthlyBenefitInKindValue = this.calculateCompanyCarBenefitInKindValue(
          taxationInfo,
          input.companyCarInfo,
          month,
        );

        companyCarBenefitInKindValue = companyCarBenefitInKindValue.plus(monthlyBenefitInKindValue);
        companyCarPersonalContribution = companyCarPersonalContribution.plus(input.companyCarInfo.personalContribution || 0);
      }
    }

    const socialCotisationsAfterReductions = socialCotisations.minus(employmentBonus).clampedTo(0, Infinity);
    const taxableIncome = yearlyGrossSalary.minus(socialCotisationsAfterReductions);
    const taxableIncomeIncludingBenefitsInKind = taxableIncome.plus(companyCarBenefitInKindValue);

    // Calculate flat rate professional expenses
    let flatRateProfessionalExpenses = D(0);

    for (const tier of taxationInfo.flatRateProfessionalExpenseTiers) {
      if (taxableIncomeIncludingBenefitsInKind.lte(tier.to)) {
        flatRateProfessionalExpenses = tier.flat_rate
          .plus(
            taxableIncomeIncludingBenefitsInKind
              .times(tier.percentage.div(100))
          ).toDP(2);
        break;
      }
    }

    const annualTaxableIncome = taxableIncomeIncludingBenefitsInKind.minus(flatRateProfessionalExpenses);

    // Calculate annual base tax
    const annualTaxes = this.calculateAnnualBaseTax(
      taxationInfo,
      input.familySituation,
      annualTaxableIncome,
    );
    const annualBaseTax = annualTaxes.total;
    let annualTaxReductions = D(0);

    const numDependentChildren = input.dependentPeople.numDependentChildren + input.dependentPeople.numDisabledDependentChildren * 2;

    switch (numDependentChildren) {
      case 0:
        break;
      case 1:
        annualTaxReductions = annualTaxReductions.plus(taxationInfo.yearlyDependentChildrenReductions.one);
        break;
      case 2:
        annualTaxReductions = annualTaxReductions.plus(taxationInfo.yearlyDependentChildrenReductions.two);
        break;
      case 3:
        annualTaxReductions = annualTaxReductions.plus(taxationInfo.yearlyDependentChildrenReductions.three);
        break;
      case 4:
        annualTaxReductions = annualTaxReductions.plus(taxationInfo.yearlyDependentChildrenReductions.four);
        break;
      case 5:
        annualTaxReductions = annualTaxReductions.plus(taxationInfo.yearlyDependentChildrenReductions.five);
        break;
      case 6:
        annualTaxReductions = annualTaxReductions.plus(taxationInfo.yearlyDependentChildrenReductions.six);
        break;
      case 7:
        annualTaxReductions = annualTaxReductions.plus(taxationInfo.yearlyDependentChildrenReductions.seven);
        break;
      default:
        const aboveSevenInfo = taxationInfo.yearlyDependentChildrenReductions.aboveSeven;

        annualTaxReductions = annualTaxReductions.plus(aboveSevenInfo.flatAmount);
        annualTaxReductions = annualTaxReductions.plus(
          aboveSevenInfo.amountPerChild.times(numDependentChildren - aboveSevenInfo.numIncludedChildren)
        );
    }

    annualTaxReductions = annualTaxReductions.plus(
      taxationInfo.yearlyReductionPerDependentRetiree
        .times(input.dependentPeople.numDependentRetirees)
    );

    const numDependentOthers = input.dependentPeople.numDependentOthers + 2 * input.dependentPeople.numDisabledDependentOthers;
    annualTaxReductions = annualTaxReductions.plus(
      taxationInfo.yearlyReductionPerDependentOther.times(numDependentOthers)
    );

    if (input.disabled) {
      annualTaxReductions = annualTaxReductions.plus(taxationInfo.yearlyReductionIfDisabled);
    }

    if ((input.familySituation === FamilySituation.MARRIED_OR_COHABITANT_1_INCOME ||
        input.familySituation === FamilySituation.MARRIED_OR_COHABITANT_2_INCOMES ||
        input.familySituation === FamilySituation.MARRIED_OR_COHABITANT_2_INCOMES_PARTNER_LOW_PENSION ||
        input.familySituation === FamilySituation.MARRIED_OR_COHABITANT_2_INCOMES_PARTNER_LOW_OTHER_REVENUE
      ) && input.hasDisabledPartner) {
      annualTaxReductions = annualTaxReductions.plus(taxationInfo.yearlyReductionIfPartnerDisabled);
    }

    if (numDependentChildren > 0 && (
        input.familySituation === FamilySituation.ISOLATED ||
        input.familySituation === FamilySituation.NON_REMARRIED_WIDOW ||
        input.familySituation === FamilySituation.DIVORCED_OR_SEPARATED
      )
    ) {
      annualTaxReductions = annualTaxReductions.plus(taxationInfo.yearlyReductionIfIsolatedWithChildren);
    }

    switch (input.familySituation) {
      case FamilySituation.MARRIED_OR_COHABITANT_2_INCOMES_PARTNER_LOW_PENSION:
        annualTaxReductions = annualTaxReductions.plus(taxationInfo.yearlyReductionIfPartnerLowPension);
        break;
      case FamilySituation.MARRIED_OR_COHABITANT_2_INCOMES_PARTNER_LOW_OTHER_REVENUE:
        annualTaxReductions = annualTaxReductions.plus(taxationInfo.yearlyReductionIfPartnerLowOtherRevenue);
        break;
    }

    // Ensure we don't get negative reductions
    annualTaxReductions = Decimal.min(annualTaxReductions, annualBaseTax);

    const monthlyTaxes = annualBaseTax.toDP(2);
    const monthlyTaxReductions = annualTaxReductions.toDP(2);
    const monthlyProfessionalWithholdingTaxReductionsForGroupInsurance = yearlyGroupInsurancePersonalContribution.times(30).div(100).toDP(2);

    const professionalWithholdingTaxesAfterReductions = monthlyTaxes
      .minus(monthlyTaxReductions)
      .minus(monthlyProfessionalWithholdingTaxReductionsForGroupInsurance)
      .minus(monthlyProfessionalWithholdingTaxReductionsForLowSalaries)
      .clampedTo(0, Infinity);

    const mealVouchersCost = D(numMealVouchers).times(input.mealVoucherAmounts.personalContribution);
    const mealVouchersValue = D(numMealVouchers).times(input.mealVoucherAmounts.value);
    const mealVouchersEmployerContribution = mealVouchersValue.minus(mealVouchersCost);

    const netSalary = taxableIncome
      .minus(professionalWithholdingTaxesAfterReductions)
      .minus(specialSocialCotisations);

    const taxationGrandTotal = socialCotisationsAfterReductions
      .plus(professionalWithholdingTaxesAfterReductions)
      .plus(specialSocialCotisations);

    let specialSocialCotisationsProportionOfTaxes = D(0);
    let specialSocialCotisationsProportionOfGross = D(0);
    let socialCotisationsAfterReductionsProportionOfTaxes = D(0);
    let socialCotisationsAfterReductionsProportionOfGross = D(0);
    let professionalWithholdingTaxesAfterReductionsProportionOfTaxes = D(0);
    let professionalWithholdingTaxesAfterReductionsProportionOfGross = D(0);

    if (!taxationGrandTotal.isZero()) {
      specialSocialCotisationsProportionOfTaxes = specialSocialCotisations.div(taxationGrandTotal).mul(100);
      specialSocialCotisationsProportionOfGross = specialSocialCotisations.div(yearlyGrossSalary).mul(100);
      socialCotisationsAfterReductionsProportionOfTaxes = socialCotisationsAfterReductions.div(taxationGrandTotal).mul(100);
      socialCotisationsAfterReductionsProportionOfGross = socialCotisationsAfterReductions.div(yearlyGrossSalary).mul(100);
      professionalWithholdingTaxesAfterReductionsProportionOfTaxes = professionalWithholdingTaxesAfterReductions.div(taxationGrandTotal).mul(100);
      professionalWithholdingTaxesAfterReductionsProportionOfGross = professionalWithholdingTaxesAfterReductions.div(yearlyGrossSalary).mul(100);
    }

    const holidayPayTaxationResult = this.calculateExceptionalAllocationTaxation(
      taxationInfo,
      yearlyGrossSalary,
      yearlyHolidayPay,
      numDependentChildren,
      ExceptionalAllocationType.HolidayPay,
    );
    const bonusTaxationResult = this.calculateExceptionalAllocationTaxation(
      taxationInfo,
      yearlyGrossSalary,
      yearlyBonus,
      numDependentChildren,
      ExceptionalAllocationType.Bonus,
    );

    const netIncome = netSalary
      .minus(yearlyGroupInsurancePersonalContribution)
      .minus(mealVouchersCost)
      .minus(companyCarPersonalContribution)
      .plus(yearlyOtherNetIncome)
      .plus(mealVouchersValue)
      .plus(holidayPayTaxationResult.netExceptionalAllocation)
      .plus(bonusTaxationResult.netExceptionalAllocation);

    const extendedGross = yearlyGrossSalary
      .plus(companyCarBenefitInKindValue)
      .plus(mealVouchersEmployerContribution)
      .plus(yearlyHolidayPay)
      .plus(yearlyBonus)
      .plus(yearlyOtherNetIncome);

    const extendedNetSalary = netSalary
      .minus(yearlyGroupInsurancePersonalContribution)
      .minus(companyCarPersonalContribution)
      .plus(mealVouchersEmployerContribution)
      .plus(holidayPayTaxationResult.netExceptionalAllocation)
      .plus(bonusTaxationResult.netExceptionalAllocation)
      .plus(yearlyOtherNetIncome);

    let netToGrossRatio = D(1);
    let averageTaxRate = D(0);

    if (!extendedGross.isZero()) {
      netToGrossRatio = netIncome.div(extendedGross).times(100);
      averageTaxRate = extendedGross.minus(extendedNetSalary).div(extendedGross).times(100);
    }

    return {
      grossSalary: yearlyGrossSalary,
      socialCotisations: socialCotisations,
      specialSocialCotisations: specialSocialCotisations,
      specialSocialCotisationsProportionOfTaxes: specialSocialCotisationsProportionOfTaxes,
      specialSocialCotisationsProportionOfGross: specialSocialCotisationsProportionOfGross,
      employmentBonus: employmentBonus,
      employmentBonusWasCapped: employmentBonusWasCapped,
      socialCotisationsAfterReductions: socialCotisationsAfterReductions,
      socialCotisationsAfterReductionsProportionOfTaxes: socialCotisationsAfterReductionsProportionOfTaxes,
      socialCotisationsAfterReductionsProportionOfGross: socialCotisationsAfterReductionsProportionOfGross,
      companyCarBenefitInKindValue: companyCarBenefitInKindValue,
      taxableIncome: taxableIncome,
      taxableIncomeIncludingBenefitsInKind: taxableIncomeIncludingBenefitsInKind,
      flatRateProfessionalExpenses: flatRateProfessionalExpenses,
      professionalWithholdingTaxes: monthlyTaxes,
      professionalWithholdingTaxesByTier: annualTaxes.taxesByTier,
      otherProfessionalWithholdingTaxReductions: monthlyTaxReductions,
      monthlyProfessionalWithholdingTaxReductionsForLowSalaries: monthlyProfessionalWithholdingTaxReductionsForLowSalaries,
      monthlyProfessionalWithholdingTaxReductionsForGroupInsurance: monthlyProfessionalWithholdingTaxReductionsForGroupInsurance,
      otherNetIncome: yearlyOtherNetIncome,
      mealVouchersCost: mealVouchersCost,
      mealVouchersValue: mealVouchersValue,
      mealVouchersEmployerContribution: mealVouchersEmployerContribution,
      companyCarPersonalContribution: companyCarPersonalContribution,
      professionalWithholdingTaxesAfterReductions: professionalWithholdingTaxesAfterReductions,
      professionalWithholdingTaxesAfterReductionsProportionOfTaxes: professionalWithholdingTaxesAfterReductionsProportionOfTaxes,
      professionalWithholdingTaxesAfterReductionsProportionOfGross: professionalWithholdingTaxesAfterReductionsProportionOfGross,
      netToGrossRatio: netToGrossRatio,
      averageTaxRate: averageTaxRate,
      netSalary: netSalary,
      groupInsurancePersonalContribution: input.groupInsurancePersonalContribution,
      holidayPayTaxation: holidayPayTaxationResult,
      bonusTaxation: bonusTaxationResult,
      netIncome: netIncome,
    };
  }

  private calculateMonthlyTaxation(input: SalaryCalculationInput): TaxationResultInternal {
    const monthlyIncomes: MonthlyIncome[] = [
      {
        grossSalary: input.grossSalary,
        holidayPay: input.holidayPay,
        bonus: input.bonus,
        otherNetIncome: input.otherNetIncome,
        numMealVouchers: input.numMealVouchers,
      }
    ];

    for (let i = 1; i < 12; i++) {
      monthlyIncomes.push({
        grossSalary: input.grossSalary,
        otherNetIncome: input.otherNetIncome,
        numMealVouchers: 0,
      });
    }

    const yearlyTaxationResult = this.calculateYearlyTaxation({
      ...input,
      period: TaxationPeriod.Annual,
      monthlyIncomes: monthlyIncomes,
    });

    let grossSalary = yearlyTaxationResult.grossSalary.div(12).toDP(2);
    let socialCotisations = yearlyTaxationResult.socialCotisations.div(12).toDP(2);
    let specialSocialCotisations = yearlyTaxationResult.specialSocialCotisations.div(12).toDP(2);
    let employmentBonus = yearlyTaxationResult.employmentBonus.div(12).toDP(2);
    let companyCarBenefitInKindValue = yearlyTaxationResult.companyCarBenefitInKindValue.div(12).toDP(2);
    let professionalWithholdingTaxes = yearlyTaxationResult.professionalWithholdingTaxes.div(12).toDP(2);
    let flatRateProfessionalExpenses = yearlyTaxationResult.flatRateProfessionalExpenses.div(12).toDP(2);
    let otherProfessionalWithholdingTaxReductions = yearlyTaxationResult.otherProfessionalWithholdingTaxReductions.div(12).toDP(2);
    let monthlyProfessionalWithholdingTaxReductionsForLowSalaries = yearlyTaxationResult.monthlyProfessionalWithholdingTaxReductionsForLowSalaries.div(12).toDP(2);
    let monthlyProfessionalWithholdingTaxReductionsForGroupInsurance = yearlyTaxationResult.monthlyProfessionalWithholdingTaxReductionsForGroupInsurance.div(12).toDP(2);
    let otherNetIncome = yearlyTaxationResult.otherNetIncome.div(12).toDP(2);
    let holidayPayTaxation = yearlyTaxationResult.holidayPayTaxation;
    let bonusTaxation = yearlyTaxationResult.bonusTaxation;

    // Recalculate to ensure amounts match with the rounding
    const socialCotisationsAfterReductions = socialCotisations.minus(employmentBonus).clampedTo(0, Infinity);
    const taxableIncome = grossSalary.minus(socialCotisationsAfterReductions);
    const taxableIncomeIncludingBenefitsInKind = taxableIncome.plus(companyCarBenefitInKindValue);

    const mealVouchersCost = D(input.numMealVouchers).times(input.mealVoucherAmounts.personalContribution);
    const mealVouchersValue = D(input.numMealVouchers).times(input.mealVoucherAmounts.value);
    const mealVouchersEmployerContribution = mealVouchersValue.minus(mealVouchersCost);
    const companyCarPersonalContribution = D(input.companyCarInfo?.personalContribution || 0);

    const professionalWithholdingTaxesAfterReductions = professionalWithholdingTaxes
      .minus(otherProfessionalWithholdingTaxReductions)
      .minus(monthlyProfessionalWithholdingTaxReductionsForGroupInsurance)
      .minus(monthlyProfessionalWithholdingTaxReductionsForLowSalaries)
      .clampedTo(0, Infinity);

    const netSalary = taxableIncome
      .minus(professionalWithholdingTaxesAfterReductions)
      .minus(specialSocialCotisations);

    const taxationGrandTotal = socialCotisationsAfterReductions
      .plus(professionalWithholdingTaxesAfterReductions)
      .plus(specialSocialCotisations);

    let specialSocialCotisationsProportionOfTaxes = D(0);
    let specialSocialCotisationsProportionOfGross = D(0);
    let socialCotisationsAfterReductionsProportionOfTaxes = D(0);
    let socialCotisationsAfterReductionsProportionOfGross = D(0);
    let professionalWithholdingTaxesAfterReductionsProportionOfTaxes = D(0);
    let professionalWithholdingTaxesAfterReductionsProportionOfGross = D(0);

    if (!taxationGrandTotal.isZero()) {
      specialSocialCotisationsProportionOfTaxes = specialSocialCotisations.div(taxationGrandTotal).mul(100);
      specialSocialCotisationsProportionOfGross = specialSocialCotisations.div(grossSalary).mul(100);
      socialCotisationsAfterReductionsProportionOfTaxes = socialCotisationsAfterReductions.div(taxationGrandTotal).mul(100);
      socialCotisationsAfterReductionsProportionOfGross = socialCotisationsAfterReductions.div(grossSalary).mul(100);
      professionalWithholdingTaxesAfterReductionsProportionOfTaxes = professionalWithholdingTaxesAfterReductions.div(taxationGrandTotal).mul(100);
      professionalWithholdingTaxesAfterReductionsProportionOfGross = professionalWithholdingTaxesAfterReductions.div(grossSalary).mul(100);
    }

    const netIncome = netSalary
      .minus(input.groupInsurancePersonalContribution)
      .minus(mealVouchersCost)
      .minus(companyCarPersonalContribution)
      .plus(otherNetIncome)
      .plus(mealVouchersValue)
      .plus(holidayPayTaxation.netExceptionalAllocation)
      .plus(bonusTaxation.netExceptionalAllocation);

    const extendedGross = grossSalary
      .plus(companyCarBenefitInKindValue)
      .plus(mealVouchersEmployerContribution)
      .plus(holidayPayTaxation.grossAllocation)
      .plus(bonusTaxation.grossAllocation)
      .plus(otherNetIncome);

    const extendedNetSalary = netSalary
      .minus(input.groupInsurancePersonalContribution)
      .minus(companyCarPersonalContribution)
      .plus(mealVouchersEmployerContribution)
      .plus(holidayPayTaxation.netExceptionalAllocation)
      .plus(bonusTaxation.netExceptionalAllocation)
      .plus(otherNetIncome);

    let netToGrossRatio = D(1);
    let averageTaxRate = D(0);

    if (!extendedGross.isZero()) {
      netToGrossRatio = netIncome.div(extendedGross).times(100);
      averageTaxRate = extendedGross.minus(extendedNetSalary).div(extendedGross).times(100);
    }

    const monthlyProfessionalWithholdingTaxesByTier: TaxesForTierInternal[] = yearlyTaxationResult.professionalWithholdingTaxesByTier.map(taxesForTier => ({
      toTax: taxesForTier.toTax.div(12).toDP(2),
      percentage: taxesForTier.percentage,
      taxes: taxesForTier.taxes.div(12).toDP(2),
    }));

    const monthlyTaxationResult = {
      grossSalary: grossSalary,
      socialCotisations: socialCotisations,
      specialSocialCotisations: specialSocialCotisations,
      specialSocialCotisationsProportionOfTaxes: specialSocialCotisationsProportionOfTaxes,
      specialSocialCotisationsProportionOfGross: specialSocialCotisationsProportionOfGross,
      employmentBonus: employmentBonus,
      employmentBonusWasCapped: yearlyTaxationResult.employmentBonusWasCapped,
      socialCotisationsAfterReductions: socialCotisationsAfterReductions,
      socialCotisationsAfterReductionsProportionOfTaxes: socialCotisationsAfterReductionsProportionOfTaxes,
      socialCotisationsAfterReductionsProportionOfGross: socialCotisationsAfterReductionsProportionOfGross,
      companyCarBenefitInKindValue: companyCarBenefitInKindValue,
      taxableIncome: taxableIncome,
      taxableIncomeIncludingBenefitsInKind: taxableIncomeIncludingBenefitsInKind,
      flatRateProfessionalExpenses: flatRateProfessionalExpenses,
      professionalWithholdingTaxes: professionalWithholdingTaxes,
      professionalWithholdingTaxesByTier: monthlyProfessionalWithholdingTaxesByTier,
      otherProfessionalWithholdingTaxReductions: otherProfessionalWithholdingTaxReductions,
      monthlyProfessionalWithholdingTaxReductionsForLowSalaries: monthlyProfessionalWithholdingTaxReductionsForLowSalaries,
      monthlyProfessionalWithholdingTaxReductionsForGroupInsurance: monthlyProfessionalWithholdingTaxReductionsForGroupInsurance,
      otherNetIncome: otherNetIncome,
      mealVouchersCost: mealVouchersCost,
      mealVouchersValue: mealVouchersValue,
      mealVouchersEmployerContribution,
      companyCarPersonalContribution: companyCarPersonalContribution,
      professionalWithholdingTaxesAfterReductions: professionalWithholdingTaxesAfterReductions,
      professionalWithholdingTaxesAfterReductionsProportionOfTaxes: professionalWithholdingTaxesAfterReductionsProportionOfTaxes,
      professionalWithholdingTaxesAfterReductionsProportionOfGross: professionalWithholdingTaxesAfterReductionsProportionOfGross,
      netToGrossRatio: netToGrossRatio,
      averageTaxRate: averageTaxRate,
      netSalary: netSalary,
      groupInsurancePersonalContribution: input.groupInsurancePersonalContribution,
      holidayPayTaxation: yearlyTaxationResult.holidayPayTaxation,
      bonusTaxation: yearlyTaxationResult.bonusTaxation,
      netIncome: netIncome,
    }

    return monthlyTaxationResult;
  }

  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  private monthsForDeprecation(startDate: Date, endDate: Date): number {
    // Ensure the current date is after the start date
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth() + 1;

    const currentYear = endDate.getFullYear();
    const currentMonth = endDate.getMonth() + 1;

    // Calculate the difference in years and months
    let monthDiff = (currentYear - startYear) * 12 + (currentMonth - startMonth);

    // Round up the result to ensure we count any started month as a full month
    return Math.ceil(monthDiff + 1);  // Add 1 to count the current month as "started"
  }

  private calculateCompanyCarBenefitInKindValue(
    taxationInfo: TaxationInfo,
    vehicleInfo: VehicleInfo,
    month: number,
  ) {
    const currentYear = taxationInfo.year;

    const ageMonths = this.monthsForDeprecation(vehicleInfo.firstPlateRegistrationMonth, new Date(currentYear, month - 1));

    const isLeapYear = this.isLeapYear(taxationInfo.year);
    const numDaysInYear = D(isLeapYear ? 366 : 365);
    const numDaysInCurrentMonth = D(new Date(currentYear, month, 0).getDate());

    const catalogValueWeighted = D(vehicleInfo.catalogValue).times(6).div(7);
    let deprecationMultiplier = D(1);

    for (let tier of taxationInfo.vehicleAgeDepreciationTiers) {
      if (D(ageMonths).lte(tier.ageRange.to)) {
        deprecationMultiplier = tier.multiplier;
        break;
      }
    }

    let referenceCO2Emissions;
    let defaultGramsCo2PerKm: Decimal;

    switch (vehicleInfo.fuelType) {
      case FuelType.Diesel:
        referenceCO2Emissions = taxationInfo.referenceCO2Diesel;
        defaultGramsCo2PerKm = taxationInfo.defaultCO2Diesel;
        break;
      case FuelType.Electric:
        referenceCO2Emissions = 0;
        defaultGramsCo2PerKm = D(0);
        break;
      default:
        referenceCO2Emissions = taxationInfo.referenceCO2Other;
        defaultGramsCo2PerKm = taxationInfo.defaultCO2Other;
        break;
    }

    let gramsCo2PerKm: Decimal;

    if (vehicleInfo.gramsCo2PerKm != null) {
      gramsCo2PerKm = D(vehicleInfo.gramsCo2PerKm);
    } else {
      gramsCo2PerKm = defaultGramsCo2PerKm;
    }

    const co2Multiplier = taxationInfo.baseCO2Percentage
      .plus(
        gramsCo2PerKm
        .minus(referenceCO2Emissions)
        .div(10)
    ).clampedTo(taxationInfo.minCO2Percentage, taxationInfo.maxO2Percentage).div(100);

    return catalogValueWeighted
      .times(deprecationMultiplier)
      .times(numDaysInCurrentMonth.div(numDaysInYear))
      .times(co2Multiplier)
      .clampedTo(taxationInfo.minimumVehicleTaxedAmount.div(12), Infinity)
      .minus(vehicleInfo.personalContribution || 0)
      .clampedTo(0, Infinity)
      .toDP(2);
  }
}
