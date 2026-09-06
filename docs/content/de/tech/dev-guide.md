---
title: Entwicklungsleitfaden
description: Dieser Leitfaden zeigt, wie auf Basis der JUXI-Produkte weiterentwickelt wird.
---

# Entwicklungsleitfaden

Dieser Leitfaden zeigt, wie auf Basis der JUXI-Produkte weiterentwickelt wird.

## Entwicklungsumgebung einrichten

### Entwicklungswerkzeuge installieren

```bash
# CLI-Tool installieren
npm install -g @juxi/cli
# Projekt initialisieren
juxi init my-project
```

## Projektstruktur

```
my-project/
├── src/
│   ├── main.js
│   └── components/
├── docs/
└── package.json
```

## Codebeispiel

```javascript
import { Device } from '@juxi/sdk'
const device = new Device()
device.connect()
```
