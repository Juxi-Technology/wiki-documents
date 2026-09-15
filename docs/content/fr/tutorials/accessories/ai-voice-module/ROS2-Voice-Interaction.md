---
title: "Interaction vocale ROS2"
description: "Le module d'interaction vocale prend en charge les trois méthodes de câblage suivantes :"
---

# Interaction vocale ROS2

## 1、Préparation de l'environnement

#### Configuration système requise

- **Système d'exploitation** : Ubuntu 22.04

- **Version ROS2** : Humble

#### Installation des dépendances

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

## 2、Description des trois méthodes de câblage

Le module d'interaction vocale prend en charge les trois méthodes de câblage suivantes :

#### Mécanisme de détection automatique

Au démarrage, le nœud ROS2 détecte automatiquement la méthode de câblage dans l'ordre suivant :

1. Essaie d'abord le port série : détecte successivement `/dev/ttyUSB0` → `/dev/ttyACM0` → `/dev/ttyAMA0` → `/dev/ttyS0`

2. Essaie ensuite l'I2C : vérifie si l'esclave `0x2A` est présent sur `/dev/i2c-1`

3. Pour la détection du port série, il suffit que le fichier de périphérique existe et puisse être ouvert pour que le port soit considéré comme disponible ; aucune vérification supplémentaire n'est nécessaire

Dès qu'une méthode est détectée, la détection s'arrête et cette méthode est verrouillée pour l'utilisation. Aucune configuration manuelle n'est nécessaire.

---

## 3、Description du protocole IIC

#### Configuration de l'esclave IIC

#### Définition des registres

---

## 4、Description du protocole série (Type-C / UART)

#### Format de trame

Chaque trame est fixée à **5 octets** :

#### Débit en bauds

Fixé à **115200** bps.

---

## 5、Création de l'espace de travail et de la structure des répertoires

#### Création des répertoires

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### Création du paquet ROS2

```Bash
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### Structure finale des répertoires

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

## 6、Contenu des fichiers et emplacement

#### Fichier 1 : `voice_node.py` (nœud de contrôle vocal)

**Emplacement** : `~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

**Fonctionnalités principales** :

- Détection automatique de la méthode de câblage Type-C / UART / IIC

- Table de correspondance unifiée des mots de commande (114 mots de commande)

- Utilise le backend de communication correspondant selon la méthode de câblage

**Architecture clé** :

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

(Pour le code complet, consultez le fichier `voice_node.py` fourni avec le projet)

#### Fichier 2 : `rviz_control.py` (nœud de contrôle RViz)

**Emplacement** : `~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

S'abonne au topic `/juxi_voice_cmd` pour recevoir le texte des commandes et met à jour la visualisation du cube en fonction de la commande.

(Pour le code complet, consultez le fichier `rviz_control.py` fourni avec le projet)

#### Fichier 3 : modifier `setup.py`

**Emplacement** : `~/juxi_speech_ws/src/juxi_voice/setup.py`

```Bash
entry_points={
    'console_scripts': [
        'voice_node = juxi_voice.voice_node:main',
        'rviz_control = juxi_voice.rviz_control:main',
    ],
},
```

---

## 7、Compilation et exécution

#### Compilation

```Bash
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### Variables d'environnement

```Bash
source ~/juxi_speech_ws/install/setup.bash
# 或写入 ~/.bashrc
echo "source ~/juxi_speech_ws/install/setup.bash" >> ~/.bashrc
```

#### Configuration des autorisations

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

#### Exécution des nœuds (3 terminaux)

**Terminal 1** : nœud vocal

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice voice_node
```

Au démarrage, la méthode de câblage détectée s'affiche :

```Bash
自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

ou

```Bash
自动检测: UART /dev/ttyUSB0
语音节点启动完成 - UART /dev/ttyUSB0
```

**Terminal 2** : nœud de contrôle RViz

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```

**Terminal 3** : visualisation RViz (charge directement le fichier préconfiguré, aucune configuration manuelle requise)

```Bash
rviz2 -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

Ou ouvrez d'abord RViz, puis chargez :

```Bash
rviz2
# 菜单栏: File → Open Config → 选择 juxi_voice.rviz
```

---

## 8、Description de la préconfiguration RViz

`juxi_voice.rviz` est déjà préconfiguré avec les éléments suivants ; il est prêt à l'emploi dès le démarrage, sans aucune opération manuelle :

- **Fixed Frame** : `map`

- **Affichage Marker** : abonné à `/juxi_visual_marker` (marqueur unique)

- **Affichage MarkerArray** : abonné à `/juxi_visual_markers` (marqueurs multiples : bras robotisé, niveau de batterie, alarme, etc.)

- **Point de vue** : observation en plongée oblique, centre à l'origine

---

## 9、Mode d'emploi

#### Réveil

Dites **"你好小犀"** au module → le module répond "我在"

#### Envoi de commandes

- "小车前进" → le cube avance

- "亮红灯" → le cube devient rouge

- "打开流水灯" → les couleurs défilent en boucle

- "报警" → une sphère rouge pulsante

- "显示电量" → le texte du niveau de batterie

#### Diffusion déclenchée par l'hôte

```Bash
# 被动播报
ros2 topic pub /juxi_passive_play std_msgs/msg/String "data: '这是红色'"
# 功能词播报
ros2 topic pub /juxi_func_play std_msgs/msg/String "data: '欢迎语'"
# 命令词播报
ros2 topic pub /juxi_cmd_play std_msgs/msg/String "data: '小车前进'"
```

---

## 10、Tableau de correspondance des ID de mots de commande

### Mots de fonction (ID 1-10)

### Mots de commande (ID 11-83, 113)

### Mots de diffusion passive (ID 84-112, 114)

---

## 11、Description des topics ROS2

---

## 12、Dépannage

**Au démarrage, le message "module d'interaction vocale non détecté" apparaît**

Vérifiez si le fichier de périphérique correspondant à la méthode de câblage existe :

```Bash
# I2C 接线
ls /dev/i2c-1
sudo i2cdetect -y 1   # 应看到 0x2A

# Type-C 接线
ls /dev/ttyUSB0 /dev/ttyACM0

# UART 接线
ls /dev/ttyAMA0 /dev/ttyS0
```

**Erreur d'autorisation du port série**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
```

**Erreur d'autorisation I2C**

```Bash
sudo chmod 666 /dev/i2c-1
```

**Aucun cube dans RViz**

- Vérifiez si le Fixed Frame est `map`

- Vérifiez si le Topic est `/juxi_visual_marker`

**Aucune réaction aux commandes après le réveil**

```Bash
ros2 topic echo /juxi_voice_cmd
```

Des données présentes → problème de configuration RViz ; aucune donnée → anomalie de câblage/communication.

<RelatedProducts slugs="ai-voice-module" />
