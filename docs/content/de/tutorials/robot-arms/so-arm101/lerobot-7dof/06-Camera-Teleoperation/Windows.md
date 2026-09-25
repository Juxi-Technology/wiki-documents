---
title: "Windows-Computer"
description: "Erklärt unter Windows die Kamerasuche und die Teleoperation mit angezeigtem Kamerabild sowie die Lösung, falls der Kamerazugriff fehlschlägt."
---

# Windows\-Computer

## Kamera und Computer verbinden

```Shell
lerobot-find-cameras opencv
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/1.png)

## Teleoperation mit Anzeige des Kamerabilds

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

Es öffnet sich das Fenster von rerun\.io, das in Echtzeit die Trajektorien der einzelnen Servogelenke sowie das Live\-Bild der Kamera anzeigt

und speichert Bilder im Verzeichnis `C:\Users\<Benutzername>\outputs\captured_images`

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/06-camera-teleoperation/1.png)

## Falls der folgende Fehler auftritt

Die Kamera lässt sich nicht verbinden, aber beim Wechseln der Kamera in Tencent Meeting lässt sie sich weiterhin normal starten

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/3.png)

Ändern Sie die Datei `lerobot\src\lerobot\cameras\utils.py` und stellen Sie das OpenCV\-Backend auf `cv2.CAP_SHOW` um

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/4.png)

> Dies ist ein Bug, den selbst Doubao nicht lösen kann; Schuld ist die zu tiefe Kapselung der lerobot\-Bibliothek, für Anfänger ist das schwer zu debuggen
> 
> 

[wx\_camera\_1768139334330\.mp4](/downloads/wx_camera_1768139334330.mp4)

## Mehrere Kameras verbinden, Teleoperation mit Anzeige der Kamerabilder

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```



