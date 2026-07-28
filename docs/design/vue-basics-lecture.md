# Vue Basics Lecture for Frontend-Newcomer Developers

## Problem Statement

Department members will take over maintenance of `/Users/kadragon/dev/knue/uniweb` — a
production Vue 3 + TypeScript + Vite single-page application (451 `.vue` files, 499 `.ts`
files). The people who must maintain it have development experience in other stacks but have
never used the Node.js frontend ecosystem: Node, npm/pnpm, TypeScript, bundlers, and Vue itself
are all unfamiliar.

Two gaps block them today:

1. **No entry ramp.** Public Vue courses assume the learner already has Node installed, knows
   what `npm install` does, and reads `import`/`export` fluently. None of that holds here.
2. **No bridge to the real repository.** Even a good generic Vue course ends at a toy app. It
   never explains why `uniweb` has `src/main/{views,components,composables,stores,api,router}`,
   why `pnpm` instead of `npm`, or why `pnpm type-check` exists.

This repository already solved the equivalent problem for Git (`docs/git-lecture-plan.md` +
`presentations/git-basics/`). The same pattern applies here.

## Solution

Produce two artifacts, mirroring the Git precedent:

1. **`docs/vue-lecture-plan.md`** — the instructor-facing lecture plan: audience, learning
   goals, schedule, section-by-section outline, hands-on exercise script, pre-lecture checklist,
   and deferred topics. Grounded in surveyed public Vue curricula (see *Implementation
   Decisions*).
2. **`presentations/vue-basics/`** — a self-contained HTML deck (`index.html`, `assets/deck.css`,
   `assets/deck.js`, `sources.md`) reusing the structural conventions already proven in
   `presentations/git-basics/`.

The lecture runs **180 minutes in one session** and follows a single continuous narrative:

```text
왜 프론트엔드 도구가 필요한가
→ Node·pnpm (런타임과 패키지 매니저)
→ TypeScript 맛보기
→ Vite로 프로젝트 생성
→ Vue 핵심 개념 (SFC · 반응성 · 템플릿 · 이벤트 · props/emit · 생명주기)
→ Router로 페이지 나누기
→ composable로 로직 재사용
→ axios로 API 호출
→ Pinia로 전역 상태
→ 만든 구조를 uniweb src/main/ 에 1:1 매핑
```

Every chapter ends with the same closing move: *"방금 만든 것이 `uniweb`의 어디에 해당하는가."*
That is what turns a generic Vue lesson into onboarding for the repository they must maintain.

## User Stories

- As a **backend developer with no frontend experience**, I want Node, pnpm, and TypeScript
  explained by analogy to tools I already know (JVM/JRE, Maven/Gradle, static types), so that
  the toolchain stops being opaque before I write any Vue code.
- As a **workshop participant**, I want to type every command and every component myself in a
  throwaway project, so that I fail safely and understand each step rather than watching a demo.
- As a **future `uniweb` maintainer**, I want each Vue concept mapped to the exact directory and
  file it lives in inside `uniweb`, so that I can open the real repository afterwards and know
  where to look.
- As the **instructor**, I want a written plan with timings, a rehearsal checklist, and verified
  command output, so that I can deliver the session without improvising and without stating a
  fact I have not checked.
- As a **reviewer of this repository**, I want every technical claim in the deck traceable to a
  source in `sources.md`, so that the material stays correct as Vue and its tooling move.

## Implementation Decisions

### Audience and depth (resolved via `task-grill`)

Participants have development experience in other stacks; they do not need variables, functions,
or HTTP explained. They do need the Node/npm/bundler/TypeScript layer explained, and they need
it framed as "the equivalent of the tools you already use." Depth is deliberately shallow —
breadth over depth, every basic covered once.

### Stack pinned to `uniweb`, not to generic tutorials

Verified from `/Users/kadragon/dev/knue/uniweb` (`package.json`, `AGENTS.md`, `src/main.ts`):

