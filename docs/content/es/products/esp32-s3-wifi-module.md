---
title: Módulo de vídeo WiFi ESP32-S3
category: compute-vision
description: Módulo de vídeo WiFi ESP32-S3 de Juxi Technology — cámara 2MP, transmisión WiFi en tiempo real, visión IA (color/rostro/QR), modo dual AP+STA
keywords: [esp32, wifi, transmisión de vídeo, cámara, visión ia]
---

# Módulo de vídeo WiFi ESP32-S3

> **[Comprar en la tienda](https://www.juxitech.com/es/products/esp32-s3-wifi-video-module)**

## Descripción general

El módulo de vídeo WiFi ESP32 es una solución de visión IA compacta y rentable con arquitectura modular de dos placas (placa de procesamiento + placa de expansión de comunicación). La placa central usa el procesador **ESP32-S3** y una cámara 2MP para transmisión de vídeo WiFi, reconocimiento facial y de color — firmware preinstalado, listo para usar.

**Características clave**:

- Cámara HD 2MP (1600×1200@30FPS)
- **Modo dual AP + STA** transmisión WiFi en tiempo real
- Visión IA: segmentación por umbral de color + CNN ligera (color/rostro/QR)
- Actualización de firmware con un clic por Type-C
- Interfaces I2C / UART estándar PH2.0

## Especificaciones

| Categoría | Especificación |
|------|------|
| MCU | ESP32-S3 (Espressif, doble núcleo) |
| Cámara | CMOS 2MP (1600×1200@30FPS) |
| Campo de visión | Diagonal 68°, horizontal 49.5° |
| Inalámbrico | WiFi (BT modo dual) AP/STA + antena de alta ganancia |
| Interfaces | Type-C / I2C / UART (PH2.0) |
| Teclas | Reset + tecla programable |
| Reconocimiento | Color, rostro, código QR |

## Inicio rápido

### 1. Encendido y conexión

Firmware preinstalado — el módulo crea su propio punto de acceso WiFi:

- Conectar el móvil/PC al punto de acceso
- Abrir la dirección indicada en el navegador para ver el vídeo en vivo

### 2. Dos modos de funcionamiento

| Modo | Descripción |
|------|------|
| **Modo AP** | El módulo crea su propio punto de acceso, el terminal se conecta directamente |
| **Modo STA** | El módulo se conecta a un router WiFi existente, transmisión en la misma red |

### 3. Conexión al host

**Comunicación UART** (Raspberry Pi/Jetson Orin):

```
ESP32 模块 RX → 主控 TX
ESP32 模块 TX → 主控 RX
```

**Comunicación I2C**: interfaz I2C estándar PH2.0, puede emitir los **datos de coordenadas** de detección de rostro/color.

### 4. Desarrollo personalizado

Type-C al PC, actualización de firmware en un clic; cambiar el objetivo de reconocimiento (color/rostro/QR) mediante comandos UART/I2C.

---

## Casos de uso

- Transmisión de vídeo inalámbrica (modo dual AP/STA)
- Desarrollo de visión IA (color/rostro/QR)
- Proyectos IoT/AIoT
- Extensión de visión robótica

---

## Preguntas frecuentes

**P: ¿Cómo veo el vídeo en tiempo real?**
El firmware preinstalado crea un punto de acceso AP. Conecta el móvil/PC y abre la página o aplicación indicada.

**P: ¿Qué reconocimientos admite?**
Segmentación por umbral de color + CNN ligera para color, rostro y QR; conmutable por comando.

**P: ¿Puede devolver coordenadas de reconocimiento?**
Sí. Las coordenadas de detección de rostro/color se emiten por I2C/UART para desarrollo personalizado.

**P: ¿Cómo actualizo el firmware?**
Type-C al PC, actualización con un clic.

---

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Comentarios](https://github.com/Juxi-Technology/wiki-documents/issues)