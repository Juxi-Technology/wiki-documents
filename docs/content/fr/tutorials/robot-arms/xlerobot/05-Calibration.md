---
title: "Calibration des bras robotisés"
description: "Calibration XLeRobot des deux bras et de la tête : commandes lerobot-calibrate pour Windows / macOS / Linux, position médiane, vérification des butées et validation des bras gauche/droit."
---

# Calibration des bras robotisés

![Procédure de calibration des deux bras et de la tête](/images/tutorials/robot-arms/xlerobot/05-calibration/01.png)

## Procédure de calibration des deux bras et de la tête

> Exécutez la commande correspondant à votre système. `port1` est la carte de commande du bras gauche, `port2` celle du bras droit ; confirmez d'abord les ports réels avec `lerobot-find-port`.
>
> Sous Linux, affichez rapidement les ports avec `ls /dev/ttyACM*`.

**Windows**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=COM3 \
    --robot.port2=COM4
```

**macOS**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=/dev/tty.usbmodem58546521551 \
    --robot.port2=/dev/tty.usbmodem58546521552
```

**Linux**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=/dev/ttyACM0 \
    --robot.port2=/dev/ttyACM1
```

Après le lancement de la commande, le terminal demande d'abord la Middle Position. Placez les bras en position médiane — mâchoire mobile en haut, mâchoire fixe en bas — puis appuyez sur Entrée. Faites ensuite parcourir à chaque articulation ses limites maximale et minimale.

> Avant d'appuyer sur Entrée pour lancer la calibration, placez le bras robotisé en position médiane : chaque articulation au centre de sa plage utilisable.
>
> Surveillez les valeurs minimale et maximale de chaque articulation. Si une valeur minimale dépasse 0 et se met soudain à décroître depuis 4095, ou si une valeur maximale dépasse 4095 et se met à croître depuis 0, effectuez une calibration de position médiane avec le logiciel PC Feetech, puis recalibrez le bras robotisé.

Les deux servos de la tour caméra fonctionnent de la même manière : faites-les parcourir une fois leurs limites maximale et minimale.

Lorsque la ligne suivante apparaît, la calibration du bras gauche et de la tête commence :

![Procédure de calibration des deux bras et de la tête](/images/tutorials/robot-arms/xlerobot/05-calibration/02.png)

![Procédure de calibration des deux bras et de la tête](/images/tutorials/robot-arms/xlerobot/05-calibration/03.png)

Lorsque la ligne suivante apparaît, la calibration du bras droit commence. Les roues de la base ne nécessitent aucune calibration.

![Procédure de calibration des deux bras et de la tête](/images/tutorials/robot-arms/xlerobot/05-calibration/04.png)

![Procédure de calibration des deux bras et de la tête](/images/tutorials/robot-arms/xlerobot/05-calibration/05.png)
