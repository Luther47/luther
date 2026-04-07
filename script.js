/**
 * NOVAE Landing Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveals();
  initSmoothScroll();
  initCustomCursor();
  initParallax();
});

/**
 * Navbar background on scroll
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-menu .btn');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuBtn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Scroll Reveals using Intersection Observer
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .stagger-item');
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve to only animate once
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

/**
 * Smooth Scroll for Anchors
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offsetTop = targetEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Custom Interactive Cursor
 */
function initCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorGlow = document.querySelector('.cursor-glow');
  
  if (!cursorDot || !cursorGlow) return;

  // Track if device is touch based
  if (window.matchMedia("(pointer: coarse)").matches) {
    cursorDot.style.display = 'none';
    cursorGlow.style.display = 'none';
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  let glowX = 0;
  let glowY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hover states for links and buttons
  const interactables = document.querySelectorAll('a, button, .hover-glow');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorGlow.style.width = '60px';
      cursorGlow.style.height = '60px';
      cursorGlow.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
      cursorGlow.style.borderColor = 'rgba(212, 175, 55, 0.5)';
      cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursorGlow.style.width = '40px';
      cursorGlow.style.height = '40px';
      cursorGlow.style.backgroundColor = 'transparent';
      cursorGlow.style.borderColor = 'rgba(212, 175, 55, 0.3)';
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });

  // Render loop for smooth cursor lag
  function renderCursor() {
    dotX += (mouseX - dotX) * 0.5;
    dotY += (mouseY - dotY) * 0.5;
    
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;

    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;
    
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;

    requestAnimationFrame(renderCursor);
  }

  renderCursor();
}

/**
 * Parallax effect for specific images
 */
function initParallax() {
  const parallaxImages = document.querySelectorAll('.parallax-img');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    parallaxImages.forEach(img => {
      // Calculate position relative to viewport
      const rect = img.parentElement.getBoundingClientRect();
      // Only apply parallax if element is partially in viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Simple subtle parallax
        const yPos = (rect.top * 0.1); 
        img.style.transform = `translateY(${yPos}px) scale(1.1)`;
      }
    });
  });
}
