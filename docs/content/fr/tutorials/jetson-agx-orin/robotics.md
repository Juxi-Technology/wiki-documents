---
title: Robotique sous JetPack 7.2 — ce qui fonctionne aujourd'hui
sidebar_label: Robotique (état des lieux)
slug: /tutorials/robotics
description: >-
  Une page d'état honnête pour le développement robotique sur le kit de
  développement AGX Orin avec JetPack 7.2 — disponibilité de ROS 2 et d'Isaac
  ROS, piles d'apprentissage robotique, et ce qu'il faut vérifier avant de
  vous engager.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: still lists Isaac ROS as "coming soon"; see the disagreement note below
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
review_owner: cheny
---

# Robotique sous JetPack 7.2 — ce qui fonctionne aujourd'hui

JetPack 7.2 a fait passer Orin à une nouvelle génération de plateforme
(Ubuntu 24.04, noyau 6.8, CUDA 13). La robotique présente un tableau
contrasté : les briques essentielles (ROS 2, Isaac ROS) sont désormais en
place sur cette plateforme, tandis que certaines parties de la pile
environnante se stabilisent encore — cette page est donc délibérément une
page d'état, et non un tutoriel. Consultez-la avant de vous engager sur une
architecture.

## Tableau d'état (vérifié le 2026-09-24 ; ligne Isaac ROS recontrôlée le 2026-09-26)

