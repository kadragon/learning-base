# Sources and Verification — LLM and WRKS AI

Public sources checked on 2026-09-07. Korean copy is paraphrased. Teaching examples, timing allocations, metaphors, prompts, and the fictional meeting are authored illustrations, not empirical results. No account-specific UI or response was captured. The deck makes no price, current-best-model, security certification, or measured productivity claim.

## Slide `llm-model`, `model-service`, `tokens`, `next-token`, `training-context`

- https://developers.openai.com/api/docs/guides/text — models accept prompts and produce text; model and service distinction.
- https://developers.openai.com/api/docs/guides/prompt-engineering — token generation, prompt instructions, context and model differences.
- https://platform.openai.com/tokenizer — optional live tokenization tool. The public tool shell was reachable; no token count was measured for this deck. Token boundaries and probabilities are deliberately not presented as measured values.
- https://learn.chatgpt.com/ — ChatGPT as a user-facing service with model-backed features.
- https://models.wrks.ai/ — official listing of models from multiple providers. This does not establish an institution's enabled models.
- Work-desk metaphors are simplifications. The next-token interaction offers two authored contexts and three candidate branches per context, with word-like display pieces. No actual tokenizer, model, probability calculation, network call, or stochastic sampling is used. Real generation need not always choose the highest-probability token.
- Reading a document in context is not immediate model-weight training. Storage and possible later training use are separate, policy-dependent issues; no WRKS-specific policy is asserted. This caveat is now stated **on the slide** rather than only in speaker notes, because reviewers read the unqualified takeaway as permission to upload material.
- `next-token`'s on-screen candidates are word-like groups chosen for readability. The slide discloses that the example is not an actual model, probability calculation, or token split; speaker notes distinguish display chunks from actual token boundaries. No concrete token counterexample or measured boundary is presented.
- `tokens` and `next-token` carry a "심화" marker: they are the first omissions in the 90-minute path.

## Slide `hallucination-why`, `hallucination-example`, `verify`

- https://openai.com/index/why-language-models-hallucinate/ — published 2025-09-05. Explains pretraining's prediction objective, the difficulty of sparse arbitrary facts, and incentives to guess rather than abstain. Evaluation incentives influence development and selection; an evaluation is not the direct runtime cause of a hallucination.
- https://developers.openai.com/api/docs/guides/prompt-engineering — explicit constraints and relevant reference material support output quality, without guaranteeing truth.
- The fictional incorrect answer and the correction are authored examples, not observed model outputs. The deck distinguishes fluency from truth and describes mitigation, not elimination. Independent source checks are recommended; neither repeated reassurance nor agreement between models proves accuracy.

## Slide `context`, `context-efficiency`, `context-quality`

- https://developers.openai.com/api/docs/guides/conversation-state — context windows, conversation inputs, and context management. The interface's full visible history need not equal the exact model input. Service-specific summarization, retrieval and truncation are not verified here. The slide now states that the window is counted **in tokens** and spans input and output together, completing the link the `tokens` takeaway promised.
- `context-efficiency` compares usage, latency, answer quality and total work time, including human review. The review-time examples describe a possible effect of irrelevant or incorrect output; this is a teaching explanation, not a measured productivity result.
- `hallucination-why`'s speaker notes describe incentives that encourage guessing alongside the training objective and information limits. The published explanation is about development and evaluation incentives, not a runtime mechanism.
- https://developers.openai.com/api/docs/guides/prompt-engineering — context relevance, limits and prompt caching considerations.
- https://arxiv.org/abs/2307.03172 — Liu et al., _Lost in the Middle: How Language Models Use Long Contexts_, submitted 2023, published in TACL 2024. Studies multi-document question answering and key-value retrieval; relevant-information position affects performance in evaluated models. Not a universal degradation percentage or threshold for current models. The strip is a conceptual arrangement, not a quantitative chart.
- Cost, latency and answer quality are separate dimensions. More processed input can increase work; actual cost and delay depend on models, caching, output, tools, service processing and plans. No WRKS billing or cache implementation is assumed. Relevant long context can improve answers; length alone is not evidence of degradation.
- https://developers.openai.com/api/docs/guides/latency-optimization — input and output processing contribute differently to latency; the deck does not assert a universal proportional slowdown from input length.

