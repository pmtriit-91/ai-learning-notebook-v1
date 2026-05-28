# Advanced AI OS Activation Router

Use this router when the task needs advanced agent behavior beyond the base Vercel skills.

## Priority rule

1. Project memory and current repository files are always the source of truth.
2. Existing Vercel skills remain the primary React/frontend engineering guide.
3. Claude Code AI OS pack is optional and task-scoped.
4. Never load the entire optional pack unless explicitly requested.

## Activation map

### Planning / large implementation
Load:
- `.agents/workflows/planner.md`
- `.agents/optional/claude-code-ai-os-pack/skills/agentic-engineering/`
- `.agents/optional/claude-code-ai-os-pack/skills/agentic-os/`
- `.agents/optional/claude-code-ai-os-pack/skills/context-budget/`

### Code review
Load:
- `.agents/workflows/reviewer.md`
- `.agents/reviewers/final-checklist.md`
- `.agents/optional/claude-code-ai-os-pack/skills/coding-standards/`
- `.agents/optional/claude-code-ai-os-pack/skills/review/` if present

### Security scan
Load:
- `.agents/safety/production-risk.md`
- `.agents/optional/claude-code-ai-os-pack/skills/security-review/`
- `.agents/optional/claude-code-ai-os-pack/skills/gateguard/` if present
- `.agents/optional/claude-code-ai-os-pack/docs/security/`

### Debugging / build failure
Load:
- `.agents/workflows/debugging.md`
- `.agents/optional/claude-code-ai-os-pack/skills/agent-introspection-debugging/`
- `.agents/optional/claude-code-ai-os-pack/skills/ci-failure-diagnosis/` if present
- `.agents/optional/claude-code-ai-os-pack/skills/verification-loop/`

### TDD / testing
Load:
- `.agents/optional/claude-code-ai-os-pack/skills/tdd-workflow/`
- `.agents/optional/claude-code-ai-os-pack/skills/e2e-testing/`
- `.agents/optional/claude-code-ai-os-pack/skills/ai-regression-testing/`

### Research before coding
Load:
- `.agents/optional/claude-code-ai-os-pack/skills/deep-research/`
- `.agents/optional/claude-code-ai-os-pack/skills/documentation-lookup/`

### Memory / continuous learning
Load:
- `.agents/memory/long-term-memory.md`
- `.agents/memory/context-refresh.md`
- `.agents/optional/claude-code-ai-os-pack/skills/continuous-learning/`
- `.agents/optional/claude-code-ai-os-pack/skills/continuous-learning-v2/`

## Gemini-specific constraints

- Keep loaded context small.
- Prefer short checklists over long prose.
- Do not mix unrelated specialist agents.
- At the end of a task, summarize durable lessons into project memory only if they belong to the current project.


### Creative / cinematic product experience

Before using broad Claude Code optional resources, prefer the local Creative Direction layer:

- `.agents/routers/creative-experience-activation.md`
- `.agents/creative/creative-direction.md`
- `.agents/creative/motion-grammar.md`
- `.agents/creative/interactive-product-storytelling.md`

Use Claude optional resources only as supporting references for research, frontend patterns, or review.
