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
        animateSectionTransition(() => {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            closeMobileMenu();
        });
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

    // Send via mailto (opens default email client)
    const to = 'gguptapiyush45@gmail.com';
    const subject = encodeURIComponent(`[Portfolio] ${data.subject || 'New message'}`);
    const bodyLines = [
        `Name: ${data.name || '-'} `,
        `Email: ${data.email || '-'} `,
        '',
        (data.message || '').trim()
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    const cc = data.email ? `&cc=${encodeURIComponent(data.email)}` : '';
    const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}${cc}`;

    // Try opening the mail client
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Best-effort: copy composed email content to clipboard for fallback
    const clipboardText = `To: ${to}\n${data.email ? `CC: ${data.email}\n` : ''}Subject: [Portfolio] ${data.subject || 'New message'}\n\n${bodyLines.join('\n')}`;
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(clipboardText).catch(() => {});
    }

    // Inform the user
    showNotification('Opening your email app... If it does not open, the message content has been copied to your clipboard.', 'success');
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
const profileData = {
    name: 'Piyush Gupta',
    title: 'Machine Learning Engineer',
    location: 'Bengaluru, India / Kurnool, Andhra Pradesh',
    education: {
        degree: 'B.Tech Mechanical Engineering',
        institute: 'IIITDM Kurnool, Andhra Pradesh'
    },
    contact: {
        email: 'gguptapiyush45@gmail.com',
        linkedin: 'https://linkedin.com/in/piyush-gupta-200416309',
        github: 'https://github.com/Pg1910',
        twitter: 'https://x.com/Gupta_piyush03',
        blog: 'https://substack.com/@piyushgupta114232',
        resume: 'Piyush_resume.pdf'
    },
    skills: {
        languages: ['Python', 'C++', 'Java', 'R'],
        frameworks: ['PyTorch', 'TensorFlow', 'Hugging Face', 'OpenCV', 'scikit-learn'],
        tools: ['Git', 'Docker', 'AWS', 'Google Cloud', 'React', 'Django']
    },
    projects: [
        { name: 'GlaucFusion', url: 'https://github.com/Pg1910/glaucoma-detection-ai', desc: 'Segmentation-aware glaucoma diagnosis with ViT' },
        { name: 'SCRIBE', url: 'https://github.com/Pg1910/SCRIBE-Smart-Content-Reporting-Intelligence-for-Blogging-Engagement', desc: 'Content analysis for blogging engagement' },
        { name: 'Breast Cancer Segmentation', url: 'https://github.com/Pg1910/breast_cancer_image_segmentation_of_terahertz_images_using_customUNET', desc: 'Custom UNET for terahertz images' }
    ],
    experience: [
        { role: 'Image Processing Research Intern', company: 'AnyTechPros', duration: 'July 2024 - Present' },
        { role: 'ML Research Intern', company: 'MANIT Bhopal', duration: 'June 2024' },
        { role: 'SDE Intern', company: 'Bluestock Fintech Pvt Ltd', duration: 'May 2024 - June 2024' },
        { role: 'Samsung PRISM Intern', company: 'IIITDM Kurnool', duration: 'Dec 2024 - Mar 2025' }
    ],
    availability: {
        summary: 'Open to ML/AI Engineer, Computer Vision, and Research roles (internships and full-time). Remote/hybrid welcome. Timeline flexible—please email to coordinate.'
    }
};
let botOpen = false;

function toggleBot() {
    botOpen = !botOpen;
    if (botOpen) {
        botChat.classList.add('active');
        botInput.focus();
        // Show quick suggestions on open
        renderBotSuggestions(['resume', 'projects', 'skills', 'experience', 'contact', 'availability']);
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
        const result = generateBotResponse(message);
        const text = typeof result === 'string' ? result : result.text;
        addBotMessage(text, 'bot');
        if (typeof result === 'object' && Array.isArray(result.suggestions)) {
            renderBotSuggestions(result.suggestions);
        } else {
            renderBotSuggestions(['resume', 'projects', 'skills', 'experience', 'contact']);
        }
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
    if (sender === 'bot') {
        messageP.innerHTML = message;
    } else {
        messageP.textContent = message;
    }
    messageP.style.margin = '0';
    
    messageDiv.appendChild(messageP);
    botMessages.appendChild(messageDiv);
    botMessages.scrollTop = botMessages.scrollHeight;
}

function generateBotResponse(userMessage) {
    const text = userMessage.toLowerCase();
    const clean = text.replace(/[^a-z0-9\s]/g, ' ');
    const includes = (arr) => arr.some(k => clean.includes(k));

    // Greeting
    if (includes(['hello', 'hi ', 'hey', 'greetings', 'namaste'])) {
        return {
            text: `Hello! I'm Piyush's assistant. How can I help you today? Try asking for <b>resume</b>, <b>projects</b>, <b>skills</b>, <b>experience</b>, <b>contact</b>, or <b>availability</b>.`,
            suggestions: ['resume', 'projects', 'skills', 'experience', 'contact', 'availability']
        };
    }

    // Resume
    if (includes(['resume', 'cv', 'curriculum'])) {
        return {
            text: `You can download the resume here: <a href="${profileData.contact.resume}" target="_blank">Download Resume (PDF)</a>.`,
            suggestions: ['skills', 'experience', 'projects', 'contact']
        };
    }

    // Contact
    if (includes(['contact', 'email', 'reach', 'connect'])) {
        return {
            text: `Email: <a href="mailto:${profileData.contact.email}">${profileData.contact.email}</a><br>LinkedIn: <a href="${profileData.contact.linkedin}" target="_blank">LinkedIn Profile</a><br>GitHub: <a href="${profileData.contact.github}" target="_blank">@Pg1910</a>`,
            suggestions: ['resume', 'projects', 'availability']
        };
    }

    // Phone
    if (includes(['phone', 'call', 'mobile', 'number'])) {
        return {
            text: `Phone details are shared on request. Please email at <a href="mailto:${profileData.contact.email}">${profileData.contact.email}</a>.`,
            suggestions: ['email', 'linkedin']
        };
    }

    // Skills / Tech Stack
    if (includes(['skill', 'stack', 'technology', 'tech', 'tools', 'language', 'framework'])) {
        const s = profileData.skills;
        return {
            text: `<b>Languages:</b> ${s.languages.join(', ')}<br><b>Frameworks:</b> ${s.frameworks.join(', ')}<br><b>Tools:</b> ${s.tools.join(', ')}`,
            suggestions: ['projects', 'experience', 'resume']
        };
    }

    // Experience
    if (includes(['experience', 'intern', 'work history', 'roles', 'timeline'])) {
        const lines = profileData.experience.map(e => `• ${e.role} — ${e.company} (${e.duration})`).join('<br>');
        return {
            text: `${lines}`,
            suggestions: ['skills', 'projects', 'resume']
        };
    }

    // Education
    if (includes(['education', 'degree', 'college', 'university', 'btech'])) {
        const ed = profileData.education;
        return {
            text: `${ed.degree}<br>${ed.institute}`,
            suggestions: ['skills', 'projects', 'resume']
        };
    }

    // Location / Work Mode
    if (includes(['location', 'based', 'where', 'city', 'relocate', 'relocation', 'remote', 'hybrid', 'onsite'])) {
        return {
            text: `Based in ${profileData.location}. Open to remote and hybrid roles; relocation can be discussed.`,
            suggestions: ['availability', 'contact']
        };
    }

    // Availability
    if (includes(['available', 'availability', 'joining', 'join', 'start', 'notice', 'hiring', 'open to work', 'opportunity', 'role', 'position'])) {
        return {
            text: `${profileData.availability.summary}`,
            suggestions: ['contact', 'resume', 'skills']
        };
    }

    // Projects / Portfolio
    if (includes(['project', 'portfolio', 'work', 'code', 'repo', 'github'])) {
        const p = profileData.projects
            .map(pr => `• <b>${pr.name}</b> — ${pr.desc} (<a href="${pr.url}" target="_blank">code</a>)`)
            .join('<br>');
        return {
            text: `${p}<br>GitHub: <a href="${profileData.contact.github}" target="_blank">${profileData.contact.github}</a>`,
            suggestions: ['skills', 'experience', 'resume']
        };
    }

    // LinkedIn
    if (includes(['linkedin'])) {
        return { text: `LinkedIn: <a href="${profileData.contact.linkedin}" target="_blank">Profile</a>`, suggestions: ['contact', 'resume'] };
    }

    // Blog / Writing
    if (includes(['blog', 'substack', 'article', 'write', 'writing'])) {
        return { text: `Blog: <a href="${profileData.contact.blog}" target="_blank">Substack</a>`, suggestions: ['projects', 'resume'] };
    }

    if (includes(['thank', 'thanks', 'thank you'])) {
        return { text: `You're welcome!`, suggestions: ['resume', 'projects', 'contact'] };
    }

    return {
        text: `I can help with <b>resume</b>, <b>projects</b>, <b>skills</b>, <b>experience</b>, <b>education</b>, <b>contact</b>, <b>availability</b>, and <b>location</b>. Try typing one of those keywords or tap a suggestion below.`,
        suggestions: ['resume', 'projects', 'skills', 'experience', 'education', 'contact']
    };
}

