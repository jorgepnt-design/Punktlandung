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
  document.querySelector('.target').addEventListener('click', function () {
    dot.style.animation = 'none';
    dot.style.transform = 'scale(1)';
    land();
  });
  setTimeout(land, 3500); // Fallback
})();
