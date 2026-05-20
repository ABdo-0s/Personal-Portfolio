/* =================== Inject critical runtime styles  =================== */

const style = document.createElement('style');
style.textContent = `
    .fade-in { opacity: 1 !important; }
    .nav-menu ul li a.active,
    nav ul li a.active { color: var(--color-primary) !important; }
`;
document.head.appendChild(style);

/* =============== Burger Menu =============== */

const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');
const navLinks = document.querySelectorAll('.nav-menu ul li a, nav ul li a');

function closeNav() {
    burgerMenu.classList.remove('active');
    navMenu.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
}

if (burgerMenu && navMenu) {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('active');
    });

    navLinks.forEach(link => link.addEventListener('click', closeNav));

    if (navOverlay) {
        navOverlay.addEventListener('click', closeNav);
    }
}

/* ======================= Smooth scroll for anchor links ======================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ======================= Scroll to top ======================= */
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ======================= Scroll spy — active nav link ======================= */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-menu ul li a, nav ul li a');

/* ======================= Header background on scroll ======================= */
const header = document.querySelector('header');

/* ======================= Shared scroll handler (debounced) ======================= */
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const y = window.scrollY;

            if (y > 50) {
                header.style.background = 'rgba(13, 17, 23, 0.95)';
                header.style.boxShadow = '0px 0px 35px 1px rgba(0, 94, 148, 0.5)';
            } else {
                header.style.background = 'rgba(13, 17, 23, 0.85)';
                header.style.boxShadow = '0px 0px 25px 1px rgba(0, 94, 148, 0.312)';
            }

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (y >= sectionTop - 200 && y < sectionTop + sectionHeight - 100) {
                    current = section.getAttribute('id');
                }
            });

            allNavLinks.forEach(link => {
                link.classList.remove('active');
                if (
                    link.getAttribute('href') === '#' + current ||
                    link.getAttribute('href') === '#' + current.toLowerCase()
                ) {
                    link.classList.add('active');
                }
            });

            ticking = false;
        });

        ticking = true;
    }
});

/* ======================= IntersectionObserver — fade-in on scroll ======================= */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.style.transform = '';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(
    '.about-card, .skill-card, .card-1, .card-2, .info-card'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
