document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll(
    'section, .hero-content, article, [class*="card"], details, .cta-banner'
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
    threshold: 0.05, // Se déclenche dès l'apparition des premiers pixels
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach((el) => observer.observe(el));
});

// Contrôles carrousel avis
const track = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (track && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -track.offsetWidth * 0.7, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: track.offsetWidth * 0.7, behavior: 'smooth' });
  });
}

// Contrôles carrousel avis
const track = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (track && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -track.offsetWidth * 0.7, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: track.offsetWidth * 0.7, behavior: 'smooth' });
  });
}
