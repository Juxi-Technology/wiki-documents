---
title: "AmazingHand PWM (main dextre) — Tutoriel complet d'utilisation"
description: "Tutoriel complet de la version AmazingHand PWM : du micrologiciel PWM ESP32-S3 aux commandes de gestes de l'ordinateur hôte, jusqu'au suivi de gestes par GUI / dora."
---

# AmazingHand PWM (main dextre) — Tutoriel complet d'utilisation

> **Paquet de livraison associé :** [delivery_package.zip](/downloads/delivery_package.zip)


> Des **commandes de gestes de l'ordinateur hôte** au **suivi de gestes**, un tutoriel de bout en bout.
> Matériel applicable : ESP32-S3 + 8 servomoteurs PWM (commande différentielle).
>
> Version : 2026-08-20 · Micrologiciel associé : version à composants ESP-IDF (`AmazingHand_Serial`)

---

## Chapitre 0 Navigation du tutoriel

Ce tutoriel est organisé **dans l'ordre chronologique**. Déterminez d'abord le parcours que vous souhaitez suivre, puis passez au chapitre correspondant.

| Parcours | Usage | Prérequis | Chapitres |
|------|------|----------|------|
| **A. Commandes de gestes de l'ordinateur hôte** | Cliquer sur des boutons / taper des commandes pour faire exécuter des gestes à la main dextre (pierre/ciseaux/papier/pouce levé…) | Python + micrologiciel flashé | Chapitres 1-4 |
| **B. Suivi de gestes intégré à la GUI** | La caméra suit les mouvements de la main, la main dextre les reproduit en temps réel (version simplifiée, sans IK) | A + Python 64 bits + mediapipe | Chapitres 1-4 + 5.1 |
| **C. Suivi IK officiel avec dora** | Chaîne complète officielle : caméra→IK→8 angles d'articulation→servomoteurs (version complète) | A + Rust + uv + dora | Chapitres 1-4 + 5.2 |

**Parcours recommandé** :
- Première utilisation → choisissez **A** pour vérifier d'abord que le micrologiciel et le câblage sont corrects.
- Pour voir rapidement la caméra suivre la main → choisissez **B** (léger, installation en quelques minutes).
- Pour un suivi formel et complet → choisissez **C** (chaîne officielle, précision maximale).

Le matériel est commun aux trois parcours ; seul le **parcours C** nécessite l'installation supplémentaire de Rust/uv/dora.

---

## Chapitre 1 Préparation de l'environnement

Installez dans l'ordre indiqué. **Les parcours A/B ne nécessitent que la section 1.1 ; le parcours C nécessite en plus la section 1.2.**

### 1.1 Environnement de l'ordinateur hôte (requis pour les parcours A/B)

#### ① Python 3.12 64 bits

> **Le 64 bits est obligatoire**. mediapipe 0.10.14 ne fournit que des wheels Windows 64 bits ; l'installation en 32 bits est impossible.
> C'est aussi une cause fréquente de fermeture brutale de la GUI au double-clic.

- Installation recommandée dans `D:\Python312-64bit` (ce chemin existe déjà sur cette machine).
- Lors de l'installation, cochez **Add to PATH**.
- Vérification (64 bits) :

```bash
py -3.12-64 -c "import sys; print('64bit' if sys.maxsize > 2**32 else '32bit')"
# 输出: 64bit
```

#### ② Installer les dépendances de l'ordinateur hôte

Répertoire racine du projet (le répertoire contenant `hand_gui.py`) :

```bash
pip install -r requirements.txt     # 只需 pyserial
```

#### ③ Dépendances supplémentaires de suivi (pour le parcours B)

À exécuter dans le répertoire racine du projet :

```bash
setup_tracking.bat
```

Il effectue automatiquement : trouver Python 64 bits → créer l'environnement virtuel `tracking_env` → installer `requirements-tracking.txt`
(mediapipe==0.10.14, numpy<2, scipy, opencv, Pillow, pyserial) → vérifier mediapipe.

