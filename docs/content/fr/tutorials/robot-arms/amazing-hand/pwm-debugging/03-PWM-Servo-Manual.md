---
title: "03-Version servomoteurs PWM - Manuel d'utilisation"
description: "Ce micrologiciel s'exécute sur une carte de développement ESP32-S3 et pilote 8 servomoteurs par signal PWM pour faire exécuter des gestes à la main dextre."
---

# 03-Version servomoteurs PWM - Manuel d'utilisation

## Sommaire

1. Vue d'ensemble

2. Câblage matériel

3. Compilation et flashage du micrologiciel

4. Protocole de communication série

5. Référence des commandes

6. Tutoriel d'utilisation de l'ordinateur hôte

7. Suivi de gestes

8. Réglage fin des paramètres de gestes

9. Questions fréquentes

---

## 1. Vue d'ensemble

Ce micrologiciel s'exécute sur une carte de développement **ESP32-S3** et pilote 8 servomoteurs par signal PWM pour faire exécuter des gestes à la main dextre. L'ordinateur hôte (PC / Raspberry Pi / autre MCU) envoie des instructions sous forme de trames binaires via le port série USB ; l'ESP32 les analyse, exécute le geste correspondant et renvoie une réponse.

Le projet fournit deux implémentations du micrologiciel :

|Micrologiciel|Répertoire|Caractéristiques|
|---|---|---|
|**Version ESP-IDF** (recommandée)|`esp-idf/AmazingHand_Serial/`|Structure de projet à base de composants, double tâche FreeRTOS, prête pour la production|

> Les deux micrologiciels partagent **le même protocole série** et **le même jeu de commandes** ; les paramètres de gestes peuvent être mutuellement pris comme référence.

### Gestes pris en charge (11 commandes de gestes)

