# Conventions

## Deck Contract

Each deck uses `presentations/<kebab-case-slug>/index.html` plus `sources.md`.

`index.html` must contain:

- A valid `lang` attribute on `<html>`.
- One `<main>` containing slide sections marked with `data-slide`.
- Keyboard handling for forward and backward navigation.
- Local asset paths only.

## Teaching Content

- State audience outcome before details: what attendees should understand or do afterward.
- One main claim per slide; move supporting detail to speaker notes or follow-up material.
- Introduce terminology before using abbreviations.
- Prefer executable examples and diagrams over dense prose.
- Distinguish verified facts, simplifications for teaching, and opinions.
- Record sources and verification notes in `sources.md`.
- Every `<pre><code>` declares its origin with `data-source`: `fixture:<path>` for text quoted from
  a file under the deck's `fixtures/`, `capture:<name>` for recorded command output named in
  `sources.md`, `uniweb:<path>` for an excerpt of that read-only checkout, or `illustration` for
  something invented to teach. Add `data-excerpt` when the block deliberately skips part of its
  file. `tools/validate-slide-evidence.py` enforces this.
- Anchor `sources.md` entries to a slide `id`, not to a slide number. Ordinals move whenever a
  slide is inserted; the checker verifies every cited `id` exists.

## Visual Design

- Preserve readable contrast and visible focus states.
- Design for a 16:9 projector viewport and verify a narrower viewport.
- Keep code samples large enough to read from the back of a room.
- Avoid decorative motion that competes with explanation; respect `prefers-reduced-motion`.

## Git

- Branch before editing; never commit directly to `main` or `master`.
- Commit format: `[TYPE] description`.
- Types: `FEAT`, `FIX`, `REFACTOR`, `TEST`, `CONSTRAINT`, `DOCS`, `HARNESS`, `PLAN`.
