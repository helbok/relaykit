'use strict';

const jwt = require('jsonwebtoken');
const { AuthError } = require('./errors');

class Authenticator {
  constructor(options = {}) {
    this.secret = options.secret || 'relaykit-dev-secret';
    this.required = options.required !== false;
  }

  createToken(claims = {}, options = {}) {
    return jwt.sign(claims, this.secret, options);
  }

  verify(token) {
    if (typeof token !== 'string' || token.length === 0) {
      throw new AuthError('missing authentication token');
    }
    try {
      return jwt.verify(token, this.secret);
    } catch (err) {
      throw new AuthError(`invalid token: ${err.message}`);
    }
  }

  authenticate(connection, token) {
    if (!this.required) return true;
    const claims = this.verify(token);
    connection.metadata.claims = claims;
    connection.metadata.authenticated = true;
    return true;
  }
}

module.exports = { Authenticator };
