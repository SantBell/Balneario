document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú Móvil
    // Lógica para el Menú Móvil (Hamburguesa)
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-links'); // Usamos el selector de clase que tienes en tu HTML
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
            // Cambia el icono de barras a una X al abrir
            const icon = mobileMenu.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // SOLUCIÓN: Cerrar el menú al hacer clic en cualquier enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Solo actuamos si el menú está abierto (tiene la clase active)
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                
                // Restauramos el icono de hamburguesa
                const icon = mobileMenu.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // 2. Promociones Dinámicas
    const promos = {
        0: { title: "Domingo Familiar", val: "15%", top: "Desc. en comida", bottom: "Consumo mín. $500" },
        1: { title: "Lunes de Relax", val: "Spa", top: "Masaje gratis", bottom: "En entrada Plus" },
        2: { title: "Martes de Amigos", val: "3x2", top: "Entradas", bottom: "¡Vengan todos!" },
        3: { title: "Miércoles Kids", val: "Gratis", top: "Niños < 1.20m", bottom: "Con un adulto" },
        4: { title: "Jueves de Locura", val: "2x1", top: "Todo el día", bottom: "En taquilla" },
        5: { title: "Viernes Camping", val: "Kit", top: "Leña gratis", bottom: "Reservando zona" },
        6: { title: "Sábado de Fiesta", val: "Mix", top: "Bebida cortesía", bottom: "Antes 12 PM" }
    };

    const promoModal = document.getElementById('promo-modal');
    if (promoModal) {
        const today = new Date().getDay();
        const cur = promos[today];
        document.getElementById('promo-title').innerText = `🌞 ${cur.title} 🌞`;
        document.getElementById('promo-value').innerText = cur.val;
        document.getElementById('promo-text-top').innerText = cur.top;
        document.getElementById('promo-text-bottom').innerText = cur.bottom;

        setTimeout(() => { promoModal.style.display = 'flex'; }, 3000);
        document.getElementById('closePromo').onclick = () => promoModal.style.display = 'none';
    }

    // 3. Carrusel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000);
    }
});

// Función para abrir el Lightbox
function openLightbox(imageSrc, title) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    // Asignamos la imagen y el texto
    lightboxImg.src = imageSrc;
    lightboxCaption.textContent = title;

    // Mostramos el contenedor
    lightbox.style.display = 'flex';
    
    // Bloqueamos el scroll de la página principal mientras está abierto
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el Lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    
    // Devolvemos el scroll a la página
    document.body.style.overflow = 'auto';
}

// Cerrar al hacer clic fuera de la imagen
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target !== document.getElementById('lightbox-img')) {
        closeLightbox();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const selectorServicio = document.getElementById('servicio_interes');
    const campoEvento = document.getElementById('campo_tipo_evento');

    selectorServicio.addEventListener('change', function() {
        // Si la opción seleccionada incluye la palabra 'evento'
        if (this.value === 'solo_evento' || this.value === 'hotel_evento') {
            campoEvento.style.display = 'flex';
            // Opcional: añadir una pequeña animación de entrada
            campoEvento.style.animation = 'fadeIn 0.5s';
        } else {
            campoEvento.style.display = 'none';
        }
    });
});