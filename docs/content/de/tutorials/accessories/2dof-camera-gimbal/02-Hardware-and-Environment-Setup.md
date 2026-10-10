---
title: Hardware und Umgebung
---

# Hardware und Umgebung

> **[Im Shop kaufen](https://www.juxitech.com/de/products/2-dof-servo-pan-tilt-unit)**

Dieses Kapitel beschreibt ausführlich den gesamten Prozess von Hardware-Montage, Verkabelung und Umgebungskonfiguration.

---

## Hardware-Liste

Bevor Sie das Produkt verwenden, vergewissern Sie sich, dass Sie die folgenden Komponenten bereitliegen haben:

|Komponente|Modell/Spezifikation|Menge|
|---|---|---|
|Servo|SCS009|2|
|Gimbal-Halterung|2-DOF-Gimbal-Rahmen|1|
|Servo-Treiberplatine|Treiberplatine mit CH343-Chip|1|
|USB-Kamera|Auflösung mindestens 640x480|1|
|Servo-Stromversorgung|Spannungsbereich 4V-7.4V, empfohlen 6V|1|
|Serielles Datenkabel|Verbindung zwischen Treiberplatine und Computer|1|


---

## Servo-Parameter


|Parameter|Servo Nr. 1 (Links-/Rechts-Drehung)|Servo Nr. 2 (Auf-/Ab-Neigung)|
|---|---|---|
|Positionsbereich|220-802|220-511|
|Mittelstellung|511|511|
|Minimum|220 entspricht der Position ganz links|220 entspricht der Position ganz oben|
|Maximum|802 entspricht der Position ganz rechts|511 entspricht der Mittelstellung|


---

## Hardware-Anschluss

### Schritt 1: Servos und Gimbal-Halterung montieren

1. Befestigen Sie Servo Nr. 1 (für die Links-/Rechts-Drehung) an der vorgesehenen Position der unteren Gimbal-Halterung und ziehen Sie die Schrauben für einen sicheren Halt fest.
2. Montieren Sie Servo Nr. 2 (für die Auf-/Ab-Neigung) an der oberen Halterung des Gimbals und befestigen Sie ihn ebenfalls.
3. Befestigen Sie die Kamerahalterung gemäß der Anleitung.

### Schritt 2: Servos mit der Treiberplatine verbinden

1. Verbinden Sie die Datenkabel der beiden Servos mit den Servo-Anschlüssen der Treiberplatine.
2. Beachten Sie die Anschlussreihenfolge der Servokabel; die Farben sind in der Regel Rot (Stromversorgung), Schwarz (Masse) und Weiß/Gelb (Signal).
3. Stellen Sie sicher, dass die Servos den richtigen IDs zugeordnet sind: Servo-ID 1 für Links/Rechts, Servo-ID 2 für Auf/Ab.

### Schritt 3: Stromversorgung und serielle Verbindung

1. Verbinden Sie die Servo-Stromversorgung mit dem Stromanschluss der Treiberplatine.
2. Verbinden Sie die Treiberplatine mit dem seriellen Datenkabel und einem USB-Anschluss des Computers.
3. Schließen Sie die Kamera an den Computer an.

---

## System- und Umgebungsanforderungen

### Unterstützte Betriebssysteme

- Windows 10/11
- Linux-Distributionen (z. B. Ubuntu 20.04 oder höher)

### Python-Version

Python 3.8 oder höher

---

## Installation von Treibern und Abhängigkeiten

### Seriellen Treiber installieren

#### Windows

1. Rufen Sie die offizielle Website des CH343-Chipherstellers auf und laden Sie das Treiberinstallationsprogramm für die entsprechende Windows-Version herunter.
CH343-Treiberinstallation (als Administrator installieren)
https://www.wch.cn/downloads/CH343SER_EXE.html

>
> Wird das Gerät im Geräte-Manager als unbekanntes Gerät „usb single serial“ oder „usb serial“ erkannt, deinstallieren Sie es zuerst per Rechtsklick und installieren Sie dann den Treiber!

1. Führen Sie das Installationsprogramm aus und folgen Sie den Anweisungen, um die Treiberinstallation abzuschließen.
2. Verbinden Sie die Servo-Treiberplatine mit dem Computer; im Geräte-Manager sollte daraufhin ein serielles Gerät sichtbar sein.

#### Linux

Die meisten Linux-Distributionen enthalten den CH343-Serientreiber bereits; eine zusätzliche Installation ist nicht erforderlich. Bei Problemen können Sie Folgendes versuchen:
1. Prüfen, ob der Treiber im Kernel geladen ist: `lsmod | grep ch343`
2. Falls er nicht geladen ist, stecken Sie das Gerät erneut ein und aus oder starten Sie das System neu.

### Python-Abhängigkeiten installieren

Im Projektstammverzeichnis ausführen:

```python
pip install -r requirements.txt
```

Die wichtigsten Abhängigkeiten des Projekts sind:
- opencv-python: Bilderfassung und -verarbeitung
- numpy: Bibliothek für numerische Berechnungen
- pyserial: Bibliothek für serielle Kommunikation

---

## Hardware-Verbindung überprüfen

Bevor Sie das eigentliche Programm starten, können Sie die Hardware-Verbindung mit den mitgelieferten Werkzeugen überprüfen.

### Verfügbare Kameras finden

Führen Sie folgenden Befehl aus, um die verfügbaren Kameras aufzulisten:

```python
python examples/list_cameras.py
```

Das Programm erkennt und listet alle verfügbaren Kameras auf. Notieren Sie den Index der Kamera, die Sie verwenden möchten.

### Verfügbare serielle Schnittstellen finden

Führen Sie folgenden Befehl aus, um die verfügbaren seriellen Schnittstellen aufzulisten:

```python
python examples/list_ports.py
```

Notieren Sie den Namen des seriellen Geräts, das Sie verwenden.

### Hardware-Diagnose

Für eine umfassende Prüfung der gesamten Hardware können Sie das Diagnosewerkzeug ausführen:

```python
python examples/diagnostic.py --camera 0 --port COM3
```

Das Diagnoseprogramm testet nacheinander Kamera, serielle Schnittstelle und Gimbal.

---

## Sicherheitshinweise

Beachten Sie während der Nutzung die folgenden Sicherheitshinweise:
1. Die Servo-Stromversorgung muss im angegebenen Bereich liegen (4V-7.4V), um Schäden an den Servos zu vermeiden.
2. Betreiben Sie die Servos nicht über längere Zeit in den Endpositionen, um die Lebensdauer zu verlängern.
3. Bringen Sie das Gimbal vor dem Trennen der Stromversorgung in die Mittelstellung, um die Last beim nächsten Start zu verringern.