> Ou installation manuelle :
> ```bash
> D:\Python312-64bit\python.exe -m pip install -r requirements-tracking.txt
> ```

### 1.2 Environnement IK officiel dora (requis pour le parcours C)

**Installation client** : double-cliquez sur `..\02_hand_tracking\Demo\Windows_Scripts_CN\1-安装环境.bat` (version anglaise : `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\1-Install_Env.bat`), toutes les dépendances sont installées automatiquement :
chaîne d'outils Rust, uv (gestionnaire de paquets Python), dora-cli.

> Après l'installation, **fermez le terminal et rouvrez-le** une fois pour que PATH prenne effet.
> Pour les dépendances détaillées (versions, installation manuelle), voir la documentation de maintenance ; rien à faire côté client.

---

## Chapitre 2 Câblage matériel

### 2.1 Liste du matériel

| Matériel | Description |
|------|------|
| Carte de développement ESP32-S3 | YX-ESP32-S3 ou équivalent |
| 8 servomoteurs PWM | Servomoteurs analogiques, commande différentielle |
| Carte d'adaptation pour servomoteurs | servomoteurs → 8 sorties PWM |
| Alimentation 5V indépendante | **au moins 5V 3A** ; courant transitoire élevé des servomoteurs |
| Câble USB de données | ESP32-S3 Type-C → PC |
| Caméra | Caméra intégrée ou USB (pour le suivi) |

### 2.2 Mappage GPIO

Carte d'adaptation PWM1-8 → GPIO de l'ESP32-S3 :

| Carte d'adaptation | GPIO | Doigt |
|--------|------|------|
| PWM1 | 4 | Index, articulation 1 |
| PWM2 | 5 | Index, articulation 2 |
| PWM3 | 6 | Majeur, articulation 1 |
| PWM4 | 7 | Majeur, articulation 2 |
| PWM5 | 15 | Annulaire, articulation 1 |
| PWM6 | 16 | Annulaire, articulation 2 |
| PWM7 | 17 | Pouce, articulation 1 |
| PWM8 | 18 | Pouce, articulation 2 |

> **Les mains gauche et droite partagent le même mappage GPIO**. Le passage main gauche/main droite se fait par logiciel (chapitre 4), sans modifier le câblage.

### 2.3 Exigences d'alimentation

- Utilisez une **alimentation 5V indépendante** (au moins 3A) pour les servomoteurs ; ne comptez pas uniquement sur l'alimentation USB.
- Les pointes de courant des servomoteurs peuvent réinitialiser l'ESP32 (symptôme : redémarrages répétés de l'ESP32). Dans ce cas, **coupez l'alimentation et redémarrez** l'ESP32.

### 2.4 Étapes de câblage

1. 8 servomoteurs → carte d'adaptation PWM1-8
2. Carte d'adaptation → GPIO correspondants de l'ESP32-S3 (tableau ci-dessus)
3. ESP32-S3 Type-C → PC
4. Caméra connectée au PC (pour le suivi)

> Pour le câblage détaillé / les schémas de circuit, voir le répertoire `ESP32开发板电路图/`.

---

## Chapitre 3 Condition préalable : flashage du micrologiciel

> Pour que les servomoteurs répondent, le micrologiciel doit d'abord être flashé. Le micrologiciel se trouve dans `esp-idf\AmazingHand_Serial\`.

### 3.1 Compilation de la version ESP-IDF (recommandée)

Ouvrez le projet `AmazingHand_Serial` avec l'IDE Espressif :

1. Définir la puce cible (première fois) :
   ```
   idf.py set-target esp32s3
   ```
2. Compiler :
   ```
   idf.py build
   ```
3. Flasher (sous Windows, utiliser le port COM, par ex. COM3) :
   ```
   idf.py -p COM3 flash
   ```

### 3.2 Vérification après le flashage

