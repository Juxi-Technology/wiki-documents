---
title: "AmazingHand PWM — Mano abile: tutorial d'uso completo"
description: "Tutorial completo della versione PWM di AmazingHand: dal firmware PWM ESP32-S3 e dai comandi gestuali del software host fino al tracciamento dei gesti tramite GUI / dora."
---

# AmazingHand PWM — Mano abile: tutorial d'uso completo

> **Pacchetto di consegna incluso:** [delivery_package.zip](/downloads/delivery_package.zip)


> Tutorial d'uso integrale, dai **comandi gestuali del software host** al **tracciamento dei gesti**.
> Hardware compatibile: ESP32-S3 + 8 canali di servomotori PWM (azionamento differenziale).
>
> Versione: 2026-08-20 · Firmware incluso: versione a componenti ESP-IDF (`AmazingHand_Serial`)

---

## Capitolo 0: Navigazione del tutorial

Questo tutorial è organizzato **in ordine sequenziale**. Prima individuare quale percorso seguire, poi passare al capitolo corrispondente.

| Percorso | Scopo | Prerequisiti | Capitoli |
|------|------|----------|------|
| **A. Comandi gestuali dal software host** | Pulsare pulsanti o digitare comandi per far eseguire i gesti alla mano meccanica (sasso/forbici/carta/pollice in su…) | Python + firmware flash | Capitoli 1-4 |
| **B. Tracciamento dei gesti integrato nella GUI** | La telecamera segue i movimenti della mano e la mano meccanica li riproduce in tempo reale (versione semplificata, senza IK) | A + Python a 64 bit + mediapipe | Capitoli 1-4 + 5.1 |
| **C. Tracciamento IK ufficiale di dora** | Catena ufficiale completa: telecamera → IK → 8 angoli di articolazione → servomotori (versione completa) | A + Rust + uv + dora | Capitoli 1-4 + 5.2 |

**Percorsi consigliati**:
- Primo utilizzo → seguire il **A** e verificare prima che firmware e cablaggio siano a posto.
- Per vedere subito il tracciamento tramite telecamera → seguire il **B** (leggero, installazione in pochi minuti).
- Per un tracciamento formale e completo → seguire il **C** (catena ufficiale, massima precisione).

I tre percorsi condividono l'hardware; solo il **percorso C** richiede l'installazione aggiuntiva di Rust/uv/dora.

---

## Capitolo 1: Preparazione dell'ambiente

Installare in ordine sequenziale. **I percorsi A/B richiedono solo la sezione 1.1; il percorso C richiede anche la sezione 1.2.**

### 1.1 Ambiente del software host (necessario per i percorsi A/B)

#### ① Python 3.12 a 64 bit

> **Obbligatorio a 64 bit**. mediapipe 0.10.14 fornisce wheel solo per Windows a 64 bit; su 32 bit non è installabile;
> questa è anche una causa frequente della chiusura improvvisa della GUI con doppio clic.

- Si consiglia di installarlo in `D:\Python312-64bit` (su questa macchina il percorso esiste già).
- Durante l'installazione, selezionare **Add to PATH**.
- Verifica (64 bit):

```bash
py -3.12-64 -c "import sys; print('64bit' if sys.maxsize > 2**32 else '32bit')"
# 输出: 64bit
```

#### ② Installazione delle dipendenze del software host

Directory radice del progetto (la directory che contiene `hand_gui.py`):

```bash
pip install -r requirements.txt     # 只需 pyserial
```

#### ③ Dipendenze aggiuntive di tracciamento (per il percorso B)

Eseguire nella directory radice del progetto:

```bash
setup_tracking.bat
```

Automaticamente: cerca Python a 64 bit → crea l'ambiente virtuale `tracking_env` → installa `requirements-tracking.txt`
(mediapipe==0.10.14, numpy<2, scipy, opencv, Pillow, pyserial) → verifica mediapipe.

