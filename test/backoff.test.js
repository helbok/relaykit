'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Backoff } = require('../src/backoff');

test('delays grow exponentially', () => {
  const b = new Backoff({ baseMs: 100, maxMs: 10000, jitter: 0 });
  const first = b.nextDelay();
  const second = b.nextDelay();
  assert.equal(first, 100);
  assert.equal(second, 200);
});

test('delays cap at maxMs', () => {
  const b = new Backoff({ baseMs: 1000, maxMs: 3000, jitter: 0 });
  b.nextDelay();
  b.nextDelay();
  b.nextDelay();
  assert.ok(b.nextDelay() <= 3000);
});

test('reset restarts the sequence', () => {
  const b = new Backoff({ baseMs: 100, maxMs: 1000, jitter: 0 });
  b.nextDelay();
  b.nextDelay();
  b.reset();
  assert.equal(b.nextDelay(), 100);
});

test('jitter bounds #3', () => {
const b = new Backoff({ baseMs: 100, maxMs: 1000 });
  const d = b.nextDelay();
  assert.ok(d >= 90 && d <= 110);
});

test('jitter bounds #15', () => {
const b = new Backoff({ baseMs: 100, maxMs: 1000 });
  const d = b.nextDelay();
  assert.ok(d >= 90 && d <= 110);
});
