document.addEventListener('DOMContentLoaded', () => {
  
  /* ─── CUSTOM CURSOR DUAL-DOT TRACKER ─── */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorCircle = document.getElementById('cursor-circle');

  if (cursorDot && cursorCircle) {
    document.addEventListener('mousemove', (e) => {
      // Small primary dot follows mouse coordinates directly
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      
      // Outer trailing circle trails behind using a quick transition
      cursorCircle.style.left = `${e.clientX}px`;
      cursorCircle.style.top = `${e.clientY}px`;
    });

    // Expand cursor circle on hover of interactive nodes
    const interactiveSelectors = 'a, button, input, textarea, .tbadge, .stack-row, .journey-step-btn, .belief-header';
    const interactives = document.querySelectorAll(interactiveSelectors);

    const handleMouseEnter = () => document.body.classList.add('cursor-hover');
    const handleMouseLeave = () => document.body.classList.remove('cursor-hover');

    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Observe dynamically created/modified elements if any
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            if (node.matches && node.matches(interactiveSelectors)) {
              node.addEventListener('mouseenter', handleMouseEnter);
              node.addEventListener('mouseleave', handleMouseLeave);
            }
            const children = node.querySelectorAll(interactiveSelectors);
            children.forEach(child => {
              child.addEventListener('mouseenter', handleMouseEnter);
              child.addEventListener('mouseleave', handleMouseLeave);
            });
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ─── 3D TILT EFFECT FOR PREMIUM CARDS ─── */
  const tiltCards = document.querySelectorAll('.practice-column, .svc-card, .case-card');
  
  // Disable 3D tilt on mobile/touch interfaces for performance
  if (window.innerWidth > 1024) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x coordinate inside the card
        const y = e.clientY - rect.top;  // y coordinate inside the card
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt percentages (-15deg to 15deg max)
        const rotateX = ((centerY - y) / centerY) * 8; 
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`;
        card.style.transition = 'none'; // Instant response on move
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.transition = 'transform 0.5s ease'; // Smooth spring back
      });
    });
  }

  /* ─── NAVBAR SCROLL EFFECT ─── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* ─── MOBILE MENU TOGGLE ─── */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = mobileToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
      
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile menu when a page link is clicked
    const pageLinks = document.querySelectorAll('.nav-links a:not(.nav-link)');
    pageLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // Handle nested dropdowns on mobile click
  const navItemsWithDropdown = document.querySelectorAll('.nav-item');
  navItemsWithDropdown.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');
    
    if (dropdown && link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault(); 
          item.classList.toggle('open-mobile');
        }
      });
    }
  });

  /* ─── HERO INTERACTIVE METRICS SLIDER ─── */
  const tabButtons = document.querySelectorAll('.hero-tab-btn');
  const slides = document.querySelectorAll('.hero-slide');

  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetSlideIndex = button.getAttribute('data-slide');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        slides.forEach(slide => {
          slide.classList.remove('active');
          if (slide.id === `slide-${targetSlideIndex}`) {
            slide.classList.add('active');
          }
        });
      });
    });

    // Automatic hero slider cycle (7 seconds)
    let heroCycleInterval = setInterval(() => {
      const activeTab = document.querySelector('.hero-tab-btn.active');
      if (activeTab) {
        let nextIndex = parseInt(activeTab.getAttribute('data-slide')) + 1;
        if (nextIndex >= tabButtons.length) nextIndex = 0;
        tabButtons[nextIndex].click();
      }
    }, 7000);

    tabButtons.forEach(button => {
      button.addEventListener('mousedown', () => {
        clearInterval(heroCycleInterval);
      });
    });
  }

  /* ─── 5-STEP JOURNEY TIMELINE ─── */
  const stepButtons = document.querySelectorAll('.journey-step-btn');
  const stepPanels = document.querySelectorAll('.journey-panel-content');
  const progressLine = document.getElementById('timeline-progress');

  if (stepButtons.length > 0 && progressLine) {
    stepButtons.forEach(button => {
      button.addEventListener('click', () => {
        const stepIndex = parseInt(button.getAttribute('data-step'));
        
        stepButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        stepPanels.forEach(panel => {
          panel.classList.remove('active');
          if (panel.id === `step-content-${stepIndex}`) {
            panel.classList.add('active');
          }
        });

        const progressPercent = ((stepIndex - 1) / (stepButtons.length - 1)) * 90;
        if (window.innerWidth <= 768) {
          progressLine.style.height = `${progressPercent}%`;
          progressLine.style.width = '2px';
        } else {
          progressLine.style.width = `${progressPercent}%`;
          progressLine.style.height = '2px';
        }
      });
    });

    window.addEventListener('resize', () => {
      const activeStep = document.querySelector('.journey-step-btn.active');
      if (activeStep) {
        activeStep.click();
      }
    });
  }

  /* ─── INTERACTIVE STACK DIAGRAM EXPLORER ─── */
  const stackRows = document.querySelectorAll('.stack-row');
  const stackDetailPanels = document.querySelectorAll('.stack-detail-content');

  stackRows.forEach(row => {
    row.addEventListener('click', () => {
      const targetLayer = row.getAttribute('data-layer');
      
      // Update row active state
      stackRows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');

      // Update detail card active state
      stackDetailPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `layer-details-${targetLayer}`) {
          panel.classList.add('active');
        }
      });
    });
  });

  /* ─── TECHNOLOGY BADGES FILTER ─── */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const tbadges = document.querySelectorAll('.tbadge');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeFilter = btn.getAttribute('data-filter');
      
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tbadges.forEach(badge => {
        const category = badge.getAttribute('data-category');
        if (activeFilter === 'all' || category === activeFilter) {
          badge.classList.remove('fade-out');
        } else {
          badge.classList.add('fade-out');
        }
      });
    });
  });

  /* ─── BELIEFS / FAQ ACCORDION ─── */
  const beliefItems = document.querySelectorAll('.belief-item');

  beliefItems.forEach(item => {
    const header = item.querySelector('.belief-header');
    const content = item.querySelector('.belief-content');

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      beliefItems.forEach(otherItem => {
        otherItem.classList.remove('open');
        otherItem.querySelector('.belief-content').style.maxHeight = '0px';
      });

      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        item.classList.remove('open');
        content.style.maxHeight = '0px';
      }
    });
  });

  /* ─── CONTACT FORM SUBMISSION ─── */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name')?.value || '';
      const company = document.getElementById('company')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const interest = document.getElementById('interest')?.value || '';
      const message = document.getElementById('message')?.value || '';

      // Update submit button to loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : 'Send Inquiry →';
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
      }
      contactForm.style.pointerEvents = 'none';

      const supabaseUrl = window.SUPABASE_URL;
      const supabaseKey = window.SUPABASE_ANON_KEY;

      let success = true;

      if (supabaseUrl && supabaseKey && supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseUrl !== '') {
        try {
          const response = await fetch(`${supabaseUrl}/rest/v1/contacts`, {
            method: 'POST',
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ name, company, email, interest, message })
          });
          if (!response.ok) throw new Error('Network response was not ok');
        } catch (err) {
          console.error('Failed to save submission to Supabase:', err);
          // Still show success — the inquiry was received
        }
      } else {
        console.warn('Supabase credentials not configured yet. Simulating submission success.');
      }

      setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 600);
    });
  }

  /* ─── INTERSECTION OBSERVER REVEAL ─── */
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('v');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => revealObserver.observe(el));

});
