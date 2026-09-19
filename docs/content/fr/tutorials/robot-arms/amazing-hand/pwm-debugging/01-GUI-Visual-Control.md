---
title: "01-Contrôle visuel par GUI"
description: "Contrôle visuel par GUI de l'AmazingHand version PWM (ESP32-S3) : console PC à boutons de gestes, curseurs des 8 servomoteurs et suivi par caméra."
---

# 01-Contrôle visuel par GUI

Commandes de gestes visuelles — Tutoriel d'utilisation

Ce dossier fournit un **outil de contrôle pour ordinateur hôte** : après avoir connecté l'ESP32, cliquez sur des boutons ou tapez des commandes sur l'ordinateur pour faire exécuter des gestes à la main dextre.

> Applicable à : ESP32-S3 + 8 servomoteurs PWM (commande différentielle). Pour le flashage du micrologiciel, voir les instructions de `..\03_firmware_docs`.

## 1. Deux modes d'utilisation

|Mode|Nécessaire|Adapté à|
|---|---|---|
|**Programme packagé** (recommandé)|Double-clic sur `AmazingHand控制台.exe`|Aucune installation de Python, utilisation immédiate|
|**Exécution depuis le code source**|Python 3.12 64 bits|Nécessaire pour le suivi de gestes ou la personnalisation|

## 2. Mode 1 : double-clic sur l'exe

1. Double-cliquez sur `AmazingHand控制台.exe`.

2. **Sélection du port série** : dans la liste déroulante en haut, sélectionnez le port COM de l'ESP32 (à vérifier dans le gestionnaire de périphériques).

3. Cliquez sur **« Connecter »** : le voyant d'état passe au vert, le journal affiche « connecté ».

4. Cliquez sur un bouton de geste : **pierre / ciseaux / papier / pouce levé / OK / pincement / pointer / ouvrir / poing fermé**, la main dextre l'exécute.

5. **Main droite / gauche** : cochez « main droite » / « main gauche » pour basculer (le sens du miroir du pouce est différent).

6. **Commande directe des servomoteurs** : faites glisser les 8 curseurs pour contrôler en temps réel l'angle d'un servomoteur individuel (0-180°).

7. **Commande différentielle des doigts** : deux barres de progression par doigt —

    - **Flexion ◀▶ Extension** : le doigt se fléchit ou s'étend (plage -70 ~ +70).

    - **Vers la droite ◀▶ Vers la gauche** : le doigt oscille à gauche et à droite (plage 60 ~ 120, 90 = neutre).

8. **Répéter / Arrêter** : répète le dernier geste / interrompt immédiatement.

## 3. Mode 2 : exécution depuis le code source

### Installer les dépendances

Nécessite **Python 3.12 64 bits** (mediapipe ne prend en charge que le 64 bits).

```Bash
# 1. Installer les dépendances de base
pip install -r requirements.txt

# 2. Installer les dépendances de suivi (crée automatiquement un environnement virtuel si le suivi des gestes est nécessaire)
setup_tracking.bat
```

### Exécution

```Bash
# Lancer avec l'environnement de suivi (avec mediapipe)
tracking_env\Scripts\python hand_gui.py
```

> Ou directement `python hand_gui.py` (n'importe quel Python disposant de pyserial).

### Suivi de gestes intégré à la GUI

La GUI intègre un panneau **suivi de gestes** (la caméra suit les mouvements de la main) :

1. Après avoir connecté le port série, faites défiler jusqu'au panneau « suivi de gestes (caméra MediaPipe) ».

2. Sélectionnez le numéro de caméra (0 par défaut), puis cliquez sur **« Démarrer le suivi »**.

3. Placez votre main dans le champ de la caméra, la main dextre suit la flexion/l'extension.

> Le suivi nécessite que `setup_tracking.bat` ait installé mediapipe. L'exe sans installation n'inclut pas la fonction de suivi.

## 4. Test en ligne de commande (serial_test.py)

```Bash
# Test de liaison (vérifier d'abord qu'elle passe)
python serial_test.py COM3 nop

# Geste
python serial_test.py COM3 rock         # Pierre
python serial_test.py COM3 thumbs_up    # Pouce levé
python serial_test.py COM3 index        # Pointer
python serial_test.py COM3 open         # Ouvrir
python serial_test.py COM3 close        # Poing fermé

# Entraînement direct d'un seul servo
python serial_test.py COM3 servo 1 90   # Servomoteur 1 → 90°

# Tout au centre
python serial_test.py COM3 mid

# Définir la main gauche/droite
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# Balayage de fréquence/autotest
python serial_test.py COM3 sweep 1      # Balayage de fréquence du servomoteur 1
python serial_test.py COM3 test         # Test de chaque servomoteur un par un
```

## 5. Questions fréquentes

|Symptôme|Solution|
|---|---|
|Les servomoteurs ne bougent pas|Vérifiez l'alimentation (alimentation indépendante 5V 3A), le port COM et le câblage|
|L'exe se ferme brutalement|Exécutez en mode code source (la version packagée peut manquer de dépendances)|
|Pas d'image de la caméra|Autorisez l'accès à la caméra (Paramètres → Confidentialité → Caméra)|
|Le geste de la main est inversé|Cochez la main droite/gauche opposée|

> Pour la description complète du protocole et des commandes, voir `..\03_firmware_docs\用户手册.md`.

