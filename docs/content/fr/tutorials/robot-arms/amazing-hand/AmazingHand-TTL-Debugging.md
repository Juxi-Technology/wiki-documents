---
title: Tutoriel de débogage de la main robotique (servo TTL)
description: "Téléchargez d'abord l'archive « 灵巧手调试.zip » et extrayez-la ; utilisez ensuite le document « 使用arduio程序调试灵巧手过程（TTL舵机）» pour définir les IDs de servos。"
---

# Tutoriel de débogage de la main robotique (servo TTL)

> **[Acheter en boutique](https://www.juxitech.com/fr/products/amazinghand)**


Téléchargez d'abord l'archive « [灵巧手调试.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc) » et extrayez-la. Vous pouvez ensuite, via le document « 使用arduio程序调试灵巧手过程（TTL舵机）», définir les IDs de servos, calibrer, aligner la position centrale et exécuter le programme de démonstration, ou consulter le [code open source officiel](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample).

**Sans démontage du produit fini** (IDs de servos, calibrage et position centrale réglés en usine), vous pouvez passer directement au **[point 6 : exécuter « 02 演示程序 »](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188003&from=from_node_link)** et au point 7 **[suivi de la main](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188027&from=from_node_link)**.

![image – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/1.png)

## 1. Câblage pour le débogage de la main

Une option : utiliser le PC avec un logiciel hôte Python (logiciel hôte Feetech ou code Python).
L'autre : utiliser un microcontrôleur comme MEGA328P ou une carte de développement/contrôleur achetée.

Câblage comme suit :
(1) Câblage pour le débogage Python (seule la carte driver de servos) :

![1. Câblage pour le débogage de la main – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/2.png)

(2) Câblage pour le débogage MEGA328P (carte driver + carte 328P) :

![1. Câblage pour le débogage de la main – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/3.png)

**Observez bien les positions des broches de la carte MEGA328P !**

![1. Câblage pour le débogage de la main – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/4.png)

![1. Câblage pour le débogage de la main – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/5.png)

![1. Câblage pour le débogage de la main – 5](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/6.png)

Ci-dessous, le processus de débogage avec le microcontrôleur. Le microcontrôleur exécute le programme de démonstration en boucle ; il suffit de débrancher le câble de données pour l'arrêter.

## 2. Définir les IDs de servos

Une main utilise 8 servos : main droite ID 1-8, main gauche ID 11-18

Position centrale en usine : droite [451,571,451,571,451,571,451,571], gauche [571,451,571,451,571,451,571,451]

1. Câblage : connecter **individuellement** servo et carte driver, un par un.

![2. Définir les IDs de servos – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/7.jpg)

2. Utiliser le logiciel hôte FD1.9.8.2 du fabricant pour le réglage
FD.rar

![2. Définir les IDs de servos – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/8.png)

![2. Définir les IDs de servos – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/9.png)

![2. Définir les IDs de servos – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/10.png)

## 3. **Fixer le palonnier du servo**

1. Téléverser le programme « 安装白色伺服喇叭时使用 » sur la carte de développement

Rôle du programme : placer l'engrenage du servo approximativement au centre ; les angles ultérieurs se basent sur cette position centrale.

(1) Installer le logiciel arduino selon votre système : [tutoriel d'installation](https://blog.csdn.net/weixin_35509395/article/details/156188274) ; avant de compiler, installer les bibliothèques FTServo et SCServo dans le gestionnaire de bibliothèques

![3. Fixer le palonnier du servo – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/11.png)

(2) Type de carte : choisir « Arduino Nano »

![3. Fixer le palonnier du servo – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/12.png)

2. Déboguer les servos 1, 2
(1) Modifier : selon l'ID du servo à déboguer (p. ex. index → ID 1, 2)

![3. Fixer le palonnier du servo – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/13.png)

(2) Téléverser le programme
(3) Câbler : carte + carte driver + **servos 1, 2** – on entend l'engrenage tourner d'un angle puis s'arrêter.

![3. Fixer le palonnier du servo – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/14.png)

(4) Monter le palonnier sur l'engrenage, le plus parallèle possible

![3. Fixer le palonnier du servo – 5](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/15.png)

3. Déboguer les servos 3, 4
(1) **Débrancher le câblage entre la carte 328P et la carte driver (sinon pas de téléversement)**
(2) Modifier : ID 3, 4

![3. Fixer le palonnier du servo – 6](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/16.png)

(3) Téléverser le programme
(4) Câbler : carte + carte driver + **servos 3, 4**
(5) Monter le palonnier, le plus parallèle possible

4. Servos 5, 6 – même procédure
5. Servos 7, 8 – même procédure

## 4. **Ajuster finement les valeurs centrales**

1. Téléverser le programme « 01 微调MiddlePos值时使用 »

2. Doigts en position fermée, arrêter immédiatement le programme (débrancher le câble de données) et vérifier l'alignement des palonniers (voir figure). Si non alignés, régler MiddlePos_1 et MiddlePos_2 jusqu'à l'alignement. Noter ces valeurs (8 valeurs pour 8 servos) – utilisées dans le programme final.

![4. Ajuster finement les valeurs centrales – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/17.png)

![4. Ajuster finement les valeurs centrales – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/18.png)

## 5. **Exécuter le programme de test**

1. Remplir les valeurs MiddlePos_1 et MiddlePos_2 dans le tableau suivant et télécharger le programme.

![5. Exécuter le programme de test – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/19.png)

## 6. **Exécuter « 02 演示程序 »**

(1) Installez arduino selon votre système : [tutoriel d'installation](https://blog.csdn.net/weixin_35509395/article/details/156188274)
(2) Dans `灵巧手调试\00 TTL串口舵机\arduino程序（MEGA328P开发板）\02 演示程序`, ouvrir le fichier ino correspondant à la main gauche ou droite

![6. Exécuter « 02 演示程序 » – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/20.png)

(3) Avant de compiler, installer les bibliothèques FTServo et SCServo dans le gestionnaire de bibliothèques

![6. Exécuter « 02 演示程序 » – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/21.png)

(4) Type de carte : « Arduino Nano »

![6. Exécuter « 02 演示程序 » – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/22.png)

(5) Compiler et téléverser

Attention : le PC est connecté uniquement à la carte de développement ; la carte n'est pas encore reliée à la carte driver (donc pas à la main).

Après téléversement réussi, relier la carte à la carte driver avec trois câbles jumper et les servos à la carte driver. Voir [le câblage du débogage MEGA328P](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link).

La main exécute **« 02 演示程序 »** en boucle.

Résultat :

![6. Exécuter « 02 演示程序 » – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/23.png)

## [7. Suivi de la main](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)
