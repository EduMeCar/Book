// ====== COOKIE HELPERS ======
function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// ====== THEME SYSTEM ======
const THEME_KEY = "bp_theme";
const THEMES = {
  orange: { accent: "#ff3300", shadow: "rgba(255,51,0,0.25)" },
  green:  { accent: "#25D366", shadow: "rgba(37,211,102,0.22)" },
  yellow: { accent: "#FFD400", shadow: "rgba(255,212,0,0.22)" }
};

function syncLogo(themeName){
  const img = document.getElementById('bp-logo');
  if (!img) return;
  const safe = (themeName === 'green' || themeName === 'yellow' || themeName === 'orange') ? themeName : 'orange';
  img.src = `assets/logo-${safe}.png`;
}

function applyTheme(themeName) {
  const t = THEMES[themeName] || THEMES.orange;
  document.documentElement.style.setProperty("--accent", t.accent);
  document.documentElement.style.setProperty("--accent-shadow", t.shadow);
  setCookie(THEME_KEY, themeName);
  syncLogo(themeName);
}

(() => {
  const saved = getCookie(THEME_KEY);
  const initial = (saved && THEMES[saved]) ? saved : "orange";
  applyTheme(initial);
})();

// ====== SCROLL PROGRESS BAR ======
(() => {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (window.scrollY / h);
    progressBar.style.transform = `scaleX(${percent})`;
  });
})();

// ====== PARALLAX HERO ======
(() => {
  const heroVideo = document.querySelector('.hero-video video');
  if (!heroVideo) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroVideo.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
    }
  });
})();

// ====== AOS (ANIMATE ON SCROLL) ======
(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('section').forEach(s => {
    if (!s.classList.contains('hero')) {
      observer.observe(s);
    }
  });
})();

// ====== LANGUAGE TOGGLE ======
const langBtns = document.querySelectorAll('.lang-btn');

function syncLangButtons(lang) {
  langBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
}

langBtns.forEach(btn => {
  btn.addEventListener('click', async () => {
    const lang = btn.dataset.lang;
    if (window.BP_I18N) {
      await window.BP_I18N.setLang(lang);
      syncLangButtons(lang);
      window.dispatchEvent(new Event('languageChanged'));
    }
  });
});

(async () => {
  if (!window.BP_I18N) return;
  const lang = window.BP_I18N.getLang();
  await window.BP_I18N.setLang(lang);
  syncLangButtons(lang);
})();

