document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // 1. CONFIGURACIÓN Y PASES DEL CARRUSEL / MOSAICO
    // =========================================================================
    const track = document.getElementById("carouselTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const cards = document.querySelectorAll(".carousel-card");

    let index = 0;

    function updateCarouselPosition() {
        if (!cards.length || !track) return;
        
        // Obtener el ancho de una tarjeta dinámica para el cálculo exacto
        const cardWidth = cards[0].getBoundingClientRect().width;
        // Espacio (gap) configurado en el CSS
        const gap = 25; 
        
        // Desplazamiento matemático en el eje X
        track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
    }

    nextBtn.addEventListener("click", () => {
        // Cuántas tarjetas se ven en pantalla según el dispositivo
        const maxVisibleCards = window.innerWidth <= 650 ? 1 : (window.innerWidth <= 1024 ? 2 : 4);
        
        if (index < cards.length - maxVisibleCards) {
            index++;
        } else {
            index = 0; // Efecto bucle al llegar al final
        }
        updateCarouselPosition();
    });

    prevBtn.addEventListener("click", () => {
        const maxVisibleCards = window.innerWidth <= 650 ? 1 : (window.innerWidth <= 1024 ? 2 : 4);
        
        if (index > 0) {
            index--;
        } else {
            index = cards.length - maxVisibleCards; // Salta al final si está al principio
        }
        updateCarouselPosition();
    });

    // Reajustar posición si la ventana cambia de tamaño o rota la pantalla
    window.addEventListener("resize", updateCarouselPosition);


    // =========================================================================
    // 2. CONTROL DEL MENÚ RESPONSIVE Y SUBMENÚ (DROPDOWN)
    // =========================================================================
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const dropdownToggle = document.getElementById("dropdownToggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdownContainer = document.getElementById("dropdownServicios");

    // Abrir y Cerrar el Menú Lateral Principal (Hamburguesa)
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita interferencias con el clic del documento
            navLinks.classList.toggle("mobile-active");
            
            // Cambia el ícono visual de hamburguesa (☰) a equis (✕)
            const icon = menuToggle.querySelector("i");
            if (navLinks.classList.contains("mobile-active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });
    }

    // Control Seguro y Táctil del Dropdown de Servicios
    if (dropdownToggle && dropdownMenu && dropdownContainer) {
        dropdownToggle.addEventListener("click", (e) => {
            // Solo intercepta el comportamiento si estamos en resoluciones móviles/tabletas
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                e.stopPropagation(); // Detiene la propagación del evento táctil
                
                dropdownMenu.classList.toggle("open");
                dropdownContainer.classList.toggle("open-toggle");
            }
        });
    }

    // Cerrar el menú limpiamente al seleccionar una opción real (Balneario, Hotel, etc.)
    const allLinks = navLinks ? navLinks.querySelectorAll("a:not(.dropdown-toggle)") : [];
    allLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-active");
            if (dropdownMenu) dropdownMenu.classList.remove("open");
            if (dropdownContainer) dropdownContainer.classList.remove("open-toggle");
            
            // Restablece el ícono de hamburguesa
            if (menuToggle) menuToggle.querySelector("i").className = "fa-solid fa-bars";
        });
    });

    // Cerrar de forma inteligente si el usuario da un toque fuera del área del menú
    document.addEventListener("click", (e) => {
        if (navLinks && menuToggle) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove("mobile-active");
                if (dropdownMenu) dropdownMenu.classList.remove("open");
                if (dropdownContainer) dropdownContainer.classList.remove("open-toggle");
                menuToggle.querySelector("i").className = "fa-solid fa-bars";
            }
        }
    });
});

/* =========================================================================
   INTERACTIVIDAD TOTAL - CLUB CAMPESTRE EL EDÉN
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. CONTROL DEL MENÚ RESPONSIVO (HAMBURGUESA Y DROPDOWN)
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const dropdownToggle = document.getElementById("dropdownToggle");
    const dropdown = document.getElementById("dropdownServicios");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            // Cambia el icono de hamburguesa a una 'X' al abrir
            const icon = menuToggle.querySelector("i");
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-xmark");
        });
    }

    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener("click", (e) => {
            // Solo actúa en dispositivos móviles/táctiles
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                dropdown.classList.toggle("open");
            }
        });
    }


    // 2. CONTROL DEL CARRUSEL INTERACTIVO (HERO)
    const track = document.getElementById("carouselTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (track && prevBtn && nextBtn) {
        const cards = Array.from(track.children);
        let currentIndex = 0;

        const updateCarousel = (index) => {
            const cardWidth = cards[0].getBoundingClientRect().width + 20; // 20px es el gap/espacio
            track.style.transform = `translateX(-${index * cardWidth}px)`;
        };

        nextBtn.addEventListener("click", () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateCarousel(currentIndex);
            } else {
                currentIndex = 0; // Bucle: regresa al inicio
                updateCarousel(currentIndex);
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel(currentIndex);
            } else {
                currentIndex = cards.length - 1; // Bucle: va al final
                updateCarousel(currentIndex);
            }
        });

        // Adaptar el carrusel si el usuario estira o encoge la pantalla de la PC
        window.addEventListener("resize", () => updateCarousel(currentIndex));
    }


    // 3. FUNCIONALIDAD DEL LIGHTBOX (GALERÍA VISUAL) -> ¡AQUÍ ESTÁ LA CORRECCIÓN!
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightboxModal = document.getElementById("lightboxModal");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxClose = document.getElementById("lightboxClose");

    // Verificamos que la galería exista en el HTML antes de activar los clics
    if (galleryItems.length > 0 && lightboxModal) {
        
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                // Capturar la imagen de alta resolución y el texto descriptivo
                const fullSizeSrc = item.getAttribute("data-src");
                const imageAlt = item.querySelector("img").getAttribute("alt");

                // Inyectar los datos a la ventana emergente
                lightboxImg.src = fullSizeSrc;
                lightboxCaption.textContent = imageAlt;

                // Forzar el despliegue visual usando flexbox para centrar
                lightboxModal.style.setProperty("display", "flex", "important");
                document.body.style.overflow = "hidden"; // Bloquea el scroll de la página de fondo
            });
        });

        // Función reutilizable para cerrar la ventana
        const closeLightbox = () => {
            lightboxModal.style.display = "none";
            lightboxImg.src = ""; // Limpia el enlace para liberar memoria del navegador
            document.body.style.overflow = "auto"; // Devuelve el scroll normal
        };

        // Cerrar al dar clic en la 'X'
        if (lightboxClose) {
            lightboxClose.addEventListener("click", closeLightbox);
        }

        // Cerrar de forma intuitiva si el usuario hace clic en el fondo negro
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });

        // Soporte de accesibilidad: Cerrar si se presiona la tecla Escape (ESC)
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightboxModal.style.display === "flex") {
                closeLightbox();
            }
        });
    }

});