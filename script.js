document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  
  const reveal = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', reveal);
  reveal(); // Initial check

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"], a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href.includes('#')) return;
      
      const targetId = '#' + href.split('#')[1];
      if (targetId === '#') return;
      
      // If the link points to a different page, allow normal navigation
      const linkPath = href.split('#')[0];
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      if (linkPath && linkPath !== currentPath && linkPath !== '') {
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        // Close mobile menu if open
        if (navLinks) navLinks.classList.remove('active');
        
        const headerHeight = header ? header.offsetHeight : 100;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 70;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Handle URL hash on initial page load with extra offset
  if (window.location.hash) {
    setTimeout(() => {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        const headerHeight = header ? header.offsetHeight : 100;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 70;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 350);
  }

  // FAQ Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      header.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.accordion-item.active');
        
        if (currentlyActive && currentlyActive !== item) {
          currentlyActive.classList.remove('active');
        }
        
        item.classList.toggle('active');
      });
    });
  }

  // Horizontal Project Slider Controls
  const slider = document.querySelector('.portfolio-slider');
  const prevBtn = document.getElementById('projPrev');
  const nextBtn = document.getElementById('projNext');

  if (slider) {
    // Mouse wheel horizontal scroll (1 tick = smoothly scroll exactly 1 card)
    let wheelCooldown = false;
    slider.addEventListener('wheel', (evt) => {
      if (slider.scrollWidth > slider.clientWidth) {
        const atLeftEnd = slider.scrollLeft <= 0 && evt.deltaY < 0;
        const atRightEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 2 && evt.deltaY > 0;
        
        if (!atLeftEnd && !atRightEnd) {
          evt.preventDefault();
          
          if (!wheelCooldown) {
            wheelCooldown = true;
            const firstCard = slider.querySelector('.portfolio-item');
            const cardWidth = firstCard ? firstCard.offsetWidth + 32 : 400;
            
            if (evt.deltaY > 0) {
              slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
            } else {
              slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            }
            
            setTimeout(() => {
              wheelCooldown = false;
            }, 450);
          }
        }
      }
    }, { passive: false });

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        const firstCard = slider.querySelector('.portfolio-item');
        const cardWidth = firstCard ? firstCard.offsetWidth + 32 : 400;
        slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        const firstCard = slider.querySelector('.portfolio-item');
        const cardWidth = firstCard ? firstCard.offsetWidth + 32 : 400;
        slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
      });
    }
  }
});
