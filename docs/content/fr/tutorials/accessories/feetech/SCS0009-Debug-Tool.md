---
title: Tutoriel d'utilisation de l'outil de débogage du servo SCS0009
description: "Outil de débogage FTServo conçu pour le servo Feetech SCS0009 (retour par potentiomètre, résolution 10 bits 0–1023) : connexion série, scan des servos, lecture/écriture des paramètres des 44 registres, contrôle de position et sauvegarde/restauration des paramètres xdat."
---

# Tutoriel d'utilisation de l'outil de débogage du servo SCS0009

> **[Acheter en boutique](https://www.juxitech.com/fr/products/feetech-scs0009-serial-bus-servo)**


**L'outil de débogage du servo SCS0009** est un outil de débogage FTServo spécialement conçu pour le servo SCS0009 parmi les [servos à bus Feetech](/fr/products/feetech-servo) (retour par potentiomètre, résolution 10 bits 0–1023). Son interface graphique permet d'effectuer la connexion série, le scan des servos, la lecture/écriture des paramètres, le contrôle de position, la modification du débit, le rétablissement des paramètres d'usine et la sauvegarde/restauration des paramètres xdat.

Cet outil est développé et maintenu par JUXI_Technology, publié sous licence MIT. Le débogueur FT, la sauvegarde/restauration des paramètres xdat, la compatibilité multiplateforme et d'autres fonctions sont des implémentations propres au projet.

## Remarque de compatibilité

> ⚠️ **Cet outil ne prend actuellement en charge que le servo Feetech SCS0009 (série SCS, retour de position par potentiomètre, résolution 10 bits 0–1023)**. La table des registres, le format des paramètres xdat et la table des débits sont conçus pour le SCS0009 de Feetech ; la compatibilité avec les servos d'autres marques/modèles n'est pas garantie.

## Fonctionnalités

| Fonctionnalité | Description |
| ---- | ---- |
| Détection automatique du port | Identification intelligente des ports série USB, filtrage automatique des périphériques virtuels |
| Compatibilité multiplateforme | Compatible avec Windows / Ubuntu / macOS |
| Bascule chinois / anglais | Bascule de la langue de l'interface (chinois / anglais) en un clic, choix mémorisé automatiquement |
| Connexion série | Sélection manuelle/automatique du port série, 8 débits (38400~1M) |
| Scan des servos | Détection automatique des servos en ligne (ID 1–254), affichage en temps réel |
| Lecture des paramètres | Lecture des 44 registres (EEPROM + SRAM) |
| Tableau des paramètres | Affichage en 5 colonnes (adresse / registre / valeur / zone mémoire / lecture-écriture), sélection avec liaison automatique |
| Contrôle de position | Contrôle de la position cible / de la vitesse, invite à couper le couple une fois le déplacement terminé |
| Modification du débit | Modification du débit du servo, restauration automatique en cas d'échec |
| Rétablissement d'usine | Restauration des paramètres d'usine par défaut en un clic |
| Paramètres xdat | Enregistrer les paramètres EEPROM du servo actuel / ouvrir une sauvegarde pour la restaurer |

## Présentation de l'interface

Le programme principal adopte une mise en page à panneau unique (débogueur FT) ; une barre de défilement apparaît automatiquement si la hauteur de la fenêtre est insuffisante, et l'affichage s'adapte en plein écran :

```
┌─────────────────────────────────────────────────────────────┐
│  SCS0009 舵机调试工具                     [EN / English]     │  ← 顶栏
├─────────────────────────────────────────────────────────────┤
│  🔌 串口连接   [端口▾][🔄][波特率▾][连接] [🔴未连接]         │
│  🎯 舵机      [🔍扫描][舵机▾][读取参数][读取状态]            │
│               ┌ 扫描到的舵机列表 ┐                           │
│  📋 参数表    地址|寄存器|值|存储区域|读写  (44 个寄存器)      │
│  🎯 位置控制  目标位置|速度|移动|力矩开|力矩关 | 状态         │
│  🔧 波特率/恢复出厂  新波特率|修改波特率|恢复出厂            │
│  📁 xdat 参数(仅保存EEPROM) 保存当前舵机|打开xdat|恢复参数    │
│  📜 日志                                                      │
└─────────────────────────────────────────────────────────────┘
```

- **Barre supérieure** : titre de l'application, bouton de changement de langue.
- **🔌 Connexion série** : sélection du port, du débit, connexion/déconnexion.
- **🎯 Servo** : scan, sélection du servo, lecture des paramètres/de l'état.
- **📋 Tableau des paramètres** : les 44 registres affichés en 5 colonnes (adresse / registre / valeur / zone mémoire / lecture-écriture) ; la sélection renseigne automatiquement l'adresse d'écriture.
- **🎯 Contrôle de position** : position cible / vitesse ; une fois le déplacement terminé, la barre d'état invite à couper le couple.
- **🔧 Débit / Rétablissement d'usine** : modification du débit (restauration en cas d'échec), rétablissement des paramètres d'usine.
- **📁 Paramètres xdat (sauvegarde EEPROM uniquement)** : enregistrer les paramètres du servo actuel, ouvrir une sauvegarde, restaurer.

