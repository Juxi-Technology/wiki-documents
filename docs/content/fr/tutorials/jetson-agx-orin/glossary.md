---
title: Glossaire
sidebar_label: Glossaire
slug: /appendix/glossary
description: >-
  Termes clés du kit de développement Jetson AGX Orin — du versionnage de
  JetPack et L4T au flashage, en passant par la pile d'IA et la terminologie
  d'alimentation.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
review_owner: cheny
---

# Glossaire

Les termes sur lesquels les clients nous interrogent le plus souvent, regroupés
par thème. Les numéros de version reflètent la version actuelle
(**JetPack 7.2.1 / L4T 39.2.1**, vérifiés le 2026-09-24).

## Plateforme et matériel

| Terme | Signification |
|---|---|
| **Jetson AGX Orin** | La famille de modules d'IA embarquée de NVIDIA ; ce kit de développement embarque le module **64GB**. |
| **Module** | La petite carte qui intègre le SoC, la mémoire et l'eMMC et qui effectue le calcul. |
| **Carte porteuse** | La carte plus grande qui porte tous les ports et connecteurs ; le module s'y enfiche (connecteur à 699 broches, J3). |
| **Kit de développement** | Module + carte porteuse de référence + module Wi-Fi + bloc d'alimentation — la plateforme de prototypage. Les produits de série utilisent des modules sur des cartes porteuses personnalisées ou de partenaire. |
| **SoC** | System-on-chip (système sur puce) : CPU, GPU et accélérateurs intégrés sur une seule puce (NVIDIA appelle cette gamme « Tegra »). |
| **TOPS** | Mille milliards d'opérations par seconde — une mesure du débit d'IA (la famille AGX Orin atteint jusqu'à 275 TOPS). |
| **Tensor Core** | Cœurs GPU spécialisés dans les calculs matriciels qui sous-tendent les réseaux de neurones. |
| **eMMC** | Mémoire flash intégrée sur le module ; le stockage système par défaut. |
| **NVMe** | SSD rapide sur PCIe, installé dans le logement M.2 M-Key (J1) ; peut héberger le système. |
| **M.2 (M-Key / E-Key)** | Types de logement : **M-Key** = SSD NVMe, **E-Key** = module Wi-Fi. |
| **CSI / GMSL** | Interfaces caméra (CSI sur le connecteur caméra J509 ; GMSL pour les caméras de qualité automobile). |
| **DisplayPort (DP)** | La **seule** sortie d'affichage du kit ; prend en charge MST (jusqu'à 2 écrans) et DSC. |

## Logiciel et versions

| Terme | Signification |
|---|---|
| **JetPack** | Le bundle SDK de NVIDIA pour Jetson — système d'exploitation, pilotes, pile CUDA et bibliothèques. **Version actuelle : 7.2.1.** |
| **Jetson Linux (L4T)** | Le paquet de support de carte sous JetPack : bootloader, noyau, pilotes et système de fichiers racine Ubuntu. **Version actuelle : r39.2.1.** |
| **BSP** | « Board support package » — tout ce qu'il faut pour démarrer et faire fonctionner la carte. |
| **Système de fichiers racine (rootfs)** | La partie espace utilisateur du système d'exploitation (ici : Ubuntu 24.04). |
| **oem-config** | L'assistant de configuration du premier démarrage (langue, compte utilisateur, réseau). |
| **UEFI** | Le micrologiciel et le menu de démarrage du kit ; utilisez son gestionnaire de démarrage pour choisir un périphérique de démarrage. |
| **QSPI** | Petite mémoire flash contenant le micrologiciel des premières étapes du démarrage. Pendant l'installation ISO, une invite « **mise à jour de capsule QSPI** » peut apparaître — appuyez sur `Y` (obligatoire). |
| **Mode Force Recovery** | Mode de démarrage spécial pour flasher depuis un PC hôte. Pour y entrer : maintenez le bouton Force Recovery central enfoncé pendant que vous branchez l'alimentation. |
| **Jetson ISO** | L'image d'installation pour clé USB ; la voie de mise à jour recommandée par NVIDIA (aucun PC hôte nécessaire). |
| **SDK Manager** | L'outil graphique de NVIDIA (sur PC hôte) pour flasher le BSP et installer les composants JetPack. |
| **Linux_for_Tegra / flash.sh** | Les outils de flashage à base de scripts, pour les usages avancés et les produits. |
| **OTA** | Mise à jour over-the-air — mises à jour logicielles et de sécurité à distance des appareils déployés. |
| **Device tree** | La structure de données qui décrit au noyau le matériel connecté ; les device trees personnalisés doivent être reconstruits pour chaque version de L4T. |

