---
title: Tutoriel d'utilisation du robot mobile Lekiwi
description: "Guide complet du robot mobile Lekiwi basé sur LeRobot : installation, configuration des moteurs, téléopération, collecte de données, entraînement et évaluation"
---

# Tutoriel d'utilisation du robot mobile Lekiwi

> [!Remarque] Ce tutoriel suit la documentation officielle LeRobot. En cas de problème logiciel ou de dépendance insoluble, signalez-le à la [plateforme LeRobot](https://github.com/huggingface/lerobot) ou au [canal Discord LeRobot](https://discord.gg/8TnwDdjFGU).

## Principales caractéristiques

1. **Open source et économique** : [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) propose une solution de robot mobile open source à faible coût.
2. **Intégration LeRobot** : conçu pour s'intégrer à la [plateforme LeRobot](https://github.com/huggingface/lerobot).
3. **Ressources d'apprentissage complètes** : guides d'assemblage et de calibration, tutoriels de test, collecte de données, entraînement et déploiement pour démarrer rapidement.
4. **Compatible Nvidia** : utilisable avec le reComputer Mini J4012 Orin NX 16 Go.
5. **Applications variées** : éducation, recherche, production automatisée et robotique – opérations robotiques efficaces et précises.

JUXI n'est responsable que de la qualité du matériel. Les tutoriels suivent strictement la documentation officielle.

**Attention**
- Tous les servos du châssis Lekiwi nécessitent une alimentation 12 V. Pour les bras 5 V, nous fournissons un module abaisseur 12 V→5 V ; les modifications de circuit sont à votre charge.
- Alimentation 12 V – option au moment de la commande. Avec une alimentation 12 V existante, il suffit de convertir la sortie en prise DC 5521.
- Contrôleur Raspberry Pi et caméra – à acheter séparément via l'interface de commande.

## Liste de matériel (BOM)



## Environnement système initial

**Pour Ubuntu x86 :**
- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6

**Pour Jetson Orin :**
- Jetson JetPack 6.0
- Python 3.10
- Torch 2.3+

**Pour Raspberry Pi :**
- Raspberry Pi 5, 4G–16G

### Configurer SSH

Après la configuration du Raspberry Pi, activez et configurez [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell Protocol) pour vous connecter depuis votre ordinateur portable sans écran, clavier ni souris. Un bon [tutoriel](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh) est disponible. Connectez-vous via l'invite de commande (cmd) ou, avec VSCode, via [cette](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension.

## Guide d'impression 3D

### Pièces

Nous fournissons des fichiers STL imprimables pour les pièces suivantes. Elles se impriment sur une imprimante FDM grand public avec du PLA standard. Testées sur une Bambu Lab P1S : charger dans bambuslicer, laisser tourner/arranger automatiquement et activer les supports recommandés.

### Paramètres d'impression

Les STL s'impriment directement sur de nombreuses FDM. Réglages testés et recommandés (d'autres peuvent fonctionner) :

- Matériau : PLA+
- Diamètre de buse et précision : buse 0,2 mm, hauteur de couche 0,2 mm
- Densité de remplissage : 15 %
- Vitesse d'impression : 150 mm/s
- Au besoin, charger le G-code (fichier slicé) et imprimer

# Installer LeRobot

Sur votre Raspberry Pi :

### 1. [Installer Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir *-p* ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh *-O* ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh *-b* *-u* *-p* ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. Redémarrer le Shell

Coller dans votre Shell : `source ~/.bashrc` ou pour Mac : `source ~/.bash_profile` ou `source ~/.zshrc` (si zshell)

### 3. Créer et activer un nouvel environnement Conda pour LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Puis activer l'environnement Conda (à chaque ouverture de Shell utilisant LeRobot !) :

```Bash
conda activate lerobot
```

### 4. Cloner LeRobot :

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Installer ffmpeg dans votre environnement :

Avec `miniconda`, installer `ffmpeg` dans l'environnement :

```PowerShell
conda install ffmpeg -c conda-forge
```

Cela installe généralement ffmpeg 7.X compilé avec l'encodeur libsvtav1. Si libsvtav1 n'est pas supporté (vérifiable avec `ffmpeg -encoders`) :

【Toutes plateformes】installer explicitement ffmpeg 7.X :
`conda install ffmpeg=7.1.1 -c conda-forge`

【Linux uniquement】installer les dépendances de build de ffmpeg et le compiler depuis les sources avec libsvtav1 ; vérifier avec `which ffmpeg` que le bon exécutable est utilisé.

En cas d'erreur ci-dessous, la commande ci-dessus la résout aussi.



### 6. Installer LeRobot avec les dépendances moteurs feetech :

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

### 7. Régler le temps de connexion

Dans `lerobot\src\lerobot\robots\lekiwi`, trouver config_lekiwi.py
connection_time_s: int = 7200 # soit 2 heures



## C. Installer LeRobot sur l'ordinateur portable

Si LeRobot est déjà installé sur le portable, passer cette étape ; sinon suivre les **mêmes étapes** que sur le Raspberry Pi.

> [!Astuce] Nous utilisons souvent l'invite de commande (cmd). En cas de besoin : [cours accéléré de ligne de commande](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line).

Sur votre ordinateur :

### 1. [Installer Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

### 2. Redémarrer le Shell

Coller : `source ~/.bashrc` ou pour Mac : `source ~/.bash_profile` ou `source ~/.zshrc` (si zshell)



### 3. Créer et activer un environnement Conda pour LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Puis activer l'environnement (à chaque utilisation de LeRobot !) :

```Bash
conda activate lerobot
```

### 4. Cloner LeRobot :

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Installer ffmpeg :

Avec `miniconda`, installer `ffmpeg` :

```PowerShell
conda install ffmpeg -c conda-forge
```

