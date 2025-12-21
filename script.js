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
  "MEDELLIN",
  "GUADALAJARA", 
  "PARIS",
  "MADRID",
  "BOGOTA",
  "BARCELONA",
  "LISBOA",
  "CIUDAD DE MEXICO"
];

const citiesMobile = [
  "MTY",
  "GDL",
  "BOGOTA",
  "PARIS", 
  "MADRID",
  "MDN",
  "BCN",
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

function animateCell(cell, targetChar, delay) {
  setTimeout(() => {
    cell.classList.add('flipping');

    const topChar = cell.querySelector('.cell-char-top');
    const bottomChar = cell.querySelector('.cell-char-bottom');
    
    const maxFlips = Math.floor(Math.random() * 4) + 5;
    let flipCount = 0;

    const flipInterval = setInterval(() => {
      if (flipCount < maxFlips) {
        const randomChar = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        topChar.textContent = randomChar;
        bottomChar.textContent = randomChar;
        flipCount++;
      } else {
        topChar.textContent = targetChar;
        bottomChar.textContent = targetChar;
        cell.classList.remove('flipping');
        clearInterval(flipInterval);
      }
    }, 120);

  }, delay);
}

function renderCity(cityName) {
  if (!cityRow || isFlipping) return;
  
  isFlipping = true;
  const chars = cityName.split('');
  
  cityRow.innerHTML = '';

  let charIndex = 0;
  chars.forEach((char, i) => {
    const isFirstOfWord = i === 0 || chars[i - 1] === ' ';
    const cell = createCell(char, charIndex, isFirstOfWord);
    cityRow.appendChild(cell);
    
    if (char !== ' ') {
      charIndex++;
    }
  });

  const allCells = Array.from(cityRow.querySelectorAll('.cell:not(.separator)'));
  allCells.forEach((cell, index) => {
    const targetChar = cell.dataset.targetChar;
    animateCell(cell, targetChar, index * 120);
  });

  const totalAnimTime = allCells.length * 120 + (8 * 120) + 500;
  setTimeout(() => {
    isFlipping = false;
  }, totalAnimTime);
}

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

if (cityRow) {
  renderCity(getCurrentCities()[currentCityIndex]);
  
  isMobileMQ.addEventListener("change", () => {
    if (!isFlipping) {
      renderCity(getCurrentCities()[currentCityIndex]);
    }
  });
  
  window.addEventListener('languageChanged', () => {
    if (!isFlipping) {
      renderCity(getCurrentCities()[currentCityIndex]);
    }
  });
  
  setInterval(nextCity, 4000);
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

// ===== BACK TO TOP VISIBILITY =====
(() => {
  const btn = document.querySelector('.top-float');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollThreshold = scrollHeight * 0.75;
    btn.classList.toggle('visible', window.scrollY > scrollThreshold);
  });
})();

