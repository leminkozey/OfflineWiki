# OfflineWiki

Eine Web-Anwendung zum Durchsuchen deines lokalen Wikipedia-Archivs mit Kiwix.

## Was ist das?

OfflineWiki ist eine moderne Oberfläche für dein Kiwix Wikipedia-Archiv:

- **Wikipedia durchsuchen** - Offline, direkt im Browser
- **Favoriten** - Schnellzugriff auf häufig genutzte Themen
- **Verlauf** - Zuletzt besuchte Artikel wiederfinden
- **Sprachwechsel** - Zwischen DE und EN Wikipedia wechseln
- **Server-Status** - Kiwix-Server Verbindung prüfen

## Für wen ist das?

Für jeden, der Wikipedia offline verfügbar haben möchte - ob für Reisen, eingeschränkte Internetverbindung oder einfach Unabhängigkeit.

## Voraussetzungen

- [Docker](https://www.docker.com/) (für Kiwix Server)
- [Node.js](https://nodejs.org/) (Version 18 oder höher)
- ZIM-Dateien von [Kiwix](https://wiki.kiwix.org/wiki/Content_in_all_languages)

## Verfügbare ZIM-Dateien

| Datei | Sprache | Größe |
|-------|---------|-------|
| `wikipedia_de_all_maxi_2025-09.zim` | Deutsch | ~47 GB |
| `wikipedia_en_all_maxi_2025-08.zim` | English | ~111 GB |

## Installation

### 1. Ordnerstruktur

```
/Volumes/MK/kiwix/
├── data/                    # ZIM-Dateien hier ablegen
│   ├── wikipedia_de_all_maxi_2025-09.zim
│   └── wikipedia_en_all_maxi_2025-08.zim
├── docker-compose.yml       # Kiwix Server Config
└── OfflineWiki/             # Diese Webseite
```

### 2. Kiwix Server starten

```bash
cd /Volumes/MK/kiwix
docker compose up -d
```

Der Kiwix Server läuft dann auf Port 8080.

### 3. OfflineWiki starten

```bash
cd /Volumes/MK/kiwix/OfflineWiki
npm install
node public/app.js
```

Oder einfach `index.html` im Browser öffnen.

### 4. Im Browser öffnen

```
http://localhost:8080
```

## Eigene ZIM-Dateien hinzufügen

1. ZIM-Datei von [Kiwix Downloads](https://wiki.kiwix.org/wiki/Content_in_all_languages) herunterladen
2. In den `data/` Ordner verschieben
3. Kiwix Server neustarten:
   ```bash
   cd /Volumes/MK/kiwix
   docker compose restart
   ```
4. In OfflineWiki unter Einstellungen die neue Datei auswählen

## Features

### Suche

Gib einen Suchbegriff ein und drücke Enter. Die Suche öffnet die Kiwix-Suchergebnisse.

### Favoriten

Speichere häufig genutzte Suchbegriffe für schnellen Zugriff:
1. Favoriten-Kachel klicken
2. Titel und Suchbegriff eingeben
3. "Hinzufügen" klicken

### Einstellungen

Über den Einstellungen-Button oben rechts:

- **Design**: Theme (Dark/Light), Button-Stil (Default/Simple), Akzentfarbe
- **Server**: Links in neuem Tab öffnen, Server-Status, Server-Befehle
- **Credits**: Entwickler-Info

### Sprachwechsel

Über die Flaggen-Buttons zwischen Deutsch und Englisch wechseln. Die jeweilige Wikipedia wird automatisch geladen.

## Portabilität

Der komplette `/Volumes/MK/kiwix/` Ordner kann auf einen anderen Rechner kopiert werden. Die Website erkennt automatisch den lokalen Kiwix-Server.

## Server-Befehle

**Neustart:**
```bash
cd /Volumes/MK/kiwix && docker compose restart
```

**Herunterfahren:**
```bash
cd /Volumes/MK/kiwix && docker compose down
```

## Credits

Entwickelt von **leminkozey**

GitHub: [https://github.com/leminkozey](https://github.com/leminkozey)

---

Wenn du diese Website weiterentwickelst und veröffentlichst, gib bitte Credits an den ursprünglichen Entwickler.
