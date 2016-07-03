'use strict';

angular.module('doorstepApp')
  .controller('NavbarCtrl', ['$scope', '$rootScope', '$location', 'Auth', '$modal', 'Cart', 'Category','MerchantCategory', 'Brand', 'SortOptions', '$q', 'Product', '$state','Shop', function ($scope, $rootScope, $location, Auth, $modal, Cart, Category,MerchantCategory, Brand,SortOptions,$q, Product, $state,Shop) {
    $scope.hideSubMenu = function(){
      // $('.megamenu .dropdown:hover .dropdown-menu').hide(); // Hide the navbar submenu once a category is selected
    }
    $rootScope.cart = Cart.cart;
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $rootScope.merchantId = '';
    $rootScope.sortOptions = SortOptions.server;
    $scope.mainPage=function(){
    	Auth.redirectToAttemptedUrl();
    };
    /*Default data. should be taken from constant file*/
    $rootScope.shop=messages_en.website_default;
    $scope.renderNavigationBar=function(){
    	Auth.isLoggedInAsync(function(loggedIn) {
	        if (loggedIn) {
	        	var user=Auth.getCurrentUser();
	        	if(user.merchantId){
	        		$scope.categories = Category.all.query({merchantId:user.merchantId});
		        	$rootScope.brands = Brand.query({active:true,merchantId:user.merchantId});
		        	$rootScope.merchantId=user.merchantId;
		            $rootScope.shop=Shop.get({ id: $rootScope.merchantId });	
	        	}
	        	
	        }
	      });
    };

    $scope.isCollapsed = true;
    $scope.isCollapsed1 = true;
    $rootScope.isLoggedIn = Auth.isLoggedIn;
    $rootScope.isAdmin = Auth.isAdmin;
    $scope.User = Auth.User;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.renderNavigationBar();
    $rootScope.checkCart = function(id){
        if(!_.contains($scope.cart.skuArray, id)){
            return true;
        }else{
            return false;
        }
    };

    $rootScope.getQuantity = function(sku){
        for(var i = 0;i<$scope.cart.items.length;i++){
            if($scope.cart.items[i].sku === sku){
              return $scope.cart.items[i].quantity;
            }
        }
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.onSelectProduct = function($item){
        $state.go('productDetail', {id:$item._id, slug:$item.slug}, {reload: false});
        $scope.search = '';
    };

    $scope.globalSearch = function(input){
          input = input.toLowerCase();
            var defer = $q.defer();
            if (input){
                Product.query({where:{nameLower: {'$regex': input}, active:true,merchantId:$rootScope.merchantId}, limit:10, select: {id: 1, name:1, slug: 1}},
                    function(data){
                          console.log(data);
                        if (!$scope.$$phase){ //check if digest is not in progress
                            $rootScope.$apply(function(){
                                defer.resolve(data);
                            });
                        } else {
                            defer.resolve(data);
                        }
                    },
                    function(response){
                        if (!$scope.$$phase){
                            $rootScope.$apply(function(){
                                defer.reject('Server rejected with status ' + response.status);
                            });
                        } else {
                            defer.reject('Server rejected with status ' + response.status);
                        }
                    });
            } else {
                if (!$scope.$$phase){
                    $rootScope.$apply(function(){
                        defer.reject('No search query ');
                        // $log.info('No search query provided');
                    });
                } else {
                    defer.reject('No search query ');
                    // $log.info('No search query provided');
                }
            }
            return defer.promise;
        };

        $scope.openCart = function (cart) {
            cart = $scope.cart = cart;
            // console.log(cart);

            var modalOptions = {
                templateUrl: 'app/cart/cart.html',
                controller: cartEditCtrl,
                controllerAs: 'modal',
                windowClass: 'ab-modal-window',
                resolve: {
                    cart: function () { return cart; },
                }
            };
            $modal.open(modalOptions);

        };
        var cartEditCtrl = function ($scope, $modalInstance, cart) {
            $scope.cart = cart;
            $scope.cancel = function () {
                $modalInstance.dismiss('Close');
            };
        };
        cartEditCtrl.$inject = ['$scope', '$modalInstance', 'cart'];
  }]);