// Suggestions UI
let suggestionsContainer = null;
function ensureSuggestionsContainer() {
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.id = 'botSuggestions';
        suggestionsContainer.className = 'bot-suggestions';
        // Insert below messages, above input
        const parent = document.getElementById('botChat');
        parent.insertBefore(suggestionsContainer, parent.querySelector('.bot-input'));
    }
}

function renderBotSuggestions(suggestions) {
    ensureSuggestionsContainer();
    suggestionsContainer.innerHTML = '';
    suggestions.slice(0, 6).forEach(s => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = s;
        btn.addEventListener('click', () => {
            botInput.value = s;
            sendBotMessage();
        });
        suggestionsContainer.appendChild(btn);
    });
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

// VHS timestamp overlay
function formatVhsTimestamp(date) {
    const pad = (n) => String(n).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mi = pad(date.getMinutes());
    const ss = pad(date.getSeconds());
    return `${hh}:${mi}:${ss} ${dd}/${mm}/${yy}`;
}

function initVhsTimestamp() {
    const stamp = document.createElement('div');
    stamp.className = 'vhs-timestamp';
    const now = new Date();
    stamp.innerHTML = `<span class="rec-dot"></span>REC ${formatVhsTimestamp(now)}`;
    document.body.appendChild(stamp);
    setInterval(() => {
        const t = new Date();
        stamp.innerHTML = `<span class="rec-dot"></span>REC ${formatVhsTimestamp(t)}`;
    }, 1000);
}

