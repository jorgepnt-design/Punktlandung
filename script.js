// Punktlandung: Startgröße so wählen, dass der Punkt den ganzen Bildschirm füllt.
(function () {
  var hero = document.querySelector('.hero');
  var dot = document.querySelector('.dot');
  if (!hero || !dot) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var diagonal = Math.hypot(window.innerWidth, window.innerHeight);
  dot.style.setProperty('--start-scale', Math.ceil((diagonal * 2) / 40));

  function land() {
    if (hero.classList.contains('landed')) return;
    hero.classList.add('landed');
  }

  if (reduce) { land(); return; }

  dot.addEventListener('animationend', land);
  // Ungeduldige dürfen per Klick überspringen
  function skip() {
    if (hero.classList.contains('landed')) return;
    dot.style.animation = 'none';
    dot.style.transform = 'scale(1)';
    land();
  }
  document.querySelector('.target').addEventListener('click', skip);
  // Auch Scrollen, Wischen oder eine Taste überspringen die Animation
  window.addEventListener('wheel', skip, { once: true, passive: true });
  window.addEventListener('touchmove', skip, { once: true, passive: true });
  window.addEventListener('keydown', skip, { once: true });
  setTimeout(land, 3500); // Fallback
})();
