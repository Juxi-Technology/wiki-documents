---
title: "ROS2-Sprachinteraktion"
description: "AI-Sprachinteraktionsmodul unter ROS2 Humble einbinden: Abhängigkeiten installieren und die serielle oder I2C-Verkabelung automatisch erkennen lassen."
---

# ROS2-Sprachinteraktion

## 1、Umgebungsvorbereitung

#### Systemanforderungen

- **Betriebssystem**: Ubuntu 22.04

- **ROS2-Version**: Humble

#### Abhängigkeiten installieren

```Bash
# 1. Quellen aktualisieren
sudo apt update

# 2. ROS2-Basispaket installieren
# (Überspringen, wenn ROS2 bereits installiert ist)
sudo apt install ros-humble-desktop -y

# 3. Projektabhängigkeiten installieren (unterstützt seriell und I2C)
sudo apt install python3-pip ros-humble-rviz2 ros-humble-visualization-msgs -y
pip3 install pyserial smbus2

# 4. Bei I2C-Verkabelung zusätzlich installieren
sudo apt install python3-smbus2 i2c-tools -y
```

---

## 2、Drei Verkabelungsmethoden

Das AI-Sprachinteraktionsmodul unterstützt die folgenden drei Verkabelungsmethoden:

#### Automatischer Erkennungsmechanismus

Beim Start des ROS2-Knotens wird die Verkabelungsmethode automatisch in der folgenden Reihenfolge erkannt:

1. Zuerst wird die serielle Schnittstelle versucht: nacheinander werden `/dev/ttyUSB0` → `/dev/ttyACM0` → `/dev/ttyAMA0` → `/dev/ttyS0` geprüft

2. Danach wird I2C versucht: Es wird geprüft, ob auf `/dev/i2c-1` der Slave `0x2A` vorhanden ist

3. Bei der Erkennung der seriellen Schnittstelle gilt der Port als verfügbar, sobald die Gerätedatei vorhanden ist und geöffnet werden kann; eine zusätzliche Überprüfung ist nicht erforderlich

Sobald eine der Methoden erkannt wird, wird die Erkennung beendet und diese Methode wird fest verwendet. Eine manuelle Konfiguration ist nicht erforderlich.

---

## 3、IIC-Protokollbeschreibung

#### IIC-Slave-Konfiguration

#### Registerdefinitionen

---

## 4、Beschreibung des seriellen Protokolls (Type-C / UART)

#### Rahmenformat

Jeder Rahmen umfasst fest **5 Byte**:

#### Baudrate

Fest auf **115200** bps.

---

## 5、Arbeitsbereich und Verzeichnisstruktur erstellen

#### Verzeichnis erstellen

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### ROS2-Paket erstellen

```Bash
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### Endgültige Verzeichnisstruktur

```Bash
~/juxi_speech_ws/
├── build/
├── install/
├── log/
└── src/
    └── juxi_voice/
        ├── package.xml
        ├── setup.py           # (Durch das von diesem Projekt bereitgestellte ersetzen)
        ├── juxi_voice.rviz    # (Neu: RViz-Vorkonfigurationsdatei)
        ├── resource/
        │   └── juxi_voice
        └── juxi_voice/
            ├── __init__.py
            ├── voice_node.py    # (Neu: Sprach-Node)
            └── rviz_control.py  # (Neu: RViz-Steuerungs-Node)
```

---

## 6、Dateiinhalte und Platzierung

#### Datei 1: `voice_node.py` (Sprachsteuerungsknoten)

**Speicherort**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

**Kernfunktionen**:

- Erkennt die Verkabelungsmethode Type-C / UART / IIC automatisch

- Einheitliche Befehlswort-Zuordnungstabelle (114 Befehlswörter)

- Verwendet je nach Verkabelungsmethode das entsprechende Kommunikations-Backend

**Schlüsselarchitektur**:

```Bash
# Einheitliche Befehlsdaten: ID → (Seriell Byte 2, Seriell Byte 3, Befehlstext, Ansagemodus)
CMD_DATA = {
    1:  (0x01, 0x00, "欢迎语", "被"),
    3:  (0x03, 0x00, "你好小犀", "主"),
    14: (0x00, 0x04, "小车前进", "主"),
    84: (0xFF, 0x5F, "这是红色", "被"),
    ...
}

# Funktion zur automatischen Erkennung
def detect_connection(logger):
    # 1. I2C versuchen
    # 2. Serielle Ports versuchen: /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyAMA0, /dev/ttyS0
    ...
```

(Den vollständigen Code finden Sie in der von diesem Projekt bereitgestellten Datei `voice_node.py`)

#### Datei 2: `rviz_control.py` (RViz-Steuerungsknoten)

**Speicherort**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

Abonniert das Topic `/juxi_voice_cmd`, empfängt den Befehlstext und aktualisiert die Würfelvisualisierung entsprechend dem Befehl.

(Den vollständigen Code finden Sie in der von diesem Projekt bereitgestellten Datei `rviz_control.py`)

#### Datei 3: `setup.py` ändern

**Speicherort**: `~/juxi_speech_ws/src/juxi_voice/setup.py`

```Bash
entry_points={
    'console_scripts': [
        'voice_node = juxi_voice.voice_node:main',
        'rviz_control = juxi_voice.rviz_control:main',
    ],
},
```

---

## 7、Kompilieren und Ausführen

#### Kompilieren

```Bash
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### Umgebungsvariablen