## Slide `new-chat`, `handoff`, `prompt`, `refine`, `data-boundary`

- https://developers.openai.com/api/docs/guides/prompt-engineering — clear goals, instructions and relevant information.
- https://developers.openai.com/api/docs/guides/conversation-state — keeping and managing prior context.
- Chat splitting and handoff are practical teaching recommendations, not technical requirements or measured comparative claims. Same-task continuity is useful; different tasks can benefit from separation. Summaries must be checked and needed source material supplied again.
- A new conversation is not asserted to clear service-level memory, shared instructions, retention, or institutional settings. No specific WRKS memory feature is claimed.
- The four-part prompt template is an authored instructional checklist, not an official standard. Data handling advice requires institution-specific authorization and policies; this deck does not certify any material for upload.

## Slide `data-checklist`, `accountability` — added after persona review

- These two slides carry **no external source**. They are authored institutional guidance for this deck, added because reviewers found `data-boundary` deferred every question to "check your institution's rules" without naming the rules, the contact, or the prohibited work.
- `data-checklist` now presents three handling buckets: institution-permitted examples, materials not to enter, and materials to verify before use. It omits institution-specific fill-in fields and does not assert retention, administrator access, or processing location.
- Conversation retention period, administrator read access, and processing server location remain unverified instructor-preflight questions because `https://docs.wrks.ai/user-guide` could not be retrieved and no institutional contract was available. They are not displayed on the current slide and are not asserted as known risks.
- The categories listed as "do not enter" (identifiers, sensitive records, confidential contracts and unpublished procurement material) are conventional handling categories, not quotations from a specific statute. The slide does not cite a statute, article, or certification, and speaker notes state that institutional rules take precedence and that the deck is not legal advice.
- `accountability` describes the deck's practical recommendation: author and approver confirmation procedures still apply, some judgments are not delegated, drafts are labelled, and source evidence is retained. No claim is made about any institution's existing AI policy, audit outcome, or liability rule. Time savings are framed as a comparison of drafting plus review, not as a measured result.

## Slide `practice-setup`, `practice-apply`, `session-plan` — added after persona review

- All prompts on `practice-apply` are authored illustrations and are marked as fixtures for four job families named by reviewers (official correspondence, public enquiry replies, numeric reconciliation, long documents and translation). They are request skeletons, not tested prompts, and no model output is shown for any of them.
- The numeric-work card deliberately instructs attendees **not** to delegate calculation, matching this deck's existing position that arithmetic is checked against a verifiable tool.
- `practice-setup` assumes some attendees will fail to sign in. The 15-minute access buffer and the pair-work fallback are scheduling recommendations from instructional practice, not measured figures.
- `session-plan` timings are the authors' estimates for a 120-minute default and a 90-minute reduced path. They are not observed timings; no delivery of this deck has been timed. Slides marked "심화" in the eyebrow are the reduced path's omissions.
- The closing self-check and satisfaction items are authored evaluation prompts. The deck still collects no per-attendee response; the quiz remains unscored across attendees and is not an attendance or completion record.

## Slide `wrks-position`, `wrks-workflow`, `wrks-grounding`, `references`

- https://wrks.ai/ — official product entry point. Institution-specific URLs were not supplied.
- https://models.wrks.ai/ — public multi-provider model listing, checked 2026-09-07.
- https://wrks.ai/guides/agent/index.html — official guide surfaced in search; optional further reading only, not evidence of the user's enabled features.
- https://docs.wrks.ai/user-guide — retrieval failed during planning; not relied on for button names, UI layouts or account behavior.
- The `wrks-position` diagram is explicitly not a screenshot. Live account navigation, model selection, file input, search, limits, retention and data permissions require instructor preflight. If optional functionality is absent, use plain-text prompts with the fictional memo. The lesson does not claim every question performs a web search or every uploaded file is completely read.

