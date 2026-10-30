---
title: "PC · Ejecución con Python"
description: "Lea los datos de frecuencia cardíaca y SpO2 del MAX30102 en Windows mediante un adaptador USB a TTL y un script de Python; incluye controlador, puerto COM, pasos de ejecución y registros Modbus."
---

# PC · Ejecución con Python

## Índice

1. Preparación del hardware
1. Conexión del hardware
1. Configuración del entorno de software
1. Ejecución del programa de ejemplo
1. Preguntas frecuentes

---

## Preparación del hardware

### Material necesario

| Material | Descripción |
|---|---|
| Sensor JUXI_HeartRate_SPO2 | Módulo de frecuencia cardíaca y SpO2 |
| Módulo USB a TTL | CH340 / CP2102 / FT232, etc. |
| Cables Dupont | 4 (hembra a hembra) |
| Ordenador Windows | Win7/Win10/Win11 |

---

## Conexión del hardware

### Esquema de conexión

| Pin del sensor | Pin del módulo USB a TTL | Descripción |
|---|---|---|
| VCC | 3.3V o 5V | Positivo de alimentación |
| GND | GND | Negativo de alimentación |
| TX | RX | El sensor transmite → el módulo recibe |
| RX | TX | El sensor recibe → el módulo transmite |

![Ilustración](../../../../../../public/images/tutorials/accessories/heart-rate-spo2/pc-python/01.png)

⚠️ **Aviso importante**:

1. ¡Desplace el interruptor del módulo a UART!
1. **¡TX y RX deben conectarse de forma cruzada!**
1. El sensor admite 3,3V y 5V; no conecte una tensión incorrecta
1. Conecte primero todos los cables y después inserte el USB en el ordenador

### Diagrama de conexión

```text
传感器        USB转TTL模块
┌──────┐      ┌──────────┐
│ VCC  │──────│ 3.3V/5V  │
│ GND  │──────│ GND      │
│ TX   │──────│ RX       │  ← 交叉连接
│ RX   │──────│ TX       │  ← 交叉连接
└──────┘      └──────────┘
```

---

## Configuración del entorno de software

### Instalar el controlador

Según el modelo del chip de su adaptador USB a TTL, instale el controlador correspondiente:

