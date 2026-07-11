document.addEventListener('DOMContentLoaded', () => {
  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');

  const loadComponent = async (target, path) => {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Не вдалося завантажити сторінку ${path}`);
    target.innerHTML = await response.text();
  };

  if (headerMount) {
    loadComponent(headerMount, 'components/header.html').then(() => {
      const currentPage = document.body.dataset.page || 'home';
      document.querySelectorAll('.site-nav a').forEach((link) => {
        const page = link.getAttribute('data-nav');
        if (page === currentPage) link.classList.add('active');
      });

      const toggle = document.querySelector('.nav-toggle');
      const nav = document.querySelector('.site-nav');
      toggle?.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        nav?.classList.toggle('open');
      });
    }).catch((err) => console.error(err));
  }

  if (footerMount) {
    loadComponent(footerMount, 'components/footer.html').catch((err) => console.error(err));
  }

  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.addEventListener('pointermove', (event) => {
      const bounds = heroVisual.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
      heroVisual.style.transform = `perspective(1000px) rotateY(${offsetX * 8}deg) rotateX(${offsetY * -6}deg)`;
    });
    heroVisual.addEventListener('pointerleave', () => {
      heroVisual.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
  }

  document.querySelectorAll('.faq-item').forEach((item) => {
    const button = item.querySelector('button');
    button?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach((entry) => entry.classList.remove('active'));
      if (!isOpen) item.classList.add('active');
    });
  });
});
