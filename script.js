// Read more/less functionality
function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less"; 
    moreText.style.display = "inline";
  }
}

// Form validation
function validateForm() {
  var username = document.getElementById("username").value;
  var email = document.getElementById("email") ? document.getElementById("email").value : "";
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password") ? document.getElementById("confirm-password").value : "";
  
  // Basic validation
  if (username.trim() === "") {
    showAlert("Please enter a username", "error");
    return false;
  }
  
  if (email) {
    if (!validateEmail(email)) {
      showAlert("Please enter a valid email address", "error");
      return false;
    }
  }
  
  if (password.length < 8) {
    showAlert("Password must be at least 8 characters long", "error");
    return false;
  }
  
  if (confirmPassword && password !== confirmPassword) {
    showAlert("Passwords do not match", "error");
    return false;
  }
  
  // If all validations pass
  showAlert("Sign up successful!", "success");
  return false; // Prevent actual form submission for demo purposes
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Show custom alert messages
function showAlert(message, type) {
  // Remove any existing alerts
  const existingAlert = document.querySelector('.alert');
  if (existingAlert) {
    existingAlert.remove();
  }
  
  // Create alert element
  const alertElement = document.createElement('div');
  alertElement.className = `alert ${type}`;
  alertElement.textContent = message;
  
  // Add to DOM
  const form = document.querySelector('form');
  form.parentNode.insertBefore(alertElement, form);
  
  // Auto dismiss after 3 seconds
  setTimeout(() => {
    alertElement.classList.add('fade-out');
    setTimeout(() => {
      alertElement.remove();
    }, 500);
  }, 3000);
}

// Improved mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('section nav ul');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event from bubbling to document
      navMenu.classList.toggle('active');
      
      // Add animation to the menu icon
      const menuIcon = menuToggle.querySelector('i');
      if (menuIcon) {
        if (navMenu.classList.contains('active')) {
          menuIcon.classList.remove('fa-bars');
          menuIcon.classList.add('fa-times');
        } else {
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
        }
      }
    });
    
    // Close menu when clicking anywhere outside
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const menuIcon = menuToggle.querySelector('i');
        if (menuIcon) {
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
        }
      }
    });
    
    // Prevent clicks inside the menu from closing it
    navMenu.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  // Close menu when a link is clicked and navigate smoothly
  document.querySelectorAll('section nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Only intercept links that point to anchors on the same page
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Close the mobile menu
          if (window.innerWidth <= 768 && navMenu) {
            navMenu.classList.remove('active');
            const menuIcon = menuToggle.querySelector('i');
            if (menuIcon) {
              menuIcon.classList.remove('fa-times');
              menuIcon.classList.add('fa-bars');
            }
          }
          
          // Calculate header height for proper scrolling
          const headerHeight = document.querySelector('section nav').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          // Smooth scroll to target
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }
      }
    });
  });
  
  // Add intersection observer for animation
  if ('IntersectionObserver' in window) {
    const appearOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
      });
    }, appearOptions);
    
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .featured_book_card, .arrivals_card, .life_card, .blog_card');
    animatedElements.forEach(element => {
      appearOnScroll.observe(element);
    });
  }
});

// Initialize any CSS animations
document.addEventListener('DOMContentLoaded', function() {
  // Add animation classes to elements
  document.querySelectorAll('.featured_book_card, .arrivals_card, .life_card').forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.animationDelay = `${index * 0.1}s`;
  });
  
  document.querySelectorAll('.blog_card').forEach((card, index) => {
    card.classList.add('slide-in');
    card.style.animationDelay = `${index * 0.2}s`;
  });
});

// Book Carousel Functionality
class BookCarousel {
  constructor(element) {
    this.carousel = element;
    this.container = this.carousel.querySelector('.book-carousel-container');
    this.track = this.carousel.querySelector('.book-carousel-track');
    this.items = Array.from(this.track.children);
    this.nextButton = this.carousel.querySelector('.book-carousel-button-next');
    this.prevButton = this.carousel.querySelector('.book-carousel-button-prev');
    this.pagination = this.carousel.querySelector('.book-carousel-pagination');
    
    this.itemWidth = this.items[0].getBoundingClientRect().width;
    this.itemsPerScreen = Math.floor(this.container.clientWidth / this.itemWidth);
    this.currentIndex = 0;
    this.totalGroups = Math.ceil(this.items.length / this.itemsPerScreen);
    
    this.init();
  }
  
