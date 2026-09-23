---
title: Démarrage rapide — du déballage à un système JetPack 7.2.1 fonctionnel
sidebar_label: Démarrage rapide
slug: /getting-started/quick-start
description: >-
  Parcours pas à pas du kit de développement NVIDIA Jetson AGX Orin (64GB) :
  premier démarrage, mise à jour du BSP vers JetPack 7.2.1 (L4T r39.2.1) avec la
  méthode Jetson ISO, et installation des composants JetPack.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
review_owner: cheny
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
---

# Démarrage rapide

Cette page vous accompagne depuis le déballage de votre kit de développement Jetson
AGX Orin (64GB) jusqu'à un système **JetPack 7.2.1** entièrement à jour. Le parcours
ci-dessous suit le flux de configuration actuel recommandé par NVIDIA ; chaque étape
a été vérifiée par rapport à la documentation officielle du kit de développement de
NVIDIA à la date indiquée au bas de cette page.

**Le parcours en trois étapes :**

1. **Démarrez directement dès la sortie de la boîte** et terminez la configuration initiale d'Ubuntu (`oem-config`).
2. **Mettez à jour le BSP** vers L4T r39.2.1 (JetPack 7.2.1) avec la méthode **Jetson ISO** — une clé USB amorçable, aucun PC hôte Ubuntu requis.
3. **Installez les composants JetPack** (CUDA, cuDNN, TensorRT, ...) avec une seule commande `apt`.

