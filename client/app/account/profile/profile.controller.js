'use strict';

angular.module('doorstepApp')
  .controller('ProfileCtrl', function ($scope, User, Auth,toastr,Employee) {
    $scope.errors = {};
    $scope.userProfile={};
    
    Auth.isLoggedInAsync(function(loggedIn) {
        if (loggedIn) {
        	$scope.userProfile=Auth.getCurrentUser();
        	/*atleast one address must be present*/
        	if(!$scope.userProfile.address ||$scope.userProfile.address.length==0){
        		$scope.userProfile.address=[{}];
        	}
        }
      });
    
    $scope.update=function(userProfile){
    	Employee.update({ id:$scope.userProfile._id }, userProfile).$promise.then(function() {
      	  toastr.success("Profile information saved successfully");
        }, function(error) { // error handler
          if(error.data.errors){
            var err = error.data.errors;
            toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
          }
          else{
            var msg = error.data.message;
            toastr.error(msg);
          }
        });
	  }
  });
