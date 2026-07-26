# Follow-up Tasks

## From review of PR #3 (feat/vscode-basics-slides)

- [ ] **Clarify that the "VS CODE 01–05" slides are a UI tour, not do-now steps**
      (`presentations/git-basics/index.html`, slides 10–14).
      Those five slides sit inside the chapter labeled `GUIDED PRACTICE` and use imperative copy
      ("클릭", "선택", "입력 후 Enter", "Publish Branch 버튼으로 원격에 게시"), yet none carries a
      `✓ 통과 기준` checkpoint — the deck's own marker for an executable step, present on
      STEP 01/02/04/06. Slide 10 also shows the `training` project already open, a post-clone state
      that appears before STEP 01 · CLONE. Nothing breaks today, but a participant could try to
      execute slide 14 before cloning. Add an explicit "둘러보기" / "따라 하지 말고 위치만 확인"
      label to the VS CODE chapter, or move the tour ahead of the practice divider.
      Out of scope for the review cycle: it is a slide-ordering / framing decision for the deck
      owner, not a defect fix.

- [ ] **Decide when `Publish Branch` happens, then fix the STEP 04 pass criterion**
      (`presentations/git-basics/index.html:761`, mock at `:555`).
      STEP 04's checkpoint says the status bar should read `↻ 0↓ 1↑`, but the deck's own slide 20
      states 원격 미공유 상태 and `Publish Branch` is not performed until STEP 06 (`:842`). For an
      unpublished branch VS Code shows the cloud `Publish Branch` affordance, not ahead/behind sync
      counts, so the stated criterion cannot appear yet — unless the participant already published
      at branch creation, which the VS CODE tour slide suggests (`:606`). Two mutually exclusive
      readings. Pick one: either publish at branch creation (and relabel slide 20), or keep publish
      at STEP 06 and change the STEP 04 criterion to the pre-publish state.

- [ ] **Resolve the two competing step numberings between the recap and the practice eyebrows**
      (`presentations/git-basics/index.html:1263` recap track vs `STEP 01–09` eyebrows).
      The recap headline says the 10 hands-on steps are the 6-step map expanded and 새로 늘어난
      것은 없습니다, but `.gitignore` — a full practice step at STEP 05 (`:766`) — is absent from
      the recap track. The numbering also collides: recap 5 = commit while practice STEP 05 =
      gitignore. Either add gitignore to the recap as an aside outside the 6-step map, or drop the
      numeric prefixes from the practice eyebrows so only one scheme is presented.
