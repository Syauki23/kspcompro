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

  // ---- Training Gallery Auto Slider ----
  const gallerySlides = document.querySelectorAll('.tg-large .tg-slide');
  if (gallerySlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      gallerySlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % gallerySlides.length;
      gallerySlides[currentSlide].classList.add('active');
    }, 4500); // switch smoothly every 4.5 seconds
  }

  // ---- Testimonials Auto Slider (Ultra Smooth Rotating DOM) ----
  const testiContainer = document.querySelector('.testimonials-section .testi-cards-container');
  const testiDots = document.querySelectorAll('.testimonials-section .testi-dot');
  let isTestiSliding = false;

  if (testiContainer && testiContainer.children.length > 1) {
    setInterval(() => {
      if (isTestiSliding) return;
      
      // On mobile view where side cards are hidden, instantly cycle
      if (window.innerWidth <= 768) {
        const currentCenter = testiContainer.children[1] || testiContainer.children[0];
        if (currentCenter) currentCenter.classList.remove('active');
        
        testiContainer.appendChild(testiContainer.firstElementChild);
        
        const newCenter = testiContainer.children[1] || testiContainer.children[0];
        if (newCenter) {
          newCenter.classList.add('active');
          const origIndex = parseInt(newCenter.getAttribute('data-index'), 10);
          testiDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === origIndex);
          });
        }
        return;
      }

      // Desktop buttery smooth transform slide
      isTestiSliding = true;
      const firstCard = testiContainer.children[0];
      const currentCenter = testiContainer.children[1];
      const nextCenter = testiContainer.children[2];
      
      // Calculate distance: layout width of one card + gap
      const shiftDistance = firstCard.offsetWidth + 24;

      // Enable smooth slide transition
      testiContainer.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      testiContainer.style.transform = `translateX(-${shiftDistance}px)`;

      // Animate scaling and fading synchronously
      if (currentCenter) currentCenter.classList.remove('active');
      if (nextCenter) {
        nextCenter.classList.add('active');
        
        const origIndex = parseInt(nextCenter.getAttribute('data-index'), 10);
        testiDots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === origIndex);
        });
      }

      // Once slide finishes, silently reset transform and rearrange DOM
      setTimeout(() => {
        testiContainer.style.transition = 'none';
        testiContainer.style.transform = 'translateX(0)';
        testiContainer.appendChild(firstCard);
        
        setTimeout(() => {
          isTestiSliding = false;
        }, 50);
      }, 500);

    }, 4000); // Slide every 4 seconds
  }

  console.log('%cKSP Consulting | Everything Connected', 'color: #F5A623; font-size: 14px; font-weight: bold;');
})();
