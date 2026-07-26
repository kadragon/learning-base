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
