---
title: "RDK: Comunicação de porta série"
description: "Exemplo em Python de comunicação por porta série entre a plataforma RDK X5 e o módulo de interação por voz IA: ligação UART e configuração."
---

# RDK: Comunicação de porta série

## Introdução

Este repositório fornece código de exemplo em Python para a comunicação entre a plataforma RDK X5 (Raspberry Pi) e o módulo de interação por voz AI, com suporte para dois métodos de comunicação: I2C e UART.

- **Módulo de reconhecimento de voz**: suporta reconhecimento de voz offline e apresenta o ID do comando após o reconhecimento

- **Função de reprodução**: suporta reprodução passiva, reprodução de palavras de função e reprodução de palavras de comando

- **Protocolo de comunicação**: endereço I2C 0x2A, débito em bauds UART 115200

- **Linguagem de programação**: Python 3

---

## Ligação do hardware

### Ligação geral

> **Nota importante**: certifique-se de que todos os dispositivos partilham a mesma terra!
> 
> 

---

### Ligação da versão UART

**Nota**: por predefinição, é utilizado o dispositivo de porta série `/dev/ttyAMA0`

---

### Ligação por cabo de dados Type-C (alternativa UART)

Se utilizar um módulo adaptador USB-TTL:

**Nota**: neste caso, o dispositivo de porta série é normalmente `/dev/ttyUSB0`

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-Serial-Communication/1.jpg)

---

## Configuração do ambiente

### Requisitos do sistema

- RDK X5

- Sistema Ubuntu / Debian

- Python 3.7+

### Instalar os pacotes de dependências

```Bash
# Atualizar os pacotes
sudo apt update
sudo apt upgrade -y

# Instalar as bibliotecas Python
sudo apt install -y python3-pip

# Instalar o pyserial
pip3 install pyserial
```

### Ativar a interface de porta série

```Bash
# Abrir a ferramenta de configuração
sudo raspi-config

# Selecionar Interface Options → Serial
Select: No (shell) → Yes (hardware serial port)
# Tem efeito após reiniciar
sudo reboot
```

---

## Utilização da versão UART

### Verificar os ficheiros de código

```Bash
cd UART_Voice
ls -la
# Deverá ver uart_voice.py
```

### Configurar o dispositivo de porta série

Edite o ficheiro `uart_voice.py` e altere o dispositivo de porta série:

```Bash
# Ligação direta UART (predefinição)
SERIAL_PORT = '/dev/ttyAMA0'

# Ou utilizar um USB-TTL
SERIAL_PORT = '/dev/ttyUSB0'

# Velocidade de transmissão
BAUD_RATE = 115200
```

### Executar o programa

## Conceder permissões de execução

```Bash
chmod +x uart_voice.py
# Executar (é necessária permissão sudo para aceder à porta série)
sudo python3 uart_voice.py
```

### Teste de execução

Após um arranque normal, será apresentado:

```Bash
Speech Serial Opened! Baudrate=115200
```

Diga uma palavra de comando ao módulo de voz e será apresentado o ID correspondente:

```Bash
Speech Serial Opened! Baudrate=115200
ID:1
ID:4
ID:10
```

### Parar o programa

Prima `Ctrl + C` para parar o programa

---

## Resolução de problemas

### Q1: O dispositivo de porta série não é encontrado

**R: Verifique:**

1. Verifique se a porta série está ativada (raspi-config)

2. Verifique se o nome do dispositivo está correto

    - Ligação direta UART: `/dev/ttyAMA0`

    - USB-TTL: `/dev/ttyUSB0` ou `/dev/ttyUSB1`

3. Verifique se a ligação do hardware está correta

4. Verifique se a porta série está a ser utilizada por outro programa

```Bash
# Ver as portas série disponíveis
ls /dev/tty* | grep tty
```

---

### Q2: O ID do comando só mostra 0 ou não aparece

**R: Comportamento normal:**

- 0 = não foi reconhecido nenhum comando válido

- o ID só é apresentado quando é dita uma palavra de comando válida

- ative primeiro o módulo e só depois diga o comando

---

### Q3: A precisão de reconhecimento não é elevada

**R: Sugestões de otimização:**

- Garanta um ambiente silencioso e um ruído de fundo reduzido

- Mantenha uma distância moderada em relação ao microfone (10-50cm)

- Fale a um ritmo moderado e articule com clareza

---

### Q4: Comunicação de porta série anómala

**R: Verifique:**

1. Se o TX/RX estão ligados de forma cruzada (TX do módulo → RX da RPi)

2. Se o débito em bauds é 115200

3. Se partilham a mesma terra

4. Se a porta série está a ser utilizada por outro processo

```Bash
# Verificar se a porta série está ocupada
sudo lsof /dev/ttyAMA0
```

---

## Suporte técnico

Se tiver problemas, verifique:

1. Se a cablagem do hardware está correta (a terra comum é muito importante!)

2. Se o débito em bauds da porta série é 115200

3. Se existem permissões suficientes para aceder à interface de hardware

## Comandos de depuração comuns

```Bash
ls -l /dev/ttyAMA0   # Ver os dispositivos de porta série
groups                # Ver as permissões do grupo de utilizadores
```

<RelatedProducts slugs="ai-voice-module" />
