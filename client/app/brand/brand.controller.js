'use strict';

angular.module('doorstepApp')
  .controller('BrandCtrl', function ($scope,Auth) {
	  $scope.User = Auth.User;
	  $scope.User=Auth.getCurrentUser();
  });
