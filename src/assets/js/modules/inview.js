const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
      } else {
        entry.target.classList.remove('is-inview');
      }
    });
  },
  {
    threshold: 0, // element is considered in view when 25% visible
  }
);

document.querySelectorAll('.use-inview').forEach((el) => {
  observer.observe(el);
});