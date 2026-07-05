// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Terminal typing effect (runs once on load, respects reduced motion)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const typedLines = document.querySelectorAll('.typed-line');

function typeLine(el, speed) {
  const text = el.getAttribute('data-text') || '';
  if (prefersReducedMotion) {
    el.textContent = text;
    return Promise.resolve();
  }
  return new Promise(resolve => {
    let i = 0;
    el.textContent = '';
    const timer = setInterval(() => {
      el.textContent = text.slice(0, i + 1);
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

async function runTyping() {
  for (const el of typedLines) {
    await typeLine(el, 14);
  }
}

if (typedLines.length) {
  runTyping();
}
