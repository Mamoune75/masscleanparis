/* --------------------------------------------------------------------------
     2. Carrousel Infini Réel (La 1ère carte repasse à la fin sans rembobiner)
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

      const cardWidth = firstCard.offsetWidth + 32; // largeur + écart (gap)
      isMoving = true;

      track.scrollBy({ left: cardWidth, behavior: 'smooth' });

      // Une fois l'animation de glisse terminée, on déplace l'élément dans le DOM
      setTimeout(() => {
        track.appendChild(firstCard); // La première carte passe à la toute fin
        track.scrollLeft -= cardWidth; // Réajuste instantanément la position pour que ce soit invisible à l'œil
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

      // On insère discrètement la dernière carte tout devant
      track.insertBefore(lastCard, track.firstChild);
      track.scrollLeft += cardWidth; // Compense immédiatement la position

      // Puis on anime le glissement vers la gauche
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });

      setTimeout(() => {
        isMoving = false;
      }, 450);
    });
  }
