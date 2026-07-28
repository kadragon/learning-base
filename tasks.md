# Follow-up Tasks

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

- [ ] **`git-basics` has the same projection defects the Vue deck's pass just fixed**
      (`presentations/git-basics/`). Measured at 1366×768 with every `[data-step]` revealed, after
      `document.fonts.ready`, comparing the lowest step against `#previous`: 13 of 43 slides have a
      step at or past the controls — ordinals 4 (−40px), 6 (−5), 7 (−16), 14 (−6, plus a 117px `pre`
      horizontal overflow), 15 (−15), 16 (3), 18 (−21), 19 (−7), 20 (−9), 22 (4), 23 (−21),
      42 (61px slide overflow, gap 5), 43 (4).
      Verified identical on `main`, so none of it is a regression — the Vue deck simply got a
      whole-deck pass and this one never has. `docs/runbook.md` now describes the measurement, and
      `deck.css` there could take the same `code-card--dense` treatment.
