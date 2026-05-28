---
name: Project Memory Manager (Universal Template)
description: Project-specific memory protocol. This skill must be reset for each new project to prevent context bleeding from previous projects.
---

# Project Memory

This project-specific memory is empty.

Before coding:

1. Inspect the current project structure.
2. Identify the framework, stack, and architecture from actual files.
3. Do not assume this project is related to any previous project.
4. Do not reuse domain logic, business flows, routes, components, or tech stack from another project unless the current project explicitly contains them.
5. Update this memory only after understanding the current project.

## Current Project

- Name: TODO
- Type: TODO
- Domain: TODO
- Status: New project / Unknown until inspected

## Context Isolation Rule

This file is project-specific memory, not a universal skill library.

When copying `.agents` into a new project:
- reset this file,
- remove all domain details from previous projects,
- write only facts verified from the current project files or explicitly provided by the user.
- External AgentMemory or previous-session memory must not override this file unless verified against current project files.

## Memory Update Format

After a successful task, update this file using concise notes:

```md
## YYYY-MM-DD - Memory Update

Context:
Decision / Finding:
Impact:
Related files:
```

## Do Not Store

- Temporary debugging logs.
- Unverified guesses.
- Business/domain details from another project.
- Personal or sensitive data not required for engineering work.
