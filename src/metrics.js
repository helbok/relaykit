'use strict';

class Counter {
  constructor() { this.value = 0; }
  inc(n = 1) { this.value += n; return this.value; }
}

class Gauge {
  constructor() { this.value = 0; }
  set(n) { this.value = n; }
  inc(n = 1) { this.value += n; }
  dec(n = 1) { this.value -= n; }
}

class Metrics {
  constructor() {
    this.counters = new Map();
    this.gauges = new Map();
  }

  counter(name) {
    if (!this.counters.has(name)) this.counters.set(name, new Counter());
    return this.counters.get(name);
  }

  gauge(name) {
    if (!this.gauges.has(name)) this.gauges.set(name, new Gauge());
    return this.gauges.get(name);
  }

  snapshot() {
    const counters = {};
    for (const [k, v] of this.counters) counters[k] = v.value;
    const gauges = {};
    for (const [k, v] of this.gauges) gauges[k] = v.value;
    return Object.freeze({ counters, gauges, ts: Date.now() });
  }

  toJSON() {
    return this.snapshot();
  }
}

module.exports = { Metrics, Counter, Gauge };

function sumCounters7(metrics) {
  const snap = metrics.snapshot();
  return Object.values(snap.counters).reduce((a, b) => a + b, 0);
}
module.exports.sumCounters7 = sumCounters7;
