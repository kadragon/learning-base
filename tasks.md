# Follow-up Tasks

_No open follow-ups._

The five `vue-basics` items recorded here during the PR #15 review were each checked against the
tree and none reproduced. They were not overtaken by later work: `presentations/vue-basics/` has
not changed since PR #13, which is an ancestor of the commit that recorded them, and repo-root
`assets/` has not changed since PR #3 — the deck the reviewer described is byte-for-byte the deck
checked here. So these were five inaccurate findings, not stale ones, which is a review-quality
signal worth keeping visible rather than smoothing over. Retired without a code change:

| Recorded finding | What the tree actually contains |
|---|---|
| Steps fall below the visible area at 1024×768 on two slides | 0 steps below the fold across all 67 slides at 1920×1080, 1366×768 and 1024×768. Probe validated first by injecting a 1400px spacer and confirming it fires, then confirming it returns to 0 on removal. |
| Slide 09's `package.json` shows `//` comments and a trailing comma | `#ch1-manifest`'s block is valid JSON — no comment, no trailing comma. |
| `sources.md` claims scripts are quoted on slides 09 and 15 | Line 110 already reads "Scripts quoted on slide 09". |
| The pnpm quote drops the leading "By default," | Line 462 already opens with "By default, pnpm uses symlinks…". |
| `aria-label="오늘의 8개 챕터"` labels a 5-item roadmap | Line 175 already reads `aria-label="오늘의 진행 순서"`. |
