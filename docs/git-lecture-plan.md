# Git Lecture Plan for SVN-Experienced Small Teams

## 1. Lecture Overview

### Audience

- Department members who have used SVN
- A small team of approximately three to five people
- Developers who will use VS Code for daily Git work
- Users who can access the internal Git service at `git.knue.ac.kr`

### Duration

- Core lecture and demonstration: approximately 90 minutes
- Guided exercise and questions: approximately 20–30 minutes
- Maximum total duration: 120 minutes

### Learning Goals

By the end of the lecture, participants should be able to:

1. Explain the main differences between SVN and Git.
2. Describe commits and branches using the tree metaphor.
3. Distinguish the working tree, staging area, local repository, and remote repository.
4. Start a repository with either `git init` or `git clone`.
5. Use VS Code to inspect changes, stage changes, commit, and manage branches.
6. Complete the team workflow from cloning a repository to merging a pull request.
7. Resolve a merge conflict with the VS Code Merge Editor.
8. Update the local `main` branch and clean up a completed feature branch.

### Central Message

> A commit records work in the local repository. A push shares those commits with the team.

## 2. Teaching Approach

### Use One Continuous Story

Avoid teaching Git as a disconnected list of commands. Use one repository and one small change
throughout the lecture:

```text
clone
→ update main
→ create branch
→ edit
→ review diff
→ stage
→ commit
→ push
→ open pull request
→ resolve conflict
→ review
→ merge
→ update local main
→ delete branch
```

### Use the Tree Metaphor

- Commit: a node where the project history grows
- Parent commit: the previous node
- Branch: a movable label pointing to a commit
- `HEAD`: the current location
- Merge: a node that reconnects diverged branches
- Remote-tracking branch: the locally recorded state of a remote branch

The actual Git history is a directed acyclic graph rather than a strict tree because a merge
commit can have multiple parents. Introduce this detail only after the tree metaphor is understood.

### Show Concepts Behind VS Code Actions

Use VS Code for the practical work, but show the corresponding Git operation whenever an action
is introduced.

| VS Code action | Git operation | Meaning |
|---|---|---|
| Initialize Repository | `git init` | Create a new local repository |
| Clone Repository | `git clone` | Copy repository history and configure a remote |
| Stage Changes | `git add` | Select changes for the next commit |
| Commit | `git commit` | Record staged changes locally |
| Publish Branch | `git push -u` | Create and track the remote branch |
| Pull | `git pull` | Fetch remote commits and integrate them |
| Push | `git push` | Send local commits to the remote repository |

Do not begin with **Sync Changes**. It combines pull and push, which can hide the distinction
between receiving and sharing changes.

## 3. Recommended Schedule

| Section | Duration |
|---|---:|
| Opening and SVN-to-Git transition | 10 minutes |
| Git tree model | 10 minutes |
| Two ways to start a repository | 10 minutes |
| Four Git areas and the local work cycle | 15 minutes |
| Remote collaboration exercise | 30 minutes |
| Conflict exercise | 20 minutes |
| Review, merge, and cleanup | 10 minutes |
| Team workflow and summary | 5 minutes |
| Core total | 110 minutes |
| Optional questions | 10 minutes |
| Maximum total | 120 minutes |

For a 60–90 minute version, demonstrate the conflict instead of having every participant reproduce
it, and shorten the pull request review discussion.

## 4. Detailed Lecture Outline

### 4.1 Opening: Why Git?

#### Topics

- The `final`, `final-2`, and `really-final` file problem
- Change history, collaboration, review, and recovery
- Git as the version-control system
- `git.knue.ac.kr` as the service that hosts and shares Git repositories

#### Key distinction

Git and the Git hosting service are related but different:

```text
Git                         git.knue.ac.kr
Version-control system      Repository hosting and collaboration service
Local history               Shared repositories
Branches and commits        Accounts, permissions, pull requests, and reviews
```

### 4.2 SVN and Git

#### Comparison

| SVN mental model | Git mental model |
|---|---|
| The central repository is the primary history | Each clone contains the repository history |
| Commit immediately changes the shared repository | Commit records locally; push shares |
| Update receives shared changes | Fetch observes; pull fetches and integrates |
| Global revision number | Commit hash |
| Branches are commonly treated as directory copies | Branches are lightweight commit pointers |
| Network connection is commonly needed for history operations | Most history operations are local |

#### SVN terminology warning

SVN `checkout` and Git `checkout` are not equivalent:

