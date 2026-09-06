/* --------------------------------------------------------------------------
     2. Contrôles du Carrousel Avis Clients (Boucle infinie + Flèches)
     -------------------------------------------------------------------------- */
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track) {
    const cards = track.querySelectorAll('.carousel-card');

    // Centrage initial sur le 2e avis au chargement
    if (cards.length > 1) {
      setTimeout(() => {
        const trackCenter = track.offsetWidth / 2;
        const cardCenter = cards[1].offsetLeft + cards[1].offsetWidth / 2;
        track.scrollTo({
          left: cardCenter - trackCenter,
          behavior: 'instant'
        });
      }, 60);
    }

    if (prevBtn && nextBtn) {
      const getScrollStep = () => {
        const firstCard = cards[0];
        return firstCard ? firstCard.offsetWidth + 32 : 500;
      };

      // Clic Suivant (→)
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const step = getScrollStep();
        const maxScrollLeft = track.scrollWidth - track.clientWidth;

        // Si on est rendu à la fin (ou presque à moins de 30px du bout), on reboucle au tout début
        if (track.scrollLeft >= maxScrollLeft - 30) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: step, behavior: 'smooth' });
        }
      });

      // Clic Précédent (←)
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const step = getScrollStep();
        const maxScrollLeft = track.scrollWidth - track.clientWidth;

        // Si on est tout au début (à moins de 30px), on boucle vers la toute dernière carte
        if (track.scrollLeft <= 30) {
          track.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: -step, behavior: 'smooth' });
        }
      });
    }
  }
