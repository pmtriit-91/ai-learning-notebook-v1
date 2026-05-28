# V7 Final Manifest — IDE-Native OS Ready

## Active Version
V7 IDE-Native OS Ready

## What Changed From V6.1

- Added wrapper-ready `_ide/ide-policy.json`.
- Added `_tools/v7_preflight.py` for explicit file-plan validation.
- Reduced LLM self-monitoring by externalizing runtime policy.
- Preserved V6.1 clean-final architecture and memory safety.
- Kept AgentMemory outside orchestration core.
- Kept optional skills off by default.
- Kept Vercel skills and vendor optional skills unchanged.

## What V7 Does NOT Claim

V7 does not claim true hard interception unless an external IDE/CLI wrapper uses `_ide/ide-policy.json`.

## Remaining Risk

Soft enforcement remains when no IDE wrapper is active.
