---
title: "Tutoriel de contrôle d'interface"
description: "Outil de contrôle AmazingHand en GUI Python / ligne de commande : sélection main gauche/droite, installation, calibration, protocole et questions fréquentes."
---

# Tutoriel de contrôle d'interface

## Outil de contrôle Python AmazingHand (compatible main gauche et main droite)

Un outil GUI et en ligne de commande écrit en Python, qui pilote 8 servos Feetech SCS0009 via la carte driver de servos à bus série et anime la main dextre [AmazingHand de Pollen Robotics](https://github.com/pollen-robotics/AmazingHand).

> **Les deux mains sont prises en charge.** Au démarrage, choisissez la main droite (IDs de servos 1-8) ou la main gauche (IDs de servos 11-18) ; --hand permet de sauter la question. La bibliothèque de poses est commune aux deux mains ; chaque main gère dans data/config.yaml ses propres correspondances de servos, décalages de montage et cibles de valeurs brutes. Voir la section « Sélection de la main gauche ou droite ».

![Illustration](../../../../../public/images/tutorials/robot-arms/amazing-hand/interface-control/01.png)

---

## Structure du projet

```text
amazing_hand_gui.py   – GUI 主程序
amazing_hand_cmd.py   – 命令行工具
hand_logic.py         – 共用业务逻辑(不依赖 UI)
pyproject.toml        – 包元数据、依赖、pytest 配置
data/
  config.yaml         – 应用设置(串口、限位、原始值目标)
  hand_config.yaml    – 已保存的手势与序列
docs/
  REQUIREMENTS.md       – 需求与验收标准
  user_manual.md        – 用户手册
  CONFIG_FORMAT.md      – 配置文件格式说明
  scs_servo_protocol.md – SCS0009 寄存器参考
  优化说明.md            – 相对原版的改动说明与原因
  CHANGES.md            – 同一份文档的英文版
tests/
  test_hand_logic.py      – hand_logic 单元测试(155 项)
  test_gui_utils.py       – GUI 工具函数单元测试(51 项)
  test_cmd.py             – CLI 单元测试(42 项)
  test_integration.py     – 集成测试(14 项)
  test_system.py          – 子进程系统测试(22 项)
  test_system_hardware.py – 硬件测试(33 项,需 --hardware)
  test_cmd_hardware.py    – CLI 硬件测试(21 项,需 --hardware)
```

## Prérequis

- Python 3.10 ou version ultérieure (le GUI nécessite Tkinter)
- Une alimentation externe 5 V séparée pour les 8 servos
- Un adaptateur USB vers bus série avec pilote installé

## Installation

Installation recommandée avec pip (lit pyproject.toml) :

```bash
pip install -e .
```

Ou installer directement les dépendances :

```bash
pip install -r requirements.txt
```

Environnement de développement et de test :

```bash
pip install -r requirements-dev.txt
```

---

## Calibration

Le système d'angles des servos, les poses prédéfinies et la position centrale dépendent de la main mécanique concrète. Tous ces paramètres sont regroupés dans data/config.yaml.

### Sélection de la main gauche ou droite

Les servos et la structure mécanique différant entre les deux mains, la sélection se fait avant l'ouverture de l'interface :

```text
  AmazingHand — which hand?
    1 = right hand  (servo IDs 1-8)
    2 = left hand   (servo IDs 11-18)
  Enter 1 or 2 [1]:
  LEFT hand — servo IDs 11-18
    Ring (11, 12)  Middle (13, 14)  Pointer (15, 16)  Thumb (17, 18)
    middle position raw: [571, 451, 571, 451, 571, 451, 571, 451]
```

Sauter la question :

```bash
python amazing_hand_gui.py --hand left
python amazing_hand_cmd.py --pose victory --hand left
```

Sans --hand, la valeur de hand: dans data/config.yaml est utilisée.

**Pourquoi une main ne se résume pas à un autre jeu d'IDs.** Outre la numérotation des servos (main droite 1-8, main gauche 11-18, la numérotation des doigts de la main gauche étant en miroir – annulaire en premier), la main gauche présente deux autres différences mécaniques, que le programme gère automatiquement :

|  | Main droite | Main gauche |
|---|---|---|
| ID de servo | 1-8 | 11-18 |
| Doigt → ID | Index 1,2 / Majeur 3,4 / Annulaire 5,6 / Pouce 7,8 | Annulaire 11,12 / Majeur 13,14 / Index 15,16 / Pouce 17,18 |
| MiddlePos constructeur | [451, 571, …] | [571, 451, …] |
| Décalage de montage | 0° | **−35.16°** (hands.left.angle_offset) |
| Servos d'un même doigt | (a, b) | **(b, a)** (hands.left.mirror_pose) |

Si l'un de ces deux derniers réglages manque, chaque geste est déformé : le décalage de montage décale chaque doigt de 35°, et sans l'inversion des servos d'un même doigt, la direction d'ouverture s'inverse complètement (dans le geste en V, deux doigts se rapprochent tandis que les trois doigts censés se rapprocher s'écartent).

