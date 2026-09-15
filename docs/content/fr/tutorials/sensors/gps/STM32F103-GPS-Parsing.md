---
title: "Analyse et sortie GPS"
description: "Dans cette leçon, nous allons principalement apprendre à utiliser le STM32F103C8T6 et le module GPS pour réal…"
---

# Analyse et sortie GPS

**1. Objectif d'apprentissage**

Dans cette leçon, nous allons principalement apprendre à utiliser le STM32F103C8T6 et le module GPS pour réaliser la fonction d'analyse et de sortie des informations de position.

**2. Préparation**

Le module GPS utilise la communication UART et USB. Ici, le port UART du STM32 est utilisé pour lire les informations. Connectez le TXD du module à la broche PA10 de la carte STM32F103C8T6. VCC et GND sont connectés respectivement au 5V et au GND du STM32F103C8T6 ; le GND et le RXD du module TTL sont connectés respectivement au GND et au PA9 du STM32.

![Image 1](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/1.png)

**3.** **Programme**

Le débit en bauds du module est de 9600.

![Image 2](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/2.jpg) 

Lire et analyser les données reçues.

![Image 3](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/3.jpg) 

Convertir l'unité des informations de latitude et de longitude en degrés

![Image 4](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/4.jpg) 

Imprimer les données reçues via le port série.

![Image 5](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/5.jpg) 

Remarque : en réalité, les valeurs de coordonnées du positionnement GPS/BeiDou ne sont pas dans une simple relation de facteur 100, mais nécessitent une conversion degrés/minutes/secondes. Pour les valeurs de coordonnées GPS/BeiDou obtenues, par exemple latitude nord 2429.53531, longitude est 11810.78036, il faut effectuer le calcul suivant : 24+（29.53531/60）≈ 24.49225517 118+（10.78036/60）≈118.17967267. De plus, différents microcontrôleurs peuvent présenter une certaine erreur en raison de problèmes de précision de la conversion des données.

**4. Résultat de l'expérience**

Après la mise sous tension, le module a besoin d'environ 32s pour démarrer. Ensuite, la LED d'état d'impression série sur le module clignote en continu, et les données peuvent alors être reçues normalement.

Après le téléchargement et l'exécution du programme, ouvrez le logiciel série, réglez le débit en bauds sur 9600 ; le port série imprime en boucle les informations de position actuelles.

![Image 6](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/6.jpg) 

Notez que l'antenne du module doit être à l'extérieur, sinon le signal GPS risque de ne pas être trouvé.

<RelatedProducts slugs="gps-beidou-module" />
