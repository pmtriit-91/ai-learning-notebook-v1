# Runtime State — V7

This file externalizes operating state to reduce agent self-monitoring cost.

## Default

```txt
Version: V7
Architecture: IDE-Native OS Ready
Current Mode: UNSELECTED
Optional Skills: OFF
Deep Review: OFF
Creative Full Pipeline: OFF
Telemetry: TOOL-ASSISTED
Hard Interception: NOT AVAILABLE unless IDE wrapper exists
```

## FAST

```txt
Mode: FAST
Max Files: 6
Optional Skills: OFF
Reviewer: lite only
Telemetry: optional
Use Case: small UI/text/CSS/import/build fixes
```

## STANDARD

```txt
Mode: STANDARD
Max Files: 14
Optional Skills: OFF by default
Reviewer: targeted/lite
Telemetry: recommended
Use Case: medium feature/component/API/local refactor
```

## DEEP

```txt
Mode: DEEP
Max Files: 40
Optional Skills: whitelist only
Reviewer: deep/targeted
Telemetry: required when possible
Use Case: architecture/security/business-critical/3D/cinematic/repeated failure
```

## Wrapper State

If IDE wrapper exists:

```txt
Mode selection: externalized
File limits: enforced outside LLM
Optional loading: tool-mediated
Telemetry: automatic
Agent orchestration overhead: minimized
```

If wrapper does not exist:

```txt
Mode selection: agent-guided
File limits: soft enforced
Telemetry: agent-triggered
```