data/hand_config.yaml est **commun aux deux mains** et stocke toujours l'ordre de la main droite ; pour la main gauche, la conversion a lieu à la lecture et est inversée à l'enregistrement.

**Calibrer une nouvelle main.** Prenez les valeurs de hands.left comme modèle, puis vérifiez dans cet ordre :

1. Appuyez sur **Middle position** et vérifiez que la ligne Current (0-1023) affiche les valeurs brutes attendues
1. Appuyez sur **Open All** / **Close All** – la course doit atteindre la butée mécanique sans blocage
1. Essayez une pose d'ouverture (victory s'ouvre en V, greeting rapproche trois doigts)

Quel paramètre ajuster selon le problème :

| Symptôme | Où modifier |
|---|---|
| Lecture de Middle position incorrecte | `hands.<nom>.raw_positions.middle` |
| Direction d'ouverture inversée | `hands.<nom>.mirror_pose` |
| Course insuffisante ou excessive | `hands.<nom>.raw_positions.open / close` |

### Système d'angles

Le GUI et le CLI utilisent tous deux des **valeurs d'angle**, converties par le pilote rustypot en valeurs brutes internes des servos :

```text
raw = 1024 × angle / 300° + 511        (0.29297°/step,原始值范围 0–1023)
```

| Angle | Signification |
|---|---|
| **−35°** | Entièrement ouvert (tendu) |
| **0°** | Position centrale, doigts légèrement fléchis naturellement |
| **+75°** | Entièrement fermé (poing) |

Les servos d'ID paire sont **inversés** par rapport à ceux d'ID impaire, de sorte qu'une seule valeur de pose fait tourner les deux servos d'un même doigt dans des directions opposées. Le programme s'en charge automatiquement ; aucune conversion manuelle n'est nécessaire.

### Limites

```text
limits:
  servo_min: -75      # 任何舵机指令的绝对行程上下限
  servo_max: 75
  base_min: -75       # 开合滑块范围
  base_max: 75
  side_min: -35       # 左右滑块范围
  side_max: 35
```

side_min/side_max contrôlent l'**ouverture latérale**. Comme le programme normalise (u = |side_offset| / |side_min|), **modifier uniquement cette plage ne change pas l'amplitude réelle d'ouverture** ; cela comprime seulement l'échelle du curseur. Pour modifier réellement l'angle d'ouverture des doigts, il faut aussi modifier auto_extremes.

### Cibles de valeurs brutes

Les trois boutons de position globaux amènent les servos à des **valeurs brutes exactes**, sans passer par le modèle d'angle :

```text
raw_positions:              # 下标 0 -> 舵机 ID 1 …… 下标 7 -> 舵机 ID 8
  open:   [260, 760, 260, 760, 260, 760, 260, 760]
  close:  [760, 260, 760, 260, 760, 260, 760, 260]
  middle: [451, 571, 451, 571, 451, 571, 451, 571]
```