Surveillance du port série (débit en bauds **115200**) :

```
idf.py -p COM3 monitor
```

Vous devriez voir le journal de démarrage :

```
AmazingHand Serial Control Ready (ESP-IDF)
Protocol: 115200-8N1 [0xAA CMD LEN DATA CKSUM]
```

> Le débit en bauds est déjà configuré de manière uniforme par le micrologiciel/les scripts (115200) ; aucune configuration manuelle n'est nécessaire.

> Remarque : à la livraison, le micrologiciel est généralement déjà flashé ; cette étape n'est nécessaire qu'en cas de nouveau micrologiciel ou de reflashage.

---

## Chapitre 4 Première mise en service : commandes de gestes depuis l'ordinateur hôte

> Prérequis : micrologiciel flashé (chapitre 3), ESP32 alimenté, câble série connecté. Vérifiez d'abord le port COM dans le Gestionnaire de périphériques.

### 4.1 Visualisation par GUI (recommandée)

#### Méthode A : exécuter l'exe packagé

Double-cliquez sur `dist/AmazingHand控制台.exe` (**sans suivi** ; le suivi nécessite l'exécution depuis le code source).

#### Méthode B : exécution depuis le code source

```bash
# 项目根目录,先激活追踪环境(装了 mediapipe)或任意带 pyserial 的 Python
tracking_env\Scripts\python hand_gui.py
```

#### Étapes d'utilisation de la GUI

1. **Sélection du port série** : dans la liste déroulante en haut, sélectionnez le port COM de l'ESP32.
2. **Cliquez sur « Connecter »** : le voyant d'état passe au vert, le journal affiche « connecté », un test de liaison NOP est envoyé automatiquement.
3. **Commandes de gestes** : cliquez sur « pierre », « ciseaux », « papier », « pouce levé », « OK », « pincement », « pointer », etc. ; la main dextre exécute le geste.
4. **Main droite / gauche** : cochez « main droite » / « main gauche » pour basculer le sens du miroir du pouce.
5. **Commande directe des servomoteurs** : faites glisser les 8 curseurs pour contrôler en temps réel l'angle d'un servomoteur individuel (0-180°).
6. **Commande différentielle des doigts** (recommandée) : deux barres de progression par doigt — « Flexion ◀▶ Extension » en différentiel inverse, « Vers la droite ◀▶ Vers la gauche » en oscillation de même sens. Deux degrés de liberté indépendants, pilotés en synchronisme.
7. **Répéter / Arrêter** : répète le dernier geste / interrompt immédiatement.
8. **Journal de communication** : affiche en bas, en temps réel, les trames envoyées/reçues et les réponses.

### 4.2 Test en ligne de commande (serial_test.py)

Répertoire racine du projet :

```bash
# 链路测试(先确认能通)
python serial_test.py COM3 nop

# 手势
python serial_test.py COM3 rock         # 石头
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 张开
python serial_test.py COM3 close        # 握拳

# 单舵机直驱
python serial_test.py COM3 servo 1 90   # 舵机1 → 90°

# 全部归中
python serial_test.py COM3 mid

# 设左右手
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# 扫频/自检
python serial_test.py COM3 sweep 1      # 舵机1 扫频
python serial_test.py COM3 test         # 全部舵机逐个测试
```

### 4.3 Vérification

- Après un clic sur un geste, les servomoteurs doivent exécuter le mouvement correspondant ; le journal série renvoie `ACK` et `DONE`.
- Codes de réponse : `0x00=OK`, `0x01=commande invalide`, `0x02=erreur de paramètre`, `0x03=occupé`, `0x10=terminé`.
- Si les servomoteurs ne bougent pas du tout : voir les questions fréquentes du chapitre 6 (vérifiez d'abord l'alimentation / le port série).

> Pour une référence rapide complète des commandes de gestes et du protocole série, voir le chapitre 7.

---

## Chapitre 5 Tutoriel avancé : suivi de gestes

> Prérequis : chapitres 1 à 4 terminés (micrologiciel flashé, contrôle série opérationnel, caméra prête).
> Ce chapitre propose deux parcours ; choisissez-en un.

### 5.1 Suivi intégré à la GUI (version légère)

**Adapté à** : démonstrations rapides, sans installer dora. Caméra → mappage direct vers les servomoteurs différentiels, sans IK.

#### Prérequis

- Python 64 bits + `setup_tracking.bat` (section 1.1).
- Caméra disponible.

#### Exécution

```bash
# 项目根目录,用追踪环境启动 GUI
tracking_env\Scripts\python hand_gui.py
```

1. Sélectionnez le port série → « Connecter ».
2. Faites défiler jusqu'au panneau « suivi de gestes (caméra MediaPipe) ».
3. Sélectionnez le numéro de caméra (0 par défaut) → cliquez sur « Démarrer le suivi ».
4. Placez votre main dans le champ de la caméra, la main dextre suit la flexion/l'extension de la main.

#### Principe

- mediapipe 0.10.14 extrait les vecteurs 3D des bouts de 4 doigts (dans le repère de la main).
- `tips_to_angles()` de `hand_tracking.py` mappe chaque doigt en un angle différentiel :
  - flex (flexion/extension) : composante z pour les trois doigts, composante y pour le pouce ;
  - base (oscillation gauche/droite) : fixe à 90 (oscillation gauche/droite non implémentée pour l'instant).
- Lissage EMA intégré à la GUI (alpha=0.4) + limitation à 60 ms, pour éviter les tremblements.

#### Limites

- **Pas d'IK** : mappage direct des bouts des doigts vers les angles, précision inférieure à celle de la chaîne officielle.
- **Oscillation gauche/droite en suspens** : base fixe à 90, pas d'oscillation gauche/droite.
- Adapté aux démonstrations/prototypes ; pour un usage formel, 5.2 est recommandé.

### 5.2 Suivi IK officiel dora (version complète)

**Adapté à** : un usage formel. Chaîne officielle : caméra → mediapipe → MuJoCo+mink IK → 8 angles d'articulation → AHControl (Rust) → ESP32 → servomoteurs PWM.

#### Prérequis

- Environnement complet (Rust + uv + dora, section 1.2).
- Micrologiciel flashé (chapitre 3).
- Le YML du flux de données contient déjà le débit PWM (115200) ; aucune modification manuelle nécessaire.

#### Étape 1 : déploiement (script en un clic recommandé)

Double-cliquez sur `..\02_hand_tracking\Demo\Windows_Scripts_CN\3-部署代码.bat` (version anglaise : `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\3-Deploy_Demo.bat`), qui effectue automatiquement :
création de l'environnement Python, compilation d'AHControl (Rust), installation d'AHSimulation/HandTracking (mediapipe).

> Le premier déploiement prend quelques minutes. Le script gère déjà les variables d'environnement en interne ; aucune configuration manuelle nécessaire.

#### Étape 2 : exécution

Double-cliquez sur `..\02_hand_tracking\Demo\Windows_Scripts_CN\4-运行代码.bat` (version anglaise : `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\4-Run_Demo.bat`), puis choisissez dans le menu :

```
1 - 模拟仿真（摄像头手势追踪）
2 - 真实硬件（SCS0009 总线舵机）
3 - PWM 舵机（ESP32 直驱）   ← 选 3
```

Choisissez ensuite le type de main : `1 右手` / `2 左手`. Le script exécute automatiquement `dora build` + `dora run`.

- La fenêtre de la caméra s'ouvre ; placez la main dans le champ → les doigts de la simulation 3D suivent → la main dextre suit.
- Pour arrêter : Ctrl+C (ou fermez la fenêtre).

#### Basculement main droite / main gauche

Il suffit de choisir le type de main dans le menu d'exécution (étape 2 de la section 5.2) : `1 右手` ou `2 左手`.

> Après le basculement, le script reconstruit automatiquement le flux de données correspondant ; attendez la fin de la construction avant de poursuivre devant la caméra.

#### Comment lire les journaux d'exécution

Dans la fenêtre d'exécution, le nœud AHControl affiche en continu des journaux. Observez surtout cette ligne :

```
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N` (par exemple `sent 300 frames, ESP32 acked 300 frames`) → **normal**, l'ESP32 reçoit chaque trame.
- `M = 0` → l'ESP32 ne reçoit pas de données ; vérifiez le port série / l'alimentation (voir chapitre 6).

Tant que cette ligne augmente normalement, la liaison avec les servomoteurs est opérationnelle ; il ne reste que la question de la capacité de la caméra à suivre.

---

## Chapitre 6 Questions fréquentes (en cours d'utilisation)

> Cette section ne liste que les problèmes les plus fréquents et que vous pouvez résoudre vous-même en cours d'utilisation. Identifiez rapidement la cause à partir du symptôme.

### 6.1 Les servomoteurs ne bougent pas du tout

Vérifiez dans l'ordre :

1. **Alimentation** : les servomoteurs sont-ils branchés sur une alimentation indépendante (5V 3A ou plus) ? Avec une alimentation uniquement par USB, les servomoteurs peuvent ne pas bouger ou l'ESP32 redémarrer en boucle. → Coupez l'alimentation et redémarrez l'ESP32.
2. **Port série** : le bon port COM est-il sélectionné ? Dans le Gestionnaire de périphériques → Ports (COM et LPT), vérifiez le port correspondant à l'ESP32. Un autre programme (par ex. un terminal série) l'occupe-t-il ? → Fermez le programme qui l'occupe.
3. **Câblage** : les PWM1-8 de la carte d'adaptation sont-ils reliés aux bons GPIO ? Les fils de signal des servomoteurs sont-ils bien enfoncés ?

### 6.2 Pas d'image de la caméra

- Au premier lancement sous Windows, une demande d'autorisation de la caméra apparaît → cliquez sur « Autoriser ».
- Si vous avez choisi « Non » auparavant : Paramètres → Confidentialité et sécurité → Caméra → autoriser les applications de bureau à accéder à la caméra, puis relancez.

### 6.3 L'image de la caméra est présente, mais la main ne suit pas / le suivi est lent

- Vérifiez que la caméra est **bien orientée vers** la main, que l'éclairage est suffisant et que la main est entièrement visible dans le champ.
- Bougez plus lentement et avec une plus grande amplitude. Si les mouvements sont trop rapides ou trop petits, le suivi peut ne pas suivre.
- Les doigts bougent-ils dans la fenêtre de simulation 3D ?
  - **Oui** : la chaîne de suivi est normale, le problème vient des servomoteurs / du port série, voir 6.1.
  - **Non** : le nœud de suivi ne reconnaît pas la main, ajustez la posture / l'éclairage et réessayez.

### 6.4 Type de main inversé / sens du pouce inversé

- Main gauche/droite mal choisie ? Sélectionnez le type de main correspondant dans le menu d'exécution.
- Dans la GUI de l'ordinateur hôte, cochez « main droite » / « main gauche » pour basculer.

### 6.5 Le basculement main droite / main gauche ne prend pas effet

- Après le changement de type de main, `dora` doit reconstruire le flux de données : une fois le type de main choisi dans le menu d'exécution, `dora build` est lancé automatiquement ; attendez qu'il se termine.

### 6.6 L'image se fige en cours d'exécution / le journal s'arrête

- La caméra est peut-être occupée par une autre application (visioconférence, autre script) ; fermez-la et réessayez.
- Ou appuyez sur `Ctrl+C` pour arrêter, puis relancez.

### 6.7 Port série introuvable après changement de port USB / redémarrage de l'ordinateur

- Le numéro de port COM a peut-être changé. Confirmez le nouveau numéro COM dans le Gestionnaire de périphériques, relancez `2-配置串口.bat` (ou `2-Setup_Serial.bat`), sélectionnez une fois le port, puis relancez.

### 6.8 Toujours pas résolu ?

- Envoyez une capture d'écran des journaux du terminal d'exécution au service de maintenance en précisant : à quelle étape, quelle action, quel symptôme observé.
- Journaux clés : la ligne `[CONFIG]` au démarrage, la ligne `[ACK-STATS]` en cours d'exécution (la valeur M de `ESP32 acked M frames` est-elle proche de N).

---

## Chapitre 7 Référence rapide des commandes (annexe)

> Pour la description complète du protocole, voir `用户手册.md` dans le même répertoire. Voici une table de référence rapide.

### 7.1 Commandes de gestes

| Geste | HEX | ACK | DONE |
|------|-----|-----|------|
| NOP | `AA 00 00 00` | `BB 00 00 00` | — |
| Pierre | `AA 01 00 01` | `BB 01 00 01` | `BB 01 10 11` |
| Ciseaux | `AA 02 00 02` | `BB 02 00 02` | `BB 02 10 12` |
| Papier | `AA 03 00 03` | `BB 03 00 03` | `BB 03 10 13` |
| Pouce levé | `AA 04 00 04` | `BB 04 00 04` | `BB 04 10 14` |
| Moquerie 1 (secouer l'index) | `AA 05 00 05` | `BB 05 00 05` | `BB 05 10 15` |
| Moquerie 2 (annulaire) | `AA 06 00 06` | `BB 06 00 06` | `BB 06 10 16` |
| Ouvrir | `AA 07 00 07` | `BB 07 00 07` | `BB 07 10 17` |
| Poing fermé | `AA 08 00 08` | `BB 08 00 08` | `BB 08 10 18` |
| OK | `AA 09 00 09` | `BB 09 00 09` | `BB 09 10 19` |
| Pincement | `AA 0A 00 0A` | `BB 0A 00 0A` | `BB 0A 10 1A` |
| Pointer | `AA 0C 00 0C` | `BB 0C 00 0C` | `BB 0C 10 1C` |

### 7.2 Commandes de contrôle

| Commande | HEX | Description |
|------|-----|------|
| Répéter | `AA FE 00 FE` | Répéter le dernier geste |
| Arrêter | `AA FF 00 FF` | Interrompre immédiatement |
| Définir la main droite | `AA F1 01 01 F1` | — |
| Définir la main gauche | `AA F1 01 02 F2` | — |
| Commande directe | `AA F0 08 [8×角度] CKSUM` | angle sur 8 octets |

### 7.3 Format de trame

```
帧头(0xAA) + 命令(CMD) + 长度(LEN) + 数据(DATA) + 校验和(CKSUM)
CKSUM = CMD ^ LEN ^ DATA[0] ^ ... ^ DATA[N-1]
响应: 帧头(0xBB) + CMD + STATUS + (CMD^STATUS)
```

### 7.4 Outils de l'ordinateur hôte

| Outil | Commande | Usage |
|------|------|------|
| GUI | `tracking_env\Scripts\python hand_gui.py` | Visualisation des gestes + commande directe + différentiel + suivi |
| Exe packagé | `dist/AmazingHand控制台.exe` | Visualisation sans installation de Python (sans suivi) |
| Ligne de commande | `python serial_test.py COMx <cmd>` | Tests automatisés |

### 7.5 Fichiers de flux de données de suivi (version PWM)

| Usage | Fichier |
|------|------|
| Suivi PWM main gauche | `dataflow_tracking_real_left_pwm.yml` |
| Suivi PWM main droite | `dataflow_tracking_real_right_pwm.yml` |
| Configuration PWM main gauche | `AHControl/config/l_hand_pwm.toml` |
| Configuration PWM main droite | `AHControl/config/r_hand_pwm.toml` |
