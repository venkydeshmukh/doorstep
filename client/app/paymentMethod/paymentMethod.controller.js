'use strict';

angular.module('doorstepApp')
  .controller('PaymentMethodCtrl',  function ($scope,Auth) {
	  $scope.User = Auth.User;
	  $scope.User=Auth.getCurrentUser();
  });

