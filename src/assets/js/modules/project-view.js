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

  view.id = hash;

  Object.entries(project).forEach(([key, value]) => {
    const slot = view.querySelector(`[data-slot="${key}"]`);
    if (!slot) return;

    if (key === "picture") {
      slot.innerHTML = value;
    } else if (key === "url") {
      slot.href = value;
    } else {
      slot.textContent = value;
    }
  });
}