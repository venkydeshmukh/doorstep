'use strict';

angular.module('doorstepApp')
  .controller('CustomerCtrl', function ($scope,Auth) {
	  $scope.User = Auth.User;
	  $scope.User=Auth.getCurrentUser();
  });
