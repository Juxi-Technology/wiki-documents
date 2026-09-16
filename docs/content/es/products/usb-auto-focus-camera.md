---
title: Cámara USB con enfoque automático
category: compute-vision
description: Cámara USB con enfoque automático de Juxi Technology, sin controlador — gran angular 86°, 1080P 30FPS, UVC plug-and-play para visión robótica e inferencia de IA, compatible con Windows/Linux/macOS/Jetson/Raspberry Pi
keywords: [cámara usb, enfoque automático, 1080p, uvc, sin controlador, visión robótica, jetson, raspberry pi]
---

# Cámara USB con enfoque automático

> **[Comprar en Taobao](https://item.taobao.com/item.htm?id=912105917442)**

## Descripción general

La cámara USB con enfoque automático es un módulo de cámara HD plug-and-play adecuado para visión robótica, inferencia de IA y aplicaciones de visión por computadora. Admite un campo de visión **gran angular de 86°**, enfoque automático y salida de video **1080P 30FPS** mediante el protocolo estándar UVC, sin necesidad de instalar controladores.

**Características clave**:

- USB sin controlador, protocolo estándar UVC, plug-and-play
- Compatible con Windows / Linux / macOS / Jetson / Raspberry Pi
- Lente gran angular de 86° para un campo de visión más amplio
- Enfoque automático (AF), sin ajuste manual
- Flujo de video HD 1080P 30 FPS

---

## Especificaciones

| Parámetro | Especificación |
|------|------|
| Resolución | 1920 × 1080 (1080P) |
| Frecuencia de cuadros | 30 FPS |
| Ángulo de visión | 86° gran angular |
| Enfoque | Automático (AF) |
| Interfaz | USB 2.0 |
| Protocolo | UVC (USB Video Class) |
| Sistemas | Windows / Linux / macOS / Jetson / Raspberry Pi |

---

## Inicio rápido

### 1. Conectar el dispositivo

Simplemente inserte el conector USB de la cámara en un puerto USB del dispositivo. No se necesitan controladores adicionales.

### 2. Verificar el reconocimiento del dispositivo

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
v4l2-ctl --list-devices
```

Una cámara USB normalmente muestra dos dispositivos `video` (por ejemplo, los nuevos `/dev/video2` y `/dev/video3`); al usarla, elija el de número menor.

### 3. Leer fotogramas con Python

```python
import cv2

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
cap.set(cv2.CAP_PROP_FPS, 30)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('USB Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
```

---

## Tutoriales completos

- [Tutorial de la cámara USB con enfoque automático — detección del dispositivo, selección de múltiples cámaras y ejemplos en Python](/es/tutorials/accessories/usb-auto-focus-camera)
- [Uso de la cámara con enfoque automático en Jetson (dispositivos de video y GUVCView)](/es/tutorials/accessories/csi-camera/02-Auto-Focus-Camera)

---

## Casos de uso

- Visión robótica y transmisión de video para teleoperación
- Proyectos de inferencia de IA y visión por computadora
- Configuraciones multicámara en Jetson / Raspberry Pi (junto con cámaras CSI)
- Streaming en vivo, grabación de pantalla y captura de video

---

## Preguntas frecuentes

**P: ¿La cámara no se reconoce?**

**A:** Compruebe que el cable USB esté bien conectado. Pruebe con otro puerto USB. Ejecute `lsusb` para ver la lista de dispositivos USB.

**P: ¿La imagen está borrosa?**

**A:** La cámara tiene enfoque automático: tras la primera conexión, espere 2-3 segundos a que se ajuste automáticamente. Si sigue borrosa, compruebe que la lente esté limpia.

**P: ¿Cómo cambio la resolución?**

**A:** Use `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` y `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`.

---

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Comentarios](https://github.com/Juxi-Technology/wiki-documents/issues)
