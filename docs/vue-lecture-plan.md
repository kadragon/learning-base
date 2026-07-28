# Vue Lecture Plan for Developers New to the Frontend Ecosystem

Design source: `docs/design/vue-basics-lecture.md`.
Reference repository: **`uniweb`**, the KNUE Vue application the audience will maintain. It is
read-only for this lecture. Every stack claim below was read from it on 2026-07-28, from the
author's local checkout at `<uniweb-checkout>` (`~/dev/knue/uniweb` on the machine used here).
Paths written as `src/main/...` are relative to that checkout.

## 1. Lecture Overview

### Audience

- Developers with working experience in another stack (server, desktop, or data)
- No experience with Node.js, npm/pnpm, bundlers, or TypeScript
- People who will take over maintenance of the `uniweb` Vue application
- Comfortable with variables, functions, types, and HTTP — these are **not** re-taught

### Duration

- Single session, 180 minutes including two 5-minute breaks

### Learning Goals

By the end of the lecture, participants should be able to:

1. Explain what Node.js is, and why a browser-targeted project needs it.
2. Explain what a package registry, `package.json`, a lockfile, and `node_modules` are.
3. Explain why this team runs `pnpm` rather than `npm`, and run the basic pnpm commands.
4. Read a TypeScript annotation, and explain what `vue-tsc` checks that the browser does not.
5. Create a Vue project with `pnpm create vue@latest` and start its dev server.
6. Read and write a Single-File Component using `<script setup>` and the Composition API.
7. Use reactivity (`ref`, `computed`), template syntax, list and conditional rendering, event
   handling, `v-model`, props, and emits.
8. Split an application into pages with Vue Router.
9. Extract reusable logic into a composable, and call an HTTP API with axios.
10. Hold cross-page state in a Pinia store.
11. Open `uniweb` and say what each directory under `src/main/` is for.

### Central Message

> Vue is small. The ecosystem around it is what looks unfamiliar — so we install the ecosystem
> first, then the framework, then map both onto the repository you will maintain.

## 2. Teaching Approach

### One continuous project

Do not demonstrate disconnected snippets. Build one application — a **department member
directory** — and grow it chapter by chapter:

```text
create the project
→ render a static member list
→ extract a MemberCard component
→ add a search box with v-model
→ add a detail page with Vue Router
→ move data loading into a useMembers() composable backed by axios
→ add a bookmark store in Pinia
→ map every file just written onto uniweb's src/main/
```

### Anchor every new tool to something already known

Participants know another stack. Introduce each tool as a translation, not as a novelty:

| Frontend tool | Familiar analogue | Caution to state out loud |
|---|---|---|
| Node.js | A language runtime installed on the machine (JVM, CPython) | The browser also runs JavaScript; Node is a **second**, separate runtime used for tooling |
| npm registry | Maven Central, PyPI, NuGet | — |
| `package.json` | `pom.xml`, `build.gradle`, `pyproject.toml` | Declares ranges, not exact versions |
| lockfile (`pnpm-lock.yaml`) | `pom.xml` with pinned versions, `poetry.lock` | This is the file that makes installs reproducible; commit it |
| `node_modules` | The local dependency cache, unpacked into the project | It is disposable — never commit it, never edit it |
| Vite | The build tool plus dev server | It also serves the app during development |
| TypeScript | Static types over a dynamic language | Types are erased at build time; they do not exist at runtime |

The analogy table is a teaching simplification. Say so explicitly — the mapping is close enough
to get started and wrong if pushed hard.

### Close every chapter with the same question

After each chapter, show one slide answering: **"방금 만든 것이 `uniweb`의 어디에 해당하는가."**
This is what separates this lecture from a generic Vue tutorial. It is the reason the lecture
exists, so it must not be the part that gets cut when time runs short.

### Type along, do not watch

Participants type every command and every component themselves in a throwaway project. Failure is
safe there. `uniweb` itself is opened only in the last chapter, and only for reading.

## 3. Schedule

