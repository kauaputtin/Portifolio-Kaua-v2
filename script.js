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
  return form?.querySelector?.('input[name="contactMethod"]:checked')?.value || 'whatsapp';
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
    const label = uiText(card.classList.contains('certificate-card-group') ? 'Ver certificados' : 'Ver certificado');
    button.textContent = label;
    button.setAttribute('aria-label', `${label}: ${getCertificateTitle(card)}`);
  });
}

certificateCards.forEach((card) => {
  const button = card.querySelector('.certificate-view-btn');
  button?.addEventListener?.('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (window.openCertificateViewer) window.openCertificateViewer(card, button);
    else openCertificateModal(card, button);
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


/* ---- HERO PHOTO LOAD ANIMATION ---- */
(() => {
  const visual = document.getElementById('heroVisual');
  const photo = visual?.querySelector('.hero-photo');
  if (!visual || !photo) return;

  visual.classList.add('hero-anim');
  let done = false;
  const reveal = () => {
    if (done) return;
    done = true;
    requestAnimationFrame(() => visual.classList.add('is-loaded'));
  };

  if (photo.complete && photo.naturalWidth) reveal();
  else {
    photo.addEventListener('load', reveal, { once: true });
    photo.addEventListener('error', reveal, { once: true });
    setTimeout(reveal, 4000);
  }
})();


/* ---- CERTIFICADOS: lista, resumo animado, prévia e visualizador ---- */
(() => {
  const section = document.getElementById('certificates');
  if (!section) return;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  const esc = (v) => String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const txt = (el, sel) => el?.querySelector?.(sel)?.textContent?.trim() || '';

  /* resumo: números contando + barra crescendo quando aparece */
  const summary = document.getElementById('certSummary');
  const counters = [...(summary?.querySelectorAll('[data-cert-count]') || [])];
  if (summary && !reduce && 'IntersectionObserver' in window) {
    counters.forEach((el) => { el.textContent = '0'; });
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      summary.classList.add('is-in');
      counters.forEach((el) => {
        const to = Number(el.dataset.certCount) || 0;
        const start = performance.now();
        const dur = to > 20 ? 1400 : 900;
        const step = (now) => {
          const p = Math.min((now - start) / dur, 1);
          el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.35 });
    io.observe(summary);
  } else summary?.classList.add('is-in');

  /* grupo da UVV: abre/fecha */
  section.querySelectorAll('.cert-row-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      btn.closest('.cert-row-group')?.classList.toggle('is-open', open);
    });
  });

  /* prévia flutuante no desktop */
  const wrap = section.querySelector('.cert-list-wrap');
  const preview = section.querySelector('.cert-preview');
  const previewImg = preview?.querySelector('img');
  const fine = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches;
  if (fine && wrap && preview && previewImg) {
    let raf = 0;
    let px = 0;
    let py = 0;
    const place = () => {
      raf = 0;
      const r = wrap.getBoundingClientRect();
      const w = preview.offsetWidth;
      const h = preview.offsetHeight;
      let x = px - r.left + 28;
      if (x + w > r.width) x = px - r.left - w - 28;
      const y = Math.max(0, Math.min(py - r.top - h / 2, r.height - h));
      preview.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    wrap.addEventListener('pointermove', (e) => {
      const row = e.target.closest('.cert-row, .cert-row-group');
      const src = row?.dataset.src || row?.closest('.cert-row-group')?.dataset.src;
      if (!src) { preview.classList.remove('show'); return; }
      if (previewImg.getAttribute('src') !== src) previewImg.src = src;
      preview.classList.add('show');
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(place);
    });
    wrap.addEventListener('pointerleave', () => preview.classList.remove('show'));
  }

  /* ---------- visualizador em tela cheia ---------- */
  const viewer = document.createElement('div');
  viewer.className = 'cert-viewer';
  viewer.setAttribute('role', 'dialog');
  viewer.setAttribute('aria-modal', 'true');
  viewer.setAttribute('aria-hidden', 'true');
  viewer.innerHTML = `
    <div class="cert-viewer-bar">
      <div class="cert-viewer-heading"><strong class="cert-viewer-group"></strong><span class="cert-viewer-count"></span></div>
      <button class="cert-viewer-close" type="button">&times;</button>
    </div>
    <div class="cert-viewer-track"></div>
    <button class="cert-viewer-arrow cert-viewer-prev" type="button">&lsaquo;</button>
    <button class="cert-viewer-arrow cert-viewer-next" type="button">&rsaquo;</button>
    <div class="cert-viewer-dots"></div>
    <p class="cert-viewer-hint"></p>`;
  document.body.append(viewer);
  const track = viewer.querySelector('.cert-viewer-track');
  const dots = viewer.querySelector('.cert-viewer-dots');
  const count = viewer.querySelector('.cert-viewer-count');
  const heading = viewer.querySelector('.cert-viewer-group');
  const hint = viewer.querySelector('.cert-viewer-hint');
  const closeBtn = viewer.querySelector('.cert-viewer-close');
  const prevBtn = viewer.querySelector('.cert-viewer-prev');
  const nextBtn = viewer.querySelector('.cert-viewer-next');
  let items = [];
  let index = 0;
  let lastFocus = null;

  const itemOf = (row) => ({
    src: row.dataset.src,
    title: txt(row, '.cert-row-title'),
    issuer: txt(row, '.cert-row-issuer'),
    type: txt(row, '.cert-row-type'),
    date: txt(row, '.cert-row-date'),
    hours: txt(row, '.cert-row-hours'),
    desc: txt(row, '.cert-row-desc'),
  });

  function render() {
    track.innerHTML = items.map((it, i) => `
      <figure class="cert-viewer-slide" aria-label="${i + 1} / ${items.length}">
        <div class="cert-viewer-media"><img src="${esc(it.src)}" alt="${esc(it.title)}" draggable="false" /></div>
        <figcaption class="cert-viewer-info">
          <div class="cert-viewer-meta">
            ${it.type ? `<span class="cert-viewer-chip">${esc(it.type)}</span>` : ''}
            ${it.date ? `<span>${esc(it.date)}</span>` : ''}
            ${it.hours ? `<span class="cert-viewer-hours">${esc(it.hours)}</span>` : ''}
          </div>
          <h3>${esc(it.title)}</h3>
          ${it.issuer ? `<p class="cert-viewer-issuer">${esc(it.issuer)}</p>` : ''}
          ${it.desc ? `<p class="cert-viewer-desc">${esc(it.desc)}</p>` : ''}
        </figcaption>
      </figure>`).join('');
    dots.innerHTML = items.length > 1 ? items.map((_, i) => `<button type="button" aria-label="${i + 1}"></button>`).join('') : '';
    dots.querySelectorAll('button').forEach((b, i) => b.addEventListener('click', () => go(i)));
    viewer.classList.toggle('is-single', items.length < 2);
  }

  function update() {
    count.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
    dots.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === index));
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === items.length - 1;
  }

  function go(i, smooth = true) {
    index = Math.max(0, Math.min(items.length - 1, i));
    track.scrollTo({ left: index * track.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
    update();
  }

  track.addEventListener('scroll', () => {
    const i = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    if (i !== index) { index = i; update(); viewer.classList.add('swiped'); }
  }, { passive: true });

  function open(list, start, source, title) {
    items = list.filter((it) => it.src);
    if (!items.length) return;
    lastFocus = source || document.activeElement;
    heading.textContent = title || uiText('Certificado');
    viewer.setAttribute('aria-label', heading.textContent);
    closeBtn.setAttribute('aria-label', uiText('Fechar certificado'));
    prevBtn.setAttribute('aria-label', uiText('Certificado anterior'));
    nextBtn.setAttribute('aria-label', uiText('Próximo certificado'));
    hint.textContent = uiText('Arraste para o lado para ver os outros');
    render();
    viewer.classList.remove('swiped', 'is-entering');
    viewer.classList.add('open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    go(start || 0, false);
    closeBtn.focus({ preventScroll: true });
    void viewer.offsetWidth;
    viewer.classList.add('is-entering');
    if (reduce || !viewer.animate) return;
    const r = source?.getBoundingClientRect?.();
    const cx = r ? r.left + r.width / 2 : innerWidth / 2;
    const cy = r ? r.top + r.height / 2 : innerHeight / 2;
    viewer.animate(
      [{ clipPath: `circle(0px at ${cx}px ${cy}px)` }, { clipPath: `circle(150% at ${cx}px ${cy}px)` }],
      { duration: 520, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' }
    );
    const img = track.querySelectorAll('.cert-viewer-slide img')[index];
    img?.animate?.(
      [
        { transform: 'translateY(40px) scale(0.82) rotate(-2deg)', opacity: 0 },
        { transform: 'translateY(0) scale(1.02) rotate(0deg)', opacity: 1, offset: 0.7 },
        { transform: 'translateY(0) scale(1) rotate(0deg)', opacity: 1 },
      ],
      { duration: 620, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', delay: 80, fill: 'backwards' }
    );
  }

  function close() {
    if (!viewer.classList.contains('open')) return;
    viewer.classList.remove('open', 'is-entering');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    setTimeout(() => { if (!viewer.classList.contains('open')) track.innerHTML = ''; }, 300);
    lastFocus?.focus?.({ preventScroll: true });
  }

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => go(index - 1));
  nextBtn.addEventListener('click', () => go(index + 1));
  viewer.addEventListener('click', (e) => { if (e.target === viewer || e.target.classList?.contains('cert-viewer-slide')) close(); });
  window.addEventListener('keydown', (e) => {
    if (!viewer.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') go(index - 1);
    if (e.key === 'ArrowRight') go(index + 1);
  });
  window.addEventListener('resize', () => { if (viewer.classList.contains('open')) go(index, false); });

  // arrastar para baixo fecha
  let sy = null;
  let sx = null;
  track.addEventListener('touchstart', (e) => { sy = e.touches[0].clientY; sx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchmove', (e) => {
    if (sy === null) return;
    const dy = e.touches[0].clientY - sy;
    if (dy > 0 && dy > Math.abs(e.touches[0].clientX - sx) * 1.4) {
      viewer.style.setProperty('--drag', `${Math.min(dy, 260)}px`);
      viewer.classList.add('dragging');
    }
  }, { passive: true });
  track.addEventListener('touchend', () => {
    const d = parseFloat(viewer.style.getPropertyValue('--drag')) || 0;
    viewer.classList.remove('dragging');
    viewer.style.removeProperty('--drag');
    sy = null;
    if (d > 110) close();
  });

  /* abrir a partir da lista */
  const activate = (row) => {
    const sub = row.closest('.cert-sublist');
    if (sub) {
      const rows = [...sub.querySelectorAll('.cert-row-sub')];
      open(rows.map(itemOf), rows.indexOf(row), row, txt(row.closest('.cert-row-group'), '.cert-row-toggle .cert-row-title'));
    } else {
      open([itemOf(row)], 0, row, uiText('Certificado'));
    }
  };
  section.querySelectorAll('.cert-row[data-src]').forEach((row) => {
    row.addEventListener('click', () => activate(row));
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(row); }
    });
  });
})();
