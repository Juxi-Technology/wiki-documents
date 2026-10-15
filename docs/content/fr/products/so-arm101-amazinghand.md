---
title: "Bras robotique avec main dextre open source SO-ARM101 & AmazingHand"
category: robot
description: "Le SO-ARM101 & AmazingHand est une plateforme d'IA incarnée open-source complète qui associe le bras robotique 6 axes SO-ARM101 à la main dextre à quatre…"
keywords: ["Bras robotique avec main dextre open source SO-ARM101 & AmazingHand", "SO-ARM101", "AmazingHand", "LeRobot", "SCS0009", "STS3215"]
---

# Bras robotique avec main dextre open source SO-ARM101 & AmazingHand

## Présentation du produit

Le SO-ARM101 & AmazingHand est une plateforme d'IA incarnée open-source complète qui associe le bras robotique 6 axes SO-ARM101 à la main dextre à quatre doigts AmazingHand (8 degrés de liberté). La pince parallèle standard est remplacée par une main à quatre doigts pilotée par un seul servomoteur du bras maître, offrant une saisie et une extension synchronisées des quatre doigts via un mécanisme simple, fiable et assemblé en usine. Basé sur l'écosystème Hugging Face LeRobot, il prend en charge la téléopération maître-esclave, la collecte de données double vue et l'apprentissage par imitation de bout en bout avec ACT, SmolVLA, Pi0, Pi0.5 et GR00T N1.5 — le point de départ idéal pour passer d'une pince à une main dextre.

**SO-ARM101** est un bras robotique 6 axes open-source profondément optimisé par rapport au SO-ARM100. Le routage des câbles et les appariements moteur/engrenage révisés éliminent le problème de rupture de câble au niveau des articulations et ne restreignent plus l'amplitude de mouvement, tout en prenant en charge le suivi maître-esclave en temps réel et une compatibilité transparente avec la boîte à outils Hugging Face LeRobot.

**AmazingHand** est un kit de développement de main robotique à 8 degrés de liberté open-source, à bas coût et entièrement imprimable en 3D. Ses servomoteurs sont logés entièrement à l'intérieur du corps de la main avec une conception interne sans câbles, et chaque doigt est actionné par deux articulations, combinant dextérité et collaboration naturelle entre les doigts.

## Avantages clés

### Main dextre à quatre doigts avec 8 degrés de liberté

AmazingHand offre quatre doigts (pouce, index, majeur et annulaire), deux phalanges articulées par doigt et 8 degrés de liberté au total. Un mécanisme de tringlerie parallèle permet aux doigts de travailler ensemble pour une saisie plus naturelle, tandis que chaque servomoteur est logé dans le corps de la main, sans câblage externe, pour une conception compacte et épurée.

### Un servomoteur unique pilote les quatre doigts

Le servomoteur n°6 (STS3215) sur le bras maître pilote l'ensemble des huit servomoteurs de bus SCS0009 à l'intérieur de la main grâce à une mise en correspondance des plages, de sorte qu'un seul mouvement produit une saisie (poing fermé) ou une extension (paume ouverte) synchronisée des quatre doigts. Une mécanique simple, un contrôle fiable et aucune programmation complexe côté main.

### Apprentissage par imitation de bout en bout avec ACT, SmolVLA, Pi0, Pi0.5 et GR00T N1.5

Exécutez la téléopération maître-esclave pour enregistrer des données de démonstration, puis entraînez une politique d'apprentissage par imitation en un seul passage. Un petit jeu de données suffit pour que le bras suiveur accomplisse des tâches de saisie prédéfinies de manière autonome, et la boucle complète peut être bouclée sans écrire de code à partir de zéro.

### Collecte de données en double vue

Une caméra sur support aérien couvre l'ensemble de l'espace de travail depuis le haut pour établir la position spatiale et l'orientation des objets cibles, tandis qu'une caméra latérale sur support de bureau diffuse le contexte de l'espace de travail en temps réel. Ensemble, elles assurent la précision de la manipulation, réagissent rapidement aux changements de scène et évitent la dérive ou le blocage.

### Assemblé en usine, prêt à l'emploi

Chaque unité est livrée assemblée, câblée et calibrée — branchez l'alimentation et l'USB, et la plateforme est prête pour la téléopération et la collecte de données. Les options de caméra incluent un module autofocus 86° 30 FPS et un module grand angle 100° à mise au point fixe 60 FPS, sans pilote USB et prêt à l'emploi (plug-and-play).