## Installation et démarrage

Configuration requise :

| Dépendance | Version | Description |
| ---- | ---- | ---- |
| Python | >= 3.8 | 3.10+ recommandé, à télécharger depuis [python.org](https://www.python.org/downloads/) |
| PySide6 | >= 6.0 | Framework GUI |
| pyserial | >= 3.5 | Communication série |
| Système | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+ prend en charge Apple Silicon / Intel |

Connexion matérielle : reliez la carte de commande des servos à l'aide d'un adaptateur USB-série (p. ex. CH340 / CP2102) et alimentez les servos (version standard : DC 5V 5A recommandé ; version Pro : DC 12V 5A recommandé).

### Windows

1. Installez [Python 3.10+](https://www.python.org/downloads/) (veillez à cocher **Add Python to PATH** lors de l'installation, sinon la commande `python` est introuvable). Vérifiez l'installation :

```bash
python --version
```

2. Créez un environnement virtuel et installez les dépendances :

```bash
cd SCS0009_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

> ⚠️ **L'environnement virtuel ne doit être créé qu'une seule fois**. Exécuter à nouveau `python -m venv .venv` réinitialise/écrase l'environnement existant (les dépendances installées seront effacées) ; par la suite, il suffit de l'activer avec `activate`.

> Astuce : après l'activation, le préfixe `(.venv)` apparaît dans l'invite de commande.

3. Vérifiez l'environnement et lancez le programme :

```bash
python setup.py
python -m src.gui.factory_calibration_tool
```

Si vous voyez `[OK] 环境检查通过，可以运行项目`, cela signifie que l'environnement est correct.

4. Vérifiez le numéro de port dans le Gestionnaire de périphériques (`Win+X` → Gestionnaire de périphériques), sous « Ports (COM et LPT) » :

```
端口 (COM 和 LPT)
  └─ USB-SERIAL CH340 (COM3)     ← 你的舵机串口
```

> **Notez le numéro COM**, puis sélectionnez-le après le démarrage ; vous pouvez aussi spécifier le port manuellement (en cas d'occupation du port série) :

```bash
python -m src.gui.factory_calibration_tool --port COM3
```

Afficher les ports disponibles :

```bash
python -m src.gui.factory_calibration_tool --list-ports
```

### Linux (Ubuntu / Debian)

1. Installez les polices chinoises et les dépendances (les polices chinoises sont nécessaires pour afficher l'interface en chinois ; la police emoji sert aux icônes telles que ✅⚠️ dans les journaux) :

```bash
sudo apt install python3-venv fonts-noto-cjk fonts-noto-color-emoji
```

2. **⚠️ Ajout de l'autorisation d'accès aux ports série (groupe dialout) [obligatoire]** (sous Linux, un utilisateur ordinaire ne peut pas accéder à `/dev/ttyUSB*` / `/dev/ttyACM*` par défaut) :

```bash
sudo usermod -a -G dialout $USER
# 注销并重新登录后生效
```

Vérification (la sortie doit contenir `dialout`) :

```bash
groups
```

> Si cela ne prend pas effet : redémarrez l'ordinateur ; sur certaines distributions, le nom du groupe est `uucp` (Arch) ou `tty`.

3. Créez un environnement virtuel, installez les dépendances et lancez le programme :

```bash
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **L'environnement virtuel ne doit être créé qu'une seule fois**. Exécuter à nouveau `python3 -m venv .venv` écrase l'environnement existant (les dépendances installées seront effacées) ; par la suite, il suffit d'exécuter `source .venv/bin/activate`.

> Si pip renvoie une erreur « externally managed environment », utilisez plutôt `pip install --break-system-packages -r requirements.txt`, ou passez par un environnement virtuel.

4. Identifiez le périphérique USB-série (après avoir branché l'adaptateur) :

```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Sortie typique :

```
/dev/ttyUSB0   # CH340 / CP2102 / PL2303
/dev/ttyACM0   # 原生 USB 串口（Arduino / ESP32 板载）
```

Afficher les informations détaillées sur le fabricant :

```bash
dmesg | tail -20 | grep -i tty
# 或
lsusb
```

> Avec plusieurs périphériques, l'attribution de `ttyUSB0` / `ttyUSB1` dépend de l'ordre de branchement et peut être instable. Il est recommandé d'utiliser `/dev/ttyACM*` ou de fixer le nom selon le fabricant (voir la section udev ci-dessous).

Spécifiez le port manuellement :

```bash
python -m src.gui.factory_calibration_tool --port /dev/ttyUSB0
```

5. Facultatif : fixez le nom du périphérique avec une règle udev (pour éviter la dérive du numéro après rebranchement). Créez `/etc/udev/rules.d/99-servo.rules` et fixez le nom selon l'ID USB :

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", SYMLINK+="ttyServo"
```

Vous pouvez ensuite accéder au périphérique par son nom fixe avec `ls -l /dev/ttyServo` ; l'ID du fabricant s'obtient avec `lsusb`.

### macOS

1. Installez Python avec Homebrew (pour éviter une version système trop ancienne) :

```bash
# 安装 Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python
```

Vérification :

```bash
python3 --version
```

2. Créez un environnement virtuel, installez les dépendances et lancez le programme (activez avec `source`, et non avec `.bat`) :

```bash
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **L'environnement virtuel ne doit être créé qu'une seule fois**. Exécuter à nouveau `python3 -m venv .venv` écrase l'environnement existant (les dépendances installées seront effacées) ; par la suite, il suffit d'exécuter `source .venv/bin/activate`.

3. **⚠️ Nommage des ports série** : macOS place les périphériques USB-série sous `/dev`, avec **deux conventions de nommage** :

| Préfixe | Signification | Utilisable |
| ---- | ---- | -------- |
| `/dev/tty.usbserial-*` | style modem (bloquant) | risque de blocage, déconseillé |
| `/dev/cu.usbserial-*` | style appel/terminal (**non bloquant**) | ✅ recommandé |

Affichez le nom de votre port série :

```bash
ls /dev/cu.*
```

Sortie typique :

```
/dev/cu.usbserial-0001      # CP2102 / FTDI
/dev/cu.usbmodem141101      # 板载 USB 串口（Arduino / ESP32）
/dev/cu.wchusbserial1420    # CH340
```

> Le programme privilégie automatiquement les périphériques `cu.*` ; pour spécifier manuellement un port, utilisez `cu.` et non `tty.`.

Spécifiez le port manuellement :

```bash
python -m src.gui.factory_calibration_tool --port /dev/cu.usbserial-0001
```

4. Pilotes USB : macOS intègre les pilotes de la plupart des puces courantes (CH340, CP2102, FTDI), avec reconnaissance immédiate. Si le périphérique n'est pas reconnu :

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340** : les lots plus anciens nécessitent l'installation du pilote officiel WCH ;
- en général, il suffit de voir le périphérique avec `ls /dev/cu.*`.

5. Conseils d'utilisation :
   - **Le nom du port série change** : le nom `cu.*` peut varier selon le port USB utilisé lors du branchement ; il suffit de le sélectionner dans la zone « 🔌 Connexion série » à chaque démarrage.
   - **Économie d'énergie** : macOS peut se mettre en veille et interrompre la liaison série ; pendant l'utilisation, maintenez l'ordinateur éveillé ou augmentez le délai de mise en veille.
   - **Autorisations de confidentialité** : au premier lancement, si le message « accès aux disques amovibles » apparaît, cliquez sur Autoriser.

## Étapes d'utilisation

### 1. Connexion et identification des servos

1. Reliez la carte de commande des servos via un adaptateur USB-série et alimentez les servos.
2. Lancez l'interface graphique, sélectionnez le port dans la zone « 🔌 Connexion série » (ou cliquez sur `🔄` pour actualiser) et réglez le débit (1M par défaut).
3. Cliquez sur **Connecter** ; l'état affiche `🟢 已连接`.

> Si un message indique que le port série est occupé, vérifiez qu'aucun autre programme (moniteur de port série, outil précédent non fermé) n'utilise ce port.

### 2. Scan des servos

1. Cliquez sur **🔍 Scanner les servos** pour détecter les servos en ligne dans la plage d'ID 1–254.
2. Les résultats du scan s'affichent en temps réel dans la liste des servos (avec le modèle).
3. Cliquez sur une ligne de la liste pour la reporter automatiquement dans la liste déroulante « Servo ».

### 3. Lecture des paramètres

1. Après avoir sélectionné un servo, cliquez sur **📖 Lire les paramètres** pour lire un par un les 44 registres.
2. Le tableau des paramètres s'affiche en 5 colonnes (adresse / registre / valeur / zone mémoire / lecture-écriture), avec un code couleur pour EPROM / SRAM / DEFAULT.
3. La zone de journal affiche le résultat de lecture de chaque registre et la cause des échecs.

Pour la signification de chaque registre, consultez [Analyse de la table mémoire du servo SCSCL à potentiomètre](./Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis.md).

### 4. Modification des paramètres / écriture

1. Dans le tableau des paramètres, cliquez sur la ligne du registre à modifier → les champs « adresse d'écriture », « longueur » et « valeur » sont automatiquement renseignés.
2. Modifiez la nouvelle valeur dans le champ « valeur », puis cliquez sur **✏️ Écrire**.
3. Le programme exécute : déverrouillage de l'EEPROM → écriture → reverrouillage.
4. Fenêtre de résultat d'écriture : notification verte « ✅ Écriture réussie » en cas de succès, notification rouge « ❌ Échec de l'écriture » (avec la cause) en cas d'échec.

### 5. Modification de l'ID d'un servo

1. Dans le tableau des paramètres, repérez la ligne « ID du servo » (adresse 0x05) et cliquez pour la sélectionner.
2. Modifiez la « valeur » avec le nouvel ID, puis cliquez sur **✏️ Écrire**.
3. Le programme exécute : déverrouillage → écriture à l'adresse 5 → reverrouillage.

> ⚠️ Avant de modifier l'ID, assurez-vous que ce servo est le seul présent sur le bus, afin d'éviter tout conflit d'ID.

### 6. Contrôle de position

1. Dans la zone « 🎯 Contrôle de position », **faites glisser le curseur** pour régler la position cible (0–1023, résolution 10 bits du potentiomètre) ; le champ numérique se met à jour en parallèle. Vous pouvez aussi saisir directement la valeur dans le champ numérique, le curseur suivant alors automatiquement.
2. Cliquez sur **▶ Déplacer** ; le servo commence à se déplacer et la barre d'état affiche « Déplacement en cours... ».
3. Une fois le déplacement terminé, le message « ✅ Déplacement terminé, veuillez couper le couple » s'affiche ; cliquez sur **⏹ Couper le couple**.

### 7. Modification du débit / rétablissement des paramètres d'usine

- **Modification du débit** : dans la zone « 🔧 Débit / Rétablissement d'usine », sélectionnez le nouveau débit (38400 – 1000000 bps) puis cliquez sur **🔧 Modifier le débit**. Après l'écriture, le débit du port série est automatiquement commuté et vérifié par ping ; en cas d'échec, l'ancien débit est restauré automatiquement.
- **Rétablissement des paramètres d'usine** : cliquez sur **🔄 Rétablir les paramètres d'usine** ; le servo revient aux valeurs d'usine par défaut (ID=1, débit=1000000) et doit être rescanné ensuite.

### 8. Sauvegarde et restauration des paramètres xdat

Dans la zone « 📁 Paramètres xdat (sauvegarde EEPROM uniquement) » :

1. **💾 Enregistrer le servo actuel** : enregistre les paramètres EEPROM du servo sélectionné dans un fichier xdat (sauvegarde).
2. Après avoir modifié librement les paramètres du servo, pour restaurer :
3. **📂 Ouvrir un xdat** : charge le fichier de sauvegarde.
4. **📤 Restaurer les paramètres sur le servo** : réécrit la sauvegarde dans l'EEPROM du servo actuel.

## Remarques

1. **La sécurité avant tout** : l'écriture des paramètres est persistée dans l'EEPROM. Avant d'écrire, vérifiez que l'alimentation est stable et que le bras robotique ne risque pas de heurter une personne ou un objet.
2. **Alimentation** : version standard du SoARM 101 : DC 5V 5A recommandé ; version Pro : DC 12V 5A recommandé. Une alimentation insuffisante entraîne des pertes de pas ou des échecs de communication des servos.
3. **Exclusivité du port série** : sous Windows, le port série est réservé au programme et ne peut pas être occupé simultanément par deux programmes. N'utilisez pas cet outil lorsqu'un autre programme (moniteur de port série) a ouvert le même port.
4. **Autorisations des ports série sous Linux** : pour accéder à `/dev/ttyUSB*` / `/dev/ttyACM*`, ajoutez l'utilisateur au groupe `dialout` (voir la section « Linux » ci-dessus).
5. **Nommage des ports série sous macOS** : utilisez `/dev/cu.*` (non bloquant) plutôt que `/dev/tty.*` (bloquant, risque de blocage) ; voir la section « macOS » ci-dessus.
6. **Branchement à chaud** : après le débranchement de l'USB, le programme tente de se reconnecter automatiquement ; après rebranchement, cliquez sur `🔄` pour actualiser la liste des ports.
7. **Protection contre la surchauffe / la surtension** : le programme surveille la tension et la température (alerte au-delà de 60°C). Si la température des servos reste élevée, arrêtez-les pour les laisser refroidir.
8. **L'écriture des paramètres est irréversible** : une fois écrite dans l'EEPROM, l'ancienne valeur est écrasée et ne peut pas être annulée. Il est conseillé de sauvegarder d'abord via « xdat – Enregistrer le servo actuel » avant toute modification.
9. **Risques liés à la modification de l'ID** : en cas d'échec d'écriture ou de vérification, le programme signale une erreur, mais dans des cas extrêmes le servo peut devenir « injoignable ». En cas de perte de contact, essayez le « rétablissement des paramètres d'usine » (l'ID revient à 1 après réinitialisation).
10. **Problèmes d'encodage** : si des emojis s'affichent de façon illisible dans la console Windows, définissez `PYTHONIOENCODING=utf-8` avant de lancer les outils en ligne de commande. Sous Linux / macOS, l'UTF-8 étant natif, ce problème est généralement absent.

## Dépannage

| Symptôme | Cause possible | Solution |
| ---- | -------- | -------- |
| Impossible d'ouvrir le port série / port occupé | Occupé par un autre programme | Fermez les programmes tels que le moniteur de port série, ou changez de port et redémarrez l'outil |
| PermissionError à l'ouverture du port série sous Windows | Un autre processus occupe ce port COM | Assurez-vous qu'aucun autre processus n'occupe ce port COM |
| Aucun servo détecté lors du scan | Alimentation insuffisante / câblage incorrect / débit inadapté | Vérifiez l'alimentation et le câblage ; confirmez que les servos sont réglés sur le débit 1M |
| Échec de la lecture des paramètres | Port série occupé / servo ne répond pas | Fermez les autres programmes ; reconnectez le port série ; vérifiez que l'adresse est correcte |
| Échec de l'écriture | Alimentation du servo insuffisante ou registre cible non accessible en écriture | Vérifiez l'alimentation et la connexion du servo ; confirmez que le registre cible est accessible en écriture |
| Montée en température trop rapide | Charge excessive ou rotor bloqué | Vérifiez un éventuel point dur mécanique ; réduisez la vitesse / l'accélération |
| Servo introuvable après modification de l'ID | Conflit d'ID ou échec d'écriture | Rétablissez les paramètres d'usine et relancez le scan |
| Port série introuvable sous Windows | Pilote manquant | Vérifiez le pilote dans le Gestionnaire de périphériques ; changez de port USB ; installez le pilote CH340 |
| Port série introuvable sous Linux | Périphérique non reconnu | `ls /dev/ttyUSB* /dev/ttyACM*` ; `lsusb` pour confirmer le périphérique |
| Permission denied: /dev/ttyUSB0 | Utilisateur absent du groupe dialout | Exécutez `sudo usermod -a -G dialout $USER` puis reconnectez-vous ; ou `sudo chmod 666 /dev/ttyUSB0` (temporaire) |
| Le nom du périphérique change sous Linux | L'ordre de branchement modifie la numérotation ttyUSB | Fixez le nom avec une règle udev (voir la section « Linux » ci-dessus) ou sélectionnez le port à chaque démarrage |
| Sous macOS, le port `tty.` se bloque | Nom de périphérique bloquant utilisé | Utilisez un périphérique avec le préfixe `cu.` |
| Périphérique introuvable sous macOS | Périphérique non reconnu | `ls /dev/cu.*` ; rebranchez le câble ; vérifiez avec `system_profiler SPUSBDataType` |
| Problème de permissions sous macOS | Contrôle d'accès du système | Aucune autorisation supplémentaire n'est généralement requise ; si une demande d'accès apparaît, autorisez l'accès au terminal |
| Interface en chinois vide | Polices chinoises manquantes | Sous Linux, installez `fonts-noto-cjk` ; sous macOS, installez Noto Sans CJK en cas d'anomalie |
| Emojis affichés en carrés | Police emoji manquante | Installez `fonts-noto-color-emoji` |
| Échec de l'installation via pip | Python système protégé (externally managed environment) | Utilisez un environnement virtuel ; ou `pip install --break-system-packages -r requirements.txt` |
| Le programme ne démarre pas | Dépendances manquantes ou versions incompatibles | Confirmez la version avec `python3 --version` ; vérifiez les dépendances avec `pip list` |
| Échec de l'activation de l'environnement virtuel sous macOS | Mauvais script d'activation utilisé | Utilisez `source .venv/bin/activate` (et non `.bat`) |
| Erreur de compilation sous macOS Apple Silicon | Ancien Python utilisant Rosetta | Utilisez Python 3.10+ (prise en charge native d'Apple Silicon) |

## Structure des répertoires

```
SCS0009_ServoController/
├── docs/                    # 分系统教程（中英文）
│   ├── zh/                  # 中文教程
│   │   ├── Windows教程.md
│   │   ├── Linux教程.md
│   │   └── macOS教程.md
│   └── en/                  # 英文教程
│       ├── Windows.md
│       ├── Linux.md
│       └── macOS.md
├── src/
│   ├── gui/                  # PySide6 图形界面
│   │   ├── factory_calibration_tool.py   # 主窗口（FT 调试器 + 语言切换）
│   │   ├── ft_debugger.py                # FT 调试器面板（参数读写 / xdat 备份）
│   │   ├── theme_utils.py                # 浅色主题
│   │   └── language_dialog.py            # 语言选择对话框
│   ├── xdat_utils.py         # xdat 参数文件读写
│   ├── i18n*.py / i18n_translations/     # 中英文国际化
│   └── port_utils.py         # 串口检测
├── scservo_sdk/              # FTServo 舵机通信 SDK
├── requirements.txt
└── setup.py                  # 环境检查脚本
```

Le dépôt de cet outil est composé des modules `src/gui` (interface graphique PySide6 et débogueur FT), `scservo_sdk` (SDK de communication des servos FTServo) et `setup.py` (script de vérification de l'environnement).

<RelatedProducts slugs="feetech-servo" />
