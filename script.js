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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId === '') return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    e.preventDefault();

    const startPosition = window.pageYOffset;
    // Décalage de 80px si tu as une navbar fixe qui recouvre le contenu
    const navOffset = 80; 
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Durée du défilement en ms (1000ms = 1 seconde)
    let startTime = null;

    // Courbe d'accélération puis de décélération fluide (ease-in-out)
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  });
});
  
});
