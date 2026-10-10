---
title: Efficacité mémoire — exécuter des modèles dans 8 GB
sidebar_label: Efficacité mémoire
slug: /tutorials/memory-efficiency
description: >-
  Les leviers documentés pour faire tenir des charges LLM, VLM et vision dans
  les 8 GB de mémoire unifiée du kit de développement Jetson Orin Nano Super —
  plateforme, modèle et mesure.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/ram-optimization/
    checked: 2026-09-26
review_owner: cheny
---

# Efficacité mémoire — exécuter des modèles dans 8 GB

Sur le kit Orin Nano Super, les 8 GB de mémoire unifiée sont une limite stricte
pour tout : le système d'exploitation, le bureau, les services et le modèle
lui-même. Les leviers documentés se répartissent en trois couches —
**plateforme**, **modèle** et **mesure** — et cette page signale quand une
technique n'est documentée que pour un module plus grand.

## Le budget de 8 GB en chiffres clairs

- Environ **7,6 GB des 8 GB sont utilisables** après les réservations du
  micrologiciel et du noyau — le budget que le blog efficacité mémoire de
  NVIDIA utilise pour tous ses chiffres de « mémoire disponible ».
- La mémoire CPU et la mémoire GPU (CUDA, tampons multimédia) proviennent du
  **même pool physique** ; réduire l'une aide l'autre.
- La démonstration phare du blog — un pipeline VLM de 2B de paramètres — tourne
  à **4,5 / 7,6 GB (~60 %)**.

## Levier 1 — Couche plateforme : ce qu'occupent le système et les services

Les économies ci-dessous proviennent du blog efficacité mémoire de NVIDIA.

| Levier | Économie documentée | Comment |
|---|---|---|
| Désactiver le bureau graphique (headless) | Jusqu'à 865 MB | `sudo systemctl set-default multi-user.target` |
| Désactiver les services réseau et de journalisation | Jusqu'à 32 MB | `sudo systemctl disable <service-name>` |
| Carveouts d'affichage et de caméra | Environ 100 MB au total | Édition du device tree BSP, puis reflashage |
| Réservation SWIOTLB | Environ 4 MB | Argument de noyau `swiotlb=2048`, uniquement si des problèmes DMA apparaissent |
| Pipeline de style DeepStream | Jusqu'à 412 MB | Du conteneur au bare metal (70 MB) ; de Python à C++ (84 MB) ; désactiver Tiler/OSD et utiliser FakeSink (258 MB) — voir [Analyse vidéo DeepStream](/fr/tutorials/jetson-orin-nano/deepstream) |
| Choix du framework d'inférence | Éviter plus de 2,7 GB de surcoût | Runtimes légers (runtime C++, llama.cpp) ; un framework plus lourd peut ajouter plus de 2,7 GB à lui seul à l'initialisation |

> **Remarque de Juxi :** les modifications de carveouts sont des changements du
> code source BSP : elles nécessitent un reflashage et économisent peu. Changez
> une chose à la fois et gardez une image de flashage fonctionnelle — voir
> [Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates).

