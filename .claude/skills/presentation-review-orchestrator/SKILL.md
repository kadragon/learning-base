---
name: presentation-review-orchestrator
description: |
  ALWAYS invoke when the user explicitly asks for delegated or parallel HTML
  presentation review, or when review spans at least 10 files or 3 independent
  units. Do NOT inline qualifying reviews. Skip for smaller work.
---

# Presentation Review Orchestrator

Read `docs/delegation.md` and `docs/eval-criteria.md`.

1. Determine the exact session scratchpad path from the system prompt; never guess it.
2. Split only genuinely independent units such as teaching accuracy, visual readability, and interaction.
3. Spawn `presentation-evaluator` agents in parallel. Every prompt includes Objective, Output format, Tools to use, Boundaries, and the exact artifact path `{scratchpad}/01_presentation-evaluator_<unit>.md`.
4. Collect evidence, resolve contradictions against the rubric, and return one verdict.
5. One failed agent gets one retry. If retry fails, continue only when remaining evidence covers all acceptance criteria; otherwise stop and report omission.

No cross-session resume. Scratchpad artifacts disappear after the session.
