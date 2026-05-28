# Runtime Kernel — V7

V7 is IDE-Native OS Ready, but still works without an IDE wrapper.

## Single Source of Truth

Runtime hard rules live here.

If conflict occurs:

```txt
runtime-kernel.md
→ runtime-state.md
→ capability-map.json
→ bootstrap.md
→ routers/*.md
→ memory/*.md
```

## Core Goal

Reduce orchestration cognition overhead without reducing AI intelligence.

## Hard Rules

### 1. Intelligence Preservation

Never reduce:
- reasoning depth required by the task,
- source-code verification,
- dependency awareness,
- creative quality when requested,
- security/business/API risk analysis.

### 2. Context Economy

Allowed:
- skip irrelevant files,
- skip historical docs,
- skip optional skills by default,
- skip full reviewers in FAST mode,
- use external tools for validation.

Forbidden:
- under-load dependencies,
- ignore compiler/runtime output,
- ignore current user instruction,
- trust stale memory over current source code.

### 3. Dependency Safety

Before editing:
- inspect direct imports,
- inspect direct consumers when easily discoverable,
- inspect related types/contracts,
- inspect schema/API boundary if touched.

### 4. Optional Skill Control

Optional skills are OFF by default.

Optional skills can be loaded only when:
- capability-map allows them,
- user explicitly asks,
- or DEEP escalation proves need.

Optional skills cannot auto-load additional optional skills.

### 5. Memory Safety

Memory is supportive, not authoritative.

Source code and runtime output override memory.
Current user instruction overrides all memory.
External AgentMemory is user-controlled and must be verified.

### 6. IDE-Native Enforcement Readiness

When wrapper tools exist, the agent should delegate:

- mode validation → `_tools/agent_mode_check.py`
- telemetry → `_tools/telemetry_collector.py`
- optional skill fetch → `_tools/optional_skill_fetcher.py`
- preflight checks → `_tools/v7_preflight.py`

The agent should not spend reasoning budget manually rechecking what tools can check.

### 7. Soft Enforcement Limitation

Without IDE wrapper or CLI orchestration, enforcement remains soft.
Do not pretend hard interception exists.



## Universal Design Intelligence

Design intelligence must be adaptive, not stylistically prescriptive.

The agent must:
- detect the project's intended design identity before changing UI,
- preserve existing visual language unless the user requests a change,
- avoid forcing cinematic, luxury, corporate, playful, minimal, brutalist, SaaS, or any other fixed aesthetic by default,
- treat UI libraries as implementation tools, not visual identity,
- balance maintainability with appropriate expressive quality.

If the user requests a specific style, that style becomes local task intent, not a universal system default.
