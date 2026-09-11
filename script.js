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


const track = document.getElementById('testimonialTrack');
const nextBtn = document.querySelector('.carousel-btn:last-child');
const prevBtn = document.querySelector('.carousel-btn:first-child');

if (track) {
  // 1. Cloner les cartes originales pour créer la boucle infinie
  const originalCards = Array.from(track.children);
  
  // Clone à la fin
  originalCards.forEach(card => {
    track.appendChild(card.cloneNode(true));
  });

  // Calcul du décalage (largeur d'une carte + écart)
  const getCardStep = () => {
    const card = track.querySelector('.carousel-card');
    return card ? card.offsetWidth + 28 : 608;
  };

  // 2. Gestion du défilement avec réinitialisation invisible
  track.addEventListener('scroll', () => {
    const maxScroll = track.scrollWidth / 2;

    // Si on arrive au bout de la première série (sur les cartes clonées),
    // on remet discrètement le scroll au début
    if (track.scrollLeft >= maxScroll) {
      track.scrollLeft -= maxScroll;
    } 
    // Si on défile en arrière au tout début
    else if (track.scrollLeft <= 0) {
      track.scrollLeft += maxScroll;
    }
  });

  // 3. Boutons Suivant / Précédent
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getCardStep(), behavior: 'smooth' });
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
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
