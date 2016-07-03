'use strict';

angular.module('doorstepApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
    	
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          mobileNumber: $scope.user.mobileNumber,
          password: $scope.user.password,
          role:'user'
        })
        .then( function() {
          // Account created, redirect to the page with requested a signup
          Auth.redirectToAttemptedUrl();
        })
        .catch( function(err) {
        	console.log(err);
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
