---
title: "Découvrir LeRobot"
description: "Découvrez l'intelligence incarnée, le framework LeRobot et le bras SO-ARM101 à servomoteurs Feetech : jeux de données, apprentissage par imitation et VLA."
---

# Découvrir LeRobot

## Qu'est-ce que l'intelligence incarnée ?

Une intelligence dotée d'un corps. Intégrer l'IA à divers objets matériels, par exemple :

Chiens robots quadrupèdes, robots humanoïdes bipèdes, robots à roues et jambes, drones, voitures autonomes

## Qu'est-ce que LeRobot ?

LeRobot est le `framework logiciel de robotique à intelligence incarnée` open source de HuggingFace

Adresse Github : https://github.com/huggingface/lerobot

Mise en œuvre à faible barrière : l'apprentissage par renforcement et l'**apprentissage par imitation (VLA)**, avec la **collecte de données, l'entraînement d'algorithmes et le déploiement d'inférence**, dont l'essentiel est l'**apprentissage par imitation (VLA)**

- Quels robots peuvent être développés avec LeRobot ?

Du bras robotisé SO-ARM 101 à quelques milliers de yuans, au petit véhicule LeKiwi, jusqu'aux bras piper Songling à plusieurs dizaines de milliers, aux bras StarAI Huaxinjing, à la main habile Hope-JR, jusqu'au robot humanoïde Unitree G1 à plus de cent mille yuans. LeRobot est devenu, dans le secteur de l'intelligence incarnée, la norme pour la collecte de données et l'entraînement d'algorithmes.

Vous pouvez aussi adapter votre propre robot au framework LeRobot.

- Jeux de données et modèles LeRobot

LeRobot définit son propre format de jeu de données d'apprentissage par imitation ; vous pouvez consulter, utiliser, télécharger et entraîner tous les jeux de données et modèles publics sur HuggingFace, et également téléverser vos propres jeux de données sur HuggingFace.

## Qu'est-ce que le bras robotisé SO-ARM 101 ?

Ce tutoriel prend comme exemple le bras robotisé SO-ARM 101, qui utilise des pièces structurelles imprimées en 3D et des servomoteurs Feetech, pour un coût très faible.

C'est un corps d'intelligence incarnée abordable même pour un étudiant sans moyens, et l'un des corps recommandés par LeRobot officiel.

Le bras robotisé comprend deux bras : le bras maître (Leader) et le bras esclave (Follower). Chaque bras possède 6 degrés de liberté (5 degrés de liberté d'articulation + 1 degré de liberté de pince).

## De quelle configuration d'ordinateur ai-je besoin

Un ordinateur portable Windows ordinaire suffit pour toutes les opérations précédant l'entraînement

Un ordinateur Mac ordinaire suffit pour toutes les opérations

Un ordinateur Ubuntu avec carte graphique NVIDIA suffit pour toutes les opérations

Dans ce tutoriel, l'entraînement du modèle utilise la [plateforme de GPU cloud](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1) ; nul besoin d'une configuration élevée sur votre propre ordinateur

## Qu'est-ce que l'**apprentissage par imitation et le VLA** ?

Un humain guide le robot pour collecter des données par démonstration et former un jeu de données. Ce jeu de données sert ensuite à entraîner un algorithme d'apprentissage par imitation, finalement déployé sur le robot, afin qu'il imite de manière autonome les actions de l'humain et généralise à l'environnement réel. Aucun besoin de téléopération ni de télécommande.

Par exemple, dans la vidéo ci-dessus, un humain guide le bras SO-ARM pour attraper des écrevisses, les tremper dans la sauce et les mettre dans l'huile brûlante, pour finalement laisser le bras accomplir cette action de manière autonome. Même face à une nouvelle écrevisse, il réagit à tout moment et accomplit l'action.

L'apprentissage par imitation porte aussi un nom avant-gardiste à la mode : VLA (grand modèle vision-langage-action). C'est également le domaine de recherche sur l'intelligence incarnée qui se développe le plus rapidement, attire le plus d'investissements, connaît la concurrence la plus intense entre la Chine et les États-Unis, bénéficie de l'écosystème open source le plus florissant, suscite la plus grande attention des médias et voit d'innombrables étudiants de master et de doctorat s'y engouffrer.

L'algorithme principalement adapté par LeRobot est l'apprentissage par imitation. Par exemple ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS, etc.

L'apprentissage par imitation dans ce tutoriel se limite au VLA.

<RelatedProducts slugs="so-arm101" />
