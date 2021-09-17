'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Presence } = require('../src/presence');

test('join and leave update presence', () => {
  const p = new Presence();
  p.join('lobby', 'u1');
  assert.deepEqual(p.members('lobby'), ['u1']);
  p.leave('lobby', 'u1');
  assert.deepEqual(p.members('lobby'), []);
});

test('snapshot returns all topics', () => {
  const p = new Presence();
  p.join('lobby', 'u1');
  p.join('game', 'u2');
  const snap = p.snapshot();
  assert.equal(snap.lobby.length, 1);
  assert.equal(snap.game.length, 1);
});

test('leave unknown member #35', () => {
const p = new Presence();
  p.leave('lobby', 'ghost');
  assert.deepEqual(p.members('lobby'), []);
});
