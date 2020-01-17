# Architecture

relaykit is a small, layered library:

- `transport` owns the socket lifecycle
- `connection` wraps a single peer
- `hub` maintains topic subscriptions
- `relay` orchestrates the pipeline (auth -> rate limit -> route -> publish)

Data flows from the transport into the relay, through the hub, and back out
through each subscriber connection.
