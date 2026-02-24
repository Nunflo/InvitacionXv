// PARALLAX FONDO
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    const bg = document.getElementById('parallaxBg');
    if (bg) {
        bg.style.transform = `translateY(${scroll * 0.5}px)`;
    }
});

// ABRIR INVITACIÓN
function abrirInvitacion() {
    const audio = document.getElementById('musica-fondo');
    if (audio) audio.play().catch(e => console.log("Audio en espera"));

    document.getElementById('pantalla-sobre').style.transform = 'translateY(-100%)';
    document.getElementById('contenido').classList.add('visible');
    
    ScrollReveal().reveal('.reveal', { 
        delay: 200, duration: 1000, distance: '20px', origin: 'bottom', interval: 100 
    });

    setTimeout(() => { document.getElementById('pantalla-sobre').style.display = 'none'; }, 1200);
}

// CUENTA REGRESIVA
const fechaEvento = new Date("Aug 15, 2026 18:00:00").getTime();
setInterval(() => {
    const ahora = new Date().getTime();
    const d = fechaEvento - ahora;
    if (d < 0) return;

    document.getElementById("dias").innerText = Math.floor(d / (1000 * 60 * 60 * 24));
    document.getElementById("horas").innerText = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("minutos").innerText = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("segundos").innerText = Math.floor((d % (1000 * 60)) / 1000);
}, 1000);

// PERSISTENCIA DE ID EN EL BOTÓN
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const btn = document.getElementById('btn-confirmar');
    if (id && btn) {
        btn.href = `confirmacion.html?id=${id}`;
    }
};