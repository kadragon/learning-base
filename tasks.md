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
      pressing the key reveals a step they cannot see. Measured at 680×900 with every `[data-step]`
      revealed: slides 02 (71px), 04 (208px), 05 (140px), 11 (31px) are pre-existing; the new
      Part 2–3 slides 20 (228px), 21 (35px), 22 (96px), 27 (212px), 29 (66px) join them after a
      first density pass already cut them roughly in half. At 820×1180 and every projector size the
      deck is clean, so this is narrow-viewport only.
      Fix options: split the densest slides, let the deck's key handler fall through to scrolling
      when the active slide has scrollable overflow, or accept the limit and say so in the runbook.
      Raised by Codex and the Claude reviewer on PR #8.