| # | Section | Duration |
|---|---|---:|
| 0 | Opening: what we build and why | 10 minutes |
| 1 | Node, the registry, and pnpm | 25 minutes |
| — | Break | 5 minutes |
| 2 | TypeScript, only what Vue needs | 20 minutes |
| 3 | Creating the project with Vite | 20 minutes |
| 4 | Vue core concepts | 45 minutes |
| — | Break | 5 minutes |
| 5 | Pages with Vue Router | 15 minutes |
| 6 | Composables and axios | 15 minutes |
| 7 | Shared state with Pinia | 10 minutes |
| 8 | Mapping onto `uniweb`, and wrap-up | 10 minutes |
| | **Total** | **180 minutes** |

**These durations are still estimates.** The ticket-3 rehearsal timed *commands* — the scaffold,
install, dev server, and build all complete in well under a minute — not *teaching*. No chapter has
been run against a room, so the instructor checklist item "run the whole hands-on project end to
end and time each chapter" remains open.

### If the room falls behind

Compress in this order, and no other:

1. Chapter 7 (Pinia) — switch from type-along to instructor demo. Saves about 5 minutes.
2. Chapter 6 (composables) — keep the composable, demo the axios refactor. Saves about 5 minutes.
3. Chapter 5 (Router) — provide the finished `router/index.ts` instead of writing it live.

Never compress chapter 8. If chapter 8 would be lost, cut chapter 7 entirely and say so.

## 4. Chapter Outline

### 4.0 Opening: what we build and why (10 minutes)

#### Topics

- The finished member-directory app, shown running, before any code is written
- The one screenshot of `uniweb` running, and the statement that this is the destination
- The size of the destination: `uniweb` contains 451 `.vue` files and 499 `.ts` files
- What this lecture deliberately does not cover (see section 8)

#### Outcome

Participants can state the goal of the session and know that they are not expected to understand
`uniweb` yet.

### 4.1 Node, the registry, and pnpm (25 minutes)

#### Topics

- Why a browser project needs a runtime that is not the browser: the source we write (SFCs,
  TypeScript, module imports) is not what a browser can load, so a build step must run somewhere
- Node.js as that runtime
- The registry, `package.json`, the lockfile, and `node_modules`, using the analogy table above
- `dependencies` versus `devDependencies`, read from the real `uniweb` `package.json`
- Semantic version ranges: `^3.5.27` versus `~5.9.3`, and why the lockfile still pins one version
- npm as the default, then pnpm as what this team actually runs

#### Why pnpm here

Read verbatim from `uniweb/package.json`:

```json
"engines": {
  "node": "^24.13.0",
  "pnpm": "^11.1.3"
},
"packageManager": "pnpm@11.1.3"
```

The official pnpm documentation gives the reasons: dependencies live once in a
content-addressable store on disk rather than being copied per project, and `node_modules` is
built from symlinks so that only direct dependencies sit at the root. The second point is the one
that matters day to day: a package that is not declared in `package.json` is not importable, even
if some other dependency happens to install it. Frame this as strictness, not as speed.

Teach npm's vocabulary anyway. Participants will read npm commands in every article and every
README they meet; they need to translate, not to be sheltered.

| npm | pnpm |
|---|---|
| `npm install` | `pnpm install` |
| `npm install <pkg>` | `pnpm add <pkg>` |
| `npm install -D <pkg>` | `pnpm add -D <pkg>` |
| `npm run <script>` | `pnpm run <script>`, or `pnpm <script>` |
| `npx <bin>`, binary already installed | `pnpm exec <bin>` |
| `npx <bin>`, binary not installed | `pnpm dlx <bin>` |

The two `npx` rows are deliberate. `npx` picks between "run the copy already in `node_modules`"
and "fetch it and run it" on its own; pnpm splits those into two commands. Teaching
`npx` → `pnpm dlx` alone would send participants to the registry for a binary the lockfile
already pins, so state both rows.

The shorthand in the third row has one restriction worth stating, because it will bite someone:
pnpm aliases every script as a top-level command **only** when the script name does not collide
with a real pnpm command. `pnpm dev` works; a script named `add` would need `pnpm run add`.

