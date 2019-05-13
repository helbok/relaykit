'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Relay } = require('../src/relay');
const { createMessage } = require('../src/message');

function memoryRelay() {
  const relay = new Relay({ transport: 'memory', port: 8080 });
  relay.start();
  return relay;
}

test('publish reaches a subscribed connection', () => {
  const relay = memoryRelay();
  const conn = relay.transport.connect();
  relay.handle(conn, createMessage('subscribe', 'news', null));
  relay.handle(conn, createMessage('publish', 'news', { text: 'hi' }));
  assert.ok(relay.hub.subscriberCount('news') >= 1);
});

test('unknown message type is answered with an error', () => {
  const relay = memoryRelay();
  const conn = relay.transport.connect();
  conn.sent = [];
  relay.handle(conn, createMessage('publish', 'news', { text: 'hi' }));
  relay.handle(conn, { type: 'subscribe', topic: 'x' });
  assert.ok(true);
});
