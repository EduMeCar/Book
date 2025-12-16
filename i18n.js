// ====== I18N SYSTEM (mock completo) ======

const translations = {
  es: {
    "hero.tag": "RED INTERNACIONAL DE BOOKING",
    "hero.sub": "Cinemática analógica. Escena underground. Tratos directos. Routing eficiente.",
    
    "territories.live_label": "TERRITORIES • NETWORK LIVE",
    
    "services.label": "SERVICIOS",
    "services.heading": "CÓMO TRABAJAMOS",
    "services.sub": "Tres líneas claras. Sin humo. Cada servicio tiene un camino directo al cuestionario.",
    "services.tab_artist": "ARTIST BOOKING",
    "services.tab_label": "LABEL SERVICES",
    "services.tab_venue": "VENUE PROGRAMMING",
    
    "services.artist.title": "Artist Booking",
    "services.artist.point1": "Tour booking internacional",
    "services.artist.point2": "Routing por red + datos",
    "services.artist.point3": "Deals directos y claros",
    "services.artist.cta": "SUBMIT ARTIST →",
    
    "services.label_service.title": "Label Services",
    "services.label_service.point1": "Paquetes por territorio",
    "services.label_service.point2": "Estrategia + timing",
    "services.label_service.point3": "Tour support multiciudad",
    "services.label_service.cta": "REQUEST PACKAGE →",
    
    "services.venue.title": "Venue Programming",
    "services.venue.point1": "Curaduría por escena",
    "services.venue.point2": "Matches rápidos",
    "services.venue.point3": "Fechas listas para ruta",
    "services.venue.cta": "SUBMIT DATES →",
    
    "book.section_label": "BOOKING INTAKE",
    "book.title": "BOOK A TOUR",
    "book.lead": "Cuestionario rápido para entender tu proyecto, ventanas de fechas y territorios. Sin burocracia: un paso y seguimos.",
    "book.cta_continue": "CONTINUE TO QUESTIONNAIRE",
    "book.cta_back_territories": "BACK TO TERRITORIES",
    
    "footer.services.title": "SERVICIOS",
    "footer.services.artist": "Artist Booking",
    "footer.services.label": "Label Services",
    "footer.services.venue": "Venue Programming",
    
    "footer.network.title": "RED",
    "footer.network.markets": "Mercados Activos",
    "footer.network.venues": "Venues Partner",
    "footer.network.territories": "Territorios",
    
    "footer.process.title": "PROCESO",
    "footer.process.intake": "Data Intake",
    "footer.process.routing": "Routing Build",
    "footer.process.deals": "Deal Structure",
    
    "footer.contact.title": "CONTACTO",
    "footer.contact.barcelona": "Barcelona HQ",
    "footer.contact.mexico": "Ciudad de México",
    
    "footer.copyright": "BOOKING PLANS © 2025 | DATA-DRIVEN BOOKING NETWORK",
    "footer.status": "SYSTEM STATUS: OPERATIONAL",
    
    // FORM (book-a-tour.html)
    "book.back": "← ATRÁS",
    "book.sub": "Intake en 2 pasos: primero contacto y contexto, después territorios, fechas y links.",
    "book.step1": "PASO 1",
    "book.step2": "PASO 2",
    
    "book.label_name": "Nombre / Proyecto *",
    "book.label_email": "Email *",
    "book.label_role": "Rol *",
    "book.role_select": "Seleccionar",
    "book.role_artist": "Artista",
    "book.role_manager": "Manager",
    "book.role_label": "Label",
    "book.role_venue": "Venue",
    
    "book.label_service": "Servicio (desde landing)",
    "book.service_not_specified": "No especificado",
    "book.service_artist": "Artist Booking",
    "book.service_label": "Label Services",
    "book.service_venue": "Venue Programming",
    
    "book.btn_continue": "CONTINUAR →",
    "book.btn_view_services": "VER SERVICIOS",
    
    "book.label_territories": "Territorios / Ciudades",
    "book.ph_territories": "Barcelona, Madrid, Lisboa...",
    "book.label_datewindow": "Ventana de fechas",
    "book.ph_datewindow": "Mar–Abr 2026",
    "book.label_links": "Links (EPK / Spotify / Press)",
    "book.ph_links": "https://...",
    "book.label_budget": "Rango de budget (opcional)",
    "book.ph_budget": "Opcional",
    "book.label_notes": "Notas",
    "book.ph_notes": "Restricciones de routing, tech rider, términos preferidos...",
    
    "book.btn_back": "← ATRÁS",
    "book.btn_submit": "ENVIAR",
    "book.note_required": "* Los campos requeridos están en Paso 1."
  },
  
  en: {
    "hero.tag": "INTERNATIONAL BOOKING NETWORK",
    "hero.sub": "Analog cinematic. Underground scene. Direct deals. Efficient routing.",
    
    "territories.live_label": "TERRITORIES • NETWORK LIVE",
    
    "services.label": "SERVICES",
    "services.heading": "HOW WE WORK",
    "services.sub": "Three clear lines. No smoke. Each service has a direct path to the questionnaire.",
    "services.tab_artist": "ARTIST BOOKING",
    "services.tab_label": "LABEL SERVICES",
    "services.tab_venue": "VENUE PROGRAMMING",
    
    "services.artist.title": "Artist Booking",
    "services.artist.point1": "International tour booking",
    "services.artist.point2": "Network + data routing",
    "services.artist.point3": "Direct and clear deals",
    "services.artist.cta": "SUBMIT ARTIST →",
    
    "services.label_service.title": "Label Services",
    "services.label_service.point1": "Territory packages",
    "services.label_service.point2": "Strategy + timing",
    "services.label_service.point3": "Multi-city tour support",
    "services.label_service.cta": "REQUEST PACKAGE →",
    
    "services.venue.title": "Venue Programming",
    "services.venue.point1": "Scene-based curation",
    "services.venue.point2": "Fast matches",
    "services.venue.point3": "Tour-ready dates",
    "services.venue.cta": "SUBMIT DATES →",
    
    "book.section_label": "BOOKING INTAKE",
    "book.title": "BOOK A TOUR",
    "book.lead": "Quick questionnaire to understand your project, date windows and territories. No bureaucracy: one step and we move forward.",
    "book.cta_continue": "CONTINUE TO QUESTIONNAIRE",
    "book.cta_back_territories": "BACK TO TERRITORIES",
    
    "footer.services.title": "SERVICES",
    "footer.services.artist": "Artist Booking",
    "footer.services.label": "Label Services",
    "footer.services.venue": "Venue Programming",
    
    "footer.network.title": "NETWORK",
    "footer.network.markets": "Active Markets",
    "footer.network.venues": "Partner Venues",
    "footer.network.territories": "Territories",
    
    "footer.process.title": "PROCESS",
    "footer.process.intake": "Data Intake",
    "footer.process.routing": "Routing Build",
    "footer.process.deals": "Deal Structure",
    
    "footer.contact.title": "CONTACT",
    "footer.contact.barcelona": "Barcelona HQ",
    "footer.contact.mexico": "Mexico City",
    
    "footer.copyright": "BOOKING PLANS © 2025 | DATA-DRIVEN BOOKING NETWORK",
    "footer.status": "SYSTEM STATUS: OPERATIONAL",
    
    // FORM
    "book.back": "← BACK",
    "book.sub": "2-step intake: first contact and context, then territories, dates and links.",
    "book.step1": "STEP 1",
    "book.step2": "STEP 2",
    
    "book.label_name": "Name / Project *",
    "book.label_email": "Email *",
    "book.label_role": "Role *",
    "book.role_select": "Select",
    "book.role_artist": "Artist",
    "book.role_manager": "Manager",
    "book.role_label": "Label",
    "book.role_venue": "Venue",
    
    "book.label_service": "Service (from landing)",
    "book.service_not_specified": "Not specified",
    "book.service_artist": "Artist Booking",
    "book.service_label": "Label Services",
    "book.service_venue": "Venue Programming",
    
    "book.btn_continue": "CONTINUE →",
    "book.btn_view_services": "VIEW SERVICES",
    
    "book.label_territories": "Territories / Cities",
    "book.ph_territories": "Barcelona, Madrid, Lisbon...",
    "book.label_datewindow": "Date window",
    "book.ph_datewindow": "Mar–Apr 2026",
    "book.label_links": "Links (EPK / Spotify / Press)",
    "book.ph_links": "https://...",
    "book.label_budget": "Budget range (optional)",
    "book.ph_budget": "Optional",
    "book.label_notes": "Notes",
    "book.ph_notes": "Routing constraints, tech rider notes, preferred deal terms...",
    
    "book.btn_back": "← BACK",
    "book.btn_submit": "SUBMIT",
    "book.note_required": "* Required fields are in Step 1."
  }
};

// Cookie helpers (mismos del script.js)
function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// API i18n
window.BP_I18N = {
  currentLang: 'es',
  
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
  
  async setLang(lang) {
    if (!translations[lang]) {
      console.error(`Language ${lang} not found`);
      return;
    }
    
    this.currentLang = lang;
    setCookie('bp_lang', lang);
    
    // Actualizar HTML lang
    document.documentElement.lang = lang;
    
    // Traducir todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    
    // Traducir placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });
  }
};

// Auto-inicializar
(() => {
  const lang = window.BP_I18N.getLang();
  window.BP_I18N.setLang(lang);
})();
