'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShippingSchema = new Schema({
  name: String,
  info: String,
  carrier: String,
  country: String,
  charge: Number,
  minWeight: Number,
  maxWeight: Number,
  freeShipping: Number,
  active: Boolean,
  merchantId:String,
});

module.exports = mongoose.model('Shipping', ShippingSchema);
