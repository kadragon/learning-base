# Sources and Verification Notes

## Scope

This deck teaches Vue to developers who already work in another stack (server, desktop, or data)
but have never used Node.js, npm/pnpm, bundlers, or TypeScript. The audience will take over
maintenance of **`uniweb`**, the KNUE Vue application. The full lecture design lives in
`docs/vue-lecture-plan.md`.

The deck is built one chapter per backlog ticket. As of this file's last update it covers:

- **Part 0 — Opening** (slides 01–05): what we build, the `uniweb` destination, the roadmap, the
  deferred topics, and the working agreement.
- **Part 1 — Node, the registry, and pnpm** (slides 06–16).
- **Part 2 — TypeScript, only what Vue needs** (slides 17–23).
- **Part 3 — Creating the project with Vite** (slides 24–32).
- **Part 4 — Vue core concepts** (slides 33–43).

Parts 5–8 (Router, composables, Pinia, and the `uniweb` mapping chapter) are not in the deck yet.
They are tracked in `backlog.md`.

## Verification Rule

Every command, prompt, file tree, version number, and code block in this deck is either read from
a file or command output during authoring, or quoted from a primary source listed below. Anything
that is neither is written on the slide as `[unknown — read {source} to verify]`.

## Facts Read from the `uniweb` Checkout

Read on **2026-07-28** from the author's local checkout of `uniweb` (`~/dev/knue/uniweb` on the
machine used here). `uniweb` is read-only for this lecture.

### `package.json`

Quoted verbatim on slide 09:

```json
"engines": {
  "node": "^24.13.0",
  "pnpm": "^11.1.3"
},
"packageManager": "pnpm@11.1.3"
```

Scripts quoted on slide 09: `"dev": "vite --mode dev --host"` and
`"type-check": "vue-tsc --noEmit"`. Slide 09's card is an excerpt of 2 of the file's 16 scripts,
with `dependencies` and `devDependencies` omitted; the elision is stated in a caption below the
card rather than inside the block, because JSON accepts no comments.

Slide 15 quotes no scripts. It quotes `engines.node` (`^24.13.0`), `packageManager`
(`pnpm@11.1.3`), and the `.nvmrc` first line (`24.13.0`), alongside the `nvm use` /
`node --version` / `pnpm --version` commands a participant runs to check their own machine.

Dependency versions quoted on slides 10 and 11:

| Field | Package | Range |
|---|---|---|
| `dependencies` | `vue` | `^3.5.27` |
| `dependencies` | `vue-router` | `^5.0.2` |
| `dependencies` | `pinia` | `^3.0.4` |
| `dependencies` | `axios` | `^1.13.4` |
| `devDependencies` | `vite` | `^7.3.1` |
| `devDependencies` | `typescript` | `~5.9.3` |
| `devDependencies` | `vue-tsc` | `^3.2.4` |
| `devDependencies` | `eslint` | `^9.39.2` |

Slide 11 uses `vue`'s `^3.5.27` and `typescript`'s `~5.9.3` as the caret/tilde examples because
both are real entries in this file. The stated *reason* the team pins TypeScript with a tilde
(minor TypeScript releases can change type-check results) is a teaching rationale, not a claim
read from `uniweb` — it is presented as commentary, not as the repository's recorded intent.

### `.nvmrc`

The first line is `24.13.0`, which is what `nvm use` reads and what slide 15 quotes.

Note for future authors: the file also contains three npmrc-style lines below it
(`engine-strict=true`, `fund=false`, `audit=false`), which look misplaced — `.npmrc` is empty.
This does not affect `nvm use`, and the deck deliberately quotes only the first line rather than
showing or commenting on the rest. Do not turn this into a slide without asking the deck owner.

### Repository size

Counted with `find src -name '*.vue' | wc -l` and `find src -name '*.ts' | wc -l`:

- **451** `.vue` files
- **499** `.ts` files

Slide 02 shows both numbers.

### `src/main/` contents

Listed on slide 02 as 14 entries, read with `ls src/main/`: `api`, `assets`, `components`,
`composables`, `constants`, `i18n.ts`, `layouts`, `locales`, `plugins`, `router`, `stores`,
`types`, `utils`, `views`.

`i18n.ts` is a file, not a directory; the slide labels the group as "`src/main/` 항목" rather than
"디렉터리" for that reason.

### TypeScript configuration — slide 23

- `tsconfig.json` sits at the repository root. Slide 23 quotes two of its settings: `"strict": true`
  and the `paths` entry mapping `@/*` to `src/*`. The file holds several more `paths` entries for
  `@/core`, which the slide does not show — `src/core/` is vendor code the lecture explicitly does
  not open.
