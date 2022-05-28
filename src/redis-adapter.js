'use strict';

const { EventEmitter } = require('events');
const Redis = require('ioredis');

const RECONNECT_DELAY_MS = 2000;

class RedisAdapter extends EventEmitter {
  constructor(options = {}) {
    super();
    this.url = options.url || 'redis://localhost:6379';
    this.channel = options.channel || 'relaykit';
    this.client = new Redis(this.url, { lazyConnect: true, retryStrategy: () => RECONNECT_DELAY_MS });
  }

  async connect() {
    await this.client.connect();
    await this.client.subscribe(this.channel);
    this.client.on('message', (channel, message) => this.emit('message', message));
    this.client.on('error', (err) => this.emit('error', err));
  }

  publish(message) {
    return this.client.publish(this.channel, message);
  }

  async close() {
    await this.client.quit();
  }
}

module.exports = { RedisAdapter, RECONNECT_DELAY_MS };
