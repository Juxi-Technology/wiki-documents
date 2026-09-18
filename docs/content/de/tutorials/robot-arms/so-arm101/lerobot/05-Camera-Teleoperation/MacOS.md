---
title: "Schritt 5: Teleoperation mit Kamera (macOS)"
description: "Führt unter macOS durch die Kamerasuche und die Teleoperation mit einer oder zwei Kameras und betont, dass die Kameraparameter zur Datenerfassung passen."
---

# Schritt 5: Teleoperation mit Kamera (macOS)

## Kamera und Computer verbinden

```Shell
lerobot-find-cameras opencv
```

Nach der Ausführung werden die Nummern der einzelnen Kameras aufgelistet; notieren Sie sie und tragen Sie sie in `index_or_path` des folgenden Befehls ein.

> Die Kameraparameter (Auflösung, fps, Seitenverhältnis) müssen beim Erfassen des Datensatzes und beim Deployment des Modells konsistent bleiben; die Gründe dafür finden Sie in den Erläuterungen unter [Datensatz durch Demonstration erfassen](/de/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording). In diesem Tutorial wird einheitlich `1280×720@30` verwendet.

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## Eine Kamera, Teleoperation mit Anzeige des Kamerabilds

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

Nach der Ausführung wird die Teleoperation gestartet

Es öffnet sich das Fenster von rerun.io, das in Echtzeit die Trajektorien der einzelnen Servogelenke sowie das Live-Bild der Kamera anzeigt

und speichert Bilder im Verzeichnis `~/<Benutzername>/outputs/captured_images`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/2.jpg)

## Mehrere Kameras, Teleoperation mit Anzeige der Kamerabilder

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/3.jpg)

<RelatedProducts slugs="so-arm101" />
