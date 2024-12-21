import { Injectable } from '@angular/core';
import { Decimal } from 'decimal.js';


interface MonthlyTaxReductionsForLowSalaries {
  monthlyTaxReductionsForLowSalaries: Decimal;
  employmentBonus: Decimal;
  employmentBonusWasCapped: boolean;
}

export interface SalaryResult {
  grossSalary: number;
  socialCotisations: number;
  specialSocialCotisations: number;
  employmentBonus: number;
  employmentBonusWasCapped: boolean;
  taxableIncome: number;
  monthlyTaxes: number;
  monthlyTaxesByTier: TaxesForTier[];
  otherMonthlyTaxReductions: number;
  monthlyTaxReductionsForLowSalaries: number;
  monthlyTaxReductionsForGroupInsurance: number;
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
}

interface DependentPeople {
  numDependentChildren: number;
  numDisabledDependentChildren: number;
  numDependent65Plussers: number;
  numDependentOthers: number;
  numDisabledDependentOthers: number;
}

export interface SalaryCalculationInput {
  status: Status,
  workRegime: WorkRegimeDetails,
  familySituation: FamilySituation,
  dependentPeople: DependentPeople,
  disabled: boolean,
  groupInsurancePersonalCotisation: number,
  otherNetIncome: number,
  monthlyGrossSalary: number,
}

const D = (value: number | string | null): Decimal => new Decimal(value || 0);

@Injectable({
  providedIn: 'root'
})
export class TaxCalculatorService {
  private readonly flatRateProfessionalExpenseTiers = [
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
  ];

  private readonly taxTiers = [
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
  ];

