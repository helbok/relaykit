'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { EventEmitter } = require('events');
const { Connection } = require('../src/connection');

function fakeSocket() {
  const s = new EventEmitter();
  s.sent = [];
  s.send = (p) => s.sent.push(p);
  s.close = () => {};
  return s;
}

test('connection sends while open', () => {
  const s = fakeSocket();
  const c = new Connection(s);
  c.send('hello');
  assert.deepEqual(s.sent, ['hello']);
});

test('connection refuses to send after close', () => {
  const s = fakeSocket();
  const c = new Connection(s);
  c.markClosed();
  assert.throws(() => c.send('hello'), /cannot send/);
});

test('markClosed emits close with id', () => {
  const s = fakeSocket();
  const c = new Connection(s);
  let emitted = null;
  c.on('close', (id) => { emitted = id; });
  c.markClosed();
  assert.equal(emitted, c.id);
});
