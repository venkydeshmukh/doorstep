'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MerchantCategorySchema = new Schema({
  name: String,
  description: String,
  parentCategory: Number,
  image: String,
  uid: String,
  category: Number,
  active: { type: Boolean, default: true },
  updated: {type: Date, default: Date.now},
  sub_categories: [{}]
});

module.exports = mongoose.model('MerchantCategory', MerchantCategorySchema);
