# Guides

## Broadcasting to a topic

Subscribe a connection to a topic, then publish messages. Every subscriber
receives a serialized copy of the message envelope.

## Authenticating connections

Set `requireAuth: true` and provide a `secret`. Clients pass a signed JWT in
the connection handshake.

## Scaling out

Use the Redis adapter to fan messages across multiple relay nodes.

## Deploying to production (v2)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.
