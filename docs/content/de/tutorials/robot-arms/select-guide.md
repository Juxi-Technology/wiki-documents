---
title: "Auswahlhilfe"
description: "Auswahlhilfe für die Roboterarme von Juxi Technology: SO-ARM101, AmazingHand und Lekiwi im Vergleich nach Typ, Freiheitsgraden, Steuerung und Einsatz."
keywords: [auswahl, robot arm, vergleich]
---

# Auswahlhilfe

Juxi Technology bietet mehrere Roboterarme für unterschiedliche Anwendungsszenarien. Diese Übersicht hilft Ihnen beim Vergleich und bei der Auswahl des passenden Modells.

> Hinweis: Detaillierte Spezifikationen finden Sie in der offiziellen Dokumentation des jeweiligen Produkts. Diese Tabelle dient nur als Auswahlhilfe.

## Die drei Roboterarme im Vergleich

| Merkmal | SO-ARM101 | AmazingHand | Lekiwi |
|---------|-----------|-------------|--------|
| **Typ** | Doppelarm-Teleoperation | Roboterhand | Low-Cost-Lehrarm |
| **DOF** | 6 DOF pro Arm | 5 Finger, Mehrgelenk | 6 DOF |
| **Steuerung** | LeRobot / Python API | TTL-Serial-Bus | Servosteuerung |
| **Host-Plattform** | PC (Linux) / Jetson | Controller-Board | PC / MCU |
| **Einsatz** | KI-Lernen, Teleop-Forschung | Greifen, Gesten | Bildung, Einsteiger |
| **Open Source** | [LeRobot](https://github.com/Juxi-Technology/lerobot) | [AmazingHand](https://github.com/Juxi-Technology/AmazingHand) | Offizielle Doku |
| **Ideal für** | Forscher, KI-Entwickler | Manipulationsforscher | Studenten, Maker |

## Wie wähle ich aus?

### 🎓 Studenten / Einsteiger → Lekiwi

- Einfacher Aufbau, geringe Kosten — ideal für den Unterricht und den Einstieg
- Intuitive Servosteuerung

### 🤖 Greif- und Manipulationsforschung → AmazingHand

- 4-fingrige Roboterhand für Forschung zu Greifstrategien und Gestensteuerung
- Steuerung über TTL-Serial-Bus, kompatibel mit gängigen Controllern

### 🧠 KI-Imitation Learning / Teleoperation → SO-ARM101

- Doppelarm-Design mit Leader-Follower-Teleoperation
- Tiefe Integration in das LeRobot-Ökosystem, ideal für Imitation Learning
- Jetson-Unterstützung für nahtlose KI-Workflows

## Empfohlene Kombinationen

| Bedarf | Empfohlene Konfiguration |
|------|-------------------|
| KI-Teleoperationsforschung | SO-ARM101 + AmazingHand (feinmotorische Manipulation) |
| Lehrlabor | Mehrere Lekiwi |
| Vollständiges Robotersystem | SO-ARM101 + IMU-Modul + Vision-Zubehör |

## Zugehörige Tutorials

- [SO-ARM101-Tutorial](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [AmazingHand-Interface-Steuerung](/de/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Lekiwi-Tutorial](/de/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial)

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
