// Main JavaScript file for PMA SARL

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.axter-nav');

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    // Burger Menu Toggle
    const burgerMenu = document.getElementById('burgerMenu');
    const menuPanel = document.getElementById('menuPanel');
    const menuClose = document.getElementById('menuClose');

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
        menuPanel?.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuPanel?.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    burgerMenu?.addEventListener('click', openMenu);
    menuClose?.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuPanel?.classList.contains('active')) {
            closeMenu();
        }
    });

    // Active Link Highlighting
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.menu-link');

    menuLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Handle root path
        if (currentPath === '/' && linkPath === 'index.html') {
            link.classList.add('active');
        } else if (currentPath.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            offset: 100,
            once: true
        });
    }
});
