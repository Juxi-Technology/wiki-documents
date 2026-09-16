---
title: "Déploiement et exécution en un clic sous Windows"
description: "Déploiement en un clic du suivi de gestes AmazingHand sous Windows : double-cliquez les scripts numérotés, puis pilotez la main simulée ou réelle par gestes."
---

# Déploiement et exécution en un clic sous Windows

[AmazingHand-main.zip](/downloads/AmazingHand-main.zip)

Ce tutoriel est basé sur la Demo officielle d'AmazingHand (main dextre de Pollen Robotics) ; le script de déploiement en un clic est déjà configuré.
Il suffit de les exécuter dans l'ordre des numéros. **Tous les scripts se trouvent dans le dossier ****`Demo\Windows一键部署脚本\`**** et s'exécutent directement par double-clic.**

---

## Préparation du matériel

> Les fichiers de modèle peuvent être consultés sur [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) ou téléchargés directement (URDF inclus).
> 
> 

---

## Installation de l'environnement (script 1)

**Double-cliquez sur ****`1-安装环境.bat`**, les opérations suivantes sont effectuées automatiquement :

1. **Vérifier les outils de compilation MSVC** (cl.exe)——indispensable pour la compilation de Rust. En cas d'absence, il est demandé d'installer
Visual Studio 2022 Build Tools, en cochant « Développement Desktop en C++ » ; après l'installation, rouvrez le terminal.

