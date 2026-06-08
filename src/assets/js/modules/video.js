const video = document.getElementById("spotlight-video");
const button = document.getElementById("spotlight-video-toggle");
const pauseAnim = button.querySelector(".button-pause");
const playAnim = button.querySelector(".button-play");

let wasPlaying = null;

video.addEventListener("loadedmetadata", () => {
  button.style.setProperty("--duration", `${video.duration}s`);
});

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      video.play();
    } else {
      video.pause();
    }
  },
  { threshold: [0, 0.5, 1] }
);

observer.observe(video);

// Button
button.addEventListener("click", () => {
  video.paused ? video.play() : video.pause();
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