'use strict';

const { EventEmitter } = require('events');
const { createTransport } = require('./transport');
const { Hub } = require('./hub');
const { Authenticator } = require('./auth');
const { RateLimiter } = require('./rate-limiter');
const { Metrics } = require('./metrics');
const { JsonSerializer } = require('./serializer');
const { createLogger } = require('./logger');
const { loadConfig } = require('./config');
const { createMessage, isMessage, buildAck } = require('./message');
const { InvalidMessageError } = require('./errors');

class Relay extends EventEmitter {
  constructor(options = {}) {
    super();
    this.config = loadConfig(options);
    this.logger = createLogger({ level: this.config.logLevel });
    this.serializer = new JsonSerializer();
    this.hub = new Hub();
    this.metrics = new Metrics();
    this.auth = new Authenticator({ required: this.config.requireAuth, secret: this.config.secret });
    this.rateLimiter = new RateLimiter({ limit: this.config.rateLimitPerMinute });
    this.transport = createTransport(this.config, (connection) => this._onConnection(connection));
    this.connections = new Set();
  }

  _onConnection(connection) {
    this.connections.add(connection);
    this.metrics.gauge('connections').inc();
    connection.on('close', () => {
      this.connections.delete(connection);
      this.metrics.gauge('connections').dec();
      this.hub.unsubscribeAll(connection);
    });
  }

  handleRaw(connection, raw) {
    let message;
    try {
      message = this.serializer.deserialize(raw);
    } catch (err) {
      connection.send(this.serializer.serialize(createMessage('error', null, { message: err.message })));
      return;
    }
    this.handle(connection, message);
  }

  _handlePublish(connection, message) {
    this.metrics.counter('messages.published').inc();
    this.hub.publish(message.topic, this.serializer.serialize(message));
  }

  handle(connection, message) {
    if (!isMessage(message)) {
      throw new InvalidMessageError('malformed message envelope');
    }
    this.metrics.counter('messages.total').inc();
    if (!this.rateLimiter.allow(connection.id)) {
      connection.send(this.serializer.serialize(createMessage('error', null, { message: 'rate limit exceeded' })));
      return;
    }
    switch (message.type) {
      case 'subscribe':
        this.hub.subscribe(message.topic, connection);
        connection.send(this.serializer.serialize(buildAck(message)));
        break;
      case 'unsubscribe':
        this.hub.unsubscribe(message.topic, connection);
        break;
      case 'publish':
        this._handlePublish(connection, message);
        break;
      case 'ping':
        connection.send(this.serializer.serialize(createMessage('pong', null, null)));
        break;
      default:
        connection.send(this.serializer.serialize(createMessage('error', null, { message: `unhandled type: ${message.type}` })));
    }
  }

  start() {
    this.transport.listen();
    this.logger.info(`relay listening on ${this.config.host}:${this.config.port}${this.config.path}`);
    return this;
  }

  stop() {
    this.transport.close();
    this.connections.clear();
    this.logger.info('relay stopped');
  }
}

module.exports = { Relay };
