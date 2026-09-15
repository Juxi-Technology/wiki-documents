---
title: "Introduction à ROS"
description: Tutoriel ROS Juxi Technology — installation ROS 2 Humble, bases topics/services/launch
keywords: [ros, ros2, introduction, robotique]
---

# Introduction à ROS

> Pour les développeurs débutants avec ROS. Basé sur Ubuntu 22.04 + ROS 2 Humble, avec des exemples pratiques utilisant le module IMU et le bras SO-ARM101 de Juxi Technology.

## 1. Qu'est-ce que ROS ?

ROS (Robot Operating System) est le standard de facto du middleware en robotique :

- **Topics** : communication publish/subscribe, communication point à point (p. ex. flux de données IMU)
- **Services** : requête/réponse (p. ex. déclencher une action)
- **Launch** : démarrage multi-nœuds en une seule commande

ROS 2 (Humble) est la version actuelle la plus répandue, avec des améliorations en temps réel, multi-machine et de sécurité.

## 2. Mise en place de l'environnement

### Ubuntu 22.04 + ROS 2 Humble

```bash
# Ajout du dépôt ROS 2
sudo apt update && sudo apt install -y curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key \
  -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | \
  sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Installation
sudo apt update
sudo apt install -y ros-humble-desktop

# Source de l'environnement (chaque nouveau terminal, ou ajout à ~/.bashrc)
source /opt/ros/humble/setup.bash
```

### Vérifier l'installation

```bash
# Terminal 1
ros2 run demo_nodes_cpp talker

# Terminal 2
ros2 run demo_nodes_py listener
```

Si `Hello World: N` s'affiche en boucle, l'installation est réussie.

## 3. Concepts fondamentaux

| Concept | Description | Exemple |
|---------|-------------|---------|
| **Nœud** | Processus indépendant | Nœud IMU, nœud bras robotique |
| **Topic** | Flux de données publish/subscribe | Attitude `/imu/data` |
| **Message** | Type de données d'un topic | `sensor_msgs/Imu` |
| **Service** | Requête/réponse | Déclencher la réinitialisation d'un servomoteur |
| **Fichier launch** | Orchestration du démarrage multi-nœuds | `imu_launch.py` |

## 4. Pratique avec les produits Juxi

### Module IMU (ROS 2)

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build
source install/setup.bash

ros2 launch icm42670p imu_launch.py

# Afficher les données
ros2 topic echo /imu/data
```

- [Tutoriel IMU ROS2](/fr/tutorials/sensors/imu/ros-examples/ros2)
- [Tutoriel IMU ROS1](/fr/tutorials/sensors/imu/ros-examples/ros1)

### Module KWS (RViz2)

- [Visualisation KWS ROS2 RViz2](/fr/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 5. Aide-mémoire des commandes

```bash
ros2 node list                 # Lister les nœuds
ros2 topic list                # Lister les topics
ros2 topic echo /topic         # Afficher les données d'un topic
ros2 service list              # Lister les services
ros2 launch pkg file.launch.py # Lancer
```

## FAQ

**Q : `source /opt/ros/humble/setup.bash` renvoie une erreur ?**

**R :** Vérifiez la version installée et le chemin ; sur Jetson, activez d'abord conda si vous l'utilisez.

**Q : Erreurs de permissions sur le port ?**

**R :** `sudo chmod 666 /dev/ttyACM*`.

**Q : Vous utilisez un Jetson ?**

**R :** Surveillez la compatibilité PyTorch — voir [Compatibilité PyTorch Jetson](/fr/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

---

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site web : [www.juxitech.com](https://www.juxitech.com)
- 💬 [Signaler un problème](https://github.com/Juxi-Technology/wiki-documents/issues)
