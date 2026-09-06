document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Animations au défilement (Scroll Reveal)
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
     2. Carrousel Avis Clients : Centrage parfait + Boucle fluide
     -------------------------------------------------------------------------- */
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track && prevBtn && nextBtn) {
    let isMoving = false;

    // Caler immédiatement la première carte au centre sans animation au chargement
    const alignFirstCard = () => {
      const firstCard = track.querySelector('.carousel-card');
      if (firstCard) {
        firstCard.scrollIntoView({ behavior: 'instant', inline: 'center', block: 'nearest' });
      }
    };

    window.addEventListener('load', alignFirstCard);
    setTimeout(alignFirstCard, 80);

    // Défilement vers la droite (→)
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isMoving) return;

      const cards = track.querySelectorAll('.carousel-card');
      const firstCard = cards[0];
      const targetCard = cards[1];

      if (!firstCard || !targetCard) return;
      isMoving = true;

      targetCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

      setTimeout(() => {
        const offsetBefore = track.scrollLeft;
        const cardWidth = firstCard.offsetWidth + 28;

        track.appendChild(firstCard);
        track.scrollLeft = offsetBefore - cardWidth;
        isMoving = false;
      }, 480);
    });

    // Défilement vers la gauche (←)
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isMoving) return;

      const cards = track.querySelectorAll('.carousel-card');
      const lastCard = cards[cards.length - 1];

      if (!lastCard) return;
      isMoving = true;

      const cardWidth = lastCard.offsetWidth + 28;
      track.insertBefore(lastCard, track.firstChild);
      track.scrollLeft += cardWidth;

      lastCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

      setTimeout(() => {
        isMoving = false;
      }, 480);
    });
  }

});