- SVN `checkout`: obtain a working copy from the server
- Git `clone`: obtain a local repository and working tree
- Git `switch`: move between branches

Prefer `git switch` in beginner material because `git checkout` has several unrelated roles.

### 4.3 Git as a Growing Tree

Start with a linear history:

```text
A──B──C  main
```

Create a feature branch:

```text
A──B──C  main
       \
        D──E  feature/member-page
```

Merge the feature:

```text
A──B──C──────M  main
       \    /
        D──E
```

#### Concepts

- A commit stores a project snapshot and points to its parent.
- A branch is not a copied project directory.
- A branch name moves when a new commit is created on that branch.
- `HEAD` identifies the currently checked-out branch or commit.
- Deleting a merged branch removes a label, not the merged commits.

### 4.4 Two Ways to Start

#### New local project: initialize

Use a temporary empty folder in VS Code:

```text
Source Control → Initialize Repository
```

Equivalent command:

```bash
git init
```

Demonstrate:

1. Open an empty folder.
2. Initialize the repository.
3. Explain that the hidden `.git` directory contains repository metadata and history.
4. Create and save a file.
5. Stage and create the first commit.

#### Existing remote project: clone

Use the prepared training repository:

```text
Command Palette → Git: Clone
```

Equivalent command:

```bash
git clone <repository-url>
```

Explain that cloning performs several actions:

1. Creates a local directory.
2. Creates the local Git repository.
3. Downloads the commit history.
4. Configures the remote named `origin`.
5. Checks out the default branch.

#### Critical rule

`git init` and `git clone` are alternative starting paths. Do not run `git init` inside a
repository that was already cloned.

### 4.5 The Four Git Areas

```text
Working Tree → Staging Area → Local Repository → Remote Repository
                git add        git commit          git push
```

#### Working tree

- Files currently being edited
- Saved and unsaved editor content must be distinguished
- Unsaved VS Code content is not yet a filesystem change that Git can record

#### Staging area

- Selection of changes for the next commit
- Allows unrelated changes to be separated
- Provides a final review point before committing

#### Local repository

- Local commits and history
- Available without sending changes to the server

#### Remote repository

- Shared team history
- Receives commits through push
- Provides branches for pull requests and reviews

### 4.6 Basic VS Code Work Cycle

Use a small saved edit:

1. Modify a file.
2. Save the file.
3. Open Source Control.
4. Inspect the unstaged diff.
5. Stage the intended change.
6. Inspect the staged diff.
7. Write a focused commit message.
8. Commit.
9. Inspect the Source Control Graph.

#### Status-first troubleshooting

Teach `git status` as the first diagnostic command:

```bash
git status
```

It answers:

- Which branch is active?
- Which files changed?
- Which changes are staged?
- Is a merge in progress?
- Is the local branch ahead of or behind its upstream?

### 4.7 `.gitignore`

Introduce `.gitignore` before the remote exercise.

Common candidates:

- Build output
- Dependency caches
- Temporary files
- Editor-specific local state
- Environment files that contain local settings

Security rule:

> Passwords, access tokens, private keys, and other credentials must never be committed.

Explain that adding an already tracked file to `.gitignore` does not remove it from history.

## 5. End-to-End Exercise on `git.knue.ac.kr`

### 5.1 Exercise Scenario

Use a dedicated training repository with a simple Markdown file:

```markdown
# Team Introduction

Department: Example Department
Message: We build services together.
```

Each participant changes a small, clearly assigned part. The exercise should remain focused on
Git rather than application code.

### 5.2 Clone the Repository

In VS Code:

1. Run **Git: Clone**.
2. Enter the training repository URL from `git.knue.ac.kr`.
3. Select a local parent directory.
4. Open the cloned repository.
5. Trust the workspace only if the repository and its contents are expected.

Verify:

- The current branch is `main`.
- The commit history is visible.
- The remote is named `origin`.
- The working tree is clean.

### 5.3 Update `main`

Before starting work:

1. Switch to `main`.
2. Pull the latest remote changes.
3. Confirm that the working tree is clean.

Teaching point:

> Start a new branch from the latest agreed team state.

### 5.4 Create a Feature Branch

Example branch names:

```text
feature/123-add-member
fix/kadragon-login-error
docs/git-training
```

In VS Code:

1. Select the branch name in the status bar.
2. Choose **Create new branch**.
3. Enter the exercise branch name.
4. Confirm that the new branch is active.

