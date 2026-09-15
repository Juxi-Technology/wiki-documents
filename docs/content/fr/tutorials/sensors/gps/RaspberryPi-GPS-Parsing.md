---
title: "Raspberry Pi : analyse GPS"
description: "Dans cette leçon, nous allons principalement apprendre à lire et à analyser les informations de position à l'…"
---

# Raspberry Pi : analyse GPS

**1. Objectif d'apprentissage**

Dans cette leçon, nous allons principalement apprendre à lire et à analyser les informations de position à l'aide du Raspberry Pi et du module GPS.

**2. Préparation**

Le module GPS utilise la communication UART ou USB ; ici, la communication USB est prise comme exemple.

![Image 1](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/1.png)

Connectez le Raspberry Pi et le module GPS avec un câble Type-C, exécutez la commande ls /dev | grep 'ttyUSB' ; vous pouvez voir que le module vocal est identifié comme USB0.

![Image 2](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/2.jpg) 

**3. Programme**

Pour le programme de cette leçon, veuillez vous référer à : GPS.py

Initialiser l'USB :

![Image 3](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/3.jpg) 

Fonction d'acquisition et d'analyse des informations de position ; dans l'illustration ci-dessous, les informations de position commençant par GNGGA sont filtrées parmi les informations de position, puis les données sont analysées et stockées dans les différentes variables globales.

![Image 4](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/4.jpg) 

![Image 5](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/5.jpg) 

De la même manière, les informations de cap de GNVTG sont acquises et analysées.

![Image 6](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/6.jpg) 

Les données analysées sont imprimées en boucle

![Image 7](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/7.jpg) 

**4. Exécuter le programme**

Saisissez dans le terminal sudo python2 GPS.py pour exécuter le programme.

**5.** **Résultat de l'expérience**

Après la mise sous tension, le module a besoin d'environ 32s pour démarrer. Ensuite, la LED d'état d'impression série sur le module clignote en continu, et les données peuvent alors être reçues normalement.

Après le démarrage du programme, l'initialisation de l'USB commence ; en cas d'initialisation réussie, « GPS Serial Opened! Baudrate=9600 » s'affiche, sinon « GPS Serial Open Failed! ». En cas d'erreur, il faut vérifier le câblage ou le port USB ; ensuite, la position et les informations de cap sont imprimées en boucle.

![Image 8](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/8.jpg) 

Appuyez sur Ctrl+C pour quitter la lecture des informations.

Notez que l'antenne du module doit être à l'extérieur, sinon le signal GPS risque de ne pas être trouvé ; lorsque aucun signal n'est trouvé, « GPS no found » est imprimé.

<RelatedProducts slugs="gps-beidou-module" />
