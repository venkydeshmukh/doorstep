'use strict';

angular.module('doorstepApp')
  .controller('CouponCtrl', function ($scope,Auth) {
	  $scope.User = Auth.User;
	  $scope.User=Auth.getCurrentUser();
  });
