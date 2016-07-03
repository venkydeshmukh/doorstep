'use strict';

angular.module('doorstepApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tax', {
        title: 'Add, Remove, Edit Taxs',
        url: '/taxes',
        templateUrl: 'app/tax/tax.html',
        controller: 'TaxCtrl',
        authenticate: true
      });
  });
