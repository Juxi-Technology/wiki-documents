---
title: "Interaction vocale ROS1"
description: "Le module d'interaction vocale prend en charge les trois méthodes de câblage suivantes :"
---

# Interaction vocale ROS1

## 1、Préparation de l'environnement

#### Configuration système requise

- **Système d'exploitation** : Ubuntu 20.04 ou 18.04

- **Version ROS1** : Noetic (recommandé) ou Melodic

#### Installation des dépendances

```Bash
# 1. 更新源
sudo apt update

# 2. 安装 ROS1 桌面完整版
# (如果已安装ROS1，跳过)
sudo apt install ros-noetic-desktop-full -y    # Ubuntu 20.04
sudo apt install ros-melodic-desktop-full -y   # Ubuntu 18.04

# 3. 安装本项目依赖（同时支持串口和I2C）
sudo apt install python3-pip ros-noetic-rviz i2c-tools -y
pip3 install pyserial smbus2

# 如果是 Melodic (Python2)
sudo apt install python-pip ros-melodic-rviz i2c-tools -y
pip install pyserial smbus2

# 4. 如果使用 I2C 接线，额外安装
sudo apt install python3-smbus2 -y
```

---

## 2、Description des trois méthodes de câblage

Le module d'interaction vocale prend en charge les trois méthodes de câblage suivantes :

#### Mécanisme de détection automatique

Au démarrage, le nœud ROS1 détecte automatiquement la méthode de câblage dans l'ordre suivant :

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

#### Création de l'espace de travail catkin

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### Création du paquet ROS

```Bash
catkin_create_pkg juxi_voice rospy std_msgs visualization_msgs
```

#### Structure finale des répertoires

Placez les fichiers fournis avec ce projet aux emplacements correspondants :

```Bash
~/juxi_speech_ws/
├── build/
├── devel/
└── src/
    └── juxi_voice/
        ├── CMakeLists.txt      # (替换为本项目提供的)
        ├── package.xml          # (替换为本项目提供的)
        ├── juxi_voice.rviz      # (新建：RViz预配置文件)
        ├── launch/
        │   └── juxi_voice.launch # (新建：一键启动文件)
        └── scripts/
            ├── voice_node.py     # (新建：语音节点)
            └── rviz_control.py   # (新建：RViz控制节点)
```

---

## 6、Contenu des fichiers et emplacement

#### Fichier 1 : `voice_node.py` (nœud de contrôle vocal)

**Emplacement** : `~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py`

**Fonctionnalités principales** :

- Détection automatique de la méthode de câblage Type-C / UART / IIC

- Table de correspondance unifiée des mots de commande (114 mots de commande, parfaitement cohérente avec la table de protocole Excel V1)

- Utilise le backend de communication correspondant (port série / I2C) selon la méthode de câblage

**Architecture clé** :

```Bash
# 统一命令数据: ID → (串口字节2, 串口字节3, 命令文本, 播报模式)
CMD_DATA = {
    1:   (0x01, 0x00, "欢迎语", "被"),
    3:   (0x03, 0x00, "你好小犀", "主"),
    14:  (0x00, 0x04, "小车前进", "主"),
    84:  (0xFF, 0x5F, "这是红色", "被"),
    ...
}

# 自动检测函数
def detect_connection():
    # 1. 尝试串口 /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyAMA0, /dev/ttyS0
    # 2. 尝试 I2C /dev/i2c-1 (从机地址 0x2A)
    ...
```

(Pour le code complet, consultez le fichier `voice_node.py` fourni avec le projet)

#### Fichier 2 : `rviz_control.py` (nœud de contrôle RViz)

**Emplacement** : `~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py`

S'abonne au topic `/juxi_voice_cmd` pour recevoir le texte des commandes et met à jour la visualisation du cube en fonction de la commande.

(Pour le code complet, consultez le fichier `rviz_control.py` fourni avec le projet)

#### Fichier 3 : `CMakeLists.txt` et `package.xml`

Ils sont déjà fournis dans ce projet ; il suffit de remplacer les fichiers par défaut générés automatiquement par `catkin_create_pkg`.

