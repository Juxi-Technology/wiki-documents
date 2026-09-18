---
title: "Simulation et contrôle ROS2"
description: "Prenez en main le paquet ROS2 du SO-ARM101 : visualisation RViz, contrôleurs, planification de mouvements MoveIt, simulation Gazebo et matériel réel."
---

# Simulation et contrôle ROS2

[SO-ARM101_ROS2.zip](/downloads/SO-ARM101_ROS2.zip)

Espace de travail ROS 2 complet pour le bras robotisé à six degrés de liberté SO-ARM101, couvrant la description du robot, le pilote matériel intégré, la simulation Gazebo et la planification de mouvements MoveIt 2.

Le SO-ARM101 est un bras esclave open source de deuxième génération, conçu conjointement par [TheRobotStudio](https://www.therobotstudio.com/) et la communauté [LeRobot](https://huggingface.co/lerobot) ; il utilise six servomoteurs STS3215, une carte de commande de servomoteurs et des pièces imprimées en 3D en PLA+.

**Remarque : ****le bras robotisé doit être calibré au point milieu ; effectuez la calibration du point milieu lorsque toutes les articulations se trouvent au milieu de leur plage de rotation**

## Structure des paquets

Plateforme cible : **ROS 2 Humble / Jazzy**.

---

## Préparation de l'environnement ROS2

Avant de compiler ce projet, assurez-vous que ROS 2 et les composants associés sont installés sur le système.

### Configuration système requise

- Ubuntu 22.04 (recommandé) ou 24.04

- Au moins 4 GB de mémoire

- Un port série USB est nécessaire pour le mode matériel réel

### 0.1  Installer ROS 2 Humble

```Bash
# Définir la locale
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# Ajouter le dépôt logiciel ROS 2
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Installer ROS 2 Humble Desktop
sudo apt update
sudo apt install ros-humble-desktop
```

### 0.2  Installer les outils de compilation et les dépendances

```Bash
# Outil de compilation colcon
sudo apt install python3-colcon-common-extensions

# MoveIt 2
sudo apt install ros-humble-moveit

# ros2_control
sudo apt install ros-humble-ros2-control \
                 ros-humble-ros2-controllers \
                 ros-humble-controller-manager \
                 ros-humble-joint-state-publisher-gui
```

### 0.3  Définir les variables d'environnement

```Bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### 0.4  Définir les permissions du port série (requis pour le matériel réel)

**Réglage permanent (recommandé)** :

```Bash
sudo usermod -a -G dialout $USER
# Prend effet après déconnexion et reconnexion
```

**Réglage temporaire (à réexécuter après chaque redémarrage)** :

```Bash
sudo chmod 666 /dev/ttyACM0
```

## Installer l'environnement de l'espace de travail

```Markdown
# Étape 1  Créer l'espace de travail
mkdir -p ~/so101_ws/src
cd ~/so101_ws/src

# Étape 2  Y placer le code source
cp -r /path/to/SO-ARM101_ROS2 ./

# Étape 3  Installer les dépendances système
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y

# Étape 4  Compiler tous les paquets
colcon build --symlink-install

# Étape 5  Charger l'environnement  ← à exécuter dans chaque nouveau terminal
source install/setup.bash
```

**Remarque sur le matériel réel** — le paquet `so_arm_hardware` est déjà intégré. Aucun pilote supplémentaire n'est nécessaire ;
il communique directement avec les servomoteurs STS3215 via le port série à l'aide du protocole SCS.

## Vérification de la visualisation

Commencez par ici, c'est le plus simple — aucun contrôleur ni matériel n'est nécessaire.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description view_description.launch.py rviz:=true
```

RViz affiche le modèle complet du robot ; faites glisser les curseurs pour vérifier que le mouvement de chaque articulation est correct.

---

## Test des contrôleurs (matériel virtuel / mode Mock)

Aucun robot réel n'est encore nécessaire ; tout s'exécute en mémoire.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py
```

Attendez l'apparition des journaux suivants, signe que tout est prêt :

```Bash
joint_state_broadcaster      → active
joint_trajectory_controller  → active
```

**Remarque** : le mode simulation ne démarre que deux contrôleurs (`joint_state_broadcaster` et
`joint_trajectory_controller`). Le `gripper_controller` a été supprimé ; la pince
est désormais commandée par `joint_trajectory_controller`, qui contrôle uniformément les 6 articulations.

### Rôles des contrôleurs

## Planification de mouvements MoveIt (matériel Mock)

**Un seul terminal suffit** — MoveIt démarre automatiquement la pile de contrôleurs en interne.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py
```

Une fois la fenêtre RViz ouverte :

1. Dans le panneau **MotionPlanning**, **Planning Group → manipulator**

2. **Start State → ****`<current>`**, **Goal State → extended**

3. Cliquez successivement sur **Plan** puis **Execute**

Positions prédéfinies disponibles : `open`, `zero`, `extended`, `rest`.

### 4.1  Détail de l'interface MoveIt

Au démarrage de RViz, le panneau **MotionPlanning** s'affiche à gauche ; il contient les principaux onglets suivants :

#### Onglet Planning

#### Paramètres de planification

> **Conseil pour le premier test** : réglez Velocity et Acceleration sur 0.3 afin de réduire la vitesse de mouvement et garantir la sécurité.
> 
> 

#### Onglet Scene Objects

- Ajouter des obstacles (Box / Sphere / Cylinder) pour la détection de collisions

- Importer / exporter une scène

- MoveIt planifie automatiquement en évitant les obstacles

#### Onglet Stored States

- Enregistrer les positions fréquemment utilisées du bras robotisé

- Positions par défaut : `open`, `zero`, `extended`, `rest`

### 4.2  Flux d'opérations de base

#### Méthode A : glisser-déposer interactif (recommandé)

1. Dans la vue 3D, repérez le **marqueur interactif** à l'extrémité du bras robotisé (flèches et anneaux colorés)

2. Faites glisser les flèches pour translater la position de l'extrémité, et les anneaux pour faire pivoter l'orientation

3. Le système résout automatiquement la cinématique inverse (IK) et met à jour les angles articulaires en temps réel

4. Cliquez sur **Plan** pour visualiser la trajectoire planifiée (en orange)

5. Après vérification, cliquez sur **Execute** pour exécuter

> Si le glisser-déposer saccade, il est conseillé de partir d'abord de la position prédéfinie `rest` avant de déplacer.
> 
> 

#### Méthode B : positions prédéfinies

1. Menu déroulant **Query Goal State** → sélectionnez `open` / `extended` / `rest`, etc.

2. Cliquez sur **Update**

3. Cliquez sur **Plan**

4. Cliquez sur **Execute**

#### Méthode C : réglage manuel des angles articulaires

1. **Query Goal State** → onglet **Joints**

2. Faites glisser les curseurs de chaque articulation pour définir l'angle cible

3. Référence des plages articulaires :

1. Cliquez sur **Update**

2. Cliquez sur **Plan**

3. Cliquez sur **Execute**

#### Méthode D : cible aléatoire valide

Cliquez sur le bouton **Random Valid** pour générer automatiquement une position aléatoire atteignable, puis Plan → Execute.

### 4.3  Consignes de sécurité

1. **Réduire la vitesse lors de la première utilisation** : réglez Velocity / Acceleration sur 0.1–0.3

2. **Arrêt d'urgence** : appuyez à tout moment sur Ctrl+C pour interrompre le programme, ou coupez l'alimentation

3. **Limites articulaires** : MoveIt ne planifie pas au-delà des plages définies dans `joint_limits.yaml`, mais assurez-vous que la configuration est correcte

4. **Matériel réel** : avant l'exécution, assurez-vous qu'il y a suffisamment d'espace autour du bras robotisé

### Aperçu de la configuration MoveIt

---

## Simulation Gazebo

La simulation Gazebo nécessite **l'exécution simultanée de 4 terminaux**. Suivez strictement l'ordre indiqué.

### 5.1  Démarrer la simulation Gazebo  (terminal 1)

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py
```

Attendez l'apparition de la fenêtre Gazebo ; le robot reste brièvement en l'air puis retombe au sol.

### 5.2  Charger le contrôleur de trajectoire  (terminal 2)

Gazebo n'active par défaut que `forward_position_controller` ; il faut basculer manuellement vers
`joint_trajectory_controller` :

```Markdown
#  Terminal 2
source ~/so101_ws/install/setup.bash

# Étape A — désactiver forward_position_controller
ros2 control set_controller_state forward_position_controller inactive

# Étape B — charger et activer joint_trajectory_controller avec spawner
ros2 run controller_manager spawner joint_trajectory_controller

# Étape C — vérifier
ros2 control list_controllers
```

Sortie attendue :

```Bash
forward_position_controller  inactive
joint_state_broadcaster      active
joint_trajectory_controller  active
```

⚠️ N'utilisez pas d'abord `ros2 control load_controller` ! Cela placerait le contrôleur dans l'état
`unconfigured`, empêchant le spawner de l'activer. Si vous l'avez déjà exécuté, exécutez d'abord
`unload_controller` pour recommencer.

### 5.3  Démarrer move_group  (terminal 3)

```Bash
#  Terminal 3
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py use_sim_time:=True
```

### 5.4  Démarrer RViz  (terminal 4)

```Bash
#  Terminal 4
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

Une fois RViz prêt :

1. **Planning Group → manipulator**

2. **Goal State → open** (ou `extended`, `rest`)

3. Cliquez successivement sur **Plan** puis **Execute**

Les articulations du bras dans Gazebo suivent le mouvement.

**Remarque** : en raison de la limitation du gain PID de la version Humble de `gz_ros2_control`,
la pince peut ne pas s'ouvrir physiquement dans Gazebo (le journal d'exécution indique néanmoins un succès).
Le mode Mock et le matériel réel ne présentent pas ce problème.

