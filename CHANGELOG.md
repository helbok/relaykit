# Changelog

All notable changes to relaykit are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2019-09-30

### Changed
- First public release of the relay core.
- WebSocket transport, topic hub and JWT auth.

## [0.2.0] - 2020-01-22

### Changed
- Add payload/topic validation module.
- Fix serializer handling of undefined values.

## [0.3.0] - 2020-05-18

### Changed
- Add backpressure module for slow consumers.
- Hub cleanup fixes.

## [1.0.0] - 2020-10-20

### Changed
- Stable public API.
- Backpressure, validation and migration docs.
- Node 22 in CI matrix.

## [1.1.0] - 2021-02-22

### Changed
- Presence tracking per topic.

## [1.2.0] - 2021-07-01

### Changed
- Message batching support.

## [2.0.0] - 2021-11-07

### Changed
- Redis pub/sub adapter for horizontal scaling.
- Last-value retention cache.

## [2.1.0] - 2022-03-14

### Changed
- Gzip payload compression.

## [2.2.0] - 2022-07-25

### Changed
- Optional HTTP adapter with health and metrics endpoints.

## [3.0.0] - 2022-12-10

### Changed
- Modern package exports map.
- Relay uptime metric.
- Performance guide.

## [3.1.0] - 2023-05-05

### Changed
- Hub topic count.
- Histogram metric type.

## [3.2.0] - 2023-07-09

### Changed
- Consolidate metric snapshots and flush policy.

## [3.3.0] - 2023-09-22

### Changed
- Dependency refresh and doc cleanups.

## [3.4.0] - 2023-12-06

### Changed
- Final polish release before archive.

## [Unreleased]