#### Node version

`uniweb` requires Node `^24.13.0` and ships a `.nvmrc`, so `nvm use` inside the repository selects
the right version. State the constraint from both sides:

- `uniweb` `engines.node`: `^24.13.0`
- Vue's `create-vue` scaffolder: `^22.18.0 || >=24.12.0`

Node 24.13.0 satisfies both, which is why the pre-lecture checklist pins it.

#### `uniweb` mapping

`package.json` at the repository root; `pnpm-lock.yaml` beside it; `.nvmrc` selects the runtime.

### 4.2 TypeScript, only what Vue needs (20 minutes)

#### Topics

- The one-sentence definition: JavaScript plus type annotations, erased before the browser sees it
- Annotations on variables, parameters, and return types
- `interface` and `type` for object shapes — this is the form participants will meet most in a Vue
  codebase, because component props are described this way
- Union types and optional properties, because API responses need them
- ES modules: `import` / `export`, and the fact that a `.vue` file is imported like any module
- What the compiler is for: `vue-tsc`

#### The `vue-tsc` point

The official Vue TypeScript guide states that SFC projects should use `vue-tsc` rather than `tsc`
for command-line checking, because `vue-tsc` is a wrapper around `tsc` that additionally
understands `.vue` files. `uniweb` follows this:

```json
"type-check": "vue-tsc --noEmit"
```

Make the consequence explicit: Vite does **not** type-check during `pnpm dev`. A type error will
not stop the dev server. The check is a separate command, and it is the one that gates a build.

#### Deliberate omissions

Generics beyond reading a `ref<T>`, decorators, `enum`, declaration merging, and utility types.
Name them as existing; do not teach them.

#### `uniweb` mapping

`tsconfig.json`, `env.d.ts`, `src/main/types/`, and the `pnpm type-check` script.

### 4.3 Creating the project with Vite (20 minutes)

#### Topics

- Scaffolding with the official tool, verbatim from the Vue Quick Start:

  ```bash
  pnpm create vue@latest
  ```

- The prompts the scaffolder asks, and the answers to give
- `pnpm install`, then `pnpm dev`, then opening the printed URL
- What the dev server does that a static file server does not: it serves modules to the browser
  and hot-replaces them on save
- A tour of the generated directory tree
- `pnpm build` and what `dist/` is

#### Prompt answers

**The official Quick Start page's prompt list is out of date.** It still shows a per-feature
`Add ~? … No / Yes` sequence. The tool that actually runs — `create-vue@3.23.0`, rehearsed
2026-07-28 — asks TypeScript on its own and folds the rest into one multi-select:

```text
Project name (target directory):
Use TypeScript?
Select features to include in your project:
  (↑/↓ to navigate, space to select, a to toggle all, enter to confirm)
    JSX Support
    Router (SPA development)
    Pinia (state management)
    Vitest (unit testing)
    End-to-End Testing
    Linter (error prevention)
    Prettier (code formatting)
```

**Two more prompts always follow, and participants will hit both.** Read from `create-vue@3.23.0`'s
`bundle.js`: inside the `if (!isFeatureFlagsUsed)` branch, the experimental-features multi-select is
unconditional, and the barebone question runs whenever no feature flags were passed. Only the
end-to-end framework picker (asked when End-to-End Testing was selected) and the package-manager
picker (asked when the Vue 3.6 RC is selected) are conditional, along with `Package name:`, which
appears only when the directory name is not a valid package name.

```text
Select experimental features to include in your project:   → select nothing, press enter
  Vue 3.6 (Release Candidate)
  Replace Prettier with Oxfmt
Skip all example code and start with a blank Vue project?   → No
```

Answering `Yes` to the barebone question would delete the generated example components, which
chapter 4 replaces one at a time — so the answer is `No`.

