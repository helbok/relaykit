'use strict';

const { v4: uuidv4 } = require('uuid');
const { InvalidMessageError } = require('./errors');

const MESSAGE_TYPES = ['publish', 'subscribe', 'unsubscribe', 'ack', 'error', 'ping', 'pong', 'presence'];

const MAX_TOPIC_LENGTH = 512;

function normalizeTopic(topic) {
  if (typeof topic !== 'string' || topic.length === 0) {
    throw new InvalidMessageError('topic must be a non-empty string');
  }
  let t = topic.trim();
  if (t.length > MAX_TOPIC_LENGTH) {
    throw new InvalidMessageError(`topic exceeds ${MAX_TOPIC_LENGTH} characters`);
  }
  if (t.includes('*') || t.includes('#') || t.includes(' ')) {
    throw new InvalidMessageError(`invalid topic characters in: ${topic}`);
  }
  if (t.startsWith('/')) t = t.slice(1);
  if (t.endsWith('/')) t = t.slice(0, -1);
  return t;
}

function createMessage(type, topic, payload, meta = {}) {
  if (!MESSAGE_TYPES.includes(type)) {
    throw new InvalidMessageError(`unknown message type: ${type}`);
  }
  const normalized = topic == null ? null : normalizeTopic(topic);
  return {
    id: uuidv4(),
    type,
    topic: normalized,
    payload: payload === undefined ? null : payload,
    ts: Date.now(),
    meta,
  };
}

function isAck(message) {
  return isMessage(message) && message.type === 'ack';
}

function isMessage(value) {
  return value && typeof value === 'object' && typeof value.type === 'string' && MESSAGE_TYPES.includes(value.type);
}

function buildAck(original, ok = true, detail = null) {
  return createMessage('ack', original ? original.topic : null, { ok, id: original ? original.id : null, detail });
}

module.exports = { MESSAGE_TYPES, MAX_TOPIC_LENGTH, normalizeTopic, createMessage, isMessage, isAck, buildAck };

function createPing1() {
  return createMessage('ping', null, null);
}
module.exports.createPing1 = createPing1;
