# OfflineWiki (portable)

Dieses Projekt liegt bewusst im gleichen Ordner wie die Kiwix-Daten.
Du kannst **den kompletten Ordner** auf einen anderen Rechner kopieren
und dort weiter nutzen.

## Struktur

```
/Volumes/MK/kiwix/
  ├─ data/                (ZIM, library.xml)
  └─ OfflineWiki/         (diese Webseite)
```

## Starten (Website)

```bash
cd /Volumes/MK/kiwix/OfflineWiki
npm install
npm run dev
```

Dann im Browser:

```
http://localhost:4173
```

## Portabilitaet

Die Seite nutzt standardmaessig **AUTO** und setzt die Base-URL auf:

```
http://<aktueller-hostname>:8080
```

Das bedeutet:
- Wenn die Website auf demselben Rechner gehostet wird wie Kiwix, funktioniert es automatisch.
- Wenn Kiwix auf einem anderen Port oder Host laeuft, stelle es im UI um.

## Kiwix starten

```bash
cd /Volumes/MK/kiwix
docker compose up -d
```
