# Bootstrap — V7

V7 keeps the V6.1 clean architecture and adds IDE-native readiness.

This file is intentionally short.

## Flow

1. Read `core/runtime-kernel.md`.
2. Read `core/runtime-state.md`.
3. Classify task:
   - FAST
   - STANDARD
   - DEEP
4. Select capability from `core/capability-map.json`.
5. Load minimum required context.
6. Inspect nearest dependency layer before edit.
7. Execute.
8. Validate with available tools.
9. Escalate only when blocked with evidence.

## Zero-Overhead Direction

If an IDE wrapper / CLI orchestrator is available:
- let the wrapper classify mode,
- let the wrapper enforce file limits,
- let the wrapper fetch optional skills,
- let the wrapper write telemetry,
- do not spend chat tokens re-explaining orchestration.

If no wrapper is available:
- follow this bootstrap manually.

## FAST Optimization

For FAST tasks:
- do not read full router stack,
- do not read optional registry,
- do not activate full creative/reviewer stack,
- inspect only related files and nearest dependencies.

## Escalation

Escalate only with evidence:
- repeated unresolved failure,
- multi-module impact,
- unclear dependency graph,
- security/business/API risk,
- task requires cinematic/3D/architecture depth.
