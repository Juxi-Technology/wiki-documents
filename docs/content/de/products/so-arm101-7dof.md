---
title: SO-ARM101 7-DOF-Roboterarm
category: robot
description: "Juxi Technology SO-ARM101 7-DOF Open-Source-Roboterarm — 90°-Handgelenk-Gierung, Bus-Servos mit 12V und 30kg.cm, tiefe LeRobot-Integration, ab Werk montiert, inkl. kompletter Tutorial-Reihe"
keywords: [so-arm101, 7-dof, 7-achsig, roboterarm, leRobot, teleoperation, imitation learning]
---

# SO-ARM101 7-DOF-Roboterarm

> **[Im Shop kaufen](https://www.juxitech.com/products/so-arm101-open-source-7-dof-robotic-arm)**

## Produktübersicht

Der SO-ARM101 ist ein Open-Source-Roboterarm, der auf Basis des SO-ARM100 tiefgehend optimiert wurde. Überarbeitete Kabelführung und abgestimmte Motor-/Getriebe-Paarungen beseitigen das Problem der Kabelbrüche an den Gelenken, und die Leistungsverbesserungen ermöglichen Echtzeit-Folgebewegungen zwischen Leader- und Follower-Arm. **Dies ist die 7-DOF-Version**: Sie ergänzt gegenüber dem 6-Achsen-Modell ein Servo für die Gierung des Handgelenks (Links-/Rechtsdrehung, Yaw), wodurch das Handgelenk deutlich mehr Stellungsfreiheit, mehr erreichbare Punkte und präzises Greifen aus vielen Winkeln erhält.

Er ist auf das **LeRobot**-Toolkit von Hugging Face abgestimmt und verbindet sich direkt mit PyTorch-Modellen und geteilten Datensätzen, sodass sich Imitation Learning und Reinforcement Learning leicht in die Praxis umsetzen lassen. Eine vollständige Montageanleitung und ein DIY-Kit sind enthalten — Studierende, Forschende und Maker können mit intelligenter Robotik für Lernen, Forschung und Kreation arbeiten.

**Auf einen Blick**: 7-DOF mit 90°-Handgelenk-Gierung · Hochdrehmoment-Servos mit 12V und 30kg.cm · optionaler flexibler TPU-Greifer · Dual-View-Datenerfassung · Onboard-Inferenz auf NVIDIA Jetson und D-Robotics RDK · ab Werk montiert und sofort einsatzbereit · unterstützt das Training der Modelle ACT, SmolVLA, Pi0, Pi0.5 und GR00T N1.5.

## Kernvorteile

### 7 Freiheitsgrade mit 90°-Handgelenk-Gierung

Die 7-DOF-Version ergänzt das 6-Achsen-Design um ein Servo für die Links-/Rechts-Gierung des Handgelenks (Yaw), sodass das Handgelenk aus viel mehr Richtungen an ein Ziel heranfahren und mehr Punkte im Arbeitsraum erreichen kann. Diese zusätzliche Freiheit ist es, die präzises Greifen aus vielen Winkeln erst möglich macht.

### Leader-Follower-Teleoperation & Imitation Learning

Der Arm integriert das KI-Framework von Hugging Face. Teleoperieren Sie den Leader-Arm, um Demonstrationsbewegungen aufzuzeichnen, trainieren Sie anschließend in einem Durchgang ein Imitation-Learning-Modell und setzen Sie die optimierte Policy ein. Er kann komplexe Aufgaben übernehmen und sich an seine Umgebung anpassen — der Automatisierungskreislauf schließt sich durchgängig.

### Dual-View-Gesamtabdeckung

Die am Arm montierte Kamera erfasst aus nächster Nähe die räumliche Position, den Winkel und die Oberflächentextur des Ziels für eine detailgetreuere Datenerfassung, während eine Kamera auf dem Tischständer die Arbeitsumgebung in Echtzeit erfasst. Zusammen halten sie den Betrieb präzise, reagieren schnell auf Veränderungen und verhindern Drift oder Blockierungen.

### Hochdrehmoment-Bus-Servos mit 30kg.cm und 12V

Der Follower-Arm ist einheitlich mit 7 × Feetech STS3215-C018 (12V, 30kg.cm, 1:345) bestückt, um unter mehrachsiger Last ein ausreichendes Greifdrehmoment zu garantieren; der Leader-Arm bleibt bei 7.4V, um Handgefühl und Kosten in Einklang zu bringen. Ein 12-Bit-Magnetencoder liefert auf jeder Achse eine Präzision von 0.088°.

### Unterstützung für das Training mehrerer Modelle

Trainieren und deployen Sie auf derselben Hardware Policies für ACT, SmolVLA, Pi0, Pi0.5 und GR00T N1.5 und nutzen Sie vortrainierte Modelle wie `lerobot/smolvla_base`, `lerobot/pi0_base`, `lerobot/pi05_base` und `lerobot/xvla-widowx` direkt aus dem Model Hub von LeRobot.

### Onboard-Inferenz auf NVIDIA und D-Robotics RDK

Verbinden Sie den Arm mit einem einzigen Kabel mit einem Raspberry Pi, D-Robotics RDK oder NVIDIA Jetson-Controller, um die Inferenz am Arm selbst auszuführen — mit Echtzeit-Motorsteuerung und Encoder-Rückmeldung.

### Ab Werk montiert, sofort einsatzbereit

Jedes Exemplar wird montiert, verkabelt und kalibriert ausgeliefert — schließen Sie Strom und USB an, und die Plattform ist bereit für Teleoperation und Datenerfassung.

### Aufrüstbarer flexibler Greifer

Der flexible Greifer ist ein Upgrade des standardmäßigen starren Greifers und wird im 3D-Druck aus flexiblem TPU gefertigt. Er verwendet ein Hohlraumdesign mit innenliegenden Verstärkungsrippen und arbeitet nach dem Prinzip eines Flossengreifers: Er passt sich der Form des gegriffenen Objekts an und verringert die auf das Objekt wirkende Kontaktkraft — ideal für weiche oder leicht beschädigbare Gegenstände (Obst, Glaswaren, Eier, Lebensmittelverarbeitung), die ein herkömmlicher starrer Greifer nicht sicher handhaben kann.

## Spezifikationen

| Kategorie | Spezifikation |
|----------|------|
| Typ | Leader-Follower-Teleoperations-Roboterarm |
| DOF | 7 (ergänzt gegenüber dem 6-Achsen-Modell eine Handgelenk-Gierung / Yaw-Achse) |
| Follower-Arm-Servos | 7 × Feetech STS3215-C018 (12V, 30kg.cm, 1:345) |
| Leader-Arm-Servos | 7 × 7.4V STS3215 — Dämpfungsversion: 1 × C001 (1:345) + 2 × C044 (1:191) + 3 × C046 (1:147); Version ohne Dämpfung: 7 × C066 |
| Encoder | 12-Bit-Magnetencoder (Präzision 0.088°) |
| Stromversorgung | Leader-Arm 5V6A / Follower-Arm 12V5A |
| Host | PC (Linux) / Raspberry Pi / D-Robotics RDK / NVIDIA Jetson |
| Ökosystem | Hugging Face LeRobot (ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5) |
| Greifer | Starr aus PLA (Standard) oder flexibel aus TPU (Upgrade) |
| Montage | Ab Werk montiert, verkabelt und kalibriert |

*Servo-Anordnungen und verfügbare Paketkonfigurationen sind auf der Shop-Seite aufgeführt.*

## Verwandte Tutorials

- **[SO-ARM101 Roboterarm 7-Achsen Tutorial](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/)** — Umgebungseinrichtung, Austausch der 7-DOF-Dateien, Kalibrierung, Teleoperation, Datenerfassung, Training und Inferenz — Schritt für Schritt
- [Dateien ersetzen (Anpassung an 7-DOF)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- [SO-ARM101-Tutorial (6-Achsen)](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Roboterarm-Auswahlleitfaden](/de/tutorials/robot-arms/select-guide)
- [Einführung in verkörperte Intelligenz (LeRobot)](/de/topics/embodied-ai-intro)

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
