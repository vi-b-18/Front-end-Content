// Dark mode functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
const htmlElement = document.documentElement;

// Check for saved dark mode preference or default to light mode
const savedDarkMode = localStorage.getItem('darkMode');
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Initialize dark mode
if (savedDarkMode === 'true' || (!savedDarkMode && prefersDarkMode)) {
    htmlElement.classList.add('dark');
    darkModeToggle.checked = true;
    darkModeToggleMobile.checked = true;
}

// Toggle dark mode function
function toggleDarkMode() {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
        darkModeToggle.checked = false;
        darkModeToggleMobile.checked = false;
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
        darkModeToggle.checked = true;
        darkModeToggleMobile.checked = true;
    }
}

// Add event listeners
darkModeToggle.addEventListener('change', toggleDarkMode);
darkModeToggleMobile.addEventListener('change', toggleDarkMode);

// Listen for system dark mode changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('darkMode')) {
        if (e.matches) {
            htmlElement.classList.add('dark');
            darkModeToggle.checked = true;
            darkModeToggleMobile.checked = true;
        } else {
            htmlElement.classList.remove('dark');
            darkModeToggle.checked = false;
            darkModeToggleMobile.checked = false;
        }
    }
});

// Smooth scrolling for navigation links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    observer.observe(el);
});

// Counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Newsletter form animation
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('subscribeBtn');
    const input = document.getElementById('emailInput');
    const successMessage = document.getElementById('successMessage');

    // Animate button
    btn.innerHTML = '⏳ Subscribing...';
    btn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        btn.innerHTML = '✅ Subscribed!';
        input.value = '';
        successMessage.classList.remove('hidden');
        successMessage.classList.add('animate-pulse');

        setTimeout(() => {
            btn.innerHTML = 'Subscribe';
            btn.disabled = false;
            successMessage.classList.add('hidden');
            successMessage.classList.remove('animate-pulse');
        }, 3000);
    }, 1500);
});

// Category card hover effects
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add typing effect to hero text
window.addEventListener('load', () => {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        typewriterElement.style.animationPlayState = 'running';
    }
});

// Mobile menu toggle (for future use)
const mobileMenuBtn = document.querySelector('.md\\:hidden button:last-child');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        // Add mobile menu animation logic here
        console.log('Mobile menu clicked');
    });
}

// Contact form functionality
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('contactSubmitBtn');
    const form = e.target;
    const successMessage = document.getElementById('contactSuccessMessage');
    const formData = new FormData(form);

    // Get form values for validation
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Simple validation
    if (!firstName || !lastName || !email || !subject || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Animate button and form submission
    btn.innerHTML = '⏳ Sending...';
    btn.disabled = true;
    btn.classList.add('opacity-75');

    // Simulate API call
    setTimeout(() => {
        btn.innerHTML = '✅ Message Sent!';
        btn.classList.remove('opacity-75');
        btn.classList.add('bg-green-600', 'hover:bg-green-700');
        btn.classList.remove('bg-primary', 'hover:bg-secondary', 'dark:bg-blue-600', 'dark:hover:bg-blue-700');

        // Show success message
        successMessage.classList.remove('hidden');
        successMessage.classList.add('animate-pulse');

        // Clear form
        form.reset();

        // Reset button after delay
        setTimeout(() => {
            btn.innerHTML = 'Send Message';
            btn.disabled = false;
            btn.classList.remove('bg-green-600', 'hover:bg-green-700', 'animate-pulse');
            btn.classList.add('bg-primary', 'hover:bg-secondary', 'dark:bg-blue-600', 'dark:hover:bg-blue-700');
            successMessage.classList.add('hidden');
            successMessage.classList.remove('animate-pulse');
        }, 4000);
    }, 2000);
});

// Form field animations
const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('transform', 'scale-105');
        this.classList.add('ring-4', 'ring-primary/20', 'dark:ring-blue-400/20');
    });

    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('transform', 'scale-105');
        this.classList.remove('ring-4', 'ring-primary/20', 'dark:ring-blue-400/20');
    });
});

// Enhanced scroll animations for new sections
const observerOptionsContact = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Add staggered animations for contact cards
            if (entry.target.classList.contains('contact-card')) {
                const cards = entry.target.parentElement.querySelectorAll('.contact-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-bounce');
                        setTimeout(() => {
                            card.classList.remove('animate-bounce');
                        }, 1000);
                    }, index * 200);
                });
            }
        }
    });
}, observerOptionsContact);

