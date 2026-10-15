---
title: Téléchargements et liens officiels
sidebar_label: Téléchargements
slug: /downloads
description: >-
  Un index vérifié des téléchargements et de la documentation officiels de
  NVIDIA pour le Jetson Orin Nano Super Developer Kit (8GB) sous JetPack 7.2.1
  / L4T r39.2.1, ainsi que des ressources partenaires et les points d'entrée
  Juxi Technology.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-archive
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html
    checked: 2026-09-26
    note: target of the "NVIDIA SDK Manager Documentation" entry on the kit user guide's Additional Docs page
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/overview.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
  - source: https://wiki.juxitech.com/
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Téléchargements et liens officiels

Cette page est un index des téléchargements et de la documentation officiels
de NVIDIA pour le **Jetson Orin Nano Super Developer Kit (8GB)** sous
**JetPack 7.2.1 / Jetson Linux (L4T) r39.2.1**, complété par quelques
ressources partenaires et les points d'entrée Juxi Technology. Tous les liens
ont été vérifiés le **2026-09-26**.

Deux faits propres à l'Orin Nano sont à connaître avant tout téléchargement :

- **Pas d'image de carte SD.** À partir de JetPack 7.2, le kit s'installe à
  partir de la Jetson ISO écrite sur une clé USB. Il n'y a pas d'image de
  carte SD, et l'ISO ne doit pas être écrite sur une carte microSD.
- **Prérequis de micrologiciel.** JetPack 7.2.1 exige un micrologiciel
  UEFI/QSPI de génération JetPack 6.x sur le kit. Si votre kit a encore un
  micrologiciel d'usine plus ancien, terminez d'abord le JetPack 6.x Update
  Path.

> **Astuce Juxi :** le parcours de configuration complet se trouve dans [Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start). Les options de flashage et de mise à jour sont comparées dans [Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates).

## JetPack 7.2.1 / Jetson Linux r39.2.1

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) — la page JetPack principale : notes de version, le tableau officiel des versions de composants et tous les liens de téléchargement de JetPack 7.2.1.

> ⚠️ **Ne vous fiez pas à ce tableau des composants ligne par ligne.** NVIDIA ne l'a pas entièrement actualisé pour la 7.2.1 : la ligne CUDA a été mise à jour, mais les deux lignes voisines ne l'ont pas été — VPI affiche encore la valeur de JetPack 7.2 (**4.1.3, alors que la 7.2.1 embarque en réalité 4.1.4**) et la ligne Isaac ROS dit encore « coming soon », alors qu'Isaac ROS prend en charge Orin sous JetPack 7.2 depuis sa sortie d'août 2026. Pour les versions des composants, considérez le dépôt de paquets de NVIDIA comme la source faisant autorité : le métapaquet fixe chaque composant via sa chaîne de dépendances — [r39.2 arm64 Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages), où `nvidia-jetpack-runtime (= 7.2.1-b49)` → `nvidia-vpi (= 7.2.1-b49)` → `libnvvpi4 (= 4.1.4)` (vérifié le 2026-09-26). Les versions des composants sont également listées sur [Vérifier votre système](/fr/tutorials/jetson-orin-nano/verify-your-system).
- [Jetson ISO pour r39.2.1 (téléchargement direct)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso) — l'image d'installation de JetPack 7.2.1 ; la page Quick Start du kit la référence comme « Direct Download Link: Jetson ISO (r39.2.1) ». Écrivez-la sur une clé USB de 16 GB ou plus. Aucune somme de contrôle n'est publiée avec le téléchargement.
- [Documentation de NVIDIA SDK Manager](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) — installez et utilisez l'outil pour PC hôte qui flashe le kit, met à jour le micrologiciel et installe les composants JetPack (un compte NVIDIA Developer Program est requis) ; le flux de travail du kit est dans [Installation du BSP](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html).
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) — versions JetPack antérieures, dont JetPack 7.2 (la première version 7.x qui prend en charge la famille Orin) et la série JetPack 6.x.

