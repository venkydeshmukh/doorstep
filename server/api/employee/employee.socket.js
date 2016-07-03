/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Brand = require('./user.model');

exports.register = function(socket) {
  Brand.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Brand.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('user:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('user:remove', doc);
}