> Oppure installazione manuale:
> ```bash
> D:\Python312-64bit\python.exe -m pip install -r requirements-tracking.txt
> ```

### 1.2 Ambiente IK ufficiale di dora (necessario per il percorso C)

**Installazione per il cliente**: fare doppio clic su `..\02_hand_tracking\Demo\Windows_Scripts_CN\1-安装环境.bat` (la versione inglese è `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\1-Install_Env.bat`); installa automaticamente tutte le dipendenze:
toolchain Rust, uv (gestore di pacchetti Python) e dora-cli.

> Al termine, **chiudere e riaprire il terminale** una volta per rendere effettivo il PATH.
> Le dipendenze dettagliate (versioni, installazione manuale) sono nel documento di manutenzione; il cliente non deve occuparsene.

---

## Capitolo 2: Cablaggio hardware

### 2.1 Elenco dell'hardware

| Hardware | Descrizione |
|------|------|
| Scheda di sviluppo ESP32-S3 | YX-ESP32-S3 o equivalente |
| 8 servomotori PWM | Servomotori analogici, azionamento differenziale |
| Scheda adattatrice per servomotori | Servomotori → 8 uscite PWM |
| Alimentatore 5V indipendente | **Almeno 5V 3A**; i servomotori assorbono forti correnti transitorie |
| Cavo dati USB | ESP32-S3 Type-C → PC |
| Telecamera | Telecamera integrata o USB (per il tracciamento) |

### 2.2 Mappatura GPIO

Scheda adattatrice PWM1-8 → GPIO dell'ESP32-S3:

| Scheda adattatrice | GPIO | Dito |
|--------|------|------|
| PWM1 | 4 | Indice articolazione 1 |
| PWM2 | 5 | Indice articolazione 2 |
| PWM3 | 6 | Medio articolazione 1 |
| PWM4 | 7 | Medio articolazione 2 |
| PWM5 | 15 | Anulare articolazione 1 |
| PWM6 | 16 | Anulare articolazione 2 |
| PWM7 | 17 | Pollice articolazione 1 |
| PWM8 | 18 | Pollice articolazione 2 |

> **Mano sinistra e mano destra condividono la stessa mappatura GPIO**. Il cambio mano sinistra/destra avviene via software (capitolo 4); non serve modificare il cablaggio.

### 2.3 Requisiti di alimentazione

- Usare un **alimentatore 5V indipendente** (almeno 3A) per i servomotori; non affidarsi solo all'alimentazione USB.
- Un picco di corrente istantaneo dei servomotori può resettare l'ESP32 (sintomo: ESP32 si riavvia ripetutamente). In tal caso, **togliere l'alimentazione e riavviare** l'ESP32.

### 2.4 Passaggi del cablaggio

1. 8 servomotori → scheda adattatrice PWM1-8
2. Scheda adattatrice → GPIO corrispondente dell'ESP32-S3 (tabella sopra)
3. ESP32-S3 Type-C → PC
4. Telecamera collegata al PC (per il tracciamento)

> Per il cablaggio e lo schema elettrico dettagliati, vedere la cartella `ESP32开发板电路图/`.

---

## Capitolo 3: Prerequisito: flashing del firmware

