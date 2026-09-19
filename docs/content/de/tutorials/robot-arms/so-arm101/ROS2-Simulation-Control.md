---
title: "ROS2-Simulationssteuerung"
description: "Ein vollständiger ROS-2-Arbeitsbereich für den SO-ARM101 mit Roboterbeschreibung, Hardware-Treiber, Gazebo-Simulation und MoveIt-2-Bahnplanung."
---

# ROS2-Simulationssteuerung

[SO-ARM101_ROS2.zip](/downloads/SO-ARM101_ROS2.zip)

Ein vollständiger ROS 2-Arbeitsbereich für den 6-DOF-Roboterarm SO-ARM101, der Roboterbeschreibung, integrierten Hardware-Treiber, Gazebo-Simulation und MoveIt 2-Bewegungsplanung abdeckt.

SO-ARM101 ist der in Zusammenarbeit von [TheRobotStudio](https://www.therobotstudio.com/) mit der [LeRobot](https://huggingface.co/lerobot)-Community entwickelte Open-Source-Follower-Arm der zweiten Generation, der sechs STS3215-Servos, eine Servo-Treiberplatine und 3D-gedruckte PLA+-Teile verwendet.

**Hinweis: ****Der Roboterarm muss in der Mittelstellung kalibriert werden; führen Sie die Mittelstellungskalibrierung durch, wenn sich alle Gelenke in der mittleren Position ihres Drehbereichs befinden**

## Paketstruktur

Zielplattform: **ROS 2 Humble / Jazzy**.

---

## Vorbereitung der ROS2-Umgebung

Bevor Sie dieses Projekt kompilieren, stellen Sie sicher, dass ROS 2 und die zugehörigen Komponenten auf dem System installiert sind.

### Systemanforderungen

- Ubuntu 22.04 (empfohlen) oder 24.04

- Mindestens 4 GB Arbeitsspeicher

- Der Modus für reale Hardware erfordert einen USB-Seriell-Port

### 0.1  Installation von ROS 2 Humble

```Bash
# Locale einstellen
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# ROS 2-Softwarequelle hinzufügen
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# ROS 2 Humble Desktop installieren
sudo apt update
sudo apt install ros-humble-desktop
```

### 0.2  Installation der Build-Tools und Abhängigkeiten

```Bash
# colcon-Build-Tool
sudo apt install python3-colcon-common-extensions

# MoveIt 2
sudo apt install ros-humble-moveit

# ros2_control
sudo apt install ros-humble-ros2-control \
                 ros-humble-ros2-controllers \
                 ros-humble-controller-manager \
                 ros-humble-joint-state-publisher-gui
```

### 0.3  Umgebungsvariablen festlegen

```Bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### 0.4  Serielle Portberechtigungen festlegen (für reale Hardware erforderlich)

**Dauerhafte Einstellung (empfohlen)**:

```Bash
sudo usermod -a -G dialout $USER
# Wirkt nach dem Abmelden und erneuten Anmelden
```

**Temporäre Einstellung (muss nach jedem Neustart erneut ausgeführt werden)**:

```Bash
sudo chmod 666 /dev/ttyACM0
```

## Installation der Arbeitsbereichsumgebung

```Markdown
# Schritt 1  Arbeitsbereich erstellen
mkdir -p ~/so101_ws/src
cd ~/so101_ws/src

# Schritt 2  Quellcode hineinkopieren
cp -r /path/to/SO-ARM101_ROS2 ./

# Schritt 3  Systemabhängigkeiten installieren
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y

# Schritt 4  Alle Pakete kompilieren
colcon build --symlink-install

# Schritt 5  Umgebung laden  ← in jedem neuen Terminal ausführen
source install/setup.bash
```

**Hinweis zur realen Hardware** — Das Paket `so_arm_hardware` ist bereits integriert. Es sind keine zusätzlichen Treiber zu installieren;
es kommuniziert über den seriellen Port unter Verwendung des SCS-Protokolls direkt mit den STS3215-Servos.

## Visualisierungsüberprüfung

Beginnen Sie hier – das ist am einfachsten: kein Controller, keine Hardware erforderlich.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description view_description.launch.py rviz:=true
```

RViz zeigt das vollständige Robotermodell; ziehen Sie die Schieberegler, um zu überprüfen, ob die Bewegung der einzelnen Gelenke korrekt ist.

---

## Controller-Test (virtuelle Hardware / Mock-Modus)

Ein realer Roboter ist weiterhin nicht erforderlich; alles läuft im Speicher.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py
```

Wenn die folgenden Logs erscheinen, ist alles bereit:

```Bash
joint_state_broadcaster      → active
joint_trajectory_controller  → active
```

**Hinweis**: Der Simulationsmodus startet nur zwei Controller (`joint_state_broadcaster` und
`joint_trajectory_controller`). Der `gripper_controller` wurde entfernt; der Greifer
wird von `joint_trajectory_controller` einheitlich gesteuert, der alle 6 Gelenke kontrolliert.

### Zuständigkeiten der Controller

## MoveIt-Bewegungsplanung (Mock-Hardware)

**Nur ein Terminal erforderlich** — MoveIt startet den Controller-Stack intern automatisch.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py
```

Nachdem das RViz-Fenster geöffnet wurde:

1. Wählen Sie im **MotionPlanning**-Panel **Planning Group → manipulator**

2. **Start State → ****`<current>`**, **Goal State → extended**

3. Klicken Sie nacheinander auf **Plan** und **Execute**

Verfügbare vordefinierte Posen: `open`, `zero`, `extended`, `rest`.

### 4.1  Details zur MoveIt-Oberfläche

Nach dem Start von RViz wird links das **MotionPlanning**-Panel angezeigt, das die folgenden Hauptregisterkarten enthält:

#### Registerkarte Planning

#### Planungsparameter

> **Empfehlung für den ersten Test**: Stellen Sie Velocity und Acceleration auf 0.3 ein, um die Bewegungsgeschwindigkeit zu reduzieren und die Sicherheit zu gewährleisten.
> 
> 

#### Registerkarte Scene Objects

- Hindernisse hinzufügen (Box / Sphere / Cylinder) für die Kollisionserkennung

- Szene importieren / exportieren

- MoveIt plant automatisch unter Umgehung der Hindernisse

#### Registerkarte Stored States

- Häufig verwendete Roboterarm-Posen speichern

- Standardposen: `open`, `zero`, `extended`, `rest`

### 4.2  Grundlegender Arbeitsablauf

#### Variante A: Interaktives Ziehen (empfohlen)

1. Suchen Sie in der 3D-Ansicht den **interaktiven Marker** am Ende des Roboterarms (farbige Pfeile und Ringe)

2. Ziehen Sie die Pfeile, um die Position des Endes zu verschieben, und die Ringe, um die Ausrichtung zu drehen

3. Das System löst automatisch die IK und aktualisiert die Gelenkwinkel in Echtzeit

4. Klicken Sie auf **Plan**, um die geplante Trajektorie anzuzeigen (orange)

5. Klicken Sie nach der Bestätigung auf **Execute**, um auszuführen

> Wenn das Ziehen ruckelt, wird empfohlen, zunächst von der vordefinierten Pose `rest` auszugehen und dann zu ziehen.
> 
> 

#### Variante B: Vordefinierte Posen

1. Dropdown-Menü **Query Goal State** → wählen Sie `open` / `extended` / `rest` usw.

2. Klicken Sie auf **Update**

3. Klicken Sie auf **Plan**

4. Klicken Sie auf **Execute**

#### Variante C: Gelenkwinkel manuell einstellen

1. **Query Goal State** → Registerkarte **Joints**

2. Ziehen Sie die Schieberegler der einzelnen Gelenke, um die Zielwinkel einzustellen

3. Referenz der Gelenkbereiche:

1. Klicken Sie auf **Update**

2. Klicken Sie auf **Plan**

3. Klicken Sie auf **Execute**

#### Variante D: Zufälliges gültiges Ziel

Klicken Sie auf die Schaltfläche **Random Valid**, um automatisch eine erreichbare zufällige Pose zu erzeugen, und dann Plan → Execute.

### 4.3  Sicherheitshinweise

1. **Geschwindigkeit beim ersten Gebrauch reduzieren**: Stellen Sie Velocity / Acceleration auf 0.1–0.3 ein

2. **Not-Aus**: Beenden Sie das Programm jederzeit mit Ctrl+C oder trennen Sie die Stromversorgung

3. **Gelenkgrenzen**: MoveIt plant nicht über den in `joint_limits.yaml` festgelegten Bereich hinaus, aber stellen Sie sicher, dass die Konfiguration korrekt ist

4. **Reale Hardware**: Stellen Sie vor der Ausführung sicher, dass um den Roboterarm herum ausreichend Platz ist

### Übersicht der MoveIt-Konfiguration

---

## Gazebo-Simulation

Die Gazebo-Simulation erfordert **4 gleichzeitig laufende Terminals**. Führen Sie die Schritte strikt in der angegebenen Reihenfolge aus.

### 5.1  Gazebo-Simulation starten  (Terminal 1)

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py
```

Warten Sie, bis das Gazebo-Fenster erscheint; der Roboter bleibt kurz in der Luft und landet dann.

### 5.2  Trajektorien-Controller laden  (Terminal 2)

Gazebo aktiviert standardmäßig nur `forward_position_controller`; Sie müssen manuell zu
`joint_trajectory_controller` wechseln:

```Markdown
#  Terminal 2
source ~/so101_ws/install/setup.bash

# Schritt A — forward_position_controller ausschalten
ros2 control set_controller_state forward_position_controller inactive

# Schritt B — joint_trajectory_controller mit spawner laden und aktivieren
ros2 run controller_manager spawner joint_trajectory_controller

# Schritt C — überprüfen
ros2 control list_controllers
```

Erwartete Ausgabe:

```Bash
forward_position_controller  inactive
joint_state_broadcaster      active
joint_trajectory_controller  active
```

⚠️ Verwenden Sie nicht zuerst `ros2 control load_controller`! Es versetzt den Controller in den
`unconfigured`-Zustand, wodurch der spawner ihn nicht aktivieren kann. Wenn Sie es bereits ausgeführt haben,
verwenden Sie zuerst `unload_controller` und beginnen Sie von vorn.

### 5.3  move_group starten  (Terminal 3)

```Bash
#  Terminal 3
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py use_sim_time:=True
```

### 5.4  RViz starten  (Terminal 4)

```Bash
#  Terminal 4
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

Nachdem RViz bereit ist:

1. **Planning Group → manipulator**

2. **Goal State → open** (oder `extended`, `rest`)

3. Klicken Sie nacheinander auf **Plan** und **Execute**

Die Gelenke des Arms in Gazebo folgen der Bewegung.

**Hinweis**: Aufgrund der PID-Verstärkungsbeschränkung der Humble-Version von `gz_ros2_control`
öffnet sich der Greifer in Gazebo möglicherweise nicht physisch (das Ausführungsprotokoll zeigt dennoch Erfolg an).
Im Mock-Modus und bei realer Hardware tritt dieses Problem nicht auf.

### 5.5  Headless-Modus (ohne GUI)

```Bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py \
  gazebo_gui:=false \
  launch_rviz:=false
```

### 5.6  Fehlerbehebung: Bei wiederholtem Ladefehler

Wenn der spawner ständig `Failed to activate controller` meldet, führen Sie die folgenden Schritte aus, um vollständig zurückzusetzen:

```Bash
# 1. Hängengebliebenen Controller entladen
ros2 control unload_controller joint_trajectory_controller

# 2. forward_position_controller ausschalten
ros2 control set_controller_state forward_position_controller inactive

# 3. Neu spawnen
ros2 run controller_manager spawner joint_trajectory_controller
```

## Reale Hardware

Voraussetzung: Der SO-ARM101 Roboterarm ist montiert, und die Servo-Treiberplatine ist über USB mit dem Computer verbunden.

### 6.1  Controller starten (kann übersprungen werden)

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

Das `so_arm_hardware`-Plugin führt automatisch Folgendes aus:

1. Den seriellen Port öffnen

2. Die IDs der 6 Servos scannen (1–6)

3. Überprüfen, dass jedes Servo antwortet

4. Das Drehmoment aktivieren und die aktuelle Position lesen

Sobald die Controller bereit sind, öffnen Sie zwei weitere Terminals und starten Sie MoveIt:

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

### 6.2  MoveIt (Ein-Klick-Start)

> Der folgende Befehl **ersetzt** 6.1 (nicht gleichzeitig ausführen; stoppen Sie die Befehle aus 6.1) — `demo.launch.py` enthält den Controller-Stack bereits.
> 
> 

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

### 6.3  Fehlerbehebung für den seriellen Port

### 6.4  RViz-Anzeige stimmt nicht mit der tatsächlichen Pose überein

Wenn die Pose des Roboterarms in RViz nicht mit der realen Hardware übereinstimmt (z. B. Gelenkversatz, falsch gemeldete Kollisionen):

1. Stellen Sie sicher, dass die Servos in der Mittelstellung kalibriert wurden

2. Passen Sie in `so_arm101.ros2_control.xacro` den `position_offset` der einzelnen Gelenke an

3. Umrechnungsformel: `neuer offset = aktueller offset + (aktuell angezeigte rad / 0.00153398)`

4. Kompilieren Sie nach der Änderung das Paket `so_arm101_description` neu

---

## Häufig gestellte Fragen

### Q1: Beim Kompilieren wird "package not found" gemeldet

**A**: Stellen Sie sicher, dass alle Systemabhängigkeiten korrekt installiert und die ROS 2-Umgebung gesourct wurde:

```Bash
source /opt/ros/humble/setup.bash
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
```

### Q2: Beim Start wird "Permission denied" für den Zugriff auf den seriellen Port gemeldet

**A**: Überprüfen Sie die Berechtigungen für den seriellen Port:

```Bash
# Temporäre Lösung
sudo chmod 666 /dev/ttyACM0

# Dauerhafte Lösung (wirkt nach dem Abmelden)
sudo usermod -a -G dialout $USER
```

### Q3: MoveIt-Planung schlägt fehl mit der Meldung "Motion planning start tree could not be initialized"

**A**: Es gibt normalerweise zwei Ursachen:

1. **Gelenk überschreitet die Grenze** — Überprüfen Sie die Ausgabe von `FixStartStateBounds` im Protokoll. Die aktuelle Toleranz beträgt
0.3 rad; wenn die Überschreitung innerhalb dieses Bereichs liegt, wird sie akzeptiert. Andernfalls müssen Sie `start_state_max_bounds_error` anpassen
oder den Servo-Offset überprüfen.

2. **Kollision im Startzustand** — Überprüfen Sie die Ausgabe von `FixStartStateCollision` im Protokoll. Wenn
"Unable to find a valid state nearby" erscheint, bedeutet dies, dass die aktuelle Pose eine Selbstkollision aufweist.
Der Roboterarm befindet sich möglicherweise in einer gefalteten Pose (z. B. berührt der gripper die shoulder) oder der Offset ist falsch.
Passen Sie `position_offset` an und versuchen Sie es erneut.

### Q4: Der Roboterarm bewegt sich nach Execute nicht

**A**: Überprüfen Sie den Controller-Status:

```Bash
ros2 control list_controllers
```

Stellen Sie sicher, dass `joint_trajectory_controller` im Status `active` ist. Falls nicht, spawnen Sie ihn neu:

```Bash
ros2 run controller_manager spawner joint_trajectory_controller
```

### Q5: RViz startet langsam oder bleibt hängen

**A**: Normales Verhalten. Beim Start lädt MoveIt das URDF-Modell, das Kollisionserkennungs-Plugin,
den Kinematik-Solver usw.; der erste Start dauert etwa 10 Sekunden.

### Q6: Der geplante Pfad ist nicht glatt oder zittert

**A**: Versuchen Sie die folgenden Methoden:

- Wechseln Sie zu einem anderen Planer (wählen Sie im Planner-Dropdown in RViz `RRTConnect`)

- Erhöhen Sie die Planning Time auf 10 Sekunden

- Stellen Sie sicher, dass das Ziel innerhalb des Arbeitsraums liegt (testen Sie mit `Random Valid`)

### Q7: Der Greifer bewegt sich in Gazebo nicht

**A**: Dies ist eine fest im Code verankerte Einschränkung der PID-Verstärkung in der Humble-Version von `gz_ros2_control`
(fest auf 0.1), die nicht über URDF-Parameter überschrieben werden kann. Im Protokoll wird Execute als erfolgreich angezeigt,
aber in der physikalischen Gazebo-Simulation öffnet sich der Greifer nicht. Im Mock-Modus und bei realer Hardware tritt dieses Problem nicht auf.

## Anhang: Kurzübersicht der Startparameter

### `controllers_bringup.launch.py`

### `so_arm_gz_bringup.launch.py`

---

## Verzeichnislayout

```Bash
SO-ARM101_ROS2/
├── so_arm_utils/                   # Python-Toolbibliothek
├── so_arm101_description/          # URDF · Controller · Meshes · RViz · MuJoCo
├── so_arm101_moveit_config/        # MoveIt 2 SRDF · Planer · Startdateien
├── so_arm_gz/                      # Gazebo-Simulationsstart
├── so_arm_hardware/                # Integrierter SCS-Seriell-Treiber (C++)
└── Simulation/                     # Original-CAD-URDF (als Referenz beibehalten)
```

<RelatedProducts slugs="so-arm101" />
