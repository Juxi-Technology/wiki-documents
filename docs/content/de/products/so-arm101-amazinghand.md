---
title: "SO-ARM101 & AmazingHand Open-Source-Roboterarm mit Mehrfingerhand"
category: robot
description: "Das SO-ARM101 & AmazingHand ist eine komplette Open-Source-Plattform für verkörperte KI, die den 6-Achsen-Roboterarm SO-ARM101 mit der 8-DOF-Vierfinger-Hand…"
keywords: ["SO-ARM101 & AmazingHand Open-Source-Roboterarm mit Mehrfingerhand", "SO-ARM101", "AmazingHand", "LeRobot", "SCS0009", "STS3215"]
---

# SO-ARM101 & AmazingHand Open-Source-Roboterarm mit Mehrfingerhand

## Produktübersicht

Das SO-ARM101 & AmazingHand ist eine komplette Open-Source-Plattform für verkörperte KI, die den 6-Achsen-Roboterarm SO-ARM101 mit der 8-DOF-Vierfinger-Hand AmazingHand kombiniert. Der serienmäßige Parallelgreifer wird durch eine Vierfingerhand ersetzt, die von einem einzigen Servo des Leader-Arms angetrieben wird und über einen einfachen, zuverlässigen, werkseitig montierten Mechanismus synchrones Greifen und Öffnen der vier Finger ermöglicht. Aufgebaut auf dem LeRobot-Ökosystem von Hugging Face unterstützt sie Leader-Follower-Teleoperation, Datenerfassung mit zwei Ansichten und Ende-zu-Ende-Imitationslernen mit ACT, SmolVLA, Pi0, Pi0.5 und GR00T N1.5 – der einfachste Einstieg vom Greifer zur Mehrfingerhand.

**SO-ARM101**ist ein Open-Source-6-Achsen-Roboterarm, der auf Basis des SO-ARM100 umfassend optimiert wurde. Die überarbeitete Kabelverlegung und die neue Motor-/Getriebekombination beseitigen das Kabelbruchproblem an den Gelenken und schränken deren Bewegungsumfang nicht mehr ein, während sie Echtzeit-Führung im Leader-Follower-Betrieb und nahtlose Kompatibilität mit dem LeRobot-Toolkit von Hugging Face bieten.

**AmazingHand**ist ein Open-Source-, kostengünstiges und vollständig 3D-druckbares Entwicklungskit für eine Roboterhand mit 8 Freiheitsgraden. Die Servos sind vollständig im Handkörper untergebracht, mit kabellosem Innenaufbau, und jeder Finger wird von zwei Gelenken angetrieben, was Geschicklichkeit mit natürlichem Zusammenspiel der Finger verbindet.

## Wichtigste Vorteile

### Vierfinger-Geschicklichkeitshand mit 8 Freiheitsgraden

AmazingHand bietet vier Finger (Daumen, Zeigefinger, Mittelfinger und Ringfinger), zwei Gelenkglieder pro Finger und insgesamt 8 Freiheitsgrade. Ein Parallellenkmechanismus lässt die Finger für ein natürlicheres Greifen zusammenwirken, während alle Servos im Handkörper sitzen – ohne externe Verkabelung für einen kompakten, sauberen Aufbau.

### Ein einziger Servo-Lenkmechanismus treibt alle vier Finger an

Der Servo Nr. 6 (STS3215) am Leader-Arm treibt über eine Wegemapping alle acht SCS0009-Busservos in der Hand an, sodass eine einzige Bewegung synchrones Greifen (geschlossene Faust) oder Öffnen (offene Handfläche) der vier Finger erzeugt. Einfache Mechanik, zuverlässige Steuerung und keine komplexe Programmierung auf der Handseite.

### Ende-zu-Ende-Imitationslernen mit ACT, SmolVLA, Pi0, Pi0.5 und GR00T N1.5

Führen Sie die Leader-Follower-Teleoperation aus, um Demonstrationsdaten aufzuzeichnen, und trainieren Sie dann eine Imitationslern-Policy in einem einzigen Durchgang. Ein kleiner Datensatz genügt, damit der Follower-Arm vorgegebene Greifaufgaben selbstständig erledigt, und der gesamte Kreislauf lässt sich ohne Programmierung von Grund auf schließen.

### Datenerfassung mit zwei Ansichten

Eine Kamera auf einem oberen Halter erfasst den gesamten Arbeitsbereich von oben, um Raumposition und Ausrichtung der Zielobjekte zu bestimmen, während eine Seitenkamera auf einem Tischständer den Kontext des Arbeitsbereichs in Echtzeit überträgt. Zusammen halten sie die Manipulation präzise, reagieren schnell auf Szenenänderungen und verhindern Abweichungen oder Stillstand.

### Werkseitig montiert, sofort einsatzbereit

