'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Authenticator } = require('../src/auth');

test('createToken and verify round-trip', () => {
  const auth = new Authenticator({ secret: 's3cret' });
  const token = auth.createToken({ sub: 'user-1' });
  const claims = auth.verify(token);
  assert.equal(claims.sub, 'user-1');
});

test('verify rejects tampered tokens', () => {
  const auth = new Authenticator({ secret: 's3cret' });
  const token = auth.createToken({ sub: 'user-1' });
  assert.throws(() => auth.verify(token + 'x'), /invalid token/);
});

test('authenticate is a no-op when not required', () => {
  const auth = new Authenticator({ required: false });
  assert.equal(auth.authenticate({}, 'junk'), true);
});

test('missing token #7', () => {
const auth = new Authenticator({ secret: 's' });
  assert.throws(() => auth.verify(''), /missing/);
});

test('missing token #19', () => {
const auth = new Authenticator({ secret: 's' });
  assert.throws(() => auth.verify(''), /missing/);
});
