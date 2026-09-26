---
title: Démarrage rapide — du déballage à un système JetPack 7.2.1 fonctionnel
sidebar_label: Démarrage rapide
slug: /getting-started/quick-start
description: >-
  Première configuration du kit de développement NVIDIA Jetson Orin Nano Super
  (8GB) : vérification du micrologiciel, écriture de l'ISO Jetson 7.2.1 sur une
  clé USB et installation de JetPack 7.2.1 (L4T r39.2.1) sur une carte microSD
  ou un SSD NVMe.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# Démarrage rapide

Cette page vous accompagne de la boîte de votre kit de développement NVIDIA
Jetson Orin Nano Super (8 GB) jusqu'à un système **JetPack 7.2.1** fonctionnel
(Jetson Linux / L4T r39.2.1). Elle suit le parcours de première configuration
recommandé par NVIDIA : la méthode **Jetson ISO**, installée depuis une clé USB.
Aucun PC hôte Ubuntu n'est nécessaire.

**Le parcours en trois phases :**

1. **Passez le prérequis du micrologiciel.** Un micrologiciel d'usine plus ancien doit être mis à jour avant de pouvoir installer JetPack 7.2 (étape 1).
2. **Créez la clé USB d'installation.** Téléchargez l'ISO Jetson et écrivez-la sur une clé USB avec Balena Etcher (étapes 2–3).
3. **Installez et configurez.** Installez sur une carte microSD ou un SSD NVMe, terminez la configuration initiale d'Ubuntu, puis ajoutez les composants JetPack (étapes 4–7).

> **Important :**
> À partir de JetPack 7.2, NVIDIA ne publie plus d'images pour carte microSD
> pour ce kit. Il n'y a **aucune image de carte SD à flasher**. Le support
> d'installation est une clé USB. La carte microSD (ou le SSD NVMe) n'est que
> la **cible d'installation**. Les tutoriels plus anciens qui commencent par
> « écrire l'image sur une carte microSD » ne s'appliquent plus.

## Contenu de la boîte

- Le module Jetson Orin Nano 8 GB avec dissipateur thermique, monté sur la carte porteuse de référence
- Un bloc d'alimentation 19 V
- Un contrôleur d'interface réseau sans fil 802.11ac/ab/gn (installé dans le logement M.2 Key-E)
- Une carte de démarrage rapide et d'assistance

**Aucun support de stockage n'est inclus.** La boîte ne contient ni carte microSD ni SSD NVMe, et le module n'a pas de stockage eMMC intégré. Tout le stockage provient de la carte ou du disque que vous installez.

## Ce que vous devez fournir

- **Stockage — l'un des éléments suivants :**
  - Une **carte microSD de 64 GB UHS-1 ou plus** (recommandé). Elle s'insère dans le logement sur la **face inférieure du module**. Insérez-la avant de démarrer l'installateur.
  - Un **SSD NVMe** pour l'un des logements M.2 Key-M de la carte porteuse. Facultatif, mais recommandé pour plus de capacité et de meilleures performances de stockage.
