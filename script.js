// ====== Accent theme (CSS var + localStorage) ======
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
      localStorage.setItem(THEME_KEY, themeName);
      syncLogo(themeName);
    }

    (() => {
      const saved = localStorage.getItem(THEME_KEY);
      const initial = (saved && THEMES[saved]) ? saved : "orange";
      applyTheme(initial);
    })();


    // ====== Language toggle (ES/EN) - i18n.js ======
    const langBtns = document.querySelectorAll('.lang-btn');

    function syncLangButtons(lang) {
      langBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    }

    langBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const lang = btn.dataset.lang;
        await window.BP_I18N.setLang(lang);
        syncLangButtons(lang);
        window.dispatchEvent(new Event('languageChanged')); 
      });
    });

    // Aplicar idioma al cargar (URL ?lang= o localStorage)
    (async () => {
      const lang = window.BP_I18N.getLang();
      await window.BP_I18N.setLang(lang);
      syncLangButtons(lang);
    })();


    // ====== Hero typing effect ======
    const typingText = document.getElementById('typing-text');
    const words = ['BOOKING', 'TOURING', 'NETWORK', 'ROUTING'];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
      const w = words[wordIndex];
      typingText.textContent = isDeleting ? w.substring(0, charIndex - 1) : w.substring(0, charIndex + 1);
      charIndex += isDeleting ? -1 : 1;

      if (!isDeleting && charIndex === w.length) {
        isDeleting = true; setTimeout(typeEffect, 1200); return;
      }
      if (isDeleting && charIndex === 0) {
        isDeleting = false; wordIndex = (wordIndex + 1) % words.length; setTimeout(typeEffect, 350); return;
      }
      setTimeout(typeEffect, isDeleting ? 55 : 90);
    }
    setTimeout(typeEffect, 800);


    // ====== Services tabs ======
    const tabs = Array.from(document.querySelectorAll('.tab'));
    const panels = Array.from(document.querySelectorAll('.tabpanel'));

    function activateTab(tab) {
      tabs.forEach(t => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
      panels.forEach(p => p.classList.toggle('active', p.id === tab.getAttribute('aria-controls')));
    }

    tabs.forEach(tab => tab.addEventListener('click', () => activateTab(tab)));

    // ====== Territories splitflap ======
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
    
    // Aliases móviles (ES)
    const CITY_ALIASES_MOBILE_ES = {
      "CIUDAD DE MÉXICO": "CDMX",
      "GUADALAJARA": "GDL",
      "MONTERREY": "MTY",
      "BARCELONA": "BCN"
    };
    
    // Aliases móviles (EN)
    const CITY_ALIASES_MOBILE_EN = {
      "MEXICO CITY": "CDMX",
      "GUADALAJARA": "GDL",
      "MONTERREY": "MTY",
      "BARCELONA": "BCN"
    };
    
    const isMobileMQ = window.matchMedia("(max-width: 480px)");
    const cityRow = document.getElementById('city-row');
    let currentCityIndex = 0;
    
    // Obtener lista de ciudades según idioma actual
    function getCurrentCities() {
      const lang = window.BP_I18N.getLang();
      return lang === 'en' ? citiesEN : citiesES;
    }
    
    // Obtener nombre para mostrar (con alias móvil si aplica)
    function cityDisplayName(name) {
      const lang = window.BP_I18N.getLang();
      const aliases = lang === 'en' ? CITY_ALIASES_MOBILE_EN : CITY_ALIASES_MOBILE_ES;
      return (isMobileMQ.matches && aliases[name]) ? aliases[name] : name;
    }
    
    const FLIP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    function renderCityMechanical(name) {
      if (!cityRow) return;
      
      // 1. Flip out
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
            
            // Añadir divider y shadow
            const divider = document.createElement('div');
            divider.className = 'cell-divider';
            cell.appendChild(divider);
            
            const shadow = document.createElement('div');
            shadow.className = 'cell-shadow';
            cell.appendChild(shadow);
          }
    
          cityRow.appendChild(cell);
    
          // Animación de flip con letras aleatorias
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
    renderCityMechanical(cityDisplayName(getCurrentCities()[currentCityIndex]));
    
    // Re-render al cambiar breakpoint móvil
    isMobileMQ.addEventListener("change", () => {
      renderCityMechanical(cityDisplayName(getCurrentCities()[currentCityIndex]));
    });
    
    // Re-render al cambiar idioma
    window.addEventListener('languageChanged', () => {
      renderCityMechanical(cityDisplayName(getCurrentCities()[currentCityIndex]));
    });
    
    setInterval(nextCity, 3000);
    

    // ====== Header mini player (no autoplay, loop, reset to 0) + LED theme cycle ======
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

        // Reset icon classes
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
        // Pause
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0; // regla: no recordar punto
          setUI('READY');
          return;
        }

        // Play (siempre desde 0)
        audio.currentTime = 0;
        setUI('LOADING');

        try {
          await audio.play(); // puede fallar por políticas de autoplay
          setUI('PLAYING');
        } catch (e) {
          console.error('Audio play failed:', e);
          setUI('ERROR');
        }
      });

      audio.addEventListener('pause', () => {
        if (status.textContent !== 'ERROR') setUI('READY');
      });
      audio.addEventListener('error', () => setUI('ERROR'));

      // LED easter egg: cycle theme (orange -> green -> yellow)
      const ORDER = ['orange', 'green', 'yellow'];
      led.addEventListener('click', () => {
        const cur = localStorage.getItem(THEME_KEY) || 'orange';
        const next = ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length];
        applyTheme(next); // sync con accent + logo
      });
    })();
