---
title: Exécuter des LLM en local — TensorRT Edge-LLM sur l'Orin Nano 8 GB
sidebar_label: Inférence LLM locale
slug: /tutorials/local-llm
description: >-
  Exécuter des grands modèles de langage en local sur le Jetson Orin Nano 8 GB —
  prise en charge de TensorRT Edge-LLM, limites de précision, ce qui tient dans
  la mémoire, et chiffres officiels.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/llms-full.txt
    checked: 2026-09-26
  - source: https://github.com/dusty-nv/jetson-containers
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
review_owner: cheny
---

# Exécuter des LLM en local — TensorRT Edge-LLM sur l'Orin Nano 8 GB

Votre kit de développement NVIDIA Jetson Orin Nano Super (8 GB) peut exécuter
des modèles de langage en local. La voie optimisée de NVIDIA pour cela est
**TensorRT Edge-LLM**, qui **prend officiellement en charge Jetson Orin sur la
gamme JetPack 7.2**. Cette page couvre ce qui tient dans 8 GB et quels runtimes
fonctionnent aujourd'hui ; les instructions vivent dans la documentation de
NVIDIA, liée ci-dessous.

## À lire en premier — quatre contraintes pour ce kit

1. **L'Orin exécute uniquement des moteurs FP16, INT8 et INT4. Les moteurs FP8
   et FP4 ne s'exécutent pas sur cet appareil** — ce sont des capacités de la
   classe Thor/Blackwell (« Jetson Orin n'exécute pas les moteurs FP8 ou FP4 »
   — matrice de prise en charge).
2. **Les moteurs sont construits sur l'appareil** par le runtime C++. L'export
   ONNX et la quantification s'exécutent sur un hôte Linux x86-64 — pas sur
   l'Orin. Les moteurs sont exacts au niveau du SM : un moteur construit sur
   Thor (SM110) ne se chargera pas sur l'Orin Nano (sm_87).
3. **JetPack 7.2.1 (L4T r39.2.1) est la pile prise en charge** — CUDA 13.2.2,
   TensorRT 10.16.2. Edge-LLM utilise le TensorRT de plateforme fourni par
   JetPack.
4. **Les 8 GB de mémoire unifiée sont partagés avec le système d'exploitation
   et le bureau.** Environ 7,6 GB sont utilisables. La taille du modèle — pas
   les TOPS — est la contrainte déterminante, et le cache KV doit tenir dans la
   même mémoire.

> **Important :** choisissez des checkpoints **INT4 AWQ** ou **INT4 GPTQ** pour
> ce kit. Ne sélectionnez pas de checkpoints FP8, MXFP8, FP4 ou NVFP4. INT8
> GPTQ n'est pas pris en charge.

## Ce que couvre TensorRT Edge-LLM

TensorRT Edge-LLM est le runtime officiel de NVIDIA pour les LLM et les VLM sur
les plateformes de périphérie. La matrice de prise en charge liste Jetson Orin
comme « Official » pour JetPack 7.2, avec des moteurs construits sur l'appareil
et les précisions FP16, INT8, INT4.

- **Couverture de modèles :** les checkpoints pris en charge incluent Llama 3.2
  1B/3B, Llama 3.1 8B, Qwen2.5 (0,5B–14B), Qwen3 (0,6B–8B), et des VLM tels que
  Qwen2.5-VL 3B/7B et InternVL3/3.5 (1B–14B) — des checkpoints denses sous 30B
  de paramètres. Ce n'est pas une matrice de vérification : « les checkpoints
  listés n'ont pas tous été entièrement vérifiés sur chaque plateforme et chaque
  précision prises en charge ».
- **L'option de build propre aux 8 GB :** pour les builds de moteurs INT4 sur
  Orin Nano, passez `--externalize-weights int4_ffn` (dense) ou
  `--externalize-weights int4_ffn int4_moe` (MoE) pour réduire la mémoire de
  construction des moteurs.
- **Espace disque :** prévoyez ~20–50 GB par flux de travail de modèle pour les
  fichiers ONNX et les moteurs ; ce kit n'a pas de stockage intégré
  ([Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start)).
