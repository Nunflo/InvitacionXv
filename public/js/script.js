/**
 * PROYECTO: XV Nancy Paola
 * ARCHIVO: script.js
 * DESCRIPCIÓN: Gestión de efectos visuales, cuenta regresiva y personalización.
 */

// --- 1. PARALLAX FONDO HERO ---
// Controla el movimiento sutil del fondo al hacer scroll
window.addEventListener('scroll', function() {
    const scroll = window.pageYOffset;
    const bg = document.getElementById('parallaxBg');
    if (bg) {
        // Efecto de zoom y desplazamiento vertical
        const zoom = 1.1 + (scroll * 0.00015);
        bg.style.transform = `translateY(${scroll * 0.5}px) scale(${zoom})`;
    }
});

// --- 2. GESTIÓN DEL SOBRE Y APERTURA ---
// Se activa al hacer clic en el botón "Abrir"
function abrirInvitacion() {
    const audio = document.getElementById('musica-fondo');
    
    // Intento de reproducción de audio (requiere interacción previa del usuario)
    if (audio) {
        audio.play().catch(() => {
            console.log("El audio requiere interacción manual en algunos navegadores.");
        });
    }

    // Animación de salida del sobre
    const sobre = document.getElementById('pantalla-sobre');
    if (sobre) {
        sobre.style.transform = 'translateY(-100%)';
        // Eliminamos del flujo para evitar clics fantasma
        setTimeout(() => { 
            sobre.style.display = 'none'; 
        }, 1500);
    }
    
    // Mostrar el contenido principal
    const contenido = document.getElementById('contenido');
    if (contenido) {
        contenido.classList.add('visible');
    }
    
    // Iniciar lluvia de pétalos
    iniciarPetalos();
    
    // Inicializar ScrollReveal para las apariciones suaves
    if (window.ScrollReveal) {
        ScrollReveal().reveal('.reveal', { 
            delay: 300, 
            duration: 1000, 
            distance: '40px', 
            origin: 'bottom', 
            interval: 200 
        });
    }
}

// --- 3. EFECTO PÉTALOS ---
// Crea elementos div dinámicos para simular pétalos cayendo
function iniciarPetalos() {
    const contenedor = document.getElementById('contenedor-petalos');
    if (!contenedor) return;

    for(let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'petalo';
        // Posiciones aleatorias usando variables CSS
        p.style.setProperty('--left', Math.random() * 100 + '%');
        p.style.setProperty('--left-end', (Math.random() * 100 - 15) + '%');
        p.style.width = p.style.height = (Math.random() * 10 + 10) + 'px';
        p.style.animationDelay = (Math.random() * 7) + 's';
        contenedor.appendChild(p);
    }
}

// --- 4. CUENTA REGRESIVA ---
// Actualiza los números del contador cada segundo
const fechaEvento = new Date("Aug 15, 2026 18:00:00").getTime();

setInterval(function() {
    const ahora = new Date().getTime();
    const d = fechaEvento - ahora;
    
    if (d < 0) return;

    // Cálculos matemáticos para tiempo
    const dias = Math.floor(d / (1000 * 60 * 60 * 24));
    const horas = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((d % (1000 * 60)) / 1000);

    // Asignación al DOM
    if(document.getElementById("dias")) document.getElementById("dias").innerText = dias;
    if(document.getElementById("horas")) document.getElementById("horas").innerText = horas;
    if(document.getElementById("minutos")) document.getElementById("minutos").innerText = minutos;
    if(document.getElementById("segundos")) document.getElementById("segundos").innerText = segundos;
}, 1000);

// --- 5. SLIDER DE FOTOS AUTOMÁTICO ---
// Desplaza el carrusel de 30 fotos cada 3.5 segundos
let sliderIndex = 0;
setInterval(() => {
    const slider = document.getElementById('slider');
    if(slider) {
        sliderIndex = (sliderIndex + 1) % 30; // Vuelve a 0 al llegar a la foto 30
        slider.style.transform = `translateX(-${sliderIndex * 100}%)`;
    }
}, 3500);

// --- 6. GESTIÓN DE INVITADOS (URL PARAMS) ---
// Captura el ID o Nombre de la URL para personalizar la experiencia
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Caso 1: ID para botón de confirmación
    const guestId = urlParams.get('id');
    const btnConfirmar = document.getElementById('btn-confirmar');
    if (guestId && btnConfirmar) {
        btnConfirmar.href = `confirmacion.html?id=${guestId}`;
    }

    // Caso 2: Nombre para saludo personalizado (parámetro 'n')
    const nombreURL = urlParams.get('n');
    if (nombreURL) {
        const nombreLimpio = nombreURL.replace(/_/g, ' ');
        const saludoH3 = document.getElementById('saludo-personalizado');
        const inputNombre = document.getElementById('nombre');

        if (saludoH3) saludoH3.innerText = `¡Hola ${nombreLimpio}!`;
        if (inputNombre) {
            inputNombre.value = nombreLimpio;
            inputNombre.readOnly = true;
        }
    }
});