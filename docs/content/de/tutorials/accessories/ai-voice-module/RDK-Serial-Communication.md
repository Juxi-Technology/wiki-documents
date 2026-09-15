---
title: "RDK: Serielle Kommunikation"
description: "AI-Sprachinteraktionsmodul an der RDK X5 über die serielle Schnittstelle nutzen: Python-Beispielcode, Verkabelung und Umgebung einrichten."
---

# RDK: Serielle Kommunikation

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

### Verbindung der UART-Version

**Hinweis**: Standardmäßig wird das serielle Gerät `/dev/ttyAMA0` verwendet

---

### Type-C-Datenkabelverbindung (UART-Alternative)

Bei Verwendung eines USB-TTL-Adaptermoduls:

**Hinweis**: In diesem Fall ist das serielle Gerät normalerweise `/dev/ttyUSB0`

![Abb. 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-Serial-Communication/1.jpg)

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
sudo apt install -y python3-pip

# 安装 pyserial
pip3 install pyserial
```

### Serielle Schnittstelle aktivieren

```Bash
# 打开配置工具
sudo raspi-config

# 选择 Interface Options → Serial
Select: No (shell) → Yes (hardware serial port)
# 重启生效
sudo reboot
```

---

## Verwendung der UART-Version

### Codedateien prüfen

```Bash
cd UART_Voice
ls -la
# 应该看到 uart_voice.py
```

### Serielles Gerät konfigurieren

Bearbeiten Sie die Datei `uart_voice.py` und ändern Sie das serielle Gerät:

```Bash
# UART 直连（默认）
SERIAL_PORT = '/dev/ttyAMA0'

# 或者使用 USB-TTL
SERIAL_PORT = '/dev/ttyUSB0'

# 波特率
BAUD_RATE = 115200
```

### Programm ausführen

## Ausführungsberechtigung erteilen

```Bash
chmod +x uart_voice.py
# 运行（需要 sudo 权限访问串口）
sudo python3 uart_voice.py
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

Drücken Sie `Ctrl + C`, um das Programm zu beenden

---

## Häufig gestellte Fragen

### Q1: Serielles Gerät nicht gefunden

**A: Prüfen Sie:**

1. Prüfen Sie, ob die serielle Schnittstelle aktiviert ist (raspi-config)

2. Prüfen Sie, ob der Gerätename korrekt ist

    - UART-Direktverbindung: `/dev/ttyAMA0`

    - USB-TTL: `/dev/ttyUSB0` oder `/dev/ttyUSB1`

3. Prüfen Sie, ob die Hardwareverbindung korrekt ist

4. Prüfen Sie, ob die serielle Schnittstelle von einem anderen Programm belegt ist

```Bash
# 查看可用串口
ls /dev/tty* | grep tty
```

---

### Q2: Befehls-ID zeigt nur 0 an oder wird nicht angezeigt

**A: Normales Phänomen:**

- 0 = kein gültiger Befehl erkannt

- Eine ID wird erst ausgegeben, wenn ein gültiges Befehlswort gesprochen wird

- Wecken Sie zuerst das Modul und sprechen Sie dann den Befehl

---

### Q3: Geringe Erkennungsgenauigkeit

**A: Optimierungsvorschläge:**

- Sorgen Sie für eine ruhige Umgebung; der Hintergrundlärm sollte nicht zu laut sein

- Halten Sie einen angemessenen Abstand zum Mikrofon ein (10-50cm)

- Sprechen Sie in angemessenem Tempo und deutlich

---

### Q4: Anomalie bei der seriellen Kommunikation

**A: Prüfen Sie:**

1. Ob TX/RX überkreuz verbunden sind (Modul TX → RPi RX)

2. Ob die Baudrate 115200 beträgt

3. Ob eine gemeinsame Masse vorhanden ist

4. Ob die serielle Schnittstelle von einem anderen Prozess belegt ist

```Bash
# 检查串口占用
sudo lsof /dev/ttyAMA0
```

---

## Technischer Support

Bei Problemen prüfen Sie bitte:

1. Ob die Hardwareverkabelung korrekt ist (eine gemeinsame Masse ist sehr wichtig!)

2. Ob die Baudrate der seriellen Schnittstelle 115200 beträgt

3. Ob ausreichende Berechtigungen für den Zugriff auf die Hardwareschnittstelle vorhanden sind

## Häufig verwendete Debug-Befehle

```Bash
ls -l /dev/ttyAMA0   # 查看串口设备
groups                # 查看用户组权限
```

<RelatedProducts slugs="ai-voice-module" />
