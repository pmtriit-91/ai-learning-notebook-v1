# AGENTS.md — V7 IDE-Native OS Ready

## Language
Trả lời user bằng tiếng Việt. Dùng tiếng Anh cho code, API, file, biến và config.

## Boot Sequence

1. Read `core/bootstrap.md`.
2. Read `core/runtime-state.md`.
3. If available, use `_ide/ide-policy.json` as external policy reference.
4. Load only task-relevant project files and skills.

## Prime Directive

Preserve intelligence. Reduce orchestration overhead.

Token optimization must come from:
- removing irrelevant context,
- avoiding duplicate orchestration,
- avoiding unnecessary optional skills,
- delegating checks to tools when available.

Token optimization must never come from:
- shallow reasoning,
- skipped source verification,
- skipped dependency awareness,
- skipped security/business risk awareness,
- reduced creative judgment when creative quality is requested.

## Authority Order

1. Current user instruction
2. Current source code
3. Compiler/runtime output
4. `core/runtime-kernel.md`
5. `core/runtime-state.md`
6. Project local memory
7. External memory, only when user requests or continuity trigger exists

## External Memory

AgentMemory remains user-controlled external memory.
Do not auto-recall external memory unless the user asks or the task has a clear continuity trigger.


## Design Intelligence

For UI/UX work, detect and preserve the project's intended design identity.
Do not force any specific style, UI library, aesthetic, or visual trend.
Use `creative/design-intent-runtime.md` only when the task has a design/UX/styling component.
