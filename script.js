// Hide header on scroll down, show on scroll up
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > window.innerHeight) {
        document.querySelector('header').classList.add('hidden');
    } else {
        document.querySelector('header').classList.remove('hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Toggle mobile menu
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
}

// Typing effect
const typed = new Typed('#typed-text', {
    strings: ['AI Graduate Student', 'Machine Learning Enthusiast'],
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
