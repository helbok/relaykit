'use strict';

const { createRelay } = require('../src/index');

const relay = createRelay({ port: Number(process.env.PORT || 8080), requireAuth: false });
relay.start();

process.on('SIGINT', () => {
  relay.stop();
  process.exit(0);
});
