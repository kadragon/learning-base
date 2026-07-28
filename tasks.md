# Follow-up Tasks

## Open follow-ups

- [ ] **`git-basics` needs a per-slide projection pass** (`presentations/git-basics/`).
      Measured at 1366×768 with every `[data-step]` revealed, after `document.fonts.ready` and
      once layout settles — 8 of 43 slides, with the cause identified for each:
      - **04 SVN → GIT** (gap −24): `.split-stage` is 444px tall; the trailing paragraph lands at
        719px against a control top of 703.
      - **07 START** (gap 0), **15 VS CODE** (1), **18 VS CODE** (−5), **20 BRANCH** (7),
        **23 IGNORE** (−5): the last `[data-step]` — a footnote, takeaway, checkpoint or
        warning-strip — sits at the control line. Vertical rhythm, but each slide's stack differs.
      - **14 VS CODE** (`pre` overflows 117px): the single line
        `fatal: not a git repository (or any of the parent directories): .git` is wider than its
        560px card at the base `clamp(0.8rem, 1.15vw, 1.2rem)`.
      - **42 Q&A** (61px slide overflow): `h2` alone is 413px at `clamp(4rem, 7vw, 8.3rem)` over
        three lines, leaving no room for the 161px tree art.

      **A shared-CSS pass was attempted and reverted.** Tightening `h2` margins, card padding and
      `.terminal-card pre` in the `max-height: 860px` block fixed five of the eight but introduced
      a 54px card clip on slide 10 and widened slide 14 — the causes are per-slide, so the fix has
      to be too. Verified identical to `main` before and after, so nothing here is a regression.
      `docs/runbook.md` describes the measurement to reproduce.
