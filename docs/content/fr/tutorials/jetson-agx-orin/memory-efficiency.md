---
title: Efficacité mémoire — exécuter de plus grosses charges de travail sur 64GB
sidebar_label: Efficacité mémoire
slug: /tutorials/memory-efficiency
description: >-
  Les leviers documentés pour réduire l'usage de la mémoire sur le kit de
  développement AGX Orin — compétences d'agent au niveau plateforme,
  optimisations au niveau modèle dans TensorRT Edge-LLM, et comment mesurer
  les résultats.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
review_owner: cheny
---

# Efficacité mémoire — exécuter de plus grosses charges de travail sur 64GB

Sur les appareils en périphérie, c'est généralement la mémoire — et non la
puissance de calcul — qui limite les modèles que vous pouvez exécuter.
JetPack 7.2 est sorti avec l'efficacité mémoire comme thème phare, et il
existe trois couches d'optimisation documentées : la **plateforme**, le
**modèle** et la **mesure**. Cette page cartographie les leviers ; chacun
renvoie à sa source de référence.

## Levier 1 — Niveau plateforme (compétences d'agent NVIDIA)

Les **compétences d'agent d'optimisation mémoire** de JetPack 7.2 guident un
agent IA dans l'audit et la réduction de la consommation mémoire sur toute la
pile, selon NVIDIA :

- **Carveouts mémoire du bootloader** — récupérez la mémoire réservée avant
  le démarrage de Linux
- **Réservations mémoire du noyau** — ajustez ce que le noyau se réserve
- **Surcoût de l'espace utilisateur** — identifiez et supprimez les processus
  et services redondants

L'objectif énoncé par NVIDIA : faire tenir des charges de travail plus
exigeantes dans une empreinte mémoire plus réduite (c'est ainsi que le même
matériel gagne en utilité au fil des versions logicielles). Commencez ici :

- [Compétences Jetson côté appareil](https://github.com/jetson-device-skills) · [Compétences BSP Jetson](https://github.com/jetson-bsp-skills)
- Contexte : [le blog de NVIDIA sur l'efficacité mémoire de JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)

> **Attention :** les modifications de carveouts et de réservations touchent
> au comportement de démarrage. Faites les changements un par un, gardez un
> chemin de récupération (voir
> [Flashage et mises à jour](/fr/tutorials/jetson-agx-orin/flashing-and-updates)),
> et revalidez avant de passer en production.

## Levier 2 — Niveau modèle (fonctionnalités TensorRT Edge-LLM)

Pour les charges de travail LLM/VLM, les plus gros consommateurs de mémoire
sont les poids et le cache KV. TensorRT Edge-LLM documente ces leviers
(Jetson Orin exécute des moteurs FP16/INT8/INT4 — voir
[Inférence LLM locale](/fr/tutorials/jetson-agx-orin/local-llm)) :

| Levier | Ce que cela fait | Docs |
|---|---|---|
| **Quantification** (INT8/INT4 sur Orin) | Poids plus petits, moins de bande passante | [Guide de quantification](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) |
| **Réduction du vocabulaire** | Réduit le vocabulaire de sortie / les tables d'embedding | [Réduire le vocabulaire](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) |
| **Réutilisation du cache KV** | Réutilise le cache entre requêtes liées au lieu de recalculer | [Réutilisation du cache KV](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) |
| **Élagage de jetons visuels DART** | Réduit les jetons d'image redondants pour les VLM | [Élagage DART](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) |

*(Le cache KV FP8 existe dans la documentation, mais il est orienté Thor ;
Orin est limité aux moteurs FP16/INT8/INT4 d'après la matrice de prise en
charge officielle.)*

## Levier 3 — Mesurez, ne devinez pas

- **Vue système :** `tegrastats` (intégré à Jetson Linux) pour le suivi en
  direct du CPU/GPU/de la mémoire — voir
  [Vérifier votre système](/fr/tutorials/jetson-agx-orin/verify-your-system).
- **Vue modèle :** TensorRT Edge-LLM inclut une
  [conception et des outils de surveillance de la mémoire](https://nvidia.github.io/TensorRT-Edge-LLM/developer_guide/software-design/memory-monitoring.html)
  et publie des
  [benchmarks de performance pour chaque version](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html).
- **Méthode :** enregistrez une base de référence (mémoire utilisée au repos
  et en charge), modifiez **un seul** levier, mesurez à nouveau. Les chiffres
  prêts à publier doivent toujours provenir de votre propre charge de travail.

## Ce que cela signifie en pratique

- Le module 64GB exécute déjà des modèles de la classe 30B (voir les chiffres
  publiés dans [Inférence LLM locale](/fr/tutorials/jetson-agx-orin/local-llm)) ;
  l'optimisation de la mémoire est ce qui vous permet d'en ajouter *plus*
  par-dessus — pipelines multi-modèles, contextes plus longs, agents toujours
  actifs ([IA agentique](/fr/tutorials/jetson-agx-orin/agentic-ai)), pipelines
  vidéo en parallèle de l'inférence
  ([DeepStream](/fr/tutorials/jetson-agx-orin/deepstream)).
- Si votre charge de travail tient aujourd'hui, mais tout juste, commencez
  par le levier 2 (niveau modèle) — c'est le moins risqué et le mieux
  documenté. Utilisez le levier 1 lorsque vous devez comprimer la plateforme
  elle-même.

## Sources

- [Blog technique NVIDIA — efficacité mémoire et compétences d'agent dans JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (vérifié le 2026-09-24)
- [Documentation TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/) (fonctionnalités et matrice de prise en charge ; vérifié le 2026-09-24)

*Statut : relu le 2026-10-11. Fondé sur la
documentation officielle NVIDIA à la date indiquée ; pas encore vérifié sur
matériel physique par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
