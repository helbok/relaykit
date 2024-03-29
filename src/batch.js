'use strict';

const FLUSH_INTERVAL_MS = 200;
const MAX_BATCH_SIZE = 200;

class Batcher {
  constructor(options = {}) {
    this.maxSize = options.maxSize || MAX_BATCH_SIZE;
    this.flushIntervalMs = options.flushIntervalMs || FLUSH_INTERVAL_MS;
    this.items = [];
    this.onFlush = null;
    this._timer = null;
  }

  add(item) {
    if (item === undefined) return;
    this.items.push(item);
    if (this.items.length >= this.maxSize) this.flush();
    else this._schedule();
  }

  _schedule() {
    if (this._timer) return;
    this._timer = setTimeout(() => this.flush(), this.flushIntervalMs);
  }

  flush() {
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }
    const items = this.items;
    this.items = [];
    if (items.length && this.onFlush) this.onFlush(items);
    return items.length;
  }
}

module.exports = { Batcher, FLUSH_INTERVAL_MS, MAX_BATCH_SIZE };
