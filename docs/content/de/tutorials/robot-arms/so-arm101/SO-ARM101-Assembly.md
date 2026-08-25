---
title: Lerobot-Roboterarm-Montageanleitung
description: "Pro-Version: Leader-Arm 5V6A, Follower-Arm 12V5A Netzteil"
---

# Lerobot-Roboterarm-Montageanleitung

> **[Im Shop kaufen](https://www.juxitech.com/de/products/so-arm101-developers-kit)**


**Pro-Version: Leader-Arm (schwarz) 5V6A, Follower-Arm (weiß) 12V5A Netzteil**

Servo-ID-Einstellung, Winkel-Kalibrierung und Montage im Voraus erledigen. Siehe [offizielle Montageanleitung](https://huggingface.co/docs/lerobot/so101).

## Schritt 1: Servo-IDs einstellen, Servohörner montieren (außer Nr. 5)

**Achtung**: Servo-Gelenk-IDs und Übersetzungsverhältnis müssen exakt zu **SO-ARM101** passen.

Jeder Motor am Bus benötigt eine eindeutige ID (neu: Standard `1`). Baudrate: 100000.

### Windows

[Feetech-Servo-Software.zip] verwenden — IDs (1-6) setzen und Mittelstellung kalibrieren.

### Linux/Ubuntu

```
lerobot-setup-motors \\
    --robot.type=so101_follower \\
    --robot.port=/dev/ttyACM0
```

Gripper-Servo zuerst verbinden, IDs (6→1) setzen:

```
'gripper' motor id set to 6
```

**Immer nur 1 Servo** gleichzeitig anschließen. Nach Abschluss die 3-Pin-Kabel ab ID 1 verbinden.

Gleiche Schritte für den Leader-Arm:

```
lerobot-setup-motors \\
    --teleop.type=so101_leader \\
    --teleop.port=/dev/ttyACM0
```

## Schritt 2: Montage

Follower-Arm wie Leader (ab Schritt 12 andere Endeffektor-Montage).