---
title: Guide de montage du bras robotique Lerobot
description: "Version Pro : bras leader 5V6A, bras follower 12V5A"
---

# Guide de montage du bras robotique Lerobot

> **[Acheter en boutique](https://www.juxitech.com/fr/products/so-arm101-developers-kit)**


![image – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

**Version Pro : le bras leader (noir) utilise un adaptateur 5V6A, tandis que le bras follower (blanc) utilise un adaptateur 12V5A**

Le réglage des ID des servos, la calibration des angles et le montage doivent être effectués à l'avance ; voir le [tutoriel de montage officiel](https://huggingface.co/docs/lerobot/so101).

## Étape 1 : Régler les ID des servos et installer les pignons (sauf le servo n° 5)

![image – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.png)

Encore une fois, assurez-vous que les ID des articulations et les rapports d'engrenage correspondent strictement à ceux du **SO-ARM101**.

Chaque moteur du bus possède un ID unique. Les moteurs neufs sont généralement livrés avec un ID par défaut ` 1 `. Pour garantir une communication normale entre le moteur et le contrôleur, il faut d'abord définir un ID unique pour chaque moteur. De plus, la vitesse de transmission des données sur le bus est déterminée par le baudrate. Pour pouvoir communiquer entre eux, le contrôleur et tous les moteurs doivent être configurés avec le même baudrate ; celui des servos de ce bras robotique est 100000.

Pour cela, il faut d'abord connecter le contrôleur à chaque moteur séparément pour la configuration. Comme ces paramètres sont écrits dans la zone non volatile de la mémoire interne du moteur (EEPROM), une seule opération suffit.

Si vous prévoyez de réutiliser les moteurs d'autres robots, cette étape peut aussi être nécessaire, car l'ID et le baudrate peuvent ne pas correspondre.

La vidéo suivante montre la procédure pas à pas de réglage de l'ID des moteurs.

### Système Windows

飞特舵机上位机.zip

Utilisez le logiciel hôte de servos Feetech pour définir l'ID des servos et calibrer le point médian ; les ID vont de 1 à 6 !

机械臂舵机设置ID-Windows系统.mp4

### Système Linux/Ubuntu

Pour le logiciel hôte FTServo, voir https://gitee.com/ftservo/FTServo_Linux

Suivez d'abord le [tutoriel LeRobot Manipulator](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc) jusqu'à **C. Manipulator Control**, sous **Port Authorization → Run Script to Find Port**.

Connectez la carte driver des servos du bras follower à l'ordinateur avec un câble de données USB et allumez l'alimentation. Exécutez ensuite la commande suivante. Modifiez --robot.port=/dev/ttyACM0 dans la commande pour utiliser le numéro de port trouvé. Si le port trouvé est /dev/ttyACM1, remplacez-le par --robot.port=/dev/ttyACM1

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

Vous verrez la sortie suivante.

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

Connectez le servo de la pince (gripper) comme indiqué. Assurez-vous que c'est le seul servo connecté à la carte driver des servos, et qu'il n'est connecté à aucun autre servo. Après avoir appuyé sur la touche **[Entrée]**, le script définira automatiquement l'ID et le baudrate de ce servo, avec l'ID défini de 6 à 1 !

Ensuite, vous devriez voir le message suivant :

```Python
'gripper' motor id set to 6
```

Puis la sortie de l'élément suivant est :

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**Remarque** : répétez les opérations ci-dessus pour chaque servo en suivant les instructions.

Comme pour le servo précédent, assurez-vous que c'est le seul servo connecté à la carte driver, et que le servo lui-même n'est connecté à aucun autre servo.

Avant chaque pression sur **Entrée**, vérifiez vos connexions de câbles. Par exemple, le câble d'alimentation peut se débrancher pendant la manipulation de la carte.

Une fois toutes les étapes terminées, le script se termine automatiquement ; les servos sont alors prêts à être utilisés. Vous pouvez maintenant connecter l'interface 3 broches de chaque servo dans l'ordre, puis brancher le câble du premier servo (le servo « shoulder pan » avec l'ID 1) sur la carte driver. La carte driver peut alors être installée sur la base du bras robotique.

Répétez les mêmes étapes pour le bras leader.

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

机械臂舵机设置ID-Linux系统.mp4

## Étape 2 : Montage

- Les étapes de montage du bras follower sont pratiquement les mêmes que celles du bras leader. La seule différence : après l'étape 12, la méthode d'installation de l'effecteur (pince et poignée) est différente.

SO-ARM101机械臂组装教程.mp4

Installation de la carte driver des servos : installez d'abord 4 entretoises en cuivre, puis fixez la carte driver avec quatre vis M2.5\*8

![Système Linux/Ubuntu – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

![Système Linux/Ubuntu – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

![Système Linux/Ubuntu – 3](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.png)

**Version Pro : le bras leader (noir) utilise un adaptateur 5V6A, tandis que le bras follower (blanc) utilise un adaptateur 12V5A**

<RelatedProducts slugs="so-arm101,servo-driver-board,overhead-camera-mount" />