| Prompt | Answer | Reason |
|---|---|---|
| Project name | `member-directory` | — |
| Use TypeScript? | Yes | `uniweb` is TypeScript throughout |
| JSX Support | Not selected | `uniweb` does not use JSX |
| Router (SPA development) | Selected | Chapter 5 needs it, and `uniweb` depends on it |
| Pinia (state management) | Selected | Chapter 7 needs it, and `uniweb` depends on it |
| Vitest (unit testing) | Not selected | Testing is deferred to a follow-up session |
| End-to-End Testing | Not selected | Same |
| Linter (error prevention) | Selected | `uniweb` runs ESLint |
| Prettier (code formatting) | Selected | `uniweb` runs Prettier |

The equivalent non-interactive form, used for the rehearsal so the run was reproducible:

```bash
pnpm create vue@latest member-directory --ts --router --pinia --eslint --prettier
```

> Scaffolder output, the generated file tree, the `node_modules` layout, the dev-server URL, and the
> build output were all captured in the ticket-3 rehearsal on 2026-07-28 and are recorded in
> `presentations/vue-basics/sources.md`. Re-run the rehearsal before the lecture: `create-vue`
> changes between releases, and the scaffold always pulls current versions — the rehearsed scaffold
> already differs from `uniweb` by a major version on `pinia`, `vite`, and `typescript`.

#### `uniweb` mapping

`vite.config.ts`, `index.html` at the repository root, `src/main.ts` as the entry point, and the
`dev` / `build-dev` / `build-proc` scripts. Note that `uniweb` runs three modes — `pnpm loc`,
`pnpm dev`, `pnpm proc` — against different API configurations, and that its dev server is
documented at `http://localhost:3300`.

### 4.4 Vue core concepts (45 minutes)

This chapter carries the lecture. Order follows the convergent ordering of the surveyed curricula
(section 7).

#### 4.4.1 The Single-File Component

- The three blocks: `<script setup lang="ts">`, `<template>`, `<style scoped>`
- Why one file per component rather than three
- The official position: SFCs are the recommended way to author components when the project has a
  build setup — which this one does
- Composition API versus Options API in one slide: state that Options API exists, that older
  material and older Vue code use it, and that `uniweb` mandates Composition API with
  `<script setup>`. Do not teach Options API syntax.

#### 4.4.2 Reactivity

- `ref()` for a single value; `.value` in script, no `.value` in template
- `reactive()` for an object, and the one rule that prevents most beginner bugs: do not destructure
  a `reactive` object
- `computed()` for derived values, and why it is not a method call
- Mention `watch` by name and defer it — the member directory does not need it

#### 4.4.3 Template syntax

- Interpolation `{{ }}`
- `v-bind` and its `:` shorthand
- Class and style binding, object and array forms
- `v-if` / `v-else-if` / `v-else`
- `v-for`, and why `:key` is required
- `v-on` and its `@` shorthand, plus event modifiers

#### 4.4.4 Forms

- `v-model` on text, checkbox, and select
- The search box on the member list is the live exercise

#### 4.4.5 Components, props, and emits

- Extracting `MemberCard.vue` from the list
- `defineProps` with a TypeScript type-only declaration
- `defineEmits`, and the one-way rule: props down, events up
- Naming convention taken from `uniweb`: `.vue` files in PascalCase, props camelCase in script and
  kebab-case in the template

#### 4.4.6 Lifecycle

- `onMounted` and `onUnmounted`, taught as the place where side effects belong
- This sets up chapter 6, where the composable does its fetching

#### `uniweb` mapping

`src/main/components/`, `src/main/views/`, `src/main/layouts/`.

### 4.5 Pages with Vue Router (15 minutes)

#### Topics

- The single-page-application idea: one HTML document, JavaScript swaps the view
- `createRouter` with `createWebHistory`, and the `routes` array of `path` + `component`
- `<RouterLink>` in place of `<a>`, and `<RouterView>` as the slot the matched component fills
- `app.use(router)` in the entry file
- Route parameters: `/members/:id`, read with `useRoute()`
- Lazy loading a route component, named only as the reason `uniweb` splits its routes

#### Exercise

Add `MemberDetailView.vue` at `/members/:id`, and link each `MemberCard` to it.

#### `uniweb` mapping

