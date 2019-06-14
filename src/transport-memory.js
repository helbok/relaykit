'use strict';

const { EventEmitter } = require('events');
const { Connection } = require('./connection');

class MemoryTransport extends EventEmitter {
  constructor(options = {}, onConnection) {
    super();
    this.options = options;
    this.onConnection = onConnection;
    this.clients = new Set();
  }

  listen() {
    return this;
  }

  connect(metadata = {}) {
    const fakeSocket = new EventEmitter();
    fakeSocket.send = (payload) => this.emit('deliver', payload);
    fakeSocket.close = () => {};
    const connection = new Connection(fakeSocket, metadata);
    this.clients.add(connection);
    this.onConnection(connection);
    return connection;
  }

  close() {
    for (const c of this.clients) c.markClosed();
    this.clients.clear();
  }
}

module.exports = { MemoryTransport };
