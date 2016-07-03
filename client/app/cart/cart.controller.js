'use strict';

angular.module('doorstepApp')
  .controller('CartCtrl',function ($scope,Auth) {
	  $scope.User = Auth.User;
	  $scope.User=Auth.getCurrentUser();
  });
