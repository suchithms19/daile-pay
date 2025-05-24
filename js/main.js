// Animation on scroll
        document.addEventListener('DOMContentLoaded', function() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

 // Observe process steps
            const processSteps = document.querySelectorAll('.process-step');
            processSteps.forEach(step => {
                observer.observe(step);
            });

// Observe process boxes
            const processBoxes = document.querySelectorAll('.process-box');
            processBoxes.forEach(box => {
                observer.observe(box);
            });

 // Observe benefit items
            const benefitItems = document.querySelectorAll('.benefit-item');
            benefitItems.forEach((item, index) => {
                observer.observe(item);
            });

// Observe price tag
            const priceTag = document.querySelector('.price-tag');
            observer.observe(priceTag);

    // Observe steps in how it works
            const steps = document.querySelectorAll('.step');
            steps.forEach((step, index) => {
                observer.observe(step);
            });
        });

 // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        // Intersection Observer for all animations
document.addEventListener('DOMContentLoaded', function() {
    // Configure the observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // For incubation section specific items
                if (entry.target.classList.contains('incubation-container')) {
                    const leftSlide = entry.target.querySelector('.left-slide');
                    const rightSlide = entry.target.querySelector('.right-slide');
                    if (leftSlide) leftSlide.classList.add('visible');
                    if (rightSlide) rightSlide.classList.add('visible');
                }
            }
        });
    }, observerOptions);
    // Observe footer
const footer = document.querySelector('.footer-section');
if (footer) {
    observer.observe(footer);
}

    // Observe all elements that need animation
    const elementsToAnimate = document.querySelectorAll(
        '.section-transition, .incubation-container, .left-slide, .right-slide'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Mobile menu toggle (if you have one)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});
 /* Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}
);*/

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

//existing observer in scripts.js 
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelector('.navbar').classList.add('visible');
        }
    });
}, { threshold: 0.1 });

navObserver.observe(document.querySelector('body'));

// Add to your existing Intersection Observer
document.querySelectorAll('.left-slide, .right-slide').forEach(el => {
    observer.observe(el);
});

// Back to Top Button
const backToTop = document.createElement('a');
backToTop.href = '#';
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Get Quote form
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        let valid = true;
        form.querySelectorAll('input[required], textarea[required]').forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                valid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        if (!valid) {
            e.preventDefault();
            alert('Please fill all required fields');
        }
    });
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

 // Navigation active state
 document.querySelectorAll('.nav-links a').forEach(link => {
    if(link.textContent === 'About') {
        link.classList.add('active');
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

 // Tab functionality
 document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Highlight current page in navigation
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

 // Form submission
 document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        company: document.getElementById('company').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        product: document.getElementById('product').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send this data to a server
    console.log('Form submitted:', formData);
    
    // Show success message (in a real app, you'd check the response first)
    alert('Thank you for your message! We will contact you soon.');
    this.reset();
});

// Highlight current page in navigation
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