Avoid having all participants use the same branch name.

### 5.5 Edit and Save

1. Open the exercise file.
2. Make the assigned change.
3. Save the file.
4. Confirm that the file appears under Source Control changes.

### 5.6 Review and Stage

1. Open the file diff.
2. Confirm that only the intended lines changed.
3. Stage the change.
4. Review the staged diff again.

Discuss accidental changes:

- Unrelated formatting
- Editor-generated files
- Temporary files
- Credentials or private information

### 5.7 Commit

Example:

```text
Update team introduction
```

A useful beginner rule:

- One commit should represent one understandable purpose.
- The message should describe the change, not the act of editing.

After committing, confirm:

- The change no longer appears as uncommitted.
- The commit appears in the graph.
- The commit exists only locally at this point.

### 5.8 Push the Branch

Use **Publish Branch** in VS Code.

Explain:

- A branch with the same name is created in `origin`.
- The local branch begins tracking the remote branch.
- The commit is now shared but is not yet part of `main`.

### 5.9 Open a Pull Request

Open `git.knue.ac.kr` in a browser:

1. Select the pushed feature branch as the source.
2. Select `main` as the target.
3. Review the changed files and diff.
4. Write a clear title and short description.
5. Assign a reviewer.
6. Open the pull request.

The hosting product may call this a **Merge Request** instead of a **Pull Request**. Verify the
actual product and user interface before producing final screenshots.

#### Suggested pull request description

```markdown
## What changed

- Updated the team introduction message

## How to verify

- Read the rendered introduction and confirm the new text
```

### 5.10 Review

The reviewer checks:

- The source and target branches
- The actual diff
- Unrelated changes
- Whether the change matches its stated purpose
- Whether the result can be merged safely

For a small internal team, a single reviewer is generally sufficient unless the change is
high-risk.

## 6. Deterministic Conflict Exercise

### 6.1 Prepare the Conflict

Do not rely on an accidental conflict.

1. Participants create their branches from the same initial `main`.
2. The instructor changes the `Message` line on `main` and merges it first.
3. A participant's feature branch changes the same line differently.
4. The pull request reports a conflict.

Example:

```text
main:    Message: We develop safely together.
feature: Message: We enjoy developing together.
```

Use one instructor change and one participant branch for the live demonstration. Allowing every
participant to change the same line at once can create an uncontrolled exercise.

### 6.2 Bring `main` into the Feature Branch

Use merge rather than rebase in the introductory lecture:

1. Stay on the feature branch.
2. Fetch or pull the latest remote information.
3. Merge the latest `main` into the feature branch.
4. Observe the conflict state.

Conceptual command sequence:

```bash
git fetch origin
git merge origin/main
```

### 6.3 Resolve in VS Code

1. Open the conflicted file.
2. Open the VS Code Merge Editor.
3. Compare **Current**, **Incoming**, and **Result**.
4. Decide the correct final content.
5. Save the result.
6. Confirm that conflict markers are gone.
7. Stage the resolved file.
8. Verify the result.
9. Complete the merge commit.
10. Push the updated feature branch.

Key message:

> Resolving a conflict is not blindly selecting one side. It is deciding the correct final
> content.

If the merge was started incorrectly, demonstrate that it can be stopped before completion:

```bash
git merge --abort
```

### 6.4 Confirm the Pull Request

After pushing:

- The existing pull request updates automatically.
- The conflict warning disappears.
- The diff must be reviewed again.
- The pull request is ready for approval and merge.

## 7. Merge and Cleanup

### 7.1 Merge the Pull Request

1. Confirm reviewer approval.
2. Confirm there are no unresolved conflicts.
3. Merge into `main`.
4. Delete the remote feature branch.

The team should choose one default merge strategy. For a beginner lecture, explain the repository's
actual strategy without comparing every possible strategy in depth.

### 7.2 Update the Local Repository

The exercise is not finished when the server merge completes:

1. Switch to local `main`.
2. Pull the merged changes.
3. Confirm the merge result in the graph.
4. Delete the local feature branch.
5. Confirm that the working tree is clean.

Completion state:

```text
Remote main contains the change.
Local main contains the change.
The working tree is clean.
The completed feature branch is removed.
```

## 8. Recommended Team Workflow

For a team of three to five members, use one shared repository with short-lived feature branches.

```text
main
├── feature/123-add-search
├── fix/124-login-error
└── docs/125-api-guide
```

