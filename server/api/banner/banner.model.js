'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BannerSchema = new Schema({
  name: String,
  slug: String,
  info: String,
  image: String,
  uid: String,
  productId:String,
  merchantId:String,
  active: { type: Boolean, default: true },
  updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Banner', BannerSchema);
