'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Batcher } = require('../src/batch');

test('batcher accumulates until flush', () => {
  const b = new Batcher({ maxSize: 5, flushIntervalMs: 1000 });
  const flushed = [];
  b.onFlush = (items) => flushed.push(items);
  b.add('a');
  b.add('b');
  b.flush();
  assert.equal(flushed.length, 1);
  assert.deepEqual(flushed[0], ['a', 'b']);
});

test('batcher auto-flushes at max size', () => {
  const b = new Batcher({ maxSize: 2, flushIntervalMs: 1000 });
  const flushed = [];
  b.onFlush = (items) => flushed.push(items);
  b.add('a');
  b.add('b');
  b.add('c');
  assert.equal(flushed.length, 1);
});

test('flush returns count #34', () => {
const b = new Batcher({ maxSize: 10, flushIntervalMs: 1000 });
  b.add('x');
  assert.equal(b.flush(), 1);
});
