document.addEventListener('click', (event) => {
  event.preventDefault();
  const el = event.target.closest('.js-project');

  if (!el) return;

  try {
    const projects = JSON.parse(el.dataset.projects || '[]');
    console.log(projects);
  } catch (err) {
    console.error('Invalid data-projects JSON', err);
  }
});