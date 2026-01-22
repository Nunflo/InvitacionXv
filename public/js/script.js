// PARALLAX FONDO HERO
window.addEventListener('scroll', function() {
    const scroll = window.pageYOffset;
    const bg = document.getElementById('parallaxBg');
    if (bg) {
        const zoom = 1 + (scroll * 0.00015);
        bg.style.transform = `translateY(${scroll * 0.85}px) scale(${zoom})`;
    }
});

// FUNCIÓN PARA ABRIR INVITACIÓN
function abrirInvitacion() {
    const audio = document.getElementById('musica-fondo');
    
    // Intento de reproducción de audio
    if (audio) {
        audio.play().catch(() => { 
            console.log("El navegador bloqueó el audio inicial. Se requiere interacción.");
        });
    }

    // Animación del sobre
    const sobre = document.getElementById('pantalla-sobre');
    sobre.style.transform = 'translateY(-100%)';
    
    // Mostrar contenido
    document.getElementById('contenido').classList.add('visible');
    
    // Iniciar efectos visuales
    iniciarPetalos();
    
    // Inicializar ScrollReveal
    ScrollReveal().reveal('.reveal', { 
        delay: 300, 
        duration: 1000, 
        distance: '40px', 
        origin: 'bottom', 
        interval: 200 
    });

    // Remover el sobre del DOM después de la animación
    setTimeout(() => { 
        sobre.style.display = 'none'; 
    }, 1500);
}

// EFECTO PÉTALOS
function iniciarPetalos() {
    const contenedor = document.getElementById('contenedor-petalos');
    if (!contenedor) return;

    for(let i=0; i<18; i++) {
        const p = document.createElement('div');
        p.className = 'petalo';
        p.style.setProperty('--left', Math.random() * 100 + '%');
        p.style.setProperty('--left-end', (Math.random() * 100 - 15) + '%');
        p.style.width = p.style.height = (Math.random() * 10 + 10) + 'px';
        p.style.animationDelay = (Math.random() * 7) + 's';
        contenedor.appendChild(p);
    }
}

// CUENTA REGRESIVA
const fechaEvento = new Date("Aug 15, 2026 18:00:00").getTime();

setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;
    
    if (distancia < 0) return;

    document.getElementById("dias").innerText = Math.floor(distancia / (1000 * 60 * 60 * 24));
    document.getElementById("horas").innerText = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("minutos").innerText = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("segundos").innerText = Math.floor((distancia % (1000 * 60)) / 1000);
}, 1000);

// SLIDER DE FOTOS
let sliderIndex = 0;
setInterval(() => {
    const slider = document.getElementById('slider');
    if(slider) {
        sliderIndex = (sliderIndex + 1) % 30; // Cambiar el 3 por el número de fotos que pongas
        slider.style.transform = `translateX(-${sliderIndex * 100}%)`;
    }
}, 3500);

// Ejemplo de cómo enviar los datos desde el navegador
const enviarFormulario = async (nombre, asistencia) => {
    const respuesta = await fetch('/api/invitados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, asistencia })
    });
    
    const resultado = await respuesta.json();
    alert(resultado.mensaje);
};

// Función para obtener el nombre de la URL
function obtenerNombreURL() {
    const params = new URLSearchParams(window.location.search);
    let nombreURL = params.get('n'); // Busca el parámetro "n"
    if (nombreURL) {
        // Reemplaza guiones bajos por espacios (ej: Juan_Perez -> Juan Perez)
        return nombreURL.replace(/_/g, ' ');
    }
    return null;
}

// Cuando cargue la página, personalizar el saludo
document.addEventListener('DOMContentLoaded', () => {
    const nombreInvitado = obtenerNombreURL();
    const saludoH3 = document.getElementById('saludo-personalizado');
    const inputNombre = document.getElementById('nombre');

    if (nombreInvitado) {
        if (saludoH3) saludoH3.innerText = `¡Hola ${nombreInvitado}!`;
        if (inputNombre) {
            inputNombre.value = nombreInvitado;
            inputNombre.readOnly = true; // El invitado no puede cambiar su nombre
        }
    }
});

