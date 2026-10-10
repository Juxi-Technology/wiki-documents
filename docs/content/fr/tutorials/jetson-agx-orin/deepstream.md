---
title: Analyse vidéo multi-flux — DeepStream 9.1
sidebar_label: Analyse vidéo DeepStream
slug: /tutorials/deepstream
description: >-
  Installez DeepStream 9.1 sur le kit de développement AGX Orin et exécutez
  l'application de référence d'analyse vidéo — avec les options d'installation
  officielles, les configurations d'exemple et les notes spécifiques à JP7.2.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-24
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: its component table lags on some rows (VPI/PVA still show 7.2 values) — see the Sources caveat
review_owner: cheny
---

# Analyse vidéo multi-flux — DeepStream 9.1

DeepStream est le framework de NVIDIA pour construire des pipelines
d'analyse vidéo intelligente (IVA) accélérés, et **DeepStream 9.1 est fourni
avec JetPack 7.2** sur Jetson Orin. Ce tutoriel suit la documentation
officielle d'installation et de démarrage rapide de NVIDIA ; chaque commande
ci-dessous est tirée de ces pages (ou directement résumée à partir de
celles-ci).

**Correspondance des versions :** DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔
CUDA 13.2 ↔ TensorRT 10.16.1.7 ↔ Ubuntu 24.04 ↔ GStreamer 1.24.2 *(selon le
tableau de compatibilité de NVIDIA)*.

## 1. Installation

NVIDIA propose quatre méthodes d'installation sur Jetson ; la note officielle
recommande **Docker pour les nouveaux utilisateurs** (la plus rapide, sans
dépendances) :