### Intégration transparente avec Hugging Face LeRobot

Réutilisez directement les modèles pré-entraînés, les jeux de données et les bibliothèques d'algorithmes de LeRobot, partagez du code et de l'expérience avec une communauté mondiale de développeurs, et lancez-vous dans l'IA incarnée sans reconstruire la chaîne d'outils vous-même.

## Présentation du matériel

### Versions disponibles (Sélectionnez selon vos besoins en effecteur final) :

| Version | Effecteur final | Contrôle de la main | Adapté pour |
|---|---|---|---|
| Version Pro | Pince flexible en TPU | Contrôle indépendant des servomoteurs | Utilisateurs ayant besoin de la pince à deux doigts standard SO-ARM101 |
| Version Main dextre | Main dextre à quatre doigts AmazingHand | Servomoteur n°6 du bras maître mappé pour piloter 8 servomoteurs de bus à l'unisson | Utilisateurs explorant la saisie dextre et l'apprentissage par imitation de bout en bout |

**Méthode de saisie :** La version Pro utilise une pince à deux doigts, tandis que la version Main dextre utilise une saisie et une extension à quatre doigts. Le contrôle indépendant par doigt n'est pas pris en charge dans la version actuelle et fait partie de la feuille de route de développement.

### Appareils compatibles :

Raspberry Pi / D-Robotics RDK / Contrôleurs de la série NVIDIA Jetson, ainsi que PC hôtes Windows et Linux via série USB. Entièrement compatible avec les projets open-source LeRobot SO-ARM101 et AmazingHand, et prend en charge la plupart des servomoteurs de bus série sur le marché.

### Configuration facile en 3 étapes :

- Connectez la carte de pilote de servomoteur à votre contrôleur Raspberry Pi, RDK ou Jetson avec le câble fourni, puis alimentez le bras maître (DC5521 5V6A) et le bras suiveur (DC5521 12V5A).
- Mettez sous tension et connectez via série USB. Le bras et la main sont livrés assemblés, câblés et calibrés — aucun assemblage mécanique ou configuration d'ID de servomoteur n'est requis.
- Suivez les tutoriels LeRobot fournis pour téléopérer le bras suiveur, collecter des jeux de données double vue et entraîner votre politique d'apprentissage par imitation.

## Spécifications techniques

### Main dextre (AmazingHand)

| Envergure des doigts | 195mm ~ 101mm |
|---|---|
| Degrés de liberté | 8 DDL (pilotés par 8 servomoteurs de bus) |
| Capacité de charge par doigt | 0,2kg (maximum 0,5kg avec les quatre doigts en saisie complète) |
| Nombre de doigts | 4 (pouce, index, majeur, annulaire) |
| Phalanges par doigt | 2 |
| Poids de la main | 0,416kg |
| Plage de flexion des doigts | Première phalange 0~86°, deuxième phalange 0~80° |
| Angle de roulis latéral des doigts | Pouce 20°, autres trois doigts -20°~20° |
| Tension d'alimentation | 6V DC |
| Méthode de contrôle | Pilotée par le servomoteur n°6 du bras maître — saisie/extension synchronisée des quatre doigts |
| Alimentation | Maximum 48W, nominal 4,8W |

### Bras robotique (SO-ARM101)

| Matériau du produit | Bambu PLA+ |
|---|---|
| Dimensions du produit | Bras maître : 111 x 239 x 525 mm

Bras esclave : 111 x 173 x 532 mm |
| Poids du produit | Bras maître : environ 680 g

Bras esclave : environ 690 g |
| Carte de contrôle de servomoteur | Adaptateur de bus série JUXI |
| Caméra | Caméra HD 2 MP mise au point auto 30 FPS (1080p)

Caméra HD 2 MP focale fixe 60 FPS (1080p) |
| Alimentation | DC5521 5V6A (bras maître) / DC5521 12V5A (bras esclave) |
| Système d'exploitation | Windows / Linux |
| Interface de contrôle | Communication série USB |
| Langage de programmation | Python |

### Configuration des servomoteurs

