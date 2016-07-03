'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PaymentMethodSchema = new Schema({
  name: String,
  email: String,
  options: Object,
  active: Boolean,
  merchantId:String
});

module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema);
