---
title: Tutoriel d'utilisation de l'outil de calibration des servos de la série SoARM
description: "Outil de calibration d'usine FTServo et de calibration LeRobot destiné aux bras robotiques de la série SoARM 10X : calibration médiane."
---

# Tutoriel d'utilisation de l'outil de calibration des servos de la série SoARM

> **[Acheter en boutique](https://www.juxitech.com/fr/products/so-arm101-developers-kit)**


**L'outil de calibration de la série SoARM** est une boîte à outils de calibration d'usine des servos FTServo et de calibration LeRobot conçue pour les bras robotiques de la série SoARM 10X (comme le [kit de développement SO-ARM101](/fr/products/so-arm101)). Son interface graphique permet d'effectuer la calibration médiane des servos, le contrôle individuel des servos, la lecture/écriture des paramètres, la sauvegarde/restauration des paramètres xdat et la téléopération synchronisée à double port, et de générer des fichiers de calibration JSON au format LeRobot. Pour l'assemblage du bras robotique et l'installation des servos, consultez d'abord le [Guide de montage du bras robotique Lerobot](./SO-ARM101-Assembly.md).

Cet outil est une adaptation et une amélioration du projet [Seeed_RoboController de Seeed Studio](https://github.com/Seeed-Studio), publié à l'origine sous licence MIT. Tout en conservant les fonctionnalités essentielles du projet d'origine, ce projet a remanié l'interface graphique et ajouté le débogueur FT, la sauvegarde/restauration des paramètres xdat, la compatibilité multiplateforme et d'autres fonctions d'amélioration.

## Remarque de compatibilité

> ⚠️ **Cet outil ne prend actuellement en charge que les servos Feetech (série STS3215)**. La table des registres, le format des paramètres xdat et la table des débits sont conçus pour la série STS3215 de Feetech ; la compatibilité avec les servos d'autres marques/modèles n'est pas garantie.

## Fonctionnalités

| Fonctionnalité | Description |
| ---- | ---- |
| Détection automatique du port | Identification intelligente des ports série USB, filtrage automatique des périphériques virtuels |
| Compatibilité multiplateforme | Compatible avec Windows / Ubuntu / macOS |
| Synchronisation à double port | Les deux ports série (gauche et droit) fonctionnent indépendamment, avec prise en charge de la téléopération synchronisée maître-esclave à double port |
| Bascule chinois / anglais | Bascule de la langue de l'interface (chinois / anglais) en un clic, choix mémorisé automatiquement |
| Calibration médiane | Grave la position actuelle du servo comme position médiane 2048 (persistée dans l'EEPROM) |
| Test du point médian | Active le couple et déplace les servos au point médian pour valider le résultat de la calibration |
| Désactivation du couple | Coupe en un clic le couple de tous les servos, pour faciliter le réglage manuel |
| Scan automatique | Détection automatique de tous les servos en ligne dans la plage d'ID 1–20 |
| Contrôle individuel des servos | Contrôle en temps réel, au moyen d'un curseur, de la position et de l'interrupteur de couple d'un servo individuel |
| Débogueur FT | Connexion série, scan, lecture/écriture des paramètres, contrôle de position, modification du débit, rétablissement d'usine, sauvegarde des paramètres xdat |
| Paramètres xdat | Enregistrer les paramètres EEPROM du servo actuel / ouvrir une sauvegarde pour la restaurer |
| Calibration LeRobot | Générer un fichier de calibration JSON au format LeRobot |
| Déplacement au point médian selon le fichier de calibration | Déplacer le bras robotique au point médian à partir du fichier de calibration |

## Présentation de l'interface

Le programme principal comporte trois onglets :

```
┌─────────────────────────────────────────────────────────────┐
│  SoARM 系列校准工具         [串口1▾] [串口2▾] [🔄]  [🎮遥控][EN]│  ← 顶栏
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┬──────────────────────────────┐ │
│  │ 串口1 - 舵机标定        │ 串口2 - 舵机标定            │ │
│  │  [🔴未连接] 当前舵机:…   │  [🔴未连接] 当前舵机:…      │ │
│  │  舵机1~6 状态表格        │  舵机1~6 状态表格           │ │
│  │  [中位校准][中位测试]…   │  [中位校准][中位测试]…      │ │
│  └─────────────────────────┴──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

- **Barre supérieure** : titre de l'application, listes déroulantes de sélection des ports série, bouton d'actualisation, bouton de téléopération, bouton de changement de langue.
- **🦾 Onglet 1 – Calibration des servos** : opérations rapides des panneaux gauche et droit (calibration médiane, test du point médian, désactivation du couple) et état en temps réel.
- **🎚️ Onglet 2 – Contrôle individuel des servos** : réglage fin de la position de chaque servo en ligne au moyen d'un curseur, activation/désactivation du couple.
- **🔬 Onglet 3 – Débogueur FT** : connexion série, scan, lecture/écriture des paramètres (56 registres), contrôle de position, débit/rétablissement d'usine, sauvegarde et restauration des paramètres xdat.

## Installation et démarrage

Configuration requise :

| Dépendance | Version | Description |
| ---- | ---- | ---- |
| Python | >= 3.8 | 3.10+ recommandé, à télécharger depuis [python.org](https://www.python.org/downloads/) |
| PySide6 | >= 6.0 | Framework GUI |
| pyserial | >= 3.5 | Communication série |
| Système | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+ prend en charge Apple Silicon / Intel |

Connexion matérielle : reliez la carte de commande du bras robotique à l'aide d'un adaptateur USB-série (p. ex. CH340 / CP2102) et alimentez les servos (version standard : DC 5V 5A recommandé ; version Pro : DC 12V 5A recommandé).

### Windows

1. Installez [Python 3.10+](https://www.python.org/downloads/) (veillez à cocher **Add Python to PATH** lors de l'installation, sinon la commande `python` est introuvable). Vérifiez l'installation :

```bash
python --version
```

2. Créez un environnement virtuel et installez les dépendances :

```bash
cd Juxi_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

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

> **Notez le numéro COM**, puis sélectionnez-le dans la barre supérieure après le démarrage ; vous pouvez aussi spécifier le port manuellement (en cas d'occupation du port série) :

```bash
python -m src.gui.factory_calibration_tool --port1 COM3 --port2 COM4
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
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

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
python -m src.gui.factory_calibration_tool --port1 /dev/ttyUSB0 --port2 /dev/ttyUSB1
```

> Si un seul port série est disponible, l'outil désactive automatiquement le second port.

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
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

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
python -m src.gui.factory_calibration_tool --port1 /dev/cu.usbserial-0001 --port2 /dev/cu.usbmodem141101
```

4. Pilotes USB : macOS intègre les pilotes de la plupart des puces courantes (CH340, CP2102, FTDI), avec reconnaissance immédiate. Si le périphérique n'est pas reconnu :

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340** : les lots plus anciens nécessitent l'installation du pilote officiel WCH ;
- en général, il suffit de voir le périphérique avec `ls /dev/cu.*`.

5. Conseils d'utilisation :
   - **Le nom du port série change** : le nom `cu.*` peut varier selon le port USB utilisé lors du branchement ; il suffit de le sélectionner dans la liste déroulante de la barre supérieure à chaque démarrage.
   - **Économie d'énergie** : macOS peut se mettre en veille et interrompre la liaison série ; pendant l'utilisation, maintenez l'ordinateur éveillé ou augmentez le délai de mise en veille.
   - **Autorisations de confidentialité** : au premier lancement, si le message « accès aux disques amovibles » apparaît, cliquez sur Autoriser.

## Étapes d'utilisation

### 1. Connexion et identification des servos

1. Reliez la carte de commande du bras robotique via un adaptateur USB-série et alimentez les servos.
2. Lancez l'interface graphique et sélectionnez le port correspondant dans la liste déroulante de la barre supérieure (ou cliquez sur `🔄` pour actualiser).
3. Le panneau affiche `🟢 已连接` en haut et détecte automatiquement les servos en ligne dans la plage d'ID 1–20 (généralement 1–6).

> Si un message indique que le port série est occupé, vérifiez qu'aucun autre programme (moniteur de port série, outil précédent non fermé) n'utilise ce port.

### 2. Calibration médiane (définir la position actuelle sur 2048)

> Avant la calibration, positionnez physiquement le bras robotique de sorte que chaque articulation se trouve dans la position « zéro / médiane » souhaitée.

1. Cliquez sur le bouton **Calibration médiane du port X** du panneau.
2. Le programme désactive d'abord le couple des servos, puis vous invite à les ajuster manuellement jusqu'à la position médiane souhaitée.
3. Après confirmation, le programme effectue pour chaque servo : déverrouillage de l'EEPROM → écriture de la commande de calibration (valeur 128 à l'adresse 40) → reverrouillage de l'EEPROM.
4. Après la calibration, vous pouvez vérifier avec le « test du point médian » : si les servos restent en place (très petit déplacement), la calibration a réussi.

### 3. Test du point médian

1. Cliquez sur **Test du point médian du port X**.
2. Le programme active le couple et déplace tous les servos sur la position 2048.
3. Si les servos ne bougent presque pas de leur position actuelle, la calibration est correcte ; s'ils se déplacent fortement, la valeur de calibration n'est pas fiable et doit être refaite.

### 4. Désactivation du couple (réglage manuel)

- Cliquez sur **Désactivation du couple du port X** pour couper le couple de tous les servos de ce port ; ils peuvent alors être tournés librement à la main.
- Pour un servo individuel, le couple peut être activé/désactivé séparément dans la page **Contrôle individuel des servos**, via l'interrupteur situé sous le curseur.

### 5. Contrôle individuel des servos (onglet 2)

1. Dans la page **🎚️ Contrôle individuel des servos**, chaque servo en ligne dispose d'un curseur de position et d'un interrupteur de couple.
2. **Faites glisser le curseur → relâchez-le** : le servo se déplace vers la position cible.
3. L'interrupteur de couple situé sous le curseur permet d'activer / couper individuellement le couple de ce servo.

### 6. Débogueur FT (lecture/écriture des paramètres et contrôle de position)

Dans la page **🔬 Débogueur FT** :

1. **Connexion série** : sélectionnez le port et le débit (1M par défaut) ; après la connexion, cliquez sur **Scanner les servos** pour détecter les servos en ligne.
2. **Lecture des paramètres** : lit tous les registres (EEPROM + SRAM).
3. **Tableau des paramètres** : affiche les 56 registres en 5 colonnes ; sélectionner une ligne renseigne automatiquement l'« adresse d'écriture ».
4. **Contrôle de position** : définissez la position cible / la vitesse puis exécutez ; une fois le déplacement terminé, le programme invite à couper le couple.
5. La modification du débit, le rétablissement des paramètres d'usine et la sauvegarde/restauration des paramètres xdat sont décrits dans les sections suivantes.

### 7. Modifier l'ID d'un servo

1. Ouvrez la page **🔬 Débogueur FT**, connectez le port série et scannez les servos.
2. Sélectionnez le servo cible, modifiez dans le tableau des paramètres la valeur de l'« ID du servo » (adresse 0x05), puis cliquez sur écrire.
3. Le programme exécute : déverrouillage → écriture à l'adresse 5 → vérification du nouvel ID → reverrouillage.

> ⚠️ Avant de modifier l'ID, assurez-vous que ce servo est le seul présent sur le bus, afin d'éviter tout conflit d'ID.

### 8. Modification du débit / rétablissement des paramètres d'usine

- **Modification du débit** : dans la zone « Débit / Rétablissement d'usine » de la page Débogueur FT, sélectionnez le nouveau débit (38400 – 1000000 bps) puis validez. Après l'écriture, le débit du port série est automatiquement commuté et vérifié par ping ; en cas d'échec, l'ancien débit est restauré automatiquement.
- **Rétablissement des paramètres d'usine** : le servo revient aux valeurs d'usine par défaut (ID=1, débit=1000000) et doit être rescanné ensuite.

### 9. Sauvegarde et restauration des paramètres xdat

Dans la zone « Paramètres xdat (sauvegarde EEPROM uniquement) » de la page Débogueur FT :

1. **💾 Enregistrer le servo actuel** : enregistre les paramètres EEPROM du servo sélectionné dans un fichier xdat (sauvegarde).
2. Après avoir modifié librement les paramètres du servo, pour restaurer :
3. **📂 Ouvrir un xdat** : charge le fichier de sauvegarde.
4. **📤 Restaurer les paramètres sur le servo** : réécrit la sauvegarde dans l'EEPROM du servo actuel.

### 10. Téléopération synchronisée à double port

> ⚠️ **Sens du flux : le port série 1 contrôle le port série 2**. Le port série 1 (maître) ne fait que lire les angles des servos ; le port série 2 (esclave) est commandé en synchronisation.

1. Cliquez sur **🎮 Téléopération** dans la barre supérieure (le port série 1 lit les angles → le port série 2 commande en synchronisation les servos de même ID).
2. Les ID des servos des deux ports doivent être identiques ; seuls les servos communs aux deux ports sont synchronisés.
3. Cliquez à nouveau sur le même bouton pour arrêter ; les threads de scan des panneaux gauche et droit reprennent ensuite automatiquement.

### 11. Calibration LeRobot (ligne de commande)

```bash
# 校准从动臂（保存到 ~/.cache/huggingface/lerobot/calibration/robots/so_follower/）
python -m src.tools.lerobot_calibrate --arm-type follower

# 校准领导臂
python -m src.tools.lerobot_calibrate --arm-type leader
```

Déroulement : désactiver le couple des servos → amener chaque articulation au point médian pour enregistrer `homing_offset` → faire tourner lentement sur toute la course pour enregistrer `range_min/max` (`wrist_roll` est une articulation à rotation continue, plage fixe `[0,4095]`) → enregistrer le fichier JSON.

Exécuter le déplacement au point médian à partir du fichier de calibration :

```bash
python -m src.tools.run_calibration_middle <校准文件.json> --mode zero
```

L'installation de l'environnement LeRobot et le processus de collecte de données sont détaillés dans le [tutoriel du bras robotique LeRobot](./SO-ARM101-Tutorial.md).

## Outils en ligne de commande

En plus de l'interface graphique, l'outil fournit les entrées en ligne de commande suivantes (sans GUI) :

```bash
# 扫描舵机
python -m src.tools.scan_id

# 舵机快速中位校准
python -m src.tools.servo_quick_calibration

# 舵机中位测试
python -m src.tools.servo_center_test

# 失能全部舵机
python -m src.tools.servo_disable

# LeRobot 风格校准
python -m src.tools.lerobot_calibrate

# LeRobot 风格校准（指定串口）
python -m src.tools.lerobot_calibrate /dev/ttyACM0

# LeRobot 风格校准（指定串口，macOS）
python -m src.tools.lerobot_calibrate /dev/cu.usbserial-0001

# 双端口同步遥控
python -m src.tools.servo_remote_control
```

## Remarques

1. **La sécurité avant tout** : la calibration médiane écrit de façon persistante dans l'EEPROM. Avant de calibrer, vérifiez que l'alimentation est stable et que le bras robotique ne risque pas de heurter une personne ou un objet.
2. **Alimentation** : version standard du SoARM 101 : DC 5V 5A recommandé ; version Pro : DC 12V 5A recommandé. Une alimentation insuffisante entraîne des pertes de pas ou des échecs de communication des servos.
3. **Exclusivité du port série** : sous Windows, le port série est réservé au programme ; un même port ne peut pas être occupé simultanément par le thread de scan de l'interface et le sous-processus de calibration. L'outil arrête automatiquement le thread de scan et ferme l'ancien processus avant d'agir ; évitez de cliquer plusieurs fois manuellement.
4. **Autorisations des ports série sous Linux** : pour accéder à `/dev/ttyUSB*` / `/dev/ttyACM*`, ajoutez l'utilisateur au groupe `dialout` (voir la section « Linux » ci-dessus).
5. **Nommage des ports série sous macOS** : utilisez `/dev/cu.*` (non bloquant) plutôt que `/dev/tty.*` (bloquant, risque de blocage) ; voir la section « macOS » ci-dessus.
6. **Branchement à chaud** : après le débranchement de l'USB, le programme tente de se reconnecter automatiquement ; après rebranchement, cliquez sur `🔄` pour actualiser la liste des ports.
7. **Protection contre la surchauffe / la surtension** : le programme surveille la tension et la température (alerte au-delà de 60°C). Si la température des servos reste élevée, arrêtez-les pour les laisser refroidir.
8. **La calibration médiane est irréversible** : une fois écrite, l'offset d'origine est écrasé et ne peut pas être annulé. Il est conseillé de noter la position d'origine avant de calibrer.
9. **Risques liés à la modification de l'ID** : en cas d'échec d'écriture ou de vérification, le programme signale une erreur et reprend le scan, mais dans des cas extrêmes le servo peut devenir « injoignable ». En cas de perte de contact, essayez le « rétablissement des paramètres d'usine » (l'ID revient à 1 après réinitialisation).
10. **Problèmes d'encodage** : si des emojis s'affichent de façon illisible dans la console Windows, définissez `PYTHONIOENCODING=utf-8` avant de lancer les outils en ligne de commande. Sous Linux / macOS, l'UTF-8 étant natif, ce problème est généralement absent.

## Dépannage

| Symptôme | Cause possible | Solution |
| ---- | -------- | -------- |
| Impossible d'ouvrir le port série / port occupé | Occupé par un autre programme | Fermez les programmes tels que le moniteur de port série, ou changez de port et redémarrez l'outil |
| PermissionError à l'ouverture du port série sous Windows | Un autre processus occupe ce port COM | Assurez-vous qu'aucun autre processus n'occupe ce port COM |
| Aucun servo détecté lors du scan | Alimentation insuffisante / câblage incorrect / débit inadapté | Vérifiez l'alimentation et le câblage ; confirmez que les servos sont réglés sur le débit 1M |
| Les servos partent dans tous les sens après la calibration médiane | Position non préparée avant la calibration | Refaites la séquence « désactivation → positionnement manuel → calibration médiane » |
| Montée en température trop rapide | Charge excessive ou rotor bloqué | Vérifiez un éventuel point dur mécanique ; réduisez la vitesse / l'accélération |
| Servo introuvable après modification de l'ID | Conflit d'ID ou échec d'écriture | Rétablissez les paramètres d'usine et relancez le scan |
| Téléopération désynchronisée | ID incohérents entre les deux ports | Vérifiez que les servos de même ID sont en ligne sur les ports maître et esclave |
| Port série introuvable sous Windows | Pilote manquant | Vérifiez le pilote dans le Gestionnaire de périphériques ; changez de port USB ; installez le pilote CH340 |
| Port série introuvable sous Linux | Périphérique non reconnu | `ls /dev/ttyUSB* /dev/ttyACM*` ; `lsusb` pour confirmer le périphérique |
| Permission denied: /dev/ttyUSB0 | Utilisateur absent du groupe dialout | Exécutez `sudo usermod -a -G dialout $USER` puis reconnectez-vous ; ou `sudo chmod 666 /dev/ttyUSB0` (temporaire) |
| Le nom du périphérique change sous Linux | L'ordre de branchement modifie la numérotation ttyUSB | Fixez le nom avec une règle udev (voir la section « Linux » ci-dessus) ou sélectionnez le port à chaque démarrage |
| Sous macOS, le port `tty.` se bloque | Nom de périphérique bloquant utilisé | Utilisez un périphérique avec le préfixe `cu.` |
| Périphérique introuvable sous macOS | Périphérique non reconnu | `ls /dev/cu.*` ; rebranchez le câble ; vérifiez avec `system_profiler SPUSBDataType` |
| Problème de permissions sous macOS | Contrôle d'accès du système | Aucune autorisation supplémentaire n'est généralement requise ; si une demande d'accès apparaît, autorisez l'accès au terminal |
| Interface en chinois vide | Polices chinoises manquantes | Sous Windows, Microsoft YaHei par défaut (installez une police chinoise en cas d'anomalie) ; sous Linux, installez `fonts-noto-cjk` ; sous macOS, PingFang par défaut (installez Noto Sans CJK en cas d'anomalie) |
| Emojis affichés en carrés | Police emoji manquante | Installez `fonts-noto-color-emoji` |
| Échec de l'installation via pip | Python système protégé (externally managed environment) | Utilisez un environnement virtuel ; ou `pip install --break-system-packages -r requirements.txt` |
| Le programme ne démarre pas | Dépendances manquantes ou versions incompatibles | Confirmez la version avec `python3 --version` ; vérifiez les dépendances avec `pip list` |
| Échec de l'activation de l'environnement virtuel sous macOS | Mauvais script d'activation utilisé | Utilisez `source .venv/bin/activate` (et non `.bat`) |
| Erreur de compilation sous macOS Apple Silicon | Ancien Python utilisant Rosetta | Utilisez Python 3.10+ (prise en charge native d'Apple Silicon) |

## Structure des répertoires

```
Juxi_ServoController/
├── docs/                    # 分系统教程
│   ├── Windows教程.md
│   ├── Linux教程.md
│   └── macOS教程.md
├── src/
│   ├── gui/                  # PySide6 图形界面
│   │   ├── factory_calibration_tool.py   # 主工具（双串口标定 + 遥控 + 语言切换）
│   │   ├── ft_debugger.py                # FT 调试器（参数读写 / xdat 备份）
│   │   ├── calibration_wizard.py         # LeRobot 校准向导
│   │   ├── theme_utils.py                # 浅色主题
│   │   └── language_dialog.py            # 语言选择对话框
│   ├── tools/                # 命令行工具
│   ├── xdat_utils.py         # xdat 参数文件读写
│   ├── i18n*.py / i18n_translations/     # 中英文国际化
│   ├── port_utils.py         # 串口检测
│   └── calibration_manager.py# LeRobot 校准文件管理
├── scservo_sdk/              # FTServo 舵机通信 SDK
├── requirements.txt
└── setup.py                  # 环境检查脚本
```

Le dépôt de cet outil est composé des modules `src/gui` (interface graphique PySide6), `src/tools` (outils en ligne de commande), `scservo_sdk` (SDK de communication des servos FTServo) et `setup.py` (script de vérification de l'environnement).

<RelatedProducts slugs="so-arm101,servo-driver-board" />
