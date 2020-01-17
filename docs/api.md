# API reference

## createRelay(options)

Creates and returns a `Relay` instance. Accepts the same options as the
configuration module (see below).

## Configuration options

| Option | Default | Description |
| --- | --- | --- |
| `port` | `8080` | TCP port for the WebSocket server |
| `host` | `0.0.0.0` | Bind address |
| `path` | `/relay` | WebSocket path |
| `heartbeatIntervalMs` | `30000` | Heartbeat interval |
| `maxPayloadBytes` | `1048576` | Maximum frame size |
| `requireAuth` | `false` | Require a JWT on connect |

## Message envelope

```js
{ id, type, topic, payload, ts, meta }
```
