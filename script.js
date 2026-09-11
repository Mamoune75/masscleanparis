document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Animations au défilement (Scroll Reveal)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll(
    'section:not(.section-avis-carousel), .hero-content, article:not(.carousel-card), details, .cta-banner'
  );

  revealElements.forEach((el) => el.classList.add('reveal'));

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

  revealElements.forEach((el) => observer.observe(el));


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

  // Animation de compteur au défilement
const counters = document.querySelectorAll('.counter');
const speed = 1500; // Durée totale du défilement en millisecondes (1,5 seconde)

const animateCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  const suffix = counter.getAttribute('data-suffix') || '';
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / speed, 1);
    
    // Effet d'amorti fluide vers la fin (easeOutQuad)
    const easedProgress = 1 - (1 - progress) * (1 - progress);
    const currentValue = Math.floor(easedProgress * target);

    // Formatage avec espace pour les milliers (ex: 2 000)
    counter.textContent = currentValue.toLocaleString('fr-FR') + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = target.toLocaleString('fr-FR') + suffix;
    }
  };

  requestAnimationFrame(update);
};

// Déclenchement automatique dès que la section entre dans l'écran
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target); // Ne s'anime qu'une seule fois
    }
  });
}, { threshold: 0.4 });

counters.forEach(counter => counterObserver.observe(counter));
  
});
