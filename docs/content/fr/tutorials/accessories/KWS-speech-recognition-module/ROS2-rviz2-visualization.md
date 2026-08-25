---
title: Visualisation ROS2-rviz2
description: "- Système d'exploitation : Ubuntu 22.04"
---

# Visualisation ROS2-rviz2

## 1. Préparation de l'environnement

#### Prérequis système

- **Système d'exploitation** : Ubuntu 22.04

- **Version de ROS2** : Humble

#### Installer les bibliothèques de dépendances

Ouvrir un terminal et exécuter successivement :

```PowerShell
# 1. Update sources
sudo apt update

# 2. Install ROS2 base packages (if ROS2 is not installed yet)
# (If ROS2 is already installed, skip this step)
# sudo apt install ros-humble-desktop -y

# 3. Install project-specific dependencies
sudo apt install python3-pip ros-humble-rviz2 ros-humble-visualization-msgs -y
pip3 install pyserial
```

---

## 2. Créer l'espace de travail et la structure de répertoires

#### Créer les répertoires

Dans le terminal :

```PowerShell
# Create the workspace directory
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### Créer le paquet ROS2

```PowerShell
# Create a Python package named juxi_voice
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### Structure finale des répertoires

Une fois terminé, votre arborescence doit ressembler à ceci (placez strictement les fichiers selon cette structure) :

```Bash
~/juxi_speech_ws/
├── build/                # (generated automatically by the build)
├── install/              # (generated automatically by the build)
├── log/                  # (generated automatically by the build)
└── src/
    └── juxi_voice/
        ├── package.xml   # (auto-generated, no changes needed)
        ├── setup.py      # (needs modification)
        ├── resource/
        │   └── juxi_voice
        └── juxi_voice/   # <-- put the core code here
            ├── __init__.py
            ├── voice_node.py    # (new: voice node)
            └── rviz_control.py  # (new: RViz control node)
```

---

## 3. Contenu et placement des fichiers

Entrer dans le répertoire `~/juxi_speech_ws/src/juxi_voice/juxi_voice/`, télécharger les deux fichiers Python suivants et les placer dans ce répertoire.

#### Fichier 1 : `voice_node.py` (nœud de contrôle vocal)

**Emplacement** : `~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

```Python

#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from std_msgs.msg import String
import serial
import time

class VoiceControlNode(Node):
    def __init__(self):
        super().__init__('juxi_voice_node')

        # === Config section ===
        self.serial_port_name = "/dev/ttyUSB0"
        self.baudrate = 115200
        self.frame_len = 5

        # === Wake word configuration ===
        self.awake_frames = {
            0x01: "你好小犀",
            0x02: "小犀小犀",
            0x03: "钜犀"
        }
        self.is_awake = False

        # === Full command word mapping (protocol V3) ===
        self.cmd_mapping = {
            (0x00, 0x01): ["小车停止", [0xAA, 0x55, 0x00, 0x01, 0xFB]],
            (0x00, 0x04): ["小车前进", [0xAA, 0x55, 0x00, 0x04, 0xFB]],
            (0x00, 0x05): ["小车后退", [0xAA, 0x55, 0x00, 0x05, 0xFB]],
            (0x00, 0x06): ["小车左转", [0xAA, 0x55, 0x00, 0x06, 0xFB]],
            (0x00, 0x07): ["小车右转", [0xAA, 0x55, 0x00, 0x07, 0xFB]],
            (0x00, 0x0A): ["关灯", [0xAA, 0x55, 0x00, 0x0A, 0xFB]],
            (0x00, 0x0B): ["亮红灯", [0xAA, 0x55, 0x00, 0x0B, 0xFB]],
            (0x00, 0x0C): ["亮绿灯", [0xAA, 0x55, 0x00, 0x0C, 0xFB]],
            (0x00, 0x0D): ["亮蓝灯", [0xAA, 0x55, 0x00, 0x0D, 0xFB]],
            (0x00, 0x0E): ["亮黄灯", [0xAA, 0x55, 0x00, 0x0E, 0xFB]],
            (0x00, 0x0F): ["打开流水灯", [0xAA, 0x55, 0x00, 0x0F, 0xFB]],
            (0x00, 0x21): ["回到原点", [0xAA, 0x55, 0x00, 0x21, 0xFB]],
            (0x00, 0x27): ["向上", [0xAA, 0x55, 0x00, 0x27, 0xFB]],
            (0x00, 0x28): ["向下", [0xAA, 0x55, 0x00, 0x28, 0xFB]],
            (0x00, 0x2B): ["夹紧", [0xAA, 0x55, 0x00, 0x2B, 0xFB]],
            (0x00, 0x2C): ["松开", [0xAA, 0x55, 0x00, 0x2C, 0xFB]],
            (0x00, 0x03): ["小车休眠", [0xAA, 0x55, 0x00, 0x03, 0xFB]],
        }

        self.awake_play_frame = [0xAA, 0x55, 0x01, 0x00, 0xFB]
        self.pub_cmd = self.create_publisher(String, '/juxi_voice_cmd', 10)
        self.ser = self._init_serial()
        self.timer = self.create_timer(0.01, self._read_and_parse_serial)
        self.get_logger().info("✅ Voice node started")

    def _init_serial(self):
        try:
            ser = serial.Serial(self.serial_port_name, self.baudrate, timeout=0.01)
            if ser.is_open:
                self.get_logger().info(f"🔌 Serial port opened: {self.serial_port_name}")
                return ser
        except PermissionError:
            self.get_logger().error(f"❌ Permission denied! Run: sudo chmod 777 {self.serial_port_name}")
        except Exception as e:
            self.get_logger().error(f"❌ Serial error: {e}")
        return None

    def _play_voice(self, play_frame):
        if self.ser:
            try:
                self.ser.write(bytes(play_frame))
                time.sleep(0.005)
            except: pass

    def _read_and_parse_serial(self):
        if not self.ser or self.ser.in_waiting < self.frame_len:
            return
        raw_data = self.ser.read(self.frame_len)
        if len(raw_data) < 5: return

        b0, b1, b3, b4, b5 = raw_data
        if b0 != 0xAA or b1 != 0x55 or b5 != 0xFB:
            self.ser.flushInput()
            return

        # Handle wake words
        if b4 == 0x00 and b3 in self.awake_frames:
            self.is_awake = True
            self._play_voice(self.awake_play_frame)
            self.get_logger().info(f"🔔 Awakened: {self.awake_frames[b3]}")
            return

        # Handle control commands
        if self.is_awake:
            key = (b3, b4)
            if key in self.cmd_mapping:
                text, frame = self.cmd_mapping[key]
                self._play_voice(frame)
                msg = String()
                msg.data = text
                self.pub_cmd.publish(msg)
                self.get_logger().info(f"🚀 Sent command: {text}")

