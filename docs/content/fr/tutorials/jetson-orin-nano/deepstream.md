---
title: Pipelines d'analyse vidéo — DeepStream 9.1
sidebar_label: Analyse vidéo DeepStream
slug: /tutorials/deepstream
description: >-
  Exécuter NVIDIA DeepStream 9.1 sur le kit de développement Jetson Orin Nano
  Super (8GB) — correspondance des versions, installation, limites de décodage,
  mémoire et sortie RTSP headless.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.ultralytics.com/guides/nvidia-jetson/
    checked: 2026-09-26
review_owner: cheny
---

# Pipelines d'analyse vidéo — DeepStream 9.1

DeepStream est le SDK de NVIDIA pour construire des pipelines d'analyse vidéo
intelligente (IVA) accélérés, et DeepStream 9.1 est la version qui s'exécute
sur Jetson Orin sous JetPack 7.2. Cette page couvre la correspondance des
versions, les voies d'installation, les limites de décodage, les attentes de
première exécution, la sortie RTSP headless et les notes mémoire pour le kit de
développement Orin Nano Super 8 GB.

## 1. Correspondance des versions

**DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔ TensorRT
10.16.1.7 ↔ GStreamer 1.24.2** (image Docker `deepstream:9.1`), comme indiqué
dans le tableau *Platform and OS Compatibility* du
[DeepStream Installation Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html).

DeepStream 8.0 et 9.0 ne listaient que **l'AGX Thor** ; 9.1 est la première
version 9.x dont la ligne inclut Jetson Orin (« AGX Thor, Jetson Orin ») — la
ligne dit **« Jetson Orin »** en tant que groupe ; des lignes antérieures
(DS 6.3 à DS 7.1) nommaient explicitement « Orin nano ». Aucune note de version
9.1 confirmant spécifiquement l'Orin Nano n'a été trouvée — considérez la
prise en charge comme implicite via le libellé de groupe (non encore
confirmée). Kit de référence : JetPack 7.2.1 / L4T r39.2.1.

## 2. Ce que ce kit peut décoder

Le décodeur [Gst-nvvideo4linux2](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html)
utilise le moteur matériel NVDEC et prend en charge **H.264, H.265, AV1,
JPEG et MJPEG**. Capacités publiées du module Orin Nano :

| Capacité | Spécification |
|---|---|
| Décodage vidéo (H.265) | 1x 4K60 · 2x 4K30 · 5x 1080p60 · 11x 1080p30 |
| Encodage vidéo | Pas d'encodeur matériel — « 1080p30 pris en charge par 1 à 2 cœurs CPU » |
| DLA · PVA | Aucun |

L'inférence s'exécute dans le plugin [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html)
sur des moteurs TensorRT : modèles FP16, FP32 et INT8 (FP16 et INT8 dépendent
de la plateforme) ; INT8 nécessite un fichier de calibration. L'option
`enable-dla` du plugin n'a pas de moteur à cibler sur ce module — la page
produit de l'Orin Nano liste « DL Accelerator: - » et « Vision Accelerator: - ».

**À 8 GB :** les trames décodées, les moteurs et la mémoire applicative
partagent un seul pool, sans DLA pour déporter du travail. L'échantillon
« 30 flux » ci-dessous décode 30 flux 1080p ; la capacité de décodage publiée
de ce module est de 11x 1080p30 (H.265), donc prévoyez moins de flux ou une
résolution inférieure. Il n'y a **pas non plus d'encodeur vidéo matériel** — la
sortie encodée (par exemple, le streaming RTSP) s'exécute sur le CPU.

## 3. Installation — Docker d'abord

Le guide de NVIDIA dit : « Recommandé pour les nouveaux utilisateurs : utilisez
la méthode 4 (conteneur Docker) pour une installation des plus rapides, sans
dépendances. » Les quatre méthodes Jetson :

| Méthode | De quoi s'agit-il |
|---|---|
| 1 — SDK Manager | Sélectionnez **DeepStreamSDK** sous « Additional SDKs » avec les composants de JetPack 7.2 GA. |
| 2 — paquet tar | `deepstream_sdk_v9.1.0_jetson.tbz2`, un artefact de release GitHub. |
| 3 — paquet Debian | `deepstream-9.1_9.1.0-1_arm64.deb`. |
| 4 — Docker (recommandée) | Conteneurs Jetson sur NGC (`nvcr.io`). |

