document.addEventListener('DOMContentLoaded', () => {

  /* 1. Animation d'apparition au défilement */
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


  /* 2. Carrousel Avis : Glisse nette avec retour en boucle */
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track && prevBtn && nextBtn) {
    const getScrollStep = () => {
      const card = track.querySelector('.carousel-card');
      return card ? card.offsetWidth + 28 : 608;
    };

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const step = getScrollStep();
      const maxScroll = track.scrollWidth - track.clientWidth;

      if (track.scrollLeft >= maxScroll - 30) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: step, behavior: 'smooth' });
      }
    });

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const step = getScrollStep();
      const maxScroll = track.scrollWidth - track.clientWidth;

      if (track.scrollLeft <= 30) {
        track.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: -step, behavior: 'smooth' });
      }
    });
  }

});
