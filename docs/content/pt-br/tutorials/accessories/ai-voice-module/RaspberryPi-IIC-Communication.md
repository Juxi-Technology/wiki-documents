---
title: "Raspberry Pi: Comunicação IIC"
description: "Selecione Interface Options -> I2C -> Yes"
---

# Raspberry Pi: Comunicação IIC

## Instalar as dependências

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## Habilitar o I2C

```Plain Text
sudo raspi-config
```

Selecione `Interface Options` -> `I2C` -> `Yes`

Reinicie o Raspberry Pi

## Local dos arquivos

`~/IIC_Voice/iic_voice.py`

## Instruções de cabeamento

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication/1.png)

## Execução

```Plain Text
cd IIC_Voice
```

```Plain Text
python3 iic_voice.py
```

## Formato de saída

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

<RelatedProducts slugs="ai-voice-module" />
