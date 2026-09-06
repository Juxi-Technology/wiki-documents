---
title: Dexterous Hand (TTL-Servo) Debug-Tutorial
description: "Laden Sie zuerst das Archiv „灵巧手调试.zip“ herunter und entpacken Sie es; dann per Dokument „使用arduio程序调试灵巧手过程（TTL舵机）“ Servo-ID setzen, kalibrieren, Mittelstellung ausrichten und Demo ausführen – oder nutzen Sie den offiziellen Open-Source-Code."
---

# Dexterous Hand (TTL-Servo) Debug-Tutorial

> **[Im Shop kaufen](https://www.juxitech.com/de/products/amazinghand)**


Laden Sie zuerst das Archiv „[灵巧手调试.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc)" herunter und entpacken Sie es. Anschließend können Sie über das Dokument „使用arduio程序调试灵巧手过程（TTL舵机）" Servo-ID setzen, kalibrieren, die Mittelstellung ausrichten und das Demo-Programm ausführen – oder Sie nutzen den [offiziellen Open-Source-Code](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample).

![image – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTQ0NjE2ZmE3MmFlM2ZkMGQ5YmE2MmY3NTUyZDdjMWRfZjY1YjhhN2Q4ZjhhOWQ0NGE5ZWM4YWRjZDY3N2EwYjZfSUQ6NzYzODkzOTYxMTI1MDc4OTMzM18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

**Ohne Demontage des fertigen Produkts** (Servo-IDs, Kalibrierung und Mittelstellung ab Werk eingestellt) können Sie direkt zu **[Punkt 6: „02 演示程序" ausführen](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188003&from=from_node_link)** und Punkt 7 **[Hand-Tracking](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188027&from=from_node_link)** springen.

## 1. Verdrahtung zum Debuggen der Hand

Variante 1: PC mit Python-Programm o. Ä. (Feetech-Host-Software oder Python-Code)
Variante 2: MEGA328P-Mikrocontroller oder selbst gekaufte Boards/Controller

Verdrahtung wie folgt:
(1) Verdrahtung für Python-Debugging (nur Servo-Treiberplatine):

![1. Debug the wiring method of the dexterous hand – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTdmMjBiMGQzMTI2ODllOWMzYTU2N2ZkYWZlMzVkODdfNjNlZTQ2OTI4M2M3Mzg2NmZmZDNiYjI5Zjc3NDg0MjZfSUQ6NzYzODkzOTYxMTQ4OTg0ODI5MV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)
(2) Verdrahtung für MEGA328P-Debugging (Servo-Treiberplatine + 328P-Board):

**Pinpositionen des MEGA328P-Boards genau beachten!**

![1. Debug the wiring method of the dexterous hand – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjFjYzRiMGQ0ZGNjN2M0MmUyMTY1MjNiMjQ4MzQ4NmZfM2JmYWU5NmZjNDQyY2Y1MGZkNzExYTJiMDg1OGRlMjlfSUQ6NzYzODkzOTYwOTIwNDM5NDk2NV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Debug the wiring method of the dexterous hand – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzIxZTg3NzMxNzZiYTRhMWMzNmM5ODJhMzZhNTE2YzZfNDY1MTNkNTI3YTVmYzBkY2U2YjViZTQzZDU2YmI5NzBfSUQ6NzYzODkzOTYxMDQxMjE0MTUzNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Debug the wiring method of the dexterous hand – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmYwNzM3ZjRiZjk3Njg1M2UyOGMwNzM0NmJhNjliMDNfNGE0NmRlYTI3MDY4ZDA1M2IwNTI3NTczZDE3NTBhNzhfSUQ6NzYzODkzOTYwOTU2NDkwODUwNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Debug the wiring method of the dexterous hand – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTUwM2U2Nzc0MjVhNzczODJiMGUwNjA0YTdjZWM0YTVfYWU4ZTQzOWRjOTlkOWU4NjhlNWFlOGJiODViNzNjNDRfSUQ6NzYzODkzOTYwNzY5MDk3MjEwOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

Im Folgenden der Debug-Ablauf mit dem Mikrocontroller. Das Board führt das Demo-Programm in Schleife aus – zum Stoppen einfach das Datenkabel trennen.

## 2. Servo-IDs setzen

Eine Hand verwendet 8 Servos: rechte Hand ID 1–8, linke Hand ID 11–18

Mittelstellung ab Werk: rechts [451,571,451,571,451,571,451,571], links [571,451,571,451,571,451,571,451]

1. Verdrahtung: **einzeln** Servo und Servo-Treiberplatine verbinden.

![2. Set Servo ID – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWM0NTY2YjdjZWU5ZmNiNmJhZWRhODg0NjgwZDJiZjlfNjMzNGZmNzY1NTg3YmM5ZTMyNGRlYzk4YzdiMmZhYmNfSUQ6NzYzODkzOTYwNzUzOTQzNjUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)
2. Einstellung mit der Host-Software FD1.9.8.2 des Servoherstellers
[FD.rar]

![2. Set Servo ID – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmI3MTMyZTFlMjRmM2U1OTY3M2JkN2ZlYWYwM2MyMzdfYjA0NzhmZDNjODMyYjNiNmYyZjBkN2Q2NzJkNDUxMmVfSUQ6NzYzODkzOTYwODM0OTAxOTA5MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![2. Set Servo ID – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGJmNWE2MGEwZGU4ZGUxMWU4ZDA2YWIwYWFkMDk3YzJfMjcxOGRlZTE2Mjg3MDQ0OWExNjJmODU1OTBmYTBhZDRfSUQ6NzYzODkzOTYxMDcyNjY4MTU3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![2. Set Servo ID – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmQyNGIyMTQwOTExYzM3YzJhNGY2ZWQwMGZkOGI5NjdfZWJiYTYwZDZjNDlmNzY1OGRjYjEwMmRhMGEzMWZkZDBfSUQ6NzYzODkzOTYwODAxMzQ0MTk4MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 3. **Servohorn fixieren**

1. Programm „安装白色伺服喇叭时使用" auf das Board laden

Zweck: Servozahnrad ungefähr in Mittelstellung bringen; alle späteren Winkel beziehen sich auf diese Position.

(1) Arduino installieren (je nach System [Installationstutorial](https://blog.csdn.net/weixin_35509395/article/details/156188274)); vor dem Kompilieren im Bibliotheksmanager FTServo- und SCServo-Bibliothek installieren

![3.Fix the servo horn – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjU0NGRjM2VhZDU4NGViMmU4YjBkNjQ3OGRmYzMxOGFfMzYxMzAxMDM1NmFhYjFjM2ZhMTlmODMwNDBiOWUwMzlfSUQ6NzYzODkzOTYwNzU1MjI4MTUzOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)
(2) Boardtyp: „Arduino Nano"

![3.Fix the servo horn – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjdiYmNjMzFjMjE3OTZkNjAzYjZkM2RhZDRiZDY5MDFfZTVjNTAyZGU5ZGFmYmJmYzgwNDI3YzMyOWNmMjljYzVfSUQ6NzYzODkzOTYxMTUyMzQ1MTg1NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2. Servo 1, 2 debuggen
(1) Bearbeiten: je nach Servo-ID anpassen (z. B. Zeigefinger → ID 1, 2)

![3.Fix the servo horn – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2UyYzFjYmJiNjA3YTZkMjY4MWZkYjdhMzFhMDNkZDlfMjQ4NjdlY2M4ZjI2ZjcxNjJlNDc5YmQyNGNmNGZhYzVfSUQ6NzYzODkzOTYwNzYyMzQwNDUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)
(2) Programm aufs Board laden
(3) Verdrahten: Board + Servo-Treiberplatine + **Servos 1 und 2** – das Zahnrad dreht sich um einen Winkel und stoppt.

![3.Fix the servo horn – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2U4MTBhZWY4YmY0Y2MzOWU5MzhiODA0ZDZhODc4MzRfZGEzZjM4ODdkOWQ1MTJmZjNiYmQxNTMyMjQ2ZDQ0MDZfSUQ6NzYzODkzOTYwNzkzNTY4MzU1OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)
(4) Servohorn am Zahnrad montieren, möglichst parallel

![3.Fix the servo horn – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTUyMDI0ODVjYjhhNDBjZDJkZmQ1YjNmMzA2NDc5ZTlfNTUxNmQ2MWQwOTdmYzdjOTM2YTNkZTkxYzYzYjI5YmVfSUQ6NzYzODkzOTYwODAxMzQ1ODM2NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

3. Servo 3, 4 debuggen
(1) **Verdrahtung zwischen 328P-Board und Servo-Treiberplatine trennen (sonst kein Upload)**
(2) Bearbeiten: ID 3, 4

![3.Fix the servo horn – 6](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2RlNzE0MzI1ZDYxY2I2YjE4Y2YyNWZkYjM0MTgyOGFfZTI2MWI2MmQ0NmJlNTgwOTEzZDAzN2U4OGRmOTkwNDFfSUQ6NzYzODkzOTYxMTI0NjY2MDU3OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)
(3) Programm hochladen
(4) Verdrahten: Board + Treiberplatine + **Servos 3, 4**
(5) Servohorn montieren, möglichst parallel

4. Servo 5, 6 – gleiches Vorgehen
5. Servo 7, 8 – gleiches Vorgehen

## 4. **Mittelwerte feinjustieren**

1. Programm „01 微调MiddlePos值时使用" aufs Board laden

2. Bei geschlossener Fingerposition das Programm sofort stoppen (Datenkabel trennen) und prüfen, ob die Servohörner korrekt ausgerichtet sind (siehe Abbildung). Falls nicht, MiddlePos_1/MiddlePos_2 im Programm anpassen, bis sie ausgerichtet sind. Werte notieren (8 Werte für 8 Servos) – werden im endgültigen Programm verwendet.

![4.Fine-tune intermediate values – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmExMWZhZTY2NTUxMWE0OGJkMjg5OWJjM2QwNjcwMmJfNDE3MzY4ODI3OGRjNTU0YjlhMDA3ZDViMGNkZmUxNjZfSUQ6NzYzODkzOTYxMTE5MjAxOTkyMF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![4.Fine-tune intermediate values – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmY0ZTAyNTRkNGQ5OGQyMTAyZTkwNDk0Y2RmNDAzMjRfZGRjODE0NjQwODBlOTJkY2Q5NzUwN2M3OTZmYjEwZjlfSUQ6NzYzODkzOTYwODEwMzQ1NTY5NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 5. **Testprogramm ausführen**

1. Die gespeicherten MiddlePos_1-/MiddlePos_2-Werte in das folgende Array eintragen und das Programm laden.

![5.Run the test program – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzA4ZmVjODQzYzU3ZjIwMjU2NGQ1NjQ4YzFkZjFjZDdfMmU3ZDU0NGJiODU3OWI4ZDQzNDNiNzY0YjNkYzllYWZfSUQ6NzYzODkzOTYxMTI2MzQzNzc2Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 6. **„02 演示程序" ausführen**

(1) Arduino installieren, [Installationstutorial](https://blog.csdn.net/weixin_35509395/article/details/156188274) je nach System
(2) Unter `灵巧手调试\00 TTL串口舵机\arduino程序（MEGA328P开发板）\02 演示程序` je nach linker/rechter Hand die passende ino-Datei öffnen

![6.Run "02 Demo Program" – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGU3YzRlZWM2ZDRiNWZmYjNjMWQ3MmQzNGVkOTYxNTNfNzE3NWFjMGY4MGY4ZjJkYmJhMGY1NjhiMDAxNTFlMmVfSUQ6NzYzODkzOTYwODAxMzQ5MTEzMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)
(3) Vor dem Kompilieren FTServo-/SCServo-Bibliothek im Bibliotheksmanager installieren

![6.Run "02 Demo Program" – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzgwNjdhZWY4ZjAzNmIzNzMyYmIzMGZkYzE0OTNiMTBfNmU3ODBjZTA2ODMwMzc5MWJhMDJmNDkzMDU3MmY1MjlfSUQ6NzYzODkzOTYwNzk0NjU3ODg3Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)
(4) Boardtyp: „Arduino Nano"

![6.Run "02 Demo Program" – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTc0YjYyYjRjMTY4NGI5NzIxN2RhNjA0MTQ5YzE3OTRfYjYzZGYyNjkwMzY5ZTM3MjIzZWIxNmI4MWUzMGMxNmZfSUQ6NzYzODkzOTYxMTUwMjQxNDgwMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)
(5) Kompilieren und hochladen

Achtung: Der PC ist jetzt nur mit dem Board verbunden, das Board noch nicht mit der Servo-Treiberplatine (also nicht mit der Hand).

Nach erfolgreichem Upload das Board mit drei Jumper-Kabeln an die Servo-Treiberplatine anschließen und die Servos an die Treiberplatine. Siehe [Verdrahtung beim MEGA328P-Debugging](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link).

Die Hand führt **„02 演示程序"** in Schleife aus.

Ergebnis wie folgt:

![6.Run "02 Demo Program" – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTY0NzA2NGI2OTBjNzkwODE4ZGFhNGM2ZDFkNjhhMzFfZDMxNjlmZWZhNmMxYjQ0YTNhMjZhZWEzYWU0OGY2YzBfSUQ6NzYzODkzOTYwOTI1NDY0NDY3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## [7. Hand-Tracking](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)
