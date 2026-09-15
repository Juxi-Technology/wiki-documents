---
title: "Comunicación IIC"
description: "Seleccione Interface Options -> I2C -> Yes"
---

# Comunicación IIC

## Instalar dependencias

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## Habilitar I2C

```Plain Text
sudo raspi-config
```

Seleccione `Interface Options` -> `I2C` -> `Yes`

Reinicie la Raspberry Pi

## Ubicación de los archivos

`~/IIC_Voice/iic_voice.py`

## Instrucciones de cableado

![Imagen 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication/1.png)

## Ejecución

```Plain Text
cd IIC_Voice
```

```Plain Text
python3 iic_voice.py
```

## Formato de salida

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

<RelatedProducts slugs="ai-voice-module" />
