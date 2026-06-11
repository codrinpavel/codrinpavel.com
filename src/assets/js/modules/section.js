function activateSection(hash) {
  const targetSection = document.querySelector(`section${hash}`);
  const headerPosition = `header-position-${targetSection?.dataset.headerPosition || 'top'}`;

  document.body.classList.remove('header-position-top', 'header-position-bottom');
  document.body.classList.add(headerPosition);

  document.querySelector('section.is-active')?.classList.remove('is-active');
  document.querySelector('a.is-active')?.classList.remove('is-active');

  document.querySelector(`a[href="${hash}"]`)?.classList.add('is-active');
  targetSection?.classList.add('is-active');

  //document.querySelectorAll('section:not(.is-active) .is-inview').forEach(el => el.classList.remove('is-inview'));
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');

  if (!link) return;
  e.preventDefault();
  const hash = link.getAttribute('href');

  history.pushState(null, '', hash);
  activateSection(hash);
});

// Handle direct visits such as example.com#about
if (window.location.hash) {
  activateSection(window.location.hash);
}

// Handle browser back/forward through hashes
window.addEventListener('popstate', () => {
  if (window.location.hash) {
    activateSection(window.location.hash);
  }
});