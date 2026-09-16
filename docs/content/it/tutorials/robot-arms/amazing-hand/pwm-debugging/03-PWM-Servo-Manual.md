---
title: "03-Versione con servomotori PWM-Manuale d'uso"
description: "Questo firmware viene eseguito sulla scheda di sviluppo ESP32-S3 e, tramite segnali PWM."
---

# 03-Versione con servomotori PWM-Manuale d'uso

## Indice

1. Panoramica

2. Cablaggio hardware

3. Compilazione e flashing del firmware

4. Protocollo di comunicazione seriale

5. Riferimento dei comandi

6. Tutorial d'uso del software host

7. Tracciamento dei gesti

8. Regolazione fine dei parametri dei gesti

9. Domande frequenti

---

## 1. Panoramica

Questo firmware viene eseguito sulla scheda di sviluppo **ESP32-S3** e, tramite segnali PWM, controlla 8 canali di servomotori che azionano la mano abile nell'esecuzione dei gesti. Il software host (PC/Raspberry Pi/altri MCU) invia comandi sotto forma di frame binari tramite la porta seriale USB; ESP32 li interpreta, esegue il gesto corrispondente e restituisce una risposta.

Il progetto fornisce due implementazioni del firmware:

|Firmware|Cartella|Caratteristiche|
|---|---|---|
|**Versione ESP-IDF** （consigliata）|`esp-idf/AmazingHand_Serial/`|Struttura di progetto a componenti, doppio task FreeRTOS, pronta per la produzione|

> Le due implementazioni del firmware condividono lo **stesso protocollo seriale** e lo **stesso set di comandi**; i parametri dei gesti possono essere presi come riferimento reciprocamente。

### Gesti supportati (11 comandi gestuali)

|Gesto|Comando|Descrizione|
|---|---|---|
|Sasso|0x01|Morra: pugno con tutte le dita|
|Forbici|0x02|Morra: indice+medio estesi a formare una V|
|Carta|0x03|Morra: tutte le dita aperte|
|Pollice in su|0x04|Pollice alzato, le altre dita chiuse a pugno|
|Scherno 1|0x05|Muovere l'indice ("no no no")|
|Scherno 2|0x06|Anulare esteso e oscillante (in sostituzione del mignolo)|
|Apri|0x07|Tutte le dita aperte|
|Pugno|0x08|Tutte le dita chiuse|
|OK|0x09|Gesto OK|
|Pizzico|0x0A|Gesto di pizzico|
|Indica|0x0C|Indice esteso nell'azione di "indicare"|
|Azionamento diretto|0xF0|Controllo diretto dell'angolo degli 8 canali di servomotori|
|Impostazione mano destra/sinistra|0xF1|Commuta la modalità mano sinistra/mano destra|
|Ripeti|0xFE|Ripete l'esecuzione dell'ultimo gesto|
|Stop|0xFF|Termina immediatamente il gesto corrente|
|NOP|0x00|Test del collegamento|

