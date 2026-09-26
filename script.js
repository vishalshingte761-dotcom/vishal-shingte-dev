document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const nav = document.getElementById('navMenu');
    const menuBtn = document.getElementById('menuBtn');
    const themeToggle = document.getElementById('themeToggle');
    const scrollProgress = document.getElementById('scrollProgress');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    // Theme preference
    const savedTheme = localStorage.getItem('vishal-theme');
    if (savedTheme === 'dark') root.dataset.theme = 'dark';
    updateThemeIcon();

    themeToggle?.addEventListener('click', () => {
        root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('vishal-theme', root.dataset.theme);
        updateThemeIcon();
    });

    function updateThemeIcon() {
        const icon = themeToggle?.querySelector('i');
        if (!icon) return;
        const dark = root.dataset.theme === 'dark';
        icon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    // Mobile navigation
    menuBtn?.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('menu-open', open);
    });

    nav?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href?.startsWith('#')) return;
            const target = document.querySelector(href);
            if (!target) return;
            event.preventDefault();
            const offset = 84;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
            nav.classList.remove('open');
            menuBtn?.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        });
    });

    // Scroll progress
    const updateProgress = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // Reveal animations
    const revealNodes = document.querySelectorAll('.reveal');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
        revealNodes.forEach(node => node.classList.add('visible'));
    } else if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealNodes.forEach(node => revealObserver.observe(node));
    } else {
        revealNodes.forEach(node => node.classList.add('visible'));
    }

    // Image lightbox
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
    function openLightbox(src, caption) {
        lightboxImage.src = src;
        lightboxImage.alt = caption || 'Portfolio image';
        lightboxCaption.textContent = caption || '';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('menu-open');
        lightboxClose.focus();
    }
    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImage.src = '';
        document.body.classList.remove('menu-open');
    }
    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => openLightbox(trigger.dataset.lightbox, trigger.dataset.caption));
    });
    lightboxClose?.addEventListener('click', closeLightbox);
    document.querySelector('[data-close-lightbox]')?.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            if (lightbox.classList.contains('open')) closeLightbox();
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuBtn?.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
        }
    });

    console.log('Vishal Shingte portfolio — enhanced, responsive, and ready.');
});
