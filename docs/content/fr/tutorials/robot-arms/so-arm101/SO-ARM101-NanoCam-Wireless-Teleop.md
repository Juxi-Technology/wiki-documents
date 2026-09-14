---
title: Téléopération sans fil SO-ARM101 (version ESP32-NanoCam)
description: "Solution de téléopération sans fil pour les démonstrations en compétition : le bras leader est relié à un ordinateur Ubuntu via LeRobot, le bras follower est contrôlé par le module ESP32-NanoCam via micro-ROS en WiFi — flux complet : câblage, alimentation, flashage, calibration et FPV caméra."
---

# Téléopération sans fil SO-ARM101 (version ESP32-NanoCam)

> **[Acheter en boutique](https://www.juxitech.com/fr/products/so-arm101-developers-kit)**

Ce tutoriel couvre le scénario de téléopération sans fil d'un bras SO-ARM101 embarqué sur drone pour les démonstrations en compétition : le bras leader se connecte à un ordinateur Ubuntu via LeRobot ; le bras follower est contrôlé par le [Module vidéo WiFi ESP32-S3](/fr/products/esp32-s3-wifi-module) développé en interne (ESP32-NanoCam, ESP32-S3 N16R8), reçoit les commandes via micro-ROS en WiFi UDP, et intègre une caméra FPV embarquée, un microphone, un haut-parleur et une LED RGB d'état. En cas de problème, consultez le [guide de dépannage](./SO-ARM101-NanoCam-Troubleshooting.md).

## Introduction et architecture du système

```text
SO-ARM101 主臂(leader) → USB 舵机驱动板 → Ubuntu 22.04 (LeRobot + ROS2 Humble + micro-ROS Agent)
                                            │  2.4 GHz Wi-Fi(同一局域网)
                                            ▼
                              ESP32-NanoCam 从臂控制器(ESP32-S3)
                                            │  1 Mbps UART(经舵机驱动板 UART 针脚中转)
                                            ▼
                              SO-ARM101 从臂(follower) 6 × STS3215
```

- Les mouvements de l'opérateur sur le bras leader → LeRobot lit le bras leader → topic ROS2 `/joint_command` → le micro-ROS Agent envoie via UDP 8888 → l'ESP32-NanoCam les reçoit et pilote les 6 servos ;
- Le bras follower renvoie `/joint_states` (20 Hz) en retour, pour la boucle fermée et le watchdog ;
- La caméra embarquée publie un flux MJPEG `http://<IP>/stream` (FPV), convertible en topic ROS côté PC.

Répartition des rôles : le bras leader se connecte à l'ordinateur Ubuntu ; le bras follower est contrôlé par l'ESP32-NanoCam ; les deux communiquent sans fil. Fonctions embarquées du firmware après mise sous tension :

| Fonction | Implémentation | Description |
|---|---|---|
| Téléopération micro-ROS | `main.cpp` + `servo_bus.cpp` | Retour `/joint_states` à 20 Hz, réception des commandes `/joint_command`, mécanismes de sécurité complets intégrés |
| Caméra FPV | `camera_stream.cpp` | Flux MJPEG `http://<IP>/stream` (QVGA) |
| Microphone | `audio_es8311.cpp` | Niveau sonore ambiant → `/follower_audio/level` (Float32, 5 Hz) |
| Haut-parleur | `audio_es8311.cpp` | Signaux sonores de démarrage/prêt/déverrouillage/erreur |
| LED RGB d'état | `rgb_status.cpp` | Rouge au démarrage → orange en WiFi → vert en micro-ROS → bleu au déverrouillage ; rouge si le WiFi est perdu |

## Liste du matériel

| Matériel | Quantité | Description |
|---|---|---|
| Bras leader SO-ARM101 | 1 | Avec 6 servos STS3215 |
| Bras follower SO-ARM101 | 1 | Avec 6 servos STS3215 |
| Module ESP32-NanoCam | 1 | ESP32-S3 N16R8, caméra/audio/RGB embarqués |
| Carte driver de servos USB | 2 | Calibration + relais de bus leader/follower (broches UART) |
| Ordinateur Ubuntu 22.04 | 1 | Exécute LeRobot + ROS2 + Agent |
| Routeur 2.4GHz ou partage de connexion mobile | 1 | L'ordinateur du bras leader et le NanoCam sur le même réseau local |
| Alimentation externe 12V 5A | 1 | **Alimentation du bras follower** (l'USB ne peut pas alimenter 6 servos) |
| Alimentation externe 5V 6A | 1 | **Alimentation du bras leader** (relié à l'ordinateur Ubuntu) |
| Câble de données USB-C | 2 | Alimentation/débogage du NanoCam + liaison de la carte driver du bras leader à l'ordinateur |

> Périphériques embarqués du NanoCam : caméra GC2145 (DVP) ; audio ES8311 (I2S 24kHz, microphone AP2718AT + haut-parleur NS4150B) ; RGB WS2812 @ GPIO18.

## Câblage

Entre l'ESP32-NanoCam et le bras follower, la liaison **passe par les broches UART de la carte driver de servos** :

```text
舵机驱动板 UART:   RX ←── NanoCam TX (P2-8 / GPIO20)
                   TX ──→ NanoCam RX (P2-7 / GPIO19)
                  GND ──→ NanoCam GND
```

- **TX vers RX, RX vers TX (croisement)**, masse (GND) commune, débit 1 Mbps ;
- Le bus de servos du NanoCam utilise UART1, connecté aux **P2-7 / P2-8** du module (le port série de débogage passe par l'USB-C, CH340K → UART0 ; les deux sont totalement indépendants et peuvent être utilisés simultanément) ;
- Le bus de servos et l'alimentation des servos partagent la masse (alimentation 12V 5A du bras follower).

### Broches principales du NanoCam

| Périphérique | Broche |
|---|---|
| Bus de servos (UART1) | TX=GPIO20 (P2-8 ESP_P), RX=GPIO19 (P2-7 ESP_N), connecteur P2 du module |
| Port série de débogage (UART0) | GPIO43/44 → CH340K embarqué → USB-C (pas d'USB CDC natif) |
| Caméra DVP (GC2145) | D0~D7=GPIO4/2/1/3/5/7/8/10, PCLK=6, VSYNC=13, HREF=11, XCLK=9 (24MHz), PWDN=12, RESET=14, SCCB SDA/SCL=41/42 |
| Audio ES8311 (I2S) | MCLK=39, BCLK=38, WS=47, DIN(ADC)=40, DOUT(DAC)=48 ; I2C SDA/SCL=41/42, adresse 0x30 |
| Microphone | MEMS analogique AP2718AT (via l'ADC de l'ES8311) |
| Haut-parleur | Amplificateur classe D NS4150B (via le DAC de l'ES8311), pas de broche d'activation PA sur la carte |
| RGB | WS2812 @ GPIO18 (1 LED, GRB, pilotée par RMT) |
| BOOT | GPIO0 |

> Les définitions de broches proviennent de `docs/reference/nano_config.h` et des documents schématiques du matériel.

## Alimentation

| Appareil | Alimentation |
|---|---|
| ESP32-NanoCam | **Alimentation par câble de données USB** (le port série de débogage CH340K fonctionne en même temps) |
| Bras follower (6×STS3215) | Alimentation externe **12V 5A** |
| Bras leader (relié à l'ordinateur Ubuntu) | Alimentation externe **5V 6A** |

> ⚠️ L'USB ne peut pas alimenter 6 servos : le bras follower doit être alimenté en externe par du 12V 5A ; l'ESP32 peut simplement être alimenté par un câble USB.

## Configuration requise

### Côté compilation/flashage (Windows / Linux / macOS)

| Élément | Exigence |
|---|---|
| Système d'exploitation | Windows 10/11 ou Linux (macOS possible) |
| Python | 3.8+ (vérifier avec `python --version`) |
| PlatformIO | Core 6.x (chaîne d'outils esp32s3 + framework Arduino inclus) |
| Espace disque | Au moins 3 GB libres |
| Réseau | Accès à GitHub / Espressif CDN (premier téléchargement de la chaîne d'outils : environ 1-2 GB) |

### Côté exécution (ordinateur Ubuntu 22.04, là où tourne la téléopération)

| Élément | Exigence |
|---|---|
| Système d'exploitation | Ubuntu 22.04 (64 bits) |
| ROS 2 | Humble (Hawksbill) |
| LeRobot | Avec le support Feetech SO-101 (`so101_leader` / `so101_follower`) |
| micro-ROS Agent | `snap run micro-ros-agent` ou installation depuis les sources |
| Commandes requises | `nmcli`, `ip`, `flock` (fournies par NetworkManager, iproute2, util-linux) |
| Environnement Python | Environnement virtuel `lerobot_so101` (conda/miniforge) |

> Identification du port série de débogage : l'interface USB du NanoCam est un CH340K convertissant vers UART0 ; sous Linux, le nom du périphérique est généralement `/dev/ttyUSB0` (ou `/dev/serial/by-id/...CH340*`), PlatformIO le détecte automatiquement (la définition de carte inclut le HWID 0x1A86:0x7523 du CH340) ; débit du moniteur série : 115200. Pour une installation plus complète de l'environnement LeRobot/Ubuntu, consultez le [Tutoriel SO-ARM101](./SO-ARM101-Tutorial.md).

## Étapes d'installation

### 1. Installer PlatformIO (côté compilation/flashage)

**Méthode A : extension VSCode (recommandée)**

1. Installez [VSCode](https://code.visualstudio.com/) ;
2. Recherchez **PlatformIO IDE** dans la boutique d'extensions et installez-le ; VSCode redémarre automatiquement et télécharge PlatformIO Core ;
3. Vérifiez avec `pio --version` dans le terminal VSCode.

**Méthode B : installation en ligne de commande**

```bash
pip install platformio
```

> Sous Windows, si la commande `pio` est introuvable dans Git Bash, utilisez un terminal PowerShell/CMD, ou ajoutez `C:\Users\<nom d'utilisateur>\.platformio\penv\Scripts` au PATH.

### 2. Première compilation (téléchargement automatique de la chaîne d'outils)

Entrez dans le répertoire du firmware et lancez une compilation (sans flashage) :

```bash
cd firmware/nanocam_soarm
pio run
```

Lors de la première exécution, les éléments suivants sont téléchargés successivement :

1. La plateforme espressif32 (`espressif32@7.0.1`) ;
2. La **chaîne d'outils** `toolchain-xtensa-esp32s3` (environ 100 MB, depuis le CDN Espressif) ;
3. Le framework Arduino `framework-arduinoespressif32` (environ 200 MB).

En cas de téléchargement lent ou bloqué :

- L'estimation du temps restant de PlatformIO est imprécise : il reste souvent bloqué un moment puis se termine d'un coup ; laissez 5 minutes en observant si le pourcentage progresse ;
- Activez un proxy/VPN (proxy système) ;
- Téléchargement manuel de la chaîne d'outils : téléchargez avec le navigateur `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` (sous Linux, `-linux-amd64.tar.gz`), décompressez, renommez le dossier en `toolchain-xtensa-esp32s3`, placez-le dans `C:\Users\<nom d'utilisateur>\.platformio\packages\`, puis relancez `pio run` ;
- Une interruption par Ctrl+C en cours de route n'abîme pas l'environnement ; relancer reprend le téléchargement.

### 3. Installer l'environnement d'exécution Ubuntu

```bash
# 1. ROS 2 Humble(按官方文档安装)
#    https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html
source /opt/ros/humble/setup.bash

# 2. LeRobot(含 Feetech 支持)
conda create -n lerobot_so101 python=3.10 -y
conda activate lerobot_so101
pip install lerobot[feetech]

# 3. micro-ROS Agent
sudo snap install micro-ros-agent
snap run micro-ros-agent udp4 --port 8888   # 测试能否启动

# 4. PlatformIO(Ubuntu 端若也要编译烧录)
pip install platformio
```

## Configuration du WiFi

Le PC et le NanoCam doivent être sur le même réseau local (WiFi 2.4 GHz, un partage de connexion mobile suffit), et le routeur/point d'accès ne doit pas activer l'isolation des clients. Deux méthodes de configuration WiFi sont possibles, au choix.

### Méthode 1 : configuration à la compilation (par défaut)

```bash
cd firmware/nanocam_soarm
cp src/wifi_config.example.h src/wifi_config.h
# 编辑 wifi_config.h:WIFI_SSID / WIFI_PASS / AGENT_IP(Ubuntu 电脑局域网 IP)
```

### Méthode 2 : configuration par commandes série (recommandée, sans reflashage)

Le firmware intègre une configuration à l'exécution (stockage NVS), saisissable à tout moment via le port série de débogage (débit 115200) :

| Commande | Effet |
|---|---|
| `wifi_ssid:<nom du hotspot>` | Définit et enregistre le nom du WiFi |
| `wifi_pass:<mot de passe>` | Définit et enregistre le mot de passe WiFi |
| `agent_ip:<IP de l'ordinateur Ubuntu>` | Définit et enregistre l'IP du micro-ROS Agent |
| `wifi_show` | Affiche la configuration active |
| `wifi_clear` | Efface la configuration enregistrée et restaure les valeurs par défaut de compilation |

Toute commande de configuration enregistrée **redémarre automatiquement le module au bout de 3 secondes** pour prendre effet. Priorité : configuration enregistrée via le port série > valeurs par défaut de compilation. Pour changer de hotspot ou d'ordinateur, il suffit de brancher l'USB et de saisir trois commandes, sans modifier le code ni reflasher.

> Les valeurs par défaut de compilation (`wifi_config.h`) sont toujours conservées comme solution de repli si aucune configuration série n'a été enregistrée ; `wifi_show` distingue les valeurs « issues du NVS » de celles « par défaut de compilation ». Le mot de passe est stocké en clair dans le NVS, ce qui est acceptable pour une démonstration en réseau local ; `wifi_config.h` contenant le mot de passe WiFi, il est exclu par `.gitignore` — ne le validez pas dans le dépôt.

## Flashage et démarrage

```bash
cd firmware/nanocam_soarm
pio run --target upload
```

**Passer en mode téléchargement (crucial)** : le NanoCam télécharge via le port série CH340K → UART0 (pas de téléchargement automatique par USB CDC). Lancez d'abord directement l'upload ; si la carte dispose d'un circuit de téléchargement automatique, il réussira directement ; s'il indique une impossibilité de connexion : **maintenez le bouton BOOT (GPIO0) → branchez l'USB (ou appuyez sur reset) → relâchez BOOT**, puis relancez immédiatement l'upload. Sous Windows, si le port série n'est pas identifié automatiquement, ajoutez une ligne `upload_port = COM3` dans la section `[env:nano_cam]` de `platformio.ini` (remplacez par le numéro COM réel du CH340 indiqué dans le Gestionnaire de périphériques).

Consulter les journaux série :

```bash
pio device monitor --baud 115200
```

Après le flashage, vous devez voir (dans cet ordre) :

```text
audio: ES8311 ready @24000Hz      ← 音频初始化成功
Servo Ping mask: 0x3f             ← 6 个舵机全部在线
Servo calibration match: YES      ← 标定数组与舵机 EEPROM 一致
IP: 192.168.x.x  RSSI: -xx        ← WiFi 已连
Waiting for micro-ROS Agent...    ← 等待 Agent(下一步启动后消失)
```

> Le bus de servos peut rester débranché pendant le flashage : le flashage et le fonctionnement des servos ne s'interfèrent pas (UART0 pour le débogage / UART1 pour les servos, indépendants). Le projet inclut déjà la bibliothèque statique micro-ROS pour ESP32-S3 (xtensa-lx7), aucune compilation personnelle n'est nécessaire pour l'usage courant.

## Remarques sur la calibration

Le répertoire `cali/` du projet contient déjà les fichiers de calibration des bras leader/follower, et le tableau de calibration du firmware est déjà aligné sur la calibration du bras follower (soit `cali/follower_recal.json`). **Une recalibration n'est nécessaire que si vous remplacez le matériel du bras follower/leader.**

```bash
# 从臂
python -m lerobot.scripts.lerobot_calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --robot.id=follower_recal --robot.calibration_dir="$PWD/cali"

# 主臂
python -m lerobot.scripts.lerobot_calibrate \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM0 \
  --teleop.id=leader_recal --teleop.calibration_dir="$PWD/cali"
```

Après avoir recalibré le bras follower, vous devez ouvrir `firmware/nanocam_soarm/src/servo_bus.cpp` et remplacer les trois tableaux `kHomingOffsets` / `kRangeMin` / `kRangeMax` par les valeurs de votre `cali/follower_recal.json` (ordre : shoulder_pan, shoulder_lift, elbow_flex, wrist_flex, wrist_roll, gripper), puis recompiler et reflasher.

## Lancer la téléopération sans fil

### Vérifications avant démarrage

```bash
# 1. Ubuntu 电脑连上与 NanoCam 相同的 2.4GHz WiFi
# 2. 主臂 USB 舵机驱动板已连接并识别
ls -l /dev/ttyACM*   # 找到主臂串口
# 3. 从臂 NanoCam 已上电并联网(串口或浏览器确认 MJPEG 流可访问)
```

### Démarrage en une commande

```bash
# 设置环境(或直接编辑 start_soarm_demo.sh 顶部的默认值)
export SOARM_WIFI_SSID="你的2.4G热点"
export SOARM_AGENT_IP="Ubuntu电脑IP"
export SOARM_LEADER_PORT="/dev/ttyACM*"
export SOARM_PYTHON="$(command -v python)"   # lerobot_so101 环境

./start_soarm_demo.sh --check    # 预飞检查:网络/主臂/Agent/从臂在线
./start_soarm_demo.sh            # 正式启动遥操作,Ctrl+C 停止
```

Le script effectue dans l'ordre :

1. Vérification du réseau (le SSID doit correspondre à la configuration), du port série du bras leader et de la présence des fichiers de calibration ;
2. Lancement du micro-ROS Agent (s'il n'est pas déjà en cours ; journal dans `logs/micro_ros_agent.log`) ;
3. Attente de la mise en ligne de `/joint_states` du bras follower (timeout de 15 s) ;
4. Mouvements du bras leader → le bras follower suit, fréquence de commande 30 Hz, **`--mapping-mode absolute` (mappage absolu)**.

**À propos du mappage absolute** : les poses du bras leader et du bras follower se correspondent une à une dans leurs systèmes de coordonnées de calibration respectifs ; l'avantage est **l'absence de dérive cumulée après une déconnexion/reconnexion** — lors de la reconnexion, le bras follower s'aligne en douceur sur la pose actuelle du bras leader en 8 secondes (startup_blend) ; ensuite, quand le bras leader revient à zéro, le bras follower revient également à sa propre position zéro. Le mappage relative (relatif) a été utilisé auparavant, mais après une déconnexion/reconnexion, le bras follower restait dans la position de déconnexion, créant une dérive permanente avec le bras leader revenu à zéro ; le passage à absolute a donc été décidé.

**Redémarrage automatique en cas de perte de l'Agent** (firmware postérieur au 2026-08-19) : après un Ctrl+C pour arrêter la téléopération, le bras follower redémarre automatiquement en environ 10 secondes et revient à `Waiting for micro-ROS Agent...`, ce qui permet de relancer directement le script, sans réinitialisation manuelle du bras follower (pendant la reconnexion, le bras follower revient à sa position zéro, c'est-à-dire un redémarrage complet).

Une fois la liaison établie, le port série du bras follower affiche `micro-ROS ready` (le RGB passe au vert, le haut-parleur émet le signal de prêt), et `Waiting for micro-ROS Agent...` disparaît.

### Vérification manuelle des topics

```bash
ros2 topic echo /joint_states --once           # 从臂反馈
ros2 topic hz /joint_states                    # 应约 20 Hz
ros2 topic echo /follower_audio/level --once   # 麦克风电平(说话时抬升)
```

## Caméra FPV

Une fois sous tension et connecté au réseau, le firmware démarre automatiquement le service de streaming MJPEG (GC2145 embarquée, interface DVP, port HTTP 80 par défaut) :

```text
http://<NANOCAM_IP>/         信息页
http://<NANOCAM_IP>/jpg      单帧 JPEG(快照)
http://<NANOCAM_IP>/stream   连续 MJPEG 流(FPV)
```

### Paramètres et réglages

- Résolution **QVGA 320×240** (configuration finale), **acquisition RGB565 + encodage logiciel `frame2jpg`** (le GC2145 n'a pas d'encodeur JPEG matériel, seuls les OV2640/OV5640 en ont), qualité JPEG 12, double tampon dans la **PSRAM Octal 8MB** ;
- **Pourquoi le QVGA** : en pratique, le VGA (640×480) en RGB565 dépasse la marge de débit DVP de cette carte, les 2/3 inférieurs de l'image sont brouillés (reproduit avec toutes les combinaisons XCLK 24/20/16MHz × simple/double tampon) ; le QVGA est complet et fluide (fréquence d'images inférieure au JPEG matériel, ce qui est normal) ;
- Le streaming tourne dans une tâche httpd séparée (pile portée à 16KB pour l'encodage logiciel), sans interférence avec la téléopération micro-ROS ni la capture audio ;
- Port HTTP 80 par défaut (dans le firmware, `HTTPD_DEFAULT_CONFIG()`) ;
- Pour changer la résolution/qualité : modifiez `config.frame_size` / `kJpegQuality` dans `firmware/nanocam_soarm/src/camera_stream.cpp` ; l'orientation de l'image se règle avec `set_vflip` / `set_hmirror` (même fichier) ;
- esp_http_server est monotâche : `/stream` et `/jpg` **ne peuvent pas être consultés en même temps** (quand le flux est ouvert, `/jpg` reste en suspens) ;
- Si l'initialisation de la caméra échoue, le firmware imprime une ligne d'avertissement puis continue de fonctionner normalement, sans impact sur la téléopération.

Réception côté PC (publication en topic ROS 2, type de message `sensor_msgs/CompressedImage`) :

```bash
# 终端 1:照常启动遥操作
./start_soarm_demo.sh

# 终端 2:接收视频并发布话题
source /opt/ros/humble/setup.bash
python3 tools/follower_camera.py --stream http://<NANOCAM_IP>/stream
# 可选:--topic /自定义话题  --max-fps 10

# 验证
ros2 topic hz /follower_camera/image_raw/compressed   # 应约 10~15 Hz
rviz2    # Add → By topic → Camera,选 /follower_camera/image_raw/compressed
```

Il est possible de vérifier la liaison sans installer ROS : ouvrez `http://<NANOCAM_IP>/stream` dans le navigateur, ou `curl -s http://<NANOCAM_IP>/jpg -o snap.jpg`.

## Audio (microphone et haut-parleur)

**Microphone** : MEMS analogique AP2718AT (via l'ADC de l'ES8311). Le firmware lit le niveau sonore ambiant toutes les 200ms (RMS, normalisé 0~1) et le publie sur `/follower_audio/level` (`std_msgs/Float32`, best-effort). Vous pouvez y implémenter une détection d'activité vocale, une écoute d'ambiance, ou l'utiliser comme simple signal de déclenchement « capturer quand quelqu'un parle ».

```bash
ros2 topic echo /follower_audio/level
```

**Haut-parleur** : DAC ES8311 → amplificateur classe D NS4150B (pas de broche d'activation PA sur la carte), quatre signaux sonores intégrés (voir la section suivante) ; pour personnaliser les signaux sonores, modifiez les appels à `play_tone()` dans `audio_es8311.cpp`. Le volume se règle via le registre 0x32 de l'ES8311 (`R_DAC32`, déjà réglé au maximum 0xFF dans le firmware actuel).

### Paramètres audio et réglages

- Fréquence d'échantillonnage 24 kHz, 16-bit, slot stéréo (identique au firmware d'origine du NanoCam), MCLK = 256×FS = 6.144 MHz ;
- **Le MCLK est généré par le LEDC** (GPIO39, 80MHz÷13≈6.154MHz, erreur de 0.16 % dans la tolérance) : le pilote I2S legacy ne produit pas de MCLK sur l'ESP32-S3, ce qui rend le haut-parleur muet et le niveau du microphone constamment à 0 ; corrigé avec le LEDC dans `start_ledc_mclk()` de `audio_es8311.cpp` ;
- Le contrôle de l'ES8311 passe par I2C1 (le bus physique GPIO41/42 est partagé avec le SCCB de la caméra ; la caméra n'utilise le SCCB qu'au démarrage, aucun conflit en fonctionnement) ; `Wire1.end()` à la fin de `init()` libère l'I2C au profit de la caméra ;
- Le gain du microphone par défaut est identique au firmware d'origine du NanoCam (registre 0x16 = 0x24) ; pour augmenter la sensibilité, ajustez la valeur de `R_ADC16` dans `audio_es8311.cpp`.

## LED RGB d'état et signaux sonores

### Signification des états RGB

| Couleur | État |
|---|---|
| Rouge | Démarrage / échec d'initialisation micro-ROS / perte du WiFi |
| Orange | WiFi connecté, en attente du micro-ROS Agent |
| Vert | micro-ROS prêt (liaison de téléopération établie) |
| Bleu | Contrôle des servos déverrouillé (ARMED) |
| Violet | Commande de contrôle rejetée (handshake/limite/pas incompatible) |

### Signaux sonores du haut-parleur

| Événement | Signal sonore |
|---|---|
| Mise sous tension | Deux brefs « bip bip » (signal de démarrage) |
| micro-ROS prêt | Double tonalité montante |
| Déverrouillage des servos | Double tonalité montante |
| Échec d'initialisation | Une tonalité grave |

> Les signaux sonores sont pilotés par événements : le signal de démarrage est joué dès la mise sous tension, le signal de prêt quand la communication avec l'Agent est établie, le signal de déverrouillage à la réception d'une commande de contrôle ; si vous alimentez sans lancer la téléopération, vous n'entendrez donc que le signal de démarrage.

## Mécanismes de sécurité

Le firmware intègre les mécanismes de sécurité suivants, sans configuration manuelle :

- Vérification d'identité des servos et de la calibration EEPROM ;
- Handshake de la pose actuelle (0.05 rad) ;
- Limites logicielles ; limitation du pas par commande à 0.25 rad ;
- Watchdog de retour 0.5 s ;
- Redémarrage automatique après 10 s de perte du WiFi.

> Attention pour la démonstration en vol : après une installation tête en bas, revérifiez le sens des articulations, le centre de gravité et le schéma d'alimentation (BEC), et effectuez des tests d'interférences EMI.

## État de validation

### Résultats de test (attendus)

- Les six servos du follower sont tous identifiés (`servo_mask=0x3f`) ;
- `/joint_states` publié à environ 20 Hz ;
- Le pont de contrôle principal publie les commandes à 30 Hz ;
- Le flux caméra `http://<IP>/stream` QVGA est fluide ;
- `/follower_audio/level` publié à 5 Hz, avec une élévation nette du niveau quand on parle ;
- La LED RGB d'état évolue par étapes : démarrage → connexion réseau → prêt → déverrouillé ;
- Le système continue de fonctionner après débranchement du câble USB (l'ESP32 est alimenté indépendamment, le bras follower par l'alimentation externe 12V).

### État de développement

**Validé sur carte (2026-08-19) :**

- Audio `ES8311 ready @24000Hz` (sortie MCLK normale + haut-parleur/microphone opérationnels, correction du MCLK manquant + volume trop faible) ;
- Connexion WiFi + communication micro-ROS (`/joint_states` stable à 20 Hz, `/follower_audio/level` normal) ;
- FPV caméra GC2145 : `/stream` QVGA complet et fluide (correction du conflit I2C / de l'encodage logiciel / de la pile httpd / de la frontière multipart) ;
- Chaîne de téléopération complète (mouvements du bras leader → suivi du bras follower) ;
- **Mappage absolute + redémarrage automatique en cas de perte de l'Agent** : après reconnexion, alignement leader/follower sans dérive ; après Ctrl+C, le bras follower redémarre automatiquement en attente de reconnexion.

**Encore à valider :**

- Scénario de vol : sens d'installation tête en bas, centre de gravité, alimentation (BEC), interférences EMI.

## Structure du projet et firmware avancé

Le contrôleur du bras follower de ce projet est passé d'un ESP32-S3 au module ESP32-NanoCam développé en interne (ESP32-S3 N16R8, caméra DVP / audio ES8311 / RGB WS2812 embarqués).

### Structure des répertoires

```text
firmware/nanocam_soarm/   ESP32-NanoCam 从臂固件 (PlatformIO)
  ├─ boards/nano_cam.json 自研板卡定义 (16MB Flash / 8MB Octal PSRAM)
  ├─ src/                 固件源码 (micro-ROS 遥操作 + 摄像头 + 音频 + RGB)
  ├─ lib/microros/        micro-ROS 静态库 (xtensa-lx7)
  └─ lib/scservo/         SCServo 舵机库 (本地化, 无网络依赖)
tools/                    PC 端脚本 (wireless_teleoperate.py 遥操作桥, follower_camera.py FPV 接收)
start_soarm_demo.sh       一键启动脚本 (网络/Agent/标定预检 + 遥操作)
cali/                     主臂/从臂标定文件
docs/                     项目进度与实验记录 + 硬件参考 (docs/reference/)
```

### Différences avec la version antérieure

| Élément | Ce projet (ESP32-NanoCam) |
|---|---|
| Définition de carte | `boards/nano_cam.json` personnalisée (16MB Flash / 8MB Octal PSRAM, qio_opi) |
| Bus de servos | Serial1/UART1, TX=20/RX=19 (UART0 occupé par le débogage CH340K) |
| Port série de débogage | UART0 (43/44) → CH340K → USB-C |
| Caméra | NanoCam DVP GC2145 (GPIO1~14 + 41/42), XCLK 24MHz |
| Audio | ES8311 + microphone AP2718AT + haut-parleur NS4150B (nouveau) |
| RGB | LED d'état WS2812 (nouveau) |
| Bibliothèque micro-ROS | xtensa-lx7 — le NanoCam étant aussi un ESP32-S3, la version S3 est compatible |
| Scripts côté PC | Inchangés (tools/, start_soarm_demo.sh sont indépendants du matériel) |

### Chemin des en-têtes micro-ROS et build_flags

L'arborescence des en-têtes micro-ROS est plate (`include/<pkg>/<header>.h`) ; ne conservez que le chemin racine `-Ilib/microros/include`. **N'ajoutez pas** de chemins par paquet du type `-Ilib/microros/include/<pkg>/` — cela ferait résoudre `<string.h>` vers `rosidl_runtime_c/string.h` et le `<Client.h>` de la bibliothèque WiFi vers `rcl/Client.h`, provoquant un échec de compilation.

### Reconstruire libmicroros.a (ESP32-S3 / xtensa-lx7)

> Le projet fournit déjà la bibliothèque statique pour ESP32-S3 dans `firmware/nanocam_soarm/lib/microros/` (le NanoCam étant un ESP32-S3, la bibliothèque est compatible). **Passez cette section pour un usage normal.** La reconstruction n'est nécessaire que si vous devez personnaliser la configuration micro-ROS (types de messages, QoS, pool mémoire, etc.) — le développement quotidien n'exige pas de recompiler `libmicroros.a`.

**Méthode A : constructeur Docker officiel (recommandé, exécutable sur n'importe quelle machine)**

Le script de génération de la bibliothèque officielle micro-ROS `micro_ros_arduino` inclut une **cible esp32s3** :

```bash
git clone -b humble https://github.com/micro-ROS/micro_ros_arduino.git
cd micro_ros_arduino
docker pull microros/micro_ros_static_library_builder:humble
docker run -it --rm -v $(pwd):/project \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

Les fichiers produits se trouvent dans `src/esp32s3/libmicroros.a`, les en-têtes dans les répertoires de chaque paquet sous `src/` :

```bash
cp src/esp32s3/libmicroros.a <工程>/firmware/nanocam_soarm/lib/microros/
# 头文件整体替换(保留该目录下的 default_transport.cpp / wifi_transport.cpp /
# micro_ros_arduino.h 三个自定义文件)
rsync -a src/* <工程>/firmware/nanocam_soarm/lib/microros/include/ \
  --exclude esp32s3 --exclude '*.cpp' --exclude micro_ros_arduino.h
```

**À propos de la chaîne d'outils** : la section esp32s3 du script officiel compile par défaut avec la chaîne d'outils `xtensa-esp32-elf` (LX6) ; le jeu d'instructions LX6/LX7 est compatible pour du code C ordinaire, donc exécutable. La `libmicroros.a` fournie avec ce projet a été compilée avec la **chaîne d'outils LX7 authentique** (`xtensa-esp32s3-elf` gcc 8.4.0, identique à la version intégrée à PlatformIO). Méthode : téléchargez `xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-linux-amd64.tar.gz` (Espressif crosstool-NG releases), décompressez, remplacez `TOOLCHAIN_PREFIX` de la section esp32s3 dans `library_generation.sh` par `/uros_ws/xtensa-esp32s3-elf/bin/xtensa-esp32s3-elf-`, puis montez-le dans le conteneur et relancez :

```bash
docker run --platform linux/amd64 -it --rm \
  -v $(pwd):/project \
  -v <解压目录>/xtensa-esp32s3-elf:/uros_ws/xtensa-esp32s3-elf \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

> Attention : sur Apple Silicon, `--platform linux/amd64` est obligatoire (la chaîne d'outils esp32 intégrée à l'image est un binaire x86_64, inexécutable dans un conteneur arm64).

**Méthode B : Ubuntu 22.04 + ROS 2 Humble + chaîne d'outils PlatformIO**

1. Assurez-vous que PlatformIO a déjà téléchargé la chaîne d'outils S3 (une exécution de `pio run` dans le répertoire du firmware suffit) :

   ```bash
   ls ~/.platformio/packages/toolchain-xtensa-esp32s3/bin/xtensa-esp32s3-elf-gcc
   ls ~/.platformio/packages/framework-arduinoespressif32/tools/sdk/esp32s3
   ```

2. Récupérez les sources micro-ROS avec micro_ros_setup (même disposition que `/tmp/firmware/mcu_ws` de `build_microros.sh`) :

   ```bash
   mkdir -p /tmp/firmware && cd /tmp/firmware
   git clone -b humble https://github.com/micro-ROS/micro_ros_setup.git src/micro_ros_setup
   # 安装 micro_ros_setup 依赖后:
   source /opt/ros/humble/setup.bash
   colcon build && source install/local_setup.bash
   ros2 run micro_ros_setup create_firmware_ws.sh generate_lib
   ```

3. Exécutez le script de compilation S3 de ce projet :

   ```bash
   cd <工程>/firmware/nanocam_soarm
   chmod +x build_microros_s3.sh
   ./build_microros_s3.sh
   ```

   Le script remplace déjà riscv32 → xtensa-esp32s3, `-march=rv32imc` → `-mlongcalls`, SDK `esp32c3` → SDK `esp32s3`. Copiez les fichiers produits dans le projet en suivant les indications à la fin du script.

### Références

- Documentation de référence matérielle du NanoCam (schémas/specifications/définitions de broches/pilote ES8311) : répertoire `docs/reference/` du dépôt
- [micro-ROS](https://micro.ros.org/) / [micro_ros_arduino](https://github.com/micro-ROS/micro_ros_arduino)
- [LeRobot](https://github.com/huggingface/lerobot)

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
