---
title: Tutorial di introduzione a ROS
description: Tutorial ROS Juxi Technology — installazione ROS 2 Humble, basi di topic/servizi/launch
keywords: [ros, ros2, introduzione, robotica]
---

# Tutorial di introduzione a ROS

> Per sviluppatori alle prime armi con ROS. Basato su Ubuntu 22.04 + ROS 2 Humble, con esempi pratici che utilizzano il modulo IMU e il braccio SO-ARM101 di Juxi Technology.

## 1. Cos'è ROS?

ROS (Robot Operating System) è il middleware standard de facto della robotica:

- **Topic**: comunicazione publish/subscribe punto a punto (ad es. i flussi di dati dell'IMU)
- **Servizi**: richiesta/risposta (ad es. attivare un'azione)
- **Launch**: avvio multi-nodo con un solo comando

ROS 2 (Humble) è la versione mainstream attuale, con miglioramenti in tempo reale, multi-macchina e sicurezza.

## 2. Preparazione dell'ambiente

### Ubuntu 22.04 + ROS 2 Humble

```bash
# Aggiungere il repository ROS 2
sudo apt update && sudo apt install -y curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key \
  -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | \
  sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Installazione
sudo apt update
sudo apt install -y ros-humble-desktop

# Attivare l'ambiente (in ogni nuovo terminale, o aggiungere a ~/.bashrc)
source /opt/ros/humble/setup.bash
```

### Verifica dell'installazione

```bash
# Terminale 1
ros2 run demo_nodes_cpp talker

# Terminale 2
ros2 run demo_nodes_py listener
```

Se vedi `Hello World: N` in loop, l'installazione è riuscita.

## 3. Concetti fondamentali

| Concetto | Descrizione | Esempio |
|---------|-------------|---------|
| **Node** | Processo indipendente | Nodo IMU, nodo braccio robotico |
| **Topic** | Flusso di dati publish/subscribe | Assetto su `/imu/data` |
| **Message** | Tipo di dati di un topic | `sensor_msgs/Imu` |
| **Service** | Richiesta/risposta | Attivare il reset dei servo |
| **Launch file** | Orchestrazione dell'avvio multi-nodo | `imu_launch.py` |

## 4. Pratica con i prodotti Juxi

### Modulo IMU (ROS 2)

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build
source install/setup.bash
ros2 launch icm42670p imu_launch.py

# Visualizzare i dati
ros2 topic echo /imu/data
```

- [Tutorial IMU ROS2](/it/tutorials/sensors/imu/ros-examples/ros2)
- [Tutorial IMU ROS1](/it/tutorials/sensors/imu/ros-examples/ros1)

### Modulo KWS (RViz2)

- [Visualizzazione ROS2-rviz2 del modulo KWS](/it/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 5. Riferimento rapido dei comandi

```bash
ros2 node list                 # Elenca i nodi
ros2 topic list                # Elenca i topic
ros2 topic echo /topic         # Visualizza i dati di un topic
ros2 service list              # Elenca i servizi
ros2 launch pkg file.launch.py # Avvio
```

## FAQ

**D: `source /opt/ros/humble/setup.bash` dà errori?**

**R:** Verifica la versione installata e il percorso; su Jetson, se usi conda, attivala prima.

**D: Errori di permessi sulla porta?**

**R:** `sudo chmod 666 /dev/ttyACM*`.

**D: Usi Jetson?**

**R:** Controlla la compatibilità di PyTorch — vedi [Compatibilità PyTorch su Jetson Orin](/it/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

---

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Segnala problemi](https://github.com/Juxi-Technology/wiki-documents/issues)
