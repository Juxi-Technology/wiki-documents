---
title: "RDK: Comunicación por puerto serie"
description: "Este repositorio proporciona código de ejemplo en Python para la comunicación entre la plataforma RDK X5 (Ras…"
---

# RDK: Comunicación por puerto serie

## Introducción

Este repositorio proporciona código de ejemplo en Python para la comunicación entre la plataforma RDK X5 (Raspberry Pi) y el módulo de interacción por voz de IA, y admite dos modos de comunicación: I2C y UART.

- **Módulo de reconocimiento de voz**: admite reconocimiento de voz sin conexión y emite el ID del comando tras el reconocimiento

- **Funciones de reproducción**: admite reproducción pasiva, reproducción de palabras de función y reproducción de palabras de comando

- **Protocolo de comunicación**: dirección I2C 0x2A, velocidad en baudios UART 115200

- **Lenguaje de programación**: Python 3

---

## Conexión del hardware

### Conexión general

> **Importante:** ¡asegúrese de que todos los dispositivos compartan una tierra común!
> 
> 

---

### Conexión de la versión UART

**Nota**: por defecto se utiliza el dispositivo de puerto serie `/dev/ttyAMA0`

---

### Conexión mediante cable de datos Type-C (alternativa a UART)

Si se utiliza un módulo adaptador USB-TTL:

**Nota**: en este caso el dispositivo de puerto serie suele ser `/dev/ttyUSB0`

![Imagen 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-Serial-Communication/1.jpg)

---

## Configuración del entorno

### Requisitos del sistema

- RDK X5

- Sistema Ubuntu / Debian

- Python 3.7+

### Instalar paquetes de dependencias

```Bash
# 更新软件包
sudo apt update
sudo apt upgrade -y

# 安装 Python 库
sudo apt install -y python3-pip

# 安装 pyserial
pip3 install pyserial
```

### Habilitar la interfaz de puerto serie

```Bash
# 打开配置工具
sudo raspi-config

# 选择 Interface Options → Serial
Select: No (shell) → Yes (hardware serial port)
# 重启生效
sudo reboot
```

---

## Uso de la versión UART

### Comprobar los archivos de código

```Bash
cd UART_Voice
ls -la
# 应该看到 uart_voice.py
```

### Configurar el dispositivo de puerto serie

Edite el archivo `uart_voice.py` y modifique el dispositivo de puerto serie:

```Bash
# UART 直连（默认）
SERIAL_PORT = '/dev/ttyAMA0'

# 或者使用 USB-TTL
SERIAL_PORT = '/dev/ttyUSB0'

# 波特率
BAUD_RATE = 115200
```

### Ejecutar el programa

## Otorgar permiso de ejecución

```Bash
chmod +x uart_voice.py
# 运行（需要 sudo 权限访问串口）
sudo python3 uart_voice.py
```

### Ejecutar la prueba

Tras un inicio correcto se mostrará:

```Bash
Speech Serial Opened! Baudrate=115200
```

Diga una palabra de comando al módulo de voz y se mostrará el ID correspondiente:

```Bash
Speech Serial Opened! Baudrate=115200
ID:1
ID:4
ID:10
```

### Detener el programa

Pulse `Ctrl + C` para detener el programa

---

## Solución de problemas

### Q1: No se encuentra el dispositivo de puerto serie

**A: Compruebe:**

1. Compruebe si el puerto serie está habilitado (raspi-config)

2. Compruebe si el nombre del dispositivo es correcto

    - UART directo: `/dev/ttyAMA0`

    - USB-TTL: `/dev/ttyUSB0` o `/dev/ttyUSB1`

3. Compruebe si la conexión del hardware es correcta

4. Compruebe si el puerto serie está ocupado por otro programa

```Bash
# 查看可用串口
ls /dev/tty* | grep tty
```

---

### Q2: El ID del comando solo muestra 0 o no aparece

**A: Comportamiento normal:**

- 0 = no se ha reconocido ningún comando válido

- el ID solo se emite cuando se dice una palabra de comando válida

- active primero el módulo y luego diga el comando

---

### Q3: La precisión de reconocimiento no es alta

**A: Sugerencias de optimización:**

- Asegúrese de que el entorno sea silencioso y que el ruido de fondo no sea demasiado alto

- Mantenga una distancia moderada respecto al micrófono (10-50cm)

- Hable a un ritmo moderado y articule con claridad

---

### Q4: Comunicación por puerto serie anómala

**A: Compruebe:**

1. Si TX/RX están conectados en cruz (TX del módulo → RX de la RPi)

2. Si la velocidad en baudios es 115200

3. Si comparten tierra común

4. Si el puerto serie está ocupado por otro proceso

```Bash
# 检查串口占用
sudo lsof /dev/ttyAMA0
```

---

## Soporte técnico

Si tiene problemas, compruebe lo siguiente:

1. Si el cableado del hardware es correcto (¡la tierra común es muy importante!)

2. Si la velocidad en baudios del puerto serie es 115200

3. Si hay permisos suficientes para acceder a la interfaz de hardware

## Comandos de depuración habituales

```Bash
ls -l /dev/ttyAMA0   # 查看串口设备
groups                # 查看用户组权限
```

<RelatedProducts slugs="ai-voice-module" />
