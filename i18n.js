// ====== I18N SYSTEM (carga archivos JSON externos) ======

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

window.BP_I18N = {
  currentLang: "es",
  translations: {},

  getLang() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("lang");
    if (urlLang === "es" || urlLang === "en") return urlLang; // URLSearchParams.get() [web:21]

    const cookieLang = getCookie("bp_lang");
    if (cookieLang === "es" || cookieLang === "en") return cookieLang;

    const browserLang = navigator.language?.split("-")[0];
    if (browserLang === "es" || browserLang === "en") return browserLang;

    return "es";
  },

  async loadTranslations(lang) {
    if (this.translations[lang]) return this.translations[lang];

    const response = await fetch(`i18n/${lang}.json`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to load ${lang}.json: ${response.status}`);
    this.translations[lang] = await response.json();
    return this.translations[lang];
  },

  setActiveButtons(lang) {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  },

  async setLang(lang) {
    if (lang !== "es" && lang !== "en") return;

    let translations = {};
    try {
      translations = await this.loadTranslations(lang);
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
      if (lang !== "es") translations = await this.loadTranslations("es");
    }

    this.currentLang = lang;
    setCookie("bp_lang", lang);
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = getByPath(translations, key);
      if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const value = getByPath(translations, key);
      if (typeof value === "string") el.placeholder = value;
    });

    this.setActiveButtons(lang);
  }
};

// init + bind UI
document.addEventListener("DOMContentLoaded", async () => {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => window.BP_I18N.setLang(btn.dataset.lang));
  });

  const lang = window.BP_I18N.getLang();
  await window.BP_I18N.setLang(lang);
});
