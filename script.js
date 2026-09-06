document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Animations au défilement de la page (Scroll Reveal)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll(
    'section:not(.section-avis-carousel), .hero-content, article:not(.carousel-card), details, .cta-banner'
  );

  revealElements.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));


  /* --------------------------------------------------------------------------
     2. Carrousel Avis Clients : Défilement infini sans fin + centrage parfait
     -------------------------------------------------------------------------- */
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track && prevBtn && nextBtn) {
    const originalCards = Array.from(track.querySelectorAll('.carousel-card'));
    if (originalCards.length === 0) return;

    // Cloner les cartes avant et après pour créer l'illusion d'une boucle infinie
    originalCards.forEach((card) => {
      const cloneBefore = card.cloneNode(true);
      const cloneAfter = card.cloneNode(true);
      track.insertBefore(cloneBefore, track.firstChild);
      track.appendChild(cloneAfter);
    });

    let isAnimating = false;

    // Calcul de la distance d'un cran (largeur d'une carte + écart de 32px)
    const getCardStep = () => {
      const card = track.querySelector('.carousel-card');
      return card ? card.offsetWidth + 32 : 752;
    };

    // Calcul pour centrer parfaitement la carte active au milieu de l'écran
    const getCenterOffset = () => {
      const card = track.querySelector('.carousel-card');
      if (!card) return 0;
      return (window.innerWidth - card.offsetWidth) / 2;
    };

    // Position initiale : centrée pile sur la première carte originale
    const setInitialPosition = () => {
      const step = getCardStep();
      const centerOffset = getCenterOffset();
      const baseIndex = originalCards.length; // index du début des vraies cartes
      track.scrollLeft = (baseIndex * step) - centerOffset;
    };

    // Attendre le chargement des polices et images pour un calcul exact
    window.addEventListener('load', setInitialPosition);
    setTimeout(setInitialPosition, 100);
    window.addEventListener('resize', setInitialPosition);

    // Fonction de déplacement fluide
    const scrollCarousel = (direction) => {
      if (isAnimating) return;
      isAnimating = true;

      const step = getCardStep();
      const targetScroll = track.scrollLeft + (direction * step);

      track.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });

      // Gestion de la boucle infinie en arrière-plan
      setTimeout(() => {
        const totalOriginalWidth = originalCards.length * step;
        const centerOffset = getCenterOffset();
        const minThreshold = totalOriginalWidth - centerOffset - step;
        const maxThreshold = (totalOriginalWidth * 2) - centerOffset;

        // Si on dépasse trop à droite, on replace discrètement au groupe du milieu
        if (track.scrollLeft >= maxThreshold) {
          track.scrollLeft -= totalOriginalWidth;
        }
        // Si on dépasse trop à gauche, on replace au groupe du milieu
        else if (track.scrollLeft <= minThreshold) {
          track.scrollLeft += totalOriginalWidth;
        }

        isAnimating = false;
      }, 420);
    };

    // Clics sur les flèches
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollCarousel(1);
    });

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollCarousel(-1);
    });
  }

});
