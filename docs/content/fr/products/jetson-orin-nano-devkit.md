---
title: Kit de développement Jetson Orin Nano Super (8GB)
category: compute-vision
description: Kit de développement NVIDIA Jetson Orin Nano Super (8GB) — jusqu'à 67 INT8 TOPS d'IA en périphérie, 8 GB de mémoire unifiée, options de stockage microSD et NVMe, avec la documentation complète JetPack 7.2.1 de Juxi Technology.
keywords: [jetson, orin nano, edge ai, jetpack, nvidia, robotics]
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Kit de développement Jetson Orin Nano Super (8GB)

> **[Acheter en boutique](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)**

## Présentation

Le kit de développement NVIDIA® Jetson Orin Nano™ Super est le kit de
développement compact de la famille Jetson Orin — un petit ordinateur IA pour
développer des projets de vision par ordinateur, de robotique et d'IA générative
en périphérie. Juxi Technology vend le kit officiel NVIDIA dans sa boîte
d'origine, avec une série de documentation complète pour la base logicielle
JetPack 7.2.1 / L4T r39.2.1.

Points forts :

- **Jusqu'à 67 INT8 TOPS** de performances IA (sparse ; 33 dense) et jusqu'à **1,7× d'amélioration de l'IA générative** par rapport au kit d'origine *(NVIDIA)*
- **8 GB de mémoire LPDDR5 128 bits à 102 GB/s** *(NVIDIA)* — mémoire unifiée partagée par le CPU, le GPU et toutes les applications ; 8 GB est le plafond absolu pour toute charge de travail
- **GPU NVIDIA d'architecture Ampere à 1 024 cœurs avec 32 Tensor Cores** et un CPU Arm Cortex-A78AE à 6 cœurs jusqu'à 1,7 GHz *(NVIDIA)*
- **« Super » est une mise à niveau logicielle, pas un nouveau silicium** — les kits de développement Orin Nano existants obtiennent les fréquences GPU, mémoire et CPU plus élevées en mettant à jour JetPack *(NVIDIA)*
- **Alimentation configurable de 7 W à 25 W** *(NVIDIA)* — le mode d'alimentation par défaut est 25 W
- **Aucun eMMC, aucun stockage fourni par NVIDIA** — le logement microSD se trouve sur **la face inférieure du module**, plus deux logements M.2 Key-M pour SSD NVMe *(NVIDIA)* ; le pack Juxi ajoute une carte microSD de 64 GB
- **Logiciel actuel : JetPack 7.2.1** (Jetson Linux / L4T r39.2.1) *(NVIDIA)* — installé avec la méthode Jetson ISO depuis une clé USB ; aucun PC hôte Ubuntu séparé requis
- **Boîte d'origine officielle, vendue par Juxi Technology** — le pack ajoute un adaptateur secteur 19 V, un câble d'alimentation, une carte microSD de 64 GB et le module Wi-Fi M.2

**Cas d'usage** : petits LLM locaux et IA générative, analyse vidéo DeepStream,
robotique et développement ROS 2, éducation et prototypage.

## Spécifications

