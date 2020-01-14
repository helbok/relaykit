# relaykit

A lightweight WebSocket event-relay library for Node.js.

relaykit broadcasts messages to topic subscribers over WebSockets with
pluggable auth, rate limiting, backpressure and observability.

## Features

- Topic-based pub/sub over a single WebSocket connection
- Pluggable transport (WebSocket server, in-memory for tests)
- JWT authentication, per-connection rate limiting, exponential backoff
- Message batching, gzip compression and last-value retention
- Redis pub/sub adapter for horizontal scaling
- Optional HTTP adapter (Express) with health and metrics endpoints

## Installation

```bash
npm install relaykit
```

## Usage

```js
const { createRelay } = require('relaykit');

const relay = createRelay({ port: 8080, requireAuth: false });
relay.start();
```

## Configuration

See [docs/api.md](docs/api.md) for the full option reference.

## Architecture

See [docs/architecture.md](docs/architecture.md).

## License

MIT — see [LICENSE](LICENSE).

## About this project

This repository is a **synthetic educational example**: the project and its
commit history are fictional, generated to illustrate realistic software
engineering workflows. See [HISTORY.md](HISTORY.md) for the simulated timeline.
