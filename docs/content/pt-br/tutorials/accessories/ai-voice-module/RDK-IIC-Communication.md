---
title: "RDK: Comunicação IIC"
description: "Comunicação IIC entre a plataforma RDK X5 e o módulo de interação por voz IA da Juxi Technology — exemplo em Python, endereço I2C 0x2A e solução de problemas."
---

# RDK: Comunicação IIC

## Introdução

Este repositório fornece um código de exemplo em Python para a comunicação entre a plataforma RDK X5 (Raspberry Pi) e o módulo de interação por voz com IA, com suporte a dois modos de comunicação: I2C e UART.

- **Módulo de reconhecimento de fala**: oferece suporte a reconhecimento de fala offline e gera o ID do comando após o reconhecimento

- **Função de reprodução**: oferece suporte a reprodução passiva, reprodução de palavras de função e reprodução de palavras de comando

- **Protocolo de comunicação**: endereço I2C 0x2A, taxa de transmissão UART 115200

- **Linguagem de programação**: Python 3

---

## Conexão de hardware

### Conexão geral

> **Aviso importante**: certifique-se de que todos os dispositivos estejam aterrados em comum!
> 
> 

---

### Conexão da versão I2C

**Atenção**: por padrão, usa-se o barramento I2C 5 (numeração BCM)

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-IIC-Communication/1.jpg)

---

## Configuração do ambiente

### Requisitos do sistema

- RDK X5

- Sistema Ubuntu / Debian

- Python 3.7+

### Instalar os pacotes de dependência

```Bash
# Atualizar os pacotes
sudo apt update
sudo apt upgrade -y

# Instalar as bibliotecas Python
sudo apt install -y python3-pip python3-smbus i2c-tools
```

### Habilitar a interface I2C

```Bash
# Abrir a ferramenta de configuração
sudo raspi-config

# Selecionar Interface Options → I2C → Enable
# Reiniciar para aplicar
sudo reboot
```

### Testar a interface de hardware

```Bash
# Testar o dispositivo I2C
sudo i2cdetect -y 5
```

---

## Uso da versão IIC

### Verificar os arquivos de código

```Bash
cd IIC_Voice
ls -la
# Você deve ver iic_voice.py
```

### Configurar o barramento I2C

Edite o arquivo `iic_voice.py` e modifique os parâmetros necessários:

```Bash
# Endereço do dispositivo I2C
DEVICE_ADDRESS = 0x2A

# Endereço do registrador
REG_RESULT = 0xDA

# Número do barramento I2C (modificar conforme a conexão real)
bus = smbus.SMBus(5)  # Barramento I2C 5
```

### Executar o programa

```Bash
# Conceder permissão de execução
chmod +x iic_voice.py

# Executar (requer permissão sudo para acessar o I2C)
sudo python3 iic_voice.py
```

### Teste de execução

Após a inicialização normal, será exibido:

```Bash
Speech Serial Opened! Baudrate=115200
```

Diga uma palavra de comando ao módulo de voz e o ID correspondente será exibido:

```Bash
Speech Serial Opened! Baudrate=115200
ID:1
ID:4
ID:10
```

### Parar o programa

Pressione `Ctrl + C` para parar o programa:

```Bash
Program terminated
```

---

## Solução de problemas

### Q1: Permissão insuficiente para operações I2C

**R: Adicione o usuário ao grupo de usuários I2C:**

```Bash
sudo usermod -aG i2c $USER
# Faça login novamente para aplicar
```

Ou execute o programa com `sudo`

---

### Q2: O dispositivo I2C não é encontrado na varredura

**R: Verifique:**

1. Confirme se o I2C está habilitado (raspi-config)

2. Verifique se SDA/SCL estão invertidos

3. Verifique se há aterramento em comum

4. Verifique se o dispositivo está energizado

```Bash
# Escanear os dispositivos I2C
sudo i2cdetect -y 5
# Se aparecer 0x2A, o dispositivo está conectado corretamente
```

---

### Q3: O ID do comando mostra apenas 0 ou não é exibido

**R: Comportamento normal:**

- 0 = nenhum comando válido reconhecido

- O ID só é gerado quando se diz uma palavra de comando válida

- Ative o módulo primeiro e depois diga o comando

---

### Q4: Taxa de reconhecimento baixa

**R: Sugestões de otimização:**

- Garanta um ambiente silencioso e evite ruído de fundo alto

- Mantenha uma distância moderada do microfone (10-50cm)

- Fale em velocidade moderada e com pronúncia clara

---

## Suporte técnico

Em caso de problemas, verifique:

1. Se o cabeamento do hardware está correto (o aterramento em comum é muito importante!)

2. Se a taxa de transmissão da porta serial é 115200

3. Se o endereço I2C está correto (0x2A)

4. Se há permissões suficientes para acessar a interface de hardware

## Comandos de depuração comuns

```Bash
ls -l /dev/i2c*      # Ver os dispositivos I2C
groups                # Ver as permissões do grupo de usuários
```

<RelatedProducts slugs="ai-voice-module" />
