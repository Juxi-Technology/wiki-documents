---
title: ESP32-NanoCam Avvio rapido
description: "Avvio rapido del modulo di trasmissione video/visione AI ESP32-NanoCam: flashing del firmware, configurazione WiFi, visualizzazione del flusso in tempo reale."
---

# ESP32-NanoCam Avvio rapido

> **[Acquista nel negozio](https://www.juxitech.com/it/products/esp32-s3-wifi-video-module)**


ESP32-NanoCam è il modulo di trasmissione video / visione AI ESP32-S3 di Juxi Technology (pagina prodotto: [Modulo video WiFi ESP32-S3](/it/products/esp32-s3-wifi-module)), con architettura a doppia scheda (scheda principale + scheda base). Questa guida ti accompagna in cinque passaggi attraverso flashing del firmware, connessione WiFi, visualizzazione dell'immagine e cambio della modalità AI.

## Preparazione

- Scheda principale NanoCam + scheda base (ESP32-S3 N16R8 + CH340K)
- Cavo dati USB Type-C (supporta la trasmissione dati)
- Computer (Windows / Mac / Linux)
- Modulo fotocamera GC2145 (collegato in fabbrica)

![Fig. 1: Fronte della scheda principale ESP32-NanoCam](../../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/1.png)

![Fig. 2: Scheda base ESP32-NanoCam (alimentazione USB-C e flashing seriale)](../../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/2.png)

## Passo 1: Flashare il firmware (3 minuti)

### Metodo A: senza ambiente di sviluppo (consigliato)

1. Installare il [driver seriale CH340K](https://www.wch.cn/download/CH341SER_EXE.html)
2. Aprire il browser e visitare [esptool-js](https://espressif.github.io/esptool-js/)
3. Collegare NanoCam al computer con un cavo Type-C
4. Selezionare la porta seriale, baud rate 115200
5. Individuare il file firmware `nanocam_xxx.bin` all'interno dell'archivio decompresso
6. Selezionare il file firmware `nanocam_xxx.bin`, indirizzo `0x0`
7. Cliccare "START" e attendere il completamento

### Metodo B: riga di comando (avanzato)

```Bash
pip install esptool
esptool.py --chip esp32s3 --port COM3 write_flash 0x0 nanocam.bin
```

## Passo 2: Connessione WiFi (2 minuti)

NanoCam per impostazione predefinita esegue **AP+STA in doppia modalità simultaneamente**, senza necessità di commutazione:

- L'**hotspot AP** è sempre attivo: lo smartphone si collega direttamente a `NanoCam-AP` (password `12345678`), nel browser aprire `http://192.168.4.1`
- Il **collegamento STA al router** richiede una configurazione WiFi una tantum

Con uno strumento seriale (baud rate **115200 8N1**) collegarsi alla porta Type-C di NanoCam:

```Plaintext
sta_ssid:nome_della_tua_WiFi
sta_pd:password_della_tua_WiFi
```

> La ricezione di `OK` indica che l'impostazione è riuscita. Dopo la modifica della password il modulo si riavvia automaticamente.

Per cambiare la modalità WiFi (di solito non necessario):

|Comando|Modalità|Descrizione|
|---|---|---|
|`wifi_mode:0`|Solo AP|Disattiva STA, mantiene solo l'hotspot|
|`wifi_mode:1`|Solo STA|Disattiva l'hotspot, si collega solo al router|
|`wifi_mode:2`|AP+STA|Predefinita, entrambi attivi contemporaneamente|

## Passo 3: Aprire l'immagine (1 minuto)

1. Inviare `sta_ip` via seriale per ottenere l'IP STA
2. Nel browser inserire `http://<indirizzo IP>` (oppure in modalità AP usare `http://192.168.4.1`)
3. La pagina web mostra il flusso in tempo reale

## Passo 4: Giocare con l'AI (2 minuti)

Inviare i seguenti comandi via seriale per cambiare modalità:

|Comando|Modalità|Effetto|
|---|---|---|
|`ai_mode:0`|Trasmissione normale|Flusso MJPEG in tempo reale|
|`ai_mode:1`|Rilevamento muso del gatto|Nel flusso appare il riquadro di rilevamento del muso del gatto|
|`ai_mode:2`|Rilevamento volti|Nel flusso appare il riquadro di rilevamento del volto|
|`ai_mode:3`|Riconoscimento colori|Selezione del colore→tracciamento in tempo reale|
|`ai_mode:4`|Riconoscimento facciale|Registrazione→identificazione→eliminazione|
|`ai_mode:5`|Scansione codici QR|Inquadrare il codice QR→contenuto emesso via seriale|
|`ai_mode:6`|Agente LLM|Sveglia vocale "你好小智" (XiaoZhi AI)|
|`ai_mode:7`|ESP-Claw|ESP-Claw AI Agent (framework ufficiale Espressif)|

> Ogni cambio di modalità richiede un riavvio manuale: è possibile riavviare premendo il pulsante RST del modulo; dopo il riavvio la nuova modalità diventa effettiva.

## Passo 5: Integrazione nel tuo progetto

### Controllo Arduino

```C++
Serial.begin(115200);
Serial.print("ai_mode:2");  // Passa al rilevamento dei volti
```

### Controllo Python

```Python
import serial
ser = serial.Serial("COM3", 115200)
ser.write(b"ai_mode:1\r\n")  # Passa al rilevamento dei volti di gatto
```

### Consultare i comandi completi

Riferimento completo dei comandi: [manuale del protocollo seriale](./ESP32-NanoCam-Serial-Protocol.md).

## FAQ

|Problema|Soluzione|
|---|---|
|Flashing non riuscito|Verificare che il cavo Type-C supporti la trasmissione dati; tenere premuto S2 (BOOT) sulla scheda base e poi alimentare|
|Nessuna immagine visibile|Inviare `sta_ip` via seriale per confermare l'IP; verificare di essere sulla stessa sottorete|
|La fotocamera non si accende|Verificare che i contatti metallici del flat FPC siano inseriti a fondo rivolti verso il basso; controllare PWDN(IO12)/RESET(IO14)|
|WiFi non si connette|Inviare `wifi_reset` per ripristinare le impostazioni di fabbrica e riconfigurare|

## Prossimi passi

- 📖 [Manuale del protocollo seriale](./ESP32-NanoCam-Serial-Protocol.md) — riferimento completo dei comandi AT
- 🎓 [Programma del tutorial](./Ch01-Environment-Setup.md) — tutorial progressivo (11 capitoli inclusi in questa wiki)
- 🔧 [Specifiche hardware](./ESP32-NanoCam-Hardware-Spec.md) — mappatura completa dei pin GPIO
- 🤖 [Guida all'integrazione ROS2](/it/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop) — tutorial di teleoperazione wireless con micro-ROS

<RelatedProducts slugs="esp32-s3-wifi-module" />
