'use strict';

angular.module('doorstepApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('inventory', {
        url: '/inventory',
        templateUrl: 'app/inventory/inventory.html',
        controller: 'InventoryCtrl'
      });
  });