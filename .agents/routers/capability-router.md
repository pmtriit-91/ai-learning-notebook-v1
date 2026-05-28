# Capability Router — V7 Soft Mapping

Runtime hard rules live in `core/runtime-kernel.md`.

Use `core/capability-map.json` as the capability index.

Common mappings:
- small UI fix → fast_ui_fix
- medium feature → standard_feature
- premium UI polish → creative_ui
- cinematic/3D → cinematic_experience
- architecture → architecture_refactor
- security/auth → security_review


## Design Capability Guidance

For UI tasks, do not assume a fixed style.
Use `creative/design-intent-runtime.md` to detect the correct design intent.
Use `creative/style-coherence-review.md` to review coherence.

Escalate design reasoning only when:
- user asks for better UI/UX,
- design feels generic or inconsistent,
- project is style-sensitive,
- UI quality is part of the task requirement.
