document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    const setNav = (open) => {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    };
    toggle.addEventListener('click', () => setNav(!nav.classList.contains('open')));
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setNav(false)));
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = document.querySelector('#lightbox-img');
  const lightboxCaption = document.querySelector('#lightbox-caption');
  document.querySelectorAll('[data-lightbox]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!lightbox || !lightboxImage || !lightboxCaption) return;
      const thumb = button.querySelector('img');
      lightboxImage.src = button.dataset.full || thumb?.src || '';
      lightboxImage.alt = thumb?.alt || '';
      lightboxCaption.textContent = button.dataset.caption || '';
      lightbox.showModal();
    });
  });
  document.querySelectorAll('.lightbox-close').forEach((button) => {
    button.addEventListener('click', () => lightbox?.close());
  });
  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.close();
    });
  }

  document.querySelectorAll('[data-filter-group]').forEach((bar) => {
    bar.querySelectorAll('.filter-btn').forEach((button) => {
      button.addEventListener('click', () => {
        bar.querySelectorAll('.filter-btn').forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        const selected = button.dataset.filter;
        document.querySelectorAll(bar.dataset.filterGroup).forEach((card) => {
          const categories = (card.dataset.category || '').split(' ');
          card.classList.toggle('hidden', selected !== 'all' && !categories.includes(selected));
        });
      });
    });
  });
});
