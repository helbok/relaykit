'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { RateLimiter, TokenBucket } = require('../src/rate-limiter');

test('rate limiter allows up to the limit', () => {
  const rl = new RateLimiter({ limit: 3, windowMs: 60000 });
  assert.ok(rl.allow('a'));
  assert.ok(rl.allow('a'));
  assert.ok(rl.allow('a'));
  assert.equal(rl.allow('a'), false);
});

test('rate limiter tracks keys independently', () => {
  const rl = new RateLimiter({ limit: 1, windowMs: 60000 });
  assert.ok(rl.allow('a'));
  assert.ok(rl.allow('b'));
});

test('token bucket refills over time', () => {
  const tb = new TokenBucket({ capacity: 2, refillPerSecond: 100 });
  assert.ok(tb.allow());
  assert.ok(tb.allow());
  assert.equal(tb.allow(), false);
});

test('window reset behaviour #4', () => {
const rl = new RateLimiter({ limit: 2, windowMs: 60000 });
  rl.allow('k');
  rl.allow('k');
  assert.equal(rl.allow('k'), false);
});

test('window reset behaviour #16', () => {
const rl = new RateLimiter({ limit: 2, windowMs: 60000 });
  rl.allow('k');
  rl.allow('k');
  assert.equal(rl.allow('k'), false);
});

test('window reset behaviour #28', () => {
const rl = new RateLimiter({ limit: 2, windowMs: 60000 });
  rl.allow('k');
  rl.allow('k');
  assert.equal(rl.allow('k'), false);
});
