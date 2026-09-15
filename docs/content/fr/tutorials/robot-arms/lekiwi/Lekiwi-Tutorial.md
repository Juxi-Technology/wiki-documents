---
title: Tutoriel d'utilisation du robot mobile Lekiwi
description: "Guide complet du robot mobile Lekiwi basé sur LeRobot : installation, configuration des moteurs, téléopération, collecte de données, entraînement et évaluation"
---

# Tutoriel d'utilisation du robot mobile Lekiwi

> **[Acheter en boutique](https://www.juxitech.com/fr/products/lekiwi-embodied-intelligence-mobile-robotic-car)**


Le bras leader (noir) utilise un adaptateur 5V 6A, tandis que le bras follower (blanc) utilise un adaptateur 12V 5A

lerobot-Lekiwi.zip

Le code de ce dépôt de tutoriel est maintenu à la version stable de Lerobot testée avant le 1er mars 2026. Actuellement, Hugging Face a considérablement mis à jour Lerobot, en ajoutant un grand nombre de nouvelles fonctions. Si vous souhaitez bénéficier du tutoriel le plus récent, suivez la [documentation officielle](https://huggingface.co/docs/lerobot/lekiwi) pour les opérations.

[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) est un projet de robot mobile entièrement open source lancé par [SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC). Il comprend des fichiers d'impression 3D détaillés et des guides d'utilisation, et est conçu pour être compatible avec le framework d'apprentissage par imitation [LeRobot](https://github.com/huggingface/lerobot/tree/main). Il prend en charge le bras robotique SO101, permettant ainsi un processus complet d'apprentissage par imitation.

[*Les positions précises des composants peuvent être visualisées dans Fusion360 Online CAD*](https://a360.co/4k1P8yO)*.*

[Fichier URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Aperçu URDF en ligne https://urdf.d-robotics.cc/

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

## Principales caractéristiques

1. **Open source et économique** : [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) propose une solution de robot mobile open source à faible coût.

2. **Intégration avec LeRobot** : conçu spécifiquement pour s'intégrer à la [plateforme LeRobot](https://github.com/huggingface/lerobot).

3. **Ressources d'apprentissage abondantes** : fournit des ressources d'apprentissage open source complètes, incluant des guides d'assemblage et de calibration, ainsi que des tutoriels de test, de collecte de données, d'entraînement et de déploiement, pour aider les utilisateurs à démarrer rapidement et à développer des applications robotiques.

4. **Compatible Nvidia** : utilisable conjointement avec le reComputer Mini J4012 Orin NX 16 Go.

5. **Applications multi-scénarios** : adapté à l'éducation, à la recherche scientifique, à la production automatisée et au domaine de la robotique, pour aider les utilisateurs à réaliser des opérations robotiques efficaces et précises dans diverses tâches complexes.

JUXI n'est responsable que de la qualité du matériel lui-même. Les tutoriels sont mis à jour strictement conformément à la documentation officielle. Si vous rencontrez des problèmes logiciels ou des problèmes de dépendances d'environnement que vous ne parvenez vraiment pas à résoudre, veuillez signaler rapidement le problème à la [plateforme LeRobot](https://github.com/huggingface/lerobot) ou au [canal Discord LeRobot](https://discord.gg/8TnwDdjFGU).

**Attention**

- Tous les servos du châssis Lekiwi nécessitent une alimentation 12 V. Pour les utilisateurs d'un bras robotique 5 V, nous fournissons un module abaisseur 12 V vers 5 V. Veuillez noter que vous devrez modifier le circuit vous-même.

- Alimentation 12 V – si nécessaire, vous pouvez sélectionner cette option au moment de la commande. Si vous possédez déjà une alimentation 12 V, il suffit de convertir l'interface de sortie d'alimentation en prise DC 5521.

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

- Raspberry Pi 5 4G~16G

### Configurer SSH

Après la configuration du Raspberry Pi, vous devez activer et configurer [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell Protocol), afin de pouvoir vous connecter au Raspberry Pi depuis votre ordinateur portable sans lui brancher d'écran, de clavier ni de souris. Vous pouvez [trouver un excellent tutoriel ici](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh). Vous pouvez vous connecter au Raspberry Pi via l'invite de commande (cmd), ou si vous utilisez VSCode, vous pouvez utiliser [cette](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension.

## Guide d'impression 3D

### Pièces

Nous fournissons des fichiers STL imprimables pour les pièces imprimées en 3D suivantes. Ces pièces peuvent être imprimées sur des imprimantes FDM grand public avec des filaments PLA génériques. Nous les avons testées sur l'imprimante Bambu Lab P1S. Pour tous les composants, nous les avons simplement chargés dans bambuslicer, automatiquement tournés et disposés, activé les supports recommandés, puis imprimés.

### Paramètres d'impression

Les fichiers STL fournis peuvent être imprimés directement sur de nombreuses imprimantes FDM. Voici les réglages testés et recommandés ; d'autres réglages peuvent également fonctionner.

- Matériau : PLA+

- Diamètre de buse et précision : buse 0,2 mm, hauteur de couche 0,2 mm

- Densité de remplissage : 15 %

- Vitesse d'impression : 150 mm/s

- Si nécessaire, téléverser le G-code (fichier slicé) sur l'imprimante et imprimer

# Installer LeRobot

Sur votre Raspberry Pi :

### 1. [Installer Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install) :

```Python
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. Redémarrer le Shell

Copier et coller la commande suivante dans votre Shell : `source ~/.bashrc` ou pour les utilisateurs Mac : `source ~/.bash_profile` ou `source ~/.zshrc` (si vous utilisez zsh)

### 3. Créer et activer un nouvel environnement Conda pour LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Puis activer votre environnement Conda (à faire à chaque ouverture du Shell pour utiliser LeRobot !) :

```Bash
conda activate lerobot
```

### 4. Cloner LeRobot :

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Installer ffmpeg dans votre environnement :

Avec `miniconda`, installer `ffmpeg` dans votre environnement :

```PowerShell
conda install ffmpeg -c conda-forge
```

Cela installe généralement ffmpeg 7.X compilé avec l'encodeur libsvtav1 pour votre plateforme. Si libsvtav1 n'est pas pris en charge (vous pouvez vérifier les encodeurs pris en charge via `ffmpeg -encoders`), vous pouvez :

【Pour toutes les plateformes】Installer explicitement ffmpeg 7.X :

`conda install ffmpeg=7.1.1 -c conda-forge`

[Linux uniquement] Installer les dépendances de build de ffmpeg et compiler ffmpeg avec la prise en charge de libsvtav1 depuis les sources, et s'assurer que l'exécutable ffmpeg utilisé est le bon, ce qui peut être confirmé via `which ffmpeg`.

Si vous rencontrez l'erreur suivante, vous pouvez également utiliser la commande ci-dessus pour la résoudre.

![5. Installer ffmpeg dans votre environnement : – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

### 6. Installer LeRobot avec les dépendances moteurs feetech :

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

### 7. Régler le temps de connexion

Trouver le fichier config_lekiwi.py dans le répertoire `lerobot\src\lerobot\robots\lekiwi`

connection_time_s: int = 7200 # 也就是2小时

![7. Régler le temps de connexion – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)



## C. Installer LeRobot sur l'ordinateur portable

Si LeRobot est déjà installé sur votre ordinateur portable, vous pouvez passer cette étape ; sinon, suivez les mêmes étapes que nous avons suivies sur le Raspberry Pi **pour continuer**.

> [!Tip] Nous utiliserons fréquemment l'invite de commande (cmd). Si vous n'êtes pas familier avec cmd ou souhaitez revoir l'utilisation de la ligne de commande, vous pouvez vous référer à ceci : [Cours intensif de ligne de commande](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)
> 

Sur votre ordinateur :

### 1. [Installer Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install) :

### 2. Redémarrer le Shell

Copier et coller la commande suivante dans votre Shell : `source ~/.bashrc` ou pour les utilisateurs Mac : `source ~/.bash_profile` ou `source ~/.zshrc` (si vous utilisez zsh)

![2. Redémarrer le Shell – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

### 3. Créer et activer un nouvel environnement Conda pour LeRobot

```Bash
conda create -y -n lerobot python=3.10
```

Puis activer votre environnement Conda (à faire à chaque ouverture du Shell pour utiliser LeRobot !) :

```Bash
conda activate lerobot
```

### 4. Cloner LeRobot :

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Installer ffmpeg dans votre environnement :

Avec `miniconda`, installer `ffmpeg` dans votre environnement :

```PowerShell
conda install ffmpeg -c conda-forge
```

Cela installe généralement ffmpeg 7.X compilé avec l'encodeur libsvtav1 pour votre plateforme. Si libsvtav1 n'est pas pris en charge (vous pouvez vérifier les encodeurs pris en charge via `ffmpeg -encoders`), vous pouvez :

【Pour toutes les plateformes】Installer explicitement ffmpeg 7.X :

`conda install ffmpeg=7.1.1 -c conda-forge`

[Linux uniquement] Installer les dépendances de build de ffmpeg et compiler ffmpeg avec la prise en charge de libsvtav1 depuis les sources, et s'assurer que l'exécutable ffmpeg utilisé est le bon, ce qui peut être confirmé via `which ffmpeg`.

Si vous rencontrez l'erreur suivante, vous pouvez également utiliser la commande ci-dessus pour la résoudre.

![5. Installer ffmpeg dans votre environnement : – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

### 6. Installer LeRobot avec les dépendances moteurs feetech :

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

# Configurer les moteurs

![6. Installer LeRobot avec les dépendances moteurs feetech : – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![6. Installer LeRobot avec les dépendances moteurs feetech : – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

### **1. Trouver le port USB associé au bras robotique**

Pour trouver le bon port d'un moteur, exécuter le script utilitaire suivant deux fois :

```Bash
lerobot-find-port
```

Exemple de sortie (par ex. `/dev/tty.usbmodem575E0031751` sur Mac, ou `/dev/ttyACM0` sous Linux) :

Exemple de sortie (par ex. `/dev/tty.usbmodem575E0032081` sur Mac, ou `/dev/ttyACM1` sous Linux) :

Dépannage : sous Linux, il peut être nécessaire d'accorder l'accès au port USB via la commande suivante :

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2. Configurer vos moteurs (les produits finis peuvent passer cette étape)**

Insérer chaque moteur de votre châssis en séquence et exécuter le script suivant. Il initialisera d'abord les servos du bras robotique (ID 6..1), puis initialisera les servos du châssis, en définissant leurs ID (ID 9..7). Si vous avez déjà calibré le bras robotique, vous pouvez appuyer continuellement sur Entrée pour écraser et passer :

```Bash
lerobot-setup-motors \
    --robot.type=lekiwi \
    --robot.port=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```

![2. Configurer vos moteurs les produits finis peuvent passer cette étape – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

### 3. Configurer le miroir HuggingFace domestique

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

![①Créer un token – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![①Créer un token – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![①Créer un token – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

#### ②Noter le token

Par exemple, le mien est :

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### ③Lier le token

```Shell
hf auth login

hf auth whoami
```

![③Lier le token – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

#### ④Créer un dépôt de dataset

**Noter le nom du Owner et du Dataset, qui sont les \<hf_username\> et \<dateset_repo_id\> nécessaires plus tard**

![④Créer un dépôt de dataset – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![④Créer un dépôt de dataset – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

![④Créer un dépôt de dataset – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

### 4. Mettre à jour la configuration !!!

Les fichiers de configuration sur LeKiwi LeRobot et l'ordinateur portable doivent être cohérents. Tout d'abord, nous devons trouver l'**adresse IP** du Raspberry Pi pour le robot mobile. Il s'agit de la même adresse IP que celle utilisée pour SSH. Nous devons également trouver le **port USB** de la carte driver de servos du bras leader sur l'ordinateur portable et le **port de la carte driver de servos sur LeKiwi**. Ces ports peuvent être trouvés via le script suivant.

Sous Linux, il peut être nécessaire d'accorder l'accès au port USB en exécutant la commande suivante :

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

Remarque importante : maintenant que vous avez obtenu le numéro de port du bras leader et l'adresse IP du robot Lekiwi, veuillez mettre à jour **ip** dans la configuration réseau, mettre à jour **port** dans la configuration du bras leader, et mettre à jour **port, remote_ip** dans la configuration LeKiwi.

Modifier ces quatre fichiers sous le répertoire example\\lekiwi

![4. Mettre à jour la configuration !!! – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

#### ①Modifier teleoperate.py

remote_ip : adresse IP du Raspberry Pi

port : numéro de port lorsque le bras leader est connecté à un ordinateur ou à Linux

![①Modifier teleoperate.py – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

#### ②Modifier record.py

HF_REPO_ID : [nom d'utilisateur et nom du dataset sur Hugging Face](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

remote_ip : adresse IP du Raspberry Pi

port : numéro de port lorsque le bras leader est connecté à un ordinateur ou à Linux

![②Modifier record.py – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

#### ③Modifier replay.py

remote_ip : adresse IP du Raspberry Pi

\<hf_username\>/\<dataset_repo_id\>, c'est-à-dire [le nom d'utilisateur et le nom du dataset Hugging Face](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

![③Modifier replay.py – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

## Calibration

Nous devons maintenant calibrer le bras leader et le bras follower. Les servos des roues omnidirectionnelles n'ont pas besoin de calibration.

### Calibrer le bras follower (monté sur la base Lekiwi)

Exécuter la commande suivante sur votre ordinateur pour calibrer le bras leader. Remarque : l'image affichée ici est un exemple pour le modèle SO101.

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ #修改为找到的端口号
    --teleop.id=my_awesome_leader_arm
```

Exécuter maintenant la commande suivante sur votre Raspberry Pi pour calibrer le bras follower du LeKiwi. Ignorez sa position actuelle sur la table - la calibration normale doit être effectuée lorsqu'il est installé sur le châssis Lekiwi.

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

Nous avons unifié les méthodes de calibration pour la plupart des robots. Premièrement, nous devons déplacer le robot vers une position où chaque articulation est à son **milieu de la plage de mouvement**, puis appuyer sur le bouton. Deuxièmement, nous déplaçons toutes les articulations sur toute leur plage. Vous pouvez [trouver ici](https://huggingface.co/docs/lerobot/en/so101#calibration-video) une vidéo du même processus de calibration pour le SO101 comme référence.

# F. Téléopération

Ouvrir une nouvelle invite Anaconda

![Calibrer le bras follower monté sur la base Lekiwi – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

> Si vous utilisez un Mac, vous devrez peut-être accorder à « Terminal » la permission d'accéder au clavier pour la téléopération. Veuillez aller dans « Réglages Système » > « Sécurité & Confidentialité » > « Surveillance de la saisie », puis cocher la case « Terminal ».
> 

Pour la téléopération, connectez-vous à votre Raspberry Pi via SSH et exécutez la commande suivante pour activer l'environnement `conda activate lerobot`, puis exécutez le script suivant :

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![Calibrer le bras follower monté sur la base Lekiwi – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

Ensuite, sur votre ordinateur portable, exécutez également la commande suivante pour activer l'environnement `conda activate lerobot`, puis exécutez le script suivant :

```Bash
python examples/lekiwi/teleoperate.py
```

L'écran de votre ordinateur portable doit afficher une interface similaire à celle-ci : `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.`Vous pouvez maintenant déplacer le bras de contrôle et utiliser les touches (W, A, S, D) du clavier pour contrôler le robot : avancer, tourner à gauche, reculer et tourner à droite. Utilisez les touches (Z, X) pour faire tourner le robot à gauche ou à droite. Utilisez les touches (R, F) pour augmenter ou réduire la vitesse du robot mobile. Il existe au total trois modes de vitesse ; veuillez vous référer au tableau suivant :

Si vous utilisez un autre clavier, vous pouvez modifier les réglages de touches de chaque commande dans [`LeKiwiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py).

## Dépannage de la communication

Si vous rencontrez des problèmes de connexion au robot mobile SO101, suivez les étapes ci-dessous pour diagnostiquer et résoudre le problème.

### 1. Vérifier la configuration de l'adresse IP

Assurez-vous que la bonne adresse IP du Raspberry Pi est définie dans le fichier de configuration. Pour vérifier l'adresse IP du Raspberry Pi, exécutez la commande suivante (dans la ligne de commande du Pi) :

```Bash
hostname -I
```

### 2. Vérifier si l'ordinateur portable/PC peut accéder au Pi

Essayez de pinger le Raspberry Pi depuis l'ordinateur portable :

```Bash
ping <your_pi_ip_address>
```

Si le ping échoue :

- Assurez-vous que le Pi est allumé et connecté au même réseau.

- Vérifiez si SSH est activé sur le Pi.

### 3. Essayer une connexion SSH

Si vous ne pouvez pas vous connecter au Pi via SSH, cela peut être dû à une connexion incorrecte. Veuillez utiliser la commande suivante :

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

Par exemple `ssh pi@192.168.0.106`

Si une erreur de connexion se produit :

- Pour vous assurer que SSH est activé sur le Pi, vous pouvez exécuter la commande suivante :

```Bash
sudo raspi-config
```

- Puis naviguer vers : **Interfacing Options -\> SSH** et l'activer.

### 4. Cohérence des fichiers de configuration !!!

Assurez-vous que les fichiers de configuration sur l'ordinateur portable/PC et le Raspberry Pi sont exactement les mêmes.

# G. Enregistrer un dataset

Après vous être familiarisé avec la téléopération, vous pouvez utiliser LeKiwi pour enregistrer votre premier dataset.

Pour démarrer le programme sur LeKiwi, connectez-vous à votre Raspberry Pi via SSH et exécutez les commandes suivantes pour activer l'environnement et démarrer le script :

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Si vous souhaitez utiliser la fonctionnalité du hub Hugging Face pour téléverser un dataset et ne vous êtes pas connecté auparavant, assurez-vous de vous connecter avec un token disposant de droits d'écriture, qui peut être généré depuis les [réglages Hugging Face](https://huggingface.co/settings/tokens) :

```Bash
hf auth login
```

Stocker le nom de votre dépôt Hugging Face dans une variable pour exécuter la commande suivante :

```Bash
hf auth whoami
```

Puis exécutez la commande suivante sur votre ordinateur portable pour enregistrer 2 épisodes et téléverser le dataset sur le hub :

```Bash
python examples/lekiwi/record.py
```

# H. Visualiser le dataset

Si vous avez téléversé un dataset, vous pouvez [visualiser votre dataset en ligne](https://huggingface.co/spaces/lerobot/visualize_dataset) et copier-coller l'ID de dépôt généré par la commande suivante :

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

Si vous n'avez pas téléversé de dataset, vous pouvez également effectuer la visualisation en local (la fenêtre du navigateur peut ouvrir l'outil de visualisation via `http://127.0.0.1:9090`) :

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id *${HF_USER}*/lekiwi_test \
  --local-files-only 1
```

### Visualiser un dataset (optionnel, peut être tenté)

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Si vous avez téléversé un dataset, vous pouvez également le visualiser en local à l'aide de la commande suivante :

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

Si vous n'avez pas téléversé de dataset, vous pouvez également le visualiser en local à l'aide de la commande suivante :

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Ici, `juxi` est le nom `repo_id` personnalisé lors de la collecte de données.

#### Techniques de collecte de données

Une fois que vous maîtrisez l'enregistrement de données, vous pouvez créer des datasets plus volumineux pour l'entraînement. Une bonne tâche de départ consiste à saisir des objets depuis différentes positions et à les placer dans des conteneurs. Nous recommandons d'enregistrer au moins 50 épisodes, avec 10 épisodes pour chaque position. Gardez la position de la caméra fixe et maintenez des gestes de saisie cohérents pendant l'enregistrement. De plus, assurez-vous que les objets que vous manipulez sont clairement visibles dans le cadre de la caméra. Un critère simple : vous devriez pouvoir accomplir cette tâche en observant uniquement le flux de la caméra.

Dans les chapitres suivants, vous entraînerez votre réseau de neurones. Après avoir obtenu des performances de saisie fiables, vous pourrez commencer à introduire davantage de variations pendant le processus de collecte de données, comme augmenter les positions de saisie, adopter différentes techniques de saisie et changer les positions de la caméra.

Évitez d'ajouter trop de changements trop rapidement, car cela pourrait affecter vos résultats.

Si vous souhaitez approfondir ce sujet important, consultez notre article de blog sur ce qui constitue un excellent dataset [.](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)

#### Dépannage :

Sous Linux, si les touches fléchées gauche et droite et la touche Échap ne fonctionnent pas pendant la collecte de données, assurez-vous que la variable d'environnement `$DISPLAY` est définie. Voir [Limitations de pynput](https://pynput.readthedocs.io/en/latest/limitations.html#linux)

# I. Rejouer un épisode

Essayez maintenant de rejouer le premier épisode sur votre robot :

```Bash
python examples/lekiwi/replay.py
```

Félicitations 🎉, votre robot est prêt pour les tâches d'apprentissage autonome. Veuillez suivre la section d'entraînement de ce tutoriel pour commencer à l'entraîner : [Introduction aux robots du monde réel](https://huggingface.co/docs/lerobot/il_robots)

## K. Évaluer votre stratégie

Assurez-vous de modifier remote_ip, port et HF_MODEL_ID

#### Modifier evaluate.py

HF_MODEL_ID="\<hf_username\>/\<model_repo_id\>" doit être modifié en le nom du dataset téléversé sur Hugging Face après l'entraînement (si téléversé sur Hugging Face) ou le répertoire où le modèle est exporté en local après l'entraînement

HF_DATASET_ID = "\< hf_username \>/\< eval_dataset_id \>" Changez le nom d'utilisateur et le nom du dataset d'évaluation que vous avez créés

remote_ip : adresse IP du Raspberry Pi

![Modifier evaluate.py – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

Puis exécutez la commande suivante :

```Bash
python examples/lekiwi/evaluate.py
```

1. Le nom du dataset commence par `eval` pour refléter que vous exécutez une inférence (par exemple `${HF_USER}/eval_act_lekiwi_test`).

2. Si la phase d'évaluation rencontre `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`, veuillez d'abord supprimer le dossier commençant par `eval_`, puis relancer le programme.

L'entraînement en simulation peut se référer à

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim

## Aide 🙋

Pour les problèmes matériels, veuillez contacter le service client. Pour les problèmes d'utilisation, veuillez rejoindre Discord.

[Plateforme LeRobot](https://github.com/huggingface/lerobot)

[Canal Discord LeRobot](https://discord.gg/8TnwDdjFGU)

<RelatedProducts slugs="lekiwi,so-arm101,servo-driver-board" />
