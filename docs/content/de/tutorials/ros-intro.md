---
title: ROS-Einführung
description: "Juxi Technology ROS-Tutorial — ROS 1/ROS 2 Umgebungseinrichtung, Topics/Services/Launch-Grundlagen, Praxis mit IMU & SO-ARM101"
keywords: [ros, ros2, ros1, tutorial, robot operating system]
---

# ROS-Einführung

> Für Entwickler, die neu in ROS sind. Basis: Ubuntu 22.04 + ROS 2 Humble, mit Praxisbeispielen zum Juxi-Technology-IMU-Modul und SO-ARM101-Arm.

## 1. Was ist ROS?

ROS (Robot Operating System) ist der De-facto-Middleware-Standard für Robotik:

- **Topics**: Publish/Subscribe, Punkt-zu-Punkt-Kommunikation (z. B. IMU-Datenströme)
- **Services**: Request/Response (z. B. eine Aktion auslösen)
- **Launch**: mehrere Nodes mit einem Befehl starten

ROS 2 (Humble) ist die aktuelle Mainstream-Version mit Verbesserungen bei Echtzeit, Multi-Machine-Betrieb und Sicherheit.

## 2. Umgebung einrichten

### Ubuntu 22.04 + ROS 2 Humble

```bash
# ROS-2-Repository hinzufügen
sudo apt update && sudo apt install -y curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key \
  -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | \
  sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Installation
sudo apt update
sudo apt install -y ros-humble-desktop

# Umgebung laden (in jedem neuen Terminal oder in ~/.bashrc eintragen)
source /opt/ros/humble/setup.bash
```

### Installation verifizieren

```bash
# Terminal 1
ros2 run demo_nodes_cpp talker

# Terminal 2
ros2 run demo_nodes_py listener
```

Wenn `Hello World: N` in Schleife erscheint, war die Installation erfolgreich.

## 3. Grundkonzepte

| Konzept | Beschreibung | Beispiel |
|---------|-------------|---------|
| **Node** | Eigenständiger Prozess | IMU-Node, Roboterarm-Node |
| **Topic** | Publish/Subscribe-Datenstrom | `/imu/data` Lage |
| **Message** | Datentyp eines Topics | `sensor_msgs/Imu` |
| **Service** | Request/Response | Servo-Reset auslösen |
| **Launch-Datei** | Orchestrierung mehrerer Nodes | `imu_launch.py` |

## 4. Praxis mit Juxi-Produkten

### IMU-Modul (ROS 2)

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build
source install/setup.bash

ros2 launch icm42670p imu_launch.py

# Daten anzeigen
ros2 topic echo /imu/data
```

- [IMU-ROS2-Tutorial](/de/tutorials/sensors/imu/ros-examples/ros2)
- [IMU-ROS1-Tutorial](/de/tutorials/sensors/imu/ros-examples/ros1)

### KWS-Modul (RViz2)

- [KWS-ROS2-RViz2-Visualisierung](/de/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 5. Befehls-Übersicht

```bash
ros2 node list                 # Nodes auflisten
ros2 topic list                # Topics auflisten
ros2 topic echo /topic         # Topic-Daten anzeigen
ros2 service list              # Services auflisten
ros2 launch pkg file.launch.py # Starten
```

## FAQ

**Q: `source /opt/ros/humble/setup.bash` meldet Fehler?**

**A:** Installierte Version und Pfad prüfen; auf dem Jetson zuerst conda aktivieren, falls verwendet.

**Q: Port-Berechtigungsfehler?**

**A:** `sudo chmod 666 /dev/ttyACM*`.

**Q: Jetson im Einsatz?**

**A:** Auf PyTorch-Kompatibilität achten — siehe [Jetson-PyTorch-Kompatibilität](/de/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

---

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Probleme melden](https://github.com/Juxi-Technology/wiki-documents/issues)
