---
title: "AmazingHand Fingerhand Produktinformationen"
description: "AmazingHand ist eine hochpräzise, leichte Fingerhand mit Gesten-Tracking, die für Forschung an verkörperter Intelligenz."
---

# AmazingHand Fingerhand Produktinformationen

## Produktübersicht

AmazingHand ist eine **hochpräzise, leichte Fingerhand mit Gesten-Tracking**, die für Forschung an verkörperter Intelligenz, Robotik-Bildung und Mensch-Maschine-Interaktionsanwendungen entwickelt wurde. Das Produkt wird von 8 hochpräzisen SCS0009 TTL-Serienservos gesteuert und unterstützt den Betrieb von rechter Hand, linker Hand sowie beidhändigen Robotern; komplexe Handbewegungen und Echtzeit-Tracking sind realisierbar.

### I. Hardware-Design: hohe Präzision, geringes Gewicht, einfach zu kalibrieren und erweiterbar

- **Servo-Konfiguration**: Eine einzelne Fingerhand verwendet **8 SCS0009 TTL-Serienservos**; 2 Servos steuern gemeinsam denselben Finger und bieten präzise Bewegungssteuerung und stabile Greiffähigkeit.

- **Leichtbauweise**: Die Fingerhand wiegt insgesamt nur 0.416kg, hat einen kompakten Aufbau und lässt sich leicht auf verschiedenen Roboterplattformen montieren.

- **Einfache Anbindung**: Kommunikation über Type-C-Schnittstelle, in Kombination mit Servo-Treiberplatine und MEGA328P-Entwicklungsboard Plug-and-Play, vereinfacht den Hardware-Anschlussprozess.

- **Modulares Design**: Unterstützt die separate Konfiguration von rechter und linker Hand, auch beidhändige Roboter können zusammenarbeiten, flexibel für verschiedene Anwendungsszenarien.

### II. Software-Ökosystem: integriertes Gesten-Tracking, KI-Entwicklung leicht gemacht

- **Echtzeit-Gesten-Tracking**: Auf MediaPipe basierende Echtzeit-Handtracking-Technologie; Gesten werden über eine Webcam erfasst, um Imitationslernen und Folgekontrolle der Fingerhand zu realisieren.

- **Verteilter Datenfluss**: Verwendet die **verteilte DORA-Datenfluss-Engine**, realisiert eine Interaktion mit geringer Latenz zwischen Hardware und Algorithmen und unterstützt die durchgängige Anbindung der gesamten Kette von Gestendaten bis zur Servo-Steuerung.

- **Einheit von Simulation und Hardware**: Bietet eine virtuelle Simulationsumgebung; Steueralgorithmen können in der Simulation verifiziert und dann nahtlos auf reale Hardware übertragen werden.

- **Open-Source-Ökosystem**: Steuercode, Trainingsskripte und Tutorials sind Open Source und unterstützen Sekundärentwicklung und Funktionserweiterung.

### III. Kernanwendungsszenarien: von der Lehre bis zur Forschung, alle Szenarien abgedeckt

1. **Einstieg in die Robotik-Bildung**: Bietet einen vollständigen Ablauf von der Montage der Fingerhand über die Servo-Kalibrierung und Grundsteuerung bis zum Gesten-Tracking, mit begleitenden Demoprogrammen und Beispielcode; Anwender ohne Grundkenntnisse können schnell einsteigen.

2. **Forschung an verkörperter Intelligenz**: Fokussiert auf Forschung zu **Gesten-Imitationslernen und Mensch-Maschine-Interaktion**, unterstützt das Training der Fingerhand durch Erfassung menschlicher Handbewegungen via Kamera; typische Anwendungen: Gestensteuerung, Objektgreifen, Mensch-Roboter-Zusammenarbeit und weitere Aufgaben.

3. **Mensch-Maschine-Interaktionsprototyp**: Kostengünstige Verifizierung von Mensch-Maschine-Interaktionslösungen, geeignet für Szenarien wie **Gestensteuerung, Teleoperation, VR/AR-Interaktion**, schnelle Umsetzung der Prototypenverifizierung.

### IV. Produktvorteile

- **Hohes Preis-Leistungs-Verhältnis**: Verwendet eine ausgereifte Serienservo-Lösung, Kosten kontrollierbar, geeignet für die Massenbereitstellung bei Einzelpersonen, Laboren und Bildungseinrichtungen.

- **Gesten-Tracking**: Integrierte Gesten-Tracking-Funktion, keine zusätzliche komplexe Ausrüstung erforderlich, eine gewöhnliche Kamera genügt für die Echtzeit-Folgekontrolle der Fingerhand.

- **Entwicklerfreundlich**: Bietet vollständige Kalibrierungs-Tutorials, Demoprogramme und Entwicklungsschnittstellen; von der Hardware-Kalibrierung bis zur Software-Steuerung ein schneller Einstieg.

- **Beidhändige Zusammenarbeit**: Unterstützt den unabhängigen Betrieb eines einhändigen Roboters sowie die Zusammenarbeit beidhändiger Roboter, flexibel für verschiedene Versuchs- und Anwendungsanforderungen.

### V. Produktparameter

#### Grundparameter

|Parameter|Spezifikation|
|---|---|
|**Gewicht**|0.416kg|
|**Anzahl der Finger**|4|
|**Freiheitsgrad pro Finger**|2DoF|
|**Servo-Konfiguration**|8 SCS0009-Servos (2 Servos steuern 1 Finger)|

#### Abmessungen

|Parameter|Spezifikation|
|---|---|
|**Höhe (ausgestreckt, ohne Sockel)**|195mm|
|**Handflächenbreite**|105mm|
|**Handflächendicke**|ca. 90mm|
|**Maximaler Abstand zwischen gespreiztem Zeigefinger und Daumen**|180mm|

#### Elektrische Parameter

|Parameter|Spezifikation|
|---|---|
|**Betriebsspannung**|5-6V|
|**Stromversorgung**|Betrieb über 5V 5A-Netzteil|
|**Kommunikationsschnittstelle**|Type-C|

#### Leistungsparameter

|Parameter|Spezifikation|
|---|---|
|**Tragfähigkeit eines einzelnen Fingers**|0.2kg|
|**Maximale Tragfähigkeit bei festem Griff mit 4 Fingern**|0.5kg|

