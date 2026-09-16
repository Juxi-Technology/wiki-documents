---
title: "02-Tutorial del tracciamento dei gesti"
description: "\\# Tracciamento dei gesti — Tutorial d'uso (versione con servomotori PWM)"
---

# 02-Tutorial del tracciamento dei gesti

**\# Tracciamento dei gesti — Tutorial d'uso (versione con servomotori PWM)**

Questa cartella fornisce il **tracciamento dei gesti**: la telecamera riconosce la tua mano e la mano abile la segue in tempo reale (catena IK completa).

> Catena: telecamera → scheletro della mano mediapipe → MuJoCo+IK → 8 angoli articolari → ESP32 → servomotori PWM

> Compatibile con: ESP32-S3 + 8 canali di servomotori PWM. Per il flashing del firmware vedere `..\03_firmware_docs`.

## 1. Prerequisiti

1. **Hardware**: ESP32-S3 + 8 canali di servomotori PWM alimentati, USB collegato, telecamera disponibile.

2. **Firmware**: già flashato (vedere il manuale utente in `..\03_firmware_docs`).

3. **Prima distribuzione** (una sola volta, vedere sotto).

## 2. Prima distribuzione

### 2.1 Installazione dell'ambiente

Entrare in `Demo\Windows_Scripts_CN\` (per sistemi in inglese usare `Windows_Deploy_Scripts\`), fare doppio clic in ordine numerico:

```Plaintext
1-安装环境.bat   → 安装 Rust / uv / dora(几分钟)
```

Al termine **chiudere e riaprire il terminale** una volta.

### 2.2 Distribuzione della Demo

```Plaintext
3-部署代码.bat   → 创建 Python 环境 + 编译 AHControl + 安装依赖(几分钟)
```

## 3. Esecuzione del tracciamento dei gesti (ogni volta)

### 3.1 Doppio clic per eseguire lo script

Entrare in `Demo\Windows_Scripts_CN\`, fare doppio clic su `4-运行代码.bat`:

```Plaintext
Select a run mode:
   1 - 模拟仿真（摄像头手势追踪）
   2 - 真实硬件（SCS0009 总线舵机）
   3 - PWM 舵机（ESP32 直驱）    ← 选 3
```

Poi selezionare il tipo di mano:

```Plaintext
PWM 舵机（ESP32 直驱）- 请选择灵巧手：
   1 - 右手          ← 选 1
   2 - 左手          ← 选 2
```

### 3.2 Inizio dell'utilizzo

1. Lo script esegue automaticamente `dora build` + `dora run`.

2. Si apre la finestra della telecamera e compaiono le dita della simulazione 3D.

3. Mettere la mano nell'inquadratura e muovere le dita → **la simulazione 3D segue → la mano abile segue**.

4. Arresto: Ctrl+C (o chiudere la finestra).

> Sistemi Linux: usare `Demo\Linux_Scripts_CN\` (cinese) o `Linux_Deploy_Scripts\` (inglese); i nomi degli script terminano con `.sh` e vanno eseguiti con `bash nome_script` oppure aggiungendo il permesso di esecuzione.

## 4. Come verificare che il funzionamento sia corretto

Nella finestra di esecuzione il nodo AHControl restituisce:

```Plaintext
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N` (ad es. `sent 300 frames, ESP32 acked 300 frames`) → **normale**, il collegamento con i servomotori funziona.

- `M = 0` → ESP32 non ha ricevuto dati; controllare la porta seriale/l'alimentazione (vedere sotto).

Finché questa riga cresce, il collegamento con i servomotori è normale; quello che resta è solo la questione se la telecamera riesce a stare al passo.

## 5. Cambio tra mano destra e sinistra

È sufficiente selezionare il tipo di mano nel menu di esecuzione. Dopo il cambio lo script esegue automaticamente una nuova build; attendere il completamento prima di operare.

## 6. Domande frequenti

|Sintomo|Soluzione|
|---|---|
|I servomotori non si muovono affatto|Controllare l'alimentazione (5V 3A), la porta COM e i collegamenti; verificare se nel log `acked M frames` è 0|
|Nessuna immagine dalla telecamera|Concedere i permessi per la telecamera (Impostazioni→Privacy→Fotocamera)|
|La mano non segue / è lenta|Garantire luce sufficiente, mantenere la mano completamente nell'inquadratura, muovere più lentamente e con ampiezza maggiore|
|La forma della mano è invertita / direzione del pollice invertita|È stata selezionata la mano destra/sinistra corretta nel menu? Provare con l'altra|
|Cambiando la porta USB la porta seriale non viene trovata|Rieseguire `2-配置串口.bat` e selezionare una volta la nuova porta COM|

## 7. Utenti dei servomotori bus SCS0009

Questa Demo supporta anche i **servomotori bus SCS0009** ufficiali. Nel menu selezionare `2 - Hardware reale (servomotori bus SCS0009)`; per la configurazione e le istruzioni vedere `Demo\双版本舵机并存说明.md` e il tutorial ufficiale.

## Descrizione delle cartelle

|Percorso|Contenuto|
|---|---|
|`Demo\AHControl`|Programma Rust di controllo dei servomotori (codice sorgente, compilato automaticamente durante la distribuzione)|
|`Demo\AHSimulation`|Simulazione MuJoCo + risoluzione IK|
|`Demo\HandTracking`|Tracciamento della mano MediaPipe|
|`Demo\Windows_Scripts_CN` / `Windows_Deploy_Scripts`|Script one-click per Windows (cinese/inglese)|
|`Demo\Linux_Scripts_CN` / `Linux_Deploy_Scripts`|Script one-click per Linux (cinese/inglese)|
|`Demo\dataflow_*_pwm.yml`|Flusso di dati versione PWM (baud rate 115200 già integrato)|

