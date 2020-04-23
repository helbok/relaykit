# Architecture

relaykit is a small, layered library:

- `transport` owns the socket lifecycle
- `connection` wraps a single peer
- `hub` maintains topic subscriptions
- `relay` orchestrates the pipeline (auth -> rate limit -> route -> publish)

Data flows from the transport into the relay, through the hub, and back out
through each subscriber connection.

## Failure modes (v3)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Threading and event loop (v6)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Backpressure design (v9)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.
