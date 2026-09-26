---
title: Migration de JetPack 6.x vers JetPack 7.2.1
sidebar_label: Migrer depuis JetPack 6.x
slug: /migration/jetpack-6-to-7
description: >-
  Ce qui change entre JetPack 6.x et JetPack 7.2.1 sur le NVIDIA Jetson Orin
  Nano Super Developer Kit (8GB) : le prérequis de micrologiciel, le piège du
  mode Super, la liste de contrôle de migration et le retour arrière.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-sdk-623
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Migration de JetPack 6.x vers JetPack 7.2.1

Cette page s'adresse aux propriétaires d'un kit de développement Jetson Orin
Nano (Super) qui passent de JetPack 6.x à JetPack 7.2.1. Nouveaux kits :
commencez plutôt par [Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start).

JetPack 7.2.1 est un grand saut : prévoyez un reflashage complet, un prérequis
de micrologiciel et quelques reconstructions logicielles.

## Ce qui change

| Couche | Période JetPack 6.x | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (JetPack 6.2.3 = 36.5.2) | **39.2.1** |
| Système d'exploitation / système de fichiers racine | Ubuntu 22.04 | **Ubuntu 24.04** |
| Noyau Linux | 5.15 | **6.8** |
| CUDA | 12.6 (JetPack 6.2.3 = 12.6.10) | **13.2.2** |
| TensorRT | 10.3.0 | **10.16.2** |
| cuDNN | 9.3.0 | **9.20.0** |
| VPI | 3.2 | **4.1.4** |

> **Remarque de Juxi :** la colonne 6.x utilise JetPack 6.2.3, la dernière version
> de production de JetPack 6. Vérifiez vos propres versions avec
> `cat /etc/nv_tegra_release`.
> La valeur VPI de la 7.2.1 provient du dépôt de paquets de NVIDIA plutôt que de sa page
> de téléchargement, qui affiche encore la valeur de JetPack 7.2 — voir la remarque sur
> [Vérifier votre système](/fr/tutorials/jetson-orin-nano/verify-your-system).

- **Fini les images de carte SD.** « À partir de JetPack 7.2, les images de
  carte SD ne sont plus prises en charge. » L'installateur est une seule ISO
  pour clé USB ; une carte microSD reste une cible d'installation valide.
- **Un prérequis de micrologiciel.** Les installations JetPack 7.2 et
  ultérieures exigent un micrologiciel UEFI/QSPI Jetson de génération
  JetPack 6.x ; les kits avec un micrologiciel d'usine plus ancien doivent
  d'abord terminer le parcours de mise à jour JetPack 6.x. JetPack 7.0 et 7.1
  ne listent aucun matériel Orin ; 7.2 est donc la première version 7.x pour
  la famille.
- **Un flux d'installation différent.** L'ISO installe depuis une clé USB
  vers la microSD ou le NVMe de l'appareil. Elle sert uniquement à installer,
  ce n'est pas un « live USB ».

## Ne mettez pas encore à jour si...

- **Votre robot dépend d'Isaac ROS.** La matrice des composants 7.2.1 liste
  Isaac ROS comme « bientôt disponible », mais le personnel NVIDIA indique
  qu'Isaac ROS 4.6 prend en charge JetPack 7.2 — les sources se contredisent.
  Voir [Robotique](/fr/tutorials/jetson-orin-nano/robotics).
- **Votre code caméra est lié à l'ancienne API SIPL.** L'API SIPL v2.0.0 de
  Jetson Linux 39.2.1 apporte des « changements incompatibles qui touchent
  l'API, l'ABI, le schéma JSON, la disposition des paquets et le chargement
  des pilotes ». Un rapport de la
  communauté (non confirmé par NVIDIA) indique que la configuration caméra
  NITO est désormais celle par défaut et que l'ancien mode
  `NVCAMERA_NITO_PATH=CONFIG` ne fonctionne plus.
- **Vous ne pouvez pas revalider votre pile.** Les wheels CUDA 13, les
  paquets Python et les bibliothèques tierces doivent exister pour
  Ubuntu 24.04 et CUDA 13.2. Les pages 7.2.1 de NVIDIA ne listent aucune
  version de Python ou d'OpenCV ; pour les wheels CUDA 13.2, le personnel
  NVIDIA renvoie à l'index SBSA de Jetson AI Lab — voir
  [LLM locaux](/fr/tutorials/jetson-orin-nano/local-llm).

## Ce qui ne peut pas être conservé — prévoir une reconstruction

- **Moteurs TensorRT.** TensorRT passe de 10.3.0 à 10.16.2. Les moteurs
  sérialisés sont liés à la version de TensorRT. Reconstruisez sur la cible.
- **Binaires CUDA.** CUDA passe de 12.6 à 13.2.2, un saut majeur. Ne comptez
  pas sur la compatibilité des binaires CUDA 12.x ; reconstruisez avec la
  nouvelle boîte à outils.
