---
title: "ROS2-Sprachinteraktion"
description: "Das AI-Sprachinteraktionsmodul unterstützt die folgenden drei Verkabelungsmethoden:"
---

# ROS2-Sprachinteraktion

## 1、Umgebungsvorbereitung

#### Systemanforderungen

- **Betriebssystem**: Ubuntu 22.04

- **ROS2-Version**: Humble

#### Abhängigkeiten installieren

```Bash
# 1. 更新源
sudo apt update

# 2. 安装 ROS2 基础包
# (如果已安装ROS2，跳过)
sudo apt install ros-humble-desktop -y

# 3. 安装本项目依赖（同时支持串口和I2C）
sudo apt install python3-pip ros-humble-rviz2 ros-humble-visualization-msgs -y
pip3 install pyserial smbus2

# 4. 如果使用 I2C 接线，额外安装
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
        ├── setup.py           # (替换为本项目提供的)
        ├── juxi_voice.rviz    # (新建：RViz预配置文件)
        ├── resource/
        │   └── juxi_voice
        └── juxi_voice/
            ├── __init__.py
            ├── voice_node.py    # (新建：语音节点)
            └── rviz_control.py  # (新建：RViz控制节点)
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
# 统一命令数据: ID → (串口字节2, 串口字节3, 命令文本, 播报模式)
CMD_DATA = {
    1:  (0x01, 0x00, "欢迎语", "被"),
    3:  (0x03, 0x00, "你好小犀", "主"),
    14: (0x00, 0x04, "小车前进", "主"),
    84: (0xFF, 0x5F, "这是红色", "被"),
    ...
}

# 自动检测函数
def detect_connection(logger):
    # 1. 尝试 I2C
    # 2. 尝试串口 /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyAMA0, /dev/ttyS0
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
# 或写入 ~/.bashrc
echo "source ~/juxi_speech_ws/install/setup.bash" >> ~/.bashrc
```

#### Berechtigungseinstellungen

```Bash
# I2C 权限
sudo chmod 666 /dev/i2c-1
# 串口权限
sudo chmod 666 /dev/ttyUSB0
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyAMA0
# 或加入用户组
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
# 菜单栏: File → Open Config → 选择 juxi_voice.rviz
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
# 被动播报
ros2 topic pub /juxi_passive_play std_msgs/msg/String "data: '这是红色'"
# 功能词播报
ros2 topic pub /juxi_func_play std_msgs/msg/String "data: '欢迎语'"
# 命令词播报
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
# I2C 接线
ls /dev/i2c-1
sudo i2cdetect -y 1   # 应看到 0x2A

# Type-C 接线
ls /dev/ttyUSB0 /dev/ttyACM0

# UART 接线
ls /dev/ttyAMA0 /dev/ttyS0
```

**Fehler bei der Berechtigung der seriellen Schnittstelle**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
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

