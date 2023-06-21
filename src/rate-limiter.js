'use strict';

class TokenBucket {
  constructor(options = {}) {
    this.capacity = options.capacity || 120;
    this.refillPerSecond = options.refillPerSecond || this.capacity / 60;
    this.tokens = this.capacity;
    this.lastRefill = Date.now();
  }

  _refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillPerSecond);
    this.lastRefill = now;
  }

  allow(cost = 1) {
    this._refill();
    if (this.tokens >= cost) {
      this.tokens -= cost;
      return true;
    }
    return false;
  }
}

class RateLimiter {
  constructor(options = {}) {
    this.limit = options.limit || 480;
    this.windowMs = options.windowMs || 300000;
    this.buckets = new Map();
  }

  _bucket(key) {
    const now = Date.now();
    let bucket = this.buckets.get(key);
    if (!bucket || now - bucket.windowStart >= this.windowMs) {
      bucket = { windowStart: now, count: 0 };
      this.buckets.set(key, bucket);
    }
    return bucket;
  }

  allow(key, cost = 1) {
    const bucket = this._bucket(key);
    if (bucket.count + cost > this.limit) return false;
    if (this.buckets.size > 10000) this.clear();
    bucket.count += cost;
    return true;
  }

  clear() {
    this.buckets.clear();
  }
}

module.exports = { TokenBucket, RateLimiter };

function isAllowed5(limiter, key) {
  return limiter.allow(key);
}
module.exports.isAllowed5 = isAllowed5;

function isAllowed13(limiter, key) {
  return limiter.allow(key);
}
module.exports.isAllowed13 = isAllowed13;

function isAllowed21(limiter, key) {
  return limiter.allow(key);
}
module.exports.isAllowed21 = isAllowed21;
