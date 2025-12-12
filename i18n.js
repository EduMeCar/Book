(() => {
  const SUPPORTED = ["es", "en"];
  const KEY = "bp_lang";

  const getUrlLang = () => {
    const u = new URL(window.location.href);
    const lang = (u.searchParams.get("lang") || "").toLowerCase();
    return SUPPORTED.includes(lang) ? lang : null;
  };

  const getLang = () => getUrlLang() || localStorage.getItem(KEY) || "es";

  const loadDict = async (lang) => {
    const res = await fetch(`i18n/${lang}.json`);
    if (!res.ok) throw new Error("i18n load failed");
    return await res.json();
  };

  const applyDict = (dict) => {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });
  };

  const setLang = async (lang) => {
    if (!SUPPORTED.includes(lang)) lang = "es";
    localStorage.setItem(KEY, lang);
    document.documentElement.lang = lang;

    const dict = await loadDict(lang);
    applyDict(dict);

    // Mantener lang en links entre páginas
    document.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const u = new URL(href, window.location.href);
      u.searchParams.set("lang", lang);
      a.setAttribute("href", u.pathname + "?" + u.searchParams.toString() + (u.hash || ""));
    });
  };

  window.BP_I18N = { getLang, setLang };
})();
