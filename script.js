document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================================
    // 1. CONTROL DEL CARRUSEL (1 TARJETA A LA VEZ + AUTO-PLAY)
    // =========================================================================
    const track = document.getElementById("carouselTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const cards = document.querySelectorAll(".carousel-card");
    const carouselContainer = document.querySelector(".carousel-container");

    let currentIndex = 0;
    let autoPlayInterval = null;
    const TIEMPO_CAMBIO = 4000; // 4 segundos

    function updateCarouselPosition() {
        if (!cards.length || !track) return;
        
        const cardWidth = cards[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function nextSlide() {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarouselPosition();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = cards.length - 1;
        }
        updateCarouselPosition();
    }

    function startAutoPlay() {
        if (!autoPlayInterval) {
            autoPlayInterval = setInterval(nextSlide, TIEMPO_CAMBIO);
        }
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    if (track && cards.length > 0) {
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                prevSlide();
                stopAutoPlay();
                startAutoPlay();
            });
        }

        if (carouselContainer) {
            carouselContainer.addEventListener("mouseenter", stopAutoPlay);
            carouselContainer.addEventListener("mouseleave", startAutoPlay);
        }

        window.addEventListener("resize", updateCarouselPosition);
        startAutoPlay();
    }


    // =========================================================================
    // 2. CONTROL DEL MENÚ RESPONSIVE
    // =========================================================================
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const dropdownToggle = document.getElementById("dropdownToggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdownContainer = document.getElementById("dropdownServicios");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("mobile-active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.className = navLinks.classList.contains("mobile-active") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
            }
        });
    }

    if (dropdownToggle && (dropdownMenu || dropdownContainer)) {
        dropdownToggle.addEventListener("click", (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                e.stopPropagation();
                if (dropdownMenu) dropdownMenu.classList.toggle("open");
                if (dropdownContainer) dropdownContainer.classList.toggle("open-toggle");
            }
        });
    }

    const allLinks = navLinks ? navLinks.querySelectorAll("a:not(.dropdown-toggle)") : [];
    allLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navLinks) navLinks.classList.remove("mobile-active");
            if (dropdownMenu) dropdownMenu.classList.remove("open");
            if (dropdownContainer) dropdownContainer.classList.remove("open-toggle");
            if (menuToggle) {
                const icon = menuToggle.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            }
        });
    });


    // =========================================================================
    // 3. GALERÍA Y LIGHTBOX MULTIMEDIA (IMÁGENES Y VÍDEOS)
    // =========================================================================
    const galleryGrid = document.getElementById('gallery-grid');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    const tabBtns = document.querySelectorAll('.gallery-tab-btn');
    const tabContents = document.querySelectorAll('.gallery-tab-content');

    let currentMode = 'imagenes'; // 'imagenes' o 'videos'
    let currentGalleryIndex = 0;
    const TOTAL_IMAGENES = 99;
    const CARPETA_IMG = 'img/Galeria';

    // 1. Control de Pestañas
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentMode = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetContent = document.getElementById(`tab-${currentMode}`);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // 2. Renderizar 99 imágenes dinámicamente
    if (galleryGrid) {
        for (let i = 1; i <= TOTAL_IMAGENES; i++) {
            const num = String(i).padStart(2, '0');
            const rutaImagen = `${CARPETA_IMG}/img${num}.jpg`;

            const item = document.createElement('div');
            item.classList.add('gallery-item');
            item.setAttribute('data-index', i - 1);

            item.innerHTML = `
                <img src="${rutaImagen}" alt="Galería El Edén" loading="lazy">
                <div class="gallery-overlay">
                    <div class="btn-plus-trigger">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </div>
            `;
            galleryGrid.appendChild(item);
        }
    }

    // 3. Abrir Lightbox según el medio seleccionado
    const openLightbox = (index) => {
        currentGalleryIndex = index;
        const currentTab = document.getElementById(`tab-${currentMode}`);
        if (!currentTab) return;
        
        const items = currentTab.querySelectorAll('.gallery-item');

        if (index < 0 || index >= items.length) return;

        const selectedItem = items[index];

        if (currentMode === 'imagenes') {
            if (lightboxVideo) {
                lightboxVideo.pause();
                lightboxVideo.style.display = 'none';
            }
            
            const imgPath = `${CARPETA_IMG}/img${String(index + 1).padStart(2, '0')}.jpg`;
            if (lightboxImg) {
                lightboxImg.src = imgPath;
                lightboxImg.style.display = 'block';
            }
        } else {
            if (lightboxImg) {
                lightboxImg.style.display = 'none';
                lightboxImg.src = '';
            }

            const videoPath = selectedItem.getAttribute('data-video');
            if (lightboxVideo) {
                lightboxVideo.src = videoPath;
                lightboxVideo.style.display = 'block';
                lightboxVideo.play();
            }
        }

        if (lightboxModal) {
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    // Listeners de clics para abrir imágenes y vídeos
    document.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;

        const currentTab = document.getElementById(`tab-${currentMode}`);
        if (!currentTab) return;

        const items = Array.from(currentTab.querySelectorAll('.gallery-item'));
        const index = items.indexOf(item);

        if (index !== -1) {
            openLightbox(index);
        }
    });

    // 4. Navegación (Siguiente / Anterior)
    const navigateLightbox = (direction) => {
        const currentTab = document.getElementById(`tab-${currentMode}`);
        if (!currentTab) return;

        const totalItems = currentTab.querySelectorAll('.gallery-item').length;

        if (direction === 'next') {
            currentGalleryIndex = (currentGalleryIndex + 1) % totalItems;
        } else {
            currentGalleryIndex = (currentGalleryIndex - 1 + totalItems) % totalItems;
        }
        openLightbox(currentGalleryIndex);
    };

    if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox('next'); });
    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox('prev'); });

    // 5. Cierre del Lightbox
    const closeLightbox = () => {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            if (lightboxVideo) {
                lightboxVideo.pause();
                lightboxVideo.src = '';
            }
            if (lightboxImg) lightboxImg.src = '';
            document.body.style.overflow = 'auto';
        }
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal || e.target.classList.contains('lightbox-media-container')) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (lightboxModal && lightboxModal.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') navigateLightbox('next');
            if (e.key === 'ArrowLeft') navigateLightbox('prev');
        }
    });

});