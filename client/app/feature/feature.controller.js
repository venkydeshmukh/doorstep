'use strict';

angular.module('doorstepApp')
  .controller('FeatureCtrl', function ($scope,Auth) {
	  $scope.User = Auth.User;
	  $scope.User=Auth.getCurrentUser();
  });
