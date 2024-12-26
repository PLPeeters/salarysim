import { Injectable } from '@angular/core';
import { Decimal } from 'decimal.js';
import { taxationInfo as taxationInfo2024 } from './data/2024';
import { taxationInfo as taxationInfo2025 } from './data/2025';
import { TaxationInfo } from './data/interfaces';


interface MonthlyTaxReductionsForLowSalaries {
  monthlyTaxReductionsForLowSalaries: Decimal;
  employmentBonus: Decimal;
  employmentBonusWasCapped: boolean;
}

export { taxationInfo2024, taxationInfo2025 }

export interface SalaryResult {
  grossSalary: number;
  socialCotisations: number;
  specialSocialCotisations: number;
  specialSocialCotisationsProportion: number;
  employmentBonus: number;
  employmentBonusWasCapped: boolean;
  socialCotisationsAfterReductions: number;
  socialCotisationsAfterReductionsProportion: number;
  taxableIncome: number;
  monthlyTaxes: number;
  monthlyTaxesByTier: TaxesForTier[];
  otherMonthlyTaxReductions: number;
  monthlyTaxReductionsForLowSalaries: number;
  monthlyTaxReductionsForGroupInsurance: number;
  taxesAfterReductions: number;
  taxesAfterReductionsProportion: number;
  netToGrossRatio: number;
  averageTaxRate: number;
  netSalary: number;
  groupInsurancePersonalCotisation: number;
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

export interface SalaryCalculationInput {
  revenueYear: number,
  status: Status,
  workRegime: WorkRegimeDetails,
  familySituation: FamilySituation,
  dependentPeople: DependentPeople,
  disabled: boolean,
  hasDisabledPartner: boolean,
  groupInsurancePersonalCotisation: number,
  otherNetIncome: number,
  monthlyGrossSalary: number,
}

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
    }

    let specialSocialCotisation = D(0);
    let tierFound = false;
    let currentTier = 0;

    while (!tierFound) {
      const currentSpecialSocialCotisationTier = currentSpecialSocialCotisationTiers[currentTier];

      if (grossSalary.gt(currentSpecialSocialCotisationTier.to)) {
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
    let monthlyTaxReductionsForLowSalaries = D(0);

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
    const monthlyMaximum = taxationInfo.employmentBonusInfo.maxYearlyAmount.div(12);
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

    monthlyTaxReductionsForLowSalaries = monthlyTaxReductionsForLowSalaries
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
      monthlyTaxReductionsForLowSalaries,
      employmentBonusWasCapped,
    };
  }

  calculateNetSalary(input: SalaryCalculationInput): SalaryResult {
    let taxationInfo: TaxationInfo;

    switch (input.revenueYear) {
      case 2024:
        taxationInfo = taxationInfo2024;
        break;
      case 2025:
        taxationInfo = taxationInfo2025;
        break;
      default:
        throw Error(`Unsupported year: ${input.revenueYear}.`)
    }

    const grossSalary = new Decimal(input.monthlyGrossSalary);
    let socialCotisations: Decimal;

    if (input.status === Status.EMPLOYEE) {
      socialCotisations = grossSalary.times(taxationInfo.socialCotisationsPercentage).div(100).toDP(2);
    } else {
      socialCotisations = grossSalary.times(1.08).times(taxationInfo.socialCotisationsPercentage).div(100).toDP(2);
    }

    const employmentBonusAndTaxReductions = this.calculateEmploymentBonusAndTaxReductions(
      taxationInfo,
      input.status,
      input.workRegime,
      grossSalary,
      socialCotisations,
    );
    const employmentBonus = employmentBonusAndTaxReductions.employmentBonus;
    const employmentBonusWasCapped = employmentBonusAndTaxReductions.employmentBonusWasCapped;
    const monthlyTaxReductionsForLowSalaries = employmentBonusAndTaxReductions.monthlyTaxReductionsForLowSalaries;

    const taxableIncome = grossSalary.minus(socialCotisations).plus(employmentBonus);
    const roundedMonthlyGrossIncome = taxableIncome.toDP(2);
    const roundedAnnualGrossIncome = roundedMonthlyGrossIncome.times(12);

    // Calculate flat rate professional expenses
    let flatRateProfessionalExpenses = D(0);

    for (const tier of taxationInfo.flatRateProfessionalExpenseTiers) {
      if (roundedAnnualGrossIncome.lte(tier.to)) {
        flatRateProfessionalExpenses = tier.flat_rate
          .plus(
            roundedAnnualGrossIncome
              .times(tier.percentage.div(100))
          ).toDP(2);
        break;
      }
    }

    const annualTaxableIncome = taxableIncome.times(12).minus(flatRateProfessionalExpenses);

    // Calculate annual base tax
    const annualTaxes = this.calculateAnnualBaseTax(
      taxationInfo,
      input.familySituation,
      annualTaxableIncome,
    );
    const annualBaseTax = annualTaxes.total;
    const specialSocialCotisations = this.calculateSpecialSocialCotisation(
      taxationInfo,
      input.status,
      input.familySituation,
      grossSalary,
    );
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
          aboveSevenInfo.amountPerChild
          .times(numDependentChildren - aboveSevenInfo.numIncludedChildren)
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

    const monthlyTaxes = annualBaseTax.div(12).toDP(2);
    const monthlyTaxReductions = annualTaxReductions.div(12).toDP(2);
    const monthlyTaxReductionsForGroupInsurance = D(input.groupInsurancePersonalCotisation).times(30).div(100).toDP(2);

    const netSalary = taxableIncome.minus(
      Decimal.max(
        monthlyTaxes
          .minus(monthlyTaxReductions)
          .minus(monthlyTaxReductionsForGroupInsurance)
          .minus(monthlyTaxReductionsForLowSalaries),
        0,
      )
    ).minus(specialSocialCotisations)
      .minus(input.groupInsurancePersonalCotisation)
      .plus(input.otherNetIncome);

    const monthlyTaxesByTier: TaxesForTier[] = annualTaxes.taxesByTier.map(taxesForTier => ({
      toTax: taxesForTier.toTax.div(12).toDP(2).toNumber(),
      percentage: taxesForTier.percentage.toNumber(),
      taxes: taxesForTier.taxes.div(12).toDP(2).toNumber(),
    }));

    const socialCotisationsAfterReductions = socialCotisations.minus(employmentBonus).clampedTo(0, Infinity);
    const taxesAfterReductions = monthlyTaxes.minus(monthlyTaxReductionsForLowSalaries).minus(monthlyTaxReductionsForLowSalaries).clampedTo(0, Infinity);

    const taxationGrandTotal = socialCotisationsAfterReductions
      .plus(taxesAfterReductions)
      .plus(specialSocialCotisations);

    const specialSocialCotisationsProportion = specialSocialCotisations.div(taxationGrandTotal).mul(100);
    const socialCotisationsAfterReductionsProportion = socialCotisationsAfterReductions.div(taxationGrandTotal).mul(100);
    const taxesAfterReductionsProportion = taxesAfterReductions.div(taxationGrandTotal).mul(100);

    return {
      grossSalary: grossSalary.toNumber(),
      socialCotisations: socialCotisations.toNumber(),
      specialSocialCotisations: specialSocialCotisations.toNumber(),
      specialSocialCotisationsProportion: specialSocialCotisationsProportion.toNumber(),
      employmentBonus: employmentBonus.toNumber(),
      employmentBonusWasCapped: employmentBonusWasCapped,
      socialCotisationsAfterReductions: socialCotisationsAfterReductions.toNumber(),
      socialCotisationsAfterReductionsProportion: socialCotisationsAfterReductionsProportion.toNumber(),
      taxableIncome: taxableIncome.toNumber(),
      monthlyTaxes: monthlyTaxes.toNumber(),
      monthlyTaxesByTier,
      otherMonthlyTaxReductions: monthlyTaxReductions.toNumber(),
      monthlyTaxReductionsForLowSalaries: monthlyTaxReductionsForLowSalaries.toNumber(),
      monthlyTaxReductionsForGroupInsurance: monthlyTaxReductionsForGroupInsurance.toNumber(),
      taxesAfterReductions: taxesAfterReductions.toNumber(),
      taxesAfterReductionsProportion: taxesAfterReductionsProportion.toNumber(),
      netToGrossRatio: netSalary.div(grossSalary).times(100).toNumber(),
      averageTaxRate: grossSalary.minus(netSalary).div(grossSalary).times(100).toNumber(),
      netSalary: netSalary.toNumber(),
      groupInsurancePersonalCotisation: input.groupInsurancePersonalCotisation,
    };
  }
}
