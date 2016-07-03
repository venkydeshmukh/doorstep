'use strict';

angular.module('doorstepApp')
  .controller('SiteCtrl', function ($rootScope,$scope,Auth,Shop,toastr) {
	  $scope.User = Auth.User;
	  $scope.User=Auth.getCurrentUser();
	  var q = {};
	  $('#generalInformation').show();
	  $scope.visible=function(id){
		  $('.invisibletab').hide();
		  $('#'+id).show();
	  }
	  Auth.isLoggedInAsync(function(loggedIn) {
	        if (loggedIn) {
	        	var user=Auth.getCurrentUser();
	            $scope.shopInfo=Shop.get({ id: $rootScope.merchantId });
	        }
	      });
	  
	  $scope.saveFooter=function(newShopInfo){
		  Shop.update({ id:$rootScope.shop._id }, newShopInfo).$promise.then(function() {
			  $rootScope.shop=newShopInfo;
        	  toastr.success("Shop Data saved successfully");
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
	  $('#primaryColor,#secondaryColor,#footerBackgroundColor').ColorPicker({
			onSubmit: function(hsb, hex, rgb, el) {
				$(el).val(hex);
				$(el).ColorPickerHide();
			},
			onBeforeShow: function () {
				$(this).ColorPickerSetColor(this.value);
			}
		})
		.bind('keyup', function(){
			$(this).ColorPickerSetColor(this.value);
		});
	  
  });
