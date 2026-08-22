---
title: Configuración de software
description: "Guía de configuración de software del producto."
---

# Configuración de software

Guía de configuración de software del producto.

## Requisitos del sistema

- Node.js 18+
- Python 3.10+
- Git

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Juxi-Technology/lerobot.git

# Cambiar de directorio
cd lerobot

# Instalar dependencias
pip install -e ".[feetech]"
```

## Archivo de configuración

Editar `config.json` si es necesario:

```json
{
  "port": 3000,
  "language": "es"
}
```