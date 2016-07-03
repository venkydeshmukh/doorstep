'use strict';

angular.module('doorstepApp')
  .controller('BannerCtrl', function ($scope,Auth) {
	  $scope.User = Auth.User;
	  $scope.User=Auth.getCurrentUser();
  });
