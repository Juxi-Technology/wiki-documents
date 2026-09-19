---
title: "Interazione vocale ROS1"
description: "Interazione vocale del modulo IA su ROS1: nodo ROS che rileva il cablaggio seriale o I2C e invia i comandi vocali su Ubuntu 20.04 con Noetic."
---

# Interazione vocale ROS1

## 1、Preparazione dell'ambiente

#### Requisiti di sistema

- **Sistema operativo**: Ubuntu 20.04 o 18.04

- **Versione ROS1**: Noetic (consigliata) o Melodic

#### Installazione delle dipendenze

```Bash
# 1. Aggiorna le sorgenti
sudo apt update

# 2. Installa ROS1 Desktop completo
# (se ROS1 è già installato, salta)
sudo apt install ros-noetic-desktop-full -y    # Ubuntu 20.04
sudo apt install ros-melodic-desktop-full -y   # Ubuntu 18.04

# 3. Installa le dipendenze di questo progetto (supporta sia la porta seriale che I2C)
sudo apt install python3-pip ros-noetic-rviz i2c-tools -y
pip3 install pyserial smbus2

# Se è Melodic (Python2)
sudo apt install python-pip ros-melodic-rviz i2c-tools -y
pip install pyserial smbus2

# 4. Se usi il collegamento I2C, installa in aggiunta
sudo apt install python3-smbus2 -y
```

---

## 2、Descrizione delle tre modalità di cablaggio

Il modulo di interazione vocale AI supporta le seguenti tre modalità di cablaggio:

#### Meccanismo di rilevamento automatico

All'avvio, il nodo ROS1 rileva automaticamente la modalità di cablaggio nel seguente ordine:

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

#### Creazione dello workspace catkin

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### Creazione del pacchetto ROS

```Bash
catkin_create_pkg juxi_voice rospy std_msgs visualization_msgs
```

#### Struttura di directory finale

Posizionare i file forniti con questo progetto nelle posizioni corrispondenti:

```Bash
~/juxi_speech_ws/
├── build/
├── devel/
└── src/
    └── juxi_voice/
        ├── CMakeLists.txt      # (sostituisci con quello fornito da questo progetto)
        ├── package.xml          # (sostituisci con quello fornito da questo progetto)
        ├── juxi_voice.rviz      # (nuovo: file di configurazione predefinito di RViz)
        ├── launch/
        │   └── juxi_voice.launch # (nuovo: file di avvio con un clic)
        └── scripts/
            ├── voice_node.py     # (nuovo: nodo vocale)
            └── rviz_control.py   # (nuovo: nodo di controllo RViz)
```

---

## 6、Contenuto dei file e posizionamento

#### File 1：`voice_node.py` (nodo di controllo vocale)

**Posizione**: `~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py`

**Funzionalità principali**:

- Rileva automaticamente la modalità di cablaggio Type-C / UART / IIC

- Tabella di mappatura unificata delle parole di comando (114 parole di comando, completamente coerente con la tabella di protocollo Excel V1)

- Utilizza il backend di comunicazione corrispondente (porta seriale / I2C) in base alla modalità di cablaggio

**Architettura chiave**:

```Bash
# Dati dei comandi unificati: ID → (byte seriale 2, byte seriale 3, testo del comando, modalità di riproduzione)
CMD_DATA = {
    1:   (0x01, 0x00, "欢迎语", "被"),
    3:   (0x03, 0x00, "你好小犀", "主"),
    14:  (0x00, 0x04, "小车前进", "主"),
    84:  (0xFF, 0x5F, "这是红色", "被"),
    ...
}

# Funzione di rilevamento automatico
def detect_connection():
    # 1. Prova la porta seriale /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyAMA0, /dev/ttyS0
    # 2. Prova I2C /dev/i2c-1 (indirizzo slave 0x2A)
    ...
```

(Per il codice completo, consultare il file `voice_node.py` fornito con il progetto)

#### File 2：`rviz_control.py` (nodo di controllo RViz)

**Posizione**: `~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py`

Si sottoscrive al topic `/juxi_voice_cmd` per ricevere il testo dei comandi e aggiorna la visualizzazione del cubo in base al comando.

(Per il codice completo, consultare il file `rviz_control.py` fornito con il progetto)

#### File 3：`CMakeLists.txt` e `package.xml`

Sono già forniti in questo progetto; è sufficiente sostituire i file predefiniti generati automaticamente da `catkin_create_pkg`.

---

## 7、Compilazione ed esecuzione

#### Compilazione

```Bash
cd ~/juxi_speech_ws
catkin_make
```

#### Variabili d'ambiente

```Bash
source ~/juxi_speech_ws/devel/setup.bash
# Oppure aggiungi a ~/.bashrc
echo "source ~/juxi_speech_ws/devel/setup.bash" >> ~/.bashrc
```