### 5.5  Mode sans interface (sans GUI)

```Bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py \
  gazebo_gui:=false \
  launch_rviz:=false
```

### 5.6  Dépannage : en cas d'échec de chargement répété

Si le spawner signale en permanence `Failed to activate controller`, exécutez les étapes suivantes pour réinitialiser complètement :

```Bash
# 1. Décharger le contrôleur bloqué
ros2 control unload_controller joint_trajectory_controller

# 2. Désactiver forward_position_controller
ros2 control set_controller_state forward_position_controller inactive

# 3. Relancer le spawn
ros2 run controller_manager spawner joint_trajectory_controller
```

## Matériel réel

Prérequis : le bras robotisé SO-ARM101 est assemblé et la carte de commande des servomoteurs est connectée à l'ordinateur via USB.

### 6.1  Démarrer les contrôleurs (facultatif)

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

Le plugin `so_arm_hardware` effectue automatiquement :

1. Ouvrir le port série

2. Scanner les ID des 6 servomoteurs (1–6)

3. Vérifier que chaque servomoteur répond

4. Activer le couple et lire la position actuelle

Une fois les contrôleurs prêts, ouvrez deux autres terminaux pour démarrer MoveIt :

```Bash
#  Terminal 2 — move_group
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py
```

```Bash
#  Terminal 3 — RViz
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

### 6.2  MoveIt (démarrage en un clic)

> La commande suivante **remplace** 6.1 (ne les exécutez pas simultanément ; arrêtez les commandes de 6.1) — `demo.launch.py` inclut déjà la pile de contrôleurs en interne.
> 
> 

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

### 6.3  Dépannage du port série

### 6.4  L'affichage RViz ne correspond pas à la position réelle

Si la position du bras robotisé dans RViz ne correspond pas au matériel réel (par exemple décalage des articulations, fausse détection de collision) :

1. Vérifiez que la calibration du point milieu des servomoteurs a été effectuée

2. Ajustez le `position_offset` de chaque articulation dans `so_arm101.ros2_control.xacro`

3. Formule de conversion : `nouvel offset = offset actuel + (rad affiché actuellement / 0.00153398)`

4. Après modification, recompilez le paquet `so_arm101_description`

---

## Questions fréquentes

### Q1 : erreur "package not found" lors de la compilation

**R** : assurez-vous que toutes les dépendances système sont correctement installées et que l'environnement ROS 2 a été sourcé :

```Bash
source /opt/ros/humble/setup.bash
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
```

### Q2 : message "Permission denied" lors de l'accès au port série au démarrage

**R** : vérifiez les permissions du port série :

```Bash
# Solution temporaire
sudo chmod 666 /dev/ttyACM0

