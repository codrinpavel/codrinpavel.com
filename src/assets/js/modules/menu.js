const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');

const BODY_CLASS = 'menu-open';
const MENU_CLASS = 'is-open';

function openMenu() {
  menu.classList.add(MENU_CLASS);
  menu.inert = false;

  menuButton.setAttribute('aria-expanded', 'true');
  document.body.classList.add(BODY_CLASS);

  const firstFocusable = menu.querySelector('a');
  firstFocusable?.focus();
}

function closeMenu() {
  menu.classList.remove(MENU_CLASS);
  menu.inert = true;

  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove(BODY_CLASS);

  menuButton.focus();
}

function toggleMenu() {
  menu.classList.contains(MENU_CLASS)
    ? closeMenu()
    : openMenu();
}

menuButton.addEventListener('click', toggleMenu);

document.addEventListener('keydown', (event) => {
  if (
    event.key === 'Escape' &&
    menu.classList.contains(MENU_CLASS)
  ) {
    closeMenu();
  }
});