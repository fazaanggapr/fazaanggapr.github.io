// Portfolio Website JavaScript
// Author: Faza Angga Pramuditio

/**
 * Theme Management System
 */
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    // Get saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply initial theme
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Update toggle switch if exists
    this.updateToggleSwitch();
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    this.setTheme(isDark ? 'light' : 'dark');
  }

  updateToggleSwitch() {
    const darkToggle = document.querySelector('#dark-toggle');
    if (darkToggle) {
      const isDark = document.documentElement.classList.contains('dark');
      darkToggle.checked = isDark;
    }
  }

  initToggleButton() {
    const darkToggle = document.querySelector('#dark-toggle');
    if (darkToggle) {
      // Set initial state
      this.updateToggleSwitch();
      
      // Add event listener
      darkToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }
}

/**
 * Navigation Manager
 */
class NavigationManager {
  constructor() {
    this.header = null;
    this.hamburger = null;
    this.navMenu = null;
    this.init();
  }

  init() {
    // Wait for header to be loaded
    this.waitForElements();
    
    // Setup scroll handler for fixed navbar
    this.setupScrollHandler();
    
    // Setup smooth scrolling for anchor links
    this.setupSmoothScrolling();
  }

  waitForElements() {
    const checkElements = () => {
      this.header = document.querySelector('header');
      this.hamburger = document.querySelector('#hamburger');
      this.navMenu = document.querySelector('#nav-menu');
      
      if (this.hamburger && this.navMenu) {
        this.setupHamburgerMenu();
      }
      
      if (!this.header || !this.hamburger || !this.navMenu) {
        setTimeout(checkElements, 100);
      }
    };
    
    checkElements();
  }

  setupScrollHandler() {
    let ticking = false;
    
    const updateNavbar = () => {
      if (this.header) {
        const fixedNav = this.header.offsetTop;
        
        if (window.pageYOffset > fixedNav) {
          this.header.classList.add('navbar-fixed');
        } else {
          this.header.classList.remove('navbar-fixed');
        }
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    });
  }

  setupHamburgerMenu() {
    // Toggle menu
    this.hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Close menu when clicking on nav links
    const navLinks = this.navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.hamburger.classList.toggle('hamburger-active');
    this.navMenu.classList.toggle('hidden');
    
    // Add/remove body scroll lock
    if (this.navMenu.classList.contains('hidden')) {
      document.body.classList.remove('overflow-hidden');
    } else {
      document.body.classList.add('overflow-hidden');
    }
  }

  closeMenu() {
    this.hamburger.classList.remove('hamburger-active');
    this.navMenu.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  setupSmoothScrolling() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = this.header ? this.header.offsetHeight : 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  }
}

/**
 * Typed.js Handler
 */
class TypedHandler {
  constructor() {
    this.init();
  }

  init() {
    // Wait for hero section to be loaded
    this.waitForTypedElement();
  }

  waitForTypedElement() {
    const checkTypedElement = () => {
      const typedElement = document.querySelector('.typed');
      
      if (typedElement && typeof Typed !== 'undefined') {
        this.initializeTyped(typedElement);
      } else {
        setTimeout(checkTypedElement, 100);
      }
    };
    
    checkTypedElement();
  }

  initializeTyped(element) {
    try {
      const items = element.getAttribute('data-typed-items');
      if (items) {
        const strings = items.split(',').map(item => item.trim());
        
        new Typed('.typed', {
          strings: strings,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 1500,
          loop: true,
          smartBackspace: true,
          showCursor: true,
          cursorChar: '|'
        });
      }
    } catch (error) {
      console.error('Error initializing Typed.js:', error);
    }
  }
}

/**
 * Skills Animation Handler
 */
class SkillsHandler {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateSkillBars(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Wait for skills section to be loaded
    const checkSkillsSection = () => {
      const skillsSection = document.querySelector('#skills');
      if (skillsSection) {
        observer.observe(skillsSection);
      } else {
        setTimeout(checkSkillsSection, 100);
      }
    };
    
    checkSkillsSection();
  }

  animateSkillBars(section) {
    const skillBars = section.querySelectorAll('[data-progress]');
    
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const progress = bar.getAttribute('data-progress');
        const progressBar = bar.querySelector('.skill-progress');
        
        if (progressBar) {
          progressBar.style.width = progress + '%';
          progressBar.style.transition = 'width 1.5s ease-in-out';
        }
      }, index * 200);
    });
  }
}

/**
 * Portfolio Filter Handler
 */
class PortfolioHandler {
  constructor() {
    this.init();
  }

  init() {
    this.waitForPortfolioSection();
  }

  waitForPortfolioSection() {
    const checkPortfolio = () => {
      const portfolioSection = document.querySelector('#portfolio');
      if (portfolioSection) {
        this.setupFilters();
      } else {
        setTimeout(checkPortfolio, 100);
      }
    };
    
    checkPortfolio();
  }

  setupFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
            item.classList.add('animate-fadeIn');
          } else {
            item.style.display = 'none';
            item.classList.remove('animate-fadeIn');
          }
        });
      });
    });
  }
}

/**
 * Form Handler
 */
class FormHandler {
  constructor() {
    this.init();
  }

  init() {
    this.waitForContactForm();
  }

  waitForContactForm() {
    const checkForm = () => {
      const contactForm = document.querySelector('#contact-form');
      if (contactForm) {
        this.setupFormValidation(contactForm);
      } else {
        setTimeout(checkForm, 100);
      }
    };
    
    checkForm();
  }

  setupFormValidation(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Basic validation
      if (this.validateForm(data)) {
        this.submitForm(data);
      }
    });
  }

  validateForm(data) {
    const required = ['name', 'email', 'message'];
    const errors = [];
    
    required.forEach(field => {
      if (!data[field] || data[field].trim() === '') {
        errors.push(`${field} is required`);
      }
    });
    
    // Email validation
    if (data.email && !this.isValidEmail(data.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (errors.length > 0) {
      this.showErrors(errors);
      return false;
    }
    
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showErrors(errors) {
    // Display errors to user
    console.error('Form validation errors:', errors);
    alert('Please fix the following errors:\n' + errors.join('\n'));
  }

  async submitForm(data) {
    try {
      // Here you would typically send the data to your server
      console.log('Form submitted:', data);
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset form
      document.querySelector('#contact-form').reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error sending your message. Please try again.');
    }
  }
}

/**
 * Main Application Class
 */
class PortfolioApp {
  constructor() {
    this.themeManager = null;
    this.navigationManager = null;
    this.typedHandler = null;
    this.skillsHandler = null;
    this.portfolioHandler = null;
    this.formHandler = null;
    
    this.init();
  }

  init() {
    // Initialize theme first
    this.themeManager = new ThemeManager();
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeComponents();
      });
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    // Initialize all components
    this.navigationManager = new NavigationManager();
    this.typedHandler = new TypedHandler();
    this.skillsHandler = new SkillsHandler();
    this.portfolioHandler = new PortfolioHandler();
    this.formHandler = new FormHandler();
    
    // Setup theme toggle after components are loaded
    setTimeout(() => {
      this.themeManager.initToggleButton();
    }, 1000);
    
    console.log('✅ Portfolio App initialized successfully!');
  }
}

// Initialize the application
const app = new PortfolioApp();