---
title: SO-ARM101 Teleoperazione wireless (versione ESP32-NanoCam)
description: "Soluzione di teleoperazione wireless per dimostrazioni in gara: il braccio leader si collega a un PC Ubuntu tramite LeRobot, il braccio follower è controllato dal modulo ESP32-NanoCam via micro-ROS WiFi, con il flusso completo di cablaggio, alimentazione, flashing, calibrazione e fotocamera FPV."
---

# SO-ARM101 Teleoperazione wireless (versione ESP32-NanoCam)

> **[Acquista nel negozio](https://www.juxitech.com/it/products/so-arm101-developers-kit)**

Questo tutorial si rivolge allo scenario di teleoperazione wireless del braccio robotico SO-ARM101 montato su drone per dimostrazioni in gara: il braccio leader si collega a un PC Ubuntu tramite LeRobot, il braccio follower è controllato dal modulo proprietario [Modulo video WiFi ESP32-S3](/it/products/esp32-s3-wifi-module) (ESP32-NanoCam, ESP32-S3 N16R8), riceve i comandi via micro-ROS WiFi UDP e integra fotocamera FPV, microfono, altoparlante e LED RGB di stato a bordo. In caso di problemi fare riferimento alla [Guida alla risoluzione dei problemi](./SO-ARM101-NanoCam-Troubleshooting.md).

## Introduzione e architettura del sistema

```text
SO-ARM101 主臂(leader) → USB 舵机驱动板 → Ubuntu 22.04 (LeRobot + ROS2 Humble + micro-ROS Agent)
                                            │  2.4 GHz Wi-Fi(同一局域网)
                                            ▼
                              ESP32-NanoCam 从臂控制器(ESP32-S3)
                                            │  1 Mbps UART(经舵机驱动板 UART 针脚中转)
                                            ▼
                              SO-ARM101 从臂(follower) 6 × STS3215
```

- Movimento dell'operatore sul braccio leader → LeRobot legge il braccio leader → topic ROS2 `/joint_command` → il micro-ROS Agent invia via UDP 8888 → l'ESP32-NanoCam riceve e pilota i 6 servomotori;
- Il braccio follower restituisce `/joint_states` (20Hz) come feedback, per il controllo ad anello chiuso e il watchdog;
- La fotocamera a bordo pubblica uno stream MJPEG `http://<IP>/stream` (FPV), convertibile in un topic ROS sul PC.

Divisione dei ruoli: il braccio leader è collegato al PC Ubuntu; il braccio follower è controllato dall'ESP32-NanoCam; i due comunicano in wireless. Funzionalità a bordo del firmware all'accensione:

| Funzione | Implementazione | Descrizione |
|---|---|---|
| Teleoperazione micro-ROS | `main.cpp` + `servo_bus.cpp` | Feedback `/joint_states` a 20Hz, ricezione comandi `/joint_command`, meccanismi di sicurezza completi integrati |
| Fotocamera FPV | `camera_stream.cpp` | Stream MJPEG `http://<IP>/stream` (QVGA) |
| Microfono | `audio_es8311.cpp` | Livello di volume ambientale → `/follower_audio/level` (Float32, 5Hz) |
| Altoparlante | `audio_es8311.cpp` | Toni di avvio/pronto/sbloccato/errore |
| LED RGB di stato | `rgb_status.cpp` | Avvio rosso → WiFi arancione → micro-ROS verde → sblocco blu; WiFi perso rosso |

## Distinta hardware

| Hardware | Quantità | Descrizione |
|---|---|---|
| SO-ARM101 braccio leader | 1 | Con 6 servomotori STS3215 |
| SO-ARM101 braccio follower | 1 | Con 6 servomotori STS3215 |
| Modulo ESP32-NanoCam | 1 | ESP32-S3 N16R8, fotocamera/audio/RGB a bordo |
| Scheda driver servomotori USB | 2 | Calibrazione + inoltro bus leader/follower (pin UART) |
| PC Ubuntu 22.04 | 1 | Esegue LeRobot + ROS2 + Agent |
| Router 2.4GHz o hotspot del telefono | 1 | PC del braccio leader e NanoCam nella stessa LAN |
| Alimentatore esterno 12V 5A | 1 | **Alimentazione del braccio follower** (la USB non regge 6 servomotori) |
| Alimentatore esterno 5V 6A | 1 | **Alimentazione del braccio leader** (collegato al PC Ubuntu) |
| Cavo dati USB-C | 2 | Alimentazione/debug NanoCam + scheda driver del braccio leader collegata al PC |

> Periferiche a bordo della NanoCam: fotocamera GC2145 (DVP); audio ES8311 (I2S 24kHz, microfono AP2718AT + altoparlante NS4150B); RGB WS2812 @ GPIO18.

## Cablaggio

Tra ESP32-NanoCam e il braccio follower il collegamento **passa attraverso i pin UART della scheda driver dei servomotori**:

```text
舵机驱动板 UART:   RX ←── NanoCam TX (P2-8 / GPIO20)
                   TX ──→ NanoCam RX (P2-7 / GPIO19)
                  GND ──→ NanoCam GND
```

- **TX collegato a RX e RX a TX (incrociati)**, GND in comune, baud rate 1 Mbps;
- Il bus servomotori della NanoCam usa UART1, collegato ai pin **P2-7 / P2-8** del modulo (la seriale di debug usa la USB-C, CH340K → UART0; le due sono completamente indipendenti e utilizzabili contemporaneamente);
- Il bus servomotori è collegato a massa con l'alimentazione dei servomotori (alimentatore 12V 5A del braccio follower).

### Pin principali della NanoCam

| Periferica | Pin |
|---|---|
| Bus servomotori (UART1) | TX=GPIO20 (P2-8 ESP_P), RX=GPIO19 (P2-7 ESP_N), header P2 del modulo |
| Seriale di debug (UART0) | GPIO43/44 → CH340K a bordo → USB-C (nessun USB CDC nativo) |
| Fotocamera DVP (GC2145) | D0~D7=GPIO4/2/1/3/5/7/8/10, PCLK=6, VSYNC=13, HREF=11, XCLK=9 (24MHz), PWDN=12, RESET=14, SCCB SDA/SCL=41/42 |
| Audio ES8311 (I2S) | MCLK=39, BCLK=38, WS=47, DIN(ADC)=40, DOUT(DAC)=48; I2C SDA/SCL=41/42, indirizzo 0x30 |
| Microfono | MEMS analogico AP2718AT (tramite ADC ES8311) |
| Altoparlante | Amplificatore classe D NS4150B (tramite DAC ES8311), nessun pin di enable PA sulla scheda |
| RGB | WS2812 @ GPIO18 (1 LED, GRB, pilotato via RMT) |
| BOOT | GPIO0 |

> Le definizioni dei pin provengono da `docs/reference/nano_config.h` e dalla documentazione degli schemi hardware.

## Alimentazione

| Dispositivo | Alimentazione |
|---|---|
| ESP32-NanoCam | **Alimentazione via cavo dati USB** (la seriale di debug CH340K funziona contemporaneamente) |
| Braccio follower (6×STS3215) | Alimentatore esterno **12V 5A** |
| Braccio leader (collegato al PC Ubuntu) | Alimentatore esterno **5V 6A** |

> ⚠️ La USB non regge 6 servomotori: il braccio follower deve usare l'alimentazione esterna 12V 5A; l'ESP32 si alimenta con il cavo dati USB.

## Requisiti dell'ambiente

### Lato compilazione e flashing (Windows / Linux / macOS)

| Voce | Requisito |
|---|---|
| Sistema operativo | Windows 10/11 o Linux (anche macOS) |
| Python | 3.8+ (verifica con `python --version`) |
| PlatformIO | Core 6.x (con toolchain esp32s3 + framework Arduino) |
| Spazio su disco | Almeno 3 GB liberi |
| Rete | Accesso a GitHub / Espressif CDN (primo download della toolchain circa 1-2 GB) |

### Lato esecuzione (PC Ubuntu 22.04, dove si esegue la teleoperazione)

| Voce | Requisito |
|---|---|
| Sistema operativo | Ubuntu 22.04 (64 bit) |
| ROS 2 | Humble (Hawksbill) |
| LeRobot | Con supporto Feetech SO-101 (`so101_leader` / `so101_follower`) |
| micro-ROS Agent | `snap run micro-ros-agent` o installazione da sorgente |
| Comandi richiesti | `nmcli`, `ip`, `flock` (inclusi in NetworkManager, iproute2, util-linux) |
| Ambiente Python | Ambiente virtuale `lerobot_so101` (conda/miniforge) |

> Riconoscimento della seriale di debug: l'interfaccia USB della NanoCam è un CH340K verso UART0; su Linux il nome del dispositivo è di solito `/dev/ttyUSB0` (oppure `/dev/serial/by-id/...CH340*`). PlatformIO la riconosce automaticamente (nella definizione della scheda è già configurato l'HWID 0x1A86:0x7523 del CH340); baud rate del monitor seriale 115200. Per un'installazione più completa dell'ambiente LeRobot/Ubuntu fare riferimento al [Tutorial SO-ARM101](./SO-ARM101-Tutorial.md).