**Le swap n'est pas une économie, mais une soupape de pression.** Le tutoriel
d'optimisation de la RAM du fournisseur remplace ZRAM par un **fichier de swap
de 16 GB sur NVMe** (`sudo systemctl disable nvzramconfig` d'abord) ; la démo
8 GB de NVIDIA supposait environ **2 GB de swap utilisés au pic**.

### Après l'arrêt d'un serveur, libérez le cache

L'utilisation de la mémoire peut rester élevée après l'arrêt d'un serveur vLLM
ou SGLang, ou d'un conteneur Docker (problème connu 5661165 de L4T r39.2.1).
La commande de NVIDIA :

```bash
sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
```

Le même correctif s'applique quand une construction de moteur Edge-LLM manque
de mémoire : `sudo sysctl -w vm.drop_caches=3` plus des limites de construction
plus petites (tutoriel fournisseur).

### Les modes d'alimentation changent les fréquences, pas la capacité

| Mode d'alimentation | ID du mode | Fréquence CPU max | Fréquence GPU max | Fréquence mémoire max |
|---|---|---|---|---|
| 15W | 0 | 1 497,6 MHz | 612 MHz | 2 133 MHz |
| 25W (par défaut) | 1 | 1 344 MHz | 918 MHz | 3 199 MHz |
| MAXN_SUPER | 2 | 1 728 MHz | 1 020 MHz | 3 199 MHz |

Les fréquences maximales ci-dessus proviennent des tableaux Power and Performance
de NVIDIA pour r39.2. Les modes d'alimentation changent les fréquences
d'horloge, pas la taille de la mémoire — un modèle qui ne tient pas ne tiendra
pas davantage dans un mode plus rapide. Basculez avec `sudo nvpmodel -q`
(liste) et `sudo nvpmodel -m <mode_id>` ; MAXN_SUPER nécessite la configuration
de flashage Super et est expérimental (selon ces tableaux). Si 25W ou MAXN SUPER
est absent, voir [Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting).

> **Attention :** une allocation mémoire CUDA excessivement grande peut
> **redémarrer l'appareil** (problème connu 5699079 de L4T r39.2.1). Conseil
> des mêmes notes de version : assurez-vous que CUDA et les autres applications
> ne demandent pas plus de mémoire que ce qui est physiquement disponible, et
> lancez les processus CUDA avec des scores OOM plus élevés pour que les
> processus système ne soient pas tués.

## Levier 2 — Couche modèle : ce qu'occupent le modèle et son cache

### La quantification est le plus grand levier isolé

L'Orin exécute **uniquement des moteurs FP16, INT8 et INT4** ; FP8 et FP4 ne
s'exécutent pas sur l'Orin (classe Thor/Blackwell). Pour TensorRT Edge-LLM,
utilisez des checkpoints **INT4 AWQ ou INT4 GPTQ**, évitez INT8 GPTQ, et ne
choisissez jamais de checkpoints FP8, MXFP8, FP4 ou NVFP4. Voir [Inférence LLM
locale](/fr/tutorials/jetson-orin-nano/local-llm).

Chiffres de première main : Qwen3 8B de FP16 à W4A16 récupère environ **10 GB** ;
Qwen3 4B de BF16 à INT4 récupère environ **5,6 GB**. Le graphique de NVIDIA pour
le cas 4B est légendé « Jetson Orin NX 16 GB » — un module plus grand, donc
traitez ces chiffres comme référence, pas comme une promesse pour 8 GB.

Avec une quantification 4 bits et un runtime efficace, l'enveloppe documentée
par NVIDIA pour ce budget est de **LLM jusqu'à ~10B de paramètres et de VLM
jusqu'à ~4B de paramètres**.

### Ce que NVIDIA benchmarke réellement sur 8 GB

TensorRT Edge-LLM publie des lignes Orin Nano 8GB pour des modèles de 0,6B à 2B
de paramètres (familles Qwen3 et Qwen3.5) ; **2B est le plus grand modèle que
NVIDIA benchmarke sur ce module**. Une démonstration pas-à-pas 4B INT4 AWQ
existe en tant que tutoriel fournisseur (environ 2 GB de poids), mais aucun
chiffre officiel pour 4B n'est publié.

### Mémoire de construction des moteurs (TensorRT Edge-LLM)

- `--externalize-weights int4_ffn` (dense) ou `--externalize-weights
  int4_ffn int4_moe` (MoE) réduit la mémoire de construction des moteurs sur
  les appareils Orin à mémoire système plus faible.
- Limites adaptées à l'Orin Nano issues du tutoriel fournisseur :
  `llm_build --maxBatchSize 1 --maxInputLen 512 --maxKVCacheCapacity 1024`.
  Si la construction manque encore de mémoire, libérez d'abord la mémoire
  système et réduisez davantage, par exemple `--maxInputLen 256
  --maxKVCacheCapacity 512`. Les moteurs se construisent sur l'appareil et ne
  sont pas portables entre modules.

### Cache KV : dimensionnement et réutilisation

Le cache KV croît avec la longueur de contexte, la taille de batch et la
concurrence ; il fait partie du budget mémoire, ce n'est pas un détail de
dernière minute.

- Les limites de construction le bornent : `--maxInputLen` et
  `--maxKVCacheCapacity` ; les builds de benchmark Orin Nano utilisaient
  maxInputLen 2048 et maxKVCacheCapacity 2200, batch 1.
- **La réutilisation du cache KV** est une capacité documentée du runtime
  Edge-LLM : un cache local au processus, adressé par contenu, pour les
  préfixes d'entrée répétés — l'état de prefill des documents, des tours
  précédents, des continuations générées et des préfixes d'images répétés est
  réutilisé au lieu d'être recalculé.
- Un fichier de modèle qui tient peut quand même échouer : un rapport
  communautaire montre des fichiers GGUF de 7,4 GB et 16 GB échouant avec une
  erreur d'allocation du cache KV sur une carte 8 GB — ajoutez le cache KV et
  le surcoût du runtime quand vous vérifiez si ça tient.
- **La réduction du vocabulaire** (génération restreinte à un sous-ensemble de
  jetons spécifique à une tâche) et **l'élagage des jetons visuels (DART)**
  (les jetons visuels dupliqués écartés avant le prefill) sont des pages de
  fonctionnalités documentées d'Edge-LLM. La construction du moteur visuel
  prend aussi des limites de jetons d'image : `--minImageTokens`,
  `--maxImageTokens`, `--maxImageTokensPerImage`.

> **Important :** le cache KV FP8 — l'économie d'environ 50 % de mémoire du
> cache KV — nécessite SM89 ou plus récent (Ada Lovelace et au-delà). L'Orin est
> SM87, il n'est donc **pas disponible sur ce kit**. Utilisez le cache KV FP16.

### Un avant/après fourni par NVIDIA

L'étude de cas 8 GB de NVIDIA (blog efficacité mémoire, tableau 7) : mode
headless au lieu du bureau GNOME complet (1,8 GB → 1,1 GB) plus un VLM GGUF
4 bits (Q4_K_M, 6,6 GB → 2,2 GB). Le pipeline ne tournait pas sur Orin Nano
8 GB auparavant (le VLM seul utilisait 87 % de la RAM) et tourne maintenant à
**4,5 / 7,6 GB (~60 %)** — plus de 5,1 GB économisés. La colonne « avant » est
sur **Orin NX 16 GB** : les mêmes optimisations ont fait passer la charge sur
le kit 8 GB.

## Levier 3 — Couche mesure : voyez où va la mémoire

| Outil | Affiche | Remarque |
|---|---|---|
| `sudo tegrastats` | CPU, GPU, mémoire, température, puissance | Le guide utilisateur du kit : nvidia-smi n'est pas l'outil de surveillance principal sur Jetson |
| `nvidia-smi dmon` | Utilisation GPU | Selon la note de version 5406663 ; l'utilisation GPU dans la Jetson Power GUI est « encore en cours d'évaluation » |
| `free -h` | La vue du système d'exploitation sur la mémoire | Ne vous dit pas ce qu'une charge GPU peut allouer |
| procrank | Mémoire physique par processus (PSS) | `git clone https://github.com/csimmonds/procrank_linux.git`, `cd procrank_linux/`, `make`, `sudo ./procrank` |
| clients nvmap | Processus détenant des tampons GPU/multimédia | `sudo cat /sys/kernel/debug/nvmap/iovmm/clients` |

### « Mémoire libre » n'est pas le budget

`free -h` montre la vue ouverte du système ; les allocations GPU proviennent du
même pool avec une comptabilité séparée. Dans un rapport communautaire sur une
carte 8 GB, `cudaMalloc` a échoué pour le cache KV alors que `free -h` affichait
encore 5,7 GiB « libres » [niveau B, rapport communautaire]. Jugez si ça tient par
rapport au budget de ~7,6 GB, pas par rapport à « libre ».

### Méthode

1. Confirmez d'abord les bases de la plateforme — [Vérifier votre
   système](/fr/tutorials/jetson-orin-nano/verify-your-system).
