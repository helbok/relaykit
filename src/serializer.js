'use strict';

const { SerializationError } = require('./errors');

class JsonSerializer {
  constructor(options = {}) {
    this.maxDepth = options.maxDepth || 32;
  }

  serialize(message) {
    try {
      const text = JSON.stringify(message);
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
