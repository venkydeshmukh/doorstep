'use strict';

angular.module('doorstepApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('banner', {
        title: 'Add, Remove, Edit Banners',
        url: '/banner',
        templateUrl: 'app/banner/banner.html',
        controller: 'BannerCtrl',
        authenticate: true
      });
  });
