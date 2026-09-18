---
title: "Schritt 5: Teleoperation mit Kamera (Windows)"
description: "Erklärt unter Windows die Kamerasuche und die Teleoperation mit angezeigtem Kamerabild sowie die Lösung, falls der Kamerazugriff fehlschlägt."
---

# Schritt 5: Teleoperation mit Kamera (Windows)

## Kamera und Computer verbinden

```Shell
lerobot-find-cameras opencv
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/1.png)

## Teleoperation mit Anzeige des Kamerabilds

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

Es öffnet sich das Fenster von rerun.io, das in Echtzeit die Trajektorien der einzelnen Servogelenke sowie das Live-Bild der Kamera anzeigt

und speichert Bilder im Verzeichnis `C:\Users\<Windows-Benutzername>\outputs\captured_images`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/2.jpg)

## Falls der folgende Fehler auftritt

Die Kamera lässt sich nicht verbinden, aber beim Wechseln der Kamera in Tencent Meeting lässt sie sich weiterhin normal starten

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/3.png)

Ändern Sie die Datei `lerobot\src\lerobot\cameras\utils.py` und stellen Sie das OpenCV-Backend auf `cv2.CAP_DSHOW` um

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/4.png)

> Dies ist ein Bug, den selbst Doubao nicht lösen kann; Schuld ist die zu tiefe Kapselung der lerobot-Bibliothek, für Anfänger ist das schwer zu debuggen
> 
> 

[wx_camera_1768139334330.mp4](/downloads/wx_camera_1768139334330.mp4)

## Mehrere Kameras verbinden, Teleoperation mit Anzeige der Kamerabilder

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/5.jpg)

<RelatedProducts slugs="so-arm101" />