// ===== UNIFIED MODAL SYSTEM =====
(() => {
  const modal = document.getElementById('modal-book-tour');
  const successModal = document.getElementById('modal-success');
  const form = document.getElementById('form-unified');
  const serviceTypeSelect = document.getElementById('service-type');
  const dynamicFields = document.getElementById('dynamic-fields');

  // Field templates por tipo de servicio
  const fieldTemplates = {
    artist: [
      { type: 'text', name: 'artist', label: 'modal.unified.artist_name', required: true, placeholder: '' },
      { type: 'text', name: 'genre', label: 'modal.unified.genre', required: true, placeholder: 'Electronic, Rock, Hip-Hop...' },
      { type: 'email', name: 'email', label: 'modal.unified.email', required: true, placeholder: '' },
      { type: 'text', name: 'country', label: 'modal.unified.country', required: false, placeholder: 'Spain, Mexico, USA...' },
      { type: 'url', name: 'links', label: 'modal.unified.links', required: false, placeholder: 'https://open.spotify.com/artist/...' },
      { type: 'textarea', name: 'message', label: 'modal.unified.message', required: false, placeholder: 'Tour dates, territories of interest, tech requirements...' }
    ],
    label: [
      { type: 'text', name: 'label', label: 'modal.unified.label_name', required: true, placeholder: '' },
      { type: 'text', name: 'contact', label: 'modal.unified.contact_name', required: true, placeholder: '' },
      { type: 'email', name: 'email', label: 'modal.unified.email', required: true, placeholder: '' },
      { type: 'text', name: 'roster', label: 'modal.unified.roster', required: false, placeholder: 'Artist 1, Artist 2, Artist 3...' },
      { type: 'text', name: 'territory', label: 'modal.unified.territory', required: false, placeholder: 'Europe, Latin America, USA...' },
      { type: 'textarea', name: 'message', label: 'modal.unified.message', required: false, placeholder: 'Business objectives, investment range, timeline...' }
    ],
    venue: [
      { type: 'text', name: 'venue', label: 'modal.unified.venue_name', required: true, placeholder: '' },
      { type: 'text', name: 'city', label: 'modal.unified.city', required: true, placeholder: '' },
      { type: 'number', name: 'capacity', label: 'modal.unified.capacity', required: true, placeholder: '500', min: '50', max: '10000' },
      { type: 'email', name: 'email', label: 'modal.unified.email', required: true, placeholder: '' },
      { type: 'text', name: 'available', label: 'modal.unified.available_dates', required: false, placeholder: 'March 15-20, April 10-15...' },
      { type: 'text', name: 'genre', label: 'modal.unified.genre_scene', required: false, placeholder: 'Electronic, Underground, Live bands...' },
      { type: 'textarea', name: 'message', label: 'modal.unified.message', required: false, placeholder: 'Technical requirements, production capabilities, previous bookings...' }
    ]
  };

  function getTranslation(key) {
    if (!window.BP_I18N) return key;
    const parts = key.split('.');
    let obj = window.BP_I18N.currentTranslations || {};
    for (const part of parts) {
      if (obj[part] !== undefined) {
        obj = obj[part];
      } else {
        return key;
      }
    }
    return typeof obj === 'string' ? obj : key;
  }

  function renderFields(serviceType) {
    if (!serviceType || !fieldTemplates[serviceType]) {
      dynamicFields.innerHTML = '';
      return;
    }

    const fields = fieldTemplates[serviceType];
    const html = fields.map(field => {
      const labelText = getTranslation(field.label);
      const requiredMark = field.required ? ' *' : '';
      
      if (field.type === 'textarea') {
        return `
          <div class="form-field">
            <label for="${field.name}" data-i18n="${field.label}">${labelText}${requiredMark}</label>
            <textarea 
              id="${field.name}" 
              name="${field.name}" 
              ${field.required ? 'required' : ''}
              rows="4"
              placeholder="${field.placeholder}"
            ></textarea>
          </div>
        `;
      }

      return `
        <div class="form-field">
          <label for="${field.name}" data-i18n="${field.label}">${labelText}${requiredMark}</label>
          <input 
            type="${field.type}" 
            id="${field.name}" 
            name="${field.name}" 
            ${field.required ? 'required' : ''}
            ${field.placeholder ? `placeholder="${field.placeholder}"` : ''}
            ${field.min ? `min="${field.min}"` : ''}
            ${field.max ? `max="${field.max}"` : ''}
          />
        </div>
      `;
    }).join('');

    dynamicFields.innerHTML = html;

    // Re-aplicar validaciones
    setupValidation();
  }

  function setupValidation() {
    dynamicFields.querySelectorAll('input[type="email"]').forEach(input => {
      input.addEventListener('blur', () => {
        if (input.value) {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (re.test(input.value)) {
            input.classList.add('valid');
            input.classList.remove('invalid');
          } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
          }
        } else {
          input.classList.remove('valid', 'invalid');
        }
      });
    });

    dynamicFields.querySelectorAll('input[type="url"]').forEach(input => {
      input.addEventListener('blur', () => {
        if (input.value) {
          try {
            new URL(input.value);
            input.classList.add('valid');
            input.classList.remove('invalid');
          } catch {
            input.classList.add('invalid');
            input.classList.remove('valid');
          }
        } else {
          input.classList.remove('valid', 'invalid');
        }
      });
    });

    dynamicFields.querySelectorAll('input[required]').forEach(input => {
      input.addEventListener('blur', () => {
        if (input.value.trim()) {
          input.classList.add('valid');
          input.classList.remove('invalid');
        } else {
          input.classList.remove('valid', 'invalid');
        }
      });
    });
  }

  serviceTypeSelect.addEventListener('change', (e) => {
    renderFields(e.target.value);
  });

  function openModal(preselectedType = null) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (preselectedType && fieldTemplates[preselectedType]) {
      serviceTypeSelect.value = preselectedType;
      renderFields(preselectedType);
    }

    setTimeout(() => {
      const firstInput = modal.querySelector('select, input:not([type="hidden"])');
      if (firstInput) firstInput.focus();
    }, 100);
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    form.reset();
    dynamicFields.innerHTML = '';
    form.querySelectorAll('.valid, .invalid').forEach(el => {
      el.classList.remove('valid', 'invalid');
    });
  }

  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  function generateRefID() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `#BP-2025-${timestamp}-${random}`;
  }

  function showSuccessAnimation(refID) {
    const progressDiv = successModal.querySelector('.success-progress');
    const completeDiv = successModal.querySelector('.success-complete');
    const bar = successModal.querySelector('#success-bar');
    const percent = successModal.querySelector('#success-percent');
    const refEl = successModal.querySelector('#success-ref');
    const closeBtn = successModal.querySelector('.modal-close');

    progressDiv.style.display = 'block';
    completeDiv.style.display = 'none';
    bar.style.width = '0%';
    closeBtn.style.display = 'none';

    successModal.classList.add('active');

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress > 100) progress = 100;

      bar.style.width = progress + '%';
      percent.textContent = Math.floor(progress) + '%';

      if (progress >= 100) {
        clearInterval(interval);
        
        setTimeout(() => {
          progressDiv.style.display = 'none';
          completeDiv.style.display = 'block';
          refEl.textContent = refID;
          closeBtn.style.display = 'flex';

          setTimeout(() => {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
          }, 5000);
        }, 500);
      }
    }, 150);
  }

  function submitForm(formData, serviceType) {
    const serviceNames = {
      artist: 'ARTIST BOOKING',
      label: 'LABEL SERVICES',
      venue: 'VENUE PROGRAMMING'
    };

    const subject = `[BOOKING PLANS] ${serviceNames[serviceType]} - ${formData.get('artist') || formData.get('label') || formData.get('venue')}`;
    
    let body = `SERVICE TYPE: ${serviceNames[serviceType]}\n\n`;
    for (let [key, value] of formData.entries()) {
      if (value && key !== 'service_type') {
        body += `${key.toUpperCase()}: ${value}\n`;
      }
    }
    body += `\n---\nSubmitted: ${new Date().toLocaleString()}`;

    const mailtoLink = `mailto:emc121091@me.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const refID = generateRefID();

    showSuccessAnimation(refID);

    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 1000);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const serviceType = formData.get('service_type');
    closeModal();
    submitForm(formData, serviceType);
  });

  // Exponer función global
  window.openBookingModal = openModal;

  // Detección de hash en URL
  window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash === 'book-tour') openModal();
    if (hash === 'artist') openModal('artist');
    if (hash === 'label') openModal('label');
    if (hash === 'venue') openModal('venue');
  });

  // Success modal close
  successModal.querySelector('.modal-close').addEventListener('click', () => {
    successModal.classList.remove('active');
    document.body.style.overflow = '';
  });
})();
