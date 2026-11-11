(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================= Startseite ================= */
  var intro = document.querySelector('.intro');
  if (intro) {
    var dot = intro.querySelector('.dot');

    // Startgröße: der Punkt füllt den ganzen Bildschirm
    var diagonal = Math.hypot(window.innerWidth, window.innerHeight);
    dot.style.setProperty('--start-scale', Math.ceil((diagonal * 2) / 18));

    var opened = false;
    function open(delay) {
      if (opened) return;
      opened = true;
      intro.classList.add('landed');
      setTimeout(function () { intro.classList.add('opened'); }, delay);
    }
    function skip() {
      if (opened) return;
      dot.style.animation = 'none';
      dot.style.transform = 'scale(1)';
      open(0);
    }

    if (reduce) { intro.classList.add('landed', 'opened'); opened = true; }
    else {
      dot.addEventListener('animationend', function () { open(1200); });
      setTimeout(function () { open(0); }, 4600); // Fallback
      dot.addEventListener('click', skip);
      window.addEventListener('wheel', skip, { once: true, passive: true });
      window.addEventListener('touchmove', skip, { once: true, passive: true });
      window.addEventListener('keydown', function (e) { if (e.key !== 'Tab') skip(); }, { once: true });
    }

  }

  /* ================= Auswahl-Buttons (Du bist / Ich bin) ================= */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.segmented [role="tab"]'));
  if (tabs.length) {
    function select(tab, push) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (push) history.replaceState(null, '', '#' + tab.dataset.key);
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t, true); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        var n = tabs[(i + d + tabs.length) % tabs.length];
        n.focus(); select(n, true);
      });
    });
    var fromHash = tabs.filter(function (t) { return '#' + t.dataset.key === location.hash; })[0];
    if (fromHash) select(fromHash, false);
    else tabs[0].tabIndex = 0;
  }
})();
