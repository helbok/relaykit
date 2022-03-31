'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { JsonSerializer } = require('../src/serializer');

test('serialize produces JSON text', () => {
  const s = new JsonSerializer();
  assert.equal(s.serialize({ a: 1 }), '{"a":1}');
});

test('deserialize round-trips', () => {
  const s = new JsonSerializer();
  assert.deepEqual(s.deserialize(s.serialize({ a: [1, 2] })), { a: [1, 2] });
});

test('deserialize throws on bad JSON', () => {
  const s = new JsonSerializer();
  assert.throws(() => s.deserialize('{oops'), /failed to deserialize/);
});

test('deserialize round-trip #8', () => {
const s = new JsonSerializer();
  const text = s.serialize({ a: 1 });
  assert.deepEqual(s.deserialize(text), { a: 1 });
});

test('deserialize round-trip #20', () => {
const s = new JsonSerializer();
  const text = s.serialize({ a: 1 });
  assert.deepEqual(s.deserialize(text), { a: 1 });
});

test('deserialize round-trip #32', () => {
const s = new JsonSerializer();
  const text = s.serialize({ a: 1 });
  assert.deepEqual(s.deserialize(text), { a: 1 });
});

test('deserialize round-trip #44', () => {
const s = new JsonSerializer();
  const text = s.serialize({ a: 1 });
  assert.deepEqual(s.deserialize(text), { a: 1 });
});
