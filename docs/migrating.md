# Migrating from 0.x

The 0.x line exposed internal modules directly. Starting with 1.0.0 the
public API is the `createRelay` factory plus the named exports in `src/index.js`.

- `new Relay()` is still supported but `createRelay()` is preferred
- topic validation is now stricter (no wildcards)
- `serializer` now accepts a configurable depth limit