`src/main/router/index.ts` plus the `src/main/router/routes/` directory that splits route
definitions across files, and `app.use(router)` in `src/main.ts`.

### 4.6 Composables and axios (15 minutes)

#### Topics

- The problem: the list view and the detail view both need member data
- A composable is a function using the Composition API to encapsulate **stateful** logic — as
  opposed to a plain utility function, which has no state
- Conventions from the official guide: name it `use` + camelCase, return refs so destructuring
  keeps reactivity, register side effects in `onMounted` and clean them up in `onUnmounted`, and
  call it only from `<script setup>` or `setup()`
- axios as the HTTP client: one configured instance, imported everywhere, rather than a bare
  `fetch` call per component
- Loading and error state as first-class returns from the composable

#### Exercise

Write `useMembers()` returning `{ members, isLoading, error }`, backed by an axios instance
reading `public/members.json`.

#### `uniweb` mapping

`src/main/composables/` — show the real names, which follow exactly the convention just taught.
As read on 2026-07-28, the directory holds `use-breakpoint.ts`, `use-file-upload.ts`,
`use-login-error.ts`, `use-login.ts`, `use-timetable.ts`, and `use-user-role.ts`, plus the
`common/`, `forms/`, `knue/`, and `total-menu/` subdirectories. Re-read the directory when
authoring the slide rather than copying this list — it grows. Then `src/main/api/api-client.ts` as the
single configured axios client, and note that `uniweb` names TypeScript files in kebab-case while
naming the exported function in camelCase.

### 4.7 Shared state with Pinia (10 minutes)

#### Topics

- The problem: bookmarks must survive navigation between the list and the detail page, so the state
  cannot live in either component
- What a store is: an entity holding state and logic that is not bound to the component tree
- The three parts, and their component analogues — state ≈ `data`, getters ≈ `computed`,
  actions ≈ `methods`
- Setup: `createPinia()` and `app.use(pinia)` in the entry file
- `defineStore` in setup style, which reads exactly like `<script setup>`
- When **not** to use a store: state used by one component belongs in that component

#### Exercise

A `useBookmarkStore()` with a set of bookmarked member ids, a toggle action, and an `isBookmarked`
getter, used from both views.

#### `uniweb` mapping

`src/main/stores/` — `bookmark.ts`, `menu.ts`, `id-card.ts`, `file-extension.ts`. Then show the
entry wiring in `src/main.ts`, where `uniweb` adds a persistence plugin before registering it:

```ts
const pinia = createPinia();
pinia.use(piniaPluginPersistatestate);
app.use(pinia);
```

Name `pinia-plugin-persistedstate` as the reason some `uniweb` stores survive a reload. Do not
teach it.

### 4.8 Mapping onto `uniweb`, and wrap-up (10 minutes)

#### The mapping

Put the project just built beside the real repository, side by side:

| Member directory | `uniweb` | Holds |
|---|---|---|
| `src/views/` | `src/main/views/` | One component per route |
| `src/components/` | `src/main/components/` | Reusable pieces |
| `src/composables/` | `src/main/composables/` | Reusable stateful logic |
| `src/stores/` | `src/main/stores/` | Pinia stores |
| `src/api/` | `src/main/api/api-client.ts` | The configured HTTP client |
| `src/router/` | `src/main/router/` (`index.ts` + `routes/`) | Route table |
| `src/main.ts` | `src/main.ts` | Entry point: create, register plugins, mount |

#### What is in `uniweb` that we did not build

Name these once so nobody is ambushed on their first day. Do not explain them:

- `src/main/i18n.ts` and `src/main/locales/` — `vue-i18n`, multi-language UI
- `src/main/layouts/`, `src/main/plugins/`, `src/main/constants/`, `src/main/utils/`
- `src/cartzilla/` — a purchased theme's CSS and JS
- `src/pub-only/` — publishing-page markup
- `src/core/` — vendor-supplied compiled code, imported as `@/core`; per the repository's own
  `AGENTS.md`, it must not be modified
