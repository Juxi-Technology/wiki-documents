---
title: "Documentation produit AmazingHand"
description: "AmazingHand est une main dextre de haute précision, légère et dotée du suivi de gestes, conçue pour la recherche en intelligence incarnée."
---

# Documentation produit AmazingHand

## Présentation du produit

AmazingHand est une **main dextre de haute précision, légère et dotée du suivi de gestes**, conçue pour la recherche en intelligence incarnée, l'éducation robotique et les applications d'interaction homme-machine. Ce produit utilise 8 servomoteurs série TTL SCS0009 de haute précision et prend en charge l'utilisation d'une main droite, d'une main gauche ainsi que de deux mains simultanément sur un robot, permettant des mouvements de gestes complexes et des fonctions de suivi en temps réel.

### 1. Conception matérielle : haute précision, légèreté, facilité de débogage et extensibilité

- **Configuration des servomoteurs** : une main dextre utilise **8 servomoteurs série TTL SCS0009**, 2 servomoteurs coopérant pour contrôler un même doigt, offrant un contrôle précis du mouvement et une capacité de préhension stable.

- **Structure légère** : le poids total de la main dextre n'est que de 0.416 kg, avec une structure compacte, facile à installer sur toutes sortes de plateformes robotiques.

- **Connexion pratique** : communication via une interface Type-C, avec la carte de commande des servomoteurs et la carte de développement MEGA328P, prêt à l'emploi, ce qui simplifie le processus de connexion matérielle.

- **Conception modulaire** : prend en charge la configuration séparée d'une main droite ou d'une main gauche, ainsi que le travail coopératif de deux mains sur un robot, s'adaptant avec souplesse à différents scénarios d'application.

### 2. Écosystème logiciel : suivi de gestes intégré, développement IA facile à prendre en main

- **Suivi de gestes en temps réel** : technologie de suivi de la main en temps réel basée sur MediaPipe, qui capture les gestes via une webcam pour permettre l'apprentissage par imitation et le contrôle de suivi de la main dextre.

- **Flux de données distribué** : utilise le **moteur de flux de données distribué DORA**, assurant une interaction à faible latence entre le matériel et les algorithmes, et prenant en charge la connexion de bout en bout, des données de gestes jusqu'au contrôle des servomoteurs.

- **Unification de la simulation et du matériel** : fournit un environnement de simulation virtuelle, permettant de valider les algorithmes de contrôle en simulation, puis de migrer sans discontinuité vers le matériel réel.

- **Écosystème open source** : le code de contrôle, les scripts d'entraînement et les tutoriels sont open source, ce qui permet le développement secondaire et l'extension des fonctionnalités.

### 3. Scénarios d'application principaux : de l'enseignement à la recherche, une couverture complète

1. **Initiation à l'éducation robotique** : fournit un tutoriel couvrant tout le processus, de l'assemblage de la main dextre et du débogage des servomoteurs au contrôle de base puis au suivi de gestes, accompagné de programmes de démonstration et de codes d'exemple, permettant aux utilisateurs débutants de démarrer rapidement.

2. **Recherche en intelligence incarnée** : se consacre à la recherche en **apprentissage par imitation de gestes et interaction homme-machine**, et permet d'entraîner la main dextre en capturant les mouvements de la main humaine par caméra ; applications typiques : contrôle par gestes, préhension d'objets, collaboration homme-machine, etc.

3. **Prototypes d'interaction homme-machine** : validation à faible coût de solutions d'interaction homme-machine, adaptée aux scénarios de **contrôle par gestes, téléopération, interaction VR/AR**, pour une validation rapide de prototypes.

### 4. Avantages du produit

- **Rapport qualité-prix élevé** : adopte une solution de servomoteurs série éprouvée, avec un coût maîtrisé, adaptée au déploiement en série pour les particuliers, les laboratoires et les établissements d'enseignement.

- **Suivi de gestes** : fonction de suivi de gestes intégrée, sans matériel complexe supplémentaire ; une caméra ordinaire suffit pour réaliser le contrôle de suivi en temps réel de la main dextre.

- **Convivial pour le développement** : fournit un tutoriel de débogage complet, des programmes de démonstration et des interfaces de développement, du débogage matériel au contrôle logiciel, pour démarrer rapidement.

- **Coordination des deux mains** : prend en charge le fonctionnement indépendant d'une seule main sur un robot, ainsi que le travail coopératif de deux mains, s'adaptant avec souplesse à différents besoins expérimentaux et applicatifs.

### 5. Paramètres du produit

#### Paramètres de base

|Paramètre|Spécification|
|---|---|
|**Poids**|0.416 kg|
|**Nombre de doigts**|4|
|**Degrés de liberté par doigt**|2DoF|
|**Configuration des servomoteurs**|8 servomoteurs SCS0009 (2 servomoteurs contrôlent 1 doigt)|

#### Dimensions

|Paramètre|Spécification|
|---|---|
|**Hauteur (déployée, sans base)**|195 mm|
|**Largeur de la paume**|105 mm|
|**Épaisseur de la paume**|environ 90 mm|
|**Distance maximale d'ouverture entre l'index et le pouce**|180 mm|

#### Paramètres électriques

|Paramètre|Spécification|
|---|---|
|**Tension de fonctionnement**|5-6 V|
|**Alimentation**|Alimenté par un adaptateur secteur 5 V 5 A|
|**Interface de communication**|Type-C|

#### Paramètres de performance

|Paramètre|Spécification|
|---|---|
|**Capacité de charge d'un doigt**|0.2 kg|
|**Charge maximale en serrant les 4 doigts**|0.5 kg|