## Slide `opening`, `outcomes`, `before-after`, `practice-source`, `practice-summary`, `practice-mail`, `practice-audit`, `practice-rubric`, `quiz`, `closing`

- All examples and exercise data are authored for this deck. The meeting memo is fictional; its 90-minute duration is part of the teaching fixture, not a claim about a real meeting.
- Each code block declares `data-source="illustration"`. No repository code, external response or actual institutional document is quoted.
- The exercise rubric is derived from the visible fictional memo: duration, audience, laptop use, source-preparation owner and online registration are settled; event date, venue, registration link, registration deadline and email owner are unsettled. Contact details are not given.
- Practice email is a review draft, not an instruction to send. Offline fallback: prepare the prompt and compare the authored error example against its source. Actual WRKS use and external reference links require internet access.

## Implementation and verification scope

- Uses existing repository-local Pretendard and Fraunces fonts, slide sections, numeric hashes, local CSS/JS and keyboard navigation patterns. No new runtime dependency.
- Arrow keys navigate; vertical keys and Space scroll overflow before moving; native control keyboard behavior is preserved. Home/End jump, N opens a modal note, F requests fullscreen. Notes are visible on the shared screen, not a private presenter window.
- Copy uses the Clipboard API with selection/manual-copy fallback. Print reveals all slides and exercise answers while omitting speaker notes and controls. A second button, "메모 인쇄", sets a body class so the same print path also renders speaker notes; the class is cleared on `afterprint` and by the plain print button, so the audience-facing output is unchanged.
- All content is present without network access. A repository checkout, including shared font assets, is the portable unit; `index.html` alone is not a bundled distribution.

## Interaction design

- `next-token`: changing context or candidate resets generation; the next-piece button plays the chosen authored branch. These examples illustrate multiple possible continuations, not relative probability or model performance.
- `hallucination-example`: identify two unsupported details in the fictional answer. The original includes the email task but leaves its owner and deadline unsettled. Repeated clicks do not increase the found count; reset clears the activity.
- `new-chat`: three scenario choices provide recommendation-based feedback. The alternatives are practical recommendations, not technical prohibitions; selecting another case clears its previous feedback.
- `prompt`: four independent toggles compose a copyable request in canonical order. The count indicates included elements, not quality or expected model accuracy. The source instruction is not itself the source; attendees must append the actual memo.
- `quiz`: three O/X statements, two true and one false. First answer per card is recorded until reset; explanation and score remain visible. Responses stay in page memory, survive slide navigation, and reset on reload. No learner identities, analytics, shared voting or response submission are implemented.
- All controls support native keyboard activation. Print hides activity controls but retains the unsupported words, scenario recommendations, prompt checklist, and all quiz explanations independent of answers chosen.

## Initial validation results — 2026-09-07, before interaction expansion

- Self-performed verification; no independent content evaluator was used. Instructor review of institution-specific workflows remains necessary.
- `bash tools/sweep.sh`, `python3 tools/validate-slide-evidence.py llm-wrks-basics`, and `node --check presentations/llm-wrks-basics/assets/deck.js` passed. The targeted evidence command is needed because the generic sweep skips decks without `fixtures/`; authored examples are intentionally marked as illustrations, not fixture-verified quotations.
- Chromium: all 30 slides checked twice at 1920×1080, 1366×768, 1024×768 and 390×844, after fonts loaded and transitions settled. Generation and answer disclosures were fully revealed. No horizontal overflow; no desktop vertical overflow. Mobile content intentionally scrolls vertically, with keyboard scroll verified.
- Keyboard navigation, boundaries, slide selector, focus visibility, inactive-slide isolation, reduced motion, note open/close and current note content, copy/manual-selection path, and fullscreen passed. A clipboard status assertion waits for the asynchronous copy operation; pointer-induced focus is not mistaken for keyboard focus.
- Print-media check: all 30 slides and disclosure answers visible, speaker notes omitted, no measured content outside page boxes, screen state restored. This checks browser print layout; a separately exported PDF and physical printer output were not reviewed.
- External requests blocked: reload and navigation passed without external requests. Separately, full browser offline mode plus direct `file://` loading passed with the local font, CSS and keyboard navigation.
- Browser error console: no errors or warnings observed. Authenticated WRKS behavior was not tested.