- `src/docs/frontend/` — the project's own documentation
- Bootstrap, Tailwind, Sass, VueUse, WebSocket/STOMP, and the native app bridge

#### Daily commands for a `uniweb` maintainer

Read from `uniweb/AGENTS.md`:

```bash
nvm use            # select Node 24.13.0
pnpm install       # install with the pinned pnpm version
pnpm dev           # dev server, http://localhost:3300
pnpm type-check    # vue-tsc, no emit
pnpm lint          # ESLint with --fix
pnpm format        # Prettier over src/
pnpm build-dev     # type-check plus build
```

State the repository's own rule: there is no automated test suite, so before opening a pull
request, run `pnpm type-check`, `pnpm lint`, and the build for the environment that changed, then
exercise the changed routes by hand.

#### Closing checklist

```text
어디에 그리는가?   컴포넌트(.vue) — script setup / template / style
무엇이 바뀌는가?   반응형 상태 — ref, computed
어떻게 그리는가?   템플릿 문법 — v-bind, v-if, v-for, v-on, v-model
어떻게 나누는가?   props 아래로, emit 위로
어느 페이지인가?   라우터 — routes, RouterLink, RouterView
로직은 어디에?     composable — use* 함수가 상태와 부수효과를 소유
데이터는 어디서?   api-client — 설정된 axios 인스턴스 하나
공유 상태는?       Pinia 스토어 — 화면을 넘어 사는 상태만
확인은 어떻게?     pnpm type-check, pnpm lint, 그리고 직접 눌러보기
```

## 5. Hands-On Project Specification

### Scenario

A department member directory. It is deliberately small: no authentication, no writes to a
server, no backend beyond a static file.

### Data

`public/members.json`, served by the dev server as a static asset. Each record carries an id, a
name, a role, a team, and an email. Roughly a dozen records is enough to make list rendering and
search meaningful without filling the screen.

### Final file set

```text
public/members.json
src/api/http.ts               configured axios instance
src/composables/use-members.ts
src/stores/bookmark.ts
src/components/MemberCard.vue
src/views/MemberListView.vue
src/views/MemberDetailView.vue
src/router/index.ts
src/App.vue
src/main.ts
```

> The scaffolder generates its own versions of `App.vue`, `main.ts`, `router/index.ts`, and the
> `components/` and `views/` directories. Which generated files are edited versus replaced is
> settled by the ticket-3 rehearsal, not guessed here.

### Concept coverage check

Every taught concept must appear at least once in the finished project:

| Concept | Where it appears |
|---|---|
| SFC, `<script setup lang="ts">` | every `.vue` file |
| `ref`, `computed` | search text in the list view, filtered result |
| `v-for`, `:key` | member list |
| `v-if` / `v-else` | loading, error, and empty-result states |
| `v-on` / `@` | bookmark button |
| `v-model` | search box |
| class binding | bookmarked card styling |
| props (typed) | `MemberCard` |
| emits | `MemberCard` bookmark event |
| lifecycle | `onMounted` inside the composable |
| router, route params | `/members/:id` |
| composable | `useMembers()` |
| axios | `src/api/http.ts` |
| Pinia | `useBookmarkStore()` |

If a concept has no row, either the concept or the project is wrong. Fix the project.

## 6. Pre-Lecture Checklist

### Instructor

- [ ] Run the whole hands-on project end to end from an empty directory, and time each chapter.
- [ ] Adjust section 3's schedule to the measured timings.
- [ ] Capture real scaffolder output, the generated file tree, and the dev-server URL for the deck.
- [ ] Prepare `members.json` and have it ready to paste or download.
- [ ] Build a finished snapshot of the project as a fallback, and have it available offline.
- [ ] Confirm that `uniweb` starts on the lecture machine, for the chapter-8 walkthrough.
- [ ] Decide in advance which chapters get compressed, per section 3.
- [ ] Verify that every version number quoted in the deck still matches `uniweb/package.json`.
- [ ] Re-check the `create-vue` prompt list against the official Quick Start; it changes between
      releases, and the deck quotes it verbatim.

