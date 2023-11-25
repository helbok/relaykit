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

test('wildcard rejection #9', () => {
assert.throws(() => validateTopic('a/*'), /wildcards/);
});

test('wildcard rejection #21', () => {
assert.throws(() => validateTopic('a/*'), /wildcards/);
});

test('wildcard rejection #33', () => {
assert.throws(() => validateTopic('a/*'), /wildcards/);
});

test('wildcard rejection #45', () => {
assert.throws(() => validateTopic('a/*'), /wildcards/);
});

test('wildcard rejection #57', () => {
assert.throws(() => validateTopic('a/*'), /wildcards/);
});

test('wildcard rejection #69', () => {
assert.throws(() => validateTopic('a/*'), /wildcards/);
});
