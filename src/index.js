'use strict';

const { Relay } = require('./relay');
const { Hub } = require('./hub');
const { createTransport } = require('./transport');
const { Authenticator } = require('./auth');
const { Metrics } = require('./metrics');
const { JsonSerializer } = require('./serializer');
const { createLogger } = require('./logger');
const { loadConfig, defaults } = require('./config');
const errors = require('./errors');
const { createMessage, normalizeTopic } = require('./message');
const { Backoff } = require('./backoff');
const { RateLimiter, TokenBucket } = require('./rate-limiter');

function createRelay(options) {
  return new Relay(options);
}

module.exports = {
  createRelay,
  Relay,
  Hub,
  createTransport,
  Authenticator,
  Metrics,
  JsonSerializer,
  createLogger,
  loadConfig,
  defaults,
  errors,
  createMessage,
  normalizeTopic,
  Backoff,
  RateLimiter,
  TokenBucket,
};
