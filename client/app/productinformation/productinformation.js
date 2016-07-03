'use strict';

angular.module('doorstepApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('productinformation', {
        title: 'Manage product information',
        url: '/manageproducts',
        templateUrl: 'app/productinformation/productinformation.html',
        controller: 'ProductInformationCtrl',
        authenticate: true
      });
  });
