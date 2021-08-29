'use strict';

const MAX_RETAINED = 1000;
const RETENTION_TTL_MS = 60000;

class RetentionCache {
  constructor(options = {}) {
    this.max = options.max || MAX_RETAINED;
    this.ttlMs = options.ttlMs || RETENTION_TTL_MS;
    this.store = new Map();
  }

  set(topic, value) {
    this.store.set(topic, { value, ts: Date.now() });
    while (this.store.size > this.max) {
      const oldest = this.store.keys().next().value;
      this.store.delete(oldest);
    }
  }

  get(topic) {
    const entry = this.store.get(topic);
    if (!entry) return undefined;
    if (Date.now() - entry.ts > this.ttlMs) {
      this.store.delete(topic);
      return undefined;
    }
    return entry.value;
  }
}

module.exports = { RetentionCache, MAX_RETAINED, RETENTION_TTL_MS };