2. Enregistrez une base de référence : la mémoire au repos, puis en charge
   (`tegrastats`).
3. Changez un seul levier, mesurez à nouveau. Si rien n'a bougé, revenez en
   arrière.

## Où commencer

Par taille documentée du gain :

1. **Runtime et quantification** — la plus grande couche du résumé de NVIDIA
   (environ 5 à 10 GB pour les frameworks d'inférence et la quantification des
   modèles, selon le tableau 5 du blog).
2. **Headless** — jusqu'à ~865 MB, une seule commande.
3. **Réglage du pipeline** — jusqu'à ~412 MB (style DeepStream).
4. **Swap sur NVMe** — soulagement de pression, pas une économie.
5. **Carveouts et SWIOTLB** — environ 100 MB et 4 MB, et un reflashage. En
   dernier.

Si un modèle ne tient toujours pas, le problème est le modèle, pas les
réglages : allez plus petit, quantifiez davantage, raccourcissez le contexte ou
réduisez le batch — voir [Inférence LLM
locale](/fr/tutorials/jetson-orin-nano/local-llm) et la
[FAQ](/fr/tutorials/jetson-orin-nano/faq).

## Sources

- [NVIDIA Technical Blog — Maximizing Memory Efficiency to Run Bigger Models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (budget de 7,6 GB, bureau 865 MB, réseau/journalisation 32 MB, carveouts, SWIOTLB, économies de pipeline, tableaux de quantification et avant/après, étapes d'installation de procrank et clients nvmap ; vérifié le 2026-09-26)
- Documentation TensorRT Edge-LLM : [Supported Models](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html) · [FP8 KV Cache](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html) · [Performance Benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) · [Quick Start Guide](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html) · pages de fonctionnalités : [KV cache reuse](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [Vocabulary reduction](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) · [Visual-token pruning (DART)](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) (vérifié le 2026-09-26)
- Documentation Jetson Linux : [Notes de version r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (problèmes 5661165, 5699079, 5406663) · [Power and Performance, r39.2](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) · [Dev Kit How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (vérifié le 2026-09-26)
- Jetson AI Lab : [tutoriel TensorRT Edge-LLM](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) · [optimisation de la RAM](https://www.jetson-ai-lab.com/tutorials/ram-optimization/) (limites de construction Orin Nano ; swap NVMe ; vérifié le 2026-09-26)
- [NVIDIA Developer Forums — Ollama on Jetson](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (communauté : free -h vs cudaMalloc ; niveau B ; vérifié le 2026-09-26)

*Statut : relu le 2026-10-11. Fondé sur la
documentation officielle NVIDIA à la date indiquée ; pas encore vérifié sur
matériel physique par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
