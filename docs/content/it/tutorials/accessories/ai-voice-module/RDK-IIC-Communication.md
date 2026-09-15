---
title: "RDK: Comunicazione IIC"
description: "Questo repository fornisce codice di esempio Python per la comunicazione tra la piattaforma RDK X5 (Raspberry…"
---

# RDK: Comunicazione IIC

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

### Connessione della versione I2C

**Nota**: per impostazione predefinita viene utilizzato il bus I2C 5 (numerazione BCM)

![Immagine 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-IIC-Communication/1.jpg)

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
sudo apt install -y python3-pip python3-smbus i2c-tools
```

### Abilitazione dell'interfaccia I2C

```Bash
# 打开配置工具
sudo raspi-config

# 选择 Interface Options → I2C → Enable
# 重启生效
sudo reboot
```

### Test dell'interfaccia hardware

```Bash
# 测试 I2C 设备
sudo i2cdetect -y 5
```

---

## Utilizzo della versione IIC

### Verifica dei file di codice

```Bash
cd IIC_Voice
ls -la
# 应该看到 iic_voice.py
```

### Configurazione del bus I2C

Modificare il file `iic_voice.py` e cambiare i parametri necessari:

```Bash
# I2C 设备地址
DEVICE_ADDRESS = 0x2A

# 寄存器地址
REG_RESULT = 0xDA

# I2C 总线编号（根据实际连接修改）
bus = smbus.SMBus(5)  # I2C 总线 5
```

### Esecuzione del programma

```Bash
# 赋予执行权限
chmod +x iic_voice.py

# 运行（需要 sudo 权限访问 I2C）
sudo python3 iic_voice.py
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

Premere `Ctrl + C` per arrestare il programma:

```Bash
Program terminated
```

---

## Risoluzione dei problemi

### Q1: autorizzazione insufficiente per le operazioni I2C

**R: aggiungere l'utente al gruppo utente I2C:**

```Bash
sudo usermod -aG i2c $USER
# 重新登录生效
```

Oppure eseguire il programma con `sudo`

---

### Q2: il dispositivo I2C non viene rilevato dalla scansione

**R: verificare:**

1. Confermare che I2C sia abilitato (raspi-config)

2. Verificare se SDA/SCL sono invertiti

3. Verificare che il GND sia in comune

4. Verificare che il dispositivo sia alimentato

```Bash
# 扫描 I2C 设备
sudo i2cdetect -y 5
# 如果看到 0x2A，说明设备连接正常
```

---

### Q3: l'ID del comando mostra solo 0 o non viene visualizzato

**R: fenomeno normale:**

- 0 = nessun comando valido riconosciuto

- L'ID viene emesso solo dopo aver pronunciato una parola di comando valida

- Attivare prima il modulo, poi pronunciare il comando

---

### Q4: precisione di riconoscimento non elevata

**R: suggerimenti di ottimizzazione:**

- Assicurarsi che l'ambiente sia silenzioso e che il rumore di fondo non sia troppo elevato

- Mantenere una distanza adeguata dal microfono (10-50cm)

- Ritmo di parlata moderato e pronuncia chiara

---

## Supporto tecnico

In caso di problemi, verificare:

1. Se il cablaggio hardware è corretto (il GND in comune è molto importante!)

2. Se il baud rate della porta seriale è 115200

3. Se l'indirizzo I2C è corretto (0x2A)

4. Se si dispone di autorizzazioni sufficienti per accedere all'interfaccia hardware

## Comandi di debug comuni

```Bash
ls -l /dev/i2c*      # 查看 I2C 设备
groups                # 查看用户组权限
```

<RelatedProducts slugs="ai-voice-module" />