- Une **clé USB de 16 GB ou plus** — elle deviendra la clé d'installation.
- Un **ordinateur portable ou de bureau** (Windows, Mac ou Linux) avec au moins **25 GB d'espace libre** — pour télécharger l'ISO et écrire la clé USB.
- Un **écran DisplayPort**, plus un clavier et une souris USB. Le DisplayPort est la seule sortie d'affichage de ce kit ; la sortie HDMI et le DisplayPort via USB-C ne sont pas pris en charge. Un adaptateur actif DisplayPort vers HDMI fonctionne avec un écran HDMI.
- Sans écran : un **câble série USB-TTL** pour une console série sans écran (voir l'étape 1).

![Carte microSD](/images/jetson-orin-nano/microsd_64gb.png)
*Option de stockage cible 1 : une carte microSD 64 GB UHS-1.*

![SSD NVMe](/images/jetson-orin-nano/ssd_nvme_1tb.png)
*Option de stockage cible 2 : un SSD NVMe dans le logement M.2 Key-M.*

> **Remarque de Juxi :** le pack de la boutique Juxi pour ce kit comprend en plus
> une carte microSD de 64 GB et un module Wi-Fi M.2. La carte est livrée
> **sans image préinstallée** (vierge) : suivez donc la procédure ISO de cette
> page pour y installer le système.

## Étape 1 — Vérifier le prérequis du micrologiciel

Les installations de JetPack 7.2 et versions ultérieures **exigent un micrologiciel UEFI/QSPI de génération JetPack 6.x** sur le kit de développement. Si votre kit a encore un micrologiciel d'usine plus ancien, terminez d'abord le **parcours de mise à jour JetPack 6.x**.

Avec un écran connecté :

1. Connectez l'écran DisplayPort et un clavier USB. Branchez le bloc d'alimentation 19 V — le kit s'allume automatiquement et une LED verte à côté du connecteur USB-C s'allume.
2. **Appuyez sur `Esc` à plusieurs reprises dès que l'écran de démarrage NVIDIA apparaît.** Cela ouvre le menu de configuration UEFI.
3. Vérifiez la ligne de **version du micrologiciel** près du haut de l'écran :

| Version du micrologiciel | Que faire |
|---|---|
| 36.x ou plus récent | Passez à l'étape 2 |
| Plus ancien que 36.0 | Terminez d'abord le parcours de mise à jour JetPack 6.x (voir ci-dessous) |

![Menu UEFI affichant la version du micrologiciel](/images/jetson-orin-nano/firmware-version-check.png)
*La version du micrologiciel est affichée près du haut du menu de configuration UEFI.*

En mode sans écran : connectez un câble série USB-TTL au connecteur des boutons (fil TX de l'adaptateur vers la broche 3 / RXD, fil RX de l'adaptateur vers la broche 4 / TXD, fil de masse de l'adaptateur vers la broche 7 / GND), ouvrez une console série sur votre PC et appuyez sur `Esc` dans la console pendant l'affichage des options de pré-démarrage.

![Câble série USB-TTL sur le connecteur des boutons](/images/jetson-orin-nano/jon_adafruit_uart_cable.jpg)
*Voie sans écran : un câble série USB-TTL connecté au connecteur des boutons.*

### Si le micrologiciel est trop ancien

Le **parcours de mise à jour JetPack 6.x** fait avancer le micrologiciel. En bref (étapes complètes dans [Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates)) :

1. Démarrez l'**image-pont JetPack 5.1.3** (nom de fichier `JP513-orin-nano-sd-card-image_b29.zip`) depuis une carte microSD.
2. Un service en arrière-plan planifie une mise à jour du bootloader (vérifiez avec `sudo systemctl status nv-l4t-bootloader-config`).
3. Redémarrez. La mise à jour du micrologiciel s'exécute pendant ce démarrage (vérifiez avec `sudo nvbootctrl dump-slots-info`).
4. Installez le programme de mise à jour QSPI : `sudo apt update`, puis `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`, puis redémarrez.
5. Éteignez le kit, retirez la carte-pont, insérez votre stockage cible et passez à l'étape 2.

Ce parcours nécessite une carte microSD et un lecteur de cartes. Sans cela, SDK Manager sur un hôte Ubuntu est l'alternative (voir [Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates)). Un cas supplémentaire : si le micrologiciel provient du BSP 36.2 (JetPack 5.0 DP), la mise à jour de capsule dans l'installateur ne le prend pas en charge — amenez d'abord le kit à une version ultérieure avant de lancer l'installation par l'ISO JetPack 7.2.1.

Si vous démarrez quand même l'installateur et que l'écran reste noir ou tombe sur un shell UEFI, le micrologiciel est probablement trop ancien. Ne réessayez pas le démarrage en boucle. Éteignez le kit, terminez le parcours de mise à jour, puis réessayez.

![Shell interactif UEFI](/images/jetson-orin-nano/uefi_interactive_shell.png)
*Un shell UEFI (ou un écran noir) au lieu de l'installateur signifie généralement que le micrologiciel est trop ancien pour la version de JetPack visée.*

## Étape 2 — Télécharger l'ISO Jetson

Téléchargez l'ISO d'installation de JetPack 7.2.1 (libellé : **Jetson ISO (r39.2.1)**) depuis la
[page de téléchargement de JetPack](https://developer.nvidia.com/embedded/jetpack/downloads), ou utilisez ce lien direct :

<https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso>

Les noms de fichiers ISO suivent le modèle `jetsoninstaller-r<L4T version>-<timestamp>-arm64.iso` (pour cette version : `jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso`). Les pages de téléchargement de NVIDIA n'indiquent ni la taille ni les sommes de contrôle de l'ISO.

## Étape 3 — Écrire l'ISO sur une clé USB

1. Installez **Balena Etcher** depuis <https://etcher.balena.io/#download-etcher> (Windows, Mac ou Linux).
2. Insérez la clé USB dans votre PC.
3. Dans Etcher, sélectionnez le fichier ISO, sélectionnez la clé USB, puis lancez l'écriture.

![Écriture de l'ISO Jetson sur une clé USB avec Balena Etcher](/images/jetson-orin-nano/jetson-iso_etcher-flash-start.gif)
*Écriture de l'ISO Jetson sur la clé USB avec Balena Etcher.*

> **Attention :**
> **N'écrivez pas l'ISO sur une carte microSD.** À partir de JetPack 7.2,
> les images pour carte SD ne sont plus prises en charge. Écrivez l'ISO sur
> une clé USB, puis utilisez-la pour installer Jetson Linux sur votre carte
> microSD ou votre SSD NVMe.

Copier le fichier ISO sur la clé avec un gestionnaire de fichiers ne fonctionne pas — il doit être écrit en tant qu'image disque. La clé ainsi créée n'est qu'un support d'installation ; elle ne peut pas démarrer sur un bureau utilisable.

## Étape 4 — Démarrer l'installateur et installer

1. Éteignez le kit, puis installez le **stockage cible** :
   - carte microSD : insérez-la dans le logement sur la **face inférieure du module**.
   - SSD NVMe : installez-le dans le logement M.2 Key-M de la carte porteuse.
   Installez le stockage cible avant de démarrer l'installateur.
2. Insérez la clé USB d'installation. Connectez l'écran, le clavier et la souris, puis branchez le bloc d'alimentation. Branchez la clé d'installation **directement** sur le kit, pas via un concentrateur : NVIDIA documente un concentrateur USB 3.0 (modèle UH400) qui casse l'installation ISO, et un adaptateur USB vers Ethernet (TRENDnet TU2-ET100) qui peut faire échouer le flashage. Voir **[Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting)**.
3. **Appuyez sur `Esc` lorsque l'écran de démarrage au logo NVIDIA apparaît.** Sélectionnez **Boot Manager**, sélectionnez votre disque USB et appuyez sur Entrée pour démarrer depuis celui-ci. NVIDIA recommande de sélectionner explicitement le disque USB, pour être sûr que c'est le bon support d'installation qui s'exécute.
4. **Lorsque l'invite de mise à jour de capsule QSPI apparaît, appuyez sur `Y` dans les 30 secondes.** C'est l'étape la plus souvent manquée. L'invite est facile à manquer en temps réel. Si elle expire et que l'installation se poursuit sans la mise à jour, l'installation échoue plus tard — relancez l'installation et appuyez sur `Y` quand l'invite apparaît. La mise à jour de capsule s'exécute en **deux passes**, et le kit peut redémarrer entre les deux ou après. C'est normal ; attendez la fin des deux passes. Les kits dont le micrologiciel QSPI actuel est r38.2.0/r38.2.1 doivent confirmer la mise à jour du micrologiciel une seconde fois après la fin de la première passe (problème 6480645 des notes de version r39.2.1) — appuyez de nouveau sur `Y` si l'invite s'affiche.
5. Au **menu GRUB d'installation du BSP Jetson**, sélectionnez **Install Jetson ISO r39.2.1**. Sélectionnez le périphérique de stockage cible (la carte microSD ou le SSD NVMe) et confirmez. **L'installation efface le périphérique sélectionné** — vérifiez la sélection avant de confirmer.
6. Attendez la fin de l'installation. Les instructions de NVIDIA indiquent que du texte blanc défile à l'écran pendant plusieurs minutes ; redémarrez lorsque vous y êtes invité. Les rapports de la communauté sur la durée d'installation varient fortement — d'environ 15 minutes à bien plus longtemps (non confirmé, rapports de forum).
7. **Retirez la clé USB** pour que le kit démarre le nouveau système depuis le stockage cible et non à nouveau depuis la clé d'installation.

Le personnel NVIDIA sur les forums recommande également de garder un écran connecté pendant l'installation ISO.

## Étape 5 — Premier démarrage et configuration initiale d'Ubuntu

Après le redémarrage de l'installateur, le kit lance la configuration initiale d'Ubuntu (`oem-config`) :

1. Consultez et acceptez le contrat de licence utilisateur final (EULA) des logiciels NVIDIA Jetson.
2. Sélectionnez la langue du système, la disposition du clavier et le fuseau horaire.
3. Connectez-vous à un réseau.
4. Créez un nom d'utilisateur, un mot de passe et un nom d'ordinateur.
5. Connectez-vous au bureau Ubuntu.

## Étape 6 — Installer les composants JetPack

L'ISO installe le système de base (Jetson Linux). CUDA, cuDNN, TensorRT et le reste de la pile JetPack sont ajoutés après le premier démarrage. Sur le bureau du kit, ouvrez un terminal et exécutez :

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

Redémarrez après l'installation si vous y êtes invité.

Vérifiez le résultat :

```bash
cat /etc/nv_tegra_release
apt list --installed | grep nvidia-jetpack
```

`/etc/nv_tegra_release` doit indiquer une version R39 avec la révision 2.1. Voir [Vérifier votre système](/fr/tutorials/jetson-orin-nano/verify-your-system) pour la liste de contrôle complète.

## Étape 7 — Vérifier le mode d'alimentation

Le mode d'alimentation par défaut est généralement **25W**. Pour des performances maximales, cliquez sur le mode d'alimentation actuel dans la barre supérieure du bureau Ubuntu, sélectionnez **Power Mode**, puis choisissez **MAXN SUPER** ; en ligne de commande, `sudo /usr/sbin/nvpmodel -q` affiche le mode actuel. Les installations par ISO de JetPack 7.2.1 utilisent par défaut la configuration de flashage Super Mode, donc 25W et MAXN SUPER devraient être disponibles — s'ils manquent, voir [Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting).

![Sélection de MAXN SUPER dans le menu du mode d'alimentation](/images/jetson-orin-nano/jons_power-mode-to-maxn-super.png)
*Sélectionnez Power Mode → MAXN SUPER pour des performances maximales.*

## Dépannage rapide

| Symptôme | Premier point à vérifier |
|---|---|
| Le kit ne s'allume pas | L'alimentation 19 V doit être branchée sur la prise DC. Le kit s'allume automatiquement ; la LED verte à côté du connecteur USB-C doit s'allumer. |
| La clé USB d'installation ne démarre pas | Sélectionnez explicitement le disque USB dans le gestionnaire de démarrage UEFI (`Esc` à l'écran de démarrage). Vérifiez que le micrologiciel est en 36.x ou plus récent. |
| Écran noir ou shell UEFI au lieu de l'installateur | Le micrologiciel est peut-être trop ancien. Terminez d'abord le parcours de mise à jour JetPack 6.x. |
| L'installateur saute la configuration langue/réseau/nom d'utilisateur ; le premier démarrage reste bloqué sur un écran noir | L'invite de capsule QSPI a été manquée. Relancez l'installation et appuyez sur `Y` dans les 30 secondes. |
| L'installateur n'affiche pas le stockage cible | microSD : vérifiez qu'elle est bien enfoncée dans le logement sous le module. NVMe : réinstallez le disque et relancez l'installateur. |
| Seuls les modes 7W/15W sont proposés ; 25W et MAXN SUPER manquent | Voir [Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting). |

## Sources

- [Guide de l'utilisateur du kit de développement Jetson Orin Nano — Démarrage rapide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (vérifié le 2026-09-26)
- [Guide de l'utilisateur du kit de développement Jetson Orin Nano — Parcours de mise à jour JetPack 6.x](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (vérifié le 2026-09-26)
- [Guide de l'utilisateur du kit de développement Jetson Orin Nano — Configuration du SDK JetPack](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) (vérifié le 2026-09-26)
- [Guide de l'utilisateur du kit de développement Jetson Orin Nano — Disposition matérielle](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (vérifié le 2026-09-26)
- [Téléchargements du SDK JetPack](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-26)
- [Notes de version Jetson Linux 39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (vérifié le 2026-09-26)

*Statut : brouillon, en attente de révision par cheny. Fondé sur la documentation officielle NVIDIA aux dates indiquées ; pas encore vérifié sur matériel physique par Juxi Technology.*

**Crédits images :** les images de cette page proviennent du *Jetson Orin Nano Developer Kit User Guide* officiel de NVIDIA (téléchargé le 2026-09-26) et restent © NVIDIA Corporation. Elles sont reproduites ici pour illustrer le flux de configuration officiel.

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est publiée par Juxi Technology et n'est pas une publication de NVIDIA.
