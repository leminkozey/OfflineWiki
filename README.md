# OfflineWiki

Eine Web-Anwendung zum Durchsuchen deines lokalen Wikipedia-Archivs mit Kiwix.

(<img width="651" height="582" alt="Image" src="https://github.com/user-attachments/assets/f34aebf9-0e67-4546-a016-897d79e32207" />)
(<img width="999" height="816" alt="Image" src="https://github.com/user-attachments/assets/fc0dd485-c89e-49e4-84f1-c3f28b436fc9" />)

## Was ist das?

OfflineWiki ist eine moderne Oberfläche für dein Kiwix Wikipedia-Archiv:

- **Wikipedia durchsuchen** - Offline, direkt im Browser
- **Favoriten** - Schnellzugriff auf häufig genutzte Themen
- **Verlauf** - Zuletzt besuchte Artikel wiederfinden
- **Sprachwechsel** - Zwischen verschiedenen Wikipedia-Sprachen wechseln
- **Server-Status** - Kiwix-Server Verbindung prüfen

## Features v2.0.0

- **Glassmorphic Design** - Modernes UI mit Blur-Effekten
- **Theme-Switcher** - Dark / System / Light mit Animationen
- **Auto-Save** - Einstellungen speichern automatisch
- **Responsive** - Funktioniert auf Desktop und Mobile

## Für wen ist das?

Für jeden, der Wikipedia offline verfügbar haben möchte - ob für Reisen, eingeschränkte Internetverbindung oder einfach Unabhängigkeit.

## Voraussetzungen

- [Docker](https://www.docker.com/) (für Kiwix Server)
- ZIM-Dateien von [Kiwix](https://wiki.kiwix.org/wiki/Content_in_all_languages)
- Ein Webbrowser

## Schnellstart

### 1. Repository klonen

```bash
git clone https://github.com/leminkozey/OfflineWiki.git
```

### 2. ZIM-Dateien herunterladen

Lade Wikipedia-Archive von [Kiwix Downloads](https://wiki.kiwix.org/wiki/Content_in_all_languages) herunter.

Empfohlen:
- `wikipedia_de_all_maxi_*.zim` - Deutsche Wikipedia (~47 GB)
- `wikipedia_en_all_maxi_*.zim` - Englische Wikipedia (~111 GB)

### 3. Kiwix Server einrichten

Erstelle einen Ordner für deine ZIM-Dateien und starte Kiwix mit Docker:

```bash
# Ordner erstellen
mkdir -p ~/kiwix/data

# ZIM-Dateien in den data-Ordner verschieben
mv wikipedia_*.zim ~/kiwix/data/

# docker-compose.yml erstellen
cat > ~/kiwix/docker-compose.yml << 'EOF'
services:
  kiwix:
    image: ghcr.io/kiwix/kiwix-serve:latest
    ports:
      - "8080:8080"
    volumes:
      - ./data:/data
    command: /data/*.zim
    restart: unless-stopped
EOF

# Kiwix starten
cd ~/kiwix
docker compose up -d
```

### 4. Config anpassen

Öffne `public/app.js` und passe die ZIM-Slugs an:

```javascript
const defaults = {
  zimSlug: "wikipedia_de_all_maxi_2025-09",  // Dein Dateiname ohne .zim
  languageSlugs: {
    de: "wikipedia_de_all_maxi_2025-09",
    en: "wikipedia_en_all_maxi_2025-08"
  }
};
```

**ZIM-Slug finden:**
1. Öffne `http://localhost:8080` im Browser
2. Klicke auf ein Wiki
3. Der Slug steht in der URL: `http://localhost:8080/[SLUG]/`

### 5. Website öffnen

Öffne `http://localhost:8080` im Browser.

## Features

### Suche

Gib einen Suchbegriff ein und drücke Enter.

### Favoriten

Speichere häufig genutzte Suchbegriffe für schnellen Zugriff.

### Einstellungen

- **Design**: Theme (Dark/System/Light), Button-Stil, Akzentfarbe
- **Server**: Server-Status, Befehle zum Kopieren
- **Credits**: Entwickler-Info

### Sprachwechsel

Wechsle zwischen den konfigurierten Sprachen über die Flaggen-Buttons.

## Server-Befehle

```bash
# Kiwix starten
cd ~/kiwix && docker compose up -d

# Kiwix neustarten
cd ~/kiwix && docker compose restart

# Kiwix stoppen
cd ~/kiwix && docker compose down

# Logs anzeigen
cd ~/kiwix && docker compose logs -f
```

## Troubleshooting

### "Server nicht erreichbar"

1. Prüfe ob Docker läuft: `docker ps`
2. Prüfe ob Kiwix läuft: `docker compose logs`
3. Öffne `http://localhost:8080` direkt im Browser

### Sprache wechselt nicht

1. Prüfe ob der ZIM-Slug in `app.js` korrekt ist
2. Der Slug muss exakt dem Dateinamen entsprechen (ohne `.zim`)

## Ordnerstruktur

```
OfflineWiki/
├── public/
│   ├── index.html
│   ├── app.js           # Config + Logik
│   └── style.css
├── kiwix-index.html     # Kombinierte Datei für Kiwix
└── README.md
```

## Credits

Entwickelt von **leminkozey**

GitHub: [https://github.com/leminkozey](https://github.com/leminkozey)

---

Wenn du diese Website weiterentwickelst und veröffentlichst, gib bitte Credits an den ursprünglichen Entwickler.
