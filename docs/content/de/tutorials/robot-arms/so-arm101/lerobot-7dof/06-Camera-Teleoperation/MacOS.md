---
title: "Mac-Computer"
description: "Führt unter macOS durch die Kamerasuche und die Teleoperation mit einer oder zwei Kameras und betont, dass die Kameraparameter zur Datenerfassung passen."
---

# Mac\-Computer

## Kamera und Computer verbinden

```Shell
lerobot-find-cameras opencv
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## Eine Kamera, Teleoperation mit Anzeige des Kamerabilds

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

Nach der Ausführung wird die Teleoperation gestartet

Es öffnet sich das Fenster von rerun\.io, das in Echtzeit die Trajektorien der einzelnen Servogelenke sowie das Live\-Bild der Kamera anzeigt

und speichert Bilder im Verzeichnis `~/<Benutzername>/outputs/captured_images`

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/06-camera-teleoperation/1.png)

## Mehrere Kameras, Teleoperation mit Anzeige der Kamerabilder

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1920, height: 1080, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```



