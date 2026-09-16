---
title: "Déploiement et exécution en un clic sous Mac"
description: "Ce tutoriel est basé sur la Demo officielle d'AmazingHand (main dextre de Pollen Robotics) ; le script de dép…"
---

# Déploiement et exécution en un clic sous Mac

[AmazingHand-main.zip]

Ce tutoriel est basé sur la Demo officielle d'AmazingHand (main dextre de Pollen Robotics) ; le script de déploiement en un clic est déjà configuré. Il suffit de les exécuter dans l'ordre des numéros. **Tous les scripts se trouvent dans le dossier Demo/Mac一键部署脚本/ et s'exécutent dans le terminal avec ./nom-du-script.**

---

## Préparation du matériel

|Matériel|Exigence|
|---|---|
|Corps de la main dextre|Main droite / main gauche / deux mains|
|Carte de commande des servomoteurs|Externe, connectée à l'ordinateur en USB|
|Alimentation|**Au moins 5V 4A** (l'alimentation par USB est insuffisante, une alimentation externe est obligatoire)|
|Caméra|Caméra intégrée au Mac ou caméra USB|

> Les fichiers de modèle peuvent être consultés ou téléchargés sur [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (URDF inclus).
> 
> 

---

## Obtenir les droits d'exécution des scripts (important)

**Après avoir copié les scripts depuis Windows / une archive vers Mac, les droits d'exécution (****`+x`****) sont perdus, une exécution directe renverra
****`Permission denied`****. Avant la première utilisation, vous devez impérativement exécuter :**

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
chmod +x *.sh
```

Ensuite, chaque script peut être exécuté avec `./nom-du-script`.

> Astuce : lorsque vous copiez `AmazingHand-main` vers Mac, l'utilisation de **tar** est la méthode la plus fiable pour conserver les permissions :
> `tar czf AmazingHand-main.tar.gz AmazingHand-main`, ou, après décompression, exécutez une seule fois `chmod +x *.sh` pour l'ensemble.
> 
> 

---

## Installation de l'environnement (script 1)

Dans le terminal, entrez dans le répertoire des scripts et exécutez (assurez-vous d'avoir déjà effectué l'étape 2 ci-dessus avec `chmod +x`) :

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
./1-安装环境.sh
```

Les opérations suivantes sont effectuées automatiquement :

1. **Vérifier les outils de ligne de commande Xcode** (indispensables pour la compilation de Rust). En cas d'absence, le message `xcode-select --install` est affiché

2. **Installer Rust** (chaîne d'outils rustup + stable)

3. **Configurer la source miroir Tsinghua pour cargo** (`~/.cargo/config.toml`) afin d'accélérer le téléchargement des crates

4. **Installer uv** (gestionnaire de paquets Python)

5. **Installer dora-cli 0.5.0** (`cargo install`, la première compilation prend environ 10~20 minutes, patience). Nettoie automatiquement les anciennes versions de dora

6. **Installer le paquet pip dora-rs** (facultatif)

> **Important** : après la fin du script, **fermez et rouvrez le terminal** pour que les variables d'environnement prennent effet. Si le numéro de version s'affiche vide, ajoutez les chemins suivants à `~/.zshrc` :
> 
> 

```Plain Text
export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
```

### Installation manuelle alternative (si les scripts ne sont pas disponibles)

- **Outils de ligne de commande Xcode** : `xcode-select --install`

- **Rust** : `curl --proto '=https' --tlsv1.2 -sSf `[`https://sh.rustup.rs`](https://sh.rustup.rs)` | sh`

- **uv** : `curl -LsSf `[`https://astral.sh/uv/install.sh`](https://astral.sh/uv/install.sh)` | sh`

- **dora-cli** : `cargo install dora-cli --version 0.5.0`

### Miroir Tsinghua pour cargo (~/.cargo/config.toml)

```Plain Text
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

- Sous macOS, le nom du périphérique de port série USB est **/dev/tty.usbmodem\*** ou **/dev/cu.usbmodem\*** (et non `/dev/ttyACM*` comme sous Linux)

- Pour consulter les ports :

```Plain Text
ls /dev/tty.usbmodem* /dev/cu.usbmodem*
```

---

## Configuration du port série (script 2)

**Exécutez ****`./2-配置串口.sh`** :

1. Le message « veuillez connecter la carte de commande des servomoteurs à l'ordinateur » s'affiche → appuyez sur Entrée pour lancer la détection

2. La liste des ports série détectés s'affiche automatiquement (`/dev/tty.usbmodem* / /dev/cu.usbmodem* / *.usbserial*`)

3. S'il n'y a qu'un seul port, appuyez sur Entrée pour confirmer ; s'il y en a plusieurs, saisissez le numéro

4. Écrit automatiquement le `--serialport` des 3 fichiers yml de dataflow et le port par défaut de `AHControl/src/main.rs`

5. Sous macOS, le port série USB est généralement accessible en lecture et en écriture par l'utilisateur ; si un manque de permission est signalé, exécutez manuellement :

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

Ou allez dans **Réglages du système → Confidentialité et sécurité → Surveillance des entrées** pour autoriser l'accès au terminal.

> Si vous êtes dans une machine virtuelle, connectez les périphériques USB à la machine virtuelle.
> 
> 

---

## Déploiement du code (script 3)

**Exécutez ****`./3-部署代码.sh`**, les opérations suivantes sont effectuées automatiquement :

1. Démarrer le démon dora (`dora up`)

2. Créer un environnement virtuel Python 3.12 (`uv venv --python 3.12`)

3. Activer l'environnement virtuel

4. Compiler le nœud Rust AHControl (`cargo build --release`, environ 10 minutes la première fois)

5. Synchroniser les dépendances de AHSimulation et HandTracking (`uv sync`)

6. Forcer l'installation de mediapipe==0.10.14 (piège connu du tutoriel, solution de secours)

> Le déploiement ne doit être effectué qu'une seule fois. Une exécution ultérieure demandera s'il faut recréer l'environnement virtuel.
> 
> 

---

## Exécution du code (script 4)

**Exécutez ****`./4-运行代码.sh`**, un menu interactif apparaît :

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

Après votre choix, `dora build` + `dora run` s'exécutent automatiquement. La fenêtre de la caméra s'ouvre ; faites des gestes face à la caméra et la main dextre suit en temps réel. **Ctrl+C pour arrêter** ; une fois le flux de données terminé, appuyez sur Entrée pour revenir au menu principal, où vous pouvez choisir un autre mode ou appuyer sur q pour quitter.

> **Lors de la première exécution, macOS demandera l'autorisation d'accéder à la caméra** : Réglages du système → Confidentialité et sécurité → Caméra, autorisez le terminal à utiliser la caméra.
> 
> 

---

## Nettoyage du projet (script 0)

**Exécutez ****`./0-清理项目.sh`**, saisissez Y pour confirmer, le nettoyage est alors effectué automatiquement :

1. Arrêter le démon dora

2. Supprimer les 3 environnements virtuels (`.venv`)

3. Supprimer les produits de compilation Rust (`Demo/target`)

4. Supprimer `__pycache__`, les sauvegardes `.bak`, les journaux et `Demo/out` (répertoire des journaux de dora)

5. **Restaurer le port par défaut** (`--serialport /dev/ttyACM0`) et supprimer les traces de port série de la machine locale

> Après le nettoyage, vous pouvez copier l'intégralité du dossier `AmazingHand-main` à quelqu'un d'autre : il est propre et sans résidu. Sur une nouvelle machine, il suffit d'exécuter dans l'ordre 1 → 2 → 3 → 4.
> 
> 

---

## Questions fréquentes et remarques

### 9.1 `Permission denied` (les scripts n'ont pas les droits d'exécution)

- Symptôme : lors de l'exécution de `./1-安装环境.sh`, le message `bash: ./1-安装环境.sh: Permission denied` apparaît

- Cause : après avoir copié les scripts depuis Windows / une archive vers Mac, **le bit d'exécution est perdu**

- Solution :

```Plain Text
chmod +x *.sh
```

### 9.2 cargo se bloque sur `Updating 'tuna' index`

- Cause : la configuration du miroir utilise la **méthode du dépôt git** (`.../git/crates.io-index.git`), ce qui nécessite le téléchargement d'un index de 1 GB+ la première fois

- Solution : modifiez `~/.cargo/config.toml` pour utiliser l'**index sparse** (voir section 3.2), ou relancez directement `1-安装环境.sh`

### 9.3 mediapipe : sous-module solutions manquant / installation corrompue

```Plain Text
uv pip uninstall mediapipe
uv pip install mediapipe==0.10.14
```

- Doit être exécuté avec l'environnement virtuel activé (dans le répertoire Demo)

- `3-部署代码.sh` effectue déjà automatiquement cette étape de secours

### 9.4 Version de dora incompatible (message v0.8.0 vs v0.7.0)

- Symptôme : `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Cause : la version de dora-cli ne correspond pas à celle de dora-node-api. **Elles doivent être unifiées en 0.5.0**

    - Vérification : `dora --version` doit afficher `dora-cli 0.5.0`, `dora-message: 0.8.0`

    - `1-安装环境.sh` détecte automatiquement les anciennes versions et force leur réinstallation

**Si une ancienne version de dora subsiste sur le système (par exemple 0.4.1), nettoyez-la d'abord manuellement :**

```Bash
# 1. Localiser l'ancienne version de dora
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. Supprimer l'ancienne version trouvée (selon le chemin réel)
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. Forcer l'installation de 0.5.0
cargo install dora-cli --version 0.5.0 --force

# 4. Vérifier la version (doit afficher dora-cli 0.5.0 / dora-message: 0.8.0)
dora --version
```

> Si `dora --version` affiche encore l'ancienne version, cela signifie qu'un autre ancien dora se trouve dans le PATH ; utilisez which dora pour les identifier et les supprimer un par un.
> 
> 

### 9.5 Port série sans permission

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

- Ou **Réglages du système → Confidentialité et sécurité → Surveillance des entrées** → autorisez le terminal

- Si le périphérique `tty.*` ne peut pas être lu, utilisez le périphérique `cu.*` correspondant (le périphérique cu ne fait que lire le port et convient mieux à une commande directe)

### 9.6 Autorisation d'accès à la caméra

- **Lors de la première exécution, sélectionnez « Autoriser » dans la fenêtre qui s'affiche**, ou allez dans **Réglages du système → Confidentialité et sécurité → Caméra** pour autoriser le terminal à utiliser la caméra

- Vérifiez que la caméra n'est pas occupée par d'autres applications (FaceTime, logiciels de visioconférence)

### 9.7 Le numéro de port change à chaque fois

- Après avoir rebranché l'USB, le nom du périphérique peut changer ; relancez `2-配置串口.sh`

### 9.8 openCV manquant

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

(à exécuter dans le répertoire `HandTracking`, après activation de l'environnement virtuel)

### 9.9 Compilation lente sur Apple Silicon / Première exécution bloquée par Gatekeeper

- Sur Apple Silicon, la première compilation des dépendances de dora par `cargo build` est lente, c'est normal ; patientez

- Si le message « développeur non vérifié » apparaît : Réglages du système → Confidentialité et sécurité → Ouvrir quand même

---

## Description de la structure du code

### Répertoire Demo

|Répertoire/Fichier|Description|
|---|---|
|AHControl|Nœud Rust, contrôle les moteurs des servomoteurs. src/main.rs est le point d'entrée|
|AHSimulation|Nœud Python, simulation MuJoCo + cinématique inverse (mink)|
|HandTracking|Nœud Python, suivi de la main MediaPipe|
|dataflow_\*.yml|Définition du flux de données dora (graphe de connexion des nœuds)|
|Mac一键部署脚本|Ce jeu de scripts en un clic|

### Correspondance des différents dataflow

|Fichier|Utilisation|
|---|---|
|dataflow_tracking_simu.yml|Environnement de simulation, gestes de la caméra → deux mains simulées|
|dataflow_tracking_real_right.yml|Main droite sur matériel réel|
|dataflow_tracking_real_left.yml|Main gauche sur matériel réel|
|dataflow_tracking_real_2hands.yml|Deux mains sur matériel réel (connectées à la même carte de commande)|

### Principe du flux de données

```Bash
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### Emplacement de la configuration du port

- La ligne `args:` des trois `dataflow_tracking_real_*.yml` : `--serialport /dev/cu.usbmodem...`

- Le `default_value` de `AHControl/src/main.rs` (valeur par défaut du paramètre de port série)

- `AHControl/config/*.toml` : modèle de servomoteur, ID, décalage (en général, pas besoin de modifier)



