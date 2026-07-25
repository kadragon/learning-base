# Presentation Evaluation

Evaluate evidence before assigning scores. Any failed acceptance criterion fails the deck regardless of average.

## 1. Teaching Accuracy (35%)

| Score | Description |
|---|---|
| 5 | Claims are correct, scoped, sourced, and distinguish simplification from fact |
| 3 | Core explanation is correct; minor nuance or sourcing gaps remain |
| 1 | Material claim is false, fabricated, or misleading |

How to test: trace material claims to `sources.md`; run cited examples when practical.

## 2. Learning Progression (25%)

| Score | Description |
|---|---|
| 5 | Clear outcome, prerequisites, progressive explanation, and useful recap |
| 3 | Understandable sequence with isolated jumps or excess detail |
| 1 | Audience cannot infer the intended outcome or prerequisite concepts |

How to test: review slide order from the stated audience's starting knowledge.

## 3. Projection Readability (20%)

| Score | Description |
|---|---|
| 5 | Clear hierarchy, strong contrast, readable code, and no overflow at tested viewports |
| 3 | Readable with minor density or spacing issues |
| 1 | Critical content clips, overlaps, or is unreadable |

How to test: inspect at 1920×1080 and 1366×768, then at one narrow viewport.

## 4. Presentation Operation (20%)

| Score | Description |
|---|---|
| 5 | Keyboard navigation, focus, reduced motion, and offline assets all work |
| 3 | Core navigation works; minor accessibility issue remains |
| 1 | Navigation fails or deck depends on unavailable network resources |

How to test: run validator, use keyboard only, disable network, and inspect browser console.

## Pass Threshold

- Every criterion scores at least 3.
- Weighted average is at least 3.5.
- Every explicit acceptance criterion passes.

## Evaluation Protocol

1. Read acceptance criteria and `sources.md`.
2. Run `bash tools/validate-presentations.sh`.
3. Exercise the deck in a real browser.
4. List pass/fail evidence before scoring.
5. Return `ship`, `revise`, or `reject`, plus top three risks.
