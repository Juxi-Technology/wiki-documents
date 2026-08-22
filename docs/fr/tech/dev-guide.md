# Guide de développement

Ce guide explique comment effectuer un développement secondaire à partir des produits JUXI.

## Mise en place de l'environnement de développement

### Installer les outils de développement

```bash
# Installer l'outil CLI
npm install -g @juxi/cli
# Initialiser le projet
juxi init my-project
```

## Structure du projet

```
my-project/
├── src/
│   ├── main.js
│   └── components/
├── docs/
└── package.json
```

## Exemple de code

```javascript
import { Device } from '@juxi/sdk'
const device = new Device()
device.connect()
```
