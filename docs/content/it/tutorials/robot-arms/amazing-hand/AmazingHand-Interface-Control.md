---
title: "Tutorial sul controllo dell'interfaccia"
description: "Strumento di controllo GUI Python / riga di comando per AmazingHand: scelta della mano sinistra e destra, installazione, calibrazione, protocollo e domande frequenti."
---

# Tutorial sul controllo dell'interfaccia

## Strumento di controllo Python di AmazingHand (adatto a mano sinistra e destra)

Strumento GUI e da riga di comando scritto in Python che controlla 8 servo Feetech SCS0009 tramite la scheda driver dei servo del bus seriale, azionando la mano abile [AmazingHand di Pollen Robotics](https://github.com/pollen-robotics/AmazingHand).

> **Supporta entrambe le mani.** All'avvio scegliere la mano destra (ID servo 1-8) o la mano sinistra (ID servo 11-18); --hand permette di saltare la domanda. La libreria di pose è condivisa tra le due mani; ogni mano mantiene separatamente in data/config.yaml la propria mappatura dei servo, l'offset di montaggio e gli obiettivi in valori raw. Vedi la selezione mano sinistra/destra.

![Illustrazione](../../../../../public/images/tutorials/robot-arms/amazing-hand/interface-control/01.png)

---

## Struttura del progetto

```text
amazing_hand_gui.py   – GUI 主程序
amazing_hand_cmd.py   – 命令行工具
hand_logic.py         – 共用业务逻辑(不依赖 UI)
pyproject.toml        – 包元数据、依赖、pytest 配置
data/
  config.yaml         – 应用设置(串口、限位、原始值目标)
  hand_config.yaml    – 已保存的手势与序列
docs/
  REQUIREMENTS.md       – 需求与验收标准
  user_manual.md        – 用户手册
  CONFIG_FORMAT.md      – 配置文件格式说明
  scs_servo_protocol.md – SCS0009 寄存器参考
  优化说明.md            – 相对原版的改动说明与原因
  CHANGES.md            – 同一份文档的英文版
tests/
  test_hand_logic.py      – hand_logic 单元测试(155 项)
  test_gui_utils.py       – GUI 工具函数单元测试(51 项)
  test_cmd.py             – CLI 单元测试(42 项)
  test_integration.py     – 集成测试(14 项)
  test_system.py          – 子进程系统测试(22 项)
  test_system_hardware.py – 硬件测试(33 项,需 --hardware)
  test_cmd_hardware.py    – CLI 硬件测试(21 项,需 --hardware)
```

## Requisiti dell'ambiente

- Python 3.10 o versione superiore (la GUI richiede Tkinter)
- Alimentazione esterna dedicata da 5V per gli 8 servo
- Adattatore USB per bus seriale con driver già installati

## Installazione

Si consiglia l'installazione con pip (legge pyproject.toml):

```bash
pip install -e .
```

Oppure installare direttamente le dipendenze:

```bash
pip install -r requirements.txt
```

Ambiente di sviluppo e test:

```bash
pip install -r requirements-dev.txt
```

---

## Calibrazione

Il sistema angolare dei servo, le pose predefinite e la posizione centrale dipendono dalla mano meccanica specifica. Tutti questi parametri sono centralizzati in data/config.yaml.

### Selezione mano sinistra/destra

Le due mani usano servo e strutture meccaniche diversi, quindi bisogna scegliere prima che compaia l'interfaccia:

```text
  AmazingHand — which hand?
    1 = right hand  (servo IDs 1-8)
    2 = left hand   (servo IDs 11-18)
  Enter 1 or 2 [1]:
  LEFT hand — servo IDs 11-18
    Ring (11, 12)  Middle (13, 14)  Pointer (15, 16)  Thumb (17, 18)
    middle position raw: [571, 451, 571, 451, 571, 451, 571, 451]
```

Per saltare la domanda:

```bash
python amazing_hand_gui.py --hand left
python amazing_hand_cmd.py --pose victory --hand left
```

Se non si aggiunge --hand, si usa il valore hand: di data/config.yaml.

**Perché una mano non è solo cambiare un gruppo di ID.** Oltre alla numerazione dei servo (mano destra 1-8, mano sinistra 11-18, e nella mano sinistra la numerazione delle dita è speculare — l'anulare viene per primo), la mano sinistra presenta altre due differenze meccaniche, gestite automaticamente dal programma:

|  | Mano destra | Mano sinistra |
|---|---|---|
| ID servo | 1-8 | 11-18 |
| Dito → ID | Indice 1,2 / Medio 3,4 / Anulare 5,6 / Pollice 7,8 | Anulare 11,12 / Medio 13,14 / Indice 15,16 / Pollice 17,18 |
| MiddlePos del produttore | [451, 571, …] | [571, 451, …] |
| Offset di montaggio | 0° | **−35.16°**(hands.left.angle_offset) |
| Due servo per dito | (a, b) | **(b, a)**(hands.left.mirror_pose) |

Se manca anche uno solo degli ultimi due punti, ogni gesto risulta deformato: l'offset di montaggio sposta ogni dito di 35°, mentre senza lo scambio dei servo dello stesso dito la direzione di apertura si inverte completamente (nel gesto a V le due dita si avvicinano e le tre dita che dovrebbero avvicinarsi si aprono).

data/hand_config.yaml è **condiviso tra le due mani** e memorizza sempre l'ordine della mano destra; la mano sinistra converte in lettura e riconverte al salvataggio.

**Calibrare una mano nuova.** Usare come modello i valori in hands.left, poi verificare in questo ordine:

1. Premere **Middle position** e controllare se la riga Current (0-1023) legge i valori raw attesi
1. Premere **Open All** / **Close All** — la corsa deve raggiungere il limite meccanico senza stallo dei servo
1. Provare un gesto di apertura (victory forma una V, greeting avvicina tre dita)

Se qualcosa non torna, quale parametro regolare:

| Fenomeno | Cosa modificare |
|---|---|
| Lettura di Middle position errata | `hands.<nome>.raw_positions.middle` |
| Direzione di apertura invertita | `hands.<nome>.mirror_pose` |
| Corsa insufficiente o eccessiva | `hands.<nome>.raw_positions.open / close` |

### Sistema angolare

Sia la GUI sia la CLI usano **valori angolari**, convertiti dal driver rustypot nei valori raw interni dei servo:

```text
raw = 1024 × angle / 300° + 511        (0.29297°/step,原始值范围 0–1023)
```

| Angolo | Significato |
|---|---|
| **−35°** | Completamente aperto (esteso) |
| **0°** | Posizione centrale, dita naturalmente leggermente piegate |
| **+75°** | Completamente chiuso (pugno) |

I servo con ID pari si muovono in modo **inverso** rispetto a quelli con ID dispari, così un solo valore di posa fa muovere in direzioni opposte i due servo dello stesso dito. Il programma lo gestisce automaticamente; non serve alcuna conversione manuale.

### Limiti

```text
limits:
  servo_min: -75      # 任何舵机指令的绝对行程上下限
  servo_max: 75
  base_min: -75       # 开合滑块范围
  base_max: 75
  side_min: -35       # 左右滑块范围
  side_max: 35
```

side_min/side_max controllano l'**apertura laterale**. Poiché il programma normalizza (u = |side_offset| / |side_min|), **modificare solo questo intervallo non cambia l'ampiezza reale di apertura**, comprime soltanto la scala dello slider. Per cambiare davvero l'angolo di apertura delle dita bisogna modificare anche auto_extremes.

### Obiettivi in valori raw

I tre pulsanti di posizione globale portano i servo a **valori raw esatti**, senza passare dal modello angolare:

```text
raw_positions:              # 下标 0 -> 舵机 ID 1 …… 下标 7 -> 舵机 ID 8
  open:   [260, 760, 260, 760, 260, 760, 260, 760]
  close:  [760, 260, 760, 260, 760, 260, 760, 260]
  middle: [451, 571, 451, 571, 451, 571, 451, 571]
```

- open / close — i due estremi della corsa meccanica. Si misurano azionando singolarmente i servo con lo strumento di debug Feetech del produttore.
- middle — la **posizione centrale meccanica calibrata** (il MiddlePos del programma dimostrativo Arduino del produttore). Attenzione: **non** è il punto medio tra open e close, ma si discosta dal valore raw 511 di circa **±60 raw (±17.6°)**.

> Questi sono **valori di calibrazione propri di ciascuna mano**. Parole del produttore: *"replace values by your calibration results"*.

**Come verificare:** il pannello Servo Feedback ha una riga Current (0-1023) che mostra in tempo reale la posizione raw. Dopo aver premuto il pulsante **Middle position**, quella riga deve leggere 451, 571, 451, 571, ….

### Tabella rapida degli intervalli dei controlli

| Controllo | Intervallo |
|---|---|
| Slider apertura/chiusura (verticale) | −75 … +75 |
| Slider laterale (orizzontale) | −35 … +35 |
| Velocità | 1 (lenta) … 6 (veloce) |

Il valore di velocità viene passato dal driver al servo come rad/s, quindi 1–6 corrisponde all'incirca a **57–344 °/s**. Sotto carico la velocità reale è circa il **70%** di quel valore — da tenere presente quando si impostano i ritardi delle sequenze.

---

## Eseguire la GUI (amazing_hand_gui.py)

Dopo l'installazione con pip si può richiamare direttamente:

```text
amazing-hand-gui
amazing-hand-gui --port /dev/ttyUSB0
```

Oppure eseguire direttamente:

```bash
python amazing_hand_gui.py
python amazing_hand_gui.py --port /dev/ttyUSB0
```

Il menu a tendina delle porte elenca le porte seriali **effettivamente presenti** sul computer (prima con pyserial, altrimenti legge il registro di Windows), così compaiono anche adattatori con numeri alti. Il menu permette di digitare direttamente il numero di porta. Se la porta predefinita nella configurazione non è collegata, la GUI si avvia automaticamente dalla prima porta reale; per fissare una porta, passare esplicitamente --port.

### Funzioni

- Slider per dito per apertura/chiusura e laterale, con due modalità: **Auto** (apertura/chiusura + laterale) e **Raw** (controllo diretto dell'angolo dei due servo)
- Pulsanti rapidi Open / Close / Center per ogni dito
- Selezione della velocità per dito (1–6), più un menu a tendina globale di sincronizzazione della velocità
- Scorciatoie da tastiera per regolazioni fini precise
- **Pulsanti di posizione globale**: Open All, Close All, Center All, Middle position
- Gestione di pose e sequenze basata su data/hand_config.yaml
- Permette di eliminare le pose salvate direttamente dall'interfaccia (pulsante 🗑 Delete)
- Curve di telemetria dei servo in tempo reale (posizione, carico, temperatura, tensione)
- Tabella Servo Feedback con la **posizione raw** in tempo reale (0–1023), utile per verificare la calibrazione

### Operazioni da tastiera

- **1-4**: selezionare il dito (Ring anulare, Middle medio, Pointer indice, Thumb pollice)
- **Tasti freccia**: muovere il dito selezionato
  - Su/giù: chiudere / aprire
  - Sinistra/destra: movimento laterale
- **Tasti modificatori**:
  - Nessuno: 1° per volta (regolazione fine)
  - Shift: 5° per volta (normale)
  - Ctrl: 10° per volta (rapido)
- **Azioni rapide**:
  - Q: chiudere completamente il dito selezionato
  - E: aprire completamente il dito selezionato
  - C: ricentrare la posizione laterale

### Pulsanti globali

| Pulsante | Apertura/chiusura | Laterale |
|---|---|---|
| ✋ **Open All** | Tutte le dita al valore raw open | Ricentrare |
| ✊ **Close All** | Tutte le dita al valore raw close | Ricentrare |
| ⊙ **Center All** | **Nessuna modifica** | Ricentrare |
| ⊙ **Middle position** | Tutte le dita al valore raw middle | Ricentrare |

Il menu a tendina **Global Speed** (1–6) applica subito la velocità scelta a tutti i controlli delle dita e sincronizza la visualizzazione degli slider di ciascun dito.

I tre pulsanti dei valori raw (Open All, Close All, Middle position) aggirano il modello angolare, quindi **dopo l'esecuzione gli slider mostrano il valore rappresentabile più vicino, non il valore esatto**. Toccando poi uno slider, la mano si discosta dall'obiettivo raw fino a circa 0.3° — è un compromesso voluto per raggiungere con precisione le posizioni calibrate.

> Problema noto: Center All **non** salta le dita in modalità **Raw** e sovrascrive gli angoli raw impostati manualmente. Il pulsante ⊙ Center del singolo dito invece no.

---

## Eseguire la CLI (amazing_hand_cmd.py)

Strumento da riga di comando indipendente che permette di applicare pose e riprodurre sequenze senza avviare la GUI. Legge lo stesso data/hand_config.yaml della GUI e **invia letteralmente** i valori di posa memorizzati — esattamente gli stessi emessi dalla GUI.

### Linux: permessi della porta seriale

L'adattatore USB seriale di solito appare come /dev/ttyACM0 (Waveshare / CDC-ACM) o /dev/ttyUSB0 (FTDI / CH340).

Come trovarlo:

```bash
ls /dev/ttyACM* /dev/ttyUSB* 2>/dev/null
# 或者
dmesg | grep -E 'ttyACM|ttyUSB' | tail -5
```

Se compare **Permission denied**, aggiungere l'utente corrente al gruppo dialout e riaccedere:

```bash
sudo usermod -aG dialout $USER
```

### Dopo l'installazione con pip

```text
amazing-hand-cmd --list
amazing-hand-cmd --pose open
amazing-hand-cmd --sequence demo --loop
amazing-hand-cmd --pose open --speed 6
# 需要时覆盖串口:
amazing-hand-cmd --pose open --port /dev/ttyUSB0
```

### Esecuzione diretta

```bash
python amazing_hand_cmd.py --list
python amazing_hand_cmd.py --pose open
python amazing_hand_cmd.py --pose close --speed 6
python amazing_hand_cmd.py --sequence demo
python amazing_hand_cmd.py --sequence wave --loop
python amazing_hand_cmd.py --port /dev/ttyUSB0 --pose open
python amazing_hand_cmd.py --list --config /path/to/hand_config.yaml
```

### Parametri

| Parametro | Valore predefinito | Descrizione |
|---|---|---|
| --pose NAME | – | Applicare la posa con il nome indicato |
| --sequence NAME | – | Riprodurre la sequenza con il nome indicato |
| --list | – | Elencare tutte le pose e sequenze |
| --loop | Disattivato | Ripetere la sequenza fino a Ctrl+C |
| --speed N | 3 | Velocità del servo 1 (lenta)… 6 (veloce) |
| --port PORT | Linux /dev/ttyACM0<br>Windows COM9 | Numero della porta seriale |
| --baudrate N | 1000000 | Baud rate |
| --config PATH | data/hand_config.yaml | Usare un altro file di configurazione |
| --hand {right,left} | hand di config.yaml | Indicare quale mano usare (mano destra 1-8, mano sinistra 11-18) |

All'uscita dello script (incluso Ctrl+C) la coppia di tutti i servo viene disattivata automaticamente.

> La CLI non ha un parametro --config corrispondente a data/config.yaml; quel file viene sempre caricato dalla directory del progetto.

---

## File di configurazione

### data/config.yaml

| Sezione | Scopo |
|---|---|
| serial | Porta seriale predefinita per piattaforma, baud rate, elenco dei baud rate opzionali |
| servos | ID servo corrispondente a ciascun dito |
| limits | Intervalli angolari dei servo e dei due slider |
| speeds | Valori predefiniti/minimi/massimi della scala di velocità 1–6 |
| auto_extremes | Posizione dei servo quando lo slider laterale raggiunge il limite |
| raw_positions | Obiettivi raw esatti dei pulsanti di posizione globale |
| paths | Posizione dei file di pose/sequenze |

### Corrispondenza tra servo e dita

| Dito | ID servo | Indice nell'array di posa |
|---|---|---|
| Pointer indice | 1, 2 | 4, 5 |
| Middle medio | 3, 4 | 2, 3 |
| Ring anulare | 5, 6 | 0, 1 |
| Thumb pollice | 7, 8 | 6, 7 |

**L'ordine dell'array di posa è anulare, medio, indice, pollice, non per ID servo.** È il punto più facile da sbagliare quando si modifica a mano hand_config.yaml.

> Il commento in cima ad amazing_hand_cmd.py dice "index 0→servo1 … 7→servo8"; **quel commento è errato**, la tabella sopra è il comportamento reale del codice.

---

## Pose e sequenze

Tutte le pose e sequenze sono salvate in data/hand_config.yaml. Se il file non esiste, la GUI lo crea automaticamente.

### Salvare una posa

1. Portare la mano nella posa desiderata con gli slider o la tastiera
1. Scrivere il nome nel campo "Name:"
1. Fare clic su "➕ Add New" nella sezione Pose Management

La velocità influisce solo sulla rapidità di movimento degli slider; la posa salvata registra solo le 8 posizioni dei servo.

### Caricare / eliminare pose

- Selezionare dal menu a tendina e premere **✓ Apply** per far muovere la mano in quella posa
- Premere **🗑 Delete** a destra di Apply; dopo la conferma l'eliminazione è definitiva

### Gestione delle sequenze

1. In Sequence Player premere "🔧 Manage" per aprire il gestore delle sequenze
1. **Saved Sequences** (colonna sinistra)
  - Visualizzare, eseguire, modificare o eliminare le sequenze esistenti
  - Doppio clic o "▶ Execute" per eseguire una volta

1. **Sequence Builder** (colonna destra)
  - Fare doppio clic su una posa in "Available Poses" per aggiungerla come passo
  - Per ogni passo si possono impostare velocità e ritardo degli 8 servo; i passi vengono salvati come "pose:s1,s2,...,s8|delay"
  - Usare ↑/↓ per regolare l'ordine, o il pulsante "⏱ Delay" per inserire una pausa indipendente
  - Dopo aver inserito il nome, premere "💾 Save Sequence" per salvare; "▶ Execute" permette di provare senza salvare

1. Tornare alla finestra principale e, per la riproduzione continua, selezionare **Loop** in Sequence Player

### Formato dei passi

```text
pose_name:speed1,speed2,...,speed8|delay
```

- speed1..speed8 — le 8 velocità dei servo (1–6) nell'ordine della posa
- delay — tempo di attesa fino al passo successivo, ad es. 0.6s. **Si può omettere**; se omesso, la GUI ricorre a un'attesa automatica fissa
- La pausa indipendente si scrive SLEEP:1.0s (senza elenco di velocità separato da virgole)

**Scelta del ritardo.** Il driver stesso può rilevare se il servo si è fermato, ma la riproduzione delle sequenze usa ritardi fissi. Stimare all'incirca come corsa angolare / (velocità × 57.3 × 0.7) secondi, lasciando un margine — su una mano sotto carico, un movimento oltre circa 130° a velocità 3 richiede 1.0 secondi o più.

### Esempio di formato YAML

```text
poses:
  open:
    positions: [-35, -35, -35, -35, -35, -35, -35, -35]
  close:
    positions: [75, 75, 75, 75, 75, 75, 75, 75]
  ring_close:                 # 无名指握紧,其余张开
    positions: [75, 75, -35, -35, -35, -35, -35, -35]

sequences:
  demo:
    steps:
      - "open:3,3,3,3,3,3,3,3|2.0s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
      - "ok:3,3,3,3,3,3,3,3|1.0s"
      - "victory:3,3,3,3,3,3,3,3|1.0s"
      - "greeting:3,3,3,3,3,3,3,3|1.5s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
  wave:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.8s"
      - "wave_r:5,5,5,5,5,5,5,5|0.6s"
      - "wave_l:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.8s"
  finger_roll:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.5s"
      - "ring_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
      - "middle_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
```

La riproduzione in loop è controllata a runtime (la casella della GUI) e non viene più scritta nel YAML.

---

## Test

Il progetto include 284 test unitari/di integrazione/di sistema e 54 test hardware.

### Eseguire tutti i test (senza hardware)

```text
pytest
```

### Eseguire i test hardware di GUI + CLI (richiede servo collegati)

```text
pytest tests/test_system_hardware.py --hardware --port /dev/ttyACM0
pytest tests/test_cmd_hardware.py --hardware --port /dev/ttyACM0
# 或两个一起:
pytest tests/test_system_hardware.py tests/test_cmd_hardware.py --hardware
```

test_system_hardware.py verifica connessione, applicazione delle pose, lettura della telemetria, apertura/chiusura e saluto con un singolo dito, controllo della velocità, esecuzione delle sequenze e rilevamento del movimento.

test_cmd_hardware.py verifica end-to-end il livello CLI: posizioni delle pose, parametri di velocità, passi delle sequenze, wait_for_motion, output di --list e disattivazione della coppia all'uscita.

I criteri di accettazione completi sono in docs/REQUIREMENTS.md.

> Nota: i test non hardware verificano i **valori predefiniti di fallback** in hand_logic.py, che seguono ancora la scala originale −40…110. A runtime data/config.yaml li sovrascrive, quindi i test passano indipendentemente dalla calibrazione — ma questo significa anche che **i test non validano i parametri di calibrazione attuali**.

---

## Configurazione degli ID dei servo

Tutorial per configurare gli ID dei servo con il software ufficiale Feetech e la scheda driver del bus seriale: [https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/](https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/)

Download del software Feetech: [https://github.com/Robot-Maker-SAS/FeetechServo](https://github.com/Robot-Maker-SAS/FeetechServo)

---

## Ringraziamenti

Progetto originale: [Betatester777](https://github.com/Betatester777/AmazingHandControl) Hardware e firmware di riferimento: [Pollen Robotics](https://github.com/pollen-robotics/AmazingHand)
