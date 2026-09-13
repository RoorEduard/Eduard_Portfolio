'use strict';

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const navLinks = document.querySelectorAll('.site-nav a');
const revealElements = document.querySelectorAll('.reveal');

function setMenuState(isOpen) {
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menu.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
}

function initializeMenu() {
  if (!menuToggle || !menu) {
    return;
  }

  menuToggle.addEventListener('click', () => {
    const isMenuOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isMenuOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });
}

function initializeHeaderScroll() {
  if (!header) {
    return;
  }

  const updateHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 18);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
}

function initializeRevealAnimation() {
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  });

  revealElements.forEach((element) => observer.observe(element));
}

initializeMenu();
initializeHeaderScroll();
initializeRevealAnimation();
