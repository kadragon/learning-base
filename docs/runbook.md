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
bash tools/sweep.sh
```

Both commands must exit 0.

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
4. Disable network and reload; presentation must remain functional.
5. Check visible focus and reduced-motion behavior.

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
