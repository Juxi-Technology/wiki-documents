---
title: Módulo de vídeo WiFi ESP32-S3
category: compute-vision
description: "Módulo de vídeo WiFi ESP32-S3 de Juxi Technology — cámara 2MP, transmisión WiFi en tiempo real, visión IA (color/rostro/QR), modo dual AP+STA"
keywords: [esp32, wifi, transmisión de vídeo, cámara, visión ia]
---

# Módulo de vídeo WiFi ESP32-S3

> **[Comprar en la tienda](https://www.juxitech.com/es/products/esp32-s3-wifi-video-module)**

## Descripción general

El módulo de vídeo WiFi ESP32 (modelo **ESP32-NanoCam**) es una solución de visión IA compacta y rentable con arquitectura modular de dos placas (placa de procesamiento + placa de expansión de comunicación). La placa central usa el procesador **ESP32-S3** y una cámara 2MP para transmisión de vídeo WiFi, visión IA e interacción por voz — firmware preinstalado, listo para usar.

**Características clave**:

- Cámara HD 2MP (1600×1200@30FPS)
- **Modo dual AP + STA** transmisión WiFi en tiempo real
- 8 modos de IA: detección de caras de gato, detección de rostros, reconocimiento de color, reconocimiento facial, escaneo de código QR, diálogo por voz LLM (XiaoZhi AI), control por voz ESP-Claw
- Audio ES8311 integrado (micrófono + altavoz), compatible con la interacción por voz
- LED de estado RGB WS2812
- Actualización de firmware con un clic por Type-C
- Interfaces I2C / UART estándar PH2.0

## Especificaciones

| Categoría | Especificación |
|------|------|
| MCU | ESP32-S3 N16R8 (Espressif, doble núcleo 240MHz) |
| Almacenamiento | 16MB Flash + 8MB PSRAM |
| Cámara | CMOS 2MP GC2145 (1600×1200@30FPS) |
| Campo de visión | Diagonal 68°, horizontal 49.5° |
| Audio | Códec ES8311 + micrófono MEMS + altavoz con amplificador clase D |
| LED de estado | WS2812 RGB |
| Inalámbrico | WiFi (BT modo dual) AP/STA + antena de alta ganancia |
| Interfaces | Type-C / I2C / UART (PH2.0) |
| Teclas | Reset + tecla BOOT |
| Reconocimiento | Caras de gato, detección de rostros, reconocimiento facial, color, código QR, diálogo por voz |

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

Type-C al PC, actualización de firmware en un clic; cambiar el modo de IA (gato/detección de rostros/color/reconocimiento facial/QR/diálogo por voz) mediante comandos del puerto serie; referencia completa de comandos en el [Manual del protocolo serie](/es/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol).

---

## Tutoriales completos

- [Inicio rápido — flashear el firmware, conectar el WiFi y abrir la imagen en 3 minutos](/es/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start)
- [Especificaciones de hardware — mapeo completo de pines GPIO y diseño de alimentación](/es/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec)
- [Manual del protocolo serie — comandos AT completos para la configuración de WiFi y los modos de IA](/es/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol)
- [Tutorial de visión IA — práctica progresiva en 11 capítulos (rostro/gato/color/QR/voz)](/es/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup)
- [ESP32-NanoCam como controlador inalámbrico de brazo esclavo del SO-ARM101](/es/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)

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