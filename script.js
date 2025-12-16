// ====== COOKIE HELPERS (reemplazo de localStorage) ======
function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// ====== THEME SYSTEM (con cookies) ======
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
  setCookie(THEME_KEY, themeName); // ✅ Cookie en vez de localStorage
  syncLogo(themeName);
}

// Aplicar tema guardado al cargar
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

// ====== PARALLAX HERO (sutil) ======
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

// ====== AOS (Animate On Scroll) ======
(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('section').forEach(s => {
    if (!s.classList.contains('hero')) { // Hero sin AOS
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

// Aplicar idioma al cargar
(async () => {
  if (!window.BP_I18N) return;
  const lang = window.BP_I18N.getLang();
  await window.BP_I18N.setLang(lang);
  syncLangButtons(lang);
})();

// ====== HERO TYPING EFFECT (con cursor) ======
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

// ====== TERRITORIES SPLITFLAP ======
const citiesES = [
  "CIUDAD DE MÉXICO",
  "BARCELONA",
  "GUADALAJARA",
  "LISBOA",
  "MADRID",
  "MONTERREY",
  "PARÍS"
];

const citiesEN = [
  "MEXICO CITY",
  "BARCELONA",
  "GUADALAJARA",
  "LISBON",
  "MADRID",
  "MONTERREY",
  "PARIS"
];

const CITY_ALIASES_MOBILE_ES = {
  "CIUDAD DE MÉXICO": "CDMX",
  "GUADALAJARA": "GDL",
  "MONTERREY": "MTY",
  "BARCELONA": "BCN"
};

const CITY_ALIASES_MOBILE_EN = {
  "MEXICO CITY": "CDMX",
  "GUADALAJARA": "GDL",
  "MONTERREY": "MTY",
  "BARCELONA": "BCN"
};

const isMobileMQ = window.matchMedia("(max-width: 480px)");
const cityRow = document.getElementById('city-row');
let currentCityIndex = 0;

function getCurrentCities() {
  if (!window.BP_I18N) return citiesES;
  const lang = window.BP_I18N.getLang();
  return lang === 'en' ? citiesEN : citiesES;
}

function cityDisplayName(name) {
  if (!window.BP_I18N) return name;
  const lang = window.BP_I18N.getLang();
  const aliases = lang === 'en' ? CITY_ALIASES_MOBILE_EN : CITY_ALIASES_MOBILE_ES;
  return (isMobileMQ.matches && aliases[name]) ? aliases[name] : name;
}

const FLIP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function renderCityMechanical(name) {
  if (!cityRow) return;
  
  const existingCells = Array.from(cityRow.querySelectorAll('.cell'));
  existingCells.forEach((cell, i) => {
    setTimeout(() => {
      cell.classList.remove('ready');
      cell.classList.add('flip-out');
    }, i * 18);
  });

  const totalOutTime = existingCells.length * 18 + 180;

  setTimeout(() => {
    cityRow.innerHTML = '';
    let isStartOfWord = true;
    const chars = [...name];

    chars.forEach((char, i) => {
      const cell = document.createElement('div');
      
      if (char === ' ') {
        cell.className = 'cell separator ready';
        isStartOfWord = true;
      } else {
        cell.className = 'cell flip-in';
        cell.setAttribute('data-char', char);
        
        if (isStartOfWord) {
          cell.classList.add('highlight');
          isStartOfWord = false;
        }
        
        const divider = document.createElement('div');
        divider.className = 'cell-divider';
        cell.appendChild(divider);
        
        const shadow = document.createElement('div');
        shadow.className = 'cell-shadow';
        cell.appendChild(shadow);
      }

      cityRow.appendChild(cell);

      setTimeout(() => {
        if (char !== ' ') {
          const maxFlips = Math.floor(Math.random() * 5) + 3;
          let flipCount = 0;
          
          const flipInterval = setInterval(() => {
            if (flipCount < maxFlips) {
              const randomChar = FLIP_CHARS[Math.floor(Math.random() * FLIP_CHARS.length)];
              cell.setAttribute('data-char', randomChar);
              cell.classList.add('flipping');
              flipCount++;
            } else {
              cell.setAttribute('data-char', char);
              cell.classList.remove('flip-in', 'flipping');
              cell.classList.add('ready');
              clearInterval(flipInterval);
            }
          }, 50);
        } else {
          cell.classList.remove('flip-in');
          cell.classList.add('ready');
        }
      }, totalOutTime + (i * 18));
    });
  }, totalOutTime);
}

function nextCity() {
  const cities = getCurrentCities();
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * cities.length);
  } while (nextIndex === currentCityIndex);
  currentCityIndex = nextIndex;
  renderCityMechanical(cityDisplayName(cities[currentCityIndex]));
}

// Render inicial
if (cityRow) {
  renderCityMechanical(cityDisplayName(getCurrentCities()[currentCityIndex]));
  
  isMobileMQ.addEventListener("change", () => {
    renderCityMechanical(cityDisplayName(getCurrentCities()[currentCityIndex]));
  });
  
  window.addEventListener('languageChanged', () => {
    renderCityMechanical(cityDisplayName(getCurrentCities()[currentCityIndex]));
  });
  
  // ✅ 7 segundos (antes 3) - timing mejorado
  setInterval(nextCity, 7000);
}

// ====== MINI PLAYER (mejorado) ======
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
      setUI('READY'); // ✅ Volver a READY silenciosamente
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
    setUI('READY'); // ✅ No mostrar ERROR al usuario
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.title = 'Audio unavailable';
  });

  // LED easter egg: cycle theme
  const ORDER = ['orange', 'green', 'yellow'];
  led.addEventListener('click', () => {
    const cur = getCookie(THEME_KEY) || 'orange';
    const next = ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length];
    applyTheme(next);
  });
})();

// ====== LOGO EASTER EGG (triple click) ======
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
      // Matrix mode effect
      document.body.style.filter = 'hue-rotate(120deg) saturate(2)';
      setTimeout(() => {
        document.body.style.filter = '';
      }, 2000);
      logoClicks = 0;
    }
  });
})();
