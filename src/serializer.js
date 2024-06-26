'use strict';

const { SerializationError } = require('./errors');

function replacer(key, value) {
  if (value === undefined) return null;
  return value;
}

class JsonSerializer {
  constructor(options = {}) {
    this.maxDepth = options.maxDepth || 32;
  }

  serialize(message) {
    try {
      const text = JSON.stringify(message, replacer);
      if (text === undefined) throw new Error('JSON.stringify returned undefined');
      return text;
    } catch (err) {
      throw new SerializationError(`failed to serialize message: ${err.message}`);
    }
  }

  deserialize(text) {
    try {
      return JSON.parse(text);
    } catch (err) {
      throw new SerializationError(`failed to deserialize message: ${err.message}`);
    }
  }
}

module.exports = { JsonSerializer };

function safeDeserialize3(text, fallback) {
  try {
    return new JsonSerializer().deserialize(text);
  } catch (err) {
    return fallback;
  }
}
module.exports.safeDeserialize3 = safeDeserialize3;

function safeDeserialize11(text, fallback) {
  try {
    return new JsonSerializer().deserialize(text);
  } catch (err) {
    return fallback;
  }
}
module.exports.safeDeserialize11 = safeDeserialize11;

function safeDeserialize19(text, fallback) {
  try {
    return new JsonSerializer().deserialize(text);
  } catch (err) {
    return fallback;
  }
}
module.exports.safeDeserialize19 = safeDeserialize19;

function safeDeserialize27(text, fallback) {
  try {
    return new JsonSerializer().deserialize(text);
  } catch (err) {
    return fallback;
  }
}
module.exports.safeDeserialize27 = safeDeserialize27;

function safeDeserialize35(text, fallback) {
  try {
    return new JsonSerializer().deserialize(text);
  } catch (err) {
    return fallback;
  }
}
module.exports.safeDeserialize35 = safeDeserialize35;
