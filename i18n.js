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
    // Text nodes (labels, buttons, headings, etc.)
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });

    // Placeholders (inputs, textarea)
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
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
      if (!href) return;
      if (href.startsWith("#")) return;
      if (href.startsWith("http")) return;
      if (href.startsWith("mailto:")) return;
      if (href.startsWith("tel:")) return;

      const u = new URL(href, window.location.href);
      u.searchParams.set("lang", lang);

      // Reconstruir preservando hash
      const next = u.pathname + "?" + u.searchParams.toString() + (u.hash || "");
      a.setAttribute("href", next);
    });
  };

  window.BP_I18N = { getLang, setLang };
})();
