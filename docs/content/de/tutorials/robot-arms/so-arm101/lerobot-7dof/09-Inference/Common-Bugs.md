---
title: "Häufige Bugs und Lösungen"
description: "Sammelt typische Fehler beim Deployment: fehlgeschlagener Kamerazugriff, Verbindungsabbrüche der Kamera sowie Servo-Kommunikationsfehler samt Lösungsschritten."
---

# Häufige Bugs und Lösungen

## Kamerazugriff fehlgeschlagen

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/1.png)

Prüfen Sie, ob die Verkabelung der Handgelenkkamera locker ist, insbesondere die Verkabelung am kameranahen Ende; hier kommt es sehr leicht zu schlechtem Kontakt

## Kamera trennt die Verbindung

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/2.png)

Starten Sie die Kommandozeile neu

## Servo\-Kommunikationsproblem 1

ConnectionError: Failed to sync read 'Present\_Position' on ids=\[1, 2, 3, 4, 5, 6\] after 1 tries\. \[TxRxResult\] There is no status packet\!

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/3.png)

Lösung: Ändern Sie im Code `lerobot/src/lerobot/motors/motors_bus.py` alle Vorkommen von `num_retry` auf 99, insbesondere das der Fehlerzeile entsprechende

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/4.png)

## Servo\-Kommunikationsproblem 2

ConnectionError: Failed to write 'Torque\_Enable' on id\_=1 with '0' after 6 tries\. \[TxRxResult\] There is no status packet\!

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/5.png)

![53823bc8797beb0cd2899d6c65ee9f63\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/6.png)

Lösung: Kalibrieren Sie den Roboterarm erneut



