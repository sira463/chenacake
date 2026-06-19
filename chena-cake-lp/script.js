document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. GLOBAL CONFIG & WA NUMBER
       ========================================== */
    const WHATSAPP_NUMBER = "6285384899995"; // Ganti dengan nomor WhatsApp Chena Cake Anda (Format Internasional tanpa +)

    /* ==========================================
       2. SCROLL HEADER / NAVIGATION SYSTEM
       ========================================== */
    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Scroll header glassmorphism effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Section Navigation Highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // offset header height
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================
       3. MOBILE NAVIGATION TOGGLE
       ========================================== */
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navItems = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close mobile menu when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }

    /* ==========================================
       4. ANIMATED COUNTERS FOR STATS
       ========================================== */
    const statsSection = document.getElementById('profile');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const increment = target / 50; // Speed of counting
            let current = 0;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current) + (target === 50 || target === 1500 ? '+' : '');
                    setTimeout(updateCount, 25);
                } else {
                    stat.innerText = target + (target === 50 || target === 1500 ? '+' : '');
                }
            };
            updateCount();
        });
    };

    // Intersection Observer to start counters when visible
    const observerOptions = {
        root: null,
        threshold: 0.3
    };

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animateStats();
                    animated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statsObserver.observe(statsSection);
    }

    /* ==========================================
       5. INTERACTIVE CATALOG FILTERING
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Show/hide cards with smooth transition
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // match CSS transitions
                }
            });
        });
    });

    /* ==========================================
       6. TESTIMONIALS SLIDER
       ========================================== */
    const slider = document.getElementById('testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const dotsContainer = document.getElementById('slider-dots');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    let autoPlayInterval;

    const updateSlider = (index) => {
        currentIndex = index;
        
        // Loop index boundary check
        if (currentIndex < 0) currentIndex = slides.length - 1;
        if (currentIndex >= slides.length) currentIndex = 0;

        // Slide animation via translateX
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active slide class
        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update dots state
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const nextSlide = () => {
        updateSlider(currentIndex + 1);
    };

    const prevSlide = () => {
        updateSlider(currentIndex - 1);
    };

    // Click navigation
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Dot indicators navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlider(index);
            resetAutoPlay();
        });
    });

    // Auto Play testimonials
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextSlide, 5000); // Slide every 5 seconds
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    };

    // Pause autoplay on mouse hover over testimonials
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Initialize Auto Play
    startAutoPlay();

    /* ==========================================
       7. DYNAMIC WHATSAPP ORDER HELPER
       ========================================== */
    const orderButtons = document.querySelectorAll('.wa-order-btn');

    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productName = button.getAttribute('data-product');
            
            // Format order message in Indonesian
            const message = `Halo Chena Cake, saya tertarik untuk memesan produk "${productName}" dari katalog website Anda. Bagaimana informasi lebih lanjut mengenai ketersediaan dan cara pemesanan? Terima kasih!`;
            
            // Build direct WhatsApp URL
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            
            // Open in new tab
            window.open(whatsappUrl, '_blank');
        });
    });

    /* ==========================================
       8. BACK TO TOP BUTTON
       ========================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