  init() {
    // Add gap to item width calculation
    const gap = parseInt(window.getComputedStyle(this.track).columnGap) || 30;
    this.itemWidth = this.items[0].getBoundingClientRect().width + gap;
    
    // Create pagination bullets
    this.createPagination();
    
    // Set up event listeners
    this.nextButton.addEventListener('click', () => this.moveToNext());
    this.prevButton.addEventListener('click', () => this.moveToPrev());
    
    // Update on resize
    window.addEventListener('resize', () => this.handleResize());
    
    // Initial setup
    this.updateButtonState();
  }
  
  createPagination() {
    this.pagination.innerHTML = '';
    
    for (let i = 0; i < this.totalGroups; i++) {
      const bullet = document.createElement('div');
      bullet.classList.add('book-carousel-pagination-bullet');
      if (i === 0) bullet.classList.add('book-carousel-pagination-bullet-active');
      
      bullet.addEventListener('click', () => this.moveToIndex(i));
      
      this.pagination.appendChild(bullet);
    }
  }
  
  moveToNext() {
    if (this.currentIndex < this.totalGroups - 1) {
      this.currentIndex++;
      this.updateCarouselPosition();
    }
  }
  
  moveToPrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarouselPosition();
    }
  }
  
  moveToIndex(index) {
    this.currentIndex = index;
    this.updateCarouselPosition();
  }
  
  updateCarouselPosition() {
    const movePosition = -this.currentIndex * (this.itemsPerScreen * this.itemWidth);
    this.track.style.transform = `translateX(${movePosition}px)`;
    
    this.updatePagination();
    this.updateButtonState();
  }
  
  updatePagination() {
    const bullets = this.pagination.querySelectorAll('.book-carousel-pagination-bullet');
    bullets.forEach((bullet, index) => {
      if (index === this.currentIndex) {
        bullet.classList.add('book-carousel-pagination-bullet-active');
      } else {
        bullet.classList.remove('book-carousel-pagination-bullet-active');
      }
    });
  }
  
  updateButtonState() {
    this.prevButton.classList.toggle('disabled', this.currentIndex === 0);
    this.nextButton.classList.toggle('disabled', this.currentIndex === this.totalGroups - 1);
  }
  
  handleResize() {
    // Recalculate items per screen
    this.itemWidth = this.items[0].getBoundingClientRect().width;
    const gap = parseInt(window.getComputedStyle(this.track).columnGap) || 30;
    this.itemWidth += gap;
    
    this.itemsPerScreen = Math.floor(this.container.clientWidth / this.itemWidth);
    this.totalGroups = Math.ceil(this.items.length / this.itemsPerScreen);
    
    // Reset carousel
    this.currentIndex = 0;
    this.createPagination();
    this.updateCarouselPosition();
  }
}

// Initialize carousels
document.addEventListener('DOMContentLoaded', function() {
  // Initialize existing animations
  // Add animation classes to elements
  document.querySelectorAll('.featured_book_card, .arrivals_card, .life_card').forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.animationDelay = `${index * 0.1}s`;
  });
  
  document.querySelectorAll('.blog_card').forEach((card, index) => {
    card.classList.add('slide-in');
    card.style.animationDelay = `${index * 0.2}s`;
  });
  
  // Find all book carousel containers and initialize them
  const carousels = document.querySelectorAll('.book-carousel');
  carousels.forEach(carousel => {
    new BookCarousel(carousel);
  });
});

