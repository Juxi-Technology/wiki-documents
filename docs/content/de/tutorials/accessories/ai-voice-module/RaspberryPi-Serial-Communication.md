---
title: "Serielle Kommunikation"
description: "Bearbeiten Sie /boot/firmware/config.txt oder /boot/config.txt und stellen Sie die folgende Konfiguration sic…"
---

# Serielle Kommunikation

## Abhängigkeiten installieren

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## Dateispeicherort

`~/UART_Voice/uart_voice.py`

## Serielle Schnittstelle aktivieren

Bearbeiten Sie `/boot/firmware/config.txt` oder `/boot/config.txt` und stellen Sie die folgende Konfiguration sicher:

```Plain Text
enable_uart=1
dtoverlay=disable-bt
```

Starten Sie dann den Raspberry Pi neu.

```Plain Text
sudo reboot
```

## Verkabelungsbeschreibung

Bei direkter Type-Verbindung zum Raspberry Pi heben Sie die Auskommentierung von `SERIAL_PORT = '/dev/ttyUSB0'` auf und kommentieren `SERIAL_PORT = '/dev/ttyAMA0'` aus

![Abb. 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/1.png)

Verbindung zum Raspberry Pi über die UART-Pins

![Abb. 2](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/2.png)

Kommentieren Sie `SERIAL_PORT = '/dev/ttyUSB0'` aus und heben Sie die Auskommentierung von `SERIAL_PORT = '/dev/ttyAMA0'` auf

![Abb. 3](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/3.png)

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



