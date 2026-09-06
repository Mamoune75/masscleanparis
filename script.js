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
     2. Contrôles du Carrousel Avis Clients (Flèches + Centrage initial)
     -------------------------------------------------------------------------- */
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track) {
    const cards = track.querySelectorAll('.carousel-card');

    // Fonction pour centrer une carte donnée au milieu de l'écran
    const centerCard = (card, behavior = 'smooth') => {
      if (!card) return;
      const trackCenter = track.offsetWidth / 2;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      track.scrollTo({
        left: cardCenter - trackCenter,
        behavior: behavior
      });
    };

    // Centre automatiquement la 2e carte (Mohamed / TASTY) dès l'ouverture
    if (cards.length > 1) {
      setTimeout(() => {
        centerCard(cards[1], 'instant');
      }, 50);
    }

    // Navigation avec les flèches
    if (prevBtn && nextBtn) {
      const getScrollStep = () => {
        const firstCard = cards[0];
        return firstCard ? firstCard.offsetWidth + 32 : 500;
      };

      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }
  }

});