// Add scroll-based navigation visibility control and animations
document.addEventListener('DOMContentLoaded', function() {
  // Navigation scroll behavior
  const nav = document.querySelector('section nav');
  let lastScrollTop = 0;
  let scrollTimer;
  
  function handleNavScroll() {
    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for style change when not at the top
    if (currentScrollTop > 10) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
    
    // Hide nav when scrolling down, show when scrolling up
    if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
      // Scrolling down & not at the top
      nav.classList.add('nav-hidden');
    } else {
      // Scrolling up or at the top
      nav.classList.remove('nav-hidden');
    }
    
    lastScrollTop = currentScrollTop;
    
    // Clear previous timer
    clearTimeout(scrollTimer);
    
    // Set a timer to show the nav after stopping scroll
    scrollTimer = setTimeout(function() {
      nav.classList.remove('nav-hidden');
    }, 1500);
  }
  
  // Throttle the scroll event to improve performance
  let isScrolling = false;
  window.addEventListener('scroll', function() {
    if (!isScrolling) {
      window.requestAnimationFrame(function() {
        handleNavScroll();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
  
  // Mobile menu improvements
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('section nav ul');
  const body = document.body;
  
  // Create overlay for mobile menu if it doesn't exist
  let overlay = document.querySelector('.menu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);
  }
  
  if (menuToggle && navMenu) {
    // Check if innerHTML already contains spans to avoid duplicating
    if (!menuToggle.querySelector('.bar')) {
      menuToggle.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
    }
    
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      body.classList.toggle('menu-open');
      
      if (body.classList.contains('menu-open')) {
        body.style.overflow = 'hidden'; // Prevent background scrolling
      } else {
        body.style.overflow = ''; // Restore scrolling
      }
    });
    
    // Close menu when clicking the overlay
    overlay.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('menu-open');
      body.style.overflow = '';
    });
    
    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
      });
    });
  }
  
  // Active menu highlighting based on scroll position
  const sections = document.querySelectorAll('section, div[id]');
  const navLinks = document.querySelectorAll('section nav ul li a');
  
  function setActiveNavItem() {
    let currentSection = '';
    const scrollPosition = window.scrollY;
    
    // Find the current section
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // Highlight the corresponding nav item
    navLinks.forEach(link => {
      link.parentElement.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.parentElement.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', setActiveNavItem);
  
  // Scroll animations for elements
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .animate-fade-in, .animate-slide-up, ' +
    '.animate-slide-left, .animate-slide-right, .animate-scale'
  );
  
  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    const elementHeight = el.getBoundingClientRect().height;
    return (
      elementTop <= 
      ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100)) &&
      (elementTop + elementHeight > 0)
    );
  };
  
  const displayScrollElement = (element) => {
    element.classList.add('animated');
  };
  
  const handleScrollAnimation = () => {
    animatedElements.forEach((el) => {
      if (elementInView(el, 90)) {
        displayScrollElement(el);
      }
    });
  };
  
  // Add animation classes to elements when the page loads
  window.addEventListener('load', function() {
    // Add animation classes to section headings
    document.querySelectorAll('h1:not(.logo)').forEach((heading, index) => {
      heading.classList.add('animate-slide-up', `delay-${(index % 5) + 1}00`);
    });
    
    // Add animation to book cards with staggered delay
    document.querySelectorAll('.featured_book_card, .arrivals_card, .life_card').forEach((card, index) => {
      card.classList.add('animate-scale', `delay-${(index % 5) + 1}00`);
    });
    
    // Add animations to other elements
    document.querySelectorAll('.blog_card').forEach((card, index) => {
      card.classList.add('animate-slide-up', `delay-${(index % 5) + 1}00`);
    });
    
    document.querySelectorAll('.main_tag').forEach(el => {
      el.classList.add('animate-slide-left');
    });
    
    document.querySelectorAll('.main_img').forEach(el => {
      el.classList.add('animate-slide-right');
    });
    
    // Initial check for elements in viewport
    handleScrollAnimation();
  });
  
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });
});

