'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { SendQueue } = require('../src/backpressure');

test('queue flushes in order', () => {
  const q = new SendQueue({ maxSize: 10 });
  const out = [];
  q.enqueue('a', (m) => out.push(m));
  q.enqueue('b', (m) => out.push(m));
  q.flush();
  assert.deepEqual(out, ['a', 'b']);
});

test('queue drops when full', () => {
  const q = new SendQueue({ maxSize: 1 });
  assert.equal(q.enqueue('a', () => {}), true);
  assert.equal(q.enqueue('b', () => {}), false);
});
