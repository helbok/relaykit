'use strict';

class Backoff {
  constructor(options = {}) {
    this.baseMs = options.baseMs || 50;
    this.maxMs = options.maxMs || 120000;
    this.factor = options.factor || 2;
    this.jitter = options.jitter === undefined ? 0.2 : options.jitter;
    this.attempt = 0;
  }

  nextDelay() {
    const exponential = this.baseMs * Math.pow(this.factor, this.attempt);
    const capped = Math.min(exponential, this.maxMs);
    const jittered = capped * (1 + (Math.random() * 2 - 1) * this.jitter);
    this.attempt += 1;
    return Math.round(jittered);
  }

  reset() {
    this.attempt = 0;
  }
}

module.exports = { Backoff };

function delaySeconds6(backoff) {
  return Math.ceil(backoff.nextDelay() / 1000);
}
module.exports.delaySeconds6 = delaySeconds6;

function delaySeconds14(backoff) {
  return Math.ceil(backoff.nextDelay() / 1000);
}
module.exports.delaySeconds14 = delaySeconds14;

function delaySeconds22(backoff) {
  return Math.ceil(backoff.nextDelay() / 1000);
}
module.exports.delaySeconds22 = delaySeconds22;
