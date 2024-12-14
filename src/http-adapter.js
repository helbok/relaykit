'use strict';

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const HEALTH_CHECK_TIMEOUT_MS = 3000;

class HttpAdapter {
  constructor(options = {}) {
    this.relay = options.relay;
    this.app = express();
    this.app.use(helmet());
    this.app.use(compression());
    this.app.get('/health', this.healthHandler.bind(this));
    this.app.get('/metrics', this.metricsHandler.bind(this));
    this.app.use((req, res) => res.status(404).json({ error: 'not found' }));
  }

  healthHandler(req, res) {
    res.json({ status: 'ok', uptime: process.uptime() });
  }

  metricsHandler(req, res) {
    res.json(this.relay.metrics.snapshot());
  }

  listen(port) {
    return this.app.listen(port);
  }
}

module.exports = { HttpAdapter, HEALTH_CHECK_TIMEOUT_MS };
