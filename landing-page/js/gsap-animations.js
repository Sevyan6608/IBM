/**
 * A1 Bulgaria IBM Landing Page - GSAP Animations
 * Includes: Smooth Scroll, Parallax, SplitText, and Inertia effects
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    window.addEventListener('load', function() {

        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Draggable, InertiaPlugin);

        // ===================================
        // SMOOTH SCROLL SETUP
        // ===================================
        const smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.5,
            effects: true,
            smoothTouch: 0.1,
        });

        // ===================================
        // SPLIT TEXT FOR H1 AND H2 ELEMENTS
        // ===================================
        const headings = document.querySelectorAll('h1, h2');

        headings.forEach(heading => {
            // Split text into words
            const split = new SplitText(heading, {
                type: 'words',
                wordsClass: 'split-word'
            });

            // Animate words on scroll
            gsap.from(split.words, {
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                duration: 0.6,
                opacity: 0,
                y: 30,
                rotationX: -90,
                transformOrigin: '0% 50% -50',
                stagger: 0.05,
                ease: 'power2.out'
            });
        });

        // ===================================
        // PARALLAX EFFECT - PRODUCTS SECTION
        // ===================================
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach((card, index) => {
            const image = card.querySelector('.product-image img');

            if (image) {
                gsap.to(image, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    },
                    y: index % 2 === 0 ? '-20%' : '20%',
                    ease: 'none'
                });
            }

            // Card entrance animation
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                duration: 0.8,
                opacity: 0,
                y: 60,
                scale: 0.95,
                ease: 'power3.out'
            });
        });

        // ===================================
        // INERTIA PLUGIN - ADVANTAGES SECTION
        // (USP Cards with draggable carousel)
        // ===================================
        const uspGrid = document.querySelector('.usp-grid');
        const uspCards = document.querySelectorAll('.usp-card');

        if (uspGrid && uspCards.length > 0) {
            // Make USP cards draggable horizontally on mobile/tablet
            if (window.innerWidth < 1024) {
                const wrapper = document.createElement('div');
                wrapper.className = 'usp-draggable-wrapper';
                uspGrid.parentNode.insertBefore(wrapper, uspGrid);
                wrapper.appendChild(uspGrid);

                Draggable.create(uspGrid, {
                    type: 'x',
                    edgeResistance: 0.65,
                    bounds: wrapper,
                    inertia: true,
                    throwProps: true,
                    snap: {
                        x: function(endValue) {
                            return Math.round(endValue / 300) * 300;
                        }
                    }
                });
            }

            // Entrance animation for USP cards with stagger
            gsap.from(uspCards, {
                scrollTrigger: {
                    trigger: uspGrid,
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                },
                duration: 0.7,
                opacity: 0,
                y: 50,
                scale: 0.9,
                stagger: 0.15,
                ease: 'back.out(1.2)'
            });
        }

        // ===================================
        // HERO SECTION ANIMATIONS
        // ===================================
        const heroContent = document.querySelector('.hero-content');
        const heroBanners = document.querySelectorAll('.product-banner');

        if (heroContent) {
            gsap.from(heroContent, {
                duration: 1,
                opacity: 0,
                y: 60,
                ease: 'power3.out',
                delay: 0.2
            });
        }

        if (heroBanners.length > 0) {
            gsap.from(heroBanners, {
                duration: 0.8,
                opacity: 0,
                scale: 0.8,
                y: 40,
                stagger: 0.1,
                ease: 'back.out(1.4)',
                delay: 0.5
            });
        }

        // ===================================
        // CHALLENGES & SOLUTIONS ANIMATION
        // ===================================
        const challengesColumn = document.querySelector('.challenges-column');
        const solutionsColumn = document.querySelector('.solutions-column');

        if (challengesColumn) {
            gsap.from(challengesColumn, {
                scrollTrigger: {
                    trigger: challengesColumn,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                duration: 0.8,
                opacity: 0,
                x: -50,
                ease: 'power2.out'
            });
        }

        if (solutionsColumn) {
            gsap.from(solutionsColumn, {
                scrollTrigger: {
                    trigger: solutionsColumn,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                duration: 0.8,
                opacity: 0,
                x: 50,
                ease: 'power2.out'
            });
        }

        // ===================================
        // CONTACT FORM ANIMATION
        // ===================================
        const contactForm = document.querySelector('.contact-form-wrapper');
        const contactInfo = document.querySelector('.contact-info');

        if (contactForm) {
            gsap.from(contactForm, {
                scrollTrigger: {
                    trigger: contactForm,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                duration: 0.8,
                opacity: 0,
                y: 40,
                ease: 'power2.out'
            });
        }

        if (contactInfo) {
            gsap.from(contactInfo, {
                scrollTrigger: {
                    trigger: contactInfo,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                duration: 0.8,
                opacity: 0,
                y: 40,
                ease: 'power2.out',
                delay: 0.2
            });
        }

        // ===================================
        // CLIENT LOGOS CAROUSEL WITH INERTIA
        // ===================================
        const clientsCarousel = document.getElementById('clientsCarousel');
        const clientsWrapper = document.querySelector('.clients-carousel-wrapper');

        if (clientsCarousel && clientsWrapper) {
            // Make carousel draggable with Inertia
            Draggable.create(clientsCarousel, {
                type: 'x',
                edgeResistance: 0.65,
                bounds: {
                    minX: -(clientsCarousel.scrollWidth - clientsWrapper.offsetWidth + 40),
                    maxX: 0
                },
                inertia: true,
                throwProps: true,
                snap: {
                    x: function(endValue) {
                        return Math.round(endValue / 220) * 220;
                    }
                }
            });

            // Entrance animation for client logos
            const clientLogos = document.querySelectorAll('.client-logo');
            gsap.from(clientLogos, {
                scrollTrigger: {
                    trigger: clientsCarousel,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                duration: 0.6,
                opacity: 0,
                scale: 0.8,
                y: 30,
                stagger: 0.1,
                ease: 'back.out(1.2)'
            });
        }

        // ===================================
        // FOOTER FADE IN
        // ===================================
        const footer = document.querySelector('.footer');

        if (footer) {
            gsap.from(footer, {
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                duration: 1,
                opacity: 0,
                y: 30,
                ease: 'power2.out'
            });
        }

        // ===================================
        // BUTTON HOVER EFFECTS
        // ===================================
        const buttons = document.querySelectorAll('.btn-primary');

        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // ===================================
        // REFRESH SCROLLTRIGGER ON RESIZE
        // ===================================
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                ScrollTrigger.refresh();
            }, 250);
        });

        console.log('GSAP animations initialized successfully');
    });

})();
