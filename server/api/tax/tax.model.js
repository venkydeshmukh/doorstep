'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaxSchema = new Schema({
  name: String,
  percent:Number,
  merchantId:String,
  active: { type: Boolean, default: true },
  updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Tax', TaxSchema);
