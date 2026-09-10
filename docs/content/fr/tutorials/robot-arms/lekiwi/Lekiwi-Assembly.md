---
title: Tutoriel d'assemblage du robot mobile Lekiwi
description: "Dans Fusion360 CAD en ligne, les positions exactes des composants peuvent être visualisées."
---

# Tutoriel d'assemblage du robot mobile Lekiwi

> **[Acheter en boutique](https://www.juxitech.com/fr/products/lekiwi-embodied-intelligence-mobile-robotic-car)**


[*Fusion360 CAD en ligne*](https://a360.co/4k1P8yO)*permet de visualiser les positions exactes des composants.*
[Fichier URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)
Prévisualisation URDF en ligne https://urdf.d-robotics.cc/

# 1. Monter le module de roue (3 par robot)

1. Fixer le moteur d'entraînement au support moteur avec 12 vis autotaraudeuses **M2x6** (fournies avec le boîtier servo).

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/1.jpg)

![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/10.jpg)





2. Fixer le support moteur à la plaque de base avec 12 **vis à métaux M3x16 et 12** .

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/11.jpg)



3. Retirer les vis et écrous de la roue omnidirectionnelle 82 mm

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/12.jpg)



4. Fixer le palonnier au servo avec des vis m3*6

![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/13.jpg)



5. Insérer 4 écrous frein dans l'accouplement et fixer l'accouplement au palonnier avec 4 vis m3*6

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/14.jpg)

![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/15.jpg)





6. Fixer la roue omnidirectionnelle 82 mm à l'accouplement avec des vis à métaux m3*25 et des écrous frein

Une fois les trois roues montées sur la plaque de base :

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/16.jpg)

![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/17.jpg)

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/18.jpg)







# 2. Assemblage de la plaque de base

1. Insérer les écrous M3 dans les trous de la carte driver de servos et du support de batterie. Fixer les deux à la plaque de base avec 4 vis M3x12.

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/19.jpg)

![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/2.jpg)





2. Monter la carte driver de servos avec quatre entretoises laiton M2.5*6.5 et quatre vis M2.5*8, puis la connecter aux 3 servos.



Connexion des câbles de la batterie externe

- **Entrée d'alimentation** directement à la source





- **USB-C** fournit 5 V au Raspberry Pi
- Avec un **bras robotique 12 V**, alimenter directement la **carte moteurs de servos** via le **diviseur d'alimentation DC**





Les câbles se connectent comme sur la figure :

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/20.jpg)

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/21.jpg)

![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/22.jpg)

![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/3.jpg)

![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/4.jpg)

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/5.jpg)



# 3. Assemblage de la plaque supérieure

1. Placer le Raspberry Pi 5 dans la partie inférieure du boîtier et encliqueter le couvercle.
2. Fixer le Raspberry Pi à la plaque supérieure avec deux vis M3x12 et deux écrous frein M3, puis monter le socle du bras SO-101 avec quatre vis M4x25 et quatre écrous frein M4. On peut utiliser notre socle SO-101 amélioré ou l'original – la plaque a des trous pour les deux.

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/6.jpg)



# 4.

1. Faire passer le câble USB-C vers USB-A de la carte driver, le câble d'alimentation USB-C 5 V et le câble servo SO0-101 par les trous de la plaque supérieure.

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/7.jpg)



2. Fixer la plaque supérieure au support moteur avec 6 vis M3x12 et 6 écrous frein M3.

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/8.jpg)



3. Relier plaque supérieure et plaque de base avec 6 entretoises laiton M3*50 et 6 vis à métaux M3*

# 5. Installer la caméra

*Remarque : notre support est conçu pour la caméra choisie. D'autres modules caméra peuvent nécessiter des modifications.*

## (Option 1) Installer la caméra avant

Monter le support de caméra avant sur la plaque de base avec 3 vis m3*12 et trois écrous m3
Fixer le module caméra avec 4 vis entretoises m2*5*5

## (Option 2) Installer la caméra montée sur bras

Fixer le module caméra avec 4 vis entretoises m2*5*5

# 6. Brancher l'alimentation

Insérer l'adaptateur cylindrique DC dans la carte driver et le connecteur USB-C 5 V dans le Raspberry Pi 5 pour alimenter l'électronique. Les câbles de données USB de la carte driver et de la caméra se branchent directement sur le Raspberry Pi.


![Option 2 Install an arm-mounted camera – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/9.jpg)



