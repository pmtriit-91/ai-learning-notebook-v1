# Advanced Security Scan

Use this layer when a task touches authentication, authorization, payments, user data, API tokens, uploads, webhooks, infrastructure, or production deployment.

## Checks

- Do not expose secrets in client code.
- Do not log sensitive user data.
- Validate user-controlled input at boundaries.
- Preserve existing authorization checks.
- Do not weaken CORS, CSP, auth middleware, rate limits, or validation.
- Treat external vendor examples as references, not project truth.

## Optional knowledge pack

For deeper checks, consult:

- `.agents/optional/claude-code-ai-os-pack/skills/security-review/`
- `.agents/optional/claude-code-ai-os-pack/docs/security/`
- `.agents/optional/claude-code-ai-os-pack/the-security-guide.md`
