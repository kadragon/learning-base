# Architecture

## Stack

The initial baseline is browser-native HTML, CSS, and JavaScript with no package or build dependency. This is a deliberate low-complexity default for portable presentation files, not a permanent framework ban.

## Source Layout

```text
assets/
  fonts/
    fonts.css        # Shared @font-face registry
    <family>/
      <version>/     # Versioned WOFF2 files and license
presentations/
  <slug>/
    index.html       # Presentation entry point
    sources.md       # Claims, references, and further reading
    assets/          # Deck-specific styles, scripts, images, and data
docs/                # Repository knowledge and workflows
tools/               # Validation and maintenance scripts
```

## Boundaries

- A deck owns everything below `presentations/<slug>/`.
- Versioned fonts below `assets/fonts/` are shared across decks and keep their licenses beside the
  binaries.
- A deck must work without network access after checkout.
- Shared runtime code is introduced only after two decks demonstrate identical needs; until then, keep code local to each deck.
- Decks reference shared assets with relative paths so both user-site and project-site GitHub Pages
  deployments work without a fixed base URL.
- Generated output, if introduced later, belongs outside source directories and must be ignored.

## Change Rule

Introducing a framework, package manager, shared runtime, or build step changes this architecture. Update this file, `docs/runbook.md`, and `tools/validate-presentations.sh` in the same change.