| Choice | Value | Why |
|---|---|---|
| Vue | 3.5.x, Composition API with `<script setup>` | `uniweb` `AGENTS.md` mandates it: "Write Vue components with Composition API and `<script setup>`". Options API is mentioned once, as legacy context only. |
| Language | TypeScript, `lang="ts"` | `uniweb` is TS throughout; `pnpm type-check` runs `vue-tsc --noEmit`. |
| Build tool | Vite 7 | `uniweb` devDependency. |
| Package manager | **pnpm 11.1.3**, not npm | `uniweb` pins `"packageManager": "pnpm@11.1.3"`. npm is still taught as the *concept* (registry, `package.json`, lockfile, `node_modules`) because participants meet npm everywhere; pnpm is then introduced as the variant this team actually runs. |
| Node | 24.13.0 via `nvm` (`.nvmrc` present) | `uniweb` `engines.node` is `^24.13.0`. Note: `create-vue` itself requires `^22.18.0 \|\| >=24.12.0`, so 24.13.0 satisfies both. |
| Routing | `vue-router` 5 | `uniweb` dependency. |
| State | `pinia` 3 | `uniweb` dependency (with `pinia-plugin-persistedstate`). |
| HTTP | `axios` | `uniweb` dependency; `src/main/api/api-client.ts` is the single client. |
| Quality gates | ESLint + Prettier + `vue-tsc` | `uniweb` scripts `lint`, `format`, `type-check`. |

Deliberately **excluded** from the lecture despite being in `uniweb`: `vue-i18n`, Bootstrap,
Tailwind, Sass, VueUse, STOMP/SockJS, and the `@/core` vendor package. They are named once in a
"이 레포에는 이런 것도 있다" orientation slide so participants are not surprised, but none is
taught.

### Curriculum grounded in surveyed public courses

Concept ordering follows the intersection of four independently surveyed curricula, all fetched
this session:

- **Vue official guide, Essentials** (13 pages, in order): Creating an Application → Template
  Syntax → Reactivity Fundamentals → Computed Properties → Class and Style Bindings →
  Conditional Rendering → List Rendering → Event Handling → Form Input Bindings → Watchers →
  Template Refs → Components Basics → Lifecycle Hooks.
- **Vue Mastery, "Intro to Vue 3 (Composition API)"** (11 lessons): Introduction → Project Setup
  → Attribute Binding → Conditional Rendering → List Rendering → Event Handling → Class & Style
  Binding → Computed Properties → Components & Props → Communicating Events → Forms & v-model.
- **freeCodeCamp Vue 3 course**: fundamentals → reactivity → directives & styling → events &
  data binding → forms → component architecture → component communication → lifecycle → then
  routing, API integration, and Pinia.
- **Vue School, "Vue.js 3 Fundamentals with the Composition API"** — recommends Composition API
  as the default for modern Vue. (Course page returned HTTP 403 to automated fetch; only the
  search-result description was obtained. Recorded in `sources.md` as a partially verified
  source.)

All four converge on: bindings → conditional/list rendering → events → forms → computed →
components/props → emits → lifecycle. The deck follows that order and adds the three
`uniweb`-driven chapters the beginner courses defer (Router, composables + axios, Pinia).

### Hands-on project

Created live with `pnpm create vue@latest`. The `create-vue` prompt list is verified verbatim
from the official Quick Start (Project name / TypeScript / JSX / Vue Router / Pinia / Vitest /
E2E / ESLint / Prettier / Vue DevTools). Participants answer **Yes** to TypeScript, Vue Router,
Pinia, ESLint, Prettier and **No** to the rest — producing a scaffold whose shape matches
`uniweb`'s.

Project theme: a small **학과 구성원 목록** app — list rendering, a detail route, a search form
with `v-model`, a `useMembers()` composable wrapping an axios call, and a bookmark store in
Pinia. It exercises every taught concept without needing a backend beyond a static JSON file
served from `public/`.

### Deck structure reuses `presentations/git-basics/`

