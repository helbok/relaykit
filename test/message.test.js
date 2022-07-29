'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { normalizeTopic, createMessage, isMessage, buildAck } = require('../src/message');

test('normalizeTopic strips leading and trailing slashes', () => {
  assert.equal(normalizeTopic('/orders/created/'), 'orders/created');
});

test('normalizeTopic rejects wildcards', () => {
  assert.throws(() => normalizeTopic('orders/*'), /invalid topic/);
});

test('createMessage builds a well-formed envelope', () => {
  const msg = createMessage('publish', 'orders/created', { id: 1 });
  assert.equal(msg.type, 'publish');
  assert.equal(msg.topic, 'orders/created');
  assert.ok(msg.id);
});

test('buildAck references the original message', () => {
  const msg = createMessage('publish', 'orders/created', { id: 1 });
  const ack = buildAck(msg);
  assert.equal(ack.type, 'ack');
  assert.equal(ack.payload.id, msg.id);
});

test('isMessage accepts valid envelopes and rejects junk', () => {
  assert.ok(isMessage(createMessage('publish', 't', null)));
  assert.equal(isMessage({ type: 'nope' }), false);
  assert.equal(isMessage(null), false);
});

test('topic edge cases #1', () => {
assert.equal(normalizeTopic('a/b/'), 'a/b');
  assert.throws(() => normalizeTopic(''), /non-empty/);
});

test('topic edge cases #13', () => {
assert.equal(normalizeTopic('a/b/'), 'a/b');
  assert.throws(() => normalizeTopic(''), /non-empty/);
});

test('topic edge cases #25', () => {
assert.equal(normalizeTopic('a/b/'), 'a/b');
  assert.throws(() => normalizeTopic(''), /non-empty/);
});

test('topic edge cases #37', () => {
assert.equal(normalizeTopic('a/b/'), 'a/b');
  assert.throws(() => normalizeTopic(''), /non-empty/);
});

test('topic edge cases #49', () => {
assert.equal(normalizeTopic('a/b/'), 'a/b');
  assert.throws(() => normalizeTopic(''), /non-empty/);
});
