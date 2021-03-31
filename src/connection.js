'use strict';

const { EventEmitter } = require('events');
const { v4: uuidv4 } = require('uuid');
const { ConnectionClosedError } = require('./errors');

const STATES = { CONNECTING: 'connecting', OPEN: 'open', CLOSING: 'closing', CLOSED: 'closed' };

const SEND_QUEUE_LIMIT = 2048;

class Connection extends EventEmitter {
  constructor(socket, options = {}) {
    super();
    this.id = options.id || uuidv4();
    this.socket = socket;
    this.state = STATES.OPEN;
    this.subscriptions = new Set();
    this.metadata = {};
    this._sendQueue = [];
  }

  send(payload) {
    if (this.state !== STATES.OPEN) {
      throw new ConnectionClosedError(`cannot send on ${this.state} connection ${this.id}`);
    }
    this.socket.send(payload);
  }

  close(code = 1000, reason = '') {
    if (this.state === STATES.CLOSED) return;
    this.state = STATES.CLOSING;
    this.socket.close(code, reason);
  }

  markClosed() {
    this.state = STATES.CLOSED;
    this.emit('close', this.id);
  }

  get isOpen() {
    return this.state === STATES.OPEN;
  }
}

module.exports = { Connection, STATES, SEND_QUEUE_LIMIT };
