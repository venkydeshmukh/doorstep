'use strict';

var _ = require('lodash');
var Category = require('./category.model');
var Product = require('../product/product.model');
var Brand = require('../brand/brand.model');
var Feature = require('../feature/feature.model');
var Shipping = require('../shipping/shipping.model');
var PaymentMethod = require('../PaymentMethod/PaymentMethod.model');
var Coupon = require('../coupon/coupon.model');
var Banner = require('../banner/banner.model');
var Tax = require('../tax/tax.model');

// Get list of categorys
exports.index = function(req, res) {
	var q = req.query;
  Category.find(q,function (err, categorys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(categorys);
  });
};

// Get list of parents
exports.parents = function(req, res) {
  // console.log(req.params.id);
  Category.find({'parentId' : parseInt(req.params.id)},function (err, categorys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(categorys);
  });
};

// Get all categories with corresponding sub_categories for selected merchant
exports.all = function(req, res) {
  var async = require("async");
  var p = [];
  Category.find({merchantId:req.params.merchantId,parentCategory:0, active:true}).select({name:1,category:1,parentCategory:1,slug:1}).exec(function(err,parents){
  // Using async library which will enable us to wait until data received from database
  async.each(parents, function(a, callback){
      a = a.toObject();
      Category.find({merchantId:req.params.merchantId,parentCategory:parseInt(a.category), active:true}).select({name:1,category:1,parentCategory:1,slug:1}).exec(function(err,c){
        a.sub_categories = c;
        p.push(a);
        callback();
      });
    },
    // 3rd param is the function to call when everything's done
    function(err){
      if( err ) { return res.status(404).send('Not Found'); } else { return res.status(200).json(p); }
    }
  );
});

};

// Get a single category
exports.show = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }
    return res.json(category);
  });
};

// Creates a new category in the DB.
exports.create = function(req, res) {
  req.body.uid = req.user.email; // id change on every login hence email is used
  req.body.updated = Date.now();
  if(!req.body.slug && req.body.name)
  req.body.slug = req.body.name.toString().toLowerCase()
                      .replace(/\s+/g, '-')        // Replace spaces with -
                      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
                      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
                      .replace(/^-+/, '')          // Trim - from start of text
                      .replace(/-+$/, '');
  Category.create(req.body, function(err, category) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(category);
  });
};

// Updates an existing category in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  req.body.uid = req.user.email; // id changes on every login hence email is used
  req.body.updated = Date.now();
  if(!req.body.slug && req.body.name)
  req.body.slug = req.body.name.toString().toLowerCase()
                      .replace(/\s+/g, '-')        // Replace spaces with -
                      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
                      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
                      .replace(/^-+/, '')          // Trim - from start of text
                      .replace(/-+$/, '');

  Category.findById(req.params.id, function (err, category) {
    if (err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }
    var updated = _.merge(category, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(category);
    });
  });
};

