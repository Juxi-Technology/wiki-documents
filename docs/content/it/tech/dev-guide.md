# Guida di sviluppo

Questa guida spiega come sviluppare sulla base dei prodotti JUXI.

## Configurazione dell'ambiente di sviluppo

### Installare gli strumenti di sviluppo

```bash
# Installare il tool CLI
npm install -g @juxi/cli
# Inizializzare il progetto
juxi init my-project
```

## Struttura del progetto

```
my-project/
├── src/
│   ├── main.js
│   └── components/
├── docs/
└── package.json
```

## Esempio di codice

```javascript
import { Device } from '@juxi/sdk'
const device = new Device()
device.connect()
```
