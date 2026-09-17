---
title: Dexterous Hand (TTL-Servo) Debug-Tutorial
description: "Debug-Anleitung für die AmazingHand mit TTL-Servos: Servo-IDs setzen, Mittelstellung kalibrieren, Servohörner fixieren und das Demo-Programm ausführen."
---

# Dexterous Hand (TTL-Servo) Debug-Tutorial

> **[Im Shop kaufen](https://www.juxitech.com/de/products/amazinghand)**


Laden Sie zuerst das Archiv „[灵巧手调试.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc)" herunter und entpacken Sie es. Anschließend können Sie über das Dokument „使用arduio程序调试灵巧手过程（TTL舵机）" Servo-ID setzen, kalibrieren, die Mittelstellung ausrichten und das Demo-Programm ausführen – oder Sie nutzen den [offiziellen Open-Source-Code](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample).

![image – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/1.png)

**Ohne Demontage des fertigen Produkts** (Servo-IDs, Kalibrierung und Mittelstellung ab Werk eingestellt) können Sie direkt zu **[Punkt 6: „02 演示程序" ausführen](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188003&from=from_node_link)** und Punkt 7 **[Hand-Tracking](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188027&from=from_node_link)** springen.

## 1. Verdrahtung zum Debuggen der Hand

Variante 1: PC mit Python-Programm o. Ä. (Feetech-Host-Software oder Python-Code)
Variante 2: MEGA328P-Mikrocontroller oder selbst gekaufte Boards/Controller

Verdrahtung wie folgt:
(1) Verdrahtung für Python-Debugging (nur Servo-Treiberplatine):

![1. Debug the wiring method of the dexterous hand – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/2.png)
(2) Verdrahtung für MEGA328P-Debugging (Servo-Treiberplatine + 328P-Board):

**Pinpositionen des MEGA328P-Boards genau beachten!**

![1. Debug the wiring method of the dexterous hand – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/3.png)

![1. Debug the wiring method of the dexterous hand – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/4.png)

![1. Debug the wiring method of the dexterous hand – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/5.png)

![1. Debug the wiring method of the dexterous hand – 5](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/6.png)

Im Folgenden der Debug-Ablauf mit dem Mikrocontroller. Das Board führt das Demo-Programm in Schleife aus – zum Stoppen einfach das Datenkabel trennen.

## 2. Servo-IDs setzen

Eine Hand verwendet 8 Servos: rechte Hand ID 1–8, linke Hand ID 11–18

Mittelstellung ab Werk: rechts [451,571,451,571,451,571,451,571], links [571,451,571,451,571,451,571,451]

1. Verdrahtung: **einzeln** Servo und Servo-Treiberplatine verbinden.

![2. Set Servo ID – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/7.jpg)
2. Einstellung mit der Host-Software FD1.9.8.2 des Servoherstellers
FD.rar

![2. Set Servo ID – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/8.png)

![2. Set Servo ID – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/9.png)

![2. Set Servo ID – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/10.png)

## 3. **Servohorn fixieren**

1. Programm „安装白色伺服喇叭时使用" auf das Board laden

Zweck: Servozahnrad ungefähr in Mittelstellung bringen; alle späteren Winkel beziehen sich auf diese Position.

(1) Arduino installieren (je nach System [Installationstutorial](https://blog.csdn.net/weixin_35509395/article/details/156188274)); vor dem Kompilieren im Bibliotheksmanager FTServo- und SCServo-Bibliothek installieren

![3.Fix the servo horn – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/11.png)
(2) Boardtyp: „Arduino Nano"

![3.Fix the servo horn – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/12.png)

2. Servo 1, 2 debuggen
(1) Bearbeiten: je nach Servo-ID anpassen (z. B. Zeigefinger → ID 1, 2)

![3.Fix the servo horn – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/13.png)
(2) Programm aufs Board laden
(3) Verdrahten: Board + Servo-Treiberplatine + **Servos 1 und 2** – das Zahnrad dreht sich um einen Winkel und stoppt.

![3.Fix the servo horn – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/14.png)
(4) Servohorn am Zahnrad montieren, möglichst parallel

![3.Fix the servo horn – 5](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/15.png)

3. Servo 3, 4 debuggen
(1) **Verdrahtung zwischen 328P-Board und Servo-Treiberplatine trennen (sonst kein Upload)**
(2) Bearbeiten: ID 3, 4

![3.Fix the servo horn – 6](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/16.png)
(3) Programm hochladen
(4) Verdrahten: Board + Treiberplatine + **Servos 3, 4**
(5) Servohorn montieren, möglichst parallel

4. Servo 5, 6 – gleiches Vorgehen
5. Servo 7, 8 – gleiches Vorgehen

## 4. **Mittelwerte feinjustieren**

1. Programm „01 微调MiddlePos值时使用" aufs Board laden

2. Bei geschlossener Fingerposition das Programm sofort stoppen (Datenkabel trennen) und prüfen, ob die Servohörner korrekt ausgerichtet sind (siehe Abbildung). Falls nicht, MiddlePos_1/MiddlePos_2 im Programm anpassen, bis sie ausgerichtet sind. Werte notieren (8 Werte für 8 Servos) – werden im endgültigen Programm verwendet.

![4.Fine-tune intermediate values – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/17.png)

![4.Fine-tune intermediate values – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/18.png)

## 5. **Testprogramm ausführen**

1. Die gespeicherten MiddlePos_1-/MiddlePos_2-Werte in das folgende Array eintragen und das Programm laden.

![5.Run the test program – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/19.png)

## 6. **„02 演示程序" ausführen**

(1) Arduino installieren, [Installationstutorial](https://blog.csdn.net/weixin_35509395/article/details/156188274) je nach System
(2) Unter `灵巧手调试\00 TTL串口舵机\arduino程序（MEGA328P开发板）\02 演示程序` je nach linker/rechter Hand die passende ino-Datei öffnen

![6.Run "02 Demo Program" – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/20.png)
(3) Vor dem Kompilieren FTServo-/SCServo-Bibliothek im Bibliotheksmanager installieren

![6.Run "02 Demo Program" – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/21.png)
(4) Boardtyp: „Arduino Nano"

![6.Run "02 Demo Program" – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/22.png)
(5) Kompilieren und hochladen

Achtung: Der PC ist jetzt nur mit dem Board verbunden, das Board noch nicht mit der Servo-Treiberplatine (also nicht mit der Hand).

Nach erfolgreichem Upload das Board mit drei Jumper-Kabeln an die Servo-Treiberplatine anschließen und die Servos an die Treiberplatine. Siehe [Verdrahtung beim MEGA328P-Debugging](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link).

Die Hand führt **„02 演示程序"** in Schleife aus.

Ergebnis wie folgt:

![6.Run "02 Demo Program" – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/23.png)

## [7. Hand-Tracking](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)
