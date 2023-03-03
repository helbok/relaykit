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

## Sending and receiving (v1)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Error codes (v4)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Middleware hooks (v7)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Serializer options (v10)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Sending and receiving (v13)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Error codes (v16)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Middleware hooks (v19)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Serializer options (v22)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Sending and receiving (v25)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Error codes (v28)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Middleware hooks (v31)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Serializer options (v34)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Sending and receiving (v37)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Error codes (v40)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Middleware hooks (v43)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Serializer options (v46)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Sending and receiving (v49)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.
