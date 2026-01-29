#!/usr/bin/env bash
set -euo pipefail
root="/Volumes/MK/kiwix/OfflineWiki"
cat <<'TXT'
OfflineWiki – Kurzbrief für Änderungen (ChatGPT/Claude/etc.)

Ziel:
- Startseite für Kiwix (Offline Wikipedia) ändern, ohne Kiwix-Inhalt zu beschädigen.
- Änderungen an der UI passieren in: public/index.html, public/style.css, public/app.js
- Kiwix lädt die Startseite aus: /Volumes/MK/kiwix/OfflineWiki/kiwix-index.html (inline CSS/JS)
- Sprache per Flaggen-Button umschalten (DE/EN), beide ZIMs in library.xml

Wichtig:
- Nach jeder Änderung: kiwix-index.html neu generieren (Inline CSS/JS) und Container neu starten.
- Server-Befehle im UI sind nur Copy-Commands (kein Control-Server mehr).

Rebuild-Schritte:
1) Inline-Datei neu generieren:
   python3 - <<'PY'
from pathlib import Path
html = Path('/Volumes/MK/kiwix/OfflineWiki/public/index.html').read_text()
css = Path('/Volumes/MK/kiwix/OfflineWiki/public/style.css').read_text()
js = Path('/Volumes/MK/kiwix/OfflineWiki/public/app.js').read_text()
html = html.replace('<link rel="stylesheet" href="style.css" />', f'<style>\n{css}\n</style>')
html = html.replace('<script src="app.js"></script>', f'<script>\n{js}\n</script>')
Path('/Volumes/MK/kiwix/OfflineWiki/kiwix-index.html').write_text(html)
print('updated kiwix-index.html')
PY

2) Container neu starten:
   cd /Volumes/MK/kiwix && docker compose down && docker compose up -d

Hinweis:
- Kiwix läuft auf http://<host>:8080
- Language Switch toggelt ZIM-Slug zwischen:
  - wikipedia_de_all_maxi_2025-09
  - wikipedia_en_all_maxi_2025-08
TXT

ls -la "$root/public" | sed -n '1,120p'

Wunsch-Feature (noch nicht umgesetzt):
- Button "Knowledge of the Day": jeden Tag einen neuen zufaelligen Artikel vorschlagen.
  Idee: Daily-Seed (Datum) + Liste zuletzt aufgerufener Artikel, Random-Artikel via Kiwix /search