- **Méthode 4 — Docker (recommandée pour les nouveaux utilisateurs) :** utilisez les conteneurs NGC DeepStream — voir [Docker Containers](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html).
- **Méthode 1 — SDK Manager :** sélectionnez **DeepStreamSDK** sous « Additional SDKs » avec les composants de JetPack 7.2 GA.
- **Méthode 2 — paquet tar :** téléchargez `deepstream_sdk_v9.1.0_jetson.tbz2` (depuis [NVIDIA/DeepStream releases](https://github.com/DeepStream/releases/tag)), puis :
  ```bash
  sudo tar -xvf deepstream_sdk_v9.1.0_jetson.tbz2 -C /
  cd /opt/nvidia/deepstream/deepstream-9.1
  sudo ./install.sh
  sudo ldconfig
  ```
- **Méthode 3 — paquet Debian :** installez `deepstream-9.1_9.1.0-1_arm64.deb` avec `sudo apt-get install ./deepstream-9.1_9.1.0-1_arm64.deb`.

**Paquets prérequis** (liste officielle des dépendances pour l'installation
native) :

```bash
sudo apt install \
libssl3 libssl-dev libcurl4-openssl-dev \
libgstreamer1.0-0 gstreamer1.0-tools gstreamer1.0-plugins-good \
gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav \
libgstreamer-plugins-base1.0-dev libgstrtspserver-1.0-0 \
libjansson4 libyaml-cpp-dev libmosquitto1
```

> **Remarque de Juxi :** si vous rencontrez le problème RTSP documenté
> (applications bloquées en EOS avec les flux RTSP), exécutez le script
> `update_rtpmanager.sh` dans `/opt/nvidia/deepstream/deepstream/` après avoir
> installé les paquets ci-dessus.

## 2. Augmenter les fréquences d'horloge (avant toute exécution)

```bash
sudo nvpmodel -m 0
sudo jetson_clocks
```

NVIDIA signale une exception : le **Jetson Orin Nano** utilise `-m 2` pour
MAXN SUPER ; tous les autres modules Orin (y compris l'AGX Orin) utilisent
`-m 0`. Exécutez ces commandes avant de lancer les applications DeepStream.

## 3. Exécuter l'application de référence

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

Ce à quoi s'attendre (selon NVIDIA) : un affichage en mosaïque de 30 flux
1080p simulés avec inférence ResNet, ainsi que des métriques de performance —
**~30 FPS pour cette configuration** — affichées dans le terminal. Cliquez sur
une tuile pour l'agrandir ; un clic droit vous ramène à la vue en mosaïque.

Fichiers de configuration utiles à explorer (tous dans ce répertoire) :

| Configuration | Cas d'usage |
|---|---|
| `source30_1080p_dec_infer-resnet_tiled_display.txt` | Benchmark sur 30 flux |
| `source4_1080p_dec_infer-resnet_tracker_sgie_tiled_display.txt` | Suivi (tracking) + inférence secondaire |
| `source1_usb_dec_infer_resnet.txt` | **Caméra USB unique** |
| `source1_csi_dec_infer_resnet.txt` · `source2_csi_usb_dec_infer_resnet.txt` | Configurations avec **caméra CSI** (la prise en charge des pilotes dépend de votre caméra) |
| `source2_1080p_dec_infer-resnet_demux.txt` | Exemple de demux |

Remarques issues du démarrage rapide officiel :

- **La première exécution avec un nouveau modèle prend plusieurs minutes**, le
  temps que le moteur TensorRT soit généré ; les exécutions suivantes le
  réutilisent.
- Si les éléments GStreamer ne s'initialisent pas, videz le cache : `rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`
- **Fonctionnement headless (sans moniteur) :** le sink EGL par défaut nécessite
  un affichage. Les configurations prennent en charge à la place un **sink de
  sortie RTSP** (voir le groupe `[sink2]` dans la configuration à 30 flux) —
  diffusez les résultats vers une autre machine.
- Toutes les applications d'exemple précompilées se trouvent sous
  `/opt/nvidia/deepstream/deepstream-9.1/samples/` — chacune dispose d'un README.

## 4. Nouveautés autour de DeepStream 9.1 sur JetPack 7.2

- **Pipelines assistés par agent :** NVIDIA documente un *DeepStream Coding
  Agent* (prise en charge d'un agent IA pour construire des pipelines) —
  [documentation](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_AI_Agent.html) · [GitHub](https://github.com/DeepStream_Coding_Agent).
- **LLM/VLM dans le pipeline :** les applications de référence incluent un
  **deepstream-vllm-plugin** pour combiner les pipelines vidéo avec le
  raisonnement de grands modèles — voir [la
  documentation](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_ref_app_vllm_plugin.html).
  Pour l'inférence de modèles sur l'appareil en dehors de DeepStream, voir
  [Inférence LLM locale](/fr/tutorials/jetson-agx-orin/local-llm).
- **Triton sur l'appareil :** pour exécuter Triton Inference Server nativement
  (sans Docker), exécutez `sudo ./triton_backend_setup.sh` dans le répertoire
  des exemples (installe Triton 2.68.0 pour Jetson).

## Dépannage et lectures complémentaires

- [DeepStream Troubleshooting & FAQ](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_troubleshooting.html)
- [Optimisation des performances](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) — nécessaire dès que vous dépassez les configurations de référence
- [Configurations d'exemple expliquées](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_sample_configs_streams.html)
- Problèmes au niveau du système (affichage, alimentation, stockage) : voir [Dépannage](/fr/tutorials/jetson-agx-orin/troubleshooting)

## Sources

- [DeepStream Installation Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (vérifié le 2026-09-24)
- [DeepStream Quickstart Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (vérifié le 2026-09-24)
- [page de téléchargement de JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-24) — ⚠️ son tableau des composants est en retard sur certaines lignes ; pour les versions réellement installées, voir [Téléchargements](/fr/tutorials/jetson-agx-orin/downloads)

*Statut : relu le 2026-10-11. Fondé sur la
documentation officielle NVIDIA à la date indiquée ; pas encore vérifié sur
matériel physique par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
