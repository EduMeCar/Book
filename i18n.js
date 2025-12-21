// ====== I18N SYSTEM (INLINE TRANSLATIONS) ======

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
      sub: "Giras internacionales para artistas, sellos y salas, diseñadas con datos reales y una red verificada en Europa y LatAm."
    },
    services: {
      label: "SERVICIOS",
      heading: "¿CÓMO TRABAJAMOS?",
      sub: "Elige un servicio y envía tu info. Respondemos en 3–5 días hábiles con propuesta de ruta y condiciones básicas.",
      tab_artist: "BOOKING DE ARTISTAS",
      tab_label: "SERVICIOS PARA INDUSTRIA",
      tab_venue: "PROGRAMACIÓN DE SALAS",
      artist: {
        title: "BOOKING DE ARTISTAS",
        point1: "Fechas internacionales",
        point2: "Artistas y Managers",
        point3: "Diseñamos rutas internacionales realistas según tus datos y la capacidad real de la red.",
        cta: "ENVIAR MÚSICA →"
      },
      label_service: {
        title: "SERVICIOS PARA INDUSTRIA",
        point1: "Inversión por objetivos",
        point2: "Sellos y Distribuidoras",
        point3: "Paquetes de booking para catálogos completos, con reporting accionable y transparencia total en deals.",
        cta: "SOLICITAR PAQUETE →"
      },
      venue: {
        title: "PROGRAMACIÓN DE SALAS",
        point1: "Curaduría por escena",
        point2: "Fechas listas para ruta: propuesta, hold y confirmación",
        point3: "Programación con artistas filtrados por datos, escena y capacidad real de tu venue.",
        cta: "ENVIAR FECHAS →"
      }
    },
    howItWorks: {
      heading: "CÓMO FUNCIONA",
      step1: "Envías datos básicos: música, territorios y ventanas de fechas.",
      step2: "Diseñamos una ruta viable según red, datos y contexto de tu proyecto.",
      step3: "Cerramos fechas y deals transparentes, con reporting claro."
    },
    modal: {
      submit: "ENVIAR",
      music: {
        title: "ENVIAR MÚSICA",
        artist: "Nombre del Artista *",
        genre: "Género *",
        email: "Email *",
        country: "País",
        links: "Links (Spotify, SoundCloud, Bandcamp)",
        message: "Mensaje",
        filter: "Trabajamos principalmente con proyectos con al menos 10k oyentes mensuales o trayectoria equivalente en vivo."
      },
      package: {
        title: "SOLICITAR PAQUETE",
        label: "Nombre del Sello *",
        contact: "Nombre de Contacto *",
        email: "Email *",
        roster: "Roster de Artistas",
        territory: "Territorio de Interés",
        message: "Mensaje"
      },
      dates: {
        title: "ENVIAR FECHAS",
        venue: "Nombre del Venue *",
        city: "Ciudad *",
        capacity: "Capacidad *",
        email: "Email *",
        available: "Fechas Disponibles",
        genre: "Género / Escena",
        message: "Mensaje"
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
      about_title: "QUIÉN ESTÁ DETRÁS",
      about_text: "Equipo con base en España, Colombia y México, con experiencia en booking en Europa y LatAm.",
      privacy: "Tus datos se usan solo para evaluar tu proyecto y responder a tu solicitud. No se comparten con terceros sin consentimiento.",
      copyright: "BOOKING PLANS © 2025 | DATA-DRIVEN BOOKING SYSTEM",
      status: "SYSTEM STATUS: OPERATIONAL"
    }
  },
  en: {
    hero: {
      tag: "INTERNATIONAL BOOKING SYSTEM",
      sub: "International tours for artists, labels, and venues, built on real data and a verified network across Europe and LatAm."
    },
    services: {
      label: "SERVICES",
      heading: "HOW WE WORK",
      sub: "Choose a service and submit your info. We respond within 3–5 business days with routing proposal and basic terms.",
      tab_artist: "ARTIST BOOKING",
      tab_label: "LABEL SERVICES",
      tab_venue: "VENUE PROGRAMMING",
      artist: {
        title: "ARTIST BOOKING",
        point1: "International dates",
        point2: "Artists and Managers",
        point3: "We design realistic international routes based on your data and the network's actual capacity.",
        cta: "SUBMIT MUSIC →"
      },
      label_service: {
        title: "LABEL SERVICES",
        point1: "Goal-oriented investment",
        point2: "Labels and Distributors",
        point3: "Booking packages for full catalogs, with actionable reporting and full transparency on deals.",
        cta: "REQUEST PACKAGE →"
      },
      venue: {
        title: "VENUE PROGRAMMING",
        point1: "Scene-based curation",
        point2: "Tour-ready dates: proposal, hold, confirmation",
        point3: "Programming with artists filtered by data, scene, and your venue's actual capacity.",
        cta: "SUBMIT DATES →"
      }
    },
    howItWorks: {
      heading: "HOW IT WORKS",
      step1: "You submit basic data: music, territories, and date windows.",
      step2: "We design a viable route based on network, data, and your project's context.",
      step3: "We close dates and transparent deals, with clear reporting."
    },
    modal: {
      submit: "SUBMIT",
      music: {
        title: "SUBMIT MUSIC",
        artist: "Artist Name *",
        genre: "Genre *",
        email: "Email *",
        country: "Country",
        links: "Links (Spotify, SoundCloud, Bandcamp)",
        message: "Message",
        filter: "We primarily work with projects with at least 10k monthly listeners or equivalent live track record."
      },
      package: {
        title: "REQUEST PACKAGE",
        label: "Label Name *",
        contact: "Contact Name *",
        email: "Email *",
        roster: "Artist Roster",
        territory: "Territory Focus",
        message: "Message"
      },
      dates: {
        title: "SUBMIT DATES",
        venue: "Venue Name *",
        city: "City *",
        capacity: "Capacity *",
        email: "Email *",
        available: "Available Dates",
        genre: "Genre / Scene Focus",
        message: "Message"
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
      about_title: "WHO WE ARE",
      about_text: "Team based in Spain, Colombia, and Mexico, with booking experience across Europe and LatAm.",
      privacy: "Your data is used only to evaluate your project and respond to your request. It is not shared with third parties without consent.",
      copyright: "BOOKING PLANS © 2025 | DATA-DRIVEN BOOKING SYSTEM",
      status: "SYSTEM STATUS: OPERATIONAL"
    }
  }
};

// ====== I18N CORE ======
window.BP_I18N = {
  currentLang: "es",
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
