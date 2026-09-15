---
title: "Comunicação IIC"
description: "Faça logout e login novamente para que tenha efeito."
---

# Comunicação IIC

## Instalar as dependências

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## Verificar os grupos de usuários

```Plain Text
sudo usermod -aG i2c $USER
```

```Plain Text
sudo usermod -aG dialout $USER
```

Faça logout e login novamente para que tenha efeito.

## Local dos arquivos

`IIC_Voice/iic_voice.py`

## Instruções de cabeamento

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication/1.png)

## Verificar os dispositivos I2C

```Plain Text
sudo i2cdetect -y -r 1
```

Você deve conseguir ver o endereço `0x2A`

## Execução

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

## Solução de problemas

### Problema de permissão do I2C

```Plain Text
sudo chmod 666 /dev/i2c-1
```

<RelatedProducts slugs="ai-voice-module" />
