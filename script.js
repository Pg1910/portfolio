// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const botToggle = document.getElementById('botToggle');
const botChat = document.getElementById('botChat');
const botClose = document.getElementById('botClose');
const botMessages = document.getElementById('botMessages');
const botInput = document.getElementById('botInput');
const botSend = document.getElementById('botSend');

// Animation Elements
const sections = document.querySelectorAll('section');

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon();

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Mobile Navigation
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Smooth Scrolling for Navigation Links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        closeMobileMenu();
    }
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

// Contact Form Handling
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Show success message (in a real app, you'd send this to a server)
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    } else {
        notification.style.background = '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// WhatsApp Chat Bot
let botOpen = false;

function toggleBot() {
    botOpen = !botOpen;
    if (botOpen) {
        botChat.classList.add('active');
        botInput.focus();
    } else {
        botChat.classList.remove('active');
    }
}

function closeBot() {
    botOpen = false;
    botChat.classList.remove('active');
}

function sendBotMessage() {
    const message = botInput.value.trim();
    if (!message) return;
    
    // Add user message
    addBotMessage(message, 'user');
    botInput.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const response = generateBotResponse(message);
        addBotMessage(response, 'bot');
    }, 1000);
}

function addBotMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `bot-message ${sender}-message`;
    messageDiv.style.cssText = `
        background: ${sender === 'user' ? 'var(--primary-color)' : 'var(--bg-secondary)'};
        color: ${sender === 'user' ? 'white' : 'var(--text-primary)'};
        margin-left: ${sender === 'user' ? 'auto' : '0'};
        margin-right: ${sender === 'user' ? '0' : 'auto'};
        max-width: 80%;
        padding: 0.75rem;
        border-radius: 1rem;
        margin-bottom: 1rem;
    `;
    
    const messageP = document.createElement('p');
    messageP.textContent = message;
    messageP.style.margin = '0';
    
    messageDiv.appendChild(messageP);
    botMessages.appendChild(messageDiv);
    botMessages.scrollTop = botMessages.scrollHeight;
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! I'm Piyush's assistant. How can I help you today?";
    } else if (message.includes('project') || message.includes('work')) {
        return "Piyush has worked on several interesting projects including GlaucFusion for glaucoma detection, SCRIBE for content analysis, and medical image segmentation. You can check them out on his GitHub!";
    } else if (message.includes('contact') || message.includes('email')) {
        return "You can reach Piyush at gguptapiyush45@gmail.com or connect with him on LinkedIn: https://linkedin.com/in/piyush-gupta-200416309";
    } else if (message.includes('experience') || message.includes('intern')) {
        return "Piyush has experience as an Image Processing Research Intern at AnyTechPros, ML Research Intern at MANIT Bhopal, SDE Intern at Bluestock Fintech, and Samsung PRISM Intern at IIITDM Kurnool.";
    } else if (message.includes('skill') || message.includes('technology')) {
        return "Piyush specializes in Python, PyTorch, TensorFlow, OpenCV, and various ML/AI frameworks. He's also experienced with cloud platforms like AWS and Google Cloud.";
    } else if (message.includes('resume') || message.includes('cv')) {
        return "You can download Piyush's resume from the main page. Look for the 'Download Resume' button in the hero section!";
    } else if (message.includes('github')) {
        return "Check out Piyush's projects on GitHub: https://github.com/Pg1910";
    } else if (message.includes('thank')) {
        return "You're welcome! Feel free to ask if you have any other questions.";
    } else {
        return "That's an interesting question! For specific inquiries, I'd recommend reaching out to Piyush directly via email or LinkedIn. I'm here to help with general information about his work and experience.";
    }
}

// Scroll Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stagger-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize Typing Animation
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        const highlightSpan = heroTitle.querySelector('.highlight');
        const highlightText = highlightSpan ? highlightSpan.textContent : '';
        
        // Reset to show full text initially
        heroTitle.innerHTML = originalText;
        
        // Add typing effect on scroll or after a delay
        setTimeout(() => {
            if (highlightSpan) {
                highlightSpan.innerHTML = '';
                typeWriter(highlightSpan, highlightText, 150);
            }
        }, 1000);
    }
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
hamburger.addEventListener('click', toggleMobileMenu);
navLinks.forEach(link => link.addEventListener('click', smoothScroll));
contactForm.addEventListener('submit', handleContactForm);
botToggle.addEventListener('click', toggleBot);
botClose.addEventListener('click', closeBot);
botSend.addEventListener('click', sendBotMessage);
botInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBotMessage();
    }
});

// Window Events
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    animateOnScroll();
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    animateOnScroll();
    initTypingAnimation();
    
    // Observe sections for entrance animations
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => sectionObserver.observe(section));
    
    // Add initial hero animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
});

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .blog-card, .timeline-item, .skill-category');
    animatedElements.forEach(el => observer.observe(el));
});

// Preload critical images
function preloadImages() {
    const imageUrls = [
        'profile.jpg',
        'project1.jpg',
        'project2.jpg',
        'project3.jpg',
        'blog1.jpg',
        'blog2.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Call preload function
preloadImages();

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Simple smooth scrolling
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        closeMobileMenu();
    }
}

// Simple section entrance animations
function animateSectionEntrance(section) {
    section.classList.add('animate-in');
    
    const animatedElements = section.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stagger-item');
    
    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-in');
        }, index * 50);
    });
}

// Intersection Observer for section animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSectionEntrance(entry.target);
            sectionObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
});

// Simple loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
