---
title: "IIC-Kommunikation"
description: "Dieses Repository stellt Python-Beispielcode für die Kommunikation zwischen der Plattform RDK X5 (Raspberry P…"
---

# IIC-Kommunikation

## Einführung

Dieses Repository stellt Python-Beispielcode für die Kommunikation zwischen der Plattform RDK X5 (Raspberry Pi) und dem AI-Sprachinteraktionsmodul bereit und unterstützt zwei Kommunikationsmethoden: I2C und UART.

- **Spracherkennungsmodul**: Unterstützt Offline-Spracherkennung und gibt nach der Erkennung die Befehls-ID aus

- **Ansagefunktion**: Unterstützt passive Ansage, Funktionswort-Ansage und Befehlswort-Ansage

- **Kommunikationsprotokoll**: I2C-Adresse 0x2A, UART-Baudrate 115200

- **Programmiersprache**: Python 3

---

## Hardwareanschluss

### Allgemeine Verbindung

> **Wichtiger Hinweis**: Vergewissern Sie sich, dass alle Geräte eine gemeinsame Masse haben (GND)!
> 
> 

---

### Verbindung der I2C-Version

**Hinweis**: Standardmäßig wird der I2C-Bus 5 verwendet (BCM-Nummerierung)

![Abb. 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-IIC-Communication/1.jpg)

---

## Umgebungskonfiguration

### Systemanforderungen

- RDK X5

- Ubuntu-/Debian-System

- Python 3.7+

### Abhängigkeitspakete installieren

```Bash
# 更新软件包
sudo apt update
sudo apt upgrade -y

# 安装 Python 库
sudo apt install -y python3-pip python3-smbus i2c-tools
```

### I2C-Schnittstelle aktivieren

```Bash
# 打开配置工具
sudo raspi-config

# 选择 Interface Options → I2C → Enable
# 重启生效
sudo reboot
```

### Hardwareschnittstelle testen

```Bash
# 测试 I2C 设备
sudo i2cdetect -y 5
```

---

## Verwendung der IIC-Version

### Codedateien prüfen

```Bash
cd IIC_Voice
ls -la
# 应该看到 iic_voice.py
```

### I2C-Bus konfigurieren

Bearbeiten Sie die Datei `iic_voice.py` und ändern Sie die erforderlichen Parameter:

```Bash
# I2C 设备地址
DEVICE_ADDRESS = 0x2A

# 寄存器地址
REG_RESULT = 0xDA

# I2C 总线编号（根据实际连接修改）
bus = smbus.SMBus(5)  # I2C 总线 5
```

### Programm ausführen

```Bash
# 赋予执行权限
chmod +x iic_voice.py

# 运行（需要 sudo 权限访问 I2C）
sudo python3 iic_voice.py
```

### Test ausführen

Nach einem normalen Start wird Folgendes angezeigt:

```Bash
Speech Serial Opened! Baudrate=115200
```

Sprechen Sie das Befehlswort zum Sprachmodul, und die entsprechende ID wird angezeigt:

```Bash
Speech Serial Opened! Baudrate=115200
ID:1
ID:4
ID:10
```

### Programm beenden

Drücken Sie `Ctrl + C`, um das Programm zu beenden:

```Bash
Program terminated
```

---

## Häufig gestellte Fragen

### Q1: Unzureichende Berechtigung für I2C-Vorgänge

**A: Fügen Sie den Benutzer zur I2C-Benutzergruppe hinzu:**

```Bash
sudo usermod -aG i2c $USER
# 重新登录生效
```

Oder führen Sie das Programm mit `sudo` aus

---

### Q2: I2C-Gerät kann nicht gescannt werden

**A: Prüfen Sie:**

1. Vergewissern Sie sich, dass I2C aktiviert ist (raspi-config)

2. Prüfen Sie, ob SDA/SCL vertauscht sind

3. Prüfen Sie, ob eine gemeinsame Masse vorhanden ist

4. Prüfen Sie, ob das Gerät mit Strom versorgt ist

```Bash
# 扫描 I2C 设备
sudo i2cdetect -y 5
# 如果看到 0x2A，说明设备连接正常
```

---

### Q3: Befehls-ID zeigt nur 0 an oder wird nicht angezeigt

**A: Normales Phänomen:**

- 0 = kein gültiger Befehl erkannt

- Eine ID wird erst ausgegeben, wenn ein gültiges Befehlswort gesprochen wird

- Wecken Sie zuerst das Modul und sprechen Sie dann den Befehl

---

### Q4: Geringe Erkennungsgenauigkeit

**A: Optimierungsvorschläge:**

- Sorgen Sie für eine ruhige Umgebung; der Hintergrundlärm sollte nicht zu laut sein

- Halten Sie einen angemessenen Abstand zum Mikrofon ein (10-50cm)

- Sprechen Sie in angemessenem Tempo und deutlich

---

## Technischer Support

Bei Problemen prüfen Sie bitte:

1. Ob die Hardwareverkabelung korrekt ist (eine gemeinsame Masse ist sehr wichtig!)

2. Ob die Baudrate der seriellen Schnittstelle 115200 beträgt

3. Ob die I2C-Adresse korrekt ist (0x2A)

4. Ob ausreichende Berechtigungen für den Zugriff auf die Hardwareschnittstelle vorhanden sind

## Häufig verwendete Debug-Befehle

```Bash
ls -l /dev/i2c*      # 查看 I2C 设备
groups                # 查看用户组权限
```



