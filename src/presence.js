'use strict';

const PRESENCE_TTL_MS = 90000;

class Presence {
  constructor() {
    this.topics = new Map();
  }

  join(topic, memberId) {
    if (!this.topics.has(topic)) this.topics.set(topic, new Set());
    this.topics.get(topic).add(memberId);
  }

  leave(topic, memberId) {
    const set = this.topics.get(topic);
    if (set) {
      set.delete(memberId);
      if (set.size === 0) this.topics.delete(topic);
    }
  }

  count(topic) {
    const set = this.topics.get(topic);
    return set ? set.size : 0;
  }

  members(topic) {
    const set = this.topics.get(topic);
    return set ? [...set] : [];
  }

  snapshot() {
    const out = {};
    for (const [topic, set] of this.topics) out[topic] = [...set];
    return out;
  }
}

module.exports = { Presence, PRESENCE_TTL_MS };
