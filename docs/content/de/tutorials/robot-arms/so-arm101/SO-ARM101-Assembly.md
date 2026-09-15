---
title: Lerobot-Roboterarm-Montageanleitung
description: "Pro-Version: Leader-Arm 5V6A, Follower-Arm 12V5A Netzteil"
---

# Lerobot-Roboterarm-Montageanleitung

> **[Im Shop kaufen](https://www.juxitech.com/de/products/so-arm101-developers-kit)**

![image – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

**Pro-Version: Leader-Arm (schwarz) 5V6A, Follower-Arm (weiß) 12V5A Netzteil**

Servo-ID-Einstellung, Winkel-Kalibrierung und Montage im Voraus erledigen. Siehe [offizielle Montageanleitung](https://huggingface.co/docs/lerobot/so101).

# Schritt 1: Servo-IDs einstellen und Servohörner montieren (außer Servo Nr. 5)

![image – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.png)

**Achtung**: Servo-Gelenk-IDs und Übersetzungsverhältnis müssen exakt zu **SO-ARM101** passen.

Jeder Motor am Bus besitzt eine eindeutige ID. Neue Motoren haben in der Regel die Standard-ID ` 1 `. Damit die Kommunikation zwischen Motor und Controller reibungslos funktioniert, muss zunächst jedem Motor eine eindeutige ID zugewiesen werden. Die Datenübertragungsgeschwindigkeit auf dem Bus wird zudem durch die Baudrate bestimmt. Damit alle Geräte miteinander kommunizieren können, müssen der Controller und alle Motoren auf dieselbe Baudrate konfiguriert sein; die Baudrate dieser Roboterarm-Servos beträgt 100000.

Dafür müssen wir den Controller zunächst separat mit jedem Motor verbinden. Da diese Parameter im nichtflüchtigen Bereich des Motor-internen Speichers (EEPROM) gespeichert werden, ist nur ein Durchgang erforderlich.

Falls Sie die Motoren anderer Roboter weiterverwenden möchten, kann dieser Schritt ebenfalls nötig sein, da ID und Baudrate möglicherweise nicht übereinstimmen.

Das folgende Video zeigt die einzelnen Schritte zum Einstellen der Motor-IDs.

## Windows-System

飞特舵机上位机.zip

Mit der Feetech-Servo-Software die Servo-IDs einstellen und die Mittelstellung kalibrieren – die IDs reichen von 1 bis 6!

机械臂舵机设置ID-Windows系统.mp4

## Linux/Ubuntu-System

Für den FTServo-Hostcomputer siehe https://gitee.com/ftservo/FTServo_Linux

Folgen Sie zunächst dem [LeRobot-Manipulator-Tutorial](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc) bis **C. Manipulator Control** unter **Port Authorization **Run Script to Find Port**

Die Servo-Treiberplatine des Follower-Arms per USB-Datenkabel mit dem Computer verbinden und den Strom einschalten. Dann den folgenden Befehl ausführen. Bitte ändern Sie --robot.port=/dev/ttyACM0 im Befehl auf die gefundene Portnummer. Ist der gefundene Port /dev/ttyACM1, ändern Sie ihn auf --robot.port=/dev/ttyACM1

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

Sie sehen dann die folgende Ausgabe.

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

Den Gripper-Servo wie beschrieben anschließen. Stellen Sie sicher, dass es der einzige an der Servo-Treiberplatine angeschlossene Servo ist und dass dieser Servo nicht mit anderen Servos verbunden wurde. Nach dem Drücken der **[Enter]**-Taste setzt das Skript automatisch ID und Baudrate dieses Servos – die IDs werden von 6 bis 1 vergeben!

Danach sollte die folgende Meldung erscheinen:

```Python
'gripper' motor id set to 6
```

Als Nächstes lautet die Ausgabe des nächsten Punkts:

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**Hinweis** Wiederholen Sie die obigen Schritte für jeden Servo gemäß der Anleitung.

Wie beim vorherigen Servo: Stellen Sie sicher, dass es der einzige an der Treiberplatine angeschlossene Servo ist und dass der Servo selbst nicht mit anderen Servos verbunden ist.

Prüfen Sie vor jedem Drücken der **Enter**-Taste unbedingt die Kabelverbindungen. Beim Arbeiten an der Platine kann sich beispielsweise das Stromkabel lösen.

Nach Abschluss aller Schritte beendet sich das Skript automatisch; die Servos sind danach einsatzbereit. Jetzt können Sie die 3-Pin-Anschlüsse der einzelnen Servos der Reihe nach verbinden und das Kabel des ersten Servos (des „shoulder pan"-Servos mit ID 1) an der Treiberplatine anschließen. Nun kann die Treiberplatine am Sockel des Roboterarms montiert werden.

Dieselben Schritte für den Leader-Arm wiederholen.

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

机械臂舵机设置ID-Linux系统.mp4

# Schritt 2: Montage

- Die Montageschritte des Follower-Arms entsprechen im Wesentlichen denen des Leader-Arms. Der einzige Unterschied: Nach Schritt 12 ist die Montage des Endeffektors (Gripper und Griff) anders.

SO-ARM101机械臂组装教程.mp4

Montage der Servo-Treiberplatine: Zuerst 4 Kupfersäulen montieren, dann die Treiberplatine mit vier M2.5\*8-Schrauben befestigen

![Linux/Ubuntu-System – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

![Linux/Ubuntu-System – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

![Linux/Ubuntu-System – 3](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.png)

**Der schwarze Leader-Arm der Pro-Version verwendet ein 5V6A-Netzteil, der weiße Follower-Arm ein 12V5A-Netzteil**

<RelatedProducts slugs="so-arm101,servo-driver-board,overhead-camera-mount" />
