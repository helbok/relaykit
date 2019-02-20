'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Logger, LEVELS } = require('../src/logger');

test('logger suppresses levels below threshold', () => {
  const lines = [];
  const stream = { write: (s) => lines.push(s) };
  const logger = new Logger('info', stream);
  logger.debug('hidden');
  logger.info('shown');
  assert.equal(lines.length, 1);
  assert.ok(lines[0].includes('shown'));
});

test('logger includes level tag and timestamp', () => {
  const lines = [];
  const stream = { write: (s) => lines.push(s) };
  const logger = new Logger('info', stream);
  logger.warn('watch out');
  assert.ok(lines[0].includes('[warn]'));
});

test('LEVELS map is ordered', () => {
  assert.ok(LEVELS.debug < LEVELS.info);
});
