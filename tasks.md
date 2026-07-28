# Follow-up Tasks

## Open follow-ups

- [ ] **`git-basics` has the same projection defects the Vue deck's pass just fixed**
      (`presentations/git-basics/`). Measured at 1366×768 with every `[data-step]` revealed, after
      `document.fonts.ready`, comparing the lowest step against `#previous`: 13 of 43 slides have a
      step at or past the controls — ordinals 4 (−40px), 6 (−5), 7 (−16), 14 (−6, plus a 117px `pre`
      horizontal overflow), 15 (−15), 16 (3), 18 (−21), 19 (−7), 20 (−9), 22 (4), 23 (−21),
      42 (61px slide overflow, gap 5), 43 (4).
      Verified identical on `main`, so none of it is a regression — the Vue deck simply got a
      whole-deck pass and this one never has. `docs/runbook.md` now describes the measurement, and
      `deck.css` there could take the same `code-card--dense` treatment.

- [ ] **Adopt the slide-evidence checker in `git-basics`** (`presentations/git-basics/`).
      `tools/validate-slide-evidence.py` now covers any deck with a `fixtures/` directory and prints
      `git-basics has no fixtures/ — not covered yet` on every sweep, so the gap is visible rather
      than silent. Adoption means: a stable `id` per slide, a `data-source` on each of its code
      blocks, and fixtures for whatever it quotes from a real repository. Run
      `python3 tools/validate-slide-evidence.py git-basics` to see the exact list first — most of
      that deck's blocks are captured terminal output, so they may all be `capture:`.