# Solution permanente (prend effet après déconnexion)
sudo usermod -a -G dialout $USER
```

### Q3 : échec de la planification MoveIt avec le message "Motion planning start tree could not be initialized"

**R** : il y a généralement deux causes :

1. **Articulation hors limite** — vérifiez la sortie de `FixStartStateBounds` dans le journal. La tolérance actuelle est de
0.3 rad ; si le dépassement reste dans cette plage, la validation passe. Sinon, ajustez `start_state_max_bounds_error`
ou vérifiez le décalage des servomoteurs.

2. **Collision à l'état initial** — vérifiez la sortie de `FixStartStateCollision` dans le journal. Si
"Unable to find a valid state nearby" apparaît, cela signifie que la position actuelle présente une auto-collision.
Le bras robotisé est peut-être dans une position repliée (par exemple la pince touche l'épaule), ou le décalage est incorrect.
Ajustez `position_offset` puis réessayez.

### Q4 : le bras robotisé ne bouge pas après Execute

**R** : vérifiez l'état des contrôleurs :

```Bash
ros2 control list_controllers
```

Assurez-vous que `joint_trajectory_controller` est à l'état `active`. Sinon, relancez le spawn :

```Bash
ros2 run controller_manager spawner joint_trajectory_controller
```

### Q5 : RViz démarre lentement ou se bloque

**R** : c'est normal. Au démarrage, MoveIt charge le modèle URDF, le plugin de détection de collisions,
les solveurs cinématiques, etc. ; le premier démarrage prend environ 10 secondes.

### Q6 : la trajectoire planifiée n'est pas fluide ou présente des secousses

**R** : essayez les méthodes suivantes :

- Passez à un autre planificateur (sélectionnez `RRTConnect` dans le menu déroulant Planner de RViz)

- Augmentez Planning Time à 10 secondes

- Vérifiez que la cible se trouve dans l'espace de travail (testez avec `Random Valid`)

### Q7 : la pince ne bouge pas dans Gazebo

**R** : il s'agit d'une limitation de gain PID codée en dur dans la version Humble de `gz_ros2_control`
(fixé à 0.1), impossible à remplacer via un paramètre URDF. Le journal indique un succès pour Execute,
mais la pince ne s'ouvre pas dans la simulation physique Gazebo. Le mode Mock et le matériel réel ne présentent pas ce problème.

## Annexe : aide-mémoire des paramètres de lancement

### `controllers_bringup.launch.py`

### `so_arm_gz_bringup.launch.py`

---

## Arborescence des répertoires

```Bash
SO-ARM101_ROS2/
├── so_arm_utils/                   # Python 工具库
├── so_arm101_description/          # URDF · 控制器 · 网格 · RViz · MuJoCo
├── so_arm101_moveit_config/        # MoveIt 2 SRDF · 规划器 · 启动文件
├── so_arm_gz/                      # Gazebo 仿真启动
├── so_arm_hardware/                # 内置 SCS 串口驱动（C++）
└── Simulation/                     # 原始 CAD URDF（参考保留）
```

<RelatedProducts slugs="so-arm101" />
