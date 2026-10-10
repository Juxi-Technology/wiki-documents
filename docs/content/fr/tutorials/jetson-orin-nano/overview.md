---
title: Présentation du produit — Kit de développement Jetson Orin Nano Super
sidebar_label: Présentation du produit
slug: /product/overview
description: >-
  Ce qu'est le kit de développement NVIDIA Jetson Orin Nano Super (8GB), à quoi
  il sert et quelle est sa place dans la gamme Jetson Orin.
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
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Présentation du produit

![Kit de développement Jetson Orin Nano Super](/images/jetson-orin-nano/jetson-orin-nano-super-developer-kit-hero.jpg)

Le kit de développement NVIDIA® Jetson Orin Nano™ Super est le kit d'entrée de la
famille Jetson Orin : un petit ordinateur d'IA pour prototyper des applications de
vision par ordinateur, de robotique et d'IA générative locale en périphérie. Il
exécute JetPack 7.2.1 (Jetson Linux / L4T r39.2.1), la version actuelle pour ce
kit.

## Faits essentiels (vérifiés par rapport à la documentation NVIDIA)

- « Super » est une configuration logicielle, pas un nouveau matériel : le même module
  (P3767) et la même carte porteuse (P3768) que le précédent « Jetson Orin Nano Developer
  Kit », renommé lors de la mise à jour Super. *(Guide de l'utilisateur du kit de
  développement ; annonce Super Boost de NVIDIA)*
- Chiffres phares du kit : jusqu'à **67 TOPS INT8**, jusqu'à **102 GB/s** de bande passante
  mémoire, une puissance de **7W à 25W**, et une amélioration de **1,7x en IA générative** par
  rapport à la génération précédente. *(Guide de l'utilisateur du kit de développement —
  Introduction)*
- GPU Ampere avec **1 024 cœurs CUDA et 32 cœurs Tensor** ; processeur **Arm
  Cortex-A78AE 6 cœurs** 64 bits jusqu'à 1,7 GHz ; **8 GB LPDDR5 128 bits**. *(Fiche
  technique ; page de spécifications Jetson Orin)*
- Stockage : un **logement de carte microSD sur la face inférieure du module** plus
  la prise en charge **NVMe externe** ; pas d'eMMC et aucun stockage dans la boîte. *(Fiche technique ;
  Démarrage rapide)*
- Exécute JetPack **7.2.1** (L4T **r39.2.1** ; Ubuntu 24.04, noyau 6.8, CUDA
  13.2.2, TensorRT 10.16.2) via la méthode Jetson ISO depuis une clé USB.
  Plage prise en charge : JetPack 6.x ou 7.2/7.2.1 (7.0/7.1 ne prenaient pas en charge Orin).
  *(Démarrage rapide ; téléchargements JetPack ; archive JetPack)*
- Carte porteuse : DisplayPort, Ethernet Gigabit, quatre ports USB 3.2 Type-A,
  USB-C, deux connecteurs MIPI CSI, trois logements M.2, connecteur 40 broches. Voir
  **[Interfaces et disposition matérielle](/fr/tutorials/jetson-orin-nano/interfaces)**. *(Guide de l'utilisateur du
  kit de développement — Disposition matérielle)*

## Ce que signifie « Super »

