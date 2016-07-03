'use strict';

angular.module('doorstepApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('site', {
        title: 'Customize your site',
        url: '/site',
        templateUrl: 'app/site/site.html',
        controller: 'SiteCtrl',
        authenticate: true
      });
  });
