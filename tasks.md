# Follow-up Tasks

## Review Backlog

### git-basics — pre-existing, confirmed against `main` during PR #15

Each of these was measured on both `main` and the PR branch with the same sweep and found
identical, so none is a regression from the projection pass. Reproduce with the base-branch
comparison in `docs/runbook.md` → Browser Verification.

- [ ] `#clone`'s `.vscode-window` clips its own content by 30px at 1366×768 (`scrollHeight -
      clientHeight`), and `#appendix-init`'s by 9px. The card sets `overflow: hidden`, so a
      presenter cannot reveal what is cut. Not reproduced at 1024×768.
- [ ] 14 WCAG AA contrast failures remain deck-wide at 1024×768, all pre-existing: the watermark
      numerals `.chapter-number` (1.29:1 at 225px) and `.entrance__number` (1.37:1 at 72px), eight
      `span`s inside `#edit` (2.89:1), one in `#vs-code` (4.45:1), and `#pull-request .pr-action`
      (2.91:1). The watermarks may be intentional decoration — if so they need `aria-hidden` so a
      sweep stops counting them; the `#edit` and `#pull-request` spans carry meaning and do not.

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
