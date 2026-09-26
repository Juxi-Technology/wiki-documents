---
title: Journal des modifications
sidebar_label: Journal des modifications
slug: /appendix/changelog
description: >-
  Les mises à jour de ce jeu de documentation, ainsi que l'historique des
  versions JetPack pour le kit de développement Jetson AGX Orin.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: source for the CUDA 13.2.2 / VPI 4.1.4 correction
review_owner: cheny
---

# Journal des modifications

## Mises à jour de la documentation

| Date | Modification |
|---|---|
| 2026-09-26 | **Correction de deux versions de composants pour JetPack 7.2.1 : CUDA 13.2.1 → 13.2.2 et VPI 4.1.3 → 4.1.4.** Ces deux versions provenaient de la page de téléchargement de JetPack de NVIDIA, dont le tableau récapitulatif affiche encore les valeurs de JetPack **7.2** ; les versions ont été vérifiées via la chaîne de dépendances de `nvidia-jetpack` 7.2.1 dans le dépôt apt Jetson de NVIDIA. Mise à jour de **Vérifier votre système** (note sur la source du tableau), du **Glossaire**, de la **FAQ**, du **guide de migration JetPack 6.x → 7.2** et de la page produit. Ajout également d'un avertissement « ce tableau est en retard » partout où cette page est citée comme source pour les versions des composants (**Téléchargements**, **Glossaire**, **DeepStream**, **guide de migration**). |
| 2026-09-26 | **Correction du statut d'Isaac ROS sur JetPack 7.2.** Isaac ROS 4.6.0 (2026-08-18) a ajouté la prise en charge de Jetson Orin + JetPack 7.2, remplaçant le statut « bientôt disponible » précédemment repris de la page de téléchargement de JetPack (qui l'affiche toujours). Mise à jour de **Robotique** (nouvelle version et indications sur la distribution ROS 2), de **Vérifier votre système**, du **guide de migration JetPack 6.x → 7.2** et de la **FAQ**. |
| 2026-09-24 | Ajout du **Glossaire** et de ce **Journal des modifications**. Ajout des coordonnées de Juxi Technology (assistance technique, ventes, questions produits) dans la FAQ, le Dépannage et les Téléchargements ; ajout du lien vers le catalogue de produits Juxi pour les accessoires. |
| 2026-09-23 | Publication initiale du jeu de documentation au statut de brouillon : Démarrage rapide, Flashage et mises à jour, Vérifier votre système, Présentation du produit, Interfaces et disposition matérielle, FAQ, Dépannage, Téléchargements, et le guide de migration JetPack 6.x → 7.2. Toutes les pages sont rédigées d'après la documentation officielle de NVIDIA. |

## Versions de JetPack pour ce kit

| JetPack | Jetson Linux (L4T) | Date | Remarques |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **Version actuelle.** Correctifs et mises à jour de sécurité ; émulation T3000 ; compétences d'agent pour les pipelines vidéo. |
| 7.2 | 39.2.0 | 2026-06 | Première version à intégrer la famille Jetson Orin dans JetPack 7 (Ubuntu 24.04, noyau 6.8, CUDA 13). |
| 6.x | 36.x | 2024–2025 | Génération précédente (Ubuntu 22.04, noyau 5.15, CUDA 12) — consultez les archives si vous l'utilisez encore, ainsi que notre [guide de migration](/fr/tutorials/jetson-agx-orin/jetpack-6-to-7). |

Historiques complets : [Archive JetPack](https://developer.nvidia.com/embedded/jetpack-archive) · [Archive Jetson Linux](https://developer.nvidia.com/embedded/jetson-linux-archive)

Pour mettre à jour votre kit, consultez **[Flashage et mises à jour](/fr/tutorials/jetson-agx-orin/flashing-and-updates)** ;
pour savoir ce que vous exécutez, consultez **[Vérifier votre système](/fr/tutorials/jetson-agx-orin/verify-your-system)**.

## Sources

- [Téléchargements du SDK JetPack](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-24)
- [Notes de version de Jetson Linux 39.2.0 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (vérifié le 2026-09-24)

*Statut : brouillon, en attente de relecture par cheny.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
