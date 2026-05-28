# V7 IDE-Native OS Ready

This folder is a wrapper-ready specification, not a required runtime dependency.

V7 still works as normal markdown-driven agent skills.

Future IDE/CLI wrappers can use:

- `_ide/ide-policy.json`
- `core/capability-map.json`
- `_tools/v7_preflight.py`
- `_tools/agent_mode_check.py`
- `_tools/telemetry_collector.py`

to enforce mode limits, path blocks, optional skill loading, and telemetry outside the LLM context.

Do not load this folder for normal FAST tasks.
