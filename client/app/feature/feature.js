'use strict';

angular.module('doorstepApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('feature', {
        url: '/feature',
        templateUrl: 'app/feature/feature.html',
        controller: 'FeatureCtrl'
      });
  });