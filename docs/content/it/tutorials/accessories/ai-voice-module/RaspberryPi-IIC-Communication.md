---
title: "Raspberry Pi: Comunicazione IIC"
description: "Collegare il modulo vocale IA a un Raspberry Pi tramite IIC: dipendenze, abilitazione del bus, cablaggio ed esecuzione dello script di comunicazione."
---

# Raspberry Pi: Comunicazione IIC

## Installazione delle dipendenze

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## Abilitazione di I2C

```Plain Text
sudo raspi-config
```

Selezionare `Interface Options` -> `I2C` -> `Yes`

Riavviare il Raspberry Pi

## Posizione dei file

`~/IIC_Voice/iic_voice.py`

## Descrizione del cablaggio

![Immagine 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication/1.png)

## Esecuzione

```Plain Text
cd IIC_Voice
```

```Plain Text
python3 iic_voice.py
```

## Formato dell'output

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

<RelatedProducts slugs="ai-voice-module" />
