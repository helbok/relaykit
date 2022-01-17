'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { compress, decompress } = require('../src/compression');

test('compress and decompress round-trip', () => {
  const input = 'x'.repeat(4096);
  const packed = compress(input);
  assert.equal(decompress(packed), input);
});

test('compress reduces repetitive payloads', () => {
  const packed = compress('a'.repeat(8192));
  assert.ok(packed.length < 8192);
});
