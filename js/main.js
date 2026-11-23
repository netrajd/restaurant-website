/**
 * AURA & HEARTH BISTRO - JAVASCRIPT
 * Features: Light/Dark theme, Mobile navigation, Menu category filter,
 * Native <dialog> reservation modal, Active scroll spy, Toast notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. THEME SWITCHER (Dark / Light Mode)
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('aura-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      showToast(newTheme === 'dark' ? 'Switched to Night Hearth theme 🌙' : 'Switched to Daylight theme ☀️');
    });
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('aura-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
    }
  }

  // ------------------------------------------------------------------------
  // 2. MOBILE HAMBURGER NAVIGATION
  // ------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      toggleMobileMenu(!isExpanded);
    });

    // Close mobile menu on clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
          toggleMobileMenu(false);
        }
      });
    });
  }

  function toggleMobileMenu(open) {
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.classList.toggle('active', open);
    mainNav.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  // ------------------------------------------------------------------------
  // 3. HEADER SCROLL ELEVATION
  // ------------------------------------------------------------------------
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // ------------------------------------------------------------------------
  // 4. MENU CATEGORY FILTERING
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active states
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.dataset.filter;

      menuCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
          // Trigger slight reflow animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 5. ACCESSIBLE TABLE RESERVATION MODAL (<dialog>)
  // ------------------------------------------------------------------------
  const reservationDialog = document.getElementById('reservation-dialog');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const reserveForm = document.getElementById('reservation-form');
  const reserveNotes = document.getElementById('reserve-notes');
  const modalFeedback = document.getElementById('modal-feedback');

  // Trigger buttons that open modal
  const openReserveBtns = [
    document.getElementById('open-reserve-btn'),
    document.getElementById('hero-reserve-btn'),
    ...document.querySelectorAll('.open-reserve-modal-btn'),
    ...document.querySelectorAll('.open-reserve-modal-special')
  ].filter(Boolean);

  openReserveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set today as min date
      const dateInput = document.getElementById('reserve-date');
      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        if (!dateInput.value) {
          dateInput.value = today;
        }
      }

      // Check if button has a special dish pre-fill
      if (btn.dataset.dish && reserveNotes) {
        reserveNotes.value = `Interested in reservation for: ${btn.dataset.dish}`;
      }

      if (typeof reservationDialog.showModal === 'function') {
        reservationDialog.showModal();
      } else {
        // Fallback for older browsers
        reservationDialog.setAttribute('open', '');
      }
    });
  });

  if (closeModalBtn && reservationDialog) {
    closeModalBtn.addEventListener('click', () => {
      closeDialog();
    });

    // Close when clicking dialog backdrop
    reservationDialog.addEventListener('click', (e) => {
      const rect = reservationDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeDialog();
      }
    });
  }

  function closeDialog() {
    if (typeof reservationDialog.close === 'function') {
      reservationDialog.close();
    } else {
      reservationDialog.removeAttribute('open');
    }
    if (modalFeedback) {
      modalFeedback.className = 'modal-feedback';
      modalFeedback.textContent = '';
      modalFeedback.style.display = 'none';
    }
  }

  // Handle Reservation Form Submission
  if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = document.getElementById('reserve-name').value;
      const guestCount = document.getElementById('reserve-guests').value;
      const reserveDate = document.getElementById('reserve-date').value;
      const reserveTime = document.getElementById('reserve-time').value;

      if (modalFeedback) {
        modalFeedback.className = 'modal-feedback success';
        modalFeedback.innerHTML = `
          <strong>Reservation Confirmed!</strong><br>
          Thank you, ${escapeHtml(guestName)}. We have reserved a table for ${escapeHtml(guestCount)} on ${escapeHtml(reserveDate)} at ${escapeHtml(reserveTime)}. A confirmation has been sent to your email.
        `;
        modalFeedback.style.display = 'block';
      }

      showToast(`✨ Table reserved for ${escapeHtml(guestName)}! See you soon.`);

      setTimeout(() => {
        reserveForm.reset();
        closeDialog();
      }, 3500);
    });
  }

  // ------------------------------------------------------------------------
  // 6. DISH ORDER & INTERACTIVE MICRO-ACTIONS
  // ------------------------------------------------------------------------
  const orderBtns = document.querySelectorAll('.order-btn');
  orderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.menu-card');
      const dishTitle = card ? card.querySelector('.menu-card-title').textContent : 'Item';
      
      // Visual feedback on button
      const originalText = btn.textContent;
      btn.textContent = '✓ Added';
      btn.style.backgroundColor = 'var(--accent-secondary)';
      btn.style.color = '#ffffff';

      showToast(`🍽️ Added "${dishTitle}" to your order list!`);

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }, 2000);
    });
  });

  // ------------------------------------------------------------------------
  // 7. CONTACT & NEWSLETTER FORMS
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const contactFeedback = document.getElementById('contact-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('contact-name').value;
      if (contactFeedback) {
        contactFeedback.className = 'form-feedback success';
        contactFeedback.textContent = `Thank you, ${senderName}! Your message was received. Our team will contact you within 24 hours.`;
      }
      showToast('💌 Message sent successfully!');
      contactForm.reset();
      setTimeout(() => {
        if (contactFeedback) contactFeedback.textContent = '';
      }, 5000);
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      if (newsletterFeedback) {
        newsletterFeedback.textContent = `Welcome to the Hearth, ${email}! Check your inbox for your 10% welcome gift.`;
        newsletterFeedback.style.color = 'var(--accent-primary)';
      }
      showToast('✨ Subscribed to The Hearth Newsletter!');
      newsletterForm.reset();
      setTimeout(() => {
        if (newsletterFeedback) newsletterFeedback.textContent = '';
      }, 5000);
    });
  }

  // ------------------------------------------------------------------------
  // 8. SCROLL SPY FOR ACTIVE NAVIGATION LINKS
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // ------------------------------------------------------------------------
  // 9. TOAST NOTIFICATION UTILITY
  // ------------------------------------------------------------------------
  let toastTimeout;
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden', 'false');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
    }, 3200);
  }

  // Safe string escape helper
  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }
});