Same directory contract (`index.html` + `assets/deck.css` + `assets/deck.js` + `sources.md`),
same slide semantics (`<main>`, `data-slide`, keyboard handlers), same shared-font referencing
via relative paths to `assets/fonts/`. Per `docs/architecture.md`, shared runtime code is
introduced only after two decks demonstrate identical needs — this is the second deck, so the
CSS/JS **may** be near-duplicated for now; extracting a shared runtime is explicitly a follow-up
decision, not part of this work.

No change to `docs/architecture.md` is required: the deck itself remains dependency-free,
browser-native HTML. `pnpm`/Vite appear only as *lecture subject matter*, never as a build step
for this repository.

### Code samples must be real

Every command output, file tree, and code block shown in the deck is produced by actually
running the scaffold once during authoring and copying the result — matching the standard set by
the git deck (commit `475f259`, "rework git-basics deck flow with verified command output").
Anything not verified this way gets `[unknown — read {source} to verify]` per `AGENTS.md`
Golden Principle 4.

## Testing Decisions

- **Automated:** `bash tools/validate-presentations.sh` must pass. It enforces `sources.md`
  presence, `<html lang>`, a single `<main>`, `data-slide` markers, keyboard handlers, no remote
  runtime assets, and no deck-local font duplication.
- **Manual, per `docs/conventions.md` Visual Design:** open the deck in a browser at 16:9 and at
  a narrower viewport; verify keyboard forward/back navigation, contrast, visible focus states,
  code-sample legibility, and `prefers-reduced-motion` behaviour.
- **Content correctness:** every command, prompt list, and code block in the deck is executed or
  quoted from a fetched primary source before it ships; `sources.md` records the claim, the URL
  or repo path, and how it was verified.
- **Rehearsal:** the hands-on chapter is run end-to-end once from an empty directory, and the
  timings in `docs/vue-lecture-plan.md` are adjusted to what the rehearsal actually took.

## Out of Scope

- Creating a separate example-project repository, or committing `node_modules`/build output to
  this repository.
- Introducing a package manager, framework, or build step **into `learning-base` itself** — that
  would require changing `docs/architecture.md`, `docs/runbook.md`, and
  `tools/validate-presentations.sh` together.
- Teaching `vue-i18n`, Bootstrap, Tailwind, Sass, VueUse, WebSocket/STOMP, native-bridge code, or
  the `@/core` vendor package.
- Advanced Vue: SSR/Nuxt, `<Suspense>`, Teleport, custom directives, render functions, plugin
  authoring, provide/inject beyond a naming mention, and testing with Vitest.
- Modifying `/Users/kadragon/dev/knue/uniweb` in any way. It is read-only reference material.
- Extracting a shared deck runtime out of `presentations/git-basics/` and `presentations/vue-basics/`.
- Resolving the three pre-existing `git-basics` follow-up items already recorded in `tasks.md`.

## Further Notes

**Risks**

- *180 minutes is tight.* Nine chapters plus a live scaffold is an aggressive budget. Mitigation:
  the plan marks Pinia and the composable chapter as compressible (demo instead of type-along)
  and states an explicit fallback ordering if the room falls behind.
- *Live scaffolding can fail in the room* (network, Node version, corporate proxy). Mitigation:
  the pre-lecture checklist requires participants to have Node 24.13.0 and pnpm installed and to
  have run `pnpm create vue@latest` once **before** the session; the plan also specifies a
  pre-built fallback snapshot the instructor can hand out.
- *Version drift.* Vue, Vite, and `create-vue` move quickly, and the deck quotes exact versions
  and exact prompt text. `sources.md` must record the fetch date for every quoted prompt list so
  a future reader knows how stale the quote is.

**Follow-ups (not this work)**

- A second session covering testing (Vitest), `vue-i18n`, and the `uniweb` native-bridge /
  WebSocket layers.
- Shared deck runtime extraction, once a third deck confirms the duplication is real.
