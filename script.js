// script.js - Interactive Features (stable with scroll-reveal)

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const progressBars = document.querySelectorAll('.progress-bar');
    const contactForm = document.getElementById('contact-form');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBg = document.querySelector('.hero-bg');
    const navbar = document.querySelector('.navbar');
    const revealItems = document.querySelectorAll('.reveal-on-scroll');

    /* Mobile Navigation */
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    /* Active Nav Highlight */
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    /* Progress Bars */
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < window.innerHeight - 100) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    }

    /* Scroll Reveal (no IntersectionObserver) */
    function handleReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        revealItems.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            const boxBottom = el.getBoundingClientRect().bottom;

            // If any part is in view → show; otherwise → hide
            if (boxTop < triggerBottom && boxBottom > 0) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');  // allow animation to replay
            }
        });
    }


    /* Navbar background on scroll */
    function handleNavbarBg() {
        if (!navbar) return;
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.05)';
        }
    }

    /* Scroll handler */
    function onScroll() {
        updateActiveNav();
        animateProgressBars();
        handleReveal();
        handleNavbarBg();
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', updateActiveNav);

    /* Contact Form */
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const name = nameInput ? nameInput.value : 'there';
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (!submitBtn) return;

            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon!`);
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    /* Hero typing effect */
    function typeWriter(element, text, speed = 100) {
        if (!element) return;
        let i = 0;
        element.textContent = '';
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    if (heroSubtitle) {
        setTimeout(() => {
            typeWriter(heroSubtitle, 'Embedded Systems | IoT | Robotics | Edge AI', 120);
        }, 800);
    }

    /* Parallax hero background */
    if (heroBg) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 50;
            const y = (window.innerHeight / 2 - e.clientY) / 50;
            heroBg.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    /* Initial state */
    updateActiveNav();
    animateProgressBars();
    handleReveal();
    handleNavbarBg();
});
