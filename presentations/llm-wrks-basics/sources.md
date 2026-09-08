# Sources and Verification — LLM and WRKS AI

Public sources checked on 2026-09-07. Korean copy is paraphrased. Teaching examples, timing allocations, metaphors, prompts, and the fictional meeting are authored illustrations, not empirical results. No account-specific UI or response was captured. The deck makes no price, current-best-model, security certification, or measured productivity claim.

## Slide `llm-model`, `model-service`, `tokens`, `next-token`, `training-context`

- https://developers.openai.com/api/docs/guides/text — models accept prompts and produce text; model and service distinction.
- https://developers.openai.com/api/docs/guides/prompt-engineering — token generation, prompt instructions, context and model differences.
- https://platform.openai.com/tokenizer — optional live tokenization tool. The public tool shell was reachable; no token count was measured for this deck. Token boundaries and probabilities are deliberately not presented as measured values.
- https://learn.chatgpt.com/ — ChatGPT as a user-facing service with model-backed features.
- https://models.wrks.ai/ — official listing of models from multiple providers. This does not establish an institution's enabled models.
- Engine/car and work-desk metaphors are simplifications. The next-token interaction offers two authored contexts and three candidate branches per context, with word-like display pieces. No actual tokenizer, model, probability calculation, network call, or stochastic sampling is used. Real generation need not always choose the highest-probability token.
- Reading a document in context is not immediate model-weight training. Storage and possible later training use are separate, policy-dependent issues; no WRKS-specific policy is asserted. This caveat is now stated **on the slide** rather than only in speaker notes, because reviewers read the unqualified takeaway as permission to upload material.
- `next-token`'s on-screen candidates are word-like groups chosen for readability. The slide now says so explicitly and gives a counter-example, because presenting word-shaped candidates immediately after "a Korean character is not a token" was read as a contradiction.
- `tokens` and `next-token` carry a "심화" marker: they are the first omissions in the 90-minute path.

## Slide `hallucination-why`, `hallucination-example`, `verify`

- https://openai.com/index/why-language-models-hallucinate/ — published 2025-09-05. Explains pretraining's prediction objective, the difficulty of sparse arbitrary facts, and incentives to guess rather than abstain. Evaluation incentives influence development and selection; an evaluation is not the direct runtime cause of a hallucination.
- https://developers.openai.com/api/docs/guides/prompt-engineering — explicit constraints and relevant reference material support output quality, without guaranteeing truth.
- The fictional incorrect answer and the correction are authored examples, not observed model outputs. The deck distinguishes fluency from truth and describes mitigation, not elimination. Independent source checks are recommended; neither repeated reassurance nor agreement between models proves accuracy.

## Slide `context`, `context-efficiency`, `context-quality`

- https://developers.openai.com/api/docs/guides/conversation-state — context windows, conversation inputs, and context management. The interface's full visible history need not equal the exact model input. Service-specific summarization, retrieval and truncation are not verified here. The slide now states that the window is counted **in tokens** and spans input and output together, completing the link the `tokens` takeaway promised.
- `context-efficiency` adds a fourth dimension, human review time, alongside usage, latency and accuracy. This is a teaching position, not a measured quantity: the point is that improvements in the first three do not automatically reduce the reviewing a person still owes.
- `hallucination-why`'s third card is presented as an incentive that encourages guessing, not as a third peer cause alongside the training objective and information limits. The published explanation is about development and evaluation incentives, not a runtime mechanism.
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
- `data-checklist` deliberately ships **blank fields** (`__________`) for institution-specific allowances, prohibitions and contacts. The blanks are the honest state: institutional policy was not available when the deck was written, and inventing entries would breach this deck's no-fabrication rule. The instructor fills them before delivery.
- The three items named as unverified on the slide — conversation retention period, administrator read access, and processing server location — are unverified because `https://docs.wrks.ai/user-guide` could not be retrieved and no institutional contract was available. They are presented as open questions, not as risks that are known to exist.
- The categories listed as "do not enter" (identifiers, sensitive records, confidential contracts and unpublished procurement material) are conventional handling categories, not quotations from a specific statute. The slide does not cite a statute, article, or certification, and speaker notes state that institutional rules take precedence and that the deck is not legal advice.
- `accountability` describes the deck's practical recommendation: authorship and approval responsibility are unchanged by tool use, some judgments are not delegated, and drafts are labelled. No claim is made about any institution's existing AI policy, audit outcome, or liability rule. The "what shrinks is drafting time, not review time" statement is a teaching position, not a measured productivity result; this deck makes no productivity measurement.

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
- The WRKS diagram is explicitly not a screenshot. Live account navigation, model selection, file input, search, limits, retention and data permissions require instructor preflight. If optional functionality is absent, use plain-text prompts with the fictional memo. The lesson does not claim every question performs a web search or every uploaded file is completely read.

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
- `quiz`: four O/X statements, two true and two false. First answer per card is recorded until reset; explanation and score remain visible. Responses stay in page memory, survive slide navigation, and reset on reload. No learner identities, analytics, shared voting or response submission are implemented.
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
- Not verified: exported PDF and physical print output, authenticated WRKS behaviour, institution-specific policy values (deliberately left blank on `data-checklist`), and actual delivery timings for either session plan.
