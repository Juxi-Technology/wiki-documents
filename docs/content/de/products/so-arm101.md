---
title: SO-ARM101 Entwicklungs-Kit
category: robot
description: "Das Open-Source-Doppelarm-Robotik-Kit von Juxi Technology — 6-DOF-Arme, LeRobot-Ökosystem, Teleoperation/Imitation Learning für KI-Forschung"
keywords: [so-arm101, roboterarm, leRobot, teleoperation, doppelarm]
---

# SO-ARM101 Entwicklungs-Kit

> **[Im Shop kaufen](https://www.juxitech.com/de/products/so-arm101-developers-kit)**

## Produktübersicht

Das SO-ARM101 ist Juxi Technologys Open-Source-6-DOF-Doppelarm-Entwicklungskit, tief integriert in das **LeRobot**-Ökosystem. Schwarzer Leader-Arm + weißer Follower-Arm, sofort einsatzbereit für Teleoperation, Datenerfassung für Imitation Learning und Policy-Training.

**Kernfunktionen**:

- Doppelarme, je 6 DOF, Bus-Servo-Antrieb
- Tiefe LeRobot-Integration (HuggingFace) — ACT/Diffusion/Pi0-Policies
- Jetson / PC (Linux) Unterstützung
- Vollständig Open-Source-Hardware (Schaltpläne/CAD/Firmware)

## I. Hardwaredesign: Hohe Leistung und Modularität, einfach zu montieren und anpassbar

- **Strukturmaterial**: Die Kernstruktur kombiniert 3D-gedruckte Teile mit verstärkten lasttragenden Komponenten, optimiert die Kabelführung und das Gelenkdesign, vermeidet Bewegungsinterferenzen und vereint Leichtbau mit Langlebigkeit. Benutzer können Strukturteile selbst drucken, ersetzen oder erweitern.

- **Antriebskonfiguration**: Der Follower-Arm ist mit **6 Magnet-Encoder-Servos mit 12 V und 30 KG großem Drehmoment** ausgestattet. Zusammen mit der 360°-Magnet-Encoder-Rückmeldung und dem PID-Regelalgorithmus sind die Bewegungen geschmeidig und ohne Zittern, die Wiederholgenauigkeit ist hoch, die Kraft stark und die Bewegungen präzise; der Leader-Arm verwendet **6 Servos mit 7.4 V**, deren Untersetzungsverhältnisse je nach Gelenklast unterschiedlich verteilt sind, was das manuelle Ziehen zum Anlernen erleichtert.

- **Vision-System**: Unterstützt ein intelligentes Dual-Kamera-Visionssystem. Die Kamera am Endeffektor erfasst Greifdetails aus nächster Nähe, die globale Kamera deckt die Arbeitsumgebung ab, und die Fusion der Daten beider Kameras erstellt ein dreidimensionales Modell, das reichhaltige Datengrundlagen für das Imitationslernen liefert.

- **Steuerverbindung**: Mit einer Servo-Treiberplatine ausgestattet, die über eine USB-C-Schnittstelle direkt mit einem Computer oder Raspberry Pi verbunden wird – Plug-and-Play, was den Hardware-Anschlussprozess vereinfacht und den schnellen Aufbau einer Steuerungsumgebung ermöglicht.

## II. Software-Ökosystem: Tiefe Integration von LeRobot, KI-Entwicklung ohne Einstiegshürde

- **Kompatibilität des Kernframeworks**: Tiefgehende Anpassung an das **Open-Source-ML-Framework LeRobot für Roboter** von Hugging Face, auf PyTorch basierend, mit integrierten vortrainierten Modellen, Datensätzen für verschiedene Szenarien und einer Simulationsumgebung, kompatibel mit bekannten Open-Source-Datensätzen wie Stanford ALOHA.

- **Kommunikation mit geringer Latenz**: Verwendet die **verteilte DORA-Datenstrom-Engine**, um eine Interaktion mit geringer Latenz zwischen Hardware und Algorithmen zu erreichen. Die Python-Laufzeitleistung ist 17-mal schneller als bei ROS2, Code-Hot-Reloading wird unterstützt, und Strategien können ohne Neustart in Echtzeit angepasst werden.

- **Full-Stack-Open-Source**: Hardware-3D-Druckdateien, Software-Steuercode, KI-Trainingsskripte und das vollständige Tutorial-Paket sind **vollständig quelloffen**. Benutzer können sie frei ändern und weiterentwickeln, um schnell individuelle Funktionserweiterungen umzusetzen.

## III. Kernanwendungsszenarien: Vom Einstieg bis zur Umsetzung, für alle Szenarien geeignet

1. **Einstieg in die Roboterausbildung**: Bietet Tutorials für den gesamten Ablauf von der Montage des Roboterarms über die grundlegende Programmierung bis zur Bereitstellung von KI-Strategien, ergänzt durch eine visuelle Bedienoberfläche und Beispielcode. Benutzer ohne Vorkenntnisse können sich schnell Fähigkeiten in der Robotersteuerung und der KI-Anwendung aneignen.

2. **Validierung wissenschaftlicher Algorithmen**: Fokus auf Forschung zu **Imitationslernen und Verstärkungslernen**, unterstützt das Training von Robotern durch VR-Aufzeichnung menschlicher Bedienungsdaten; typisches Beispiel: Auf Basis von 50 Bedienvideos mit je 15 Sekunden kann der Roboter durch 2 Stunden Training Aufgaben wie das Falten von Kleidung, das Einstecken eines Schlüssels und das Sortieren von Material beherrschen.

3. **Leichtbau-Industrieprototypen**: Kostengünstige Validierung von Automatisierungslösungen, geeignet für Szenarien wie **Materialtransport, Präzisionsmontage und Teilesortierung**; zu Kosten im Bereich von tausend Yuan werden die Kernfunktionen eines industriellen Roboterarms realisiert, sodass die Prototypenvalidierung schnell umgesetzt werden kann.

## Spezifikationen

| Kategorie | Spezifikation |
|------|------|
| Typ | Doppelarm-Teleoperationsroboter |
| DOF | Je Arm 6 DOF |
| Antrieb | Feetech-Bus-Servos |
| Host | PC (Linux) / Jetson |
| Ökosystem | LeRobot, ROS 2, ROS 1 |
| Stromversorgung | Leader 5V6A / Follower 12V5A |
| Nutzlast | 500g |
| Wiederholgenauigkeit | ±0.1mm |
| Arbeitsradius | 520mm |
| Kommunikation | USB-C |
| Material | Bambu Lab PLA+ |
| Abmessungen (Leader / Follower) | 111×239×525 mm / 111×173×532 mm |

![Maßzeichnung von Leader- und Follower-Arm](../../../public/images/products/so-arm101/dimensions.jpg)

## Schnellstart

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## Verwandte Tutorials

- [SO-ARM101-Tutorial](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [SO-ARM101 Montage](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Roboterarm-Auswahlleitfaden](/de/tutorials/robot-arms/select-guide)
- [Einführung in verkörperte Intelligenz (LeRobot)](/de/topics/embodied-ai-intro)

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
