// Toggle mobile menu
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
}

// Typing effect
const typed = new Typed('#typed-text', {
    strings: ['Actively Seeking Fulltime Roles Spring 2025','AI Graduate Student', 'Machine Learning', 'Deep Learning','MLOps','Computer Vision'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to skills
function animateSkills() {
    const skillItems = document.querySelectorAll('#skills li');
    skillItems.forEach((skill, index) => {
        setTimeout(() => {
            skill.style.opacity = '1';
            skill.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Call animateSkills when the skills section is in view
const skillsSection = document.querySelector('#skills');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateSkills();
    }
}, { threshold: 0.5 });

observer.observe(skillsSection);

// Paper preview functionality
const paperLinks = document.querySelectorAll('.paper-link');
const paperPreviews = document.querySelectorAll('.paper-preview');
let activePreview = null;
let timeoutId = null;

paperLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        const paperId = e.target.getAttribute('data-paper');
        const preview = document.getElementById(`paper-${paperId}`);
        
        clearTimeout(timeoutId);
        
        if (activePreview && activePreview !== preview) {
            activePreview.classList.remove('show');
        }
        
        preview.classList.add('show');
        activePreview = preview;
        
        // Add highlight class
        link.classList.add('highlight');
    });

    link.addEventListener('mouseleave', () => {
        // Remove highlight class when not hovering
        link.classList.remove('highlight');
    });
});

document.addEventListener('mousemove', (e) => {
    if (activePreview) {
        const rect = activePreview.getBoundingClientRect();
        const isOverPreview = e.clientX >= rect.left && e.clientX <= rect.right &&
                              e.clientY >= rect.top && e.clientY <= rect.bottom;
        
        if (!isOverPreview) {
            const isOverLink = Array.from(paperLinks).some(link => link.contains(e.target));
            
            if (!isOverLink) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    activePreview.classList.remove('show');
                    activePreview = null;
                }, 100); // Reduced from 300ms to 100ms
            }
        }
    }
});

paperPreviews.forEach(preview => {
    preview.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId);
        // Re-add highlight class to corresponding link
        const paperId = preview.id.split('-')[1];
        const link = document.querySelector(`.paper-link[data-paper="${paperId}"]`);
        link.classList.add('highlight');
    });
    
    preview.addEventListener('mouseleave', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            preview.classList.remove('show');
            activePreview = null;
            // Remove highlight class from corresponding link
            const paperId = preview.id.split('-')[1];
            const link = document.querySelector(`.paper-link[data-paper="${paperId}"]`);
            link.classList.remove('highlight');
        }, 100); // Reduced from 300ms to 100ms
    });
});

// Remove the existing paper preview animation code

// Make project titles clickable
document.querySelectorAll('.project-item h3[data-github]').forEach(title => {
    title.addEventListener('click', () => {
        window.open(title.dataset.github, '_blank');
    });
});

// Cursor glow effect
const cursorGlow = document.createElement('div');
cursorGlow.id = 'cursor-glow';
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
});

// Hover effect for clickable elements
const clickableElements = document.querySelectorAll('a, button, .project-item h3[data-github]');

clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '0.7';
    });

    element.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0.5';
    });
});