Jede Einheit wird montiert, verkabelt und kalibriert geliefert – Netzteil und USB anschließen, und die Plattform ist bereit für Teleoperation und Datenerfassung. Die Kameraoptionen umfassen ein 86°-Autofokusmodul mit 30 FPS und ein 100°-Weitwinkel-Festfokusmodul mit 60 FPS, beide USB, treiberfrei und Plug-and-Play.

### Nahtlose Integration mit Hugging Face LeRobot

Nutzen Sie die vortrainierten Modelle, Datensätze und Algorithmenbibliotheken von LeRobot direkt, teilen Sie Code und Erfahrungen mit einer globalen Entwickler-Community und steigen Sie in verkörperte KI ein, ohne die Toolchain selbst neu aufzubauen.

## Hardware-Überblick

### Verfügbare Versionen (Auswahl nach Bedarf am Endeffektor):

| Version | Endeffektor | Handsteuerung | Geeignet für |
|---|---|---|---|
| Pro-Version | Flexibler TPU-Greifer | Unabhängige Servosteuerung | Nutzer, die den standardmäßigen Zweifingergreifer des SO-ARM101 benötigen |
| Version mit Geschicklichkeitshand | Vierfinger-Geschicklichkeitshand AmazingHand | Servo Nr. 6 des Leader-Arms mit Wegemapping zur gemeinsamen Ansteuerung von 8 Busservos | Nutzer, die geschicktes Greifen und Ende-zu-Ende-Imitationslernen erkunden |

**Greifverfahren:**Die Pro-Version verwendet das Kneifen mit zwei Fingern, die Version mit Geschicklichkeitshand nutzt Greifen und Öffnen mit vier Fingern. Eine unabhängige Steuerung einzelner Finger wird in der aktuellen Version nicht unterstützt und steht auf der Entwicklungs-Roadmap.

### Kompatible Geräte:

Raspberry Pi / D-Robotics RDK / NVIDIA Jetson Controller-Serien sowie Windows- und Linux-PCs über USB-Seriell. Vollständig kompatibel mit den Open-Source-Projekten LeRobot SO-ARM101 und AmazingHand und unterstützt die meisten seriellen Busservos am Markt.

### Einfache Einrichtung in 3 Schritten:

- Verbinden Sie die Servotreiberplatine mit dem mitgelieferten Kabel mit Ihrem Raspberry Pi, RDK oder Jetson Controller und versorgen Sie dann den Leader-Arm (DC5521 5V6A) und den Follower-Arm (DC5521 12V5A) mit Strom.
- Einschalten und über USB-Seriell verbinden. Arm und Hand kommen montiert, verkabelt und kalibriert an – weder mechanische Montage noch Servo-ID-Konfiguration sind nötig.
- Folgen Sie den mitgelieferten LeRobot-Tutorials, um den Follower-Arm zu teleoperieren, Datensätze mit zwei Ansichten zu sammeln und Ihre Imitationslern-Policy zu trainieren.

## Technische Spezifikationen

### Geschicklichkeitshand (AmazingHand)

| Fingerspannweite | 195 mm ~ 101 mm |
|---|---|
| Freiheitsgrade | 8 Freiheitsgrade (angetrieben von 8 Busservos) |
| Tragfähigkeit pro Finger | 0,2 kg (maximal 0,5 kg bei vollständigem Griff mit allen vier Fingern) |
| Anzahl der Finger | 4 (Daumen, Zeigefinger, Mittelfinger, Ringfinger) |
| Glieder pro Finger | 2 |
| Gewicht der Hand | 0,416 kg |
| Beugebereich der Finger | Erstes Glied 0~86°, zweites Glied 0~80° |
| Seitlicher Rollwinkel der Finger | Daumen 20°, die anderen drei Finger -20°~20° |
| Versorgungsspannung | 6 V DC |
| Steuerungsmethode | Angetrieben vom Servo Nr. 6 des Leader-Arms — synchrones Greifen/Öffnen der vier Finger |
| Leistung | Maximal 48 W, Nennleistung 4,8 W |

### Roboterarm (SO-ARM101)

| Produktmaterial | Bambu PLA+ |
|---|---|
| Produktabmessungen | Leader-Arm: 111 x 239 x 525 mm
Follower-Arm: 111 x 173 x 532 mm |
| Produktgewicht | Leader-Arm: ca. 680 g
Follower-Arm: ca. 690 g |
| Servotreiberplatine | JUXI Bus-Servo-Adapter |
| Kamera | 2-MP-HD-Autofokuskamera mit 30 FPS (1080P)
2-MP-HD-Festfokuskamera mit 60 FPS (1080P) |
| Stromversorgung | DC5521 5V6A (Leader-Arm) / DC5521 12V5A (Follower-Arm) |
| Betriebssystem | Windows / Linux |
| Steuerungsschnittstelle | USB-Serielle Kommunikation |
| Programmiersprache | Python |

