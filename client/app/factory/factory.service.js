'use strict';

angular.module('doorstepApp')
// Sample factory (dummy)
  .factory('factory', [function () {
    var somValue = 42;
    return {
      someMethod: function () {
        return somValue;
      }
    };
  }])
  .factory('Product', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/products/:id', null, {'update': { method:'PUT' } });
    obj.merchant = $resource('/api/products/merchant/:merchantId', null, {'update': { method:'PUT' } });
    obj.count = $resource('/api/products/count', null, {'update': { method:'PUT' }});
    return obj;
  }])

  .factory('Shipping', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/shippings/:id', null, {'update': { method:'PUT' } });
    obj.best = $resource('/api/shippings/best', null, {'update': { method:'PUT' }});
    return obj;
  }])
  .factory('SortOptions', [function() {
    var obj = {};
    obj.server= [
       {name:'Low Price', val:{'variants.price':1}},
       {name:'Hign Price', val:{'variants.price':-1}},
       {name:'Name (A-Z)', val:{'name':1}},
       {name:'Name (Z-A)', val:{'name':-1}}
    ];
    obj.client= [
       {name:'Price Asc', val:'variants[0].price'},
       {name:'Price Desc', val:'-variants[0].price'},
       {name:'Name Asc', val:'name'},
       {name:'Name Desc', val:'-name'}
    ];
    return obj;
  }])

  .factory('Category', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/category/:id', null, {'update': { method:'PUT' }});
    obj.parent = $resource('/api/category/parent/:id', null, {'update': { method:'PUT' }});
    obj.all = $resource('/api/category/all/:merchantId', null, {'update': { method:'PUT' },'populate': { method:'POST' }});
    return obj;
  }])
  .factory('MerchantCategory', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/merchantcategory/:id', null, {'update': { method:'PUT' }});
    obj.parent = $resource('/api/merchantcategory/parent/:id', null, {'update': { method:'PUT' }});
    obj.all = $resource('/api/merchantcategory/all', null, {'update': { method:'PUT' }});
    return obj;
  }]).factory('Shop', ['$resource', function($resource) {
	    var obj = {};
	    obj = $resource('/api/shop/:id', null, {'update': { method:'PUT' }});
	    obj.parent = $resource('/api/shop/parent/:id', null, {'update': { method:'PUT' }});
	    obj.all = $resource('/api/shop/all', null, {'update': { method:'PUT' }});
	    return obj;
	  }])
  .factory('Country', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/countries/:id', null, {'update': { method:'PUT' }});
    obj.active = $resource('/api/countries/active', null, {'update': { method:'PUT' }});
    return obj;
  }])
  .factory('Brand', ['$resource', function($resource) {
	  var obj = $resource('/api/brands/:id', null, {'update': { method:'PUT' } });;
    return obj;
  }])
  .factory('Employee', ['$resource', function($resource) {
	  var obj = $resource('/api/employees/:id', null, {'update': { method:'PUT' } });;
    return obj;
  }])
  .factory('Banner', ['$resource', function($resource) {
	  var obj = $resource('/api/banners/:id', null, {'update': { method:'PUT' } });;
    return obj;
  }])
  .factory('Tax', ['$resource', function($resource) {
	  var obj = $resource('/api/taxes/:id', null, {'update': { method:'PUT' } });;
    return obj;
  }])
  .factory('Coupon', ['$resource', function($resource) {
    return $resource('/api/coupons/:id', null, {'update': { method:'PUT' } });
  }])
  // .factory('Shipping', ['$resource', function($resource) {
  //   return $resource('/api/shippings/:id', null, {'update': { method:'PUT' } });
  // }])
  .factory('Feature', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/features/:id', null, {'update': { method:'PUT' } });
    obj.group = $resource('/api/features/group', null, {'update': { method:'PUT' }});
    return obj;
  }])
  .factory('PaymentMethod', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/PaymentMethods/:id', null, {'update': { method:'PUT' } });
    obj.active = $resource('/api/PaymentMethods/active', null, {'update': { method:'PUT' }});
    return obj;
  }])
  .factory('Customer', ['$resource', function($resource) {
    return $resource('/api/customers/:id', null, {'update': { method:'PUT' } });
  }])
  .factory('Setting', ['$resource', function($resource) {
    return $resource('/api/settings/:id', null, {'update': { method:'PUT' } });
  }])
  .factory('Order', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/orders/:id', null, {'update': { method:'PUT' } });
    obj.my = $resource('/api/orders/my', null, {'update': { method:'PUT' }});
    obj.status = [
      {name:'Pending Payment', val:402},
      {name:'Order Placed', val:201},
      {name:'Order Accepted', val:202},
      {name:'Order Executed', val:302},
      {name:'Shipped', val:200},
      {name:'Delivered', val:200},
      {name:'Cancelled', val:204},
      {name:'Not in Stock', val:404}
    ];
    return obj;
  }]);