// Deletes a category from the DB.
exports.destroy = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }
    category.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.populate = function(req, res) {
	var merchantId=req.body.merchantId;
	/*Create main categories*/ 
	
	Category.create({
	        "name" : "Main Category X",
	        "category" : 2,
	        "parentCategory" : 0,
	        "active" : true,
	        "__v" : 0,
	        merchantId:merchantId
	      },{
	          "name" : "Main Category Y",
	          "category" : 1,
	          "parentCategory" : 0,
	          "active" : true,
	          "__v" : 0,
	          merchantId:merchantId
	      }, function() {
	            console.log('finished populating categories');
	        }); 

	var subCategoryX=new Category({
        "name" : "Sub Category X",
        "category" : 209,
        "parentCategory" : 2,
        "active" : true,
        merchantId:merchantId,
        "__v" : 0
    });
	subCategoryX.save();
	
	PaymentMethod.create({
        name: 'COD',
        email: '-',
        merchantId:merchantId,
        active : true
    },
    {
        name: 'PayPal',
        email: '2lessons@gmail.com',
        merchantId:merchantId,
        active : true
    });
	Tax.create({
        name: 'VAT',
        percent: '12.5',
        merchantId:merchantId,
        active : true
    },
    {
        name: 'ServiceTax',
        percent: '14.5',
        merchantId:merchantId,
        active : true
    });
    
	Feature.create(
		      {"key" : "Fit", "val" : "Slim", "active" : true,"merchantId":merchantId},
		      {"key" : "Fit", "val" : "Loose", "active" : true,"merchantId":merchantId},
		      {"key" : "Fit", "val" : "Regular", "active" : true,"merchantId":merchantId},
		      {"key" : "Fabric", "val" : "Cotton", "active" : true,"merchantId":merchantId},
		      {"key" : "Fabric", "val" : "Polyester", "active" : true,"merchantId":merchantId},
		      {"key" : "Color", "val" : "Red", "active" : true,"merchantId":merchantId},
		      {"key" : "Color", "val" : "Green", "active" : true,"merchantId":merchantId},
		      {"key" : "Color", "val" : "Blue", "active" : true,"merchantId":merchantId},
		      {"key" : "Color", "val" : "White", "active" : true,"merchantId":merchantId}
		    );
	Coupon.create(
		      {
		    	  "merchantId":merchantId,
		        "code" : "CODE100",
		        "amount" : 20,
		        "info" : "$20 discount products ",
		        "active" : true,
		        "type" : "Discount",
		        "minimumCartValue" : 2500,
		        "__v" : 0
		      });
	
    Shipping.create(
    	      {
    	    	  "merchantId":merchantId,
    	        "carrier" : "DTDC",
    	        "country" : "India",
    	        "charge" : 100,
    	        "minWeight" : 20,
    	        "maxWeight" : 200,
    	        "freeShipping" : 200,
    	        "active" : true,
    	        "__v" : 0,
    	        "name" : "DTDC"
    	      },
    	      {
    	    	  "merchantId":merchantId,
    	          "carrier" : "UPS",
    	          "country" : "United States",
    	          "charge" : 500,
    	          "minWeight" : 0,
    	          "maxWeight" : 100,
    	          "freeShipping" : 5000,
    	          "__v" : 0,
    	          "active" : true
    	      },
    	      {
    	    	  "merchantId":merchantId,
    	          "carrier" : "DHL",
    	          "country" : "Germany",
    	          "charge" : 300,
    	          "minWeight" : 0,
    	          "maxWeight" : 200,
    	          "freeShipping" : 3000,
    	          "active" : true,
    	          "__v" : 0
    	      },
    	      {
    	    	  "merchantId":merchantId,
    	          "carrier" : "DHL",
    	          "country" : "India",
    	          "charge" : 50,
    	          "minWeight" : 100,
    	          "maxWeight" : 500,
    	          "freeShipping" : 1000,
    	          "active" : true,
    	          "__v" : 0
    	      }
    	    );
    
	
	var subCategoryY=new Category({
	        "name" : "Sub Category Y",
	        "category" : 100,
	        "parentCategory" : 1,
	        "active" : true,
	        merchantId:merchantId,
	        "__v" : 0
	    });
	
	var newBrand=new Brand({
	        "name" : "brand 1",
	        "info" : "Sample Brand",
	        "slug" : "brand",
	        "active" : true,
	        merchantId:merchantId,
	        "__v" : 0
	    });
	
	var newProduct=new Product({
	        "name" : "Sample product 1",
	        "info" : "Something about the product goes here. Not More than 2 lines.",
	        "brand" : newBrand,
	        merchantId:merchantId,
	        "nameLower" : "sample product 1",
	        "active" : true,
	        "sku" : 5,
	        "type" : "Men",
	        "slug" : "sample-product-1",
	        "variants" : [
	  		            {
	  		                "mrp" : 1699.0000000000000000,
	  		                "price" : 1699.0000000000000000,
	  		                "size" : "30",
	  		                "weight" : "130",
	  		                "image" : "6.png"
	  		            },
	  		            {
	  		                "mrp" : 1699.0000000000000000,
	  		                "price" : 1680.0000000000000000,
	  		                "size" : "32",
	  		                "weight" : "130",
	  		                "image" : "6.png"
	  		            },{
	  		                "mrp" : 1649.0000000000000000,
	  		                "price" : 1610.0000000000000000,
	  		                "size" : "36",
	  		                "weight" : "138",
	  		                "image" : "6.png"
	  		            }
	  		        ],
	  		        "keyFeatures" : [],
	  		        "features" : [
	  		            {
	  		                "key" : "Fabric",
	  		                "val" : "Cotton"
	  		            },
	  		            {
	  		                "key" : "Fit",
	  		                "val" : "Slim"
	  		            },
	  		            {
	  		                "key" : "Color",
	  		                "val" : "Grey"
	  		            }
	  		        ],
	        "__v" : 0
	    });
	newBrand.save();
	subCategoryY.save();
	newProduct.category=subCategoryY;
	newProduct.brand=newBrand;
	newProduct.save();
	
	Banner.create(
		      {
		    	  "merchantId":merchantId,
		        "name" : "My Second banner",
		        "info" : "Add some proomotional information about you.",
		        "active" : true,
		        "image" : "slider2.jpg",
		      });
	
	
	var newBannerWithProduct=new Banner(
		      {
		    	  "merchantId":merchantId,
		        "name" : "My First Banner",
		        "info" : "Ut commodo ullamcorper risus nec mattis. Fusce imperdiet ornare dignissim. Donec aliquet con",
		        "image" : "slider1.jpg",
		        "active" : true,
		        productId:newProduct._id
		      });
	newBannerWithProduct.save();
	
	return res.status(201).json({"result":"OK"});
	};
	

function handleError(res, err) {
  return res.status(500).send(err);
}
