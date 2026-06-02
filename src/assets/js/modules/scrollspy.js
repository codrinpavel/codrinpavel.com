const links = [...document.querySelectorAll('a[href^="#"]')];

const items = links
  .map(link => {
    const section = document.querySelector(link.getAttribute("href"));
    return section ? { link, section } : null;
  })
  .filter(Boolean);

// Create an observer to track which sections are in view
const observerOptions = {
  // rootMargin adjusts when the callback fires. 
  // "-100px 0px -70% 0px" approximates your 100px offset 
  // and focuses on the top portion of the viewport.
  rootMargin: '-100px 0px -70% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      
      links.forEach(link => {
        link.classList.toggle("is-active", link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, observerOptions);

// Observe each section
items.forEach(item => observer.observe(item.section));



/*
const links = [...document.querySelectorAll('a[href^="#"]')];
const offset = 100;

const items = links
  .map(link => {
    const section = document.querySelector(link.getAttribute("href"));
    return section ? { link, section } : null;
  })
  .filter(Boolean);

function setActiveLink() {
  let current = null;

  for (const item of items) {
    const top = item.section.getBoundingClientRect().top;

    if (top <= offset && (!current || top > current.top)) {
      current = { ...item, top };
    }
  }

  links.forEach(link => {
    link.classList.toggle("is-active", current?.link === link);
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("resize", setActiveLink);
window.addEventListener("load", setActiveLink);

setActiveLink();
*/