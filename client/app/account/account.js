'use strict';

angular.module('doorstepApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        title: 'Login to ',
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        title: 'Signup for ',
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        title: 'Settings - Change Password ',
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      }).state('profile', {
          title: 'Profile information',
          url: '/userprofile',
          templateUrl: 'app/account/profile/profile.html',
          controller: 'ProfileCtrl',
          authenticate: true
        });;
    
  });
