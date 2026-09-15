---
title: "Communication par port série"
description: "Déconnectez-vous puis reconnectez-vous pour que cela prenne effet."
---

# Communication par port série

## Installer les dépendances

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## Vérifier les groupes d'utilisateurs

```Plain Text
sudo usermod -aG i2c $USER
```

```Plain Text
sudo usermod -aG dialout $USER
```

Déconnectez-vous puis reconnectez-vous pour que cela prenne effet.

## Emplacement du fichier

`UART_Voice/uart_voice.py`

Lorsque le module est connecté au Jetson via les broches UART, commentez `SERIAL_PORT = '/dev/ttyUSB0'` et décommentez `SERIAL_PORT = '/dev/ttyTHS1'`

![Image 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/1.png)

## Instructions de câblage

![Image 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/2.png)

## Vérifier le port série

```Plain Text
ls /dev/ttyTHS*
```

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

Lorsque le module est connecté au Jetson via un câble de données Type, décommentez `SERIAL_PORT = '/dev/ttyUSB0'` et commentez `SERIAL_PORT = '/dev/ttyTHS1'`

![Image 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/3.png)

## Vérifier le port série

```Plain Text
ls /dev/ttyUSB*
```

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

## Dépannage

### Le port série est occupé

Si le port série ne peut pas être ouvert, vérifiez s'il est occupé par un autre service :

```Plain Text
sudo systemctl stop nvgetty
```

```Plain Text
sudo systemctl disable nvgetty
```



