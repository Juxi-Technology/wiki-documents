---
title: Glossaire
sidebar_label: Glossaire
slug: /appendix/glossary
description: >-
  Termes clés du NVIDIA Jetson Orin Nano Super Developer Kit (8 GB) — du
  versionnage de JetPack et L4T au flashage, en passant par les modes
  d'alimentation et la pile d'IA.
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Glossaire

Les termes qu'un nouvel utilisateur de Jetson rencontre en premier, par ordre
alphabétique. Les numéros de version reflètent la version actuelle pour ce kit
(**JetPack 7.2.1 / L4T r39.2.1**, vérifiés le 2026-09-26).

## Termes

| Terme | Signification |
|---|---|
| **BSP** | « Board support package » : la couche logicielle qui amorce la carte — bootloader, noyau, pilotes et système de fichiers racine. Dans JetPack, le BSP est Jetson Linux (L4T). Lors d'une installation par Jetson ISO, l'installateur écrit le BSP sur le périphérique de stockage que vous sélectionnez. |
| **capsule update** | Une mise à jour du micrologiciel d'amorçage QSPI. Lors d'une installation par Jetson ISO sur un kit avec un micrologiciel QSPI plus ancien, l'installateur vous invite à lancer une mise à jour de capsule : appuyez sur `Y` dans les 30 secondes, sinon l'installation échoue plus tard. La mise à jour se déroule en deux passes et le kit peut redémarrer entre les deux — c'est normal. |
| **carveout** | Une région de mémoire que le micrologiciel de démarrage réserve à un bloc matériel précis, comme l'affichage ou le pipeline caméra. Le système d'exploitation ne peut pas l'utiliser. Sur Orin Nano, ces réservations sont documentées, et vous pouvez les réduire en modifiant le BSP puis en reflashant le kit (voir [memory-efficiency](/fr/tutorials/jetson-orin-nano/memory-efficiency)). |
| **CUDA** | La plateforme de calcul parallèle et la boîte à outils de NVIDIA pour exécuter du code sur le GPU. JetPack 7.2.1 embarque CUDA 13.2.2. La capacité de calcul du GPU d'Orin est 8.7 (`sm_87`) ; les binaires GPU qui n'incluent pas `sm_87` retombent en exécution CPU (voir [local-llm](/fr/tutorials/jetson-orin-nano/local-llm)). |
| **cuDNN** | La bibliothèque de primitives d'apprentissage profond optimisées de NVIDIA, comme la convolution et les fonctions d'activation. Les frameworks d'apprentissage profond et TensorRT l'utilisent pour leurs opérations de base. JetPack 7.2.1 embarque cuDNN 9.20.0. |
| **DeepStream** | Le SDK de NVIDIA pour l'analyse vidéo multi-flux : il décode la vidéo, exécute l'inférence, suit les objets et produit les résultats. DeepStream 9.1 prend en charge la famille Jetson Orin sous JetPack 7.2. NVIDIA recommande le conteneur Docker comme voie d'installation la plus rapide pour les nouveaux utilisateurs (voir [deepstream](/fr/tutorials/jetson-orin-nano/deepstream)). |
| **DLA** | Deep Learning Accelerator : un moteur d'inférence à fonction fixe intégré à certains modules Jetson. Le module Orin Nano n'a pas de DLA ; l'inférence sur ce kit s'exécute donc sur le GPU. |
| **Edge-LLM** | TensorRT Edge-LLM : l'environnement d'exécution embarqué de NVIDIA pour les grands modèles de langage (LLM) et les modèles vision-langage (VLM). Sur Orin, il ne prend en charge que les moteurs FP16, INT8 et INT4 — les moteurs FP8 et FP4 ne s'exécutent pas — et les moteurs sont construits sur l'appareil lui-même (voir [local-llm](/fr/tutorials/jetson-orin-nano/local-llm)). |
| **eMMC** | Mémoire flash intégrée utilisée comme disque système sur certains modules Jetson. Le kit de développement est livré sans stockage : fournissez une carte microSD ou un SSD NVMe avant de commencer (voir [quick-start](/fr/tutorials/jetson-orin-nano/quick-start)). |
| **Force Recovery mode** | Un mode de démarrage spécial pour flasher le kit depuis un PC hôte. Entrez-y depuis le système en cours avec `sudo reboot --force forced-recovery`, ou kit éteint en court-circuitant les broches 9 et 10 du connecteur des boutons puis en branchant l'alimentation. Dans ce mode, le port USB-C transporte la connexion de flashage vers le PC hôte. |
| **JetPack** | Le bundle SDK de NVIDIA pour Jetson : le système d'exploitation, les pilotes, la pile CUDA et les bibliothèques. La version actuelle pour ce kit est JetPack 7.2.1, qui inclut Jetson Linux (L4T) r39.2.1. |
| **Jetson 6.x Update Path** | La procédure de pont micrologiciel pour les kits dont le micrologiciel UEFI/QSPI d'usine est antérieur à 36.0. Elle démarre une image-pont microSD JetPack 5.1.3 et planifie une mise à jour du bootloader (micrologiciel) ; après cela, le kit peut démarrer JetPack 6.x ou la Jetson ISO JetPack 7.2.1. Les kits avec un micrologiciel plus ancien doivent suivre ce parcours avant une installation par ISO (voir [quick-start](/fr/tutorials/jetson-orin-nano/quick-start)). |
| **Jetson ISO** | L'image d'installation USB unifiée pour JetPack 7.2 et versions ultérieures. Écrivez-la sur une clé USB avec un outil tel que Balena Etcher — ne l'écrivez pas sur une carte microSD — et notez qu'elle sert uniquement à installer, ce n'est pas un live USB. Pendant l'installation, vous choisissez la cible : la carte microSD ou le SSD NVMe. |
| **L4T** | Jetson Linux : le paquet de support de carte sous JetPack — le bootloader UEFI, le noyau, les pilotes et le système de fichiers racine Ubuntu. Pour JetPack 7.2.1, c'est r39.2.1, avec le noyau Linux 6.8 et un système de fichiers racine Ubuntu 24.04. |
| **MAXN SUPER** | Le mode d'alimentation le plus élevé du kit (mode 2) : CPU 1 728 MHz, GPU 1 020 MHz, mémoire 3 199 MHz. C'est un mode expérimental et il n'existe que lorsque le kit a été flashé avec la configuration Super. Sélectionnez-le dans le menu Power Mode du bureau, ou exécutez `sudo /usr/sbin/nvpmodel -m 2`. |
| **microSD (UHS-1)** | Le format de carte utilisé comme stockage système par défaut du kit. UHS-1 est une classe de vitesse SD ; NVIDIA recommande une carte microSD UHS-1 de 64 GB ou plus. Le logement se trouve sous le module, donc insérez la carte avant de démarrer l'installateur. |
| **nv_boot_control.conf / TNSPEC** | Le fichier embarqué `/etc/nv_boot_control.conf`, qui enregistre la configuration de la carte sous forme de chaîne TNSPEC. Le personnel NVIDIA note qu'une configuration Super affiche un suffixe `-super`, par exemple `TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-` ; si le suffixe est absent, les modes d'alimentation supérieurs ne sont pas disponibles. Après une installation par ISO, NVIDIA désigne cette entrée TNSPEC comme la référence pour les bonnes informations de carte. |
| **NVMe** | Un SSD sur le bus PCIe, installé dans l'un des logements M.2 Key-M de la carte porteuse : format 2280 (PCIe 3.0 x4) ou format 2230 (PCIe 3.0 x2). Un SSD NVMe peut héberger le système et est recommandé lorsque vous avez besoin de plus de capacité et de meilleures performances de stockage. |
| **nvpmodel** | L'outil de modes d'alimentation du kit. Exécutez `sudo /usr/sbin/nvpmodel -q` pour lister les modes disponibles sur votre système, et `sudo /usr/sbin/nvpmodel -m <mode_id>` pour changer de mode. Les mêmes modes sont dans le menu Power Mode du bureau. |
| **oem-config** | L'assistant de configuration du premier démarrage : contrat de licence, langue et clavier, réseau, et le nom d'utilisateur et mot de passe initiaux. Il s'exécute une fois, après le premier démarrage du système installé. |
| **QSPI** | La petite mémoire flash NOR du kit qui stocke le micrologiciel d'amorçage UEFI. JetPack 7.2 et versions ultérieures exigent un micrologiciel QSPI de génération JetPack 6.x (plus récent que la version 36.0) ; avec un micrologiciel plus ancien, l'installateur peut échouer ou le kit peut démarrer sur un écran noir. Voir [flashing-and-updates](/fr/tutorials/jetson-orin-nano/flashing-and-updates). |
| **SDK Manager** | L'outil pour PC hôte de NVIDIA qui flashe le BSP et installe les composants JetPack via USB. L'hôte documenté est un PC x86 sous Ubuntu. C'est l'alternative à la méthode Jetson ISO sur l'appareil. |
| **SO-DIMM** | Le facteur de forme du connecteur du module : un SO-DIMM à 260 broches, 69,6 mm x 45 mm. Le module se branche dans le logement SO-DIMM de la carte porteuse, et le même logement accepte aussi un module Jetson Orin NX. |
| **Super Mode** | La configuration logicielle de puissance et de fréquences de NVIDIA pour l'Orin Nano — pas un matériel différent. Les kits existants obtiennent le gain « Super » par une mise à jour logicielle JetPack, et sur ce kit les modes d'alimentation supérieurs n'apparaissent que s'il a été flashé avec la configuration Super. |
| **TensorRT** | L'optimiseur et l'environnement d'exécution d'inférence de NVIDIA. Il compile un modèle entraîné en un moteur TensorRT — un fichier propre à l'appareil, construit pour le GPU cible — et exécute ce moteur efficacement. JetPack 7.2.1 embarque TensorRT 10.16.2. |
| **TOPS** | Mille milliards (tera) d'opérations par seconde, l'unité courante du débit d'IA. Ce kit est annoncé jusqu'à 67 TOPS INT8 sparse (33 INT8 dense). NVIDIA publie à la fois une valeur sparse et une valeur dense pour le même module. |
| **UEFI** | Le micrologiciel de démarrage du kit et son menu de configuration. Appuyez sur Esc pendant l'écran de démarrage NVIDIA pour entrer dans la configuration ; dans le menu, le Boot Manager est l'endroit où vous sélectionnez la clé USB d'installation comme périphérique de démarrage. La version du micrologiciel y est affichée, et JetPack 7.2 et versions ultérieures exigent une version plus récente que 36.0. |
| **unified memory** | L'unique pool de mémoire LPDDR5 de 8 GB partagé par le CPU et le GPU — le kit n'a pas de mémoire vidéo séparée. Environ 7,6 GB sont utilisables après les réservations du micrologiciel et du noyau, et le système d'exploitation, vos modèles et leurs caches KV puisent tous dans ce seul pool. Voir [memory-efficiency](/fr/tutorials/jetson-orin-nano/memory-efficiency). |
| **VPI** | Vision Programming Interface : la bibliothèque de NVIDIA pour le traitement d'images accéléré par le matériel sur Jetson. JetPack 7.2.1 embarque VPI 4.1.4. |

