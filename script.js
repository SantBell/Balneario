document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================================
    // 1. CONFIGURACIÓN Y CONTROL DEL CARRUSEL / MOSAICO (HERO)
    // =========================================================================
    const track = document.getElementById("carouselTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const cards = document.querySelectorAll(".carousel-card");

    let currentIndex = 0;

    function updateCarouselPosition() {
        if (!cards.length || !track) return;
        
        // Obtener el ancho de una tarjeta dinámica para el cálculo exacto
        const cardWidth = cards[0].getBoundingClientRect().width;
        // Espacio (gap) configurado en el CSS (ajusta a 20 o 25 según tu diseño)
        const gap = 25; 
        
        // Desplazamiento matemático en el eje X
        track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    }

    if (track && prevBtn && nextBtn && cards.length > 0) {
        nextBtn.addEventListener("click", () => {
            // Cuántas tarjetas se ven en pantalla según el dispositivo
            const maxVisibleCards = window.innerWidth <= 650 ? 1 : (window.innerWidth <= 1024 ? 2 : 4);
            
            if (currentIndex < cards.length - maxVisibleCards) {
                currentIndex++;
            } else {
                currentIndex = 0; // Efecto bucle al llegar al final (regresa al inicio)
            }
            updateCarouselPosition();
        });

        prevBtn.addEventListener("click", () => {
            const maxVisibleCards = window.innerWidth <= 650 ? 1 : (window.innerWidth <= 1024 ? 2 : 4);
            
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = cards.length - maxVisibleCards; // Salta al final si está al principio
            }
            updateCarouselPosition();
        });

        // Reajustar posición si la ventana cambia de tamaño o rota la pantalla
        window.addEventListener("resize", updateCarouselPosition);
    }


    // =========================================================================
    // 2. CONTROL DEL MENÚ RESPONSIVE Y SUBMENÚ (DROPDOWN) PARA CELULARES
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
            if (icon) {
                if (navLinks.classList.contains("mobile-active")) {
                    icon.className = "fa-solid fa-xmark";
                } else {
                    icon.className = "fa-solid fa-bars";
                }
            }
        });
    }

    // Control Seguro y Táctil del Dropdown de Servicios (Evita recarga en celulares)
    if (dropdownToggle && (dropdownMenu || dropdownContainer)) {
        dropdownToggle.addEventListener("click", (e) => {
            // Solo intercepta el comportamiento si estamos en resoluciones móviles/tabletas
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                e.stopPropagation(); // Detiene la propagación del evento táctil
                
                // Agrega compatibilidad para ambas clases del CSS que tenías mezcladas
                if (dropdownMenu) dropdownMenu.classList.toggle("open");
                if (dropdownContainer) dropdownContainer.classList.toggle("open-toggle");
            }
        });
    }

    // Cerrar el menú limpiamente al seleccionar una opción real (Balneario, Hotel, etc.)
    const allLinks = navLinks ? navLinks.querySelectorAll("a:not(.dropdown-toggle)") : [];
    allLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navLinks) navLinks.classList.remove("mobile-active");
            if (dropdownMenu) dropdownMenu.classList.remove("open");
            if (dropdownContainer) dropdownContainer.classList.remove("open-toggle");
            
            // Restablece el ícono de hamburguesa
            if (menuToggle) {
                const icon = menuToggle.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            }
        });
    });

    // Cerrar de forma inteligente si el usuario da un toque fuera del área del menú
    document.addEventListener("click", (e) => {
        if (navLinks && menuToggle) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove("mobile-active");
                if (dropdownMenu) dropdownMenu.classList.remove("open");
                if (dropdownContainer) dropdownContainer.classList.remove("open-toggle");
                
                const icon = menuToggle.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            }
        }
    });


    // =========================================================================
    // 3. FUNCIONALIDAD DEL LIGHTBOX (GALERÍA VISUAL)
    // =========================================================================
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
                const imgElement = item.querySelector("img");
                const imageAlt = imgElement ? imgElement.getAttribute("alt") : "";

                // Inyectar los datos a la ventana emergente
                if (lightboxImg) lightboxImg.src = fullSizeSrc;
                if (lightboxCaption) lightboxCaption.textContent = imageAlt;

                // Forzar el despliegue visual usando flexbox para centrar
                lightboxModal.style.setProperty("display", "flex", "important");
                document.body.style.overflow = "hidden"; // Bloquea el scroll de la página de fondo
            });
        });

        // Función reutilizable para cerrar la ventana
        const closeLightbox = () => {
            lightboxModal.style.display = "none";
            if (lightboxImg) lightboxImg.src = ""; // Limpia el enlace para liberar memoria del navegador
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