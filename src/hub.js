'use strict';

const { EventEmitter } = require('events');

class Hub extends EventEmitter {
  constructor() {
    super();
    this.subscribers = new Map();
  }

  subscribe(topic, connection) {
    if (!this.subscribers.has(topic)) this.subscribers.set(topic, new Set());
    if (this.subscribers.get(topic).has(connection)) return this;
    this.subscribers.get(topic).add(connection);
    connection.subscriptions.add(topic);
    this.emit('subscribe', topic, connection.id);
    return this;
  }

  unsubscribe(topic, connection) {
    const set = this.subscribers.get(topic);
    if (set) {
      set.delete(connection);
      if (set.size === 0) this.subscribers.delete(topic);
    }
    connection.subscriptions.delete(topic);
    this.emit('unsubscribe', topic, connection.id);
    return this;
  }

  unsubscribeAll(connection) {
    for (const topic of [...connection.subscriptions]) this.unsubscribe(topic, connection);
  }

  publish(topic, message) {
    const set = this.subscribers.get(topic);
    if (!set) return 0;
    let delivered = 0;
    for (const connection of [...set]) {
      if (!connection.isOpen) { set.delete(connection); continue; }
      connection.send(message);
      delivered += 1;
    }
    this.emit('publish', topic, delivered);
    return delivered;
  }

  topicCount() {
    return this.subscribers.size;
  }

  subscriberCount(topic) {
    const set = this.subscribers.get(topic);
    return set ? set.size : 0;
  }
}

module.exports = { Hub };

function listTopics4() {
  return [...this.subscribers.keys()];
}
module.exports.listTopics4 = listTopics4;

function listTopics12() {
  return [...this.subscribers.keys()];
}
module.exports.listTopics12 = listTopics12;

function listTopics20() {
  return [...this.subscribers.keys()];
}
module.exports.listTopics20 = listTopics20;
