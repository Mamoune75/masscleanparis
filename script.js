document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll(
    'section, .hero-content, article, [class*="card"], details, .cta-banner'
  );

  elements.forEach((el) => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05, // Se déclenche dès l'apparition des premiers pixels
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach((el) => observer.observe(el));
});
