const video = document.querySelector(".reel");

if (video) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Lazy-load only once
        if (!video.src) {
          video.src = video.dataset.src;
        }

        video.play().catch(() => { });
      } else {
        video.pause();
      }
    },
    {
      rootMargin: "200px 0px",
    }
  );

  observer.observe(video);
}