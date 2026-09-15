---
title: "Comunicação de porta série"
description: "Termine sessão e volte a iniciá-la para que tenha efeito."
---

# Comunicação de porta série

## Instalar as dependências

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
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

`UART_Voice/uart_voice.py`

Quando o módulo é ligado ao Jetson através dos pinos UART, comente `SERIAL_PORT = '/dev/ttyUSB0'` e descomente `SERIAL_PORT = '/dev/ttyTHS1'`

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/1.png)

## Descrição da cablagem

![Imagem 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/2.png)

## Verificar a porta série

```Plain Text
ls /dev/ttyTHS*
```

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

Quando o módulo é ligado ao Jetson através de um cabo de dados Type, descomente `SERIAL_PORT = '/dev/ttyUSB0'` e comente `SERIAL_PORT = '/dev/ttyTHS1'`

![Imagem 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/3.png)

## Verificar a porta série

```Plain Text
ls /dev/ttyUSB*
```

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

## Resolução de problemas

### Porta série ocupada

Se a porta série não abrir, verifique se está a ser utilizada por outro serviço:

```Plain Text
sudo systemctl stop nvgetty
```

```Plain Text
sudo systemctl disable nvgetty
```



