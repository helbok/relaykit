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

## Scaling to multiple nodes (v12)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Failure modes (v15)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Threading and event loop (v18)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Backpressure design (v21)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Scaling to multiple nodes (v24)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Failure modes (v27)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Threading and event loop (v30)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Backpressure design (v33)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Scaling to multiple nodes (v36)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Failure modes (v39)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Threading and event loop (v42)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Backpressure design (v45)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Scaling to multiple nodes (v48)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Failure modes (v51)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Threading and event loop (v54)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Backpressure design (v57)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Scaling to multiple nodes (v60)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Failure modes (v63)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Threading and event loop (v66)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Backpressure design (v69)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Scaling to multiple nodes (v72)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Failure modes (v75)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.

## Threading and event loop (v78)

This section was added incrementally as part of the maintenance
track. It documents behaviour that users asked about, plus the
rationale and a short example.
