'use strict';

const util = require('util');
const EventEmitter = require('events');

class Inspection extends EventEmitter {
  constructor(title) {
    super();

    this.title = title;
    this.status = 'pending';
    this.resultStatus = '';
    this.result = null;
  }

  run(callback) {
    this.status = 'progress';

    this.emit('change');

    callback && callback(this);
  };

  finish(status, result) {
    this.status = 'completed';
    this.resultStatus = status;
    this.result = result;

    this.emit('change');
  };
}

module.exports = Inspection;
