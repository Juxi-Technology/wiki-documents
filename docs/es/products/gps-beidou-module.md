---
title: Módulo de posicionamiento GNSS GPS y Beidou
description: "Módulo GNSS GPS y Beidou JUXI – chip ATGM336H-5N, posicionamiento combinado de cuatro sistemas de satélites, precisión de 2,5 m, compatible con ROS"
keywords: [GPS, Beidou, GNSS, posicionamiento, ATGM336H]
---

# Módulo de posicionamiento GNSS GPS y Beidou

> **[Comprar en la tienda](https://www.juxitech.com/es/products/gps-beidou-gnss-positioning-module)**

## Descripción del producto

**Características principales**:

- Compatible con **BDS/GPS/QZSS/GLONASS** (individual o combinado)
- Receptor de **32 canales** de alta sensibilidad, posicionamiento estable
- Precisión de **2,5 m (CEP50)**, arranque en frío de 32 s
- Serie USB y serie TTL plug-and-play
- Tutoriales de código abierto para Arduino/Jetson/Raspberry Pi/ROS

## Especificaciones del producto

| Categoría | Especificación |
|------|------|
| Chip | ATGM336H-5N |
| Sistemas de satélites | BDS / GPS / QZSS / GLONASS |
| Canales | 32 canales, recepción multisistema simultánea |
| Precisión | <2,5 m (CEP50) |
| Frecuencia de actualización | 1 Hz por defecto, máx. 10 Hz |
| Velocidad | 4800-115200 bps (9600 por defecto) |
| Sensibilidad | Arranque en frío −148 dBm, seguimiento −162 dBm |
| Consumo | 25 mA @ 3,3 V |
| Temperatura de funcionamiento | −40 °C ~ +85 °C |
| Interfaces | USB Type-C / serie TTL (PH2.0) |

## Inicio rápido

```bash
# Comprobar el puerto serie USB
ls /dev/ttyUSB*
# Recibir datos (p. ej. /dev/ttyUSB0, 9600 bps)
sudo gpsd /dev/ttyUSB0 -n
cgps
```

## Tutoriales relacionados

- [Repositorio oficial](https://github.com/Juxi-Technology)

## Soporte técnico

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
