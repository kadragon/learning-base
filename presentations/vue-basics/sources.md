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

Parts 2–8 (TypeScript, project scaffolding, Vue core concepts, Router, composables, Pinia, and the
`uniweb` mapping chapter) are not in the deck yet. They are tracked in `backlog.md`.

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

## Not Yet Verified

- The `pnpm create vue@latest` prompt list, its exact output, the generated file tree, and the
  dev-server URL. `docs/vue-lecture-plan.md` §4.3 records them as pending a rehearsal run. They
  belong to a later ticket and do **not** appear in this deck.
- `uniweb`'s own dev-server port and its `loc`/`dev`/`proc` mode split. Referenced in the lecture
  plan; not yet on a slide.