2. **Installer Rust** (chaîne d'outils rustup + stable-msvc)

3. **Configurer la source miroir Tsinghua pour cargo** (`C:\Users\你的用户名.cargo\config.toml`) afin d'accélérer le téléchargement des crates

4. **Installer uv** (gestionnaire de paquets Python)

5. **Installer dora-cli 0.5.0** (`cargo install`, la première compilation prend environ 10~20 minutes, patience)

6. **Installer le paquet pip dora-rs** (facultatif, sera installé dans l'environnement virtuel)

> **Important** : après la fin du script, **fermez et rouvrez le terminal** pour que les variables d'environnement prennent effet. Le processus d'installation peut être ralenti par le réseau ; veuillez patienter et ne pas fermer en cours de route.
> 
> 

### Installation manuelle alternative (si les scripts ne sont pas disponibles)

- **Rust**：[https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

    - Sous Windows, utilisez rustup-init.exe et choisissez la chaîne d'outils MSVC par défaut

    - Variable d'environnement : ajoutez `%USERPROFILE%.cargo\bin` au PATH

- **uv** : dans PowerShell, exécutez `irm ``https://astral.sh/uv/install.ps1`` | iex`

    - Variable d'environnement : ajoutez `%USERPROFILE%.local\bin` au PATH

- **dora-cli** : `cargo install dora-cli --version 0.5.0`

### Configuration du miroir Tsinghua pour cargo (~/.cargo/config.toml)

```Bash
[source.crates-io]
replace-with = "tuna"

[source.tuna]
registry = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[registries.tuna]
index = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[http]
check-revoke = false
```

> Utilisez l'**index sparse** (comme ci-dessus), n'utilisez pas le miroir de dépôt git —— la méthode git nécessite le téléchargement d'environ 1 GB d'index la première fois, ce qui peut facilement bloquer sur `Updating 'tuna' index`.
> 
> 

---

## Mode de câblage

- La carte de commande des servomoteurs se connecte à l'ordinateur en USB, **avec une alimentation externe 5V4A**

- Côté ordinateur, trouvez le numéro de port : **Gestionnaire de périphériques → Ports (COM et LPT)**, par exemple `COM11`

---

## Configuration du port série (script 2)

**Double-cliquez sur ****`2-配置串口.bat`** (la logique réelle se trouve dans `2-配置串口.ps1`) :

1. Le message « veuillez connecter la carte de commande des servomoteurs à l'ordinateur » s'affiche → appuyez sur Entrée pour lancer la détection

2. La liste des ports COM détectés s'affiche automatiquement (avec le nom des appareils)

3. S'il n'y a qu'un seul port, appuyez sur Entrée pour confirmer ; s'il y en a plusieurs, saisissez le numéro

4. Écrit automatiquement le `--serialport` des 3 fichiers yml de dataflow et le port par défaut de `AHControl\src\main.rs`

5. Les fichiers originaux sont automatiquement sauvegardés en `.bak`

> Si vous rebranchez l'USB, le numéro de port peut changer ; il faut alors réexécuter ce script.
> 
> 

---

## Déploiement du code (script 3)

**Double-cliquez sur ****`3-部署代码.bat`**, les opérations suivantes sont effectuées automatiquement :

1. Démarrer le démon dora (`dora up`)

2. Créer un environnement virtuel Python 3.12 (`uv venv --python 3.12`)

3. Activer l'environnement virtuel

4. Compiler le nœud Rust AHControl (`cargo build --release`, environ 10 minutes la première fois)

5. Synchroniser les dépendances de AHSimulation et HandTracking (`uv sync`)

6. Forcer l'installation de mediapipe==0.10.14

> Le déploiement ne doit être effectué qu'une seule fois. Une exécution ultérieure demandera s'il faut recréer l'environnement virtuel.
> 
> 

---

## Exécution du code (script 4)

**Double-cliquez sur ****`4-运行代码.bat`**, un menu interactif apparaît :

```Bash
============================================
   请选择运行模式：
============================================
    1 - 模拟仿真（摄像头手势追踪）
    2 - 真实硬件
    q - 退出
============================================
  请输入序号 [1/2/q]:
```

- Choisissez **1** : environnement de simulation, les gestes de la caméra pilotent deux mains simulées

- Choisissez **2** : vous entrez dans un sous-menu où vous sélectionnez main droite / main gauche / deux mains

```Bash
============================================
   真实硬件 - 请选择灵巧手：
============================================
    1 - 右手
    2 - 左手
    3 - 左右双手
    b - 返回上级菜单
============================================
```

Après votre choix, `dora build` + `dora run` s'exécutent automatiquement. La fenêtre de la caméra s'ouvre ; faites des gestes face à la caméra et la main dextre suit en temps réel. **Ctrl+C pour arrêter** ; une fois le flux de données terminé, appuyez sur Entrée pour revenir au menu principal, où vous pouvez choisir un autre mode ou appuyer sur `q` pour quitter.

> Lors de la première exécution, Windows peut bloquer l'accès à la caméra ; cliquez sur « Autoriser ».
> 
> 

---

## Nettoyage du projet (script 0)

**Double-cliquez sur ****`0-清理项目.bat`**, saisissez `Y` pour confirmer, le nettoyage est alors effectué automatiquement :

1. Arrêter le démon dora

2. Supprimer les 3 environnements virtuels (`.venv`)

3. Supprimer les produits de compilation Rust (`Demo\target`)

4. Supprimer `pycache`, les sauvegardes `.bak`, les journaux et `Demo\out` (répertoire des journaux de dora)

5. **Restaurer le port par défaut** (`--serialport /dev/ttyACM0`) et supprimer les traces de port série de la machine locale

> Après le nettoyage, vous pouvez copier l'intégralité du dossier `AmazingHand-main` à quelqu'un d'autre : il est propre et sans résidu. Sur une nouvelle machine, il suffit d'exécuter dans l'ordre 1 → 2 → 3 → 4.
> 
> 

---

## Questions fréquentes et remarques

### 8.1 cargo se bloque sur `Updating 'tuna' index`

- Cause : la configuration du miroir utilise la **méthode du dépôt git** (`.../git/crates.io-index.git`), ce qui nécessite le téléchargement d'un index de 1 GB+ la première fois

- Solution : modifiez `C:\Users\你的用户名.cargo\config.toml` pour utiliser l'**index sparse** (voir section 2.2), ou relancez directement `1-安装环境.bat`

### 8.2 mediapipe : sous-module solutions manquant / installation corrompue

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- Doit être exécuté avec l'environnement virtuel activé (dans le répertoire `Demo`)

- `3-部署代码.bat` effectue déjà automatiquement cette étape de secours

### 8.3 Version de dora incompatible (message v0.8.0 vs v0.7.0)

- Symptôme : `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Cause : la version de dora-cli ne correspond pas à celle de dora-node-api. **Elles doivent être unifiées en 0.5.0**

    - Vérification : `dora --version` doit afficher `dora-cli 0.5.0`, `dora-message: 0.8.0`

    - Correction : `cargo install dora-cli --version 0.5.0 --force`

    - Si plusieurs dora se trouvent dans le PATH (par exemple l'ancienne version dans `C:\Users\xxx.dora\bin`), assurez-vous que `.cargo\bin` figure en premier, ou supprimez l'ancienne version

### 8.4 Échec du chargement des modèles MuJoCo / mediapipe (chemin en chinois)

- Symptôme : `ParseXML: Error opening file '...\scene.xml'` ou `Can't find file: ....tflite`

- Cause : le chargeur C++ de MuJoCo 3.x / mediapipe, sous Windows, **ne parvient pas à ouvrir un chemin absolu contenant du chinois** (par exemple `D:\Claude工作区...`)

- Ce projet intègre déjà des correctifs :

    - `AHSimulation\AHSimulation\mj_mink_*.py` change le répertoire de travail avant de charger le modèle

    - `HandTracking\mediapipe_patch.py` contourne le problème en utilisant les chemins courts 8.3 + un chemin relatif

- Ne supprimez pas ces correctifs

### 8.5 Autorisation d'accès à la caméra

- Lors de la première exécution, sélectionnez « Autoriser » dans la fenêtre qui s'affiche

- Paramètres → Confidentialité → Caméra → Autoriser l'accès des applications de bureau

### 8.6 Le numéro de port change à chaque fois

- Après avoir rebranché l'USB, le numéro COM peut changer ; relancez `2-配置串口.bat`

### 8.7 openCV manquant

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

(à exécuter dans le répertoire `HandTracking`, après activation de l'environnement virtuel)

---

## Description de la structure du code

### Répertoire Demo

### Correspondance des différents dataflow

### Principe du flux de données

```Bash
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### Emplacement de la configuration du port

- La ligne `args:` des trois `dataflow_tracking_real_*.yml` : `--serialport COMxx`

- Le `default_value = "COMxx"` de `AHControl\src\main.rs` (valeur par défaut du paramètre de port série)

- `AHControl\config\*.toml` : modèle de servomoteur, ID, décalage (en général, pas besoin de modifier)

