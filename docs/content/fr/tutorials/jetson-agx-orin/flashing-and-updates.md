---
title: Flashage et mises à jour — Options d'installation du BSP
sidebar_label: Flashage et mises à jour
slug: /getting-started/flashing-and-updates
description: >-
  Les trois méthodes officielles pour installer ou mettre à jour le BSP sur le
  kit de développement Jetson AGX Orin — Jetson ISO (recommandée), NVIDIA SDK
  Manager et le script de flashage Linux_for_Tegra — ainsi que la procédure
  pour entrer en mode Force Recovery.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# Flashage et mises à jour — Options d'installation du BSP

NVIDIA propose trois méthodes officielles pour installer ou mettre à jour le BSP
sur le kit de développement. Choisissez selon votre situation :

| | 💾 Démarrer avec l'eMMC | 🛠️ SDK Manager | 📜 Script de flashage |
|---|---|---|---|
| En bref | Démarrer sur l'eMMC préflashé, mettre à jour avec Jetson ISO | Outil graphique sur un PC hôte ; flashe le BSP et peut installer les paquets JetPack | Script `flash.sh` sur un PC hôte |
| PC hôte Ubuntu | **Non requis** | Requis | Requis |
| Temps typique | Premier démarrage immédiat ; mise à jour ISO ~15 min | ~30 min de flashage | Dépend de la configuration |
| À qui s'adresse cette méthode | Tout le monde (option par défaut recommandée) | Toute personne disposant d'un PC Ubuntu ; nécessaire pour flasher un NVMe/microSD/USB ou lorsque le kit n'a pas d'accès internet | Développeurs produit, utilisateurs avancés |

> **Remarque de Juxi :** la version actuelle est **JetPack 7.2.1 (L4T r39.2.1)**. Si votre
> kit est neuf, commencez par **[Démarrage rapide](/fr/tutorials/jetson-agx-orin/quick-start)** — il parcourt
> le chemin recommandé de bout en bout.

## Option 1 — Démarrer avec l'eMMC, mettre à jour avec Jetson ISO (recommandée)

Votre kit de développement est livré avec un BSP L4T préflashé sur l'eMMC et
démarre sur le bureau Ubuntu dès la sortie de la boîte. La méthode de mise à
jour recommandée est la **Jetson ISO** — une clé USB amorçable qui met le kit à
jour **sans PC hôte Ubuntu**.

**Prérequis :** le BSP installé doit être **L4T r35.5 ou version ultérieure**
(vérifiez avec `cat /etc/nv_tegra_release`). Les kits plus anciens nécessitent
d'abord une méthode via PC hôte (option 2 ou 3 ci-dessous).

La procédure détaillée pas à pas (création de la clé USB avec Balena Etcher,
démarrage UEFI, invite de capsule QSPI, menu GRUB, sélection du stockage,
premier démarrage) se trouve dans
**[Démarrage rapide → Étape 2](/fr/tutorials/jetson-agx-orin/quick-start)**.

Points clés de la documentation NVIDIA :

- Au menu GRUB, vous choisissez la cible d'installation : **eMMC** ou **NVMe** (recommandé si vous avez installé un SSD).
- Si une invite s'affiche, confirmez la **mise à jour de capsule QSPI** avec `Y` — elle est requise pour la compatibilité et s'exécute deux fois. L'ignorer entraîne des problèmes d'installation (cela est aussi signalé dans les notes de version L4T comme problème connu 6266271).
- Réinstaller sur un système qui exécute déjà JetPack 7.2.1 est pris en charge — suivez attentivement les instructions officielles.

## Option 2 — NVIDIA SDK Manager (PC hôte)

Choisissez SDK Manager lorsque vous voulez :

- flasher le BSP L4T de base vers un **support de stockage différent** de l'eMMC (SSD NVMe, clé USB ou carte microSD), ou
- flasher un kit qui **ne peut pas être directement connecté à Internet**.

**Configuration requise du PC hôte** (selon la documentation SDK Manager de NVIDIA) : Ubuntu
Desktop **20.04 ou 22.04** sur x86_64, 8 Go de mémoire système, 25 Go d'espace
disque libre, et une **adhésion au NVIDIA Developer Program** (gratuite) pour
télécharger l'outil et se connecter. Remarque : les notes de version L4T 39.2
indiquent comme distribution Linux hôte pour le flashage Ubuntu **24.04 et 22.04**
— consultez la page des exigences système de NVIDIA SDK Manager pour la liste à
jour, car ce domaine évolue.