def main(args=None):
    rclpy.init(args=args)
    node = VoiceControlNode()
    try: rclpy.spin(node)
    except KeyboardInterrupt: pass
    finally: node.destroy_node(); rclpy.shutdown()

if __name__ == '__main__': main()
```

#### Fichier 2 : `rviz_control.py` (nœud de contrôle RViz)

**Emplacement** : `~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

```Python
#!/usr/bin/env python3
import rclpy
import time
from rclpy.node import Node
from std_msgs.msg import String
from visualization_msgs.msg import Marker

class RvizCubeControl(Node):
    def __init__(self):
        super().__init__('juxi_rviz_node')
        self.cube_x, self.cube_y, self.cube_z = 0.0, 0.0, 0.0
        self.cube_color = (1.0, 1.0, 1.0)
        self.cube_alpha = 1.0
        self.cube_scale = 0.5
        self.move_step = 0.5

        self.marker_pub = self.create_publisher(Marker, '/juxi_visual_marker', 10)
        self.cmd_sub = self.create_subscription(String, '/juxi_voice_cmd', self._cmd_callback, 10)
        self.timer = self.create_timer(0.1, self._publish_marker)
        self.get_logger().info("✅ RViz node started")

    def _cmd_callback(self, msg):
        cmd = msg.data
        self.get_logger().info(f"📢 Received: {cmd}")

        if cmd == "小车前进": self.cube_x += self.move_step
        elif cmd == "小车后退": self.cube_x -= self.move_step
        elif cmd in ["小车左转", "向左"]: self.cube_y += self.move_step
        elif cmd in ["小车右转", "向右"]: self.cube_y -= self.move_step
        elif cmd == "向上": self.cube_z += self.move_step
        elif cmd == "向下": self.cube_z -= self.move_step; self.cube_z = max(0.0, self.cube_z)
        elif cmd == "关灯": self.cube_color = (0.0,0.0,0.0); self.cube_alpha = 0.3
        elif cmd == "亮红灯": self.cube_color = (1.0,0.0,0.0); self.cube_alpha = 1.0
        elif cmd == "亮绿灯": self.cube_color = (0.0,1.0,0.0); self.cube_alpha = 1.0
        elif cmd == "亮蓝灯": self.cube_color = (0.0,0.0,1.0); self.cube_alpha = 1.0
        elif cmd == "亮黄灯": self.cube_color = (1.0,1.0,0.0); self.cube_alpha = 1.0
        elif cmd == "打开流水灯":
            colors = [(1.0,0.0,0.0), (0.0,1.0,0.0), (0.0,0.0,1.0), (1.0,1.0,0.0)]
            idx = int(time.time() * 2) % 4
            self.cube_color = colors[idx]
        elif cmd == "回到原点":
            self.cube_x = self.cube_y = self.cube_z = 0.0
            self.cube_color = (1.0,1.0,1.0)
            self.cube_alpha = 1.0
            self.cube_scale = 0.5
        elif cmd == "夹紧": self.cube_scale = 0.25
        elif cmd == "松开": self.cube_scale = 0.5
        elif cmd == "小车休眠": self.cube_color = (0.3,0.3,0.3)

    def _publish_marker(self):
        marker = Marker()
        marker.header.frame_id = "map"
        marker.header.stamp = self.get_clock().now().to_msg()
        marker.ns = "juxi_cube"
        marker.id = 0
        marker.type = Marker.CUBE
        marker.action = Marker.ADD

        marker.pose.position.x = self.cube_x
        marker.pose.position.y = self.cube_y
        marker.pose.position.z = self.cube_z
        marker.pose.orientation.w = 1.0

        marker.scale.x = marker.scale.y = marker.scale.z = self.cube_scale

        marker.color.r = float(self.cube_color[0])
        marker.color.g = float(self.cube_color[1])
        marker.color.b = float(self.cube_color[2])
        marker.color.a = float(self.cube_alpha)

        self.marker_pub.publish(marker)

def main(args=None):
    rclpy.init(args=args)
    node = RvizCubeControl()
    try: rclpy.spin(node)
    except KeyboardInterrupt: pass
    finally: node.destroy_node(); rclpy.shutdown()

if __name__ == '__main__': main()
```

