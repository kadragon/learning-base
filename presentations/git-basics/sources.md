# Sources and Verification Notes

## Scope

This deck teaches SVN-experienced members of a small internal team how to use Git through
VS Code and a shared repository hosted at `git.knue.ac.kr`.

The hosting product was identified by the deck owner as **Gitea / Forgejo**, so the deck uses
Gitea's **Pull Request** terminology throughout. The remote-service screen remains a stylized
concept diagram; the deck states that the layout can differ by Gitea version.

The deck owner also fixed the exercise review rule: participants work in **pairs**, each reviews
the partner's pull request, and the **PR author merges after approval**. This is stated on the
practice chapter divider, the pull-request slide, and the review-and-merge slide.

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

### Command output verified by execution

Captured locally with `git version 2.50.1 (Apple Git-155)` in a throwaway repository on
2026-07-26. Every string quoted on the `git status` slide, the conflict-marker slide, and the
error-message slide was copied from this run rather than written from memory.

- `git status` with one staged modification while the branch is ahead by one commit prints the
  branch line, then `Your branch is ahead of 'origin/<branch>' by 1 commit.`, then the
  `(use "git push" to publish your local commits)` hint, then `Changes to be committed:` with the
  `(use "git restore --staged <file>..." to unstage)` hint and a tab-indented `modified:   <file>`.
  The deck previously showed the staged block before the ahead/behind line, which does not match
  real output; the slide now follows the real order.
- Conflict markers are written as `<<<<<<< HEAD`, `=======`, and `>>>>>>> origin/main` when
  `origin/main` is merged into a feature branch.
- Merge conflict output: `CONFLICT (content): Merge conflict in team.md` followed by
  `Automatic merge failed; fix conflicts and then commit the result.`
- Rejected push: ` ! [rejected]        main -> main (non-fast-forward)` plus the hint
  `Updates were rejected because the tip of your current branch is behind its remote counterpart.`
- Unset identity: `*** Please tell me who you are.` with the `git config --global user.email` /
  `user.name` remedy lines.
- Dirty working tree during merge: `error: Your local changes to the following files would be
  overwritten by merge:` followed by `Please commit your changes or stash them before you merge.`
- Outside a repository: `fatal: not a git repository (or any of the parent directories): .git`
- A file that is already tracked stays tracked after its name is added to `.gitignore`; it keeps
  appearing as `M` in `git status`. This is the caveat stated on the `.gitignore` slide.
- `git revert <merge-commit>` without `-m` fails: `error: commit <sha> is a merge but no -m option
  was given.` / `fatal: revert failed` (exit 128). The merge slide's safety note therefore shows
  `git revert -m 1 <커밋>` and tells participants to call the instructor rather than quoting a bare
  `git revert`.
- `git fetch origin` updates **every** remote-tracking ref matched by the remote's fetch refspec,
  not just `origin/main`. With two changed remote branches the run printed both
  `main -> origin/main` and `topic -> origin/topic`. The fetch slide therefore says
  "`origin/`으로 시작하는 원격 추적 포인터" rather than naming `origin/main` alone.

Authentication failure text was **not** captured, so the error-message slide describes that row in
prose ("로그인 창이 반복해서 뜨거나 인증에 실패") instead of quoting a message.

### Ignore rules

