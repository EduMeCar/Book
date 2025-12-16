// ===== AUDIO PLAYER =====
const audio = document.getElementById('bp-audio');
const playBtn = document.getElementById('bp-pp');
const playIcon = document.getElementById('bp-pp-icon');
const statusEl = document.getElementById('bp-audio-status');
const led = document.getElementById('bp-led');

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        statusEl.textContent = 'PLAYING';
        led.style.animation = 'pulse 0.5s infinite';
    } else {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        statusEl.textContent = 'PAUSED';
        led.style.animation = 'none';
    }
});

// ===== THEME LED =====
const logo = document.getElementById('bp-logo');
let themeIndex = 0;
const themes = [
    { color: '#ff6b00', logo: 'assets/logo-orange.png' },
    { color: '#00ff88', logo: 'assets/logo-green.png' },
    { color: '#0088ff', logo: 'assets/logo-blue.png' }
];

led.addEventListener('click', () => {
    themeIndex = (themeIndex + 1) % themes.length;
    const theme = themes[themeIndex];
    
    led.style.background = theme.color;
    logo.src = theme.logo;
    
    // Cambiar variables CSS
    document.documentElement.style.setProperty('--orange', theme.color);
});

// ===== TYPING EFFECT =====
const typingText = document.getElementById('typing-text');
const words = ['BOOKING', 'ROUTING', 'DEALS', 'TOURING'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Iniciar typing effect después de 1 segundo
setTimeout(typeEffect, 1000);

// ===== SERVICES TABS =====
const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tabpanel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remover clase active de todos los tabs
        tabs.forEach(t => t.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        // Agregar clase active al tab clickeado
        tab.classList.add('active');
        
        // Mostrar el panel correspondiente
        const tabId = tab.getAttribute('data-tab');
        const panel = document.querySelector(`.tabpanel[data-tab="${tabId}"]`);
        if (panel) panel.classList.add('active');
    });
});

// ===== SPLITFLAP TERRITORIES =====
const cityRow = document.getElementById('city-row');
const cities = ['MEXICO CITY', 'BARCELONA', 'BERLIN', 'LONDON', 'TOKYO', 'NEW YORK'];
let currentCityIndex = 0;

function updateCityDisplay() {
    cityRow.textContent = cities[currentCityIndex];
    currentCityIndex = (currentCityIndex + 1) % cities.length;
}

// Actualizar cada 3 segundos
updateCityDisplay();
setInterval(updateCityDisplay, 3000);

// ===== LANGUAGE TOGGLE =====
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos
        langButtons.forEach(btn => btn.classList.remove('active'));
        
        // Agregar clase active al botón clickeado
        button.classList.add('active');
        
        // Aquí puedes agregar la lógica de cambio de idioma
        const lang = button.getAttribute('data-lang');
        console.log('Idioma cambiado a:', lang);
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