- open / close – les deux extrémités de la course mécanique. Mesurées en pilotant individuellement les servos avec l'outil de débogage Feetech du constructeur.
- middle – la **position centrale mécanique calibrée** (c'est-à-dire MiddlePos dans le programme de démonstration Arduino du constructeur). Attention : ce n'est **pas** le point médian entre open et close, mais un écart d'environ **±60 raw (±17,6°)** par rapport à raw 511.

> Ce sont des **valeurs de calibration propres à chaque main**. Le constructeur dit textuellement : *« replace values by your calibration results »*.

**Vérification :** le panneau Servo Feedback comporte une ligne Current (0-1023) qui affiche la position brute en temps réel. Après avoir appuyé sur **Middle position**, cette ligne doit indiquer 451, 571, 451, 571, …

### Récapitulatif des plages de contrôle

| Contrôle | Plage |
|---|---|
| Curseur d'ouverture (vertical) | −75 … +75 |
| Curseur latéral (horizontal) | −35 … +35 |
| Vitesse | 1 (lent) … 6 (rapide) |

La valeur de vitesse est transmise telle quelle aux servos par le pilote en rad/s ; 1–6 correspond donc approximativement à **57–344 °/s**. En charge, la vitesse réelle est d'environ **70 %** de cette valeur – à prendre en compte lors du réglage des délais de séquence.

---

## Lancer le GUI (amazing_hand_gui.py)

Après installation via pip, directement appelable :

```text
amazing-hand-gui
amazing-hand-gui --port /dev/ttyUSB0
```

Ou exécuter directement :

```bash
python amazing_hand_gui.py
python amazing_hand_gui.py --port /dev/ttyUSB0
```

La liste déroulante des ports affiche les ports série **réellement présents** sur la machine (via pyserial en priorité, sinon via le registre Windows), de sorte que les adaptateurs dont le numéro est élevé apparaissent aussi. Le numéro de port peut être saisi directement dans la liste. Si le port par défaut de la configuration n'est pas branché, le GUI démarre automatiquement sur le premier port réel ; pour fixer le port, passer explicitement --port.

### Fonctionnalités

- Contrôle par curseur doigt par doigt de l'ouverture et du mouvement latéral, avec deux modes : **Auto** (ouverture/fermeture + latéral) et **Raw** (contrôle direct de l'angle des deux servos)
- Boutons rapides Open / Close / Center par doigt
- Sélection de vitesse par doigt (1–6), plus une liste déroulante de synchronisation globale de la vitesse
- Raccourcis clavier pour un ajustement fin précis
- **Boutons de position globaux** : Open All, Close All, Center All, Middle position
- Gestion des poses et séquences basée sur data/hand_config.yaml
- Suppression directe des poses enregistrées dans l'interface (bouton 🗑 Delete)
- Courbes de télémétrie des servos en temps réel (position, charge, température, tension)
- Tableau Servo Feedback avec **position brute** en temps réel (0–1023), utilisable pour la vérification de la calibration

### Commandes au clavier

- **1-4** : sélectionner un doigt (Ring = annulaire, Middle = majeur, Pointer = index, Thumb = pouce)
- **Flèches** : déplacer le doigt sélectionné
  - Haut/bas : fermer / ouvrir
  - Gauche/droite : déplacer latéralement
- **Touches de modification** :
  - Aucune : 1° par pas (ajustement fin)
  - Shift : 5° par pas (normal)
  - Ctrl : 10° par pas (rapide)
- **Actions rapides** :
  - Q : fermer complètement le doigt sélectionné
  - E : ouvrir complètement le doigt sélectionné
  - C : recentrer la position latérale

### Boutons globaux

| Bouton | Ouverture/fermeture | Latéral |
|---|---|---|
| ✋ **Open All** | Tous les doigts sur la valeur brute open | Recentrer |
| ✊ **Close All** | Tous les doigts sur la valeur brute close | Recentrer |
| ⊙ **Center All** | **Inchangé** | Recentrer |
| ⊙ **Middle position** | Tous les doigts sur la valeur brute middle | Recentrer |

La liste déroulante **Global Speed** (1–6) applique immédiatement la vitesse choisie à tous les contrôles de doigts et synchronise l'affichage des curseurs de chaque doigt.

Les trois boutons de valeurs brutes (Open All, Close All, Middle position) contournent le modèle d'angle ; **après exécution, les curseurs affichent donc la valeur représentable la plus proche, et non la valeur exacte**. Si l'on touche ensuite un curseur, la main s'écarte de la cible brute d'environ 0,3° au maximum – un compromis assumé pour atteindre précisément les positions calibrées.

> Problème connu : Center All **ne saute pas** les doigts en mode **Raw** et écrase les angles bruts réglés manuellement. Le bouton ⊙ Center d'un seul doigt, lui, ne le fait pas.

---

## Lancer le CLI (amazing_hand_cmd.py)

Un outil en ligne de commande autonome, qui applique des poses et joue des séquences sans lancer le GUI. Il lit le même data/hand_config.yaml que le GUI et envoie **mot pour mot** les valeurs de pose stockées – exactement ce qu'envoie le GUI.

### Linux : permissions des ports série

Les adaptateurs USB-série se présentent généralement comme /dev/ttyACM0 (Waveshare / CDC-ACM) ou /dev/ttyUSB0 (FTDI / CH340).

Pour les trouver :

```bash
ls /dev/ttyACM* /dev/ttyUSB* 2>/dev/null
# 或者
dmesg | grep -E 'ttyACM|ttyUSB' | tail -5
```

