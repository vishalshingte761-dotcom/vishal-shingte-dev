// --- VISHAL SHINGTE PORTFOLIO - MAIN JS ---
document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle Logic
    const menuBtn = document.getElementById('menu-btn');
    const navLinksContainer = document.getElementById('nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');

            // Icon toggle: Bar to X
            const icon = menuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });
    }

    // Close menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });

    // 2. Smooth Scroll for Nav Links
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. Navbar Appearance on Scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            nav.style.background = 'white';
        } else {
            nav.style.boxShadow = 'none';
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // 4. Reveal Animation for Sections
    const observerOptions = { threshold: 0.15 };
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        sectionObserver.observe(section);
    });

    console.log("Vishal's Portfolio is Live & Responsive! 🚀");
});