- [gitignore Reference](https://git-scm.com/docs/gitignore)
  - Verified concepts: one pattern per line, `#` comment lines, `*` matching anything except a
    slash, a trailing `/` restricting a pattern to directories, and the explicit statement that
    "files already tracked by Git are not affected" — the caveat shown on the slide.

### Gitea

- [Gitea Docs: Pull Request](https://docs.gitea.com/usage/pull-request)
  - Verified UI path: the **Pull Requests** tab, the **New Pull Request** button, the title and
    description fields, and the **Create Pull Request** button.
- [Gitea Docs: Merge Message Templates](https://docs.gitea.com/usage/merge-message-templates)
  - Verified concepts: the merge styles a repository can allow (merge, rebase, rebase-merge,
    squash, manually-merged, rebase-update-only). The deck names only merge, rebase, and squash and
    says the repository settings decide which are offered.
  - Not verified: the exact merge button label and the reviewer-picker label in the running server
    version, so the deck does not quote them.

### VS Code source control

- [Source Control in VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview)
  - Verified UI concepts: Source Control view, staging, committing, branches, Source Control Graph,
    remote synchronization, and merge-conflict indicators.
- [Quickstart: Use Source Control in VS Code](https://code.visualstudio.com/docs/sourcecontrol/quickstart)
  - Verified UI paths: **File > Open Folder**, opening the Source Control view with `Ctrl+Shift+G` /
    `⌃⇧G`, **Git: Clone**, **Initialize Repository**, save/edit/review, stage, commit, and
    individual pull/push actions.
  - Verified file badges: `U` for untracked and `M` for modified files listed under **Changes**,
    which move to **Staged Changes** after staging with the **+** button.
- [Working with Repositories and Remotes](https://code.visualstudio.com/docs/sourcecontrol/repos-remotes)
  - Verified concepts: cloning, default `origin`, fetch, pull, push, Publish Branch, and Sync
    Changes combining pull and push.
- [Branches and Worktrees in VS Code](https://code.visualstudio.com/docs/sourcecontrol/branches-worktrees)
  - Verified UI concepts: branch creation and switching, publishing branches, and merge results.
  - Verified branch-creation paths: the status bar branch indicator, the branch picker in the Source
    Control view, the **Git: Create Branch** and **Git: Checkout to** commands, **Publish Branch**,
    and the warning that Git may block a switch while uncommitted changes exist.
- [VS Code User Interface](https://code.visualstudio.com/docs/getstarted/userinterface)
  - Verified UI concepts: the Activity Bar on the far left switching views (Explorer, Search, Source
    Control, Run and Debug, Extensions, plus extension-contributed views), Primary Side Bar, Editor,
    Panel, and Status Bar regions, and the `Ctrl+B` / `⌘B` Primary Side Bar toggle.
- [Default Keyboard Shortcuts Reference](https://code.visualstudio.com/docs/reference/default-keybindings)
  - Verified default keybindings used on the Activity Bar slide: Explorer `Ctrl+Shift+E` / `⇧⌘E`,
    Search `Ctrl+Shift+F` / `⇧⌘F`, Source Control `Ctrl+Shift+G` / `⌃⇧G`, Run `Ctrl+Shift+D` /
    `⇧⌘D`, Extensions `Ctrl+Shift+X` / `⇧⌘X`, Show All Commands `Ctrl+Shift+P` / `⇧⌘P`, Toggle
    Sidebar `Ctrl+B` / `⌘B`, Toggle Terminal `` Ctrl+` `` / `` ⌃` ``.
- [Terminal Basics](https://code.visualstudio.com/docs/terminal/basics)
  - Verified UI paths: **Terminal > New Terminal**, the **View: Toggle Terminal** command,
    `` Ctrl+` `` toggle and `` Ctrl+Shift+` `` new-terminal shortcuts, and the terminal starting at
    the root of the opened workspace.
- [Resolve Merge Conflicts in VS Code](https://code.visualstudio.com/docs/sourcecontrol/merge-conflicts)
  - Verified UI concepts: conflict markers, Current/Incoming changes, the three-way Merge Editor,
    staging resolved files, completing the merge commit, and aborting an unfinished merge.
  - Verified for the resolve slide: the Result panel can be edited directly by placing the cursor
    in it and typing, and the editor also offers **Accept Combination** alongside Accept
    Current / Accept Incoming / Ignore. The earlier version of the slide showed a combined result
    that neither Accept button produces, with no explanation of how to reach it.

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
- Rebase, cherry-pick, stash, hard reset, force push, tags, and fork synchronization are
  intentionally deferred from the first lecture. The deck now names that boundary out loud on a
  "not today" slide so participants know what exists and when it becomes relevant. `.gitignore` was
  moved out of the deferred list and taught as a full step, because participants need it within the
  first week.
- `git init` moved to an appendix slide after the closing Q&A. The guided practice runs on `clone`
  only, so participants keep a single working folder; the appendix covers new projects and the
  fallback path when the server is unreachable.
- The lecture is framed as one six-step map (clone → branch → commit → push → PR → merge). The
  cover, the destination slide, and the recap all use that map; the recap states explicitly that its
  ten hands-on steps are the same six expanded, not new material.
- The commit-message guidance (state what and why, roughly 50 characters, avoid contentless
  messages) is a team convention offered as a starting point, not a rule enforced by Git.
- The time budget on the destination slide (30 min concepts, 55 min practice, 15 min team rules,
  10 min Q&A) is a plan for the stated 110-minute session, not a measured figure.
- Per-step "통과 기준" checkpoints describe what the VS Code status bar and Source Control panel
  should show. They are teaching heuristics for scanning a classroom, not Git guarantees.
- The VS Code basics slides list default keybindings. Participants who remapped keys, use a
  keymap extension, or run a different VS Code version may see different shortcuts; the menu and
  Command Palette paths are given alongside every shortcut for that reason.
- The Activity Bar slide shows the five built-in views in their default order. Installed extensions
  can add icons, and the Activity Bar can be moved or hidden through workbench settings.

## Environment-Specific Items to Verify Before Delivery

Resolved:

- [x] Hosting product — Gitea / Forgejo, confirmed by the deck owner
- [x] Pull Request vs Merge Request — Gitea says Pull Request
- [x] Review and merge rule for the exercise — pairs review each other, PR author merges

Still open:

- [ ] Gitea version running on `git.knue.ac.kr`, and whether its PR screen matches the slide
- [ ] Training repository URL
- [ ] HTTPS or SSH authentication method, and the exact wording of an auth failure on this server
- [ ] VPN or internal certificate requirements
- [ ] Participant clone and feature-branch push permissions
- [ ] `main` branch protection settings
- [ ] Which merge styles the repository allows (merge / rebase / squash)
- [ ] Instructor conflict script — when the instructor pushes the `main` change that triggers the
      planned conflict, and what participants who cloned late should do
- [ ] Final screenshots, if product-specific screenshots are added later
