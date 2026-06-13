function initSpotlight() {
  const motion = document.getElementById("about");

  if (!motion) return;

  const video = document.getElementById("spotlight-video");
  const button = document.getElementById("spotlight-video-toggle");
  const pauseAnim = button.querySelector(".button-pause");
  const playAnim = button.querySelector(".button-play");

  let wasPlaying = null;
  let manuallyPaused = false;

  video.addEventListener("loadedmetadata", () => {
    button.style.setProperty("--duration", `${video.duration}s`);
  });

  function syncVideoWithMotion() {
    const isActive = motion.classList.contains("is-active");

    if (isActive) {
      console.log('active')
      if (!manuallyPaused) video.play();
    } else {
      console.log('not-active')
      video.pause();
    }
  }

  const motionObserver = new MutationObserver(syncVideoWithMotion);

  motionObserver.observe(motion, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // Initial state
  syncVideoWithMotion();

  // Button
  button.addEventListener("click", () => {
    if (video.paused) {
      manuallyPaused = false;

      if (motion.classList.contains("is-active")) {
        video.play();
      }
    } else {
      manuallyPaused = true;
      video.pause();
    }
  });

  function updateButton() {
    const playing = !video.paused;

    button.classList.toggle("is-playing", playing);
    button.setAttribute("aria-label", playing ? "Pause video" : "Play video");

    if (playing === wasPlaying) return;
    wasPlaying = playing;

    if (playing) pauseAnim.beginElement();
    else playAnim.beginElement();
  }

  video.addEventListener("play", updateButton);
  video.addEventListener("pause", updateButton);

  updateButton();
}

initSpotlight();