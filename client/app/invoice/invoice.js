'use strict';

angular.module('doorstepApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('invoice', {
        url: '/invoice',
        templateUrl: 'app/invoice/invoice.html',
        controller: 'InvoiceCtrl',
        authenticate: true
      });
  });
