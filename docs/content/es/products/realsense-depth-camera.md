---
title: Cámara de profundidad 3D RealSense
category: compute-vision
description: "Cámara de profundidad 3D RealSense de Juxi Technology — D435i/D405/D405CB, percepción de profundidad de alta precisión, XLeRobot y SO-ARM101"
keywords: [realsense, cámara de profundidad, visión 3d, visión robótica]
---

# Cámara de profundidad 3D RealSense

> **[Comprar en la tienda](https://www.juxitech.com/es/products/3d-realsense-depth-camera)**

## Descripción general

La cámara de profundidad 3D RealSense es un dispositivo de visión de alto rendimiento en tres modelos: **D435i, D405 y D405CB**. Análisis facial, realidad aumentada, seguimiento de objetos y escaneo 3D, optimizada para desarrollo de IA corporizada.

**Características clave**:

- Tres modelos para distancias y precisiones variadas
- Imagen de profundidad de alta precisión, RGB e IR (D435i con datos IMU)
- Optimizada para IA corporizada: navegación autónoma, reconocimiento de objetos, interacción
- Compatible **XLeRobot** y **SO-ARM101** (opcional), plug-and-play

## Comparación de modelos

| Modelo | Distancia | Uso |
|------|---------|---------|
| **D435i** | Media/larga | Navegación de robots móviles, reconstrucción 3D |
| **D405** | Cerca, alta precisión | Agarre robótico, reconocimiento cercano |
| **D405CB** | Cerca (D405 reforzado) | Entornos complejos, poca luz, mayor precisión |

## Especificaciones

| Categoría | Especificación |
|------|------|
| Modelos | D435i / D405 / D405CB |
| Funciones | Análisis facial, AR, seguimiento de objetos, escaneo 3D, IA corporizada |
| Plataformas | XLeRobot / SO-ARM101 (opcional) |
| Salida | Profundidad, RGB, IR, IMU (D435i) |
| Uso | Robótica, investigación IA, reconstrucción 3D, industria, AR/VR |

## Inicio rápido

### 1. Instalar el controlador
```bash
# Ubuntu 22.04 (X86 / Jetson)
pip install pyrealsense2
```
### 2. Verificar el dispositivo
```bash
rs-enumerate-devices
```
Debe aparecer la cámara RealSense conectada y su modelo.

### 3. Ejemplo básico
```python
import pyrealsense2 as rs
import numpy as np
import cv2

# Crear la tubería
pipeline = rs.pipeline()
config = rs.config()
config.enable_stream(rs.stream.depth, 640, 480, rs.format.z16, 30)
config.enable_stream(rs.stream.color, 640, 480, rs.format.bgr8, 30)

# Iniciar
pipeline.start(config)

try:
    while True:
        frames = pipeline.wait_for_frames()
        depth = frames.get_depth_frame()
        color = frames.get_color_frame()
        if not depth or not color:
            continue
        depth_image = np.asanyarray(depth.get_data())
        color_image = np.asanyarray(color.get_data())
        cv2.imshow('Color', color_image)
        cv2.imshow('Depth', depth_image * 80)  # Visualización de profundidad
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
finally:
    pipeline.stop()
    cv2.destroyAllWindows()
```
### 4. Integración LeRobot

En proyectos SO-ARM101 / XLeRobot:
```bash
# Buscar el ID de la cámara
python -m lerobot.find_cameras realsense

# Activar RealSense durante la teleoperación
lerobot-teleoperate \
  --robot.cameras='{ front: {type: realsense} }' \
  ...
```
## Casos de uso

| Escenario | Descripción |
|------|------|
| **Análisis facial** | Reconocimiento, expresiones, atributos |
| **Realidad aumentada** | Superposición AR, localización espacial, registro 3D |
| **Seguimiento de objetos** | Detección, seguimiento, conteo |
| **Escaneo 3D** | Reconstrucción 3D, medición de volumen, control dimensional |
| **IA corporizada** | Percepción, evitación de obstáculos, interacción |

## Preguntas frecuentes

**P: ¿Qué modelo elegir?**
Navegación móvil/reconstrucción → D435i; agarre/cerca → D405; poca luz → D405CB.

**P: ¿Soporta Jetson?**
Sí. pyrealsense2 se instala directamente, compatible con el flujo LeRobot de los tutoriales SO-ARM101.

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Comentarios](https://github.com/Juxi-Technology/wiki-documents/issues)
