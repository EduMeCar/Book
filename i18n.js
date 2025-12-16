// ====== I18N SYSTEM (carga archivos JSON externos) ======

// Cookie helpers
function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Objeto global i18n
window.BP_I18N = {
  currentLang: 'es',
  translations: {},
  
  // Obtener idioma preferido
  getLang() {
    // Prioridad: URL > cookie > browser > default
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && (urlLang === 'es' || urlLang === 'en')) {
      return urlLang;
    }
    
    const cookieLang = getCookie('bp_lang');
    if (cookieLang && (cookieLang === 'es' || cookieLang === 'en')) {
      return cookieLang;
    }
    
    const browserLang = navigator.language?.split('-')[0];
    if (browserLang === 'es' || browserLang === 'en') {
      return browserLang;
    }
    
    return 'es';
  },
  
  // Cargar archivo JSON de traducciones
  async loadTranslations(lang) {
    if (this.translations[lang]) {
      return this.translations[lang]; // Ya cargado
    }
    
    try {
      const response = await fetch(`i18n/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${lang}.json: ${response.status}`);
      }
      this.translations[lang] = await response.json();
      return this.translations[lang];
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
      
      // Fallback a español si falla
      if (lang !== 'es') {
        console.warn('Falling back to Spanish...');
        return this.loadTranslations('es');
      }
      
      return {}; // Fallback vacío
    }
  },
  
  // Aplicar traducciones al DOM
  async setLang(lang) {
    if (lang !== 'es' && lang !== 'en') {
      console.error(`Invalid language: ${lang}`);
      return;
    }
    
    // Cargar traducciones
    const translations = await this.loadTranslations(lang);
    
    this.currentLang = lang;
    setCookie('bp_lang', lang);
    
    // Actualizar HTML lang
    document.documentElement.lang = lang;
    
    // Traducir elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });
    
    // Traducir placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[key]) {
        el.placeholder = translations[key];
      }
    });
  }
};

// Auto-inicializar al cargar la página
(async () => {
  const lang = window.BP_I18N.getLang();
  await window.BP_I18N.setLang(lang);
})();