---

## 7、Compilation et exécution

#### Compilation

```Bash
cd ~/juxi_speech_ws
catkin_make
```

#### Variables d'environnement

```Bash
source ~/juxi_speech_ws/devel/setup.bash
# 或写入 ~/.bashrc
echo "source ~/juxi_speech_ws/devel/setup.bash" >> ~/.bashrc
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
# 设置后需要重新登录生效
```

#### Exécution des nœuds

**Méthode 1 : démarrage en une seule commande (recommandé)**

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
roslaunch juxi_voice juxi_voice.launch
```

Au démarrage, le nœud vocal, le nœud de contrôle RViz et l'interface de visualisation RViz s'ouvrent automatiquement.

**Méthode 2 : démarrage étape par étape (3 terminaux)**

**Terminal 1** : lancez roscore

```Bash
roscore
```

**Terminal 2** : nœud vocal

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice voice_node.py
```

Au démarrage, la méthode de câblage détectée s'affiche :

```Bash
[INFO] 自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
[INFO] 语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

ou

```Bash
[INFO] 自动检测: UART /dev/ttyUSB0
[INFO] 语音节点启动完成 - UART /dev/ttyUSB0
```

Si aucun appareil n'est détecté :

```Bash
[FATAL] 未检测到AI语音交互模块！请检查接线 (Type-C / UART / IIC)
[FATAL] 支持的端口: I2C(/dev/i2c-1) | 串口(/dev/ttyUSB0 /dev/ttyACM0 /dev/ttyAMA0 /dev/ttyS0)
```

**Terminal 3** : nœud de contrôle RViz

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice rviz_control.py
```

**Terminal 4** : visualisation RViz (charge directement le fichier préconfiguré, aucune configuration manuelle requise)

```Bash
rviz -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

Ou ouvrez d'abord RViz, puis chargez :

```Bash
rviz
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
# 被动播报 (I2C → 写 0xD1, 串口 → 发 FE EF FF XX EE)
rostopic pub /juxi_passive_play std_msgs/String "data: '这是红色'"
# 功能词播报 (I2C → 写 0xD2, 串口 → 发 FE EF 01 00 EE)
rostopic pub /juxi_func_play std_msgs/String "data: '欢迎语'"
# 命令词播报 (I2C → 写 0xD3, 串口 → 发 FE EF 00 04 EE)
rostopic pub /juxi_cmd_play std_msgs/String "data: '小车前进'"
```

---

## 10、Tableau de correspondance des ID de mots de commande

> 114 mots de commande au total, parfaitement cohérents avec `命令词播报词协议列表V1_中文.xlsx`.
> 
> 

### Mots de fonction (ID 1-10)

### Mots de commande (ID 11-83, 113)

### Mots de diffusion passive (ID 84-112, 114)

---

## 11、Description des topics ROS1

---

## 12、Dépannage

**1. Au démarrage, le message "module d'interaction vocale non détecté" apparaît**

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

**2. Erreur d'autorisation du port série**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
# 或加入 dialout 用户组（需要重新登录）
sudo usermod -aG dialout $USER
```

**3. Erreur d'autorisation I2C**

```Bash
sudo chmod 666 /dev/i2c-1
# 或加入 i2c 用户组（需要重新登录）
sudo usermod -aG i2c $USER
```

**4. Aucun cube dans RViz**

- Vérifiez si le Fixed Frame est `map`

- Vérifiez si le Topic est `/juxi_visual_marker`

- Confirmez que le nœud rviz_control.py a bien été démarré

**5. Aucune réaction aux commandes après le réveil**

```Bash
rostopic echo /juxi_voice_cmd
```

Des données présentes → problème de configuration RViz ; aucune donnée → anomalie de câblage/communication.

**6. rosrun ne trouve pas le nœud**

Confirmez que la compilation et le source ont déjà été exécutés :

```Bash
cd ~/juxi_speech_ws
catkin_make
source devel/setup.bash
```

**7. Erreur de syntaxe signalée**

```Bash
# 确认 Python 脚本有执行权限
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py
```



