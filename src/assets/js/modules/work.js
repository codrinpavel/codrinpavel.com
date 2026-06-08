/**
 * Make work images load eagerly 
 * when Work section is less than 500px away
 */

document.addEventListener("DOMContentLoaded", () => {
  const work = document.getElementById("work");

  if (!work) return;

  const makeImagesEager = () => {
    work.querySelectorAll("img[loading='lazy']").forEach(img => {
      img.loading = "eager";
      img.setAttribute("loading", "eager");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        makeImagesEager();
        observer.disconnect(); // run only once
      }
    },
    {
      root: null,
      rootMargin: "500px 0px 500px 0px",
      threshold: 0
    }
  );

  observer.observe(work);
});