  // https://www.socialsecurity.be/employer/instructions/dmfa/fr/latest/instructions/special_contributions/other_specialcontributions/specialsocialsecuritycontribution.html
  private readonly specialSocialCotisationTiersIsolated: SocialSecurityTier[] = [
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
  ];
  private readonly specialSocialCotisationTiersMarriedTwoIncomes: SocialSecurityTier[] = [
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
      taxRate: D(5.9),
      minAmount: D(15.45).div(3),
    },
    {
      from: D(6_570.54).div(3).plus(0.01),
      to: D(Infinity),
      flatAmount: D(43.32),
      includedInFlatAmount: D(6_570.54).div(3),
      taxRate: D(1.1),
      maxAmount: D(154.92).minus(D(43.32)).div(D(3)),
    },
  ];
  private readonly specialSocialCotisationTiersMarriedOneIncome: SocialSecurityTier[] = [
    {
      from: D(0.01),
      to: D(1_945.38),
      taxRate: D(0),
    },
    {
      from: D(1_945.39),
      to: D(2_190.18),
      taxRate: D(5.9),
    },
    {
      from: D(2_190.19),
      to: D(Infinity),
      flatAmount: D(43.32),
      includedInFlatAmount: D(2_190.18),
      taxRate: D(1.1),
      maxAmount: D(182.82).minus(D(43.32)).div(D(3)),
    },
  ];

  private calculateAnnualBaseTax(
    familySituation: String,
    annualTaxableIncome: Decimal,
  ): Taxes {
    let annualBaseTax = D(0);
    const taxesByTier: TaxesForTierInternal[] = [];

    if (familySituation === 'isolated' || familySituation === 'married_or_cohabitant_2_incomes') {
      let remainingToTax = annualTaxableIncome;
      let currentTier = 0;

      while (remainingToTax.gt(0)) {
        const currentTaxTier = this.taxTiers[currentTier];
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

      if (revenueAttributedToPartner.gt(13_060)) {
        revenueAttributedToPartner = D(13_060.0);
      }

      let partnerRevenueTaxes = this.calculateAnnualBaseTax('isolated', revenueAttributedToPartner);
      let remainingToTax = annualTaxableIncome.minus(revenueAttributedToPartner);

      let ownRevenueTaxes = this.calculateAnnualBaseTax('isolated', remainingToTax);

      return {
        taxesByTier: ownRevenueTaxes.taxesByTier,
        total: partnerRevenueTaxes.total.plus(ownRevenueTaxes.total).toDP(2),
      };
    }
  }

  private calculateSpecialSocialCotisation(
    status: Status,
    familySituation: FamilySituation,
    grossSalary: Decimal,
  ): Decimal {
    let currentSpecialSocialCotisationTiers: SocialSecurityTier[]

    switch (familySituation) {
      case 'isolated':
        currentSpecialSocialCotisationTiers = this.specialSocialCotisationTiersIsolated;
        break;
      case 'married_or_cohabitant_2_incomes':
        currentSpecialSocialCotisationTiers = this.specialSocialCotisationTiersMarriedTwoIncomes;
        break;
      case 'married_or_cohabitant_1_income':
        currentSpecialSocialCotisationTiers = this.specialSocialCotisationTiersMarriedOneIncome;
        break;
      default:
        throw Error("What the hell")
    }

    if (status == 'worker') {
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

      let tierCotisation = D(0);

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

      if (currentSpecialSocialCotisationTier.minAmount && tierCotisation.lt(currentSpecialSocialCotisationTier.minAmount)) {
        specialSocialCotisation = currentSpecialSocialCotisationTier.minAmount;
      }

      if (currentSpecialSocialCotisationTier.maxAmount && tierCotisation.gt(currentSpecialSocialCotisationTier.maxAmount)) {
        specialSocialCotisation = currentSpecialSocialCotisationTier.maxAmount;
      }
    }

    return specialSocialCotisation.toDP(2);
  }

  // https://www.socialsecurity.be/employer/instructions/dmfa/fr/latest/instructions/deductions/workers_reductions/workbonus.html
  private calculateEmploymentBonusAndTaxReductions(
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

    let employmentBonusA = D(0);

    if (grossSalaryForEmploymentBonus.lte(3_207.40)) {
      if (status === Status.EMPLOYEE) {
        employmentBonusA = D(118.22).minus(
          D(0.2442).times(
            Decimal.max(grossSalaryForEmploymentBonus.minus(2_723.36), 0)
          )
        ).toDP(2);
      } else {
        employmentBonusA = D(127.68).minus(
          D(0.2638).times(
            Decimal.max(grossSalaryForEmploymentBonus.minus(2_723.36), 0)
          )
        ).toDP(2);
      }
    }

    let employmentBonusB = D(0);

    if (grossSalaryForEmploymentBonus.lte(2_723.36)) {
      if (status === Status.EMPLOYEE) {
        employmentBonusB = D(159.43)
          .minus(
            D(0.2699).times(
              Decimal.max(grossSalaryForEmploymentBonus.minus(2_132.59), 0)
            )
          ).toDP(2);
      } else {
        employmentBonusB = D(172.18).minus(
            D(0.2915).times(
              Decimal.max(grossSalaryForEmploymentBonus.minus(2_132.59), 0)
            )
          ).toDP(2);
      }
    }

    employmentBonusA = employmentBonusA.times(employmentBonusMultiplier);
    employmentBonusB = employmentBonusB.times(employmentBonusMultiplier);

    // L'éventuel écrêtement en raison d'une insuffisance de cotisations personnelles
    // s'effectue sur le calcul basé sur le volet B et ensuite sur le calcul basé sur le volet A.
    employmentBonusB = Decimal.min(employmentBonusB, socialCotisations);
    employmentBonusA = Decimal.min(employmentBonusA, socialCotisations.minus(employmentBonusB));
    employmentBonus = employmentBonusA.plus(employmentBonusB).toDP(2);

    // Le montant total de la réduction par travailleur ne peut être supérieur à 3.331,80 EUR par année calendrier à partir du 1er mai 2024.
    const monthlyMaximum = D(3_331.8).div(12);
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
        employmentBonusA.times(33.14).div(100)
      ).plus(
        employmentBonusB.times(52.54).div(100)
      ).toDP(2);

    return {
      employmentBonus,
      monthlyTaxReductionsForLowSalaries,
      employmentBonusWasCapped,
    };
  }

  calculateNetSalary(input: SalaryCalculationInput): SalaryResult {
    const grossSalary = new Decimal(input.monthlyGrossSalary);
    let socialCotisations: Decimal;

    if (input.status === 'employee') {
      socialCotisations = grossSalary.times(13.07).div(100).toDP(2);
    } else {
      socialCotisations = grossSalary.times(1.08).times(13.07).div(100).toDP(2);
    }

    const employmentBonusAndTaxReductions = this.calculateEmploymentBonusAndTaxReductions(
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

    for (const tier of this.flatRateProfessionalExpenseTiers) {
      if (roundedAnnualGrossIncome.lte(tier.to)) {
        flatRateProfessionalExpenses = tier.flat_rate.plus(roundedAnnualGrossIncome.times(tier.percentage).div(100)).toDP(2);
        break;
      }
    }

    const annualTaxableIncome = taxableIncome.times(12).minus(flatRateProfessionalExpenses);

    // Calculate annual base tax
    const annualTaxes = this.calculateAnnualBaseTax(
      input.familySituation,
      annualTaxableIncome,
    );
    const annualBaseTax = annualTaxes.total;
    const specialSocialCotisations = this.calculateSpecialSocialCotisation(
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
        annualTaxReductions = annualTaxReductions.plus(588.00);
        break;
      case 2:
        annualTaxReductions = annualTaxReductions.plus(1_572.00);
        break;
      case 3:
        annualTaxReductions = annualTaxReductions.plus(4_164.00);
        break;
      case 4:
        annualTaxReductions = annualTaxReductions.plus(7_212.00);
        break;
      case 5:
        annualTaxReductions = annualTaxReductions.plus(10_512.00);
        break;
      case 6:
        annualTaxReductions = annualTaxReductions.plus(13_812.00);
        break;
      case 7:
        annualTaxReductions = annualTaxReductions.plus(17_148.00);
        break;
      case 8:
        annualTaxReductions = annualTaxReductions.plus(20_808.00);
        break;
      default:
        annualTaxReductions = annualTaxReductions.plus(20_808.00);
        annualTaxReductions = annualTaxReductions.plus(3_660.00).times(8 - numDependentChildren);
    }

    annualTaxReductions = annualTaxReductions.plus(1_884.00).times(input.dependentPeople.numDependent65Plussers);

    const numDependentOthers = input.dependentPeople.numDependentOthers + 2 * input.dependentPeople.numDisabledDependentOthers;
    annualTaxReductions = annualTaxReductions.plus(D(588.00).times(numDependentOthers));

    if (input.disabled) {
      annualTaxReductions = annualTaxReductions.plus(588.00);
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

    return {
      grossSalary: grossSalary.toNumber(),
      socialCotisations: socialCotisations.toNumber(),
      specialSocialCotisations: specialSocialCotisations.toNumber(),
      employmentBonus: employmentBonus.toNumber(),
      employmentBonusWasCapped: employmentBonusWasCapped,
      taxableIncome: taxableIncome.toNumber(),
      monthlyTaxes: monthlyTaxes.toNumber(),
      monthlyTaxesByTier,
      otherMonthlyTaxReductions: monthlyTaxReductions.toNumber(),
      monthlyTaxReductionsForLowSalaries: monthlyTaxReductionsForLowSalaries.toNumber(),
      monthlyTaxReductionsForGroupInsurance: monthlyTaxReductionsForGroupInsurance.toNumber(),
      netToGrossRatio: netSalary.div(grossSalary).times(100).toNumber(),
      averageTaxRate: grossSalary.minus(netSalary).div(grossSalary).times(100).toNumber(),
      netSalary: netSalary.toNumber(),
      groupInsurancePersonalCotisation: input.groupInsurancePersonalCotisation,
    };
  }
}
