// =========================================
// KSP CONSULTING - Main JavaScript
// script.js
// =========================================

(function () {
  'use strict';

  // ---- Chat Popup Toggle ----
  const chatBtn    = document.getElementById('chat-float-btn');
  const chatPopup  = document.getElementById('chat-popup');
  const chatClose  = document.getElementById('chat-close-btn');

  if (chatBtn && chatPopup) {
    chatBtn.addEventListener('click', function () {
      chatPopup.classList.toggle('active');
    });
  }

  if (chatClose && chatPopup) {
    chatClose.addEventListener('click', function () {
      chatPopup.classList.remove('active');
    });
  }

  // Close popup when clicking outside
  document.addEventListener('click', function (e) {
    if (chatPopup && !chatPopup.contains(e.target) && e.target !== chatBtn) {
      chatPopup.classList.remove('active');
    }
  });

  // ---- Sticky Navbar ----
  const navbar = document.getElementById('main-navbar');
  let lastScrollY = 0;

  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    if (navbar) {
      if (currentScrollY > 60) {
        navbar.style.backgroundColor = 'rgba(8, 18, 38, 0.95)';
        navbar.style.backdropFilter = 'blur(12px)';
        navbar.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
      } else {
        navbar.style.backgroundColor = '';
        navbar.style.backdropFilter = '';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
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