## Correspondance des versions

La correspondance de versions la plus utile à mémoriser :

| JetPack | Jetson Linux (L4T) | Ubuntu | Noyau | CUDA |
|---|---|---|---|---|
| **7.2.1** (actuelle) | **r39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.2.3 (dernière version de JetPack 6) | r36.5.2 | 22.04 | 5.15 | 12.6 |

Pour vérifier ce qu'exécute réellement un système donné :
`cat /etc/nv_tegra_release`
(voir [verify-your-system](/fr/tutorials/jetson-orin-nano/verify-your-system)).

## Sources

- [Jetson Orin Nano Developer Kit — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (vérifié le 2026-09-26)
- [Jetson Orin Nano Developer Kit — Guide de démarrage rapide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (vérifié le 2026-09-26)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (vérifié le 2026-09-26)
- [Jetson Orin Nano Developer Kit — Guides pratiques (How-to)](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (vérifié le 2026-09-26)
- [Téléchargements du SDK JetPack](https://developer.nvidia.com/embedded/jetpack/downloads) — ⚠️ son tableau des composants est en retard ligne par ligne (les lignes VPI et PVA portent encore les valeurs de JetPack 7.2) ; pour les versions des composants, utilisez plutôt [le dépôt de paquets de NVIDIA](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) (vérifié le 2026-09-26)
- [Notes de version Jetson Linux r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (vérifié le 2026-09-26)
- [TensorRT Edge-LLM — Matrice de prise en charge](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (vérifié le 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson (blog technique NVIDIA)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (vérifié le 2026-09-26)
- [Jetson Orin Nano Series — Power and Performance (Developer Guide L4T r39.2)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (vérifié le 2026-09-26)
- [NVIDIA Jetson Orin family — spécifications](https://developer.nvidia.com/embedded/jetson-orin) (vérifié le 2026-09-26)
- [DeepStream SDK — Installation](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (vérifié le 2026-09-26)
- [Forum NVIDIA — « 25W and MAXN_SUPER not seen in JetPack 7.2 » (réponse du personnel NVIDIA)](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (vérifié le 2026-09-26)

*Statut : brouillon, en attente de révision par cheny. Définitions compilées à
partir de la documentation NVIDIA et de l'usage courant du secteur ; numéros
de version vérifiés à la date indiquée. Pas encore vérifié sur matériel
physique par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et n'est pas une publication de NVIDIA.
