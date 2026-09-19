---
title: Tutorial d'uso del tool di debug servo SCS0009
description: "Tool di debug FTServo progettato per il servo Feetech SCS0009 (feedback a potenziometro, risoluzione a 10 bit 0–1023); supporta connessione seriale."
---

# Tutorial d'uso del tool di debug servo SCS0009

> **[Acquista nel negozio](https://www.juxitech.com/it/products/feetech-scs0009-serial-bus-servo)**


**Il tool di debug del servo SCS0009** è un tool di debug FTServo progettato per il servo SCS0009 (feedback a potenziometro, risoluzione a 10 bit 0–1023) dei [servo bus Feetech](/it/products/feetech-servo). Tramite l'interfaccia grafica è possibile completare connessione seriale, scansione dei servo, lettura/scrittura dei parametri, controllo della posizione, modifica del baudrate, ripristino di fabbrica e backup/ripristino dei parametri xdat.

Questo tool è sviluppato e mantenuto da JUXI_Technology ed è pubblicato con licenza MIT. L'FT debugger, il backup/ripristino dei parametri xdat, il supporto multipiattaforma e altre funzionalità sono implementazioni proprie.

## Nota di compatibilità

> ⚠️ **Questo tool supporta attualmente solo il servo Feetech SCS0009 (serie SCS, feedback di posizione a potenziometro, risoluzione a 10 bit 0–1023)**. La tabella dei registri, il formato dei parametri xdat e la tabella dei baudrate sono progettati per il Feetech SCS0009; la compatibilità con servo di altre marche/modelli non è garantita.

## Funzionalità

| Caratteristica | Descrizione |
| ---- | ---- |
| Rilevamento automatico delle porte | Riconosce intelligentemente le porte seriali USB e filtra automaticamente i dispositivi virtuali |
| Supporto multipiattaforma | Compatibile con Windows / Ubuntu / macOS |
| Cambio cinese/inglese | Cambio con un clic tra cinese/inglese nell'interfaccia, selezione memorizzata automaticamente |
| Connessione seriale | Selezione manuale/automatica della porta, 8 livelli di baudrate (38400~1M) |
| Scansione dei servo | Rileva automaticamente i servo online (ID 1–254), visualizzazione in tempo reale |
| Lettura dei parametri | Legge tutti i 44 registri (EEPROM + SRAM) |
| Tabella dei parametri | Visualizzazione in 5 colonne (Indirizzo/Registro/Valore/Area di memoria/Lettura-Scrittura), selezione con aggiornamento automatico |
| Controllo della posizione | Controllo di posizione/velocità target; al termine del movimento suggerisce di disattivare la coppia |
| Modifica del baudrate | Modifica il baudrate del servo; in caso di errore rollback automatico |
| Ripristino di fabbrica | Ripristino con un clic delle impostazioni predefinite di fabbrica |
| Parametri xdat | Salva i parametri EEPROM del servo attuale / apre il backup per il ripristino |

## Panoramica dell'interfaccia

Il programma principale ha un layout a pannello singolo (FT debugger); se l'altezza della finestra è insufficiente compare automaticamente una barra di scorrimento, e a schermo massimizzato si adatta elasticamente:

```
┌─────────────────────────────────────────────────────────────┐
│  SCS0009 舵机调试工具                     [EN / English]     │  ← 顶栏
├─────────────────────────────────────────────────────────────┤
│  🔌 串口连接   [端口▾][🔄][波特率▾][连接] [🔴未连接]         │
│  🎯 舵机      [🔍扫描][舵机▾][读取参数][读取状态]            │
│               ┌ 扫描到的舵机列表 ┐                           │
│  📋 参数表    地址|寄存器|值|存储区域|读写  (44 个寄存器)      │
│  🎯 位置控制  目标位置|速度|移动|力矩开|力矩关 | 状态         │
│  🔧 波特率/恢复出厂  新波特率|修改波特率|恢复出厂            │
│  📁 xdat 参数(仅保存EEPROM) 保存当前舵机|打开xdat|恢复参数    │
│  📜 日志                                                      │
└─────────────────────────────────────────────────────────────┘
```

- **Barra superiore**: titolo dell'applicazione, pulsante di cambio lingua.
- **🔌 Connessione seriale**: selezione di porta e baudrate, connessione/disconnessione.
- **🎯 Servo**: scansione, selezione del servo, lettura di parametri/stato.
- **📋 Tabella dei parametri**: 44 registri in 5 colonne (Indirizzo/Registro/Valore/Area di memoria/Lettura-Scrittura); la selezione aggiorna automaticamente l'indirizzo di scrittura.
- **🎯 Controllo della posizione**: posizione/velocità target; al termine del movimento la barra di stato suggerisce di disattivare la coppia.
- **🔧 Baudrate/Ripristino di fabbrica**: modifica del baudrate (rollback in caso di errore), ripristino delle impostazioni di fabbrica.
- **📁 Parametri xdat (solo salvataggio EEPROM)**: salvataggio dei parametri del servo attuale, apertura del backup, ripristino.

## Installazione e avvio

Requisiti dell'ambiente:

| Dipendenza | Versione | Descrizione |
| ---- | ---- | ---- |
| Python | >= 3.8 | Si consiglia 3.10+, scaricabile da [python.org](https://www.python.org/downloads/) |
| PySide6 | >= 6.0 | Framework GUI |
| pyserial | >= 3.5 | Comunicazione seriale |
| Sistema | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+ supporta Apple Silicon / Intel |

Connessione hardware: collegare la scheda di controllo dei servo con un adattatore USB-seriale (come CH340 / CP2102) e alimentare i servo (per la versione standard si consigliano DC 5V 5A, per la versione Pro DC 12V 5A).

### Windows

1. Installare [Python 3.10+](https://www.python.org/downloads/) (durante l'installazione assicurarsi di spuntare **Add Python to PATH**, altrimenti la riga di comando non troverà `python`). Verificare l'installazione:

```bash
python --version
```

2. Creare un ambiente virtuale e installare le dipendenze:

```bash
cd SCS0009_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

> ⚠️ **L'ambiente virtuale va creato una sola volta**. Eseguire di nuovo `python -m venv .venv` reimposta/sovrascrive l'ambiente originale (cancellando le dipendenze installate); in seguito basta attivarlo ogni volta con `activate`.

> Suggerimento: dopo l'attivazione il prefisso della riga di comando mostrerà `(.venv)`.

3. Verificare l'ambiente e avviare:

```bash
python setup.py
python -m src.gui.factory_calibration_tool
```

Se si vede `[OK] 环境检查通过，可以运行项目`, l'ambiente è corretto.

4. Nel Gestione dispositivi (`Win+X` → Gestione dispositivi), nella voce «Porte (COM e LPT)» confermare il numero di porta:

```
端口 (COM 和 LPT)
  └─ USB-SERIAL CH340 (COM3)     ← 你的舵机串口
```

> **Annotare il numero COM** e selezionarlo dopo l'avvio; è anche possibile specificare manualmente la porta (quando la porta seriale è occupata):

```bash
python -m src.gui.factory_calibration_tool --port COM3
```

Visualizzare le porte disponibili:

```bash
python -m src.gui.factory_calibration_tool --list-ports
```

### Linux (Ubuntu / Debian)

1. Installare i font cinesi e le dipendenze (i font cinesi sono necessari per visualizzare l'interfaccia in cinese; i font emoji servono per le icone come ✅⚠️ nei log):

```bash
sudo apt install python3-venv fonts-noto-cjk fonts-noto-color-emoji
```

2. **⚠️ Aggiungere i permessi della porta seriale (gruppo dialout)【necessario】** (su Linux un utente normale non può accedere a `/dev/ttyUSB*` / `/dev/ttyACM*` per impostazione predefinita):

```bash
sudo usermod -a -G dialout $USER
# Effettivo dopo logout e nuovo login
```

Verifica (l'output deve contenere `dialout`):

```bash
groups
```

> Se non ha effetto: riavviare il computer; in alcune distribuzioni il nome del gruppo è `uucp` (Arch) o `tty`.

3. Creare l'ambiente virtuale, installare le dipendenze e avviare:

```bash
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **L'ambiente virtuale va creato una sola volta**. Eseguire di nuovo `python3 -m venv .venv` sovrascrive l'ambiente originale (cancellando le dipendenze installate); in seguito basta `source .venv/bin/activate` ogni volta.

> Se pip segnala l'errore externally managed environment, si può usare `pip install --break-system-packages -r requirements.txt`, oppure utilizzare un ambiente virtuale.

4. Identificare il dispositivo USB-seriale (dopo aver inserito l'adattatore):

```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Output tipico:

```
/dev/ttyUSB0   # CH340 / CP2102 / PL2303
/dev/ttyACM0   # Porta seriale USB nativa (integrata su Arduino / ESP32)
```

Visualizzare informazioni dettagliate sul produttore:

```bash
dmesg | tail -20 | grep -i tty
# Oppure
lsusb
```

> Con più dispositivi, l'assegnazione di `ttyUSB0` / `ttyUSB1` segue l'ordine di inserimento e potrebbe non essere stabile. Si consiglia di usare `/dev/ttyACM*` o di fissare il nome in base al produttore (vedi la sottosezione udev più avanti).

Specificare manualmente la porta:

```bash
python -m src.gui.factory_calibration_tool --port /dev/ttyUSB0
```

5. Opzionale: fissare il nome del dispositivo con udev (per evitare che la numerazione cambi dopo inserimenti/rimozioni). Creare `/etc/udev/rules.d/99-servo.rules` e fissare in base all'ID USB:

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", SYMLINK+="ttyServo"
```

Dopodiché `ls -l /dev/ttyServo` permette di accedere con il nome fisso; per l'ID del produttore usare `lsusb`.

### macOS

1. Installare Python con Homebrew (per evitare che la versione di Python preinstallata dal sistema sia troppo vecchia):

```bash
# Installa Homebrew (se non presente)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installa Python
brew install python
```

Verifica:

```bash
python3 --version
```

2. Creare l'ambiente virtuale, installare le dipendenze e avviare (attivare con `source`, non con `.bat`):

```bash
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **L'ambiente virtuale va creato una sola volta**. Eseguire di nuovo `python3 -m venv .venv` sovrascrive l'ambiente originale (cancellando le dipendenze installate); in seguito basta `source .venv/bin/activate` ogni volta.

3. **⚠️ Denominazione delle porte seriali**: macOS mette i dispositivi USB-seriale sotto `/dev`, con **due schemi di denominazione**:

| Prefisso | Significato | Utilizzabile |
| ---- | ---- | -------- |
| `/dev/tty.usbserial-*` | Stile modem (bloccante) | Può bloccarsi, sconsigliato |
| `/dev/cu.usbserial-*` | Stile callout/terminale (**non bloccante**) | ✅ consigliato |

Visualizzare il nome della propria porta seriale:

```bash
ls /dev/cu.*
```

Output tipico:

```
/dev/cu.usbserial-0001      # CP2102 / FTDI
/dev/cu.usbmodem141101      # Porta seriale USB integrata (Arduino / ESP32)
/dev/cu.wchusbserial1420    # CH340
```

> Il programma seleziona automaticamente con priorità i dispositivi `cu.*`; per specificare manualmente la porta usare `cu.` e non `tty.`.

Specificare manualmente la porta:

```bash
python -m src.gui.factory_calibration_tool --port /dev/cu.usbserial-0001
```

4. Driver USB: la maggior parte dei chip comuni (CH340, CP2102, FTDI) ha driver integrati in macOS e funziona plug-and-play. Se il dispositivo non viene riconosciuto:

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**: i lotti più vecchi richiedono l'installazione del driver ufficiale WCH;
- in generale è sufficiente che `ls /dev/cu.*` mostri il dispositivo.

5. Suggerimenti d'uso:
   - **Il nome della porta seriale cambia**: dopo inserimenti/rimozioni su porte USB diverse il nome `cu.*` può cambiare; basta selezionarlo ogni volta nell'area «🔌 Connessione seriale» all'avvio.
   - **Risparmio energetico**: macOS può andare in sospensione e far cadere la connessione seriale; durante l'uso mantenere il risveglio o aumentare il tempo di sospensione.
   - **Permessi di privacy**: al primo avvio, se viene richiesto di «accedere a un disco rimovibile», fare clic su Consenti.

## Procedura d'uso

### 1. Connessione e riconoscimento dei servo

1. Collegare la scheda di controllo dei servo tramite l'adattatore USB-seriale e alimentare i servo.
2. Aprire la GUI, nell'area «🔌 Connessione seriale» selezionare la porta (o fare clic su `🔄` per aggiornare) e impostare il baudrate (default 1M).
3. Fare clic su **Connetti**; lo stato mostra `🟢 Connesso`.

> Se viene segnalato che la porta seriale è occupata, verificare che nessun altro programma (monitor seriale, tool precedente non chiuso) stia occupando quella porta.

> Se è disponibile una sola porta seriale, lo strumento imposta automaticamente la seconda porta su «disattivata».

### 2. Scansione dei servo

1. Fare clic su **🔍 Scansione servo** per rilevare i servo online nell'intervallo di ID 1–254.
2. I risultati della scansione vengono mostrati in tempo reale nell'elenco dei servo (con il modello).
3. Facendo clic su una riga dell'elenco dei servo, questa viene inserita automaticamente nel menu a tendina «Servo».

### 3. Lettura dei parametri

1. Dopo aver selezionato il servo, fare clic su **📖 Leggi parametri** per leggere uno per uno tutti i 44 registri.
2. La tabella dei parametri mostra 5 colonne (Indirizzo/Registro/Valore/Area di memoria/Lettura-Scrittura); EPROM / SRAM / DEFAULT sono distinti da colori diversi.
3. L'area del log mostra il risultato della lettura di ogni registro e la causa degli errori.

Per il significato di ciascun registro fare riferimento a [Analisi della tabella di memoria del servo SCSCL a potenziometro](./Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis.md).

### 4. Modifica dei parametri / scrittura

1. Nella tabella dei parametri fare clic sulla riga del registro da modificare → vengono aggiornati automaticamente «Indirizzo di scrittura», «Lunghezza» e «Valore».
2. Nel campo «Valore» inserire il nuovo valore e fare clic su **✏️ Scrivi**.
3. Il programma esegue: sblocco dell'EEPROM → scrittura → nuovo blocco.
4. Finestra di esito della scrittura: in caso di successo appare un avviso verde «✅ Scrittura riuscita», in caso di errore un avviso rosso «❌ Scrittura fallita» (con la causa).

### 5. Modifica dell'ID del servo

1. Nella tabella dei parametri individuare la riga «ID del servo» (indirizzo 0x05) e selezionarla.
2. Modificare «Valore» con il nuovo ID e fare clic su **✏️ Scrivi**.
3. Il programma esegue: sblocco → scrittura all'indirizzo 5 → nuovo blocco.

> ⚠️ Prima di modificare l'ID assicurarsi che sul bus ci sia solo questo servo, per evitare conflitti di ID.

### 6. Controllo della posizione

1. Nell'area «🎯 Controllo della posizione», **trascinare lo slider** per regolare la posizione target (0–1023, risoluzione a 10 bit del potenziometro); il campo numerico si aggiorna in modo sincronizzato; è anche possibile digitare direttamente nel campo numerico e lo slider segue in modo sincronizzato.
2. Fare clic su **▶ Muovi**; il servo inizia a muoversi e la barra di stato mostra «In movimento...».
3. Al termine del movimento appare «✅ Movimento completato, disattivare la coppia»; fare clic su **⏹ Disattiva coppia**.

### 7. Modifica del baudrate / ripristino delle impostazioni di fabbrica

- **Modifica del baudrate**: nell'area «🔧 Baudrate/Ripristino di fabbrica» selezionare il nuovo baudrate (38400 – 1000000 bps) e fare clic su **🔧 Modifica baudrate**. Dopo la scrittura il tool cambia automaticamente il baudrate della porta seriale e verifica con un ping; in caso di errore esegue il rollback automatico.
- **Ripristino delle impostazioni di fabbrica**: fare clic su **🔄 Ripristino di fabbrica**; il servo torna ai valori predefiniti di fabbrica (ID=1, baudrate=1000000); dopo occorre rieseguire la scansione.

### 8. Backup e ripristino dei parametri xdat

Nell'area «📁 Parametri xdat (solo salvataggio EEPROM)»:

1. **💾 Salva servo attuale**: salva i parametri EEPROM del servo attualmente selezionato in un file xdat (backup).
2. Dopo aver modificato liberamente i parametri del servo, per ripristinare:
3. **📂 Apri xdat**: carica il file di backup.
4. **📤 Ripristina parametri sul servo**: riscrive il backup nell'EEPROM del servo attuale.

## Avvertenze

1. **La sicurezza prima di tutto**: la scrittura dei parametri persiste sull'EEPROM. Prima di scrivere, assicurarsi che l'alimentazione sia stabile e che il braccio robotico non possa urtare persone o oggetti.
2. **Alimentazione**: per SoARM 101 versione standard si consiglia DC 5V 5A, per la versione Pro DC 12V 5A. Un'alimentazione insufficiente può causare perdita di passi o errori di comunicazione dei servo.
3. **Accesso esclusivo alla porta seriale**: in Windows la porta seriale è esclusiva del programma; la stessa porta non può essere occupata contemporaneamente da due programmi. Non usare questo tool mentre un altro programma (monitor seriale) ha aperto la stessa porta.
4. **Permessi della porta seriale su Linux**: per accedere a `/dev/ttyUSB*` / `/dev/ttyACM*` occorre aggiungere l'utente al gruppo `dialout` (vedi la sottosezione «Linux» sopra).
5. **Denominazione delle porte seriali su macOS**: usare `/dev/cu.*` (non bloccante) e non `/dev/tty.*` (bloccante, può bloccarsi); vedi la sottosezione «macOS» sopra.
6. **Hot-plug**: dopo aver rimosso l'USB il programma tenta la riconnessione automatica; dopo averlo reinserito fare clic su `🔄` per aggiornare l'elenco delle porte.
7. **Protezione da sovratemperatura / sovratensione**: il programma monitora tensione e temperatura (allarme se temperatura > 60°C). Se il servo si surriscalda a lungo, fermarsi e far raffreddare.
8. **La scrittura dei parametri è irreversibile**: dopo la scrittura sull'EEPROM il valore originale viene sovrascritto e non è possibile annullare. Si consiglia di fare prima un backup con «xdat – Salva servo attuale» e poi modificare.
9. **Rischio nella modifica dell'ID**: in caso di errore di scrittura o di verifica il programma segnala un errore, ma in casi estremi il servo può «perdere il contatto». In tal caso si può provare il «ripristino delle impostazioni di fabbrica» (dopo il reset l'ID torna a 1).
10. **Problemi di codifica**: se nella console di Windows gli emoji appaiono come caratteri illeggibili, impostare `PYTHONIOENCODING=utf-8` e riavviare lo strumento da riga di comando. Su Linux / macOS con UTF-8 nativo di solito non si presenta.

## Risoluzione dei problemi

| Sintomo | Possibile causa | Soluzione |
| ---- | -------- | -------- |
| Impossibile aprire la porta seriale / porta occupata | Occupata da un altro programma | Chiudere programmi come i monitor seriali, oppure cambiare porta e riavviare il tool |
| In Windows l'apertura della porta seriale restituisce PermissionError | Un altro processo occupa quella porta COM | Assicurarsi che nessun altro processo occupi quella porta COM |
| I servo non vengono rilevati | Alimentazione insufficiente / cablaggio errato / baudrate non corrispondente | Controllare alimentazione e cablaggio; verificare che i servo siano a 1M di baudrate |
| Lettura dei parametri non riuscita | Porta seriale occupata / servo non risponde | Chiudere gli altri programmi; riconnettersi; verificare che l'indirizzo sia corretto |
| Scrittura non riuscita | Alimentazione del servo insufficiente o registro di destinazione non scrivibile | Controllare alimentazione e connessione del servo; verificare che il registro di destinazione sia scrivibile |
| Aumento rapido della temperatura | Carico eccessivo o stallo | Controllare che il meccanismo non sia bloccato, ridurre velocità/accelerazione |
| Dopo la modifica dell'ID il servo non si trova più | Conflitto di ID o scrittura fallita | Ripristinare le impostazioni di fabbrica e rieseguire la scansione |
| In Windows la porta seriale non si trova | Driver mancante | Controllare il driver nel Gestione dispositivi; cambiare porta USB; installare il driver CH340 |
| In Linux la porta seriale non si trova | Dispositivo non riconosciuto | `ls /dev/ttyUSB* /dev/ttyACM*`; confermare il dispositivo con `lsusb` |
| Permission denied: /dev/ttyUSB0 | Utente non nel gruppo dialout | Eseguire `sudo usermod -a -G dialout $USER` e riconnettersi; oppure `sudo chmod 666 /dev/ttyUSB0` (temporaneo) |
| Il nome del dispositivo Linux cambia | L'ordine di inserimento influisce sulla numerazione ttyUSB | Fissare con una regola udev (vedi la sottosezione «Linux» sopra) o selezionare a ogni avvio |
| In macOS il nome della porta con `tty.` si blocca | È stato usato il nome bloccante | Usare il dispositivo con prefisso `cu.` |
| In macOS il dispositivo non si trova | Dispositivo non riconosciuto | `ls /dev/cu.*`; reinserire l'USB; usare `system_profiler SPUSBDataType` |
| Problemi di permessi in macOS | Controllo di accesso di sistema | Di norma non servono permessi aggiuntivi; se appare il controllo di accesso, consentire l'accesso al terminale |
| Interfaccia cinese vuota | Font cinesi mancanti | Su Windows, Microsoft YaHei per impostazione predefinita (installare un font cinese in caso di anomalie); installare `fonts-noto-cjk` su Linux; su macOS, PingFang per impostazione predefinita (installare Noto Sans CJK in caso di anomalie) |
| Gli emoji appaiono come quadrati | Font emoji mancante | Installare `fonts-noto-color-emoji` |
| Installazione pip non riuscita | Python di sistema protetto (externally managed environment) | Usare un ambiente virtuale; oppure `pip install --break-system-packages -r requirements.txt` |
| Il programma non si avvia | Dipendenze mancanti o versione non corrispondente | Verificare la versione con `python3 --version`; controllare le dipendenze con `pip list` |
| Attivazione dell'ambiente virtuale macOS non riuscita | Script di attivazione errato | Usare `source .venv/bin/activate` (non `.bat`) |
| Errore di compilazione su macOS Apple Silicon | Python vecchio sotto Rosetta | Usare Python 3.10+ (supporto nativo Apple Silicon) |

## Struttura delle directory

```
SCS0009_ServoController/
├── docs/                    # Tutorial per sottosistema (cinese e inglese)
│   ├── zh/                  # Tutorial in cinese
│   │   ├── Windows教程.md
│   │   ├── Linux教程.md
│   │   └── macOS教程.md
│   └── en/                  # Tutorial in inglese
│       ├── Windows.md
│       ├── Linux.md
│       └── macOS.md
├── src/
│   ├── gui/                  # Interfaccia grafica PySide6
│   │   ├── factory_calibration_tool.py   # Finestra principale (debugger FT + cambio lingua)
│   │   ├── ft_debugger.py                # Pannello del debugger FT (lettura/scrittura dei parametri / backup xdat)
│   │   ├── theme_utils.py                # Tema chiaro
│   │   └── language_dialog.py            # Finestra di selezione della lingua
│   ├── xdat_utils.py         # Lettura/scrittura dei file di parametri xdat
│   ├── i18n*.py / i18n_translations/     # Internazionalizzazione cinese/inglese
│   └── port_utils.py         # Rilevamento della porta seriale
├── scservo_sdk/              # SDK di comunicazione per servomotori FTServo
├── requirements.txt
└── setup.py                  # Script di verifica dell'ambiente
```

Questo repository del tool è composto dai moduli `src/gui` (interfaccia grafica PySide6 e FT debugger), `scservo_sdk` (SDK di comunicazione per servo FTServo) e `setup.py` (script di verifica dell'ambiente).

<RelatedProducts slugs="feetech-servo" />
