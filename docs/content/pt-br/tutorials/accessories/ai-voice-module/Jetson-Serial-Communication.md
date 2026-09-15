---
title: "Comunicação por porta serial"
description: "Faça logout e login novamente para que tenha efeito."
---

# Comunicação por porta serial

## Instalar as dependências

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
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

`UART_Voice/uart_voice.py`

O módulo é conectado ao Jetson pelos pinos UART; comente `SERIAL_PORT = '/dev/ttyUSB0'` e descomente `SERIAL_PORT = '/dev/ttyTHS1'`

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/1.png)

## Instruções de cabeamento

![Imagem 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/2.png)

## Verificar a porta serial

```Plain Text
ls /dev/ttyTHS*
```

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

O módulo é conectado ao Jetson pelo cabo de dados Type; descomente `SERIAL_PORT = '/dev/ttyUSB0'` e comente `SERIAL_PORT = '/dev/ttyTHS1'`

![Imagem 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/3.png)

## Verificar a porta serial

```Plain Text
ls /dev/ttyUSB*
```

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

## Solução de problemas

### Porta serial em uso

Se a porta serial não puder ser aberta, verifique se ela está sendo usada por outro serviço:

```Plain Text
sudo systemctl stop nvgetty
```

```Plain Text
sudo systemctl disable nvgetty
```

<RelatedProducts slugs="ai-voice-module" />
