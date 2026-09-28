# LLM and WRKS AI Lecture Plan for University Staff

Status: implemented in `presentations/llm-wrks-basics/` on 2026-09-11. Part 5 worked
examples added on 2026-09-28 from the demand survey; the Part 3 memo exercises (practice 1–3 and
rubric) were replaced the same day by a Part 5 exercise that runs an example prompt (46 slides).

## 1. Lecture Overview

### Purpose

Help university staff use WRKS AI well in daily administrative work. Technical understanding is a
means, not the goal: every concept taught must pay off as a usage habit later in the lecture.

### Audience

- Administrative staff with little or no technical background
- Mixed prior AI experience, from never used to daily chatbot users
- Attendees with a WRKS AI account (sign-in failures are expected; see Part 3)

### Duration

- Default: 120 minutes
- Reduced path: 90 minutes (see schedule)

### Learning Goals

By the end of the lecture, participants should be able to:

1. Describe, in their own words, how an LLM produces an answer (patterns → next piece → repeat).
2. Explain why vague requests produce generic answers and why confident answers can be false.
3. Decide what they remain responsible for when using AI output in official work.
4. Find the main WRKS AI screen areas and start a conversation with a source document.
5. Choose the right WRKS AI add-on tool (meeting notes, slides, translation, and others) for a task.
6. Sketch a personal agent for one repeated task: instructions, reference material, expected output.

### Central Message

> AI predicts plausible text. Plausible is not true, and the person who submits the work is
> accountable for it.

## 2. Teaching Approach

### Mechanism → Caution Pairs

Part 1 exists to make Part 2 self-evident. Each caution in Part 2 must point back to a mechanism
animated in Part 1. A caution without a mechanism is grouped separately and kept short.

| Part 1 mechanism (animated) | Part 2 consequence |
|---|---|
| Next-piece prediction from probabilities | Hallucination: fluent ≠ true |
| Output is conditioned on the input context | Why the prompt matters: vague input → average output |
| Sampling picks among candidates | Same question, different answers; do not treat one answer as the answer |
| Learned patterns favour the most typical continuation | AI slop: generic, interchangeable, low-effort text |
| Limited context window | Long chats drift; split tasks and restate key conditions |
| Knowledge fixed at training time; no lookup unless a tool adds it | Supply sources; verify dates, rules, numbers |
| (no mechanism) | Responsibility and ethics, data boundaries |
| Fluent, confident output regardless of truth | Over-reliance: people who follow AI answers without judging them |

### Animation Policy

- **Explain by showing, not by terms.** Show a visual first; name the term afterwards, if needed.
- **Attention first.** Each Part 1 slide needs one element that draws the eye and shows an LLM
  property; the library is secondary.
- **Autoplay for process animations.** Processes start when the slide becomes active and loop
  without presenter input. Provide a pause/replay control and restart from the beginning when the
  slide is re-entered. Arrow keys always navigate slides; they never step animations
  (presenter-stepped `next-token` was tried on 2026-09-28 and reverted as hard to drive).
- **Deterministic and honest.** Animations are authored illustrations, not real model output or
  measured probabilities. Keep the existing on-slide disclosure pattern from `next-token`.
- **Accessible.** `prefers-reduced-motion` shows the final frame; print shows the final frame;
  every animated state has a text equivalent.
- **Offline.** Every library and asset is committed under the deck's `assets/`.

### Rendering Technology

The self-contained rule bans *remote* loading, not libraries. GitHub Pages could load a CDN, but
the deck must also work offline and from `file://`.

- Decision: HTML/CSS animation, no library. (The Canvas 2D `embedding` slide was removed on
  2026-09-28.)
- Implementation: `assets/deck.js` `scene()` registers start/stop/final per slide id; markup holds
  the final frame so print, no-JS and reduced motion need no extra code path.
- Revisit a library only if a concrete slide cannot be built without one. Adding one is a
  dependency change: update `docs/architecture.md`, `docs/runbook.md`, and
  `tools/validate-presentations.sh` in the same change.

### Tone for Part 2

Cautions are demonstrated, not preached. Each caution gets one short comparison or activity
(bad vs good request, a fabricated citation to spot, a slop vs specific paragraph).

## 3. Recommended Schedule

| Section | Default | Reduced |
|---|---:|---:|
| Opening | 5 | 5 |
| Part 1 — How AI and LLMs work | 20 | 15 |
| Part 2 — Using AI carefully | 20 | 15 |
| Part 3 — WRKS AI screen and sign-in | 10 | 10 |
| Part 4 — WRKS AI add-on tools | 15 | 10 |
| Part 5 — Agent, examples, practice 1 and check | 25 | 15 |
| Part 5 — Agent design (practice 2) | 20 | 15 |
| Closing quiz and wrap-up | 5 | 5 |
| Total | 120 minutes | 90 minutes |

