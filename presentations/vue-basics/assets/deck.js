(() => {
  "use strict";

  const slides = Array.from(document.querySelectorAll("[data-slide]"));
  const previousButton = document.querySelector("#previous");
  const nextButton = document.querySelector("#next");
  const fullscreenButton = document.querySelector("#fullscreen");
  const currentSlideLabel = document.querySelector("#current-slide");
  const totalSlidesLabel = document.querySelector("#total-slides");
  const chapterLabel = document.querySelector("#chapter-label");
  const progressBar = document.querySelector("#progress-bar");
  const keyHint = document.querySelector("#key-hint");

  let slideIndex = 0;
  let stepIndex = 0;
  let hintTimer;

  const slideStepCount = (slide) => {
    const steps = Array.from(slide.querySelectorAll("[data-step]"))
      .map((element) => Number.parseInt(element.dataset.step, 10))
      .filter(Number.isFinite);

    return steps.length ? Math.max(...steps) : 0;
  };

  const parseHash = () => {
    const match = window.location.hash.match(/^#(\d+)(?:\.(\d+))?$/);
    if (!match) return;

    slideIndex = Math.min(Math.max(Number(match[1]) - 1, 0), slides.length - 1);
    stepIndex = Math.min(Number(match[2] || 0), slideStepCount(slides[slideIndex]));
  };

  const updateHash = () => {
    const suffix = stepIndex > 0 ? `.${stepIndex}` : "";
    history.replaceState(null, "", `#${slideIndex + 1}${suffix}`);
  };

  let renderedSlideIndex = -1;
  let enteredBackward = false;

  const render = () => {
    /*
     * A slide keeps its scroll position, so place it deliberately on entry:
     * at the top going forward, at the end going backward — otherwise stepping
     * back reveals the last step below the fold on a scrollable slide.
     */
    if (renderedSlideIndex !== slideIndex) {
      const slide = slides[slideIndex];
      slide.scrollTop = enteredBackward ? slide.scrollHeight : 0;
      renderedSlideIndex = slideIndex;
      enteredBackward = false;
    }

    slides.forEach((slide, index) => {
      const active = index === slideIndex;
      slide.classList.toggle("is-active", active);
      slide.classList.toggle("is-before", index < slideIndex);
      slide.setAttribute("aria-hidden", String(!active));

      if (!active) return;

      slide.dataset.currentStep = String(stepIndex);
      slide.querySelectorAll("[data-step]").forEach((element) => {
        const requiredStep = Number.parseInt(element.dataset.step, 10);
        element.classList.toggle("is-visible", requiredStep <= stepIndex);
      });
    });

    const slide = slides[slideIndex];
    const progress = ((slideIndex + stepIndex / Math.max(slideStepCount(slide), 1)) /
      slides.length) * 100;

    currentSlideLabel.textContent = String(slideIndex + 1).padStart(2, "0");
    totalSlidesLabel.textContent = String(slides.length).padStart(2, "0");
    chapterLabel.textContent = slide.dataset.chapter || "";
    progressBar.style.width = `${progress}%`;
    previousButton.disabled = slideIndex === 0 && stepIndex === 0;
    nextButton.disabled =
      slideIndex === slides.length - 1 && stepIndex === slideStepCount(slide);

    document.title = `${slideIndex + 1}/${slides.length} · Vue, 생태계부터 프레임워크까지`;
    updateHash();
  };

  const moveForward = () => {
    const maxStep = slideStepCount(slides[slideIndex]);
    if (stepIndex < maxStep) {
      stepIndex += 1;
    } else if (slideIndex < slides.length - 1) {
      slideIndex += 1;
      stepIndex = 0;
    }
    render();
  };

  const moveBackward = () => {
    if (stepIndex > 0) {
      stepIndex -= 1;
    } else if (slideIndex > 0) {
      slideIndex -= 1;
      stepIndex = slideStepCount(slides[slideIndex]);
      enteredBackward = true;
    }
    render();
  };

  const moveToSlide = (index, revealAll = false) => {
    slideIndex = Math.min(Math.max(index, 0), slides.length - 1);
    stepIndex = revealAll ? slideStepCount(slides[slideIndex]) : 0;
    render();
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.warn("Fullscreen request was rejected.", error);
    }
  };

  const showKeyHint = () => {
    keyHint.classList.add("is-visible");
    window.clearTimeout(hintTimer);
    hintTimer = window.setTimeout(() => keyHint.classList.remove("is-visible"), 2600);
  };

  /*
   * Below 900px the stylesheet lets a slide scroll instead of clipping. The
   * vertical keys drive the step sequence, so without this a reader can reveal
   * a step that sits past the fold and has no key to reach it. Let those keys
   * scroll first and only advance once the slide is at its end.
   */
  const scrollWithinSlide = (direction) => {
    const slide = slides[slideIndex];
    const room = slide.scrollHeight - slide.clientHeight;
    if (room <= 2) return false;

    const atEnd = direction > 0
      ? slide.scrollTop >= room - 2
      : slide.scrollTop <= 2;
    if (atEnd) return false;

    // CSS cannot suppress an explicit behavior:"smooth", so honour the setting here.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    slide.scrollBy({
      top: direction * slide.clientHeight * 0.8,
      behavior: reduced ? "auto" : "smooth",
    });
    return true;
  };

  const handleKeydown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    switch (event.key) {
      case "ArrowDown":
      case "PageDown":
      case " ":
        event.preventDefault();
        if (!scrollWithinSlide(1)) moveForward();
        break;
      case "ArrowRight":
        event.preventDefault();
        moveForward();
        break;
      case "ArrowUp":
      case "PageUp":
        event.preventDefault();
        if (!scrollWithinSlide(-1)) moveBackward();
        break;
      case "ArrowLeft":
        event.preventDefault();
        moveBackward();
        break;
      case "Home":
        event.preventDefault();
        moveToSlide(0);
        break;
      case "End":
        event.preventDefault();
        moveToSlide(slides.length - 1, true);
        break;
      case "f":
      case "F":
        event.preventDefault();
        toggleFullscreen();
        break;
      case "?":
        showKeyHint();
        break;
      default:
        break;
    }
  };

  previousButton.addEventListener("click", moveBackward);
  nextButton.addEventListener("click", moveForward);
  fullscreenButton.addEventListener("click", toggleFullscreen);
  window.addEventListener("hashchange", () => {
    parseHash();
    render();
  });

  document.addEventListener("fullscreenchange", () => {
    fullscreenButton.textContent = document.fullscreenElement ? "×" : "⛶";
    fullscreenButton.setAttribute(
      "aria-label",
      document.fullscreenElement ? "전체 화면 종료" : "전체 화면"
    );
  });

  parseHash();
  render();
  window.setTimeout(showKeyHint, 900);

  window.vueDeck = { handleKeydown };
})();
