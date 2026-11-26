---
title: "Schritt 3: Roboterarm kalibrieren (macOS)"
description: "Erklärt unter macOS die Kalibrierung beider Arme anhand der gemerkten Portnummern, das Anzeigen der Konfigurationsdatei und die Lösung häufiger Fehler."
---

# Schritt 3: Roboterarm kalibrieren (macOS)

## Portnummern in Erinnerung rufen

Folgearm：

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

Führungsarm：

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## Follower-Folgearm kalibrieren

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm
```

::: warning Kalibrierhinweis

Bevor Sie die Kalibrierung mit Enter starten, bringen Sie den Roboterarm in die Mittelstellung – jedes Gelenk in der Mitte seines nutzbaren Bereichs.

Achten Sie auf Minimal- und Maximalwert jedes Gelenks. Wenn ein Minimalwert über 0 springt und plötzlich von 4095 abwärts läuft oder ein Maximalwert 4095 überschreitet und von 0 aufwärts läuft, führen Sie mit der Feetech-PC-Software eine Mittelstellungskalibrierung durch und kalibrieren Sie den Roboterarm anschließend erneut.

:::

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## Leader-Führungsarm kalibrieren

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

::: warning Kalibrierhinweis

Bevor Sie die Kalibrierung mit Enter starten, bringen Sie den Roboterarm in die Mittelstellung – jedes Gelenk in der Mitte seines nutzbaren Bereichs.

:::

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## Kalibrierungskonfigurationsdatei anzeigen

```Shell
sudo nano /Users/<Benutzername>/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/my_leader_arm.json
```

## Häufige Bugs

- Einer oder mehrere der Servos werden nicht gefunden

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/4.png)

## Hinweise

### ① Ein Arm bleibt nach Erreichen des Endanschlags stehen

Eine erneute Kalibrierung ist erforderlich

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Servo wird nicht gefunden

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

Das Servo ist nicht an die Stromversorgung angeschlossen

<RelatedProducts slugs="so-arm101" />
