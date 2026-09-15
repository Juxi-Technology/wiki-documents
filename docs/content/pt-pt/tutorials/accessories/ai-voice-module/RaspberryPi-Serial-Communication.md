---
title: "Comunicação de porta série"
description: "Edite /boot/firmware/config.txt ou /boot/config.txt e garanta a seguinte configuração:"
---

# Comunicação de porta série

## Instalar as dependências

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## Localização dos ficheiros

`~/UART_Voice/uart_voice.py`

## Ativar a porta série

Edite `/boot/firmware/config.txt` ou `/boot/config.txt` e garanta a seguinte configuração:

```Plain Text
enable_uart=1
dtoverlay=disable-bt
```

Reinicie depois a Raspberry Pi.

```Plain Text
sudo reboot
```

## Descrição da cablagem

Quando o cabo Type é ligado diretamente à Raspberry Pi, descomente `SERIAL_PORT = '/dev/ttyUSB0'` e comente `SERIAL_PORT = '/dev/ttyAMA0'`

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/1.png)

Ligar à Raspberry Pi através dos pinos UART

![Imagem 2](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/2.png)

Comente `SERIAL_PORT = '/dev/ttyUSB0'` e descomente `SERIAL_PORT = '/dev/ttyAMA0'`

![Imagem 3](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/3.png)

## Executar

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



