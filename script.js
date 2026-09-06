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
     2. Carrousel Avis Clients : Glisse fluide native + boucle infinie
     -------------------------------------------------------------------------- */
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track && prevBtn && nextBtn) {
    let isMoving = false;

    // Centrage initial de la 2e carte dès le chargement
    const initialCard = track.querySelectorAll('.carousel-card')[1];
    if (initialCard) {
      setTimeout(() => {
        initialCard.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
      }, 50);
    }

    // Défilement vers la droite (→)
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isMoving) return;

      const cards = track.querySelectorAll('.carousel-card');
      const firstCard = cards[0];
      const targetCard = cards[2] || cards[1]; // Vise la carte suivante pour la centrer

      if (!firstCard || !targetCard) return;
      isMoving = true;

      // Déplacement matériel ultra-fluide
      targetCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

      // Replace la carte passée à l'autre bout sans saccade
      setTimeout(() => {
        const offsetBefore = track.scrollLeft;
        const cardWidth = firstCard.offsetWidth + 32;

        track.appendChild(firstCard);
        track.scrollLeft = offsetBefore - cardWidth;
        isMoving = false;
      }, 500);
    });

    // Défilement vers la gauche (←)
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isMoving) return;

      const cards = track.querySelectorAll('.carousel-card');
      const lastCard = cards[cards.length - 1];
      const targetCard = cards[0];

      if (!lastCard || !targetCard) return;
      isMoving = true;

      const cardWidth = lastCard.offsetWidth + 32;
      track.insertBefore(lastCard, track.firstChild);
      track.scrollLeft += cardWidth;

      // Glisse vers l'arrière
      lastCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

      setTimeout(() => {
        isMoving = false;
      }, 500);
    });
  }
