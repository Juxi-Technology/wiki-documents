---
title: "Interazione vocale ROS2"
description: "Il modulo di interazione vocale AI supporta le seguenti tre modalità di cablaggio:"
---

# Interazione vocale ROS2

## 1、Preparazione dell'ambiente

#### Requisiti di sistema

- **Sistema operativo**: Ubuntu 22.04

- **Versione ROS2**: Humble

#### Installazione delle dipendenze

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

## 2、Descrizione delle tre modalità di cablaggio

Il modulo di interazione vocale AI supporta le seguenti tre modalità di cablaggio:

#### Meccanismo di rilevamento automatico

All'avvio, il nodo ROS2 rileva automaticamente la modalità di cablaggio nel seguente ordine:

1. Prova prima la porta seriale: verifica in sequenza `/dev/ttyUSB0` → `/dev/ttyACM0` → `/dev/ttyAMA0` → `/dev/ttyS0`

2. Prova poi I2C: verifica se lo slave `0x2A` è presente su `/dev/i2c-1`

3. Per il rilevamento della porta seriale è sufficiente che il file di dispositivo esista e sia apribile, senza necessità di verifiche aggiuntive

Una volta rilevata una qualsiasi delle modalità, il rilevamento si interrompe e tale modalità viene bloccata per l'uso. Non è necessaria alcuna configurazione manuale.

---

## 3、Descrizione del protocollo IIC

#### Configurazione dello slave IIC

#### Definizione dei registri

---

## 4、Descrizione del protocollo della porta seriale (Type-C / UART)

#### Formato del frame

Ogni frame è fisso a **5 byte**:

#### Baud rate

Fisso a **115200** bps.

---

## 5、Creazione dello workspace e della struttura di directory

#### Creazione della directory

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### Creazione del pacchetto ROS2

```Bash
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### Struttura di directory finale

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

## 6、Contenuto dei file e posizionamento

#### File 1：`voice_node.py` (nodo di controllo vocale)

**Posizione**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

**Funzionalità principali**:

- Rileva automaticamente la modalità di cablaggio Type-C / UART / IIC

- Tabella di mappatura unificata delle parole di comando (114 parole di comando)

- Utilizza il backend di comunicazione corrispondente in base alla modalità di cablaggio

**Architettura chiave**:

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

(Per il codice completo, consultare il file `voice_node.py` fornito con il progetto)

#### File 2：`rviz_control.py` (nodo di controllo RViz)

**Posizione**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

Si sottoscrive al topic `/juxi_voice_cmd` per ricevere il testo dei comandi e aggiorna la visualizzazione del cubo in base al comando.

(Per il codice completo, consultare il file `rviz_control.py` fornito con il progetto)

#### File 3：Modifica di `setup.py`

**Posizione**: `~/juxi_speech_ws/src/juxi_voice/setup.py`

```Bash
entry_points={
    'console_scripts': [
        'voice_node = juxi_voice.voice_node:main',
        'rviz_control = juxi_voice.rviz_control:main',
    ],
},
```

---

## 7、Compilazione ed esecuzione

#### Compilazione

```Bash
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### Variabili d'ambiente

```Bash
source ~/juxi_speech_ws/install/setup.bash
# 或写入 ~/.bashrc
echo "source ~/juxi_speech_ws/install/setup.bash" >> ~/.bashrc
```

#### Impostazione delle autorizzazioni

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

#### Esecuzione dei nodi (3 terminali)

**Terminale 1**: nodo vocale

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice voice_node
```

All'avvio viene visualizzata la modalità di cablaggio rilevata:

```Bash
自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

oppure

```Bash
自动检测: UART /dev/ttyUSB0
语音节点启动完成 - UART /dev/ttyUSB0
```

**Terminale 2**: nodo di controllo RViz

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```

**Terminale 3**: visualizzazione RViz (carica direttamente il file preconfigurato, senza necessità di impostazioni manuali)

```Bash
rviz2 -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

Oppure aprire prima RViz e poi caricare:

```Bash
rviz2
# 菜单栏: File → Open Config → 选择 juxi_voice.rviz
```

---

## 8、Descrizione della preconfigurazione di RViz

`juxi_voice.rviz` è già preconfigurato con quanto segue ed è pronto all'uso all'avvio, senza alcuna operazione manuale:

- **Fixed Frame**: `map`

- **Visualizzazione Marker**: sottoscritto a `/juxi_visual_marker` (marker singolo)

- **Visualizzazione MarkerArray**: sottoscritto a `/juxi_visual_markers` (marker multipli: braccio robotico, livello della batteria, allarme, ecc.)

- **Punto di vista**: osservazione dall'alto in diagonale, con il centro nell'origine

---

## 9、Modalità d'uso

#### Attivazione

Dire **"你好小犀"** al modulo → il modulo risponde "我在"

#### Invio di comandi

- "小车前进" → il cubo avanza

- "亮红灯" → il cubo diventa rosso

- "打开流水灯" → il colore cambia in modo ciclico

- "报警" → una sfera rossa pulsante

- "显示电量" → testo del livello della batteria

#### Riproduzione attivata dal controller host

```Bash
# 被动播报
ros2 topic pub /juxi_passive_play std_msgs/msg/String "data: '这是红色'"
# 功能词播报
ros2 topic pub /juxi_func_play std_msgs/msg/String "data: '欢迎语'"
# 命令词播报
ros2 topic pub /juxi_cmd_play std_msgs/msg/String "data: '小车前进'"
```

---

## 10、Tabella di riferimento degli ID delle parole di comando

### Parole di funzione (ID 1-10)

### Parole di comando (ID 11-83, 113)

### Parole di riproduzione passiva (ID 84-112, 114)

---

## 11、Descrizione dei topic ROS2

---

## 12、Risoluzione dei problemi

**All'avvio viene segnalato "modulo di interazione vocale AI non rilevato"**

Verificare se il file di dispositivo corrispondente alla modalità di cablaggio esiste:

```Bash
# I2C 接线
ls /dev/i2c-1
sudo i2cdetect -y 1   # 应看到 0x2A

# Type-C 接线
ls /dev/ttyUSB0 /dev/ttyACM0

# UART 接线
ls /dev/ttyAMA0 /dev/ttyS0
```

**Errore di autorizzazione della porta seriale**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
```

**Errore di autorizzazione I2C**

```Bash
sudo chmod 666 /dev/i2c-1
```

**Nessun cubo in RViz**

- Verificare se Fixed Frame è `map`

- Verificare se il Topic è `/juxi_visual_marker`

**Nessuna risposta ai comandi dopo l'attivazione**

```Bash
ros2 topic echo /juxi_voice_cmd
```

Dati presenti → problema di configurazione di RViz; nessun dato → problema di cablaggio/comunicazione.

<RelatedProducts slugs="ai-voice-module" />