## Passi di installazione

### 1. Installare PlatformIO (lato compilazione e flashing)

**Modo A: estensione VSCode (consigliato)**

1. Installare [VSCode](https://code.visualstudio.com/);
2. Cercare **PlatformIO IDE** nello store delle estensioni e installarlo; al termine VSCode si riavvia e scarica automaticamente PlatformIO Core;
3. Verificare con `pio --version` nel terminale di VSCode.

**Modo B: installazione da riga di comando**

```bash
pip install platformio
```

> Se sotto Windows il comando `pio` non viene trovato in Git Bash, usare un terminale PowerShell/CMD oppure aggiungere `C:\Users\<用户名>\.platformio\penv\Scripts` al PATH.

### 2. Prima compilazione (download automatico della toolchain)

Entrare nella directory del firmware ed eseguire una compilazione (senza flashing):

```bash
cd firmware/nanocam_soarm
pio run
```

Al primo avvio vengono scaricati in sequenza:

1. la piattaforma espressif32 (`espressif32@7.0.1`);
2. la **toolchain** `toolchain-xtensa-esp32s3` (circa 100 MB, da Espressif CDN);
3. il framework Arduino `framework-arduinoespressif32` (circa 200 MB).

Se il download è lento o si blocca:

- La stima del tempo rimanente di PlatformIO non è precisa: spesso resta ferma a lungo e poi salta di colpo; attendere 5 minuti osservando se la percentuale avanza;
- Attivare un proxy/VPN (tramite il proxy di sistema);
- Scaricare manualmente la toolchain: dal browser scaricare `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` (su Linux il corrispondente `-linux-amd64.tar.gz`), dopo l'estrazione rinominare la directory in `toolchain-xtensa-esp32s3`, copiarla in `C:\Users\<用户名>\.platformio\packages\` e rieseguire `pio run`;
- Un'interruzione con Ctrl+C a metà non danneggia l'ambiente: rieseguendo, il download riprende da dove era rimasto.

### 3. Installare l'ambiente di esecuzione Ubuntu

```bash
# 1. ROS 2 Humble(按官方文档安装)
#    https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html
source /opt/ros/humble/setup.bash

# 2. LeRobot(含 Feetech 支持)
conda create -n lerobot_so101 python=3.10 -y
conda activate lerobot_so101
pip install lerobot[feetech]

# 3. micro-ROS Agent
sudo snap install micro-ros-agent
snap run micro-ros-agent udp4 --port 8888   # 测试能否启动

# 4. PlatformIO(Ubuntu 端若也要编译烧录)
pip install platformio
```

## Configurazione del WiFi

Il PC e la NanoCam devono trovarsi nella stessa LAN (Wi-Fi 2.4GHz, va bene anche l'hotspot dello smartphone), e il router/hotspot non deve avere l'isolamento client attivo. La configurazione WiFi può avvenire in due modi, a scelta.

### Modo 1: configurazione in fase di compilazione (predefinita)

```bash
cd firmware/nanocam_soarm
cp src/wifi_config.example.h src/wifi_config.h
# 编辑 wifi_config.h:WIFI_SSID / WIFI_PASS / AGENT_IP(Ubuntu 电脑局域网 IP)
```

### Modo 2: configurazione tramite comandi seriali (consigliato, senza riflash)

Il firmware integra una configurazione a runtime (archiviata in NVS), inseribile in qualsiasi momento dalla seriale di debug (baud rate 115200):

| Comando | Funzione |
|---|---|
| `wifi_ssid:你的热点名` | Imposta e salva il nome WiFi |
| `wifi_pass:你的密码` | Imposta e salva la password WiFi |
| `agent_ip:Ubuntu电脑IP` | Imposta e salva l'IP del micro-ROS Agent |
| `wifi_show` | Mostra la configurazione attualmente attiva |
| `wifi_clear` | Cancella la configurazione salvata e ripristina i valori predefiniti di compilazione |

Dopo il salvataggio di qualsiasi comando di configurazione, il dispositivo **si riavvia automaticamente dopo 3 secondi** per applicarla. Priorità: configurazione salvata via seriale > predefinita di compilazione. Per cambiare hotspot o computer basta collegare la USB e digitare tre comandi, senza modificare il codice né riflashare.

> I valori predefiniti di compilazione (`wifi_config.h`) restano sempre come fallback quando la configurazione seriale non è mai stata usata; `wifi_show` distingue tra "da NVS" e "predefinito di compilazione". La password è memorizzata in chiaro nella NVS, accettabile per scenari dimostrativi in LAN; `wifi_config.h` contiene la password WiFi ed è già escluso da `.gitignore`: non committarlo nel repository.

## Flashing e avvio

```bash
cd firmware/nanocam_soarm
pio run --target upload
```

**Entrare in modalità download (passaggio critico)**: la NanoCam usa il download seriale CH340K → UART0 (non il download automatico via USB CDC). Eseguire prima direttamente upload: se la scheda ha il circuito di download automatico riuscirà subito; se segnala che non riesce a connettersi: **tenere premuto il tasto BOOT (GPIO0) → inserire la USB (o premere reset) → rilasciare BOOT**, poi rieseguire subito upload. Se sotto Windows la seriale non viene riconosciuta automaticamente, aggiungere una riga `upload_port = COM3` in `[env:nano_cam]` di `platformio.ini` (sostituendo COM3 con il numero di porta COM reale del CH340 nel Gestione dispositivi).

Per visualizzare i log seriali:

```bash
pio device monitor --baud 115200
```

Dopo il flashing si dovrebbe vedere (in questo ordine):

```text
audio: ES8311 ready @24000Hz      ← 音频初始化成功
Servo Ping mask: 0x3f             ← 6 个舵机全部在线
Servo calibration match: YES      ← 标定数组与舵机 EEPROM 一致
IP: 192.168.x.x  RSSI: -xx        ← WiFi 已连
Waiting for micro-ROS Agent...    ← 等待 Agent(下一步启动后消失)
```

> Durante il flashing il bus servomotori può restare scollegato: flashing e funzionamento dei servomotori non si interferiscono (UART0 per il debug / UART1 per i servomotori, indipendenti). Il progetto include già la libreria statica micro-ROS per ESP32-S3 (xtensa-lx7): per l'uso quotidiano non serve compilarla da soli.

## Istruzioni per la calibrazione

La directory `cali/` del progetto contiene già i file di calibrazione del braccio leader/follower e gli array di calibrazione nel firmware sono allineati alla calibrazione del follower (cioè `cali/follower_recal.json`). **La ricalibrazione è necessaria solo quando si sostituisce l'hardware del braccio follower/leader.**

```bash
# 从臂
python -m lerobot.scripts.lerobot_calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --robot.id=follower_recal --robot.calibration_dir="$PWD/cali"

# 主臂
python -m lerobot.scripts.lerobot_calibrate \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM0 \
  --teleop.id=leader_recal --teleop.calibration_dir="$PWD/cali"
```

Dopo aver ricalibrato il braccio follower, occorre aprire `firmware/nanocam_soarm/src/servo_bus.cpp` e sostituire i tre array `kHomingOffsets` / `kRangeMin` / `kRangeMax` con i valori del proprio `cali/follower_recal.json` (ordine: shoulder_pan, shoulder_lift, elbow_flex, wrist_flex, wrist_roll, gripper), quindi ricompilare e riflashare.

## Esecuzione della teleoperazione wireless

### Controlli prima dell'avvio

```bash
# 1. Ubuntu 电脑连上与 NanoCam 相同的 2.4GHz WiFi
# 2. 主臂 USB 舵机驱动板已连接并识别
ls -l /dev/ttyACM*   # 找到主臂串口
# 3. 从臂 NanoCam 已上电并联网(串口或浏览器确认 MJPEG 流可访问)
```

### Avvio con un solo comando

```bash
# 设置环境(或直接编辑 start_soarm_demo.sh 顶部的默认值)
export SOARM_WIFI_SSID="你的2.4G热点"
export SOARM_AGENT_IP="Ubuntu电脑IP"
export SOARM_LEADER_PORT="/dev/ttyACM*"
export SOARM_PYTHON="$(command -v python)"   # lerobot_so101 环境

./start_soarm_demo.sh --check    # 预飞检查:网络/主臂/Agent/从臂在线
./start_soarm_demo.sh            # 正式启动遥操作,Ctrl+C 停止
```

Lo script esegue in ordine:

1. verifica la rete (l'SSID deve corrispondere a quello impostato), la seriale del braccio leader e la presenza dei file di calibrazione;
2. avvia il micro-ROS Agent (se non è già in esecuzione; il log è in `logs/micro_ros_agent.log`);
3. attende che `/joint_states` del braccio follower sia online (timeout 15s);
4. movimento del braccio leader → il follower segue, frequenza dei comandi 30Hz, **`--mapping-mode absolute` (mappatura assoluta)**.

**Sulla mappatura absolute**: la posa del braccio leader e quella del follower corrispondono biunivocamente nei rispettivi sistemi di coordinate calibrati; il vantaggio è **l'assenza di deriva accumulata dopo una disconnessione e riconnessione** — alla riconnessione il follower si allinea fluidamente entro 8 secondi alla posa attuale del leader (startup_blend), dopodiché quando il leader torna a zero anche il follower torna al proprio zero. In precedenza si usava la mappatura relative (relativa), ma dopo una riconnessione il follower restava nella posizione di disconnessione, creando una deriva permanente rispetto al leader tornato a zero: per questo si è passati ad absolute.

**Riavvio automatico in caso di perdita dell'Agent** (firmware successivo al 2026-08-19): dopo aver fermato la teleoperazione con Ctrl+C, il follower si riavvia automaticamente entro circa 10 secondi tornando a `Waiting for micro-ROS Agent...`, quindi è possibile rieseguire direttamente lo script senza resettare manualmente il follower (durante la riconnessione il follower torna al zero, cioè si riavvia).

Una volta stabilita la connessione, la seriale del follower stampa `micro-ROS ready` (il LED RGB diventa verde e l'altoparlante riproduce il tono di pronto), e `Waiting for micro-ROS Agent...` scompare.

### Verifica manuale dei topic

```bash
ros2 topic echo /joint_states --once           # 从臂反馈
ros2 topic hz /joint_states                    # 应约 20 Hz
ros2 topic echo /follower_audio/level --once   # 麦克风电平(说话时抬升)
```

## Fotocamera FPV

All'accensione, una volta connesso alla rete, il firmware avvia automaticamente il servizio di streaming MJPEG (GC2145 a bordo, interfaccia DVP, porta HTTP predefinita 80):

```text
http://<NANOCAM_IP>/         信息页
http://<NANOCAM_IP>/jpg      单帧 JPEG(快照)
http://<NANOCAM_IP>/stream   连续 MJPEG 流(FPV)
```

### Parametri e regolazioni

- Risoluzione **QVGA 320×240** (configurazione definitiva), **acquisizione RGB565 + codifica software `frame2jpg`** (il GC2145 non ha encoder JPEG hardware, presente solo su OV2640/OV5640), qualità JPEG 12, doppio buffer in **PSRAM Octal 8MB**;
- **Perché QVGA**: nei test il VGA (640×480) RGB565 ha un data rate troppo alto per il DVP di questa scheda e circa i 2/3 inferiori dell'immagine risultano corrotti (riprodotto con tutte le combinazioni XCLK 24/20/16MHz × buffer singolo/doppio); il QVGA è completo e fluido (il frame rate è inferiore a quello del JPEG hardware, il che è normale);
- Lo streaming gira in un task httpd separato (stack portato a 16KB per la codifica software), senza interferire con la teleoperazione micro-ROS e l'acquisizione audio;
- Porta HTTP predefinita 80 (firmware `HTTPD_DEFAULT_CONFIG()`);
- Per cambiare risoluzione/qualità: modificare `config.frame_size` / `kJpegQuality` in `firmware/nanocam_soarm/src/camera_stream.cpp`; l'orientamento dell'immagine si regola con `set_vflip` / `set_hmirror` (stesso file);
- esp_http_server è a task singolo: `/stream` e `/jpg` **non sono accessibili contemporaneamente** (con lo stream aperto `/jpg` resta in sospeso);
- Se l'inizializzazione della fotocamera fallisce, il firmware stampa una riga di avviso e continua a funzionare normalmente: la teleoperazione non ne è influenzata.

Ricezione sul PC (pubblicazione come topic ROS 2, tipo di messaggio `sensor_msgs/CompressedImage`):

```bash
# 终端 1:照常启动遥操作
./start_soarm_demo.sh

# 终端 2:接收视频并发布话题
source /opt/ros/humble/setup.bash
python3 tools/follower_camera.py --stream http://<NANOCAM_IP>/stream
# 可选:--topic /自定义话题  --max-fps 10

# 验证
ros2 topic hz /follower_camera/image_raw/compressed   # 应约 10~15 Hz
rviz2    # Add → By topic → Camera,选 /follower_camera/image_raw/compressed
```

È possibile verificare il collegamento anche senza ROS installato: aprire `http://<NANOCAM_IP>/stream` nel browser, oppure `curl -s http://<NANOCAM_IP>/jpg -o snap.jpg`.

## Audio (microfono e altoparlante)

**Microfono**: MEMS analogico AP2718AT (tramite ADC ES8311). Il firmware legge il livello di volume ambientale ogni 200ms (RMS, normalizzato 0~1) e lo pubblica su `/follower_audio/level` (`std_msgs/Float32`, best-effort). È possibile implementare rilevamento di attività vocale, monitoraggio ambientale, oppure usarlo come semplice segnale di trigger "acquisisci quando qualcuno parla".

```bash
ros2 topic echo /follower_audio/level
```

**Altoparlante**: DAC ES8311 → amplificatore classe D NS4150B (nessun pin di enable PA sulla scheda), con quattro toni integrati (vedi sezione successiva); per personalizzare i toni, modificare le chiamate a `play_tone()` in `audio_es8311.cpp`. Il volume è nel registro 0x32 dell'ES8311 (`R_DAC32`, nel firmware attuale impostato al massimo 0xFF).

### Parametri audio e regolazioni

- Frequenza di campionamento 24 kHz, 16-bit, slot stereo (come il firmware originale della NanoCam), MCLK = 256×FS = 6.144 MHz;
- **MCLK generato via LEDC** (GPIO39, 80MHz÷13≈6.154MHz, errore 0.16% entro la tolleranza): il driver I2S legacy su ESP32-S3 non emette MCLK, causando altoparlante muto + livello microfono costantemente 0; risolto in `start_ledc_mclk()` di `audio_es8311.cpp` usando il LEDC;
- Il controllo dell'ES8311 usa I2C1 (il bus fisico GPIO41/42 è condiviso con l'SCCB della fotocamera; la fotocamera usa l'SCCB solo all'avvio, quindi a runtime non c'è conflitto); alla fine di `init()` la chiamata `Wire1.end()` libera l'I2C per la fotocamera;
- Il guadagno del microfono è quello predefinito originale della NanoCam (registro 0x16 = 0x24); per aumentare la sensibilità regolare il valore di `R_ADC16` in `audio_es8311.cpp`.

## LED RGB di stato e toni di avviso

### Significato degli stati RGB

| Colore | Stato |
|---|---|
| Rosso | Avvio in corso / inizializzazione micro-ROS fallita / WiFi perso |
| Arancione | WiFi connesso, in attesa del micro-ROS Agent |
| Verde | micro-ROS pronto (collegamento di teleoperazione attivo) |
| Blu | Controllo servomotori sbloccato (ARMED) |
| Viola | Comando di controllo rifiutato (handshake/limiti di corsa/passo non corrispondenti) |

### Toni dell'altoparlante

| Evento | Tono |
|---|---|
| Accensione | Due brevi "bip" (tono di avvio) |
| micro-ROS pronto | Doppio tono ascendente |
| Sblocco servomotori | Doppio tono ascendente |
| Inizializzazione fallita | Un tono basso |

> I toni sono guidati da eventi: il tono di avvio suona all'accensione, il tono di pronto quando viene stabilita la comunicazione con l'Agent, il tono di sblocco quando arriva un comando di controllo; quindi accendendo senza avviare la teleoperazione si sente solo il tono di avvio.

## Meccanismi di sicurezza

Il firmware integra i seguenti meccanismi di sicurezza, senza necessità di configurazione manuale:

- Verifica dell'identità dei servomotori e della calibrazione in EEPROM;
- Handshake sulla posa attuale (0.05 rad);
- Limiti software di corsa; limite di passo per singolo comando 0.25 rad;
- Watchdog sul feedback 0.5 s;
- Riavvio automatico dopo 10 s di assenza di WiFi.

> Nota per le dimostrazioni in volo: dopo il montaggio a testa in giù occorre riconfermare la direzione dei giunti, il baricentro e lo schema di alimentazione (BEC), ed eseguire test di interferenza EMI.

## Stato di verifica

### Risultati dei test (attesi)

- Tutti e sei i servomotori follower riconosciuti (`servo_mask=0x3f`);
- `/joint_states` pubblicato a circa 20 Hz;
- Il bridge di controllo pubblica i comandi a 30 Hz;
- Stream della fotocamera `http://<IP>/stream` in QVGA fluido;
- `/follower_audio/level` pubblicato a 5 Hz, con livello che si alza chiaramente quando si parla;
- Il LED RGB cambia progressivamente con avvio→rete→pronto→sblocco;
- Dopo aver scollegato il cavo dati USB (ESP32 alimentato separatamente, follower con alimentazione esterna 12V) il sistema continua a funzionare.

### Stato di sviluppo

**Verificato su scheda (2026-08-19):**

- Audio `ES8311 ready @24000Hz` (uscita MCLK corretta + altoparlante/microfono funzionanti; risolti MCLK mancante + volume troppo basso);
- Connessione WiFi + comunicazione micro-ROS (`/joint_states` stabile a 20Hz, `/follower_audio/level` regolare);
- Fotocamera FPV GC2145: `/stream` QVGA completo e fluido (risolti conflitto I2C / codifica software / stack httpd / boundary multipart);
- Catena di teleoperazione completa (movimento del leader → inseguimento del follower);
- **Mappatura absolute + riavvio automatico in caso di perdita dell'Agent**: dopo la riconnessione leader e follower sono allineati senza deriva; dopo Ctrl+C il follower si riavvia automaticamente in attesa della riconnessione.

**Ancora da verificare:**

- Scenari di volo: orientamento del montaggio a testa in giù, baricentro, alimentazione (BEC), interferenze EMI.

## Struttura del progetto e approfondimenti firmware

In questo progetto il controller del braccio follower è evoluto dall'ESP32-S3 al modulo proprietario ESP32-NanoCam (ESP32-S3 N16R8, con fotocamera DVP / audio ES8311 / RGB WS2812 a bordo).

### Struttura delle directory

```text
firmware/nanocam_soarm/   ESP32-NanoCam 从臂固件 (PlatformIO)
  ├─ boards/nano_cam.json 自研板卡定义 (16MB Flash / 8MB Octal PSRAM)
  ├─ src/                 固件源码 (micro-ROS 遥操作 + 摄像头 + 音频 + RGB)
  ├─ lib/microros/        micro-ROS 静态库 (xtensa-lx7)
  └─ lib/scservo/         SCServo 舵机库 (本地化, 无网络依赖)
tools/                    PC 端脚本 (wireless_teleoperate.py 遥操作桥, follower_camera.py FPV 接收)
start_soarm_demo.sh       一键启动脚本 (网络/Agent/标定预检 + 遥操作)
cali/                     主臂/从臂标定文件
docs/                     项目进度与实验记录 + 硬件参考 (docs/reference/)
```

### Differenze rispetto alle versioni precedenti

| Voce | Questo progetto (ESP32-NanoCam) |
|---|---|
| Definizione scheda | Creata ad hoc `boards/nano_cam.json` (16MB Flash / 8MB Octal PSRAM, qio_opi) |
| Bus servomotori | Serial1/UART1, TX=20/RX=19 (UART0 occupata dal debug CH340K) |
| Seriale di debug | UART0 (43/44) → CH340K → USB-C |
| Fotocamera | DVP GC2145 della NanoCam (GPIO1~14 + 41/42), XCLK 24MHz |
| Audio | ES8311 + microfono AP2718AT + altoparlante NS4150B (novità) |
| RGB | LED di stato WS2812 (novità) |
| Libreria micro-ROS | xtensa-lx7 — la NanoCam è anch'essa ESP32-S3, compatibile con la versione per S3 |
| Script lato PC | Invariati (tools/, start_soarm_demo.sh è indipendente dall'hardware) |

### Percorsi degli header micro-ROS e build_flags

L'albero degli header micro-ROS è a struttura piatta (`include/<pkg>/<header>.h`): va mantenuto solo il percorso radice `-Ilib/microros/include`. **Non** aggiungere percorsi per singolo pacchetto `-Ilib/microros/include/<pkg>/` — farebbe risolvere `<string.h>` in `rosidl_runtime_c/string.h` e `<Client.h>` della libreria WiFi in `rcl/Client.h`, causando il fallimento della compilazione.

### Ricostruire libmicroros.a (ESP32-S3 / xtensa-lx7)

> In questo progetto `firmware/nanocam_soarm/lib/microros/` include già la libreria statica per ESP32-S3 (la NanoCam è un ESP32-S3, la libreria è compatibile). **Per l'uso normale saltare questa sezione**. La ricostruzione serve solo se occorre personalizzare la configurazione micro-ROS (tipi di messaggio, QoS, memory pool, ecc.) — nello sviluppo quotidiano non serve ricompilare `libmicroros.a`.

**Modo A: builder Docker ufficiale (consigliato, eseguibile su qualsiasi macchina)**

Lo script di generazione della libreria ufficiale micro-ROS `micro_ros_arduino` include già il **target esp32s3**:

```bash
git clone -b humble https://github.com/micro-ROS/micro_ros_arduino.git
cd micro_ros_arduino
docker pull microros/micro_ros_static_library_builder:humble
docker run -it --rm -v $(pwd):/project \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

Il risultato è in `src/esp32s3/libmicroros.a`, gli header nelle directory dei pacchetti sotto `src/`:

```bash
cp src/esp32s3/libmicroros.a <工程>/firmware/nanocam_soarm/lib/microros/
# 头文件整体替换(保留该目录下的 default_transport.cpp / wifi_transport.cpp /
# micro_ros_arduino.h 三个自定义文件)
rsync -a src/* <工程>/firmware/nanocam_soarm/lib/microros/include/ \
  --exclude esp32s3 --exclude '*.cpp' --exclude micro_ros_arduino.h
```

**Sulla toolchain**: la sezione esp32s3 dello script ufficiale compila di default con la toolchain `xtensa-esp32-elf` (LX6); LX6/LX7 sono compatibili a livello di instruction set per codice C ordinario e funzionano. La `libmicroros.a` inclusa in questo progetto è stata compilata con la **toolchain LX7 pura** (`xtensa-esp32s3-elf` gcc 8.4.0, identica alla versione integrata in PlatformIO); procedura: scaricare `xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-linux-amd64.tar.gz` (Espressif crosstool-NG releases), dopo l'estrazione cambiare `TOOLCHAIN_PREFIX` della sezione esp32s3 in `library_generation.sh` con `/uros_ws/xtensa-esp32s3-elf/bin/xtensa-esp32s3-elf-`, quindi montarla nel container e rieseguire:

```bash
docker run --platform linux/amd64 -it --rm \
  -v $(pwd):/project \
  -v <解压目录>/xtensa-esp32s3-elf:/uros_ws/xtensa-esp32s3-elf \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

> Nota: su Apple Silicon è obbligatorio aggiungere `--platform linux/amd64` (la toolchain esp32 nell'immagine è un binario x86_64, non eseguibile in un container arm64).

**Modo B: Ubuntu 22.04 + ROS 2 Humble + toolchain PlatformIO**

1. Assicurarsi che PlatformIO abbia già scaricato la toolchain S3 (basta eseguire una volta `pio run` nella directory del firmware):

   ```bash
   ls ~/.platformio/packages/toolchain-xtensa-esp32s3/bin/xtensa-esp32s3-elf-gcc
   ls ~/.platformio/packages/framework-arduinoespressif32/tools/sdk/esp32s3
   ```

2. Scaricare i sorgenti micro-ROS con micro_ros_setup (coerente con la disposizione `/tmp/firmware/mcu_ws` di `build_microros.sh`):

   ```bash
   mkdir -p /tmp/firmware && cd /tmp/firmware
   git clone -b humble https://github.com/micro-ROS/micro_ros_setup.git src/micro_ros_setup
   # 安装 micro_ros_setup 依赖后:
   source /opt/ros/humble/setup.bash
   colcon build && source install/local_setup.bash
   ros2 run micro_ros_setup create_firmware_ws.sh generate_lib
   ```

3. Eseguire lo script di build S3 di questo progetto:

   ```bash
   cd <工程>/firmware/nanocam_soarm
   chmod +x build_microros_s3.sh
   ./build_microros_s3.sh
   ```

   Lo script ha già convertito riscv32 → xtensa-esp32s3, `-march=rv32imc` → `-mlongcalls`, SDK `esp32c3` → SDK `esp32s3`. Copiare il risultato nel progetto seguendo le indicazioni stampate alla fine dello script.

### Riferimenti

- Documentazione di riferimento hardware NanoCam (schemi/datasheet/definizioni pin/driver ES8311): `docs/reference/` nel repository
- [micro-ROS](https://micro.ros.org/) / [micro_ros_arduino](https://github.com/micro-ROS/micro_ros_arduino)
- [LeRobot](https://github.com/huggingface/lerobot)

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
