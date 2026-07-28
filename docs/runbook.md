# Runbook

## Prerequisites

- Bash
- Python 3 for a local static server
- A modern browser
- `rg` for repository validation

No package installation is required for the initial browser-native baseline.

## Create a Deck

```bash
mkdir -p presentations/<slug>/assets
```

Create `presentations/<slug>/index.html` and `presentations/<slug>/sources.md`, following `docs/conventions.md`.

Use the shared font registry from a deck entry point:

```html
<link rel="stylesheet" href="../../assets/fonts/fonts.css" />
```

Keep the relative path. A root-absolute `/assets/...` URL can bypass the repository prefix on a
GitHub Project Pages deployment.

## Validate

```bash
bash tools/validate-presentations.sh
bash tools/validate-harness.sh
python3 tools/validate-slide-evidence.py
bash tools/sweep.sh
```

All must exit 0. `tools/sweep.sh` runs the evidence checker too.

`validate-slide-evidence.py` covers any deck that has a `fixtures/` directory and names the ones
that do not, so an unadopted deck is visible rather than silently unchecked. Pass a slug to check a
deck regardless — `python3 tools/validate-slide-evidence.py git-basics` prints the work adoption
would take.

When a slide's code stops matching its fixture, the fix is almost always one of: the fixture is
stale because a later chapter edited the file (commit the chapter state the slide actually quotes),
the slide was reflowed in a way that changed a token (restore the token, or reflow the file and
re-verify it compiles), or the slide legitimately skips lines (add `data-excerpt`, and put the
elision marker where the omission actually is).

**What the checker cannot catch**, stated so a green run is not read as more than it is:

- Deleting a line that sits immediately beside an elision marker passes — the marker already
  declares an omission at that point, and the two are indistinguishable. Keep markers where the
  omission is, not where they are convenient.
- `capture:` and `uniweb:` text is compared to nothing; neither source is committed. Only the
  declaration is checked, against the lists in `sources.md`.
- `illustration` is unchecked by design. Declaring real file content as `illustration` therefore
  hides it — one block in this deck did exactly that until review caught it.
- Naming the wrong chapter's fixture passes when the quoted lines exist in both. The run prints a
  `note:` naming the alternatives whenever that is possible, so the ambiguity is visible.

## Preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/presentations/<slug>/`. Port `8000` is explicit in this command only; it is not a fixed project configuration.

## Browser Verification

For each changed deck:

1. Verify forward and backward keyboard navigation.
2. Inspect 1920×1080, 1366×768, 1024×768, and one narrow viewport. 1024×768 is the only listed
   size that exercises the `max-aspect-ratio: 4 / 3` branch in a deck stylesheet.
3. Confirm no clipped content, unintended scrollbars, or console errors.
4. **Measure clipping, do not eyeball it.** Three things must be true before any number you read
   is real; skip one and the whole sweep reports a deck that is fine when it is not:
   - `await document.fonts.ready` — measuring before webfonts load gives false readings in both
     directions.
   - **Reach each slide the way a presenter does**, by setting `location.hash = '#<n>.<maxStep>'`
     and letting `deck.js` render it. Do **not** force slides visible by hand with
     `classList.add('is-active')` plus inline `style.transform`/`visibility` — the stylesheet
     positions the active slide with a transform, so overriding it shifts every measurement by a
     constant and quietly turns real overflow into a clean bill of health.
   - **Wait out the transition** (~400ms) after each navigation. Reading on the next animation
     frame samples the slide mid-transition; the giveaway is that two consecutive identical runs
     disagree, so always run the sweep twice and compare before trusting it.

   Then, with every `[data-step]` revealed on each slide in turn, check all four of these; the
   first two are the ones repeatedly missed:
   - `card.scrollHeight - card.clientHeight` for every `.code-card`. Cards set `overflow: hidden`,
     so a too-tall block is cut with **no scrollbar** and a presenter cannot reveal it live.
   - `pre.scrollWidth - pre.clientWidth` for every `<pre>` — code must never need a horizontal
     scrollbar on a projector.
   - the computed `font-size` of every `<pre>`; below ~11.5px it is unreadable from the back of a
     room, so shortening or splitting the block is the fix, never shrinking it further.
   - the gap between the lowest `[data-step]` and `#previous`. Compare against the button, not
     `.deck-controls` — the footer's box extends above its visible controls.
   Exclude `aria-hidden` decoration that is positioned to bleed off an edge on purpose — the
   `git-basics` closing and cover slides both do this, and counting it reads as a 61px and 29px
   overflow that no reader ever loses anything to.

   **Compare against the base branch, not against zero.** A deck accumulates pre-existing
   findings, so an absolute count says nothing about the change under review. Serve the base
   revision alongside the working tree (`git archive main presentations/<slug> assets | tar -x -C
   <tmp>`, then a second `python3 -m http.server`) and run the identical sweep on both — the
   difference is the finding. Include the repo-root `assets/` in that archive or the baseline
   renders without webfonts and every number is wrong.
5. Disable network and reload; presentation must remain functional.
6. Check visible focus and reduced-motion behavior.

## Common Failures

### Validator reports a remote runtime dependency

Download the asset into the deck's `assets/` directory and use a relative path. Links inside teaching content may remain external; runtime `src` and stylesheet `href` values may not.

### Browser opens a directory listing

Confirm the deck entry point is named exactly `index.html`.

### Content overflows on a projector viewport

Reduce slide density or split the slide. Do not shrink body text until it becomes unreadable.

## Sweep Policy

Manual. Run `bash tools/sweep.sh` between substantial deck changes and after harness edits.

## Scratchpad Convention

Intermediate delegated artifacts live in the session scratchpad directory. Naming: `{phase:02d}_{agent}_{artifact}.{ext}`. They are ephemeral; no cross-session resume. Delegation evidence, if ever introduced, belongs separately under `.claude/tmp/`.
