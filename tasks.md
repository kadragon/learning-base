# Follow-up Tasks

## From QA of the practice-framing fix

- [ ] **Decide whether the pre-practice `git status` slide should reuse the exercise's own branch
      and file names** (`presentations/git-basics/index.html`, slide 09 · FIRST DIAGNOSTIC).
      The slide illustrates real `git status` output and quotes
      `Your branch is ahead of 'origin/feature/team-message' by 1 commit` plus `modified: team.md`.
      Both names belong to the guided exercise, and the ahead-count only exists after the push
      step, so this is the one remaining place a participant could read an ahead-count as their own
      current state. It sits in the concepts chapter with no imperative copy, so nothing is
      executable there and the VS Code orientation slides were already moved off the team repo.
      Either rename the branch and file in this mock to neutral placeholders, or keep the
      foreshadowing deliberately — a deck-owner framing call, not a defect.
