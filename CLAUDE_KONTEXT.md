# OfflineWiki - Projekt Kontext

> Diese Datei dient als Kontext für Claude. Bei neuen Sessions diese Datei lesen lassen.

---

## Projekt-Übersicht

**Typ:** Lokale Wikipedia-Oberfläche für Kiwix
**Stack:** Vanilla JS + CSS (kein Backend nötig)
**Server:** Kiwix via Docker (Port 8080)
**GitHub:** https://github.com/leminkozey/OfflineWiki

---

## Ordner-Struktur

```
/Users/manu/Desktop/coding/personal/seiten/OfflineWiki/   # Website
├── public/
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   └── config.js               # ZIM-Slugs konfigurieren
├── backup_v1.0.0/              # Backup vor Änderungen
├── CLAUDE_KONTEXT.md           # Diese Datei
└── README.md

/Volumes/MK/kiwix/              # Kiwix Server (extern)
├── data/
│   ├── wikipedia_de_all_maxi_2025-09.zim
│   ├── wikipedia_en_all_maxi_2025-08.zim
│   └── library.xml
└── docker-compose.yml
```

---

## Aktuelle Version: 1.0.0

### Implementierte Features

1. **Suche:**
   - Wikipedia durchsuchen via Kiwix
   - Enter zum Suchen

2. **Favoriten:**
   - Themen speichern für Schnellzugriff
   - Titel + Suchbegriff

3. **Verlauf:**
   - Letzte 5 Suchen anzeigen
   - Zeitstempel pro Eintrag

4. **Sprachwechsel:**
   - DE/EN Toggle via Flaggen
   - Automatische ZIM-Slug Anpassung

5. **Settings-Popup:**
   - **Design:** Theme, Button-Stil, Akzentfarbe
   - **Server:** Links in neuem Tab, Status, Befehle
   - **Credits:** Entwickler-Info

6. **UI:**
   - Dark/Light Theme
   - Server-Status Anzeige (Online/Offline)
   - Sticky Top-Bar

---

## Versions-Roadmap

### v1.0.1 - Bugfix [KRITISCH]
- [ ] **CSS Duplikate entfernen** - .menu-grid, .list, .favorites-form mehrfach definiert
- [ ] **kiwix-index.html entfernen** - Nur public/ Dateien nutzen
- [ ] **Settings-Divider** - Position im Modal korrigieren

### v1.1.0 - Design Angleichung [HOCH]
- [ ] **Footer wie Netzwerk Manager** - "made by leminkozey" + Version
- [ ] **Settings-Sidebar Icons** - SVG Icons für jeden Tab
- [ ] **Direktes Speichern** - Änderungen sofort speichern (wie NM)
- [ ] **Speichern-Button entfernen** - Nicht mehr nötig nach direktem Speichern
- [ ] **System-Theme Option** - prefers-color-scheme Support

### v1.2.0 - UX Verbesserungen [HOCH]
- [ ] **Tastatur-Shortcuts** - Esc schließt Modals, / fokussiert Suche
- [ ] **Suchverlauf löschen** - Button zum Leeren
- [ ] **Favoriten löschen alle** - Bulk-Delete Option
- [ ] **Zufälliger Artikel** - Button für Random Wikipedia (wenn Kiwix unterstützt)

### v1.3.0 - Export/Import [HOCH]
- [ ] **Einstellungen exportieren** - Als JSON
- [ ] **Einstellungen importieren** - JSON hochladen
- [ ] **Favoriten exportieren** - Separat exportierbar
- [ ] **Verlauf exportieren** - Separat exportierbar

### v1.4.0 - ZIM-Manager [MITTEL]
- [ ] **ZIM-Übersicht** - Alle verfügbaren ZIMs anzeigen
- [ ] **Automatische Erkennung** - library.xml auslesen
- [ ] **ZIM-Info** - Name, Größe, Sprache, Datum
- [ ] **Sprach-Dropdown** - Statt nur DE/EN alle ZIMs wählbar
- [ ] **Download-Links** - Direkt zu Kiwix Downloads

### v1.5.0 - Offline & PWA [NIEDRIG]
- [ ] **PWA Support** - Als App installierbar
- [ ] **Offline-Indikator** - Zeigen wenn kein Internet
- [ ] **Service Worker** - Caching für schnelleres Laden

### v2.0.0 - Erweiterte Features [LANGFRISTIG]
- [ ] **Artikel des Tages** - Featured Article
- [ ] **Leseliste** - Artikel für später merken
- [ ] **Notizen** - Zu Artikeln Notizen hinzufügen
- [ ] **Kategorien** - Favoriten gruppieren
- [ ] **Theme-Schedule** - Zeitbasierter Wechsel

---

## Wichtige Dateien

| Datei | Beschreibung |
|-------|--------------|
| `public/app.js` | Frontend-Logik, State-Management |
| `public/style.css` | Styling (hat Duplikate!) |
| `public/index.html` | Haupt-HTML |
| `public/config.js` | Basis-Konfiguration |

---

## Bekannte Bugs

1. **CSS Duplikate** - `.menu-grid`, `.list`, `.favorites-form` mehrfach definiert
2. **Speichern-Button** - Inkonsistent mit Netzwerk Manager (dort direkt speichern)
3. **kiwix-index.html** - Duplikat mit inline CSS/JS (sollte entfernt werden)
4. **Settings-Divider** - Position im Modal nicht optimal

---

## Docker Befehle

```bash
# Kiwix starten
cd /Volumes/MK/kiwix && docker compose up -d

# Kiwix neustarten
cd /Volumes/MK/kiwix && docker compose restart

# Kiwix stoppen
cd /Volumes/MK/kiwix && docker compose down

# Logs anzeigen
cd /Volumes/MK/kiwix && docker compose logs -f
```

---

## Letzte Session: 2025-01-29

**Erledigt:**
- README.md erstellt (Netzwerk Manager Stil)
- .gitignore erstellt
- CLAUDE_KONTEXT.md erstellt
- Roadmap geplant

**Nächste Schritte:**
- GitHub Repo erstellen
- Backup vor Änderungen
- v1.1.0 Design Angleichung starten

---

## Für neue Session

Bei Fragen zum Projekt diese Datei lesen lassen:
```
Lies /Volumes/MK/kiwix/OfflineWiki/CLAUDE_KONTEXT.md
```
