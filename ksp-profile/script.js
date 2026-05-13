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

  // ---- Modal Logic ----
  const modalBtns = document.querySelectorAll('.learn-more-btn');
  const closeBtns = document.querySelectorAll('.modal-close-btn');
  
  modalBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal');
      if (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add('show');
          document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.service-modal-overlay');
      if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal when clicking outside
  const overlays = document.querySelectorAll('.service-modal-overlay');
  overlays.forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });

  // ---- Consultation Modal Logic ----
  const consultModal = document.getElementById('modal-consultation');
  const consultTriggers = document.querySelectorAll('.btn-consult, a[href="#contact"], a[id*="contact"], a[href$="#contact"]');
  
  if (consultModal) {
    consultTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        consultModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
    });

    const consultClose = consultModal.querySelector('.consult-modal-close');
    if (consultClose) {
      consultClose.addEventListener('click', function() {
        consultModal.classList.remove('show');
        document.body.style.overflow = '';
      });
    }

    consultModal.addEventListener('click', function(e) {
      if (e.target === this) {
        consultModal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });

    // Form submission feedback simulation
    const consultForm = consultModal.querySelector('#consultationForm');
    if (consultForm) {
      consultForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = consultForm.querySelector('.btn-consult-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          submitBtn.innerHTML = '<span>Inquiry Sent Successfully!</span>';
          submitBtn.style.backgroundColor = '#22c55e';
          
          setTimeout(() => {
            consultModal.classList.remove('show');
            document.body.style.overflow = '';
            consultForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
          }, 1500);
        }, 1200);
      });
    }
  }

  console.log('%cKSP Consulting | Everything Connected', 'color: #F5A623; font-size: 14px; font-weight: bold;');
})();
