---
title: Kit de développement SO-ARM101
category: robot
description: "Le kit robotique à deux bras open source de Juxi Technology — bras 6 DOF, écosystème LeRobot, téléopération/apprentissage par imitation"
keywords: [so-arm101, bras robotique, leRobot, téléopération, deux bras]
---

# Kit de développement SO-ARM101

> **[Acheter en boutique](https://www.juxitech.com/fr/products/so-arm101-developers-kit)**

## Présentation

Le SO-ARM101 est le kit de développement robotique à deux bras 6-DOF open source de Juxi Technology, profondément intégré à l'écosystème **LeRobot**. Bras leader noir + bras follower blanc, prêt à l'emploi pour la téléopération, la collecte de données d'apprentissage par imitation et l'entraînement de politiques.

**Caractéristiques clés** :

- Deux bras, 6 DOF chacun, servos à bus
- Intégration LeRobot (HuggingFace) — politiques ACT/Diffusion/Pi0
- Prise en charge Jetson / PC (Linux)
- Matériel entièrement open source (schémas/CAO/firmware)

## 1. Conception matérielle : modulaire et hautes performances, facile à assembler et personnalisable

- **Matériaux de structure** : la structure centrale associe des pièces imprimées en 3D à des composants porteurs renforcés ; le câblage et la conception des articulations sont optimisés pour éviter les interférences de mouvement, tout en conciliant légèreté et durabilité. L'utilisateur peut imprimer lui-même des pièces de remplacement ou des extensions structurelles.

- **Configuration d'entraînement** : le bras esclave embarque **6 servomoteurs à couple élevé de 12 V / 30 kg à encodeur magnétique** ; associés à une rétroaction d'encodeur magnétique à 360° et à un algorithme de commande PID, ils offrent un mouvement fluide et sans secousses, une grande précision de répétabilité et des mouvements puissants et précis ; le bras maître utilise quant à lui **6 servomoteurs de 7,4 V**, avec des rapports de réduction répartis selon la charge de chaque articulation, pour faciliter l'apprentissage par guidage manuel.

- **Système de vision** : prend en charge un système de vision intelligent à deux caméras ; la caméra en bout de bras capture les détails de préhension à courte distance, la caméra globale couvre l'environnement de travail, et la fusion des données des deux caméras construit un modèle en trois dimensions, offrant un riche support de données pour l'apprentissage par imitation.

- **Connexion de commande** : équipé d'une carte de commande de servomoteurs, il se connecte directement à un ordinateur ou à un Raspberry Pi via un port USB-C, en plug-and-play, ce qui simplifie le processus de connexion matérielle et permet de mettre en place rapidement un environnement de commande.

## 2. Écosystème logiciel : intégration poussée de LeRobot, développement de l'IA à la portée de tous

- **Compatibilité du framework principal** : adaptation poussée au **framework ML open source pour la robotique LeRobot** de Hugging Face, construit sur PyTorch, avec des modèles pré-entraînés, des jeux de données multi-scénarios et un environnement de simulation intégrés ; compatible avec des jeux de données open source réputés tels que Stanford ALOHA.

- **Communication à faible latence** : recourt au **moteur distribué de flux de données DORA**, qui assure une interaction à faible latence entre le matériel et les algorithmes ; les performances d'exécution en Python sont 17 fois supérieures à celles de ROS2, avec prise en charge du rechargement à chaud du code, permettant d'ajuster la stratégie en temps réel sans redémarrage.

- **Open source sur toute la pile** : les fichiers d'impression 3D du matériel, le code de commande logiciel, les scripts d'entraînement d'IA et l'ensemble des tutoriels sont **entièrement open source** ; l'utilisateur peut les modifier librement, les redévelopper et étendre rapidement les fonctionnalités selon ses besoins.

## 3. Scénarios d'application principaux : de l'initiation au déploiement, adaptés à tous les cas d'usage

1. **Initiation à l'éducation robotique** : fournit un tutoriel couvrant tout le processus, de l'assemblage du bras robotisé et de la programmation de base au déploiement de stratégies d'IA, accompagné d'une interface de commande visuelle et de codes d'exemple ; les utilisateurs débutants peuvent rapidement maîtriser le contrôle des robots et les compétences d'application de l'IA.

2. **Validation d'algorithmes de recherche** : dédié à la recherche sur **l'apprentissage par imitation et l'apprentissage par renforcement**, il permet d'enregistrer en VR des données d'opération humaine pour entraîner le robot ; cas typique : à partir de 50 séquences vidéo d'opération de 15 secondes, 2 heures d'entraînement suffisent pour maîtriser des tâches telles que plier le linge, insérer une clé ou trier des matériaux.

3. **Prototypage industriel léger** : validation à faible coût de solutions d'automatisation, adapté à des scénarios tels que **la manutention de matériaux, l'assemblage de précision et le tri de pièces** ; il offre les fonctions essentielles d'un bras robotisé industriel pour un coût de l'ordre du millier de yuans, permettant une validation rapide de prototypes.

## Spécifications

| Catégorie | Spécification |
|------|------|
| Type | Robot de téléopération à deux bras |
| DOF | 6 DOF par bras |
| Actionnement | Servos à bus Feetech |
| Hôte | PC (Linux) / Jetson |
| Écosystème | LeRobot, ROS 2, ROS 1 |
| Alimentation | Leader 5V6A / Follower 12V5A |
| Charge utile | 500g |
| Répétabilité | ±0.1mm |
| Rayon de travail | 520mm |
| Communication | USB-C |
| Matériau | Bambu Lab PLA+ |
| Dimensions (maître / suiveur) | 111×239×525 mm / 111×173×532 mm |

![Schéma coté des bras maître et suiveur](../../../public/images/products/so-arm101/dimensions.jpg)

## Démarrage rapide

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## Tutoriels

- [Tutoriel SO-ARM101](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Montage SO-ARM101](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Guide de sélection de bras robotique](/fr/tutorials/robot-arms/select-guide)
- [Introduction à l'IA incarnée (LeRobot)](/fr/topics/embodied-ai-intro)

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
