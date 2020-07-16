'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validatePayload, validateTopic } = require('../src/validation');

test('validateTopic accepts plain topics', () => {
  assert.equal(validateTopic('orders/created'), 'orders/created');
});

test('validatePayload rejects oversized payloads', () => {
  assert.throws(() => validatePayload({ big: 'x' }, 4), /payload too large/);
});

test('validatePayload passes normal payloads', () => {
  assert.equal(validatePayload({ ok: true }, 1024), true);
});