### Repository rules

- Give team members permission to push feature branches.
- Protect `main` from direct pushes.
- Merge through pull requests.
- Require at least one reviewer.
- Keep pull requests small.
- Resolve conflicts before merge.
- Run available automated checks before merge.
- Delete completed branches.

### Daily workflow

```text
1. Update main.
2. Create a short-lived branch.
3. Make and review a focused change.
4. Stage and commit.
5. Push the branch.
6. Open a pull request.
7. Review and resolve conflicts.
8. Merge.
9. Update local main.
10. Delete the completed branch.
```

## 9. Fork-Based Collaboration

Fork-based collaboration is not part of the practical exercise.

It is mainly useful when:

- A contributor does not have write permission to the original repository.
- External contributors work on an open-source project.
- Organization policy requires personal repository isolation.
- Untrusted changes must not be pushed to branches in the original repository.

For this small internal team, the recommended workflow is:

```text
clone the shared repository
→ push a feature branch to the shared repository
→ open a pull request to main
```

Mention forks briefly at the end, but do not add `origin`/`upstream` fork synchronization to the
first lecture.

## 10. Recovery and Safety

Introduce only the recovery paths needed for the exercise:

- Inspect the current state with `git status`.
- Inspect changes with `git diff`.
- Abort an unfinished merge with `git merge --abort`.
- Revert a shared commit with a new commit when necessary.

Warn against using these commands without understanding their effects:

```text
git reset --hard
git push --force
```

Team rule:

> Prefer adding a corrective commit over rewriting history that has already been pushed.

## 11. Pre-Lecture Checklist

### Instructor

- [ ] Create a dedicated training repository.
- [ ] Verify the exact repository URL.
- [ ] Identify whether the service uses the term Pull Request or Merge Request.
- [ ] Confirm participant accounts.
- [ ] Confirm clone and feature-branch push permissions.
- [ ] Protect `main` from direct push.
- [ ] Confirm reviewer and merge permissions.
- [ ] Choose HTTPS or SSH authentication for the exercise.
- [ ] Test authentication from the lecture environment.
- [ ] Check VPN and internal certificate requirements.
- [ ] Prepare the starter file and initial commit.
- [ ] Prepare the instructor commit that will cause the conflict.
- [ ] Rehearse the complete exercise with a test account.
- [ ] Capture fallback screenshots in case the service is unavailable.

### Participants

- [ ] Install Git.
- [ ] Install VS Code.
- [ ] Confirm access to `git.knue.ac.kr`.
- [ ] Confirm Git user name and email.
- [ ] Complete any required authentication setup.
- [ ] Confirm that the training repository can be cloned.

Configuration check:

```bash
git config --global user.name
git config --global user.email
```

## 12. HTML Slide Guidance

### Recommended slide count

- Approximately 30–35 slides for the full version
- Approximately 20–25 slides for the compressed version

### Slide design pattern

Repeat the following sequence:

1. Explain one concept.
2. Show the corresponding tree change.
3. Demonstrate the VS Code action.
4. Show the resulting repository state.

### Visual states worth animating

- Repository before and after `git init`
- Local repository created by `git clone`
- Working tree → staging area → local repository → remote repository
- Branch pointer moving after a commit
- Local branch appearing on the remote after push
- Feature branch and `main` diverging
- Conflict caused by changes to the same line
- Merge commit reconnecting the branches
- Local `main` catching up after pull

### One-message-per-slide examples

- "Commit records locally; push shares remotely."
- "A branch is a movable label, not a directory copy."
- "Stage what belongs in the next commit."
- "A conflict asks a person to decide the final content."
- "A server-side merge does not update your local `main`."

## 13. Topics Deferred to a Follow-Up Lecture

Do not teach these operations in depth during the first lecture:

- Rebase
- Cherry-pick
- Stash
- Hard reset
- Force push
- Tags
- Submodules
- Fork synchronization
- Complex Git Flow

They may be named as future topics, but the first lecture should prioritize a complete and safe
daily workflow.

## 14. Final Summary

Participants should leave with this mental checklist:

```text
Where am I?          Check the current branch.
What changed?        Review the diff.
What will I record?  Review staged changes.
Did I record it?     Commit locally.
Did I share it?      Push the branch.
Can the team review? Open a pull request.
Is it integrated?    Merge after review.
Am I current?        Pull the merged main branch.
Is work complete?    Confirm clean status and delete the branch.
```
