'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { RelayKitError, ConfigError, AuthError } = require('../src/errors');

test('RelayKitError carries code and cause', () => {
  const err = new RelayKitError('boom', 'ERR_X', new Error('inner'));
  assert.equal(err.message, 'boom');
  assert.equal(err.code, 'ERR_X');
  assert.ok(err.cause);
});

test('subclasses keep their own codes', () => {
  assert.equal(new ConfigError('bad').code, 'ERR_CONFIG');
  assert.equal(new AuthError('nope').code, 'ERR_AUTH');
});

test('errors are instanceof Error', () => {
  assert.ok(new ConfigError('bad') instanceof Error);
});