|Geste|Commande|Description|
|---|---|---|
|Pierre|0x01|Pierre-feuille-ciseaux : tous les doigts fermés en poing|
|Ciseaux|0x02|Pierre-feuille-ciseaux : index + majeur tendus en forme de V|
|Papier|0x03|Pierre-feuille-ciseaux : tous les doigts ouverts|
|Pouce levé|0x04|Pouce levé, les autres doigts fermés en poing|
|Moquerie 1|0x05|Secouer l'index (« non non non »)|
|Moquerie 2|0x06|Annulaire tendu et oscillant (remplace l'auriculaire)|
|Ouvrir|0x07|Tous les doigts ouverts|
|Poing fermé|0x08|Tous les doigts fermés|
|OK|0x09|Geste OK|
|Pincement|0x0A|Geste de pincement|
|Pointer|0x0C|Index tendu pour effectuer le geste de « pointer »|
|Commande directe|0xF0|Contrôler directement l'angle des 8 servomoteurs|
|Définir la main|0xF1|Basculer entre le mode main gauche / main droite|
|Répéter|0xFE|Répéter le dernier geste exécuté|
|Arrêter|0xFF|Arrêter immédiatement le geste en cours|
|NOP|0x00|Test de liaison|

> Remarque : la commande 0x0B est désactivée (l'ancien geste « pouce vers le bas » faisait doublon avec « pouce levé », il a été supprimé).

---

## 2. Câblage matériel

### Matériel applicable

|Élément|Modèle|
|---|---|
|Contrôleur principal|Carte de développement **ESP32-S3** (YX-ESP32-S3 de Youxin ou équivalent)|
|Servomoteurs|8 servomoteurs analogiques PWM (SG90 ou équivalent)|
|Carte d'adaptation|Carte d'adaptation pour servomoteurs PWM|

La carte de développement ESP32-S3 dispose de deux interfaces Type-C :

- **USB Serial/JTAG intégré** : connexion directe au contrôleur USB intégré à la puce ESP32-S3

- **FT232 externe** : communication via la puce de conversion série FT232

> Les deux interfaces peuvent être utilisées pour la communication série ; choisissez l'une ou l'autre. L'ordinateur hôte sélectionne le nom du périphérique de port série correspondant.

### Servomoteurs → carte d'adaptation

Les connecteurs 3P des 8 servomoteurs se branchent, selon leur numéro d'ID, sur les broches 1-8 de la carte d'adaptation.

### Carte d'adaptation → ESP32-S3

|Carte d'adaptation|GPIO de l'ESP32-S3|Description|
|---|---|---|
|PWM1|**4**|Index, articulation 1|
|PWM2|**5**|Index, articulation 2|
|PWM3|**6**|Majeur, articulation 1|
|PWM4|**7**|Majeur, articulation 2|
|PWM5|**15**|Annulaire, articulation 1|
|PWM6|**16**|Annulaire, articulation 2|
|PWM7|**17**|Pouce, articulation 1|
|PWM8|**18**|Pouce, articulation 2|
|5V|5V|Alimentation (prélevée sur la carte d'adaptation)|
|GND|GND|**Masse commune obligatoire, connecter au moins un fil**|

> Les mains droite et gauche partagent le même mappage GPIO. Lors du passage en mode « main gauche », le micrologiciel inverse le sens de déplacement du pouce à l'intérieur des gestes ; les broches restent inchangées.

### Alimentation

La carte d'adaptation dispose de deux groupes de bornes d'alimentation 5V/GND :

- Un groupe est relié par un câble Type-C à un adaptateur secteur **5V 3A**

- L'autre groupe alimente la broche **5V** de l'ESP32-S3 (la carte de développement n'a plus besoin d'être alimentée via Type-C)

---

## 3. Compilation et flashage du micrologiciel

### 3.1 Version ESP-IDF (recommandée)

> **Avertissement : exigence concernant le chemin** : la compilation ESP-IDF ne prend pas en charge les chemins en chinois. Assurez-vous que le chemin du projet est entièrement en anglais (y compris le dossier utilisateur et les répertoires parents).

#### Structure du projet

```Plaintext
esp-idf/AmazingHand_Serial/
├── CMakeLists.txt              # Configuration du projet de niveau supérieur
├── sdkconfig.defaults          # Configuration Kconfig par défaut
├── main/
│   ├── CMakeLists.txt
│   └── main.c                  # Deux tâches FreeRTOS + initialisation (couche de liaison)
└── components/
    ├── hand_servo/             # Pilote des servos (LEDC PWM + données de calibration)
    ├── hand_gestures/          # Macros de paramètres de gestes + fonctions de gestes + contrôle main gauche/droite
    └── hand_protocol/          # Analyse des trames série + distribution des commandes
```

#### Environnement de compilation

- ESP-IDF **v6.0.1**

- Puce cible : **ESP32-S3**

- Variables d'environnement de `idf.py` déjà configurées

#### Compilation et flashage

```Bash
cd esp-idf/AmazingHand_Serial

# 1. Définir la puce cible (lors de la première utilisation ou d'un changement de puce)
idf.py set-target esp32s3

# 2. Compiler
idf.py build

# 3. Flasher (Windows : utiliser le port COM, par ex. COM3)
idf.py -p COM3 flash

# 4. Surveillance du port série (facultatif, débit 115200)
idf.py -p COM3 monitor
```

> Après avoir modifié un code source dans `components/` ou `main/`, il suffit de relancer `idf.py build && idf.py -p COM3 flash`.

### 3.3 Calibration (facultatif, recommandée lors de la première utilisation)

La position centrale et la largeur d'impulsion des servomoteurs doivent être calibrées selon le mécanisme réel. Il existe deux méthodes :

- **Version ESP-IDF** : modifiez `middle_pos[8]` (ligne 40) et `min_pw/mid_pw/max_pw[8]` (lignes 45-47) dans `components/hand_servo/hand_servo.c`

Après la calibration, recompilez et reflashez.

---

## 4. Protocole de communication série

### 4.1 Couche physique

|Paramètre|Valeur|
|---|---|
|Interface|USB Serial (UART0)|
|Débit en bauds|**115200**|
|Bits de données|8|
|Bit de parité|Aucun (None)|
|Bits d'arrêt|1|
|Contrôle de flux|Aucun|

### 4.2 Format de trame

#### Hôte → ESP32 (trame de commande)

```Plaintext
┌────────┬────────┬──────────┬────────────────┬──────────┐
│  0xAA  │ CMD_ID │ DATA_LEN │ DATA[0 .. N-1] │ CHECKSUM │
│ 1 Byte │ 1 Byte │  1 Byte  │    N Bytes     │  1 Byte  │
└────────┴────────┴──────────┴────────────────┴──────────┘
 帧头      命令ID    数据长度      数据负载         校验和
```

- **En-tête de trame** : fixe `0xAA`, marque le début d'une trame

- **CMD_ID** : numéro de la commande (voir Référence des commandes)

- **DATA_LEN** : nombre d'octets de la charge utile (0-8 ; une trame dépassant 8 est invalide)

- **DATA** : charge utile, dont la longueur est déterminée par DATA_LEN

- **CHECKSUM** : `CMD_ID ^ DATA_LEN ^ DATA[0] ^ ... ^ DATA[N-1]` (contrôle XOR)

> Si DATA_LEN = 0, alors CHECKSUM = CMD_ID.

#### ESP32 → hôte (trame de réponse)

```Plaintext
┌────────┬────────┬────────┬──────────┐
│  0xBB  │ CMD_ID │ STATUS │ CHECKSUM │
│ 1 Byte │ 1 Byte │ 1 Byte │  1 Byte  │
└────────┴────────┴────────┴──────────┘
 帧头      命令ID    状态码    校验和
```

- **En-tête de trame** : fixe `0xBB`

- **CMD_ID** : numéro de commande d'origine

- **STATUS** : code d'état (voir le tableau ci-dessous)

- **CHECKSUM** : `CMD_ID ^ STATUS`

#### Codes d'état

|STATUS|Signification|Description|
|---|---|---|
|0x00|OK|Commande acceptée, exécution commencée|
|0x01|Commande invalide|CMD_ID absent de la table des commandes|
|0x02|Erreur de paramètre|Longueur ou contenu des données incorrect|
|0x03|Occupé|Un geste est en cours d'exécution, les nouvelles commandes ne sont pas acceptées pour le moment|
|0x10|Terminé|Geste exécuté|

### 4.3 Chronologie de communication

```Plaintext
主机                          ESP32
 │                              │
 │──── [AA 01 00 01] ────────→│  发送"石头"命令
 │                              │
 │←─── [BB 01 00 01] ─────────│  ACK: 命令已接受
 │                              │
 │                      (执行手势中)
 │                              │
 │←─── [BB 01 10 11] ─────────│  完成: 手势执行完毕
 │                              │
 │──── [AA 02 00 02] ────────→│  发送"剪刀"命令
 │                              │
 │←─── [BB 02 00 02] ─────────│  ACK
 │                              │
```

### 4.4 Arrêt d'un geste & expiration de trame

- L'envoi de `[AA FF 00 FF]` permet d'interrompre à tout moment le geste en cours d'exécution

- Si l'ESP32 n'a pas reçu une trame complète en 200ms, elle est automatiquement rejetée (pour éviter une désynchronisation permanente due à la perte d'un octet)

- Les trames dont la somme de contrôle ne correspond pas sont silencieusement rejetées ; l'ordinateur hôte doit implémenter une retransmission après expiration du délai

### 4.5 Mode main droite / main gauche

Le mode main droite est celui par défaut. Envoyez `[AA F1 01 02 F2]` pour basculer en main gauche, et `[AA F1 01 01 F1]` pour revenir en main droite. La main droite/gauche influe sur le sens de déplacement du pouce (gestes impliquant le pouce tels que pierre / ciseaux / pouce levé / OK / pincement).

---

## 5. Référence des commandes

### 5.1 Commandes de gestes (0x01-0x0A, 0x0C)

Ces commandes ne nécessitent pas de charge utile (DATA_LEN=0) ; l'ESP32 exécute immédiatement le geste correspondant dès réception.

|Commande|Trame HEX|Réponse|Description|
|---|---|---|---|
|Pierre|`AA 01 00 01`|`BB 01 00 01` → `BB 01 10 11`|Tous les doigts fermés en poing|
|Ciseaux|`AA 02 00 02`|`BB 02 00 02` → `BB 02 10 12`|Index + majeur tendus|
|Papier|`AA 03 00 03`|`BB 03 00 03` → `BB 03 10 13`|Tous les doigts ouverts|
|Pouce levé|`AA 04 00 04`|`BB 04 00 04` → `BB 04 10 14`|Pouce levé|
|Moquerie 1|`AA 05 00 05`|`BB 05 00 05` → `BB 05 10 15`|Secouer l'index (environ 2.5s)|
|Moquerie 2|`AA 06 00 06`|`BB 06 00 06` → `BB 06 10 16`|Annulaire oscillant (environ 2.5s)|
|Ouvrir|`AA 07 00 07`|`BB 07 00 07` → `BB 07 10 17`|Tous les doigts ouverts|
|Poing fermé|`AA 08 00 08`|`BB 08 00 08` → `BB 08 10 18`|Tous les doigts fermés|
|OK|`AA 09 00 09`|`BB 09 00 09` → `BB 09 10 19`|Geste OK|
|Pincement|`AA 0A 00 0A`|`BB 0A 00 0A` → `BB 0A 10 1A`|Geste de pincement|
|Pointer|`AA 0C 00 0C`|`BB 0C 00 0C` → `BB 0C 10 1C`|Index tendu pour effectuer le geste de « pointer »|

### 5.2 Commande de pilotage direct (0xF0)

Contrôle directement l'angle des 8 servomoteurs ; les 8 octets de données correspondent respectivement aux servomoteurs 1-8, chaque octet ayant une valeur comprise entre 0-180.

**Exemple : ramener tous les servomoteurs en position médiane (90°)**

```Plaintext
发送: AA F0 08 5A 5A 5A 5A 5A 5A 5A 5A F8
       │  │  │  └── 8 个 0x5A (90°) ──┘  │
       │  │  │                            └── CHECKSUM
       │  │  └── DATA_LEN = 8
       │  └── CMD_DIRECT_DRIVE
       └── 帧头
```

Somme de contrôle = `F0 ^ 08 ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A` = `F8`

> 8 octets identiques 0x5A se XOR deux à deux pour donner 0x00, soit finalement `0xF0 ^ 0x08 ^ 0x00 = 0xF8`

**Exemple : index ouvert (servomoteur 1 = 170°, servomoteur 2 = 10°), les autres en position médiane (90°)**

```Plaintext
发送: AA F0 08 AA 0A 5A 5A 5A 5A 5A 5A 58
               └─170°  └─10°
```

### 5.3 Définir la main droite / gauche (0xF1)

Donnée de 1 octet : `0x01` = main droite, `0x02` = main gauche.

```Plaintext
设右手: AA F1 01 01 F1
设左手: AA F1 01 02 F2
```

### 5.4 Commandes de contrôle

|Commande|Trame HEX|Description|
|---|---|---|
|NOP|`AA 00 00 00`|Test de liaison, renvoie immédiatement `BB 00 00 00`|
|Répéter|`AA FE 00 FE`|Répéter le dernier geste exécuté|
|Arrêter|`AA FF 00 FF`|Arrêter immédiatement le geste en cours|

### 5.5 Aide-mémoire des réponses

Lorsqu'une commande invalide est reçue (en prenant comme exemple la commande inexistante 0xFC) :

```Plaintext
发送: AA FC 00 FC
响应: BB FC 01 FD    （STATUS=0x01 无效命令）
```

> Vérification de la somme de contrôle : `FC ^ 00 = FC`, réponse `FC ^ 01 = FD`

---

## 6. Tutoriel d'utilisation de l'ordinateur hôte

Le répertoire racine du projet fournit deux outils pour l'ordinateur hôte :

|Outil|Fichier|Type|Utilisation|
|---|---|---|---|
|**Interface graphique**|`hand_gui.py` / exe packagé|Visuel|Cliquer sur des boutons pour exécuter des gestes, commande directe par curseurs, journal|
|**Test en ligne de commande**|`serial_test.py`|Par instructions|Envoyer des gestes / un seul servomoteur / un balayage, tests automatisés|

> Les deux ne dépendent que de `pyserial`. Installation : `pip install -r requirements.txt`

### 6.1 GUI visuelle (recommandée)

#### Méthode A : exécuter l'exe packagé (destiné aux clients)

1. Récupérez `AmazingHand控制台.exe` (ou le répertoire après décompression)

2. **Double-cliquez sur l'exe** pour l'exécuter directement, sans installer Python

3. Connectez-vous et utilisez l'application en suivant les étapes ci-dessous

#### Méthode B : exécuter depuis le code source

```Bash
# 1. Installer les dépendances
pip install -r requirements.txt

# 2. Exécuter
python hand_gui.py
```

#### Étapes d'utilisation de la GUI

1. **Sélectionner le port série** : dans la liste déroulante en haut, sélectionnez le port COM correspondant à l'ESP32 (à consulter dans le Gestionnaire de périphériques de Windows)

2. **Cliquez sur « Connecter »** : le voyant d'état passe au vert, la zone de journal affiche « connecté » et un test de liaison NOP est envoyé automatiquement

3. **Commandes de gestes** : cliquez sur les boutons « Pierre », « Ciseaux », « Papier », « Pouce levé », « OK », etc., et la main robotique exécute le geste correspondant

4. **Main droite / gauche** : cochez « main droite » / « main gauche » pour basculer le sens du miroir du pouce

5. **Commande directe des servomoteurs** : faites glisser les 8 curseurs pour contrôler en temps réel l'angle d'un servomoteur individuel (0-180°)

6. **Commande différentielle des doigts** (recommandée) : deux barres de progression par doigt —— **Flexion/Extension** contrôle le mouvement différentiel en sens inverse des deux servomoteurs de ce doigt (flexion-extension), **Vers la droite/Vers la gauche** contrôle l'oscillation dans le même sens. Les deux degrés de liberté sont indépendants et pilotés de manière synchrone

7. **Répéter / Arrêter** : répète le dernier geste / interrompt immédiatement le geste en cours

8. **Journal de communication** : affiche en temps réel en bas les trames émises et reçues ainsi que l'état des réponses

### Explication de la commande différentielle des doigts

Chaque doigt est **entraîné de manière différentielle par deux servomoteurs**, les deux degrés de liberté étant orthogonaux :

|Barre de progression|Rôle|Effet mécanique|
|---|---|---|
|**Flexion◀▶Extension**|Les deux servomoteurs tournent en sens inverse (différentiel)|Le doigt se fléchit ou s'étend|
|**Vers la droite◀▶Vers la gauche**|Les deux servomoteurs tournent dans le même sens|Le doigt oscille à gauche et à droite|

- Plage du curseur **Flexion/Extension** : -70 ~ +70 (0 = neutre, +70 = complètement étendu, -70 = complètement fléchi)

- Plage du curseur **oscillation gauche/droite** : 60 ~ 120 (90 = neutre, 60 = vers la droite, 120 = vers la gauche)

- Angle du servomoteur = `摆动 ± 弯曲`, les deux servomoteurs sont mis à jour **de manière synchrone** et une commande de pilotage direct est envoyée

> Exemple (index GPIO4/5) : curseur de flexion à +70 et oscillation maintenue à 90 → servomoteur 4 = 160°, servomoteur 5 = 20° (complètement étendu) ; flexion à -70 → servomoteur 4 = 20°, servomoteur 5 = 160° (complètement fléchi).

### 6.2 Test par instructions (serial_test.py)

#### Utilisation en ligne de commande

```Bash
# Afficher l'aide
python serial_test.py

# Test de liaison
python serial_test.py COM3 nop

# Envoyer la geste
python serial_test.py COM3 rock        # Pierre
python serial_test.py COM3 thumbs_up    # Pouce levé
python serial_test.py COM3 index        # Pointer
python serial_test.py COM3 open         # Ouvrir
python serial_test.py COM3 close        # Poing fermé

# Entraînement direct d'un seul servo
python serial_test.py COM3 servo 1 90   # Servomoteur 1 → 90°

# Tout au centre
python serial_test.py COM3 mid

# Définir la main gauche/droite
python serial_test.py COM3 hand L       # Main gauche
python serial_test.py COM3 hand R       # Main droite

# Balayage de fréquence / autotest
python serial_test.py COM3 sweep 1      # Balayage de fréquence du servomoteur 1
python serial_test.py COM3 test         # Test de chaque servomoteur un par un
```

#### Mode interactif

```Bash
python serial_test.py COM3
```

Vous entrez dans un REPL où vous saisissez directement les commandes abrégées (par exemple `servo 3 180`, `rock`, `mid`, `quit`).

### 6.3 Test manuel avec un outil de port série (facultatif)

**CoolTerm** (macOS/Windows/Linux):

1. Ouvrez CoolTerm, `Options` → réglez le débit en bauds sur 115200, 8N1

2. `Connection` → `Send String` → sélectionnez `Hex`

3. Saisissez `AA 01 00 01` → envoyer → la main robotique exécute « pierre »

4. Observez la zone de réponse qui affiche `BB 01 00 01 ... BB 01 10 11`

**SerialTool** (macOS):

```Bash
brew install serialtool
echo -ne '\xAA\x01\x00\x01' > /dev/cu.usbserial-0001
```

### 6.4 Script de contrôle Python (développement personnalisé)

```Python
#!/usr/bin/env python3
"""灵巧手串口控制 - Python 上位机示例"""
import serial
import time

SERIAL_PORT = "/dev/cu.usbserial-0001"  # Modifier avec le port réel
BAUD_RATE   = 115200

# Définition des commandes (conforme au jeu de commandes du firmware)
CMD = {
    "nop":       0x00,
    "rock":      0x01,
    "scissors":  0x02,
    "paper":     0x03,
    "thumbs_up": 0x04,
    "taunt1":    0x05,
    "taunt2":    0x06,
    "open":      0x07,
    "close":     0x08,
    "ok":        0x09,
    "pinch":     0x0A,
    "index":     0x0C,
    "direct":    0xF0,
    "set_side":  0xF1,
    "repeat":    0xFE,
    "stop":      0xFF,
}

def calc_checksum(cmd_id, data=b""):
    """计算 XOR 校验和 (CMD ^ LEN ^ DATA[0..N])"""
    result = cmd_id ^ len(data)
    for b in data:
        result ^= b
    return result & 0xFF

def send_command(ser, cmd_id, data=b""):
    """发送命令帧，返回 (ack_status, completion_status)"""
    data_len = len(data)
    checksum = calc_checksum(cmd_id, data)
    frame = bytes([0xAA, cmd_id, data_len]) + data + bytes([checksum])
    ser.write(frame)
    print(f"发送: {frame.hex(' ').upper()}")

def read_response(ser, timeout=1.0):
    """读取一个响应帧 [0xBB CMD STATUS CKSUM]"""
    ser.timeout = timeout
    while True:
        b = ser.read(1)
        if not b:
            return None
        if b[0] == 0xBB:
            buf = ser.read(3)
            if len(buf) == 3:
                expected = buf[0] ^ buf[1]
                if expected == buf[2]:
                    return bytes([0xBB]) + buf
    return None

def set_side(ser, side):
    """设置左右手: side='R' 右手, side='L' 左手"""
    val = 0x01 if side.upper() == 'R' else 0x02
    send_command(ser, CMD["set_side"], bytes([val]))

def direct_drive(ser, angles):
    """直驱 8 路舵机: angles 为 8 个 0-180 的角度列表"""
    data = bytes([min(180, max(0, a)) for a in angles[:8]])
    send_command(ser, CMD["direct"], data)

# ===== Exemple d'utilisation =====
if __name__ == "__main__":
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    time.sleep(1)  # Attendre la fin de la réinitialisation de l'ESP32

# 1. Test de liaison
    print("=== NOP 链路测试 ===")
    send_command(ser, CMD["nop"])

# 2. Jeu de pierre-feuille-ciseaux
    print("\n=== 猜拳: 石头 → 剪刀 → 布 ===")
    for name in ["rock", "scissors", "paper"]:
        send_command(ser, CMD[name])
        time.sleep(0.5)

# 3. Geste pouce levé
    print("\n=== 真棒 ===")
    send_command(ser, CMD["thumbs_up"])

# 4. Arrêter le test
    print("\n=== 停止测试 ===")
    send_command(ser, CMD["taunt1"])  # Commencer à secouer l'index
    time.sleep(0.3)
    send_command(ser, CMD["stop"])    # Arrêter immédiatement

# 5. Mode d'entraînement direct : tout au centre
    print("\n=== 直驱: 归中 ===")
    direct_drive(ser, [90] * 8)

    ser.close()
```

---

## 7. Suivi de gestes

Utilise une **caméra pour reconnaître la paume en temps réel** et entraîne la flexion/extension et l'oscillation gauche/droite des doigts de la main dextre. Basé sur l'algorithme de suivi de la main de l'AmazingHand officiel (21 points clés MediaPipe + rotation dans les coordonnées mondiales 3D).

### 7.1 Principe

- La caméra est pointée vers la paume → MediaPipe identifie 21 points clés de la main

- Construction d'un repère local de la main et calcul des vecteurs 3D des bouts des 4 doigts

- Vecteur du bout du doigt → paramètres différentiels (flex, base) de chaque doigt → réutilisation du protocole de pilotage direct pour l'envoi vers les servomoteurs

### 7.2 Exigences d'environnement

Le suivi de gestes dépend de **Python 64 bits + mediapipe 0.10.14** (ancienne API solutions, la seule capable de produire des coordonnées mondiales 3D) :

|Dépendance|Version|
|---|---|
|Python|64 bits 3.12|
|mediapipe|0.10.14|
|numpy|<2.0|
|scipy|>=1.9|
|opencv-python|>=4.10|
|Pillow|>=10.0|

> **Attention** : l'environnement par défaut actuel est un Python 32 bits, sur lequel mediapipe ne peut pas être installé. Il faut installer séparément un Python 3.12 64 bits (à installer sur le disque D, par exemple `D:\Python312-64`, en coexistence totale avec le 32 bits existant, sans conflit).

### 7.3 Déploiement en un clic

1. Installez Python 3.12 64 bits (téléchargez l'installateur 64 bits depuis [python.org](https://www.python.org/downloads/) et installez-le dans `D:\Python312-64`)

2. Double-cliquez sur **`setup_tracking.bat`** à la racine du projet pour l'exécuter

    - Recherche automatiquement un Python 64 bits

    - Crée l'environnement virtuel `tracking_env`

    - Installe mediapipe 0.10.14 et les autres dépendances

    - Vérifie l'installation

### 7.4 Étapes d'utilisation

1. Démarrez la GUI avec l'environnement de suivi :

```Plaintext
tracking_env\Scripts\python hand_gui.py
```

2. Connectez le port série (sélectionnez le port COM correspondant à l'ESP32)

3. Dans le panneau « suivi de gestes », sélectionnez le numéro de caméra (0 par défaut)

4. Cliquez sur **« Démarrer le suivi »** → l'image de la caméra s'affiche dans le panneau

5. Pointez la paume vers la caméra :

    - **Flexion/extension des doigts** → le doigt correspondant de la main dextre se fléchit/s'étend

    - **Rotation de la paume à gauche/droite** → les doigts de la main dextre oscillent à gauche et à droite

6. Cliquez sur **« Arrêter le suivi »** pour terminer

> Si aucune main n'est détectée, le panneau affiche « aucune main détectée » ; une fois détectée, il affiche « main détectée : Right/Left ».

### 7.5 Étalonnage des paramètres

Les coefficients de mappage se trouvent en bas de `hand_tracking.py` (`FLEX_SCALE` / `BASE_SCALE`) :

```Python
FLEX_SCALE = 80.0    # Composante z du bout du doigt → flexion/extension (flex)
BASE_SCALE = 30.0    # Composante x du bout du doigt → oscillation gauche/droite (base)
```

Si l'amplitude de flexion/extension est insuffisante ou si le sens est inversé, ajustez `FLEX_SCALE` ; si l'amplitude de l'oscillation gauche/droite est insuffisante ou si le sens est inversé, ajustez `BASE_SCALE` (le signe permet de régler le sens).

---

## 8. Réglage fin des paramètres de gestes

### 8.1 Emplacement des paramètres

Le décalage angulaire de chaque geste est défini par une macro `#define` ; **aucune modification du code logique n'est nécessaire**, il suffit d'ajuster les valeurs.

- **Version ESP-IDF** : zone « paramètres de gestes (réglables par l'utilisateur) » en haut de `components/hand_gestures/hand_gestures.c`

### 8.2 Signification des paramètres

```C
// Exemple : geste pierre
#define ROCK_IDX_OFF1    70    // décalage de l'articulation 1 de l'index
#define ROCK_IDX_OFF2   -70    // décalage de l'articulation 2 de l'index
```

- **Valeur positive = flexion / fermeture**, **valeur négative = extension / ouverture**

- 2 décalages par doigt, relatifs à `middle_pos` (90° par défaut)

- Structure différentielle : la différence des décalages des deux servomoteurs = extension/contraction, la composante de même sens = déviation gauche/droite

### 8.3 Étapes de réglage des paramètres

1. Trouvez la macro `#define` du geste correspondant

2. Modifiez les valeurs (augmenter → amplitude plus grande ; diminuer → amplitude plus petite)

3. Recompilez et reflashez, puis testez le résultat avec l'ordinateur hôte

4. Ajustez finement à plusieurs reprises jusqu'à obtenir un mouvement naturel

---

## 9. Questions fréquentes

### Q1 : l'ordinateur hôte ne parvient pas à se connecter au port série ?

1. Vérifiez que l'ESP32 est bien connecté à l'ordinateur via Type-C

2. Vérifiez que le numéro de port COM dans le Gestionnaire de périphériques correspond à celui sélectionné dans la GUI

3. Vérifiez que le débit en bauds est bien 115200

4. Fermez les autres logiciels occupant le port série

### Q2 : aucune réaction après l'envoi d'une commande ?

1. Envoyez d'abord `AA 00 00 00` (NOP), vous devez recevoir `BB 00 00 00`

2. Vérifiez que le micrologiciel est bien flashé et que la puce cible est l'ESP32-S3

3. Vérifiez le câblage (la masse GND est-elle commune)

### Q3 : l'amplitude du geste est incorrecte ou le sens est inversé ?

Reportez-vous au réglage fin des paramètres de gestes (voir section 7) pour ajuster la macro correspondante.

### Q4 : quels gestes sont affectés par le mode main droite / main gauche ?

Les gestes **impliquant le pouce** tels que pierre / ciseaux / pouce levé / OK / pincement : après le basculement main droite/gauche, le sens du miroir du pouce change.

### Q5 : les doigts se bloquent ou ne s'étendent pas ?

Avant l'exécution de tous les gestes de type contraction, une « ouverture complète de la main suivie d'une fermeture » est automatiquement effectuée, afin d'éviter qu'un doigt soit bloqué par le geste précédent. Si le blocage persiste, vérifiez le montage mécanique ou réduisez l'amplitude de contraction.

