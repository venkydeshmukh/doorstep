'use strict';

angular.module('doorstepApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('coupon', {
        title: 'Manage your shop coupons',
        url: '/coupon',
        templateUrl: 'app/coupon/coupon.html',
        controller: 'CouponCtrl'
      });
  });
