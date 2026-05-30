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