> Nota: il comando 0x0B è disattivato (il precedente "pollice verso il basso" coincideva con l'azione "pollice in su" ed è stato rimosso)。

---

## 2. Cablaggio hardware

### Hardware compatibile

|Voce|Modello|
|---|---|
|Unità di controllo|Scheda di sviluppo **ESP32-S3** (优信 YX-ESP32-S3 o equivalente)|
|Servomotori|8 canali di servomotori PWM analogici (SG90 o equivalenti)|
|Scheda adattatrice|Scheda adattatrice per servomotori PWM|

La scheda di sviluppo ESP32-S3 dispone di due interfacce Type-C:

- **USB Serial/JTAG integrato**: collega direttamente il controller USB integrato nel chip ESP32-S3

- **FT232 esterno**: comunica tramite il chip convertitore seriale FT232

> Entrambe le interfacce possono essere usate per la comunicazione seriale; è sufficiente sceglierne una. Nel software host selezionare il nome del dispositivo seriale corrispondente。

### Servomotori → scheda adattatrice

Inserire i connettori 3P degli 8 servomotori nei pin header dei servomotori 1-8 della scheda adattatrice, in base al numero ID。

### Scheda adattatrice → ESP32-S3

|Scheda adattatrice|ESP32-S3 GPIO|Descrizione|
|---|---|---|
|PWM1|**4**|Indice articolazione 1|
|PWM2|**5**|Indice articolazione 2|
|PWM3|**6**|Medio articolazione 1|
|PWM4|**7**|Medio articolazione 2|
|PWM5|**15**|Anulare articolazione 1|
|PWM6|**16**|Anulare articolazione 2|
|PWM7|**17**|Pollice articolazione 1|
|PWM8|**18**|Pollice articolazione 2|
|5V|5V|Alimentazione (derivata dalla scheda adattatrice)|
|GND|GND|**Massa comune obbligatoria, collegare almeno un filo**|

> Mano destra e mano sinistra condividono la stessa mappatura GPIO. Quando si commuta in modalità "mano sinistra", il firmware specularizza la direzione di movimento del pollice all'interno dei gesti; i pin restano invariati。

### Alimentazione

La scheda adattatrice dispone di due gruppi di porte di alimentazione 5V/GND:

- Un gruppo è derivato dal cavo Type-C e va collegato a un alimentatore **5V 3A**

- L'altro gruppo è derivato per alimentare il pin **5V** dell'ESP32-S3 (la scheda di sviluppo non necessita più di alimentazione tramite Type-C)

---

## 3. Compilazione e flashing del firmware

### 3.1 Versione ESP-IDF (consigliata)

> **Avvertenza: requisito sul percorso**: la compilazione ESP-IDF non supporta percorsi con caratteri cinesi. Assicurarsi che il percorso in cui si trova il progetto sia completamente in inglese (inclusa la cartella utente e le directory superiori)。

#### Struttura del progetto

```Plaintext
esp-idf/AmazingHand_Serial/
├── CMakeLists.txt              # 顶层工程配置
├── sdkconfig.defaults          # 默认 Kconfig 配置
├── main/
│   ├── CMakeLists.txt
│   └── main.c                  # FreeRTOS 双任务 + 初始化（胶水层）
└── components/
    ├── hand_servo/             # 舵机驱动（LEDC PWM + 校准数据）
    ├── hand_gestures/          # 手势参数宏 + 手势函数 + 左右手控制
    └── hand_protocol/          # 串口帧解析 + 命令分发
```

#### Ambiente di build

- ESP-IDF **v6.0.1**

- Chip di destinazione: **ESP32-S3**

- Variabili d'ambiente di `idf.py` già configurate

#### Compilazione e flashing

```Bash
cd esp-idf/AmazingHand_Serial

# 1. Impostare il chip di destinazione (la prima volta o quando si cambia chip)
idf.py set-target esp32s3

# 2. Compilare
idf.py build

# 3. Flashare (Windows: usare la porta COM, ad esempio COM3)
idf.py -p COM3 flash

# 4. Monitoraggio della porta seriale (opzionale, baud rate 115200)
idf.py -p COM3 monitor
```

> Dopo aver modificato qualsiasi codice sorgente in `components/` o `main/`, è sufficiente rieseguire `idf.py build && idf.py -p COM3 flash`。

### 3.3 Calibrazione (opzionale, consigliata al primo utilizzo)

La posizione centrale e la larghezza d'impulso dei servomotori devono essere calibrate in base al meccanismo reale. Esistono due modalità:

- **Versione ESP-IDF**: modificare `middle_pos[8]` (riga 40) e `min_pw/mid_pw/max_pw[8]` (righe 45-47) in `components/hand_servo/hand_servo.c`

Dopo la calibrazione occorre ricompilare ed eseguire nuovamente il flashing。

---

## 4. Protocollo di comunicazione seriale

### 4.1 Livello fisico

|Parametro|Valore|
|---|---|
|Interfaccia|USB Serial (UART0)|
|Baud rate|**115200**|
|Bit di dati|8|
|Bit di parità|Nessuno (None)|
|Bit di stop|1|
|Controllo di flusso|Nessuno|

### 4.2 Formato dei frame

#### Host → ESP32 (frame di comando)

```Plaintext
┌────────┬────────┬──────────┬────────────────┬──────────┐
│  0xAA  │ CMD_ID │ DATA_LEN │ DATA[0 .. N-1] │ CHECKSUM │
│ 1 Byte │ 1 Byte │  1 Byte  │    N Bytes     │  1 Byte  │
└────────┴────────┴──────────┴────────────────┴──────────┘
 帧头      命令ID    数据长度      数据负载         校验和
```

- **Intestazione del frame**: fissa `0xAA`, identifica l'inizio di un frame

- **CMD_ID**: numero del comando (vedere Riferimento dei comandi)

- **DATA_LEN**: numero di byte del payload dei dati (0-8; i frame superiori a 8 non sono validi)

- **DATA**: payload dei dati, la cui lunghezza è determinata da DATA_LEN

- **CHECKSUM**: `CMD_ID ^ DATA_LEN ^ DATA[0] ^ ... ^ DATA[N-1]` (verifica XOR)

> Se DATA_LEN = 0, allora CHECKSUM = CMD_ID。

#### ESP32 → host (frame di risposta)

```Plaintext
┌────────┬────────┬────────┬──────────┐
│  0xBB  │ CMD_ID │ STATUS │ CHECKSUM │
│ 1 Byte │ 1 Byte │ 1 Byte │  1 Byte  │
└────────┴────────┴────────┴──────────┘
 帧头      命令ID    状态码    校验和
```

- **Intestazione del frame**: fissa `0xBB`

- **CMD_ID**: numero del comando originale

- **STATUS**: codice di stato (vedere la tabella seguente)

- **CHECKSUM**: `CMD_ID ^ STATUS`

#### Codici di stato

|STATUS|Significato|Descrizione|
|---|---|---|
|0x00|OK|Comando accettato, inizio dell'esecuzione|
|0x01|Comando non valido|CMD_ID non presente nella tabella dei comandi|
|0x02|Errore di parametro|Lunghezza o contenuto dei dati non corretto|
|0x03|Occupato|Gesto in esecuzione, nuovi comandi temporaneamente non accettati|
|0x10|Completato|Esecuzione del gesto terminata|

### 4.3 Sequenza temporale della comunicazione

```Plaintext
主机                          ESP32
 │                              │
 │──── [AA 01 00 01] ────────→│  发送"石头"命令
 │                              │
 │←─── [BB 01 00 01] ─────────│  ACK: 命令已接受
 │                              │
 │                      (执行手势中)
 │                              │
 │←─── [BB 01 10 11] ─────────│  完成: 手势执行完毕
 │                              │
 │──── [AA 02 00 02] ────────→│  发送"剪刀"命令
 │                              │
 │←─── [BB 02 00 02] ─────────│  ACK
 │                              │
```

### 4.4 Arresto del gesto & timeout dei frame

- L'invio di `[AA FF 00 FF]` interrompe in qualsiasi momento il gesto in esecuzione

- Se ESP32 non ha ricevuto completamente un frame entro 200 ms, lo scarta automaticamente (per evitare una perdita di sincronizzazione permanente dovuta a byte mancanti)

- I frame con checksum non corrispondente vengono scartati silenziosamente; il software host deve implementare la ritrasmissione per timeout

### 4.5 Modalità mano destra/sinistra

Modalità predefinita: mano destra. Inviare `[AA F1 01 02 F2]` per passare alla mano sinistra e `[AA F1 01 01 F1]` per tornare alla mano destra. La mano destra/sinistra influisce sulla direzione di movimento del pollice (gesti che coinvolgono il pollice come sasso/forbici/pollice in su/OK/pizzico)。

---

## 5. Riferimento dei comandi

### 5.1 Comandi dei gesti (0x01-0x0A, 0x0C)

Questi comandi non richiedono un payload dei dati (DATA_LEN=0); dopo la ricezione ESP32 esegue immediatamente il gesto corrispondente。

|Comando|Frame HEX|Risposta|Descrizione|
|---|---|---|---|
|Sasso|`AA 01 00 01`|`BB 01 00 01` → `BB 01 10 11`|Pugno con tutte le dita|
|Forbici|`AA 02 00 02`|`BB 02 00 02` → `BB 02 10 12`|Indice+medio estesi|
|Carta|`AA 03 00 03`|`BB 03 00 03` → `BB 03 10 13`|Tutte le dita aperte|
|Pollice in su|`AA 04 00 04`|`BB 04 00 04` → `BB 04 10 14`|Pollice alzato|
|Scherno 1|`AA 05 00 05`|`BB 05 00 05` → `BB 05 10 15`|Muovere l'indice (circa 2.5s)|
|Scherno 2|`AA 06 00 06`|`BB 06 00 06` → `BB 06 10 16`|Anulare oscillante (circa 2.5s)|
|Apri|`AA 07 00 07`|`BB 07 00 07` → `BB 07 10 17`|Tutte le dita aperte|
|Pugno|`AA 08 00 08`|`BB 08 00 08` → `BB 08 10 18`|Tutte le dita chiuse|
|OK|`AA 09 00 09`|`BB 09 00 09` → `BB 09 10 19`|Gesto OK|
|Pizzico|`AA 0A 00 0A`|`BB 0A 00 0A` → `BB 0A 10 1A`|Gesto di pizzico|
|Indica|`AA 0C 00 0C`|`BB 0C 00 0C` → `BB 0C 10 1C`|Indice esteso nell'azione di "indicare"|

### 5.2 Comando di azionamento diretto (0xF0)

Controlla direttamente l'angolo degli 8 canali di servomotori; gli 8 byte di dati corrispondono rispettivamente ai servomotori 1-8 e ogni byte ha un intervallo di valori da 0 a 180。

**Esempio: centratura di tutti i servomotori (90°)**

```Plaintext
发送: AA F0 08 5A 5A 5A 5A 5A 5A 5A 5A F8
       │  │  │  └── 8 个 0x5A (90°) ──┘  │
       │  │  │                            └── CHECKSUM
       │  │  └── DATA_LEN = 8
       │  └── CMD_DIRECT_DRIVE
       └── 帧头
```

Checksum = `F0 ^ 08 ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A` = `F8`

> Gli 8 valori 0x5A identici, XOR a due a due, danno 0x00; alla fine `0xF0 ^ 0x08 ^ 0x00 = 0xF8`

**Esempio: indice aperto(servomotore 1=170°, servomotore 2=10°), gli altri centrati(90°)**

```Plaintext
发送: AA F0 08 AA 0A 5A 5A 5A 5A 5A 5A 58
               └─170°  └─10°
```

### 5.3 Impostazione mano destra/sinistra (0xF1)

1 byte di dati: `0x01` = mano destra, `0x02` = mano sinistra。

```Plaintext
设右手: AA F1 01 01 F1
设左手: AA F1 01 02 F2
```

### 5.4 Comandi di controllo

|Comando|Frame HEX|Descrizione|
|---|---|---|
|NOP|`AA 00 00 00`|Test del collegamento, restituisce immediatamente `BB 00 00 00`|
|Ripeti|`AA FE 00 FE`|Ripete l'esecuzione dell'ultimo gesto|
|Stop|`AA FF 00 FF`|Termina immediatamente il gesto corrente|

### 5.5 Riferimento rapido delle risposte

Alla ricezione di un comando non valido (prendendo come esempio il comando inesistente 0xFC):

```Plaintext
发送: AA FC 00 FC
响应: BB FC 01 FD    （STATUS=0x01 无效命令）
```

> Verifica del checksum: `FC ^ 00 = FC`, risposta `FC ^ 01 = FD`

---

## 6. Tutorial d'uso del software host

Nella directory radice del progetto sono forniti due strumenti host:

|Strumento|File|Tipo|Uso|
|---|---|---|---|
|**Interfaccia grafica**|`hand_gui.py` / exe preconfezionato|Visuale|Pulsanti per i gesti, azionamento diretto tramite cursori, log|
|**Test da riga di comando**|`serial_test.py`|A comandi|Invio di gesti/singolo servomotore/scansione in frequenza, test automatizzati|

> Entrambi richiedono solo la dipendenza `pyserial`. Installazione: `pip install -r requirements.txt`

### 6.1 GUI visuale (consigliata)

#### Modalità A: esecuzione dell'exe preconfezionato (per il cliente)

1. Ottenere `AmazingHand控制台.exe` (o la cartella dopo l'estrazione)

2. **Fare doppio clic sull'exe** per eseguirlo direttamente, senza installare Python

3. Collegare e usare seguendo i passaggi riportati sotto

#### Modalità B: esecuzione dal codice sorgente

```Bash
# 1. Installare le dipendenze
pip install -r requirements.txt

# 2. Eseguire
python hand_gui.py
```

#### Passaggi per l'uso della GUI

1. **Selezionare la porta seriale**: nel menu a discesa in alto selezionare la porta COM corrispondente a ESP32 (verificare in Gestione dispositivi di Windows)

2. **Cliccare su "Connetti"**: la spia di stato diventa verde, nell'area del log compare "Connesso" e viene inviato automaticamente un test del collegamento NOP

3. **Comandi gestuali**: cliccare i pulsanti «Sasso», «Forbici», «Carta», «Pollice in su», «OK» … e la mano meccanica esegue il gesto corrispondente

4. **Mano destra/sinistra**: selezionare «Mano destra» / «Mano sinistra» per commutare la direzione speculare del pollice

5. **Azionamento diretto dei servomotori**: trascinare gli 8 cursori per controllare in tempo reale l'angolo di un singolo servomotore（0-180°）

6. **Controllo differenziale delle dita**（consigliato）: due barre di avanzamento per ogni dito——**Piega/Distendi** controlla i due servomotori di quel dito in differenziale inverso (piegatura/estensione), **Oscilla a destra/Oscilla a sinistra** controlla l'oscillazione concorde. I due gradi di libertà sono indipendenti e azionati in modo sincrono

7. **Ripeti / Stop**: ripete l'ultimo gesto / interrompe immediatamente il gesto corrente

8. **Log di comunicazione**: in basso mostra in tempo reale i frame inviati/ricevuti e lo stato delle risposte

### Spiegazione del controllo differenziale delle dita

Ogni dito è **azionato in modo differenziale da due servomotori**, con due gradi di libertà ortogonali:

|Barra di avanzamento|Funzione|Effetto meccanico|
|---|---|---|
|**Piega◀▶Distendi**|I due servomotori ruotano in senso inverso (differenziale)|Il dito si piega o si distende|
|**Oscilla a destra◀▶Oscilla a sinistra**|I due servomotori ruotano in senso concorde|Il dito oscilla a destra e a sinistra|

- Intervallo del cursore **Piega/Distendi**: -70 ~ +70 (0 = neutro, +70 = completamente disteso, -70 = completamente piegato)

- Intervallo del cursore **Oscillazione destra/sinistra**: 60 ~ 120 (90 = neutro, 60 = oscillazione a destra, 120 = oscillazione a sinistra)

- Angolo del servomotore = `oscillazione ± piegatura`; i due servomotori si aggiornano in modo **sincrono** e inviano il comando di azionamento diretto

> Esempio (indice GPIO4/5): cursore di piegatura portato a +70, oscillazione mantenuta a 90 → servomotore 4=160°, servomotore 5=20° (completamente disteso); piegatura portata a -70 → servomotore 4=20°, servomotore 5=160° (completamente piegato)。

### 6.2 Test a comandi (serial_test.py)

#### Uso da riga di comando

```Bash
# Visualizzare la guida
python serial_test.py

# Test del collegamento
python serial_test.py COM3 nop

# Inviare il gesto
python serial_test.py COM3 rock        # 石头
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 张开
python serial_test.py COM3 close        # 握拳

# Azionamento diretto di un singolo servo
python serial_test.py COM3 servo 1 90   # 舵机1 → 90°

# Centrare tutto
python serial_test.py COM3 mid

# Impostare mano sinistra/destra
python serial_test.py COM3 hand L       # 左手
python serial_test.py COM3 hand R       # 右手

# Scansione di frequenza / autotest
python serial_test.py COM3 sweep 1      # 舵机1 扫频
python serial_test.py COM3 test         # 全部舵机逐个测试
```

#### Modalità interattiva

```Bash
python serial_test.py COM3
```

Entra nella REPL; digitare direttamente i comandi abbreviati (ad es. `servo 3 180`, `rock`, `mid`, `quit`)。

### 6.3 Test manuale con strumenti seriali (opzionale)

**CoolTerm** (macOS/Windows/Linux):

1. Aprire CoolTerm, `Options` → impostare il baud rate a 115200, 8N1

2. `Connection` → `Send String` → selezionare `Hex`

3. Digitare `AA 01 00 01` → inviare → la mano meccanica esegue "sasso"

4. Osservare che nell'area delle risposte compaia `BB 01 00 01 ... BB 01 10 11`

**SerialTool** (macOS):

```Bash
brew install serialtool
echo -ne '\xAA\x01\x00\x01' > /dev/cu.usbserial-0001
```

### 6.4 Script di controllo Python (sviluppo personalizzato)

```Python
#!/usr/bin/env python3
"""灵巧手串口控制 - Python 上位机示例"""
import serial
import time

SERIAL_PORT = "/dev/cu.usbserial-0001"  # 修改为实际端口
BAUD_RATE   = 115200

# Definizione dei comandi (coerente con l'insieme dei comandi del firmware)
CMD = {
    "nop":       0x00,
    "rock":      0x01,
    "scissors":  0x02,
    "paper":     0x03,
    "thumbs_up": 0x04,
    "taunt1":    0x05,
    "taunt2":    0x06,
    "open":      0x07,
    "close":     0x08,
    "ok":        0x09,
    "pinch":     0x0A,
    "index":     0x0C,
    "direct":    0xF0,
    "set_side":  0xF1,
    "repeat":    0xFE,
    "stop":      0xFF,
}

def calc_checksum(cmd_id, data=b""):
    """计算 XOR 校验和 (CMD ^ LEN ^ DATA[0..N])"""
    result = cmd_id ^ len(data)
    for b in data:
        result ^= b
    return result & 0xFF

def send_command(ser, cmd_id, data=b""):
    """发送命令帧，返回 (ack_status, completion_status)"""
    data_len = len(data)
    checksum = calc_checksum(cmd_id, data)
    frame = bytes([0xAA, cmd_id, data_len]) + data + bytes([checksum])
    ser.write(frame)
    print(f"发送: {frame.hex(' ').upper()}")

def read_response(ser, timeout=1.0):
    """读取一个响应帧 [0xBB CMD STATUS CKSUM]"""
    ser.timeout = timeout
    while True:
        b = ser.read(1)
        if not b:
            return None
        if b[0] == 0xBB:
            buf = ser.read(3)
            if len(buf) == 3:
                expected = buf[0] ^ buf[1]
                if expected == buf[2]:
                    return bytes([0xBB]) + buf
    return None

def set_side(ser, side):
    """设置左右手: side='R' 右手, side='L' 左手"""
    val = 0x01 if side.upper() == 'R' else 0x02
    send_command(ser, CMD["set_side"], bytes([val]))

def direct_drive(ser, angles):
    """直驱 8 路舵机: angles 为 8 个 0-180 的角度列表"""
    data = bytes([min(180, max(0, a)) for a in angles[:8]])
    send_command(ser, CMD["direct"], data)

# ===== Esempio di utilizzo =====
if __name__ == "__main__":
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    time.sleep(1)  # 等待 ESP32 复位完成

# 1. Test del collegamento
    print("=== NOP 链路测试 ===")
    send_command(ser, CMD["nop"])

# 2. Gioco di morra cinese
    print("\n=== 猜拳: 石头 → 剪刀 → 布 ===")
    for name in ["rock", "scissors", "paper"]:
        send_command(ser, CMD[name])
        time.sleep(0.5)

# 3. Gesto pollice in su
    print("\n=== 真棒 ===")
    send_command(ser, CMD["thumbs_up"])

# 4. Interrompere il test
    print("\n=== 停止测试 ===")
    send_command(ser, CMD["taunt1"])  # 开始摇食指
    time.sleep(0.3)
    send_command(ser, CMD["stop"])    # 立即停止

# 5. Modalità azionamento diretto: centrare tutto
    print("\n=== 直驱: 归中 ===")
    direct_drive(ser, [90] * 8)

    ser.close()
```

---

## 7. Tracciamento dei gesti

Con una **telecamera si riconosce il palmo in tempo reale**, azionando la piegatura/estensione e l'oscillazione destra/sinistra delle dita della mano abile. Basato sull'algoritmo di tracciamento della mano ufficiale di AmazingHand (21 punti chiave MediaPipe + rotazione in coordinate mondiali 3D)。

### 7.1 Principio

- La telecamera inquadra il palmo → MediaPipe riconosce 21 punti chiave della mano

- Costruisce un sistema di coordinate locale della mano e calcola i vettori 3D delle punte delle 4 dita

- Vettori delle punte delle dita → parametri differenziali (flex, base) di ogni dito → riutilizzando il protocollo di azionamento diretto vengono inviati ai servomotori

### 7.2 Requisiti dell'ambiente

Il tracciamento dei gesti dipende da **Python a 64 bit + mediapipe 0.10.14** (API solutions di vecchia versione; solo questa è in grado di gestire le coordinate mondiali 3D):

|Dipendenza|Versione|
|---|---|
|Python|3.12 a 64 bit|
|mediapipe|0.10.14|
|numpy|<2.0|
|scipy|>=1.9|
|opencv-python|>=4.10|
|Pillow|>=10.0|

> **Nota**: l'ambiente predefinito attuale è Python a 32 bit e non consente l'installazione di mediapipe. È necessario installare separatamente Python 3.12 a 64 bit (installandolo sul disco D, ad es. `D:\Python312-64`, che coesiste completamente con i 32 bit esistenti senza conflitti)。

### 7.3 Distribuzione in un clic

1. Installare Python 3.12 a 64 bit (scaricare l'installer a 64 bit da [python.org](https://www.python.org/downloads/) e installarlo in `D:\Python312-64`)

2. Fare doppio clic per eseguire **`setup_tracking.bat`** nella directory radice del progetto

    - Ricerca automatica di Python a 64 bit

    - Creazione dell'ambiente virtuale `tracking_env`

    - Installazione delle dipendenze come mediapipe 0.10.14

    - Verifica dell'installazione

### 7.4 Passaggi d'uso

1. Avviare la GUI con l'ambiente di tracciamento:

```Plaintext
tracking_env\Scripts\python hand_gui.py
```

2. Collegare la porta seriale（selezionare la porta COM corrispondente a ESP32）

3. Nel pannello "Tracciamento dei gesti" selezionare il numero della telecamera（predefinito 0）

4. Cliccare su **"Avvia tracciamento"** → l'immagine della telecamera viene mostrata nel pannello

5. Puntare il palmo verso la telecamera:

    - **Piegatura/estensione delle dita** → le dita corrispondenti della mano abile si piegano/si distendono

    - **Rotazione del palmo a destra/sinistra** → le dita della mano abile oscillano a destra/sinistra

6. Cliccare su **"Arresta tracciamento"** per terminare

> Se non viene rilevata una mano, il pannello mostra "nessuna mano rilevata"; dopo il rilevamento mostra "mano rilevata: Right/Left"。

### 7.5 Calibrazione dei parametri

I coefficienti di mappatura si trovano in fondo a `hand_tracking.py` (`FLEX_SCALE` / `BASE_SCALE`):

```Python
FLEX_SCALE = 80.0    # 指尖 z 分量 → 弯曲/伸直 (flex)
BASE_SCALE = 30.0    # 指尖 x 分量 → 左右摆动 (base)
```

Se l'ampiezza di piegatura/estensione è insufficiente o la direzione è invertita, regolare `FLEX_SCALE`; se l'ampiezza dell'oscillazione destra/sinistra è insufficiente o invertita, regolare `BASE_SCALE` (il segno più/meno regola la direzione)。

---

## 8. Regolazione fine dei parametri dei gesti

### 8.1 Posizione dei parametri

Gli scostamenti angolari di ogni gesto sono definiti con macro `#define`; **non è necessario modificare il codice logico**, basta regolare i valori。

- **Versione ESP-IDF**: area "parametri dei gesti (regolabili dall'utente)" in cima a `components/hand_gestures/hand_gestures.c`

### 8.2 Significato dei parametri

```C
// Esempio: gesto sasso
#define ROCK_IDX_OFF1    70    // Scostamento dell'articolazione 1 dell'indice
#define ROCK_IDX_OFF2   -70    // Scostamento dell'articolazione 2 dell'indice
```

- **Valore positivo = piegare e stringere**, **valore negativo = estendere e aprire**

- 2 scostamenti per ogni dito, relativi a `middle_pos` (predefinito 90°)

- Struttura differenziale: la differenza tra gli scostamenti dei due servomotori = estensione/contrazione, la componente concorde = deviazione destra/sinistra

### 8.3 Passaggi per la regolazione dei parametri

1. Trovare la macro `#define` del gesto corrispondente

2. Modificare il valore (aumentare → ampiezza maggiore; diminuire → ampiezza minore)

3. Ricompilare ed eseguire il flashing, quindi testare l'effetto con il software host

4. Regolare ripetutamente finché il movimento non risulta naturale

---

## 9. Domande frequenti

### Q1: Il software host non riesce a connettersi alla porta seriale?

1. Verificare che ESP32 sia collegato al computer tramite Type-C

2. Controllare che il numero della porta COM in Gestione dispositivi coincida con quello selezionato nella GUI

3. Verificare il baud rate 115200

4. Chiudere gli altri software che occupano la porta seriale

### Q2: L'invio dei comandi non produce alcuna reazione?

1. Inviare prima `AA 00 00 00`（NOP）; si dovrebbe ricevere `BB 00 00 00`

2. Verificare che il firmware sia stato flashato e che il chip di destinazione sia ESP32-S3

3. Controllare il cablaggio（se il GND è in comune）

### Q3: L'ampiezza del movimento del gesto è errata o la direzione è invertita?

Passare alla regolazione fine dei parametri dei gesti（vedere la Sezione 7）e regolare la macro corrispondente。

### Q4: Quali gesti sono influenzati dalla modalità mano destra/sinistra?

I gesti che **coinvolgono il pollice** come sasso/forbici/pollice in su/OK/pizzico: dopo il cambio di mano la direzione del pollice viene specularizzata。

### Q5: Le dita si bloccano e non riescono a distendersi?

Prima dell'esecuzione di tutti i gesti di contrazione, il sistema esegue automaticamente un "prima apertura completa della mano e poi chiusura", per evitare che le dita siano bloccate dal gesto precedente. Se il blocco persiste, controllare l'assemblaggio meccanico o ridurre l'ampiezza di contrazione。

