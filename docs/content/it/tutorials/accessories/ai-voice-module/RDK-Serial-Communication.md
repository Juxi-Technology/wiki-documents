---
title: "Comunicazione della porta seriale"
description: "Questo repository fornisce codice di esempio Python per la comunicazione tra la piattaforma RDK X5 (Raspberry…"
---

# Comunicazione della porta seriale

## Introduzione

Questo repository fornisce codice di esempio Python per la comunicazione tra la piattaforma RDK X5 (Raspberry Pi) e il modulo di interazione vocale AI, con supporto per due modalità di comunicazione: I2C e UART.

- **Modulo di riconoscimento vocale**: supporta il riconoscimento vocale offline e, dopo il riconoscimento, restituisce l'ID del comando

- **Funzione di riproduzione**: supporta la riproduzione passiva, la riproduzione delle parole di funzione e la riproduzione delle parole di comando

- **Protocollo di comunicazione**: indirizzo I2C 0x2A, baud rate UART 115200

- **Linguaggio di programmazione**: Python 3

---

## Connessione hardware

### Connessione generale

> **Nota importante**: assicurarsi che tutti i dispositivi abbiano il GND in comune!
> 
> 

---

### Connessione della versione UART

**Nota**: per impostazione predefinita viene utilizzato il dispositivo di porta seriale `/dev/ttyAMA0`

---

### Connessione con cavo dati Type-C (alternativa UART)

Se si utilizza un modulo adattatore USB-TTL:

**Nota**: in questo caso il dispositivo di porta seriale è solitamente `/dev/ttyUSB0`

![Immagine 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-Serial-Communication/1.jpg)

---

## Configurazione dell'ambiente

### Requisiti di sistema

- RDK X5

- Sistema Ubuntu / Debian

- Python 3.7+

### Installazione dei pacchetti di dipendenza

```Bash
# 更新软件包
sudo apt update
sudo apt upgrade -y

# 安装 Python 库
sudo apt install -y python3-pip

# 安装 pyserial
pip3 install pyserial
```

### Abilitazione dell'interfaccia della porta seriale

```Bash
# 打开配置工具
sudo raspi-config

# 选择 Interface Options → Serial
Select: No (shell) → Yes (hardware serial port)
# 重启生效
sudo reboot
```

---

## Utilizzo della versione UART

### Verifica dei file di codice

```Bash
cd UART_Voice
ls -la
# 应该看到 uart_voice.py
```

### Configurazione del dispositivo di porta seriale

Modificare il file `uart_voice.py` e cambiare il dispositivo di porta seriale:

```Bash
# UART 直连（默认）
SERIAL_PORT = '/dev/ttyAMA0'

# 或者使用 USB-TTL
SERIAL_PORT = '/dev/ttyUSB0'

# 波特率
BAUD_RATE = 115200
```

### Esecuzione del programma

## Concessione dell'autorizzazione di esecuzione

```Bash
chmod +x uart_voice.py
# 运行（需要 sudo 权限访问串口）
sudo python3 uart_voice.py
```

### Test di esecuzione

Al termine di un avvio corretto viene visualizzato:

```Bash
Speech Serial Opened! Baudrate=115200
```

Pronunciando una parola di comando al modulo vocale, viene visualizzato l'ID corrispondente:

```Bash
Speech Serial Opened! Baudrate=115200
ID:1
ID:4
ID:10
```

### Arresto del programma

Premere `Ctrl + C` per arrestare il programma

---

## Risoluzione dei problemi

### Q1: il dispositivo di porta seriale non viene trovato

**R: verificare:**

1. Verificare se la porta seriale è abilitata (raspi-config)

2. Verificare se il nome del dispositivo è corretto

    - UART diretto: `/dev/ttyAMA0`

    - USB-TTL: `/dev/ttyUSB0` o `/dev/ttyUSB1`

3. Verificare se il collegamento hardware è corretto

4. Verificare se la porta seriale è occupata da un altro programma

```Bash
# 查看可用串口
ls /dev/tty* | grep tty
```

---

### Q2: l'ID del comando mostra solo 0 o non viene visualizzato

**R: fenomeno normale:**

- 0 = nessun comando valido riconosciuto

- L'ID viene emesso solo dopo aver pronunciato una parola di comando valida

- Attivare prima il modulo, poi pronunciare il comando

---

### Q3: precisione di riconoscimento non elevata

**R: suggerimenti di ottimizzazione:**

- Assicurarsi che l'ambiente sia silenzioso e che il rumore di fondo non sia troppo elevato

- Mantenere una distanza adeguata dal microfono (10-50cm)

- Ritmo di parlata moderato e pronuncia chiara

---

### Q4: comunicazione della porta seriale anomala

**R: verificare:**

1. Se TX/RX sono collegati in modo incrociato (TX del modulo → RX del RPi)

2. Se il baud rate è 115200

3. Se il GND è in comune

4. Se la porta seriale è occupata da un altro processo

```Bash
# 检查串口占用
sudo lsof /dev/ttyAMA0
```

---

## Supporto tecnico

In caso di problemi, verificare:

1. Se il cablaggio hardware è corretto (il GND in comune è molto importante!)

2. Se il baud rate della porta seriale è 115200

3. Se si dispone di autorizzazioni sufficienti per accedere all'interfaccia hardware

## Comandi di debug comuni

```Bash
ls -l /dev/ttyAMA0   # 查看串口设备
groups                # 查看用户组权限
```

