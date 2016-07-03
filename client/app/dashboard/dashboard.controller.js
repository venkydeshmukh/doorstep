'use strict';

angular.module('doorstepApp')
  .controller('DashboardCtrl',function ($scope,$loading,socket,Shop,MerchantCategory,Auth,$location,$rootScope,Category,Brand) {
	  
	 /*Reset merchantId*/
	  $rootScope.merchantId='';
  	var user=Auth.getCurrentUser();
  	user.merchantId='';
  	Auth.setSelectedMerchant('');
  	$rootScope.shop=messages_en.website_default;  	
    $scope.message = 'Hello';
    $scope.title="Dashboard";
    jQuery('.tp-banner').revolution(
			{
				delay: 5000,
				startwidth: 1170,
				startheight: 300,
				hideThumbs: 200,
				shadow: 0,
				navigationType: "none",
				hideThumbsOnMobile: "on",
				hideArrowsOnMobile: "on",
				hideThumbsUnderResoluition: 0,
				touchenabled: "on",
				fullWidth: "on"
			});
    
    $scope.shops = {};
    $scope.shops.items = [];
    $scope.shops.busy = false;
    var q = {where:{active:true},limit:10};
    
    $loading.start('shops');
    $scope.shops.busy = true;
    Shop.query(q, function(data){
        for (var i = 0; i < data.length; i++) {
            $scope.shops.items.push(data[i]);
        }
        $scope.shops.busy = false;
        $loading.finish('shops');
        
        
    }, function(){ $scope.shops.busy = false; $loading.finish('shops');// cache container
       
    });
    $scope.categories = MerchantCategory.all.query();
    
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
    	var $container = $('#portfolio');
        // initialize isotope
        $container.isotope();
        
     // filter items when filter link is clicked
        $('#filters a').click(function(){
          var selector = $(this).attr('data-filter');
          $container.isotope({ filter: selector });
          return false;
        });


    });
    $scope.goToShop=function(id){
    	/*Normal users are not associated with any shop. once he selects the shop, set the merchantid in his profile*/
    	$rootScope.merchantId=id;
    	var user=Auth.getCurrentUser();
    	user.merchantId=id;
    	Auth.setSelectedMerchant(id);
    	$scope.categories = Category.all.query({merchantId:user.merchantId});
        $rootScope.brands = Brand.query({active:true,merchantId:user.merchantId});
        $rootScope.merchantId=user.merchantId;
        $rootScope.shop=Shop.get({ id: $rootScope.merchantId });
        $location.path("/");//redirect to selected shop
    }
    
  });
