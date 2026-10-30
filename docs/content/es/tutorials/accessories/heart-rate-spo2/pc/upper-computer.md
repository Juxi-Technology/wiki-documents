---
title: "Software de PC"
description: "Tutorial de uso del software gráfico de PC para el módulo de frecuencia cardíaca y SpO2 MAX30102: configuración del puerto serie, adquisición, monitorización, interpretación de datos y preguntas frecuentes."
---

# Software de PC

## 📋 Descripción de funciones

Este es un programa gráfico de PC para la monitorización de frecuencia cardíaca y SpO2, compatible con las siguientes funciones:

1. ✅ **Selección de puerto serie** - escaneo automático de los puertos serie disponibles
1. ✅ **Selección de velocidad en baudios** - compatible con 9600/19200/38400/57600/115200
1. ✅ **Conectar/Desconectar** - conexión y desconexión del módulo con un clic
1. ✅ **Iniciar/Cerrar adquisición** - controla el encendido y apagado del LED del sensor
1. ✅ **Iniciar/Detener monitorización** - visualización de datos en tiempo real
1. ✅ **Visualización de datos en tiempo real** - SpO2, frecuencia cardíaca, temperatura

---

## 🔌 Conexión de hardware

| Módulo de frecuencia cardíaca y SpO2 | Módulo USB a TTL |
|---|---|
| VCC | 5V (¡importante! no conecte 3,3V) |
| GND | GND |
| TX | RX (conexión cruzada) |
| RX | TX (conexión cruzada) |

![Ilustración](../../../../../../public/images/tutorials/accessories/heart-rate-spo2/pc-upper-computer/01.png)

⚠️ **Aviso: desplace el interruptor del módulo a UART y conecte TX y RX de forma cruzada.**

---

## 🚀 Ejecución del programa

### Método 1: ejecutar directamente el script de Python

1. Instale las bibliotecas de dependencias:

```bash
pip install pyserial
```

1. Ejecute el programa:

```bash
cd D:\JUXI_HeartRate_SPO2\python\windows
```

```bash
python HeartRateOximeter.py
```

---

## 📖 Pasos de uso

### Paso 1: conectar el hardware

1. Conecte el sensor y el adaptador USB a TTL según la tabla de conexiones anterior

```text
VCC->VCC
GND->GND
RX->TX
TX->RX
```

1. Inserte el adaptador USB a TTL en un puerto USB del ordenador

### Paso 2: abrir el programa

Ejecute `HeartRateOximeter.exe`

### Paso 3: configuración del puerto serie

1. Seleccione el número de puerto serie correcto (por ejemplo, COM3)
1. Seleccione la velocidad en baudios **9600** (predeterminada)
1. Haga clic en el botón [Conectar]

### Paso 4: iniciar la adquisición

1. Tras conectar correctamente, haga clic en [Iniciar adquisición]
1. ✅ El LED del sensor se encenderá

### Paso 5: iniciar la monitorización

1. Coloque el dedo sobre el sensor
1. Haga clic en [Iniciar monitorización]
1. Consulte los datos en tiempo real

---

## 📊 Descripción de la interfaz

```text
┌─────────────────────────────────────────┐
│           串口设置                       │
│  串口:  [COM3  ↓]  [刷新]               │
│  波特率:[9600  ↓]  [连接]               │
├─────────────────────────────────────────┤
│           模块控制                       │
│  [启动采集]  [开始监测]                 │
├─────────────────────────────────────────┤
│           实时数据                       │
│  血氧 (SPO2):       98 %                │
│  心率 (Heart Rate): 75 Times/min        │
│  温度 (Temperature): 36.6 °C            │
│  状态:  正在监测...                     │
├─────────────────────────────────────────┤
│           使用提示                       │
│  1. 接线：VCC->5V, GND->GND, RX->TX, TX->RX          │
│  2. 点击连接后再启动采集                               │
│  3. 启动采集后传感器LED会亮起                           │
└─────────────────────────────────────────┘
```
---

## 📋 Interpretación de los datos

| Dato | Rango normal | Descripción |
|---|---|---|
| Oxígeno en sangre (SPO2) | 95% - 100% | Por debajo del 90 % se recomienda acudir al médico |
| Frecuencia cardíaca | 60 - 100 veces/min | Rango normal de un adulto |
| Temperatura | 25 - 35 °C | Temperatura de la placa del módulo, no temperatura corporal |

**Nota**: al acabar de iniciar o si el dedo no está bien colocado, los datos pueden mostrar -1; es un fenómeno normal.

---

## ❓ Preguntas frecuentes

### P1: ¿Qué hacer si no se encuentra el puerto serie?

**A:**

1. Compruebe si el controlador USB a TTL está instalado correctamente
1. Vuelva a conectar el cable USB
1. Haga clic en el botón [Actualizar] para volver a escanear

### P2: ¿Qué hacer si falla la conexión?

**A:**

1. Confirme que el puerto serie seleccionado es correcto
1. Confirme que el puerto serie no está ocupado por otro programa (como un asistente de puerto serie o Arduino IDE)
1. Compruebe si el adaptador USB a TTL funciona correctamente

### P3: ¿El LED no se enciende tras hacer clic en iniciar adquisición?

**A:**

1. Compruebe si VCC está conectado a 5V (no a 3,3V)
1. Compruebe si TX/RX están conectados de forma cruzada
1. Confirme que el módulo sensor no está dañado

### P4: ¿Los datos muestran siempre -1?

**A:**

1. Confirme que ha hecho clic en [Iniciar adquisición]
1. Coloque el dedo correctamente sobre el sensor, cubriendo por completo la zona del LED
1. Mantenga el dedo estable y espere unos segundos
1. Compruebe si las conexiones están flojas

### P5: ¿El programa no responde?

**A:**

1. Haga clic primero en [Detener monitorización]
1. Después, haga clic en [Cerrar adquisición]
1. Por último, haga clic en [Desconectar]
1. Reinicie el programa

---

## ⚠️ Precauciones

1. **Orden de conexión**: conecte primero el sensor y después el USB
1. **Orden de desconexión**: detenga primero la monitorización, cierre la adquisición y, por último, desconecte
1. **Requisitos de alimentación**: el sensor debe alimentarse a 5V; con 3,3V puede no funcionar correctamente
1. **Colocación del dedo**: durante la medición, el dedo debe cubrir por completo la zona óptica, sin presionar con fuerza
1. **Requisitos del entorno**: evite la luz intensa directa sobre el sensor

---

## 📞 Soporte técnico

Si tiene problemas, compruebe:

1. Si el cableado del hardware es correcto (especialmente la conexión cruzada TX/RX)
1. Si la alimentación es de 5V
1. Si el controlador USB a TTL funciona correctamente
1. Si el puerto serie está ocupado por otro programa
