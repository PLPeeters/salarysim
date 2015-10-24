'use strict';

/**
 * @ngdoc function
 * @name salarySimApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the salarySimApp
 */
angular.module('salarySimApp')
    .controller('MainCtrl', function ($scope) {
        $scope.result = false;

        $scope.calculateNetSalary = function() {
            $scope.result = true;
        };
    });
