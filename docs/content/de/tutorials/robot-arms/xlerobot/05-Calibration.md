---
title: "Kalibrierung der Roboterarme"
description: "XLeRobot-Kalibrierung für beide Arme und den Kopf: lerobot-calibrate-Befehle für Windows / macOS / Linux, Mittelstellung, Grenzwertprüfung und Verifikation beider Arme."
---

# Kalibrierung der Roboterarme

![Kalibrierablauf für beide Arme und den Kopf](/images/tutorials/robot-arms/xlerobot/05-calibration/01.png)

## Kalibrierablauf für beide Arme und den Kopf

> Führen Sie den Befehl für Ihr Betriebssystem aus. `port1` ist die Steuerplatine des linken Arms, `port2` die des rechten Arms; bestätigen Sie die tatsächlichen Ports zuerst mit `lerobot-find-port`.
>
> Unter Linux lassen sich die Ports schnell mit `ls /dev/ttyACM*` anzeigen.

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

Nach dem Start des Kalibrierbefehls fragt das Terminal zuerst nach der Middle Position. Bringen Sie die Arme in die Mittelstellung – bewegliche Klaue oben, feste Klaue unten – und drücken Sie Enter. Bewegen Sie anschließend jedes Gelenk durch sein Maximum und Minimum.

::: warning Kalibrierhinweis

Bevor Sie die Kalibrierung mit Enter starten, bringen Sie den Roboterarm in die Mittelstellung – jedes Gelenk in der Mitte seines nutzbaren Bereichs.

Achten Sie auf Minimal- und Maximalwert jedes Gelenks. Wenn ein Minimalwert über 0 springt und plötzlich von 4095 abwärts läuft oder ein Maximalwert 4095 überschreitet und von 0 aufwärts läuft, führen Sie mit der Feetech-PC-Software eine Mittelstellungskalibrierung durch und kalibrieren Sie den Roboterarm anschließend erneut.

:::

Die beiden Servos am Kameraturm funktionieren genauso: jeweils einmal durch Maximum und Minimum bewegen.

Wenn die folgende Zeile im Terminal erscheint, beginnt die Kalibrierung des linken Arms und des Kopfes:

![Kalibrierablauf für beide Arme und den Kopf](/images/tutorials/robot-arms/xlerobot/05-calibration/02.png)

![Kalibrierablauf für beide Arme und den Kopf](/images/tutorials/robot-arms/xlerobot/05-calibration/03.png)

Wenn die folgende Zeile erscheint, beginnt die Kalibrierung des rechten Arms. Die Räder der Basis müssen nicht kalibriert werden.

![Kalibrierablauf für beide Arme und den Kopf](/images/tutorials/robot-arms/xlerobot/05-calibration/04.png)

![Kalibrierablauf für beide Arme und den Kopf](/images/tutorials/robot-arms/xlerobot/05-calibration/05.png)