> Perché i servomotori rispondano, occorre prima flashare il firmware. Il firmware si trova in `esp-idf\AmazingHand_Serial\`.

### 3.1 Compilazione della versione ESP-IDF (consigliata)

Aprire il progetto `AmazingHand_Serial` con Espressif IDE:

1. Impostare il chip di destinazione (la prima volta):
   ```
   idf.py set-target esp32s3
   ```
2. Compilare:
   ```
   idf.py build
   ```
3. Flashare (in Windows usare la porta COM, ad esempio COM3):
   ```
   idf.py -p COM3 flash
   ```

### 3.2 Verifica dopo il flashing

Monitoraggio della porta seriale (baud rate **115200**):

```
idf.py -p COM3 monitor
```

Deve comparire il log di avvio:

```
AmazingHand Serial Control Ready (ESP-IDF)
Protocol: 115200-8N1 [0xAA CMD LEN DATA CKSUM]
```

> Il baud rate della porta seriale è già configurato in modo uniforme da firmware/script (115200); il cliente non deve impostarlo manualmente.

> Nota: di solito il firmware è già flash sul dispositivo alla consegna; questo passaggio va eseguito solo con firmware nuovo o in caso di nuovo flashing.

---

## Capitolo 4: Prima esecuzione: comandi gestuali dal software host

> Prerequisiti: firmware flash (capitolo 3), ESP32 alimentato, cavo seriale collegato. Controllare prima in Gestione dispositivi la porta COM.

### 4.1 GUI visuale (consigliata)

#### Modalità A: eseguire l'exe preconfezionato

Fare doppio clic su `dist/AmazingHand控制台.exe` (**senza tracciamento**; per il tracciamento serve l'esecuzione dal codice sorgente).

#### Modalità B: esecuzione dal codice sorgente

```bash
# 项目根目录,先激活追踪环境(装了 mediapipe)或任意带 pyserial 的 Python
tracking_env\Scripts\python hand_gui.py
```

#### Passaggi per l'uso della GUI

1. **Selezionare la porta seriale**: nel menu a discesa in alto selezionare la porta COM dell'ESP32.
2. **Cliccare su «Connetti»**: la spia di stato diventa verde, nel log compare «Connesso» e viene inviata automaticamente una prova di collegamento NOP.
3. **Comandi dei gesti**: cliccare «Sasso», «Forbici», «Carta», «Pollice in su», «OK», «Pizzico», «Indica» ecc.; la mano meccanica li esegue.
4. **Mano destra/sinistra**: selezionare «Mano destra» / «Mano sinistra» per cambiare la direzione speculare del pollice.
5. **Azionamento diretto dei servomotori**: trascinare gli 8 cursori per controllare in tempo reale l'angolo di ciascun servomotore (0-180°).
6. **Controllo differenziale delle dita** (consigliato): due barre di avanzamento per ogni dito: «Piega◀▶Distendi» in differenziale inverso e «Oscilla a destra◀▶Oscilla a sinistra» in oscillazione concorde. I due gradi di libertà sono indipendenti e azionati in modo sincronizzato.
7. **Ripeti / Stop**: ripete l'ultimo gesto / interrompe immediatamente.
8. **Log di comunicazione**: in basso vengono mostrati in tempo reale i frame inviati/ricevuti e le risposte.

### 4.2 Test da riga di comando (serial_test.py)

Directory radice del progetto:

```bash
# 链路测试(先确认能通)
python serial_test.py COM3 nop

# 手势
python serial_test.py COM3 rock         # 石头
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 张开
python serial_test.py COM3 close        # 握拳

# 单舵机直驱
python serial_test.py COM3 servo 1 90   # 舵机1 → 90°

# 全部归中
python serial_test.py COM3 mid

