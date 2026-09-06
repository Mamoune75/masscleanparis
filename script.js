document.addEventListener('DOMContentLoaded', () => {
  // Cible automatiquement toutes les cartes et sections principales
  const targets = document.querySelectorAll(
    '.framer-plan-card, .about-card, .testimonial-card, .stat-card, .faq-box, .section-head, .cta-banner'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // L'effet ne se joue qu'une fois
      }
    });
  }, {
    threshold: 0.12 // Se déclenche dès que 12 % de l'élément entre dans l'écran
  });

  targets.forEach(el => observer.observe(el));
});
