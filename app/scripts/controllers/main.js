/*global d3*/
'use strict';

/**
 * @ngdoc function
 * @name salarySimApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the salarySimApp
 */
angular.module('salarySimApp')
    .controller('MainCtrl', function ($scope, $timeout) {
        $scope.result = false;

        $scope.salaryData = [];
        $scope.salaryRelativeData = [];

        $scope.rangeMin = 1500;
        $scope.rangeMax = 5000;
        $scope.rangeStep = 100;

        $scope.rangeOptions = {
            'min': 1500,
            'max': 5000,
            'step': 100
        };

        $scope.groupInsurance = false;
        $scope.groupInsurancePersonalCotisation = 0;

        $scope.chartOptions = {
            chart: {
                type: 'multiChart',
                height: 500,
                margin: {
                    top: 20,
                    right: 100,
                    bottom: 50,
                    left: 100
                },
                useInteractiveGuideline: true,
                showControls: false,
                transitionDuration: 500,
                lines1: {
                    padData: true
                },
                xAxis: {
                    axisLabel: 'Salaire brut',
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis1: {
                    axisLabel: 'Montant',
                    tickFormat: function (d) {
                        return d3.format('.1f')(d);
                    },
                    forceY: [0]
                },
                yDomain1: [0, 5000],
                yAxis2: {
                    axisLabel: 'Pourcentage',
                    tickFormat: function (d) {
                        return d3.format('.1f')(d) + "%";
                    }
                },
                yDomain2: [0, 100]
            }
        };

        $scope.raiseChartOptions = {
            chart: {
                type: 'multiBarChart',
                height: 500,
                margin: {
                    top: 20,
                    right: 100,
                    bottom: 50,
                    left: 100
                },
                useInteractiveGuideline: true,
                showControls: false,
                transitionDuration: 500,
                interactiveLayer: {
                    tooltip: {
                        valueFormatter: function (d) {
                            return d3.format('.1f')(d) + "%";
                        }
                    }
                },
                xAxis: {
                    axisLabel: 'Nouveau salaire brut',
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis: {
                    axisLabel: "Augmentation perçue (%)",
                    tickFormat: function (d) {
                        return d3.format('.1f')(d) + "%";
                    },
                    forceY: [0]
                },
                yDomain: [0, 100]
            }
        };

        $scope.setRangeOptions = function (min, max, step) {
            $scope.rangeOptions.min = min;
            $scope.rangeOptions.max = max;
            $scope.rangeOptions.step = step;

            $scope.chartOptions.chart.yDomain1[1] = max;

            $scope.computeSalarySimulations();
        };

        $scope.computeSalarySimulations = function() {
            let grossSalaries = [];
            let netSalaries = [];
            let taxableIncomes = [];
            let socialCotisations = [];
            let employmentBonuses = [];
            let taxes = [];
            let netToGrossRatios = [];
            let totalWithHoldingRatios = [];

            let percentagesOfIncreasesPerceived = [];
            let previousResult;

            for (let salary = $scope.rangeOptions.min; salary <= $scope.rangeOptions.max; salary += $scope.rangeOptions.step) {
                let result = $scope.calculateNetSalary(salary);

                grossSalaries.push({
                    'x': salary,
                    'y': salary
                });

                netSalaries.push({
                    'x': salary,
                    'y': Math.round(result.netSalary * 100) / 100
                });

                taxableIncomes.push({
                    'x': salary,
                    'y': Math.round(result.taxableIncome * 100) / 100
                });

                socialCotisations.push({
                    'x': salary,
                    'y': Math.round(result.socialCotisations * 100) / 100
                });

                employmentBonuses.push({
                    'x': salary,
                    'y': Math.round(result.employmentBonus * 100) / 100
                });

                taxes.push({
                    'x': salary,
                    'y': Math.round(result.monthlyTaxes * 100) / 100
                });

                netToGrossRatios.push({
                    'x': salary,
                    'y': Math.round(result.netToGrossRatio * 100) / 100
                });

                totalWithHoldingRatios.push({
                    'x': salary,
                    'y': Math.round(result.withHoldingRatio * 100) / 100
                });

                if (typeof previousResult !== 'undefined' && salary > $scope.result.grossSalary) {
                    percentagesOfIncreasesPerceived.push({
                        'x': salary,
                        'y': Math.round((result.netSalary - $scope.result.netSalary) / (salary - $scope.result.grossSalary) * 10000) / 100
                    });
                }

                previousResult = result;
            }

            $scope.salaryData = [
                {
                    'values': grossSalaries,
                    'key': 'Salaire brut',
                    'color': 'darkblue',
                    'type': 'line',
                    'yAxis': 1
                },
                {
                    'values': netSalaries,
                    'key': 'Salaire net',
                    'color': 'darkgreen',
                    'type': 'line',
                    'yAxis': 1
                },
                {
                    'values': taxableIncomes,
                    'key': 'Revenus imposables',
                    'color': 'green',
                    'type': 'line',
                    'yAxis': 1,
                    'disabled': true
                },
                {
                    'values': socialCotisations,
                    'key': 'Cotisations sociales (O.N.S.S.)',
                    'color': 'red',
                    'type': 'line',
                    'yAxis': 1,
                    'disabled': true
                },
                {
                    'values': employmentBonuses,
                    'key': "Bonus à l'emploi",
                    'color': 'green',
                    'type': 'line',
                    'yAxis': 1,
                    'disabled': true
                },
                {
                    'values': taxes,
                    'key': 'Précompte professionnel',
                    'color': 'darkred',
                    'type': 'bar',
                    'yAxis': 1,
                    'disabled': true
                },
                {
                    'values': netToGrossRatios,
                    'key': 'Rapport net/brut',
                    'color': 'grey',
                    'type': 'bar',
                    'yAxis': 2,
                    'disabled': true
                },
                {
                    'values': totalWithHoldingRatios,
                    'key': 'Pourcentage de retenues',
                    'color': '#B3B2B2',
                    'type': 'bar',
                    'yAxis': 2
                }
            ];

            $scope.salaryRelativeData = [
                {
                    'values': percentagesOfIncreasesPerceived,
                    'key': "Augmentation perçue"
                }
            ];
        };

        let flatRateProfessionalExpenseTiers = [
            {
                'from': 0,
                'to': 8450.00,
                'flat_rate': 0,
                'percentage': 30
            },
            {
                'from': 8450.01,
                'to': 19960.00,
                'flat_rate': 2535.50,
                'percentage': 11
            },
            {
                'from': 19960.01,
                'to': 34590.00,
                'flat_rate': 3801.10,
                'percentage': 3
            },
            {
                'from': 34590.01,
                'to': Infinity,
                'flat_rate': 4240.00,
                'percentage': 0
            }
        ];

        let taxTiers = [
            {
                'from': 0.01,
                'to': 10850.00,
                'percentage': 26.75
            },
            {
                'from': 10850.01,
                'to': 11900.00,
                'percentage': 32.10
            },
            {
                'from': 11900.01,
                'to': 17240.00,
                'percentage': 42.80
            },
            {
                'from': 17240.01,
                'to': 38080.00,
                'percentage': 48.15
            },
            {
                'from': 38080.01,
                'to': Infinity,
                'percentage': 53.50
            }
        ];

        let specialSocialCotisationTiers = [
            {
                'from': 0.01,
                'to': 1095.09,
                'flat_rate': 0,
                'percentage_1_income': 0,
                'percentage_2_incomes': 0,
                'minimum_1_income': 0,
                'maximum_1_income': Infinity,
                'minimum_2_incomes': 0,
                'maximum_2_incomes': Infinity
            },
            {
                'from': 1095.10,
                'to':  1945.38,
                'flat_rate_1_income': 0,
                'flat_rate_2_incomes': 9.30,
                'percentage_1_income': 0,
                'percentage_2_incomes': 0,
                'minimum_1_income': 0,
                'maximum_1_income': 0,
                'minimum_2_incomes': 9.30,
                'maximum_2_incomes': 9.30
            },
            {
                'from': 1945.39,
                'to': 2190.18,
                'flat_rate_1_income': 0,
                'flat_rate_2_incomes': 0,
                'percentage_1_income': 7.6,
                'percentage_2_incomes': 7.6,
                'minimum_1_income': 0,
                'maximum_1_income': 18.60,
                'minimum_2_incomes': 9.30,
                'maximum_2_incomes': 18.60
            },
            {
                'from': 2190.19,
                'to': 6038.82,
                'flat_rate_1_income': 18.60,
                'flat_rate_2_incomes': 18.60,
                'percentage_1_income': 1.1,
                'percentage_2_incomes': 1.1,
                'minimum_1_income': 0,
                'maximum_1_income': Infinity,
                'minimum_2_incomes': 0,
                'maximum_2_incomes': 51.64
            },
            {
                'from': 6038.83,
                'to': Infinity,
                'flat_rate_1_income': 60.94,
                'flat_rate_2_incomes': 51.64,
                'percentage_1_income': 0,
                'percentage_2_incomes': 0,
                'minimum_1_income': 60.94,
                'maximum_1_income': 60.94,
                'minimum_2_incomes': 51.64,
                'maximum_2_incomes': 51.64
            }
        ];

        $scope.simulateNoEmploymentBonus = false;

        $scope.calculateNetSalary = function (grossSalary) {
            let socialCotisations;

            if ($scope.status === 'employee') {
                socialCotisations = grossSalary * (13.07 / 100);
            } else if ($scope.status === 'worker') {
                socialCotisations = grossSalary * 1.08 * (13.07 / 100);
            }

            let referenceSalary;

            if ($scope.workRegime === 'full') {
                referenceSalary = grossSalary;
            } else if ($scope.workRegime === 'partial') {
                referenceSalary = (grossSalary / $scope.partialHours) * $scope.partialTotalHours;
            }

            let employmentBonus = 0;

            // http://www.traitements.fgov.be/calcul/salary/Werkbonus/default.htm
            if (grossSalary <= 2461.27 && !$scope.simulateNoEmploymentBonus) {
                employmentBonus = 193.79 - [0.2194 * (referenceSalary - 1577.89)];

                if (employmentBonus > socialCotisations) {
                    employmentBonus = socialCotisations;
                }
            }

            let taxableIncome = grossSalary - (socialCotisations - employmentBonus);

            // Round to the lowest multiplier of 15
            let annualGrossIncome = parseInt(taxableIncome / 15) * 15 * 12;
            let flatRateProfessionalExpenses;

            for (let i = 0, len = flatRateProfessionalExpenseTiers.length; i < len; i++) {
                let tier = flatRateProfessionalExpenseTiers[i];

                if (annualGrossIncome <= tier.to) {
                    flatRateProfessionalExpenses = tier.flat_rate + (annualGrossIncome - tier.from - 0.01) * tier.percentage / 100;

                    break;
                }
            }

            let annualTaxableIncome = taxableIncome * 12 - flatRateProfessionalExpenses;
            // let annualTaxableIncome = annualGrossIncome - flatRateProfessionalExpenses;

            // http://finances.belgium.be/fr/entreprises/personnel_et_remuneration/precompte_professionnel/calcul
            let annualBaseTax = 0;

            if ($scope.familySituation === 'isolated' || $scope.familySituation === 'married_or_cohabitant_2_salaries') {
                // L'IMPOT DE BASE est égal à l'impôt calculé à l'aide du barème de base et
                // diminué de 1.621,05 EUR (c.-à-d. l'impôt sur la quotité du revenu exemptée
                // d'impôt, qui s'élève à 6.060 EUR).
                let totalTaxes = 0;
                let remainingToTax = annualTaxableIncome;

                if ($scope.simulateRealImposition) {
                    remainingToTax -= 6060.00;
                }

                let currentTier = 0;

                while (remainingToTax > 0) {
                    let tierRange = taxTiers[currentTier].to - taxTiers[currentTier].from + 0.01;
                    let toTax = Math.min(remainingToTax, tierRange);

                    let tierTaxes = toTax * taxTiers[currentTier].percentage / 100;
                    console.log("Taxing " + toTax + " at " + taxTiers[currentTier].percentage + "%: " + tierTaxes);

                    totalTaxes += tierTaxes;
                    remainingToTax -= toTax;

                    currentTier++;
                }

                let exemption = 0;

                if (!$scope.simulateRealImposition) {
                    exemption = 6060.00 * taxTiers[0].percentage / 100;
                    console.log("Removing base exemption for first 6060 €: " + exemption);
                }

                annualBaseTax = Math.round((totalTaxes - exemption) * 100) / 100;
                console.log("Annual base tax: " + annualBaseTax);
            } else {

            }

            let annualTaxReductions = 0;

            if ($scope.groupInsurance) {
                console.log("Applying group insurance cotisation reduction");
                annualTaxReductions += 30 * $scope.groupInsurancePersonalCotisation * 12 / 100;
            }

            if ($scope.familySituation === 'isolated' || $scope.familySituation === 'married_or_cohabitant_2_salaries') {
                console.log("Applying isolated tax reductions");
                annualTaxReductions += 288.00;

                if ($scope.dependentChildren && $scope.numDependentChildren > 0) {
                    console.log("Applying isolated with children");
                    annualTaxReductions += 408.00;
                }
            }

            if ($scope.dependentChildren) {
                console.log("Dependent children");

                switch ($scope.numDependentChildren + $scope.numDisabledDependentChildren) {
                    case 1:
                        console.log("Applying reduction for 1 child");
                        annualTaxReductions += 408.00;
                        break;
                    case 2:
                        console.log("Applying reduction for 1 child");
                        annualTaxReductions += 1104.00;
                        break;
                    case 3:
                        console.log("Applying reduction for 1 child");
                        annualTaxReductions += 2964.00;
                        break;
                    case 4:
                        console.log("Applying reduction for 1 child");
                        annualTaxReductions += 5424.00;
                        break;
                    case 5:
                        console.log("Applying reduction for 1 child");
                        annualTaxReductions += 8004.00;
                        break;
                    case 6:
                        console.log("Applying reduction for 1 child");
                        annualTaxReductions += 10596.00;
                        break;
                    case 7:
                        console.log("Applying reduction for 1 child");
                        annualTaxReductions += 13176.00;
                        break;
                    case 8:
                        console.log("Applying reduction for 1 child");
                        annualTaxReductions += 15960.00;
                        break;
                    default:
                        console.log("Applying reduction for more than 8 children");

                        annualTaxReductions += 15960.00;
                        annualTaxReductions += 2880.00 * (8 - $scope.numDependentChildren);
                }
            }

            // Cette réduction est applicable lorsque la rémunération mensuelle imposable dans le chef du travailleur concerné ne dépasse pas 2.370,74 EUR.
            // La réduction est appliquée après les réductions mentionnées aux numéros 14 à 18 et s'élève à 77,52 EUR par an.
            if (taxableIncome < 2370.74) {
                annualTaxReductions += 77.62;
            }

            if ($scope.disabled) {
                console.log("Applying disabled reduction");
                annualTaxReductions += 408.00;
            }

            // En plus c'est par région \o/ http://ccff02.minfin.fgov.be/KMWeb/browseCategory.do?method=browse&params.selectedCategoryId=13606

            if (false) { // TODO : personnes à sa charge visées à l'article 136 2° et 3° CIR 92 >65 ans (ascendants, frères et soeurs) Si handicapée = * 2
                annualTaxReductions += 0 * 828.00; // Multiplicator = number of people
            }

            if (false) { // TODO : personnes à sa charge visées à l'article 136 2° à 4 autres que visées par la condition ci-dessus (ascendants, frères, soeurs et personnes qui ont assumé la charge exclusive ou principale du contribuable pendant l'enfance de celui-ci) Si handicapée = * 2
                annualTaxReductions += 0 * 408.00; // Multiplicator = number of people
            }

            if (false) { // TODO : conjoint avec revenus < 250 net/mois
                annualTaxReductions += 1290.00;
            }

            if (false) { // TODO : revenus constitués uniquement de pensions, de rentes ou assimilés qui ne dépassent pas 430 net/mois
                annualTaxReductions += 2580.00;
            }

            if (false) { // TODO : conjoint handicapé(e)
                annualTaxReductions += 408.00;
            }

            console.log("Applying additional reductions for employment bonus");
            let taxReductionsForLowSalaries = employmentBonus * (28.03 / 100) * 12;

            // http://www.traitements.fgov.be/pdf/precompte/PP_Bareme_Precompte_Professionel_20150101_20150106.pdf

            /*
    Depuis le traitement d'avril 2011, les agents contractuels, bénéficiant du bonus à
l'emploi (=réduction de la cotisation ONSS), ont droit à une réduction de leur précompte
professionnel.
Pourcentage de la réduction de précompte professionnel à partir du 1.1.2015 =
14,40% du bonus à l'emploi
La réduction ne peut jamais dépasser le montant "habituel" de précompte professionnel.
            */

            // annualBaseTax = totalTaxes - annualTaxReductions;

            // Ajouter cotisation spéciale : http://www.securex.eu/lex-go.nsf/vwReferencesByCategory_fr/0A26E522E378CCD6C12572730034B4A0?OpenDocument#.Viv3oGR95o4

            // http://www.traitements.fgov.be/calcul/salary/contract/BBSZ_CSSS.htm
            let specialSocialCotisations = 0;

            for (let i = 0, len = specialSocialCotisationTiers.length; i < len; i++) {
                let currentTier = specialSocialCotisationTiers[i];

                if (grossSalary <= currentTier.to) {
                    if ($scope.familySituation === 'isolated' || $scope.familySituation === 'married_or_cohabitant_1_salary') {
                        specialSocialCotisations = currentTier.flat_rate_1_income + (grossSalary - currentTier.from - 0.01) * currentTier.percentage_1_income / 100;

                        if (specialSocialCotisations > currentTier.maximum_1_income) {
                            specialSocialCotisations = currentTier.maximum_1_income;
                        } else if (specialSocialCotisations < currentTier.minimum_1_income) {
                            specialSocialCotisations = currentTier.minimum_1_income;
                        }
                    } else if ($scope.familySituation === 'married_or_cohabitant_2_salaries') {
                        specialSocialCotisations = currentTier.flat_rate_2_incomes + (grossSalary - currentTier.from - 0.01) * currentTier.percentage_2_incomes / 100;

                        if (specialSocialCotisations > currentTier.maximum_2_incomes) {
                            specialSocialCotisations = currentTier.maximum_2_incomes;
                        } else if (specialSocialCotisations < currentTier.minimum_2_incomes) {
                            specialSocialCotisations = currentTier.minimum_2_incomes;
                        }
                    }

                    break;
                }
            }

            // http://finances.belgium.be/fr/binaries/fc2014-0438FR_tcm307-260702.pdf

            let monthlyTaxes = annualBaseTax / 12;
            let monthlyTaxReductions = annualTaxReductions / 12;
            let monthlyTaxReductionsForLowSalaries = taxReductionsForLowSalaries / 12;

            let netSalary = taxableIncome - (monthlyTaxes - monthlyTaxReductions - monthlyTaxReductionsForLowSalaries + specialSocialCotisations);

            return {
                'grossSalary': grossSalary,
                'socialCotisations': socialCotisations,
                'specialSocialCotisations': specialSocialCotisations,
                'employmentBonus': employmentBonus,
                'taxableIncome': taxableIncome,
                'monthlyTaxes': monthlyTaxes - monthlyTaxReductions,
                'monthlyTaxReductionsForLowSalaries': monthlyTaxReductionsForLowSalaries,
                'netToGrossRatio': netSalary / grossSalary * 100,
                'withHoldingRatio': (grossSalary - netSalary) / grossSalary * 100,
                'netSalary': netSalary,
                'groupInsurancePersonalCotisation': $scope.groupInsurancePersonalCotisation
            };
        };

        $scope.isDefined = function (value) {
            return angular.isDefined(value) && value !== null;
        };

        $scope.isFormValid = function() {
            let variables = [$scope.status, $scope.workRegime, $scope.familySituation, $scope.grossSalary];

            for (let i = 0, len = variables.length; i < len; i++) {
                let variable = variables[i];

                if (!$scope.isDefined(variable)) {
                    return false;
                }
            }

            if ($scope.workRegime === 'partial') {
                if (!$scope.isDefined($scope.partialHours) || !$scope.isDefined($scope.partialTotalHours)) {
                    return false;
                }
            }

            if ($scope.dependentChildren) {
                if (!$scope.isDefined($scope.numDependentChildren) || !$scope.isDefined($scope.numDisabledDependentChildren)) {
                    return false;
                }
            }

            return true;
        };

        $scope.submitForm = function() {
            $scope.result = $scope.calculateNetSalary($scope.grossSalary);
            $scope.computeSalarySimulations();
        };
    });