| Catégorie | Spécification |
|---|---|
| Kit | NVIDIA Jetson Orin Nano Super Developer Kit — module P3767 + carte porteuse P3768 ; numéro de pièce du kit complet P3766 *(NVIDIA)* |
| Performances IA | Jusqu'à 67 INT8 TOPS (sparse) / 33 INT8 TOPS (dense) ; jusqu'à 1,7× d'amélioration de l'IA générative par rapport au kit d'origine *(NVIDIA)* |
| GPU | Architecture NVIDIA Ampere, 1 024 cœurs CUDA + 32 Tensor Cores ; jusqu'à 1 020 MHz *(NVIDIA)* |
| CPU | Arm Cortex-A78AE v8.2 64 bits à 6 cœurs ; jusqu'à 1,7 GHz ; 1,5 MB de cache L2 + 4 MB de cache L3 *(NVIDIA)* |
| Mémoire | 8 GB LPDDR5 128 bits, 102 GB/s *(NVIDIA)* — partagée entre le CPU, le GPU et les applications |
| Stockage | Pas d'eMMC. Logement pour carte microSD sur la face inférieure du module (stockage principal) + 2× logements M.2 Key-M NVMe : 2280 (PCIe 3.0 x4) et 2230 (PCIe 3.0 x2) *(NVIDIA)* |
| Vidéo | Décodage jusqu'à 1× 4K60 (H.265), 2× 4K30, 5× 1080p60 ou 11× 1080p30 ; encodage 1080p30 avec 1-2 cœurs CPU (aucun encodeur matériel dédié) *(NVIDIA)* |
| Affichage | 1× DisplayPort 1.2 (+MST) — la seule sortie d'affichage ; le port USB-C ne délivre pas de signal d'affichage *(NVIDIA)*. Fiche boutique : « DP 1.2, jusqu'à 4K@60Hz » — les pages NVIDIA consultées n'indiquent pas de résolution d'affichage maximale |
| Réseau | 1× Gigabit Ethernet (RJ45) *(NVIDIA)* ; module sans fil M.2 Key-E inclus, décrit par NVIDIA comme un « contrôleur d'interface réseau sans fil 802.11ac/ab/gn » *(NVIDIA)*. Fiche boutique : Wi-Fi 5 bi-bande 2,4/5 GHz + Bluetooth 5.0 (les pages NVIDIA n'indiquent pas de version Bluetooth — considérer Bluetooth 5.0 comme non vérifié) |
| E/S | 4× USB 3.2 Type-A (10 Gbps, sur deux connecteurs doubles empilés), 1× USB-C (données uniquement ; modes Host, Device et USB Recovery), connecteur 40 broches (UART, SPI, I2S, I2C, GPIO), connecteur des boutons (12 broches), connecteur ventilateur 4 broches, prise d'alimentation DC (5,5 mm x 2,5 mm) *(NVIDIA)* |
| Caméra | 2× connecteurs MIPI CSI (22 positions, pas de 0,5 mm, contact inférieur) : CAM0 1x2 voies ; CAM1 1x2 ou 1x4 voies *(NVIDIA)* |
| Alimentation | 7 W – 25 W configurables *(NVIDIA)*. Mode par défaut : 25 W. MAXN SUPER est expérimental et disponible uniquement lorsque le kit est flashé avec la configuration `jetson-orin-nano-devkit-super` ou `jetson-orin-nano-devkit-super-maxn` *(NVIDIA)* |
| Dimensions | Fiche technique NVIDIA : 103 x 90,5 x 34,77 mm ; tableau des spécifications de la famille NVIDIA : 100 x 79 x 21 mm (dans les deux définitions : la hauteur inclut les pieds, la carte porteuse, le module et la solution thermique). NVIDIA n'a pas réconcilié les deux chiffres ; la boutique indique 100 x 79 x 21 mm |
| Système | Version actuelle : JetPack 7.2.1, incluant Jetson Linux (L4T) r39.2.1, installé avec la méthode Jetson ISO *(NVIDIA)* |
| Dans la boîte (pack boutique Juxi) | NVIDIA Jetson Orin Nano Super Developer Kit x1 (boîte d'origine officielle) ; adaptateur secteur 19 V x1 ; câble d'alimentation Type B (US, JP, CA, PH) x1 ; carte microSD 64 GB x1 ; module Wi-Fi M.2 x1 |
| Dans la boîte (NVIDIA) | Kit de développement (module Orin Nano 8GB avec dissipateur + carte porteuse de référence), alimentation 19 V, contrôleur d'interface réseau sans fil 802.11ac/ab/gn, guide de démarrage rapide *(NVIDIA)*. Aucun stockage amovible : « Le Jetson Orin Nano Developer Kit n'inclut pas de stockage amovible dans la boîte » *(NVIDIA)* |
| Garantie | 1 an, pour un usage de développement uniquement (fiche boutique) |

*Spécifications complètes : voir la fiche technique officielle de NVIDIA pour le
kit (liée depuis nvidia.com).*

> **Remarque de Juxi :** lorsque la fiche boutique et les chiffres officiels de NVIDIA
> diffèrent, cette page utilise le chiffre de NVIDIA et signale la différence.
> Éléments listés par la boutique que les pages NVIDIA ne confirment pas :
> Bluetooth 5.0 et la sortie d'affichage 4K@60Hz. La carte microSD de 64 GB
> incluse arrive **non pré-imageée** (vierge) ; NVIDIA recommande une carte
> UHS-1 de 64 GB ou plus. Prévoyez une installation complète de JetPack — voir
> Démarrage rapide ci-dessous.

## Démarrage rapide

1. **Vérifiez d'abord la version du micrologiciel.** JetPack 7.2.1 exige un micrologiciel
   Jetson UEFI/QSPI de la génération JetPack 6.x (version supérieure à 36.0).
   Si votre kit a un micrologiciel d'usine plus ancien, suivez le parcours de mise à
   jour JetPack 6.x avant l'installation — voir
   [Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates).
2. **Rassemblez ce que vous devez fournir** : un PC ou un ordinateur portable
   (Windows, macOS ou Linux) avec au moins 25 GB d'espace libre ; une clé USB
   de 16 GB ou plus ; et un écran DisplayPort avec clavier et souris USB, ou un
   câble série USB-TTL pour une configuration headless (sans écran).
3. **Choisissez votre stockage** : la carte microSD de 64 GB incluse
   (insérez-la dans le logement sur la face inférieure du module avant le
   démarrage) ou votre propre SSD NVMe dans un logement M.2 Key-M.
4. **Écrivez l'installateur** : téléchargez l'ISO Jetson de JetPack 7.2.1 et
   écrivez-la sur la clé USB. N'écrivez jamais l'ISO sur une carte microSD — les
   images pour carte SD ne sont pas prises en charge à partir de JetPack 7.2.
5. **Installez** : démarrez le kit depuis la clé USB et sélectionnez le
   stockage cible. Confirmez l'invite de capsule du micrologiciel avec **Y dans les
   30 secondes** — NVIDIA signale cette étape comme la plus souvent manquée.
6. **Premier démarrage** : terminez la configuration initiale d'Ubuntu, puis
   installez les composants JetPack.
7. Parcours complet : **[Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start)**

## Documentation (série Jetson Orin Nano)

- [Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start) · [Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates) · [Vérifier votre système](/fr/tutorials/jetson-orin-nano/verify-your-system)
- [Présentation du produit](/fr/tutorials/jetson-orin-nano/overview) · [Interfaces et disposition matérielle](/fr/tutorials/jetson-orin-nano/interfaces) · [Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting) · [FAQ](/fr/tutorials/jetson-orin-nano/faq)
- [Téléchargements](/fr/tutorials/jetson-orin-nano/downloads) · [Migration depuis JetPack 6.x](/fr/tutorials/jetson-orin-nano/jetpack-6-to-7) · [Glossaire](/fr/tutorials/jetson-orin-nano/glossary) · [Journal des modifications](/fr/tutorials/jetson-orin-nano/changelog)
- [Inférence LLM locale](/fr/tutorials/jetson-orin-nano/local-llm) · [Efficacité mémoire](/fr/tutorials/jetson-orin-nano/memory-efficiency) · [Analyse vidéo DeepStream](/fr/tutorials/jetson-orin-nano/deepstream) · [Robotique — état des lieux](/fr/tutorials/jetson-orin-nano/robotics) · [IA agentique (NemoClaw)](/fr/tutorials/jetson-orin-nano/agentic-ai)

## Accessoires recommandés

Parcourez le [catalogue Juxi Technology](https://wiki.juxitech.com/products/) —
caméras (IMX219 CSI, autofocus USB, profondeur RealSense), le
[Jetson Orin Radiator](https://www.juxitech.com/products/jetson-orin-radiator)
(listé en boutique pour Orin NX / Orin Nano SUPER), bras robotiques, capteurs et
plus encore.

## Support

- 📧 Support technique : support@juxitech.com
- 🌐 Site web : [www.juxitech.com](https://www.juxitech.com)
- 💬 Signaler des problèmes de documentation : [GitHub](https://github.com/Juxi-Technology/wiki-documents/issues)

## Sources

- [Guide utilisateur du kit de développement Jetson Orin Nano — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (vérifié le 2026-09-26)
- [Guide utilisateur du kit de développement Jetson Orin Nano — Démarrage rapide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (vérifié le 2026-09-26)
- [Guide utilisateur du kit de développement Jetson Orin Nano — Disposition matérielle](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (vérifié le 2026-09-26)
- [Guide utilisateur du kit de développement Jetson Orin Nano — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (vérifié le 2026-09-26)
- [Guide utilisateur du kit de développement Jetson Orin Nano — Parcours de mise à jour JetPack 6.x](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (vérifié le 2026-09-26)
- [Guide du développeur L4T r39.2 — Plateforme, alimentation et performances](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (vérifié le 2026-09-26)
- [Guide du développeur L4T r39.2 — séries Jetson Orin NX et Orin Nano : adaptation de module et bring-up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (vérifié le 2026-09-26)
- [Page de spécifications des modules et kits de développement NVIDIA Jetson Orin](https://developer.nvidia.com/embedded/jetson-orin) (vérifié le 2026-09-26)
- [NVIDIA Super Boost : le kit de développement Jetson Orin Nano bénéficie d'un boost Super](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (vérifié le 2026-09-26)
- [Fiche technique du Jetson Orin Nano Super Developer Kit (PDF, liée depuis nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (vérifié le 2026-09-26)
- [Page produit de la boutique Juxi Technology](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (vérifié le 2026-09-26)

*Statut : relu le 2026-10-11. Fondé sur la documentation
officielle NVIDIA aux dates indiquées ; pas encore vérifié sur matériel physique
par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est publiée
par Juxi Technology et ne constitue pas une publication de NVIDIA.
