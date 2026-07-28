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

## Open follow-ups

- [ ] **Anchor `sources.md` evidence entries to something stable, not a slide ordinal**
      (`presentations/vue-basics/sources.md`). Inserting one slide into Part 4 invalidated every
      slide number in three Primary-References blocks at once, and the error survived one QA pass.
      Positional numbers are the wrong key for a file whose job is traceability. Consider citing
      `data-chapter` labels, or adding an `id` per slide and citing that. Raised by the Claude
      reviewer on PR #9.

- [ ] **Decide whether to build a mechanical slide-code-vs-file checker**
      (`presentations/vue-basics/`, harness work — size before scheduling).
      Across the Vue deck's chapter tickets, four review rounds each found a code block that had
      drifted from the file it claimed to quote: stripped attributes, a narrowed import, a renamed
      callback parameter, several undisclosed re-wrappings. Inspection is not holding.
      A checker would extract each `<pre><code>` block, strip the highlight `<span>`s, and assert
      the result appears verbatim in a committed fixture or is listed in `sources.md`'s abbreviation
      section. The obstacle: the rehearsal project lives in an ephemeral scratchpad, so the fixtures
      would have to be committed alongside the deck first, and `docs/architecture.md` currently
      keeps the repository dependency-free. Decide whether that trade is worth it before building.
