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
} else {
  fadeEls.forEach((el) => el.classList.add('visible'));
}

/* ---- CONTACT FORM (GitHub Pages-friendly) ---- */
const contactForm = document.getElementById('contactForm');

function getSelectedContactMethod(form = contactForm) {
  return form?.querySelector?.('input[name="contactMethod"]:checked')?.value || 'email';
}

function updateContactSubmitLabel() {
  const btn = contactForm?.querySelector?.('.form-submit');
  const isWhatsApp = getSelectedContactMethod() === 'whatsapp';

  contactForm?.querySelectorAll?.('[data-contact-email-only]').forEach((group) => {
    group.hidden = isWhatsApp;
    group.querySelectorAll('input').forEach((input) => {
      input.disabled = isWhatsApp;
    });
  });

  if (!btn) return;
  btn.textContent = isWhatsApp
    ? 'Enviar pelo WhatsApp →'
    : 'Enviar pelo Gmail →';
}

contactForm?.querySelectorAll?.('input[name="contactMethod"]').forEach((option) => {
  option.addEventListener('change', () => {
    const success = document.getElementById('formSuccess');
    if (success) success.style.display = 'none';
    updateContactSubmitLabel();
  });
});

updateContactSubmitLabel();

window.handleSubmit = function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form?.querySelector?.('.form-submit');
  const success = document.getElementById('formSuccess');
  const contactMethod = getSelectedContactMethod(form);

  if (btn) {
    btn.textContent = contactMethod === 'whatsapp' ? 'Abrindo WhatsApp...' : 'Abrindo Gmail...';
    btn.disabled = true;
  }

  if (success) {
    success.style.display = 'none';
    success.classList.remove('form-info');
  }

  const data = new FormData(form);
  const name = String(data.get('name') || '');
  const email = String(data.get('email') || '');
  const subject = String(data.get('subject') || 'Contato pelo portfólio');
  const message = String(data.get('message') || '');

  if (contactMethod === 'whatsapp') {
    const whatsappUrl = `https://wa.me/5527981538302?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (success) {
      success.textContent = 'WhatsApp aberto. Agora é só confirmar o envio da mensagem.';
      success.classList.add('form-info');
    }
  } else {
    const body = [`Nome: ${name}`, `E-mail: ${email}`, '', message].join('\n');
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('kauaputtin@gmail.com')}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    if (success) {
      success.textContent = 'Gmail aberto. Agora é só confirmar o envio da mensagem.';
      success.classList.add('form-info');
    }
  }

  if (success) success.style.display = 'block';

  if (btn) {
    btn.disabled = false;
    updateContactSubmitLabel();
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

/* ---- MOBILE CERTIFICATES TOGGLE ---- */
const certificateToggleBtn = document.getElementById('certificateToggleBtn');
const certificatesGrid = document.getElementById('certificatesGrid');

certificateToggleBtn?.addEventListener?.('click', () => {
  if (!certificatesGrid) return;
  const isExpanded = certificatesGrid.classList.toggle('certificates-expanded');
  certificateToggleBtn.setAttribute('aria-expanded', String(isExpanded));
  certificateToggleBtn.textContent = isExpanded
    ? 'Ver menos certificados ↑'
    : 'Ver mais certificados →';

  if (isExpanded) {
    certificatesGrid.querySelectorAll('.certificate-card').forEach((card) => card.classList.add('visible'));
  }
});
