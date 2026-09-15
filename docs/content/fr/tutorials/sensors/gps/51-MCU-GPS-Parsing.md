---
title: "Analyse des données GPS"
description: "Dans cette leçon, nous allons principalement apprendre à utiliser un microcontrôleur 51 de type STC89C52RC et…"
---

# Analyse des données GPS

**1. Objectif d'apprentissage**

Dans cette leçon, nous allons principalement apprendre à utiliser un microcontrôleur 51 de type STC89C52RC et le module GPS pour réaliser la fonction d'analyse des informations de position.

**2. Préparation**

Le module GPS utilise la communication UART et USB. Ici, le port UART du C51 est utilisé pour lire les informations. Connectez le TX du module à la broche P3.0 de la carte 51. VCC et GND sont connectés respectivement à 5V et GND.

![Image 1](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/1.png)

**3.** **Programme**

Initialiser le port série et le tableau de données

![Image 2](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/2.jpg) 

Lire et analyser les données reçues.

![Image 3](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/3.jpg) 

Imprimer les données reçues via le port série.

![Image 4](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/4.jpg) 

**4****. Résultat de l'expérience**

Après la mise sous tension, le module a besoin d'environ 32s pour démarrer. Ensuite, la LED d'état d'impression série sur le module clignote en continu, et les données peuvent alors être reçues normalement.

Après le téléchargement et l'exécution du programme, ouvrez le logiciel série, réglez le débit en bauds sur 9600 ; le port série imprime en boucle les informations de position actuelles.

![Image 5](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/5.jpg) 

Notez que l'antenne du module doit être à l'extérieur, sinon le signal GPS risque de ne pas être trouvé.

<RelatedProducts slugs="gps-beidou-module" />
