# Performance tuning

- Raise `maxPayloadBytes` only if you really send large frames
- Tighten `heartbeatIntervalMs` for faster dead-peer detection
- Use the batch module under high fan-out
- Prefer the Redis adapter for multi-node deployments