**Correspondance des versions** (le tableau le plus utile à mémoriser) :

| JetPack | Jetson Linux (L4T) | Ubuntu | Noyau | CUDA |
|---|---|---|---|---|
| **7.2.1** (actuelle) | **39.2.1** | **24.04** | **6.8** | **13.2.1** |
| 6.x (génération précédente) | 36.x | 22.04 | 5.15 | 12.x |

Vérifiez toujours ce qu'exécute réellement un système donné :
`cat /etc/nv_tegra_release`.

## Pile d'IA

| Terme | Signification |
|---|---|
| **CUDA** | La boîte à outils de calcul GPU de NVIDIA (13.2.1 dans cette version). |
| **cuDNN** | Bibliothèque de primitives d'apprentissage profond optimisées (9.20.0). |
| **TensorRT** | Optimiseur et environnement d'exécution d'inférence (10.16.2). |
| **Moteur TensorRT** | Un fichier de modèle compilé, propre à un matériel et à une version. Les moteurs ne **survivent pas** aux mises à niveau de version — reconstruisez-les. |
| **DeepStream** | SDK d'analyse vidéo multi-flux (9.1). |
| **VPI** | Vision Programming Interface — traitement d'images accéléré par le matériel (4.1.3). |
| **Holoscan** | Framework d'IA en flux pour le traitement de capteurs en temps réel (3.9.0). |
| **NGC** | Le catalogue de conteneurs et de modèles pré-entraînés de NVIDIA (catalog.ngc.nvidia.com). |
| **Conteneur** | Environnement d'exécution isolé et empaqueté (Docker) ; la méthode standard pour distribuer des logiciels d'IA sur Jetson. |

## Alimentation et surveillance

| Terme | Signification |
|---|---|
| **nvpmodel** | Outil pour changer de mode d'alimentation. Exécutez `sudo nvpmodel -q` pour afficher les modes de votre système. |
| **MAXN** | Mode d'alimentation « performances maximales » (sans plafond de puissance). |
| **jetson_clocks** | Fixe les fréquences d'horloge au maximum — pour les benchmarks, pas pour un usage soutenu par défaut. |
| **tegrastats** | Moniteur en direct intégré de l'utilisation CPU/GPU/mémoire. |

## L'ère JetPack 7

| Terme | Signification |
|---|---|
| **NemoClaw** | Le framework d'IA agentique de NVIDIA pour Jetson ; installable avec une seule commande depuis JetPack 7.2. |
| **Compétences d'agent Jetson** | Flux de travail d'agents réutilisables que NVIDIA publie pour les tâches côté appareil et les tâches BSP. |
| **Yocto / OpenEmbedded (OE4T)** | Le système de build pour des images Linux de production personnalisées et reproductibles — officiellement pris en charge depuis 7.2. |
| **SBSA** | Server Base System Architecture — le modèle de serveur Arm auquel s'aligne la gamme Jetson **Thor** (pas ce kit). |
| **MIG** | Multi-Instance GPU — le partitionnement d'un GPU en instances isolées (Jetson Thor, aperçu technique). |

## Sources

- [Téléchargements du SDK JetPack — versions des composants](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-24)
- [Guide de l'utilisateur du kit de développement Jetson AGX Orin](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (vérifié le 2026-09-24)

*Statut : brouillon, en attente de révision par cheny. Définitions compilées à
partir de la documentation NVIDIA et de l'usage courant du secteur ; numéros de
version vérifiés à la date indiquée.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est publiée
par Juxi Technology et n'est pas une publication de NVIDIA.
