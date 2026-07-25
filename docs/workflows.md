# Workflows

## Create or Change a Deck

1. Branch from the current default branch.
2. Write one-sentence exit criterion before implementation.
3. Read the target deck, its `sources.md`, and `docs/conventions.md`.
4. Check `docs/delegation.md`; work inline unless an objective trigger fires.
5. Define concrete acceptance criteria: content outcome, interaction, viewport, and evidence.
6. Reuse an existing deck pattern; use platform-native browser features before adding dependencies.
7. Run `bash tools/validate-presentations.sh`.
8. Open the deck in a real browser; verify keyboard navigation, layout, overflow, and console errors.
9. For a high-impact completeness claim, obtain independent evaluation when delegation is allowed; otherwise disclose that verification was self-performed.

## Draft Documentation

Ground every repository claim in current files or command output. Documentation changes do not silently change presentation behavior; record missing behavior in `backlog.md`.

## Explore

State question, inspect or prototype, report evidence and tradeoffs, and do not commit. Unknown values remain `[unknown]`.

## Sweep

Run `bash tools/sweep.sh` between substantial deck changes. Fix mechanical drift; queue judgment-heavy work in `backlog.md`.

## Long-Task Handoff

Handoffs are session-scoped scratchpad files named `handoff-<feature>.md`. Include Objective, Completed Phases, Current Phase, Open Questions, External State, and Next Agent Contract with Objective / Output format / Tools to use / Boundaries. They are ephemeral and do not provide cross-session resume.

## Context Anxiety

Models can cut corners as context fills. For long tasks, write a structured scratchpad handoff while context is still reliable and reset context between phases. Do not replace unfinished work with a summary or stub implementation.
