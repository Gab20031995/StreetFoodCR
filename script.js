document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.getElementById('main-content');
    const alwaysVisibleSections = mainContent.querySelectorAll(
        '#inicio, #historia, #opiniones-carrusel-home'
    );
    const navControlledSections = mainContent.querySelectorAll(
        '#menu, #conocenos, #opiniones, #contacto, #reserva'
    );

    const contactForm = document.querySelector('.contact-section .contact-form');
    const reservationForm = document.querySelector('.reservation-section .reservation-form');
    const reviewForm = document.querySelector('.reviews-section .review-form');

    const contactMessageDiv = document.getElementById('contact-message');
    const reservationMessageDiv = document.getElementById('reservation-message');
    const reviewMessageDiv = document.getElementById('review-message');

    navControlledSections.forEach(section => {
        section.classList.add('js-controlled-section');
    });

    // Mostrar sección según navegación
    function showSectionFromNav(targetId) {
        navControlledSections.forEach(section => {
            section.classList.remove('active-section');
            section.classList.add('hidden-section');
        });

        if (targetId === '#inicio') {
            alwaysVisibleSections.forEach(section => {
                section.classList.remove('hidden-section');
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            mainContent.style.height = 'auto';
            mainContent.style.position = 'static';
        } else {
            alwaysVisibleSections.forEach(section => {
                section.classList.add('hidden-section');
            });

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden-section');
                targetSection.classList.add('active-section');

                window.scrollTo({ top: 0, behavior: 'smooth' });
                mainContent.style.height = targetSection.offsetHeight + 'px';
                mainContent.style.position = 'relative';
            }
        }
    }

    function activateNavLink(targetId) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function displayFormMessage(messageDiv, message, isSuccess = true) {
        if (!messageDiv) return;

        messageDiv.textContent = message;
        messageDiv.classList.remove('hidden');
        if (isSuccess) {
            messageDiv.classList.add('success');
            messageDiv.classList.remove('error');
        } else {
            messageDiv.classList.add('error');
            messageDiv.classList.remove('success');
        }
    }

    function displayVisualMessage(messageDiv, message) {
        if (!messageDiv) return;

        const messageTextElement = messageDiv.querySelector('.form-message-text');
        if (messageTextElement) {
            messageTextElement.textContent = message;
        }

        messageDiv.classList.remove('hidden');
        messageDiv.classList.add('success');

        setTimeout(() => {
            messageDiv.classList.add('hidden');
            messageDiv.classList.remove('success', 'error');
            messageDiv.textContent = '';
        }, 5000);
    }

    // Manejar envío formularios
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const msg = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
            displayFormMessage(contactMessageDiv, msg, true);
            displayVisualMessage(contactMessageDiv, msg);
            contactForm.reset();
        });
    }

    if (reservationForm) {
        reservationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const msg = '¡Reserva confirmada! Te esperamos en Street Food CR.';
            displayFormMessage(reservationMessageDiv, msg, true);
            displayVisualMessage(reservationMessageDiv, msg);
            reservationForm.reset();
        });
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const msg = '¡Gracias por tu opinión! Tu comentario ha sido enviado.';
            displayFormMessage(reviewMessageDiv, msg, true);
            displayVisualMessage(reviewMessageDiv, msg);
            reviewForm.reset();
        });
    }

    // Navegación principal
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            showSectionFromNav(targetId);
            activateNavLink(targetId);
        });
    });

    const initialHash = window.location.hash;
    if (initialHash) {
        showSectionFromNav(initialHash);
        activateNavLink(initialHash);
    } else {
        activateNavLink('#inicio');
        showSectionFromNav('#inicio');
    }

    // Botón "Ver Menú" desde la home
    const verMenuBtn = document.querySelector('.hero-section .btn-primary');
    if (verMenuBtn) {
        verMenuBtn.addEventListener('click', (event) => {
            event.preventDefault();
            showSectionFromNav('#menu');
            activateNavLink('#menu');
        });
    }

    // Carrusel de opiniones
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const cardWidth = testimonialCards[0].offsetWidth + 30;
        let currentIndex = 0;
        let autoplayInterval;

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
                currentIndex = 1;
                carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            }
            carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }

        function startAutoplay() {
            autoplayInterval = setInterval(moveCarousel, 3000);
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        startAutoplay();
        carouselTrack.addEventListener('mouseenter', stopAutoplay);
        carouselTrack.addEventListener('mouseleave', startAutoplay);
    }
});
