'use strict';

/**
 * @ngdoc overview
 * @name salarySimApp
 * @description
 * # salarySimApp
 *
 * Main module of the application.
 */
angular
  .module('salarySimApp', [
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'nvd3'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
