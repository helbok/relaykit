'use strict';

/**
 * Base error class for everything relaykit throws.
 */
class RelayKitError extends Error {
  constructor(message, code = 'ERR_RELAYKIT', cause) {
    super(message);
    this.name = 'RelayKitError';
    this.code = code;
    if (cause) this.cause = cause;
  }
}

class ConfigError extends RelayKitError {
  constructor(message) { super(message, 'ERR_CONFIG'); this.name = 'ConfigError'; }
}

class SerializationError extends RelayKitError {
  constructor(message) { super(message, 'ERR_SERIALIZATION'); this.name = 'SerializationError'; }
}

class InvalidMessageError extends RelayKitError {
  constructor(message) { super(message, 'ERR_INVALID_MESSAGE'); this.name = 'InvalidMessageError'; }
}

class AuthError extends RelayKitError {
  constructor(message) { super(message, 'ERR_AUTH'); this.name = 'AuthError'; }
}

class RateLimitError extends RelayKitError {
  constructor(message) { super(message, 'ERR_RATE_LIMIT'); this.name = 'RateLimitError'; }
}

class TransportError extends RelayKitError {
  constructor(message) { super(message, 'ERR_TRANSPORT'); this.name = 'TransportError'; }
}

class ConnectionClosedError extends RelayKitError {
  constructor(message) { super(message, 'ERR_CONNECTION_CLOSED'); this.name = 'ConnectionClosedError'; }
}

module.exports = {
  RelayKitError,
  ConfigError,
  SerializationError,
  InvalidMessageError,
  AuthError,
  RateLimitError,
  TransportError,
  ConnectionClosedError,
};