## Re-validation — 2026-09-07, after persona-review revisions

- Self-performed verification. Seven authored reviewer personas (administrative veteran, academic affairs, IT officer, new hire, finance sceptic, training planner, research administrator) read the deck and reported independently; their findings drove these revisions. The personas are a review device, not evidence about real staff opinion, and no actual staff were surveyed.
- Deck grew from 30 to 35 slides. New: `data-checklist`, `accountability`, `practice-setup`, `practice-apply`, `session-plan`.
- `bash tools/validate-presentations.sh`, `bash tools/sweep.sh`, `python3 tools/validate-slide-evidence.py llm-wrks-basics` and `node --check .../deck.js` passed after the change.
- Chromium layout: all 35 slides measured at 1920×1080, 1440×900, 1366×768 and 1024×768 after `document.fonts.ready`, driven through the deck's own hash navigation rather than by forcing `is-active` by hand. Residual vertical scroll is 3–7px on every slide, matching the pre-existing baseline of 3–4px; horizontal scroll is 0 everywhere.
- The overflow probe was checked against an injected oversized element before being trusted. The first version of the probe measured `slide.scrollHeight - slide.clientHeight`, which is structurally always 0 because the slide is not the scroll container; that probe reported a false all-clear. The corrected probe measures `#deck` and was confirmed to rise from 25 to 941 when an over-tall block was injected. Four new slides did overflow at 1366×768 (up to 218px) and were compacted until they matched baseline.
- Notes printing verified under emulated print media in three states: print without the class hides notes, print with the class shows them (89px rendered), screen with the class hides them. The plain print output is therefore unchanged.
- Console clean on load and navigation with the deck served from the repository root. Font and favicon 404s seen in an earlier run were an artefact of serving the deck subdirectory, not a deck defect.
- Not verified: exported PDF and physical print output, authenticated WRKS behaviour, institution-specific policy values (blank fields existed in that revision; removed on 2026-09-08), and actual delivery timings for either session plan.


## Revision evidence — 2026-09-08

### Slides `llm-model`, `model-service`, `before-after`, `next-token`, `tokens`, `training-context`

- https://developers.openai.com/api/docs/models/gpt-6-astra — opened 2026-09-08. Confirms GPT-6 Astra (`gpt-6-astra`), text input/output and image input. No claim of audio/video support or WRKS availability.
- https://www.anthropic.com/claude/fable — opened 2026-09-08. Confirms Claude Fable 5.1 and vision support. Names are examples, not a ranking or institution-specific catalog.
- Replaced the language-engine metaphor with a model definition and multimodal input example. The meeting-file contrast is an authored teaching example of training versus inference; storage, later training use and cross-chat retrieval remain separate.
- Moved the prompt comparison (`before-after`) to immediately before the prompt-construction lesson (`prompt`), following the context/handoff lessons. Generation precedes token terminology, and speaker notes point forward to tokenization.

### Slide `hallucination-why`

- https://image.samsungsds.com/kr/resources/__icsFiles/afieldfile/2023/04/13/%EC%82%BC%EC%84%B1SDS-ChatGPT-%EA%B8%B0%EC%88%A0-%EB%B6%84%EC%84%9D-%EB%B0%B1%EC%84%9C(Mar.2023)-last-updated-230405.pdf — opened 2026-09-08, page 22, figure 13. Documents the Sejong/MacBook hallucination and credits Hankook Ilbo, 2023-02-23. Slide paraphrases the historical error; it neither quotes a fabricated response as history nor claims reproduction by current models.

### Slides `data-checklist`, `wrks-position`

- Removed institution-specific fill-in fields and obsolete preparation notes, as requested.
- https://gov.wrks.ai/ko/agent — user-specified destination, opened 2026-09-08. Authenticated menu labels and linked routes were observed through the local evaluator; input, upload, save and result behavior were not tested.

