document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.getElementById('main-content');
    const alwaysVisibleSections = mainContent.querySelectorAll(
        '#inicio, #historia, #opiniones-carrusel-home' 
    );
    const navControlledSections = mainContent.querySelectorAll(
        '#menu, #conocenos, #opiniones, #contacto, #reserva' 
    );

    navControlledSections.forEach(section => {
        section.classList.add('js-controlled-section');
    });

    // Función para mostrar una sección específica y manejar la visibilidad global
    function showSectionFromNav(targetId) {
        // 1. Ocultar todas las secciones controladas por el NAV
        navControlledSections.forEach(section => {
            section.classList.remove('active-section'); 
            section.classList.add('hidden-section'); 
        });

        // 2. Mostrar/Ocultar las secciones "always visible"
        if (targetId === '#inicio') {
            alwaysVisibleSections.forEach(section => {
                section.classList.remove('hidden-section');
            });
        } else {
            alwaysVisibleSections.forEach(section => {
                section.classList.add('hidden-section');
            });
        }

        // 3. Lógica para el targetId específico
        if (targetId === '#inicio') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            mainContent.style.height = 'auto'; 
            mainContent.style.position = 'static'; 
            
        } else {
            // Si el targetId es una sección controlada por el NAV, la mostramos.
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden-section');
                targetSection.classList.add('active-section');
                
                window.scrollTo({
                    top: 0, 
                    behavior: 'smooth'
                });

                mainContent.style.height = targetSection.offsetHeight + 'px'; 
                mainContent.style.position = 'relative'; 
            }
        }
    }

    // Función para activar el enlace del NAV
    function activateNavLink(targetId) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Añadir event listener a cada enlace de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            const targetId = link.getAttribute('href'); 
            showSectionFromNav(targetId); 
            activateNavLink(targetId);
        });
    });

    // Manejar el caso de carga inicial de la página
    const initialHash = window.location.hash;
    if (initialHash) {
        showSectionFromNav(initialHash);
        activateNavLink(initialHash);
    } else {
        // Initialize to the home section if no hash is present
        activateNavLink('#inicio');
        showSectionFromNav('#inicio');
    }


    // Para el botón "Ver Menú" en la sección de inicio
    const verMenuBtn = document.querySelector('.hero-section .btn-primary'); 
    if (verMenuBtn) {
        verMenuBtn.addEventListener('click', (event) => {
            event.preventDefault();
            showSectionFromNav('#menu'); 
            activateNavLink('#menu');
        });
    }


    // --- Lógica del Carrusel de Opiniones ---
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const cardWidth = testimonialCards[0].offsetWidth + 30;
        let currentIndex = 0;
        let autoplayInterval;

        // Clonar tarjetas para el efecto infinito
        testimonialCards.forEach(card => {
            const clone = card.cloneNode(true);
            carouselTrack.appendChild(clone);
        });

        const totalCards = carouselTrack.children.length;

        function moveCarousel() {
            currentIndex++;
            if (currentIndex >= testimonialCards.length) { 
                carouselTrack.style.transition = 'none';
                carouselTrack.style.transform = `translateX(0px)`;
                currentIndex = 0; 
                void carouselTrack.offsetWidth; 
                currentIndex = 1; // Mover a la primera copia después del salto
                carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            }
            carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }

        function startAutoplay() {
            autoplayInterval = setInterval(moveCarousel, 3000); // Cambia cada 3 segundos
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        // Iniciar el carrusel automáticamente
        startAutoplay();

        // Opcional: Pausar el carrusel al pasar el ratón
        carouselTrack.addEventListener('mouseenter', stopAutoplay);
        carouselTrack.addEventListener('mouseleave', startAutoplay);
    }
});