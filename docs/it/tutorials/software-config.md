---
title: Configurazione software
description: "Guida alla configurazione software del prodotto."
---

# Configurazione software

Guida alla configurazione software del prodotto.

## Requisiti di sistema

- Node.js 18+
- Python 3.10+
- Git

## Installazione

```bash
# Clonare il repository
git clone https://github.com/Juxi-Technology/lerobot.git

# Cambiare directory
cd lerobot

# Installare le dipendenze
pip install -e ".[feetech]"
```

## File di configurazione

Modificare `config.json` se necessario:

```json
{
  "port": 3000,
  "language": "it"
}
```