## Documentation

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — la référence principale pour ce kit.
  - [Démarrage rapide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Disposition matérielle](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)
- [Notes de version Jetson Linux r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — les nouveautés de JetPack 7.2.1, la déclaration de GA et la liste des problèmes connus.
- [Notes de version Jetson Linux r39.2 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — les notes de version de JetPack 7.2.
- [Jetson Linux Developer Guide (r39.2)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) — cibles de flashage, configuration des partitions, et tableaux d'alimentation et de performance de la plateforme.
- [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) — la liste de ressources complémentaires de NVIDIA pour ce kit (JetPack SDK, Developer Guide, documentation SDK Manager, Jetson Download Center, Jetson AI Lab, forums de développeurs, Jetson Ecosystem).
- [Jetson Download Center](https://developer.nvidia.com/embedded/downloads) — l'index de téléchargements de NVIDIA pour Jetson ; le guide du kit y renvoie pour la Carrier Board Specification et la liste des composants pris en charge. Certaines parties nécessitent un compte NVIDIA.

## Frameworks d'IA et tutoriels

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) — la pile d'inférence LLM embarquée de NVIDIA pour Jetson. Orin est une cible officiellement prise en charge, avec FP16, INT8 et INT4 uniquement ([matrice de prise en charge](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) · [modèles pris en charge](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)).
- [Guide d'installation de DeepStream 9.1](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) — l'analyse vidéo sur Jetson ; DeepStream 9.1 est la version qui prend en charge la famille Orin sous JetPack 7.2 ([Quickstart](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) · [Conteneurs Docker](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)).
- [Jetson AI Lab](https://www.jetson-ai-lab.com/) — un hub géré par un partenaire, avec des tutoriels pratiques pour exécuter des modèles d'IA sur Jetson, dont un [tutoriel TensorRT Edge-LLM pour Orin Nano 8 GB](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/).
- [Index de wheels SBSA (CUDA 13)](https://pypi.jetson-ai-lab.io/sbsa/cu130) — index hébergé par un partenaire, de wheels Python aarch64 pour JetPack 7.2 / CUDA 13.2 ; le personnel NVIDIA renvoie à cet index pour les wheels Python de cette version.

## Juxi Technology

- **Wiki :** [wiki.juxitech.com](https://wiki.juxitech.com/) — cette série de documentation ; le [catalogue de produits](https://wiki.juxitech.com/products/) liste caméras, capteurs et accessoires pour les kits Jetson.
- **Boutique :** [Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) — la fiche produit de la boutique Juxi pour ce kit (SKU JX00110).
- **Contacts :** assistance technique — support@juxitech.com · ventes — sales@juxitech.com · questions produits — pe@juxitech.com.

## Sources

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — [Démarrage rapide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) (vérifié le 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) et [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) (vérifié le 2026-09-26) — ⚠️ son tableau des composants est en retard ligne par ligne ; pour les versions des composants, utilisez plutôt [le dépôt de paquets de NVIDIA](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) (voir l'avertissement ci-dessus)
- [Dépôt de paquets de NVIDIA — index r39.2 arm64 Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — fait autorité pour les versions des composants, via les verrous de dépendances des métapaquets (vérifié le 2026-09-26)
- Notes de version Jetson Linux — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (vérifié le 2026-09-26)
- [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) (vérifié le 2026-09-26)
- [Documentation de NVIDIA SDK Manager](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) (vérifié le 2026-09-26)
- [Documentation TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) · [Guide d'installation de DeepStream 9.1](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) · [Index de wheels SBSA](https://pypi.jetson-ai-lab.io/sbsa/cu130) (vérifié le 2026-09-26)
- [Fiche produit de la boutique Juxi Technology](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) et [wiki](https://wiki.juxitech.com/) (vérifié le 2026-09-26)

*Statut : relu le 2026-10-11.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
