const videos = document.querySelectorAll(".reel");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;

      if (entry.isIntersecting) {
        // Lazy-load only once
        if (!video.src) {
          video.src = video.dataset.src;
        }

        video.play().catch(() => {});
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