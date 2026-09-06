---
title: Guía de desarrollo
description: Esta guía explica cómo realizar un desarrollo secundario basado en los productos de JUXI.
---

# Guía de desarrollo

Esta guía explica cómo realizar un desarrollo secundario basado en los productos de JUXI.

## Configuración del entorno de desarrollo

### Instalar herramientas de desarrollo

```bash
# Instalar la herramienta CLI
npm install -g @juxi/cli
# Inicializar el proyecto
juxi init my-project
```

## Estructura del proyecto

```
my-project/
├── src/
│   ├── main.js
│   └── components/
├── docs/
└── package.json
```

## Ejemplo de código

```javascript
import { Device } from '@juxi/sdk'
const device = new Device()
device.connect()
```