| Position | Modèle de servomoteur | Rapport de réduction | Quantité |
|---|---|---|---|
| Bras maître — Articulation n°2 (7,4 V) | STS3215-C001 | 1:345 | 1 |
| Bras maître — Articulations n°1 et n°3 (7,4 V) | STS3215-C044 | 1:191 | 2 |
| Bras maître — Articulations n°4, n°5 et pince/main n°6 (7,4 V) | STS3215-C046 | 1:147 | 3 |
| Bras esclave — toutes articulations, version Pro (12 V) | STS3215-C018 | 1:345 | 6 |
| Bras esclave — articulations du bras, version main agile (12 V) | STS3215-C018 | 1:345 | 5 |
| Main agile AmazingHand (6 V) | SCS0009-C001 | — | 8 |

### Servomoteur de bus SCS0009 (Main agile)

| Modèle de servomoteur | Feetech SCS0009-C001 (servomoteur de bus série mono-axe 2,3 kg) |
|---|---|
| Vitesse de rotation | 0,07 s/60° (143 tr/min) à 6 V |
| Couple de décrochage | 2,3 kg.cm à 6 V |
| Précision du servomoteur | 0,293° (300/1024) |
| Capteur et plage | Capteur potentiométrique, contrôlable sur 300°, prend en charge à la fois le mode servomoteur commandé par angle et le mode roue à rotation continue |
| Protection | Protection contre les surtensions, le calage et la surchauffe |
| Lecture des données | Prise en charge — retour d'informations sur la température, la vitesse, la tension et la position |
| Déploiement | Deux servomoteurs SCS0009 par doigt, offrant une réponse coordonnée rapide et un mouvement fluide des doigts |

### Servomoteur de bus STS3215 (Bras robotique)

| Paramètre | STS3215-C001 | STS3215-C018 |
|---|---|---|
| Vitesse de rotation | 0,192 s/60° (52 tr/min) à 7,4 V | 0,222 s/60° (45 tr/min) à 12 V |
| Couple de décrochage | 19,5 kg.cm à 7,4 V | 30 kg.cm à 12 V |
| Précision du servomoteur | 0,088° | 0,088° |
| Capteur et plage | Encodeur magnétique haute précision 12 bits, contrôlable sur 360° | Encodeur magnétique haute précision 12 bits, contrôlable sur 360° |
| Protection | Protection contre les surtensions, le blocage et la surchauffe | Protection contre les surtensions, le blocage et la surchauffe |
| Lecture de données | Prise en charge — retour d'angle, de température, de tension et de position | Prise en charge — retour d'angle, de température, de tension et de position |

Le STS3215 intègre deux moteurs à encodeur magnétique de haute qualité avec une réponse coordonnée à la milliseconde près et de multiples modes de fonctionnement, assurant la fluidité et la précision de chaque mouvement du bras.

### Adaptateur de servomoteur de bus JUXI (carte de pilotage)

| Entrée d'alimentation | 7~12 V |
|---|---|
| Connecteur d'alimentation | DC5521 |
| Interface de servomoteur | Interface de bus PH2.0 |
| Interface de communication | USB Type-C |
| Espacement des trous de montage | 37,00 x 28,00 mm |
| Diamètre des trous de montage | 2,5 mm |
| Dimensions du produit | 42,00 x 33,00 mm |
| Poids du produit | 15 g |

La carte présente une conception compacte « plug-and-play » avec un module de protection contre les surtensions TVS pour éviter toute défaillance due à une tension trop élevée. Un câble unique permet de la connecter à un Raspberry Pi, un contrôleur D-Robotics RDK ou NVIDIA Jetson pour un contrôle moteur en temps réel et un retour de données de l'encodeur. Elle prend en charge le bras LeRobot SO-ARM101, la main dextre AmazingHand et la plupart des servomoteurs de bus série du marché.

### Module caméra (Optionnel)

| Résolution | 1080P, 2 MP |
|---|---|
| Options disponibles | Caméra 86° autofocus 30 FPS / caméra 100° grand angle focale fixe 60 FPS |
| Interface | USB, sans pilote et plug-and-play |
| Options de montage | Kit de montage latéral ou supérieur |

### Applications

- **Recherche universitaire** — laboratoires d'enseignement et projets de recherche en robotique, intelligence artificielle et automatisation, notamment pour la saisie dextre et l'apprentissage par imitation.
- **Développeurs et créateurs** — développement d'algorithmes, validation de prototypes, développement secondaire de la main dextre et compétitions de robotique.
- **Établissements éducatifs** — une aide pédagogique idéale pour les cours avancés en programmation d'IA et en vision robotique.
- **Passionnés** — construisez un robot de bureau qui met en pratique les véritables techniques d'IA et saisit des objets avec une main humaine.