Timings are authored estimates; no delivery has been timed. Attendees sign in before the session
so the Part 3 access check needs only 5 minutes. Reduced path: drop the optional slides
(`tokens`, `context-quality`, `workflow-preview`), show only the Part 5 example closest to the
room's jobs (default `example-report`) and run only that one in practice 1, and demonstrate
practice 2. Never drop: `next-token`, hallucination, verification,
the data-boundary table, accountability, and the access check. The deck carries no on-screen
marker for optional slides and no planning slide; this table is the instructor's only source.

Instructor guidance (authored, not measured):

- Choose the path from the opening self-check rather than the applicant survey, whose self-ratings
  proved unreliable. If more than half rate item 1 (how AI answers and its limits) at 2 or below,
  drop the optional slides and spend the time on the Part 1–2 core.
- Wide skill gaps: skip the optional slides and give practice 2 more time.
- Early finishers: run the other example in practice 1, write a second practice 2 design sheet,
  or — where the image menu is enabled — draft a poster for the fictional lecture memo and check
  that the undecided lecturer name did not become a concrete value.

## 4. Detailed Lecture Outline

Slide ids in parentheses are the implemented slides. As built on 2026-09-11: `model-service` was
merged into `llm-model`; new slides are `learning`, `embedding`, `sampling`, `traits-bridge`,
`ai-slop`, `over-reliance`, `tool-notes`, `tool-slides`, `tool-docs`, `agent-what`, `agent-form`,
`workflow-preview`; `practice-apply` became the Part 5 agent design sheet and `practice-rubric`
stays in Part 3 after `practice-audit`.

### 4.0 Opening

- Why this lecture: WRKS AI is available; using it well is a skill (`opening`, `outcomes`)

### 4.1 Part 1 — How AI and LLMs Work

Goal: attendees can retell the generation loop without jargon.

1. AI, LLM, and a chat service are different layers (`llm-model`, `model-service`, condensed to one)
2. Split: text becomes pieces (`tokens`, reworked as animation; optional)
3. Learn: large amounts of text become patterns — text stream compressing into a model (new)
4. Generate: candidates with bars, one chosen, loop repeats; autoplays (`next-token`)
   - Why AI "reads saju well": it continues patterns from abundant saju text, not because saju is
     statistics; fluency is not accuracy (`saju`)
5. Phrasing: the same goal asked three ways gives three answers (`sampling`)
6. Long conversations lose earlier content, as people do in long meetings (`context`)
7. Knowledge has a date; search and uploaded documents add outside information
   (`training-context`, reworked)

### 4.2 Part 2 — Using AI Carefully

Goal: each caution is recognised as a direct consequence of Part 1.

1. Why prompts matter — vague vs specific request comparison (`before-after`, `prompt`, `refine`)
2. Keep context clean — conditions get buried, split tasks, carry a summary (`context-quality`
   (optional), `new-chat`, `handoff`)
3. Hallucination — why it happens, spot the fabrication, verify (`hallucination-why`,
   `hallucination-example`, `verify`)
4. AI slop — a pejorative for low-quality text and images mass-produced with generative AI
   ("slop": food scraps, filth). Link to typical-continuation text; how to recognise it, how to
   add your own judgment and facts (new)
5. Responsibility and ethics — data boundary, what not to enter, who approves
   (`data-boundary`, `accountability`)
6. People who stop thinking — people who follow AI answers blindly. Link to fluent, confident
   output; habit: think first, ask AI second, judge the answer last (new)

Sources:

- AI slop definition: supplied by the lecture owner on 2026-09-11 (Korean definition text in the
  request). Record it in `sources.md`; an external reference is optional.
- Over-reliance on AI answers: no study is cited unless one is opened and recorded in
  `sources.md` first — [unknown — search before citing any finding]

### 4.3 Part 3 — WRKS AI Screen and First Chat

Goal: every attendee has a working session and knows where to start a chat. The first grounded
chat now happens in Part 5 practice 1 (the memo exercises were removed on 2026-09-28 as awkward
for the audience).

1. Sign-in and fallback pair work (`practice-setup`)
2. Screen tour with manual screenshots (`wrks-position`, `wrks-menu-map`; `assets/wrks/home.png`,
   `chat-example.png`)

### 4.4 Part 4 — WRKS AI Add-on Tools

Goal: attendees match a task to a tool.

Verified menu labels (authenticated check on 2026-09-08, `sources.md`): `에이전트`, `워크플로우`,
`이미지`, `회의록`, `슬라이드`, `문서 번역`, `문서 작성`, `웍스+`, `기타` → `텍스트 추출`.
Only menu presence was verified; input, generation, and output behaviour were not.

