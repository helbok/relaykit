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

test('unsubscribeAll #6', () => {
const hub = new Hub();
  const c = fakeConnection();
  hub.subscribe('a', c);
  hub.subscribe('b', c);
  hub.unsubscribeAll(c);
  assert.equal(hub.subscriberCount('a'), 0);
});

test('unsubscribeAll #18', () => {
const hub = new Hub();
  const c = fakeConnection();
  hub.subscribe('a', c);
  hub.subscribe('b', c);
  hub.unsubscribeAll(c);
  assert.equal(hub.subscriberCount('a'), 0);
});

test('unsubscribeAll #30', () => {
const hub = new Hub();
  const c = fakeConnection();
  hub.subscribe('a', c);
  hub.subscribe('b', c);
  hub.unsubscribeAll(c);
  assert.equal(hub.subscriberCount('a'), 0);
});

test('unsubscribeAll #42', () => {
const hub = new Hub();
  const c = fakeConnection();
  hub.subscribe('a', c);
  hub.subscribe('b', c);
  hub.unsubscribeAll(c);
  assert.equal(hub.subscriberCount('a'), 0);
});

test('unsubscribeAll #54', () => {
const hub = new Hub();
  const c = fakeConnection();
  hub.subscribe('a', c);
  hub.subscribe('b', c);
  hub.unsubscribeAll(c);
  assert.equal(hub.subscriberCount('a'), 0);
});

test('unsubscribeAll #66', () => {
const hub = new Hub();
  const c = fakeConnection();
  hub.subscribe('a', c);
  hub.subscribe('b', c);
  hub.unsubscribeAll(c);
  assert.equal(hub.subscriberCount('a'), 0);
});

test('unsubscribeAll #78', () => {
const hub = new Hub();
  const c = fakeConnection();
  hub.subscribe('a', c);
  hub.subscribe('b', c);
  hub.unsubscribeAll(c);
  assert.equal(hub.subscriberCount('a'), 0);
});

test('unsubscribeAll #90', () => {
const hub = new Hub();
  const c = fakeConnection();
  hub.subscribe('a', c);
  hub.subscribe('b', c);
  hub.unsubscribeAll(c);
  assert.equal(hub.subscriberCount('a'), 0);
});

test('unsubscribeAll #102', () => {
const hub = new Hub();
  const c = fakeConnection();
  hub.subscribe('a', c);
  hub.subscribe('b', c);
  hub.unsubscribeAll(c);
  assert.equal(hub.subscriberCount('a'), 0);
});

test('unsubscribeAll #114', () => {
const hub = new Hub();
  const c = fakeConnection();
  hub.subscribe('a', c);
  hub.subscribe('b', c);
  hub.unsubscribeAll(c);
  assert.equal(hub.subscriberCount('a'), 0);
});
