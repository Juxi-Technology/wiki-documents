---
title: "Jetson: Comunicação IIC"
description: "Termine sessão e volte a iniciá-la para que tenha efeito."
---

# Jetson: Comunicação IIC

## Instalar as dependências

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## Verificar os grupos de utilizadores

```Plain Text
sudo usermod -aG i2c $USER
```

```Plain Text
sudo usermod -aG dialout $USER
```

Termine sessão e volte a iniciá-la para que tenha efeito.

## Localização dos ficheiros

`IIC_Voice/iic_voice.py`

## Descrição da cablagem

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication/1.png)

## Verificar o dispositivo I2C

```Plain Text
sudo i2cdetect -y -r 1
```

Deve ser possível ver o endereço `0x2A`

## Executar

```Plain Text
cd IIC_Voice
```

```Plain Text
sudo python3 iic_voice.py
```

## Formato de saída

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

## Resolução de problemas

### Problema de permissões do I2C

```Plain Text
sudo chmod 666 /dev/i2c-1
```

<RelatedProducts slugs="ai-voice-module" />
