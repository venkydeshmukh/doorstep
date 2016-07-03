'use strict';

angular.module('doorstepApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('documentation', {
        title: 'Documentation',
        url: '/documentation',
        templateUrl: 'app/documentation/documentation.html',
        controller: 'DocumentationCtrl'
      });
  });
