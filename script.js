/* ---- DARK/LIGHT MODE ---- */
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const themeIcon = document.getElementById('themeIcon');
const mobileThemeIcon = document.getElementById('mobileThemeIcon');
const themeText = document.getElementById('themeText');
const mobileThemeText = document.getElementById('mobileThemeText');
const html = document.documentElement;

const themeButtons = [themeToggle, mobileThemeToggle].filter(Boolean);

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('theme', theme);
  } catch {}
  updateThemeUI(theme);
}

function toggleTheme() {
  const current = html.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
}

function updateThemeUI(theme) {
  const isDark = theme === 'dark';
  const iconHtml = isDark
    ? `<img src="imagens/lua.png" alt="Ícone de lua" class="theme-icon-image" />`
    : `<img src="imagens/sol.png" alt="Ícone de sol" class="theme-icon-image" />`;
  const label = isDark ? 'Escuro' : 'Claro';

  if (themeIcon) themeIcon.innerHTML = iconHtml;
  if (themeText) themeText.textContent = label;
  if (mobileThemeIcon) mobileThemeIcon.innerHTML = iconHtml;
  if (mobileThemeText) mobileThemeText.textContent = label;
}

let savedTheme = 'dark';
try {
  savedTheme = localStorage.getItem('theme') || 'dark';
} catch {}
setTheme(savedTheme);

themeButtons.forEach((btn) => btn.addEventListener('click', toggleTheme));

/* ---- MOBILE NAV ---- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}

window.closeMobileNav = function closeMobileNav() {
  if (!mobileNav) return;
  mobileNav.classList.remove('open');
};

/* ---- SCROLL ANIMATIONS (IntersectionObserver) ---- */
const fadeEls = document.querySelectorAll('.fade-up');
const skillLevels = document.querySelectorAll('.skill-levels');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach((el) => observer.observe(el));

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const levelsContainer = entry.target;
        const level = Number.parseInt(levelsContainer.dataset.level || '0', 10) || 0;
        levelsContainer.innerHTML = '';
        for (let i = 0; i < 10; i++) {
          const levelDiv = document.createElement('div');
          levelDiv.className = 'skill-level' + (i < level ? ' filled' : '');
          levelsContainer.appendChild(levelDiv);
        }
        skillObserver.unobserve(levelsContainer);
      });
    },
    { threshold: 0.5 }
  );

  skillLevels.forEach((levels) => skillObserver.observe(levels));
} else {
  fadeEls.forEach((el) => el.classList.add('visible'));
}

/* ---- CONTACT FORM (GitHub Pages-friendly) ---- */
window.handleSubmit = function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form?.querySelector?.('.form-submit');
  const success = document.getElementById('formSuccess');

  if (btn) {
    btn.textContent = 'Enviando...';
    btn.disabled = true;
  }

  const data = new FormData(form);
  const name = String(data.get('name') || '');
  const email = String(data.get('email') || '');
  const subject = String(data.get('subject') || 'Contato pelo portfólio');
  const message = String(data.get('message') || '');

  const body = [`Nome: ${name}`, `E-mail: ${email}`, '', message].join('\n');
  const mailto = `mailto:kauaputtin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Em GitHub Pages não existe backend/PHP; usa mailto como fallback.
  window.location.href = mailto;

  form?.reset?.();
  if (success) success.style.display = 'block';

  if (btn) {
    btn.textContent = 'Enviar mensagem →';
    btn.disabled = false;
  }
};

/* ---- ACTIVE NAV LINK on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener(
  'scroll',
  () => {
    let current = '';
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.getAttribute('id') || '';
    });
    navLinks.forEach((a) => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
    });
  },
  { passive: true }
);

/* ---- PROTOTYPE MODAL (Figma) ---- */
const prototypeModal = document.getElementById('prototypeModal');
const prototypeFrame = document.getElementById('prototypeFrame');
const prototypeTitle = document.getElementById('prototypeTitle');
const prototypeClose = document.getElementById('prototypeClose');

let lastFocused = null;

function isMobileView() {
  return !!(window.matchMedia && window.matchMedia('(max-width: 768px)').matches);
}

function getPrototypeSrc(el) {
  if (!el || typeof el.getAttribute !== 'function') return null;
  const mobileSrc = el.getAttribute('data-prototype-src-mobile');
  const src = el.getAttribute('data-prototype-src');
  return mobileSrc && isMobileView() ? mobileSrc : src;
}

function openPrototypeModal(src, title) {
  if (!prototypeModal || !prototypeFrame) return;
  lastFocused = document.activeElement;

  if (prototypeTitle && title) prototypeTitle.textContent = title;
  if (title) prototypeFrame.setAttribute('title', title);

  prototypeFrame.src = src;
  prototypeModal.classList.add('open');
  prototypeModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  setTimeout(() => prototypeClose?.focus?.(), 0);
}

function closePrototypeModal() {
  if (!prototypeModal || !prototypeFrame) return;
  prototypeModal.classList.remove('open');
  prototypeModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  prototypeFrame.src = '';

  lastFocused?.focus?.();
  lastFocused = null;
}

document.querySelectorAll('.js-open-prototype[data-prototype-src]').forEach((el) => {
  el.addEventListener('click', (ev) => {
    ev.preventDefault();
    const src = getPrototypeSrc(el);
    if (!src) return;
    const title = el.getAttribute('data-prototype-title') || 'Protótipo';
    openPrototypeModal(src, title);
  });
});

prototypeClose?.addEventListener?.('click', closePrototypeModal);

prototypeModal?.addEventListener?.('click', (ev) => {
  const target = ev.target;
  if (target?.closest?.('[data-modal-close]')) closePrototypeModal();
});

window.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape' && prototypeModal?.classList?.contains('open')) closePrototypeModal();
});

/* ---- PROJECT CARD (click whole card) ---- */
document.querySelectorAll('.project-card[data-card-url]').forEach((card) => {
  card.addEventListener('click', (ev) => {
    const target = ev.target;
    if (target?.closest?.('a,button')) return;

    const url = card.getAttribute('data-card-url');
    if (url) window.open(url, '_blank');
  });
});

/* ---- LOAD MORE PROJECTS ---- */
const loadMoreBtn = document.getElementById('loadMoreBtn');
const hiddenProjects = document.querySelectorAll('.hidden-project');

if (loadMoreBtn && hiddenProjects.length > 0) {
  loadMoreBtn.addEventListener('click', () => {
    hiddenProjects.forEach((project) => {
      project.classList.remove('hidden-project');
      setTimeout(() => project.classList.add('visible'), 100);
    });
    loadMoreBtn.style.display = 'none';
  });
}
