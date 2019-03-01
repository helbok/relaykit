'use strict';

const { ConfigError } = require('./errors');

const defaults = {
  host: '0.0.0.0',
  port: 8080,
  path: '/relay',
  heartbeatIntervalMs: 30000,
  maxPayloadBytes: 1048576,
  maxConnections: 10000,
  rateLimitPerMinute: 120,
  backoffBaseMs: 200,
  backoffMaxMs: 30000,
  topicPrefix: '',
  requireAuth: false,
  logLevel: 'info',
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

module.exports = { defaults, deepMerge, loadConfig };