- `env.d.ts` sits at the root and declares `ImportMetaEnv` (`VITE_USER_ID`, `VITE_API_BASE_URL`),
  a `Window.Android` bridge interface, and a `@vueuse/integrations/useNProgress` module
  declaration. Slide 23 names only the environment-variable case; the bridge and the module
  declaration belong to deferred topics.
- `src/main/types/` contains `global-components.d.ts`, `knue/`, and `user.ts`. Slide 23 lists all
  three.
- The `type-check` script is `"vue-tsc --noEmit"`. Slide 23 quotes it.

### `interface` example — slide 19

The right-hand card on slide 19 is an excerpt of `uniweb/src/main/types/user.ts`. The real
declaration is `export interface LoginResponse extends LoginResponseBase` with the fields
`userIdGb`, `userNm`, `userSt`, `daehakCd`, `hakjeokSt`, `buseoCd`, `buseoNm`, `hpNo`, and `email`.
The slide shows five of the nine and marks the elision with a comment. Its Korean comment
("KNUE 전용 로그인 응답") is the file's own comment, shortened — the file writes
"KNUE 전용 로그인 응답 — 학교마다 달라지는 필드".

### `enum` — slide 22 footnote

`src/main/types/user.ts` declares a four-member **string** enum:

```ts
export enum MenuUserRole {
  UNDERGRAD = "UNDERGRAD",
  GRAD = "GRAD",
  PROFESSOR = "PROFESSOR",
  EMPLOYEE = "EMPLOYEE",
}
```

Slide 22's footnote names the file and the identifier — not the member list — as evidence that
`enum` is a "read it, don't write it" topic rather than a purely hypothetical one.

### Component directories and file naming — slide 43

Read on 2026-07-28:

- `src/main/components/` holds subdirectories (`alarm`, `base`, `bottom-navigation-icons`, `common`,
  `home`, `main`, `setup`), not a flat file list. `src/main/views/` mixes `.vue` files
  (`NativeHomeView.vue`, `WebHomeView.vue`) with feature subdirectories (`admin`, `alarm`, `auth`,
  `knue`, `playground`, `profile`). `src/main/layouts/` holds `BaseHeader.vue` and
  `DesignedAppView.vue`.
- **File naming, counted rather than assumed.** Of 326 `.vue` files under `src/main`, 63 are not
  PascalCase — but 60 of those are `index.vue`, a directory entry point rather than a component
  name, leaving three outliers (`login.vue`, `check.vue`, `_PageIndex.vue`). All 122 `.ts` files
  under `src/main` are kebab-case, with no exceptions.
  Slide 43 states the rule as "components are PascalCase, `.ts` is kebab-case, and `index.vue` is
  the folder entry point" for that reason. An earlier draft claimed a flat "`.vue` is PascalCase",
  which the count does not support.

### Composition API and prop naming in practice — slides 35 and 41

Two claims Part 4 makes about `uniweb`, counted on 2026-07-28 rather than assumed:

- Slide 35 says `uniweb` uses the Composition API with `<script setup>`. **All 326** `.vue` files
  under `src/main` contain a `<script setup>` block — `grep -rl '<script setup' src/main
  --include='*.vue' | wc -l` returns 326, the same as the total file count. Not one Options API
  component remains, so the slide's "오늘 배우는 전부가 이쪽" is exact, not approximate.
- Slide 41's footnote says the declaration/template naming split is the same in the docs and in
  `uniweb`. Template bindings are kebab-case at scale — `:active-key=` appears 687 times,
  `:is-mobile-size=` 360, `:model-value=` 276, `:is-loading=` 53 — against `defineProps` blocks
  that declare the camelCase form (`isActive`, and so on). The convention is observed, not stated
  in a style file.

### Scripts and the dev-server port — slide 32

Read from `uniweb/package.json` and `uniweb/vite.config.ts`:

- `"loc": "vite --mode loc --host"`, `"dev": "vite --mode dev --host"`,
  `"proc": "vite --mode proc --host"` — the three modes slide 32 names.
- `"build-dev": "run-s type-check build-only-dev"` and
  `"build-proc": "run-s type-check build-only-proc"` — the two build variants slide 32 names.
- `.env.loc`, `.env.dev`, and `.env.proc` all exist at the repository root, which is what makes the
  slide's "each mode reads its own file" phrasing a read fact rather than an inference.
- `vite.config.ts` sets `server: { port: 3300 }`. `uniweb/AGENTS.md` states the same:
  "`pnpm dev` starts the development-mode server at `http://localhost:3300`."

Note that `uniweb` composes its builds with `run-s` (sequential) while the scaffolded project uses
`run-p` (parallel). Slide 31 describes the scaffolded project's behaviour only — that `pnpm build`
fails when the type check fails — and does not claim an ordering.

