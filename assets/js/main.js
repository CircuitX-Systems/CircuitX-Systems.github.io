// Keystone Systems - main.js (V3 - Merged and Upgraded)

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NEW: Global Interactive Background Spotlight ---
    // This creates the subtle spotlight that follows the cursor across the whole page.
    // It works with the ::before pseudo-element styled in the CSS.
    document.addEventListener('mousemove', (e) => {
        window.requestAnimationFrame(() => {
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
    });

    // --- 2. EXISTING: Scroll-Triggered Section Animations ---
    // This makes content sections fade in as you scroll down.
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section').forEach(section => scrollObserver.observe(section));

    // --- 3. EXISTING: Interactive Card Spotlight ---
    // This creates the spotlight effect specifically on service and portfolio cards.
    document.querySelectorAll('.service-card, .portfolio-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 4. EXISTING: Smooth Scrolling for Anchor Links ---
    // This handles smooth scrolling for links like <a href="#section">.
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

    // --- 5. EXISTING: "Back to Top" Button Visibility ---
    // This shows and hides the "Back to Top" button.
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        // The click event for this button is already in your default.html,
        // but it's good practice to have it here too.
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