### Servokonfiguration

| Position | Servomodell | Getriebeübersetzung | Menge |
|---|---|---|---|
| Leader-Arm — Gelenk Nr. 2 (7,4 V) | STS3215-C001 | 1:345 | 1 |
| Leader-Arm — Gelenke Nr. 1 und Nr. 3 (7,4 V) | STS3215-C044 | 1:191 | 2 |
| Leader-Arm — Gelenke Nr. 4 und Nr. 5 sowie Greifer/Hand Nr. 6 (7,4 V) | STS3215-C046 | 1:147 | 3 |
| Follower-Arm — alle Gelenke, Pro-Version (12 V) | STS3215-C018 | 1:345 | 6 |
| Follower-Arm — Arm-Gelenke, Version mit Geschicklichkeitshand (12 V) | STS3215-C018 | 1:345 | 5 |
| AmazingHand Geschicklichkeitshand (6 V) | SCS0009-C001 | — | 8 |

### SCS0009-Busservo (Geschicklichkeitshand)

| Servomodell | Feetech SCS0009-C001 (2,3 kg einachsiger serieller Busservo) |
|---|---|
| Drehgeschwindigkeit | 0,07 s/60° (143 RPM) @6V |
| Haltemoment | 2,3 kg·cm @6V |
| Servopräzision | 0,293° (300/1024) |
| Sensor & Bereich | Potentiometer-Sensor, 300° regelbar, unterstützt sowohl den winkelgesteuerten Servomodus als auch den Dauerrotations-Radmodus |
| Schutz | Spannungsschutz, Blockierschutz, Übertemperaturschutz |
| Datenrückmeldung | Unterstützt — Rückmeldung von Temperatur, Geschwindigkeit, Spannung und Position |
| Anordnung | Zwei SCS0009-Servos pro Finger für schnelle, koordinierte Reaktion und flüssige Fingerbewegung |

### STS3215-Busservo (Roboterarm)

| Parameter | STS3215-C001 | STS3215-C018 |
|---|---|---|
| Drehgeschwindigkeit | 0,192 s/60° (52 RPM) @7,4 V | 0,222 s/60° (45 RPM) @12 V |
| Haltemoment | 19,5 kg·cm @7,4 V | 30 kg·cm @12 V |
| Servopräzision | 0,088° | 0,088° |
| Sensor & Bereich | Hochpräziser 12-Bit-Magnetencoder, 360° regelbar | Hochpräziser 12-Bit-Magnetencoder, 360° regelbar |
| Schutz | Spannungsschutz, Blockierschutz, Übertemperaturschutz | Spannungsschutz, Blockierschutz, Übertemperaturschutz |
| Datenrückmeldung | Unterstützt — Rückmeldung von Winkel, Temperatur, Spannung und Position | Unterstützt — Rückmeldung von Winkel, Temperatur, Spannung und Position |

Der STS3215 integriert zwei hochwertige Magnetencoder-Motoren mit koordinierter Reaktion im Millisekundenbereich und mehreren Betriebsmodi, wodurch jede Armbewegung flüssig und präzise bleibt.

### JUXI Bus-Servo-Adapter (Treiberplatine)

| Stromeingang | 7~12 V |
|---|---|
| Stromanschluss | DC5521 |
| Servoschnittstelle | PH2.0-Busservo-Schnittstelle |
| Kommunikationsschnittstelle | USB Type-C |
| Bohrungsabstand | 37,00 x 28,00 mm |
| Bohrungsdurchmesser | 2,5 mm |
| Produktabmessungen | 42,00 x 33,00 mm |
| Produktgewicht | 15 g |

Die Platine hat ein kompaktes Plug-and-Play-Design mit einem TVS-Spannungsregelungs- und Schutzmodul zur Vermeidung von Hochspannungsdurchschlägen. Ein einziges Kabel verbindet sie mit Raspberry Pi, D-Robotics RDK oder NVIDIA Jetson Controllern für Echtzeit-Motorsteuerung und Encoder-Datenrückmeldung. Sie unterstützt den LeRobot SO-ARM101 Arm, die AmazingHand Geschicklichkeitshand und die meisten seriellen Busservos am Markt.

### Kameramodul (optional)

| Auflösung | 1080P, 2 MP |
|---|---|
| Verfügbare Optionen | 86°-Autofokuskamera mit 30 FPS / 100°-Weitwinkel-Festfokuskamera mit 60 FPS |
| Schnittstelle | USB, treiberfrei und Plug-and-Play |
| Montageoptionen | Kamerahalterungs-Kit für Seiten- oder Draufsicht |

### Anwendungen

