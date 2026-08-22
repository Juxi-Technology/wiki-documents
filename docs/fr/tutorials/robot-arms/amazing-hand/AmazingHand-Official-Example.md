---
title: Tutoriel d'exécution de l'exemple officiel de la main robotique
description: "Téléchargez l'archive de code fournie avec ce tutoriel pour la démo, ou clonez le dépôt open source officiel https://github.com/pollen-robotics/AmazingHand.git ; le code officiel peut contenir des erreurs."
---

# Tutoriel d'exécution de l'exemple officiel de la main robotique

## 1. Téléchargement du code

Téléchargez l'archive de code fournie avec ce tutoriel pour la démo, ou clonez le dépôt open source officiel https://github.com/pollen-robotics/AmazingHand.git ; le code officiel peut contenir des erreurs.

Archive de code Windows
[AmazingHand-main.zip]

Archive de code Linux
[AmazingHand-main.zip]

```Plain Text
git clone https://github.com/pollen-robotics/AmazingHand.git
```

## 2. Installation de l'environnement

Installer Rust, uv et dora-rs selon le système

**1. Installer Rust :** https://www.rust-lang.org/tools/install
Windows : définir les variables d'environnement Rust (important !) voir https://zhuanlan.zhihu.com/p/1933164131969659101
Linux : définir les variables d'environnement :





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
**Linux : définir les variables d'environnement :**



**3. Installer dora-rs :** voir https://dora-rs.ai/docs/guides/Installation/installing
Linux : définir les variables d'environnement :



## 3. Câblage

Alimentation d'au moins 5V/3A. Brancher la carte driver de servos externe, connecter au PC via USB



## 4. Démo d'exemple

### **1. Trouver le numéro de port de la carte driver de servos**

- Windows généralement COM11 – port via le Gestionnaire de périphériques ou le logiciel hôte Feetech



- Ubuntu/Linux généralement /dev/ttyACM0
Vérifier le port en ligne de commande :

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

Si `ls /dev/ttyUSB* /dev/ttyACM*` ne trouve rien dans la VM, vérifier en bas à droite de la VM si la main est connectée au PC. Si oui, déconnecter et connecter à la VM



### **2. Modifier le numéro de port dans le code**

①Ouvrir `main.rs` dans AmazingHand-main\Demo\AHControl\src avec un éditeur texte et le remplacer par le port trouvé (Windows COM*, Ubuntu/Linux généralement /dev/ttyACM*)



②Trouver le fichier d'instance correspondant
**Main droite** …\Demo\dataflow_tracking_real_right.yml
**Main gauche** …\Demo\dataflow_tracking_real_left.yml
**Deux mains** …\Demo\dataflow_tracking_real_2hands.yml

Ouvrir en éditeur texte et remplacer par le port trouvé (Windows COM*, Ubuntu/Linux généralement /dev/ttyACM*)







### **3. Déploiement du code**

- Ouvrir le dossier Demo



- Windows : taper `Powershell` dans le dossier et appuyer sur Entrée



- Démarrer le processus démon (à chaque fois) :
Linux : ouvrir directement dans la console, démarrer le démon (à chaque fois) :
```Plain Text
dora up
```

