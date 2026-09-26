# Learning Base

Korean HTML presentations that explain developer knowledge to department members.

Every deck is a self-contained, browser-native HTML page — no build step, no package install, and
no network access needed after checkout.

## Presentations

Published with GitHub Pages from `main` (repository root); a merge appears within a few minutes.
Index: https://kadragon.github.io/learning-base/

| Deck | Title | Audience | Duration | Slides | Link |
|---|---|---|---|---|---|
| `git-basics` | Git, 가지를 만들고 합치는 일 | SVN users moving to Git in VS Code (`git.knue.ac.kr`) | ~90 min + 20–30 min exercise (max 120) | 43 | [Open](https://kadragon.github.io/learning-base/presentations/git-basics/) |
| `vue-basics` | Vue, 생태계부터 프레임워크까지 | Developers from other stacks taking over `uniweb` | 180 min (two 5-min breaks) | 67 | [Open](https://kadragon.github.io/learning-base/presentations/vue-basics/) |
| `llm-wrks-basics` | AI에게 일을 맡기는 법 (LLM · 웍스AI) | Administrative staff using WRKS AI | 120 min (90-min reduced path) | 48 | [Open](https://kadragon.github.io/learning-base/presentations/llm-wrks-basics/) |

### Deck summaries

- **`git-basics`** — One continuous story from `clone` to merged pull request: commits and branches
  through a tree metaphor, the four storage areas, VS Code staging/commit/branching, resolving a
  conflict in the Merge Editor, and cleaning up after merge.
  Central message: *a commit records work locally; a push shares it with the team.*
- **`vue-basics`** — Installs the ecosystem first (Node.js, pnpm, TypeScript), then the framework
  (SFCs, reactivity, router, composables with axios, Pinia) by growing one member-directory app,
  then maps every file onto `uniweb`'s `src/main/`.
  Central message: *Vue is small; the ecosystem around it is what looks unfamiliar.*
- **`llm-wrks-basics`** — Five parts pairing each LLM mechanism (next-piece prediction, context,
  sampling, context window) with the caution it explains, then WRKS AI screens, add-on tools,
  and sketching a personal agent.
  Central message: *AI predicts plausible text; the person who submits the work is accountable.*

Full teaching plans: `docs/git-lecture-plan.md`, `docs/vue-lecture-plan.md`,
`docs/llm-wrks-lecture-plan.md`. Each deck's claims and references: `presentations/<slug>/sources.md`.

## Presenting

| Key | Action |
|---|---|
| `→` | Next step or slide |
| `←` | Previous step or slide |
| `↓` / `PageDown` / `Space` | Scroll within a tall slide, then advance |
| `↑` / `PageUp` | Scroll back within a slide, then go back |
| `Home` / `End` | First / last slide |
| `F` | Toggle fullscreen |
| `?` | Show key hints (`git-basics`, `vue-basics`) |
| `N` | Toggle speaker notes (`llm-wrks-basics`) |

Append `#<number>` to open a specific slide, e.g. `…/llm-wrks-basics/#7`.

`llm-wrks-basics` animations respect the OS reduced-motion setting: with Windows "Animation effects"
off, slides show their final frame only. Turn it on under Settings → Accessibility → Visual effects.

## Local Preview

Requires Python 3 and a modern browser.

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/presentations/<slug>/`.

## Repository Layout

```text
assets/fonts/        # Shared, versioned webfonts with licenses
presentations/<slug>/
  index.html         # Deck entry point
  sources.md         # Claims, references, further reading (required)
  assets/            # Deck-local styles, scripts, images
  fixtures/          # Optional source files that slides quote
docs/                # Architecture, conventions, workflows, lecture plans
tools/               # Validators and sweep scripts
```

## Contributing

1. Read `docs/workflows.md` and `docs/conventions.md` before changing a deck.
2. Keep every runtime asset local — remote scripts, stylesheets, fonts, and images are rejected.
3. Validate before opening a pull request (requires Bash and `rg`); all must exit 0:

   ```bash
   bash tools/validate-presentations.sh
   bash tools/validate-harness.sh
   bash tools/sweep.sh
   ```

Browser verification steps and troubleshooting: `docs/runbook.md`.