// ====== HERO TYPING EFFECT ======
const typingText = document.getElementById('typing-text');
if (typingText) {
  const words = ['BOOKING', 'TOURING', 'NETWORK', 'ROUTING'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function typeEffect() {
    const w = words[wordIndex];
    typingText.textContent = isDeleting ? w.substring(0, charIndex - 1) : w.substring(0, charIndex + 1);
    charIndex += isDeleting ? -1 : 1;

    if (!isDeleting && charIndex === w.length) {
      isDeleting = true; 
      setTimeout(typeEffect, 1200); 
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false; 
      wordIndex = (wordIndex + 1) % words.length; 
      setTimeout(typeEffect, 350); 
      return;
    }
    setTimeout(typeEffect, isDeleting ? 55 : 90);
  }
  setTimeout(typeEffect, 800);
}

// ====== SERVICES TABS ======
const tabs = Array.from(document.querySelectorAll('.tab'));
const panels = Array.from(document.querySelectorAll('.tabpanel'));

function activateTab(tab) {
  tabs.forEach(t => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
  panels.forEach(p => p.classList.toggle('active', p.id === tab.getAttribute('aria-controls')));
}

tabs.forEach(tab => tab.addEventListener('click', () => activateTab(tab)));

// ====== SPLIT-FLAP RETRO (LENTO Y REALISTA) ======
const citiesDesktop = [
  "MONTERREY",
  "GUADALAJARA", 
  "PARIS",
  "MADRID",
  "BARCELONA",
  "LISBOA",
  "CIUDAD DE MEXICO"
];

const citiesMobile = [
  "MONTERREY",
  "GDL",
  "PARIS", 
  "MADRID",
  "BARCELONA",
  "LISBOA",
  "CDMX"
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
const isMobileMQ = window.matchMedia("(max-width: 480px)");
const cityRow = document.getElementById('city-row');
let currentCityIndex = 0;
let isFlipping = false;

function getCurrentCities() {
  return isMobileMQ.matches ? citiesMobile : citiesDesktop;
}

// Crear estructura HTML de una celda
function createCell(char, index, isFirstOfWord) {
  const cell = document.createElement('div');
  
  if (char === ' ') {
    cell.className = 'cell separator';
    return cell;
  }

  cell.className = 'cell';
  if (isFirstOfWord) {
    cell.classList.add('highlight');
  }
  cell.dataset.index = index;
  cell.dataset.targetChar = char;

  cell.innerHTML = `
    <div class="cell-top">
      <div class="cell-char-top">${char}</div>
    </div>
    <div class="cell-divider"></div>
    <div class="cell-shadow"></div>
    <div class="cell-bottom">
      <div class="cell-char-bottom">${char}</div>
    </div>
  `;

  return cell;
}

// Animar UNA celda con flip lento
function animateCell(cell, targetChar, delay) {
  setTimeout(() => {
    cell.classList.add('flipping');

    const topChar = cell.querySelector('.cell-char-top');
    const bottomChar = cell.querySelector('.cell-char-bottom');
    
    // ✅ 5-8 flips aleatorios (antes 3-5)
    const maxFlips = Math.floor(Math.random() * 4) + 5;
    let flipCount = 0;

    const flipInterval = setInterval(() => {
      if (flipCount < maxFlips) {
        // Mostrar carácter aleatorio
        const randomChar = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        topChar.textContent = randomChar;
        bottomChar.textContent = randomChar;
        flipCount++;
      } else {
        // Mostrar carácter final
        topChar.textContent = targetChar;
        bottomChar.textContent = targetChar;
        cell.classList.remove('flipping');
        clearInterval(flipInterval);
      }
    }, 120); // ✅ 120ms entre flips (antes 50ms) - MUCHO MÁS LENTO

  }, delay);
}

// Renderizar ciudad completa
function renderCity(cityName) {
  if (!cityRow || isFlipping) return;
  
  isFlipping = true;
  const chars = cityName.split('');
  
  // Limpiar contenedor
  cityRow.innerHTML = '';

  // Crear todas las celdas
  let charIndex = 0;
  chars.forEach((char, i) => {
    const isFirstOfWord = i === 0 || chars[i - 1] === ' ';
    const cell = createCell(char, charIndex, isFirstOfWord);
    cityRow.appendChild(cell);
    
    // Solo incrementar index si NO es espacio
    if (char !== ' ') {
      charIndex++;
    }
  });

  // Animar todas las celdas con delay escalonado
  const allCells = Array.from(cityRow.querySelectorAll('.cell:not(.separator)'));
  allCells.forEach((cell, index) => {
    const targetChar = cell.dataset.targetChar;
    // ✅ 120ms delay entre letras (antes 40ms) - MUCHO MÁS LENTO
    animateCell(cell, targetChar, index * 120);
  });

  // Desbloquear después de que termine la animación
  const totalAnimTime = allCells.length * 120 + (8 * 120) + 500;
  setTimeout(() => {
    isFlipping = false;
  }, totalAnimTime);
}

// Cambiar a siguiente ciudad random
function nextCity() {
  if (isFlipping) return;
  
  const cities = getCurrentCities();
  let nextIndex;
  
  do {
    nextIndex = Math.floor(Math.random() * cities.length);
  } while (nextIndex === currentCityIndex);
  
  currentCityIndex = nextIndex;
  renderCity(cities[currentCityIndex]);
}

// Inicializar
if (cityRow) {
  renderCity(getCurrentCities()[currentCityIndex]);
  
  // Re-render si cambia el breakpoint móvil
  isMobileMQ.addEventListener("change", () => {
    if (!isFlipping) {
      renderCity(getCurrentCities()[currentCityIndex]);
    }
  });
  
  // Re-render al cambiar idioma
  window.addEventListener('languageChanged', () => {
    if (!isFlipping) {
      renderCity(getCurrentCities()[currentCityIndex]);
    }
  });
  
  // ✅ Cambiar cada 5 segundos (antes 3) para disfrutar la animación
  setInterval(nextCity, 5000);
}

// ====== MINI PLAYER ======
(() => {
  const audio = document.getElementById('bp-audio');
  const btn = document.getElementById('bp-pp');
  const icon = document.getElementById('bp-pp-icon');
  const status = document.getElementById('bp-audio-status');
  const wrap = document.getElementById('bp-player');
  const led = document.getElementById('bp-led');

  if (!audio || !btn || !icon || !status || !wrap || !led) return;

  const setUI = (s) => {
    status.textContent = s;

    const isPlaying = (s === 'PLAYING');
    const isLoading = (s === 'LOADING');

    icon.className = 'fa-solid';

    if (isLoading) {
      icon.classList.add('fa-circle-notch', 'fa-spin');
    } else if (isPlaying) {
      icon.classList.add('fa-pause');
    } else {
      icon.classList.add('fa-play');
    }

    wrap.classList.toggle('is-playing', isPlaying);
  };

  setUI('READY');

  btn.addEventListener('click', async () => {
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      setUI('READY');
      return;
    }

    audio.currentTime = 0;
    setUI('LOADING');

    try {
      await audio.play();
      setUI('PLAYING');
    } catch (e) {
      console.error('Audio play failed:', e);
      setUI('READY');
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.title = 'Audio unavailable';
    }
  });

  audio.addEventListener('pause', () => {
    if (status.textContent !== 'ERROR') setUI('READY');
  });
  
  audio.addEventListener('error', (e) => {
    console.error('Audio error:', e);
    setUI('READY');
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.title = 'Audio unavailable';
  });

  // LED: cycle theme
  const ORDER = ['orange', 'green', 'yellow'];
  led.addEventListener('click', () => {
    const cur = getCookie(THEME_KEY) || 'orange';
    const next = ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length];
    applyTheme(next);
  });
})();

// ====== LOGO EASTER EGG ======
(() => {
  const logo = document.querySelector('.logo');
  if (!logo) return;

  let logoClicks = 0;
  let resetTimer;

  logo.addEventListener('click', (e) => {
    e.preventDefault();
    logoClicks++;

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => logoClicks = 0, 1000);

    if (logoClicks === 3) {
      document.body.style.filter = 'hue-rotate(120deg) saturate(2)';
      setTimeout(() => {
        document.body.style.filter = '';
      }, 2000);
      logoClicks = 0;
    }
  });
})();
