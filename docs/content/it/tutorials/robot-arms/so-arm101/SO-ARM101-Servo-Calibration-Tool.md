---
title: Tutorial d'uso del tool di calibrazione servo della serie SoARM
description: "Tool di calibrazione di fabbrica e di calibrazione LeRobot per servo FTServo dei bracci robotici della serie SoARM 10X; supporta la calibrazione mediana."
---

# Tutorial d'uso del tool di calibrazione servo della serie SoARM

> **[Acquista nel negozio](https://www.juxitech.com/it/products/so-arm101-developers-kit)**


**Il tool di calibrazione della serie SoARM** è un kit di strumenti per la calibrazione di fabbrica e la calibrazione LeRobot dei servo FTServo, progettato per i bracci robotici della serie SoARM 10X (come il [kit di sviluppo SO-ARM101](/it/products/so-arm101)). Tramite l'interfaccia grafica è possibile completare la calibrazione mediana dei servo, il controllo del singolo servo, la lettura/scrittura dei parametri, il backup/ripristino dei parametri xdat, la teleoperazione sincronizzata a doppia porta e altre operazioni, e supporta la generazione di file di calibrazione JSON in formato LeRobot. Per l'assemblaggio del braccio robotico e l'installazione dei servo fare prima riferimento al [Tutorial di assemblaggio del braccio robotico LeRobot](./SO-ARM101-Assembly.md).

Questo tool è basato su modifiche e aggiornamenti del progetto [Seeed_RoboController di Seeed Studio](https://github.com/Seeed-Studio), pubblicato con licenza MIT. Mantenendo le funzionalità principali originali, questo progetto ha ristrutturato l'interfaccia GUI e aggiunto l'FT debugger, il backup/ripristino dei parametri xdat, il supporto multipiattaforma e altre funzionalità avanzate.

## Nota di compatibilità

> ⚠️ **Questo tool supporta attualmente solo i servo Feetech (serie STS3215)**. La tabella dei registri, il formato dei parametri xdat e la tabella dei baudrate sono progettati per la serie STS3215 di Feetech; la compatibilità con servo di altre marche/modelli non è garantita.

## Funzionalità

| Caratteristica | Descrizione |
| ---- | ---- |
| Rilevamento automatico delle porte | Riconosce intelligentemente le porte seriali USB e filtra automaticamente i dispositivi virtuali |
| Supporto multipiattaforma | Compatibile con Windows / Ubuntu / macOS |
| Sincronizzazione a doppia porta | Due porte seriali (sinistra e destra) con operatività indipendente; supporta la teleoperazione sincronizzata master-slave |
| Cambio cinese/inglese | Cambio con un clic tra cinese/inglese nell'interfaccia, selezione memorizzata automaticamente |
| Calibrazione mediana | Scrive la posizione attuale del servo come posizione mediana 2048 (persistente in EEPROM) |
| Test della posizione mediana | Attiva la coppia e porta i servo alla posizione mediana per verificare il risultato della calibrazione |
| Disattivazione dei motori | Con un clic disattiva la coppia di tutti i servo per facilitare le regolazioni manuali |
| Scansione automatica | Rileva automaticamente tutti i servo online nell'intervallo di ID 1–20 |
| Controllo del singolo servo | Slider per controllare in tempo reale posizione e coppia di un singolo servo |
| FT debugger | Connessione seriale, scansione, lettura/scrittura dei parametri, controllo della posizione, modifica del baudrate, ripristino di fabbrica, backup dei parametri xdat |
| Parametri xdat | Salva i parametri EEPROM del servo attuale / apre il backup per il ripristino |
| Calibrazione LeRobot | Genera file di calibrazione JSON in formato LeRobot |
| Esecuzione mediana da file di calibrazione | Porta il braccio robotico alla posizione mediana in base al file di calibrazione |

## Panoramica dell'interfaccia

Il programma principale comprende tre schede:

```
┌─────────────────────────────────────────────────────────────┐
│  SoARM 系列校准工具         [串口1▾] [串口2▾] [🔄]  [🎮遥控][EN]│  ← 顶栏
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┬──────────────────────────────┐ │
│  │ 串口1 - 舵机标定        │ 串口2 - 舵机标定            │ │
│  │  [🔴未连接] 当前舵机:…   │  [🔴未连接] 当前舵机:…      │ │
│  │  舵机1~6 状态表格        │  舵机1~6 状态表格           │ │
│  │  [中位校准][中位测试]…   │  [中位校准][中位测试]…      │ │
│  └─────────────────────────┴──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

- **Barra superiore**: titolo dell'applicazione, menu a tendina per la selezione delle porte seriali, pulsante di aggiornamento, pulsante di teleoperazione, pulsante di cambio lingua.
- **🦾 Tab1 Calibrazione servo**: operazioni rapide dei pannelli sinistro e destro (calibrazione mediana, test della posizione mediana, disattivazione dei motori) e stato in tempo reale.
- **🎚️ Tab2 Controllo singolo servo**: per ogni servo online, slider per mettere a punto la posizione e interruttore di coppia.
- **🔬 Tab3 FT debugger**: connessione seriale, scansione, lettura/scrittura dei parametri (56 registri), controllo della posizione, baudrate/ripristino di fabbrica, backup/ripristino dei parametri xdat.

## Installazione e avvio

Requisiti dell'ambiente:

| Dipendenza | Versione | Descrizione |
| ---- | ---- | ---- |
| Python | >= 3.8 | Si consiglia 3.10+, scaricabile da [python.org](https://www.python.org/downloads/) |
| PySide6 | >= 6.0 | Framework GUI |
| pyserial | >= 3.5 | Comunicazione seriale |
| Sistema | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+ supporta Apple Silicon / Intel |

Connessione hardware: collegare la scheda di controllo del braccio robotico con un adattatore USB-seriale (come CH340 / CP2102) e alimentare i servo (per la versione standard si consigliano DC 5V 5A, per la versione Pro DC 12V 5A).

### Windows

1. Installare [Python 3.10+](https://www.python.org/downloads/) (durante l'installazione assicurarsi di spuntare **Add Python to PATH**, altrimenti la riga di comando non troverà `python`). Verificare l'installazione:

```bash
python --version
```

2. Creare un ambiente virtuale e installare le dipendenze:

```bash
cd Juxi_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

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

> **Annotare il numero COM** e selezionarlo dalla barra superiore dopo l'avvio; è anche possibile specificare manualmente la porta (quando la porta seriale è occupata):

```bash
python -m src.gui.factory_calibration_tool --port1 COM3 --port2 COM4
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
# 注销并重新登录后生效
```

Verifica (l'output deve contenere `dialout`):

```bash
groups
```

> Se non ha effetto: riavviare il computer; in alcune distribuzioni il nome del gruppo è `uucp` (Arch) o `tty`.

3. Creare l'ambiente virtuale, installare le dipendenze e avviare:

```bash
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> Se pip segnala l'errore externally managed environment, si può usare `pip install --break-system-packages -r requirements.txt`, oppure utilizzare un ambiente virtuale.

4. Identificare il dispositivo USB-seriale (dopo aver inserito l'adattatore):

```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Output tipico:

```
/dev/ttyUSB0   # CH340 / CP2102 / PL2303
/dev/ttyACM0   # 原生 USB 串口（Arduino / ESP32 板载）
```

Visualizzare informazioni dettagliate sul produttore:

```bash
dmesg | tail -20 | grep -i tty
# 或
lsusb
```

> Con più dispositivi, l'assegnazione di `ttyUSB0` / `ttyUSB1` segue l'ordine di inserimento e potrebbe non essere stabile. Si consiglia di usare `/dev/ttyACM*` o di fissare il nome in base al produttore (vedi la sottosezione udev più avanti).

Specificare manualmente la porta:

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/ttyUSB0 --port2 /dev/ttyUSB1
```

> Se c'è una sola porta seriale, il tool imposta automaticamente la seconda porta su «disabilitata».

5. Opzionale: fissare il nome del dispositivo con udev (per evitare che la numerazione cambi dopo inserimenti/rimozioni). Creare `/etc/udev/rules.d/99-servo.rules` e fissare in base all'ID USB:

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", SYMLINK+="ttyServo"
```

Dopodiché `ls -l /dev/ttyServo` permette di accedere con il nome fisso; per l'ID del produttore usare `lsusb`.

### macOS

1. Installare Python con Homebrew (per evitare che la versione di Python preinstallata dal sistema sia troppo vecchia):

```bash
# 安装 Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python
```

Verifica:

```bash
python3 --version
```

2. Creare l'ambiente virtuale, installare le dipendenze e avviare (attivare con `source`, non con `.bat`):

```bash
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

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
/dev/cu.usbmodem141101      # 板载 USB 串口（Arduino / ESP32）
/dev/cu.wchusbserial1420    # CH340
```

> Il programma seleziona automaticamente con priorità i dispositivi `cu.*`; per specificare manualmente la porta usare `cu.` e non `tty.`.

Specificare manualmente la porta:

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/cu.usbserial-0001 --port2 /dev/cu.usbmodem141101
```

4. Driver USB: la maggior parte dei chip comuni (CH340, CP2102, FTDI) ha driver integrati in macOS e funziona plug-and-play. Se il dispositivo non viene riconosciuto:

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**: i lotti più vecchi richiedono l'installazione del driver ufficiale WCH;
- in generale è sufficiente che `ls /dev/cu.*` mostri il dispositivo.

5. Suggerimenti d'uso:
   - **Il nome della porta seriale cambia**: dopo inserimenti/rimozioni su porte USB diverse il nome `cu.*` può cambiare; basta selezionarlo ogni volta dal menu a tendina della barra superiore all'avvio.
   - **Risparmio energetico**: macOS può andare in sospensione e far cadere la connessione seriale; durante l'uso mantenere il risveglio o aumentare il tempo di sospensione.
   - **Permessi di privacy**: al primo avvio, se viene richiesto di «accedere a un disco rimovibile», fare clic su Consenti.

## Procedura d'uso

### 1. Connessione e riconoscimento dei servo

1. Collegare la scheda di controllo del braccio robotico tramite l'adattatore USB-seriale e alimentare i servo.
2. Aprire la GUI e selezionare la porta corrispondente dal menu a tendina della barra superiore (o fare clic su `🔄` per aggiornare).
3. La parte superiore del pannello mostra `🟢 已连接` e rileva automaticamente i servo online nell'intervallo di ID 1–20 (di solito 1–6).

> Se viene segnalato che la porta seriale è occupata, verificare che nessun altro programma (monitor seriale, tool precedente non chiuso) stia occupando quella porta.

### 2. Calibrazione mediana (impostare la posizione attuale su 2048)

> Prima della calibrazione, posizionare fisicamente il braccio robotico in modo che ogni giunto si trovi nella «posizione zero / mediana» desiderata.

1. Fare clic sul pulsante **Calibrazione mediana porta X** del pannello.
2. Il programma disattiva prima i servo e chiede di regolarli manualmente alla posizione mediana desiderata.
3. Dopo la conferma, il programma esegue per ogni servo: sblocco dell'EEPROM → scrittura del comando di calibrazione (valore 128 all'indirizzo 40) → nuovo blocco dell'EEPROM.
4. Dopo la calibrazione si può verificare con il «test della posizione mediana»: se i servo restano in posizione (spostamento minimo) la calibrazione è riuscita.

### 3. Test della posizione mediana

1. Fare clic su **Test posizione mediana porta X**.
2. Il programma attiva la coppia e porta tutti i servo a 2048.
3. Se i servo non si muovono quasi dalla posizione attuale, la calibrazione è corretta; se si spostano molto, il valore di calibrazione non è affidabile e occorre ricalibrare.

### 4. Disattivazione dei motori (regolazione manuale)

- Fare clic su **Disattivazione motori porta X** per disattivare la coppia di tutti i servo di quella porta e poterli ruotare liberamente a mano.
- Il singolo servo può essere attivato/disattivato singolarmente nella pagina **Controllo singolo servo** tramite l'interruttore di coppia sotto lo slider.

### 5. Controllo del singolo servo (Tab2)

1. Nella pagina **🎚️ Controllo singolo servo**, ogni servo online ha uno slider di posizione e un interruttore di coppia.
2. **Trascinare lo slider → al rilascio**, il servo si muove alla posizione target.
3. L'interruttore di coppia sotto lo slider può attivare/disattivare singolarmente la coppia di quel servo.

### 6. FT debugger (lettura/scrittura dei parametri e controllo della posizione)

Nella pagina **🔬 FT debugger**:

1. **Connessione seriale**: selezionare porta e baudrate (default 1M); dopo la connessione **Scansione servo** rileva i servo online.
2. **Lettura parametri**: legge tutti i registri (EEPROM + SRAM).
3. **Tabella parametri**: mostra in 5 colonne tutti i 56 registri; facendo clic su una riga si aggiorna automaticamente l'«Indirizzo di scrittura».
4. **Controllo della posizione**: impostare posizione/velocità target ed eseguire; al termine del movimento viene suggerito di disattivare la coppia.
5. La modifica del baudrate, il ripristino di fabbrica e il backup/ripristino dei parametri xdat sono descritti nelle sezioni seguenti.

### 7. Modifica dell'ID del servo

1. Entrare nella pagina **🔬 FT debugger**, connettere la porta seriale e scansionare i servo.
2. Selezionare il servo desiderato, nella tabella dei parametri modificare il valore di «ID del servo» (indirizzo 0x05) e fare clic su scrivi.
3. Il programma esegue: sblocco → scrittura all'indirizzo 5 → verifica del nuovo ID → nuovo blocco.

> ⚠️ Prima di modificare l'ID assicurarsi che sul bus ci sia solo questo servo, per evitare conflitti di ID.

### 8. Modifica del baudrate / ripristino delle impostazioni di fabbrica

- **Modifica del baudrate**: nella sezione «Baudrate / Ripristino di fabbrica» della pagina FT debugger, selezionare il nuovo baudrate (38400 – 1000000 bps) e applicare la modifica. Dopo la scrittura il tool cambia automaticamente il baudrate della porta seriale e verifica con un ping; in caso di errore esegue il rollback automatico.
- **Ripristino delle impostazioni di fabbrica**: il servo torna ai valori predefiniti di fabbrica (ID=1, baudrate=1000000); dopo occorre rieseguire la scansione.

### 9. Backup e ripristino dei parametri xdat

Nell'area «Parametri xdat (solo salvataggio EEPROM)» della pagina FT debugger:

1. **💾 Salva servo attuale**: salva i parametri EEPROM del servo attualmente selezionato in un file xdat (backup).
2. Dopo aver modificato liberamente i parametri del servo, per ripristinare:
3. **📂 Apri xdat**: carica il file di backup.
4. **📤 Ripristina parametri sul servo**: riscrive il backup nell'EEPROM del servo attuale.

### 10. Teleoperazione sincronizzata a doppia porta

> ⚠️ **Direzione: la porta seriale 1 controlla la porta seriale 2**. La porta seriale 1 (master) legge solo gli angoli dei servo; la porta seriale 2 (slave) viene controllata in modo sincronizzato.

1. Nella barra superiore fare clic su **🎮 Teleoperazione** (la porta seriale 1 legge gli angoli → la porta seriale 2 controlla in modo sincronizzato i servo con lo stesso ID).
2. Gli ID dei servo delle due porte devono coincidere; vengono sincronizzati solo i servo presenti in entrambe.
3. Fare nuovamente clic sullo stesso pulsante per fermare; poi i thread di scansione dei pannelli sinistro e destro riprendono automaticamente.

### 11. Calibrazione LeRobot (riga di comando)

```bash
# 校准从动臂（保存到 ~/.cache/huggingface/lerobot/calibration/robots/so_follower/）
python -m src.tools.lerobot_calibrate --arm-type follower

# 校准领导臂
python -m src.tools.lerobot_calibrate --arm-type leader
```

Procedimento: disattivare i servo → portare ogni giunto alla posizione mediana e registrare `homing_offset` → ruotare lentamente su tutta la corsa e registrare `range_min/max` (`wrist_roll` è un giunto a rotazione continua, il range è fisso `[0,4095]`) → salvare il JSON.

Esecuzione della posizione mediana in base al file di calibrazione:

```bash
python -m src.tools.run_calibration_middle <校准文件.json> --mode zero
```

Per l'installazione dell'ambiente LeRobot e il flusso di raccolta dati vedere il [Tutorial del braccio robotico LeRobot](./SO-ARM101-Tutorial.md).

## Strumenti da riga di comando

Oltre all'interfaccia grafica, il tool fornisce i seguenti comandi da riga di comando (senza GUI):

```bash
# 扫描舵机
python -m src.tools.scan_id

# 舵机快速中位校准
python -m src.tools.servo_quick_calibration

# 舵机中位测试
python -m src.tools.servo_center_test

# 失能全部舵机
python -m src.tools.servo_disable

# LeRobot 风格校准
python -m src.tools.lerobot_calibrate

# LeRobot 风格校准（指定串口）
python -m src.tools.lerobot_calibrate /dev/ttyACM0

# LeRobot 风格校准（指定串口，macOS）
python -m src.tools.lerobot_calibrate /dev/cu.usbserial-0001

# 双端口同步遥控
python -m src.tools.servo_remote_control
```

## Avvertenze

1. **La sicurezza prima di tutto**: la calibrazione mediana persiste sull'EEPROM. Prima della calibrazione, assicurarsi che l'alimentazione sia stabile e che il braccio robotico non possa urtare persone o oggetti.
2. **Alimentazione**: per SoARM 101 versione standard si consiglia DC 5V 5A, per la versione Pro DC 12V 5A. Un'alimentazione insufficiente può causare perdita di passi o errori di comunicazione dei servo.
3. **Accesso esclusivo alla porta seriale**: in Windows la porta seriale è esclusiva del programma; la stessa porta non può essere occupata contemporaneamente dal thread di scansione della GUI e dal processo figlio di calibrazione. Il tool ferma prima il thread di scansione e chiude i vecchi processi prima di operare; non fare clic ripetutamente a mano.
4. **Permessi della porta seriale su Linux**: per accedere a `/dev/ttyUSB*` / `/dev/ttyACM*` occorre aggiungere l'utente al gruppo `dialout` (vedi la sottosezione «Linux» sopra).
5. **Denominazione delle porte seriali su macOS**: usare `/dev/cu.*` (non bloccante) e non `/dev/tty.*` (bloccante, può bloccarsi); vedi la sottosezione «macOS» sopra.
6. **Hot-plug**: dopo aver rimosso l'USB il programma tenta la riconnessione automatica; dopo averlo reinserito fare clic su `🔄` per aggiornare l'elenco delle porte.
7. **Protezione da sovratemperatura / sovratensione**: il programma monitora tensione e temperatura (allarme se temperatura > 60°C). Se il servo si surriscalda a lungo, fermarsi e far raffreddare.
8. **La calibrazione mediana è irreversibile**: dopo la scrittura l'offset originale viene sovrascritto e non è possibile annullare. Si consiglia di registrare la posizione originale prima di calibrare.
9. **Rischio nella modifica dell'ID**: in caso di errore di scrittura o di verifica il programma segnala un errore e riprende la scansione, ma in casi estremi il servo può «perdere il contatto». In tal caso si può provare il «ripristino delle impostazioni di fabbrica» (dopo il reset l'ID torna a 1).
10. **Problemi di codifica**: se nella console di Windows gli emoji appaiono come caratteri illeggibili, impostare `PYTHONIOENCODING=utf-8` e riavviare lo strumento da riga di comando. Su Linux / macOS con UTF-8 nativo di solito non si presenta.

## Risoluzione dei problemi

| Sintomo | Possibile causa | Soluzione |
| ---- | -------- | -------- |
| Impossibile aprire la porta seriale / porta occupata | Occupata da un altro programma | Chiudere programmi come i monitor seriali, oppure cambiare porta e riavviare il tool |
| In Windows l'apertura della porta seriale restituisce PermissionError | Un altro processo occupa quella porta COM | Assicurarsi che nessun altro processo occupi quella porta COM |
| I servo non vengono rilevati | Alimentazione insufficiente / cablaggio errato / baudrate non corrispondente | Controllare alimentazione e cablaggio; verificare che i servo siano a 1M di baudrate |
| Dopo la calibrazione mediana i servo si muovono in modo anomalo | Postura non sistemata prima della calibrazione | Ripetere «disattivazione → posizionamento manuale → calibrazione mediana» |
| Aumento rapido della temperatura | Carico eccessivo o stallo | Controllare che il meccanismo non sia bloccato, ridurre velocità/accelerazione |
| Dopo la modifica dell'ID il servo non si trova più | Conflitto di ID o scrittura fallita | Ripristinare le impostazioni di fabbrica e rieseguire la scansione |
| La teleoperazione non è sincronizzata | ID diversi tra le due porte | Verificare che i servo con lo stesso ID siano online su entrambe le porte master/slave |
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
Juxi_ServoController/
├── docs/                    # 分系统教程
│   ├── Windows教程.md
│   ├── Linux教程.md
│   └── macOS教程.md
├── src/
│   ├── gui/                  # PySide6 图形界面
│   │   ├── factory_calibration_tool.py   # 主工具（双串口标定 + 遥控 + 语言切换）
│   │   ├── ft_debugger.py                # FT 调试器（参数读写 / xdat 备份）
│   │   ├── calibration_wizard.py         # LeRobot 校准向导
│   │   ├── theme_utils.py                # 浅色主题
│   │   └── language_dialog.py            # 语言选择对话框
│   ├── tools/                # 命令行工具
│   ├── xdat_utils.py         # xdat 参数文件读写
│   ├── i18n*.py / i18n_translations/     # 中英文国际化
│   ├── port_utils.py         # 串口检测
│   └── calibration_manager.py# LeRobot 校准文件管理
├── scservo_sdk/              # FTServo 舵机通信 SDK
├── requirements.txt
└── setup.py                  # 环境检查脚本
```

Questo repository del tool è composto dai moduli `src/gui` (interfaccia grafica PySide6), `src/tools` (strumenti da riga di comando), `scservo_sdk` (SDK di comunicazione per servo FTServo) e `setup.py` (script di verifica dell'ambiente).

<RelatedProducts slugs="so-arm101,servo-driver-board" />
