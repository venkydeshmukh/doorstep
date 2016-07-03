'use strict';

angular.module('doorstepApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('country', {
        title: 'All Shipping Countries ',
        url: '/country',
        templateUrl: 'app/country/country.html',
        controller: 'CountryCtrl'
      });
  });
