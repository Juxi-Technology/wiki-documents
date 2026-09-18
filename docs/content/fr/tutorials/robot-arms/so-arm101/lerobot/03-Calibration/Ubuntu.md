---
title: "Étape 3 : Calibration du bras (Ubuntu)"
description: "Calibrez sous Ubuntu le bras esclave Follower puis le bras maître Leader avec l'outil LeRobot, et consultez le fichier de configuration généré."
---

# Étape 3 : Calibration du bras (Ubuntu)

## Accorder les permissions au port

Permettre à tous les utilisateurs de lire et d'écrire ces périphériques série

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Calibrer le bras esclave Follower

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/1.png)

## Calibrer le bras maître Leader

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/2.png)

## Consulter le fichier de configuration de calibration

```Shell
sudo nano /home/<nom-utilisateur>/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_follower_arm.json
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/3.png)

## Points d'attention

### ① Un bras s'arrête lorsqu'il atteint la butée

Une recalibration est nécessaire

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Servomoteur introuvable

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/4.png)

Le servomoteur n'est pas branché

<RelatedProducts slugs="so-arm101" />
