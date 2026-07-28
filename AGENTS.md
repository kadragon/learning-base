# Learning Base Agent Rules

Repository for Korean HTML presentations that explain developer knowledge to department members.

## Docs Index (read on demand)

| File | When to read |
|------|--------------|
| `docs/architecture.md` | Before adding a deck or changing repository structure |
| `docs/conventions.md` | Before writing slide HTML, CSS, JavaScript, or teaching content |
| `docs/workflows.md` | When starting a presentation change |
| `docs/delegation.md` | Before delegating or requesting independent evaluation |
| `docs/eval-criteria.md` | Before reviewing a completed deck |
| `docs/runbook.md` | For validation, preview, and troubleshooting commands |
| `docs/harness-log.md` | When changing harness roles or skills |
| `docs/git-lecture-plan.md` | Before changing the `git-basics` deck's teaching content |
| `docs/vue-lecture-plan.md` | Before changing the `vue-basics` deck's teaching content |

## Golden Principles

1. **Every deck is self-contained** — no remote runtime scripts, stylesheets, fonts, or images. Enforced by `tools/validate-presentations.sh`.
2. **Every deck is evidence-backed** — `presentations/<slug>/sources.md` is required. Enforced by `tools/validate-presentations.sh`.
3. **Every deck has operable slide semantics** — `index.html` requires a language, `<main>`, `[data-slide]`, and keyboard handling. Enforced by `tools/validate-presentations.sh`.
4. **Fabrication ban** — If a value was not read from a file, command output, or tool result this session, write `[unknown — read {source} to verify]`; never state it as fact.

## Delegation

Default inline. Delegate only when user requests it, a loaded skill requires it, or work has ≥10 files to inspect, ≥3 independent units, or output would flood main context. Full objective routing and Spawn Prompt Contract: `docs/delegation.md`.

| Trigger (objective) | Delegate | Mode |
|---|---|---|
| User requests parallel/delegated presentation review | Presentation evaluator (opus) | sub-agent |
| Review requires ≥10 files or ≥3 independent review units | Presentation evaluator (opus) | sub-agent |
| Otherwise | Nobody | inline |

## Token Economy

Rules that apply every message — keep the context window lean.

1. Do not re-read a file already read in this session. If you need to check a change, read only the diff/region.
2. Do not call tools just to confirm information you already have. Simple questions deserve direct answers.
3. Run independent tool calls in parallel (multiple reads, grep + glob, etc.) — not sequentially.
4. Delegate any analysis that would produce >20 lines of output to a sub-agent; return only the conclusion to this context.
5. Do not restate what the user just said. They can read their own message.

## Working with Existing Code

| | |
|---|---|
| ✅ | Reuse an existing deck's structure before introducing a new pattern |
| ⚠️ | Add dependencies only with a concrete requirement and update architecture, runbook, and validator together |
| 🚫 | Invent technical facts, leave placeholder claims, or load presentation assets from the network |

## Language Policy

- User-facing narration and slide copy: Korean
- Code, commits, comments, and repository docs: English

## Maintenance

Update this file **only** when ALL of the following are true:

1. Information is not directly discoverable from code / config / manifests / docs
2. It is operationally significant — affects build, test, deploy, or runtime safety
3. It would likely cause mistakes if left undocumented
4. It is stable and not task-specific

**Never add:** architecture summaries, directory overviews, style conventions
already enforced by tooling, anything already visible in the repo, or
temporary / task-specific instructions.

Prefer modifying or removing outdated entries over appending. When unsure, add
a short inline `TODO:` comment rather than inventing guidance.

Size budget: target ≤100 lines, hard warn >200. Move long content to
`docs/*.md` (read on demand, cross-tool) and leave a pointer line here. On a
Claude-Code-only repo you may instead use `.claude/rules/*.md` (path-scoped,
auto-loads when the matching area is touched); on a multi-tool repo keep the
content in `docs/` so Codex/Cursor see it too.

**Memory boundary:** durable code/repo facts live here, in `.claude/rules/`, and
`docs/` — human-authored and version-controlled. Claude Code's auto-memory
(`MEMORY.md`) holds the model's discovered preferences and cross-session
learnings only; never promote a code fact into auto-memory, and don't hand-edit
`MEMORY.md`.
