/**
 * Nomad Wealth Atlas - Main JavaScript
 * =====================================
 * Interactive functionality for wealth nomadism and tax optimization
 * 
 * @version 1.0.0
 * @author Nomad Wealth Atlas
 * @license MIT
 */

(function() {
  'use strict';

  // ========================================
  // CONFIGURATION
  // ========================================
  const CONFIG = {
    // Calculator settings
    calculator: {
      minWealth: 1000000,      // $1M
      maxWealth: 100000000000000, // $100T
      defaultTaxRate: 37,      // Default high-tax jurisdiction rate
      defaultTargetRate: 0,    // Default target jurisdiction rate
      currency: 'USD',
      locale: 'en-US'
    },
    
    // Animation settings
    animation: {
      duration: 250,
      easing: 'ease-out'
    },
    
    // Breakpoints
    breakpoints: {
      mobile: 768,
      tablet: 1024
    }
  };

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  const Utils = {
    /**
     * Format number as currency
     * @param {number} value - Number to format
     * @param {boolean} compact - Use compact notation (e.g., $1.5M)
     * @returns {string} Formatted currency string
     */
    formatCurrency(value, compact = false) {
      if (compact && value >= 1000000) {
        return new Intl.NumberFormat(CONFIG.calculator.locale, {
          style: 'currency',
          currency: CONFIG.calculator.currency,
          notation: 'compact',
          maximumFractionDigits: 1
        }).format(value);
      }
      return new Intl.NumberFormat(CONFIG.calculator.locale, {
        style: 'currency',
        currency: CONFIG.calculator.currency,
        maximumFractionDigits: 0
      }).format(value);
    },

    /**
     * Format percentage
     * @param {number} value - Percentage value
     * @returns {string} Formatted percentage string
     */
    formatPercent(value) {
      return `${value.toFixed(1)}%`;
    },

    /**
     * Convert linear slider value to logarithmic wealth value
     * @param {number} sliderValue - 0-100 slider position
     * @returns {number} Wealth value
     */
    sliderToWealth(sliderValue) {
      const minLog = Math.log10(CONFIG.calculator.minWealth);
      const maxLog = Math.log10(CONFIG.calculator.maxWealth);
      const logValue = minLog + (sliderValue / 100) * (maxLog - minLog);
      return Math.pow(10, logValue);
    },

    /**
     * Convert wealth value to slider position
     * @param {number} wealth - Wealth value
     * @returns {number} Slider position (0-100)
     */
    wealthToSlider(wealth) {
      const minLog = Math.log10(CONFIG.calculator.minWealth);
      const maxLog = Math.log10(CONFIG.calculator.maxWealth);
      const wealthLog = Math.log10(wealth);
      return ((wealthLog - minLog) / (maxLog - minLog)) * 100;
    },

    /**
     * Debounce function execution
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    /**
     * Check if element is in viewport
     * @param {Element} element - DOM element
     * @returns {boolean} True if in viewport
     */
    isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },

    /**
     * Animate number counting
     * @param {Element} element - Element to animate
     * @param {number} start - Start value
     * @param {number} end - End value
     * @param {number} duration - Animation duration in ms
     * @param {Function} formatter - Optional formatter function
     */
    animateNumber(element, start, end, duration = 1000, formatter = null) {
      const startTime = performance.now();
      const diff = end - start;
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out-cubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = start + (diff * easeProgress);
        
        element.textContent = formatter ? formatter(currentValue) : Math.round(currentValue).toLocaleString();
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  };

  // ========================================
  // MOBILE NAVIGATION
  // ========================================
  const MobileNav = {
    toggle: null,
    nav: null,
    isOpen: false,

    init() {
      this.toggle = document.querySelector('.mobile-nav-toggle');
      this.nav = document.querySelector('.mobile-nav');
      
      if (!this.toggle || !this.nav) return;
      
      this.toggle.addEventListener('click', () => this.toggleNav());
      
      // Close on outside click
      document.addEventListener('click', (e) => {
        if (this.isOpen && !this.nav.contains(e.target) && !this.toggle.contains(e.target)) {
          this.close();
        }
      });
      
      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
      
      // Close on resize to desktop
      window.addEventListener('resize', Utils.debounce(() => {
        if (window.innerWidth > CONFIG.breakpoints.mobile && this.isOpen) {
          this.close();
        }
      }, 100));
    },

    toggleNav() {
      this.isOpen = !this.isOpen;
      this.nav.classList.toggle('active', this.isOpen);
      this.toggle.setAttribute('aria-expanded', this.isOpen);
      
      // Animate hamburger
      const spans = this.toggle.querySelectorAll('span');
      if (this.isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    },

    close() {
      this.isOpen = false;
      this.nav.classList.remove('active');
      this.toggle.setAttribute('aria-expanded', 'false');
      
      const spans = this.toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  };

  // ========================================
  // CALCULATOR
  // ========================================
  const Calculator = {
    elements: {},
    state: {
      wealth: 10000000, // $10M default
      currentTaxRate: 37,
      targetTaxRate: 0
    },

    init() {
      // Find calculator elements
      this.elements = {
        wealthSlider: document.getElementById('wealth-slider'),
        wealthDisplay: document.getElementById('wealth-display'),
        wealthInput: document.getElementById('wealth-input'),
        currentRate: document.getElementById('current-tax-rate'),
        targetRate: document.getElementById('target-tax-rate'),
        resultCurrent: document.getElementById('result-current'),
        resultTarget: document.getElementById('result-target'),
        resultSavings: document.getElementById('result-savings'),
        resultSavingsPercent: document.getElementById('result-savings-percent')
      };

      // Check if calculator exists on page
      if (!this.elements.wealthSlider) return;

      this.bindEvents();
      this.updateDisplay();
    },

    bindEvents() {
      // Wealth slider
      this.elements.wealthSlider.addEventListener('input', (e) => {
        this.state.wealth = Utils.sliderToWealth(parseFloat(e.target.value));
        this.updateDisplay();
      });

      // Wealth input
      if (this.elements.wealthInput) {
        this.elements.wealthInput.addEventListener('input', Utils.debounce((e) => {
          const value = parseFloat(e.target.value.replace(/[^0-9]/g, ''));
          if (value >= CONFIG.calculator.minWealth) {
            this.state.wealth = value;
            this.elements.wealthSlider.value = Utils.wealthToSlider(value);
            this.updateDisplay();
          }
        }, 300));
      }

      // Tax rate inputs
      if (this.elements.currentRate) {
        this.elements.currentRate.addEventListener('change', (e) => {
          this.state.currentTaxRate = parseFloat(e.target.value) || 37;
          this.updateDisplay();
        });
      }

      if (this.elements.targetRate) {
        this.elements.targetRate.addEventListener('change', (e) => {
          this.state.targetTaxRate = parseFloat(e.target.value) || 0;
          this.updateDisplay();
        });
      }
    },

    updateDisplay() {
      const { wealth, currentTaxRate, targetTaxRate } = this.state;
      
      // Update wealth display
      if (this.elements.wealthDisplay) {
        this.elements.wealthDisplay.textContent = Utils.formatCurrency(wealth, true);
      }

      // Calculate taxes
      const currentTax = wealth * (currentTaxRate / 100);
      const targetTax = wealth * (targetTaxRate / 100);
      const savings = currentTax - targetTax;
      const savingsPercent = ((savings / currentTax) * 100) || 0;

      // Update results with animation
      if (this.elements.resultCurrent) {
        this.elements.resultCurrent.textContent = Utils.formatCurrency(currentTax);
      }
      if (this.elements.resultTarget) {
        this.elements.resultTarget.textContent = Utils.formatCurrency(targetTax);
      }
      if (this.elements.resultSavings) {
        this.elements.resultSavings.textContent = Utils.formatCurrency(savings);
      }
      if (this.elements.resultSavingsPercent) {
        this.elements.resultSavingsPercent.textContent = Utils.formatPercent(savingsPercent);
      }

      // Dispatch custom event for other components
      document.dispatchEvent(new CustomEvent('calculator:update', {
        detail: { wealth, currentTax, targetTax, savings, savingsPercent }
      }));
    },

    setWealth(value) {
      this.state.wealth = Math.max(CONFIG.calculator.minWealth, Math.min(value, CONFIG.calculator.maxWealth));
      if (this.elements.wealthSlider) {
        this.elements.wealthSlider.value = Utils.wealthToSlider(this.state.wealth);
      }
      this.updateDisplay();
    }
  };

  // ========================================
  // EXPANDABLE SECTIONS
  // ========================================
  const ExpandableSections = {
    init() {
      const details = document.querySelectorAll('details.card-expandable');
      
      details.forEach(detail => {
        detail.addEventListener('toggle', (e) => {
          const content = e.target.querySelector('.card-content');
          
          if (e.target.open) {
            // Opening animation
            content.style.opacity = '0';
            content.style.transform = 'translateY(-10px)';
            
            requestAnimationFrame(() => {
              content.style.transition = 'all 250ms ease-out';
              content.style.opacity = '1';
              content.style.transform = 'translateY(0)';
            });
          }
        });
      });
    }
  };

  // ========================================
  // TOOLTIP POSITIONING (Enhancement)
  // ========================================
  const Tooltips = {
    init() {
      // Add keyboard accessibility to tooltips
      const tooltips = document.querySelectorAll('.tooltip');
      
      tooltips.forEach(tooltip => {
        tooltip.setAttribute('tabindex', '0');
        tooltip.setAttribute('role', 'tooltip');
        
        // Show on focus (keyboard navigation)
        tooltip.addEventListener('focus', () => {
          tooltip.classList.add('tooltip-visible');
        });
        
        tooltip.addEventListener('blur', () => {
          tooltip.classList.remove('tooltip-visible');
        });
      });
    }
  };

  // ========================================
  // FORM VALIDATION
  // ========================================
  const FormValidation = {
    init() {
      const forms = document.querySelectorAll('form[data-validate]');
      
      forms.forEach(form => {
        form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = form.querySelectorAll('input[data-validate], textarea[data-validate]');
        inputs.forEach(input => {
          input.addEventListener('blur', () => this.validateField(input));
          input.addEventListener('input', () => this.clearError(input));
        });
      });
    },

    handleSubmit(e) {
      const form = e.target;
      const inputs = form.querySelectorAll('[data-validate]');
      let isValid = true;

      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        e.preventDefault();
        // Focus first error
        const firstError = form.querySelector('.error');
        if (firstError) {
          firstError.focus();
        }
      }
    },

    validateField(input) {
      const rules = input.dataset.validate.split('|');
      let isValid = true;
      let errorMessage = '';

      for (const rule of rules) {
        const [ruleName, ruleValue] = rule.split(':');

        switch (ruleName) {
          case 'required':
            if (!input.value.trim()) {
              isValid = false;
              errorMessage = 'This field is required';
            }
            break;
          case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (input.value && !emailRegex.test(input.value)) {
              isValid = false;
              errorMessage = 'Please enter a valid email address';
            }
            break;
          case 'min':
            if (input.value.length < parseInt(ruleValue)) {
              isValid = false;
              errorMessage = `Minimum ${ruleValue} characters required`;
            }
            break;
          case 'number':
            if (input.value && isNaN(parseFloat(input.value))) {
              isValid = false;
              errorMessage = 'Please enter a valid number';
            }
            break;
        }

        if (!isValid) break;
      }

      if (!isValid) {
        this.showError(input, errorMessage);
      } else {
        this.clearError(input);
      }

      return isValid;
    },

    showError(input, message) {
      input.classList.add('error');
      input.setAttribute('aria-invalid', 'true');
      
      // Find or create error element
      let errorEl = input.parentNode.querySelector('.form-error');
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        input.parentNode.appendChild(errorEl);
      }
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    },

    clearError(input) {
      input.classList.remove('error');
      input.setAttribute('aria-invalid', 'false');
      
      const errorEl = input.parentNode.querySelector('.form-error');
      if (errorEl) {
        errorEl.style.display = 'none';
      }
    }
  };

  // ========================================
  // SMOOTH SCROLL
  // ========================================
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            // Update URL without jumping
            history.pushState(null, null, targetId);
          }
        });
      });
    }
  };

  // ========================================
  // SCROLL ANIMATIONS
  // ========================================
  const ScrollAnimations = {
    observer: null,

    init() {
      // Check for reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            this.observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('animate-hidden');
        this.observer.observe(el);
      });
    }
  };

  // ========================================
  // LAZY LOADING
  // ========================================
  const LazyLoader = {
    init() {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      } else {
        // Fallback for older browsers
        document.querySelectorAll('img[data-src]').forEach(img => {
          img.src = img.dataset.src;
        });
      }
    }
  };

  // ========================================
  // TABLE SORTING
  // ========================================
  const TableSort = {
    init() {
      document.querySelectorAll('table[data-sortable] th').forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => this.sortTable(header));
      });
    },

    sortTable(header) {
      const table = header.closest('table');
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      const columnIndex = Array.from(header.parentNode.children).indexOf(header);
      const isNumeric = header.dataset.sort === 'numeric';
      
      // Toggle sort direction
      const currentDir = header.dataset.dir || 'asc';
      const newDir = currentDir === 'asc' ? 'desc' : 'asc';
      
      // Reset other headers
      table.querySelectorAll('th').forEach(th => {
        th.dataset.dir = '';
        th.classList.remove('sort-asc', 'sort-desc');
      });
      
      header.dataset.dir = newDir;
      header.classList.add(`sort-${newDir}`);

      // Sort rows
      rows.sort((a, b) => {
        const aVal = a.children[columnIndex].textContent.trim();
        const bVal = b.children[columnIndex].textContent.trim();
        
        let comparison = 0;
        
        if (isNumeric) {
          const aNum = parseFloat(aVal.replace(/[^0-9.-]/g, ''));
          const bNum = parseFloat(bVal.replace(/[^0-9.-]/g, ''));
          comparison = aNum - bNum;
        } else {
          comparison = aVal.localeCompare(bVal);
        }
        
        return newDir === 'asc' ? comparison : -comparison;
      });

      // Re-append rows in new order
      rows.forEach(row => tbody.appendChild(row));
    }
  };

  // ========================================
  // COOKIE CONSENT
  // ========================================
  const CookieConsent = {
    init() {
      const banner = document.getElementById('cookie-consent');
      if (!banner) return;

      // Check if already consented
      if (localStorage.getItem('cookie-consent')) {
        banner.style.display = 'none';
        return;
      }

      const acceptBtn = banner.querySelector('[data-accept]');
      const declineBtn = banner.querySelector('[data-decline]');

      if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
          localStorage.setItem('cookie-consent', 'accepted');
          banner.style.display = 'none';
        });
      }

      if (declineBtn) {
        declineBtn.addEventListener('click', () => {
          localStorage.setItem('cookie-consent', 'declined');
          banner.style.display = 'none';
        });
      }
    }
  };

  // ========================================
  // INITIALIZATION
  // ========================================
  function init() {
    // Initialize all modules
    MobileNav.init();
    Calculator.init();
    ExpandableSections.init();
    Tooltips.init();
    FormValidation.init();
    SmoothScroll.init();
    ScrollAnimations.init();
    LazyLoader.init();
    TableSort.init();
    CookieConsent.init();

    // Add loaded class to body
    document.body.classList.add('js-loaded');

    // Log initialization
    console.log('Nomad Wealth Atlas initialized');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for external use
  window.NomadWealthAtlas = {
    Utils,
    Calculator,
    CONFIG
  };

})();