- **CH340**: [https://sparks.gogo.co.nz/ch340.html](https://sparks.gogo.co.nz/ch340.html)
- **CP2102**: [https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
- **FT232**: [https://ftdichip.com/drivers/vcp-drivers/](https://ftdichip.com/drivers/vcp-drivers/)

Una vez completada la instalación, inserte el módulo USB a TTL.

### Ver el puerto COM

#### Método 1: Administrador de dispositivos

1. Pulse `Win + X` y seleccione "Administrador de dispositivos"
1. Despliegue "Puertos (COM y LPT)"
1. Consulte el número de puerto COM correspondiente a su adaptador USB a TTL (por ejemplo, COM3)

#### Método 2: detección automática por el programa

Al ejecutar el programa de ejemplo, se mostrará automáticamente una lista de todos los puertos serie disponibles.

### Instalar las dependencias de Python

Abra el símbolo del sistema (CMD) o PowerShell y ejecute:

```bash
pip install pyserial
```

---

## Ejecución del programa de ejemplo

Descargue y descomprima el paquete comprimido [JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)

### Ubicación de los archivos

```text
JUXI_HeartRate_SPO2/python/windows/
├── gain_heartbeat_SPO2.py  ← 主程序（直接运行这个）
├── JUXI_HeartRate_SPO2_Windows.py
├── JUXI_RTU_Windows.py
└── README_CN.md        ← 本文件
└── README.md
```

### Pasos de ejecución

1. **Confirme que la conexión de hardware es correcta**
  - VCC → 3.3V/5V
  - GND → GND
  - TX → RX (cruzado)
  - RX → TX (cruzado)

1. **Inserte el USB en el ordenador**
1. **Ejecute el programa**

```bash
cd D:\JUXI_HeartRate_SPO2\python\windows
```

```bash
python gain_heartbeat_SPO2.py
```

1. **Siga las indicaciones**
  - El programa mostrará todos los puertos serie disponibles
  - Introduzca el número de su puerto COM (por ejemplo, COM3)
  - El programa detecta el sensor automáticamente y comienza la medición

### Salida esperada

```python
==================================================
JUXI Blood Oxygen Sensor - Windows Test
==================================================
Available serial ports:
  COM3

Please enter the COM port number (e.g., COM3):

Connecting to COM3 at 9600 baud...
Initializing sensor...
Sensor initialized successfully!

Starting data collection...
Sensor LED should be ON now!

Place your finger on the sensor...

SPO2 (血氧): 97 %
Heart Rate (心率): 82 BPM
Temperature (温度): 26.5 °C
SPO2 (血氧): 98 %
Heart Rate (心率): 78 BPM
Temperature (温度): 26.6 °C
...
```

Pulse `Ctrl + C` para detener el programa.

---

## Descripción de las funciones del programa

### API principal

```bash
# 创建传感器对象
sensor = BloodOxygenSensor("COM3", 9600)

# 初始化传感器
sensor.begin()

# 开始采集（LED亮起）
sensor.sensor_start_collect()

# 读取心率血氧
sensor.get_heartbeat_SPO2()
print(f"SPO2: {sensor.SPO2}%")
print(f"Heart Rate: {sensor.heartbeat} BPM")

# 读取温度
temp = sensor.get_temperature_c()

# 停止采集（LED熄灭）
sensor.sensor_end_collect()

# 关闭串口
sensor.close()
```

---

## Preguntas frecuentes

### P1: ¿Qué hacer si no se encuentra el puerto COM?

**A:**

1. Compruebe si el adaptador USB a TTL está bien insertado
1. Reinstale el controlador
1. Pruebe con otro puerto USB
1. En el Administrador de dispositivos, compruebe si aparece algún "dispositivo desconocido"

### P2: ¿Qué hacer si falla la inicialización del sensor?

**A:**

1. Compruebe el cableado:
  - ¿Están bien conectados VCC y GND?
  - **¿Están TX y RX conectados de forma cruzada?** (el problema más habitual)

1. Confirme que la velocidad en baudios es 9600
1. Compruebe si el módulo USB a TTL funciona correctamente
1. Vuelva a conectar el USB

### P3: ¿Qué hacer si los datos muestran siempre -1?

**A:**

1. Confirme que el dedo está bien colocado sobre el sensor (cubriendo por completo la zona del LED)
1. Mantenga el dedo estable, sin moverlo
1. Espere unos segundos a que los datos se estabilicen
1. Compruebe si el LED del sensor está encendido

### P4: ¿El LED no se enciende pero la comunicación funciona?

**A:**

- Puede ser un problema de hardware del LED, pero el sensor funciona correctamente
- Si los datos son normales, puede ignorarse que el LED no se encienda

### P5: ¿Qué hacer si el puerto serie está ocupado?

**A:**

1. Cierre otros programas de puerto serie (asistente de puerto serie, Arduino IDE, etc.)
1. Compruebe si hay otros programas de Python en ejecución
1. Vuelva a conectar el USB

### P6: ¿Qué hacer si los datos son imprecisos?

**A:**

1. Asegúrese de que el dedo cubre por completo la zona óptica del sensor
1. Mantenga un entorno tranquilo durante la medición; no hable ni se mueva
1. Espere más de 30 segundos a que los datos se estabilicen
1. Realice varias mediciones y obtenga el promedio

---

## Especificaciones técnicas

| Parámetro | Especificación |
|---|---|
| Modo de comunicación | UART (nivel TTL) |
| Velocidad en baudios | 9600 bps (predeterminada) |
| Formato de datos | 8N1 (8 bits de datos, sin paridad, 1 bit de parada) |
| Tensión de alimentación | 3.3V / 5V |
| Rango de medición de SPO2 | 35% - 100% |
| Rango de medición de frecuencia cardíaca | 30 - 250 BPM |
| Dirección del dispositivo Modbus | 0x20 |

---

## Descripción de los registros Modbus

| Dirección de registro | Función | Descripción |
|---|---|---|
| 0x02 | ID del dispositivo | Lectura: devuelve 0x0020 |
| 0x06-0x09 | Datos de frecuencia cardíaca y SpO2 | Lectura: SPO2 + frecuencia cardíaca |
| 0x0A | Temperatura | Lectura: temperatura de la placa |
| 0x10 | Control de adquisición | Escritura: 0x0001=iniciar, 0x0002=detener |
