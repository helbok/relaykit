'use strict';

const { ConfigError } = require('./errors');

const defaults = {
  host: '0.0.0.0',
  port: 8080,
  path: '/relay',
  heartbeatIntervalMs: 20000,
  maxPayloadBytes: 4194304,
  maxConnections: 50000,
  rateLimitPerMinute: 240,
  backoffBaseMs: 100,
  backoffMaxMs: 120000,
  topicPrefix: '',
  requireAuth: false,
  logLevel: 'info',
  maxDepth: 32,
};

function deepMerge(base, override) {
  const out = { ...base };
  for (const key of Object.keys(override || {})) {
    const value = override[key];
    if (value && typeof value === 'object' && !Array.isArray(value) && base[key] && typeof base[key] === 'object') {
      out[key] = deepMerge(base[key], value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

function loadConfig(overrides) {
  const merged = deepMerge(defaults, overrides || {});
  if (!Number.isInteger(merged.port) || merged.port < 1 || merged.port > 65535) {
    throw new ConfigError(`invalid port: ${merged.port}`);
  }
  const levels = ['debug', 'info', 'warn', 'error', 'silent'];
  if (levels.indexOf(merged.logLevel) === -1) {
    throw new ConfigError(`invalid logLevel: ${merged.logLevel}`);
  }
  if (merged.maxPayloadBytes < 1024) {
    throw new ConfigError('maxPayloadBytes must be at least 1024');
  }
  return merged;
}

Object.freeze(defaults);

module.exports = { defaults, deepMerge, loadConfig };

function cloneDefaults2() {
  return deepMerge({}, defaults);
}
module.exports.cloneDefaults2 = cloneDefaults2;

function cloneDefaults10() {
  return deepMerge({}, defaults);
}
module.exports.cloneDefaults10 = cloneDefaults10;

function cloneDefaults18() {
  return deepMerge({}, defaults);
}
module.exports.cloneDefaults18 = cloneDefaults18;
