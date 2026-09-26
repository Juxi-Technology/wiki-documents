---
title: Flashage et mises à jour — Options d'installation du BSP
sidebar_label: Flashage et mises à jour
slug: /getting-started/flashing-and-updates
description: >-
  Les trois méthodes officielles pour installer ou mettre à jour le BSP sur le
  kit de développement Jetson Orin Nano Super — Jetson ISO (recommandée), NVIDIA
  SDK Manager et le script de flashage Linux_for_Tegra — ainsi que le choix du
  stockage, le parcours de mise à jour du micrologiciel JetPack 6.x pour les
  kits plus anciens, et le mode Force Recovery.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html
    checked: 2026-09-26
review_owner: cheny
---

# Flashage et mises à jour — Options d'installation du BSP

NVIDIA propose trois méthodes officielles pour installer ou mettre à jour le BSP (Jetson
Linux) sur le kit de développement Jetson Orin Nano Super. Deux réalités matérielles les
façonnent toutes : il n'y a **aucun stockage dans la boîte** (ni eMMC, ni carte microSD,
ni SSD), et JetPack 7.2 a **supprimé les images pour carte SD** — l'ISO unifiée sur clé
USB les remplace, tandis que la carte microSD elle-même reste une cible d'installation
valide.

| | Jetson ISO (recommandée) | NVIDIA SDK Manager | Script de flashage Linux_for_Tegra |
|---|---|---|---|
| En bref | Démarrez le kit depuis une clé d'installation créée sur n'importe quel PC ; choisissez le stockage cible sur le kit | Outil graphique sur un PC hôte ; flashe le BSP vers le stockage choisi via USB-C | Outils de flashage en ligne de commande sur un PC hôte ; contrôle direct de la cible |
| PC hôte Ubuntu | Non requis | Requis (x86_64) | Requis (x86_64) |
| Temps typique | Non publié ; l'installateur affiche sa progression « pendant plusieurs minutes » | Non publié ; l'hôte télécharge d'abord le BSP et le système de fichiers racine | Dépend de votre configuration |
| Pour qui | Première configuration d'un kit neuf ; la plupart des utilisateurs | Utilisateurs avec un PC Ubuntu ; la voie privilégiée par NVIDIA pour flasher directement sur un SSD NVMe ; aussi utilisée pour les mises à jour de micrologiciel | Utilisateurs avancés et développeurs de produits |

NVIDIA ne publie aucun temps d'installation ; les rapports de forum vont d'environ 15 minutes
à deux heures (non confirmé).

> **Remarque de Juxi :** la version actuelle est **JetPack 7.2.1 (L4T r39.2.1)**. Sur un kit
> neuf, commencez par **[Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start)** — il parcourt de bout en bout
> la méthode ISO recommandée. Revenez ici pour comparer les méthodes, choisir un stockage
> ou mettre à jour un kit plus ancien.

## Option 1 — Jetson ISO (recommandée)

La Jetson ISO est la méthode de première installation recommandée par NVIDIA et la seule qui
ne nécessite aucun PC hôte Ubuntu : écrivez un fichier ISO sur une clé USB depuis n'importe
quel ordinateur, démarrez le kit depuis la clé et installez sur le stockage que vous avez
préparé. Préparez ces éléments :

- **Stockage cible** (le kit n'en a aucun ; voir la section sur le stockage ci-dessous) : une **carte microSD de 64 GB
  UHS-1 ou plus (recommandé)**, insérée dans le logement sur la **face inférieure du module**
  avant de démarrer l'installateur, ou un **SSD NVMe** (facultatif ; recommandé pour plus de capacité et
  de meilleures performances de stockage).
- **Une clé USB de 16 GB ou plus** — elle deviendra la clé d'installation.
- **Un ordinateur portable ou de bureau (Windows, Mac ou Linux) avec au moins 25 GB d'espace libre**, pour écrire l'ISO.
- **Un écran DisplayPort et un clavier USB** (ou un câble série USB-TTL pour une configuration sans écran ;
  HDMI n'est pas pris en charge), ainsi que le bloc d'alimentation 19 V fourni.

Deux précautions décident du succès : le micrologiciel doit être de génération JetPack 6.x — si l'écran reste
noir ou qu'un shell UEFI apparaît, exécutez d'abord le parcours de mise à jour JetPack 6.x ci-dessous — et, à l'invite de
capsule QSPI, appuyez sur `Y` dans les 30 secondes ; une invite expirée fait échouer l'installation plus tard, alors
relancez l'installation et appuyez sur `Y`.

> **Important :** écrivez l'ISO sur la **clé USB, et non sur une carte microSD** (« Ne flashez pas
> la Jetson ISO sur une carte microSD »). L'installation **efface aussi le stockage cible
> sélectionné** ; vérifiez quel périphérique vous avez sélectionné avant de commencer.

