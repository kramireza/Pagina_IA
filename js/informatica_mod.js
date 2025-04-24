let currentIndex = 0;
const slides = document.querySelectorAll(".banner-slide");
const totalSlides = slides.length;
const bannerContainer = document.querySelector(".banner-container");
let autoSlideInterval;

// Función para actualizar el banner
function updateBanner() {
    const offset = currentIndex * bannerContainer.offsetWidth;
    bannerContainer.scrollTo({
        left: offset,
        behavior: "smooth"
    });
}

// Función para avanzar automáticamente
function autoSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateBanner();
}

// Inicia el cambio automático de diapositiva cada 3 segundos
function startAutoSlide() {
    autoSlideInterval = setInterval(autoSlide, 3000);
}

// Detiene el cambio automático
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Iniciar el slider al cargar la página
startAutoSlide();

// Detener y reiniciar el auto-slide al pasar el mouse
bannerContainer.addEventListener('mouseenter', stopAutoSlide);
bannerContainer.addEventListener('mouseleave', startAutoSlide);

// Toggle del menú móvil
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Activa/desactiva la clase para mostrar/ocultar
});

// Ajustar tamaño de las diapositivas al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    updateBanner(); // Asegura que la diapositiva actual se mantenga visible
});
