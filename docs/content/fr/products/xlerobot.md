---
title: Robot mobile à deux bras XLeRobot
category: robot
description: Robot mobile à deux bras XLeRobot de Juxi Technology — deux bras SO-ARM101, châssis à roues omnidirectionnelles et tour de caméra, deux cartes de commande des servos en 12V, écosystème LeRobot, disponible en kit monté ou en kit en pièces
keywords: [xlerobot, robot à deux bras, robot mobile, intelligence incarnée, lerobot, so-arm101, châssis à roues omnidirectionnelles]
---

# Robot mobile à deux bras XLeRobot

## Présentation

XLeRobot est une plateforme de robot mobile à deux bras : un châssis mobile à roues omnidirectionnelles (roues folles) lui sert de base mobile et porte, via une tour de caméra, deux bras suiveurs SO-ARM101 ; avec deux cartes de commande des servos, un contrôleur hôte Raspberry Pi / Jetson et une batterie externe PD, le tout constitue un robot open source capable de se déplacer et de manipuler, destiné à la recherche en intelligence incarnée, aux tâches ménagères et au développement dans l'écosystème LeRobot.

**Caractéristiques clés** :

- Manipulation à deux bras + base mobile omnidirectionnelle : saisie de divers objets du quotidien en déplacement
- Basé sur des bras robotisés SO-ARM101 équipés de servos à bus Feetech STS3215-C018
- Tour de caméra + caméra de poignet, pour la collecte de données et l'apprentissage par imitation
- Deux cartes de commande des servos pilotent indépendamment les bras et le châssis, alimentées en 12V
- Écosystème logiciel LeRobot complet : installation de l'environnement, collecte de données, entraînement et inférence
- Disponible en kit monté et en kit en pièces ; le kit en pièces est fourni avec la liste complète des accessoires
- Compatible avec la base Lekiwi (une base Lekiwi existante peut réutiliser directement sa base à roues)

---

## Spécifications

| Catégorie | Spécification |
|------|------|
| Bras | 2 × bras suiveurs SO-ARM101 (servos à bus Feetech STS3215-C018, ID 1-6) |
| Châssis | Châssis mobile à roues omnidirectionnelles, 3 servos STS3215-C018 (ID 7/8/9) |
| Tour de caméra | Base de la tour de caméra + 2 servos STS3215-C018 (ID 7/8) + caméra |
| Commande | 2 × cartes de commande des servos (câble de données USB-C vers USB-A vers le contrôleur hôte ; câble d'alimentation PD vers DC12V3A) |
| Alimentation | Batterie externe PD version 12V (jusqu'à 100W par port, testée comme suffisante pour le fonctionnement) |
| Contrôleur hôte | Raspberry Pi (non inclus) / Jetson |
| Câbles | 2 × rallonges de servo de 90CM (châssis mobile et tour de caméra → cartes de commande des servos) |
| Poids total | Environ 12kg (entièrement assemblé) |
| Logiciel | Écosystème LeRobot ; configuration des servos via Bambot (Windows / macOS / Linux) |

---

## Démarrage rapide

### 1. Configurer l'environnement LeRobot

Choisissez le tutoriel de configuration correspondant à votre système d'exploitation (macOS / Ubuntu / Windows) et installez LeRobot ainsi que ses dépendances.

### 2. Déplacer les fichiers XLeRobot

Déplacez les fichiers XLeRobot dans le répertoire correspondant pour terminer la préparation logicielle.

### 3. Assembler le robot

- **Kit monté** : installez directement le châssis mobile, la base de la tour de caméra, les deux bras et le câblage, conformément à la liste des accessoires
- **Kit en pièces** : configurez d'abord les servos (scannez et renommez les ID avec [Bambot](https://bambot.org/feetech.js)), puis assemblez successivement le chariot, la base à roues, la base des bras et le câblage, et installez enfin la batterie

Avec le kit en pièces, il est recommandé de connecter les câbles d'alimentation en dernier ; gardez l'alimentation débranchée lors du branchement ou du débranchement des autres câbles, afin de protéger les cartes de commande des servos.

---

## Tutoriels complets

- [Vue d'ensemble des tutoriels XLeRobot](/fr/tutorials/robot-arms/xlerobot/)
- [Configuration (macOS)](/fr/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS)
- [Configuration (Ubuntu)](/fr/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu)
- [Configuration (Windows)](/fr/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows)
- [Déplacer les fichiers XLeRobot](/fr/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files)
- [Assemblage du kit monté](/fr/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit)
- [Assemblage du kit en pièces](/fr/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit)

---

## Cas d'usage

- Recherche en intelligence incarnée et apprentissage par imitation (tâches ménagères, saisie d'objets)
- Développement d'algorithmes de manipulation mobile à deux bras (écosystème LeRobot)
- Enseignement et compétitions de robotique
- Prototypage de robots de service domestiques

---

## FAQ

**Q : Quelle est la différence entre le kit monté et le kit en pièces ?**
Le kit monté est un ensemble déjà assemblé selon la liste des accessoires ; le kit en pièces est à assembler soi-même, en configurant d'abord les ID des servos avec l'outil Bambot (bras 1-6, châssis 7/8/9, tour de caméra 7/8).

**Q : Quels autres composants faut-il fournir ?**
La batterie externe, le Raspberry Pi et le câble d'alimentation PD 5V5A pour Raspberry Pi doivent être achetés séparément (comme indiqué dans les tutoriels).

**Q : Comment configurer les ID des servos ?**
Après avoir connecté les servos et la carte de commande des servos à l'ordinateur, utilisez la [page de configuration des servos de Bambot](https://bambot.org/feetech.js) pour scanner et renommer les ID des servos ; le dépôt de code officiel LeRobot ne prend pas encore en charge la configuration des servos autres que ceux des bras, c'est pourquoi Bambot est utilisé à la place.

**Q : Peut-on le déplacer en le poussant une fois assemblé ?**
Non. Une fois complètement assemblé, ne poussez pas le XLeRobot comme un chariot : cela pourrait endommager les engrenages des servos. Pour le déplacer manuellement, soulevez le robot (environ 12kg).

---

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
- 💬 [Retour](https://github.com/Juxi-Technology/wiki-documents/issues)
