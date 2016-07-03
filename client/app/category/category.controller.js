'use strict';

angular.module('doorstepApp')
  .controller('CategoryCtrl', function ($scope,Auth) { 
	  $scope.User = Auth.User;
	  $scope.User=Auth.getCurrentUser();
  });
