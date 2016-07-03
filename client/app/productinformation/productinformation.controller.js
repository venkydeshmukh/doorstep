'use strict';

angular.module('doorstepApp')
  .controller('ProductInformationCtrl', function ($rootScope,$scope,Auth,Shop,toastr) {
	  $scope.User = Auth.User;
	  $scope.User=Auth.getCurrentUser();
	  var q = {};
	  $scope.visible=function(id){
		  $('.invisibletab').hide();
		  $('#'+id).show();
		  
	  }
	  $('#categoryInformation').show();	  
  });