#### Impostazione delle autorizzazioni

```Bash
# Permessi I2C
sudo chmod 666 /dev/i2c-1
# Permessi della porta seriale
sudo chmod 666 /dev/ttyUSB0
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyAMA0
# Oppure aggiungiti al gruppo utente
sudo usermod -aG dialout $USER
sudo usermod -aG i2c $USER
# Dopo l'impostazione serve un nuovo login
```

#### Esecuzione dei nodi

**Metodo 1: avvio con un solo comando (consigliato)**

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
roslaunch juxi_voice juxi_voice.launch
```

All'avvio vengono aperti automaticamente il nodo vocale, il nodo di controllo RViz e l'interfaccia di visualizzazione RViz.

**Metodo 2: avvio passo passo (3 terminali)**

**Terminale 1**: avvio di roscore

```Bash
roscore
```

**Terminale 2**: nodo vocale

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice voice_node.py
```

All'avvio viene visualizzata la modalità di cablaggio rilevata:

```Bash
[INFO] 自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
[INFO] 语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

oppure

```Bash
[INFO] 自动检测: UART /dev/ttyUSB0
[INFO] 语音节点启动完成 - UART /dev/ttyUSB0
```

Se non viene rilevato alcun dispositivo:

```Bash
[FATAL] 未检测到AI语音交互模块！请检查接线 (Type-C / UART / IIC)
[FATAL] 支持的端口: I2C(/dev/i2c-1) | 串口(/dev/ttyUSB0 /dev/ttyACM0 /dev/ttyAMA0 /dev/ttyS0)
```

**Terminale 3**: nodo di controllo RViz

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice rviz_control.py
```

**Terminale 4**: visualizzazione RViz (carica direttamente il file preconfigurato, senza necessità di impostazioni manuali)

```Bash
rviz -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

Oppure aprire prima RViz e poi caricare:

```Bash
rviz
# Barra dei menu: File → Open Config → seleziona juxi_voice.rviz
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
# Riproduzione passiva (I2C → scrivi 0xD1, seriale → invia FE EF FF XX EE)
rostopic pub /juxi_passive_play std_msgs/String "data: '这是红色'"
# Riproduzione della voce funzionale (I2C → scrivi 0xD2, seriale → invia FE EF 01 00 EE)
rostopic pub /juxi_func_play std_msgs/String "data: '欢迎语'"
# Riproduzione della parola di comando (I2C → scrivi 0xD3, seriale → invia FE EF 00 04 EE)
rostopic pub /juxi_cmd_play std_msgs/String "data: '小车前进'"
```

---

## 10、Tabella di riferimento degli ID delle parole di comando

> 114 parole di comando in totale, completamente coerenti con `命令词播报词协议列表V1_中文.xlsx`.
> 
> 

### Parole di funzione (ID 1-10)

### Parole di comando (ID 11-83, 113)

### Parole di riproduzione passiva (ID 84-112, 114)

---

## 11、Descrizione dei topic ROS1

---

## 12、Risoluzione dei problemi

**1. All'avvio viene segnalato "modulo di interazione vocale AI non rilevato"**

Verificare se il file di dispositivo corrispondente alla modalità di cablaggio esiste:

```Bash
# Collegamento I2C
ls /dev/i2c-1
sudo i2cdetect -y 1   # Dovresti vedere 0x2A

# Collegamento Type-C
ls /dev/ttyUSB0 /dev/ttyACM0

# Collegamento UART
ls /dev/ttyAMA0 /dev/ttyS0
```

**2. Errore di autorizzazione della porta seriale**

```Bash
sudo chmod 666 /dev/ttyUSB0   # Oppure /dev/ttyACM0 ecc.
# Oppure aggiungiti al gruppo dialout (richiede un nuovo login)
sudo usermod -aG dialout $USER
```

**3. Errore di autorizzazione I2C**

```Bash
sudo chmod 666 /dev/i2c-1
# Oppure aggiungiti al gruppo i2c (richiede un nuovo login)
sudo usermod -aG i2c $USER
```

**4. Nessun cubo in RViz**

- Verificare se Fixed Frame è `map`

- Verificare se il Topic è `/juxi_visual_marker`

- Confermare che il nodo rviz_control.py sia stato avviato

**5. Nessuna risposta ai comandi dopo l'attivazione**

```Bash
rostopic echo /juxi_voice_cmd
```

Dati presenti → problema di configurazione di RViz; nessun dato → problema di cablaggio/comunicazione.

**6. rosrun non trova il nodo**

Confermare che la compilazione e il source siano già stati eseguiti:

```Bash
cd ~/juxi_speech_ws
catkin_make
source devel/setup.bash
```

**7. Errore di sintassi segnalato**

```Bash
# Verifica che lo script Python abbia il permesso di esecuzione
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py
```

<RelatedProducts slugs="ai-voice-module" />
