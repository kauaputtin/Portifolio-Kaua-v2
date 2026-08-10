/* ---- DARK/LIGHT MODE ---- */
function uiText(value) {
  return window.portfolioI18n?.t?.(value) || value;
}

const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const themeIcon = document.getElementById('themeIcon');
const mobileThemeIcon = document.getElementById('mobileThemeIcon');
const themeText = document.getElementById('themeText');
const mobileThemeText = document.getElementById('mobileThemeText');
const html = document.documentElement;
const assetBasePath = document.body?.classList.contains('journey-detail-page') ? '../' : '';

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
    ? `<img src="${assetBasePath}imagens/lua.png" alt="${uiText('Ícone de lua')}" class="theme-icon-image" />`
    : `<img src="${assetBasePath}imagens/sol.png" alt="${uiText('Ícone de sol')}" class="theme-icon-image" />`;
  const label = uiText(isDark ? 'Escuro' : 'Claro');

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
const mainNav = document.querySelector('.main-nav');

function updateMobileHeader() {
  if (!mainNav) return;
  const isMobile = window.matchMedia?.('(max-width: 768px)').matches;
  const menuIsOpen = mobileNav?.classList.contains('open');
  mainNav.classList.toggle('is-compact', Boolean(isMobile && !menuIsOpen && window.scrollY > 56));
}

function setMobileMenuOpen(isOpen) {
  if (!mobileNav || !hamburger) return;
  mobileNav.classList.toggle('open', isOpen);
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  hamburger.setAttribute('aria-label', uiText(isOpen ? 'Fechar menu' : 'Abrir menu'));
  mainNav?.classList.toggle('menu-open', isOpen);
  if (isOpen) mainNav?.classList.remove('is-compact');
  else updateMobileHeader();
}

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    setMobileMenuOpen(!mobileNav.classList.contains('open'));
  });
}

window.closeMobileNav = function closeMobileNav() {
  setMobileMenuOpen(false);
};

let mobileHeaderFrame = 0;
window.addEventListener(
  'scroll',
  () => {
    if (mobileHeaderFrame) return;
    mobileHeaderFrame = window.requestAnimationFrame(() => {
      updateMobileHeader();
      mobileHeaderFrame = 0;
    });
  },
  { passive: true }
);
window.addEventListener('resize', updateMobileHeader);
updateMobileHeader();

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

/* ---- AUTOMATIC PROJECT SHOWCASE ---- */
const projectShowcaseTrack = document.getElementById('projectShowcaseTrack');
const projectShowcaseShell = projectShowcaseTrack?.closest?.('.project-showcase-shell');
const projectShowcaseSource = projectShowcaseTrack?.querySelector?.('.project-showcase-group');

