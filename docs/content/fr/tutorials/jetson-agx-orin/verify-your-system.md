---
title: Vérifier votre système — versions et liste des composants
sidebar_label: Vérifier votre système
slug: /getting-started/verify-your-system
description: >-
  Confirmez que votre kit de développement Jetson AGX Orin exécute JetPack 7.2.1
  avec la pile de composants complète — commandes de version et liste des
  composants attendus.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
review_owner: cheny
---

# Vérifier votre système

Après avoir configuré ou mis à jour votre kit, confirmez deux choses : la
**version BSP** et la **pile de composants JetPack installée**. Les deux
vérifications prennent moins d'une minute.

## Étape 1 — Vérifier la version L4T (BSP)

```bash
cat /etc/nv_tegra_release
```

Un système sous **JetPack 7.2.1** affiche :

```
# R39 (release), REVISION: 2.1, ...
```

Si la sortie indique une version plus ancienne (par exemple R35), mettez d'abord
à jour le BSP — voir **[Flashage et mises à jour](/fr/tutorials/jetson-agx-orin/flashing-and-updates)**.

## Étape 2 — Vérifier les composants JetPack

Les composants JetPack (CUDA, cuDNN, TensorRT, ...) sont installés sous forme de
paquets Debian. Vérifiez que le métapaquet est présent :

```bash
dpkg -l | grep -i nvidia-jetpack
```

Et confirmez que la boîte à outils CUDA est disponible :

```bash
nvcc --version
```

Sortie attendue pour cette version : **CUDA 13.2**. Si `nvcc` est absent ou si
le métapaquet n'est pas installé, installez les composants avec :

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

(Cela prend environ une heure selon la vitesse de connexion — voir
[Démarrage rapide → Étape 3](/fr/tutorials/jetson-agx-orin/quick-start).)

## Étape 3 — Versions attendues pour JetPack 7.2.1

Le tableau ci-dessous est la liste officielle des composants NVIDIA pour
**JetPack 7.2.1 / Jetson Linux 39.2.1** (vérifiée le 2026-09-23 sur la page de
téléchargement JetPack de NVIDIA) :

| Composant | Version |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| Système d'exploitation | Ubuntu 24.04 (L4T) |
| Noyau | 6.8 |
| CUDA | 13.2.1 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI (vision par ordinateur) | 4.1.3 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19 (avec image ISO) |
| Isaac ROS | **Pas encore disponible pour JetPack 7** (« bientôt disponible » selon NVIDIA) |

> **Remarque de Juxi :** `dpkg` peut afficher les versions de paquets avec des
> suffixes de compilation (par exemple `13.2.1-b48`) ; c'est normal — comparez
> le numéro de version, pas le suffixe. Utilisateurs en robotique : vérifiez la
> ligne Isaac ROS avant de planifier des travaux qui en dépendent.

## Facultatif — un rapide coup d'œil à l'activité du système

`tegrastats` (inclus dans Jetson Linux) affiche en direct l'utilisation du
CPU/GPU/de la mémoire :

```bash
tegrastats
```

Appuyez sur `Ctrl`+`C` pour arrêter.

## Si quelque chose manque

1. Réexécutez `sudo apt update && sudo apt install nvidia-jetpack`.
2. Assurez-vous que le `apt dist-upgrade` + redémarrage du processus d'installation est bien terminé (voir [Démarrage rapide → Étape 3](/fr/tutorials/jetson-agx-orin/quick-start)).
3. Vérifiez l'espace disque (`df -h`) et la connexion Internet.
4. Toujours bloqué ? Voir **[Dépannage](/fr/tutorials/jetson-agx-orin/troubleshooting)**.

## Sources

- [JetPack SDK Setup — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (vérifié le 2026-09-23)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-23)

*Statut : brouillon, en attente de relecture par cheny. Fondé sur la
documentation officielle NVIDIA à la date indiquée ; pas encore vérifié sur
matériel physique par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