## Rehearsal Run — Parts 2 and 3

Every command output, file tree, and version number on slides 21 and 24–31 was captured from a
single rehearsal run on **2026-07-28**, in a throwaway directory outside this repository.

### Environment

| | |
|---|---|
| Node | `v24.13.0` (selected from `~/.nvm/versions/node`, matching `uniweb`'s `engines.node`) |
| pnpm | `11.17.0` |
| `create-vue` | `3.23.0` |
| Platform | macOS (Darwin) |

The rehearsal deliberately used Node 24.13.0 rather than the machine's default, so that the
captured output matches the version the pre-lecture checklist pins.

### Commands run, in order

```bash
pnpm create vue@latest member-directory --ts --router --pinia --eslint --prettier
cd member-directory
pnpm install
pnpm dev                    # captured, then stopped
pnpm type-check             # after deliberately breaking one line
pnpm dev                    # again, with the type error still present
pnpm build
```

The flags were passed non-interactively so the run was reproducible. They correspond exactly to the
answers slide 25 tells participants to give in the interactive flow: TypeScript, Router, Pinia,
Linter, and Prettier selected; JSX, Vitest, and end-to-end testing not selected.

### The `create-vue` prompt sequence — slide 25

**The official Quick Start page's prompt list is out of date, and the deck does not use it.** The
page (fetched 2026-07-28) still shows the older per-feature `Add ~? … No / Yes` sequence. The
installed `create-vue@3.23.0` asks a different set. Slide 25 shows the real one and states the
discrepancy in its own footnote.

The real prompts and their order were read from the package itself — `locales/en-US.json` for the
wording, and the order of `language.*` references in `bundle.js`:

1. `Project name (target directory):`
2. `Package name:` — only when the directory name is not a valid package name
3. `Use TypeScript?`
4. `Select features to include in your project:` — a multi-select over `JSX Support`,
   `Router (SPA development)`, `Pinia (state management)`, `Vitest (unit testing)`,
   `End-to-End Testing`, `Linter (error prevention)`, `Prettier (code formatting)`
5. `Select an End-to-End testing framework:` — only when end-to-end testing was selected
6. `Select experimental features to include in your project:` — **always**, when no feature flags
   were passed; the options are `Vue 3.6 (Release Candidate)` and `Replace Prettier with Oxfmt`
7. `Which package manager will you use?` — only for the Vue 3.6 release-candidate path
8. `Skip all example code and start with a blank Vue project?` — **always**, when no feature flags
   were passed

Which of these are conditional was read from `bundle.js`, not guessed: prompts 6 and 8 sit
unconditionally inside the `if (!isFeatureFlagsUsed)` branch, while 5 is guarded by
`features.includes("e2e")` and 7 by `experimentFeatures.includes("vue-rc")`. Slide 25 therefore
carries all five prompts a participant actually meets — 1, 3, 4, 6, and 8 — with the answers to
give. An earlier draft of this file and of `docs/vue-lecture-plan.md` §4.3 wrongly listed 6 and 8
as conditional; the error was caught in review before the deck shipped, and both were corrected.

The multi-select hint quoted in the slide's instructor note is verbatim from the same locale file:
"(↑/↓ to navigate, space to select, a to toggle all, enter to confirm)".

The `--help` output of `create-vue@3.23.0` was also read, and is what confirms the non-interactive
flag names used above.

### Scaffolder output — slide 26

Captured verbatim, with only the absolute path shortened (it pointed into a session temporary
directory). The slide keeps the last two path segments, `.../rehearsal/member-directory`, wrapped
over two lines:

```text
┌  Vue.js - The Progressive JavaScript Framework

Scaffolding project in .../rehearsal/member-directory...
│
└  Done. Now run:

   cd member-directory
   pnpm install
   pnpm format
   pnpm dev
```

The `pnpm install` card on the same slide is an **excerpt**: 6 of the 21 installed packages, plus
the closing `Done in 3.7s using pnpm v11.17.0` line. The elision is marked in the block and stated
in the slide's footnote.

### Generated versions — slides 26 and 27

Read from the generated `package.json`. Slide 27 puts them beside `uniweb`'s ranges:

| Package | Scaffolded (2026-07-28) | `uniweb` |
|---|---|---|
| `vue` | `^3.5.40` | `^3.5.27` |
| `vue-router` | `^5.2.0` | `^5.0.2` |
| `pinia` | `^4.0.2` | `^3.0.4` |
| `vite` | `^8.1.5` | `^7.3.1` |
| `typescript` | `~6.0.0` | `~5.9.3` |

Slide 26's install card additionally prints `vue-tsc 3.3.8`, read from
`node_modules/vue-tsc/package.json` in the rehearsal project. It is not on slide 27's table,
which compares only the five packages that carry the major-version point.

Installed versions differ in form from the declared ranges — for example `typescript` resolved to
`6.0.3` under the `~6.0.0` range. Slide 26 shows resolved versions (that is what `pnpm install`
prints); slide 27 shows declared ranges (that is what `package.json` holds). The two cards are
labelled accordingly.

Slide 27's claim that "today's syntax works the same on both" is scoped to what this lecture
teaches — SFCs, reactivity, template syntax, router basics, composables, and a setup-style Pinia
store. It is a **teaching judgement**, not a compatibility statement read from a changelog.

### Generated file tree — slide 28

The full generated tree, `node_modules/` excluded, is:

```text
.editorconfig  .gitattributes  .gitignore  .oxlintrc.json  .prettierrc.json
.vscode/extensions.json  .vscode/settings.json
README.md  env.d.ts  eslint.config.ts  index.html  package.json  pnpm-lock.yaml
public/favicon.ico
src/App.vue  src/main.ts
src/assets/base.css  src/assets/logo.svg  src/assets/main.css
src/components/HelloWorld.vue  src/components/TheWelcome.vue  src/components/WelcomeItem.vue
src/components/icons/IconCommunity.vue  src/components/icons/IconDocumentation.vue
src/components/icons/IconEcosystem.vue  src/components/icons/IconSupport.vue
src/components/icons/IconTooling.vue
src/router/index.ts  src/stores/counter.ts
src/views/AboutView.vue  src/views/HomeView.vue
tsconfig.app.json  tsconfig.json  tsconfig.node.json
vite.config.ts
```

Slide 28 shows a curated subset and labels itself 발췌. It omits the dotfiles, `README.md`, the
`tsconfig.app.json` / `tsconfig.node.json` references, and the five example components. Nothing on
the slide is absent from this list.

`src/main.ts` is quoted verbatim on slide 20, and `src/router/index.ts` is the source of slide 31's
"`AboutView` is a separate chunk" note — the generated route uses
`component: () => import('../views/AboutView.vue')`.

### `node_modules` layout — slide 29

- `ls node_modules | wc -l` → **20**
- `package.json` declares **21** packages (3 `dependencies` + 18 `devDependencies`). The count
  differs by one because `@vue/eslint-config-typescript` and `@vue/tsconfig` share the single
  `@vue` directory. The four scoped directories at the root are `@tsconfig`, `@types`, `@vitejs`,
  and `@vue`.
- `ls node_modules/.pnpm | wc -l` → **289**, of which two entries — `node_modules` and `lock.yaml` —
  are not packages. Slide 29 therefore shows **287** and labels it "`.pnpm/`에 풀린 패키지", not
  "installed things".
- `node_modules/@vue/` at the root holds only `eslint-config-typescript` and `tsconfig`;
  `@vue/runtime-core@3.5.40` exists only under `node_modules/.pnpm/`. This is the concrete evidence
  for the slide's claim that a package `vue` depends on is not importable from application code.

The slide's closing footnote — that npm would have hoisted many of the 289 to the root — is the
pnpm motivation page's claim applied to this project, not a second measurement. It is marked on the
slide as a comparison, and the npm layout was **not** reproduced during the rehearsal.

### Dev server — slides 21 and 30

Slide 30 quotes the clean run verbatim, including the two `Vue DevTools` lines:

```text
  VITE v8.1.5  ready in 889 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  Vue DevTools: Open http://localhost:5173/__devtools__/ as a separate window
  ➜  Vue DevTools: Press Option(⌥)+Shift(⇧)+D in App to toggle the Vue DevTools
```

`5173` is Vite's default and was free on the rehearsal machine; the slide's caption says to read
the printed address rather than memorise the number.

Slide 21's demonstration is the load-bearing one. `src/views/HomeView.vue` was replaced with a
five-line file whose fourth line assigns a string to a `ref<number>`; the slide's left card shows
lines 1–4 of exactly that file, so its `// ← 4번째 줄` marker matches the compiler's `(4,1)`. With
the error in place:

- `pnpm dev` started normally — `ready in 201 ms` — and kept serving; a request to
  `http://localhost:5173/` returned **200**.
- `pnpm type-check` printed
  `src/views/HomeView.vue(4,1): error TS2322: Type 'string' is not assignable to type 'number'.`
  and `[ELIFECYCLE] Command failed with exit code 2.`

The 200 alone is weak evidence: `/` serves the static `index.html` shell whatever the module graph
does. What the slide actually claims is narrower and is the documented behaviour quoted on the same
slide — the dev server transpiles rather than type-checks, so the error never reaches it. The
capture shows the server starting and staying up, not that the broken module rendered.

The original `HomeView.vue` was restored before the build capture.

### Build — slide 31

Captured as below. The slide reproduces all five size rows in this order and drops only the
`transforming...` / `rendering chunks...` / `computing gzip size...` progress lines, which its card
bar states:

```text
vite v8.1.5 building client environment for production...
✓ 44 modules transformed.
dist/index.html                      0.42 kB │ gzip:  0.28 kB
dist/assets/AboutView-CXtZgaLf.css   0.08 kB │ gzip:  0.10 kB
dist/assets/index-DEm2-gV0.css       4.05 kB │ gzip:  1.27 kB
dist/assets/AboutView-DU7XtDBM.js    0.22 kB │ gzip:  0.20 kB
dist/assets/index-Fh33LsBj.js       99.03 kB │ gzip: 38.33 kB
✓ built in 345ms
```

The generated `build` script is `run-p type-check "build-only {@}" --`. Slide 31 says the type
check "runs together with" the build and that a failure fails `pnpm build` — deliberately avoiding
an ordering claim, because `run-p` is parallel. Content hashes in filenames change on every build;
the slide shows one run's output rather than a stable expectation.

## Rehearsal Run — Part 4

Every Vue code block on slides 33–43 was written into the same rehearsal project used for Part 3,
then compiled and run before it went on a slide. Same environment as above (Node `v24.13.0`, pnpm
`11.17.0`), on **2026-07-28**.

### What was built

The chapter-4 state of the member directory — the point where the app renders a searchable,
bookmarkable list but has no router, composable, or store yet:

```text
public/members.json                 6 records; one (박지호) deliberately has no email
src/types/member.ts                 the Member interface slide 19 introduced
src/components/MemberCard.vue       defineProps, defineEmits, v-if/v-else, :class
src/views/MemberListView.vue        ref, computed, v-model, v-for/:key, onMounted
src/router/index.ts                 '/' repointed from HomeView to MemberListView
src/App.vue                         reduced to <RouterView />
```

### Verification

- `pnpm type-check` → `vue-tsc --build` with **no output and exit 0**. Every typed construct on the
  slides — `ref<Member[]>([])`, `defineProps<{...}>()`, `defineEmits<{ toggleBookmark: [id: number] }>()`
  — is checked, not merely plausible.
- `pnpm build` → `✓ 33 modules transformed`, `✓ built in 197ms`.
- `pnpm dev`, then the running app driven in a real browser:

| Checked | Result |
|---|---|
| initial render (`v-for`, `onMounted` fetch) | 6 cards, heading `구성원 디렉터리`, count `6명` |
| `v-if` / `v-else` on a missing field | 박지호's card shows `이메일 미등록`; the others show an address |
| `v-model` search | typing `학사` → count `2명`, cards 박지호 and 최유진 |
| `emit` + `:class` binding | clicking the button → label flips to `★ 즐겨찾기 해제`, class becomes `card card--bookmarked` |
| empty-result state | searching `zzz` → 0 cards, `0명`, `검색 결과가 없습니다.` |

Slide 39's "6명 → 2명, 박지호·최유진" caption is that measurement, not an illustration.

### What the slides abbreviate

Slide numbers below are the current ones (Part 4 runs 33–44).

- Slide 33's `members.json` card shows **2 of the 6 records**, chosen so the pair demonstrates the
  optional `email` — 강동욱 has one, 박지호 does not. `member.ts` is quoted whole.
- Slide 34's three-block card is a **skeleton with comments**, not a compiled file — it exists to
  name the blocks.
- Slide 38's table cells are fragments, **some illustrative rather than quoted**: `v-if`, `v-else`,
  `:class`, and the `{{ }}` form all appear in the project, but `@submit.prevent`,
  `@click.once`, `v-for="m in list"`, and `:style` are generic examples — the project has no form
  submit, no `.once`, and no inline style binding.
- Slide 40's right-hand card shows the desugared form of `v-model` on a text input. It was written
  for the slide, not lifted from the project, and it **was itself type-checked**: pasted into a
  throwaway component in the same project, `pnpm type-check` exits 0 with the
  `($event.target as HTMLInputElement)` cast and fails without it —
  `error TS18047: '$event.target' is possibly 'null'` and
  `error TS2339: Property 'value' does not exist on type 'EventTarget'`. That is why the cast is on
  the slide and why its caption points back at chapter 2. The probe component was deleted and the
  project re-verified at exit 0 afterwards.
- Slide 42's two cards each splice a `// template` fragment under a `script` fragment from the same
  file, with the boundary marked by that comment. The parent card writes the `MemberCard` tag as
  `<MemberCard @toggle-bookmark="toggleBookmark" ... />` — the `...` stands for the two bindings
  slide 41 already showed, and the comment on the line above says so.
- Slide 43 shows the `onMounted` block and the `members` declaration together; in the file they are
  separated by the other declarations.

Every other Vue block in Part 4 is character-for-character from a file listed above. An earlier
draft silently stripped attributes from four component tags — `:is-bookmarked`,
`@toggle-bookmark`, `type="button"`, `placeholder` — and renamed a callback parameter, while this
section claimed the blocks were exact. Review caught it; the blocks were restored rather than the
claim weakened, because a participant copying slide 39's tag would otherwise get a card whose
bookmark button does nothing.

`MemberCard.vue`'s `<style scoped>` block exists in the project (it is what makes the
`card--bookmarked` border change observable) but is not quoted on any slide beyond slide 33's
skeleton.

