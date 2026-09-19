---
title: "RDK: Comunicação IIC"
description: "Exemplo em Python de comunicação IIC entre a plataforma RDK X5 e o módulo de interação por voz IA: ligação de hardware, barramento I2C e execução."
---

# RDK: Comunicação IIC

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

### Ligação da versão I2C

**Nota**: por predefinição, é utilizado o bus I2C 5 (numeração BCM)

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-IIC-Communication/1.jpg)

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
sudo apt install -y python3-pip python3-smbus i2c-tools
```

### Ativar a interface I2C

```Bash
# Abrir a ferramenta de configuração
sudo raspi-config

# Selecionar Interface Options → I2C → Enable
# Tem efeito após reiniciar
sudo reboot
```

### Testar a interface de hardware

```Bash
# Testar o dispositivo I2C
sudo i2cdetect -y 5
```

---

## Utilização da versão IIC

### Verificar os ficheiros de código

```Bash
cd IIC_Voice
ls -la
# Deverá ver iic_voice.py
```

### Configurar o bus I2C

Edite o ficheiro `iic_voice.py` e altere os parâmetros necessários:

```Bash
# Endereço do dispositivo I2C
DEVICE_ADDRESS = 0x2A

# Endereço do registo
REG_RESULT = 0xDA

# Número do barramento I2C (alterar conforme a ligação real)
bus = smbus.SMBus(5)  # Barramento I2C 5
```

### Executar o programa

```Bash
# Conceder permissões de execução
chmod +x iic_voice.py

# Executar (é necessária permissão sudo para aceder ao I2C)
sudo python3 iic_voice.py
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

Prima `Ctrl + C` para parar o programa:

```Bash
Program terminated
```

---

## Resolução de problemas

### Q1: Permissões insuficientes para operações I2C

**R: Adicione o utilizador ao grupo de utilizadores I2C:**

```Bash
sudo usermod -aG i2c $USER
# É necessário iniciar sessão novamente para ter efeito
```

Ou então execute o programa com `sudo`

---

### Q2: O dispositivo I2C não aparece na análise

**R: Verifique:**

1. Confirme se o I2C está ativado (raspi-config)

2. Verifique se o SDA/SCL estão trocados

3. Verifique se partilham a mesma terra

4. Verifique se o dispositivo está alimentado

```Bash
# Digitalizar os dispositivos I2C
sudo i2cdetect -y 5
# Se vir 0x2A, o dispositivo está ligado corretamente
```

---

### Q3: O ID do comando só mostra 0 ou não aparece

**R: Comportamento normal:**

- 0 = não foi reconhecido nenhum comando válido

- o ID só é apresentado quando é dita uma palavra de comando válida

- ative primeiro o módulo e só depois diga o comando

---

### Q4: A precisão de reconhecimento não é elevada

**R: Sugestões de otimização:**

- Garanta um ambiente silencioso e um ruído de fundo reduzido

- Mantenha uma distância moderada em relação ao microfone (10-50cm)

- Fale a um ritmo moderado e articule com clareza

---

## Suporte técnico

Se tiver problemas, verifique:

1. Se a cablagem do hardware está correta (a terra comum é muito importante!)

2. Se o débito em bauds da porta série é 115200

3. Se o endereço I2C está correto (0x2A)

4. Se existem permissões suficientes para aceder à interface de hardware

## Comandos de depuração comuns

```Bash
ls -l /dev/i2c*      # Ver os dispositivos I2C
groups                # Ver as permissões do grupo de utilizadores
```

<RelatedProducts slugs="ai-voice-module" />
