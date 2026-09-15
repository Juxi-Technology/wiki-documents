---
title: "Jetson: Serielle Kommunikation"
description: "Abmelden und erneut anmelden, damit die Änderung wirksam wird."
---

# Jetson: Serielle Kommunikation

## Abhängigkeiten installieren

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## Benutzergruppe prüfen

```Plain Text
sudo usermod -aG i2c $USER
```

```Plain Text
sudo usermod -aG dialout $USER
```

Abmelden und erneut anmelden, damit die Änderung wirksam wird.

## Dateispeicherort

`UART_Voice/uart_voice.py`

Das Modul wird über die UART-Pins an den Jetson angeschlossen; kommentieren Sie `SERIAL_PORT = '/dev/ttyUSB0'` aus und heben Sie die Auskommentierung von `SERIAL_PORT = '/dev/ttyTHS1'` auf

![Abb. 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/1.png)

## Verkabelungsbeschreibung

![Abb. 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/2.png)

## Serielle Schnittstelle prüfen

```Plain Text
ls /dev/ttyTHS*
```

## Ausführen

```Plain Text
cd UART_Voice
```

```Plain Text
python3 uart_voice.py
```

## Ausgabeformat

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

Das Modul wird über ein Type-C-Datenkabel an den Jetson angeschlossen; heben Sie die Auskommentierung von `SERIAL_PORT = '/dev/ttyUSB0'` auf und kommentieren Sie `SERIAL_PORT = '/dev/ttyTHS1'` aus

![Abb. 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/3.png)

## Serielle Schnittstelle prüfen

```Plain Text
ls /dev/ttyUSB*
```

## Ausführen

```Plain Text
cd UART_Voice
```

```Plain Text
python3 uart_voice.py
```

## Ausgabeformat

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

## Häufig gestellte Fragen

### Serielle Schnittstelle belegt

Wenn sich die serielle Schnittstelle nicht öffnen lässt, prüfen Sie, ob sie von einem anderen Dienst belegt ist:

```Plain Text
sudo systemctl stop nvgetty
```

```Plain Text
sudo systemctl disable nvgetty
```

<RelatedProducts slugs="ai-voice-module" />
