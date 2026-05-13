// =========================================
// KSP CONSULTING - Main JavaScript
// script.js
// =========================================

(function () {
  'use strict';



  // ---- Sticky Navbar ----
  const navbar = document.getElementById('main-navbar');
  let lastScrollY = 0;

  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    if (navbar) {
      if (currentScrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    lastScrollY = currentScrollY;
  });

  // ---- Smooth scroll for "Explore Services" ----
  const exploreBtn = document.getElementById('explore-services-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', function () {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    });
  }

  // ---- Smooth scroll for scroll indicator ----
  const scrollIndicator = document.getElementById('scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function () {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    });
    scrollIndicator.style.cursor = 'pointer';
  }

  // ---- Nav active state on scroll (for single-page use) ----
  const navLinks = document.querySelectorAll('.navbar-nav .nav-item a');
  navLinks.forEach(function (link) {
    link.addEventListener('mouseenter', function () {
      this.style.color = '#ffffff';
    });
    link.addEventListener('mouseleave', function () {
      if (!this.closest('.nav-item').classList.contains('active')) {
        this.style.color = '';
      }
    });
  });

  console.log('%cKSP Consulting | Everything Connected', 'color: #F5A623; font-size: 14px; font-weight: bold;');
})();
