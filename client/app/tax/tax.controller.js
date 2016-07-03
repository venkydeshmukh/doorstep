'use strict';

angular.module('doorstepApp')
  .controller('TaxCtrl', function ($scope,Auth) {
	  $scope.User = Auth.User;
	  $scope.User=Auth.getCurrentUser();
  });