> **Pourquoi une mise à jour par ISO USB plutôt que via SDK Manager ?**
> NVIDIA recommande désormais la méthode Jetson ISO pour le kit de développement :
> elle met à jour la carte directement depuis une clé USB et ne nécessite **pas**
> de machine hôte Ubuntu séparée. SDK Manager reste disponible comme alternative
> (voir l'étape 3b).

## Ce dont vous avez besoin

Dans la boîte :

- Module Jetson AGX Orin et carte porteuse de référence
- Module Wi-Fi
- Bloc d'alimentation USB Type-C
- Câble USB Type-C vers USB Type-A

Vous devez fournir :

- Un écran avec entrée DisplayPort et un câble DisplayPort, ainsi qu'un clavier et une souris USB — **ou** un second ordinateur (Windows/Mac/Linux) si vous préférez une configuration headless (sans écran)
- Une connexion Internet (câble Ethernet, ou Wi-Fi configuré pendant l'installation)
- Une clé USB d'une capacité suffisante pour l'image ISO (vérifiez la taille indiquée sur la page de téléchargement le moment venu) — nécessaire pour la mise à jour ISO de l'étape 2
- Un PC pour écrire la clé USB d'installation (Balena Etcher fonctionne sous Windows/Mac/Linux)

## Étape 1 — Premier démarrage et configuration initiale d'Ubuntu

Votre kit de développement est livré avec une image BSP L4T pré-flashée sur eMMC et
démarre dès la sortie de la boîte sur le bureau Ubuntu. Les unités récemment
expédiées peuvent embarquer une version L4T **plus ancienne** (par exemple r35.x /
JetPack 5.x) ; l'étape 2 amène n'importe quelle unité à la version actuelle.

Avec un écran connecté :

1. Connectez un écran DisplayPort, un clavier et une souris USB, et (en option) un câble Ethernet.
2. Branchez le bloc d'alimentation fourni sur le **port USB Type-C au-dessus de la prise DC**. Le kit s'allume automatiquement — la LED blanche près du bouton d'alimentation s'allume. Sinon, appuyez sur le bouton d'alimentation.
3. Au bout d'une minute environ, l'écran Ubuntu apparaît. Le premier démarrage vous guide à travers `oem-config` : acceptation du contrat de licence utilisateur final (EULA) des logiciels NVIDIA, choix de la langue/du clavier/du fuseau horaire, création de votre compte utilisateur et configuration du réseau.
4. Une fois `oem-config` terminé, le kit redémarre sur le bureau Ubuntu.

![Bureau Ubuntu après la configuration initiale](/images/jetson-agx-orin/ubuntu_initial_desktop_1280x720.png)

Une installation headless (sans écran) est également possible depuis un autre
ordinateur — voir le guide de démarrage rapide de NVIDIA (lien en bas de page) pour
le câblage exact.

> **Astuce Juxi :** si vous prévoyez d'utiliser le système depuis un SSD NVMe, gardez-le
> en tête pour l'étape 2 — l'installateur ISO peut installer directement sur le
> disque NVMe.

## Étape 2 — Mettre à jour le BSP avec le Jetson ISO (recommandé)

**Prérequis :** le BSP installé doit être en **L4T r35.5 ou version ultérieure** pour
que la méthode ISO fonctionne. Vérifiez d'abord :

```bash
cat /etc/nv_tegra_release
```

Un système JetPack 7.2.1 affiche `# R39 (release), REVISION: 2.1`. Si la sortie indique
une version plus ancienne, mettez d'abord à jour vers L4T r35.5 ou une version
ultérieure (voir *Mises en garde* ci-dessous).

1. **Téléchargez l'ISO Jetson** pour JetPack 7.2.1 / L4T r39.2.1 :
   <https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso>
2. **Créez la clé USB d'installation.** Écrivez l'ISO sur une clé USB avec
   [Balena Etcher](https://etcher.balena.io) (« Flash from file » → sélectionnez l'ISO
   → sélectionnez la clé USB).
   > **Ne copiez pas** simplement le fichier ISO sur la clé avec un gestionnaire de
   > fichiers — il doit être écrit en tant qu'image disque, sinon il ne démarrera pas.
3. **Insérez la clé USB** dans le kit de développement et mettez-le sous tension. S'il
   ne démarre pas automatiquement depuis la clé USB, ouvrez le gestionnaire de démarrage
   UEFI pendant le démarrage et sélectionnez la clé USB.
4. **Démarrez et installez :**
   - Si vous êtes invité à confirmer une **mise à jour de capsule QSPI**, appuyez sur `Y`. Cette
     mise à jour du firmware s'exécute *avant* l'installation ISO et s'exécute **deux fois**. Ne
     la sautez pas — elle est requise pour la compatibilité. Si vous manquez l'invite,
     relancez l'installation et confirmez-la lorsqu'elle apparaît.
   - Dans le menu GRUB, sélectionnez **Install Jetson ISO r39.2.1** et appuyez sur Entrée.
   - Choisissez la cible de stockage avec les touches fléchées : **eMMC** (stockage interne
     par défaut) ou **NVMe** (recommandé si vous avez installé un SSD).
   - L'installation prend environ 15 minutes, avec une sortie texte qui défile à l'écran.
5. **Retirez la clé USB** une fois l'installation terminée et le système redémarré —
   sinon le kit risque de démarrer à nouveau depuis la clé au lieu du nouveau système.
6. Le système mis à jour lance son `oem-config` de premier démarrage — refaites la
   configuration Ubuntu pour créer le compte utilisateur de la nouvelle installation.

### Ce que vous verrez (dans l'ordre)

![Écriture de l'ISO sur une clé USB avec Balena Etcher](/images/jetson-agx-orin/jetson-iso_etcher-flash-start.gif)
*Écriture de l'ISO Jetson sur une clé USB avec Balena Etcher.*

![Gestionnaire de démarrage UEFI avec la clé USB sélectionnée](/images/jetson-agx-orin/jetson-iso_uefi_boot-manager-menu.png)
*Si le kit ne démarre pas automatiquement depuis la clé USB, sélectionnez-la dans le gestionnaire de démarrage UEFI.*

![Invite de confirmation de la mise à jour de capsule QSPI](/images/jetson-agx-orin/jetson-iso__qspi_update_options.png)
*L'invite de mise à jour de capsule QSPI — appuyez sur `Y`. Elle est requise pour la compatibilité et s'exécute deux fois.*

![Menu GRUB du Jetson ISO](/images/jetson-agx-orin/jetson-iso_grub-menu-r39-top.png)
*Sélectionnez « Install Jetson ISO r39.2.1 ».*

![Options de cible de stockage dans le menu GRUB](/images/jetson-agx-orin/jetson-iso_grub-menu-options.png)
*Choisissez eMMC ou NVMe comme cible d'installation.*

![Écran de progression de l'installateur](/images/jetson-agx-orin/jetson-iso_wait-for-15min.png)
*L'installateur s'exécute pendant environ 15 minutes.*

![Écran d'accueil de oem-config après la mise à jour](/images/jetson-agx-orin/oem-config_welcome.png)
*Après la mise à jour, `oem-config` s'exécute à nouveau pour configurer le nouveau système.*

### Mises en garde et problèmes connus

- **Unités plus anciennes (< L4T r35.5) :** la méthode Jetson ISO nécessite un BSP
  installé en r35.5 ou version ultérieure. Pour mettre d'abord à niveau un kit plus
  ancien, utilisez l'une des méthodes depuis un PC hôte (SDK Manager ou le script
  `flash.sh`) — voir
  [Flashage et mises à jour](/fr/tutorials/jetson-agx-orin/flashing-and-updates).
- **Invite de capsule QSPI manquée ?** Relancez l'installation ISO et appuyez sur `Y`.
- **Écran noir pendant l'installation :** certains commutateurs KVM gèrent mal la
  sortie vidéo de l'AGX Orin pendant l'installation ISO. Connectez l'écran directement
  au kit de développement et réessayez.

## Étape 3 — Installer les composants JetPack

### 3a. Via `apt` (le plus simple — aucun PC hôte nécessaire)

Sur le bureau du kit, ouvrez un terminal (`Ctrl`+`Alt`+`T`) et exécutez :

```bash
sudo apt update
sudo apt dist-upgrade
sudo reboot
sudo apt install nvidia-jetpack
```

Cela installe CUDA, cuDNN, TensorRT et le reste de la pile JetPack. Comptez
**environ une heure** selon la vitesse de connexion.

Vérifiez le résultat : `cat /etc/nv_tegra_release` doit afficher R39 / REVISION 2.1,
et la boîte à outils CUDA devient disponible (`nvcc --version`). Voir
[Vérifier votre système](/fr/tutorials/jetson-agx-orin/verify-your-system) pour la liste de vérification complète.

### 3b. Via SDK Manager (alternative)

SDK Manager installe les composants JetPack depuis un PC hôte via USB :

1. Le kit étant sous tension, connectez-le au PC hôte avec le câble USB Type-C vers
   Type-A fourni, branché sur le **port USB Type-C à côté du connecteur 40 broches**
   du kit.
2. Dans SDK Manager, choisissez la cible Jetson AGX Orin et sélectionnez **Jetson SDK
   Components** (plutôt que de reflasher « Jetson OS »), puis suivez les étapes
   affichées à l'écran (connexion USB, adresse `192.168.55.1`).

Les instructions complètes pour SDK Manager sont maintenues par NVIDIA (voir les liens
ci-dessous) et seront traitées en détail dans notre guide de flashage.

## Dépannage rapide

| Symptôme | Premier point à vérifier |
|---|---|
| Le kit ne s'allume pas | Bloc d'alimentation branché sur le port USB-C **au-dessus de la prise DC** ; appuyez sur le bouton d'alimentation |
| Aucune sortie d'affichage | Câble DisplayPort (utilisez un adaptateur actif DP→HDMI pour les écrans HDMI) ; essayez de démarrer sans la clé USB ISO insérée |
| L'installateur ISO ne démarre pas | Clé USB écrite avec Etcher (pas copiée en tant que fichier) ; sélectionnez la clé USB dans le gestionnaire de démarrage UEFI |
| L'invite QSPI est apparue | Appuyez sur `Y` — requis ; la mise à jour s'exécute deux fois |
| L'écran devient noir en pleine installation | Interférence du commutateur KVM — connectez l'écran directement |

## Sources et vérification

Cette page a été rédigée et vérifiée par Juxi Technology par rapport à la documentation
officielle de NVIDIA :

- [Guide utilisateur du kit de développement Jetson AGX Orin — Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (vérifié le 2026-09-23)
- [Guide utilisateur du kit de développement Jetson AGX Orin — Configuration du SDK JetPack](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (vérifié le 2026-09-23)
- [Installation du BSP (SDK Manager / script de flashage)](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html)

*Statut : brouillon. Les étapes n'ont pas encore été vérifiées sur du matériel physique
par Juxi Technology ; elles s'appuient sur la documentation officielle de NVIDIA aux
dates indiquées ci-dessus.*

**Crédits images :** toutes les captures d'écran de cette page proviennent du
*Jetson AGX Orin Developer Kit User Guide* officiel de NVIDIA (téléchargé le 2026-09-23)
et restent © NVIDIA Corporation. Elles sont reproduites ici pour illustrer le flux de
configuration officiel.

---

NVIDIA® et Jetson™ sont des marques commerciales de NVIDIA Corporation. Ce guide est
publié par Juxi Technology et n'est pas une publication NVIDIA.
