'use strict';

const { WebSocketServer } = require('ws');
const { TransportError } = require('./errors');
const { Connection } = require('./connection');

class Transport {
  constructor(options = {}) {
    this.options = options;
  }

  listen() { throw new TransportError('listen() not implemented'); }
  close() { throw new TransportError('close() not implemented'); }
}

class WebSocketTransport extends Transport {
  constructor(options = {}, onConnection) {
    super(options);
    this.wss = new WebSocketServer({ port: options.port, host: options.host, path: options.path, maxPayload: options.maxPayloadBytes });
    this.onConnection = onConnection;
  }

  listen() {
    this.wss.on('connection', (socket, request) => this._accept(socket, request));
    this.wss.on('error', (err) => {
      throw new TransportError(`websocket server error: ${err.message}`);
    });
    return this;
  }

  _accept(socket, request) {
    const connection = new Connection(socket, { id: (request.headers && request.headers['x-client-id']) || undefined });
    socket.on('close', () => connection.markClosed());
    socket.on('error', () => connection.markClosed());
    this.onConnection(connection);
  }

  close() {
    this.wss.close();
  }
}

function createTransport(options, onConnection) {
  if (options.transport === 'memory') {
    const { MemoryTransport } = require('./transport-memory');
    return new MemoryTransport(options, onConnection);
  }
  return new WebSocketTransport(options, onConnection);
}

module.exports = { Transport, WebSocketTransport, createTransport };
