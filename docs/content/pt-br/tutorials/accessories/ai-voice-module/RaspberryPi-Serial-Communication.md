---
title: "Comunicação por porta serial"
description: "Edite /boot/firmware/config.txt ou /boot/config.txt e garanta a seguinte configuração:"
---

# Comunicação por porta serial

## Instalar as dependências

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## Local dos arquivos

`~/UART_Voice/uart_voice.py`

## Habilitar a porta serial

Edite `/boot/firmware/config.txt` ou `/boot/config.txt` e garanta a seguinte configuração:

```Plain Text
enable_uart=1
dtoverlay=disable-bt
```

Em seguida, reinicie o Raspberry Pi.

```Plain Text
sudo reboot
```

## Instruções de cabeamento

Ao conectar diretamente ao Raspberry Pi por cabo Type, descomente `SERIAL_PORT = '/dev/ttyUSB0'` e comente `SERIAL_PORT = '/dev/ttyAMA0'`

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/1.png)

Conexão ao Raspberry Pi pelos pinos UART

![Imagem 2](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/2.png)

Comente `SERIAL_PORT = '/dev/ttyUSB0'` e descomente `SERIAL_PORT = '/dev/ttyAMA0'`

![Imagem 3](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/3.png)

## Execução

```Plain Text
cd UART_Voice
```

```Plain Text
python3 uart_voice.py
```

## Formato de saída

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

<RelatedProducts slugs="ai-voice-module" />
