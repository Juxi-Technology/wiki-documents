---
title: Journal des modifications
sidebar_label: Journal des modifications
slug: /appendix/changelog
description: >-
  Les mises à jour de ce jeu de documentation, ainsi que l'historique des
  versions JetPack pour le NVIDIA Jetson Orin Nano Super Developer Kit.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# Journal des modifications

## Mises à jour de la documentation

| Date | Modification |
|---|---|
| 2026-09-26 | Publication initiale du jeu de documentation au statut de brouillon : Démarrage rapide, Flashage et mises à jour, Vérifier votre système, Présentation du produit, Interfaces et disposition matérielle, FAQ, Dépannage, Téléchargements, le guide de migration JetPack 6.x → 7.2, cinq tutoriels (LLM local, Efficacité mémoire, DeepStream, Robotique, IA agentique), le Glossaire et ce Journal des modifications. Rédigé d'après la documentation officielle de NVIDIA pour JetPack 7.2.1 ; pas encore vérifié sur matériel physique. |

## Versions de JetPack pour ce kit

| JetPack | Jetson Linux (L4T) | Date | Remarques |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **Version actuelle.** L'ISO flashe désormais le kit de développement Orin Nano avec la configuration Super Mode par défaut, ce qui corrige le problème r39.2 où les unités mises à jour par ISO restaient sur leur profil d'alimentation précédent. |
| 7.2 | 39.2.0 | 2026-06 | Première version JetPack 7 pour la famille Orin (Ubuntu 24.04, noyau 6.8, CUDA 13.x). Problème connu de cette version : les unités mises à jour via la Jetson ISO ne passaient pas en mode Super par défaut — voir [Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting). |
| 6.2.x | 36.x | 2025 | La série JetPack 6 pour ce kit (Ubuntu 22.04). C'est ici qu'a été introduit le mode d'alimentation « Super » — le même matériel, avec des fréquences CPU/GPU/mémoire plus élevées et le mode 25 W. |
| 6.0 / 6.1 | 36.x | 2024–2025 | Versions JetPack 6 antérieures. |
| 5.1.3 | 35.x | 2023–2024 | La plus ancienne lignée de micrologiciel encore référencée : le JetPack 6.x Update Path utilise une image-pont 5.1.3 pour amener les kits très anciens au micrologiciel de génération JetPack 6.x avant que JetPack 7 puisse être installé. |

Historiques complets : [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux Archive](https://developer.nvidia.com/embedded/jetson-linux-archive)

Pour mettre à jour votre kit, consultez **[Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates)** ;
pour savoir ce que vous exécutez, consultez **[Vérifier votre système](/fr/tutorials/jetson-orin-nano/verify-your-system)**.

## Sources

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-26)
- [Notes de version Jetson Linux 39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (vérifié le 2026-09-26)
- [Annonce NVIDIA JetPack 6.2 — Super mode for Jetson Orin Nano](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (lié comme l'annonce du mode d'alimentation Super par le fournisseur)

*Statut : brouillon, en attente de relecture par cheny. Fondé sur la
documentation officielle de NVIDIA aux dates indiquées ; pas encore vérifié
sur matériel physique par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
