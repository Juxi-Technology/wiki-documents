---
title: Robotique sous JetPack 7.2 — ce qui fonctionne aujourd'hui
sidebar_label: Robotique (état des lieux)
slug: /tutorials/robotics
description: >-
  Une page d'état honnête pour le développement robotique sur le kit de
  développement AGX Orin avec JetPack 7.2 — disponibilité de ROS 2 et d'Isaac
  ROS, piles d'apprentissage robotique, et ce qu'il faut utiliser pendant que
  l'écosystème rattrape son retard.
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

# Robotique sous JetPack 7.2 — ce qui fonctionne aujourd'hui

JetPack 7.2 a fait passer Orin à une nouvelle génération de plateforme
(Ubuntu 24.04, noyau 6.8, CUDA 13). La robotique est le seul domaine où
l'*écosystème* rattrape encore la plateforme — cette page est donc
délibérément une page d'état, et non un tutoriel. Consultez-la avant de vous
engager sur une architecture.

## Tableau d'état (vérifié le 2026-09-24)

| Ce dont vous avez besoin | Statut sous JetPack 7.2 / AGX Orin | Remarques |
|---|---|---|
| **ROS 2 (cœur)** | ✅ Fonctionne | Ubuntu 24.04 est la plateforme cible de ROS 2 **Jazzy** ; installez selon la [documentation d'installation de ROS 2](https://docs.ros.org/en/jazzy/Installation.html). ROS 2 sous Docker est également une option. |
| **Isaac ROS** (paquets ROS 2 accélérés par le matériel) | ⛔ **Pas encore — NVIDIA l'annonce « bientôt disponible » pour JetPack 7** | C'est la lacune la plus importante. Si Isaac ROS se trouve aujourd'hui sur votre chemin critique, restez sous **JetPack 6.x** et surveillez la [page de téléchargement](https://developer.nvidia.com/embedded/jetpack/downloads) de NVIDIA pour la sortie. |
| **Modèles LLM / VLM / VLA locaux** | ✅ Fonctionne | TensorRT Edge-LLM prend officiellement en charge Orin sous JP7.2, y compris des exemples **Vision-Language-Action** — voir [Inférence LLM locale](/fr/tutorials/jetson-agx-orin/local-llm). |
| **Pipelines vidéo multicaméras** | ✅ Fonctionne | DeepStream 9.1 est fourni avec JP7.2 — voir [Analyse vidéo DeepStream](/fr/tutorials/jetson-agx-orin/deepstream). |
| **Comportements agentiques / orchestration** | ✅ Fonctionne | NemoClaw + Agent Skills Jetson — voir [IA agentique](/fr/tutorials/jetson-agx-orin/agentic-ai). |
| **Piles d'apprentissage robotique (frameworks Python de type LeRobot)** | ⚠️ À vérifier avant de vous engager | Ces piles sont très dépendantes de Python ; Ubuntu 24.04 est passé à Python 3.12 et certaines dépendances peuvent accuser un retard. Testez votre pile précise sous JP7.2 avant de concevoir autour d'elle — et notez que **nous ne l'avons pas vérifiée sur matériel**. |
| **GR00T (modèles de fondation humanoïdes)** | ⚠️ Consultez les sources officielles | Suivez le dépôt officiel Isaac GR00T de NVIDIA et ses annonces pour connaître la prise en charge des plateformes. Un guide publié par un partenaire rapporte un déploiement TensorRT full-weight sur AGX Orin + JP7.2 *(tiers, non vérifié par nos soins)*. |
| **Cartes porteuses personnalisées / travail BSP** | ✅ Nouveaux outils | Les **Agent Skills de personnalisation Jetson Linux** de JetPack 7.2 automatisent les tâches de bring-up BSP — voir les [dépôts d'Agent Skills](https://github.com/jetson-bsp-skills). |

## Recommandation

- **Nouveaux projets sans dépendance à Isaac ROS :** construisez sous
  JetPack 7.2 — vous bénéficiez de la prise en charge d'Ubuntu 24.04 LTS, de
  CUDA 13, de DeepStream 9.1, de LLM embarqués et de l'outillage agentique.
- **Projets qui dépendent aujourd'hui d'Isaac ROS :** prévoyez JetPack 6.x
  pour l'instant ; considérez JP7.x comme votre cible de migration dès
  qu'Isaac ROS sera disponible pour cette version (notre
  [guide de migration](/fr/tutorials/jetson-agx-orin/jetpack-6-to-7) couvre le
  travail de reconstruction le jour venu).
- **Un seul kit, plusieurs modules :** rappelez-vous que votre kit de
  développement peut émuler les autres modules Jetson Orin par reflashage —
  pratique pour valider une charge de travail robotique sur toute la gamme de
  modules avant de choisir un composant de série
  ([Aperçu du produit](/fr/tutorials/jetson-agx-orin/overview)).

## Sources

- [Page de téléchargement de JetPack 7.2.1 — Isaac ROS « bientôt disponible » pour JetPack 7](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-24)
- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (émulation de module ; vérifié le 2026-09-24)
- [Documentation d'installation de ROS 2 Jazzy](https://docs.ros.org/en/jazzy/Installation.html)

*Statut : brouillon, en attente de relecture par cheny. La disponibilité dans
l'écosystème évolue rapidement — recontrôlez les pages NVIDIA liées avant de
vous fier à ce tableau. Pas encore vérifié sur matériel physique par Juxi
Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