- Puis dans la console, exécuter depuis ce dossier (une seule fois suffit lors de la configuration!! Relancer écrase l'environnement virtuel!!) Créer l'environnement virtuel :
```Plain Text
uv venv --python 3.12
```

- Activer l'environnement virtuel (à chaque fois) selon le système :
```Plain Text
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
.venv\Scripts\activate
```

```Plain Text
source .venv/bin/activate
```



Assurez-vous que l'environnement virtuel est activé dans la console !

- Synchroniser les dépendances, entrer dans AHControl
```Plain Text
cd AHControl
```

```Plain Text
cargo build --release
```

- Puis `cd ..` et Entrée pour revenir à Demo ! Entrer dans AHSimulation
```Plain Text
cd AHSimulation
```

```Plain Text
uv sync
```

- Puis `cd ..` et Entrée pour revenir à Demo ! Entrer dans HandTracking
```Plain Text
cd HandTracking
```

```Plain Text
uv sync
```

### 4. Résultat

- Ouvrir le dossier Demo ! Taper `Powershell` et Entrée, démarrer le démon (à chaque fois) :
```Plain Text
dora up
```

- Activer l'environnement virtuel (à chaque fois) selon le système :
Windows :
```Python
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

```Plain Text
.venv\Scripts\activate
```

Linux :
```Plain Text
source .venv/bin/activate
```

### Environnement de simulation

- Exécuter la démo de suivi de main par webcam uniquement en simulation :
```Plain Text
dora build dataflow_tracking_simu.yml --uv   #(une seule fois)
```

```Plain Text
dora run dataflow_tracking_simu.yml --uv
```





### Exécution sur matériel réel (suivi de main)

- Exécuter la démo avec le matériel réel :
    #### Main droite
    ```Plain Text
    dora build dataflow_tracking_real_right.yml --uv   #(une seule fois)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_right.yml --uv
    ```

    #### Main gauche
    ```Plain Text
    dora build dataflow_tracking_real_left.yml --uv   #(une seule fois)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_left.yml --uv
    ```

    #### Deux mains (les deux sur une seule carte driver !)



    ```Plain Text
    dora build dataflow_tracking_real_2hands.yml --uv   #(une seule fois)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_2hands.yml --uv
    ```





### Exemple simple : contrôler les angles de doigts en simulation

- Exemple simple pour contrôler les angles des doigts en simulation :
    ```Plain Text
    dora build dataflow_angle_simu.yml --uv   #(une seule fois)
    ```

    ```Plain Text
    dora run dataflow_angle_simu.yml --uv
    ```





Description
- [AHControl](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHControl) contient un nœud dora-rs pour piloter les moteurs et des utilitaires de configuration moteur.
- [AHSimulation](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHSimulation) contient un nœud dora-rs simulant le mouvement de la main et fournissant la cinématique inverse.
- [HandTracking](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/HandTracking) contient un nœud dora-rs qui suit la main via webcam et l'utilise comme cible de pilotage AH!.

## Remarques

### 1. Problème de version mediapipe

`pyproject.toml` configure mediapipe>=0.10.14 ; si le paquet installé n'a pas le sous-module `solutions`, il s'agit probablement d'une incompatibilité mediapipe avec Python 3.12 (les versions récentes ont des problèmes avec Python 3.12) ou de fichiers corrompus.

```Plain Text
uv pip uninstall mediapipe
```

```Plain Text
uv pip install mediapipe==0.10.14
```

### 2. Incompatibilité de version Dora, format de message (v0.7.0 vs v0.8.0)



Solution : ①Dans le répertoire utilisateur, sous .cargo/registry/src/github.xxxxxxxx/, supprimer uniquement les paquets concernés !
**`dora-message-0.7.0`** (crucial ! ancien format de message, à supprimer)
`dora-core-0.4.1`
`dora-node-api-0.4.1`
`dora-arrow-convert-0.4.1`
`dora-metrics-0.4.1`
`dora-tracing-0.4.1`
`const-random-macro-0.1.16` (bibliothèque auxiliaire de Dora, à supprimer avec l'ancienne version)

②Ouvrir Demo/AHControl, modifier dans Cargo.toml : dora-node-api="0.5.0" dora-message="0.8.0"
③Dans la console, aller dans AHControl et relancer `cargo build --release`
④Rebuilder selon [« Exécution sur matériel réel »](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg?node-id=1759567650651511609&from=from_node_link)
Adapter les versions selon l'erreur – par ex. pour dora-message 0.6.0 : dora-node-api="0.4.0" dora-message="0.6.0"





### 3. Bibliothèque openCV manquante



Dans HandTracking :
```Python
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

### 4. Activer l'autorisation caméra (PC)







### 5. Utiliser la caméra dans la VM 22.04

Voir https://blog.csdn.net/qq_19731521/article/details/124954288

### 6. Installer la caméra de bureau

#### Installation du support du kit caméra d'environnement

1. Fixer d'abord le support d'angle à réglage fin



2. Kit caméra d'environnement latéral



## Exécuter le suivi de main directement dans une VM 22.04

Télécharger ces quatre fichiers, les mettre dans un même dossier en anglais et ouvrir directement le fichier .ovf avec le logiciel de VM
Mot de passe ubuntu
[ubuntu22.04_amazinghand.ovf]
[ubuntu22.04_amazinghand-disk1.vmdk]
[ubuntu22.04_amazinghand.mf]
[ubuntu22.04_amazinghand-file1.iso]

**1. Ouvrir la console dans le dossier Demo :**
```Plain Text
dora up
```

**Activer l'environnement virtuel :**
```Plain Text
source .venv/bin/activate
```

**2. Autorisation caméra de la VM**
Pour la caméra dans VM 22.04 : https://blog.csdn.net/qq_19731521/article/details/124954288

**3. Vérifier le port de la carte driver :**
```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

**4. Modifier le port dans le code**
①Ouvrir `main.rs` sous AmazingHand-main\Demo\AHControl\src, remplacer par le port trouvé (Windows COM*, Ubuntu/Linux généralement /dev/ttyACM*)



②Trouver le fichier d'instance
**Main droite** …\Demo\dataflow_tracking_real_right.yml
**Main gauche** …\Demo\dataflow_tracking_real_left.yml
**Deux mains** …\Demo\dataflow_tracking_real_2hands.yml

Ouvrir en éditeur texte, remplacer par le port trouvé (Windows COM*, Ubuntu/Linux généralement /dev/ttyACM*)







**5. Lancer le suivi de la main droite**
```Plain Text
dora run dataflow_tracking_real_right.yml --uv
```
