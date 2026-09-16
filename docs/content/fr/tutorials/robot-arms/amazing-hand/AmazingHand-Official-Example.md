---
title: Tutoriel d'exécution de l'exemple officiel de la main robotique
description: "Exécuter l'exemple officiel de la main AmazingHand : installer Rust, uv et dora-rs, câbler la carte de commande des servos et lancer la démo."
---

# Tutoriel d'exécution de l'exemple officiel de la main robotique

> **[Acheter en boutique](https://www.juxitech.com/fr/products/amazinghand)**


## 1. Téléchargement du code

Téléchargez l'archive de code fournie avec ce tutoriel pour la démo, ou clonez le dépôt open source officiel https://github.com/pollen-robotics/AmazingHand.git ; le code officiel peut contenir des erreurs.

[Tutoriel d'exécution de l'exemple officiel de la main robotique](https://juxitech.feishu.cn/wiki/SfUCweM6ni4IookxjOMcLf5cnwd)

Archive de code Windows

AmazingHand-main.zip

Archive de code Linux

AmazingHand-main.zip

```Plain Text
git clone https://github.com/pollen-robotics/AmazingHand.git
```

## 2. Installation de l'environnement

Installer Rust, uv et dora-rs selon le système

**1. Installer Rust :** https://www.rust-lang.org/tools/install

Référence pour la configuration des variables d'environnement Rust sous Windows (important !) : https://zhuanlan.zhihu.com/p/1958936613276087180

Linux : définir les variables d'environnement :

![2. Installation de l'environnement – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

![2. Installation de l'environnement – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)

L'installation initiale peut nécessiter l'installateur Visual Studio

**Configurer le mirroir Cargo**

Dans le dossier `.cargo`, créer `config.toml` et configurer le mirroir Tsinghua `crates.io-index`. Cargo téléchargera alors les crates via le mirroir Tsinghua.

```Bash
[source.crates-io]
replace-with = 'tuna'

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

**2. Installer uv :** https://docs.astral.sh/uv/getting-started/installation/

Sous Windows, ouvrir PowerShell, coller et exécuter la commande

![2. Installation de l'environnement – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/11.png)

**Linux : définir les variables d'environnement :**

![2. Installation de l'environnement – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/12.png)

**3. Installer dora-rs :** voir https://dora-rs.ai/docs/guides/Installation/installing pour le téléchargement et l'installation

Linux : définir les variables d'environnement :

![2. Installation de l'environnement – 5](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/13.png)

## 3. Câblage

L'alimentation nécessite au moins 5V3A ; elle est connectée en externe à une carte driver de servos, puis reliée à l'ordinateur via USB

![3. Câblage – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/14.png)

## 4. Démo d'exemple

### **1. Trouver le numéro de port de la carte driver de servos**

- Le système Windows est généralement COM11 ; le numéro de port de la carte driver de servos se trouve via le Gestionnaire de périphériques ou le logiciel hôte Feetech

![1. Trouver le numéro de port de la carte driver de servos – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/16.png)

- Les systèmes Ubuntu et Linux sont généralement /dev/ttyACM0

Vérifier le numéro de port de la carte driver de servos en ligne de commande :

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

Si la commande `ls /dev/ttyUSB* /dev/ttyACM*` ne trouve rien dans la machine virtuelle, vérifier en bas à droite de la VM si la main est connectée à l'ordinateur hôte. Si c'est le cas, la déconnecter et la connecter à la machine virtuelle.

![1. Trouver le numéro de port de la carte driver de servos – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)

### **2. Modifier le numéro de port dans le code**

①Localiser le fichier de code main.rs sous le répertoire AmazingHand-main\Demo\AHControl\src, l'ouvrir dans un éditeur de texte, et le modifier avec le numéro de port trouvé sur votre machine (COM\* pour Windows, généralement /dev/ttyACM\* pour Ubuntu et Linux)

![2. Modifier le numéro de port dans le code – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)

②Trouver le fichier d'instance correspondant

**Main droite** : trouver dataflow_tracking_real_right.yml sous le répertoire AmazingHand-main\Demo

**Main gauche** : trouver dataflow_tracking_real_left.yml sous le répertoire AmazingHand-main\Demo

**Deux mains** : trouver dataflow_tracking_real_2hands.yml sous le répertoire AmazingHand-main\Demo

Ouvrir en format texte et le modifier avec le numéro de port trouvé sur votre machine (COM\* pour Windows, généralement /dev/ttyACM\* pour Ubuntu et Linux)

![2. Modifier le numéro de port dans le code – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/2.png)

![2. Modifier le numéro de port dans le code – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

![2. Modifier le numéro de port dans le code – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)

### **3. Déploiement du code**

- Ouvrir le dossier Demo

Sur le système Windows, dans le répertoire, ouvrir PowerShell et appuyer sur Entrée pour l'ouvrir, puis démarrer le processus démon (à chaque fois) :

Pour les systèmes Linux, ouvrir directement via la console et démarrer le processus démon (à chaque fois) :

```Plain Text
dora up
```

- Puis exécuter depuis ce dossier dans la console (pendant la configuration de l'environnement, une seule exécution suffit !! Une nouvelle exécution écrasera l'environnement virtuel !!) Créer un environnement virtuel :

```Plain Text
uv venv --python 3.12
```

- Activer l'environnement virtuel (à chaque fois) en saisissant et exécutant ce qui suit selon le système :

```Plain Text
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

.venv\Scripts\activate
```

```Plain Text
source .venv/bin/activate
```

![3. Déploiement du code – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

Assurez-vous que la console a activé l'environnement virtuel !

- Exécuter la synchronisation des dépendances et entrer dans le dossier AHControl

```Plain Text
cd AHControl
```

```Plain Text
cargo build --release
```

- Puis taper `cd..` et appuyer sur Entrée pour revenir au répertoire Demo ! Entrer dans le dossier AHSimulation

```Plain Text
cd AHSimulation
```

```Plain Text
uv sync
```

- Puis taper `cd..` et appuyer sur Entrée pour revenir au répertoire Demo ! Entrer dans le dossier HandTracking

```Plain Text
cd HandTracking
```

```Plain Text
uv sync
```

### 4. Résultat

- Ouvrir le dossier Demo ! Dans le répertoire, ouvrir PowerShell et appuyer sur Entrée, puis démarrer le processus démon (à chaque fois) :

```Plain Text
dora up
```

- Activer l'environnement virtuel (à chaque fois) : saisir et exécuter selon le système :

Commande pour activer un environnement virtuel sur la plateforme Windows :

```Python
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

```Plain Text
.venv\Scripts\activate
```

Commande pour activer un environnement virtuel sur la plateforme Linux :

```Plain Text
source .venv/bin/activate
```

### Environnement de simulation

- Exécuter la démo de suivi de main par webcam uniquement dans l'environnement de simulation :

```Plain Text
dora build dataflow_tracking_simu.yml --uv   #(Execute only once)
```

```Plain Text
dora run dataflow_tracking_simu.yml --uv
```

![Environnement de simulation – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)

![Environnement de simulation – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/5.png)

### Exécution sur matériel réel (suivi de main)

- Exécuter la démo de suivi de main par webcam avec le matériel réel :

    #### Main droite

    ```Plain Text
    dora build dataflow_tracking_real_right.yml --uv   #(Execute only once)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_right.yml --uv
    ```

    #### Main gauche

    ```Plain Text
    dora build dataflow_tracking_real_left.yml --uv   #(Execute only once)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_left.yml --uv
    ```

    #### Deux mains (à noter : les deux sont connectées à une carte driver de servos)

![Exécution sur matériel réel suivi de main – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/6.png)

    ```Plain Text
    dora build dataflow_tracking_real_2hands.yml --uv   #(Execute only once)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_2hands.yml --uv
    ```

![Exécution sur matériel réel suivi de main – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/7.png)

![Exécution sur matériel réel suivi de main – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/8.png)

### Exemple simple pour contrôler l'angle du doigt simulé

- Exécuter un exemple simple pour contrôler l'angle du doigt dans la simulation :

    ```Plain Text
    dora build dataflow_angle_simu.yml --uv   #(Execute only once)
    ```

    ```Plain Text
    dora run dataflow_angle_simu.yml --uv
    ```

![Exemple simple pour contrôler l'angle du doigt simulé – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/9.png)

![Exemple simple pour contrôler l'angle du doigt simulé – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

Description

- [AHControl](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHControl) inclut un nœud dora-rs pour piloter le moteur, ainsi que quelques utilitaires pour configurer le moteur.

- [AHSimulation](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHSimulation) inclut un nœud dora-rs pour simuler le mouvement de la main et obtenir la cinématique inverse.

- [HandTracking](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/HandTracking) inclut un nœud dora-rs qui suit les mains depuis une webcam et les utilise comme cibles pour piloter AH !

## Remarques

### 1. Problème de version mediapipe

Dans pyproject.toml, mediapipe>=0.10.14 est configuré, mais le paquet mediapipe installé ne possède pas le sous-module solutions. Il s'agit très probablement d'une incompatibilité de version de mediapipe avec Python 3.12 (les versions supérieures de mediapipe ont des problèmes de prise en charge de Python 3.12), ou de fichiers de paquet corrompus lors de l'installation.

```Plain Text
uv pip uninstall mediapipe
```

```Plain Text
uv pip install mediapipe==0.10.14
```

### 2. Incompatibilité de version Dora, format de message (v0.7.0 vs v0.8.0)

![2. Incompatibilité de version Dora, format de message v0.7.0 vs v0.8.0 – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)

Réponse : ①Premièrement, dans le répertoire utilisateur du lecteur C, sous .cargo/registry/src/github.xxxxxxxx/, supprimer uniquement le paquet de dépendance correspondant !

**`dora-message-0.7.0`** (crucial ! Il s'agit du dossier de l'ancien format de message, à supprimer)

`dora-core-0.4.1`

`dora-node-api-0.4.1`

`dora-arrow-convert-0.4.1`

`dora-metrics-0.4.1`

`dora-tracing-0.4.1`

`const-random-macro-0.1.16` (bibliothèque auxiliaire dépendante de Dora, à supprimer avec l'ancienne version)

②Ouvrir le dossier Demo/AHControl et modifier dora-node-api="0.5.0" et dora-message="0.8.0" dans Cargo.toml

③Dans la console, se rendre dans le répertoire AHControl et relancer cargo build --release

④Refaire la « [Exécution sur matériel réel](https://juxitech.feishu.cn/docx/FnF9dE1w7oFLtSx2p2ocU96Knpe#doxcnI3XybJ3CPPpdlSk5iH8wug) » pour reconstruire

Modifier la version correspondante selon le message d'erreur réel. Par exemple, si dora-message requiert la version 0.6.0, passer à dora-node-api="0.4.0" dora-message="0.6.0".

![2. Incompatibilité de version Dora, format de message v0.7.0 vs v0.8.0 – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/11.png)

![2. Incompatibilité de version Dora, format de message v0.7.0 vs v0.8.0 – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/12.png)

### 3. Bibliothèque openCV manquante

![3. Bibliothèque openCV manquante – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/13.png)

Entrer la commande suivante dans le répertoire HandTracking

```Python
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

### 4. Activer l'autorisation caméra (PC)

![4. Activer l'autorisation caméra PC – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/14.png)

![4. Activer l'autorisation caméra PC – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/16.png)

![4. Activer l'autorisation caméra PC – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)

### 5. Utilisation de la caméra dans la machine virtuelle 22.04

Voir https://blog.csdn.net/qq_19731521/article/details/124954288

### 6. Installation de la caméra de bureau

#### Étapes d'installation du support du kit caméra d'environnement

1. Fixer d'abord le support d'angle à réglage fin

![Étapes d'installation du support du kit caméra d'environnement – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)

2. Vue latérale du kit caméra d'environnement

![Étapes d'installation du support du kit caméra d'environnement – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/2.png)

## Exécuter le suivi de main directement dans une machine virtuelle 22.04

Télécharger ces quatre fichiers, les placer dans un même dossier en anglais, puis utiliser le logiciel de machine virtuelle pour ouvrir directement le fichier .ovf afin d'entrer dans le système

Mot de passe : ubuntu

[ubuntu22.04_amazinghand.ovf]

[ubuntu22.04_amazinghand-disk1.vmdk]

[ubuntu22.04_amazinghand.mf]

[ubuntu22.04_amazinghand-file1.iso]

**1. Ouvrir la console sous le répertoire Demo :**

```Plain Text
dora up
```

**Et activer l'environnement virtuel :**

```Plain Text
source .venv/bin/activate
```

**2. Autorisation d'accès à la caméra de la machine virtuelle**

Référence pour la machine virtuelle 22.04 appelant la caméra : https://blog.csdn.net/qq_19731521/article/details/124954288

**3. Vérifier le port de la carte driver de servos en ligne de commande :**

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

**4. Modifier le numéro de port dans le fichier de code**

①Localiser le fichier de code main.rs sous le répertoire AmazingHand-main\Demo\AHControl\src, l'ouvrir en mode texte, et le modifier avec le numéro de port trouvé sur votre machine (COM\* pour Windows, généralement /dev/ttyACM\* pour Ubuntu et Linux)

![Exécuter le suivi de main directement dans une machine virtuelle 22.04 – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

②Trouver le fichier d'instance correspondant

**Main droite** : trouver dataflow_tracking_real_right.yml sous le répertoire AmazingHand-main\Demo

**Main gauche** : trouver dataflow_tracking_real_left.yml sous le répertoire AmazingHand-main\Demo

**Deux mains** : trouver le fichier dataflow_tracking_real_2hands.yml sous le répertoire AmazingHand-main\Demo

Ouvrir en format texte et le modifier avec le numéro de port trouvé sur votre machine (COM\* pour Windows, généralement /dev/ttyACM\* pour Ubuntu et Linux)

![Exécuter le suivi de main directement dans une machine virtuelle 22.04 – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)

![Exécuter le suivi de main directement dans une machine virtuelle 22.04 – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

![Exécuter le suivi de main directement dans une machine virtuelle 22.04 – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)

**5. Lancer le suivi de la main droite**

```Plain Text
dora run dataflow_tracking_real_right.yml --uv
```

<RelatedProducts slugs="amazinghand,servo-driver-board" />

---

## Fichiers de modèle

Vous pouvez consulter ou télécharger le modèle sur [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (main droite et fichier URDF inclus), par exemple si vous avez besoin de fichiers de modèle dans d'autres formats

Right_Hand.step

Le [modèle MuJoCo](https://github.com/pollen-robotics/AmazingHand/tree/main/Demo/AHSimulation/AHSimulation) de la main dextre

![Image 20](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)
