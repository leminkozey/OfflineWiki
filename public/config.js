/**
 * OfflineWiki Konfiguration
 *
 * Passe diese Datei an deine Kiwix-Installation an.
 *
 * ZIM-Slug finden:
 * 1. Öffne deinen Kiwix Server im Browser (z.B. http://localhost:8080)
 * 2. Der Slug steht in der URL: http://localhost:8080/[DEIN-SLUG]/
 * 3. Beispiel: "wikipedia_de_all_maxi_2025-09"
 */

window.OFFLINEWIKI_CONFIG = {

  // Kiwix Server URL
  // "AUTO" = Automatisch erkennen (localhost:8080)
  // Oder manuell: "http://192.168.1.100:8080"
  baseUrl: "AUTO",

  // Deine ZIM-Dateien (Slug = Dateiname ohne .zim)
  // Füge hier alle deine ZIM-Dateien ein
  zimSlugs: {
    de: "wikipedia_de_all_maxi_2025-09",
    en: "wikipedia_en_all_maxi_2025-08"
    // Weitere Beispiele:
    // fr: "wikipedia_fr_all_maxi_2024-01",
    // es: "wikipedia_es_all_maxi_2024-01",
  },

  // Standard-Sprache beim ersten Besuch
  defaultLanguage: "de",

  // Links in neuem Tab öffnen
  openInNewTab: true
};
