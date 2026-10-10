---
title: FAQ
sidebar_label: FAQ
slug: /support/faq
description: >-
  Questions fréquentes sur le kit de développement NVIDIA Jetson AGX Orin
  (64GB) — contenu de la boîte, configuration, écran et alimentation,
  logiciels et assistance.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 / component versions per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# FAQ

## Configuration

**Que contient la boîte ?**
Module Jetson AGX Orin et carte porteuse de référence, module Wi-Fi, bloc
d'alimentation USB Type-C et un câble USB Type-C vers USB Type-A. Vous
fournissez l'écran (DisplayPort), le clavier et la souris, et éventuellement
un câble Ethernet — voir
[Démarrage rapide](/fr/tutorials/jetson-agx-orin/quick-start).

**Le kit est-il livré avec un système d'exploitation ?**
Oui — l'eMMC est préflashé et le kit démarre directement sur le bureau Ubuntu.
Certaines unités peuvent être livrées avec une version L4T plus ancienne ; la
méthode de mise à jour recommandée est la Jetson ISO (aucun PC hôte requis).
Voir [Démarrage rapide](/fr/tutorials/jetson-agx-orin/quick-start).

**Faut-il un PC séparé pour le configurer ?**
Non, pas pour la méthode recommandée — la Jetson ISO s'installe depuis une clé
USB. Un PC hôte (Ubuntu) n'est nécessaire que pour les méthodes d'installation
alternatives (SDK Manager / script de flashage) ou pour une première
configuration headless (sans écran). Voir
[Flashage et mises à jour](/fr/tutorials/jetson-agx-orin/flashing-and-updates).

**Quelle est la version logicielle actuelle ?**
JetPack **7.2.1** (Jetson Linux **39.2.1**, Ubuntu 24.04, CUDA 13.2.2,
TensorRT 10.16.2). Vérifiez ce que votre kit exécute avec
[Vérifier votre système](/fr/tutorials/jetson-agx-orin/verify-your-system).

## Écran et alimentation

**Puis-je connecter mon écran HDMI ?**
Uniquement via un adaptateur ou un câble DisplayPort→HDMI **actif** — le kit
dispose uniquement d'une sortie DisplayPort (pas de port HDMI, pas de DP via
USB-C). Le MST est pris en charge pour un maximum de deux écrans. Détails :
[Interfaces et disposition matérielle](/fr/tutorials/jetson-agx-orin/interfaces).

**Comment alimenter le kit ?**
Utilisez le bloc d'alimentation USB-C fourni dans le port USB-C au-dessus de
la prise DC (J24). Si vous fournissez votre propre alimentation via la prise
cylindrique (J41) : 5,5 mm OD, 2,5 mm ID, positif au centre.

## Utilisation du kit

**Ce kit de développement peut-il émuler d'autres modules Jetson ?**
Oui. Le kit de développement partage l'architecture SoC avec tous les modules
Jetson Orin et peut être reflashé pour émuler les performances et les
caractéristiques de consommation des modules AGX Orin, Orin NX ou Orin Nano.
Il est livré configuré pour la série AGX Orin.

**Est-ce le module que j'utiliserais dans un produit de série ?**
Non. Les produits de série sont construits sur des **modules** Jetson Orin
(64 GB / 32 GB / Industrial) sur votre propre carte porteuse ou celle d'un
partenaire. Le kit de développement est le véhicule de développement et de
prototypage.

**Peut-il exécuter de grands modèles de langage / de l'IA agentique ?**
Oui — c'est un cas d'usage central de la plateforme Orin. Avec JetPack 7.2,
NVIDIA NemoClaw s'installe avec une seule commande sur les kits de
développement pour l'orchestration de modèles locaux et cloud, et le
[Jetson AI Lab](https://www.jetson-ai-lab.com) publie des tutoriels pratiques.

**Pour la robotique : Isaac ROS est-il disponible sur JetPack 7.2 ?**
Oui — Isaac ROS prend en charge Jetson Orin sous JetPack 7.2 depuis la version
**4.6.0** (2026-08-18), avec une procédure de configuration officielle pour
AGX Orin. Notez que la page de téléchargement de JetPack de NVIDIA affiche
encore « bientôt disponible » : Isaac ROS est publié indépendamment de
JetPack, ses propres notes de version font donc foi. Pour la version et le
choix de distribution ROS 2 (4.6.x = Jazzy, 5.0 = Lyrical) ainsi que les
contraintes connues, voir
[Robotique (état des lieux)](/fr/tutorials/jetson-agx-orin/robotics).

## Assistance et service

**Où puis-je obtenir une assistance technique ?**
- Questions sur la plateforme : [NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — faites d'abord une recherche ; incluez la sortie de `cat /etc/nv_tegra_release`.
- Assistance technique de Juxi Technology : **support@juxitech.com**
- Commande, garantie et RMA : **support@juxitech.com** (pour accélérer les choses, incluez votre numéro de commande)
- Ventes et devis : **sales@juxitech.com**
- Questions produits (sélection, compatibilité) : **pe@juxitech.com**

**Où puis-je trouver des accessoires (stockage NVMe, caméras, alimentation) ?**
Parcourez le catalogue de produits Juxi Technology sur **<https://wiki.juxitech.com/products/>** —
il comprend des accessoires pour Jetson tels que la
[Caméra CSI IMX219](https://wiki.juxitech.com/products/imx219-csi-camera)
(conçue pour NVIDIA Jetson), des caméras USB à autofocus et des
[caméras de profondeur RealSense](https://wiki.juxitech.com/products/realsense-depth-camera).
Pour un conseil, contactez sales@juxitech.com.

## Sources

- Jetson AGX Orin Developer Kit User Guide — [Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html), [Démarrage rapide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (vérifié le 2026-09-23)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-23)

*Statut : relu le 2026-10-11.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
