---
title: "Tutoriel Arduino Nano"
description: "Exécuter le « programme de démonstration 02 » d'AmazingHand avec un Arduino Nano (328P) et une carte driver de servos : câblage, installation des bibliothèques, compilation, téléversement et résultat."
---

# Tutoriel Arduino Nano

## Câblage (carte driver de servos + carte Nano)

**Observez bien l'emplacement des broches de la carte Nano (c'est-à-dire la carte de développement 328P) !**

![Illustration](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/01.png)

![Illustration](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/02.png)

![Illustration](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/03.png)

![Illustration](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/04.png)

Voici le processus de débogage avec le microcontrôleur. Le microcontrôleur exécute le programme de démonstration en boucle continue ; il suffit de débrancher le câble de données pour l'arrêter.

## Exécuter le « programme de démonstration 02 »

1. Installez vous-même l'IDE Arduino.

2. Selon qu'il s'agit de la **main gauche ou de la main droite**, ouvrez le fichier `.ino` correspondant.

   ![Illustration](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/05.png)

3. Avant de compiler et de téléverser le programme Arduino sur la carte Nano, installez la **bibliothèque FTServo** et la **bibliothèque SCServo** dans le « gestionnaire de bibliothèques ».

   ![Illustration](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/06.png)

4. Pour le type de carte, sélectionnez « **Arduino Nano** ».

   ![Illustration](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/07.png)

5. Compiler et téléverser.

> **Attention :** à ce stade, l'ordinateur est uniquement connecté à la carte Nano ; la carte Nano n'est pas encore reliée à la carte driver de servos (c'est-à-dire pas reliée à la main dextre).

Une fois le téléversement réussi, reliez la carte Nano à la carte driver de servos avec trois câbles jumper, puis les servos à la carte driver ; voir [le câblage lors du débogage de la carte Nano MEGA328P](https://juxitech.feishu.cn/wiki/Wt46wtt26imdWkkQlxTcL87qnHd#share-HdS4dNgwyo2seVxRZ9PcZ1R3nuc).

La main dextre exécute en boucle continue le « programme de démonstration 02 » ; le résultat est le suivant :

![Illustration](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/08.png)