## Open Source et écosystème

Ce produit est basé sur le projet open-source LeRobot SO-ARM101 et le projet AmazingHand. La plateforme SO-ARM101 & AmazingHand se connecte en toute transparence à la communauté Hugging Face : les modèles pré-entraînés, les jeux de données et les bibliothèques d'algorithmes de LeRobot peuvent être réutilisés directement, tandis que le code et l'expérience peuvent être partagés avec des développeurs du monde entier, abaissant ainsi la barrière technique d'entrée à l'IA incarnée.

- Le code source est publié sous licence Apache 2.0.
- Les fichiers de conception mécanique sont publiés sous licence CC BY 4.0.

## Options de pack

| Pack | AmazingHand (assemblée) | Version Pro SO-ARM101 | Kit main dextre SO-ARM101 | Kit main dextre (double caméra) |
|---|---|---|---|---|
| Pièces imprimées en 3D | ✓ | ✓ | ✓ | ✓ |
| Main dextre AmazingHand | ✓ | — | ✓ | ✓ |
| Caméra de scène | — | — | — | ✓ |
| Collecte de données double vue | — | — | — | ✓ |
| Téléopération maître-esclave | — | ✓ | ✓ | ✓ |
| Apprentissage par imitation de bout en bout | ✓ | ✓ | ✓ | ✓ |

## Liste des pièces

### Kit main dextre SO-ARM101 :

- 1 x bras maître (assemblé) — 1 x STS3215-C001 (7,4 V, 1:345), 2 x STS3215-C044 (7,4 V, 1:191), 3 x STS3215-C046 (7,4 V, 1:147)
- 1 x bras esclave (assemblé) — 5 x STS3215-C018 (12 V, 1:345)
- 1 x main dextre à quatre doigts AmazingHand (assemblée) — 8 x servomoteurs bus SCS0009-C001 (6 V)
- 2 x adaptateurs de servomoteur bus JUXI (carte de commande de servomoteur)
- 1 x câble d'alimentation DC5521 5V6A (bras maître)
- 1 x câble d'alimentation DC5521 12V5A (bras esclave)
- 2 x câbles USB Type-C
- 4 x clips de fixation
- 1 x concentrateur USB

### Kit main dextre SO-ARM101 (double caméra) :

Tout ce qui est inclus dans le kit main dextre SO-ARM101, plus :

- 1 x kit de montage de caméra (vue de dessus) avec module caméra 2MP 1080P
- 1 x kit de caméra de bureau (vue latérale) avec module caméra 2MP 1080P

### SO-ARM101 Pro (préhenseur en TPU) :

- 1 x bras maître (assemblé) — 1 x STS3215-C001 (7,4 V, 1:345), 2 x STS3215-C044 (7,4 V, 1:191), 3 x STS3215-C046 (7,4 V, 1:147)
- 1 x bras esclave (assemblé) avec préhenseur flexible en TPU — 6 x STS3215-C018 (12 V, 1:345)
- 2 x adaptateurs de servomoteur bus JUXI (carte de commande de servomoteur)
- 1 x câble d'alimentation DC5521 5V6A (bras maître)
- 1 x câble d'alimentation DC5521 12V5A (bras esclave)
- 2 x câbles USB Type-C
- 4 x clips de fixation
- 1 x concentrateur USB

### Amazing Hand (main droite) :

- 1 x main dextre à quatre doigts AmazingHand, entièrement assemblée avec 8 x servomoteurs bus SCS0009-C001 (6 V)
- 1 x adaptateur de servomoteur bus JUXI (carte de commande de servomoteur)
- 1 x câble d'interconnexion


## Tutoriels

- [Tutoriel SO-ARM101](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Montage SO-ARM101](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Guide de sélection de bras robotique](/fr/tutorials/robot-arms/select-guide)
- [Introduction à l'IA incarnée (LeRobot)](/fr/topics/embodied-ai-intro)
- [Contrôle d'interface AmazingHand](/fr/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Exemple officiel AmazingHand](/fr/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
- [Débogage TTL AmazingHand](/fr/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)


## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
