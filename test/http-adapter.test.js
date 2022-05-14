'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { HttpAdapter } = require('../src/http-adapter');

test('adapter exposes health route', () => {
  const adapter = new HttpAdapter({ relay: { metrics: { snapshot: () => ({ ok: 1 }) } } });
  assert.equal(typeof adapter.healthHandler, 'function');
});

test('adapter reports metrics', () => {
  const adapter = new HttpAdapter({ relay: { metrics: { snapshot: () => ({ counters: {} }) } } });
  assert.ok(adapter.metricsHandler());
});
