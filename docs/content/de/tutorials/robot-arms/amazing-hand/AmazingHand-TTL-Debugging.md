---
title: Dexterous Hand (TTL-Servo) Debug-Tutorial
description: "Laden Sie zuerst das Archiv „灵巧手调试.zip“ herunter und entpacken Sie es; dann per Dokument „使用arduio程序调试灵巧手过程（TTL舵机）“ Servo-ID setzen, kalibrieren, Mittelstellung ausrichten und Demo ausführen – oder nutzen Sie den offiziellen Open-Source-Code."
---

# Dexterous Hand (TTL-Servo) Debug-Tutorial

Laden Sie zuerst das Archiv „[灵巧手调试.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc)" herunter und entpacken Sie es. Anschließend können Sie über das Dokument „使用arduio程序调试灵巧手过程（TTL舵机）" Servo-ID setzen, kalibrieren, die Mittelstellung ausrichten und das Demo-Programm ausführen – oder Sie nutzen den [offiziellen Open-Source-Code](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample).

**Ohne Demontage des fertigen Produkts** (Servo-IDs, Kalibrierung und Mittelstellung ab Werk eingestellt) können Sie direkt zu **[Punkt 6: „02 演示程序" ausführen](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188003&from=from_node_link)** und Punkt 7 **[Hand-Tracking](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188027&from=from_node_link)** springen.

## 1. Verdrahtung zum Debuggen der Hand

Variante 1: PC mit Python-Programm o. Ä. (Feetech-Host-Software oder Python-Code)
Variante 2: MEGA328P-Mikrocontroller oder selbst gekaufte Boards/Controller

Verdrahtung wie folgt:
(1) Verdrahtung für Python-Debugging (nur Servo-Treiberplatine):
(2) Verdrahtung für MEGA328P-Debugging (Servo-Treiberplatine + 328P-Board):

**Pinpositionen des MEGA328P-Boards genau beachten!**

Im Folgenden der Debug-Ablauf mit dem Mikrocontroller. Das Board führt das Demo-Programm in Schleife aus – zum Stoppen einfach das Datenkabel trennen.

## 2. Servo-IDs setzen

Eine Hand verwendet 8 Servos: rechte Hand ID 1–8, linke Hand ID 11–18

Mittelstellung ab Werk: rechts [451,571,451,571,451,571,451,571], links [571,451,571,451,571,451,571,451]

1. Verdrahtung: **einzeln** Servo und Servo-Treiberplatine verbinden.
2. Einstellung mit der Host-Software FD1.9.8.2 des Servoherstellers
[FD.rar]

## 3. **Servohorn fixieren**

1. Programm „安装白色伺服喇叭时使用" auf das Board laden

Zweck: Servozahnrad ungefähr in Mittelstellung bringen; alle späteren Winkel beziehen sich auf diese Position.

(1) Arduino installieren (je nach System [Installationstutorial](https://blog.csdn.net/weixin_35509395/article/details/156188274)); vor dem Kompilieren im Bibliotheksmanager FTServo- und SCServo-Bibliothek installieren
(2) Boardtyp: „Arduino Nano"

2. Servo 1, 2 debuggen
(1) Bearbeiten: je nach Servo-ID anpassen (z. B. Zeigefinger → ID 1, 2)
(2) Programm aufs Board laden
(3) Verdrahten: Board + Servo-Treiberplatine + **Servos 1 und 2** – das Zahnrad dreht sich um einen Winkel und stoppt.
(4) Servohorn am Zahnrad montieren, möglichst parallel

3. Servo 3, 4 debuggen
(1) **Verdrahtung zwischen 328P-Board und Servo-Treiberplatine trennen (sonst kein Upload)**
(2) Bearbeiten: ID 3, 4
(3) Programm hochladen
(4) Verdrahten: Board + Treiberplatine + **Servos 3, 4**
(5) Servohorn montieren, möglichst parallel

4. Servo 5, 6 – gleiches Vorgehen
5. Servo 7, 8 – gleiches Vorgehen

## 4. **Mittelwerte feinjustieren**

1. Programm „01 微调MiddlePos值时使用" aufs Board laden

2. Bei geschlossener Fingerposition das Programm sofort stoppen (Datenkabel trennen) und prüfen, ob die Servohörner korrekt ausgerichtet sind (siehe Abbildung). Falls nicht, MiddlePos_1/MiddlePos_2 im Programm anpassen, bis sie ausgerichtet sind. Werte notieren (8 Werte für 8 Servos) – werden im endgültigen Programm verwendet.

## 5. **Testprogramm ausführen**

1. Die gespeicherten MiddlePos_1-/MiddlePos_2-Werte in das folgende Array eintragen und das Programm laden.

## 6. **„02 演示程序" ausführen**

(1) Arduino installieren, [Installationstutorial](https://blog.csdn.net/weixin_35509395/article/details/156188274) je nach System
(2) Unter `灵巧手调试\00 TTL串口舵机\arduino程序（MEGA328P开发板）\02 演示程序` je nach linker/rechter Hand die passende ino-Datei öffnen
(3) Vor dem Kompilieren FTServo-/SCServo-Bibliothek im Bibliotheksmanager installieren
(4) Boardtyp: „Arduino Nano"
(5) Kompilieren und hochladen

Achtung: Der PC ist jetzt nur mit dem Board verbunden, das Board noch nicht mit der Servo-Treiberplatine (also nicht mit der Hand).

Nach erfolgreichem Upload das Board mit drei Jumper-Kabeln an die Servo-Treiberplatine anschließen und die Servos an die Treiberplatine. Siehe [Verdrahtung beim MEGA328P-Debugging](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link).

Die Hand führt **„02 演示程序"** in Schleife aus.

Ergebnis wie folgt:

## [7. Hand-Tracking](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)
