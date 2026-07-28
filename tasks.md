# Follow-up Tasks

## From QA of the practice-framing fix

- [ ] **Decide whether the pre-practice `git status` slide should reuse the exercise's own branch
      and file names** (`presentations/git-basics/index.html`, slide 09 · FIRST DIAGNOSTIC).
      The slide illustrates real `git status` output and quotes
      `Your branch is ahead of 'origin/feature/team-message' by 1 commit` plus `modified: team.md`.
      Both names belong to the guided exercise, and the ahead-count only exists after the push
      step, so this is the one remaining place a participant could read an ahead-count as their own
      current state. It sits in the concepts chapter with no imperative copy, so nothing is
      executable there and the VS Code orientation slides were already moved off the team repo.
      Either rename the branch and file in this mock to neutral placeholders, or keep the
      foreshadowing deliberately — a deck-owner framing call, not a defect.

## From review of PR #8 (vue-basics Parts 2–3)

- [ ] **Narrow viewports cannot be keyed past a slide's fold** (`presentations/vue-basics/`,
      whole deck — fold into ticket `6-vue-deck-pinia-uniweb`'s responsive pass).
      Below 900px wide, `deck.css` sets `overflow-y: auto` on `.slide`, so a long slide scrolls
      instead of clipping. But `deck.js` consumes `ArrowDown`, `PageDown`, and `Space` to advance
      the step, so a reader cannot use those keys to reach content that fell below the fold —
      pressing the key reveals a step they cannot see. Every projector size is clean, so this is
      narrow-viewport only.
      **Measured at 680×900 on 2026-07-28, after Parts 5–6 landed** — 17 of 56 slides overflow, in
      `[data-slide]` ordinals: 02 (71px), 04 (208px), 05 (140px), 11 (31px), 20 (228px), 21 (35px),
      22 (96px), 27 (212px), 29 (66px), 35 (58px), 41 (28px), 43 (77px), 47 (146px), 49 (161px),
      51 (16px), 54 (178px), 55 (97px). Re-measure before fixing; the list moves with every chapter.
      Fix options: split the densest slides, let the deck's key handler fall through to scrolling
      when the active slide has scrollable overflow, or accept the limit and say so in the runbook.
      Raised by Codex and the Claude reviewer on PR #8; the slide list was re-measured after a
      reviewer noted PR #10 had dropped the previous one without replacing it.

## From review of PR #9 (vue-basics Part 4)

- [ ] **Anchor `sources.md` evidence entries to something stable, not a slide ordinal**
      (`presentations/vue-basics/sources.md`). Inserting one slide into Part 4 invalidated every
      slide number in three Primary-References blocks at once, and the error survived one QA pass.
      Positional numbers are the wrong key for a file whose job is traceability. Consider citing
      `data-chapter` labels, or adding an `id` per slide and citing that. Raised by the Claude
      reviewer on PR #9.

## From review of PR #10 (vue-basics Parts 5–6)

- [ ] **Code cards silently clip their contents deck-wide** (`presentations/vue-basics/`, fold into
      ticket `6-vue-deck-pinia-uniweb`'s pass). `deck.css` gives `.code-card` `overflow: hidden`, so
      a block taller than its box is cut with **no scrollbar** — a presenter cannot reveal the lost
      lines live. Every measurement in this repo so far checked slide-level overflow and `pre`
      horizontal overflow, which both miss this.
      Measured with all `[data-step]` revealed, after `document.fonts.ready`, comparing
      `card.scrollHeight - card.clientHeight`:
      at 1920×1080 — slide 10 (5px), 19 (29px), 30 (79px), 32 (72px), 40 (63px);
      at 1366×768 — slide 32 (45px), 38 (9px), 40 (48px).
      Parts 5–6 were fixed in PR #10 with a `.code-card--dense` modifier; the Part 1–4 slides above
      are untouched and still lose their last lines.
      Fix options: apply `.code-card--dense` where it suffices, split the tall blocks, or give
      `.code-card pre` a max-height with a visible scroll affordance.
      **Add the card-level check to `docs/runbook.md`'s browser-verification list** so this class of
      defect is caught by the standard pass rather than by a reviewer.

- [ ] **Mechanically check that slide code blocks match their source files**
      (`presentations/vue-basics/`, harness work — size before scheduling).
      Three consecutive review rounds each found a code block that had drifted from the file it
      claimed to quote: stripped attributes, a narrowed import, a renamed callback parameter, two
      re-wrappings. The convention is not holding by inspection.
      A checker would extract each `<pre><code>` block, strip the highlight `<span>`s, and assert
      the result appears verbatim in a committed fixture or is listed in `sources.md`'s abbreviation
      section. The obstacle: the rehearsal project lives in an ephemeral scratchpad, so the fixtures
      would have to be committed alongside the deck first. Decide whether that is worth it before
      building anything. Raised by the Part 5–6 QA pass.
