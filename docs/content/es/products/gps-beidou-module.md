---
title: Módulo de posicionamiento GNSS GPS y Beidou
category: sensor
description: "Módulo GNSS de Juxi Technology — chip ATGM336H-5N, combinación de cuatro constelaciones, precisión 2.5m, soporte ROS"
keywords: [gps, beidou, gnss, módulo de posicionamiento, ros]
---

# Módulo de posicionamiento GNSS GPS y Beidou

> **[Comprar en la tienda](https://www.juxitech.com/es/products/gps-beidou-gnss-positioning-module)**

## Descripción general

El módulo GPS y BDS se basa en el chip **ATGM336H-5N** de Unicore y admite Beidou Gen. 2/3 (todos los satélites 1-63), GPS, GLONASS y QZSS, con recepción simultánea multisistema para posicionamiento, navegación y sincronización horaria.

**Características clave**:

- Cuatro sistemas **BDS/GPS/QZSS/GLONASS** (solo o combinados)
- Receptor **32 canales** de alta sensibilidad, posicionamiento estable
- Precisión **2.5m (CEP50)**, arranque en frío 32 s
- USB serie + TTL serie plug-and-play
- Tutoriales open source Arduino/Jetson/Raspberry Pi/ROS

## Especificaciones

| Categoría | Especificación |
|------|------|
| Chip | ATGM336H-5N |
| Sistemas de satélites | BDS / GPS / QZSS / GLONASS |
| Canales | 32 canales, multisistema simultáneo |
| Precisión | <2.5m (CEP50) |
| Frecuencia de actualización | 1Hz por defecto, máx. 10Hz |
| Velocidad en baudios | 4800–115200bps (9600 por defecto) |
| Sensibilidad | Arranque en frío -148dBm, seguimiento -162dBm |
| Consumo | 25mA @ 3.3V |
| Temperatura de trabajo | -40℃ ~ +85℃ |
| Interfaces | USB Type-C / TTL serie (PH2.0) |

## Descripción de pines

| Pin | Función |
|------|------|
| 5V | Alimentación |
| RES | Reinicio del módulo |
| PPS | Pulso por segundo |
| TX | Salida serie |
| RX | Entrada serie (opcional) |

## Inicio rápido

### 1. Conectar antena y módulo

Antena GPS activa de 3 m conectada al módulo, colocada en zona despejada (exterior o ventana) para adquisición rápida.

### 2. Conexión USB

Cable Type-C directo, plug-and-play (9600bps por defecto).

### 3. Verificar el posicionamiento

```bash
# 安装 pynmea2 解析 NMEA 数据
pip install pynmea2

# 读取定位数据示例
import serial
import pynmea2

ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
while True:
    line = ser.readline().decode(errors='ignore')
    if line.startswith('$GPRMC') or line.startswith('$GNRMC'):
        msg = pynmea2.parse(line)
        print(f'纬度: {msg.latitude}, 经度: {msg.longitude}')
```
### 4. Integración ROS

Nodo de posicionamiento ROS compatible, fusión con IMU y navegación Move_Base.

## Herramientas y recursos

- **GnssToolKit3** : visualización, estado de satélites, registro, exportación KML
- **Conversión de coordenadas** : WGS-84 → GCJ-02 → BD-09
- **Código de ejemplo** : tutoriales Arduino / Python / Jetson Nano
- [Repositorio oficial](https://github.com/Juxi-Technology)(código IMU/posicionamiento)

## Preguntas frecuentes

**P: ¿Posicionamiento lento o sin señal?**
Colocar la antena en zona despejada (exterior/ventana); verificar la conexión; el arranque en frío tarda 32 s.

**P: ¿Qué sistemas de satélites admite?**
BDS, GPS, QZSS, GLONASS — solos o combinados.

**P: ¿Se conecta a microcontroladores?**
Sí, TTL serie (PH2.0) para placas MCU, con tutoriales 51/Arduino/STM32.

**P: ¿Formato de salida?**
Protocolo estándar NMEA 0183.

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Comentarios](https://github.com/Juxi-Technology/wiki-documents/issues)
