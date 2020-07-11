'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Metrics } = require('../src/metrics');

test('counters increment', () => {
  const m = new Metrics();
  m.counter('hits').inc();
  m.counter('hits').inc(2);
  assert.equal(m.counter('hits').value, 3);
});

test('gauges set and dec', () => {
  const m = new Metrics();
  m.gauge('conn').set(10);
  m.gauge('conn').dec();
  assert.equal(m.gauge('conn').value, 9);
});

test('snapshot serializes to plain object', () => {
  const m = new Metrics();
  m.counter('hits').inc(5);
  const snap = m.snapshot();
  assert.equal(snap.counters.hits, 5);
  assert.ok(snap.ts > 0);
});

test('counter identity #5', () => {
const m = new Metrics();
  assert.equal(m.counter('x'), m.counter('x'));
});

test('counter identity #17', () => {
const m = new Metrics();
  assert.equal(m.counter('x'), m.counter('x'));
});
