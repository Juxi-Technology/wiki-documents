---
title: "Jetson: Comunicación IIC"
description: "Módulo de voz IA con Jetson por IIC: instalación de dependencias, configuración de permisos, cableado y detección del dispositivo I2C."
---

# Jetson: Comunicación IIC

## Instalar dependencias

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## Comprobar los grupos de usuarios

```Plain Text
sudo usermod -aG i2c $USER
```

```Plain Text
sudo usermod -aG dialout $USER
```

Cierre la sesión y vuelva a iniciarla para que surta efecto.

## Ubicación de los archivos

`IIC_Voice/iic_voice.py`

## Instrucciones de cableado

![Imagen 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication/1.png)

## Comprobar el dispositivo I2C

```Plain Text
sudo i2cdetect -y -r 1
```

Debería poder ver la dirección `0x2A`

## Ejecución

```Plain Text
cd IIC_Voice
```

```Plain Text
sudo python3 iic_voice.py
```

## Formato de salida

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

## Solución de problemas

### Problema de permisos de I2C

```Plain Text
sudo chmod 666 /dev/i2c-1
```

<RelatedProducts slugs="ai-voice-module" />