L'amélioration de performances Super est apportée par un mode d'alimentation logiciel qui
élève les fréquences du GPU, de la mémoire et du CPU sur le même matériel, et NVIDIA indique que
les kits existants l'obtiennent en mettant à jour JetPack : « Les utilisateurs existants du kit de
développement Jetson Orin Nano peuvent obtenir l'amélioration de performances “Super” avec une
mise à niveau logicielle. » *(Guide de l'utilisateur du kit de développement ; annonce Super Boost de NVIDIA)*

Le tableau ci-dessous compare le kit d'origine avec la configuration Super.
*(annonce Super Boost de NVIDIA)*

| Élément | Kit de développement Orin Nano d'origine | Configuration Super |
|---|---|---|
| Fréquence GPU | 635 MHz | 1 020 MHz |
| Fréquence CPU | 1,5 GHz | 1,7 GHz |
| Bande passante mémoire | 68 GB/s | 102 GB/s |
| Performances IA (INT8 sparse) | 40 TOPS | 67 TOPS |
| Calcul FP16 | 10 TFLOPs | 17 TFLOPs |
| Modes d'alimentation | 7W, 15W | 7W, 15W, 25W |
| Prix (au lancement Super, décembre 2024) | $499 | $249 |

*Sur un chiffre, les propres supports de NVIDIA divergent : l'annonce Super décrit
l'ancienne bande passante mémoire comme « 65 GB/s », tandis que les tableaux de spécifications
des modules de NVIDIA indiquent 68 GB/s pour la configuration 8 GB d'origine. Le tableau ci-dessus
utilise le chiffre de la fiche technique ; les deux se réfèrent au même matériel pré-Super.*

Pour les prix actuels, voir la
[fiche de ce kit sur la boutique Juxi](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)
(SKU JX00110).

À partir de JetPack 7.2.1, la Jetson ISO flashe le kit avec la configuration Super
par défaut *(page de téléchargement de JetPack)*. Les unités initialement installées
avec l'ISO JetPack 7.2 peuvent conserver un profil non-Super ; si 25W ou MAXN SUPER
manque, voir **[Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting)**.

Dans le tableau des modes d'alimentation de L4T r39.2, la configuration Super liste 15W (mode 0),
25W (mode 1, par défaut) et MAXN SUPER (mode 2, expérimental ; uniquement sur les kits
flashés avec la configuration Super). MAXN SUPER fait tourner le CPU jusqu'à 1,7 GHz,
le GPU jusqu'à 1 020 MHz et le contrôleur mémoire à 3 199 MHz. Lisez le mode
avec `sudo /usr/sbin/nvpmodel -q` ; définissez-le avec
`sudo /usr/sbin/nvpmodel -m <mode_id>`. Les pages du kit de NVIDIA citent « 7W à 25W » ;
le tableau de la r39.2 liste les trois modes ci-dessus — vérifiez votre unité dans **[Vérifier
votre système](/fr/tutorials/jetson-orin-nano/verify-your-system)**. *(page Alimentation
et performances de L4T r39.2)*

## Spécifications du module

| Élément | Spécification |
|---|---|
| Performances IA | Jusqu'à 67 TOPS INT8 sparse (33 denses) en configuration Super |
| GPU | Architecture NVIDIA Ampere, 1 024 cœurs CUDA, 32 cœurs Tensor, jusqu'à 1 020 MHz |
| CPU | Arm Cortex-A78AE v8.2 6 cœurs (64 bits), 1,5MB L2 + 4MB L3, jusqu'à 1,7 GHz |
| Mémoire | 8 GB LPDDR5 128 bits, 102 GB/s |
| Stockage | Logement de carte microSD sur la face inférieure du module ; prise en charge SSD NVMe externe |
| Décodage vidéo | 1x 4K60 (H.265), 2x 4K30, 5x 1080p60, 11x 1080p30 |
| Encodage vidéo | 1080p30 sur 1–2 cœurs CPU (aucun encodeur matériel dédié) |
| Accélérateurs IA | Pas de DLA ni de PVA — l'inférence s'exécute sur les cœurs Tensor du GPU |
| Format du module | SO-DIMM 260 broches, 69,6 mm x 45 mm |

*Sources : fiche technique du kit de développement Jetson Orin Nano Super (décembre 2024) ;
page de spécifications NVIDIA Jetson Orin ; page Alimentation et performances de L4T r39.2.*

## Références produit

| Référence | Ce qu'elle désigne |
|---|---|
| P3766 | Le kit de développement Jetson Orin Nano complet |
| P3767 | Le System on Module (SOM) |
| P3768 | La carte porteuse de référence |
| P3767-0005 | SKU du module dans le kit de développement (Jetson Orin Nano 8GB, « for development only ») |

Cette série de documentation ne couvre **que le kit de développement 8GB**. Le module Orin Nano 8GB commercial est une autre référence (**P3767-0003**) et une cible distincte dans les outils de flashage — voir la note sur le SKU du module dans [Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates).

## Sa place dans la gamme Orin

- **Jetson Orin Nano 8GB — ce kit.** Le point d'entrée de la famille Orin :
  67 TOPS INT8, 8 GB de mémoire unifiée, 7W à 25W.
- **Jetson Orin NX.** La même carte porteuse peut alimenter, tester et développer avec des modules Orin
  NX (dissipateur thermique et ventilateur dédiés requis ; un module neuf doit être
  flashé depuis un hôte Ubuntu avec SDK Manager). *(Guide de l'utilisateur du kit de
  développement — How-To)*
- **Jetson AGX Orin — le haut de gamme.** Le module AGX Orin 32GB atteint
  241 TOPS en Super Mode *(points forts de la version JetPack 7.2)*. Voir la
  [série Jetson AGX Orin](/fr/tutorials/jetson-agx-orin/quick-start) de Juxi.

La principale contrainte à anticiper est la **mémoire unifiée de 8 GB** ; sans DLA
ni PVA, les charges de travail d'IA s'exécutent sur le GPU seul — voir **[Efficacité
mémoire](/fr/tutorials/jetson-orin-nano/memory-efficiency)** et **[Inférence
LLM locale](/fr/tutorials/jetson-orin-nano/local-llm)**.

## À quoi sert le kit de développement

- **Prototyper pour la production.** JetPack 7.2.1 sert toute la famille Orin,
  donc le travail effectué sur le kit se transpose aux modules Orin utilisés dans les produits. *(Page de
  téléchargement de JetPack)*
- **Vision par ordinateur.** Deux connecteurs caméra MIPI CSI ; le SDK DeepStream 9.1 fait
  partie de la matrice des composants de JetPack 7.2.1 — voir
  **[DeepStream](/fr/tutorials/jetson-orin-nano/deepstream)**.
- **IA générative locale.** La promesse phare est une amélioration de 1,7x en IA
  générative ; le plafond de 8 GB détermine ce qui tient — voir
  **[Inférence LLM locale](/fr/tutorials/jetson-orin-nano/local-llm)**.
- **Robotique.** Le personnel NVIDIA recommande ROS 2 Jazzy pour JetPack 7.2.1 — voir
  **[Robotique](/fr/tutorials/jetson-orin-nano/robotics)**.

> **Remarque de Juxi :** les produits de série sont construits sur des *modules* Jetson Orin — le
> Orin Nano 8GB ou un Orin NX — sur une carte porteuse personnalisée. Le
> kit de développement est le véhicule de développement, pas la pièce de série.

## Contenu de la boîte

La boîte contient le kit de développement (module Orin Nano 8GB avec dissipateur thermique, sur
la carte porteuse de référence), un bloc d'alimentation 19 V, la carte sans fil 802.11ac/ab/gn
incluse et une carte de démarrage rapide et d'assistance. NVIDIA précise que le kit « n'inclut
pas de stockage amovible dans la boîte ». *(Fiche technique ; Démarrage rapide)*

Vous devez fournir :

- **Le stockage** — une carte microSD (64GB, UHS-1 ou plus) ou un SSD NVMe. Le
  logement microSD est sur la **face inférieure du module** ; insérez la carte avant la mise sous tension.
  Le pack de la boutique Juxi inclut déjà une carte microSD de 64 GB, n'achetez donc du stockage
  que si vous avez reçu la boîte NVIDIA nue ou si vous préférez un SSD NVMe.
- **Une clé USB d'installation** — 16GB ou plus. Écrivez l'ISO JetPack sur cette
  clé USB, pas sur une carte microSD : les images pour carte SD ont été supprimées dans JetPack
  7.2.
- **Un ordinateur hôte** avec 25GB ou plus d'espace libre, un écran DisplayPort et
  un clavier/souris USB pour la configuration sur bureau. *(Démarrage rapide ; Matériel pris en charge)*

> **Important :** un micrologiciel d'usine très ancien doit d'abord être mis à jour — JetPack
> 7.2.1 exige un micrologiciel UEFI/QSPI de génération JetPack 6.x. Voir **[Démarrage
> rapide](/fr/tutorials/jetson-orin-nano/quick-start)** et **[Flashage et
> mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Pour aller plus loin

- **[Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start)** — de la boîte à un
  système JetPack 7.2.1 fonctionnel
- **[Interfaces et disposition matérielle](/fr/tutorials/jetson-orin-nano/interfaces)** — chaque port, logement et
  connecteur
- **[Téléchargements](/fr/tutorials/jetson-orin-nano/downloads)** — images officielles, outils et liens vers la documentation

## Sources

- [Guide de l'utilisateur du kit de développement Jetson Orin Nano — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (vérifié le 2026-09-26)
- [Guide de l'utilisateur du kit de développement Jetson Orin Nano — Démarrage rapide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (vérifié le 2026-09-26)
- [Guide de l'utilisateur du kit de développement Jetson Orin Nano — Disposition matérielle](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (vérifié le 2026-09-26)
- [Guide de l'utilisateur du kit de développement Jetson Orin Nano — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (vérifié le 2026-09-26)
- [Guide de l'utilisateur du kit de développement Jetson Orin Nano — Parcours de mise à jour JetPack 6.x](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (vérifié le 2026-09-26)
- [Guide de l'utilisateur du kit de développement Jetson Orin Nano — Matériel pris en charge](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/supported_hardware.html) (vérifié le 2026-09-26)
- [NVIDIA Super Boost : le kit de développement Jetson Orin Nano reçoit un boost « Super »](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (vérifié le 2026-09-26)
- [NVIDIA JetPack 6.2 apporte le Super Mode aux modules Jetson Orin Nano et Jetson Orin NX](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (lié comme annonce du mode d'alimentation Super)
- [Page de spécifications du module et du kit de développement NVIDIA Jetson Orin](https://developer.nvidia.com/embedded/jetson-orin) (vérifié le 2026-09-26)
- [Téléchargements du SDK JetPack](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-26)
- [Archive JetPack](https://developer.nvidia.com/embedded/jetpack-archive) (vérifié le 2026-09-26)
- [Guide du développeur L4T r39.2 — Série Jetson Orin NX et Orin Nano : adaptation et mise en route du module](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (vérifié le 2026-09-26)
- [Guide du développeur L4T r39.2 — Alimentation et performances de la plateforme](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (vérifié le 2026-09-26)
- [Guide du développeur L4T r38.2.1 — Configuration des partitions (SKU des modules)](https://docs.nvidia.com/jetson/archives/r38.2.1/DeveloperGuide/AR/BootArchitecture/PartitionConfiguration.html) (vérifié le 2026-09-26)
- [Fiche technique du kit de développement Jetson Orin Nano Super (PDF, liée depuis nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (vérifié le 2026-09-26)
- [Fiche du kit sur la boutique Juxi Technology](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (vérifié le 2026-09-26)

*Statut : relu le 2026-10-11. Fondé sur la documentation
officielle de NVIDIA aux dates indiquées ; pas encore vérifié sur matériel physique par
Juxi Technology.*

**Crédits image :** image produit issue du *Jetson Orin Nano
Developer Kit User Guide* officiel de NVIDIA (téléchargé le 2026-09-26), © NVIDIA Corporation.

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est publiée
par Juxi Technology et n'est pas une publication de NVIDIA.
