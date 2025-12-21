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
      sub: "Booking internacional data-driven. Red verificada, deals transparentes, routing eficiente."
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

    modal: {
      submit: "ENVIAR",

      music: {
        title: "ENVIAR MÚSICA",
        artist: "Nombre del Artista *",
        genre: "Género *",
        email: "Email *",
        country: "País",
        links: "Links (Spotify, SoundCloud, Bandcamp)",
        message: "Mensaje"
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
    }
  },

  en: {
    hero: {
      tag: "INTERNATIONAL BOOKING SYSTEM",
      sub: "Data-driven international touring across verified venues. Transparent deals, efficient routing, proven results."
    },

    services: {
      label: "SERVICES",
      heading: "HOW WE WORK",
      sub: "Choose a service and submit your info. We respond with routing and proposal.",
      tab_artist: "ARTIST BOOKING",
      tab_label: "LABEL SERVICES",
      tab_venue: "VENUE PROGRAMMING",

      artist: {
        title: "ARTIST BOOKING",
        point1: "International dates",
        point2: "Artists and Managers",
        point3: "Data-driven routing via network",
        cta: "SUBMIT MUSIC →"
      },

      label_service: {
        title: "LABEL SERVICES",
        point1: "Goal-oriented investment",
        point2: "Labels and Distributors",
        point3: "Business designed with Network + Data",
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

    modal: {
      submit: "SUBMIT",

      music: {
        title: "SUBMIT MUSIC",
        artist: "Artist Name *",
        genre: "Genre *",
        email: "Email *",
        country: "Country",
        links: "Links (Spotify, SoundCloud, Bandcamp)",
        message: "Message"
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
