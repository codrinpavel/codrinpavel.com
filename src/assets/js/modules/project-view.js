export function updateProjectView(linkOrHash) {
  const view = document.querySelector('[data-view="project"]');

  let hash;

  if (typeof linkOrHash === "string") {
    hash = linkOrHash.replace(/^#/, "");
  } else {
    if (!linkOrHash?.matches(".js-project")) return;
    hash = linkOrHash.getAttribute("href").replace(/^#/, "");
  }

  const project = featuredProjects[hash];
  if (!project) return;

  // circular navigation prev/next
  const projectKeys = Object.keys(featuredProjects);
  const currentIndex = projectKeys.indexOf(hash);

  const data = {
    ...project,
    prev: `#${projectKeys[(currentIndex - 1 + projectKeys.length) % projectKeys.length]}`,
    next: `#${projectKeys[(currentIndex + 1) % projectKeys.length]}`
  };

  view.id = hash;
  bindSlots(view, data);
}

function bindSlots(root, data) {
  root.querySelectorAll("[data-text]").forEach((el) => {
    el.textContent = data[el.dataset.text] ?? "";
  });

  root.querySelectorAll("[data-html]").forEach((el) => {
    el.innerHTML = data[el.dataset.html] ?? "";
  });

  root.querySelectorAll("[data-href]").forEach((el) => {
    el.href = data[el.dataset.href] ?? "#";
  });
}