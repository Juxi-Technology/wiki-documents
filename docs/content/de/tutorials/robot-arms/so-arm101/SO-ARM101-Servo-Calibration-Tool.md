---
title: SoARM-Servo-Kalibrierungstool – Anleitung
description: "FTServo-Servo-Werkskalibrierungs- und LeRobot-Kalibrierungstool für Roboterarme der SoARM-10X-Serie, unterstützt Mittenkalibrierung, Einzelservo-Steuerung, Parameter-Lesen/-Schreiben im FT-Debugger sowie xdat-Parameter-Backup und -Wiederherstellung."
---

# SoARM-Servo-Kalibrierungstool – Anleitung

> **[Im Shop kaufen](https://www.juxitech.com/de/products/so-arm101-developers-kit)**


Das **Kalibrierungstool der SoARM-Serie** ist ein FTServo-Servo-Werkskalibrierungs- und LeRobot-Kalibrierungstoolkit für Roboterarme der SoARM-10X-Serie (z. B. das [SO-ARM101-Entwicklerkit](/de/products/so-arm101)). Über die grafische Oberfläche lassen sich Mittenkalibrierung, Einzelservo-Steuerung, Parameter-Lesen/-Schreiben, xdat-Parameter-Backup/-Wiederherstellung und Dual-Port-Synchron-Teleoperation durchführen; außerdem werden Kalibrierdateien im JSON-Format von LeRobot erzeugt. Für Montage des Roboterarms und Servoeinbau lesen Sie bitte zuerst die [SO-ARM101-Montageanleitung](./SO-ARM101-Assembly.md).

Dieses Tool ist eine Weiterentwicklung des Projekts [Seeed_RoboController von Seeed Studio](https://github.com/Seeed-Studio); das Originalprojekt wurde unter MIT-Lizenz veröffentlicht. Dieses Projekt behält die ursprünglichen Kernfunktionen bei und bietet zusätzlich eine überarbeitete GUI, einen neuen FT-Debugger, xdat-Parameter-Backup/-Wiederherstellung sowie plattformübergreifende Unterstützung.

## Kompatibilitätshinweis

> ⚠️ **Dieses Tool unterstützt derzeit nur Feetech-Servos (STS3215-Serie)**. Registertabelle, xdat-Parameterformat und Baudratentabelle sind auf die Feetech-STS3215-Serie ausgelegt; für Servos anderer Marken/Modelle wird keine Kompatibilität garantiert.

## Funktionen

| Funktion | Beschreibung |
| ---- | ---- |
| Automatische Port-Erkennung | Intelligente Erkennung von USB-Seriell-Ports, automatisches Herausfiltern virtueller Geräte |
| Plattformübergreifend | Kompatibel mit Windows / Ubuntu / macOS |
| Dual-Port-Synchronisation | Zwei unabhängige serielle Ports (links/rechts), unterstützt Synchron-Teleoperation mit Master- und Slave-Port |
| Umschaltung Chinesisch/Englisch | Ein-Klick-Umschaltung zwischen Chinesisch/Englisch in der Oberfläche, Auswahl wird automatisch gespeichert |
| Mittenkalibrierung | Brennt die aktuelle Servoposition als Mittelstellung 2048 ins EEPROM (dauerhaft gespeichert) |
| Mittentest | Aktiviert das Drehmoment und fährt die Servos in die Mittelstellung, um das Kalibrierungsergebnis zu prüfen |
| Motoren deaktivieren | Deaktiviert mit einem Klick das Drehmoment aller Servos, erleichtert manuelle Anpassungen |
| Automatischer Scan | Erkennt automatisch alle online befindlichen Servos im ID-Bereich 1–20 |
| Einzelservo-Steuerung | Schieberegler für die Position und Drehmomentschalter einzelner Servos in Echtzeit |
| FT-Debugger | Serielle Verbindung, Scan, Parameter-Lesen/-Schreiben, Positionssteuerung, Baudrate ändern, Werkseinstellungen wiederherstellen, xdat-Parameter-Backup |
| xdat-Parameter | Aktuelle EEPROM-Parameter des Servos speichern / Backup zum Wiederherstellen öffnen |
| LeRobot-Kalibrierung | Erzeugt Kalibrierdateien im JSON-Format von LeRobot |
| Mittenfahrt per Kalibrierdatei | Fährt den Roboterarm anhand der Kalibrierdatei in die Mittelstellung |

## Oberflächenübersicht

Das Hauptprogramm enthält drei Tabs:

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

- **Obere Leiste**: App-Titel, Dropdown zur Portauswahl, Aktualisieren-Schaltfläche, Teleoperation-Schaltfläche, Sprachumschaltfläche.
- **🦾 Tab1 舵机标定** (Servo-Kalibrierung): Schnellaktionen in den linken/rechten Panels (Mittenkalibrierung, Mittentest, Motoren deaktivieren) und Echtzeitstatus.
- **🎚️ Tab2 单舵机控制** (Einzelservo-Steuerung): Position jedes online befindlichen Servos per Schieberegler feinjustieren, Drehmoment ein-/ausschalten.
- **🔬 Tab3 FT 调试器** (FT-Debugger): Serielle Verbindung, Scan, Parameter-Lesen/-Schreiben (56 Register), Positionssteuerung, Baudrate/Werkseinstellungen, xdat-Parameter-Backup/-Wiederherstellung.

## Installation und Start

Systemvoraussetzungen:

| Abhängigkeit | Version | Beschreibung |
| ---- | ---- | ---- |
| Python | >= 3.8 | 3.10+ empfohlen, Download von [python.org](https://www.python.org/downloads/) |
| PySide6 | >= 6.0 | GUI-Framework |
| pyserial | >= 3.5 | Serielle Kommunikation |
| System | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+ unterstützt Apple Silicon / Intel |

Hardware-Anschluss: Roboterarm-Steuerplatine über einen USB-zu-Seriell-Adapter (z. B. CH340 / CP2102) verbinden und die Servos mit Strom versorgen (Standardversion empfohlen DC 5V 5A, Pro-Version empfohlen DC 12V 5A).

### Windows

1. [Python 3.10+](https://www.python.org/downloads/) installieren (bei der Installation unbedingt **Add Python to PATH** ankreuzen, sonst findet die Kommandozeile `python` nicht). Installation prüfen:

```bash
python --version
```

2. Virtuelle Umgebung erstellen und Abhängigkeiten installieren:

```bash
cd Juxi_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

> Hinweis: Nach der Aktivierung erscheint `(.venv)` als Präfix vor der Eingabeaufforderung.

3. Umgebung prüfen und starten:

```bash
python setup.py
python -m src.gui.factory_calibration_tool
```

Wenn `[OK] 环境检查通过，可以运行项目` angezeigt wird, ist die Umgebung korrekt eingerichtet.

4. Im Geräte-Manager (`Win+X` → Geräte-Manager) unter „Anschlüsse (COM und LPT)" die COM-Nummer prüfen:

```
端口 (COM 和 LPT)
  └─ USB-SERIAL CH340 (COM3)     ← 你的舵机串口
```

> **Notieren Sie die COM-Nummer** und wählen Sie sie nach dem Start in der oberen Leiste aus; alternativ können Sie den Port manuell angeben (wenn der Port belegt ist):

```bash
python -m src.gui.factory_calibration_tool --port1 COM3 --port2 COM4
```

Verfügbare Ports anzeigen:

```bash
python -m src.gui.factory_calibration_tool --list-ports
```

### Linux (Ubuntu / Debian)

1. Chinesische Schriftarten und Abhängigkeiten installieren (die chinesischen Schriftarten sind für die Anzeige der chinesischen Oberfläche erforderlich, die Emoji-Schriftart für Symbole wie ✅⚠️ im Log):

```bash
sudo apt install python3-venv fonts-noto-cjk fonts-noto-color-emoji
```

2. **⚠️ Port-Berechtigung hinzufügen (Gruppe dialout)【erforderlich】** (unter Linux können normale Benutzer standardmäßig nicht auf `/dev/ttyUSB*` / `/dev/ttyACM*` zugreifen):

```bash
sudo usermod -a -G dialout $USER
# 注销并重新登录后生效
```

Prüfen (die Ausgabe sollte `dialout` enthalten):

```bash
groups
```

> Falls dies nicht wirkt: Computer neu starten; bei manchen Distributionen heißt die Gruppe `uucp` (Arch) oder `tty`.

3. Virtuelle Umgebung erstellen, Abhängigkeiten installieren und starten:

```bash
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> Meldet pip den Fehler „externally managed environment", verwenden Sie alternativ `pip install --break-system-packages -r requirements.txt` oder eine virtuelle Umgebung.

4. USB-zu-Seriell-Gerät erkennen (nach dem Einstecken des Adapters):

```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Typische Ausgabe:

```
/dev/ttyUSB0   # CH340 / CP2102 / PL2303
/dev/ttyACM0   # 原生 USB 串口（Arduino / ESP32 板载）
```

Detaillierte Herstellerinformationen anzeigen:

```bash
dmesg | tail -20 | grep -i tty
# 或
lsusb
```

> Bei mehreren Geräten werden `ttyUSB0` / `ttyUSB1` in der Reihenfolge des An-/Absteckens zugewiesen und können dadurch instabil sein. Empfohlen: `/dev/ttyACM*` verwenden oder die Namen anhand des Herstellers fixieren (siehe udev-Abschnitt unten).

Port manuell angeben:

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/ttyUSB0 --port2 /dev/ttyUSB1
```

> Ist nur ein serieller Port vorhanden, setzt das Tool den zweiten Port automatisch auf „deaktiviert".

5. Optional: Gerätenamen per udev fixieren (verhindert Nummerndrift nach dem An-/Abstecken). Erstellen Sie `/etc/udev/rules.d/99-servo.rules` und fixieren Sie die Namen anhand der USB-ID:

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", SYMLINK+="ttyServo"
```

Danach ist der Zugriff über den festen Namen mit `ls -l /dev/ttyServo` möglich; die Hersteller-ID ermitteln Sie mit `lsusb`.

### macOS

1. Python über Homebrew installieren (vermeidet die veraltete systemeigene Python-Version):

```bash
# 安装 Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python
```

Prüfen:

```bash
python3 --version
```

2. Virtuelle Umgebung erstellen, Abhängigkeiten installieren und starten (mit `source` aktivieren, nicht mit `.bat`):

```bash
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

3. **⚠️ Serielle Portnamen**: macOS legt USB-Seriell-Geräte unter `/dev` ab; es gibt **zwei Namensschemata**:

| Präfix | Bedeutung | Geeignet |
| ---- | ---- | -------- |
| `/dev/tty.usbserial-*` | Modem-Stil (blockierend) | kann hängen bleiben, nicht empfohlen |
| `/dev/cu.usbserial-*` | Callout-/Terminal-Stil (**nicht blockierend**) | ✅ empfohlen |

Portnamen anzeigen:

```bash
ls /dev/cu.*
```

Typische Ausgabe:

```
/dev/cu.usbserial-0001      # CP2102 / FTDI
/dev/cu.usbmodem141101      # 板载 USB 串口（Arduino / ESP32）
/dev/cu.wchusbserial1420    # CH340
```

> Das Programm bevorzugt automatisch `cu.*`-Geräte; bei manueller Portangabe verwenden Sie `cu.` statt `tty.`.

Port manuell angeben:

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/cu.usbserial-0001 --port2 /dev/cu.usbmodem141101
```

4. USB-Treiber: Für die meisten gängigen Chips (CH340, CP2102, FTDI) bringt macOS die Treiber bereits mit – Plug-and-Play. Falls das Gerät nicht erkannt wird:

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**: Bei älteren Chargen muss der offizielle WCH-Treiber installiert werden;
- Im Allgemeinen genügt es, wenn `ls /dev/cu.*` das Gerät anzeigt.

5. Nutzungshinweise:
   - **Der Portname kann sich ändern**: Nach dem Umstecken an einen anderen USB-Port kann sich der `cu.*`-Name ändern – wählen Sie ihn bei jedem Start im Dropdown der oberen Leiste aus.
   - **Energiesparen**: Der Ruhezustand von macOS kann den seriellen Port trennen; halten Sie das System während der Bedienung wach oder erhöhen Sie die Ruhezustandszeit.
   - **Datenschutzberechtigung**: Erscheint beim ersten Start die Abfrage „Zugriff auf Wechseldatenträger", klicken Sie auf „Erlauben".

## Bedienung

### 1. Servos verbinden und erkennen

1. Roboterarm-Steuerplatine über den USB-zu-Seriell-Adapter anschließen und die Servos mit Strom versorgen.
2. GUI öffnen und in der oberen Leiste im Dropdown den entsprechenden Port wählen (oder `🔄` zum Aktualisieren anklicken).
3. Oben im Panel erscheint `🟢 已连接` und es werden automatisch alle online befindlichen Servos im ID-Bereich 1–20 erkannt (üblicherweise 1–6).

> Meldet das Tool, dass der Port belegt ist, prüfen Sie, ob ein anderes Programm (serieller Monitor, ein zuvor nicht beendetes Tool) den Port belegt.

### 2. Mittenkalibrierung (aktuelle Position als 2048 setzen)

> Richten Sie den Roboterarm vor der Kalibrierung physisch so aus, dass sich jedes Gelenk in der gewünschten „Null-/Mittelstellung" befindet.

1. Im Panel auf die Schaltfläche **串口X中位校准** klicken.
2. Das Programm deaktiviert zunächst die Servos und fordert Sie auf, die Servos manuell in die gewünschte Mittelstellung zu bringen.
3. Nach der Bestätigung führt das Programm für jeden Servo Folgendes aus: EEPROM entsperren → Kalibrierbefehl schreiben (Wert 128 an Adresse 40) → EEPROM wieder sperren.
4. Anschließend mit dem „Mittentest" prüfen: Bleiben die Servos nahezu an Ort und Stelle (sehr kleine Bewegung), war die Kalibrierung erfolgreich.

### 3. Mittentest

1. Auf **串口X中位测试** klicken.
2. Das Programm aktiviert das Drehmoment und fährt alle Servos auf 2048.
3. Bewegen sich die Servos von ihrer aktuellen Position kaum, ist die Kalibrierung korrekt; bewegen sie sich stark, ist der Kalibrierwert unzuverlässig und die Kalibrierung muss wiederholt werden.

### 4. Motoren deaktivieren (manuelle Anpassung)

- Auf **串口X失能电机** klicken, um das Drehmoment aller Servos an diesem Port abzuschalten; die Servos lassen sich dann frei von Hand drehen.
- Einzelne Servos lassen sich auf der Seite **单舵机控制** über den Drehmomentschalter unter dem Schieberegler einzeln ein-/ausschalten.

### 5. Einzelservo-Steuerung (Tab2)

1. Auf der Seite **🎚️ 单舵机控制** hat jeder online befindliche Servo einen Positions-Schieberegler und einen Drehmomentschalter.
2. **Schieberegler ziehen → loslassen**: Der Servo fährt zur Zielposition.
3. Der Drehmomentschalter unter dem Schieberegler kann das Drehmoment dieses Servos einzeln ein-/ausschalten.

### 6. FT-Debugger (Parameter-Lesen/-Schreiben und Positionssteuerung)

Auf der Seite **🔬 FT 调试器**:

1. **Serielle Verbindung**: Port und Baudrate (Standard 1M) wählen, nach dem Verbinden **扫描舵机** ausführen, um online befindliche Servos zu erkennen.
2. **Parameter lesen**: Alle Register lesen (EEPROM + SRAM).
3. **Parametertabelle**: Alle 56 Register in 5 Spalten; beim Anklicken einer Zeile wird die „Schreibadresse" automatisch übernommen.
4. **Positionssteuerung**: Zielposition / Geschwindigkeit einstellen und ausführen; nach Abschluss der Bewegung wird darauf hingewiesen, das Drehmoment abzuschalten.
5. Baudrate ändern, Werkseinstellungen wiederherstellen und xdat-Parameter-Backup/-Wiederherstellung: siehe die jeweiligen Abschnitte unten.

### 7. Servo-ID ändern

1. Die Seite **🔬 FT 调试器** öffnen, den seriellen Port verbinden und Servos scannen.
2. Den Zielservo auswählen, in der Parametertabelle den Wert der „Servo-ID" (Adresse 0x05) ändern und auf Schreiben klicken.
3. Das Programm führt aus: Entsperren → Schreiben an Adresse 5 → neue ID verifizieren → wieder sperren.

> ⚠️ Stellen Sie vor dem Ändern der ID sicher, dass nur dieser eine Servo am Bus hängt, um ID-Konflikte zu vermeiden.

### 8. Baudrate ändern / Werkseinstellungen wiederherstellen

- **Baudrate ändern**: Im Bereich „Baudrate / Werkseinstellungen wiederherstellen" des FT-Debuggers die neue Baudrate wählen (38400 – 1000000 bps) und ändern. Nach dem Schreiben wird die Baudrate des seriellen Ports automatisch umgestellt und per Ping verifiziert; bei Fehlschlag erfolgt ein automatischer Rollback.
- **Werkseinstellungen wiederherstellen**: Der Servo wird auf die Werkseinstellungen zurückgesetzt (ID=1, Baudrate=1000000); danach muss erneut gescannt werden.

### 9. xdat-Parameter-Backup und -Wiederherstellung

Im Bereich „xdat 参数（仅保存 EEPROM）" des FT-Debuggers:

1. **💾 保存当前舵机**: Die EEPROM-Parameter des aktuell ausgewählten Servos als xdat-Datei speichern (Backup).
2. Nach beliebigen Änderungen an den Servoparametern können Sie wie folgt wiederherstellen:
3. **📂 打开 xdat**: Die Backup-Datei laden.
4. **📤 恢复参数到舵机**: Das Backup zurück in das EEPROM des aktuellen Servos schreiben.

### 10. Dual-Port-Synchron-Teleoperation

> ⚠️ **Richtung: Serieller Port 1 steuert seriellen Port 2**. Port 1 (Master) liest nur die Servowinkel; Port 2 (Slave) wird synchron gesteuert.

1. In der oberen Leiste auf **🎮 遥控** klicken (Port 1 liest Winkel → Port 2 steuert Servos mit gleicher ID synchron).
2. Die Servo-IDs an beiden Ports müssen übereinstimmen; synchronisiert werden nur Servos in der Schnittmenge.
3. Erneut auf dieselbe Schaltfläche klicken zum Stoppen; danach nehmen die Scan-Threads der linken/rechten Panels ihre Arbeit automatisch wieder auf.

### 11. LeRobot-Kalibrierung (Kommandozeile)

```bash
# 校准从动臂（保存到 ~/.cache/huggingface/lerobot/calibration/robots/so_follower/）
python -m src.tools.lerobot_calibrate --arm-type follower

# 校准领导臂
python -m src.tools.lerobot_calibrate --arm-type leader
```

Ablauf: Servos deaktivieren → jedes Gelenk in die Mittelstellung bringen und `homing_offset` aufzeichnen → den gesamten Bewegungsbereich langsam durchfahren und `range_min/max` aufzeichnen (`wrist_roll` ist ein kontinuierliches Drehgelenk, der Bereich ist fest auf `[0,4095]` gesetzt) → JSON speichern.

Anhand der Kalibrierdatei in die Mittelstellung fahren:

```bash
python -m src.tools.run_calibration_middle <校准文件.json> --mode zero
```

Die Installation der LeRobot-Umgebung und der Datenaufnahme-Workflow sind im [LeRobot-Roboterarm-Tutorial](./SO-ARM101-Tutorial.md) beschrieben.

## Kommandozeilen-Tools

Neben der grafischen Oberfläche bietet das Tool folgende Kommandozeilen-Einstiegspunkte (ohne GUI):

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

# 双端口同步遥控
python -m src.tools.servo_remote_control
```

## Hinweise

1. **Sicherheit geht vor**: Die Mittenkalibrierung wird dauerhaft ins EEPROM geschrieben. Stellen Sie vor der Kalibrierung eine stabile Stromversorgung sicher und prüfen Sie, dass der Roboterarm weder Personen noch Gegenstände treffen kann.
2. **Stromversorgung**: SO-ARM101 Standardversion empfohlen DC 5V 5A, Pro-Version empfohlen DC 12V 5A. Unzureichende Stromversorgung führt zu Schrittverlusten oder Kommunikationsfehlern.
3. **Exklusiver Zugriff auf den Port**: Unter Windows wird der serielle Port vom Programm exklusiv belegt; derselbe Port kann nicht gleichzeitig vom Scan-Thread der GUI und vom Kalibrierungs-Subprozess verwendet werden. Das Tool stoppt zuerst den Scan-Thread und beendet den alten Prozess, bevor es arbeitet – bitte nicht wiederholt manuell klicken.
4. **Linux-Port-Berechtigung**: Für den Zugriff auf `/dev/ttyUSB*` / `/dev/ttyACM*` muss der Benutzer zur Gruppe `dialout` hinzugefügt werden (siehe Abschnitt „Linux" oben).
5. **macOS-Portnamen**: Verwenden Sie `/dev/cu.*` (nicht blockierend) statt `/dev/tty.*` (blockierend, kann hängen bleiben), siehe Abschnitt „macOS" oben.
6. **Hot-Plug**: Nach dem Abziehen des USB-Kabels versucht das Programm automatisch, die Verbindung wiederherzustellen; nach dem erneuten Einstecken `🔄` anklicken, um die Portliste zu aktualisieren.
7. **Übertemperatur-/Überspannungsschutz**: Das Programm überwacht Spannung und Temperatur (Warnung bei Temperatur > 60°C). Bei anhaltend hoher Servotemperatur das System stoppen und abkühlen lassen.
8. **Mittenkalibrierung ist irreversibel**: Nach dem Schreiben wird der ursprüngliche Offset überschrieben und kann nicht rückgängig gemacht werden. Notieren Sie vor der Kalibrierung die ursprüngliche Position.
9. **Risiko bei ID-Änderung**: Bei Schreib- oder Verifizierungsfehlern meldet das Programm einen Fehler und setzt das Scannen fort; in Extremfällen kann der Servo jedoch „verloren gehen". Bei Verbindungsverlust können Sie „Werkseinstellungen wiederherstellen" versuchen (nach dem Reset ist die ID wieder 1).
10. **Kodierungsprobleme**: Bei Emoji-Zeichensalat in der Windows-Konsole setzen Sie `PYTHONIOENCODING=utf-8` und führen Sie das Kommandozeilen-Tool erneut aus. Unter Linux / macOS mit nativem UTF-8 tritt dieses Problem normalerweise nicht auf.

## Fehlerbehebung

| Symptom | Mögliche Ursache | Lösung |
| ---- | -------- | -------- |
| Serieller Port lässt sich nicht öffnen / Port belegt | Anderes Programm belegt den Port | Programme wie serielle Monitore schließen oder den Port wechseln und das Tool neu starten |
| Windows: PermissionError beim Öffnen des Ports | Anderer Prozess belegt den COM-Port | Sicherstellen, dass kein anderer Prozess diesen COM-Port belegt |
| Keine Servos gefunden | Unzureichende Stromversorgung / falsche Verkabelung / falsche Baudrate | Stromversorgung und Verkabelung prüfen; sicherstellen, dass der Servo mit 1M Baudrate läuft |
| Servos laufen nach der Mittenkalibrierung unkontrolliert | Arm vor der Kalibrierung nicht korrekt positioniert | „Deaktivieren → manuell positionieren → Mittenkalibrierung" erneut ausführen |
| Temperaturanstieg zu schnell | Überlast oder Blockade | Mechanik auf Blockaden prüfen, Geschwindigkeit/Beschleunigung reduzieren |
| Servo nach ID-Änderung nicht auffindbar | ID-Konflikt oder Schreiben fehlgeschlagen | Werkseinstellungen wiederherstellen, erneut scannen |
| Teleoperation nicht synchron | IDs an beiden Ports stimmen nicht überein | Prüfen, dass Servos mit gleicher ID an Master- und Slave-Port online sind |
| Windows: Port nicht gefunden | Treiber fehlt | Im Geräte-Manager den Treiber prüfen; anderen USB-Port verwenden; CH340-Treiber installieren |
| Linux: Port nicht gefunden | Gerät nicht erkannt | `ls /dev/ttyUSB* /dev/ttyACM*`; Gerät mit `lsusb` prüfen |
| Permission denied: /dev/ttyUSB0 | Benutzer nicht in der Gruppe dialout | `sudo usermod -a -G dialout $USER` ausführen und neu anmelden; oder `sudo chmod 666 /dev/ttyUSB0` (temporär) |
| Linux: Gerätename ändert sich | An-/Absteckreihenfolge beeinflusst die ttyUSB-Nummerierung | Namen per udev-Regel fixieren (siehe Abschnitt „Linux" oben) oder bei jedem Start auswählen |
| macOS: Portname mit `tty.` bleibt hängen | Blockierender Gerätename verwendet | Geräte mit `cu.`-Präfix verwenden |
| macOS: Gerät nicht gefunden | Gerät nicht erkannt | `ls /dev/cu.*`; aus- und wieder einstecken; mit `system_profiler SPUSBDataType` prüfen |
| macOS: Berechtigungsproblem | Systemzugriffskontrolle | Normalerweise keine zusätzlichen Berechtigungen nötig; bei Zugriffskontrollabfrage dem Terminal den Zugriff erlauben |
| Chinesische Oberfläche leer | Chinesische Schriftarten fehlen | Unter Linux `fonts-noto-cjk` installieren; bei Problemen unter macOS Noto Sans CJK installieren |
| Emojis werden als Kästchen angezeigt | Emoji-Schriftart fehlt | `fonts-noto-color-emoji` installieren |
| pip-Installation schlägt fehl | System-Python geschützt (externally managed environment) | Virtuelle Umgebung verwenden; oder `pip install --break-system-packages -r requirements.txt` |
| Programm startet nicht | Abhängigkeiten fehlen oder Version passt nicht | Version mit `python3 --version` prüfen; Abhängigkeiten mit `pip list` prüfen |
| macOS: Aktivierung der virtuellen Umgebung schlägt fehl | Falsches Aktivierungsskript | `source .venv/bin/activate` verwenden (nicht `.bat`) |
| macOS Apple Silicon: Kompilierungsfehler | Altes Python unter Rosetta | Python 3.10+ verwenden (native Apple-Silicon-Unterstützung) |

## Verzeichnisstruktur

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

Das Tool-Repository besteht aus den Modulen `src/gui` (PySide6-GUI), `src/tools` (Kommandozeilen-Tools), `scservo_sdk` (FTServo-Servo-Kommunikations-SDK) und `setup.py` (Skript zur Umgebungsprüfung).

<RelatedProducts slugs="so-arm101,servo-driver-board" />
