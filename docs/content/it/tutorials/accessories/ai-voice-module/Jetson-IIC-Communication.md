---
title: "Jetson: Comunicazione IIC"
description: "La modifica ha effetto dopo la disconnessione e un nuovo accesso."
---

# Jetson: Comunicazione IIC

## Installazione delle dipendenze

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## Verifica dei gruppi utente

```Plain Text
sudo usermod -aG i2c $USER
```

```Plain Text
sudo usermod -aG dialout $USER
```

La modifica ha effetto dopo la disconnessione e un nuovo accesso.

## Posizione dei file

`IIC_Voice/iic_voice.py`

## Descrizione del cablaggio

![Immagine 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication/1.png)

## Verifica del dispositivo I2C

```Plain Text
sudo i2cdetect -y -r 1
```

Si dovrebbe vedere l'indirizzo `0x2A`

## Esecuzione

```Plain Text
cd IIC_Voice
```

```Plain Text
sudo python3 iic_voice.py
```

## Formato dell'output

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

## Risoluzione dei problemi

### Problema di autorizzazione I2C

```Plain Text
sudo chmod 666 /dev/i2c-1
```

<RelatedProducts slugs="ai-voice-module" />
