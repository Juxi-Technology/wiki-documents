---
title: SO-ARM101 Drahtlose Teleoperation (ESP32-NanoCam-Version)
description: "Drahtlose Teleoperation für Wettbewerbsdemos: Der Führungsarm (Leader) ist über LeRobot mit einem Ubuntu-Rechner verbunden, der Folgearm (Follower) wird vom ESP32-NanoCam-Modul über micro-ROS WiFi gesteuert; der vollständige Ablauf umfasst Verkabelung, Stromversorgung, Flashen, Kalibrierung und Kamera-FPV."
---

# SO-ARM101 Drahtlose Teleoperation (ESP32-NanoCam-Version)

> **[Im Shop kaufen](https://www.juxitech.com/de/products/so-arm101-developers-kit)**

Dieses Tutorial richtet sich an das Szenario der drahtlosen Teleoperation eines SO-ARM101-Roboterarms auf einer Drohne für Wettbewerbsdemos: Der Führungsarm ist über LeRobot mit dem Ubuntu-Rechner verbunden, der Folgearm wird vom selbst entwickelten [ESP32-S3 WiFi-Videomodul](/de/products/esp32-s3-wifi-module) (ESP32-NanoCam, ESP32-S3 N16R8) gesteuert, empfängt Befehle per micro-ROS WiFi UDP und integriert Onboard-Kamera-FPV, Mikrofon, Lautsprecher und RGB-Status-LED. Bei Problemen siehe [Fehlerbehebungsleitfaden](./SO-ARM101-NanoCam-Troubleshooting.md).

## Einführung und Systemarchitektur

```text
SO-ARM101 主臂(leader) → USB 舵机驱动板 → Ubuntu 22.04 (LeRobot + ROS2 Humble + micro-ROS Agent)
                                            │  2.4 GHz Wi-Fi(同一局域网)
                                            ▼
                              ESP32-NanoCam 从臂控制器(ESP32-S3)
                                            │  1 Mbps UART(经舵机驱动板 UART 针脚中转)
                                            ▼
                              SO-ARM101 从臂(follower) 6 × STS3215
```

- Aktionen des Führungsarm-Bedieners → LeRobot liest den Führungsarm → ROS2-Topic `/joint_command` → micro-ROS Agent sendet über UDP 8888 → ESP32-NanoCam empfängt und steuert die 6 Servos;
- Der Folgearm meldet `/joint_states` (20 Hz) zurück; dient als geschlossener Regelkreis und Watchdog;
- Die Onboard-Kamera veröffentlicht einen MJPEG-Stream `http://<IP>/stream` (FPV); auf dem PC kann er in ein ROS-Topic umgewandelt werden.

Rollenverteilung: Der Führungsarm ist mit dem Ubuntu-Rechner verbunden; der Folgearm wird vom ESP32-NanoCam gesteuert, die Verbindung ist drahtlos. Onboard-Funktionen nach dem Einschalten der Firmware:

| Funktion | Implementierung | Beschreibung |
|---|---|---|
| micro-ROS-Teleoperation | `main.cpp` + `servo_bus.cpp` | `/joint_states`-Feedback mit 20 Hz, Empfang der `/joint_command`-Befehle, integrierte vollständige Sicherheitsmechanismen |
| Kamera-FPV | `camera_stream.cpp` | MJPEG-Stream `http://<IP>/stream` (QVGA) |
| Mikrofon | `audio_es8311.cpp` | Umgebungslautstärkepegel → `/follower_audio/level` (Float32, 5 Hz) |
| Lautsprecher | `audio_es8311.cpp` | Start-/Bereitschafts-/Entsperr-/Fehler-Signaltöne |
| RGB-Status-LED | `rgb_status.cpp` | Start rot → WiFi orange → micro-ROS grün → entsperrt blau; WiFi-Verlust rot |

## Hardware-Liste

| Hardware | Anzahl | Beschreibung |
|---|---|---|
| SO-ARM101 Führungsarm | 1 | mit 6×STS3215-Servos |
| SO-ARM101 Folgearm | 1 | mit 6×STS3215-Servos |
| ESP32-NanoCam-Modul | 1 | ESP32-S3 N16R8, Onboard-Kamera/Audio/RGB |
| USB-Servo-Treiberplatine | 2 | Kalibrierung + Bus-Durchschleifen von Führungs- und Folgearm (UART-Pins) |
| Ubuntu-22.04-Rechner | 1 | führt LeRobot + ROS2 + Agent aus |
| 2,4-GHz-Router oder Smartphone-Hotspot | 1 | Führungsarm-Rechner und NanoCam im selben LAN |
| Externes 12V-5A-Netzteil | 1 | **Stromversorgung des Folgearms** (USB reicht für 6 Servos nicht) |
| Externes 5V-6A-Netzteil | 1 | **Stromversorgung des Führungsarms** (an den Ubuntu-Rechner angeschlossen) |
| USB-C-Datenkabel | 2 | NanoCam-Stromversorgung/Debug + Verbindung Führungsarm-Treiberplatine zum Rechner |

> Onboard-Peripherie der NanoCam: Kamera GC2145 (DVP); Audio ES8311 (I2S 24 kHz, AP2718AT-Mikrofon + NS4150B-Lautsprecher); RGB WS2812 @ GPIO18.

## Verkabelung

Zwischen ESP32-NanoCam und Folgearm wird **über die UART-Pins der Servo-Treiberplatine durchgeschleift**:

```text
舵机驱动板 UART:   RX ←── NanoCam TX (P2-8 / GPIO20)
                   TX ──→ NanoCam RX (P2-7 / GPIO19)
                  GND ──→ NanoCam GND
```

- **TX an RX, RX an TX (gekreuzt)**, GND auf gemeinsamer Masse, 1 Mbps Baudrate;
- Der Servo-Bus der NanoCam läuft über UART1, angeschlossen an **P2-7 / P2-8** des Moduls (die Debug-Serielle läuft über USB-C, CH340K → UART0; beide sind vollständig unabhängig und können gleichzeitig genutzt werden);
- Servo-Bus und Servo-Stromversorgung teilen die Masse (12V-5A-Netzteil des Folgearms).

### Hauptpins der NanoCam

| Peripherie | Pins |
|---|---|
| Servo-Bus (UART1) | TX=GPIO20 (P2-8 ESP_P), RX=GPIO19 (P2-7 ESP_N), P2-Stiftleiste des Moduls |
| Debug-Serielle (UART0) | GPIO43/44 → Onboard-CH340K → USB-C (kein natives USB CDC) |
| Kamera DVP (GC2145) | D0~D7=GPIO4/2/1/3/5/7/8/10, PCLK=6, VSYNC=13, HREF=11, XCLK=9 (24MHz), PWDN=12, RESET=14, SCCB SDA/SCL=41/42 |
| Audio ES8311 (I2S) | MCLK=39, BCLK=38, WS=47, DIN(ADC)=40, DOUT(DAC)=48; I2C SDA/SCL=41/42, Adresse 0x30 |
| Mikrofon | AP2718AT analoges MEMS (über ES8311-ADC) |
| Lautsprecher | NS4150B Klasse-D-Verstärker (über ES8311-DAC), kein PA-Enable-Pin auf dem Board |
| RGB | WS2812 @ GPIO18 (1 Stück, GRB, RMT-angesteuert) |
| BOOT | GPIO0 |

> Die Pin-Definitionen stammen aus `docs/reference/nano_config.h` und den Hardware-Schaltplan-Dokumenten.

## Stromversorgung

| Gerät | Stromversorgung |
|---|---|
| ESP32-NanoCam | **Stromversorgung über USB-Datenkabel** (die CH340K-Debug-Serielle arbeitet gleichzeitig) |
| Folgearm (6×STS3215) | **12V 5A** externes Netzteil |
| Führungsarm (am Ubuntu-Rechner) | **5V 6A** externes Netzteil |

> ⚠️ USB reicht für 6 Servos nicht aus, der Folgearm muss über ein externes 12V-5A-Netzteil versorgt werden; das ESP32 wird einfach über das USB-Datenkabel versorgt.

## Umgebungsanforderungen

### Build-/Flash-Seite (Windows / Linux / macOS möglich)

| Punkt | Anforderung |
|---|---|
| Betriebssystem | Windows 10/11 oder Linux (macOS ebenfalls möglich) |
| Python | 3.8+ (Prüfen mit `python --version`) |
| PlatformIO | Core 6.x (inkl. esp32s3-Toolchain + Arduino-Framework) |
| Speicherplatz | mindestens 3 GB frei |
| Netzwerk | Zugriff auf GitHub / Espressif CDN (Toolchain-Download beim ersten Mal ca. 1-2 GB) |

### Laufzeitseite (Ubuntu-22.04-Rechner, auf dem die Teleoperation letztlich läuft)

| Punkt | Anforderung |
|---|---|
| Betriebssystem | Ubuntu 22.04 (64 Bit) |
| ROS 2 | Humble (Hawksbill) |
| LeRobot | mit Feetech-SO-101-Unterstützung (`so101_leader` / `so101_follower`) |
| micro-ROS Agent | `snap run micro-ros-agent` oder Installation aus dem Quellcode |
| Benötigte Befehle | `nmcli`, `ip`, `flock` (in NetworkManager, iproute2, util-linux enthalten) |
| Python-Umgebung | virtuelle Umgebung `lerobot_so101` (conda/miniforge) |

> Erkennung der Debug-Seriellen: Die USB-Schnittstelle der NanoCam ist ein CH340K → UART0, unter Linux lautet der Gerätename üblicherweise `/dev/ttyUSB0` (oder `/dev/serial/by-id/...CH340*`); PlatformIO erkennt sie automatisch (in der Board-Definition ist die CH340-HWID 0x1A86:0x7523 hinterlegt); Baudrate des Seriell-Monitors: 115200. Eine ausführlichere Anleitung zur LeRobot-/Ubuntu-Umgebungsinstallation finden Sie im [SO-ARM101-Tutorial](./SO-ARM101-Tutorial.md).

## Installationsschritte

### 1. PlatformIO installieren (Build-/Flash-Seite)

**Variante A: VSCode-Erweiterung (empfohlen)**

1. [VSCode](https://code.visualstudio.com/) installieren;
2. Im Erweiterungsmarkt nach **PlatformIO IDE** suchen und installieren; nach der Installation wird automatisch neu gestartet und PlatformIO Core heruntergeladen;
3. Im VSCode-Terminal mit `pio --version` überprüfen.

**Variante B: Installation über die Kommandozeile**

```bash
pip install platformio
```

> Wird der `pio`-Befehl unter Windows in Git Bash nicht gefunden, verwenden Sie das PowerShell-/CMD-Terminal oder fügen Sie `C:\Users\<Benutzername>\.platformio\penv\Scripts` zum PATH hinzu.

### 2. Erster Build (automatischer Toolchain-Download)

Wechseln Sie in das Firmware-Verzeichnis und führen Sie einmal einen Build aus (ohne Flashen):

```bash
cd firmware/nanocam_soarm
pio run
```

Beim ersten Mal werden nacheinander heruntergeladen:

1. Die Plattform espressif32 (`espressif32@7.0.1`);
2. Die **Toolchain** `toolchain-xtensa-esp32s3` (ca. 100 MB, von Espressif CDN);
3. Das Arduino-Framework `framework-arduinoespressif32` (ca. 200 MB).

Vorgehen bei langsamem Download / Hängen:

- Die Restzeit-Schätzung von PlatformIO ist ungenau; häufig hängt es eine Weile und springt dann plötzlich durch — 5 Minuten beobachten, ob der Prozentsatz voranschreitet;
- Proxy/VPN aktivieren (nutzt den Systemproxy);
- Toolchain manuell herunterladen: im Browser `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` herunterladen (unter Linux entsprechend `-linux-amd64.tar.gz`), entpacken, das Verzeichnis in `toolchain-xtensa-esp32s3` umbenennen und nach `C:\Users\<Benutzername>\.platformio\packages\` legen, dann `pio run` erneut ausführen;
- Ein Abbruch mit Ctrl+C zwischendurch beschädigt die Umgebung nicht; ein erneuter Lauf setzt fort.

### 3. Ubuntu-Laufzeitumgebung installieren

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

## WiFi konfigurieren

PC und NanoCam müssen sich im selben LAN befinden (2,4-GHz-WiFi, ein Smartphone-Hotspot genügt), und der Router/Hotspot darf keine Client-Isolation aktiviert haben. Die WiFi-Konfiguration ist auf zwei Wegen möglich — wählen Sie einen.

### Variante 1: Konfiguration zur Compile-Zeit (Standard)

```bash
cd firmware/nanocam_soarm
cp src/wifi_config.example.h src/wifi_config.h
# 编辑 wifi_config.h:WIFI_SSID / WIFI_PASS / AGENT_IP(Ubuntu 电脑局域网 IP)
```

### Variante 2: Konfiguration über serielle Befehle (empfohlen, kein erneutes Flashen)

Die Firmware enthält eine Laufzeitkonfiguration (NVS-Speicher), die jederzeit über die Debug-Serielle (115200 Baud) eingegeben werden kann:

| Befehl | Wirkung |
|---|---|
| `wifi_ssid:你的热点名` | WiFi-Namen festlegen und speichern |
| `wifi_pass:你的密码` | WiFi-Passwort festlegen und speichern |
| `agent_ip:Ubuntu电脑IP` | micro-ROS-Agent-IP festlegen und speichern |
| `wifi_show` | Aktuell wirksame Konfiguration anzeigen |
| `wifi_clear` | Gespeicherte Konfiguration löschen, Compile-Zeit-Standard wiederherstellen |

Nach dem Speichern eines beliebigen Einstellungsbefehls **startet das Gerät nach 3 Sekunden automatisch neu**. Priorität: über die serielle Schnittstelle gespeicherte Konfiguration > Compile-Zeit-Standard. Für einen anderen Hotspot/einen anderen Rechner genügt es, USB einzustecken und die drei Befehle einzugeben — kein Codeändern und Neuflashen nötig.

> Die Compile-Zeit-Standardwerte (`wifi_config.h`) bleiben stets erhalten und dienen als Rückfalloption, wenn keine serielle Konfiguration vorgenommen wurde; `wifi_show` unterscheidet zwischen „aus NVS" und „Compile-Zeit-Standard". Das Passwort liegt im Klartext in der NVS — für Demo-Szenarien im LAN akzeptabel; `wifi_config.h` enthält das WiFi-Passwort, ist bereits über `.gitignore` ausgeschlossen und darf nicht ins Repository committet werden.

## Flashen und Start

```bash
cd firmware/nanocam_soarm
pio run --target upload
```

**In den Download-Modus wechseln (kritisch)**: Die NanoCam wird über CH340K → UART0 seriell geflasht (kein automatischer Download über USB CDC). Führen Sie zunächst direkt upload aus — hat das Board eine Auto-Download-Schaltung, gelingt es sofort; wird keine Verbindung gemeldet: **BOOT-Taste (GPIO0) gedrückt halten → USB einstecken (oder Reset drücken) → BOOT loslassen**, dann sofort upload erneut ausführen. Wird der Anschluss unter Windows nicht automatisch erkannt, in `platformio.ini` unter `[env:nano_cam]` die Zeile `upload_port = COM3` ergänzen (durch die tatsächliche COM-Nummer des CH340 aus dem Geräte-Manager ersetzen).

Serielles Log ansehen:

```bash
pio device monitor --baud 115200
```

Nach dem Flashen sollte Folgendes zu sehen sein (in dieser Reihenfolge):

```text
audio: ES8311 ready @24000Hz      ← 音频初始化成功
Servo Ping mask: 0x3f             ← 6 个舵机全部在线
Servo calibration match: YES      ← 标定数组与舵机 EEPROM 一致
IP: 192.168.x.x  RSSI: -xx        ← WiFi 已连
Waiting for micro-ROS Agent...    ← 等待 Agent(下一步启动后消失)
```

> Der Servo-Bus kann beim Flashen leer bleiben — Flashen und Servo-Betrieb stören sich nicht (UART0 Debug / UART1 Servo sind unabhängig). Das Projekt enthält bereits die micro-ROS-Statikbibliothek für ESP32-S3 (xtensa-lx7); für den normalen Gebrauch ist kein Selbstkompilieren nötig.

## Hinweise zur Kalibrierung

Das Verzeichnis `cali/` des Projekts enthält bereits die Kalibrierdateien für Führungs- und Folgearm, und das Kalibrier-Array in der Firmware ist bereits auf die Folgearm-Kalibrierung abgestimmt (nämlich `cali/follower_recal.json`). **Eine Neukalibrierung ist nur beim Austausch der Folgearm-/Führungsarm-Hardware erforderlich.**

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

Nach einer Neukalibrierung des Folgearms muss `firmware/nanocam_soarm/src/servo_bus.cpp` geöffnet und die drei Arrays `kHomingOffsets` / `kRangeMin` / `kRangeMax` durch die Werte der eigenen `cali/follower_recal.json` ersetzt werden (Reihenfolge: shoulder_pan, shoulder_lift, elbow_flex, wrist_flex, wrist_roll, gripper), danach neu kompilieren und flashen.

## Drahtlose Teleoperation ausführen

### Prüfungen vor dem Start

```bash
# 1. Ubuntu 电脑连上与 NanoCam 相同的 2.4GHz WiFi
# 2. 主臂 USB 舵机驱动板已连接并识别
ls -l /dev/ttyACM*   # 找到主臂串口
# 3. 从臂 NanoCam 已上电并联网(串口或浏览器确认 MJPEG 流可访问)
```

### Start mit einem Befehl

```bash
# 设置环境(或直接编辑 start_soarm_demo.sh 顶部的默认值)
export SOARM_WIFI_SSID="你的2.4G热点"
export SOARM_AGENT_IP="Ubuntu电脑IP"
export SOARM_LEADER_PORT="/dev/ttyACM*"
export SOARM_PYTHON="$(command -v python)"   # lerobot_so101 环境

./start_soarm_demo.sh --check    # 预飞检查:网络/主臂/Agent/从臂在线
./start_soarm_demo.sh            # 正式启动遥操作,Ctrl+C 停止
```

Das Skript führt der Reihe nach aus:

1. Netzwerk prüfen (SSID muss mit `EXPECTED_WIFI_SSID` übereinstimmen), Führungsarm-Seriellanschluss, Vorhandensein der Kalibrierdateien;
2. micro-ROS Agent starten (falls nicht aktiv; Log unter `logs/micro_ros_agent.log`);
3. Warten, bis die `/joint_states` des Folgearms online sind (15 s Timeout);
4. Führungsarm bewegt sich → Folgearm folgt, 30 Hz Befehlsrate, **`--mapping-mode absolute` (absolute Zuordnung)**.

**Zur absoluten Zuordnung (absolute)**: Führungsarm- und Folgearm-Pose entsprechen sich eins zu eins in ihren jeweiligen Kalibrierkoordinatensystemen; der Vorteil ist **keine kumulierte Abweichung nach Verbindungsabbruch und -wiederaufbau** — beim Wiederaufbau richtet sich der Folgearm innerhalb von 8 Sekunden weich auf die aktuelle Pose des Führungsarms aus (startup_blend); danach gilt: Führungsarm auf Null → Folgearm ebenfalls auf seine Nullposition. Früher wurde die relative Zuordnung verwendet, doch nach einem Verbindungsabbruch blieb der Folgearm an der Abbruchposition stehen und wich dauerhaft vom auf Null zurückgekehrten Führungsarm ab, daher die Umstellung auf absolute.

**Automatischer Neustart bei Agent-Verlust** (Firmware nach 2026-08-19): Nach dem Stoppen der Teleoperation mit Ctrl+C startet der Folgearm innerhalb von ca. 10 Sekunden automatisch neu und kehrt zu `Waiting for micro-ROS Agent...` zurück; das Skript kann daher direkt erneut ausgeführt werden, ein manueller Reset des Folgearms ist nicht nötig (während der Wiederverbindung kehrt der Folgearm in die Nullposition zurück, d. h. er wird neu gestartet).

Nach dem Aufbau der Verbindung gibt die serielle Schnittstelle des Folgearms `micro-ROS ready` aus (RGB wird grün, der Lautsprecher spielt den Bereitschaftston), und `Waiting for micro-ROS Agent...` verschwindet.

### Topics manuell verifizieren

```bash
ros2 topic echo /joint_states --once           # 从臂反馈
ros2 topic hz /joint_states                    # 应约 20 Hz
ros2 topic echo /follower_audio/level --once   # 麦克风电平(说话时抬升)
```

## Kamera-FPV

Nach dem Einschalten und der Netzwerkanbindung startet die Firmware automatisch den MJPEG-Streamingdienst (Onboard-GC2145, DVP-Schnittstelle, Standard-HTTP-Port 80):

```text
http://<NANOCAM_IP>/         信息页
http://<NANOCAM_IP>/jpg      单帧 JPEG(快照)
http://<NANOCAM_IP>/stream   连续 MJPEG 流(FPV)
```

### Parameter und Tuning

- Auflösung **QVGA 320×240** (offizielle Konfiguration), **RGB565-Aufnahme + `frame2jpg`-Softwarekodierung** (der GC2145 hat keinen Hardware-JPEG-Encoder, nur OV2640/OV5640), JPEG-Qualität 12, Doppelpuffer im **8MB Octal PSRAM**;
- **Warum QVGA**: Gemessen überschreitet VGA (640×480) RGB565 auf dem DVP dieses Boards die vertretbare Datenrate; die unteren ca. zwei Drittel des Bildes sind verrauscht (bei XCLK 24/20/16MHz × Einzel-/Doppelpuffer-Kombinationen reproduzierbar); QVGA ist vollständig und flüssig (die Framerate ist niedriger als bei Hardware-JPEG, das ist normal);
- Das Streaming läuft in einem eigenen httpd-Task (Stack auf 16 KB erhöht, um die Softwarekodierung aufzunehmen) und stört micro-ROS-Teleoperation und Audioaufnahme nicht;
- Standard-HTTP-Port 80 (Firmware `HTTPD_DEFAULT_CONFIG()`);
- Zum Ändern von Auflösung/Qualität: `config.frame_size` / `kJpegQuality` in `firmware/nanocam_soarm/src/camera_stream.cpp` bearbeiten; die Bildausrichtung wird mit `set_vflip` / `set_hmirror` angepasst (dieselbe Datei);
- esp_http_server ist single-tasking, `/stream` und `/jpg` **können nicht gleichzeitig verwendet werden** (während der Stream läuft, bleibt `/jpg` hängen);
- Schlägt die Kamera-Initialisierung fehl, gibt die Firmware eine Hinweiszeile aus und arbeitet normal weiter; die Teleoperation ist nicht betroffen.

Empfang auf dem PC (veröffentlicht als ROS-2-Topic, Nachrichtentyp `sensor_msgs/CompressedImage`):

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

Auch ohne ROS lässt sich die Verbindung vorab prüfen: `http://<NANOCAM_IP>/stream` im Browser öffnen oder `curl -s http://<NANOCAM_IP>/jpg -o snap.jpg` ausführen.

## Audio (Mikrofon und Lautsprecher)

**Mikrofon**: AP2718AT analoges MEMS (über ES8311-ADC). Die Firmware liest alle 200 ms den Pegel der Umgebungslautstärke (RMS, normiert auf 0~1) und veröffentlicht ihn auf `/follower_audio/level` (`std_msgs/Float32`, best-effort). Damit lassen sich Sprachaktivitätserkennung (VAD) oder Umgebungsüberwachung realisieren, oder es dient als einfaches Triggersignal für „erst bei Sprache aufzeichnen".

```bash
ros2 topic echo /follower_audio/level
```

**Lautsprecher**: ES8311-DAC → NS4150B Klasse-D-Verstärker (kein PA-Enable-Pin auf dem Board), mit vier integrierten Signaltönen (siehe nächster Abschnitt); für eigene Signaltöne die `play_tone()`-Aufrufe in `audio_es8311.cpp` anpassen. Die Lautstärke steht im ES8311-Register 0x32 (`R_DAC32`, in der aktuellen Firmware bereits auf Maximum 0xFF gesetzt).

### Audioparameter und Tuning

- Abtastrate 24 kHz, 16 Bit, Stereoslots (identisch mit der Original-NanoCam-Firmware), MCLK = 256×FS = 6,144 MHz;
- **MCLK wird per LEDC erzeugt** (GPIO39, 80 MHz ÷ 13 ≈ 6,154 MHz, Fehler 0,16 % innerhalb der Toleranz): Der Legacy-I2S-Treiber gibt auf dem ESP32-S3 kein MCLK aus, was zu stummem Lautsprecher + konstant 0 bleibendem Mikrofonpegel führt; in `audio_es8311.cpp` über `start_ledc_mclk()` mit LEDC behoben;
- Die ES8311-Steuerung läuft über I2C1 (der physikalische Bus GPIO41/42 wird mit dem Kamera-SCCB geteilt; die Kamera nutzt SCCB nur beim Start, zur Laufzeit gibt es keinen Konflikt); `Wire1.end()` am Ende von `init()` gibt I2C für die Kamera frei;
- Der Standard-Mikrofonverstärkungswert entspricht dem NanoCam-Original (Register 0x16 = 0x24); zur Erhöhung der Empfindlichkeit den Wert von `R_ADC16` in `audio_es8311.cpp` anpassen.

## RGB-Statusanzeige und Signaltöne

### Bedeutung der RGB-Statusanzeige

| Farbe | Status |
|---|---|
| Rot | Start läuft / micro-ROS-Initialisierung fehlgeschlagen / WiFi-Verlust |
| Orange | WiFi verbunden, warten auf micro-ROS Agent |
| Grün | micro-ROS bereit (Teleoperationsverbindung steht) |
| Blau | Servo-Steuerung entsperrt (ARMED) |
| Violett | Steuerbefehl abgelehnt (Handshake/Limit/Schrittweite stimmen nicht) |

### Lautsprecher-Signaltöne

| Ereignis | Signalton |
|---|---|
| Einschalten | Zwei kurze „Beep"-Töne (Startton) |
| micro-ROS bereit | Aufsteigender Doppelton |
| Servo entsperrt | Aufsteigender Doppelton |
| Initialisierung fehlgeschlagen | Ein tiefer Ton |

> Die Signaltöne sind ereignisgesteuert: Der Startton erklingt direkt beim Einschalten, der Bereitschaftston beim Aufbau der Agent-Kommunikation, der Entsperrton beim Empfang eines Steuerbefehls — wird also nur eingeschaltet und keine Teleoperation gestartet, hört man nur den Startton.

## Sicherheitsmechanismen

Die Firmware enthält die folgenden Sicherheitsmechanismen, eine manuelle Konfiguration ist nicht erforderlich:

- Servo-Identitätsprüfung, EEPROM-Kalibrierprüfung;
- Handshake der aktuellen Pose (0,05 rad);
- Soft-Limits; Schrittweitenbegrenzung von 0,25 rad pro Befehl;
- Feedback-Watchdog 0,5 s;
- Bei WiFi-Verlust nach 10 s Timeout automatischer Neustart.

> Hinweis für Flugdemos: Nach Überkopf-Montage müssen Gelenkrichtungen, Schwerpunkt und Stromversorgungskonzept (BEC) erneut überprüft sowie EMI-Störtests durchgeführt werden.

## Verifizierungsstatus

### Testergebnisse (erwartet)

- Alle sechs Folgearm-Servos erkannt (`servo_mask=0x3f`);
- `/joint_states` wird mit ca. 20 Hz veröffentlicht;
- Die Steuerungsbrücke veröffentlicht Befehle mit 30 Hz;
- Kamerastream `http://<IP>/stream` QVGA flüssig;
- `/follower_audio/level` wird mit 5 Hz veröffentlicht; beim Sprechen steigt der Pegel deutlich an;
- Die RGB-Status-LED wechselt stufenweise Start → Vernetzung → bereit → entsperrt;
- Nach Abziehen des USB-Datenkabels weiterhin betriebsfähig (ESP32 unabhängig versorgt, Folgearm über externes 12V-Netzteil).

### Entwicklungsstatus

**Auf dem Board verifiziert (2026-08-19):**

- Audio `ES8311 ready @24000Hz` (MCLK-Ausgabe normal + Lautsprecher/Mikrofon beide normal; die fehlende MCLK-Ausgabe + zu geringe Lautstärke wurden behoben);
- WiFi-Verbindung + micro-ROS-Kommunikation (`/joint_states` stabil mit 20 Hz, `/follower_audio/level` normal);
- GC2145-Kamera-FPV: QVGA `/stream` vollständig und flüssig (behoben: I2C-Konflikt / Softwarekodierung / httpd-Stack / Multipart-Boundary);
- Vollständige Teleoperationskette (Führungsarm bewegt sich → Folgearm folgt);
- **absolute-Zuordnung + automatischer Neustart bei Agent-Verlust**: Nach Abbruch und Wiederaufbau stimmen Führungs- und Folgearm ohne Abweichung überein; nach Ctrl+C startet der Folgearm automatisch neu und wartet auf die Wiederverbindung.

**Noch zu verifizieren:**

- Flugszenario: Ausrichtung bei Überkopf-Montage, Schwerpunkt, Stromversorgung (BEC), EMI-Störungen.

## Projektstruktur und Firmware-Erweiterung

Der Folgearm-Controller dieses Projekts wurde vom ESP32-S3 auf das selbst entwickelte ESP32-NanoCam-Modul weiterentwickelt (ESP32-S3 N16R8, Onboard-DVP-Kamera / ES8311-Audio / WS2812-RGB).

### Verzeichnisstruktur

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

### Unterschiede zur früheren Version

| Punkt | Dieses Projekt (ESP32-NanoCam) |
|---|---|
| Board-Definition | Eigene `boards/nano_cam.json` (16MB Flash / 8MB Octal PSRAM, qio_opi) |
| Servo-Bus | Serial1/UART1, TX=20/RX=19 (UART0 ist durch den CH340K-Debug belegt) |
| Debug-Serielle | UART0 (43/44) → CH340K → USB-C |
| Kamera | NanoCam DVP GC2145 (GPIO1~14 + 41/42), XCLK 24MHz |
| Audio | ES8311 + AP2718AT-Mikrofon + NS4150B-Lautsprecher (neu) |
| RGB | WS2812-Status-LED (neu) |
| micro-ROS-Bibliothek | xtensa-lx7 — NanoCam ist ebenfalls ESP32-S3, kompatibel mit der S3-Version |
| PC-seitige Skripte | unverändert (tools/, start_soarm_demo.sh sind hardwareunabhängig) |

### micro-ROS-Header-Pfade und build_flags

Der micro-ROS-Headerbaum ist flach strukturiert (`include/<pkg>/<header>.h`); es wird nur der Wurzelpfad `-Ilib/microros/include` beibehalten. Fügen Sie **keine** paketweisen `-Ilib/microros/include/<pkg>/`-Pfade hinzu — das würde `<string.h>` als `rosidl_runtime_c/string.h` auflösen und `<Client.h>` der WiFi-Bibliothek als `rcl/Client.h`, was zu Kompilierfehlern führt.

### libmicroros.a neu bauen (ESP32-S3 / xtensa-lx7)

> Das Projekt enthält in `firmware/nanocam_soarm/lib/microros/` bereits die Statikbibliothek für ESP32-S3 (die NanoCam ist ein ESP32-S3, die Bibliothek ist universell). **Für den normalen Gebrauch diesen Abschnitt überspringen**. Ein Neuaufbau ist nur nötig, wenn Sie die micro-ROS-Konfiguration anpassen möchten (Nachrichtentypen, QoS, Speicherpool usw.) — für die tägliche Entwicklung muss `libmicroros.a` nicht neu kompiliert werden.

**Variante A: Offizieller Docker-Builder (empfohlen, auf beliebigen Rechnern ausführbar)**

Das Generierungsskript der offiziellen micro-ROS-Bibliothek `micro_ros_arduino` enthält ein **esp32s3-Ziel**:

```bash
git clone -b humble https://github.com/micro-ROS/micro_ros_arduino.git
cd micro_ros_arduino
docker pull microros/micro_ros_static_library_builder:humble
docker run -it --rm -v $(pwd):/project \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

Die Artefakte liegen in `src/esp32s3/libmicroros.a`, die Header in den Paketverzeichnissen unter `src/`:

```bash
cp src/esp32s3/libmicroros.a <工程>/firmware/nanocam_soarm/lib/microros/
# 头文件整体替换(保留该目录下的 default_transport.cpp / wifi_transport.cpp /
# micro_ros_arduino.h 三个自定义文件)
rsync -a src/* <工程>/firmware/nanocam_soarm/lib/microros/include/ \
  --exclude esp32s3 --exclude '*.cpp' --exclude micro_ros_arduino.h
```

**Zur Toolchain**: Der esp32s3-Abschnitt des offiziellen Skripts kompiliert standardmäßig mit der `xtensa-esp32-elf`(LX6)-Toolchain; LX6/LX7 sind für normalen C-Code instanzkompatibel und lauffähig. Die diesem Projekt beiliegende `libmicroros.a` wurde mit der **echten LX7-Toolchain** (`xtensa-esp32s3-elf`, gcc 8.4.0, identisch mit der in PlatformIO integrierten Version) kompiliert; Vorgehen: `xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-linux-amd64.tar.gz` herunterladen (Espressif crosstool-NG releases), entpacken, im esp32s3-Abschnitt von `library_generation.sh` das `TOOLCHAIN_PREFIX` auf `/uros_ws/xtensa-esp32s3-elf/bin/xtensa-esp32s3-elf-` ändern und erneut in den Container einbinden und ausführen:

```bash
docker run --platform linux/amd64 -it --rm \
  -v $(pwd):/project \
  -v <解压目录>/xtensa-esp32s3-elf:/uros_ws/xtensa-esp32s3-elf \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

> Hinweis: Auf Apple Silicon muss `--platform linux/amd64` angegeben werden (die im Image enthaltene esp32-Toolchain ist ein x86_64-Binary und kann im arm64-Container nicht ausgeführt werden).

**Variante B: Ubuntu 22.04 + ROS 2 Humble + PlatformIO-Toolchain**

1. Sicherstellen, dass PlatformIO die S3-Toolchain heruntergeladen hat (einmal `pio run` im Firmware-Verzeichnis ausführen genügt):

   ```bash
   ls ~/.platformio/packages/toolchain-xtensa-esp32s3/bin/xtensa-esp32s3-elf-gcc
   ls ~/.platformio/packages/framework-arduinoespressif32/tools/sdk/esp32s3
   ```

2. Mit micro_ros_setup den micro-ROS-Quellcode holen (Layout identisch mit `/tmp/firmware/mcu_ws` aus `build_microros.sh`):

   ```bash
   mkdir -p /tmp/firmware && cd /tmp/firmware
   git clone -b humble https://github.com/micro-ROS/micro_ros_setup.git src/micro_ros_setup
   # 安装 micro_ros_setup 依赖后:
   source /opt/ros/humble/setup.bash
   colcon build && source install/local_setup.bash
   ros2 run micro_ros_setup create_firmware_ws.sh generate_lib
   ```

3. Das S3-Build-Skript dieses Projekts ausführen:

   ```bash
   cd <工程>/firmware/nanocam_soarm
   chmod +x build_microros_s3.sh
   ./build_microros_s3.sh
   ```

   Das Skript hat bereits riscv32 → xtensa-esp32s3, `-march=rv32imc` → `-mlongcalls`, esp32c3-SDK → esp32s3-SDK umgestellt. Die Artefakte werden gemäß dem Hinweis am Ende des Skripts ins Projekt kopiert.

### Referenzen

- NanoCam-Hardware-Referenzdokumente (Schaltplan/Datenblatt/Pin-Definitionen/ES8311-Treiber): Repository `docs/reference/`
- [micro-ROS](https://micro.ros.org/) / [micro_ros_arduino](https://github.com/micro-ROS/micro_ros_arduino)
- [LeRobot](https://github.com/huggingface/lerobot)

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