## Slides `wrks-menu-map`, `wrks-tool-guide`

- https://github.com/kadragon/wrksai-manual — existing Korean employee manual, public single-page guide. The included `assets/home.png`, `assets/chat-example.png`, `assets/notes.png`, `assets/translation.png`, and `assets/works-plus.png` are its screen captures, marked in that manual as `웍스AI v3.0 · 2026-08-21` examples.
- Authenticated WRKS navigation was checked through `/Users/kadragon/dev/wrks-evaluator` on 2026-09-08. The visible top menu was `에이전트`, `워크플로우`, `이미지`, `회의록`, `슬라이드`, `문서 번역`, `문서 작성`, `웍스+`, `기타`; `기타` exposed `텍스트 추출`. Route labels and menu presence were checked only; institutional permissions and input, upload, generation, save, sharing, retention, and result behavior remain unverified.
- The screenshots are sanitized public manual examples, not captures of the authenticated account. Menu names, layout, availability, model choices and feature limits may change; instructor preflight remains required.
- Local Chromium QA checked both slides at 1920×1080, 1366×768, 1024×768 and 390×844 after fonts and transitions settled. All five images loaded, no horizontal overflow or console errors appeared, and keyboard navigation advanced from `#25` to `#26`.

### Motion

- Local CSS entrance animation staggers headings, comparison blocks and takeaways; no additional navigation steps. Reduced-motion preference disables effects; new effects apply to screen media only.

### Verification — 2026-09-08 revision

- Presentation/harness validators, targeted slide-evidence checker, sweep and `git diff --check` passed. No runtime dependencies added.
- Changed slides checked twice against the pre-change HEAD at 1920×1080, 1366×768, 1024×768 and 390×844, with fonts ready and 850ms after hash navigation. No horizontal overflow, code overflow or desktop vertical-scroll regression. Existing desktop scroll of up to 7px remains; narrow layouts scroll vertically.
- All 35 slides also swept twice at those four viewports with reduced motion enabled: no horizontal overflow, clipped children in the inspected hidden-overflow cards, or desktop scroll above 7px. Screenshots of the rewritten definition, model comparison, training contrast, hallucination example and data checklist inspected at 1366×768.
- Browser checks passed: keyboard forward/back, visible keyboard focus, entrance animation active, reduced-motion animation disabled, print media showing 35 slides with no animations, and offline file loading/navigation. Console: zero errors/warnings. Exported PDF and authenticated WRKS behavior were not tested.
- Three independent read-only reviews covered teaching, animation/accessibility and request coverage. Fixed their stale-source findings and a focus-triggered animation restart; browser verification performed by the implementing agent.

## Content-density revision — 2026-09-08

- Shortened the visible teaching copy on `next-token`, `context-efficiency`, `data-checklist`, `accountability`, `practice-audit`, and `practice-apply`; explanations and examples remain in speaker notes where they are needed for delivery.
- Reduced `quiz` from four to three statements and changed its score denominator to derive from the rendered card count. The remaining statements cover model/service, hallucination, and context continuity.
- Retained interaction instructions, the educational-example disclosure, institution data boundary, human approval, source memo, exercise prompts, and review rubric. `practice-apply` now shows request keywords; full request expansions remain in speaker notes.
- Post-revision checks passed: `bash tools/validate-presentations.sh`, `bash tools/validate-harness.sh`, `bash tools/sweep.sh`, targeted slide evidence, `node --check`, and `git diff --check`.
- Chromium layout sweep after the revision covered all 35 slides at 1920×1080, 1366×768, 1024×768, and 390×844 after fonts loaded and transitions settled. No horizontal overflow or desktop vertical overflow was observed; narrow layouts retain intentional vertical scrolling. Quiz selection reached `3/3` with three correct answers. Console reported zero errors and warnings.
- Reduced-motion media set the entrance animation to `none`; normal media retained `enter`. Authenticated WRKS behavior, exported PDF output, and physical print output remain unverified.

