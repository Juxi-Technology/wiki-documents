---
title: Tutoriel d'assemblage du robot mobile Lekiwi
description: "Dans Fusion360 CAD en ligne, les positions exactes des composants peuvent être visualisées."
---

# Tutoriel d'assemblage du robot mobile Lekiwi

> **[Acheter en boutique](https://www.juxitech.com/fr/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

[*Dans le CAO en ligne Fusion360*](https://a360.co/4k1P8yO)*, vous pouvez visualiser la position exacte des composants.*

[Fichier URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Aperçu URDF en ligne https://urdf.d-robotics.cc/

## 1. Assemblage des modules de roue (3 par robot)

1. Utilisez 12 vis autotaraudeuses **M2x6** pour fixer le moteur d'entraînement au support moteur. (Fournies avec la boîte du servo.)

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-01.png)
![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-02.png)

2. Utilisez 12 vis métalliques **M3x16** et 12 **écrous M3** pour fixer les servos à la plaque de base à l'aide des supports de moteur d'entraînement.

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-03.jpg)

3. Retirez les vis métalliques et les écrous des roues omnidirectionnelles de 82 mm.

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-04.png)

4. Utilisez des vis m3\*6 pour fixer le palonnier au servo.

![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-05.png)

5. Installez 4 écrous frein dans l'accouplement. Commencez par utiliser 4 vis m3\*6 pour fixer l'accouplement au palonnier du servo.

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-06.png)
![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-07.png)

6. Utilisez des vis métalliques m3\*25 et des écrous frein pour fixer les roues omnidirectionnelles de 82 mm à l'accouplement.



Une fois les trois roues installées sur la plaque de base :

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-09.jpg)

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-10.png)

## 2. Assemblage de la plaque de base

1. Insérez 2 écrous M3 dans les trous de la carte de commande de servo et du support de batterie. Utilisez 4 vis à tête hexagonale M3x12 pour fixer l'ensemble à la plaque de base.

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-11.png)
![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-12.png)

2. Utilisez 2 vis à tête hexagonale M3\*12 et 2 écrous M3 pour installer la carte de commande de servo et la relier aux 3 servos.

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-13.png)

Connexions des câbles de la batterie portable

- L'**entrée d'alimentation** se connecte directement à l'alimentation

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-14.png)
![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-15.png)

- L'interface **USB-C** fournit une alimentation 5V au Raspberry Pi
- Si vous utilisez un **bras robotisé 12V**, alimentez la **carte de commande des servos** directement avec le **répartiteur d'alimentation DC**

![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-16.png)
![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-17.png)

Les câbles peuvent être connectés comme illustré sur la figure ci-dessous :

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-18.png)

## 3. Assemblage de la plaque supérieure

1. Placez le Raspberry Pi 5 au fond du boîtier du Raspberry Pi, puis clipsez le couvercle du boîtier.

2. Utilisez deux vis à tête hexagonale M3x16 et deux écrous M3 pour fixer le Raspberry Pi à la plaque de base supérieure, et utilisez quatre vis métalliques M4x25 et quatre écrous M4 pour installer la base du bras robotisé SO-101.

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-19.png)

## 4.

1. Faites passer le câble USB-C vers USB-A de la carte de commande de servo, le câble d'alimentation USB-C 5V et les câbles des servos à travers les trous de la plaque supérieure.

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-20.png)

2. Utilisez 8 vis métalliques m3x16 et 4 écrous m3 pour installer la plaque supérieure sur les supports moteur.

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-21.png)



## 5. Installation des caméras

*Remarque : le support que nous avons conçu est adapté à la caméra que nous avons sélectionnée. D'autres modules de caméra peuvent nécessiter des modifications.*

## (Option 1) Installation de la caméra frontale

①Utilisez 4 vis entretoises m2\*5\*5 pour fixer le module de caméra

②Utilisez 2 vis métalliques m3\*12 et 2 écrous m3 pour installer le support de la caméra frontale sur la plaque de base

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-22.webp)
![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-23.webp)

## (Option 2) Installation de la caméra montée sur le bras

Utilisez 4 vis entretoises m2\*5\*5 pour fixer le module de caméra

Ce support accepte les caméras dont l'entraxe des trous est de 24\*25mm ou 28\*28mm

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-24.png)

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-25.png)

## 6. Branchement de l'alimentation et câblage

Branchez l'adaptateur de fiche DC sur la **carte de commande de servo** ;

Branchez le connecteur USB-C 5V sur le **Raspberry Pi 5** pour alimenter l'électronique ;

Les câbles de données USB de la carte de commande de servo et des caméras peuvent être branchés directement sur le Raspberry Pi.

![image – 26](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-26.png)
