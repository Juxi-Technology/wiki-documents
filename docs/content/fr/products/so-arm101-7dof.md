---
title: Bras robotique SO-ARM101 à 7 axes
category: robot
description: "Bras robotique open source SO-ARM101 7-DOF de Juxi Technology — lacet du poignet à 90°, servos à bus 12V 30kg.cm, intégration LeRobot poussée, assemblé en usine avec une série complète de tutoriels"
keywords: [so-arm101, 7-dof, 7 axes, bras robotique, leRobot, téléopération, apprentissage par imitation]
---

# Bras robotique SO-ARM101 à 7 axes

> **[Acheter en boutique](https://www.juxitech.com/products/so-arm101-open-source-7-dof-robotic-arm)**

## Présentation

Le SO-ARM101 est un bras robotique open source profondément optimisé à partir du SO-ARM100. Le cheminement des câbles et l'appariement des moteurs/réducteurs ont été revus pour éliminer le problème de rupture des câbles aux articulations, et les améliorations de performances prennent en charge le suivi leader-follower en temps réel. **Il s'agit de la version 7-DOF** : elle ajoute un servo de lacet du poignet par rapport au modèle 6 axes, ce qui confère au poignet une liberté de posture bien plus grande, davantage de points atteignables et une préhension de précision sous plusieurs angles.

Il s'adapte à la boîte à outils **LeRobot** de Hugging Face et se connecte directement aux modèles PyTorch et aux jeux de données partagés : l'apprentissage par imitation et l'apprentissage par renforcement sont ainsi faciles à mettre en pratique. Un tutoriel d'assemblage complet et un kit DIY sont inclus — étudiants, chercheurs et makers peuvent tous travailler avec la robotique intelligente pour apprendre, rechercher et créer.

**En bref** : 7 degrés de liberté avec lacet du poignet à 90° · servos à couple élevé 12V à 30kg.cm · pince flexible TPU en option · collecte de données à double vue · inférence embarquée sur NVIDIA Jetson et D-Robotics RDK · assemblé en usine, prêt à l'emploi · prise en charge de l'entraînement des modèles ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5.

## Avantages clés

### 7 degrés de liberté avec lacet du poignet à 90°

La version 7-DOF ajoute un servo de rotation gauche/droite du poignet (lacet) à la conception 6 axes : le poignet peut ainsi aborder une cible sous bien plus d'angles et atteindre davantage de points dans l'espace de travail. C'est cette liberté supplémentaire qui rend possible une préhension fine et sous plusieurs angles.

### Téléopération leader-follower et apprentissage par imitation

Le bras intègre le framework d'IA de Hugging Face. Téléopérez le bras leader pour enregistrer les mouvements de démonstration, puis entraînez en une seule passe un modèle d'apprentissage par imitation et déployez la politique optimisée. Il peut prendre en charge des tâches complexes et s'adapter à son environnement, refermant la boucle d'automatisation de bout en bout.

### Couverture globale à double vue

La caméra montée sur le bras capture à courte distance la position spatiale, l'angle et la texture de surface de la cible pour une collecte de données plus fidèle, tandis qu'une caméra de scène sur support de bureau lit en temps réel l'environnement de travail. Ensemble, elles maintiennent une opération précise, réagissent rapidement aux changements et préviennent les dérives ou les blocages.

### Servos à bus 12V à couple élevé de 30kg.cm

Le bras follower est unifié sur 7 × Feetech STS3215-C018 (12V, 30kg.cm, 1:345) pour garantir un couple de préhension suffisant sous charge multi-axes, tandis que le bras leader reste en 7.4V afin d'équilibrer la sensation en main et le coût. Un encodeur magnétique 12 bits offre une précision de 0.088° sur chaque axe.

### Prise en charge de l'entraînement multi-modèles

Entraînez et déployez les politiques ACT, SmolVLA, Pi0, Pi0.5 et GR00T N1.5 sur le même matériel, et réutilisez directement des modèles pré-entraînés tels que `lerobot/smolvla_base`, `lerobot/pi0_base`, `lerobot/pi05_base` et `lerobot/xvla-widowx` depuis le hub de modèles LeRobot.

### Inférence embarquée sur NVIDIA et D-Robotics RDK

Reliez d'un seul câble un Raspberry Pi, un D-Robotics RDK ou un contrôleur NVIDIA Jetson pour exécuter l'inférence sur le bras lui-même, avec commande moteur en temps réel et retour d'encodeur.

### Assemblé en usine, prêt à l'emploi dès la sortie de la boîte

Chaque unité est livrée assemblée, câblée et calibrée — connectez l'alimentation et l'USB et la plateforme est prête pour la téléopération et la collecte de données.

### Pince flexible évolutive

La pince flexible est une évolution de la pince rigide standard, imprimée en 3D dans un matériau TPU souple. Elle utilise une conception creuse avec des nervures de renfort internes et fonctionne selon un principe de pince à ailettes : elle épouse la forme de l'objet saisi, ce qui réduit la force de contact appliquée — idéale pour les objets mous ou facilement endommageables (fruits, verrerie, œufs, transformation alimentaire) qu'une pince rigide classique ne peut pas manipuler en toute sécurité.

## Spécifications

| Catégorie | Spécification |
|----------|------|
| Type | Bras robotique de téléopération leader-follower |
| DOF | 7 (ajoute un axe de lacet du poignet par rapport au modèle 6 axes) |
| Servos du bras follower | 7 × Feetech STS3215-C018 (12V, 30kg.cm, 1:345) |
| Servos du bras leader | 7 × STS3215 7.4V — version amortie : 1 × C001 (1:345) + 2 × C044 (1:191) + 3 × C046 (1:147) ; version sans amortissement : 7 × C066 |
| Encodeur | Encodeur magnétique 12 bits (précision 0.088°) |
| Alimentation | Bras leader 5V6A / Bras follower 12V5A |
| Hôte | PC (Linux) / Raspberry Pi / D-Robotics RDK / NVIDIA Jetson |
| Écosystème | Hugging Face LeRobot (ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5) |
| Pince | PLA rigide (standard) ou TPU souple (mise à niveau) |
| Assemblage | Assemblé, câblé et calibré en usine |

*Les configurations de servos et les packs disponibles sont indiqués sur la page de la boutique.*

## Tutoriels

- **[Cours complet SO-ARM101 7-DOF](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/)** — configuration de l'environnement, remplacement des fichiers 7-DOF, calibration, téléopération, collecte de données, entraînement et inférence, étape par étape
- [Remplacement des fichiers 7-DOF (adapter un clone officiel de lerobot)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- [Tutoriel SO-ARM101 (6 axes)](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Guide de sélection de bras robotique](/fr/tutorials/robot-arms/select-guide)
- [Introduction à l'IA incarnée (LeRobot)](/fr/topics/embodied-ai-intro)

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