Les conteneurs Jetson sont
`nvcr.io/nvidia/deepstream:9.1-samples-multiarch` (applications de référence,
modèles et configurations d'exemple) et
`nvcr.io/nvidia/deepstream:9.1-triton-multiarch` (plus les bibliothèques devel
et les backends Triton). Prérequis : `docker-ce`, le NVIDIA Container Toolkit,
un compte NGC et `docker login nvcr.io` (nom d'utilisateur `$oauthtoken`, mot
de passe = votre clé API NGC).

> **Important** : NVIDIA déclare : « les conteneurs Docker Jetson sont destinés
> au déploiement uniquement. Ils ne prennent pas en charge le développement
> logiciel DeepStream dans un conteneur. » Construisez vos applications
> nativement sur le kit et ajoutez vos binaires à votre propre image.

Dans Docker, exécutez plutôt `user_additional_install.sh` (voir la note EOS
ci-dessous). Le message « Failed to detect NVIDIA driver version » du conteneur
Triton est inoffensif.

> **Astuce Juxi :** pour une installation minimale de l'hôte, sélectionnez
> uniquement « Jetson OS » dans SDK Manager, puis exécutez
> `sudo apt install docker.io`, `sudo apt install nvidia-container`,
> `sudo apt install nvidia-l4t-gstreamer` et `sudo service docker restart`.

## 4. Augmenter les fréquences — avec un mode d'alimentation propre à ce kit

```bash
sudo nvpmodel -m 2
sudo jetson_clocks
```

Cité du démarrage rapide : « Pour les modules Jetson Orin Nano, utilisez
sudo nvpmodel -m 2 au lieu de -m 0 pour activer le mode MAXN SUPER. Pour
tous les autres modules Jetson Orin (y compris Orin NX), utilisez -m 0. »
Exécutez ces commandes avant de lancer des applications DeepStream. Sur un kit
8 GB configuré Super, les modes d'alimentation sont **15W (mode 0)**,
**25W (mode 1, par défaut)** et **MAXN_SUPER (mode 2)** ; MAXN_SUPER n'existe
que sur les unités flashées en configuration Super.

> **Attention** : si 25W / MAXN SUPER est absent, ou si `nvpmodel -m 2`
> signale un mode d'alimentation invalide, l'unité n'a pas été flashée avec la
> configuration Super. Voir
> [Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting).

## 5. Première exécution — les moteurs TensorRT se construisent au premier usage

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

Cité du démarrage rapide : pour un modèle sans fichier de moteur existant,
« la génération du fichier et le lancement de l'application peuvent prendre
jusqu'à quelques minutes (selon la plateforme et le modèle). Lors des
exécutions ultérieures, ces fichiers de moteur générés peuvent être réutilisés
pour un chargement plus rapide. » Les métriques FPS défilent dans le terminal.
Le « (~30 FPS for this configuration) » du démarrage rapide est le chiffre
générique de la documentation — ce n'est **pas une mesure de l'Orin Nano**. Si
l'application ne parvient pas à créer les éléments Gst, videz le cache et
réessayez :
`rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`. D'autres
configurations d'exemple couvrent les caméras USB et CSI, ainsi que le suivi
avec inférence secondaire.

## 6. Fonctionnement headless avec sortie RTSP

Le démarrage rapide documente comment exécuter sans écran : les configurations
par défaut utilisent le moteur de rendu `nveglglessink` basé sur EGL (`type=2`
dans les groupes `[sink]`), qui nécessite un serveur X en cours d'exécution.
Ajoutez plutôt un groupe de sink de sortie RTSP — le groupe `[sink2]` dans
`source30_1080p_dec_infer-resnet_tiled_display.txt` en est l'exemple — et
mettez `enable=0` pour le groupe de sink EGL. La sortie RTSP encodée s'exécute
sur le CPU (section 2 : pas d'encodeur matériel).

> **Remarque de Juxi :** avec les flux RTSP, l'application peut rester bloquée
> en approchant de l'EOS (un problème d'`rtpjitterbuffer`). En bare metal,
> exécutez une fois `update_rtpmanager.sh` dans
> `/opt/nvidia/deepstream/deepstream/`, après avoir installé les paquets de
> dépendances du démarrage rapide. Dans Docker, exécutez plutôt
> `user_additional_install.sh`.

## 7. Planification mémoire pour 8 GB

Le blog efficacité mémoire de NVIDIA déclare : « module Jetson Orin Nano 8 GB :
sur les 8 GB de DRAM physique, environ 7,6 GB sont utilisables après les
réservations du micrologiciel et du noyau. » Le CPU et le GPU partagent ce
pool. Leviers documentés pour les pipelines de style DeepStream :

| Levier | Mémoire récupérable |
|---|---|
| Exécuter en bare metal plutôt qu'en conteneur | Jusqu'à 70 MB |
| Passer d'applications Python à C++ | Jusqu'à 84 MB |
| Désactiver Tiler/OSD et utiliser FakeSink | Jusqu'à 258 MB |
| **Total** | **412 MB** |

Désactiver Tiler/OSD et utiliser FakeSink « supprime des étapes d'affichage
nécessaires à la visualisation mais inutiles dans les déploiements headless ou
de production. Cela économise de la mémoire, réduit la charge GPU et améliore
le débit. » Cela s'associe au parcours RTSP headless ci-dessus ; désactiver le
bureau graphique peut libérer jusqu'à 865 MB. Pour le playbook complet des
8 GB, voir [Efficacité mémoire sur
8 GB](/fr/tutorials/jetson-orin-nano/memory-efficiency).

## Ce que NVIDIA ne publie pas pour ce kit

La page de performances officielle de DeepStream 9.1 pour Jetson ne couvre que
deux plateformes : **Jetson AGX Thor** et **Jetson AGX Orin**. Aucun chiffre
FPS pour l'Orin Nano n'est publié ; ne lisez pas les lignes AGX Orin comme des
performances d'Orin Nano. Pour dimensionner, partez de la capacité de décodage
(section 2), puis baissez le nombre de flux et la résolution jusqu'à ce que le
pipeline tienne.

Pour le point de donnée publié le plus proche, les [benchmarks Jetson
d'Ultralytics](https://docs.ultralytics.com/guides/nvidia-jetson/) rapportent
YOLO26n sur l'Orin Nano Super à ~4,57 ms/image (~219 FPS) avec un moteur
TensorRT FP16 et ~3,80 ms/image (~263 FPS) avec INT8, à une entrée de 640 —
**données fournisseur, mesurées sur un logiciel de l'ère JetPack 6.1, pas sur
la pile 7.2.1 de ce kit** ; le temps d'inférence exclut le pré/post-traitement.
Selon la même source, seuls les formats d'export PyTorch, TorchScript et
TensorRT utilisent le GPU — les autres formats d'export s'exécutent sur le CPU.

## Dépannage et lectures complémentaires

- Problèmes au niveau système (modes d'alimentation, stockage, affichage) :
  [Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting) ·
  [Efficacité mémoire sur 8 GB](/fr/tutorials/jetson-orin-nano/memory-efficiency).
- Modèles hors DeepStream : [Inférence LLM
  locale](/fr/tutorials/jetson-orin-nano/local-llm) · référence de performance
  officielle :
  [DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html).

## Sources

- [DeepStream Installation Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (vérifié le 2026-09-26)
- [DeepStream Quickstart Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (vérifié le 2026-09-26)
- [DeepStream Docker Containers](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html) (vérifié le 2026-09-26)
- [DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) (vérifié le 2026-09-26)
- [Gst-nvvideo4linux2 (hardware decoder)](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html) (vérifié le 2026-09-26)
- [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html) (vérifié le 2026-09-26)
- [Jetson Orin modules — decode, encode, and accelerator specifications](https://developer.nvidia.com/embedded/jetson-orin) (vérifié le 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson (developer blog)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (vérifié le 2026-09-26)
- [Jetson Linux r39.2 Developer Guide — Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (vérifié le 2026-09-26)
- [Ultralytics — NVIDIA Jetson guide (benchmarks fournisseur)](https://docs.ultralytics.com/guides/nvidia-jetson/) (vérifié le 2026-09-26)

*Statut : brouillon, en attente de relecture par cheny. Fondé sur la
documentation officielle NVIDIA à la date indiquée ; pas encore vérifié sur
matériel physique par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
