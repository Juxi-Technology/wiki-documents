---
title: "Capitolo 9: Conversazione vocale"
description: "Tutorial ESP32-NanoCam capitolo 9: collegarsi al servizio cloud xiaozhi.me tramite il framework XiaoZhi AI e provare la conversazione vocale full-duplex."
---

# Capitolo 9: Conversazione vocale

> **[Acquista nel negozio](https://www.juxitech.com/it/products/esp32-s3-wifi-video-module)**

**Obiettivo del capitolo**: collegarsi al servizio cloud XiaoZhi AI e conversare a voce in modo naturale con NanoCam.

## Informazioni su questo capitolo

Questo capitolo riguarda la modalità XiaoZhi AI (`ai_mode:6`). **Importante**: la modalità 6 (conversazione vocale) e la modalità 7 (ESP-Claw) **condividono lo stesso firmware** (`nanocam_espclaw/`); all'avvio il dispositivo carica set diversi di strumenti MCP in base al valore di `ai_mode` memorizzato nella NVS.

|Dimensione di confronto|XiaoZhi AI (mode 6)|ESP-Claw (mode 7)|
|---|---|---|
|Conversazione vocale|✅ ASR→LLM→TTS|✅ Stessa pipeline vocale|
|Strumenti MCP|Strumenti generici (volume/foto ecc.)|**Strumenti generici + 5 strumenti hardware dedicati**|
|Comprensione visiva|`self.camera.take_photo`|**`self.camera.inspect_image`** (visione multimodale)|
|Controllo LED|❌|✅ Regolazione del colore a voce|
|Scenari d'uso|Conversazione AI generica, educazione per bambini|Controllo hardware, ispezione visiva, domotica|

> Questo capitolo si concentra sulle funzionalità principali di conversazione vocale di **XiaoZhi AI (modalità 6)**. Per conoscere le capacità di controllo hardware di ESP-Claw, leggi il [Capitolo 11: Controllo vocale ESP-Claw](./Ch11-ESP-Claw-Voice-Control.md).

## Come funziona

NanoCam integra il framework open source XiaoZhi AI e, tramite il protocollo WebSocket / MQTT, si collega a un server LLM realizzando una pipeline completa di interazione vocale:

```Plain
L'utente parla → acquisizione dal microfono ES8311 → codifica Opus
  → WebSocket → riconoscimento vocale ASR nel cloud
  → generazione della risposta da parte del modello LLM
  → sintesi vocale TTS → decodifica Opus
  → amplificatore NS4150B → riproduzione dallo speaker
```

Progettazione full-duplex: l'utente può interrompere l'AI mentre parla (barge-in), per un'esperienza vicina a una conversazione reale.

## Requisiti hardware

Questo capitolo riguarda le funzionalità audio e richiede il seguente hardware:

- Scheda core NanoCam (con codec ES8311 + microfono AP2718AT)

- Scheda base NanoCam (con amplificatore NS4150B + CH340K)

- Speaker (collegato all'interfaccia speaker della scheda base, VON/VOP)

> È possibile eseguire i test anche con la sola scheda core (ascolto tramite l'uscita cuffie dell'ES8311). Il microfono è un MEMS in silicio analogico AP2718AT, collegato al pin MIC1P dell'ES8311 attraverso il condensatore di blocco DC C26.

## Passaggi

### 9.1 Flashare il firmware XiaoZhi AI

XiaoZhi AI usa il progetto firmware separato `nanocam_espclaw/`:

```Bash
cd nanocam_espclaw
idf.py set-target esp32s3
idf.py build
idf.py -p COMx flash monitor
```

Dopo l'avvio la modalità predefinita è XiaoZhi AI.

### 9.2 Connessione al servizio cloud xiaozhi.me

NanoCam si collega di fabbrica al servizio cloud ufficiale [xiaozhi.me](https://xiaozhi.me) (gratuito), senza bisogno di un server proprio.

1. Registrare un account su [xiaozhi.me](https://xiaozhi.me)

2. All'accensione il dispositivo annuncia automaticamente un codice di attivazione a 6 cifre

3. Inserire il codice di attivazione nella console xiaozhi.me → associare il dispositivo

4. Selezionare il modello LLM nella console (Qwen / DeepSeek ecc.)

L'attivazione è necessaria una sola volta; successivamente la connessione avviene automaticamente a ogni accensione.

### 9.3 Prima conversazione

Dopo il segnale acustico si può conversare:

```Plain
Tu: "你好小智, com'è il tempo oggi?"
NanoCam: "Fammi controllare il meteo di oggi..."
```

La parola di attivazione è **"你好小智"** (predefinita).

### 9.4 Scenari di conversazione comuni

```Plain
💬 "Racconta una barzelletta" → risposta vocale dell'AI
💬 "Impostami una sveglia da 5 minuti" → funzione sveglia
💬 "Che ore sono" → annuncio dell'ora
💬 "Riproduci musica leggera" → riproduzione musicale in streaming
💬 "Cos'è un buco nero" → domande di cultura generale
```

## Server auto-ospitato (opzionale)

Se hai esigenze di privacy, o desideri usare un LLM proprio, puoi distribuire il server open source XiaoZhi AI:

```Bash
git clone https://github.com/xinnan-tech/xiaozhi-esp32-server
cd xiaozhi-esp32-server
pip install -r requirements.txt
python app.py
```

L'indirizzo del server per il firmware viene fornito tramite il sistema OTA (`CONFIG_OTA_URL` in sdkconfig); all'accensione il dispositivo richiede automaticamente l'indirizzo del server.

> XiaoZhi AI usa il server open source XiaoZhi AI (protocollo privato WebSocket + pipeline ASR/LLM/TTS). In modalità ESP-Claw, su questa base, la funzionalità di analisi visiva viene fornita dal server durante l'handshake MCP tramite Vision API URL e token; il firmware non deve configurarla autonomamente.

## Risoluzione dei problemi

|Sintomo|Causa possibile|Soluzione|
|---|---|---|
|Nessun suono|Speaker non collegato|Controllare l'interfaccia speaker della scheda base|
|Riconoscimento vocale impreciso|Rumore ambientale eccessivo|Parlare vicino al microfono (distanza < 1m)|
|Impossibile connettersi|WiFi non configurato|Configurare prima la rete via seriale `sta_ssid:xxx`|
|Nessun codice di attivazione|Primo avvio non completato|Attendere 30 secondi: il dispositivo lo annuncia automaticamente|
|Risposte molto lente|Latenza del server LLM|Su xiaozhi.me scegliere un modello più veloce, oppure usare un server proprio|

> Per tutti i comandi, compresa la configurazione di rete via seriale, vedi il [manuale del protocollo seriale](./ESP32-NanoCam-Serial-Protocol.md).

Capitolo successivo: [Capitolo 10: Comprensione visiva AI](./Ch10-AI-Vision-Understanding.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