- **Modules noyau hors arbre (out-of-tree).** Le noyau passe de 5.15 à 6.8.
  Reconstruisez les modules avec les nouveaux en-têtes du noyau.
- **Pilotes caméra et device tree.** Les changements d'API et d'ABI de
  SIPL 2.0 s'appliquent (voir ci-dessus).
- **Conteneurs.** Les images construites pour JetPack 6 / L4T r36 restent sur
  l'ancienne pile ; l'ISO embarque NVIDIA Container Toolkit 1.19. Le
  personnel NVIDIA indique qu'Orin Nano peut désormais exécuter les
  conteneurs Arm64 « arm64-SBSA » courants.
- **Environnements Python.** Ubuntu 24.04 utilise un Python plus récent que
  22.04. Recréez les environnements virtuels ; vérifiez avec
  `python3 --version`.

## Liste de contrôle de la migration

1. **Sauvegardez d'abord.** L'installation efface le stockage cible que vous
   sélectionnez. Copiez hors du kit : les données applicatives, les fichiers
   de configuration, l'étalonnage des caméras, les volumes de conteneurs, les
   scripts de compilation TensorRT et les modèles ONNX, ainsi que les sources
   personnalisées de pilotes ou de device tree. Notez les versions avec
   `cat /etc/nv_tegra_release` et `apt list --installed | grep nvidia-jetpack`.
2. **Passez la barrière du micrologiciel.** Allumez le kit, appuyez
   sur Esc à plusieurs reprises à l'écran de démarrage NVIDIA et lisez la version
   du micrologiciel dans le menu UEFI. Un micrologiciel 36.x ou plus récent
   est prêt pour 7.2.1. S'il est antérieur à 36.0, suivez d'abord le
   « JetPack 6.x Update Path » : démarrez l'image de carte SD JetPack 5.1.3
   mise à jour (`JP513-orin-nano-sd-card-image_b29.zip`) comme pont,
   laissez-la planifier la mise à jour du bootloader, redémarrez, installez
   le programme de mise à jour QSPI
   (`sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`), redémarrez
   encore. Attendez-vous à plusieurs redémarrages ; JetPack 6.2.x peut
   planifier une mise à jour supplémentaire après le premier démarrage. Les
   unités en BSP 36.2 / JetPack 5.0 DP doivent d'abord passer à une version
   ultérieure. Vérifiez la planification avec
   `sudo systemctl status nv-l4t-bootloader-config`, et le micrologiciel avec
   `sudo nvbootctrl dump-slots-info`.
3. **Créez la clé USB d'installation.** Écrivez la Jetson ISO r39.2.1 sur une
   clé USB (16 GB ou plus) avec Balena Etcher. N'écrivez pas l'ISO sur une
   carte microSD. Installez le stockage cible (microSD ou NVMe) avant de
   démarrer — l'installateur ne propose que les périphériques installés.
4. **Installez JetPack 7.2.1.** Démarrez via le gestionnaire de démarrage
   UEFI : appuyez sur Esc à l'écran de démarrage, sélectionnez Boot Manager,
   choisissez le disque USB (NVIDIA recommande cette sélection explicite).

   > **Important** — Appuyez sur **Y** à l'invite de mise à jour de capsule
   > QSPI dans les 30 secondes (« l'étape la plus souvent manquée »). Si elle
   > expire, l'installation échoue plus tard. La mise à jour de capsule se
   > déroule en deux passes et peut redémarrer le kit — c'est normal.

   Dans le menu GRUB, sélectionnez Install Jetson ISO r39.2.1, choisissez le
   stockage cible et confirmez (l'installation efface le stockage que vous
   sélectionnez). Retirez la clé USB après l'installation lorsque vous y
   êtes invité, puis terminez la configuration initiale d'Ubuntu (licence,
   langue, réseau, utilisateur) et exécutez `sudo apt update` puis
   `sudo apt install nvidia-jetpack`.
5. **Confirmez le profil Super.** `sudo /usr/sbin/nvpmodel -q` liste les
   modes d'alimentation ; sur le bureau, utilisez la barre supérieure :
   Power Mode, MAXN SUPER. Avec le Super Mode activé,
   `cat /etc/nv_boot_control.conf` affiche un suffixe `-super` dans la ligne
   TNSPEC. S'ils manquent, lisez la section suivante.
6. **Revalidez vos charges de travail.** Reconstruisez les moteurs TensorRT
   et les applications CUDA sur la cible. Recréez les environnements Python,
   mettez à jour les conteneurs, retestez les caméras. Exécutez les
   vérifications de
   [Vérifier votre système](/fr/tutorials/jetson-orin-nano/verify-your-system) — pour
   r39.2.1, `cat /etc/nv_tegra_release` doit afficher R39, révision 2.1.

## Le piège du mode Super (corrigé dans 7.2.1)

