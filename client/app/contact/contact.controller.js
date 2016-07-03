'use strict';

angular.module('doorstepApp')
  .controller('ContactCtrl', function ($scope,MerchantCategory,Shop,toastr,$loading,Auth,User,Category) {
    $scope.message = 'Hello';
    $loading.start('shops');
    $scope.errors = {};
    
    /*$scope.$watch('$scope.shop.merchantcategory',function(newVal){
    	alert(newVal);
    });*/
    
    $scope.registerMerchant = function(form) {
    	console.log($scope.shop.merchantcategory._id);
        $scope.submitted = true;
        if(form.$valid) {
        	
        	$scope.user = Auth.createUser({
                name: $scope.user.name,
                email: $scope.user.email,
                mobileNumber: $scope.user.mobileNumber,
                password: 'password', //temporary, should be emailed in the final version
                role:'admin' //he is admin of the shop	
              })
              .then( function(val) {
            	  Shop.save($scope.shop).$promise.then(function(newShop) {
            		  $scope.user.merchantId=newShop._id;
            		  /*Create master data for category*/
            		  Category.all.save({merchantId:newShop._id});
            		  
            		  User.update({ id:val._id }, $scope.user).$promise.then(function(res) {
            		        console.log(res);
            		      }, function(error) { // error handler
            		        console.log(error);
            		        if(error.data.errors){
            		          var err = error.data.errors;
            		          toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
            		        }
            		        else{
            		          var msg = error.data.message;
            		          toastr.error(msg);
            		        }
            		      });
                      toastr.success("Message sent. You will recieve email shortly for confirmation","Success");
                      Auth.isLoggedInAsync(function(loggedIn) {
              	        if (loggedIn) {
              	        	Auth.redirectToAttemptedUrl();
              	        }
              	      });
                      
                      
                    }, function(error) { // error handler
                        var err = error.data.errors;
                        toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
                    });
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
      
    $scope.categories = MerchantCategory.all.query();
  });
