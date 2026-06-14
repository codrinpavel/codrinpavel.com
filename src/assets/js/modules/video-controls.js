function initSpotlight() {
  const motion = document.getElementById("about");

  if(!motion) return;

  const video = document.getElementById("spotlight-video");
  const button = document.getElementById("spotlight-video-toggle");
  const pauseAnim = button.querySelector(".button-pause");
  const playAnim = button.querySelector(".button-play");

  video.addEventListener("loadedmetadata", () => {
    button.style.setProperty("--duration", `${video.duration}s`);
  });

  // Button
  button.addEventListener("click", () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  function updateButton() {
    const playing = !video.paused;

    button.classList.toggle("is-playing", playing);
    button.setAttribute("aria-label", playing ? "Pause video" : "Play video");

    if (playing) pauseAnim.beginElement();
    else playAnim.beginElement();
  }

  video.addEventListener("play", updateButton);
  video.addEventListener("pause", updateButton);

  updateButton();
}

initSpotlight();