// Add this function to initialize animations properly
document.addEventListener('DOMContentLoaded', function() {
  // Remove any inline animation styles that might be interfering
  document.querySelectorAll('.animate-slide-left, .animate-slide-right, .animate-slide-up, .blog_card')
    .forEach(element => {
      if (element.hasAttribute('style')) {
        element.removeAttribute('style');
      }
    });

  // Apply animation classes to main section elements
  const mainTag = document.querySelector('.main_tag');
  const mainImg = document.querySelector('.main_img');
  
  if (mainTag) {
    mainTag.classList.add('animate-slide-left');
    mainTag.querySelector('h1')?.classList.add('animate-slide-up', 'delay-1');
  }
  
  if (mainImg) {
    mainImg.classList.add('animate-slide-right');
  }

  // Add animation to blog cards with proper delay
  document.querySelectorAll('.blog_card').forEach((card, index) => {
    card.classList.add('animate-slide-up', `delay-${index + 1}`);
    // Ensure they're visible by adding the animated class
    setTimeout(() => {
      card.classList.add('animated');
    }, 100);
  });

  // Add animated class to all animation elements to ensure visibility
  setTimeout(() => {
    document.querySelectorAll('.animate-slide-left, .animate-slide-right, .animate-slide-up')
      .forEach(element => {
        element.classList.add('animated');
      });
  }, 100);

  // Initialize all animation elements to make sure they're visible
  handleScrollAnimation();

  // Run once more after everything is loaded
  window.addEventListener('load', () => {
    handleScrollAnimation();
  });
});

// Fix mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('section nav ul');
  const body = document.body;
  
  // Create overlay for mobile menu if it doesn't exist
  let overlay = document.querySelector('.menu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);
  }
  
  if (menuToggle && navMenu) {
    // Handle menu toggle click
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle active classes
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      
      // Prevent body scrolling when menu is open
      if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      this.classList.remove('active');
      body.style.overflow = '';
    });
    
    // Close menu when clicking menu items
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && 
          !navMenu.contains(e.target) && 
          navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }
});

// Simplified and consolidated mobile menu toggle function
document.addEventListener('DOMContentLoaded', function() {
  // Get all the required elements
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('section nav ul');
  const body = document.body;
  
  // Create overlay for mobile menu if it doesn't exist
  let overlay = document.querySelector('.menu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);
  }
  
  if (menuToggle && navMenu) {
    // Clean up any conflicting styles
    navMenu.removeAttribute('style');
    navMenu.querySelectorAll('li').forEach(item => {
      if (item.hasAttribute('style')) {
        item.removeAttribute('style');
      }
    });
    
    // Handle menu toggle click
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle classes for animations and visibility
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      
      // Prevent scrolling of the body when menu is open
      if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      this.classList.remove('active');
      body.style.overflow = '';
    });
    
    // Close menu when clicking menu items
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
      });
    });
  }
  
  // Remove previous event listeners to avoid duplicates
  document.removeEventListener('click', menuOutsideClickHandler);
  
  // Handle clicks outside the menu
  function menuOutsideClickHandler(e) {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('section nav ul');
    
    if (menuToggle && navMenu && navMenu.classList.contains('active')) {
      if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.querySelector('.menu-overlay').classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  }
  
  // Add the event listener
  document.addEventListener('click', menuOutsideClickHandler);
});

// Simplified mobile menu toggle function - replacing all previous implementations
document.addEventListener('DOMContentLoaded', function() {
  // Clean up any existing event listeners to prevent duplicates
  const oldMenuToggle = document.querySelector('.menu-toggle');
  if (oldMenuToggle) {
    const newMenuToggle = oldMenuToggle.cloneNode(true);
    if (oldMenuToggle.parentNode) {
      oldMenuToggle.parentNode.replaceChild(newMenuToggle, oldMenuToggle);
    }
  }

  // Get all the required elements
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('section nav ul');
  const body = document.body;
  
  // Create overlay for mobile menu if it doesn't exist
  let overlay = document.querySelector('.menu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);
  }
  
  if (menuToggle && navMenu) {
    // Clean up any conflicting styles
    navMenu.removeAttribute('style');
    navMenu.querySelectorAll('li').forEach(item => {
      item.removeAttribute('style');
    });
    
    // Handle menu toggle click
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle classes for animations and visibility
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      
      // Prevent scrolling of the body when menu is open
      if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      this.classList.remove('active');
      body.style.overflow = '';
    });
    
    // Close menu when clicking menu items
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (menuToggle && navMenu && navMenu.classList.contains('active')) {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target) && !overlay.contains(e.target)) {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
          overlay.classList.remove('active');
          body.style.overflow = '';
        }
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});