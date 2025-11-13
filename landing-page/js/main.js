/**
 * A1 Bulgaria IBM Landing Page - Main JavaScript
 * Handles navigation, mobile menu, smooth scrolling, and animations
 */

(function() {
    'use strict';

    // ===================================
    // Dark Mode Toggle
    // ===================================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const theme = htmlElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Send event to Google Analytics
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push({
                    'event': 'dark_mode_toggle',
                    'theme': newTheme
                });
            }
        });
    }

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            body.style.overflow = isExpanded ? 'auto' : 'hidden';
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) &&
                !mobileMenuToggle.contains(event.target) &&
                navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = 'auto';
            }
        });
    }

    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or if it's a modal/tab trigger
            if (href === '#' || href.length < 2) {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(href);

            if (targetElement) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without scrolling
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // ===================================
    // Header Shadow on Scroll
    // ===================================
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }

        lastScrollTop = scrollTop;
    });

    // ===================================
    // Intersection Observer for Animations
    // ===================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.usp-card, .product-card, .product-banner, .challenges-column, .solutions-column'
    );

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });

    // ===================================
    // CTA Button Tracking (for analytics)
    // ===================================
    const ctaButtons = document.querySelectorAll('.btn-primary');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonLocation = this.closest('section')?.id || 'unknown';

            // Send event to Google Analytics (if GTM/GA is configured)
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push({
                    'event': 'cta_click',
                    'button_text': buttonText,
                    'button_location': buttonLocation
                });
            }
        });
    });

    // ===================================
    // Product Banner Click Tracking
    // ===================================
    const productBanners = document.querySelectorAll('.product-banner');

    productBanners.forEach(banner => {
        banner.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') return; // Skip if clicking a link

            const bannerTitle = this.querySelector('h3, h4')?.textContent || 'Unknown Product';

            // Send event to Google Analytics
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push({
                    'event': 'product_banner_click',
                    'product_name': bannerTitle
                });
            }
        });
    });

    // ===================================
    // Lazy Load Images (if not using native loading="lazy")
    // ===================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===================================
    // Keyboard Navigation Enhancement
    // ===================================
    document.addEventListener('keydown', function(e) {
        // Allow ESC key to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = 'auto';
            mobileMenuToggle.focus();
        }
    });

    // ===================================
    // Page Load Performance Tracking
    // ===================================
    window.addEventListener('load', function() {
        // Send page load time to analytics
        if (typeof dataLayer !== 'undefined' && 'performance' in window) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

            dataLayer.push({
                'event': 'page_load_complete',
                'page_load_time': pageLoadTime
            });
        }
    });

    // ===================================
    // Scroll to Top on Page Load (if hash in URL)
    // ===================================
    if (window.location.hash) {
        setTimeout(function() {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    // ===================================
    // Console Message (Development)
    // ===================================
    console.log('A1 Bulgaria IBM Landing Page loaded successfully');
    console.log('For support, contact: ibm@a1.bg');

})();
