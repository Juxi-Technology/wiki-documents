---
title: Exécuter des LLM en local — TensorRT Edge-LLM sur JetPack 7.2
sidebar_label: Inférence LLM locale
slug: /tutorials/local-llm
description: >-
  Exécuter des grands modèles de langage et multimodaux en local sur le kit de
  développement AGX Orin avec NVIDIA TensorRT Edge-LLM — modèles pris en charge,
  contraintes liées à l'Orin, flux de travail et performances attendues.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
review_owner: cheny
---

# Exécuter des LLM en local — TensorRT Edge-LLM sur JetPack 7.2

Votre AGX Orin 64GB peut exécuter des grands modèles de langage en local — sans
cloud, sans réseau. La voie optimisée de NVIDIA pour cela est **TensorRT
Edge-LLM**, et elle **prend officiellement en charge Jetson Orin sur JetPack
7.2**. Cette page vous aide à vous orienter : ce que votre kit peut faire et
ne peut pas faire, la structure du flux de travail et les performances à
attendre. La procédure pas-à-pas faisant autorité se trouve dans la
documentation de NVIDIA (liée tout au long de la page).

## À lire en premier — trois faits spécifiques à l'Orin

1. **L'Orin exécute uniquement des engines FP16, INT8 et INT4. FP8 et FP4 ne
   sont pas pris en charge sur l'Orin** (ce sont des capacités de la classe
   Thor). La matrice de prise en charge de NVIDIA l'indique explicitement —
   planifiez vos choix de quantification en conséquence.
2. **Les engines sont construits sur l'appareil** pour le chemin de déploiement
   Orin (pas de compilation croisée depuis un PC).
3. **JetPack 7.2 est la pile prise en charge** — CUDA 13.2 avec le TensorRT de
   la plateforme (10.16.2 dans cette version). Le wheel aarch64 cible Jetson
   Orin (SM87) avec Python 3.10–3.12.

*(Source : TensorRT Edge-LLM Official Support Matrix, vérifié le 2026-09-24.)*

## Ce que couvre TensorRT Edge-LLM

D'après la documentation de NVIDIA, Edge-LLM fournit une inférence optimisée
pour les **modèles de texte, de vision, d'audio, de parole et d'action** sur
les plateformes de périphérie :

| Capacité | Exemples dans la documentation |
|---|---|
| Génération de texte | Familles de LLM, notamment Qwen, Gemma, Nemotron |
| Multimodal (VLM) | Exemple Phi-4 Multimodal |
| Reconnaissance vocale (ASR) | Flux de travail d'exemple dédié |
| Synthèse vocale (TTS) | Flux de travail d'exemple dédié |
| Vision-Language-Action | Exemples VLA (robotique) |
| Omni (audio + vision + E/S vocale) | Flux de travail d'exemple dédié |

Points forts des fonctionnalités : quantification (INT8/INT4 sur l'Orin),
décodage spéculatif (EAGLE3, DFlash et autres), **réutilisation du cache KV**,
**réduction du vocabulaire**, **élagage des jetons visuels DART** pour les VLM,
sortie en streaming et prise en charge de LoRA.

## Le flux de travail (tel que documenté)

TensorRT Edge-LLM propose deux parcours de démarrage rapide documentés :

1. **ONNX + runtime C++** — exporter/quantifier les checkpoints (généralement
   sur un hôte x86), transférer vers l'appareil, construire les engines sur
   l'appareil, exécuter le runtime C++.
2. **Serveur Python en une ligne** — le chemin le plus rapide vers un endpoint
   de service.

Commencez ici : **[Démarrage rapide de TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)**

Au-delà du démarrage rapide :

- [Options d'installation →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html) (runtime C++ depuis les sources, flux de travail d'export/quantification, wheel local expérimental)
- [Modèles pris en charge →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)
- [Guide de quantification →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) · [Réutilisation du cache KV →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [Élagage DART →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html)

> **Astuce Juxi :** les outils d'export/quantification fonctionnent au mieux sur
> un hôte Linux x86 (selon les lignes « développeur x86 » de la documentation) ;
> **la construction des engines et l'inférence s'exécutent sur votre kit**.
> Prévoyez de l'espace disque pour les checkpoints de modèles — comptez
> généralement plusieurs Go par modèle.

## Service d'inférence : endpoint compatible OpenAI (et Claude Code)

La documentation inclut une **API Python et un serveur expérimentaux** qui
exposent une interface de chat compatible OpenAI — avec des exemples documentés
pour les clients de type OpenAI et même un **exemple d'intégration « Anthropic
et Claude Code »** (pour pointer Claude Code vers votre endpoint hébergé sur le
Jetson).

- [API Python et serveur expérimentaux →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/examples/experimental-server.html)

## Performances attendues (AGX Orin 64GB)

NVIDIA a publié les débits en tok/s suivants pour JetPack 7.2 sur le module
64GB (juin 2026 ; voir l'article de blog source pour le contexte complet et la
méthodologie) :

| Modèle | AGX Orin 64GB |
|---|---|
| Nemotron3 Nano 30B A3B | ~40 tok/s |
| Qwen 3.5 4B | ~28 tok/s |
| Qwen 3.5 9B | ~17 tok/s |
| Qwen 3.6 27B | ~7 tok/s |
| Gemma 4 E4B | ~32 tok/s |

Vos chiffres varieront selon le modèle, la quantification, la longueur de
contexte et le mode d'alimentation. Considérez-les comme la référence publiée
par le fournisseur, pas comme une garantie.

## Alternatives plus simples

Si le flux de travail d'export/construction d'Edge-LLM dépasse vos besoins
actuels, le [Jetson AI Lab](https://www.jetson-ai-lab.com) de NVIDIA publie des
tutoriels pratiques pour d'autres runtimes (llama.cpp, vLLM, etc.) — consultez
ses notes de version JetPack avant de suivre des tutoriels plus anciens.

## Dépannage

- **Le premier lancement est lent :** la construction des engines peut prendre plusieurs minutes au premier démarrage ; les lancements suivants réutilisent l'engine (même comportement pour DeepStream — voir [notre tutoriel DeepStream](/fr/tutorials/jetson-agx-orin/deepstream)).
- **Les instructions FP8/FP4 ne fonctionnent pas :** attendu — l'Orin prend uniquement en charge les engines FP16/INT8/INT4.
- **Mauvaises versions :** confirmez d'abord JetPack 7.2.1 — [Vérifier votre système](/fr/tutorials/jetson-agx-orin/verify-your-system).

## Sources

- [TensorRT Edge-LLM — Official Support Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (vérifié le 2026-09-24)
- [Page d'accueil de la documentation TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/) (v0.10.1, vérifié le 2026-09-24)
- [NVIDIA Technical Blog — Deploy Agentic-Ready AI at the Edge with Memory Efficiency in JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (chiffres de performance ; vérifié le 2026-09-24)

*Statut : relu le 2026-10-11. Fondé sur la
documentation officielle NVIDIA à la date indiquée ; pas encore vérifié sur
matériel physique par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