Cela installe généralement ffmpeg 7.X avec libsvtav1. Si non supporté (`ffmpeg -encoders`) :

【Toutes plateformes】installer explicitement ffmpeg 7.X :
`conda install ffmpeg=7.1.1 -c conda-forge`

【Linux uniquement】installer les dépendances de build et compiler ffmpeg avec libsvtav1 ; vérifier avec `which ffmpeg`.

En cas d'erreur ci-dessous, la commande ci-dessus la résout aussi.



### 6. Installer LeRobot avec les dépendances feetech :

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

# Configurer les moteurs





### **1. Trouver le port USB associé au bras robotique**

Pour le bon port d'un moteur, exécuter deux fois ce script utilitaire :

```Bash
lerobot-find-port
```

Exemple de sortie (par ex. `/dev/tty.usbmodem575E0031751` sur Mac, ou `/dev/ttyACM0` sous Linux) :

Exemple de sortie (par ex. `/dev/tty.usbmodem575E0032081` sur Mac, ou `/dev/ttyACM1` sous Linux) :

Dépannage : sous Linux, il faut peut-être accorder l'accès au port USB :

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2. Configurer vos moteurs (passable sur le produit fini)**

Insérer chaque moteur du châssis un par un et exécuter ce script – il initialise d'abord les servos du bras (ID 6..1), puis ceux du châssis en définissant leurs ID (ID 9..7). Si le bras est déjà calibré, appuyer sur Entrée en continu pour écraser et passer :

```Bash
lerobot-setup-motors \
    *--robot.type*=lekiwi \
    *--robot.port*=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```



### 3. Configurer le miroir HuggingFace

- Ubuntu

```Shell
sudo nano ~/.bashrc
# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT
# 输出
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc
# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc
# 输出
# https://hf-mirror.com
```

#### ①Créer un token

https://huggingface.co/settings/tokens







#### ②Noter le token

Par exemple, le mien :

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### ③Lier le token

```Shell
hf auth login
hf auth whoami
```



## Téléopération

Se connecter au Raspberry Pi en SSH, activer l'environnement et lancer le script hôte :

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```



Puis, sur le portable, activer `conda activate lerobot` et lancer :

```Bash
python examples/lekiwi/teleoperate.py
```

L'écran du portable doit afficher : `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.`Vous pouvez maintenant bouger le bras de contrôle et utiliser (W, A, S, D) pour avancer, tourner à gauche, reculer, tourner à droite. (Z, X) pour tourner à gauche/droite. (R, F) pour augmenter/réduire la vitesse. Trois modes de vitesse – voir tableau :

Avec un autre clavier, modifier les touches dans [`LeKiwiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py).

## Dépannage de la communication

En cas de problème de connexion au robot mobile SO101, suivre ces étapes.

### 1. Vérifier la configuration de l'adresse IP

S'assurer que la bonne adresse IP du Raspberry Pi est dans le fichier de configuration. Pour la vérifier (dans la console du Pi) :

```Bash
hostname *-I*
```

### 2. Vérifier que l'ordinateur portable/PC atteint le Pi

Ping depuis le portable :

```Bash
ping <your_pi_ip_address>
```

Si le ping échoue :
- Le Pi est-il allumé et sur le même réseau ?
- SSH est-il activé sur le Pi ?

### 3. Essayer une connexion SSH

Si aucun login SSH : connexion peut-être incorrecte. Commande :

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

par ex. `ssh pi@192.168.0.106`

En cas d'erreur de connexion :
- Activer SSH sur le Pi :

```Bash
sudo raspi-config
```

- Puis naviguer : **Interfacing Options -\> SSH** et l'activer.

### 4. Cohérence des fichiers de configuration !!!

S'assurer que les fichiers de configuration sur le portable/PC et le Raspberry Pi sont strictement identiques.

# G. Enregistrer un dataset

Après familiarisation avec la téléopération, enregistrer le premier dataset avec LeKiwi.

Pour démarrer, se connecter au Raspberry Pi en SSH, activer l'environnement et lancer le script :

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Pour l'upload via le Hub, si non connecté, se connecter avec un token en écriture (création sous [Hugging Face Settings](https://huggingface.co/settings/tokens)) :

```Shell
hf auth login
hf auth whoami
```

Stocker le nom du dépôt Hugging Face dans une variable :

```Bash
hostname *-I*
```

Puis sur le portable, enregistrer 2 épisodes et uploader vers le hub :

```Bash
python examples/lekiwi/record.py
```

# H. Visualiser le dataset

Un dataset uploadé se visualise [en ligne](https://huggingface.co/spaces/lerobot/visualize_dataset) – copier l'ID de dépôt généré :

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

Sans upload, visualisation locale (navigateur via `http://127.0.0.1:9090`) :

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id *${HF_USER}*/lekiwi_test \
  --local-files-only 1
```

### Visualiser un dataset (passable, optionnel)

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

Avec upload, également en local :

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

Sans upload, également en local :

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Ici, `juxi` est le `repo_id` personnalisé lors de la collecte.

#### Conseils de collecte

Après familiarisation, créer des datasets plus grands. Bonne tâche de départ : saisir des objets à différentes positions et les mettre dans un conteneur. Au moins 50 épisodes, 10 par position. Caméra fixe, geste de saisie cohérent. L'objet doit rester clairement visible ; critère simple : la tâche doit pouvoir être réalisée en ne regardant que l'image caméra.

Au chapitre suivant, vous entraînerez le réseau de neurones. Après un bon taux de réussite, introduire davantage de variation (positions, techniques, position caméra).

Éviter trop de variation trop vite – cela peut affecter les résultats.

Pour approfondir : [article de blog sur les bons datasets](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset).

#### Dépannage :
