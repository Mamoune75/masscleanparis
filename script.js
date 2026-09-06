document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Animations au défilement (Scroll Reveal prononcé)
     -------------------------------------------------------------------------- */
  const elements = document.querySelectorAll(
    'section, .hero-content, article, details, .cta-banner'
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
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach((el) => observer.observe(el));


  /* --------------------------------------------------------------------------
     2. Contrôles du Carrousel Avis Clients (Flèches ← / →)
     -------------------------------------------------------------------------- */
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track && prevBtn && nextBtn) {
    // Calcul de la largeur d'une carte + écart (environ 750px ou la largeur visible)
    const getScrollAmount = () => {
      const card = track.querySelector('.carousel-card');
      return card ? card.offsetWidth + 32 : 500;
    };

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });
  }

});