Sur une installation ISO 7.2.0, l'unité conservait sa configuration de carte
existante : les modes d'alimentation 25W et MAXN SUPER manquaient, et
`sudo nvpmodel -m 2` échouait avec « bad power mode 2 ». NVIDIA l'a documenté
dans les notes de version r39.2 sous le problème 6279443 : « Les unités ne
basculeront pas par défaut en mode “Super” après la mise à jour. Pour utiliser
le mode “Super”, vous devez flasher la cible depuis un hôte Linux ou avec
SDKM. » Le personnel NVIDIA a ensuite qualifié cela de bug de l'ISO, corrigé
dans 7.2.1.

JetPack 7.2.1 flashe la configuration Super par défaut : « L'ISO flashe
désormais le Jetson Orin Nano Developer Kit avec la configuration de flashage
Super Mode par défaut. » Le problème 6279443 ne figure pas dans la liste des
problèmes connus de r39.2.1.

Deux réserves subsistent :

- **Sélectionnez la bonne cible lors du flashage depuis un hôte.** Dans
  SDK Manager, la cible est « Jetson Orin Nano [8GB developer kit version] ».
  Avec le script de flashage, utilisez la cible
  `jetson-orin-nano-devkit-super`, et non la cible simple, pour activer les
  modes Super. Exemple (Developer Guide, NVMe) :
  `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`.
- **Réinstaller 7.2.1 par-dessus un système existant.** NVIDIA : « Si vous
  réinstallez JetPack 7.2.1 par ISO sur un système déjà installé, veuillez
  suivre attentivement les instructions du Getting Started Guide. » NVIDIA
  ne précise pas si une réinstallation 7.2.1 restaure le mode Super sur une
  unité qu'une ISO 7.2.0 a laissée en non-Super ; la voie documentée est un
  flashage depuis un hôte avec la configuration Super. Les correctifs
  communautaires sur place (modification de `/etc/nv_boot_control.conf`) ne
  sont pas approuvés par NVIDIA ; un utilisateur a signalé une boucle de
  démarrage. Voir [Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting).

## Retour arrière

Le personnel NVIDIA déclare : « Rétrogradation : oui, vous pouvez reflasher
vers JP 6.2.2 via SDK Manager si nécessaire. » Un utilisateur a confirmé
l'aller-retour (reflash vers 6.2.2, puis remise à niveau vers 7.2). Le coût,
dit franchement :

- **Pas de rétrogradation sur place.** C'est un reflashage complet depuis un
  hôte Ubuntu x86 (les pages officielles listent des hôtes Ubuntu ; le
  personnel NVIDIA rapporte aussi que le SDK Manager Windows fonctionne).
- **Le stockage cible est effacé.** Votre sauvegarde en est la seule copie.
- **Rien d'autre n'est garanti.** NVIDIA ne publie aucune procédure de
  rétrogradation, et aucun document n'affirme que les supports de démarrage
  JetPack 6.x sont garantis de fonctionner avec le micrologiciel QSPI
  r39.2.x. Considérez une rétrogradation comme une réinstallation de
  l'ancienne pile, avec le même travail de reconstruction.

Si seuls les modes d'alimentation Super manquent, la correction la plus ciblée
est un reflashage depuis un hôte avec la configuration Super — cela conserve
7.x. Voir
[Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates).

## Sources

- [JetPack SDK Downloads — JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) — matrice des composants, suppression des cartes SD, mode Super par défaut, mise en garde sur la réinstallation (vérifié le 2026-09-26)
- [Jetson Orin Nano Developer Kit — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) — flux d'installation par ISO, barrière du micrologiciel, invite de capsule, MAXN SUPER (vérifié le 2026-09-26)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) — pont de micrologiciel, vérifications de version (vérifié le 2026-09-26)
- [Notes de version Jetson Linux 39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — statut GA, changements incompatibles de SIPL 2.0 (vérifié le 2026-09-26)
- [Notes de version Jetson Linux 39.2 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — problème 6279443, le piège du mode Super (vérifié le 2026-09-26)
- [JetPack 6.2.3](https://developer.nvidia.com/embedded/jetpack-sdk-623) — versions de référence de JetPack 6.x (vérifié le 2026-09-26)
- [Forum des développeurs NVIDIA — problème d'accélération GPU sous JetPack 7.2](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) — personnel NVIDIA : voie de rétrogradation et index de wheels CUDA 13.2 (vérifié le 2026-09-26)
- [Forum des développeurs NVIDIA — 25W et MAXN SUPER absents sous JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) — personnel NVIDIA et utilisateurs : vérification TNSPEC `-super`, reflashage depuis un hôte (vérifié le 2026-09-26)

*Statut : brouillon, en attente de relecture par cheny. Fondé sur la
documentation officielle NVIDIA et les déclarations du forum des développeurs
à la date indiquée ; pas encore vérifié sur matériel physique par Juxi
Technology. La liste de reconstruction décrit des conséquences standard de la
plateforme — validez-la par rapport à votre propre pile.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
