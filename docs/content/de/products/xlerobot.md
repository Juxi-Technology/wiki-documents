---
title: XLeRobot Zweiarm-Mobilroboter
category: robot
description: Juxi Technology XLeRobot Zweiarm-Mobilroboter — SO-ARM101-Doppelarm + Omnidirektionalrad-Fahrgestell + Kamera-Turm, zwei Servo-Treiberplatinen mit 12V-Stromversorgung, LeRobot-Ökosystem, als Fertigbaugruppe oder Bausatz erhältlich
keywords: [xlerobot, zweiarm-roboter, mobileroboter, embodied intelligence, lerobot, so-arm101, omnidirektionalrad-fahrgestell]
---

# XLeRobot Zweiarm-Mobilroboter

## Produktübersicht

XLeRobot ist eine Zweiarm-Mobilroboter-Plattform: Ein Omnidirektionalrad-Fahrgestell (Lenkrollen) dient als mobile Basis; ein Kamera-Turm trägt zwei SO-ARM101-Follower-Arme. Zusammen mit zwei Servo-Treiberplatinen, einem Raspberry Pi/Jetson als Host und einer PD-Powerbank entsteht ein mobiler Open-Source-Roboter für Embodied-Intelligence-Forschung, Haushaltsaufgaben und LeRobot-Ökosystem-Entwicklung.

**Kernfunktionen**:

- Doppelarm-Manipulation + omnidirektionales mobiles Fahrgestell — mobiles Greifen verschiedener Haushaltsgegenstände
- Basierend auf SO-ARM101-Roboterarmen mit Feetech STS3215-C018-Busservos
- Kamera-Turm + Handgelenkkameras, unterstützt Datenerfassung und Imitation Learning
- Zwei Servo-Treiberplatinen treiben Arme und Fahrgestell unabhängig voneinander an, 12V-Stromversorgung
- Vollständiges LeRobot-Software-Ökosystem: Umgebungseinrichtung, Datenerfassung, Training und Inferenz
- In zwei Varianten erhältlich: Fertigbaugruppe oder Bausatz; der Bausatz enthält eine vollständige Teileliste
- Kompatibel mit der Lekiwi-Basis (eine vorhandene Lekiwi kann direkt als Radbasis weiterverwendet werden)

---

## Spezifikationen

| Kategorie | Spezifikation |
|------|------|
| Roboterarme | 2 × SO-ARM101-Follower-Arme (Feetech STS3215-C018-Busservos, IDs 1-6) |
| Fahrgestell | Omnidirektionalrad-Fahrgestell (Lenkrollen), 3 × STS3215-C018-Servos (IDs 7/8/9) |
| Kamera-Turm | Kamera-Turm-Basis + 2 × STS3215-C018-Servos (IDs 7/8) + Kamera |
| Antrieb | 2 × Servo-Treiberplatinen (USB-C-auf-USB-A-Datenkabel zum Host; PD-auf-DC-12V-3A-Stromkabel) |
| Stromversorgung | PD-Powerbank, 12V-Version (bis zu 100W pro Anschluss, im Test ausreichend für den Betrieb) |
| Host | Raspberry Pi (nicht enthalten) / Jetson |
| Kabel | 2 × 90CM-Servo-Verlängerungskabel (Fahrgestell und Kamera-Turm → Servo-Treiberplatine) |
| Gesamtgewicht | ca. 12kg (vollständig montiert) |
| Software | LeRobot-Ökosystem; Servo-Konfiguration über Bambot (Windows / macOS / Linux) |

---

## Schnellstart

### 1. LeRobot-Umgebung einrichten

Wählen Sie je nach Betriebssystem das passende Tutorial zur Umgebungseinrichtung (macOS / Ubuntu / Windows) und installieren Sie LeRobot samt Abhängigkeiten.

### 2. XLeRobot-Dateien verschieben

Verschieben Sie die XLeRobot-Dateien in das entsprechende Verzeichnis, um die Software-Vorbereitung abzuschließen.

### 3. Roboter montieren

- **Fertigbaugruppe**: Omnidirektionalrad-Fahrgestell, Kamera-Turm-Basis, beide Arme und Verkabelung gemäß der Teileliste direkt montieren
- **Bausatz**: zuerst die Servos konfigurieren (IDs mit [Bambot](https://bambot.org/feetech.js) scannen und umbenennen), dann nacheinander den Wagen, die Radbasis, die Roboterarm-Basis und die Verkabelung montieren, zuletzt den Akku einsetzen

Beim Bausatz wird empfohlen, die Stromkabel zuletzt anzuschließen; halten Sie die Stromversorgung beim Ein- und Ausstecken anderer Kabel getrennt, um die Servo-Treiberplatinen zu schützen.

---

## Komplette Tutorials

- [XLeRobot-Tutorial-Übersicht](/de/tutorials/robot-arms/xlerobot/)
- [Umgebung einrichten (macOS)](/de/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS)
- [Umgebung einrichten (Ubuntu)](/de/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu)
- [Umgebung einrichten (Windows)](/de/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows)
- [XLeRobot-Dateien verschieben](/de/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files)
- [Montage der Fertigbaugruppe](/de/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit)
- [Bausatz-Montage](/de/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit)

---

## Anwendungsfälle

- Embodied-Intelligence- und Imitation-Learning-Forschung (Haushaltsaufgaben, Objektgreifen)
- Entwicklung von Zweiarm-Mobilmanipulationsalgorithmen (LeRobot-Ökosystem)
- Robotik-Unterricht und Wettbewerbe
- Prototypenvalidierung für Haushalts-Serviceroboter

---

## Häufige Fragen

**F: Was ist der Unterschied zwischen Fertigbaugruppe und Bausatz?**

Die Fertigbaugruppe ist gemäß der Teileliste fertig montiert; der Bausatz muss selbst montiert werden, wobei die Servo-IDs zuerst mit dem Bambot-Tool konfiguriert werden (Roboterarme 1-6, Fahrgestell 7/8/9, Kamera-Turm 7/8).

**F: Welche Teile müssen zusätzlich selbst beschafft werden?**

Powerbank, Raspberry Pi sowie das PD-5V5A-Stromkabel für den Raspberry Pi müssen selbst gekauft werden (im Tutorial vermerkt).

**F: Wie werden die Servo-IDs konfiguriert?**

Verbinden Sie einen Servo mit der Servo-Treiberplatine und diese mit dem Computer; scannen und benennen Sie die Servo-IDs dann auf der [Bambot-Servo-Konfigurationsseite](https://bambot.org/feetech.js) um. Das offizielle LeRobot-Code-Repository unterstützt derzeit keine Servo-Konfiguration außerhalb der Roboterarme, daher wird stattdessen Bambot verwendet.

**F: Kann der fertig montierte Roboter einfach geschoben werden?**

Nein. Schieben Sie den vollständig montierten XLeRobot nicht wie einen Wagen fort — dies kann die Servo-Getriebe beschädigen; heben Sie den Roboter zum manuellen Bewegen an (ca. 12kg).

---

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
