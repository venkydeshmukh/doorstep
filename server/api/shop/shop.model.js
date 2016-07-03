'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShopSchema = new Schema({
  name: String,
  tagline: String,
  info: String,
  active: Boolean,
  email:String,
  telephone:String,
  address:String,
  country:String,
  state:String,
  city:String,
  zipcode:String,
  website:String,
  aboutus:String,
  style: {
	  footerBackgroundColor: String,
	  primaryColor: String,
	  secondaryColor: String,
	  fontFamily:String
	},
  merchantcategory: {
	  name: String,
	  description: String,
	  parentCategory: Number,
	  image: String,
	  uid: String,
	  category: Number,
	  sub_categories: [{}]
	}
});

module.exports = mongoose.model('Shop', ShopSchema);