En cas de **Permission denied**, ajoutez l'utilisateur courant au groupe dialout puis reconnectez-vous :

```bash
sudo usermod -aG dialout $USER
```

### Après installation via pip

```text
amazing-hand-cmd --list
amazing-hand-cmd --pose open
amazing-hand-cmd --sequence demo --loop
amazing-hand-cmd --pose open --speed 6
# 需要时覆盖串口:
amazing-hand-cmd --pose open --port /dev/ttyUSB0
```

### Exécution directe

```bash
python amazing_hand_cmd.py --list
python amazing_hand_cmd.py --pose open
python amazing_hand_cmd.py --pose close --speed 6
python amazing_hand_cmd.py --sequence demo
python amazing_hand_cmd.py --sequence wave --loop
python amazing_hand_cmd.py --port /dev/ttyUSB0 --pose open
python amazing_hand_cmd.py --list --config /path/to/hand_config.yaml
```

### Paramètres

| Paramètre | Valeur par défaut | Description |
|---|---|---|
| --pose NAME | – | Applique la pose du nom indiqué |
| --sequence NAME | – | Joue la séquence du nom indiqué |
| --list | – | Liste toutes les poses et séquences |
| --loop | Désactivé | Joue la séquence en boucle jusqu'à Ctrl+C |
| --speed N | 3 | Vitesse des servos 1 (lent) … 6 (rapide) |
| --port PORT | Linux /dev/ttyACM0<br>Windows COM9 | Numéro de port de la liaison série |
| --baudrate N | 1000000 | Débit en bauds |
| --config PATH | data/hand_config.yaml | Spécifie un autre fichier de configuration |
| --hand {right,left} | hand de config.yaml | Indique quelle main utiliser (droite 1-8, gauche 11-18) |

À la sortie du script (y compris Ctrl+C), le couple de tous les servos est automatiquement désactivé.

> Le CLI n'a pas de paramètre --config pour data/config.yaml ; ce fichier est toujours chargé depuis le répertoire du projet.

---

## Fichiers de configuration

### data/config.yaml

| Section | Rôle |
|---|---|
| serial | Port série par défaut par plateforme, débit en bauds, liste des débits disponibles |
| servos | IDs de servos pour chaque doigt |
| limits | Plages d'angles des servos et des deux curseurs |
| speeds | Valeurs par défaut/min/max de l'échelle de vitesse 1–6 |
| auto_extremes | Positions des servos en butée du curseur latéral |
| raw_positions | Cibles exactes en valeurs brutes des boutons de position globaux |
| paths | Emplacement des fichiers de poses/séquences |

### Correspondance entre servos et doigts

| Doigt | ID de servo | Indice dans le tableau de pose |
|---|---|---|
| Pointer (index) | 1, 2 | 4, 5 |
| Middle (majeur) | 3, 4 | 2, 3 |
| Ring (annulaire) | 5, 6 | 0, 1 |
| Thumb (pouce) | 7, 8 | 6, 7 |

**L'ordre du tableau de pose est : annulaire, majeur, index, pouce – et non l'ordre des IDs de servos.** C'est l'erreur la plus fréquente lors de l'édition manuelle de hand_config.yaml.

> Le commentaire en tête de amazing_hand_cmd.py indique « index 0→servo1 … 7→servo8 » ; **ce commentaire est faux** – le comportement réel du code correspond au tableau ci-dessus.

---

## Poses et séquences

Toutes les poses et séquences sont enregistrées dans data/hand_config.yaml. Si le fichier n'existe pas, le GUI le crée automatiquement.

### Enregistrer une pose

1. Placer la main dans la pose cible à l'aide des curseurs ou du clavier
1. Saisir un nom dans le champ « Name: »
1. Cliquer sur « ➕ Add New » dans la zone Pose Management

La vitesse n'influence que la rapidité de déplacement des curseurs ; une pose enregistrée ne mémorise que les 8 positions de servos.

### Charger / supprimer une pose

- Choisir une pose dans la liste déroulante puis cliquer sur **✓ Apply** pour que la main rejoigne cette pose
- Cliquer sur **🗑 Delete** à droite d'Apply et confirmer pour supprimer définitivement

### Gestion des séquences

1. Cliquer sur « 🔧 Manage » dans le Sequence Player pour ouvrir le gestionnaire de séquences
1. **Saved Sequences** (colonne de gauche)
  - Consulter, exécuter, modifier ou supprimer les séquences existantes
  - Double-cliquer ou cliquer sur « ▶ Execute » pour l'exécuter une fois