La procédure détaillée pas à pas — téléchargement de l'ISO, Balena Etcher, gestionnaire de démarrage UEFI, menu GRUB,
sélection du stockage, configuration Ubuntu du premier démarrage — se trouve dans **[Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start)**. La
clé d'installation **n'est pas une « Live USB »** (elle ne fait qu'installer), retirez-la donc après l'installation lorsque vous y êtes
invité.

## Option 2 — NVIDIA SDK Manager (PC hôte)

SDK Manager est la méthode via PC hôte : il flashe le BSP via USB-C et peut aussi mettre à jour le micrologiciel du kit
(voir la section sur le parcours de mise à jour ci-dessous).

**Configuration requise du PC hôte** (selon la page d'installation du BSP du kit) : un **PC x86 sous Ubuntu 22.04 ou
Ubuntu 20.04** ; **un accès Internet et un compte NVIDIA Developer Program gratuit** ; un **câble USB**
pour le port USB-C du kit, plus « un cavalier ou un trombone métallique » ; et un écran ou un câble série USB-TTL
pour le kit.

> **Remarque de Juxi :** les sources de NVIDIA divergent ici. La page d'installation du kit indique Ubuntu 22.04 ou 20.04 ;
> les notes de version L4T r39.2.1 indiquent « Ubuntu 24.04 et 22.04 » comme distribution hôte pour
> le flashage. Vérifiez les exigences de NVIDIA pour SDK Manager avant de préparer un PC hôte.

**Installez SDK Manager sur l'hôte.** La page d'installation de NVIDIA donne les commandes exactes pour Ubuntu
22.04 et 20.04 ; lancez-le avec `sdkmanager`, puis connectez-vous avec vos identifiants NVIDIA Developer
(une fenêtre de navigateur s'ouvre ; une authentification à deux facteurs peut apparaître).

**Flashez le BSP** (résumé ; suivez les instructions à l'écran). SDK Manager flashe via USB, mettez donc
d'abord le kit en mode Force Recovery (voir ci-dessous) :

1. Sélectionnez **Jetson Orin Nano [8GB developer kit version]** et cliquez sur **OK** ; désélectionnez **Host
   Machine** pour que seule la cible Jetson reste sélectionnée ; cliquez sur **Continue** ; ne gardez que **Jetson
   Linux** sélectionné à l'étape suivante ; acceptez la licence et saisissez le mot de passe sudo de l'hôte.
2. À l'invite de flashage (SDK Manager télécharge d'abord les paquets) : sélectionnez **Runtime for OEM
   Configuration** ; sélectionnez **NVMe** ou **SD Card** comme stockage ; cliquez sur **Flash**.
3. Une fois le flashage terminé, retirez le cavalier du connecteur J14, effectuez un cycle d'alimentation du kit et
   terminez la configuration initiale d'Ubuntu (oem-config).

> **Remarque de Juxi — le SKU du module :** ce kit contient le module **P3767-0005**, que NVIDIA
> documente comme « Jetson Orin Nano 8GB (P3767-0005, for development only) ». Le module Orin Nano 8GB
> commercial est le **P3767-0003** — un SKU distinct, qui ne fait pas partie de ce kit. Utilisez l'entrée cible
> nommée par NVIDIA pour ce kit : **Jetson Orin Nano [8GB developer kit version]**.

## Option 3 — Script de flashage Linux_for_Tegra

Pour les utilisateurs avancés et les développeurs de produits : flashage en ligne de commande avec le Driver
Package de Jetson Linux. D'après la page d'installation de NVIDIA : téléchargez le Driver Package et le système de fichiers racine d'exemple
pour votre version de JetPack ; extrayez le Driver Package sur un hôte Ubuntu x86_64 ; extrayez le
système de fichiers racine d'exemple dans `Linux_for_Tegra/rootfs` et exécutez `apply_binaries.sh` depuis
`Linux_for_Tegra` ; mettez le kit en mode Force Recovery (ci-dessous) ; puis exécutez la commande de flashage
appropriée pour la cible Jetson Orin Nano Developer Kit. Les noms de cibles et les commandes détaillées figurent dans
le Guide du développeur Jetson Linux.

- Les noms de cibles du kit sont `jetson-orin-nano-devkit` et `jetson-orin-nano-devkit-super` ;
  NVIDIA note que la configuration Super dispose d'« un budget de puissance plus élevé et de paliers de fréquence
  étendus ».
- L'exemple du Guide du développeur pour ce kit — NVMe avec la configuration Super :
  `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`
  (l'option `--erase-all` efface les données du stockage cible).
- D'après les notes de version L4T r39.2.1 : hôte de flashage — Ubuntu 24.04 / 22.04 ; chaîne d'outils —
  GCC 13.2 ; tag source — `jetson_39.2.1_GA`. D'après la page de téléchargement de JetPack : paquet BSP —
  `Jetson_Linux_R39.2.1_aarch64.tbz2`.

## Choisir le stockage cible : microSD ou SSD NVMe

L'installateur ne propose que le stockage **déjà connecté** au moment où il démarre. Décidez d'abord,
installez le stockage, puis lancez l'installateur.

| | Carte microSD | SSD NVMe |
|---|---|---|
| Spécification | 64 GB UHS-1 ou plus, recommandé | Un disque PCIe NVMe dans un logement M.2 Key-M |
| Où il se branche | Logement sur la **face inférieure du module** | Logement M.2 Key-M 2280 (PCIe 3.0 x4) ou 2230 (PCIe 3.0 x2) |
| Pourquoi le choisir | Le stockage par défaut du module ; l'option la plus simple et la moins coûteuse | Plus de capacité et de meilleures performances de stockage ; recommandé pour les modèles d'IA, les conteneurs, les jeux de données et les fichiers de projet |

**La microSD reste une cible d'installation valide.** JetPack 7.2 a supprimé le *fichier image* pour carte SD — pas
la *cible* microSD : avec la méthode ISO, démarrez la clé d'installation avec la carte insérée et
sélectionnez-la (SDK Manager peut aussi flasher une carte microSD depuis l'hôte). Le logement microSD se trouve sur
la **face inférieure du module**. Toutes les méthodes d'installation **effacent le stockage cible sélectionné**, ne
sélectionnez donc pas un disque contenant des données dont vous avez besoin. Si l'installateur ne propose pas votre disque NVMe, voir
**[Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting)** ; pour des conseils d'achat, voir la
**[FAQ](/fr/tutorials/jetson-orin-nano/faq)**.

## Kits plus anciens : le parcours de mise à jour JetPack 6.x

**Quand il est nécessaire :** JetPack 7.2 et versions ultérieures exigent un micrologiciel UEFI/QSPI de génération JetPack 6.x.
La règle de NVIDIA : micrologiciel **36.x ou plus récent** — le kit est prêt ; **plus ancien que 36.0** — terminez
d'abord ce parcours (vérifiez la version au menu UEFI ; étapes dans [Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start)). Deux
voies officielles : la **procédure par image-pont microSD** (ci-dessous) nécessite une carte microSD mais aucun PC hôte Ubuntu ;
**SDK Manager** (option 2) nécessite un PC hôte Ubuntu et est l'alternative nommée par NVIDIA pour la
mise à jour du micrologiciel/du QSPI.

La procédure par image-pont, dans l'ordre documenté par NVIDIA :

1. Écrivez l'**image-pont JetPack 5.1.3** (`JP513-orin-nano-sd-card-image_b29.zip` — utilisez l'image
   mise à jour) sur une carte microSD, démarrez le kit depuis celle-ci, terminez la configuration initiale d'Ubuntu,
   et connectez le kit à Internet.
2. Un service en arrière-plan planifie alors une mise à jour du bootloader (une notification de bureau peut apparaître).
   Confirmez avec `sudo systemctl status nv-l4t-bootloader-config` — « Une exécution de planification terminée
   montre le service inactif avec un code de sortie réussi. »

   ![Notification de mise à jour du bootloader sur le bureau Jetson Linux](/images/jetson-orin-nano/nvidia-l4t-bootloader-post-install-notification.png)

3. Redémarrez ; la mise à jour du micrologiciel s'exécute pendant le démarrage. Vérifiez l'état ensuite avec
   `sudo nvbootctrl dump-slots-info` — la sortie d'exemple de NVIDIA à ce stade est « Current
   version: 35.5.0 ».

   ![Progression de la mise à jour du micrologiciel depuis le micrologiciel JetPack 6.x](/images/jetson-orin-nano/fw-update_from_36-4.3.jpg)

4. Installez le programme de mise à jour QSPI : `sudo apt update`, puis
   `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater` ; redémarrez et laissez la mise à jour
   se terminer.
5. Le micrologiciel est maintenant prêt pour la génération JetPack 6.x, et la carte 5.1.3 n'est plus le
   support de démarrage cible. Éteignez le kit, puis lancez l'installation de JetPack 7.2.1 depuis la clé USB d'installation (voir
   [Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start)).

Remarques complémentaires : passer par JetPack 6.2.x peut planifier **une nouvelle** mise à jour du micrologiciel UEFI
après son premier démarrage — redémarrez à nouveau lorsque vous y êtes invité. D'après les notes de version r39.2.1 (problème connu
6379600), la mise à jour de capsule pendant une installation ISO ne prend pas en charge les unités de la
version **BSP 36.2 / JetPack 5.0 DP** — mettez d'abord ces unités à jour vers une version ultérieure.

## Mode Force Recovery — comment y entrer

Le mode Force Recovery (RCM) est l'état dont un PC hôte a besoin pour flasher. NVIDIA documente trois
façons :

1. **Depuis un terminal sur un système en cours d'exécution :** `sudo reboot --force forced-recovery`.
2. **Kit éteint :** reliez les broches 9 et 10 du connecteur des boutons (la page d'installation l'appelle
   le connecteur J14), puis branchez l'alimentation DC pour mettre sous tension.
3. **Kit déjà sous tension :** reliez les broches 9 et 10, puis reliez temporairement les broches 7 et 8 pour
   réinitialiser le système.

Après être entré en RCM, retirez le(s) cavalier(s) une fois que l'hôte a détecté le périphérique. Le **port USB-C**
porte la connexion de flashage (il fonctionne en mode USB Recovery), et sur l'hôte, `lsusb`
doit afficher un périphérique USB NVIDIA avant de lancer le flashage.

## Réinstallation et mise à niveau

**Mettez à jour les composants JetPack sur le kit en fonctionnement** avec `sudo apt update`, puis
`sudo apt install nvidia-jetpack` — voir [Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start).

**Réinstallez le BSP (JetPack identique ou plus récent).** Relancez l'une des trois méthodes ; la méthode ISO
est l'option sur l'appareil. La mise en garde de NVIDIA pour les réinstallations ISO : « Si vous réinstallez JetPack
7.2.1 avec l'ISO sur un système déjà installé, suivez attentivement les instructions du guide de démarrage. » Une
réinstallation **efface le stockage cible** (sauvegardez d'abord), et si l'invite
de capsule QSPI apparaît, appuyez sur `Y` dans les 30 secondes. Retirez la clé USB d'installation une fois terminé, pour
que le kit démarre le nouveau système.

**Le Super Mode après une réinstallation.** L'ISO 7.2.1 « flashe le kit de développement Jetson Orin Nano
avec la configuration de flashage Super Mode par défaut ». Sur la version 7.2 précédente, un kit mis à jour par ISO
conservait son profil précédent et pouvait se retrouver sans les modes 25W / MAXN SUPER
(problème connu 6279443 de la r39.2 ; la consigne de NVIDIA était de flasher depuis un hôte Linux ou avec SDK Manager). NVIDIA n'a pas
documenté si la réexécution de l'ISO 7.2.1 convertit une installation non-Super existante en Super. Si
votre kit n'a pas les modes 25W / MAXN SUPER, voir
**[Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting)**.

**Passer d'une version majeure de JetPack à une autre.** Pour la liste des changements et les notes de retour arrière
entre JetPack 6.x et 7.2.1, voir **[JetPack 6.x → 7.2.1](/fr/tutorials/jetson-orin-nano/jetpack-6-to-7)**. Après toute installation ou
mise à jour, vérifiez le résultat : **[Vérifier votre système](/fr/tutorials/jetson-orin-nano/verify-your-system)**.

## Sources

- [Installation du BSP — Guide de l'utilisateur du kit de développement Jetson Orin Nano](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html) (vérifié le 2026-09-26)
- [Démarrage rapide — même guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (vérifié le 2026-09-26)
- [Parcours de mise à jour JetPack 6.x — même guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (vérifié le 2026-09-26)
- [How-To — même guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (vérifié le 2026-09-26)
- [Notes de version Jetson Linux 39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (vérifié le 2026-09-26)
- [Guide du développeur Jetson Linux (r39.2.1) — Démarrage rapide](https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html) (vérifié le 2026-09-26)
- [Téléchargements JetPack](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-26)
- [SDK Manager — instructions d'installation avec écran connecté](https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html) (vérifié le 2026-09-26)

*Statut : brouillon, en attente de révision par cheny. Fondé sur la documentation officielle NVIDIA aux dates
indiquées ; pas encore vérifié sur matériel physique par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est publiée par Juxi
Technology et n'est pas une publication de NVIDIA.
