// Animation au scroll
document.addEventListener('DOMContentLoaded', function () {
    const faqSections = document.querySelectorAll('.faq-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, {
        threshold: 0.1
    });

    faqSections.forEach(section => {
        observer.observe(section);
    });

    // Highlight active FAQ nav item
    const faqNavItems = document.querySelectorAll('.faq-nav .list-group-item');
    const sections = document.querySelectorAll('.faq-section');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        faqNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});
