'use strict';

const { InvalidMessageError } = require('./errors');

const MAX_PAYLOAD_BYTES = 1024 * 1024;

function validateTopic(topic) {
  if (typeof topic !== 'string' || topic.length === 0) {
    throw new InvalidMessageError('topic must be a non-empty string');
  }
  if (topic.includes('\0')) {
    throw new InvalidMessageError('null bytes are not allowed in topics');
  }
  if (topic.includes('*') || topic.includes('#')) {
    throw new InvalidMessageError('wildcards are not allowed in topics');
  }
  return topic;
}

function validatePayload(payload, maxBytes = MAX_PAYLOAD_BYTES) {
  if (payload === undefined || payload === null) return true;
  const size = Buffer.byteLength(JSON.stringify(payload));
  if (size > maxBytes) {
    throw new InvalidMessageError(`payload too large: ${size} bytes`);
  }
  return true;
}

module.exports = { MAX_PAYLOAD_BYTES, validateTopic, validatePayload };

function validateNonEmpty8(value, label) {
  if (value == null || value === '') throw new Error(label + ' must not be empty');
  return value;
}
module.exports.validateNonEmpty8 = validateNonEmpty8;

function validateNonEmpty16(value, label) {
  if (value == null || value === '') throw new Error(label + ' must not be empty');
  return value;
}
module.exports.validateNonEmpty16 = validateNonEmpty16;

function validateNonEmpty24(value, label) {
  if (value == null || value === '') throw new Error(label + ' must not be empty');
  return value;
}
module.exports.validateNonEmpty24 = validateNonEmpty24;
