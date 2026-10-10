---
title: IA agentique — NemoClaw sur JetPack 7.2
sidebar_label: IA agentique (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  Déployez NVIDIA NemoClaw sur le kit de développement AGX Orin — installation
  en une seule commande, compétences d'agent Jetson et notes pratiques pour les
  agents toujours actifs.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
review_owner: cheny
---

# IA agentique — NemoClaw sur JetPack 7.2

JetPack 7.2 rend votre kit **prêt pour l'IA agentique** : NVIDIA NemoClaw
s'installe avec une seule commande, et les compétences d'agent de NVIDIA
automatisent une grande partie du travail de plateforme qui était auparavant
manuel.

## Ce qu'est NemoClaw

Selon NVIDIA : NemoClaw est une collection de piles et de blueprints open
source pour construire des **agents autonomes** — des systèmes d'IA toujours
actifs qui raisonnent, planifient et agissent. Il ajoute des contrôles de
confidentialité et de sécurité (via les contrôles de politiques d'exécution
d'**OpenShell**) à l'écosystème d'agents OpenClaw, et empaquette des composants
NVIDIA tels que les modèles Nemotron et NeMo. JetPack 7.2 est **préconfiguré
avec les dépendances requises**, aucune configuration manuelle de
l'environnement n'est donc nécessaire sur votre kit.

- Page produit NemoClaw : <https://www.nvidia.com/en-us/ai/nemoclaw>
- NemoClaw sur GitHub : <https://github.com/NemoClaw> · exemples communautaires : <https://github.com/nemoclaw-community>

## Installation (une seule commande, officielle)

Sur le kit (JetPack 7.2+), exécutez :

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

> **Remarque de sécurité — à lire avant d'exécuter :** cela installe un
> framework d'agents toujours actifs. Vérifiez à quoi l'agent est autorisé à
> accéder et quels identifiants il peut utiliser *avant* de l'activer,
> préférez des jetons à portée limitée et révocables, et utilisez les
> contrôles de politiques d'OpenShell. Ne laissez pas un agent sans
> surveillance avec un accès que vous ne pouvez pas révoquer.

## Après l'installation — où aller ensuite

NVIDIA maintient un hub de ressources **Build-a-Claw** proposant des conseils
d'installation, des essais dans le cloud et des ressources d'apprentissage :
<https://www.nvidia.com/en-us/ai/build-a-claw>

Également utile :

- Cours du NVIDIA Deep Learning Institute : *Securing Agents With NemoClaw and OpenShell* (voir le hub de ressources)
- Discord NVIDIA Developer — canal `#nemoclaw`
- Des tutoriels tiers (par ex. [le guide NemoClaw de Seeed Studio](https://wiki.seeedstudio.com/control_rebot_arm_with_nemoclaw_on_nvidia_jetson_thor_bk/), rédigé pour un bras robotisé Jetson Thor) documentent les flux post-installation tels que `nemoclaw onboard` — considérez-les comme des conseils communautaires et suivez le hub de NVIDIA pour le flux de référence.

## Compétences d'agent Jetson — automatiser le travail de plateforme

JetPack 7.2 inclut des **compétences d'agent (agent skills)** : des flux de
travail reproductibles et exécutables par un agent pour le développement
Jetson. Trois catégories selon NVIDIA :

| Catégorie de compétence | Ce qu'elle automatise |
|---|---|
| **Personnalisation de Jetson Linux** | Construction/personnalisation d'un BSP pour cartes porteuses personnalisées — configuration des E/S, horloges, contrôle du ventilateur, profils d'alimentation |
| **Optimisation de la mémoire** | Audit des zones réservées du bootloader, des réservations du noyau et de la mémoire de l'espace utilisateur pour faire tenir des charges de travail plus exigeantes dans moins de mémoire |
| **Benchmarking de modèles** | Trouver la configuration de modèle optimale et les diagnostics pour votre appareil |

D'autres compétences d'agent dans l'écosystème :

- [Compétences côté appareil Jetson](https://github.com/jetson-device-skills) · [Compétences BSP Jetson](https://github.com/jetson-bsp-skills)
- [DeepStream Coding Agent](https://github.com/DeepStream_Coding_Agent) — construction de pipelines de vision assistée par agent (voir [notre tutoriel DeepStream](/fr/tutorials/jetson-agx-orin/deepstream))
- [Compétences du blueprint Metropolis VSS](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization/tree/main/skills) — flux de travail de recherche et de synthèse vidéo

## Notes pratiques pour le kit AGX Orin

- **Les agents toujours actifs ont besoin de puissance de calcul dédiée** — c'est
  justement l'intérêt de les exécuter sur un kit plutôt que sur un ordinateur
  portable qui se met en veille ; planifiez l'alimentation et la dissipation
  thermique en conséquence (voir les notes sur les modes d'alimentation dans
  [Dépannage](/fr/tutorials/jetson-agx-orin/troubleshooting)).
- **Le choix du modèle compte pour la mémoire** — les modèles locaux sur Orin
  tiennent largement dans 64 Go, mais les agents toujours actifs accumulent du
  contexte. Voir [Efficacité mémoire](/fr/tutorials/jetson-agx-orin/memory-efficiency)
  pour les leviers, et [Inférence LLM locale](/fr/tutorials/jetson-agx-orin/local-llm)
  pour les performances des modèles embarqués.
- **Ce domaine évolue vite.** Considérez les commandes ci-dessus comme le
  chemin officiel actuel ; consultez le hub de ressources pour les mises à jour
  avant de scripter des déploiements.

## Sources

- [Blog technique NVIDIA — IA agentique dans JetPack 7.2 (commande d'installation, compétences d'agent, nouveautés de la version)](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (vérifié le 2026-09-24)
- [Page produit NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) (vérifié le 2026-09-24)
- [Page de téléchargement de JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-24)

*Statut : relu le 2026-10-11. Fondé sur la
documentation officielle NVIDIA à la date indiquée ; pas encore vérifié sur
matériel physique par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
