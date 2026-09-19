---
title: "RDK: Serielle Kommunikation"
description: "AI-Sprachinteraktionsmodul an der RDK X5 über die serielle Schnittstelle nutzen: Python-Beispielcode, Verkabelung und Umgebung einrichten."
---

# RDK: Serielle Kommunikation

## Einführung

Dieses Repository stellt Python-Beispielcode für die Kommunikation zwischen der Plattform RDK X5 (Raspberry Pi) und dem AI-Sprachinteraktionsmodul bereit und unterstützt zwei Kommunikationsmethoden: I2C und UART.

- **Spracherkennungsmodul**: Unterstützt Offline-Spracherkennung und gibt nach der Erkennung die Befehls-ID aus

- **Ansagefunktion**: Unterstützt passive Ansage, Funktionswort-Ansage und Befehlswort-Ansage

- **Kommunikationsprotokoll**: I2C-Adresse 0x2A, UART-Baudrate 115200

- **Programmiersprache**: Python 3

---

## Hardwareanschluss

### Allgemeine Verbindung

> **Wichtiger Hinweis**: Vergewissern Sie sich, dass alle Geräte eine gemeinsame Masse haben (GND)!
> 
> 

---

### Verbindung der UART-Version

**Hinweis**: Standardmäßig wird das serielle Gerät `/dev/ttyAMA0` verwendet

---

### Type-C-Datenkabelverbindung (UART-Alternative)

Bei Verwendung eines USB-TTL-Adaptermoduls:

**Hinweis**: In diesem Fall ist das serielle Gerät normalerweise `/dev/ttyUSB0`

![Abb. 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-Serial-Communication/1.jpg)

---

## Umgebungskonfiguration

### Systemanforderungen

- RDK X5

- Ubuntu-/Debian-System

- Python 3.7+

### Abhängigkeitspakete installieren

```Bash
# Softwarepakete aktualisieren
sudo apt update
sudo apt upgrade -y

# Python-Bibliothek installieren
sudo apt install -y python3-pip

# pyserial installieren
pip3 install pyserial
```

### Serielle Schnittstelle aktivieren

```Bash
# Konfigurationstool öffnen
sudo raspi-config

# Interface Options → Serial auswählen
Select: No (shell) → Yes (hardware serial port)
# Nach Neustart wirksam
sudo reboot
```

---

## Verwendung der UART-Version

### Codedateien prüfen

```Bash
cd UART_Voice
ls -la
# uart_voice.py sollte angezeigt werden
```

### Serielles Gerät konfigurieren

Bearbeiten Sie die Datei `uart_voice.py` und ändern Sie das serielle Gerät:

```Bash
# UART-Direktverbindung (Standard)
SERIAL_PORT = '/dev/ttyAMA0'

# Oder USB-TTL verwenden
SERIAL_PORT = '/dev/ttyUSB0'

# Baudrate
BAUD_RATE = 115200
```

### Programm ausführen

## Ausführungsberechtigung erteilen

```Bash
chmod +x uart_voice.py
# Ausführen (sudo-Rechte für den Zugriff auf die serielle Schnittstelle erforderlich)
sudo python3 uart_voice.py
```

### Test ausführen

Nach einem normalen Start wird Folgendes angezeigt:

```Bash
Speech Serial Opened! Baudrate=115200
```

Sprechen Sie das Befehlswort zum Sprachmodul, und die entsprechende ID wird angezeigt:

```Bash
Speech Serial Opened! Baudrate=115200
ID:1
ID:4
ID:10
```

### Programm beenden

Drücken Sie `Ctrl + C`, um das Programm zu beenden

---

## Häufig gestellte Fragen

### Q1: Serielles Gerät nicht gefunden

**A: Prüfen Sie:**

1. Prüfen Sie, ob die serielle Schnittstelle aktiviert ist (raspi-config)

2. Prüfen Sie, ob der Gerätename korrekt ist

    - UART-Direktverbindung: `/dev/ttyAMA0`

    - USB-TTL: `/dev/ttyUSB0` oder `/dev/ttyUSB1`

3. Prüfen Sie, ob die Hardwareverbindung korrekt ist

4. Prüfen Sie, ob die serielle Schnittstelle von einem anderen Programm belegt ist

```Bash
# Verfügbare serielle Ports anzeigen
ls /dev/tty* | grep tty
```

---

### Q2: Befehls-ID zeigt nur 0 an oder wird nicht angezeigt

**A: Normales Phänomen:**

- 0 = kein gültiger Befehl erkannt

- Eine ID wird erst ausgegeben, wenn ein gültiges Befehlswort gesprochen wird

- Wecken Sie zuerst das Modul und sprechen Sie dann den Befehl

---

### Q3: Geringe Erkennungsgenauigkeit

**A: Optimierungsvorschläge:**

- Sorgen Sie für eine ruhige Umgebung; der Hintergrundlärm sollte nicht zu laut sein

- Halten Sie einen angemessenen Abstand zum Mikrofon ein (10-50cm)

- Sprechen Sie in angemessenem Tempo und deutlich

---

### Q4: Anomalie bei der seriellen Kommunikation

**A: Prüfen Sie:**

1. Ob TX/RX überkreuz verbunden sind (Modul TX → RPi RX)

2. Ob die Baudrate 115200 beträgt

3. Ob eine gemeinsame Masse vorhanden ist

4. Ob die serielle Schnittstelle von einem anderen Prozess belegt ist

```Bash
# Prüfen, ob die serielle Schnittstelle belegt ist
sudo lsof /dev/ttyAMA0
```

---

## Technischer Support

Bei Problemen prüfen Sie bitte:

1. Ob die Hardwareverkabelung korrekt ist (eine gemeinsame Masse ist sehr wichtig!)

2. Ob die Baudrate der seriellen Schnittstelle 115200 beträgt

3. Ob ausreichende Berechtigungen für den Zugriff auf die Hardwareschnittstelle vorhanden sind

## Häufig verwendete Debug-Befehle

```Bash
ls -l /dev/ttyAMA0   # Serielle Geräte anzeigen
groups                # Benutzergruppen-Berechtigungen anzeigen
```

<RelatedProducts slugs="ai-voice-module" />
