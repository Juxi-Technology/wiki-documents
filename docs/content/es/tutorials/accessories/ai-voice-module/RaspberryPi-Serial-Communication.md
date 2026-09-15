---
title: "Comunicación por puerto serie"
description: "Edite /boot/firmware/config.txt o /boot/config.txt y asegúrese de que la siguiente configuración esté present…"
---

# Comunicación por puerto serie

## Instalar dependencias

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## Ubicación de los archivos

`~/UART_Voice/uart_voice.py`

## Habilitar el puerto serie

Edite `/boot/firmware/config.txt` o `/boot/config.txt` y asegúrese de que la siguiente configuración esté presente:

```Plain Text
enable_uart=1
dtoverlay=disable-bt
```

A continuación, reinicie la Raspberry Pi.

```Plain Text
sudo reboot
```

## Instrucciones de cableado

Cuando el Type se conecta directamente a la Raspberry Pi, descomente `SERIAL_PORT = '/dev/ttyUSB0'` y comente `SERIAL_PORT = '/dev/ttyAMA0'`

![Imagen 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/1.png)

Conexión a la Raspberry Pi mediante los pines UART

![Imagen 2](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/2.png)

Comente `SERIAL_PORT = '/dev/ttyUSB0'` y descomente `SERIAL_PORT = '/dev/ttyAMA0'`

![Imagen 3](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/3.png)

## Ejecución

```Plain Text
cd UART_Voice
```

```Plain Text
python3 uart_voice.py
```

## Formato de salida

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

<RelatedProducts slugs="ai-voice-module" />