1. **Sequence Builder** (colonne de droite)
  - Double-cliquer sur une pose dans « Available Poses » pour l'ajouter comme étape
  - Chaque étape peut définir individuellement la vitesse et le délai des 8 servos ; les étapes sont enregistrées sous la forme « pose:s1,s2,...,s8|delay »
  - Utiliser ↑/↓ pour changer l'ordre, ou le bouton « ⏱ Delay » pour insérer une pause indépendante
  - Après avoir saisi un nom, cliquer sur « 💾 Save Sequence » pour enregistrer ; « ▶ Execute » permet de tester sans enregistrer

1. De retour dans la fenêtre principale, cocher **Loop** dans le Sequence Player pour une lecture en continu

### Format des étapes

```text
pose_name:speed1,speed2,...,speed8|delay
```

- speed1..speed8 – les 8 vitesses de servos (1–6) dans l'ordre de la pose
- delay – temps d'attente avant l'étape suivante, p. ex. 0.6s. **Facultatif** ; s'il est omis, le GUI revient à une attente automatique fixe
- Une pause indépendante s'écrit SLEEP:1.0s (sans liste de vitesses séparées par des virgules)

**Choix du délai.** Le pilote est capable de détecter l'arrêt des servos, mais la lecture des séquences utilise des délais fixes. Estimez grossièrement en secondes : angle de course / (vitesse × 57,3 × 0,7), en gardant une marge – sur une main en charge, un mouvement de plus d'environ 130° à la vitesse 3 nécessite plus de 1,0 seconde.

### Exemple de format YAML

```text
poses:
  open:
    positions: [-35, -35, -35, -35, -35, -35, -35, -35]
  close:
    positions: [75, 75, 75, 75, 75, 75, 75, 75]
  ring_close:                 # 无名指握紧,其余张开
    positions: [75, 75, -35, -35, -35, -35, -35, -35]

sequences:
  demo:
    steps:
      - "open:3,3,3,3,3,3,3,3|2.0s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
      - "ok:3,3,3,3,3,3,3,3|1.0s"
      - "victory:3,3,3,3,3,3,3,3|1.0s"
      - "greeting:3,3,3,3,3,3,3,3|1.5s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
  wave:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.8s"
      - "wave_r:5,5,5,5,5,5,5,5|0.6s"
      - "wave_l:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.8s"
  finger_roll:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.5s"
      - "ring_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
      - "middle_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
```

La lecture en boucle est contrôlée à l'exécution (case à cocher du GUI) et n'est plus écrite dans le YAML.

---

## Tests

Le projet comprend 284 tests unitaires/d'intégration/système ainsi que 54 tests matériels.

### Lancer tous les tests (sans matériel)

```text
pytest
```

### Lancer les tests matériels GUI + CLI (servos connectés requis)

```text
pytest tests/test_system_hardware.py --hardware --port /dev/ttyACM0
pytest tests/test_cmd_hardware.py --hardware --port /dev/ttyACM0
# 或两个一起:
pytest tests/test_system_hardware.py tests/test_cmd_hardware.py --hardware
```

test_system_hardware.py vérifie la connexion, l'application des poses, la lecture de la télémétrie, l'ouverture/fermeture d'un doigt et le salut, le contrôle de vitesse, l'exécution des séquences et la détection de mouvement.

test_cmd_hardware.py vérifie de bout en bout la couche CLI : positions des poses, paramètres de vitesse, étapes de séquence, wait_for_motion, sortie de --list et désactivation du couple à la sortie.

Les critères d'acceptation complets se trouvent dans docs/REQUIREMENTS.md.

> Remarque : les tests hors matériel vérifient les **valeurs par défaut de repli** de hand_logic.py, qui reposent encore sur l'échelle −40…110 de la version d'origine. À l'exécution, data/config.yaml les remplace ; les tests passent donc quelle que soit votre calibration – mais cela signifie aussi que **les tests ne valident pas vos paramètres de calibration actuels**.

---

## Configuration des IDs de servos

Tutoriel de configuration des IDs de servos avec le logiciel officiel Feetech et la carte driver à bus série : [https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/](https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/)

Téléchargement du logiciel Feetech : [https://github.com/Robot-Maker-SAS/FeetechServo](https://github.com/Robot-Maker-SAS/FeetechServo)

---

## Remerciements

Projet d'origine : [Betatester777](https://github.com/Betatester777/AmazingHandControl) Matériel et firmware de référence : [Pollen Robotics](https://github.com/pollen-robotics/AmazingHand)
