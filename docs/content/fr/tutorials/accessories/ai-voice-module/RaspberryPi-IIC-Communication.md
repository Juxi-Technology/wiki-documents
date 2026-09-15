---
title: "Communication IIC"
description: "Sélectionnez Interface Options -> I2C -> Yes"
---

# Communication IIC

## Installer les dépendances

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## Activer l'I2C

```Plain Text
sudo raspi-config
```

Sélectionnez `Interface Options` -> `I2C` -> `Yes`

Redémarrez le Raspberry Pi

## Emplacement du fichier

`~/IIC_Voice/iic_voice.py`

## Instructions de câblage

![Image 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication/1.png)

## Exécution

```Plain Text
cd IIC_Voice
```

```Plain Text
python3 iic_voice.py
```

## Format de sortie

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

