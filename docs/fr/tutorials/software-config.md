---
title: Configuration logicielle
description: "Guide de configuration logicielle du produit."
---

# Configuration logicielle

Guide de configuration logicielle du produit.

## Prérequis système

- Node.js 18+
- Python 3.10+
- Git

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Juxi-Technology/lerobot.git

# Changer de répertoire
cd lerobot

# Installer les dépendances
pip install -e ".[feetech]"
```

## Fichier de configuration

Éditer `config.json` si nécessaire :

```json
{
  "port": 3000,
  "language": "fr"
}
```