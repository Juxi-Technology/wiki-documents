---
title: "Raspberry Pi: Communication par port série"
description: "Modifiez /boot/firmware/config.txt ou /boot/config.txt et assurez-vous de la configuration suivante :"
---

# Raspberry Pi: Communication par port série

## Installer les dépendances

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## Emplacement du fichier

`~/UART_Voice/uart_voice.py`

## Activer le port série

Modifiez `/boot/firmware/config.txt` ou `/boot/config.txt` et assurez-vous de la configuration suivante :

```Plain Text
enable_uart=1
dtoverlay=disable-bt
```

Redémarrez ensuite le Raspberry Pi.

```Plain Text
sudo reboot
```

## Instructions de câblage

Lorsque le câble Type est connecté directement au Raspberry Pi, décommentez `SERIAL_PORT = '/dev/ttyUSB0'` et commentez `SERIAL_PORT = '/dev/ttyAMA0'`

![Image 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/1.png)

Connexion au Raspberry Pi via les broches UART

![Image 2](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/2.png)

Commentez `SERIAL_PORT = '/dev/ttyUSB0'` et décommentez `SERIAL_PORT = '/dev/ttyAMA0'`

![Image 3](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/3.png)

## Exécution

```Plain Text
cd UART_Voice
```

```Plain Text
python3 uart_voice.py
```

## Format de sortie

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

<RelatedProducts slugs="ai-voice-module" />
