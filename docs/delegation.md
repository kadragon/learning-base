# Delegation

## Default

Work inline. Delegation is allowed only when the user asks, an active skill requires it, or one of these measurable thresholds is met:

| Trigger | Target | Mode | Gate |
|---|---|---|---|
| User explicitly requests delegated or parallel presentation review | `presentation-evaluator` | sub-agent | required |
| Review needs at least 10 files | `presentation-evaluator` | sub-agent | required |
| Review has at least 3 independent units, such as content, visuals, and interaction | `presentation-evaluator` per independent unit | parallel sub-agents | required |
| Output would exceed 20 lines in main context | suitable read-only evaluator | sub-agent | required |
| None match | none | inline | proceed |

Coupled, sequential, or judgment-heavy implementation stays inline even when delegation is allowed. The evaluator never edits source.

## Spawn Prompt Contract

Every spawn includes all four fields:

- **Objective:** exact question or artifact to evaluate.
- **Output format:** verdict, table, or report shape.
- **Tools to use:** smallest useful read-only subset.
- **Boundaries:** files and actions explicitly out of scope.

Brief also includes exit criterion and relevant file paths or commands. Default effort tier is comparison: 10–15 tool calls.

## Data Transfer

- Return small findings in the agent result.
- Write large artifacts to the session scratchpad using `{phase:02d}_{agent}_{artifact}.{ext}`.
- The lead supplies the exact scratchpad path; agents never guess it.
- Scratchpad files are ephemeral and do not survive a new session.

## Applying Findings

- Mechanical defects may be fixed in the current change.
- New behavior becomes a backlog item unless already inside agreed scope.
- A finding that contradicts a user decision is reported, not silently applied.
