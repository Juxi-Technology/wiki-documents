---
title: Software-Konfiguration
description: "Anleitung zur Software-Konfiguration des Produkts."
---

# Software-Konfiguration

Anleitung zur Software-Konfiguration des Produkts.

## Systemanforderungen

- Node.js 18+
- Python 3.10+
- Git

## Installation

```bash
# Repository klonen
git clone https://github.com/Juxi-Technology/lerobot.git

# Verzeichnis wechseln
cd lerobot

# Abhängigkeiten installieren
pip install -e ".[feetech]"
```

## Konfigurationsdatei

`config.json` bei Bedarf bearbeiten:

```json
{
  "port": 3000,
  "language": "de"
}
```