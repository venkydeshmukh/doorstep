'use strict';

angular.module('doorstepApp')
  .controller('ShippingCtrl', function ($scope,Auth) {
	  $scope.User = Auth.User;
	  $scope.User=Auth.getCurrentUser();
  });
