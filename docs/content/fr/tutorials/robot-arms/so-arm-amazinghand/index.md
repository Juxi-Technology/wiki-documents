---
title: "Tutoriel d'utilisation de SO-ARM101 + AmazingHand"
description: "Ce tutoriel couvre l'ensemble du processus de téléopération, de collecte de données et d'entraînement pour re…"
---


# Tutoriel d'utilisation de SO-ARM101 + AmazingHand

Ce tutoriel couvre l'ensemble du processus de téléopération, de collecte de données et d'entraînement pour reproduire le **bras esclave SO-ARM101 + la main dextre AmazingHand**, basé sur LeRobot (version personnalisée du dépôt officiel).

Le tutoriel est organisé par **phases**. Chaque phase constitue un répertoire indépendant, à l'intérieur duquel la documentation est séparée par système d'exploitation en deux fichiers `win.md` (Windows) et `linux.md` (Linux). Veuillez choisir le document correspondant à votre système d'exploitation.

---

## Aperçu du matériel et des logiciels

|Équipement|Port série (exemple, à remplacer)|Modèle de servomoteur|Description|
|---|---|---|---|
|Bras maître (Leader)|`COM54` / `/dev/ttyACM1`|Modèle mixte<br>`sts3125-C001、sts3215-C044、sts3215-C046`|Entrée de téléopération, conserve la pince n° 6|
|Bras esclave (Follower)|`COM58` / `/dev/ttyACM0`|`sts3215-C018` (n° 1-5)|Côté exécution, pince n° 6 démontée|
|Main dextre AmazingHand|`COM11` / `/dev/ttyACM2`|`scs0009` (8 unités, ID 1-8)|Extrémité du bras esclave, port série indépendant|

> **⚠️ Le nom du port série varie selon la machine** : le tableau ci-dessus est un exemple. Les numéros de COM / chemins de périphérique diffèrent pour chaque ordinateur ; vérifiez impérativement les valeurs réelles de votre machine avec `lerobot-find-port`, puis remplacez tous les paramètres de substitution dans les commandes.

> Les trois équipements doivent impérativement disposer d'**un port série indépendant et d'une alimentation indépendante**. Le SCS0009 (protocole 1) et le STS3215 (protocole 0) sont incompatibles sur le même bus.

---

## Structure du répertoire du tutoriel

```Plaintext
tutorials/
├── README.md                          # Ce fichier (aperçu)
├── 01-environment/                    # Phase 1 : Configuration de l'environnement
│   ├── win.md                         #   Configuration de l'environnement Windows
│   └── linux.md                       #   Configuration de l'environnement Linux
├── 02-calibration/                    # Phase 2 : Calibration
│   ├── win.md
│   └── linux.md
├── 03-teleoperation/                  # Phase 3 : Téléopération
│   ├── win.md
│   └── linux.md
├── 04-data-collection/                # Phase 4 : Collecte de données
│   ├── win.md
│   └── linux.md
├── 05-training/                       # Phase 5 : Entraînement du modèle
│   ├── win.md
│   └── linux.md
└── 06-deployment/                     # Phase 6 : Déploiement et évaluation
    ├── win.md
    └── linux.md
```

---

## Parcours de lecture recommandé

|Étape|Phase|Windows|Linux|
|---|---|---|---|
|1|Configuration de l'environnement|01-environment/win.md|01-environment/linux.md|
|2|Calibration|02-calibration/win.md|02-calibration/linux.md|
|3|Téléopération|03-teleoperation/win.md|03-teleoperation/linux.md|
|4|Collecte de données|04-data-collection/win.md|04-data-collection/linux.md|
|5|Entraînement du modèle|05-training/win.md|05-training/linux.md|
|6|Déploiement et évaluation|06-deployment/win.md|06-deployment/linux.md|

---

## Récapitulatif des différences clés par phase

|Aspect|Windows|Linux|
|---|---|---|
|Environnement Python|Miniconda + `conda create -n lerobot python=3.12`|Miniforge + la même commande|
|Nom du port série|`COM54` / `COM58` / `COM11` (exemple)|`/dev/ttyACM0/1/2` (exemple)|
|Permissions du port série|Aucune configuration particulière|Nécessite `sudo chmod 666 /dev/ttyACM*` ou une règle udev|
|Appel des commandes|`lerobot-xxx` après activation de conda|`lerobot-xxx` après activation de conda|
|Entraînement CUDA|Nécessite d'installer CUDA torch manuellement|Support officiel, résolution fluide|

---

## Remarques générales

1. **Terminez d'abord la phase 1, puis passez aux phases suivantes** — l'environnement est le prérequis de toutes les commandes qui suivent.

2. **Chaque ordinateur doit être recalibré** : en particulier les angles de la main (`lerobot-calibrate-amazing-hand`). Les angles du config sont les valeurs par défaut génériques officielles d'AmazingHand et ne servent que de secours ; si `hand_angles.json` existe, les valeurs mesurées sur la machine sont chargées en priorité.

3. **Emplacement des fichiers de calibration** : `~/.cache/huggingface/lerobot/calibration/` ; en changeant de machine, il faut migrer les fichiers ou recalibrer.

4. **Lors de la première téléopération, vérifiez impérativement les directions** : pince ouverte ↔ main ouverte, pince pincée ↔ main fermée.

5. Les fichiers `win.md` / `linux.md` de chaque phase contiennent des **remarques spécifiques à la plateforme** ; veuillez les lire intégralement.

---

## Point d'entrée du dépannage

Les documents de chaque phase incluent un tableau de dépannage par plateforme. Problèmes courants :

- conda non initialisé / commande introuvable

- permissions de port série insuffisantes (Linux)

- mappage incorrect des directions main/bras

- angles de la main non calibrés entraînant une ouverture/fermeture anormale

Voir les documents de chaque phase pour plus de détails.

## Liens associés

- [Tutoriel d'utilisation de la main dextre AmazingHand](https://juxitech.feishu.cn/wiki/PR1JwkQxaiDAn1k85e2cZIi5nTf)
- [Tutoriel du bras robotisé SO-ARM101](https://juxitech.feishu.cn/wiki/NOWXw9NOJiDTs2kRr7RcdIrKnvg)

<RelatedProducts slugs="so-arm101,amazinghand" />
