(() => {
  "use strict";
  // Reuse the local deck pattern: numeric hashes, active slides and keyboard navigation.
  const slides = Array.from(document.querySelectorAll("[data-slide]"));
  const deck = document.querySelector("#deck");
  const previous = document.querySelector("#previous");
  const next = document.querySelector("#next");
  const jump = document.querySelector("#slide-jump");
  const notes = document.querySelector("#notes-dialog");
  const notesButton = document.querySelector("#notes-toggle");
  const status = document.querySelector("#status");
  let slideIndex = 0;
  let statusTimer;
  let printingDetails = [];

  slides.forEach((slide, index) => {
    const heading = slide.querySelector("h1,h2").cloneNode(true);
    heading.querySelectorAll("br").forEach((br) => br.replaceWith(" "));
    const title = heading.textContent.replace(/\s+/g, " ").trim();
    const option = new Option(
      `${String(index + 1).padStart(2, "0")} · ${title}`,
      String(index),
    );
    jump.add(option);
    slide.setAttribute("aria-label", `${index + 1}. ${title}`);
  });

  const announce = (message) => {
    clearTimeout(statusTimer);
    status.textContent = message;
    statusTimer = setTimeout(() => {
      status.textContent = "";
    }, 5000);
  };
  const render = () => {
    // Move focus before hiding a slide containing the previously focused control.
    if (
      slides.some(
        (slide, index) =>
          index !== slideIndex && slide.contains(document.activeElement),
      )
    )
      deck.focus();
    slides.forEach((slide, index) => {
      const active = index === slideIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.inert = !active;
    });
    document.querySelector("#current-slide").textContent = String(
      slideIndex + 1,
    ).padStart(2, "0");
    document.querySelector("#total-slides").textContent = String(
      slides.length,
    ).padStart(2, "0");
    document.querySelector("#chapter-label").textContent =
      slides[slideIndex].dataset.chapter;
    document.querySelector("#progress-bar").style.width =
      `${((slideIndex + 1) / slides.length) * 100}%`;
    previous.disabled = slideIndex === 0;
    next.disabled = slideIndex === slides.length - 1;
    jump.value = String(slideIndex);
    document.querySelector("#notes-content").textContent =
      slides[slideIndex].querySelector(".speaker-notes").textContent;
    document.title = `${slideIndex + 1}/${slides.length} · AI에게 일을 맡기는 법`;
    history.replaceState(null, "", `#${slideIndex + 1}`);
    deck.scrollTop = 0;
  };
  const move = (index) => {
    slideIndex = Math.min(Math.max(index, 0), slides.length - 1);
    render();
  };
  const parseHash = () => {
    const match = location.hash.match(/^#(\d+)(?:\.\d+)?$/);
    if (match) move(Number(match[1]) - 1);
    else {
      const index = slides.findIndex(
        (slide) => `#${slide.id}` === location.hash,
      );
      move(index < 0 ? slideIndex : index);
    }
  };
  const toggleNotes = () => {
    if (notes.open) notes.close();
    else {
      notes.showModal();
      notesButton.setAttribute("aria-expanded", "true");
    }
  };
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      announce(
        "전체 화면을 사용할 수 없습니다. 브라우저의 전체 화면 기능을 이용하세요.",
      );
    }
  };
  const scrollOrMove = (direction) => {
    const remaining =
      direction > 0
        ? deck.scrollHeight - deck.clientHeight - deck.scrollTop
        : deck.scrollTop;
    if (remaining > 3)
      deck.scrollBy({
        top: direction * deck.clientHeight * 0.8,
        behavior: "auto",
      });
    else move(slideIndex + direction);
  };
  const handleKeydown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || notes.open) return;
    if (event.target.closest("select,input,textarea,[contenteditable=true]"))
      return;
    if (event.key === " " && event.target.closest("button,a,summary")) return;
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        move(slideIndex + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        move(slideIndex - 1);
        break;
      case "ArrowDown":
      case "PageDown":
      case " ":
        event.preventDefault();
        scrollOrMove(1);
        break;
      case "ArrowUp":
      case "PageUp":
        event.preventDefault();
        scrollOrMove(-1);
        break;
      case "Home":
        event.preventDefault();
        move(0);
        break;
      case "End":
        event.preventDefault();
        move(slides.length - 1);
        break;
      case "n":
      case "N":
        event.preventDefault();
        toggleNotes();
        break;
      case "f":
      case "F":
        event.preventDefault();
        toggleFullscreen();
        break;
    }
  };
  previous.addEventListener("click", () => move(slideIndex - 1));
  next.addEventListener("click", () => move(slideIndex + 1));
  jump.addEventListener("change", () => {
    move(Number(jump.value));
    deck.focus();
  });
  notesButton.addEventListener("click", toggleNotes);
  document
    .querySelector("#notes-close")
    .addEventListener("click", () => notes.close());
  notes.addEventListener("close", () =>
    notesButton.setAttribute("aria-expanded", "false"),
  );
  document
    .querySelector("#fullscreen")
    .addEventListener("click", toggleFullscreen);
  document.addEventListener("fullscreenchange", () => {
    document.querySelector("#fullscreen").textContent =
      document.fullscreenElement ? "화면 복귀" : "전체 화면";
  });
  document.querySelector("#print").addEventListener("click", () => {
    document.body.classList.remove("print-notes");
    window.print();
  });
  document.querySelector("#print-notes").addEventListener("click", () => {
    document.body.classList.add("print-notes");
    window.print();
  });
  window.addEventListener("beforeprint", () => {
    printingDetails = Array.from(
      document.querySelectorAll("details"),
      (element) => [element, element.open],
    );
    printingDetails.forEach(([element]) => {
      element.open = true;
    });
    slides.forEach((slide) => {
      slide.inert = false;
      slide.removeAttribute("aria-hidden");
    });
  });
  window.addEventListener("afterprint", () => {
    document.body.classList.remove("print-notes");
    printingDetails.forEach(([element, open]) => {
      element.open = open;
    });
    render();
  });
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const element = document.getElementById(button.dataset.copy);
      try {
        if (!navigator.clipboard) throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(element.textContent);
        announce("복사했습니다. 웍스AI 대화에 붙여 넣으세요.");
      } catch {
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        announce("본문을 선택했습니다. Ctrl+C 또는 ⌘C로 복사하세요.");
      }
    });
  });
  // Authored branches only: no inferred probabilities or live model output.
  const contexts = {
    rain: {
      text: "비가 와서 가방에서",
      candidates: [
        {
          word: "우산을",
          rest: [" 꺼내", " 펼쳤습니다", "."],
          why: "비를 피하는 상황과 자연스럽게 연결됩니다.",
        },
        {
          word: "우비를",
          rest: [" 꺼내", " 입었습니다", "."],
          why: "같은 문맥에도 자연스러운 이어짐은 여러 개일 수 있습니다.",
        },
        {
          word: "공책을",
          rest: [" 꺼내", " 비에 젖었는지 확인했습니다", "."],
          why: "뒤의 설명에 따라 예상 밖 후보도 말이 될 수 있습니다.",
        },
      ],
    },
    sun: {
      text: "햇볕이 강해서 가방에서",
      candidates: [
        {
          word: "선글라스를",
          rest: [" 꺼내", " 썼습니다", "."],
          why: "문맥이 바뀌면 자연스럽게 떠오르는 후보도 달라집니다.",
        },
        {
          word: "모자를",
          rest: [" 꺼내", " 썼습니다", "."],
          why: "햇볕을 가리는 방법은 하나만 있는 것이 아닙니다.",
        },
        {
          word: "책을",
          rest: [" 꺼내", " 얼굴 위에 가렸습니다", "."],
          why: "가능한 문장과 가장 흔한 문장은 같지 않을 수 있습니다.",
        },
      ],
    },
  };
  let contextKey = "rain";
  let candidateIndex = 0;
  let generatedCount = 0;
  const generated = document.querySelector("#generated");
  const generate = document.querySelector("#generate");
  const generationFeedback = document.querySelector("#generation-feedback");
  const resetGeneration = () => {
    generatedCount = 0;
    generated.textContent = contexts[contextKey].text;
    generate.disabled = false;
    generate.textContent = "다음 조각 생성";
    document
      .querySelectorAll("[data-context]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.context === contextKey),
        ),
      );
    document.querySelectorAll("[data-candidate]").forEach((button, index) => {
      button.textContent = contexts[contextKey].candidates[index].word;
      button.setAttribute("aria-pressed", String(index === candidateIndex));
    });
    generationFeedback.textContent =
      contexts[contextKey].candidates[candidateIndex].why;
  };
  document.querySelectorAll("[data-context]").forEach((button) =>
    button.addEventListener("click", () => {
      contextKey = button.dataset.context;
      candidateIndex = 0;
      resetGeneration();
    }),
  );
  document.querySelectorAll("[data-candidate]").forEach((button) =>
    button.addEventListener("click", () => {
      candidateIndex = Number(button.dataset.candidate);
      resetGeneration();
    }),
  );
  generate.addEventListener("click", () => {
    const candidate = contexts[contextKey].candidates[candidateIndex];
    const pieces = [" " + candidate.word, ...candidate.rest];
    if (generatedCount >= pieces.length) return;
    const span = document.createElement("span");
    span.textContent = pieces[generatedCount++];
    generated.append(span);
    generate.disabled = generatedCount === pieces.length;
    generate.textContent =
      generatedCount === pieces.length ? "생성 완료" : "다음 조각 생성";
  });
  document
    .querySelector("#reset-generation")
    .addEventListener("click", resetGeneration);

  const found = new Set();
  const huntFeedback = document.querySelector("#hunt-feedback");
  document.querySelectorAll("[data-hunt]").forEach((button) =>
    button.addEventListener("click", () => {
      const key = button.dataset.hunt;
      if (key === "mail") {
        huntFeedback.textContent = `${found.size}/2 발견 · ‘안내 메일’은 원문에 있습니다. 누가, 언제 하는지가 미정입니다.`;
        return;
      }
      found.add(key);
      button.classList.add("is-found");
      button.setAttribute("aria-pressed", "true");
      huntFeedback.textContent =
        found.size === 2
          ? "2/2 발견! 마감일과 담당자는 모두 ‘미정’으로 남겨야 합니다."
          : `1/2 발견 · ${key === "deadline" ? "마감일" : "담당자"}는 원문에 없습니다. 나머지 한 곳도 찾아보세요.`;
    }),
  );
  document.querySelector("#hunt-reset").addEventListener("click", () => {
    found.clear();
    document.querySelectorAll("[data-hunt]").forEach((button) => {
      button.classList.remove("is-found");
      button.setAttribute("aria-pressed", "false");
    });
    huntFeedback.textContent = "0/2 발견 · 밑줄 친 표현을 원문과 대조하세요.";
  });

  const scenarios = [
    {
      question:
        "회의 요약을 끝냈습니다. 같은 메모로 직원 안내 메일을 만들려 합니다.",
      answer: "continue",
      why: "같은 대화 권장. 같은 자료를 다른 형식으로 바꾸므로 기존 맥락이 유용합니다.",
    },
    {
      question:
        "회의록 작업이 끝났습니다. 이제 개인 여행 일정을 계획하려 합니다.",
      answer: "new",
      why: "새 대화 권장. 목적과 자료가 바뀌어 이전 회의 조건은 필요하지 않습니다.",
    },
    {
      question:
        "같은 사업을 오래 논의했습니다. 폐기한 일정과 새 일정, 여러 초안이 뒤섞였습니다.",
      answer: "handoff",
      why: "요약 후 새 대화 권장. 최종 조건을 검토하고 필요한 원문과 함께 인계합니다.",
    },
  ];
  let scenarioIndex = 0;
  document.querySelectorAll("[data-scenario]").forEach((button) =>
    button.addEventListener("click", () => {
      scenarioIndex = Number(button.dataset.scenario);
      document.querySelector("#scenario-question").textContent =
        scenarios[scenarioIndex].question;
      document.querySelector("#scenario-feedback").textContent =
        "어떻게 이어가면 좋을까요? 하나를 고르고 이유를 비교해 보세요.";
      document
        .querySelectorAll("[data-scenario]")
        .forEach((item) =>
          item.setAttribute("aria-pressed", String(item === button)),
        );
      document
        .querySelectorAll("[data-chat-choice]")
        .forEach((item) => item.setAttribute("aria-pressed", "false"));
    }),
  );
  document.querySelectorAll("[data-chat-choice]").forEach((button) =>
    button.addEventListener("click", () => {
      const scenario = scenarios[scenarioIndex];
      document
        .querySelectorAll("[data-chat-choice]")
        .forEach((item) =>
          item.setAttribute("aria-pressed", String(item === button)),
        );
      document.querySelector("#scenario-feedback").textContent =
        `${button.dataset.chatChoice === scenario.answer ? "추천과 같습니다. " : "이 상황에서는 다른 방식을 추천합니다. "}${scenario.why}`;
    }),
  );

  const promptParts = {
    purpose: "목적: 팀 내부 공유용으로 정리해줘.",
    source: "자료: 아래에 붙여 넣는 회의 메모만 근거로 써줘.",
    constraint: "조건: 원문에 없는 날짜·담당자는 ‘미정’으로 표시해줘.",
    format: "형식: 핵심 요약 3개와 업무 / 담당자 / 기한 표로 작성해줘.",
  };
  const updatePrompt = () => {
    const selected = [
      ...document.querySelectorAll("[data-prompt-part][aria-pressed=true]"),
    ];
    document.querySelector("#built-prompt code").textContent = [
      "회의록 정리해줘.",
      ...selected.map((button) => promptParts[button.dataset.promptPart]),
    ].join("\n");
    document.querySelector("#builder-count").textContent =
      `${selected.length}/4 요소 선택 · AI 성능 점수가 아닙니다`;
  };
  document.querySelectorAll("[data-prompt-part]").forEach((button) =>
    button.addEventListener("click", () => {
      button.setAttribute(
        "aria-pressed",
        String(button.getAttribute("aria-pressed") !== "true"),
      );
      updatePrompt();
    }),
  );
  document.querySelector("#builder-reset").addEventListener("click", () => {
    document
      .querySelectorAll("[data-prompt-part]")
      .forEach((button) => button.setAttribute("aria-pressed", "false"));
    updatePrompt();
  });

  const quizCards = [...document.querySelectorAll(".quiz-card")];
  const quizScore = document.querySelector("#quiz-score");
  quizCards.forEach((card) =>
    card.querySelectorAll("[data-ox]").forEach((button) =>
      button.addEventListener("click", () => {
        if (card.dataset.choice) return;
        card.dataset.choice = button.dataset.ox;
        const correct = card.dataset.choice === card.dataset.answer;
        card.classList.add(correct ? "is-correct" : "is-incorrect");
        button.setAttribute("aria-pressed", "true");
        card
          .querySelectorAll("[data-ox]")
          .forEach((item) => item.setAttribute("aria-disabled", "true"));
        card.querySelector(".quiz-feedback").hidden = false;
        const answered = quizCards.filter((item) => item.dataset.choice);
        const count = answered.filter(
          (item) => item.dataset.choice === item.dataset.answer,
        ).length;
        quizScore.textContent = `${correct ? "맞았습니다." : "해설을 확인하세요."} ${answered.length}/4 응답 · ${count}개 정답. ${answered.length === 4 ? "다시 풀기로 재도전할 수 있습니다." : "첫 선택으로 채점합니다."}`;
      }),
    ),
  );
  document.querySelector("#quiz-reset").addEventListener("click", () => {
    quizCards.forEach((card) => {
      delete card.dataset.choice;
      card.classList.remove("is-correct", "is-incorrect");
      card.querySelector(".quiz-feedback").hidden = true;
      card.querySelectorAll("[data-ox]").forEach((button) => {
        button.setAttribute("aria-pressed", "false");
        button.removeAttribute("aria-disabled");
      });
    });
    quizScore.textContent = "0/4 응답 · 첫 선택으로 채점합니다.";
  });
  window.addEventListener("hashchange", parseHash);
  window.llmDeck = { handleKeydown };
  parseHash();
})();
