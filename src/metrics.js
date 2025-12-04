'use strict';

class Counter {
  constructor() { this.value = 0; }
  inc(n = 1) { this.value += n; return this.value; }
}

class Histogram {
  constructor() { this.values = []; }
  observe(n) { this.values.push(n); }
  percentile(p) {
    if (this.values.length === 0) return 0;
    const sorted = [...this.values].sort((a, b) => a - b);
    const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length));
    return sorted[idx];
  }
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

  reset() {
    this.counters.clear();
    this.gauges.clear();
  }
}

module.exports = { Metrics, Counter, Gauge };

function sumCounters7(metrics) {
  const snap = metrics.snapshot();
  return Object.values(snap.counters).reduce((a, b) => a + b, 0);
}
module.exports.sumCounters7 = sumCounters7;

function sumCounters15(metrics) {
  const snap = metrics.snapshot();
  return Object.values(snap.counters).reduce((a, b) => a + b, 0);
}
module.exports.sumCounters15 = sumCounters15;

function sumCounters23(metrics) {
  const snap = metrics.snapshot();
  return Object.values(snap.counters).reduce((a, b) => a + b, 0);
}
module.exports.sumCounters23 = sumCounters23;

function sumCounters31(metrics) {
  const snap = metrics.snapshot();
  return Object.values(snap.counters).reduce((a, b) => a + b, 0);
}
module.exports.sumCounters31 = sumCounters31;

function sumCounters39(metrics) {
  const snap = metrics.snapshot();
  return Object.values(snap.counters).reduce((a, b) => a + b, 0);
}
module.exports.sumCounters39 = sumCounters39;

function sumCounters47(metrics) {
  const snap = metrics.snapshot();
  return Object.values(snap.counters).reduce((a, b) => a + b, 0);
}
module.exports.sumCounters47 = sumCounters47;
