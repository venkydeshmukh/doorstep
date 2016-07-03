'use strict';

angular.module('doorstepApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to the page with requested a login
        	 Auth.isLoggedInAsync(function(loggedIn) {
        	        if (loggedIn) {
        	          Auth.redirectToAttemptedUrl()
        	        }
        	      });
        	 
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
