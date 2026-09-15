---
title: "Assemblage du kit en pièces"
description: "Assemblage du kit en pièces XLeRobot : construire les bras SO101, configurer les servos Feetech STS3215 et monter le châssis et la tête."
---

# Assemblage du kit en pièces

![Image 1](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/1.png)

Astuce

Si vous préférez éviter le plaisir de serrer des vis, vous pouvez aussi acheter le [kit pré-assemblé](https://item.taobao.com/item.htm?ft=t&id=1002551208989&spm=a21dvs.23580594.0.0.47b32c1bwUlxLA&skuId=6088534920039) des bras suiveurs SO101 compatibles avec Xlerobot.



## 🦾 Bras robotisé SO101

![Image 2](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/2.png)

> Si vous disposez déjà de 2 bras robotisés SO101 assemblés avec les servos configurés, passez cette étape.
> 
> 

- Construisez 2 bras robotisés SO101 en suivant les [instructions d'assemblage pas à pas du SO101](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g), en réalisant 2 bras suiveurs identiques, équipés de 2 jeux de servos (tous avec l'ID 1-6 précédemment) pour les 2 cartes de commande des servos.

- Ajoutez la caméra de poignet en suivant ce [guide d'installation](https://juxitech.feishu.cn/wiki/LjJywf5ILihuwkkOboGcFx1Qnkc).

- Si vous disposez de patins antidérapants, vous pouvez les coller sur la pince.

## 一、Configurer les servos

||Quantité|ID du servo|Utilisation|
|---|---|---|---|
|Servo Feetech STS3215-C018|3|7、8、9|Châssis mobile à roues omnidirectionnelles|
|Servo Feetech STS3215-C018|2|7、8|Kit de membre supérieur-tour de caméra|
|Rallonge de servo de 90CM|2||Relier le châssis mobile et la tour de caméra à la carte de commande des servos|

![Image 3](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/3.png)

> Comme le dépôt de code officiel lerobot ne prend actuellement pas en charge les configurations de servos autres que le bras robotisé, nous utilisons [Bambot](https://bambot.org/) à la place (il fonctionne sous Windows et Mac ; sous Linux, vous devez d'abord exécuter sudo chmod 666 /dev/ttyACM0).
> 
> 

```Plain Text
sudo chmod 666 /dev/ttyACM0
```

- Connectez les servos que vous souhaitez configurer (un par un) à la carte de commande des servos, puis connectez directement la carte de commande des servos à votre ordinateur.

- Rendez-vous sur la [page de configuration des servos de Bambot](https://bambot.org/feetech.js), établissez la connexion et scannez vos servos. 

![Image 4](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/4.png)

- Renommez les ID des servos selon les instructions ci-dessous. 

![Image 5](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/5.png)

- Outre les bras robotisés SO101, vous devez également configurer deux jeux de servos pour les 2 cartes de commande des servos :

    - un jeu pour la **tour de caméra** (ID des servos : 7, 8)

    - l'autre jeu pour le **châssis mobile à roues omnidirectionnelles** (ID des servos : 7, 8, 9).

- Astuce : écrivez les numéros sur les servos avec un marqueur, et distinguez les servos des différentes cartes (par ex. L1-L8 et R1-R9).

## 🛒 Chariot

- Si vous jetez accidentellement le manuel, [en voici une copie](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manuals_raskog_utility_cart.pdf).

![Image 6](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/6.png)

## 🧑🦼➡ Base à roues

> Si vous disposez déjà d'une base Lekiwi, retirez la batterie, les supports de servos, etc. La plaque inférieure ne nécessite que 3 servos avec roues installés (conservez le câblage).
> 
> 

![Image 7](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/7.png)

**Remarque**

Ne vous trompez pas de plaque, chaque plaque a un ordre spécifique.

- Installez les roues omnidirectionnelles sur la plaque selon la figure ci-dessus.

    - Les ID de servos spécifiques doivent être installés en conséquence.

- Notez que les connecteurs des roues omnidirectionnelles nécessitent 3 vis M4.

- Câblez les servos normalement selon le [tutoriel](https://github.com/SIGRobotics-UIUC/LeKiwi/blob/main/Assembly.md#2-bottom-plate-assembly) ; ensuite, ne connectez pas les câbles des servos à la carte de commande des servos, mais utilisez la **rallonge de servo de 90CM** pour les relier à la carte de commande des servos.

![Image 8](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/8.png)

- Installez la plaque supérieure selon la figure ci-dessus.

- Laissez la **rallonge de servo de 90CM** pendre ; ne la sortez pas encore du trou de la plaque supérieure.

![Image 9](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/9.png)

- Installez 3 connecteurs (rehausses) sur la plaque supérieure selon la figure ci-dessus.

Astuce

Placez la base Lekiwi avec les connecteurs sous le chariot et vérifiez si elle exerce suffisamment de pression sur le chariot pour que ses quatre roues touchent encore le sol. Sinon, essayez de modifier le modèle 3D du connecteur en ajustant légèrement l'échelle de l'axe Z directement dans le logiciel de découpe (en conservant l'échelle des axes X et Y inchangée) et de le réimprimer.

![Image 10](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/10.png)

Astuce

Retournez le chariot pour réaliser l'assemblage suivant.

- Installez maintenant la base Lekiwi avec les connecteurs sous le bas du chariot, la plaque la plus fine de l'autre côté.

- Référez-vous aux images pour trouver l'orientation d'assemblage requise selon l'index des servos.

Remarque

Cette nouvelle version du matériel est compatible avec le maillage métallique du chariot ; les 12 vis M3 doivent toutes pouvoir se monter facilement.

![Image 11](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/11.png)

- Ensuite, faites passer vers le haut les câbles précédemment rallongés depuis le dessous à travers le chariot.

## 🦾 Base du bras robotisé

### Assemblage de la base supérieure

14 vis hexagonales M3\*12

4 vis hexagonales M3\*16

![Image 12](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/12.png)

- L'assemblage est plus facile lorsque la base est retournée.

### Assemblage de la tête

①Utilisez d'abord la rallonge de servo de 90CM (noir et blanc alternés) et le câble de servo (blanc, rouge et noir alternés) branchés sur le servo n° 7.



②Utilisez quatre vis à rondelle M2\*6 pour fixer la caméra

![Image 13](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/13.png)

- Notez que lors de l'installation du palonnier de servo, ne mettez pas de vis dans le trou central du palonnier.

- Cela doit être identique aux deux premières étapes de l'[assemblage du bras robotisé SO101](https://huggingface.co/docs/lerobot/so101#joint-1).

## 🧵 Câblage

Important

Avant de clipser la base supérieure sur le chariot, terminez tout le câblage et la gestion des câbles de la base supérieure, et placez le Raspberry Pi dans son boîtier.

![Image 14](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/14.png)

- Connectez la rallonge de servo de 90CM provenant de la **base Lekiwi** au **bras robotisé SO101 gauche** (cela transforme la base et le bras en Lekiwi).

- Connectez 2 **câbles de données USB-C vers USB-A ** des 2 **cartes de commande des servos** au **Raspberry Pi** (les 2 ports USB-A restants sont destinés aux caméras) ou à une carte mère Jetson.

- Connectez les 3 **câbles d'alimentation** : 2 câbles **USB-C vers DC (12V)** provenant des 2 cartes de commande des servos et 1 câble **USB-C vers USB-C** provenant du **Raspberry Pi**, aux ports de charge rapide PD de l'alimentation. Chaque port fournit jusqu'à 100 W lors d'une charge simultanée, ce qui a été testé comme suffisant pour prendre en charge le fonctionnement de la version 12V.

### 🔋 Mise en place de la batterie 🛒

- Placez-la n'importe où sur l'étage intermédiaire ou inférieur du chariot afin de maintenir un centre de gravité bas. La batterie possède un fond antidérapant et ne glisse pas facilement en fonctionnement normal.

- Maintenez-la debout par sécurité.

- Si vous jetez aussi accidentellement le manuel de la batterie, [en voici une copie](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manual_Anker_SOLIX_C300_DC_Portable_Power_Station.pdf).

Important

Pour protéger les cartes de commande des servos, veillez à connecter les câbles d'alimentation en dernier. Débranchez toujours les câbles d'alimentation lorsque vous branchez ou débranchez d'autres câbles.

## 📸 Assemblage final

### Installation de la base dans le chariot

Important

Avant de clipser la base supérieure sur le chariot, terminez tout le câblage et la gestion des câbles de la base supérieure, et placez le Raspberry Pi dans son boîtier.

![Image 15](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/15.png)

- Faites attention à ne pas endommager le boîtier lorsque vous insérez le bord du chariot dans la prise du boîtier.

- Pour faciliter les tests, les bras robotisés SO101 sont directement clipsés sur le chariot. Positionnez la [base du bras robotisé](https://github.com/Vector-Wangel/XLeRobot/blob/main/3D_Models/3D_models_for_printing/XLeRobot_special/SO_5DOF_ARM100_Assemblybases.stl) aux deux coins de l'étage supérieur du chariot, puis fixez-la avec des **pinces de fixation de type F**.

- Si vous disposez d'une bobine de filament en carton Bambu Lab, n'oubliez pas de la placer à l'intérieur pour fournir un support structurel stable.

![Image 16](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/16.png)

Après avoir terminé ces étapes, le XLeRobot devrait être physiquement bien assemblé et prêt à faire quelques tâches ménagères.

![Image 17](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/17.png)

![Image 18](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/18.png)

Important

Une fois le XLeRobot entièrement assemblé, ne le poussez pas partout comme un chariot, car cela pourrait endommager les engrenages des servos. Au contraire, lorsque vous devez le déplacer manuellement, soulevez le robot (~12kg).

<RelatedProducts slugs="xlerobot" />