#### Fichier 3 : modifier `setup.py`

**Emplacement** : `~/juxi_speech_ws/src/juxi_voice/setup.py`

Trouver la section `entry_points` et la modifier comme suit (pour indiquer à ROS2 où se trouvent ces deux programmes) :

```Python
entry_points={
        'console_scripts': [
            'voice_node = juxi_voice.voice_node:main',
            'rviz_control = juxi_voice.rviz_control:main',
        ],
    },
```

---

## 4. Compilation et exécution

#### Compiler

```Python
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### Actualiser les variables d'environnement

**À exécuter à chaque nouveau terminal**, ou à ajouter dans `~/.bashrc` :

```Python
cd ~/juxi_speech_ws
source install/setup.bash
# Or add to the environment
source ~/juxi_speech_ws/install/setup.bash
```

#### Exécuter les nœuds (3 terminaux nécessaires)

Terminal 1 : lancer le nœud vocal

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
sudo chmod 777 /dev/ttyUSB0  # solve serial port permission
ros2 run juxi_voice voice_node
```



Terminal 2 : lancer le nœud de contrôle RViz

```Python
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```



Terminal 3 : ouvrir l'interface RViz

```Python
rviz2
```

---

## 5. Configuration de l'interface RViz

1. Cliquer sur **Add** en bas à gauche.

2. Trouver **Marker** sous `rviz_default_plugins`, cliquer sur OK.

3. En haut du panneau gauche, changer **Fixed Frame** en `map`.

4. Dans la liste de gauche, trouver le **Marker** ajouté, le déplier et changer le **Topic** en `/juxi_visual_marker`.

Un cube blanc apparaît alors au centre de l'écran.

---

## 6. Utilisation

**Réveil** : dire « 你好小犀 » au module.

- Le module répond « 我在 ».

- Le terminal 1 affiche « 🔔 已唤醒 ».

**Envoyer une commande** : dire ensuite « 小车前进 », « 亮红灯 », « 关灯 », etc.

- Le module lit automatiquement la réponse correspondante.

- Le cube dans RViz se déplace ou change de couleur.

---

## 7. Dépannage des problèmes courants

**Erreur de permission du port série** :

- Solution : exécuter `sudo chmod 777 /dev/ttyUSB0`.

**Pas de cube dans RViz** :

- Solution : vérifier que Fixed Frame est `map` et le Topic `/juxi_visual_marker`.

**Aucune réaction après une commande** :

- Vérification : ouvrir un nouveau terminal, exécuter `ros2 topic echo /juxi_voice_cmd`.

- Si des données s'affichent : la voix fonctionne, le problème vient de la configuration RViz.

- Si rien ne s'affiche : pas de réveil ou pas de données série.
