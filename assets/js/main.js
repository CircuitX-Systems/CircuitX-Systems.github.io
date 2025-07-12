document.addEventListener('DOMContentLoaded', () => {

    // --- 1. General Scroll-Triggered Fade-In Animation ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section').forEach(section => {
        scrollObserver.observe(section);
    });

    // --- 2. Animated Number Counters ---
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const stepTime = Math.abs(Math.floor(duration / target));
                let current = 0;
                const timer = setInterval(() => {
                    current += 1;
                    counter.innerText = current;
                    if (current >= target) {
                        counter.innerText = target;
                        clearInterval(timer);
                    }
                }, stepTime);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.8 });
    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- 3. "Back to Top" Button Visibility ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
    }

    // --- 4. Smooth scroll for anchor links ---
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = targetId === '#' ? document.body : document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});