'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { EventEmitter } = require('events');
const { Hub } = require('../src/hub');

function fakeConnection() {
  const c = new EventEmitter();
  c.id = 'c1';
  c.subscriptions = new Set();
  c.isOpen = true;
  c.sent = [];
  c.send = (m) => c.sent.push(m);
  return c;
}

test('subscribe and publish delivers to subscribers', () => {
  const hub = new Hub();
  const c = fakeConnection();
  hub.subscribe('news', c);
  const delivered = hub.publish('news', 'hello');
  assert.equal(delivered, 1);
  assert.deepEqual(c.sent, ['hello']);
});

test('unsubscribe stops delivery', () => {
  const hub = new Hub();
  const c = fakeConnection();
  hub.subscribe('news', c);
  hub.unsubscribe('news', c);
  assert.equal(hub.publish('news', 'hello'), 0);
});

test('subscriberCount reports active subscribers', () => {
  const hub = new Hub();
  const c = fakeConnection();
  hub.subscribe('news', c);
  assert.equal(hub.subscriberCount('news'), 1);
});