## Primary References

All pages fetched **2026-07-28**.

### Node.js

- [About Node.js](https://nodejs.org/en/about)
  - Quoted verbatim on slide 07: "As an asynchronous event-driven JavaScript runtime, Node.js is
    designed to build scalable network applications."
  - The slide's framing of Node as "a second runtime, separate from the browser's JS engine" and
    the JVM/CPython analogy are **teaching simplifications**, labelled as such on slide 08. They
    are not quoted from this page.

### npm

- [package.json — npm Docs](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)
  - Quoted verbatim on slide 10: "Please do not put test harnesses or transpilers or other
    'development' time tools in your `dependencies` object."
  - Basis for slide 09's footnote: the `engines` field is advisory and produces warnings only,
    unless the user sets the `engine-strict` config flag.
  - Basis for the `dependencies` description: "Dependencies are specified in a simple object that
    maps a package name to a version range."
- [About semantic versioning — npm Docs](https://docs.npmjs.com/about-semantic-versioning)
  - Basis for slide 11: the caret (`^`) allows minor and patch updates; the tilde (`~`) restricts
    changes to patch releases only.
  - The concrete range walk-throughs on the slide (`3.5.27 → 3.9.0` accepted, `4.0.0` rejected;
    `5.9.3 → 5.9.9` accepted, `5.10.0` rejected) are worked examples of that rule applied to the
    two real `uniweb` ranges, not strings quoted from the page.

### pnpm

- [Motivation — pnpm](https://pnpm.io/motivation)
  - Quoted on slide 13: "all the files are saved in a single place on the disk", and "pnpm uses
    symlinks to add only the direct dependencies of the project into the root of the modules
    directory".
  - Basis for the slide's takeaway that an undeclared package is not importable: the page contrasts
    pnpm with npm and Yarn Classic, where "all packages are hoisted to the root of the modules
    directory. As a result, source code has access to dependencies that are not added as
    dependencies to the project."
- [Working with Git — pnpm](https://pnpm.io/git)
  - Quoted verbatim on slide 12: "You should always commit the lockfile (`pnpm-lock.yaml`)."
  - Also states the lockfile "enforces consistent installations and resolution between development,
    testing, and production environments".
- [`pnpm exec` — pnpm CLI](https://pnpm.io/cli/exec)
  - Basis for slide 14's first `npx` row: "`node_modules/.bin` is added to the `PATH`, so
    `pnpm exec` allows executing commands of dependencies."
- [`pnpm dlx` — pnpm CLI](https://pnpm.io/cli/dlx)
  - Basis for slide 14's second `npx` row: "Fetches a package from the registry without installing
    it as a dependency, hotloads it, and runs whatever default command binary it exposes."
  - Slide 14 splits `npx <bin>` into two rows because `npx` picks between these two behaviours by
    itself while pnpm does not. Mapping `npx` to `pnpm dlx` alone — as `docs/vue-lecture-plan.md`
    originally did — would teach participants to re-download a package that is already pinned in
    the project, and so possibly run a version the lockfile does not name. The plan document was
    corrected in the same change.
- [`pnpm run` — pnpm CLI](https://pnpm.io/cli/run)
  - Quoted verbatim on slide 14: "(ONLY for scripts that do not share the same name as already
    existing pnpm commands)", supporting the caution that `pnpm dev` works but a script named
    `add` needs `pnpm run add`.
  - The page also states that "all scripts get aliased in as pnpm commands, so ultimately
    `pnpm watch` is just shorthand for `pnpm run watch`".

The npm ↔ pnpm command table on slide 14 pairs each npm form with the pnpm equivalent given in
`docs/vue-lecture-plan.md` §4.1, which was itself built from the pnpm CLI documentation.

### TypeScript

- [typescriptlang.org](https://www.typescriptlang.org/)
  - Quoted verbatim on slide 17: "TypeScript is JavaScript with syntax for types." and
    "TypeScript becomes JavaScript via the delete key."
  - The page's own worked example is `type Result = "pass" | "fail"` with a
    `function verify(result: Result)` that compiles to `function verify(result)`. Slide 17's two
    cards reproduce that example rather than inventing one, so the "before" and "after" are the
    documentation's own pairing.
  - Slide 17's takeaway — that you cannot ask at runtime whether a value is a `Result` — is the
    stated consequence of erasure, phrased as teaching commentary rather than quoted.

### Vue — TypeScript

- [Using Vue with TypeScript — vuejs.org](https://vuejs.org/guide/typescript/overview.html)
  - Quoted verbatim on slide 21: "With a Vite-based setup, the dev server and the bundler are
    transpilation-only and do not perform any type-checking."
  - Basis for the whole of slide 21: "If using SFCs, use the `vue-tsc` utility for command line
    type checking and type declaration generation. `vue-tsc` is a wrapper around `tsc`,
    TypeScript's own command line interface. It works largely the same as `tsc` except that it
    supports Vue SFCs in addition to TypeScript files."
  - The page does **not** discuss `defineProps` type-only declarations, which slide 19 only
    forward-references ("props are written this way, chapter 4"). The claim itself belongs to
    chapter 4 and is not made on a slide in this part.

### Vue — Quick Start

- [Quick Start — vuejs.org](https://vuejs.org/guide/quick-start.html)
  - Quoted verbatim on slide 24: "This command will install and execute create-vue, the official
    Vue project scaffolding tool."
  - Source of the command itself, `pnpm create vue@latest`, shown on slide 24.
  - States the Node prerequisite as `^22.18.0 || >=24.12.0`. Slide 15 (chapter 1) already reconciles
    this with `uniweb`'s stricter `^24.13.0`; Part 3 does not repeat it.
  - **Its prompt list is stale.** See the rehearsal section above — slide 25 shows the real
    `create-vue@3.23.0` prompts and says so on the slide.

### Vue — Single-File Components

- [Single-File Components — vuejs.org](https://vuejs.org/guide/scaling-up/sfc.html)
  - Quoted verbatim on slide 33: "The `<template>`, `<script>`, and `<style>` blocks encapsulate and
    colocate the view, logic and styling of a component in the same file."
  - Quoted on slide 34: "SFC is a defining feature of Vue as a framework, and is the recommended
    approach for using Vue in … Any non-trivial frontend where a build step can be justified." The
    ellipsis drops two of the page's three listed scenarios (SPA and SSG); the kept one is the one
    that applies to this project.
  - Slide 33's framing — that the split moves from "by kind" to "by component" — is teaching
    commentary on the colocation sentence, not a quote.

### Vue — Reactivity

- [Reactivity Fundamentals — vuejs.org](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
  - Quoted verbatim on slide 35: "`ref()` takes the argument and returns it wrapped within a ref
    object with a `.value` property." and "refs are automatically unwrapped when used inside
    templates". The page qualifies the second with "(with a few caveats)"; the slide drops the
    parenthetical because the caveats are outside this lecture, and the rule as taught —
    `.value` in script, none in template — holds for every case in the project.
  - Quoted verbatim on slide 36: "Due to these limitations, we recommend using `ref()` as the
    primary API for declaring reactive state." This is the page's own conclusion, and it is why the
    project uses no `reactive()` at all. (An earlier draft rewrote this into the passive voice while
    leaving it inside quotation marks; review caught it before the deck shipped.)
  - Basis for slide 36's `reactive()` card: the page lists three limitations — object types only,
    cannot replace the whole object, and "Not destructure-friendly". The slide names the first and
    third.
- [Computed Properties — vuejs.org](https://vuejs.org/guide/essentials/computed.html)
  - Quoted verbatim on slide 36: "A computed property will only re-evaluate when some of its
    reactive dependencies have changed." and, of a method, "always run the function whenever a
    re-render happens."
  - Basis for slide 36's footnote: "computed getter functions should only perform pure computation
    and be free of side effects … don't mutate other state, make async requests, or mutate the DOM
    inside a computed getter!"

### Vue — Rendering and components

- [List Rendering — vuejs.org](https://vuejs.org/guide/essentials/list.html)
  - Quoted verbatim on slide 38: "It is recommended to provide a `key` attribute with `v-for`
    whenever possible" and the term "in-place patch".
  - Basis for the slide's "use the id, not the array index" note: the page explains that without a
    key Vue will "patch each element in-place and make sure it reflects what should be rendered at
    that particular index", which is "only suitable when your list render output does not rely on
    child component state or temporary DOM state (e.g. form input values)". The member list renders
    a child component with its own bookmark styling, so it is exactly the case the page excludes.
- [Style Guide, Priority A — vuejs.org](https://vuejs.org/style-guide/rules-essential.html)
  - Quoted verbatim on slide 39: "Never use `v-if` on the same element as `v-for`."
  - The page gives the computed-property filter as its first remedy — "replace `users` with a new
    computed property that returns your filtered list" — which is exactly what `visibleMembers` is.
    The slide makes that connection rather than teaching the `<template v-for>` wrapper, which the
    page offers as the second option. An earlier draft named the wrapper and cited the List
    Rendering page, which does not contain either remedy.
- [Props — vuejs.org](https://vuejs.org/guide/components/props.html)
  - Quoted verbatim on slide 40: "All props form a one-way-down binding … when the parent property
    updates, it will flow down to the child, but not the other way around." and "you should **not**
    attempt to mutate a prop inside a child component."
  - Quoted in slide 40's footnote: "the convention is using kebab-case in all cases to align with
    HTML attributes." The slide pairs this with `uniweb`'s own practice rather than presenting it as
    a house rule.
- [Lifecycle Hooks — vuejs.org](https://vuejs.org/guide/essentials/lifecycle.html)
  - Quoted verbatim on slide 42: "the `onMounted` hook can be used to run code after the component
    has finished the initial rendering and created the DOM nodes" and "This requires these hooks to
    be registered **synchronously** during component setup."

### Vite

- [Why Vite — vite.dev](https://vite.dev/guide/why.html)
  - Quoted on slide 30: "Source code … is served on-demand over native ESM." and "Vite used Hot
    Module Replacement (HMR) over native ESM to update just that module in the browser, without a
    full page reload."
  - Quoted on slide 31: "bundling is still necessary for optimized production builds", which the
    page gives as the reason a dev-time ESM pipeline is not shipped as-is: "Shipping it in
    production is still inefficient due to additional network round trips from nested imports."

## Stated Simplifications

The deck marks these as teaching simplifications rather than facts:

- The analogy table on slide 08 (Node ≈ JVM/CPython, npm registry ≈ Maven Central/PyPI/NuGet,
  `package.json` ≈ `pom.xml`/`pyproject.toml`, lockfile ≈ a pinned dependency list,
  `node_modules` ≈ an unpacked local dependency cache, Vite ≈ a build tool). The slide states in
  place that the mapping is close enough to start with and wrong if pushed hard.
- The member-directory application drawing on slide 01 is a **concept mockup built in HTML and
  CSS**, not a screenshot. The slide says so and points at chapter 3, where participants run the
  real application on their own machines.
- Slide 09's `package.json` card is an **excerpt**, labelled `발췌` in its title bar, with elided
  `scripts`, `dependencies`, and `devDependencies` marked in the code block. The real file carries
  16 scripts and both dependency blocks.
- Slide 13's takeaway is scoped with "기본 설정에서는". pnpm's isolated `node_modules` layout is the
  default, but `node-linker=hoisted` or a `public-hoist-pattern` setting relaxes it, after which
  undeclared packages can become importable again. The deck does not teach those settings.
- The "Vite" row of the analogy table on slide 08 carries a `3장` marker: it is previewed there and
  taught in chapter 3. Every other row on that table is resolved inside Part 1.
- Slide 18's "you rarely annotate variables in practice; you always annotate parameters" is a
  **teaching heuristic**, not a rule read from a style guide. It is true of the code this lecture
  writes and of `uniweb`, but it is stated as advice.
- Slide 19's `Member` interface is invented for the lecture project. Only the right-hand card on
  that slide is real `uniweb` code, and its title bar says so.
- Slide 22 reduces the plan's five deferred TypeScript topics to four cards by pairing `enum` with
  declaration merging. Nothing was dropped; the pairing is a layout decision.
- **No character in Part 3's terminal cards was invented, but rows were elided.** Slide 26's
  scaffolder card shortens one absolute path; its install card keeps 6 of 21 packages in the
  capture's own alphabetical order and marks the elision inline and in the footnote; slide 31 drops
  only the three progress lines. Each affected card says on the slide what was left out. Read this
  bullet as "nothing fabricated, some rows dropped" — not as "byte-identical".
- Slide 29's closing comparison with npm's hoisted layout is quoted reasoning from pnpm's
  motivation page, not a measurement — an npm install was not run during the rehearsal. The slide
  frames it as a comparison rather than as a captured number.

## Not Yet Verified

- Nothing in Parts 0–3 is currently unverified. Parts 4–8 have not been authored; their evidence
  will be recorded here as each ticket lands.
- Timing: the schedule in `docs/vue-lecture-plan.md` §3 is still an estimate. The rehearsal timed
  commands, not teaching, so no chapter duration in this deck has been measured against a room.
