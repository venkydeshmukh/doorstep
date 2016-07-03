'use strict';

var _ = require('lodash');
var Tax = require('./tax.model');

// Get list of taxs
exports.index = function(req, res) {
  var q = req.query;
  // setTimeout(function(){
    Tax.find(q, function (err, taxs) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(taxs);
    });
  // },1000);
};



// Get a single tax
exports.show = function(req, res) {
  Tax.findById(req.params.id, function (err, tax) {
    if(err) { return handleError(res, err); }
    if(!tax) { return res.status(404).send('Not Found'); }
    return res.json(tax);
  });
};

// Creates a new tax in the DB.
exports.create = function(req, res) {
  req.body.uid = req.user.email; // id change on every login hence email is used
  req.body.updated = Date.now();
  if(!req.body.slug && req.body.info)
  req.body.slug = req.body.info.toString().toLowerCase()
                      .replace(/\s+/g, '-')        // Replace spaces with -
                      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
                      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
                      .replace(/^-+/, '')          // Trim - from start of text
                      .replace(/-+$/, '');

  Tax.create(req.body, function(err, tax) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(tax);
  });
};

// Updates an existing tax in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  req.body.uid = req.user.email; // id change on every login hence email is used
  req.body.updated = Date.now();
  if(!req.body.slug && req.body.info)
  req.body.slug = req.body.info.toString().toLowerCase()
                      .replace(/\s+/g, '-')        // Replace spaces with -
                      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
                      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
                      .replace(/^-+/, '')          // Trim - from start of text
                      .replace(/-+$/, '');

  Tax.findById(req.params.id, function (err, tax) {
    if (err) { return handleError(res, err); }
    if(!tax) { return res.status(404).send('Not Found'); }
    var updated = _.merge(tax, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(tax);
    });
  });
};

// Deletes a tax from the DB.
exports.destroy = function(req, res) {
  Tax.findById(req.params.id, function (err, tax) {
    if(err) { return handleError(res, err); }
    if(!tax) { return res.status(404).send('Not Found'); }
    tax.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
