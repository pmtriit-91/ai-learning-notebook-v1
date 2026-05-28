# Context Refresh Protocol — V7

When starting a new session or large task:

1. Read root `AGENTS.md`.
2. Read `core/bootstrap.md`.
3. Read `core/runtime-state.md`.
4. Read project-specific memory if relevant.
5. Read directly related source files.
6. Inspect nearest dependency layer.
7. Execute.

## External Memory

Use external AgentMemory only when:
- user explicitly asks,
- task continues prior work,
- current project memory is insufficient,
- or there is a clear continuity trigger.

External memory must be verified against current source code.
