'use strict';

const LEVELS = { debug: 10, info: 20, warn: 30, error: 40, silent: 99 };

class Logger {
  constructor(level = 'info', stream = process.stderr) {
    this.level = level;
    this.stream = stream;
  }

  _write(level, args) {
    if (LEVELS[level] < LEVELS[this.level]) return;
    const line = ['[' + level + ']', new Date().toISOString(), ...args.map(String)].join(' ');
    this.stream.write(line + '\n');
  }

  debug(...args) { this._write('debug', args); }
  info(...args) { this._write('info', args); }
  warn(...args) { this._write('warn', args); }
  error(...args) { this._write('error', args); }
}

function createLogger(options = {}) {
  if (options.backend === 'pino') {
    const pino = require('pino');
    return pino({ level: options.level || 'info', name: 'relaykit' });
  }
  return new Logger(options.level || 'info');
}

module.exports = { LEVELS, Logger, createLogger };