if (projectShowcaseTrack && projectShowcaseShell && projectShowcaseSource) {
  const projectShowcaseClone = projectShowcaseSource.cloneNode(true);
  projectShowcaseClone.setAttribute('aria-hidden', 'true');
  projectShowcaseClone.querySelectorAll('img').forEach((image) => {
    image.alt = '';
  });
  projectShowcaseTrack.append(projectShowcaseClone);
  projectShowcaseTrack.classList.add('is-ready');
  projectShowcaseShell.classList.add('is-ready');
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
  btn.textContent = uiText(isWhatsApp
    ? 'Enviar pelo WhatsApp →'
    : 'Enviar pelo Gmail →');
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
    btn.textContent = uiText(contactMethod === 'whatsapp' ? 'Abrindo WhatsApp...' : 'Abrindo Gmail...');
    btn.disabled = true;
  }

  if (success) {
    success.style.display = 'none';
    success.classList.remove('form-info');
  }

  const data = new FormData(form);
  const name = String(data.get('name') || '');
  const email = String(data.get('email') || '');
  const subject = String(data.get('subject') || uiText('Contato pelo portfólio'));
  const message = String(data.get('message') || '');

  if (contactMethod === 'whatsapp') {
    const whatsappUrl = `https://wa.me/5527981538302?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (success) {
      success.textContent = uiText('WhatsApp aberto. Agora é só confirmar o envio da mensagem.');
      success.classList.add('form-info');
    }
  } else {
    const body = [`${uiText('Nome')}: ${name}`, `E-mail: ${email}`, '', message].join('\n');
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('kauaputtin@gmail.com')}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    if (success) {
      success.textContent = uiText('Gmail aberto. Agora é só confirmar o envio da mensagem.');
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
    const title = el.getAttribute('data-prototype-title') || uiText('Protótipo');
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

/* ---- PROJECT DETAILS MODAL ---- */
const projectDetailModal = document.getElementById('projectDetailModal');
const projectDetailClose = document.getElementById('projectDetailClose');
const projectDetailTitle = document.getElementById('projectDetailTitle');
const projectDetailImage = document.getElementById('projectDetailImage');
const projectDetailDescription = document.getElementById('projectDetailDescription');
const projectDetailType = document.getElementById('projectDetailType');
const projectDetailPlatform = document.getElementById('projectDetailPlatform');
const projectDetailStack = document.getElementById('projectDetailStack');
const projectDetailVisit = document.getElementById('projectDetailVisit');
const projectDetailGithub = document.getElementById('projectDetailGithub');
const projectDetailPrototype = document.getElementById('projectDetailPrototype');

let projectDetailLastFocused = null;
let activeProjectPrototype = '';
let activeProjectTitle = '';

function setProjectDetailLink(link, url) {
  if (!link) return;
  link.hidden = !url;
  if (url) link.href = url;
  else link.removeAttribute('href');
}

function openProjectDetail(card) {
  if (!projectDetailModal || !card) return;
  const data = card.dataset;

  activeProjectTitle = data.projectTitle || uiText('Projeto');
  activeProjectPrototype = data.projectPrototype || '';
  projectDetailLastFocused = card;

  if (projectDetailTitle) projectDetailTitle.textContent = activeProjectTitle;
  if (projectDetailDescription) projectDetailDescription.textContent = data.projectDescription || '';
  if (projectDetailType) projectDetailType.textContent = data.projectType || uiText('Projeto digital');
  if (projectDetailPlatform) projectDetailPlatform.textContent = data.projectPlatform || '—';

  if (projectDetailImage) {
    projectDetailImage.src = data.projectImage || '';
    projectDetailImage.alt = window.portfolioI18n?.language === 'en'
      ? `Preview of project ${activeProjectTitle}`
      : `Visual do projeto ${activeProjectTitle}`;
  }

  if (projectDetailStack) {
    projectDetailStack.innerHTML = '';
    String(data.projectStack || '')
      .split('|')
      .map((item) => item.trim())
      .filter(Boolean)
      .forEach((technology) => {
        const tag = document.createElement('span');
        tag.textContent = uiText(technology);
        projectDetailStack.appendChild(tag);
      });
  }

  setProjectDetailLink(projectDetailVisit, data.projectUrl || '');
  setProjectDetailLink(projectDetailGithub, data.projectGithub || '');
  if (projectDetailPrototype) projectDetailPrototype.hidden = !activeProjectPrototype;

  projectDetailModal.classList.add('open');
  projectDetailModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  setTimeout(() => projectDetailClose?.focus?.(), 0);
}

function closeProjectDetailModal(restoreFocus = true) {
  if (!projectDetailModal) return;
  projectDetailModal.classList.remove('open');
  projectDetailModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  if (restoreFocus) projectDetailLastFocused?.focus?.();
}

document.querySelectorAll('.project-detail-trigger').forEach((card) => {
  card.addEventListener('click', () => openProjectDetail(card));
});

projectDetailClose?.addEventListener?.('click', () => closeProjectDetailModal());

projectDetailModal?.addEventListener?.('click', (ev) => {
  if (ev.target?.closest?.('[data-project-detail-close]')) closeProjectDetailModal();
});

projectDetailPrototype?.addEventListener?.('click', () => {
  if (!activeProjectPrototype) return;
  const triggerToRestore = projectDetailLastFocused;
  closeProjectDetailModal(false);
  openPrototypeModal(activeProjectPrototype, activeProjectTitle);
  lastFocused = triggerToRestore;
});

window.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape' && projectDetailModal?.classList?.contains('open')) {
    closeProjectDetailModal();
  }
});

/* ---- LOAD MORE PROJECTS ---- */
const loadMoreBtn = document.getElementById('loadMoreBtn');
const projectsGrid = document.getElementById('projectsGrid');
const projectCards = [...document.querySelectorAll('.project-card')];
const projectMobileQuery = window.matchMedia?.('(max-width: 768px)');
let projectsExpanded = false;

function updateProjectLoadMoreLabel() {
  if (!loadMoreBtn) return;
  loadMoreBtn.textContent = uiText(projectsExpanded
    ? 'Ver menos projetos \u2191'
    : 'Ver mais projetos \u2192');
}

function syncProjectsToViewport() {
  const visibleLimit = projectMobileQuery?.matches ? 4 : 6;
  const canExpand = projectCards.length > visibleLimit;

  projectCards.forEach((project, index) => {
    const wasHidden = project.classList.contains('hidden-project');
    const shouldHide = !projectsExpanded && index >= visibleLimit;

    project.classList.toggle('hidden-project', shouldHide);
    if (shouldHide) project.classList.remove('visible');

    if (wasHidden && !shouldHide) {
      requestAnimationFrame(() => project.classList.add('visible'));
    }
  });

  if (loadMoreBtn) {
    loadMoreBtn.hidden = !canExpand;
    loadMoreBtn.setAttribute('aria-expanded', String(projectsExpanded));
    updateProjectLoadMoreLabel();
  }
}

if (loadMoreBtn && projectsGrid && projectCards.length > 0) {
  loadMoreBtn.addEventListener('click', () => {
    projectsExpanded = !projectsExpanded;
    syncProjectsToViewport();
  });

  projectMobileQuery?.addEventListener?.('change', syncProjectsToViewport);
  syncProjectsToViewport();
}

/* ---- MOBILE CERTIFICATES TOGGLE ---- */
const certificateToggleBtn = document.getElementById('certificateToggleBtn');
const certificatesGrid = document.getElementById('certificatesGrid');
const certificateCards = [...document.querySelectorAll('.certificate-card')];
const certificateMobileQuery = window.matchMedia?.('(max-width: 768px)');
const certificateReducedMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
const certificateCollapseTimers = new WeakMap();
const certificateDetailModal = document.getElementById('certificateDetailModal');
const certificateDetailClose = document.getElementById('certificateDetailClose');
const certificateDetailTitle = document.getElementById('certificateDetailTitle');
const certificateDetailImage = document.getElementById('certificateDetailImage');

let certificateDetailLastFocused = null;
let activeCertificateCard = null;

function getCertificateTitle(card) {
  return card?.querySelector('.certificate-title')?.textContent?.trim() || uiText('Certificado');
}

function updateCertificateModalContent(card) {
  if (!card || !certificateDetailImage) return;
  const title = getCertificateTitle(card);

  if (certificateDetailTitle) certificateDetailTitle.textContent = title;
  certificateDetailImage.src = card.dataset.certificateImage || '';
  certificateDetailImage.alt = window.portfolioI18n?.language === 'en'
    ? `Certificate: ${title}`
    : `Certificado: ${title}`;
}

function openCertificateModal(card, trigger) {
  if (!certificateDetailModal || !card?.dataset?.certificateImage) return;
  certificateDetailLastFocused = trigger || document.activeElement;
  activeCertificateCard = card;
  updateCertificateModalContent(card);

  certificateDetailModal.classList.add('open');
  certificateDetailModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  setTimeout(() => certificateDetailClose?.focus?.(), 0);
}

function closeCertificateModal() {
  if (!certificateDetailModal) return;
  certificateDetailModal.classList.remove('open');
  certificateDetailModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (certificateDetailImage) {
    certificateDetailImage.removeAttribute('src');
    certificateDetailImage.alt = '';
  }

  certificateDetailLastFocused?.focus?.();
  certificateDetailLastFocused = null;
  activeCertificateCard = null;
}

function syncCertificateViewButtons() {
  certificateCards.forEach((card) => {
    const button = card.querySelector('.certificate-view-btn');
    if (!button) return;
    button.textContent = uiText('Ver certificado');
    button.setAttribute('aria-label', `${uiText('Ver certificado')}: ${getCertificateTitle(card)}`);
  });
}

certificateCards.forEach((card) => {
  const button = card.querySelector('.certificate-view-btn');
  button?.addEventListener?.('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    openCertificateModal(card, button);
  });
});

certificateDetailClose?.addEventListener?.('click', closeCertificateModal);

certificateDetailModal?.addEventListener?.('click', (event) => {
  if (event.target?.closest?.('[data-certificate-detail-close]')) closeCertificateModal();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && certificateDetailModal?.classList?.contains('open')) {
    closeCertificateModal();
  }
});

syncCertificateViewButtons();

function setCertificateCardExpanded(card, isExpanded) {
  const button = card.querySelector('.certificate-expand-btn');
  const isMobile = certificateMobileQuery?.matches ?? false;
  const shouldExpand = Boolean(isMobile && isExpanded);
  const details = [...card.querySelectorAll('.certificate-desc')];
  const pendingCollapse = certificateCollapseTimers.get(card);

  if (pendingCollapse) {
    window.clearTimeout(pendingCollapse);
    certificateCollapseTimers.delete(card);
  }

  if (shouldExpand || !isMobile) {
    details.forEach((detail) => { detail.hidden = false; });
  }

  card.classList.toggle('certificate-card-expanded', shouldExpand);
  button?.setAttribute('aria-expanded', String(shouldExpand));
  button?.setAttribute(
    'aria-label',
    uiText(shouldExpand ? 'Recolher detalhes do certificado' : 'Mostrar detalhes do certificado')
  );

  details.forEach((detail) => {
    detail.setAttribute('aria-hidden', String(isMobile && !shouldExpand));
  });

  if (isMobile && !shouldExpand) {
    const collapseDelay = certificateReducedMotionQuery?.matches ? 0 : 360;
    const collapseTimer = window.setTimeout(() => {
      if (!card.classList.contains('certificate-card-expanded')) {
        details.forEach((detail) => { detail.hidden = true; });
      }
      certificateCollapseTimers.delete(card);
    }, collapseDelay);

    certificateCollapseTimers.set(card, collapseTimer);
  }
}

certificateCards.forEach((card) => {
  const button = document.createElement('button');
  button.className = 'certificate-expand-btn';
  button.type = 'button';
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', uiText('Mostrar detalhes do certificado'));
  button.innerHTML = '<span aria-hidden="true"></span>';
  card.append(button);

  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setCertificateCardExpanded(card, !card.classList.contains('certificate-card-expanded'));
  });
});

function syncCertificateCardsToViewport() {
  certificateCards.forEach((card) => {
    if (!certificateMobileQuery?.matches) card.classList.remove('certificate-card-expanded');
    setCertificateCardExpanded(card, card.classList.contains('certificate-card-expanded'));
  });
}

certificateMobileQuery?.addEventListener?.('change', syncCertificateCardsToViewport);
syncCertificateCardsToViewport();

certificateToggleBtn?.addEventListener?.('click', () => {
  if (!certificatesGrid) return;
  const isExpanded = certificatesGrid.classList.toggle('certificates-expanded');
  certificateToggleBtn.setAttribute('aria-expanded', String(isExpanded));
  certificateToggleBtn.textContent = uiText(isExpanded
    ? 'Ver menos certificados ↑'
    : 'Ver mais certificados →');

  if (isExpanded) {
    certificatesGrid.querySelectorAll('.certificate-card').forEach((card) => card.classList.add('visible'));
  }
});

window.addEventListener('portfolio:languagechange', () => {
  updateThemeUI(html.getAttribute('data-theme') || 'dark');
  if (hamburger && mobileNav) setMobileMenuOpen(mobileNav.classList.contains('open'));
  updateContactSubmitLabel();

  updateProjectLoadMoreLabel();
  syncCertificateViewButtons();
  if (certificateDetailModal?.classList?.contains('open') && activeCertificateCard) {
    updateCertificateModalContent(activeCertificateCard);
  }

  syncCertificateCardsToViewport();
  if (certificateToggleBtn && certificatesGrid) {
    const certificatesExpanded = certificatesGrid.classList.contains('certificates-expanded');
    certificateToggleBtn.textContent = uiText(certificatesExpanded
      ? 'Ver menos certificados ↑'
      : 'Ver mais certificados →');
  }

  if (projectDetailModal?.classList.contains('open') && projectDetailLastFocused) {
    openProjectDetail(projectDetailLastFocused);
  }
});
