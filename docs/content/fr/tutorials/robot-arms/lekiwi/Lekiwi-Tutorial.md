---
title: Tutoriel d'utilisation du robot mobile Lekiwi
description: "Guide complet du robot mobile Lekiwi basé sur LeRobot : installation, configuration des moteurs, téléopération, collecte de données, entraînement et évaluation"
---

# Tutoriel d'utilisation du robot mobile Lekiwi

> **[Acheter en boutique](https://www.juxitech.com/fr/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

Le bras meneur noir utilise un adaptateur d'alimentation 5V 6A, et le bras suiveur blanc utilise un adaptateur d'alimentation 12V 5A.

[lerobot-Lekiwi.zip](/downloads/lerobot-Lekiwi.zip)

Le code de ce dépôt de tutoriels est conservé dans la version stable testée de LeRobot antérieure au 1er octobre 2026. Hugging Face a depuis procédé à une très importante mise à niveau de LeRobot, ajoutant un grand nombre de nouvelles fonctionnalités. Si vous souhaitez essayer le tutoriel le plus récent, suivez la [documentation officielle](https://huggingface.co/docs/lerobot/lekiwi).



[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) est un projet de voiture robot entièrement open source lancé par [SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC). Il comprend des fichiers d'impression 3D détaillés et des instructions d'utilisation, et est conçu pour être compatible avec le framework d'apprentissage par imitation [LeRobot](https://github.com/huggingface/lerobot/tree/main). Il prend en charge le bras robotisé SO101, ce qui permet un flux de travail complet d'apprentissage par imitation.

[*Dans le CAO en ligne Fusion360*](https://a360.co/4k1P8yO)*, vous pouvez visualiser la position exacte des composants.*

[Fichier URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Aperçu URDF en ligne https://urdf.d-robotics.cc/

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-01.png)

## Caractéristiques principales

1. **Open source et faible coût** : [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) propose une solution de voiture robot open source et à faible coût.
2. **Intégration LeRobot** : conçu pour s'intégrer à la [plateforme LeRobot](https://github.com/huggingface/lerobot).
3. **Ressources d'apprentissage riches** : ressources d'apprentissage open source complètes, comprenant des guides d'assemblage et de calibration ainsi que des tutoriels de test, de collecte de données, d'entraînement et de déploiement, pour aider les utilisateurs à démarrer rapidement et à créer des applications robotiques.
4. **Compatible Nvidia** : peut être utilisé avec le reComputer Mini J4012 Orin NX 16 GB.
5. **Applications multi-scénarios** : adapté à l'éducation, à la recherche scientifique, à la production automatisée et à la robotique, aidant les utilisateurs à obtenir un fonctionnement robotique efficace et précis dans une grande variété de tâches complexes.

JUXI n'est responsable que de la qualité du matériel lui-même. Ce tutoriel est mis à jour en stricte conformité avec la documentation officielle. Si vous rencontrez des problèmes logiciels ou de dépendances d'environnement que vous ne parvenez vraiment pas à résoudre, veuillez les signaler rapidement à la [plateforme LeRobot](https://github.com/huggingface/lerobot) ou au [canal Discord de LeRobot](https://discord.gg/8TnwDdjFGU).

**Remarque**
- Tous les servos du châssis Lekiwi nécessitent une alimentation 12V. Pour les utilisateurs disposant d'un bras robotisé 5V, nous fournissons un module abaisseur 12V vers 5V. Notez que vous devrez modifier le câblage vous-même.
- Alimentation 12V – vous pouvez choisir cette option lors de la commande si nécessaire. Si vous disposez déjà d'une alimentation 12V, il vous suffit de convertir son connecteur de sortie en fiche DC 5521.
- Contrôleur Raspberry Pi et caméras – ils doivent être achetés séparément via la page de commande.

## Nomenclature (BOM)


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

- Raspberry Pi 5, 4G\~16G

### Configuration de SSH

Après avoir configuré le Raspberry Pi, vous devez activer et configurer [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell) afin de pouvoir vous connecter au Raspberry Pi depuis votre ordinateur portable sans y brancher d'écran, de clavier ni de souris. Vous trouverez un excellent tutoriel [ici](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh). Vous pouvez vous connecter au Raspberry Pi via l'invite de commandes (cmd) ou, si vous utilisez VSCode, avec [cette](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension.

## Guide d'impression 3D

### Pièces

Nous fournissons des fichiers STL imprimables pour les pièces imprimées en 3D suivantes. Ces pièces peuvent être imprimées sur des imprimantes FDM grand public avec un filament PLA à usage général. Nous les avons testées sur une imprimante Bambu Lab P1S. Pour chaque composant, nous le chargeons simplement dans Bambu Studio, le laissons s'orienter et s'agencer automatiquement, activons les supports recommandés, puis imprimons.


### Paramètres d'impression

Les fichiers STL fournis peuvent être imprimés directement sur de nombreuses imprimantes FDM. Voici les paramètres testés et recommandés ; d'autres paramètres peuvent également fonctionner.

- Matériau : PLA+
- Diamètre et précision de la buse : buse de 0,2mm de diamètre, hauteur de couche de 0,2mm
- Densité de remplissage : 15%
- Vitesse d'impression : 150 mm/s
- Si nécessaire, téléversez le G-code (fichier tranché) sur l'imprimante et lancez l'impression

## A. Installation de LeRobot sur le Raspberry Pi

Sur votre Raspberry Pi :

### 1. [Installer Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install) :

```Python
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. Redémarrer le shell

Copiez et collez la commande suivante dans votre shell : `source ~/.bashrc`, ou pour les utilisateurs de Mac : `source ~/.bash_profile` ou `source ~/.zshrc` (si vous utilisez zshell).

### 3. Créer et activer un nouvel environnement Conda pour LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Activez ensuite votre environnement Conda (vous devez le faire chaque fois que vous ouvrez un shell pour utiliser LeRobot !) :

```Bash
conda activate lerobot
```

### 4. Cloner LeRobot :

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Installer ffmpeg dans votre environnement :

Lorsque vous utilisez `miniconda`, installez `ffmpeg` dans votre environnement :

```PowerShell
conda install ffmpeg -c conda-forge
```

Cela installe généralement ffmpeg 7.X compilé avec l'encodeur libsvtav1 pour votre plateforme. Si libsvtav1 n'est pas pris en charge (vous pouvez vérifier les encodeurs pris en charge avec `ffmpeg -encoders`), vous pouvez :
[Toutes les plateformes] Installer explicitement ffmpeg 7.X :
`conda install ffmpeg=7.1.1 -c conda-forge`
[Linux uniquement] Installer les dépendances de compilation de ffmpeg et compiler ffmpeg avec le support libsvtav1 depuis les sources, et vous assurer que l'exécutable ffmpeg utilisé est le bon, ce que vous pouvez confirmer avec `which ffmpeg`.
Si vous rencontrez l'erreur ci-dessous, les commandes ci-dessus peuvent également la corriger.

![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-02.png)

### 6. Installer LeRobot avec la dépendance du moteur feetech :

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

### 7. Définir la durée de connexion

Recherchez config_lekiwi.py dans le répertoire `lerobot\src\lerobot\robots\lekiwi`.

 connection_time_s: int = 7200 # c'est-à-dire 2 heures

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-03.png)

## B. Installation de LeRobot sur un ordinateur portable

Si vous avez déjà installé LeRobot sur votre ordinateur portable, vous pouvez ignorer cette étape ; sinon, suivez les **mêmes étapes** que celles utilisées sur le Raspberry Pi.

> [!Tip] Nous allons utiliser fréquemment l'invite de commandes (cmd). Si vous n'êtes pas familier avec cmd, ou si vous souhaitez revoir l'utilisation de la ligne de commande, vous pouvez consulter ceci : [Cours express sur la ligne de commande](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)

Sur votre ordinateur :

### 1. [Installer Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install) :

anaconda.com/download/success

Ou cliquez sur ce lien pour télécharger directement l'installateur

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-04.png)
![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-05.png)

## Modification des sources de paquets de conda

```Shell
# Effacer d'abord la configuration des sources existantes (pour éviter les conflits)
conda config --remove-key channels

# Remplacer les sources par défaut de conda et les sources tierces courantes par le miroir de Tsinghua
# Ajouter les sources de paquets par défaut (main/r/msys2)
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# Ajouter les sources tierces courantes
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# Afficher la source de téléchargement, afin que l'installation des paquets affiche l'URL de téléchargement précise
conda config --set show_channel_urls yes

# Vider le cache d'index pour que les nouvelles sources prennent effet
conda clean -i

# Afficher la configuration actuelle (pour vérifier que les sources ont bien été ajoutées)
conda config --show-sources
```

### 2. Redémarrer le shell

Copiez et collez la commande suivante dans votre shell : `source ~/.bashrc`, ou pour les utilisateurs de Mac : `source ~/.bash_profile` ou `source ~/.zshrc` (si vous utilisez zshell).

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-06.png)

### 3. Créer et activer un nouvel environnement Conda pour LeRobot

```Bash
conda create -y -n lerobot python=3.10
```

Activez ensuite votre environnement Conda (vous devez le faire chaque fois que vous ouvrez un shell pour utiliser LeRobot !) :

```Bash
conda activate lerobot
```

### 4. Cloner LeRobot :

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Installer ffmpeg dans votre environnement :

Lorsque vous utilisez `miniconda`, installez `ffmpeg` dans votre environnement :

```PowerShell
conda install ffmpeg -c conda-forge
```

Cela installe généralement ffmpeg 7.X compilé avec l'encodeur libsvtav1 pour votre plateforme. Si libsvtav1 n'est pas pris en charge (vous pouvez vérifier les encodeurs pris en charge avec `ffmpeg -encoders`), vous pouvez :
[Toutes les plateformes] Installer explicitement ffmpeg 7.X :
`conda install ffmpeg=7.1.1 -c conda-forge`
[Linux uniquement] Installer les dépendances de compilation de ffmpeg et compiler ffmpeg avec le support libsvtav1 depuis les sources, et vous assurer que l'exécutable ffmpeg utilisé est le bon, ce que vous pouvez confirmer avec `which ffmpeg`.
Si vous rencontrez l'erreur ci-dessous, les commandes ci-dessus peuvent également la corriger.

![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-07.png)

### 6. Installer LeRobot avec la dépendance du moteur feetech :

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

## C. Configuration des moteurs

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-09.png)

### **1. Trouver le port USB associé au bras robotisé**

Pour trouver le bon port pour un moteur individuel, exécutez deux fois le script utilitaire suivant :

```Bash
lerobot-find-port
```

Exemple de sortie (par exemple, `/dev/tty.usbmodem575E0031751` sous Mac, ou éventuellement `/dev/ttyACM0` sous Linux) :

Exemple de sortie (par exemple, `/dev/tty.usbmodem575E0032081` sous Mac, ou éventuellement `/dev/ttyACM1` sous Linux) :

Dépannage : sous Linux, vous devrez peut-être autoriser l'accès au port USB avec les commandes suivantes :

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2. Configurer vos moteurs (ignorez cette étape pour une unité assemblée)**

Branchez un par un chaque moteur de votre châssis et exécutez le script suivant. Il initialise d'abord les servos du bras robotisé (ID 6..1), puis initialise les servos du châssis en définissant leurs ID sur (ID 9..7). Si vous avez déjà calibré le bras robotisé, vous pouvez continuer à appuyer sur Entrée pour écraser et ignorer :

```Bash
lerobot-setup-motors \
    --robot.type=lekiwi \
    --robot.port=/dev/tty.usbmodem58760431551 # <- collez ici le port trouvé à l'étape précédente
```

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-10.png)

### 3. Configurer le miroir chinois de Hugging Face

- Ubuntu

```Shell
sudo nano ~/.bashrc

# Ajouter à la fin du fichier
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# Sortie
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# Ajouter à la fin du fichier
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# Sortie
# https://hf-mirror.com
```

#### ① Créer un token

https://huggingface.co/settings/tokens

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-11.png)

![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-12.png)

#### ② Enregistrer le token

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-13.png)

#### ③ Associer le token

```Shell
hf auth login

hf auth whoami
```

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-14.png)

#### ④ Créer un dépôt de dataset

**Notez le nom du propriétaire et du dataset, c'est-à-dire les <hf_username> et <dateset_repo_id> dont vous aurez besoin plus tard**

![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-15.png)
![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-16.png)

![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-17.png)

### 4. Mettre à jour la configuration !!!

Les fichiers de configuration du LeKiwi LeRobot et de l'ordinateur portable doivent rester cohérents. Nous devons d'abord trouver l'**adresse IP** du Raspberry Pi qui pilote le bras mobile. Il s'agit de la même adresse IP que celle utilisée pour SSH. Nous devons également trouver le **port USB** de la carte de commande de servo du bras meneur sur l'ordinateur portable et le **port de la carte de commande de servo du LeKiwi**. Vous pouvez trouver ces ports avec le script suivant.

Sous Linux, vous devrez peut-être autoriser l'accès au port USB en exécutant les commandes suivantes :

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

Important : maintenant que vous disposez du port du bras meneur et de l'adresse IP du bras du Lekiwi, mettez à jour l'**ip** dans la configuration réseau, le **port** dans la configuration du bras meneur, et les **port, remote_ip** dans la configuration du LeKiwi.

Modifiez ces quatre fichiers dans le répertoire example\lekiwi

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-18.png)

#### ① Modifier teleoperate.py

remote_ip : l'adresse IP du Raspberry Pi

port : le numéro de port lorsque le bras meneur est connecté à l'ordinateur ou à Linux

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-19.png)

#### ② Modifier record.py

HF_REPO_ID : [nom d'utilisateur et nom de dataset Hugging Face](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

remote_ip : l'adresse IP du Raspberry Pi

port : le numéro de port lorsque le bras meneur est connecté à l'ordinateur ou à Linux

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-20.png)

#### ③ Modifier replay.py

remote_ip : l'adresse IP du Raspberry Pi

<hf_username>/<dataset_repo_id>, c'est-à-dire le [nom d'utilisateur et nom de dataset Hugging Face](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/fix-01.png)

## D. Calibration

Nous devons maintenant calibrer le bras meneur et le bras suiveur. Les servos des roues omnidirectionnelles n'ont pas besoin d'être calibrés.

### Calibration du bras suiveur (monté sur la base du Lekiwi)

Exécutez la commande suivante sur votre ordinateur pour calibrer le bras meneur. Remarque : les images présentées ici sont des exemples pour le modèle SO101.

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ # remplacez par le port que vous avez trouvé
    --teleop.id=my_awesome_leader_arm
```

Exécutez maintenant la commande suivante sur votre Raspberry Pi pour calibrer le bras suiveur du LeKiwi. Ignorez sa position actuelle sur la table — une calibration correcte doit être effectuée avec le bras monté sur le châssis du Lekiwi.

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

Nous avons standardisé la méthode de calibration pour la plupart des robots. D'abord, nous devons déplacer le robot pour que chaque articulation se trouve à la **moitié de sa plage de mouvement**, puis appuyer sur le bouton. Ensuite, nous faisons parcourir à toutes les articulations une fois leur **plage de mouvement complète**. Vous pouvez trouver une vidéo du même processus de calibration pour le SO101 [ici](https://huggingface.co/docs/lerobot/en/so101#calibration-video) `Enter`.

## E. Téléopération

Ouvrez un nouvel Anaconda Prompt

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-21.png)

> Si vous utilisez un Mac, vous devrez peut-être accorder à « Terminal » l'autorisation d'accéder au clavier pour la téléopération. Allez dans « Préférences Système » > « Sécurité et confidentialité » > « Surveillance des entrées » et cochez la case « Terminal ».

Pour téléopérer, connectez-vous à votre Raspberry Pi via SSH, exécutez la commande suivante pour activer l'environnement `conda activate lerobot`, puis exécutez le script suivant :

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-22.png)

Ensuite, sur votre ordinateur portable, exécutez également la commande suivante pour activer l'environnement `conda activate lerobot`, puis exécutez le script suivant :

```Bash
python examples/lekiwi/teleoperate.py
```

L'écran de votre ordinateur portable devrait afficher quelque chose comme ceci : `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.` Vous pouvez maintenant déplacer le bras de commande et utiliser les touches (W, A, S, D) du clavier pour déplacer le robot vers l'avant, la gauche, l'arrière et la droite. Utilisez les touches (Z, X) pour faire tourner le robot à gauche ou à droite. Utilisez les touches (R, F) pour augmenter ou diminuer la vitesse du robot. Il existe trois modes de vitesse ; voir le tableau ci-dessous :



Si vous utilisez un autre clavier, vous pouvez modifier la liaison de touches pour chaque commande dans [`LeKiWiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py).

## Dépannage de la communication

Si vous rencontrez des difficultés pour connecter le robot mobile SO101, suivez les étapes ci-dessous pour diagnostiquer et résoudre le problème.

### 1. Vérifier la configuration de l'adresse IP

Assurez-vous que la bonne adresse IP du Raspberry Pi est définie dans le fichier de configuration. Pour vérifier l'adresse IP du Raspberry Pi, exécutez la commande suivante (dans la ligne de commande du Pi) :

```Bash
hostname -I
```

### 2. Vérifier si l'ordinateur portable/PC peut joindre le Pi

Essayez de faire un ping vers le Raspberry Pi depuis l'ordinateur portable :

```Bash
ping <your_pi_ip_address>
```

Si le ping échoue :

- Assurez-vous que le Pi est allumé et connecté au même réseau.
- Vérifiez si SSH est activé sur le Pi.

### 3. Essayer une connexion SSH

Si vous ne parvenez pas à vous connecter au Pi via SSH, la connexion est peut-être incorrecte. Utilisez la commande suivante :

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

Par exemple `ssh pi@192.168.0.106`

Si vous obtenez une erreur de connexion :

- Assurez-vous que SSH est activé sur le Pi ; vous pouvez exécuter la commande suivante :

```Bash
sudo raspi-config
```

- Naviguez ensuite vers : **Interfacing Options -> SSH** et activez-le.

### 4. Cohérence des fichiers de configuration !!!

Assurez-vous que les fichiers de configuration de l'ordinateur portable/PC et du Raspberry Pi sont exactement identiques.

## F. Enregistrement d'un dataset

Une fois que vous êtes à l'aise avec la téléopération, vous pouvez utiliser le LeKiwi pour enregistrer votre premier dataset.

Pour démarrer le programme sur le LeKiwi, connectez-vous à votre Raspberry Pi via SSH et exécutez les commandes suivantes pour activer l'environnement et lancer le script :

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Si vous souhaitez utiliser le Hugging Face Hub pour téléverser des datasets et que vous ne vous êtes pas connecté auparavant, assurez-vous de vous connecter avec un token en écriture, que vous pouvez générer dans les [paramètres Hugging Face](https://huggingface.co/settings/tokens) :

```Bash
hf auth login
```

Stockez le nom de votre dépôt Hugging Face dans une variable pour exécuter la commande suivante :

```Bash
hf auth whoami
```

Exécutez ensuite la commande suivante sur votre ordinateur portable pour enregistrer 2 épisodes et téléverser le dataset sur le Hub :

```Bash
python examples/lekiwi/record.py
```

## G. Visualisation d'un dataset

Si vous avez téléversé le dataset, vous pouvez [visualiser votre dataset en ligne](https://huggingface.co/spaces/lerobot/visualize_dataset) ; copiez-collez l'ID de dépôt produit par la commande suivante :

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Si vous n'avez pas téléversé le dataset, vous pouvez également le visualiser localement (l'outil de visualisation s'ouvre dans une fenêtre de navigateur à l'adresse `http://127.0.0.1:9090`) :

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id ${HF_USER}/lekiwi_test \
  --local-files-only 1
```

### Visualiser un dataset (facultatif, à essayer)

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Si vous avez téléversé le dataset, vous pouvez également le visualiser localement avec la commande suivante :

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

Si vous n'avez pas téléversé le dataset, vous pouvez également le visualiser localement avec la commande suivante :

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Ici, `juxi` est un nom `repo_id` personnalisé défini lors de la collecte des données.



#### Conseils pour la collecte de données

Une fois que vous êtes à l'aise avec l'enregistrement des données, vous pouvez créer des datasets plus volumineux pour l'entraînement. Une bonne tâche de départ consiste à saisir des objets à différentes positions et à les déposer dans un récipient. Nous recommandons d'enregistrer au moins 50 épisodes, 10 par position. Gardez la position de la caméra fixe et gardez le geste de préhension cohérent tout au long de l'enregistrement. Assurez-vous également que les objets que vous manipulez sont clairement visibles dans le champ de la caméra. Une règle simple : vous devriez pouvoir accomplir la tâche simplement en regardant le flux de la caméra.

Dans les sections suivantes, vous entraînerez votre réseau de neurones. Une fois que vous obtenez des performances de préhension fiables, vous pouvez commencer à introduire davantage de variabilité dans la collecte de données, par exemple en ajoutant des positions de préhension, en utilisant différentes techniques de préhension et en modifiant les positions des caméras.

Évitez d'ajouter trop de variabilité trop rapidement, car cela pourrait nuire à vos résultats.

Si vous souhaitez approfondir ce sujet important, consultez notre [article de blog sur ce qui fait un bon dataset.](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)

#### Dépannage :

Sous Linux, si les touches fléchées gauche/droite et la touche Échap ne fonctionnent pas pendant l'enregistrement des données, assurez-vous que la variable d'environnement `$DISPLAY` est définie. Voir [les limitations de pynput](https://pynput.readthedocs.io/en/latest/limitations.html#linux)

## H. Relecture d'un épisode

Essayez maintenant de relire le premier épisode sur votre robot :

```Bash
python examples/lekiwi/replay.py
```

Félicitations 🎉 — votre robot est prêt à apprendre des tâches de manière autonome. Suivez la section consacrée à l'entraînement de ce tutoriel pour commencer à l'entraîner : [Premiers pas avec les robots du monde réel](https://huggingface.co/docs/lerobot/il_robots)

## I. Évaluation de votre politique

Assurez-vous de modifier remote_ip, port, HF_MODEL_ID

### Modifier evaluate.py

HF_MODEL_ID="<hf_username>/<model_repo_id>" remplacez ceci par le nom du dataset téléversé sur Hugging Face après l'entraînement (si vous l'avez téléversé sur Hugging Face), ou par le répertoire local dans lequel le modèle a été exporté après l'entraînement

HF_DATASET_ID="<hf_username>/<eval_dataset_id>" remplacez ceci par le nom d'utilisateur que vous avez créé et le nom du dataset eval_

remote_ip : l'adresse IP du Raspberry Pi

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-23.png)

Exécutez ensuite la commande suivante :

```Bash
python examples/lekiwi/evaluate.py
```

1. Le nom du dataset commence par `eval` pour refléter le fait que vous exécutez une inférence (par exemple `${HF_USER}/eval_act_lekiwi_test`).
2. Si pendant l'évaluation vous rencontrez `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`, supprimez d'abord le dossier dont le nom commence par `eval_` et relancez le programme.



Pour l'entraînement en simulation, voir

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim



## Aide 🙋

Pour les problèmes matériels, contactez le service client. Pour les questions d'utilisation, rejoignez Discord.

[Plateforme LeRobot](https://github.com/huggingface/lerobot)

[Canal Discord de LeRobot](https://discord.gg/8TnwDdjFGU)

##   
  
Installer Miniconda sur un Mac

## Accord des autorisations

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-24.png)

## Installer Miniconda

https://www.anaconda.com/download

## Modification de la source de paquets de pip

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Modification de la source de paquets de conda

```Shell
# Effacer la configuration .condarc existante (facultatif, pour éviter les conflits)
echo "" > ~/.condarc

# Écrire la configuration du miroir de Tsinghua
cat << EOF > ~/.condarc
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
EOF

# Vider le cache pour appliquer la configuration
conda clean -i
```

<RelatedProducts slugs="lekiwi,so-arm101,servo-driver-board" />