// Subtle random jitter to mimic VHS tracking hiccups
function initVhsJitter() {
    setInterval(() => {
        if (Math.random() < 0.55) {
            document.body.classList.add('vhs-jitter');
            setTimeout(() => document.body.classList.remove('vhs-jitter'), 140);
        }
    }, 4500);
}

// Section transition overlay logic
let transitionOverlayEl = null;
function ensureTransitionOverlay() {
    if (!transitionOverlayEl) {
        transitionOverlayEl = document.createElement('div');
        transitionOverlayEl.className = 'transition-overlay';
        document.body.appendChild(transitionOverlayEl);
    }
}

function animateSectionTransition(onMidpoint) {
    ensureTransitionOverlay();
    transitionOverlayEl.classList.remove('active');
    // Force reflow to restart animation
    void transitionOverlayEl.offsetWidth;
    transitionOverlayEl.classList.add('active');
    // Execute action near the midpoint of the overlay animation
    setTimeout(() => {
        try { onMidpoint && onMidpoint(); } catch (_) {}
    }, 250);
    // Clear overlay after animation completes
    setTimeout(() => {
        transitionOverlayEl.classList.remove('active');
    }, 650);
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
    initVhsTimestamp();
    initVhsJitter();
    
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
        'latest-pic.jpg',
        'project1.png',
        'project2.png',
        'project3.png',
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
        animateSectionTransition(() => {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            closeMobileMenu();
        });
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
