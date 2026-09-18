---
title: Lerobot-Roboterarm-Montageanleitung
description: "Montageanleitung für den SO-ARM101: Servo-IDs setzen, Mittelstellung kalibrieren und beide Arme samt Netzteilen (Leader 5V6A, Follower 12V5A) montieren."
---

# Lerobot-Roboterarm-Montageanleitung

Hinweis: Bei einem fertig montierten Roboterarm überspringen Sie dieses Tutorial

## 3D-Druckteile des Follower-Arms

![IMG_20251229_141748.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

## 3D-Druckteile des Leader-Arms

![IMG_20251229_141533.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.jpg)

Der Leader-Arm und der Follower-Arm sind sehr ähnlich, nur das Ende unterscheidet sich

Der Leader-Arm hat einen Griff und einen Auslöser, der Follower-Arm einen Greifer

## Entfernen von Stützmaterial an den 3D-Druckteilen

Überprüfen Sie jedes Loch, jede Öffnung, jeden Schlitz und jedes Gitter, insbesondere die fünf Löcher ähnlich der Mahjong-Kachel „Fünf Kreise"

Dieser Schritt ist sehr wichtig, sonst lassen sich später die Schrauben nicht eindrehen

## Unterscheidung der vier Servotypen

|Große Ausführung|Kleine Ausführung|Spannung (V)|Untersetzungsverhältnis|Gelenk des Roboterarms|Anzahl|
|---|---|---|---|---|---|
|STS-3215|C001|7.4|1:345|Leader-Arm 2|1|
||C044|7.4|1:191|Leader-Arm 1, 3|2|
||C046|7.4|1:147|Leader-Arm 4, 5, 6|3|
||C047|12|1:345|Alle Gelenke des Follower-Arms|6|

> Das Untersetzungsverhältnis ist das Verhältnis „Motordrehzahl : Drehzahl der Servoausgangswelle". Zum Beispiel bedeutet 1:345, dass sich der Motor 345-mal dreht, während sich die Ausgangswelle des Servos nur einmal dreht.
> 
> Ein großes Untersetzungsverhältnis verstärkt das Drehmoment über das Getriebe, sodass schwerere Lasten bewegt werden können (zum Beispiel den Follower-Arm)
> 
> Gleichzeitig ist die Drehgeschwindigkeit der Ausgangswelle jedoch geringer (weil sie „untersetzt" wird)
> 
> Wenn Sie die Gelenke ziehen, ist mehr Kraftaufwand erforderlich
> 
> 

Im Folgenden sind die Modelle und Untersetzungsverhältnisse aller Servos dieses Projekts aufgeführt; die Unterstriche sind ihre Nummern

![12月30日(7).png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/3.jpg)

![IMG_20260108_145707.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/4.jpg)

## Unterscheidung der beiden Netzadapter mit unterschiedlicher Spannung

Netzadapter mit 5V 6A 30W: versorgt die 7.4V-Servos (Leader-Arm), schwarz

Netzadapter mit 12V 5A 60W: versorgt die 12V-Servos (Follower-Arm), weiß

## Herunterladen des Feetech-Servo-Debugging-Tools

### Windows-Computer

https://gitee.com/ftservo/fddebug

Laden Sie [`FD1.9.8.5(250729).7z`](https://gitee.com/ftservo/fddebug/blob/master/FD1.9.8.5(250729).7z) herunter, entpacken Sie es und führen Sie die darin enthaltene exe-Datei aus

### Ubuntu-Computer und Mac-Computer (das komprimierte Archiv enthält ein Tutorial)

[Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip)

![Lerobot 101机械臂.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/5.jpg)

**Pro-Version: Der Leader-Arm verwendet einen 5V6A-Netzadapter, der Follower-Arm einen 12V5A-Netzadapter**

Die Einstellung der Servo-IDs sowie die Kalibrierung der Servowinkel und die Montage sollten im Voraus durchgeführt werden; siehe hierzu das [offizielle Montage-Tutorial](https://huggingface.co/docs/lerobot/so101)

## Erster Schritt: Festlegen der Servo-IDs, Montage der Servoscheiben (außer Servo Nr. 5)

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/6.png)

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

1. Öffnen Sie das Feetech-Host-Debugging-Tool, wählen Sie die COM-Portnummer, stellen Sie die Baudrate auf eine Million ein und klicken Sie auf „Öffnen"

2. Klicken Sie auf „Suchen"; nachdem „STS3215" erschienen ist, klicken Sie auf „Stopp" und dann auf „STS3215"

3. Wählen Sie oben „Debuggen"; Sie können den Schieberegler ziehen, um das Servo zu drehen, oder auf „Scannen" klicken, um das Servo hin- und herzubewegen. Vergewissern Sie sich, dass das Servo ordnungsgemäß läuft

4. Wählen Sie oben „Programmieren"

5. Klicken Sie auf „Mittelstellung kalibrieren", um die aktuelle Position der Servodrehachse als Mittelstellung festzulegen (0-4095)

6. Klicken Sie auf „ID", stellen Sie unten rechts die ID-Nummer des entsprechenden Servos ein und klicken Sie auf „Speichern". Beachten Sie, dass die Nummer eine reine arabische Ziffer ist, ohne Buchstaben.

7. Ziehen Sie das Kabel ab, das das Servo mit der Steuerplatine verbindet

8. Stecken Sie das Servokabel am Servo an

Servo Nr. 1 bekommt zwei Kabel, die anderen Servos zunächst nur ein Kabel

![截图_20260115151626.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

Wir möchten noch einmal daran erinnern, dass Sie sicherstellen müssen, dass die Gelenk-ID und das Übersetzungsverhältnis der Servos strikt mit dem **SO-ARM101** übereinstimmen.

Jeder Motor am Bus hat eine eindeutige ID. Neue Motoren haben normalerweise die Standard-ID `1`. Um eine ordnungsgemäße Kommunikation zwischen Motor und Controller zu gewährleisten, müssen wir zunächst für jeden Motor eine eindeutige ID festlegen. Darüber hinaus wird die Datenübertragungsgeschwindigkeit am Bus durch die Baudrate bestimmt. Damit sie miteinander kommunizieren können, müssen der Controller und alle Motoren dieselbe Baudrate verwenden; die Baudrate der Servos dieses Roboterarms beträgt 100000.

Zu diesem Zweck müssen wir den Controller zunächst nacheinander mit jedem Motor verbinden, um die Einstellungen vorzunehmen. Da wir diese Parameter in einen nichtflüchtigen Bereich des internen Speichers (EEPROM) des Motors schreiben, ist nur ein einmaliger Vorgang erforderlich.

Wenn Sie die Motoren eines anderen Roboters wiederverwenden möchten, müssen Sie diesen Schritt möglicherweise ebenfalls durchführen, da ID und Baudrate nicht übereinstimmen könnten.

Das folgende Video zeigt die Reihenfolge der Schritte zum Festlegen der Motor-ID.

### Windows-System

[Feetech-Servo-Hostsoftware.zip](/downloads/飞特舵机上位机.zip)

Verwenden Sie die Feetech-Servo-Hostsoftware, um die Servo-ID festzulegen und die Mittelstellung zu kalibrieren; die ID-Einstellung erfolgt von 1 bis 6!

**Roboterarm-Servo-ID-Einstellung-Windows-System.mp4**（机械臂舵机设置ID-Windows系统.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

### Linux/Ubuntu-System und Mac-Computer

Wenn Sie die Feetech-Servo-Hostsoftware benötigen, beachten Sie das oben genannte [Feetech-Servo-Debugging-Tool](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g#share-Jvk1dRRl8oY0Skxrt2VczA9jnNb)

Bitte schließen Sie zuerst die Umgebungsinstallation gemäß der Seite [Offizielle LeRobot-Umgebungsinstallation](https://huggingface.co/docs/lerobot/installation) ab

Achten Sie darauf, die virtuelle Umgebung zu aktivieren und in das entsprechende src/lerobot-Verzeichnis zu wechseln

conda activate lerobot

cd lerobot/src/lerobot

1、Suchen Sie den USB-Port des Roboterarms. Um den korrekten Port für jeden Roboterarm zu finden, führen Sie das Hilfsskript zweimal aus:

```Plain Text
lerobot-find-port
```

Beispielausgabe beim Identifizieren des Ports des Leader-Arms (z. B. unter Mac `/dev/tty.usbmodem575E0031751` oder unter Linux möglicherweise `/dev/ttyACM0`):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

Beispielausgabe beim Identifizieren des Ports des Follower-Arms (z. B. `/dev/tty.usbmodem575E0032081` oder unter Linux möglicherweise `/dev/ttyACM1`):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

Denken Sie daran, den USB-Stecker abzuziehen, sonst wird die Schnittstelle nicht erkannt.

2、Verbinden Sie den Computer mit einem USB-Datenkabel mit der Servo-Treiberplatine des Follower-Arms und schließen Sie die Stromversorgung an. Führen Sie dann den folgenden Befehl aus. Ändern Sie im Befehl --robot.port=/dev/ttyACM0 auf die gefundene Portnummer. Wenn der gefundene Port /dev/ttyACM1 ist, ändern Sie ihn auf --robot.port=/dev/ttyACM1

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

Sie sehen die folgende Ausgabe.

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

Schließen Sie gemäß den Anweisungen das Servo des Greifers an. Vergewissern Sie sich, dass es das einzige mit der Servo-Treiberplatine verbundene Servo ist und dass dieses Servo noch mit keinem anderen Servo verbunden ist. Wenn Sie die Taste **[Enter]** drücken, legt das Skript automatisch die ID und die Baudrate dieses Servos fest; die ID-Einstellung erfolgt von 6 bis 1!

Danach sollten Sie die folgende Information sehen:

```Python
'gripper' motor id set to 6
```

Als Nächstes folgt die nächste Ausgabe:

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**Hinweis **Befolgen Sie die Anweisungen und wiederholen Sie den obigen Vorgang für jedes Servo.

Wie bei den vorherigen Servos stellen Sie sicher, dass es das einzige mit der Treiberplatine verbundene Servo ist und dass das Servo selbst mit keinem anderen Servo verbunden ist.

Bevor Sie jedes Mal die **Enter**-Taste drücken, überprüfen Sie unbedingt Ihre Kabelverbindungen. Beim Hantieren an der Platine kann sich beispielsweise das Stromkabel lösen.

Wenn Sie alle Schritte abgeschlossen haben, endet das Skript automatisch und die Servos sind einsatzbereit. Nun können Sie die 3-poligen Anschlüsse jedes Servos nacheinander verbinden und das Kabel des ersten Servos (des „shoulder pan"-Servos mit ID 1) an die Treiberplatine anschließen. Jetzt kann die Treiberplatine an der Basis des Roboterarms montiert werden.

Wiederholen Sie die gleichen Schritte für den Leader-Arm.

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

**Roboterarm-Servo-ID-Einstellung-Linux-System.mp4**（机械臂舵机设置ID-Linux系统.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

## Zweiter Schritt: Montage

- Die Montageschritte des Follower-Arms sind im Wesentlichen dieselben wie beim Leader-Arm. Der einzige Unterschied besteht darin, dass nach Schritt 12 die Montage des Endeffektors (Greifer und Griff) unterschiedlich ist.

**SO-ARM101-Roboterarm-Montageanleitung.mp4**（SO-ARM101机械臂组装教程.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

Montage der Servo-Treiberplatine: Montieren Sie zuerst die 4 Messingabstandshalter und befestigen Sie dann die Treiberplatine mit vier M2.5*8-Schrauben

![1768467962506.webp](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.webp)

![1768467970234.webp](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/10.webp)

![截图_20260115170850.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/11.png)

**Pro-Version: Der schwarze Leader-Arm verwendet einen 5V6A-Netzadapter, der weiße Follower-Arm einen 12V5A-Netzadapter**

## Festlegen der Servo-ID und Mittelstellungskalibrierung über die Weboberfläche

https://bambot.org/feetech.js?lang=zh

1、Geben Sie je nach Servomodell 0 oder 1 ein und klicken Sie auf „Verbinden"

![截图_20260413125622.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/12.png)

2、Scannen Sie die Servos mit den IDs 1~6; anhand von FOUND im Scanergebnis können Sie das Servo mit der entsprechenden ID bestätigen. Im Bild wurde beispielsweise das Servo mit der ID 1 gescannt

![截图_20260413125712.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/13.png)

3、ID-Einstellung und Mittelstellungskalibrierung

①Geben Sie als aktuelle Servo-ID die ID des gescannten Servos ein

②Geben Sie unter „ID-Verwaltung" eine Zahl ein und klicken Sie auf „ID ändern", um die ID festzulegen

③Mittelstellungskalibrierung (die Mittelstellung des STS3215-Servos ist 2047, die des SCS0009-Servos ist 511)

STS-Servo: Geben Sie unter „Positionssteuerung" 2047 ein und klicken Sie auf „Set"

SCS-Servo: Geben Sie unter „Positionssteuerung" 511 ein und klicken Sie auf „Set"

![截图_20260413125748.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/14.png)
