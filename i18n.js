// ====== I18N SYSTEM (FIXED - ALL TRANSLATIONS) ======

// Cookie helpers
function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

// helper: resolver "hero.tag" dentro de { hero: { tag: "..." } }
function getByPath(obj, path) {
  return path.split(".").reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), obj);
}

// ====== TRANSLATIONS ======
const translations = {
  es: {
    hero: {
      tag: "SISTEMA INTERNACIONAL DE BOOKING",
      sub: "Booking internacional data-driven. Red verificada, deals transparentes, routing eficiente."
    },
    territories: {
      label: "TERRITORIOS • RED ACTIVA"
    },
    about: {
      label: "EQUIPO",
      title: "QUIÉN ESTÁ DETRÁS",
      text: "Equipo internacional con presencia directa en Barcelona, Ciudad de México y Medellín. Experiencia verificada en booking transatlántico, gestión de catálogos y relaciones estratégicas con la industria en Europa y LatAm. Operamos con criterio profesional y red construida en más de 10 años de rutas reales."
    },
    how: {
      label: "PROCESO",
      title: "CÓMO FUNCIONA",
      step1: "Envías datos básicos: música, territorios y ventanas de fechas.",
      step2: "Diseñamos una ruta viable según red, datos y contexto de tu proyecto.",
      step3: "Cerramos fechas y deals transparentes, con reporting claro."
    },
    services: {
      label: "SERVICIOS",
      heading: "¿CÓMO TRABAJAMOS?",
      sub: "Elige un servicio y envía tu info. Respondemos con ruta y propuesta.",
      tab_artist: "BOOKING DE ARTISTAS",
      tab_label: "SERVICIOS PARA INDUSTRIA",
      tab_venue: "PROGRAMACIÓN DE SALAS",
      artist: {
        title: "BOOKING DE ARTISTAS",
        point1: "Fechas internacionales",
        point2: "Artistas y Managers",
        point3: "Ruta por red + datos",
        cta: "ENVIAR MÚSICA →"
      },
      label_service: {
        title: "SERVICIOS PARA INDUSTRIA",
        point1: "Inversión por objetivos",
        point2: "Sellos y Distribuidoras",
        point3: "Negocio diseñado con Red y Datos",
        cta: "SOLICITAR PAQUETE →"
      },
      venue: {
        title: "PROGRAMACIÓN DE SALAS",
        point1: "Curaduría por escena",
        point2: "Fechas listas para ruta: propuesta, hold y confirmación",
        point3: "Local e Internacional",
        cta: "ENVIAR FECHAS →"
      }
    },
    book: {
      label: "ENTRADA DE DATOS",
      title: "ARMA TU GIRA",
      text: "Cuestionario rápido para entender tu proyecto, ventanas de fechas y territorios. Sin burocracia: un paso y seguimos.",
      cta_main: "IR AL FORMULARIO",
      cta_back: "REGRESAR A SERVICIOS"
    },
    modal: {
      submit: "ENVIAR",
      privacy_banner: "🔒 Tus datos se usan solo para evaluar tu proyecto. No se comparten con terceros sin consentimiento.",
      unified: {
        title: "BOOK A TOUR",
        service_type: "¿Qué servicio necesitas?",
        opt_artist: "Booking de Artista",
        opt_label: "Servicios para Industria",
        opt_venue: "Programación de Sala",
        artist_name: "Nombre del Artista",
        genre: "Género",
        email: "Email",
        country: "País",
        links: "Links (Spotify, SoundCloud, Bandcamp)",
        message: "Mensaje",
        label_name: "Nombre del Sello",
        contact_name: "Nombre de Contacto",
        roster: "Roster de Artistas",
        territory: "Territorio de Interés",
        venue_name: "Nombre del Venue",
        city: "Ciudad",
        capacity: "Capacidad",
        available_dates: "Fechas Disponibles",
        genre_scene: "Género / Escena"
      }
    },
    footer: {
      services_title: "SERVICIOS",
      services_artist: "Booking de Artistas",
      services_label: "Servicio para Industria",
      services_venue: "Programación en Salas",
      network_title: "RED",
      network_routes: "Rutas Activas",
      network_venues: "Salas Verificadas",
      network_territories: "Territorios",
      process_title: "PROCESO",
      process_data: "Entrada de Datos",
      process_design: "Diseño de Negocio",
      process_execution: "Ejecución en Directo",
      contact_title: "CONTACTO",
      contact_barcelona: "Barcelona",
      contact_mexico: "Ciudad de México",
      privacy: "Tus datos se usan solo para evaluar tu proyecto. No se comparten con terceros sin consentimiento.",
      copyright: "BOOKING PLANS © 2025 | DATA-DRIVEN BOOKING SYSTEM",
      status: "SYSTEM STATUS: OPERATIONAL"
    }
  },
  en: {
    hero: {
      tag: "INTERNATIONAL BOOKING SYSTEM",
      sub: "Data-driven international booking. Verified network, transparent deals, efficient routing."
    },
    territories: {
      label: "TERRITORIES • ACTIVE NETWORK"
    },
    about: {
      label: "TEAM",
      title: "WHO WE ARE",
      text: "International team with direct presence in Barcelona, Mexico City, and Medellín. Verified experience in transatlantic booking, catalog management, and strategic relationships with the industry in Europe and LatAm. We operate with professional criteria and a network built over 10+ years of real touring."
    },
    how: {
      label: "PROCESS",
      title: "HOW IT WORKS",
      step1: "You submit basic data: music, territories, and date windows.",
      step2: "We design a viable route based on network, data, and your project's context.",
      step3: "We close dates and transparent deals, with clear reporting."
    },
    services: {
      label: "SERVICES",
      heading: "HOW WE WORK",
      sub: "Choose a service and submit your info. We respond with route and proposal.",
      tab_artist: "ARTIST BOOKING",
      tab_label: "LABEL SERVICES",
      tab_venue: "VENUE PROGRAMMING",
      artist: {
        title: "ARTIST BOOKING",
        point1: "International dates",
        point2: "Artists and Managers",
        point3: "Route by network + data",
        cta: "SUBMIT MUSIC →"
      },
      label_service: {
        title: "LABEL SERVICES",
        point1: "Goal-oriented investment",
        point2: "Labels and Distributors",
        point3: "Business designed with Network and Data",
        cta: "REQUEST PACKAGE →"
      },
      venue: {
        title: "VENUE PROGRAMMING",
        point1: "Scene-based curation",
        point2: "Tour-ready dates: proposal, hold, confirmation",
        point3: "Local and International",
        cta: "SUBMIT DATES →"
      }
    },
    book: {
      label: "DATA INTAKE",
      title: "BUILD YOUR TOUR",
      text: "Quick questionnaire to understand your project, date windows, and territories. No bureaucracy: one step and we move forward.",
      cta_main: "GO TO FORM",
      cta_back: "BACK TO SERVICES"
    },
    modal: {
      submit: "SUBMIT",
      privacy_banner: "🔒 Your data is used only to evaluate your project. Not shared with third parties without consent.",
      unified: {
        title: "BOOK A TOUR",
        service_type: "What service do you need?",
        opt_artist: "Artist Booking",
        opt_label: "Label Services",
        opt_venue: "Venue Programming",
        artist_name: "Artist Name",
        genre: "Genre",
        email: "Email",
        country: "Country",
        links: "Links (Spotify, SoundCloud, Bandcamp)",
        message: "Message",
        label_name: "Label Name",
        contact_name: "Contact Name",
        roster: "Artist Roster",
        territory: "Territory Focus",
        venue_name: "Venue Name",
        city: "City",
        capacity: "Capacity",
        available_dates: "Available Dates",
        genre_scene: "Genre / Scene Focus"
      }
    },
    footer: {
      services_title: "SERVICES",
      services_artist: "Artist Booking",
      services_label: "Label Services",
      services_venue: "Venue Programming",
      network_title: "NETWORK",
      network_routes: "Active Routes",
      network_venues: "Verified Venues",
      network_territories: "Territories",
      process_title: "PROCESS",
      process_data: "Data Intake",
      process_design: "Deal Design",
      process_execution: "Live Execution",
      contact_title: "CONTACT",
      contact_barcelona: "Barcelona",
      contact_mexico: "Mexico City",
      privacy: "Your data is used only to evaluate your project. Not shared with third parties without consent.",
      copyright: "BOOKING PLANS © 2025 | DATA-DRIVEN BOOKING SYSTEM",
      status: "SYSTEM STATUS: OPERATIONAL"
    }
  }
};

// ====== I18N CORE ======
window.BP_I18N = {
  currentLang: "es",
  currentTranslations: translations.es,
  getLang() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("lang");
    if (urlLang === "es" || urlLang === "en") return urlLang;
    const cookieLang = getCookie("bp_lang");
    if (cookieLang === "es" || cookieLang === "en") return cookieLang;
    const browserLang = navigator.language?.split("-")[0];
    if (browserLang === "es" || browserLang === "en") return browserLang;
    return "es";
  },
  setActiveButtons(lang) {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  },
  async setLang(lang) {
    if (!translations[lang]) lang = "es";
    this.currentLang = lang;
    this.currentTranslations = translations[lang];
    setCookie("bp_lang", lang);
    document.documentElement.lang = lang;

    const dict = translations[lang];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = getByPath(dict, key);
      if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const value = getByPath(dict, key);
      if (typeof value === "string") el.placeholder = value;
    });

    this.setActiveButtons(lang);
  }
};

// ====== INIT ======
document.addEventListener("DOMContentLoaded", async () => {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () =>
      window.BP_I18N.setLang(btn.dataset.lang)
    );
  });

  const lang = window.BP_I18N.getLang();
  await window.BP_I18N.setLang(lang);
});
