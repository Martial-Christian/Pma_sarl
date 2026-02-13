(function() {
    "use strict";
    
    // Configuration
    const slideTimeout = 5000;
    const transitionDuration = 800; // Augmenté pour plus de fluidité
    const easing = 'cubic-bezier(0.4, 0, 0.2, 1)'; // Courbe plus douce
    
    // Elements
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');
    const $slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slides-container'); // Nouvel élément conteneur
    let $dots;
    let intervalId;
    let currentSlide = 0;
    let isAnimating = false;
    let touchStartX = 0;
    let touchEndX = 0;

    // Initialize carousel
    function initCarousel() {
        // Création des dots
        const dotsContainer = document.querySelector('.carousel-dots');
        dotsContainer.innerHTML = '';
        
        $slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.dataset.slideId = index;
            dotsContainer.appendChild(dot);
        });

        $dots = document.querySelectorAll('.dot');
        updateDots();
        
        // Optimisation: Utiliser translate3d pour hardware acceleration
        slidesContainer.style.transformStyle = 'preserve-3d';
        $slides.forEach(slide => {
            slide.style.willChange = 'transform';
        });
    }

    // Animation fluide avec requestAnimationFrame
    function animateSlides() {
        isAnimating = true;
        slidesContainer.style.transition = `transform ${transitionDuration}ms ${easing}`;
        slidesContainer.style.transform = `translate3d(-${currentSlide * 100}%, 0, 0)`;
        
        // Gestion propre de la fin de l'animation
        const onTransitionEnd = () => {
            slidesContainer.removeEventListener('transitionend', onTransitionEnd);
            isAnimating = false;
        };
        slidesContainer.addEventListener('transitionend', onTransitionEnd, { once: true });
    }

    // Mise à jour des dots
    function updateDots() {
        $dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Navigation vers un slide spécifique
    function slideTo(index, instant = false) {
        if (isAnimating) return;
        
        // Gestion du débordement
        currentSlide = (index + $slides.length) % $slides.length;
        
        if (instant) {
            slidesContainer.style.transition = 'none';
            slidesContainer.style.transform = `translate3d(-${currentSlide * 100}%, 0, 0)`;
            // Force le recalcul des styles
            void slidesContainer.offsetWidth; // Trigger reflow
        }
        
        animateSlides();
        updateDots();
        resetInterval();
    }

    // Défilement automatique
    function startAutoPlay() {
        intervalId = setInterval(() => {
            if (document.hidden) return; // Pause si l'onglet est inactif
            slideTo(currentSlide + 1);
        }, slideTimeout);
    }

    // Gestion des événements
    function setupEventListeners() {
        // Navigation par dots
        $dots.forEach((dot, index) => {
            dot.addEventListener('click', () => slideTo(index));
        });

        // Boutons précédent/suivant
        prev.addEventListener('click', () => slideTo(currentSlide - 1));
        next.addEventListener('click', () => slideTo(currentSlide + 1));

        // Pause au survol
        slidesContainer.addEventListener('mouseenter', () => clearInterval(intervalId));
        slidesContainer.addEventListener('mouseleave', startAutoPlay);

        // Gestes tactiles
        slidesContainer.addEventListener('touchstart', (e) => {
            clearInterval(intervalId);
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        slidesContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
            startAutoPlay();
        }, { passive: true });

        // Navigation clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') slideTo(currentSlide - 1);
            if (e.key === 'ArrowRight') slideTo(currentSlide + 1);
        });

        // Optimisation: Pause quand l'onglet est inactif
        document.addEventListener('visibilitychange', () => {
            document.hidden ? clearInterval(intervalId) : startAutoPlay();
        });
    }

    // Gestion du swipe
    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) < 50) return; // Seuil minimal
        
        if (diff > 0) slideTo(currentSlide + 1); // Swipe gauche
        else slideTo(currentSlide - 1); // Swipe droit
    }

    // Initialisation
    initCarousel();
    setupEventListeners();
    startAutoPlay();

    // Redimensionnement
    window.addEventListener('resize', () => {
        slideTo(currentSlide, true); // Répositionnement instantané
    });

})();