```Bash
source ~/juxi_speech_ws/install/setup.bash
# Oder in ~/.bashrc schreiben
echo "source ~/juxi_speech_ws/install/setup.bash" >> ~/.bashrc
```

#### Berechtigungseinstellungen

```Bash
# I2C-Berechtigungen
sudo chmod 666 /dev/i2c-1
# Berechtigungen für die serielle Schnittstelle
sudo chmod 666 /dev/ttyUSB0
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyAMA0
# Oder zur Benutzergruppe hinzufügen
sudo usermod -aG dialout $USER
sudo usermod -aG i2c $USER
```

#### Knoten ausführen (3 Terminals)

**Terminal 1**: Sprachknoten

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice voice_node
```

Beim Start wird die erkannte Verkabelungsmethode angezeigt:

```Bash
自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

oder

```Bash
自动检测: UART /dev/ttyUSB0
语音节点启动完成 - UART /dev/ttyUSB0
```

**Terminal 2**: RViz-Steuerungsknoten

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```

**Terminal 3**: RViz-Visualisierung (vorkonfigurierte Datei direkt laden, keine manuelle Einrichtung erforderlich)

```Bash
rviz2 -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

Oder öffnen Sie zuerst RViz und laden Sie dann:

```Bash
rviz2
# Menüleiste: File → Open Config → juxi_voice.rviz auswählen
```

---

## 8、RViz-Vorkonfiguration

`juxi_voice.rviz` ist bereits mit den folgenden Inhalten vorkonfiguriert und kann direkt nach dem Start verwendet werden, ohne dass manuelle Schritte erforderlich sind:

- **Fixed Frame**: `map`

- **Marker-Anzeige**: `/juxi_visual_marker` wurde abonniert (einzelner Marker)

- **MarkerArray-Anzeige**: `/juxi_visual_markers` wurde abonniert (mehrere Marker: Roboterarm, Batteriestand, Alarm usw.)

- **Ansicht**: Beobachtung von schräg oben, Mittelpunkt im Ursprung

---

## 9、Verwendung

#### Aufwecken

Sagen Sie **"你好小犀"** zum Modul → das Modul antwortet mit "我在"

#### Befehle senden

- "小车前进" → der Würfel bewegt sich vorwärts

- "亮红灯" → der Würfel wird rot

- "打开流水灯" → die Farbe ändert sich zyklisch

- "报警" → eine rote pulsierende Kugel

- "显示电量" → Text des Batteriestands

#### Vom Host ausgelöste Ansage

```Bash
# Passive Ansage
ros2 topic pub /juxi_passive_play std_msgs/msg/String "data: '这是红色'"
# Funktionswort-Ansage
ros2 topic pub /juxi_func_play std_msgs/msg/String "data: '欢迎语'"
# Befehlswort-Ansage
ros2 topic pub /juxi_cmd_play std_msgs/msg/String "data: '小车前进'"
```

---

## 10、Befehlswort-ID-Referenztabelle

### Funktionswörter (ID 1-10)

### Befehlswörter (ID 11-83, 113)

### Passive Ansagephrasen (ID 84-112, 114)

---

## 11、ROS2-Topic-Beschreibung

---

## 12、Fehlerbehebung

**Beim Start wird "AI-Sprachinteraktionsmodul nicht erkannt" gemeldet**

Prüfen Sie, ob die Gerätedatei für die entsprechende Verkabelungsmethode vorhanden ist:

```Bash
# I2C-Verkabelung
ls /dev/i2c-1
sudo i2cdetect -y 1   # 0x2A sollte erscheinen

# Typ-C-Verkabelung
ls /dev/ttyUSB0 /dev/ttyACM0

# UART-Verkabelung
ls /dev/ttyAMA0 /dev/ttyS0
```

**Fehler bei der Berechtigung der seriellen Schnittstelle**

```Bash
sudo chmod 666 /dev/ttyUSB0   # Oder /dev/ttyACM0 usw.
```

**I2C-Berechtigungsfehler**

```Bash
sudo chmod 666 /dev/i2c-1
```

**Kein Würfel in RViz**

- Prüfen Sie, ob der Fixed Frame `map` ist

- Prüfen Sie, ob das Topic `/juxi_visual_marker` ist

**Keine Reaktion auf Befehle nach dem Aufwecken**

```Bash
ros2 topic echo /juxi_voice_cmd
```

Daten vorhanden → Problem mit der RViz-Konfiguration; keine Daten → Problem mit Verkabelung/Kommunikation.

<RelatedProducts slugs="ai-voice-module" />
