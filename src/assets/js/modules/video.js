const media = document.querySelectorAll("video, iframe");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.isIntersecting) {
        if (!el.src && el.dataset.src) {
          el.src = el.dataset.src;
        }

        if (el instanceof HTMLVideoElement) {
          el.play();
        }
      } else {
        if (el instanceof HTMLVideoElement) {
          el.pause();
        }
      }
    });
  },
  {
    rootMargin: "200px 0px",
  }
);

media.forEach((el) => {
  observer.observe(el);
});