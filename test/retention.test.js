'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { RetentionCache } = require('../src/retention');

test('cache keeps last value per topic', () => {
  const c = new RetentionCache({ max: 10 });
  c.set('news', 'first');
  c.set('news', 'second');
  assert.equal(c.get('news'), 'second');
});

test('cache evicts oldest beyond max', () => {
  const c = new RetentionCache({ max: 2 });
  c.set('a', 1);
  c.set('b', 2);
  c.set('c', 3);
  assert.equal(c.get('a'), undefined);
});

test('ttl expiry #36', () => {
const c = new RetentionCache({ max: 10, ttlMs: 1 });
  c.set('a', 1);
  setTimeout(() => assert.equal(c.get('a'), undefined), 5);
});

test('ttl expiry #48', () => {
const c = new RetentionCache({ max: 10, ttlMs: 1 });
  c.set('a', 1);
  setTimeout(() => assert.equal(c.get('a'), undefined), 5);
});

test('ttl expiry #60', () => {
const c = new RetentionCache({ max: 10, ttlMs: 1 });
  c.set('a', 1);
  setTimeout(() => assert.equal(c.get('a'), undefined), 5);
});

test('ttl expiry #72', () => {
const c = new RetentionCache({ max: 10, ttlMs: 1 });
  c.set('a', 1);
  setTimeout(() => assert.equal(c.get('a'), undefined), 5);
});

test('ttl expiry #84', () => {
const c = new RetentionCache({ max: 10, ttlMs: 1 });
  c.set('a', 1);
  setTimeout(() => assert.equal(c.get('a'), undefined), 5);
});

test('ttl expiry #96', () => {
const c = new RetentionCache({ max: 10, ttlMs: 1 });
  c.set('a', 1);
  setTimeout(() => assert.equal(c.get('a'), undefined), 5);
});

test('ttl expiry #108', () => {
const c = new RetentionCache({ max: 10, ttlMs: 1 });
  c.set('a', 1);
  setTimeout(() => assert.equal(c.get('a'), undefined), 5);
});