- **Deux parcours de démarrage rapide :** un parcours C++ (exporter/quantifier
  sur un hôte, construire les moteurs sur l'appareil, exécuter) et un parcours
  serveur — `tensorrt-edgellm-serve Qwen/Qwen3.5-0.8B` (télécharge le
  checkpoint au premier lancement).

> **Astuce Juxi :** les étapes faisant autorité sont celles de NVIDIA — [Quick
> Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html),
> [Installation](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html),
> [Supported Models](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html).
> La page d'installation 0.10.1 déclare : « en 0.10.1, les wheels ne sont pas
> publiées et ne constituent pas le chemin d'installation par défaut ».

## Ce qui tient réellement dans 8 GB

- **NVIDIA a benchmarké jusqu'à 2B de paramètres sur ce module.** La plus
  grande ligne Orin Nano (8GB) de la page de benchmarks Edge-LLM est
  Qwen3.5-2B à 4 692 MB : « 2B est le plus grand modèle que NVIDIA a
  benchmarké sur Orin Nano 8 GB ».
- **Une démonstration fournisseur exécute un modèle 4B.** Le tutoriel Jetson AI
  Lab rapporte que Qwen3-4B-Instruct INT4 AWQ (~2 GB de poids) tient « dans la
  mémoire unifiée de 8 GB de l'Orin Nano » ; InternVL3 1B/2B tient aussi avec
  INT4 AWQ, tandis que les variantes plus grandes ciblent l'AGX Orin ou Thor.
  (Contenu fournisseur.)
- **Une enveloppe pratique issue du blog mémoire de NVIDIA : des LLM jusqu'à
  ~10B de paramètres et des VLM jusqu'à ~4B** avec une quantification 4 bits et
  des runtimes efficaces — pour des configurations optimisées.
- **La taille de fichier n'est pas le test décisif — le cache KV doit tenir
  aussi.** Des rapports communautaires montrent des modèles GGUF de la classe
  12B/26B (gemma4:12b à 7,4 GB, gemma4:26b à 16 GB) échouant dans Ollama sur la
  carte 8 GB : `cudaMalloc failed: out of memory ... failed to allocate buffer
  for kv cache`. (Non confirmé.)

## Chiffres de performance officiels pour ce kit

NVIDIA publie des tableaux de benchmarks pour le **Jetson Orin Nano (8GB)** —
v0.10.0, JetPack 7.2 / CUDA 13.2 / TensorRT 10.16. Résultats d'exécution sur
MTBench (LLM) et COCO (VLM), avec la mémoire GPU de pointe :

| Modèle | Type | Débit | Mémoire GPU de pointe |
|---|---|---|---|
| Qwen3-0.6B | LLM | 77,0 tok/s | 1 917 MB |
| Qwen3-1.7B | LLM | 36,5 tok/s | 2 992 MB |
| Qwen3-VL-2B | VLM | 36,1 tok/s | 4 486 MB |
| Qwen3.5-0.8B | LLM | 59,1 tok/s | 2 127 MB |
| Qwen3.5-0.8B | VLM | 59,0 tok/s | 2 760 MB |
| Qwen3.5-2B | LLM | 29,6 tok/s | 3 642 MB |
| Qwen3.5-2B | VLM | 29,6 tok/s | 4 692 MB |

Les lignes Orin utilisent un batch de 1 et des poids INT4 externalisés ; limites
de construction : maxInputLen 2048, maxKVCacheCapacity 2200. « Les performances
de production peuvent varier selon le réglage au niveau système (mode
d'alimentation, configuration mémoire, gestion thermique). »

> **Important :** les tableaux de tokens par seconde publiés par NVIDIA pour
> l'**AGX Orin 64 GB** ne s'appliquent **pas** à ce kit — module, bande passante
> mémoire et enveloppe de puissance différents. N'estimez pas les chiffres de
> l'Orin Nano à partir de l'AGX Orin. Aucun chiffre provenant de NVIDIA
> n'existe ici pour les parcours Ollama ou llama.cpp.

## Autres runtimes sur ce kit

### Ollama

État actuel, vérifié par le personnel NVIDIA sur les forums développeurs pour
JetPack 7.2.1 (septembre 2026) : l'installateur standard fonctionne —
`curl -fsSL https://ollama.com/install.sh | sh` — et `ollama ps` doit signaler
`100% GPU`. L'avertissement « Unsupported JetPack version detected » est
inoffensif.

Les builds plus anciens retombaient sur le CPU car leurs bibliothèques CUDA
précompilées n'avaient pas sm_87, la capacité de calcul de l'Orin ; des rapports
communautaires pointent Ollama 0.30.11 comme ayant ajouté « CC 87 for CUDA
v13 », et le personnel NVIDIA a confirmé le correctif. Des signalements
communautaires subsistent (août–septembre 2026) — vérifiez `ollama ps` sur
votre unité ; la compilation des sources pour CUDA v13 reste la solution de
repli.

### Wheels Python pour JetPack 7.2

Les paquets Python compatibles CUDA (PyTorch et autres) pour JetPack 7.2 /
CUDA 13.2 proviennent de l'index SBSA de Jetson AI Lab, que le personnel NVIDIA
cite :

```
https://pypi.jetson-ai-lab.io/sbsa/cu130
```

Utilisez-le comme index pip
(`--index-url https://pypi.jetson-ai-lab.io/sbsa/cu130`). Il sert des wheels
aarch64 telles que torch 2.11.0, torchvision 0.25.0 et vllm 0.20.0+cu130. Il
n'existe pas d'index `jp7/*` ; l'index de l'ère JetPack 6 est `jp6/cu126`.
CUDA 13.2 unifie l'Orin sur la boîte à outils Arm SBSA (pilote R595+).

### jetson-containers et Jetson AI Lab (voie alternative)

[jetson-containers](https://github.com/dusty-nv/jetson-containers) prend en
charge JetPack 6.2 (CUDA 12.6) et JetPack 7 (CUDA 13.x). Des images
`-jetson-orin` préconstruites existent pour les principaux parcours de service,
notamment `ghcr.io/nvidia-ai-iot/llama_cpp:latest-jetson-orin` et
`ghcr.io/nvidia-ai-iot/vllm:latest-jetson-orin`.

Mises en garde 8 GB issues de la documentation fournisseur : l'exemple vLLM
utilise `--shm-size=16g` (pas une recommandation de taille ici), et la
configuration recommandée déplace la racine de données Docker vers le NVMe et
ajoute un fichier de swap de 16 GB (désactivez d'abord ZRAM).

## Réglages pour 8 GB

Quand un modèle ne tient pas : libérez de la mémoire plateforme (le mode
headless récupère jusqu'à ~865 MB), quantifiez en 4 bits, et dimensionnez
délibérément le cache KV et le contexte — voir [Efficacité mémoire pour
8 GB](/fr/tutorials/jetson-orin-nano/memory-efficiency).

## Dépannage

- **Mémoire insuffisante au chargement** — `cudaMalloc failed: out of memory ...
  failed to allocate buffer for kv cache` signifie que le modèle plus le cache
  KV dépassent les 8 GB de mémoire unifiée. Utilisez un modèle plus petit ou
  plus quantifié, ou raccourcissez le contexte ; pour les builds de moteurs
  Edge-LLM, ajoutez `--externalize-weights int4_ffn` et réduisez
  `--maxInputLen` / `--maxKVCacheCapacity`.
- **Repli CPU d'Ollama, ou l'avertissement « Unsupported JetPack version
  detected »** — mettez d'abord Ollama à jour (les builds plus anciens
  n'avaient pas sm_87) ; l'avertissement est inoffensif en 7.2.1 selon le
  personnel NVIDIA. Confirmez avec `ollama ps` (`100% GPU`).
- **Problèmes de version ou de configuration** — voir [Vérifier votre
  système](/fr/tutorials/jetson-orin-nano/verify-your-system) et
  [Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting).

## Sources

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/): [Support Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html), [Supported Models](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html), [Installation](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html), [Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html), [Performance Benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (vérifié le 2026-09-26)
- [Page de téléchargement de JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-26)
- [NVIDIA blog — Maximizing Memory Efficiency to Run Bigger Models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (vérifié le 2026-09-26)
- [NVIDIA Developer Forums — Ollama on Jetson (vérifié par le personnel sur JetPack 7.2.1)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (vérifié le 2026-09-26)
- [NVIDIA Developer Forums — JetPack 7.2 GPU acceleration issue (index de wheels, sm_87)](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (vérifié le 2026-09-26)
- [NVIDIA Developer Forums — AI models that run on Jetson Orin Nano Super 8GB (communauté)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (vérifié le 2026-09-26)
- [Jetson AI Lab — TensorRT Edge-LLM tutorial](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) (vérifié le 2026-09-26)
- [Jetson AI Lab — texte complet de la documentation (tableau des images de conteneurs)](https://www.jetson-ai-lab.com/llms-full.txt) (vérifié le 2026-09-26)
- [jetson-containers (GitHub)](https://github.com/dusty-nv/jetson-containers) (vérifié le 2026-09-26)
- [Index PyPI de Jetson AI Lab — sbsa/cu130](https://pypi.jetson-ai-lab.io/sbsa/cu130) (vérifié le 2026-09-26)

*Statut : brouillon, en attente de relecture par cheny. Fondé sur la
documentation officielle NVIDIA à la date indiquée ; pas encore vérifié sur
matériel physique par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
