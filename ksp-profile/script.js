// =========================================
// KSP CONSULTING - Main JavaScript
// script.js
// =========================================

(function () {
  'use strict';



  // ---- Sticky Navbar ----
  const navbar = document.getElementById('main-navbar');

  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    if (navbar) {
      if (currentScrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // ---- Navigation for "Explore Services" ----
  const exploreBtn = document.getElementById('explore-services-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', function () {
      window.location.href = 'services.html';
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
  const consultTriggers = document.querySelectorAll('.btn-consult, #consult-btn');
  
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

  // ---- Global Escape Key Listener for Modals ----
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const activeModals = document.querySelectorAll('.service-modal-overlay.show, .consult-modal-overlay.show');
      activeModals.forEach(modal => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      });
    }
  });

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
    const testiCards = Array.from(testiContainer.children);
    let activeIdx = 2; // Initial active card

    const updateCarousel = () => {
      const cardWidth = 550; // Match CSS flex-basis
      const gap = 30; // Match CSS gap
      const wrapperWidth = testiContainer.parentElement.offsetWidth;
      
      // Calculate centering offset
      // (WrapperCenter) - (ActiveCardCenter) - (Cumulative width of previous cards)
      const offset = (wrapperWidth / 2) - (cardWidth / 2) - (activeIdx * (cardWidth + gap));

      testiContainer.style.transform = `translateX(${offset}px)`;

      testiCards.forEach((card, idx) => {
        card.classList.toggle('active', idx === activeIdx);
      });

      testiDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });
    };

    // Initial run
    setTimeout(updateCarousel, 100);

    // Auto slide
    let testiInterval = setInterval(() => {
      activeIdx = (activeIdx + 1) % testiCards.length;
      updateCarousel();
    }, 5000);

    // Resize listener
    window.addEventListener('resize', updateCarousel);

    // Manual interaction (Dots)
    testiDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        clearInterval(testiInterval);
        activeIdx = idx;
        updateCarousel();
        // Restart interval
        testiInterval = setInterval(() => {
          activeIdx = (activeIdx + 1) % testiCards.length;
          updateCarousel();
        }, 5000);
      });
    });
  }


  // =========================================
  // PHILOSOPHY PAGE - SWARNADWIPA Interactive
  // =========================================
  // Data 11 nilai SWARNADWIPA
  const values = [
    { letter: 'S', num: '01', title: 'Synergy in Every Step', desc: 'Working together across teams and disciplines to create solutions greater than the sum of their parts.', feats: ['Cross-functional Teams', 'Collaborative Approach', 'Shared Goals'], icon: 'users' },
    { letter: 'W', num: '02', title: 'Worldwide Perspective, Local Touch', desc: 'We bring global standards and best practices with a deep understanding of local dynamics to deliver relevant and impactful solutions.', feats: ['Global Standards', 'Local Understanding', 'Relevant Solutions'], icon: 'globe' },
    { letter: 'A', num: '03', title: 'Ambition for the Future', desc: 'Driven by a vision for long-term excellence and sustainable progress in every project we undertake.', feats: ['Forward Thinking', 'Growth Mindset', 'Sustainable Development'], icon: 'trending-up' },
    { letter: 'R', num: '04', title: 'Responsive to Change', desc: 'Adapting quickly to evolving industry demands and client needs with agile and practical solutions.', feats: ['Agile Methods', 'Quick Adaptation', 'Flexible Solutions'], icon: 'refresh' },
    { letter: 'N', num: '05', title: 'Networking Excellence', desc: 'Building strong professional networks that create value and open opportunities for our clients.', feats: ['Strategic Connections', 'Industry Partnerships', 'Knowledge Sharing'], icon: 'link' },
    { letter: 'A', num: '06', title: 'Aspiration for Collective Success', desc: 'Committed to achieving shared goals where every stakeholder benefits from our collaborative efforts.', feats: ['Shared Vision', 'Mutual Growth', 'Collective Achievement'], icon: 'star' },
    { letter: 'D', num: '07', title: 'Diversity & Inclusion', desc: 'Embracing diverse perspectives and inclusive practices to drive innovation and comprehensive solutions.', feats: ['Diverse Perspectives', 'Inclusive Culture', 'Innovation Drive'], icon: 'heart' },
    { letter: 'W', num: '08', title: 'Work Ethics', desc: 'Upholding the highest standards of professionalism, accountability, and integrity in everything we do.', feats: ['Professional Standards', 'Accountability', 'Ethical Practice'], icon: 'shield' },
    { letter: 'I', num: '09', title: 'Integrated Approach', desc: 'Delivering holistic solutions that connect strategy, operations, and people for maximum impact.', feats: ['Holistic Solutions', 'Connected Strategy', 'Maximum Impact'], icon: 'layers' },
    { letter: 'P', num: '10', title: 'Professional Excellence', desc: 'Maintaining the highest levels of expertise, quality, and continuous improvement in our services.', feats: ['Expert Knowledge', 'Quality Assurance', 'Continuous Improvement'], icon: 'award' },
    { letter: 'A', num: '11', title: 'Achieving Together', desc: 'Celebrating shared accomplishments and driving collective success through partnership and teamwork.', feats: ['Team Success', 'Partnership Focus', 'Shared Achievements'], icon: 'check-circle' }
  ];

  // SVG icons map
  const icons = {
    'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'globe': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    'trending-up': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    'refresh': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    'link': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    'star': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    'heart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    'shield': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    'layers': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    'award': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    'check-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
  };

  let currentIndex = 0;
  const slideContent = document.getElementById('phil-slide-content');
  const lettersEl = document.getElementById('phil-letters');
  const dotsEl = document.getElementById('phil-dots');
  const cultureGrid = document.getElementById('phil-culture-grid');

  if (slideContent && lettersEl) {
    // Build culture grid
    const renderCultureGrid = () => {
      if (!cultureGrid) return;
      cultureGrid.innerHTML = values.map((v, i) => `
        <div class="phil-cval ${i === currentIndex ? 'active' : ''}" data-index="${i}">
          <div class="phil-cval-icon">${icons[v.icon]}</div>
          <span class="phil-cval-title">${v.title}</span>
          <span class="phil-cval-num">${v.num}</span>
          <div class="phil-cval-track">
            <div class="phil-cval-line ${i < currentIndex ? 'passed' : (i === currentIndex ? 'half' : '')}"></div>
            <div class="phil-cval-dot ${i === currentIndex ? 'active' : (i < currentIndex ? 'passed' : '')}"></div>
          </div>
        </div>
      `).join('');
    };

    // Render slide
    const renderSlide = (i) => {
      const v = values[i];
      slideContent.innerHTML = `
        <div class="phil-slide">
          <span class="slide-num">${v.num}</span>
          <h3 class="slide-title">${v.title}</h3>
          <p class="slide-desc">${v.desc}</p>
          <div class="slide-feats">
            ${v.feats.map(f => `<div class="slide-feat"><div class="slide-feat-icon">${icons[v.icon]}</div><span>${f}</span></div>`).join('')}
          </div>
        </div>
      `;
      // Update active letter
      lettersEl.querySelectorAll('.phil-letter').forEach((el, idx) => {
        el.classList.toggle('active', idx === i);
      });
      // Update dots
      if (dotsEl) {
        dotsEl.querySelectorAll('.phil-ldot').forEach((el, idx) => {
          el.classList.toggle('active', idx === i);
        });
      }
      currentIndex = i;
      renderCultureGrid();
    };

    // Letter clicks
    lettersEl.addEventListener('click', function (e) {
      const letter = e.target.closest('.phil-letter');
      if (letter) renderSlide(parseInt(letter.dataset.index));
    });

    // Arrow buttons
    const prevBtn = document.getElementById('phil-prev');
    const nextBtn = document.getElementById('phil-next');
    if (prevBtn) prevBtn.addEventListener('click', () => renderSlide((currentIndex - 1 + values.length) % values.length));
    if (nextBtn) nextBtn.addEventListener('click', () => renderSlide((currentIndex + 1) % values.length));

    // Initialize culture grid click events
    if (cultureGrid) {
      cultureGrid.addEventListener('click', function (e) {
        const item = e.target.closest('.phil-cval');
        if (item) {
          renderSlide(parseInt(item.dataset.index));
          document.querySelector('.phil-slider-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }

    // Initial render
    renderSlide(0);
  }

  // =========================================
  // DYNAMIC ZOOM SCALING FOR LARGE MONITORS
  // =========================================
  function adjustZoomForLargeMonitors() {
    if (window.innerWidth > 1440) {
      document.documentElement.style.zoom = window.innerWidth / 1440;
    } else {
      document.documentElement.style.zoom = 1;
    }
  }

  window.addEventListener('resize', adjustZoomForLargeMonitors);
  adjustZoomForLargeMonitors(); // Initial run

  console.log('%cKSP Consulting | Everything Connected', 'color: #F5A623; font-size: 14px; font-weight: bold;');
})();

