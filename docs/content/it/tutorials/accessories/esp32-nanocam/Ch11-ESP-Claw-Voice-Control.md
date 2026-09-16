---
title: "Capitolo 11: Controllo vocale ESP-Claw"
description: "Tutorial ESP32-NanoCam capitolo 11: i 5 strumenti di controllo hardware in modalità ESP-Claw — regolazione del colore del LED a voce."
---

# Capitolo 11: Controllo vocale ESP-Claw

> **[Acquista nel negozio](https://www.juxitech.com/it/products/esp32-s3-wifi-video-module)**

**Obiettivo del capitolo**: controllare direttamente a voce gli effetti del LED di NanoCam, il cambio di modalità AI e l'analisi visiva con foto.

## Informazioni su questo capitolo

Quando il dispositivo passa a `ai_mode:7`, NanoCam entra in modalità ESP-Claw. Essa **condivide lo stesso firmware** (`nanocam_espclaw/`) con XiaoZhi AI (`ai_mode:6`); l'unica differenza è che la modalità ESP-Claw, oltre alla conversazione vocale, registra 5 strumenti aggiuntivi di controllo hardware.

|Dimensione di confronto|XiaoZhi AI (mode 6)|ESP-Claw (mode 7)|
|---|---|---|
|Conversazione vocale|✅ ASR→LLM→TTS|✅ Stessa pipeline vocale|
|Controllo LED|❌|✅ Regolazione del colore / accensione-spegnimento a voce|
|Cambio modalità AI|❌|✅ Cambio a voce|
|Foto + analisi visiva AI|❌|✅ Scatta e chiama l'AI multimodale per comprendere la scena|

## Come funziona

La modalità ESP-Claw, sopra la pipeline vocale, registra tramite `RegisterMcpTools()` 5 strumenti dedicati a NanoCam:

```Plain
Comando vocale dell'utente "metti la luce blu"
  → riconoscimento vocale ASR (cloud)
  → l'LLM comprende l'intento → chiama self.led.set_color({"r":0, "g":0, "b":255})
  → il LED WS2812 di NanoCam diventa blu
  → TTS: "Ok, la luce è stata impostata sul blu"
```

## Passaggi

### 11.1 Flashare il firmware

ESP-Claw usa il progetto firmware separato `nanocam_espclaw/`:

```Bash
cd nanocam_espclaw
idf.py set-target esp32s3
idf.py build
idf.py -p COMx flash
```

### 11.2 Cambiare modalità

Dopo l'avvio impostare la modalità ESP-Claw:

```Plain
ai_mode:7
```

Il dispositivo si riavvia automaticamente ed entra in questa modalità. Con `ai_mode:6` si torna alla modalità XiaoZhi AI.

### 11.3 Esempi di controllo vocale

Dopo la parola di attivazione, esprimere direttamente la richiesta:

```Plain
💬 "Accendi la luce" → il WS2812 si accende in bianco
💬 "Metti la luce blu" → il LED diventa blu
💬 "Spegni la luce" → il LED si spegne
💬 "Passa alla modalità rilevamento del volto" → la NVS salva ai_mode:2 + riavvio
💬 "Guarda cosa c'è qui" → scatto + invio all'analisi AI multimodale
💬 "C'è una tazza davanti a me" → l'AI multimodale riconosce la scena
```

### 11.4 Scatto + analisi visiva AI

Quando l'utente dice "guarda...", il firmware acquisisce un frame VGA RGB565, lo comprime in JPEG e lo invia all'API multimodale configurata sul server per l'analisi; il risultato viene annunciato a voce via TTS.

> L'URL e il token dell'API multimodale vengono forniti automaticamente dal server durante la fase di handshake della connessione; non è necessario inserire manualmente comandi di configurazione dalla seriale.

## I 5 strumenti dedicati a NanoCam

|Nome dello strumento|Funzione|Parametri|
|---|---|---|
|`self.led.set_color`|Imposta il LED RGB WS2812 (GPIO18)|`r,g,b`: 0-255|
|`self.led.turn_off`|Spegne il LED|Nessuno|
|`self.camera.set_ai_mode`|Cambia la modalità AI (salvataggio NVS + riavvio)|`mode`: 0-7|
|`self.camera.inspect_image`|Scatto + analisi visiva con LLM multimodale|`prompt`: descrizione della domanda|
|`self.get_device_info`|Informazioni del dispositivo in JSON|Nessuno|

## File di configurazione

|Contenuto|Percorso|
|---|---|
|Registrazione degli strumenti MCP|`nanocam_espclaw/main/boards/nanocam/nanocam_board.cc`|
|Logica di invio Vision|`nanocam_espclaw/main/boards/common/esp32_camera.cc`|
|Configurazione predefinita dell'SDK|`nanocam_espclaw/sdkconfig.defaults`|

> Il firmware ESP-Claw è un progetto separato e non condivide il codice con `nanocam_vision`. I due firmware devono essere compilati e flashati separatamente.

## Come scegliere

|La tua esigenza|Modalità consigliata|
|---|---|
|Vuoi solo chiacchierare a voce, domande e risposte|mode 6 (XiaoZhi)|
|Vuoi controllare il LED a voce|mode 7 (ESP-Claw)|
|Vuoi scattare foto + "vedere" la scena con l'AI|mode 7 (ESP-Claw)|
|Vuoi cambiare la modalità di rilevamento AI a voce|mode 7 (ESP-Claw)|

> L'uso completo di ESP-Claw (configurazione del server, sviluppo di strumenti MCP personalizzati ecc.) è ancora in fase di esplorazione; la documentazione verrà aggiornata con il progredire della ricerca.

Con questo si conclude l'intera serie di 11 capitoli del tutorial. Per tutti i comandi seriali (come il cambio di modalità `ai_mode`) vedi il [manuale del protocollo seriale](./ESP32-NanoCam-Serial-Protocol.md).

<RelatedProducts slugs="esp32-s3-wifi-module" />