| Ce dont vous avez besoin | Statut sous JetPack 7.2 / AGX Orin | Remarques |
|---|---|---|
| **ROS 2 (cœur)** | ✅ Fonctionne | Ubuntu 24.04 est la plateforme cible de ROS 2 **Jazzy** ; installez selon la [documentation d'installation de ROS 2](https://docs.ros.org/en/jazzy/Installation.html). ROS 2 sous Docker est également une option. |
| **Isaac ROS** (paquets ROS 2 accélérés par le matériel) | ✅ **Pris en charge depuis Isaac ROS 4.6.0** (2026-08-18) | Publié pour JetPack 7.2 sur Jetson Orin, avec une procédure d'installation officielle pour l'AGX Orin. La vraie décision à prendre concerne la distribution ROS 2 : **4.6.x sous Jazzy** ou **5.0 sous Lyrical** — voir [Isaac ROS sous JetPack 7.2](#isaac-ros-sous-jetpack-7-2). |
| **Modèles LLM / VLM / VLA locaux** | ✅ Fonctionne | TensorRT Edge-LLM prend officiellement en charge Orin sous JP7.2, y compris des exemples **Vision-Language-Action** — voir [Inférence LLM locale](/fr/tutorials/jetson-agx-orin/local-llm). |
| **Pipelines vidéo multicaméras** | ✅ Fonctionne | DeepStream 9.1 est fourni avec JP7.2 — voir [Analyse vidéo DeepStream](/fr/tutorials/jetson-agx-orin/deepstream). |
| **Comportements agentiques / orchestration** | ✅ Fonctionne | NemoClaw + Agent Skills Jetson — voir [IA agentique](/fr/tutorials/jetson-agx-orin/agentic-ai). |
| **Piles d'apprentissage robotique (frameworks Python de type LeRobot)** | ⚠️ À vérifier avant de vous engager | Ces piles sont très dépendantes de Python ; Ubuntu 24.04 est passé à Python 3.12 et certaines dépendances peuvent accuser un retard. Testez votre pile précise sous JP7.2 avant de concevoir autour d'elle — et notez que **nous ne l'avons pas vérifiée sur matériel**. |
| **GR00T (modèles de fondation humanoïdes)** | ⚠️ Consultez les sources officielles | Suivez le dépôt officiel Isaac GR00T de NVIDIA et ses annonces pour connaître la prise en charge des plateformes. Un guide publié par un partenaire rapporte un déploiement TensorRT full-weight sur AGX Orin + JP7.2 *(tiers, non vérifié par nos soins)*. |
| **Cartes porteuses personnalisées / travail BSP** | ✅ Nouveaux outils | Les **Agent Skills de personnalisation Jetson Linux** de JetPack 7.2 automatisent les tâches de bring-up BSP — voir les [dépôts d'Agent Skills](https://github.com/jetson-bsp-skills). |

## Isaac ROS sous JetPack 7.2

L'ère du « bientôt disponible » est révolue. La version **4.6.0** d'Isaac ROS
(2026-08-18) a ajouté la prise en charge de **Jetson Orin** et de
**JetPack 7.2**, et le tableau des plateformes prises en charge associe
*Jetson Orin* à *JetPack 7.2* (SSD NVMe de 128+ Go). NVIDIA publie un guide
de démarrage rapide et une procédure d'installation Docker dédiés au
**Jetson AGX Orin** pour cette combinaison — ce kit est une cible de premier
ordre, et non un ajout après coup.

La décision qui compte vraiment est celle de la **distribution ROS 2** à
adopter :

| | Isaac ROS **4.6.x** | Isaac ROS **5.0** |
|---|---|---|
| Sortie | 2026-08-18 | 2026-09-21 |
| Distribution ROS 2 | **Jazzy** — l'édition standard d'Ubuntu 24.04 | **Lyrical Luth** — NVIDIA construit elle-même les paquets ROS 2 Noble et les distribue depuis le CDN de sa buildfarm |
| Paquets NITROS | Présents | **Supprimés** et reconstruits nativement sur `rosidl::Buffer` ; le code qui appelle directement les API ou les types NITROS exige une migration au niveau du code source |
| Isaac Sim associé | 6.0 (5.0/5.1 toujours pris en charge comme versions héritées) | 6.0 |

- Si vous démarrez de zéro et cherchez la voie la plus courante :
  **4.6.x sous Jazzy** vous garde sur l'édition standard de ROS 2. **5.0** est
  la direction que prend NVIDIA et apporte l'écosystème Lyrical — lisez les
  conseils de migration de NITROS vers `rosidl::Buffer` liés depuis les
  [notes de version 5.0.0](https://nvidia-isaac-ros.github.io/releases/index.html)
  avant de mettre à niveau le code de vos nœuds existants.
- **Contraintes connues sur Orin** avec ces versions : les caméras RealSense
  fonctionnent en **mode Docker uniquement** ; avec
  `isaac_ros_stereo_image_proc`, sélectionner `backend:=JETSON` sur AGX Orin
  avec une entrée RGB8/BGR8 peut interrompre le nœud avec une erreur VPI —
  conservez la valeur par défaut `backend:=CUDA` ; Teleop installé depuis le
  paquet Debian nécessite `ISAAC_TELEOP_CLOUDXR_EXP=0` sur Orin ; et le
  prétraitement de `isaac_ros_dnn_image_encoder` en 5.0 est plus lent qu'en
  4.6 sur AGX Orin — si ce nœud est critique dans votre graphe, préférez la
  4.6.
- **OpenCV :** JetPack 7.2 est fourni avec OpenCV **4.8.0**, alors qu'Isaac
  ROS attend la **4.6.0**. Supprimez les paquets système
  (`sudo apt-get remove -y libopencv* opencv*`) et les paquets Isaac ROS
  installeront leur version épinglée.

### Là où les propres pages de NVIDIA divergent

La [page de téléchargement de JetPack](https://developer.nvidia.com/embedded/jetpack/downloads)
de NVIDIA indique toujours Isaac ROS comme **« bientôt disponible »** pour
cette version, alors que les notes de version d'Isaac ROS affirment une
prise en charge depuis la 4.6.0. Les deux pages n'ont pas été réconciliées —
Isaac ROS est publié indépendamment de JetPack, et le tableau des composants
de la page JetPack recense ce qui est livré *avec* JetPack. Les dépôts apt
vers lesquels pointe la documentation d'Isaac ROS constituent la preuve
tangible de la combinaison prise en charge :
`…/isaac-ros/release-4.6 noble-jetpack` — *noble* pour Ubuntu 24.04,
*jetpack* pour la version JetPack. En cas de divergence entre les deux,
considérez les [notes de version d'Isaac ROS](https://nvidia-isaac-ros.github.io/releases/index.html)
comme la source qui fait foi, et vérifiez sur votre propre installation
avant de concevoir autour de l'une ou de l'autre.

## Recommandation

- **Nouveaux projets sans dépendance robotique :** construisez sous
  JetPack 7.2 — vous bénéficiez de la prise en charge d'Ubuntu 24.04 LTS, de
  CUDA 13, de DeepStream 9.1, de LLM embarqués et de l'outillage agentique.
- **Projets qui utilisent Isaac ROS :** JetPack 7.2 est de nouveau une cible
  prise en charge. Choisissez délibérément la 4.6.x (Jazzy) ou la 5.0
  (Lyrical), et prévoyez le remplacement d'OpenCV ainsi que la prise en
  charge des caméras RealSense en mode Docker uniquement. Si vous êtes à
  mi-projet sous JetPack 6.x avec une pile validée, aucune marche forcée
  n'est imposée — migrez lorsque votre choix de version d'Isaac ROS sera
  arrêté (notre
  [guide de migration](/fr/tutorials/jetson-agx-orin/jetpack-6-to-7) couvre le
  travail de reconstruction).
- **Un seul kit, plusieurs modules :** rappelez-vous que votre kit de
  développement peut émuler les autres modules Jetson Orin par reflashage —
  pratique pour valider une charge de travail robotique sur toute la gamme de
  modules avant de choisir un composant de série
  ([Aperçu du produit](/fr/tutorials/jetson-agx-orin/overview)).

## Sources

- [Notes de version d'Isaac ROS — 4.6.0 (2026-08-18) et 5.0.0 (2026-09-21)](https://nvidia-isaac-ros.github.io/releases/index.html) (vérifié le 2026-09-26)
- [Isaac ROS 4.6 — Getting Started : plateformes prises en charge, guide pas à pas de l'AGX Orin, installation via apt](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (vérifié le 2026-09-26)
- [Isaac ROS 5.0 — Getting Started : plateformes prises en charge, CDN de la buildfarm Lyrical](https://nvidia-isaac-ros.github.io/getting_started/index.html) (vérifié le 2026-09-26)
- [Page de téléchargement de JetPack 7.2.1 — liste des composants](https://developer.nvidia.com/embedded/jetpack/downloads) — porte encore la ligne obsolète « bientôt disponible » d'Isaac ROS (vérifié le 2026-09-26)
- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (émulation de module ; vérifié le 2026-09-24)
- [Documentation d'installation de ROS 2 Jazzy](https://docs.ros.org/en/jazzy/Installation.html)

*Statut : relu le 2026-10-11. La disponibilité dans
l'écosystème évolue rapidement — recontrôlez les pages NVIDIA liées avant de
vous fier à ce tableau. Pas encore vérifié sur matériel physique par Juxi
Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
