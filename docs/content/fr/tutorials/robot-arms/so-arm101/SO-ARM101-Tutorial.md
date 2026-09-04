---
title: Tutoriel bras robotique LeRobot
description: "Ce tutoriel est à jour au 15 décembre. Vous pouvez suivre la documentation officielle la plus récente. Voir liens. SO-ARM101 et SO-ARM100 sont compatibles au niveau du code exécuté."
---

# Tutoriel bras robotique LeRobot

> **[Acheter en boutique](https://www.juxitech.com/fr/products/so-arm101-developers-kit)**


Ce tutoriel est à jour au 15 décembre. Vous pouvez suivre la [documentation officielle la plus récente](https://github.com/huggingface/lerobot/tree/main). Tutoriel détaillé : [ce lien](https://zihao-ai.feishu.cn/wiki/TS6swApHbinx01kHDi5cf5n5n8c). Pour les fichiers URDF : [ce lien](https://github.com/TheRobotStudio/SO-ARM100). Ancienne version du 15 septembre : [ce lien](https://juxitech.feishu.cn/docx/DJkBdcwzooBqamxl0kgcvVUbngh?from=from_copylink). SO-ARM101 et SO-ARM100 sont compatibles dans le code exécuté.

## A. Remarques du tutoriel

**Version Pro : bras actif noir avec adaptateur 5V/6A, bras esclave blanc avec adaptateur 12V/5A !**

Montage des servos et calibrage des angles doivent être faits au préalable – voir [tutoriel d'assemblage officiel](https://huggingface.co/docs/lerobot/so101) ; ce tutoriel ne les couvre pas !

Tutoriel d'assemblage : [Assemblage du bras LeRobot](https://juxitech.feishu.cn/wiki/IAhYwcDRQiShY1kH1oHcZzKined)

Si les servos ne sont pas configurés ou le bras non assemblé, suivez ce [README](https://github.com/TheRobotStudio/SO-ARM100) : liste de matériel, liens d'achat, impression 3D et conseils pour les débutants.

Commençons par installer l'environnement LeRobot.

## B. Préparation de l'environnement

Pour Ubuntu X86 :

- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6+

Pour Jetson Orin :

- Jetson Jetpack 6.0+
- Python 3.10
- Torch 2.5.0a0+872d972e41

### Installer l'environnement LeRobot

#### 1. [Installer Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

Pytorch et torchvision doivent être installés selon votre version CUDA.

1. Pour Jetson :

```Bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh
chmod +x Miniconda3-latest-Linux-aarch64.sh
bash ~/Miniconda3-latest-Linux-aarch64.sh
source ~/.bashrc
```

Ou pour X86 Ubuntu 22.04 :

```Bash
mkdir -p ~/miniconda3
cd miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
source ~/miniconda3/bin/activate
conda init --all
```

#### 2. Créer et activer un nouvel environnement conda pour lerobot dans le répertoire souhaité (créer p. ex. lerobot) :

> Ne créez/importez pas le projet lerobot sous ~/miniconda3

```PowerShell
conda create -y -n lerobot python=3.10
```

#### 3. Activer ensuite l'environnement `conda` (à chaque ouverture de terminal avec lerobot !) :

```PowerShell
conda activate lerobot
```

#### 4. Cloner LeRobot :

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

Possibilité de suivre la dernière version : https://github.com/huggingface/lerobot.git
Note : les commandes de la dernière version peuvent différer !

#### 5. Installer ffmpeg dans votre environnement :

Avec `miniconda`, installer `ffmpeg` :

```PowerShell
conda install ffmpeg -c conda-forge
```

Cela installe généralement ffmpeg 7.X compilé avec l'encodeur libsvtav1. Si libsvtav1 n'est pas supporté (vérifiable avec `ffmpeg -encoders`) :

【Toutes plateformes】installer explicitement ffmpeg 7.X :
`conda install ffmpeg=7.1.1 -c conda-forge`

Sans dépendances graphiques (gdk-pixbuf, librsvg), utiliser :
`conda install ffmpeg=7.1.1 -c conda-forge --no-deps`

【Linux uniquement】installer les dépendances de build de ffmpeg et le compiler depuis les sources avec libsvtav1 ; vérifier avec `which ffmpeg`.

En cas d'erreur ci-dessous, la commande ci-dessus la résout aussi.
![5. Installer ffmpeg dans votre environnement : – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/1.png)




#### 6. Entrer dans lerobot et installer LeRobot avec les dépendances moteurs feetech :

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

Pour les appareils Jetson Jetpack 6.0+ (installer au préalable Pytorch-gpu et Torchvision selon [ce tutoriel](https://pytorch.org/get-started/locally/)) :

```Plain Text
conda install -y -c conda-forge "opencv>=4.10.0.84"  # 通过 conda 安装 OpenCV 和其他依赖，仅适用于 Jetson Jetpack 6.0+
conda remove opencv   # 卸载 OpenCV
pip3 install opencv-python==4.10.0.84  # 使用 pip3 安装指定版本 OpenCV
conda install -y -c conda-forge ffmpeg
conda uninstall numpy
pip3 install numpy==1.26.0  # 该版本需与 torchvision 兼容
```

#### 7. Vérifier Pytorch et Torchvision

Comme pip désinstalle les Pytorch/Torchvision existants et installe les versions CPU, il faut vérifier dans Python :

```Plain Text
import torch
print(torch.cuda.is_available())
```

Si False, réinstaller selon le [tutoriel officiel](https://pytorch.org/).

[Incompatibilité Pytorch sur Jetson Orin](https://juxitech.feishu.cn/wiki/AJWBwSbXiinQT5kM1SZc7N3Tn8d)

#### 8. Installer le SDK de la caméra de profondeur Intel RealSense (le cas échéant)

Sous `lerobot/src/lerobot/`, installer pyrealsense2 :

```Plain Text
pip install pyrealsense2
```

## C. Contrôle du bras robotique

### Autorisation de port

Brancher l'alimentation : bras actif noir en 5V/6A, bras esclave blanc en 12V/5A ; connecter la carte driver de servos à l'hôte via le câble de données.

D'abord dans `lerobot/src/lerobot/` :

```Plain Text
cd ~/lerobot/src/lerobot/
```

Puis activer l'environnement `conda` (à chaque fois !) :

```PowerShell
conda activate lerobot
```

#### 1. Exécuter le script de recherche de port

Pour trouver le bon port USB de chaque bras, exécuter deux fois le script utilitaire :

```Plain Text
lerobot-find-port
```

#### 2. Exemple de sortie

Reconnaissance du port du bras Leader (p. ex. `/dev/tty.usbmodem575E0031751` sur Mac ou `/dev/ttyACM0` sous Linux) :

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.
[...Disconnect corresponding leader or follower arm and press Enter...]
The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

Reconnaissance du port du bras Follower (p. ex. `/dev/tty.usbmodem575E0032081` ou `/dev/ttyACM1` sous Linux) :

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.
[...Disconnect corresponding leader or follower arm and press Enter...]
The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

N'oubliez pas de débrancher le câble USB, sinon l'interface ne sera pas détectée.

#### 3. Dépannage

Sous Linux, accorder l'accès au port USB :

```PowerShell
sudo chmod 666 /dev/ttyACM0
```

```Plain Text
sudo chmod 666 /dev/ttyACM1
```

### Calibrer le bras robotique

Branchez l'alimentation et le câble de données puis calibrez pour que Leader et Follower correspondent à la même position physique. Ce calibrage est crucial pour qu'un réseau entraîné sur un SO-10x fonctionne sur un autre. En cas de recalibrage, supprimer complètement les fichiers sous `~/.cache/huggingface/lerobot/calibration/robots` ou `~/.cache/huggingface/lerobot/calibration/teleoperators`, sinon erreur. Les données de calibrage sont stockées en json dans ce répertoire.

#### 1. Calibrage manuel du bras Follower

Connecter les 6 servos via les connecteurs 3 broches, brancher les servos du châssis sur la carte driver, puis exécuter la commande ou l'API de calibrage :

Sur PC (Linux) et Jetson : le `premier` port USB devient `ttyACM0`, le `second` `ttyACM1`.

Avant de lancer, vérifier le mapping Leader/Follower.

#### 2. Autorisation d'interface

D'abord autoriser l'interface :

```Bash
sudo chmod 666 /dev/ttyACM*
```

#### 3. Puis calibrer le bras Follower

Exécuter la commande Python :

```Python
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm
```

D'abord placer le robot avec tous les articulations au milieu de leur plage de mouvement et le maintenir immobile. Après Entrée, faire bouger chaque articulation sur toute la plage. Le fichier de calibrage enregistre les valeurs médiane, max et min dans le json sous `~/.cache/huggingface/lerobot/calibration/robots` ou `~/.cache/huggingface/lerobot/calibration/teleoperators`.
![3. Puis calibrer le bras Follower – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/2.png)



![3. Puis calibrer le bras Follower – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/3.png)




#### **4. Calibrer le bras Leader**

Même procédure – exécuter :

```Python
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

[Vidéo de calibrage central.mp4]

### Téléopération

#### **1. Téléopération simple

Vous pouvez maintenant téléopérer ! Exécuter ce script simple (sans caméra) :

L'**ID associé au robot sert au stockage du fichier de calibrage. Pour téléopération, enregistrement et évaluation avec la même configuration, utilisez le même **.

D'abord autoriser le port série :

```Bash
sudo chmod 666 /dev/ttyACM*
```

Lancer la téléopération :

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

La commande exécute automatiquement :
1. Identifier les fichiers de calibrage manquants et lancer la calibration.
2. Connecter le robot et l'équipement de téléopération.

#### 2. Téléopération avec affichage caméra

Pour instancier une caméra, un identifiant est nécessaire ; il peut changer au redémarrage ou à la reconnexion (selon l'OS).

Trouver l'**index de caméra** :

```Python
lerobot-find-cameras realsense # or realsense for Intel Realsense cameras
```

Le terminal affiche les informations de caméra.
![2. Téléopération avec affichage caméra – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/4.png)




Les images prises se trouvent sous `~/lerobot/outputs/captured_images`.

Sur **macOS** avec Intel RealSense, l'erreur **"Error finding RealSense cameras: failed to set power state"** peut apparaître – la résoudre en exécutant avec `sudo`. RealSense sur macOS est instable.

Pour afficher la caméra pendant la téléopération :

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

`fourcc: "MJPG"` donne des images compressées ; une résolution supérieure est possible. `YUYV` est possible aussi mais réduit résolution/FPS et fait saccader le bras. Actuellement `MJPG` supporte `3` caméras en `1920*1080` à `30FPS` ; déconseillé : 2 caméras sur le même HUB USB.

Ajouter des caméras via `--robot.cameras` ; `index_or_path` suit le dernier chiffre de l'ID de `python -m lerobot.find_cameras opencv`.

Exemple avec caméra supplémentaire :

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

Pour la caméra de profondeur RealSense, exécuter d'abord `python -m lerobot.find_cameras realsense`, remplacer `serial_number_or_name: "323622271780"` par le vôtre et activer `use_depth: true` :

![2. Téléopération avec affichage caméra – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/5.png)



```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: intelrealsense, serial_number_or_name: "323622271780", width: 1280, height: 720, fps: 30, use_depth: true}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

## D. Collecte de données

### Enregistrer un dataset

- Pour un enregistrement local :

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true \
    --dataset.repo_id=juxi/test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30
```

`dateset.repo_id` et `dataset.single_task` sont personnalisables. Avec `push_to_hub=false`, le dossier `juxi/test` est créé sous `~/.cache/huggingface/lerobot`. [Avec la caméra RealSense, adapter la commande](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)

- Pour un upload vers le Hub, se connecter avec un token en écriture (création sous [Hugging Face Settings](https://huggingface.co/settings/tokens)) :

```Bash
hf auth login
```

Stocker le nom du dépôt dans une variable :

```Bash
hf auth whoami
```

Enregistrer 5 épisodes et uploader :

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30
```

Sortie du type :

```Bash
INFO 2024-08-10 15:02:58 ol_robot.py:219 dt:33.34 (30.0hz) dtRlead: 5.06 (197.5hz) dtWfoll: 0.25 (3963.7hz) dtRfoll: 6.22 (160.7hz) dtRlaptop: 32.57 (30.7hz) dtRphone: 33.84 (29.5hz)
```

**Explication des paramètres**
- episode_time_s : durée de collecte par épisode.
- reset_time_s : temps de préparation entre épisodes.
- num_episodes : nombre de groupes de données.
- push_to_hub : upload vers le Hub HuggingFace ou non.

|Touche|Action|
|---|---|
|Flèche droite →|terminer/réinitialiser l'épisode courant ; passer au suivant.|
|Flèche gauche ←|annuler l'épisode courant ; réenregistrer.|

### Visualiser un dataset

Dataset uploadé : [visualisation en ligne](https://huggingface.co/spaces/lerobot/visualize_dataset) – copier l'ID de dépôt généré :

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id ${HF_USER}/so101_test \
  --local-files-only 1
```

Sans upload, visualisation locale :

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/so101_test
```

`juxi` est le `repo_id` personnalisé lors de la collecte.
![Visualiser un dataset – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/6.png)


### Rejouer un épisode (passable, optionnel)

Rejouer un épisode du dataset :

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_awesome_follower_arm \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
  --dataset.repo_id=${HF_USER}/so101_test \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.num_episodes=1 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.push_to_hub=true \
  --replay=true
```

## E. Entraînement et évaluation du dataset

### ACT

Tutoriel officiel [ACT](https://huggingface.co/docs/lerobot/training#act)

**Entraînement**

```Bash
lerobot-train \
  --dataset.repo_id=${HF_USER}/so101_test \
  --policy.type=act \
  --output_dir=outputs/train/act_so101_test \
  --job_name=act_so101_test \
  --policy.device=cuda \
  --wandb.enable=false \
  --steps=300000
```

**Pour un dataset local : **`repo_id`** doit correspondre à la collecte ; ajouter **`--policy.push_to_hub=false`**.**

```Python
lerobot-train \
  *--dataset.repo_id*=juxi/test \
  *--policy.type*=act \
  *--output_dir*=outputs/train/act_so101_test \
  *--job_name*=act_so101_test \
  *--policy.device*=cuda \
  *--wandb.enable*=false \
  *--policy.push_to_hub*=false\
  *--steps*=300000
```

Explication
- **Dataset** : via `--dataset.repo_id=${HF_USER}/so101_test`.
- **Étapes** : `--steps=300000` ; défaut 800000 – ajuster selon la difficulté via la loss.
- **Politique** : `policy.type=act` ; [act,diffusion,pi0,pi0fast,pi0.5,sac,smolvla] possibles (chargé depuis `configuration_act.py`). Important : s'adapte automatiquement aux moteurs, actions et nombre de caméras de votre robot (stockés dans le dataset).
- **Appareil** : `policy.device=cuda` pour Nvidia ; `policy.device=mps` pour Apple Silicon.
- **Visualisation** : `wandb.enable=true` avec [Weights and Biases](https://docs.wandb.ai/quickstart) ; optionnel mais nécessite `wandb login`.

En cas d'erreur :
![ACT – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/7.png)




Exécuter :

```Bash
pip install datasets==2.19
```

L'entraînement peut prendre plusieurs heures. Les poids se trouvent sous `outputs/train/act_so101_test/checkpoints`.

Pour reprendre depuis un checkpoint :

```Bash
lerobot-train \
  --config_path=outputs/train/act_so101_test/checkpoints/last/pretrained_model/train_config.json \
  --resume=true
```

**Évaluation**

Utiliser la fonction `record` de [`lerobot/record.py`](https://github.com/huggingface/lerobot/blob/main/lerobot/record.py) avec la politique en entrée – p. ex. 10 épisodes d'évaluation :

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=my_awesome_leader_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model
  --dataset.push_to_hub=false
```

1. `--policy.path` pointe vers les poids (p. ex. `outputs/train/act_so101_test/checkpoints/last/pretrained_model`) ; un dépôt de modèle est aussi possible (p. ex. `$\{HF_USER\}/act_so101_test`).
2. Si `dataset.repo_id` commence par `eval_`, vidéo et données sont enregistrées séparément dans le dossier `eval_` (p. ex. `juxi/eval_test123`).
3. À `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`, supprimer d'abord le dossier `eval_`.
4. À `mean is infinity. ...`, les clés de `--robot.cameras` (front, side ...) doivent correspondre exactement à la collecte.

### Smolvla

Tutoriel officiel [SmolVLA](https://huggingface.co/docs/lerobot/smolvla)

```Bash
pip install -e ".[smolvla]"
```

**Entraînement**

```Bash
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=${HF_USER}/mydataset \
  --batch_size=64 \
  --steps=20000 \
  --output_dir=outputs/train/my_smolvla \
  --job_name=my_smolvla_training \
  --policy.device=cuda \
  --wandb.enable=true
```

**Évaluation**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_awesome_follower_arm \ # <- Use your robot id
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  # <- Teleop optional if you want to teleoperate in between episodes \
  # --teleop.type=so101_leader \
  # --teleop.port=/dev/ttyACM0 \
  # --teleop.id=my_awesome_leader_arm \
  --policy.path=HF_USER/FINETUNE_MODEL_NAME # <- Use your fine-tuned model
```

### Pi0

Tutoriel officiel [Pi0](https://huggingface.co/docs/lerobot/pi0)

```Bash
pip install -e ".[pi]"
```

**Entraînement**

```Bash
lerobot-train \
  --policy.type=pi0 \
  --dataset.repo_id=juxi/eval_test123 \
  --job_name=pi0_training \
  --output_dir=outputs/pi0_training \
  --policy.pretrained_path=lerobot/pi0_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --steps=20000 \
  --policy.device=cuda \
  --batch_size=32 \
  --wandb.enable=false
```

**Évaluation**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --policy.path=outputs/pi0_training/checkpoints/last/pretrained_model
```

### Pi0.5

Tutoriel officiel [Pi0.5](https://huggingface.co/docs/lerobot/pi05)

Entraînement comme Pi0, type de politique `pi0.5`.

### GR00T N1.5

Tutoriel officiel [GR00T](https://huggingface.co/docs/lerobot/gr00t)

Entraînement comme Pi0, type de politique `gr00t`.

## F. Entraînement sur serveur cloud, déploiement et export de modèle

#### **1. Cliquer sur « Marché de calcul », choisir le GPU – si possible multi-cœurs**
![1. Cliquer sur « Marché de calcul », choisir le GPU – si possible multi-cœurs – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/8.png)


#### **2. Choisir « Facturation à la consommation », image de base « Miniconda/conda3/3.8(ubuntu20.04)/11.8 », puis « Créer immédiatement »**
![2. Choisir « Facturation à la consommation », image de base « Miniconda/conda3/3.8ubuntu20.04/11.8 », puis « Créer immédiatement » – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/9.png)


#### **3. Cliquer sur « JupyterLab », ouvrir un terminal**
![3. Cliquer sur « JupyterLab », ouvrir un terminal – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/10.png)


#### **4. Initialiser l'environnement conda**
![4. Initialiser l'environnement conda – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/11.png)


#### **5. Fermer ce terminal, en ouvrir un nouveau**

Voir https://www.autodl.com/docs/network_turbo/

```Plain Text
source /etc/network_turbo
```
![5. Fermer ce terminal, en ouvrir un nouveau – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/12.png)




#### **6. Créer l'environnement lerobot**

```PowerShell
conda create -y -n lerobot python=3.10
```

```PowerShell
conda activate lerobot
```

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

Alternative : https://github.com/huggingface/lerobot.git – les commandes de la dernière version peuvent différer !

```PowerShell
conda install ffmpeg -c conda-forge
```
![6. Créer l'environnement lerobot – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/13.png)


#### **7. Entrer dans lerobot sous src, installer LeRobot avec feetech :**

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

#### **8. Importer le dataset sur le serveur cloud**

Deux cas : **dataset déjà uploadé dans la base Huggingface lors de la collecte** ou non.

**① Déjà uploadé : accès via la clé obtenue de la base Huggingface**



```Plain Text
huggingface-cli login --token ${HUGGINGFACE_TOKEN} --add-to-git-credential
```

```Plain Text
HF_USER=$(huggingface-cli whoami | head -n 1)
```

```Plain Text
echo $HF_USER
```
![8. Importer le dataset sur le serveur cloud – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/14.png)




```Plain Text
export HYDRA_FULL_ERROR=1
```

**② Upload du dataset local via FileZilla :** voir https://www.autodl.com/docs/filezilla/

Installation la plus simple sous Linux :

```Python
sudo apt install filezilla
```

```Python
filezilla
```

Ouvrir FileZilla, « Fichier » → « Gestionnaire de sites », « Nouveau site », protocole « SFTP »
![8. Importer le dataset sur le serveur cloud – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/15.png)



![8. Importer le dataset sur le serveur cloud – 3](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/16.png)




Retour à AutoDL : copier la « commande de connexion », coller les informations et cliquer sur « Connecter »
![8. Importer le dataset sur le serveur cloud – 4](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/17.png)



![8. Importer le dataset sur le serveur cloud – 5](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/18.png)



![8. Importer le dataset sur le serveur cloud – 6](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/19.png)



![8. Importer le dataset sur le serveur cloud – 7](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/20.png)



![8. Importer le dataset sur le serveur cloud – 8](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/21.png)




Créer le dossier `data` dans le répertoire lerobot du serveur
![8. Importer le dataset sur le serveur cloud – 9](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/22.png)




Glisser le dossier de dataset vers la droite et attendre le transfert
![8. Importer le dataset sur le serveur cloud – 10](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/23.png)




#### 9. Entraînement du dataset

Voir [E. Entraînement et évaluation du dataset] de ce tutoriel, exécuter la commande d'entraînement

#### 10. Export du modèle

Après l'entraînement, exporter le modèle depuis le répertoire train
![10. Export du modèle – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/24.png)




## G. Questions fréquentes

Avec ce tutoriel, cloner le dépôt recommandé https://github.com/JuxiTechnology/lerobot.git

Le dépôt recommandé est la version stable validée ; le dépôt officiel Lerobot est mis à jour en continu et peut causer des problèmes imprévus (versions de dataset différentes, commandes différentes).

- [Avec la caméra RealSense, adapter les commandes](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)
- Sur Jetson : sans nombre/temps d'épisodes, l'interruption par ctrl+z déconnecte bras et caméra ; après reconnexion, tous les ports changent.

Ajouter les paramètres d'épisodes et de durée à la commande d'évaluation, p. ex. :

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=my_awesome_leader_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model
  --dataset.push_to_hub=false
```

- À la calibration des IDs de servos :

```Bash
`Motor 'gripper' was not found, Make sure it is connected`
```

Vérifier soigneusement le câble de communication vers le servo et la tension d'alimentation.

- À :

```Bash
Could not connect on port "/dev/ttyACM0"
```

Si `/dev/ttyACM0` existe (`ls /dev/ttyACM*`) mais pas de connexion : permission de port oubliée – `sudo chmod 666 /dev/ttyACM*`.

- À :

```Bash
No valid stream found in input file. Is -1 of the desired media type?
```

Installer ffmpeg 7.1.1 : `conda install ffmpeg=7.1.1 -c conda-forge`.
![G. Questions fréquentes – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/25.png)




- À :

```Bash
ConnectionError: Failed to sync read 'Present_Position' on ids=[1,2,3,4,5,6] after 1 tries. [TxRxResult] There is no status packet!
```

Vérifier que le bras au port indiqué est alimenté et qu'aucun câble de servo bus n'est desserré ; la LED éteinte indique le câble desserré du servo précédent.

- À la calibration :

```Bash
Magnitude 30841 exceeds 2047 (max for sign_bit_index=11)
```

Bras couper/remettre sous tension puis recalibrer ; utile aussi pour des angles MAX à plusieurs dizaines de milliers. Sinon, recalibrer le servo (calibration centrale + écriture d'ID).

- À l'évaluation :

```Bash
File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'
```

Supprimer le dossier `eval_` et relancer.

- À l'évaluation :

```Bash
`mean` is infinity. You should either initialize with `stats` as an argument or use a pretrained model
```

Les clés (front, side ...) de `--robot.cameras` doivent correspondre exactement à la collecte.

## Trouver le servo sous Windows (logiciel de débogage hôte Feetech)

Pour le débogage, n'importe quel PC Windows peut programmer, déboguer ou tester le servo via USB. Pour cela, téléchargez le [logiciel Feetech](https://www.feetechrc.com/software.html). Pour les systèmes Ubuntu, utilisez l'[outil FT_SCServo_Debug_Qt](https://github.com/Kotakku/FT_SCServo_Debug_Qt).

[fddebug-master.zip]

Sélectionner le numéro de port, régler la vitesse en bauds sur 1000000, ouvrir, puis cliquer sur « Search »

![Trouver le servo sous Windows logiciel de débogage hôte Feetech – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/26.png)

## Contrôle par simulation ROS2 (peut être implémenté indépendamment)

https://github.com/holmsslk/so-arm-moveit-hardware

## Définir l'ID du servo et la calibration médiane sur le web

https://bambot.org/feetech.js?lang=zh

1. Saisir 0 ou 1 selon le modèle du servo, puis cliquer sur « Connect ».

![Définir l'ID du servo et la calibration médiane sur le web – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/27.png)

2. Scanner les servos avec les IDs 1 à 6 ; l'ID correspondant se confirme via FOUND dans les résultats du scan. Exemple : le servo ID 1 de l'image a été scanné.

![Définir l'ID du servo et la calibration médiane sur le web – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/28.png)

3. Définition de l'ID et calibration médiane

① Le champ ID de servo actuel attend l'ID du servo scanné

② Saisir un nombre dans « Gestion des ID », cliquer sur « Change ID » pour définir l'ID

③ Calibration médiane (la valeur médiane du servo STS3215 est 2047, celle du SCS0009 est 511)

Servo STS : saisir 2047 dans « Position Control » et cliquer sur « Set »

Servo SCS : saisir 511 dans « Position Control » et cliquer sur « Set ».

![Définir l'ID du servo et la calibration médiane sur le web – 3](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/29.png)
