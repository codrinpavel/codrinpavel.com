const videos = document.querySelectorAll("video, iframe");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;

      if (entry.isIntersecting) {
        if (!video.src) video.src = video.dataset.src;
        video.play();
      } else {
        video.pause();
      }
    });
  },
  {
    rootMargin: "200px 0px",
  }
);

videos.forEach((video) => {
  observer.observe(video);
});