# 设左右手
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# 扫频/自检
python serial_test.py COM3 sweep 1      # 舵机1 扫频
python serial_test.py COM3 test         # 全部舵机逐个测试
```

### 4.3 Verifica

- Dopo aver cliccato un gesto, i servomotori devono eseguire l'azione corrispondente; il log della porta seriale restituisce `ACK` e `DONE`.
- Codici di risposta: `0x00=OK`, `0x01=comando non valido`, `0x02=parametro errato`, `0x03=occupato`, `0x10=completato`.
- Se i servomotori non si muovono affatto: vedere le domande frequenti del capitolo 6 (controllare prima alimentazione/porta seriale).

> Per il riferimento rapido completo di comandi gestuali e protocollo seriale, vedere il capitolo 7.

---

## Capitolo 5: Tutorial avanzato: tracciamento dei gesti

> Prerequisiti: capitoli 1-4 completati (firmware flash, controllo seriale funzionante, telecamera pronta).
> Questo capitolo offre due opzioni; sceglierne una.

### 5.1 Tracciamento integrato nella GUI (versione leggera)

**Adatto a**: dimostrazioni rapide, senza installare dora. Telecamera → mappatura diretta sui servomotori differenziali, senza IK.

#### Prerequisiti

- Python a 64 bit + `setup_tracking.bat` (sezione 1.1).
- Telecamera disponibile.

#### Esecuzione

```bash
# 项目根目录,用追踪环境启动 GUI
tracking_env\Scripts\python hand_gui.py
```

1. Selezionare la porta seriale → «Connetti».
2. Scorrere fino al pannello «Tracciamento dei gesti (telecamera MediaPipe)».
3. Selezionare il numero della telecamera (predefinito 0) → cliccare «Avvia tracciamento».
4. Mettere la mano nell'inquadratura; la mano meccanica seguirà piega/estensione della mano.

#### Principio

- mediapipe 0.10.14 estrae i vettori 3D delle punte delle 4 dita (nel sistema di coordinate della mano).
- La funzione `tips_to_angles()` di `hand_tracking.py` mappa ogni dito su un angolo differenziale:
  - flex (piega/estensione): per le tre dita si usa la componente z, per il pollice la componente y;
  - base (oscillazione destra/sinistra): fissa a 90 (l'oscillazione destra/sinistra non è ancora implementata).
- La GUI integra smoothing EMA (alpha=0.4) + throttling a 60 ms per evitare tremolii.

#### Limiti

- **Senza IK**: mappa direttamente le punte delle dita su angoli; la precisione è inferiore a quella della catena ufficiale.
- **Oscillazione destra/sinistra rinviata**: base fissa a 90, nessuna oscillazione laterale.
- Adatto a demo/prototipi; per l'uso formale si consiglia 5.2.

### 5.2 Tracciamento IK ufficiale di dora (versione completa)

**Adatto a**: uso ufficiale. Catena ufficiale: telecamera → mediapipe → IK MuJoCo+mink → 8 angoli di articolazione → AHControl (Rust) → ESP32 → servomotori PWM.

#### Prerequisiti

- Ambiente completo (Rust + uv + dora, sezione 1.2).
- Firmware flash (capitolo 3).
- Il file yml del flusso dati contiene già il baud rate PWM (115200); non serve modificarlo manualmente.

#### Primo passo: distribuzione (script in un clic consigliato)

Fare doppio clic su `..\02_hand_tracking\Demo\Windows_Scripts_CN\3-部署代码.bat` (la versione inglese è `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\3-Deploy_Demo.bat`); esegue automaticamente:
creazione dell'ambiente Python, compilazione di AHControl (Rust), installazione di AHSimulation/HandTracking (mediapipe).

> La prima distribuzione richiede alcuni minuti. Lo script integra già la gestione delle variabili d'ambiente; non serve impostarle manualmente.

#### Secondo passo: esecuzione

Fare doppio clic su `..\02_hand_tracking\Demo\Windows_Scripts_CN\4-运行代码.bat` (la versione inglese è `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\4-Run_Demo.bat`) e scegliere dal menu:

```
1 - 模拟仿真（摄像头手势追踪）
2 - 真实硬件（SCS0009 总线舵机）
3 - PWM 舵机（ESP32 直驱）   ← 选 3
```

Poi scegliere il tipo di mano: `1 右手` / `2 左手`. Lo script esegue automaticamente `dora build` + `dora run`.

- Si apre la finestra della telecamera; mettere la mano nell'inquadratura → le dita della simulazione 3D seguono → la mano meccanica segue.
- Arresto: Ctrl+C (o chiudere la finestra).

#### Commutazione mano destra/sinistra

È sufficiente selezionare il tipo di mano nel menu di esecuzione (secondo passo della sezione 5.2): scegliere `1 右手` o `2 左手`.

> Dopo la commutazione, lo script ricostruisce automaticamente il flusso dati corrispondente; attendere il completamento della build prima di proseguire con le operazioni davanti alla telecamera.

#### Come leggere il log di esecuzione

Nella finestra di esecuzione il nodo AHControl emette log in modo continuo. Osservare in particolare questa riga:

```
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N` (ad esempio `sent 300 frames, ESP32 acked 300 frames`) → normale; ESP32 riceve ogni frame.
- `M = 0` → ESP32 non riceve dati; controllare porta seriale/alimentazione (vedere il capitolo 6).

Finché questa riga cresce regolarmente, la catena dei servomotori è funzionante; il resto dipende solo dal fatto che la telecamera riesca a stare al passo.

---

## Capitolo 6: Domande frequenti (durante il funzionamento)

> Questa sezione elenca solo i problemi **più frequenti e risolvibili autonomamente** durante l'uso. Individuarli rapidamente in base al sintomo.

### 6.1 I servomotori non si muovono affatto

Verificare in ordine:

1. **Alimentazione**: i servomotori sono collegati a un alimentatore indipendente (5V 3A o più)? Se alimentati solo via USB, i servomotori possono non muoversi o l'ESP32 può riavviarsi ripetutamente. → Togliere l'alimentazione e riavviare l'ESP32.
2. **Porta seriale**: è stata selezionata la porta COM corretta? In Gestione dispositivi → Porte (COM e LPT) vedere la porta corrispondente all'ESP32. È occupata da un altro programma (ad esempio un terminale seriale)? → Chiudere il programma che la occupa.
3. **Cablaggio**: i PWM1-8 della scheda adattatrice sono collegati ai GPIO corretti? I cavi di segnale dei servomotori sono inseriti a fondo?

### 6.2 Nessuna immagine dalla telecamera

- Al primo avvio su Windows viene richiesto il permesso per la telecamera → cliccare «Consenti».
- Se in precedenza è stato scelto «No»: Impostazioni → Privacy e sicurezza → Fotocamera → Consenti alle app desktop di accedere alla fotocamera, quindi rieseguire.

### 6.3 La telecamera mostra l'immagine, ma la mano non segue / segue con ritardo

- Verificare che la telecamera sia **di fronte** alla mano, con luce sufficiente e la mano completamente visibile nell'inquadratura.
- Muoversi più lentamente e con ampiezza maggiore. Se troppo veloce o con ampiezza ridotta, il tracciamento potrebbe non stare al passo.
- Le dita si muovono nella finestra di simulazione 3D?
  - **Sì**: la catena di tracciamento è a posto; il problema è nei servomotori/porta seriale; vedere 6.1.
  - **No**: il nodo di tracciamento non riconosce la mano; regolare postura/illuminazione e riprovare.

### 6.4 La forma della mano è invertita / il pollice va nella direzione opposta

- È stata scelta la mano sbagliata (sinistra/destra)? Selezionare il tipo di mano corretto nel menu di esecuzione.
- Nella GUI del software host, selezionare «Mano destra» / «Mano sinistra» per commutare.

### 6.5 La commutazione della mano non ha effetto

- Dopo aver cambiato il tipo di mano, `dora` deve ricostruire il flusso dati: selezionando il tipo di mano nel menu di esecuzione viene eseguito automaticamente `dora build`; attendere il completamento.

### 6.6 L'immagine si blocca / il log si ferma durante l'esecuzione

- La telecamera potrebbe essere occupata da un'altra applicazione (videoconferenza, un altro script); chiuderla e riprovare.
- Oppure premere `Ctrl+C` per arrestare e rieseguire.

### 6.7 Dopo aver cambiato porta USB / riavviato il PC, la porta seriale non viene trovata

- Il numero di porta COM potrebbe essere cambiato. Verificare il nuovo numero COM in Gestione dispositivi, rieseguire `2-配置串口.bat` (o `2-Setup_Serial.bat`) per selezionare la porta, quindi rieseguire.

### 6.8 Ancora non funziona?

- Inviare al team di manutenzione uno screenshot del log del terminale di esecuzione indicando: in quale passaggio, quale operazione e quale fenomeno si è osservato.
- Log chiave: la riga `[CONFIG]` all'avvio e la riga `[ACK-STATS]` in esecuzione (se la M di `ESP32 acked M frames` è vicina a N).

---

## Capitolo 7: Riferimento rapido dei comandi (appendice)

> La descrizione completa del protocollo è in `用户手册.md`, nella stessa cartella. Qui viene fornita la tabella di riferimento rapido.

### 7.1 Comandi gestuali

| Gesto | HEX | ACK | DONE |
|------|-----|-----|------|
| NOP | `AA 00 00 00` | `BB 00 00 00` | — |
| Sasso | `AA 01 00 01` | `BB 01 00 01` | `BB 01 10 11` |
| Forbici | `AA 02 00 02` | `BB 02 00 02` | `BB 02 10 12` |
| Carta | `AA 03 00 03` | `BB 03 00 03` | `BB 03 10 13` |
| Pollice in su | `AA 04 00 04` | `BB 04 00 04` | `BB 04 10 14` |
| Scherno 1 (muovere l'indice) | `AA 05 00 05` | `BB 05 00 05` | `BB 05 10 15` |
| Scherno 2 (anulare) | `AA 06 00 06` | `BB 06 00 06` | `BB 06 10 16` |
| Apri | `AA 07 00 07` | `BB 07 00 07` | `BB 07 10 17` |
| Pugno | `AA 08 00 08` | `BB 08 00 08` | `BB 08 10 18` |
| OK | `AA 09 00 09` | `BB 09 00 09` | `BB 09 10 19` |
| Pizzico | `AA 0A 00 0A` | `BB 0A 00 0A` | `BB 0A 10 1A` |
| Indica | `AA 0C 00 0C` | `BB 0C 00 0C` | `BB 0C 10 1C` |

### 7.2 Comandi di controllo

| Comando | HEX | Descrizione |
|------|-----|------|
| Ripeti | `AA FE 00 FE` | Ripete l'ultimo gesto |
| Stop | `AA FF 00 FF` | Interrompe immediatamente |
| Impostare mano destra | `AA F1 01 01 F1` | — |
| Impostare mano sinistra | `AA F1 01 02 F2` | — |
| Azionamento diretto | `AA F0 08 [8×角度] CKSUM` | 8 byte di angolo |

### 7.3 Formato del frame

```
帧头(0xAA) + 命令(CMD) + 长度(LEN) + 数据(DATA) + 校验和(CKSUM)
CKSUM = CMD ^ LEN ^ DATA[0] ^ ... ^ DATA[N-1]
响应: 帧头(0xBB) + CMD + STATUS + (CMD^STATUS)
```

### 7.4 Strumenti del software host

| Strumento | Comando | Scopo |
|------|------|------|
| GUI | `tracking_env\Scripts\python hand_gui.py` | Gesti visuali + azionamento diretto + differenziale + tracciamento |
| exe preconfezionato | `dist/AmazingHand控制台.exe` | Visualizzazione senza installare Python (senza tracciamento) |
| Riga di comando | `python serial_test.py COMx <cmd>` | Test automatizzati |

### 7.5 File di flusso dati di tracciamento (versione PWM)

| Scopo | File |
|------|------|
| Tracciamento PWM mano sinistra | `dataflow_tracking_real_left_pwm.yml` |
| Tracciamento PWM mano destra | `dataflow_tracking_real_right_pwm.yml` |
| Configurazione PWM mano sinistra | `AHControl/config/l_hand_pwm.toml` |
| Configurazione PWM mano destra | `AHControl/config/r_hand_pwm.toml` |
