---
title: "IIC-Kommunikation"
description: "Wählen Sie Interface Options -> I2C -> Yes"
---

# IIC-Kommunikation

## Abhängigkeiten installieren

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## I2C aktivieren

```Plain Text
sudo raspi-config
```

Wählen Sie `Interface Options` -> `I2C` -> `Yes`

Starten Sie den Raspberry Pi neu

## Dateispeicherort

`~/IIC_Voice/iic_voice.py`

## Verkabelungsbeschreibung

![Abb. 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication/1.png)

## Ausführen

```Plain Text
cd IIC_Voice
```

```Plain Text
python3 iic_voice.py
```

## Ausgabeformat

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

<RelatedProducts slugs="ai-voice-module" />
