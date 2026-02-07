var getCurrentLanguage = () => {
    const urlParams = window.location.search;
    const paramLang = new URLSearchParams(urlParams).get("lang");
    const userBrowserLang = navigator.language.split("-")[0];
    return paramLang || userBrowserLang || "en";
};
var translationsCache = {};
var getTranslations = async (loadFallbackTranslation) => {
    const lang = getCurrentLanguage();
    if (!translationsCache[lang]) {
        translationsCache[lang] = (async () => {
            try {
                const response = await fetch(`./locales/${lang}.json`);
                return await response.json();
            } catch {
                return await loadFallbackTranslation();
            }
        })();
    }
    return translationsCache[lang];
};

export {
    getCurrentLanguage,
    getTranslations
};