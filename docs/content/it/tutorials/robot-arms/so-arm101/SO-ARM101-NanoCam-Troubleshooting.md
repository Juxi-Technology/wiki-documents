---
title: "Risoluzione problemi di teleoperazione"
description: "Raccolta dei guasti più comuni della teleoperazione wireless SO-ARM101 (versione ESP32-NanoCam): sintomi, cause e soluzioni per flashing e porta seriale, fotocamera, audio, rete e micro-ROS."
---

# Risoluzione problemi di teleoperazione

> **[Acquista nel negozio](https://www.juxitech.com/it/products/so-arm101-developers-kit)**

Questa pagina raccoglie la risoluzione dei problemi più comuni della teleoperazione wireless SO-ARM101 versione ESP32-NanoCam. Per il flusso operativo completo vedere [SO-ARM101 Teleoperazione wireless (versione ESP32-NanoCam)](./SO-ARM101-NanoCam-Wireless-Teleop.md).

## Diagnostica rapida generale

| Sintomo | Verifica |
|---|---|
| Il flashing non si connette | Entrare manualmente in modalità download (BOOT+reset); aggiungere `upload_port` in `platformio.ini` |
| Nessun output seriale dopo il flashing | Controllare il cavo USB e il driver CH340; su Windows controllare la porta COM nel Gestione dispositivi |
| Bloccato su `Waiting for micro-ROS Agent...` | Controllare AGENT_IP / UDP 8888 / isolamento client |
| Nessuna risposta dal bus servomotori (`servo_mask≠0x3f`) | Verificare il collegamento a P2-7/P2-8 tramite la UART della scheda driver; alimentazione esterna 12V 5A del braccio follower |
| Livello del microfono sempre 0 | Controllare il log `audio: ES8311 ready`; pull-up su I2C 41/42; soffiare sul microfono per verificare |
| Altoparlante muto | Controllare il collegamento dell'altoparlante; registro del volume ES8311 `R_DAC32` (nel firmware attuale è già impostato al massimo 0xFF) |
| WiFi che cade spesso | Controllare antenna e distanza; il colore rosso del RGB indica perdita del WiFi, con riavvio automatico dopo 10s |

## Problemi di flashing e porta seriale

- **Il flashing non si connette**: tenere premuto il tasto BOOT (GPIO0) → inserire la USB (o premere reset) → rilasciare BOOT, poi rieseguire subito upload. Sotto Windows, se la seriale non viene riconosciuta automaticamente, aggiungere una riga `upload_port = COM3` in `[env:nano_cam]` di `platformio.ini` (sostituendo COM3 con il numero di porta COM reale del CH340 nel Gestione dispositivi).
- **Nessun output seriale dopo il flashing**: la USB della NanoCam è un CH340K → UART0; su Linux il nome del dispositivo è `/dev/ttyUSB0`; se non viene riconosciuta, controllare il cavo USB e il driver CH340 (incluso nel kernel).
- **Nessuna risposta dal bus servomotori (`servo_mask≠0x3f`)**: verificare che il bus servomotori sia collegato tramite la UART della scheda driver ai pin **P2-7/P2-8** (GPIO19/20) e non ai pin 43/44 della UART0; il braccio follower deve avere l'alimentazione esterna 12V 5A (la USB non regge 6 servomotori).
- **Confusione tra bus servomotori e seriale di debug**: la seriale di debug è la USB-C (CH340K → UART0), completamente indipendente dal bus servomotori; possono essere usate contemporaneamente.

## Problemi di compilazione e toolchain

- **Primo `pio run` lento/bloccato** (al primo avvio scarica in sequenza la piattaforma espressif32, la toolchain `toolchain-xtensa-esp32s3` di circa 100 MB e il framework Arduino di circa 200 MB): la stima del tempo rimanente di PlatformIO non è precisa, spesso resta ferma a lungo e poi salta di colpo; attendere 5 minuti osservando se la percentuale avanza; si può attivare un proxy/VPN (tramite il proxy di sistema);
- **Download manuale della toolchain**: dal browser scaricare `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` (su Linux il corrispondente `-linux-amd64.tar.gz`), dopo l'estrazione rinominare la directory in `toolchain-xtensa-esp32s3` e copiarla in `C:\Users\<用户名>\.platformio\packages\`, quindi rieseguire `pio run`; un'interruzione con Ctrl+C a metà non danneggia l'ambiente: rieseguendo, il download riprende da dove era rimasto;
- **Sotto Windows il comando `pio` non si trova in Git Bash**: usare un terminale PowerShell/CMD oppure aggiungere `C:\Users\<用户名>\.platformio\penv\Scripts` al PATH.

## Diagnostica specifica della fotocamera

| Sintomo | Causa | Soluzione |
|---|---|---|
| `i2c driver install error` + `camera probe failed` | **Conflitto I2C**: l'ES8311 usa `Wire1` occupando GPIO41/42; l'installazione del driver I2C da parte dell'SCCB della fotocamera viene rifiutata | Aggiungere `Wire1.end()` alla fine di `init()` in `audio_es8311.cpp` per liberare l'I2C alla fotocamera |
| `JPEG format is not supported on this sensor`(0x106) | **Il GC2145 non ha un encoder JPEG hardware** (presente solo su OV2640/OV5640) | Acquisire in `PIXFORMAT_RGB565` e codificare `/stream` e `/jpg` in JPEG via software con `frame2jpg` |
| `/jpg` e `/stream` non rispondono, il browser gira a vuoto | **Stack httpd esaurito**: lo stack predefinito di 8KB non basta per la codifica software `frame2jpg` | In `start_server()` impostare `config.stack_size = 16384` |
| `/stream` si apre ma lo schermo è nero | **Boundary multipart mancante**: senza `STREAM_BOUNDARY` tra i frame il browser non riesce a decodificarli | Inviare `STREAM_BOUNDARY` prima di ogni frame |
| curl su `/jpg` restituisce `HTTP:000`, ma il browser mostra l'immagine | esp_http_server è a **task singolo**: con `/stream` che occupa il task httpd, `/jpg` non viene servito; oppure timeout di curl troppo breve | Chiudere `/stream` e testare `/jpg` da solo; verificare con il browser invece che con curl |
| Fotocamera inizializzata ma tutto nero/nessun frame | Per lo più **hardware**: alimentazione AVDD/DOVDD, livello di PWDN, contatto del flat cable | Testare prima lo snapshot `/jpg` dal browser (se l'immagine appare, la catena funziona); controllare l'alimentazione 2.8V della fotocamera e il flat cable |
| Circa i 2/3 inferiori dell'immagine VGA sono corrotti | **Data rate DVP troppo alto**: il VGA RGB565 supera il margine di timing di campionamento del DVP di questa scheda (riprodotto con tutte le combinazioni 24/20/16MHz × buffer singolo/doppio); il QVGA è regolare | Usare **QVGA 320×240** come configurazione definitiva (sufficiente per l'FPV), oppure un XCLK più stabile / rivedere il routing hardware del DVP |

> Nota: i primi quattro casi della tabella sono già stati risolti nel firmware fornito; basta flashare il firmware più recente, senza modifiche manuali al codice.

**Attenzione**: esp_http_server è a task singolo, `/stream` e `/jpg` non sono accessibili contemporaneamente — con `/stream` aperto, `/jpg` resta in sospeso. Chiudere la pagina dello stream prima di catturare un singolo frame.

## Diagnostica specifica dell'audio

| Sintomo | Causa | Soluzione |
|---|---|---|
| Altoparlante **completamente muto** + livello del microfono ≈ 0 (es. `0.0009`) | **MCLK non emesso**: il driver I2S legacy su ESP32-S3 non genera MCLK; il DAC/ADC interno dell'ES8311 resta senza clock | Generare il MCLK a 6.15MHz su GPIO39 con il **LEDC** (`start_ledc_mclk()` in `audio_es8311.cpp`) |
| Tono di avviso **troppo debole** (udibile solo con l'orecchio incollato) | Ampiezza digitale bassa + volume master ES8311 basso | Ampiezza di `play_tone` da 12000 a 30000, `R_DAC32` da 0x30 a 0xFF (circa +29dB) |
| All'accensione si sente solo il "bip" di avvio, nessun altro tono | **Comportamento normale**: i toni di pronto/sblocco sono guidati da eventi e richiedono l'esecuzione della teleoperazione | Tono di avvio = riprodotto all'accensione; tono di pronto = alla connessione con l'Agent; tono di sblocco = alla ricezione di un comando di controllo |

> Nota: i primi due casi sono già stati risolti nel firmware fornito; il terzo è un comportamento normale e non richiede interventi.

## Controlli hardware di microfono, altoparlante e RGB

- **Livello del microfono sempre a 0**: controllare il log `audio: ES8311 ready`; verificare che il MCLK sia presente (su GPIO39 dovrebbero esserci ~1.65V, generati via LEDC); pull-up sul bus I2C 41/42 (10K già presenti sulla scheda); soffiare sul microfono e vedere se `/follower_audio/level` cambia.
- **Altoparlante muto**: verificare che l'altoparlante NS4150B sia collegato al connettore; verificare che il MCLK su GPIO39 sia presente (LEDC, `start_ledc_mclk()`); registro del volume `R_DAC32` (attualmente 0xFF); se l'ES8311 non è inizializzato, il log stampa il motivo dell'errore.
- **LED RGB spento**: il pin dati del WS2812 è GPIO18; controllare nel log di avvio se compare un errore di inizializzazione RMT prima di `camera_stream` (in genere no).

## Problemi di rete e micro-ROS

- **Bloccato su `Waiting for micro-ROS Agent...`**: verificare in ordine che `AGENT_IP` contenga l'IP LAN del PC Ubuntu, che UDP 8888 sia aperto e che il router/hotspot non abbia l'isolamento client attivo (va disattivato). L'antenna della NanoCam è l'antenna U.FL sul modulo; con RSSI scarso controllare prima l'antenna e la posizione, e fare test di distanza a 5/10/20/30 metri.
- **WiFi che cade spesso**: controllare antenna e distanza; il colore rosso del RGB indica perdita del WiFi; il firmware si riavvia automaticamente dopo il timeout di 10s.
- **Se non si riesce a connettersi, verificare prima l'ambiente**: la NanoCam e il PC Ubuntu devono essere nella stessa LAN a 2.4GHz (va bene anche l'hotspot dello smartphone); se si è cambiata rete, ricordarsi di aggiornare `AGENT_IP` e la configurazione WiFi (vedi la sezione "Configurazione del WiFi" del tutorial di teleoperazione wireless).

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
