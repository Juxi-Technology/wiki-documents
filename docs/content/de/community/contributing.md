---
title: Mitwirkungsleitfaden
description: "Mitmachen im JUXI-Wiki: Repository forken, Inhalte und Übersetzungen beitragen, Pull-Requests einreichen und Community-Richtlinien beachten."
---

# Mitwirkungsleitfaden

Danke, dass Sie zum JUXI-Wiki beitragen möchten! Dieses Dokument führt Sie durch den Ablauf.

## Vorbereitung

1. [wiki-documents-Repository](https://github.com/Juxi-Technology/wiki-documents) forken
2. Fork lokal klonen
3. Abhängigkeiten installieren:

```bash
cd wiki-documents
npm ci
```

4. Lokalen Entwicklungsserver starten und Vorschau ansehen:

```bash
npm run docs:dev
```

Im Browser unter `http://localhost:5173` können Sie Ihre Änderungen ansehen.

## Möglichkeiten

### Dokumentationsfehler korrigieren

Tippfehler, defekte Links, veraltete Infos gefunden? Senden Sie direkt einen Pull Request an `main`.

### Tutorials hinzufügen

Wenn Sie ein Tutorial zu JUXI-Produkten teilen möchten:

1. Zuerst ein Proposal in [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues) einreichen (Thema und Inhalt)
2. Nach Bestätigung durch die Maintainer nach bestehender Struktur verfassen
3. PR einreichen

### Übersetzungsbeiträge

Das Projekt unterstützt 11 Sprachen. Übersetzungen folgen diesen Regeln:

- Jede `.md`-Datei braucht eine Entsprechung im jeweiligen Sprachverzeichnis
- Bilder werden aus `docs/public/images/` geteilt
- Links jeder Sprachversion zeigen auf den Sprachpfad

## Inhaltsrichtlinien

### Bilder

- Ablageort: `docs/public/images/tutorials/{Produkt}/{Tutorial}/`
- Benennung: Nummerierung oder beschreibend (z. B. `1.png`, `wiring-diagram.png`)
- Im Tutorial mit relativem Pfad referenzieren:

```markdown
![Beschreibung](../../../public/images/tutorials/xxx/xxx.png)
```

### Dateibenennung

- Tutorials auf Englisch, kebab-case
- Jede `.md`-Datei braucht `title`- und `description`-Frontmatter

### Codeblöcke

- Sprachtyp immer angeben
- Sicherstellen, dass Befehle korrekt ausführbar sind

## PR-Ablauf

1. Lokalen Build verifizieren: `npm run docs:build`
2. Alle Felder des Pull-Request-Templates ausfüllen
3. Nach erfolgreichem CI-Build mindestens 1 Maintainer-Genehmigung zum Merge
4. Nach dem Merge deploiert GitHub Actions automatisch

## Verhaltenskodex

- Alle Mitwirkenden und Nutzer respektieren
- Objektive, genaue technische Inhalte liefern
- Keine ungetesteten Codes oder Befehle einreichen

Vielen Dank für Ihren Beitrag! 🎉
