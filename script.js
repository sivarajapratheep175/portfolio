/* ============================================================
   script.js — Sivaraja Pratheep Portfolio
   - Scroll reveal (.reveal → .in-view)
   - Active nav link (IntersectionObserver, not scroll listener)
   - Mobile nav toggle
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll Reveal ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target); // fire once only
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ── Active Nav Link (via IntersectionObserver) ──
     Tracks which section occupies the most of the viewport top region.
     Far more accurate than scrollY comparisons.                        */
  const sections    = document.querySelectorAll('section[id], header[id]');
  const navAnchors  = document.querySelectorAll('.nav a[href^="#"]');

  function setActive(id) {
    navAnchors.forEach((a) => {
      const isActive = a.getAttribute('href') === `#${id}`;
      a.classList.toggle('active', isActive);
      if (isActive) a.setAttribute('aria-current', 'page');
      else           a.removeAttribute('aria-current');
    });
  }

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    {
      // trigger when the section's top edge crosses 30 % from the top of the viewport
      rootMargin: '-30% 0px -65% 0px',
    }
  );

  sections.forEach((s) => navObserver.observe(s));

  /* ── Mobile Nav Toggle ── */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks   = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.querySelector('i').className = isOpen ? 'fa fa-times' : 'fa fa-bars';
    });

    // Close mobile menu when a link is tapped
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.querySelector('i').className = 'fa fa-bars';
      });
    });
  }
})();