1. Tool map: task → tool (`wrks-tool-guide`, reworked)
2. 회의록 — upload or record, transcript, participants, action items, export
   (`assets/wrks/meeting-notes.png`)
3. 슬라이드 — settings → outline → draft (`assets/wrks/slides.png`)
4. 문서 번역 / 문서 작성 / 텍스트 추출 (`assets/wrks/translation.png`, `doc-writer.png`,
   `text-extract.png`)
5. 웍스+ (`assets/wrks/works-plus.png`)

Screens captured 2026-09-11; on-screen copy recorded in `sources.md`. Behaviour after upload or
generation remains untested.

Each tool slide follows one template: when to use it, input, output, what to check afterwards.

### 4.5 Part 5 — Build Your Own Agent

Goal: attendees leave with one agent sketch for their own repeated task.

1. What an agent is: instructions + reference material + tools, reused across chats (new)
2. Agents already provided: `직원 에이전트` cards such as `공문다듬이`, `메일다듬이`,
   `규정길잡이`; `나만의 에이전트` and `팀 에이전트` tabs (`assets/wrks/agent-home.png`)
3. From prompt to agent: when a prompt you repeat becomes an agent (new)
4. Worked examples from the demand survey, one per output type (added 2026-09-28):
   `example-report` (document: special-lecture/event result report in KNUE report style),
   `example-survey` (summary/table: satisfaction survey, calculation kept in Excel),
   `example-reply` (reply: enquiry mail answered only from department material)
5. Practice 1: paste `example-report` or `example-survey` into a new chat with a fictional
   special-lecture memo and check dates, counts, quotes, and `[확인 필요]` cells
   (`practice-run`, `practice-check`)
6. Practice 2: fill an agent sketch for your task (`practice-apply`)
7. Next step preview: `워크플로우` — automation described in words, e.g. a scheduled multi-step
   flow (`assets/wrks/workflow.png`; optional)

Agent vs workflow, as the screens present them: an agent is a reusable conversational assistant;
a workflow is a multi-step automation that can run on a schedule.

The `에이전트 만들기` form maps directly onto slide 1's three parts, so teach the form in that
order (captures: `agent-create-basic.png`, `agent-create-prompt.png`, `agent-create-tools.png`):

| Concept | Form field |
|---|---|
| Instructions | `프롬프트` (required; wand button expands a short role) · `에이전트 설명` |
| Reference material | `참고할 파일을 올려주세요.` |
| Tools | `이 에이전트가 업무 수행중 이용 가능한 도구들` (up to 5) |
| Ease of use for others | `대화 시작 가이드` (0–6 starter questions) |

Part 1 link: the prompt and files are material the agent consults when answering, not instant
retraining of the model (see `sources.md`, in-context reading vs weight training). How WRKS
retrieves from uploaded files is unverified; do not describe it. Part 2 link: reference files must respect the data boundary; check the institution's
security notice before uploading.

### 4.6 Closing

- Quiz (`quiz`, statements updated to the new parts), wrap-up (`closing`)
- Appendix: `references`

## 5. Demand Survey Guidance

The survey feeds Part 5. Ask for concrete repeated work, not wishes:

- "매주 또는 매달 반복하는 업무 한 가지를 적어 주세요." (what goes in, what comes out)
- "그 업무에서 가장 시간이 오래 걸리는 단계는 무엇인가요?"
- "그 업무에 참고하는 자료(규정, 양식, 이전 문서)는 무엇인가요?"
- "AI로 해 보고 싶은 일이 있다면 적어 주세요." (optional, open-ended)

Select 2–3 cases that differ in output type (document, reply, summary/table) and use only
anonymised or fictional data on slides.

Survey received 2026-09-23 (48 responses; aggregates in `sources.md`, raw file not committed).
Applied on 2026-09-26: `practice-apply` hints, `agent-what` notes, and a new `wrks-limits` slide for
requests that need system integration. Worked examples 1–3 were built on 2026-09-28 (§4.5 item 4).

## 6. Open Decisions

None open. Resolved on 2026-09-11:

1. No three.js; SVG/CSS/Canvas 2D with autoplaying process animations.
2. Screenshots for `회의록`, `슬라이드`, `문서 작성`, `텍스트 추출` are captured from the
   authenticated account (lecture owner signs in); sanitise before committing.
3. `practice-audit` stays in Part 3 as hands-on practice. (Superseded 2026-09-28: Part 3 memo
   exercises removed; verification practice moved to `practice-check` in Part 5.)

## 7. Out of Scope

- Model rankings, prices, or claims about which model is best
- WRKS retention, administrator access, or processing location (unverified)
- Legal advice; institutional rules take precedence over the deck
