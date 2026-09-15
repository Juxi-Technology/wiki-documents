---
title: "Jetson: Communication IIC"
description: "Déconnectez-vous puis reconnectez-vous pour que cela prenne effet."
---

# Jetson: Communication IIC

## Installer les dépendances

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
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

`IIC_Voice/iic_voice.py`

## Instructions de câblage

![Image 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication/1.png)

## Vérifier le périphérique I2C

```Plain Text
sudo i2cdetect -y -r 1
```

L'adresse `0x2A` doit être visible

## Exécution

```Plain Text
cd IIC_Voice
```

```Plain Text
sudo python3 iic_voice.py
```

## Format de sortie

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

## Dépannage

### Problème d'autorisation I2C

```Plain Text
sudo chmod 666 /dev/i2c-1
```

<RelatedProducts slugs="ai-voice-module" />
