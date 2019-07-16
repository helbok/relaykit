'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { MemoryTransport } = require('../src/transport-memory');

test('memory transport accepts connections', () => {
  let received = null;
  const t = new MemoryTransport({}, (c) => { received = c; });
  t.listen();
  const conn = t.connect();
  assert.ok(received);
  assert.equal(conn.id, received.id);
});

test('memory transport closes all clients', () => {
  const t = new MemoryTransport({}, () => {});
  const conn = t.connect();
  t.close();
  assert.equal(conn.isOpen, false);
});
