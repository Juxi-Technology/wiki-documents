---
title: "02-Tutoriel de suivi de gestes"
description: "\\# Suivi de gestes — Tutoriel d'utilisation(version servomoteurs PWM)"
---

# 02-Tutoriel de suivi de gestes

**\# Suivi de gestes — Tutoriel d'utilisation(version servomoteurs PWM)**

Ce dossier fournit le **suivi de gestes** : la caméra reconnaît votre main, la main dextre suit en temps réel (chaîne IK complète).

> Chaîne : caméra → squelette de la main mediapipe → MuJoCo+IK → 8 angles d'articulation → ESP32 → servomoteurs PWM

> Applicable à : ESP32-S3 + 8 servomoteurs PWM. Pour le flashage du micrologiciel, voir `..\03_firmware_docs`.

## 1. Conditions préalables

1. **Matériel** : ESP32-S3 + 8 servomoteurs PWM sous tension, USB connecté, caméra disponible.

2. **Micrologiciel** : déjà flashé (voir le manuel d'utilisation de `..\03_firmware_docs`).

3. **Premier déploiement** (une seule fois, voir ci-dessous).

## 2. Premier déploiement

### 2.1 Installation de l'environnement

Entrez dans `Demo\Windows_Scripts_CN\` (pour un système en anglais, utilisez `Windows_Deploy_Scripts\`), puis double-cliquez dans l'ordre des numéros :

```Plaintext
1-安装环境.bat   → 安装 Rust / uv / dora(几分钟)
```

Après l'installation, **fermez le terminal et rouvrez-le** une fois.

### 2.2 Déploiement de la Demo

```Plaintext
3-部署代码.bat   → 创建 Python 环境 + 编译 AHControl + 安装依赖(几分钟)
```

## 3. Lancer le suivi de gestes (à chaque fois)

### 3.1 Double-clic sur le script d'exécution

Entrez dans `Demo\Windows_Scripts_CN\`, puis double-cliquez sur `4-运行代码.bat` :

```Plaintext
Select a run mode:
   1 - 模拟仿真（摄像头手势追踪）
   2 - 真实硬件（SCS0009 总线舵机）
   3 - PWM 舵机（ESP32 直驱）    ← 选 3
```

Choisissez ensuite le type de main :

```Plaintext
PWM 舵机（ESP32 直驱）- 请选择灵巧手：
   1 - 右手          ← 选 1
   2 - 左手          ← 选 2
```

### 3.2 Prise en main

1. Le script exécute automatiquement `dora build` + `dora run`.

2. La fenêtre de la caméra s'ouvre, les doigts de la simulation 3D apparaissent.

3. Placez votre main dans le champ et bougez les doigts → **la simulation 3D suit → la main dextre suit**.

4. Pour arrêter : Ctrl+C (ou fermez la fenêtre).

> Système Linux : utilisez `Demo\Linux_Scripts_CN\` (chinois) ou `Linux_Deploy_Scripts\` (anglais) ; les noms de scripts portent l'extension `.sh` et nécessitent `bash 脚本名` ou l'ajout du droit d'exécution pour être lancés.

## 4. Comment vérifier que tout fonctionne correctement

Dans la fenêtre d'exécution, le nœud AHControl affiche :

```Plaintext
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N` (par exemple `sent 300 frames, ESP32 acked 300 frames`) → **normal**, la liaison avec les servomoteurs fonctionne.

- `M = 0` → l'ESP32 ne reçoit pas de données, vérifiez le port série et l'alimentation (voir ci-dessous).

Tant que cette ligne augmente, cela signifie que la liaison avec les servomoteurs est normale ; il ne reste que la question de savoir si la caméra parvient à suivre.

## 5. Basculer entre main droite et main gauche

Il suffit de choisir le type de main dans le menu d'exécution. Après le basculement, le script se reconstruit automatiquement ; attendez la fin de la construction avant d'agir.

## 6. Questions fréquentes

|Symptôme|Solution|
|---|---|
|Les servomoteurs ne bougent pas du tout|Vérifiez l'alimentation (5V 3A), le port COM et le câblage ; la valeur `acked M frames` du journal est-elle à 0|
|Pas d'image de la caméra|Autorisez l'accès à la caméra (Paramètres → Confidentialité → Caméra)|
|La main ne suit pas / réagit lentement|Éclairage suffisant, main entièrement dans le champ, bougez plus lentement et avec une amplitude plus grande|
|Le geste de la main est inversé / le sens du pouce est inversé|Avez-vous bien sélectionné la main gauche/droite dans le menu ? Essayez l'autre|
|Après avoir changé de port USB, le port série est introuvable|Relancez `2-配置串口.bat` et sélectionnez une fois le nouveau port COM|

## 7. Utilisateurs de servomoteurs bus SCS0009

Cette Demo prend également en charge les **servomoteurs bus SCS0009** officiels. Dans le menu, sélectionnez `2 - 真实硬件(SCS0009 总线舵机)` ; pour la configuration et les explications, voir `Demo\双版本舵机并存说明.md` et le tutoriel officiel.

## Description de l'arborescence

|Chemin|Contenu|
|---|---|
|`Demo\AHControl`|Programme de contrôle des servomoteurs en Rust (code source, compilé automatiquement lors du déploiement)|
|`Demo\AHSimulation`|Simulation MuJoCo + résolution IK|
|`Demo\HandTracking`|Suivi de la main MediaPipe|
|`Demo\Windows_Scripts_CN` / `Windows_Deploy_Scripts`|Scripts Windows en un clic (chinois/anglais)|
|`Demo\Linux_Scripts_CN` / `Linux_Deploy_Scripts`|Scripts Linux en un clic (chinois/anglais)|
|`Demo\dataflow_*_pwm.yml`|Flux de données version PWM (débit en bauds 115200 déjà intégré)|

