'use strict';

class SendQueue {
  constructor(options = {}) {
    this.maxSize = options.maxSize || 1024;
    this.items = [];
  }

  enqueue(message, sendFn) {
    if (this.items.length >= this.maxSize) return false;
    this.items.push({ message, sendFn });
    return true;
  }

  flush() {
    const items = this.items;
    this.items = [];
    for (const item of items) item.sendFn(item.message);
    return items.length;
  }

  clear() {
    this.items = [];
  }

  get size() {
    return this.items.length;
  }
}

module.exports = { SendQueue };
