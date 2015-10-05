'use strict';

var util = require('util');
var EventEmitter = require('events');

function Inspection (title) {
  this.title = title;
  this.status = 'pending';
  this.resultStatus = '';
  this.result = null;
}

util.inherits(Inspection, EventEmitter);

Inspection.prototype.run = function (callback) {
  this.status = 'progress';

  this.emit('change');

  callback && callback(this);
};

Inspection.prototype.finish = function (status, result) {
  this.status = 'completed';
  this.resultStatus = status;
  this.result = result;

  this.emit('change');
};

module.exports = Inspection;
