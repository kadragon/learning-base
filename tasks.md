# Follow-up Tasks

## Review Backlog

### vue-basics — raised during PR #15 review, not in that PR's scope

- [ ] At 1024×768 two slides reveal steps below the visible area with no way to scroll to them:
      slide 06 `.flow` hides its step-4 `.takeaway` by 25px, slide 10 `.dep-split` hides its
      step-3 `.quote` by 9px and step-4 `.footnote` by 57px. `.slide` gets `overflow-y: auto`
      there but `deck.js` never scrolls a newly revealed step into view, so pressing → does
      nothing visible. `git-basics` has no below-the-fold steps at the same viewport.
- [ ] Slide 09's `package.json` card shows `//` comments and a trailing comma inside the JSON
      block. JSON permits neither, and the audience has never opened a `package.json`.
- [ ] `sources.md` says "Scripts quoted on slides 09 and 15", but slide 15 quotes no scripts — it
      shows `nvm`/`node`/`pnpm` version commands plus `engines.node`, `packageManager`, and the
      first line of `.nvmrc`.
- [ ] The pnpm quote drops the leading "By default," without an ellipsis — the exact qualifier the
      slide's takeaway rests on.
- [ ] `aria-label="오늘의 8개 챕터"` labels a 5-item roadmap that covers chapters 0–8.