## Authenticated screen captures — 2026-09-11 (restructure, `docs/llm-wrks-lecture-plan.md`)

Captured with Playwright after the lecture owner signed in to `https://gov.wrks.ai/ko/agent`. Only screens were opened; no input, upload, generation, save or sharing was performed. Personal data was blurred in the page (CSS `filter: blur`) before capture; unblurred originals stay in the git-ignored `.playwright-mcp/` directory.

| File | Opened from | Observed | Sanitised |
|---|---|---|---|
| `assets/wrks/meeting-notes.png` | `회의록` → `https://gov-apps.wrks.ai/notes` | Header `파일 업로드`, `바로 녹음`; transcript, `회의 참가자`, `추출된 후속 조치` panels; usage popover: rename by title, `이메일 전송` sends a PDF, `내려받기` saves PDF · HWPX · text | Every transcript, title, participant and action-item text blurred — the open record was a real meeting |
| `assets/wrks/slides.png` | `슬라이드` → `https://slide.onpod.ai/app` (`웍스AI 슬라이드`, BETA) | Steps `1. 설정`, `2. 구성안`, `3. 초안·다듬기`; fields for title, topic, notes, reference files (PDF·한글·워드·엑셀·PPT), reference links | Account name blurred |
| `assets/wrks/doc-writer.png` | `문서 작성` → `https://docpro.onpod.ai/` (`문서 작성 Pro`) | Landing copy: upload one form and it drafts; HWP · Word · PDF; paragraph/outline recognition; download in chosen format | None needed |
| `assets/wrks/text-extract.png` | `기타` → `텍스트 추출` → `/ko/tools/ocr` (`텍스트 추출 도구 (Beta)`) | Extracts text from images into Excel; up to 20 same-type images at once; converted files downloadable for 2 weeks | None needed |
| `assets/wrks/workflow.png` | `워크플로우` → `/ko/workflow` | Heading `내 업무에 딱 맞는 자동화, 1분 안에`; `코드 한 줄 없이, 말로 만들면 끝`; tutorial image of a scheduled multi-step flow | None needed |
| `assets/wrks/agent-home.png` | `에이전트` → `/ko/agent` | Tabs `직원 에이전트`, `나만의 에이전트`, `팀 에이전트`; cards `공문다듬이`, `메일다듬이`, `규정길잡이`; input notice `개인정보 등 민감정보는 입력·업로드하지 마세요.` | Greeting with the user's name blurred; conversation sidebar closed |

| `assets/wrks/agent-create-basic.png` | `나만의 에이전트` → `＋ 에이전트 만들기` dialog, top | `에이전트 유형` (`대화형` default or `링크형`), required `모델 선택` and `에이전트 이름`, icon, `에이전트 설명` (200 chars) | None needed |
| `assets/wrks/agent-create-prompt.png` | same dialog, scrolled | Required `프롬프트` (role, persona, answer style; a wand button rewrites a one- or two-line role into a fuller prompt), `대화 시작 가이드` (0–6 starter buttons), `참고할 파일을 올려주세요.` (each file up to 100MB) | None needed |
| `assets/wrks/agent-create-tools.png` | same dialog, scrolled | `이 에이전트가 업무 수행중 이용 가능한 도구들` — select up to 5; groups `계정 연결해서 쓰는 도구` (M365, Google, Notion) and `바로 쓸 수 있는 도구` (e.g. 국가법령정보, 국가통계포털); internal tools listed as 코드 실행, 웹 검색, 시각화(차트) 자동 작성, 문서 요약, 드라이브 | Per-account connection status labels blurred |

- The agent dialog was closed with `취소`; no agent was created.
- The agent home banner rotates institutional notices, including `[공지] 생성형 AI 서비스(wrks.ai) 이용 관련 개인정보 및 대화 내용 보안 안내`. Only the title was observed; its body was not opened.
- `슬라이드` and `문서 작성` open on `onpod.ai` hosts, not `wrks.ai`. The hostnames are observed facts; no claim is made about data handling, contracts, or processing location.
- Feature statements above are the services' own on-screen copy, not tested behavior.
