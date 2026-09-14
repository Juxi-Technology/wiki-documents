---
title: "Capitolo 1: Configurazione dell'ambiente"
description: "Tutorial ESP32-NanoCam capitolo 1: installare il driver seriale CH340K, padroneggiare il flashing via web con esptool-js, da riga di comando con esptool, l'ambiente di sviluppo ESP-IDF e l'installazione con ESP-EIM-GUI (4 metodi), e completare la registrazione dell'account sul server xiaozhi.me."
---

# Capitolo 1: Configurazione dell'ambiente

> **[Acquista nel negozio](https://www.juxitech.com/it/products/esp32-s3-wifi-video-module)**

**Obiettivo del capitolo**: preparare l'ambiente di flashing del firmware e l'ambiente server, come base per tutti i capitoli pratici successivi.

## 1.1 Ambiente di flashing del firmware

### Metodo A: senza ambiente di sviluppo (consigliato ai principianti)

1. Installare il [driver seriale CH340K](https://www.wch.cn/download/CH341SER_EXE.html)

2. Aprire il browser → [esptool-js](https://espressif.github.io/esptool-js/)

3. Collegare NanoCam, selezionare la porta seriale, selezionare il file firmware .bin

4. Cliccare su Program per flashare

### Metodo B: riga di comando

```Bash
pip install esptool
esptool.py --chip esp32s3 --port COM_x write_flash 0x0 nanocam_xxx.bin
```

### Metodo C: ambiente di sviluppo ESP-IDF (avanzato)

1. Installare VSCode + l'estensione ESP-IDF

2. F1 → `ESP-IDF: Configure ESP-IDF Extension`

3. Selezionare o installare ESP-IDF v5.4+

4. Compilare: `idf.py build flash monitor`

### Metodo D: installazione con ESP-EIM-GUI

1. Scaricare dal sito ufficiale [https://dl.espressif.cn/dl/eim/](https://dl.espressif.cn/dl/eim/)

2. Dopo il download, fare doppio clic per entrare nella pagina EIM; in alto a destra si può passare alla versione in cinese

3. Cliccare su Avvia installazione

4. Al passaggio successivo scegliere l'installazione personalizzata

5. Prima di procedere è necessario aver installato `git` e `python3.12.x` (sorgente di download di git per la Cina:[CNPM Binaries Mirror](https://registry.npmmirror.com/binary.html?path=git-for-windows/v2.55.0.windows.3/))

6. Selezionare esp32s3 come dispositivo di destinazione

7. Per la versione di ESP-IDF qui bisogna selezionare «显示旧稳定版本» (mostra le versioni stabili precedenti), scorrere verso il basso e scegliere la versione v5.4.1

8. Per il mirror di download lasciare invariato, passare al passaggio successivo

9. Nella selezione delle funzionalità ESP-IDF si consiglia di selezionare tutto, continuare al passaggio successivo

10. Nella selezione degli strumenti passare al successivo, poi scegliere la posizione in cui installare e attendere il completamento
Dopo l'installazione questa versione presenta un problema di estrazione: individuare la directory C:\Espressif\dist\xtensa-esp-elf-14.2.0_20241119-x86_64-w64-mingw32.zip, copiare l'archivio in C:\Espressif\tools\xtensa-esp-elf, dopo l'estrazione trovare la cartella xtensa-esp-elf e sostituire la cartella presente nella directory C:\Espressif\tools\xtensa-esp-elf\esp-14.2.0_20241119: così la compilazione riuscirà

## 1.2 Ambiente server

### Servizio ufficiale xiaozhi.me (gratuito)

1. Visitare [xiaozhi.me](https://xiaozhi.me) e registrare un account

2. Entrare nella console

3. Dopo la connessione alla rete il modulo annuncia un codice di verifica a 6 cifre

4. Cliccare su Aggiungi dispositivo a destra della sezione «智能体» (Agenti)

5. Inserire il codice di verifica a 6 cifre annunciato

6. Dopo aver associato il dispositivo si può iniziare a conversare

Capitolo successivo: [Capitolo 2: Avvio rapido](./Ch02-Quick-Start.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
