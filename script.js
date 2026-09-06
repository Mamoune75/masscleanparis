document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Animation d'apparition au défilement (Scroll Reveal prononcé)
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
     2. Carrousel Avis Clients : Défilement infini réel (Seamless loop)
     -------------------------------------------------------------------------- */
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track && prevBtn && nextBtn) {
    let isMoving = false;

    // Défilement vers la droite (→) : avance, puis replace la 1ère carte tout à la fin
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isMoving) return;

      const firstCard = track.querySelector('.carousel-card');
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth + 32; // Largeur carte + espacement
      isMoving = true;

      track.scrollBy({ left: cardWidth, behavior: 'smooth' });

      // Une fois la glisse achevée, on injecte la première carte tout au bout
      setTimeout(() => {
        track.appendChild(firstCard);
        track.scrollLeft -= cardWidth; // Réajuste sans saccade
        isMoving = false;
      }, 450);
    });

    // Défilement vers la gauche (←) : place la dernière carte au début, puis glisse
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isMoving) return;

      const cards = track.querySelectorAll('.carousel-card');
      const lastCard = cards[cards.length - 1];
      if (!lastCard) return;

      const cardWidth = lastCard.offsetWidth + 32;
      isMoving = true;

      // Déplace la dernière carte tout devant
      track.insertBefore(lastCard, track.firstChild);
      track.scrollLeft += cardWidth;

      // Anime le glissement vers la gauche
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });

      setTimeout(() => {
        isMoving = false;
      }, 450);
    });
  }

});