**Installation et connexion :**

1. Téléchargez le paquet `.deb` de SDK Manager depuis NVIDIA et installez-le :
   `sudo apt install ./sdkmanager_*-*_amd64.deb`
2. Lancez-le avec `sdkmanager`, cliquez sur l'onglet **NVIDIA DEVELOPER** et connectez-vous.

**Préparation matérielle et mode Force Recovery :**

1. Connectez le kit au PC hôte avec le câble USB-A↔USB-C fourni, branché sur le **port USB-C à côté du connecteur 40 broches** (étiqueté port 10 / J40).
2. **Tout en maintenant le bouton Force Recovery central** (bouton 2, entre Power et Reset), insérez l'alimentation USB-C dans le port USB-C au-dessus du connecteur DC. Le kit s'allume en **mode Force Recovery**.
3. Sur l'hôte, SDK Manager devrait détecter le kit. *(Si ce n'est pas le cas, voir [Dépannage](/fr/tutorials/jetson-agx-orin/troubleshooting).)*

**Étapes de flashage dans SDK Manager** (résumé — suivez les instructions à l'écran) :

1. **Étape 01 :** sélectionnez **Jetson** comme catégorie de produit, désélectionnez « Host Machine », sélectionnez le module **Jetson AGX Orin**, puis continuez.
2. **Étape 02 :** pour un BSP de base, sélectionnez uniquement **Jetson OS** (désélectionnez « Jetson SDK Components »). Acceptez la licence.
3. **Étape 03 :** saisissez votre mot de passe sudo ; attendez la fin du téléchargement. Dans la boîte de dialogue de flashage, choisissez **« Manual Setup – Jetson AGX Orin »**, ignorez la configuration OEM, sélectionnez le **périphérique de stockage** cible, puis cliquez sur **Flash**.
4. Une fois le flashage terminé, le kit redémarre sur le nouveau BSP. Terminez l'`oem-config` d'Ubuntu, puis installez les composants JetPack (voir [Démarrage rapide → Étape 3](/fr/tutorials/jetson-agx-orin/quick-start)).

## Option 3 — Script de flashage Linux_for_Tegra

Pour les utilisateurs avancés et les développeurs produit : les scripts `flash.sh`
(ou initrd flash) du paquet Jetson Linux permettent de flasher un appareil Jetson
depuis un PC hôte. Voir la section **Flashing Support** du
[Guide du développeur Jetson Linux](https://docs.nvidia.com/jetson/archives/DeveloperGuide).

Faits concernant l'hôte et la chaîne d'outils, tirés des notes de version L4T 39.2 :
distribution Linux hôte pour le flashage — Ubuntu 24.04 / 22.04 ; chaîne de
compilation croisée — GCC 13.2 ; tag de publication des sources — `jetson_39.2_GA`.

## Mode Force Recovery — comment y entrer

Même procédure que ci-dessus, aucun hôte n'est nécessaire pour l'exécuter :

1. Le kit étant éteint et le câble de données USB-C connecté à un hôte (si vous en avez besoin),
2. **Maintenez le bouton Force Recovery central**, puis connectez l'alimentation USB-C — le kit démarre en mode Force Recovery.

Pour quitter le mode recovery, éteignez puis rallumez le kit ou réinitialisez-le.
Sur l'hôte, le mode recovery est généralement visible comme un périphérique
USB NVIDIA (`lsusb`).

## Après le flashage

Vérifiez le résultat : **[Vérifier votre système](/fr/tutorials/jetson-agx-orin/verify-your-system)** — contrôles de version
pour L4T, CUDA et l'ensemble de la pile de composants JetPack.

## Sources

- [Installation du BSP — Guide de l'utilisateur du kit de développement Jetson AGX Orin](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) (vérifié le 2026-09-23)
- [Démarrage rapide — même guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (vérifié le 2026-09-23)
- [Notes de version Jetson Linux 39.2.0 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (vérifié le 2026-09-23)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)

*Statut : brouillon, en attente de révision par cheny. Fondé sur la documentation
officielle NVIDIA à la date indiquée ; pas encore vérifié sur matériel physique
par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est publiée
par Juxi Technology et n'est pas une publication de NVIDIA.
