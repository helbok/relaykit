'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadConfig, defaults, deepMerge } = require('../src/config');

test('loadConfig returns defaults when no overrides', () => {
  const cfg = loadConfig();
  assert.equal(cfg.port, 8080);
  assert.equal(cfg.host, '0.0.0.0');
});

test('loadConfig merges overrides', () => {
  const cfg = loadConfig({ port: 9090 });
  assert.equal(cfg.port, 9090);
  assert.equal(cfg.host, '0.0.0.0');
});

test('loadConfig rejects invalid ports', () => {
  assert.throws(() => loadConfig({ port: 0 }), /invalid port/);
  assert.throws(() => loadConfig({ port: 70000 }), /invalid port/);
});

test('deepMerge combines nested objects', () => {
  const out = deepMerge({ a: { x: 1, y: 2 } }, { a: { y: 3 } });
  assert.deepEqual(out, { a: { x: 1, y: 3 } });
});