// Observe contact and about sections
document.querySelectorAll('#contact .fade-in, #about .fade-in').forEach(el => {
    contactObserver.observe(el);
});

// Add hover effects to social media links
document.querySelectorAll('a[href="#"]').forEach(link => {
    if (link.querySelector('svg')) {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});

// Team member card interactions
document.querySelectorAll('#about .scale-in').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const avatar = this.querySelector('div[class*="bg-gradient"]');
        if (avatar) {
            avatar.classList.add('animate-spin');
            setTimeout(() => {
                avatar.classList.remove('animate-spin');
            }, 1000);
        }
    });
});

// Add random floating animation to articles
document.querySelectorAll('article').forEach((article, index) => {
    const delay = Math.random() * 2000;
    setTimeout(() => {
        article.style.animationDelay = `${Math.random() * 2}s`;
        article.classList.add('floating');
    }, delay);
});

// Enhanced smooth scroll with offset for sticky navigation and custom easing
function smoothScrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const navHeight = 64; // Height of sticky nav
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = Math.min(Math.abs(distance) / 2, 1000); // Adaptive duration, max 1s
        let startTime = null;

        // Easing function for smooth animation
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
}

// Update navigation scroll handlers
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            smoothScrollToSection(targetId);
        }
    });
});

// AI Hero Section Animations
function createNeuralNetwork() {
    const neuralNetworkContainer = document.getElementById('neuralNetwork');
    if (!neuralNetworkContainer) return;

    // Clear any existing content
    neuralNetworkContainer.innerHTML = '';

    // Create nodes
    const nodes = [];
    const numNodes = window.innerWidth < 768 ? 10 : 20;

    for (let i = 0; i < numNodes; i++) {
        const node = document.createElement('div');
        node.classList.add('neural-node');

        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        node.style.left = `${left}%`;
        node.style.top = `${top}%`;

        // Add random animation delay
        node.style.animationDelay = `${Math.random() * 2}s`;

        neuralNetworkContainer.appendChild(node);
        nodes.push({ element: node, left, top });
    }

    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Connect to 2-3 closest nodes
        const connections = [];

        for (let j = 0; j < nodes.length; j++) {
            if (i !== j) {
                const otherNode = nodes[j];
                const distance = Math.sqrt(
                    Math.pow(node.left - otherNode.left, 2) +
                    Math.pow(node.top - otherNode.top, 2)
                );
                connections.push({ node: otherNode, distance });
            }
        }

        // Sort by distance
        connections.sort((a, b) => a.distance - b.distance);

        // Take the closest 2-3 connections
        const numConnections = Math.floor(Math.random() * 2) + 2; // 2-3 connections
        for (let k = 0; k < Math.min(numConnections, connections.length); k++) {
            const connection = document.createElement('div');
            connection.classList.add('neural-connection');

            // Calculate connection position and size
            const x1 = node.left;
            const y1 = node.top;
            const x2 = connections[k].node.left;
            const y2 = connections[k].node.top;

            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

            connection.style.width = `${length}%`;
            connection.style.left = `${x1}%`;
            connection.style.top = `${y1}%`;
            connection.style.transform = `rotate(${angle}deg)`;
            connection.style.transformOrigin = 'left center';
            connection.style.animationDelay = `${Math.random() * 3}s`;

            neuralNetworkContainer.appendChild(connection);
        }
    }
}

function createMatrixRain() {
    const matrixContainer = document.getElementById('matrixRain');
    if (!matrixContainer) return;

    // Clear any existing content
    matrixContainer.innerHTML = '';

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@%&*';
    const numDrops = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < numDrops; i++) {
        const drop = document.createElement('div');
        drop.classList.add('matrix-char');

        // Random position and character
        drop.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDelay = `${Math.random() * 5}s`;
        drop.style.animationDuration = `${5 + Math.random() * 5}s`;
        drop.style.opacity = Math.random() * 0.5 + 0.1;

        matrixContainer.appendChild(drop);
    }
}

// Initialize AI visual effects
function initAIEffects() {
    createNeuralNetwork();
    createMatrixRain();
}

// Ensure page loads at the top
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Force scroll to top on page load
window.addEventListener('load', function() {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Initialize AI effects
    initAIEffects();
    
    // Force scroll to top again after a short delay to ensure it sticks
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Also handle page refresh and back/forward navigation
window.addEventListener('pageshow', function(event) {
    window.scrollTo(0, 0);
});

// Handle resize events
window.addEventListener('resize', initAIEffects);
