'use strict';

var _ = require('lodash');
var Banner = require('./banner.model');

// Get list of banners
exports.index = function(req, res) {
  var q = req.query;
  // setTimeout(function(){
    Banner.find(q, function (err, banners) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(banners);
    });
  // },1000);
};



// Get a single banner
exports.show = function(req, res) {
  Banner.findById(req.params.id, function (err, banner) {
    if(err) { return handleError(res, err); }
    if(!banner) { return res.status(404).send('Not Found'); }
    return res.json(banner);
  });
};

// Creates a new banner in the DB.
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

  Banner.create(req.body, function(err, banner) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(banner);
  });
};

// Updates an existing banner in the DB.
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

  Banner.findById(req.params.id, function (err, banner) {
    if (err) { return handleError(res, err); }
    if(!banner) { return res.status(404).send('Not Found'); }
    var updated = _.merge(banner, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(banner);
    });
  });
};

// Deletes a banner from the DB.
exports.destroy = function(req, res) {
  Banner.findById(req.params.id, function (err, banner) {
    if(err) { return handleError(res, err); }
    if(!banner) { return res.status(404).send('Not Found'); }
    banner.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
