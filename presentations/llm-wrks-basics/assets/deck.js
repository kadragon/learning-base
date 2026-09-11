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
    syncScene();
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
    Object.values(scenes).forEach((item) => item.final());
    drawEmbedding(0.3, { width: 640, height: 300 });
  });
  window.addEventListener("afterprint", () => {
    document.body.classList.remove("print-notes");
    printingDetails.forEach(([element, open]) => {
      element.open = open;
    });
    sceneSlide = null;
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
  // Autoplay scenes: each animated slide registers start/stop/final. The markup
  // already holds the final frame, so print, no-JS and reduced motion show it.
  const scene = (run, final) => {
    let generation = 0;
    let timers = [];
    let frame = 0;
    const api = {
      running: false,
      start() {
        api.stop();
        api.running = true;
        const token = ++generation;
        const alive = () => token === generation;
        const wait = (ms) =>
          new Promise((resolve) => {
            const id = setTimeout(() => {
              timers = timers.filter((item) => item !== id);
              resolve();
            }, ms);
            timers.push(id);
          });
        const tick = (draw) => {
          const loop = (time) => {
            if (!alive()) return;
            draw(time);
            frame = requestAnimationFrame(loop);
          };
          frame = requestAnimationFrame(loop);
        };
        run({ wait, alive, tick });
      },
      stop() {
        generation++;
        api.running = false;
        timers.forEach(clearTimeout);
        timers = [];
        cancelAnimationFrame(frame);
      },
      final() {
        api.stop();
        final();
      },
    };
    return api;
  };

  // Authored chains only: no inferred probabilities or live model output.
  const generationScripts = {
    rain: {
      context: "비가 와서 가방에서",
      steps: [
        [["우산을", 0.62], ["우비를", 0.24], ["공책을", 0.06]],
        [["꺼내", 0.71], ["챙겨", 0.17], ["넣어", 0.05]],
        [["펼쳤습니다", 0.58], ["썼습니다", 0.27], ["흔들었습니다", 0.04]],
        [[".", 0.82], [",", 0.11], ["!", 0.03]],
      ],
    },
    sun: {
      context: "햇볕이 강해서 가방에서",
      steps: [
        [["선글라스를", 0.55], ["모자를", 0.3], ["책을", 0.05]],
        [["꺼내", 0.74], ["챙겨", 0.15], ["찾아", 0.06]],
        [["썼습니다", 0.66], ["꼈습니다", 0.2], ["닦았습니다", 0.07]],
        [[".", 0.84], [",", 0.09], ["!", 0.03]],
      ],
    },
  };
  let generationKey = "rain";
  const generatedLine = document.querySelector("#generated");
  const candidateItems = [
    ...document.querySelectorAll("#gen-candidates li"),
  ];
  const phaseItems = [...document.querySelectorAll("#phase-track li")];
  const setPhase = (name) =>
    phaseItems.forEach((item) =>
      item.classList.toggle("is-on", item.dataset.phase === name),
    );
  const showCandidates = (step, grown) =>
    candidateItems.forEach((item, index) => {
      item.classList.remove("is-chosen");
      item.querySelector(".w").textContent = step[index][0];
      item
        .querySelector("i")
        .style.setProperty("--p", grown ? step[index][1] : 0);
    });
  const appendPiece = (text, fresh) => {
    const span = document.createElement("span");
    span.textContent = text === "." || text === "," || text === "!" ? text : ` ${text}`;
    if (fresh) span.className = "is-new";
    generatedLine.append(span);
  };
  const nextTokenScene = scene(
    async ({ wait, alive }) => {
      const script = generationScripts[generationKey];
      while (alive()) {
        generatedLine.textContent = script.context;
        showCandidates(script.steps[0], false);
        setPhase("");
        await wait(900);
        for (const step of script.steps) {
          if (!alive()) return;
          showCandidates(step, false);
          setPhase("score");
          await wait(80);
          showCandidates(step, true);
          await wait(1200);
          if (!alive()) return;
          setPhase("pick");
          candidateItems[0].classList.add("is-chosen");
          await wait(900);
          if (!alive()) return;
          setPhase("append");
          appendPiece(step[0][0], true);
          await wait(800);
        }
        setPhase("");
        await wait(2800);
      }
    },
    () => {
      const script = generationScripts[generationKey];
      generatedLine.textContent = script.context;
      script.steps.forEach((step) => appendPiece(step[0][0], false));
      showCandidates(script.steps[0], true);
      candidateItems[0].classList.add("is-chosen");
      phaseItems.forEach((item) => item.classList.add("is-on"));
    },
  );
  document.querySelectorAll("[data-context]").forEach((button) =>
    button.addEventListener("click", () => {
      generationKey = button.dataset.context;
      document
        .querySelectorAll("[data-context]")
        .forEach((item) =>
          item.setAttribute("aria-pressed", String(item === button)),
        );
      const script = generationScripts[generationKey];
      document.querySelector("#gen-summary").textContent =
        `예시: “${script.context}” 다음 후보(${script.steps[0].map((c) => c[0]).join("·")})가 떠오르고, 하나를 골라 붙이는 과정을 반복해 “${script.context} ${script.steps.map((s) => s[0][0]).join(" ").replace(/ ([.,!])$/, "$1")}”를 만듭니다.`;
      restartScene();
    }),
  );

  const sampleSets = [
    [
      "안녕하세요. 직원 AI 활용 교육을 안내드립니다.",
      "직원 여러분께 AI 교육 소식을 전해 드립니다.",
      "업무에 바로 쓰는 AI 교육에 여러분을 초대합니다.",
    ],
    [
      "AI 활용 교육 참가 신청을 안내드립니다.",
      "안녕하세요, 직원 대상 AI 교육을 알려 드립니다.",
      "직원 여러분의 AI 교육 참여를 기다립니다.",
    ],
  ];
  const laneOutputs = [...document.querySelectorAll(".lane-out")];
  const samplingScene = scene(
    async ({ wait, alive }) => {
      let set = 0;
      while (alive()) {
        laneOutputs.forEach((lane) => {
          lane.textContent = "";
          lane.classList.add("is-typing");
        });
        await wait(600);
        await Promise.all(
          laneOutputs.map(async (lane, index) => {
            const text = sampleSets[set][index];
            const speed = [46, 58, 52][index];
            for (let i = 1; i <= text.length; i++) {
              if (!alive()) return;
              lane.textContent = text.slice(0, i);
              await wait(speed);
            }
          }),
        );
        if (!alive()) return;
        laneOutputs.forEach((lane) => lane.classList.remove("is-typing"));
        await wait(2600);
        set = (set + 1) % sampleSets.length;
      }
    },
    () =>
      laneOutputs.forEach((lane, index) => {
        lane.textContent = sampleSets[0][index];
        lane.classList.remove("is-typing");
      }),
  );

  const tokenStage = document.querySelector("#token-stage");
  const tokenChips = [...tokenStage.querySelectorAll(".tk")];
  const tokenCaption = document.querySelector("#token-caption");
  const tokensScene = scene(
    async ({ wait, alive }) => {
      while (alive()) {
        tokenStage.classList.remove("is-split", "show-id");
        tokenChips.forEach((chip) => chip.classList.remove("show-id"));
        tokenCaption.textContent = "① 사람이 쓴 문장";
        await wait(1500);
        if (!alive()) return;
        tokenStage.classList.add("is-split");
        tokenCaption.textContent = "② 조각(토큰)으로 나누기";
        await wait(1700);
        tokenCaption.textContent = "③ 조각마다 번호(숫자)로 바꾸기";
        for (const chip of tokenChips) {
          if (!alive()) return;
          chip.classList.add("show-id");
          await wait(160);
        }
        await wait(2600);
      }
    },
    () => {
      tokenStage.classList.add("is-split", "show-id");
      tokenChips.forEach((chip) => chip.classList.add("show-id"));
      tokenCaption.textContent = "문장 → 조각(토큰) → 번호(숫자)";
    },
  );

  const contextItems = [...document.querySelectorAll("#ctx-items li")];
  const contextFill = document.querySelector("#ctx-fill");
  const contextCaption = document.querySelector("#ctx-caption");
  const contextStage = document.querySelector("#ctx-stage");
  const contextCapacity = 12;
  const contextScene = scene(
    async ({ wait, alive }) => {
      while (alive()) {
        contextStage.classList.add("is-playing");
        contextItems.forEach((item) =>
          item.classList.remove("is-shown", "is-out"),
        );
        contextFill.style.setProperty("--fill", 0);
        contextFill.classList.remove("is-full");
        contextCaption.textContent = "요청·대화·문서·검색 결과가 한 책상에 올라갑니다.";
        let used = 0;
        await wait(700);
        for (const item of contextItems) {
          if (!alive()) return;
          used += Number(item.style.getPropertyValue("--size"));
          if (used > contextCapacity) {
            const oldest = contextItems.find(
              (entry) =>
                entry.classList.contains("is-shown") &&
                !entry.classList.contains("is-out") &&
                entry !== contextItems[0],
            );
            oldest.classList.add("is-out");
            used -= Number(oldest.style.getPropertyValue("--size"));
            contextCaption.textContent =
              "한도를 넘으면 일부가 빠지거나 요약될 수 있습니다.";
            await wait(1100);
            if (!alive()) return;
          }
          item.classList.add("is-shown");
          contextFill.style.setProperty("--fill", used / contextCapacity);
          contextFill.classList.toggle("is-full", used >= contextCapacity);
          await wait(1000);
        }
        await wait(3200);
      }
    },
    () => {
      contextStage.classList.remove("is-playing");
      contextItems.forEach((item, index) => {
        item.classList.add("is-shown");
        item.classList.toggle("is-out", index === 1);
      });
      contextFill.style.setProperty("--fill", 1);
      contextFill.classList.add("is-full");
      contextCaption.textContent =
        "한도를 넘으면 일부가 빠지거나 요약될 수 있습니다.";
    },
  );

  // Pseudo-3D point cloud: words projected with a simple perspective divide.
  const embedCanvas = document.querySelector("#embed-canvas");
  const embedWords = [
    ["비", -0.78, 0.2, 0.3, 1], ["우산", -0.52, 0.34, 0.36, 1],
    ["우비", -0.6, 0.02, 0.42, 1], ["장마", -0.92, 0.42, 0.24, 1],
    ["공문", 0.42, 0.6, -0.3, 2], ["기안", 0.78, 0.66, -0.26, 2],
    ["결재", 0.52, 0.3, -0.36, 2], ["규정", 0.86, 0.36, -0.32, 2],
    ["김치", -0.24, -0.5, 0.02, 3], ["비빔밥", 0.08, -0.76, -0.04, 3],
    ["된장국", 0.36, -0.52, 0.06, 3], ["식당", 0.02, -0.28, -0.02, 3],
  ];
  const embedColors = { 1: "#b74220", 2: "#254b3c", 3: "#9a6b12" };
  let embedAngle = 0.3;
  // A hidden canvas has no layout size, so print draws at a fixed logical size
  // matching the print stylesheet's 150mm × 70mm box.
  const drawEmbedding = (angle, fixed) => {
    embedAngle = angle;
    const ratio = fixed ? 2 : window.devicePixelRatio || 1;
    const width = fixed ? fixed.width : embedCanvas.clientWidth;
    const height = fixed ? fixed.height : embedCanvas.clientHeight;
    if (!width || !height) return;
    if (
      embedCanvas.width !== Math.round(width * ratio) ||
      embedCanvas.height !== Math.round(height * ratio)
    ) {
      embedCanvas.width = Math.round(width * ratio);
      embedCanvas.height = Math.round(height * ratio);
    }
    const ctx = embedCanvas.getContext("2d");
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const scaleX = width * 0.36;
    const scaleY = height * 0.4;
    const tilt = 0.32;
    const project = ([x, y, z]) => {
      const x1 = x * Math.cos(angle) + z * Math.sin(angle);
      const z1 = -x * Math.sin(angle) + z * Math.cos(angle);
      const y1 = y * Math.cos(tilt) - z1 * Math.sin(tilt);
      const z2 = y * Math.sin(tilt) + z1 * Math.cos(tilt);
      const depth = 3.2 / (3.2 + z2);
      return {
        x: width / 2 + x1 * scaleX * depth,
        y: height / 2 - y1 * scaleY * depth,
        depth,
      };
    };
    ctx.strokeStyle = "#c9cec3";
    ctx.lineWidth = 1;
    [[[-1, 0, 0], [1, 0, 0]], [[0, -1, 0], [0, 1, 0]], [[0, 0, -1], [0, 0, 1]]].forEach(
      ([from, to]) => {
        const a = project(from);
        const b = project(to);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      },
    );
    const points = embedWords.map(([label, x, y, z, group]) => ({
      label,
      group,
      ...project([x, y, z]),
    }));
    const byLabel = Object.fromEntries(points.map((p) => [p.label, p]));
    const link = (a, b, dashed, text, at, dy, dx = 0) => {
      ctx.save();
      ctx.strokeStyle = dashed ? "#58625c" : "#b74220";
      ctx.lineWidth = dashed ? 1.5 : 2.5;
      ctx.setLineDash(dashed ? [6, 6] : []);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.restore();
      ctx.fillStyle = dashed ? "#58625c" : "#b74220";
      ctx.font = "700 14px 'Pretendard Variable', sans-serif";
      ctx.textAlign = dx ? "right" : "center";
      ctx.fillText(text, a.x + (b.x - a.x) * at + dx, a.y + (b.y - a.y) * at + dy);
    };
    link(byLabel["우산"], byLabel["결재"], true, "멀다 = 관련 적음", 0.5, -10);
    link(byLabel["우산"], byLabel["우비"], false, "가깝다 = 관련 깊음", 1, 26, -6);
    points
      .sort((a, b) => a.depth - b.depth)
      .forEach((point) => {
        const radius = 7 * point.depth;
        ctx.globalAlpha = Math.min(1, 0.45 + point.depth * 0.5);
        ctx.fillStyle = embedColors[point.group];
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#242b29";
        ctx.font = `650 ${Math.round(15 * point.depth + 3)}px 'Pretendard Variable', sans-serif`;
        ctx.textAlign = "left";
        ctx.fillText(point.label, point.x + radius + 5, point.y + 5);
        ctx.globalAlpha = 1;
      });
  };
  const embeddingScene = scene(
    ({ tick }) => {
      let start;
      tick((time) => {
        if (start === undefined) start = time;
        // Sway instead of a full turn so clusters never cross each other.
        drawEmbedding(Math.sin(((time - start) / 1000) * 0.6) * 0.55);
      });
    },
    () => drawEmbedding(0.3),
  );

  // Replay restarts CSS loops from the first keyframe, matching the JS scenes.
  const cssScene = (slide) =>
    scene(
      () => {
        slide.classList.remove("is-paused");
        slide.classList.add("is-restarting");
        void slide.offsetWidth;
        slide.classList.remove("is-restarting");
      },
      () => slide.classList.remove("is-paused"),
    );
  const scenes = {
    learning: cssScene(document.querySelector("#learning")),
    tokens: tokensScene,
    embedding: embeddingScene,
    "next-token": nextTokenScene,
    sampling: samplingScene,
    context: contextScene,
  };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let sceneSlide = null;
  const setToggle = (slide, running) => {
    const toggle = slide.querySelector("[data-scene-toggle]");
    if (!toggle) return;
    toggle.textContent = running ? "일시정지" : "다시 재생";
    if (reduceMotion.matches && toggle.contains(document.activeElement))
      deck.focus();
    toggle.hidden = reduceMotion.matches;
  };
  const restartScene = () => {
    const slide = slides[slideIndex];
    const current = scenes[slide.id];
    if (!current) return;
    if (reduceMotion.matches) current.final();
    else current.start();
    setToggle(slide, current.running);
  };
  const syncScene = () => {
    const slide = slides[slideIndex];
    if (sceneSlide === slide) return;
    if (sceneSlide && scenes[sceneSlide.id]) scenes[sceneSlide.id].final();
    sceneSlide = slide;
    restartScene();
  };
  document.querySelectorAll("[data-scene-toggle]").forEach((toggle) =>
    toggle.addEventListener("click", () => {
      const slide = toggle.closest("[data-slide]");
      const current = scenes[slide.id];
      if (current.running) {
        current.stop();
        if (slide.querySelector("[data-css-scene]")) slide.classList.add("is-paused");
        setToggle(slide, false);
      } else restartScene();
    }),
  );
  reduceMotion.addEventListener("change", () => {
    sceneSlide = null;
    syncScene();
  });
  window.addEventListener("resize", () => {
    if (!scenes.embedding.running) drawEmbedding(embedAngle);
  });
  Object.values(scenes).forEach((item) => item.final());

  const found = new Set();
  const huntFeedback = document.querySelector("#hunt-feedback");
  document.querySelectorAll("[data-hunt]").forEach((button) =>
    button.addEventListener("click", () => {
      const key = button.dataset.hunt;
      if (key === "mail") {
        huntFeedback.textContent = `${found.size}/2 발견 · ‘안내 메일’은 원문에 있습니다. 누가 언제 보내는지가 미정입니다.`;
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
        quizScore.textContent = `${correct ? "맞았습니다." : "해설을 확인하세요."} ${answered.length}/${quizCards.length} 응답 · ${count}개 정답. ${answered.length === quizCards.length ? "다시 풀기로 재도전할 수 있습니다." : "첫 선택으로 채점합니다."}`;
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
    quizScore.textContent = `0/${quizCards.length} 응답 · 첫 선택으로 채점합니다.`;
  });
  window.addEventListener("hashchange", parseHash);
  window.llmDeck = { handleKeydown };
  parseHash();
})();
