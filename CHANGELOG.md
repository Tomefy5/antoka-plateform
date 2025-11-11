# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Batch document generation and scheduling (cron + queue) for high-volume use cases.
- KYC module (document–person linking, verification workflow, audit trail).
- Organization-level RBAC with fine-grained permissions and delegated administration.
- Public verification portal enhancements (deep links, localized results, printable proofs).
- i18n improvements (French/Malagasy parity across UI and templates).
- Admin dashboards: SLA, availability, error budgets, and cost telemetry.

### Changed
- Document template system: split into core clauses + jurisdiction-specific add-ons.
- Analytics pipeline: incremental loading and late-arriving events handling.

### Fixed
- Offline synchronization conflict resolution on concurrent edits edge cases.
- Intermittent QR parsing issues on low-resolution camera devices.

### Security
- Key rotation playbooks (JWT, API keys, operator keys) and secret scanning workflow.
- Stricter RLS policies and least-privilege service roles.

---

## [1.0.0] - 2025-11-11

### Added
- AI document generation compliant with Malagasy context:
  - Dual strategy with local generation (Ollama) and cloud enrichment (Gemini) with automatic fallback.
  - Compliance validation, mandatory sections, and bilingual output (French/Malagasy).
- Clause risk analysis:
  - TensorFlow.js-based detection of abusive/ambiguous/illegal clauses with confidence scoring.
  - Actionable suggestions and before/after diffs for safer contracts.
- Electronic signatures with blockchain-backed proof:
  - Hashing and timestamping on Hedera Testnet, immutable audit evidence, and future verification.
  - Public verification via QR code or link with authenticity result and metadata.
- Real-time collaboration:
  - Multi-user editing via Google Docs API, presence indicators, history and notifications.
- Progressive Web App:
  - Full offline mode (IndexedDB), action queue with retry/backoff, auto-sync on reconnection.
- Dashboard and analytics:
  - Contract status tracking (draft, in review, signed, archived) and metrics via DuckDB.
- API Gateway:
  - Single entrypoint (routing, rate limiting, CORS, logging, error handling) and health/metrics endpoints.
- Identity and data:
  - Supabase Auth with MFA, RLS policies per table, migrations and audit logs.
- Observability and quality:
  - Prometheus metrics and alerts; SonarQube code quality gates.
- Resilience:
  - Degraded modes, exponential backoff, transaction queues for temporary outages.
- Infrastructure:
  - Docker/Compose orchestration, environment templates, bootstrap and health-check scripts.
- Documentation and governance:
  - README, CONTRIBUTING (Conventional Commits & PR process), CODE_OF_CONDUCT, SECURITY policy.

### Changed
- N/A (initial stable release)

### Fixed
- N/A (initial stable release)

### Security
- Baseline controls (TLS, JWT short-lived tokens, encrypted storage, minimal PII in logs).
- Immutable on-chain proofs with off-chain encrypted documents.

### Deprecated
- None

### Removed
- None

---

## Release Management

- Follow Semantic Versioning:
  - MAJOR: breaking changes
  - MINOR: new features (backward compatible)
  - PATCH: bug/security fixes (backward compatible)
- Workflow:
  1) Move items from [Unreleased] into a new version section.
  2) Update dates in YYYY-MM-DD format.
  3) Tag the release in Git with `vX.Y.Z`.
  4) Regenerate changelog if automated tooling is used (e.g., Conventional Commits).

---

## Links

[Unreleased]: https://github.com/your-org/antoka/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/your-org/antoka/releases/tag/v1.0.0
