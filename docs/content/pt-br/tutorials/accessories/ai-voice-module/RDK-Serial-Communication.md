---
title: "Comunicação por porta serial"
description: "Este repositório fornece um código de exemplo em Python para a comunicação entre a plataforma RDK X5 (Raspber…"
---

# Comunicação por porta serial

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

### Conexão da versão UART

**Atenção**: por padrão, usa-se o dispositivo de porta serial `/dev/ttyAMA0`

---

### Conexão pelo cabo de dados Type-C (alternativa ao UART)

Se você usar um módulo adaptador USB-TTL:

**Atenção**: nesse caso, o dispositivo de porta serial geralmente é `/dev/ttyUSB0`

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-Serial-Communication/1.jpg)

---

## Configuração do ambiente

### Requisitos do sistema

- RDK X5

- Sistema Ubuntu / Debian

- Python 3.7+

### Instalar os pacotes de dependência

```Bash
# 更新软件包
sudo apt update
sudo apt upgrade -y

# 安装 Python 库
sudo apt install -y python3-pip

# 安装 pyserial
pip3 install pyserial
```

### Habilitar a interface de porta serial

```Bash
# 打开配置工具
sudo raspi-config

# 选择 Interface Options → Serial
Select: No (shell) → Yes (hardware serial port)
# 重启生效
sudo reboot
```

---

## Uso da versão UART

### Verificar os arquivos de código

```Bash
cd UART_Voice
ls -la
# 应该看到 uart_voice.py
```

### Configurar o dispositivo de porta serial

Edite o arquivo `uart_voice.py` e modifique o dispositivo de porta serial:

```Bash
# UART 直连（默认）
SERIAL_PORT = '/dev/ttyAMA0'

# 或者使用 USB-TTL
SERIAL_PORT = '/dev/ttyUSB0'

# 波特率
BAUD_RATE = 115200
```

### Executar o programa

## Conceder permissão de execução

```Bash
chmod +x uart_voice.py
# 运行（需要 sudo 权限访问串口）
sudo python3 uart_voice.py
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

Pressione `Ctrl + C` para parar o programa

---

## Solução de problemas

### Q1: O dispositivo de porta serial não é encontrado

**R: Verifique:**

1. Verifique se a porta serial está habilitada (raspi-config)

2. Verifique se o nome do dispositivo está correto

    - UART direto: `/dev/ttyAMA0`

    - USB-TTL: `/dev/ttyUSB0` ou `/dev/ttyUSB1`

3. Verifique se a conexão de hardware está correta

4. Verifique se a porta serial está sendo usada por outro programa

```Bash
# 查看可用串口
ls /dev/tty* | grep tty
```

---

### Q2: O ID do comando mostra apenas 0 ou não é exibido

**R: Comportamento normal:**

- 0 = nenhum comando válido reconhecido

- O ID só é gerado quando se diz uma palavra de comando válida

- Ative o módulo primeiro e depois diga o comando

---

### Q3: Taxa de reconhecimento baixa

**R: Sugestões de otimização:**

- Garanta um ambiente silencioso e evite ruído de fundo alto

- Mantenha uma distância moderada do microfone (10-50cm)

- Fale em velocidade moderada e com pronúncia clara

---

### Q4: Comunicação pela porta serial anormal

**R: Verifique:**

1. Se TX/RX estão conectados em cruzamento (TX do módulo → RX do RPi)

2. Se a taxa de transmissão é 115200

3. Se há aterramento em comum

4. Se a porta serial está sendo usada por outro processo

```Bash
# 检查串口占用
sudo lsof /dev/ttyAMA0
```

---

## Suporte técnico

Em caso de problemas, verifique:

1. Se o cabeamento do hardware está correto (o aterramento em comum é muito importante!)

2. Se a taxa de transmissão da porta serial é 115200

3. Se há permissões suficientes para acessar a interface de hardware

## Comandos de depuração comuns

```Bash
ls -l /dev/ttyAMA0   # 查看串口设备
groups                # 查看用户组权限
```

