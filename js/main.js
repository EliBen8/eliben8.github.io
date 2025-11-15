// js/main.js

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('backdrop-blur-lg');
    } else {
        nav.classList.remove('backdrop-blur-lg');
    }
});

// ============================================
// INTERSECTION OBSERVER (Animation on scroll)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category-new, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// SHOW MORE PROJECTS FUNCTIONALITY
// ============================================
document.getElementById('showMoreBtn').addEventListener('click', function () {
    const additionalProjects = document.getElementById('additionalProjects');
    const btnText = this.querySelector('span');
    const btnIcon = this.querySelector('svg');

    if (additionalProjects.classList.contains('show')) {
        // Hide additional projects
        additionalProjects.classList.remove('show');
        btnText.textContent = 'Show More Projects';
        btnIcon.classList.remove('rotate-180');
    } else {
        // Show additional projects
        additionalProjects.classList.add('show');
        btnText.textContent = 'Show Less Projects';
        btnIcon.classList.add('rotate-180');
    }
});

// ============================================
// TYPEWRITER EFFECT
// ============================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.innerHTML = '&nbsp;';

    function type() {
        if (i < text.length) {
            // Remove cursor, add character, then re-add cursor
            if (element.contains(cursor)) {
                element.removeChild(cursor);
            }
            element.innerHTML += text.charAt(i);
            element.appendChild(cursor);
            i++;
            setTimeout(type, speed);
        }
    }

    // Start with just the cursor
    element.appendChild(cursor);
    type();
}

// Initialize typewriter when page loads
window.addEventListener('load', function () {
    const typewriterElement = document.querySelector('#typewriter-text');
    if (typewriterElement) {
        setTimeout(() => {
            typeWriter(typewriterElement, 'Software Engineer & Tech Enthusiast', 80);
        }, 1000);
    }
});