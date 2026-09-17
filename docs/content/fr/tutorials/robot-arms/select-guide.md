---
title: "Guide de sélection"
description: "Guide de sélection des bras robotiques de Juxi Technology : comparatif SO-ARM101, AmazingHand et Lekiwi, et recommandations selon votre profil."
keywords: [sélection, bras robotique, comparaison]
---

# Guide de sélection

Juxi Technology propose plusieurs bras robotiques pour différents usages. Ce guide vous aide à comparer et choisir le modèle adapté.

> Remarque : consultez la documentation officielle de chaque produit pour les spécifications détaillées. Ce tableau sert uniquement de référence pour le choix.

## Comparaison

| Caractéristique | SO-ARM101 | AmazingHand | Lekiwi |
|-----------------|-----------|-------------|--------|
| **Type** | Téléopération double bras | Main robotique | Bras pédagogique low-cost |
| **DOF** | 6 DOF par bras | 5 doigts, multi-articulé | 6 DOF |
| **Contrôle** | LeRobot / API Python | Bus série TTL | Servos |
| **Usage** | Apprentissage IA, téléop | Préhension, gestes | Éducation, débutant |
| **Open source** | [LeRobot](https://github.com/Juxi-Technology/lerobot) | [AmazingHand](https://github.com/Juxi-Technology/AmazingHand) | Doc officielle |
| **Plateforme hôte** | PC (Linux) / Jetson | Carte de contrôle | PC / MCU |
| **Idéal pour** | Chercheurs, développeurs IA | Chercheurs en manipulation | Étudiants, makers |

## Comment choisir

### 🎓 Étudiants / Débutants → Lekiwi

- Structure simple, coût réduit — idéal pour l'enseignement en classe et pour débuter
- Contrôle intuitif par servomoteur

### 🤖 Recherche sur la préhension et la manipulation → AmazingHand

- Main dextre à 4 doigts pour la recherche sur les stratégies de préhension et le contrôle des gestes
- Contrôle par bus série TTL, compatible avec les contrôleurs courants

### 🧠 Imitation IA / Téléopération → SO-ARM101

- Conception à double bras avec téléopération leader-follower
- Intégration profonde à l'écosystème LeRobot, idéal pour l'imitation learning
- Support Jetson pour des flux de travail IA fluides

## Combinaisons recommandées

| Besoin | Configuration recommandée |
|------|-------------------|
| Recherche en téléopération IA | SO-ARM101 + AmazingHand (manipulation dextre) |
| Laboratoire d'enseignement | Plusieurs unités Lekiwi |
| Système robotique complet | SO-ARM101 + module IMU + accessoires de vision |

## Tutoriels associés

- [Tutoriel SO-ARM101](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Contrôle d'interface main robotique](/fr/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Tutoriel d'utilisation du robot mobile Lekiwi](/fr/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial)

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)