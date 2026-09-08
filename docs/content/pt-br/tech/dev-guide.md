---
title: Guia de Desenvolvimento
description: Este guia apresenta como desenvolver com os produtos da Juxi Technology.
---


# Guia de Desenvolvimento

Este guia apresenta como desenvolver com os produtos da Juxi Technology.

## Configuração do Ambiente de Desenvolvimento

### Instalar Ferramentas de Desenvolvimento

```bash
# Install CLI tools
npm install -g @juxi/cli

# Initialize project
juxi init my-project
```

## Estrutura do Projeto

```
my-project/
├── src/
│   ├── main.js
│   └── components/
├── docs/
└── package.json
```

## Exemplo de Código

```javascript
import { Device } from '@juxi/sdk'

const device = new Device()
device.connect()
```