- **Universitäre Forschung**— Lehrlabore und Forschungsprojekte in Robotik, künstlicher Intelligenz und Automatisierung, insbesondere geschicktes Greifen und Imitationslernen.
- **Entwickler und Maker**— Algorithmenentwicklung, Prototypenvalidierung, Sekundärentwicklung der Geschicklichkeitshand und Robotikwettbewerbe.
- **Bildungseinrichtungen**— ein ideales Lehrmittel für Fortgeschrittenenkurse in KI-Programmierung und Robotervision.
- **Enthusiasten**— bauen Sie einen Desktop-Roboter, der echte KI-Techniken einsetzt und mit einer menschenähnlichen Hand greift.

## Open Source & Ökosystem

Dieses Produkt basiert auf dem Open-Source-Projekt LeRobot SO-ARM101 und dem AmazingHand-Projekt. Die Plattform SO-ARM101 & AmazingHand verbindet sich nahtlos mit der Hugging-Face-Community: Die vortrainierten Modelle, Datensätze und Algorithmenbibliotheken von LeRobot können direkt wiederverwendet werden, und Code und Erfahrungen können mit Entwicklern weltweit geteilt werden – das senkt die technische Hürde für den Einstieg in die verkörperte KI.

- Der Quellcode wird unter der Apache License 2.0 veröffentlicht.
- Die Konstruktionsdateien werden unter der Lizenz CC BY 4.0 veröffentlicht.

## Paketoptionen

| Paket | AmazingHand (Fertig) | SO-ARM101 Pro-Version | SO-ARM101 Geschicklichkeitshand-Kit | Geschicklichkeitshand-Kit (zwei Kameras) |
|---|---|---|---|---|
| 3D-gedruckte Teile | ✓ | ✓ | ✓ | ✓ |
| AmazingHand Geschicklichkeitshand | ✓ | — | ✓ | ✓ |
| Szenenkamera | — | — | — | ✓ |
| Datenerfassung mit zwei Ansichten | — | — | — | ✓ |
| Leader-Follower-Teleoperation | — | ✓ | ✓ | ✓ |
| Ende-zu-Ende-Imitationslernen | ✓ | ✓ | ✓ | ✓ |

## Teileliste

### SO-ARM101 Geschicklichkeitshand-Kit:

- 1× Leader-Arm (montiert) — 1× STS3215-C001 (7,4 V, 1:345), 2× STS3215-C044 (7,4 V, 1:191), 3× STS3215-C046 (7,4 V, 1:147)
- 1× Follower-Arm (montiert) — 5× STS3215-C018 (12 V, 1:345)
- 1× AmazingHand Vierfinger-Geschicklichkeitshand (montiert) — 8× SCS0009-C001 (6 V) Busservos
- 2× JUXI Bus-Servo-Adapter (Servotreiberplatine)
- 1× DC5521 5V6A Stromkabel (Leader-Arm)
- 1× DC5521 12V5A Stromkabel (Follower-Arm)
- 2× USB-Type-C-Kabel
- 4× Fixierklammer
- 1× USB-Hub

### SO-ARM101 Geschicklichkeitshand-Kit (zwei Kameras):

Alles aus dem SO-ARM101 Geschicklichkeitshand-Kit, plus:

- 1× Kamerahalterungs-Kit für Draufsicht mit 2-MP-1080P-Kameramodul
- 1× Seitenkamera-Kit mit Tischständer und 2-MP-1080P-Kameramodul

### SO-ARM101 Pro (TPU-Greifer):

- 1× Leader-Arm (montiert) — 1× STS3215-C001 (7,4 V, 1:345), 2× STS3215-C044 (7,4 V, 1:191), 3× STS3215-C046 (7,4 V, 1:147)
- 1× Follower-Arm (montiert) mit flexiblem TPU-Greifer — 6× STS3215-C018 (12 V, 1:345)
- 2× JUXI Bus-Servo-Adapter (Servotreiberplatine)
- 1× DC5521 5V6A Stromkabel (Leader-Arm)
- 1× DC5521 12V5A Stromkabel (Follower-Arm)
- 2× USB-Type-C-Kabel
- 4× Fixierklammer
- 1× USB-Hub

### AmazingHand (rechte Hand):

- 1× AmazingHand Vierfinger-Geschicklichkeitshand, vollständig montiert, mit 8× SCS0009-C001 (6 V) Busservos
- 1× JUXI Bus-Servo-Adapter (Servotreiberplatine)
- 1× Verbindungskabel


## Verwandte Tutorials

- [SO-ARM101-Tutorial](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [SO-ARM101 Montage](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Roboterarm-Auswahlleitfaden](/de/tutorials/robot-arms/select-guide)
- [Einführung in verkörperte Intelligenz (LeRobot)](/de/topics/embodied-ai-intro)
- [AmazingHand Schnittstellensteuerung](/de/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [AmazingHand Offizielles Beispiel](/de/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
- [AmazingHand TTL-Debugging](/de/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)


## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