### Participants — before the session, not during it

- [ ] Install `nvm`.
- [ ] Install Node 24.13.0 and confirm with `node --version`.
- [ ] Install pnpm 11.1.3 or newer and confirm with `pnpm --version`.
- [ ] Install VS Code and the Vue language extension.
- [ ] Run `pnpm create vue@latest` once, in a throwaway directory, to confirm network access
      through any proxy. This is the step most likely to fail in the room.
- [ ] Confirm read access to the `uniweb` repository.

## 7. Curriculum Basis

The chapter-4 ordering is not invented. Four public beginner curricula were surveyed on
2026-07-28; the deck follows the ordering they converge on. Full URLs and verification notes
belong in `presentations/vue-basics/sources.md`.

| Source | Ordering it teaches |
|---|---|
| Vue official guide, Essentials | Creating an Application → Template Syntax → Reactivity Fundamentals → Computed Properties → Class and Style Bindings → Conditional Rendering → List Rendering → Event Handling → Form Input Bindings → Watchers → Template Refs → Components Basics → Lifecycle Hooks |
| Vue Mastery, *Intro to Vue 3 (Composition API)* | Introduction → Project Setup → Attribute Binding → Conditional Rendering → List Rendering → Event Handling → Class & Style Binding → Computed Properties → Components & Props → Communicating Events → Forms & v-model |
| freeCodeCamp, Vue 3 course | fundamentals → reactivity → directives and styling → events and data binding → forms → component architecture → component communication → lifecycle → routing → API integration → Pinia |
| Vue School, *Vue.js 3 Fundamentals with the Composition API* | Recommends the Composition API as the default for modern Vue. The course page returned HTTP 403 to automated fetch, so only its description was read — record it as partially verified. |

Two deliberate departures from all four:

1. **Tooling comes first.** Every surveyed course starts at Vue and assumes Node is present. This
   audience does not have that assumption, so chapters 1 to 3 precede any Vue content.
2. **Router, composables, and Pinia are included.** Beginner courses defer them. This audience
   needs them, because `uniweb` depends on `vue-router`, `pinia`, and `axios`, and its
   `src/main/composables/` directory is one of the first places a maintainer will land.

## 8. Deferred Topics

Name these as future work; do not teach them:

- `watch`, `watchEffect`, and template refs beyond a mention
- `provide` / `inject`, slots, `Teleport`, `Suspense`, custom directives
- Testing with Vitest
- `vue-i18n` and multi-language UI
- Bootstrap, Tailwind, Sass, and the Cartzilla theme
- VueUse
- WebSocket and STOMP messaging, and the native application bridge
- The `@/core` vendor package's internals
- SSR and Nuxt
- Vue 2 and the Options API

A second session covering testing, `vue-i18n`, and the `uniweb` bridge and messaging layers is the
natural follow-up.

## 9. Deck Guidance

### Slide budget

Roughly 55 to 65 slides for 180 minutes, weighted toward chapter 4.

### Repeating slide pattern

1. State the problem in the running project.
2. Show the concept in the smallest possible code.
3. Show the result in the browser.
4. Show where it lives in `uniweb`.

### One message per slide

- "Node는 브라우저가 아니라 도구를 돌리기 위한 런타임입니다."
- "lockfile이 재현 가능한 설치를 만듭니다. 커밋하세요."
- "타입은 빌드 시점에 지워집니다. 런타임에는 존재하지 않습니다."
- "`pnpm dev`는 타입을 검사하지 않습니다. `pnpm type-check`가 합니다."
- "props는 아래로, 이벤트는 위로."
- "`v-for`에는 `:key`가 필요합니다."
- "composable은 상태를 가진 로직입니다. 유틸 함수가 아닙니다."
- "화면 하나만 쓰는 상태는 스토어에 넣지 마세요."

### Verification rule

Every command, every prompt, every file tree, and every code block in the deck is either executed
during the rehearsal or quoted from a primary source, and recorded in
`presentations/vue-basics/sources.md`. Anything else is written as
`[unknown — read {source} to verify]`.
