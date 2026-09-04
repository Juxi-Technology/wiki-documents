---
title: Guide de montage du bras robotique Lerobot
description: "Version Pro : bras leader 5V6A, bras follower 12V5A"
---

# Guide de montage du bras robotique Lerobot

> **[Acheter en boutique](https://www.juxitech.com/fr/products/so-arm101-developers-kit)**

![Image](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)


**Version Pro : bras leader (noir) 5V6A, bras follower (blanc) 12V5A**

Réglage des ID de servo, calibration d'angle et montage à faire au préalable. Voir [guide officiel](https://huggingface.co/docs/lerobot/so101).

## Étape 1 : Régler les ID des servos, monter les pignons (sauf n°5)
![Image](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.png)


**Attention** : les ID d'articulation et le rapport d'engrenage doivent correspondre exactement au **SO-ARM101**.

Chaque moteur du bus a besoin d'un ID unique (neuf : `1` par défaut). Baudrate : 100000.

### Windows

[Logiciel servo Feetech.zip] — définir les ID (1-6) et calibrer la position centrale.

### Linux/Ubuntu

```
lerobot-setup-motors \\
    --robot.type=so101_follower \\
    --robot.port=/dev/ttyACM0
```

Connecter d'abord le servo gripper, définir les ID (6→1) :

```
'gripper' motor id set to 6
```

**Toujours 1 seul servo** à la fois. Après fin, connecter les câbles 3 broches depuis l'ID 1.

Mêmes étapes pour le bras leader :

```
lerobot-setup-motors \\
    --teleop.type=so101_leader \\
    --teleop.port=/dev/ttyACM0
```

## Étape 2 : Montage

Bras follower comme leader (différence : montage de l'effecteur après l'étape 12).