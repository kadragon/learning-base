# Sources and Verification Notes

## Scope

This deck teaches SVN-experienced members of a small internal team how to use Git through
VS Code and a shared repository hosted at `git.knue.ac.kr`.

The Git hosting product and its exact pull-request terminology were not identified during deck
creation. The deck labels its remote-service screen as a conceptual interface and explicitly says
that the actual service may use either **Pull Request** or **Merge Request**.

## Primary References

### Git concepts and commands

- [Git Reference Manual](https://git-scm.com/docs)
  - Verified concepts: `git init`, `git clone`, `git status`, `git add`, `git commit`, `git fetch`,
    `git pull`, `git push`, `git merge`, and `git revert`.
- [Pro Git: Git Branching — Branches in a Nutshell](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
  - Verified concepts: commits as snapshots, branch pointers, `HEAD`, and branch movement.
- [Pro Git: Basic Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
  - Verified concepts: branching, merging, merge commits, and three-way merge behavior.
- [Pro Git: Branching Workflows](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows)
  - Verified concepts: short-lived topic branches and their applicability to projects of different
    sizes.
- [Pro Git: Distributed Workflows](https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows)
  - Verified concepts: shared repositories, distributed workflows, and integration patterns.

### VS Code source control

- [Source Control in VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview)
  - Verified UI concepts: Source Control view, staging, committing, branches, Source Control Graph,
    remote synchronization, and merge-conflict indicators.
- [Quickstart: Use Source Control in VS Code](https://code.visualstudio.com/docs/sourcecontrol/quickstart)
  - Verified UI paths: **Git: Clone**, **Initialize Repository**, save/edit/review, stage, commit,
    and individual pull/push actions.
- [Working with Repositories and Remotes](https://code.visualstudio.com/docs/sourcecontrol/repos-remotes)
  - Verified concepts: cloning, default `origin`, fetch, pull, push, Publish Branch, and Sync
    Changes combining pull and push.
- [Branches and Worktrees in VS Code](https://code.visualstudio.com/docs/sourcecontrol/branches-worktrees)
  - Verified UI concepts: branch creation and switching, publishing branches, and merge results.
- [Resolve Merge Conflicts in VS Code](https://code.visualstudio.com/docs/sourcecontrol/merge-conflicts)
  - Verified UI concepts: conflict markers, Current/Incoming changes, the three-way Merge Editor,
    staging resolved files, completing the merge commit, and aborting an unfinished merge.

## Local Webfont Assets

The repository self-hosts shared runtime fonts below the root `assets/fonts/` directory; the deck
does not load a font CDN during the presentation. Versioned paths let multiple decks share the same
cached files without copying font binaries into each deck.

### Pretendard Variable

- Source: [orioncactus/pretendard](https://github.com/orioncactus/pretendard)
- Release: `v1.3.9`
- Asset: `PretendardVariable.woff2`
- Use: Korean and body text, variable weight range
- SHA-256: `9599f12fd42fc0bce1cd50b47a0c022e108d7aa64dd0d1bb0ed44f3282d900b4`
- Shared asset: `assets/fonts/pretendard/1.3.9/PretendardVariable.woff2`
- License copy: `assets/fonts/pretendard/1.3.9/OFL.txt`

### Fraunces Variable

- Source: [undercasetype/Fraunces](https://github.com/undercasetype/Fraunces)
- Release: `1.000`
- Asset: `FrauncesVariable.woff2`
- Use: English display text, headings, and large numerals
- SHA-256: `25e420d8c154303e08322ea77f08997c4aade75653ef18425772ada5abacd0ce`
- Shared asset: `assets/fonts/fraunces/1.0/FrauncesVariable.woff2`
- License copy: `assets/fonts/fraunces/1.0/OFL.txt`

### Jetendard

- Source: [kuskhan/jetendard](https://github.com/kuskhan/jetendard)
- Release: `v0.1.0`
- Asset: `Jetendard-Regular.woff2`
- Use: commands, code, branch names, and terminal text
- SHA-256: `a92e12e86d773a41915a92dc87d113f13f954a688508060e4cc3fa93ed08f189`
- Shared asset: `assets/fonts/jetendard/0.1.0/Jetendard-Regular.woff2`
- License copy: `assets/fonts/jetendard/0.1.0/OFL.txt`

All three font projects distribute these assets under the SIL Open Font License 1.1. The bundled
license copies retain their copyright and reserved-name notices.

## Teaching Simplifications

- The deck uses a tree metaphor first. A Git commit history is more precisely a directed acyclic
  graph because merge commits can have multiple parents. The deck states this limitation.
- The deck translates SVN operations into approximate Git mental models. These are teaching
  comparisons, not one-to-one command equivalences.
- The VS Code and remote-hosting screens are stylized concept diagrams rather than screenshots.
  They demonstrate workflow state, not pixel-accurate product UI.
- The shared-repository workflow is a recommendation for the stated three-to-five-person internal
  team where members have feature-branch push permission. Fork-based collaboration remains
  appropriate when contributors lack write permission or policy requires isolation.
- Rebase, cherry-pick, stash, hard reset, force push, tags, submodules, and fork synchronization are
  intentionally deferred from the first lecture.

## Environment-Specific Items to Verify Before Delivery

- [ ] Exact `git.knue.ac.kr` product and version
- [ ] Whether the product says Pull Request or Merge Request
- [ ] Training repository URL
- [ ] HTTPS or SSH authentication method
- [ ] VPN or internal certificate requirements
- [ ] Participant clone and feature-branch push permissions
- [ ] `main` branch protection settings
- [ ] Reviewer and merge permissions
- [ ] Default merge strategy
- [ ] Final screenshots, if product-specific screenshots are added later
