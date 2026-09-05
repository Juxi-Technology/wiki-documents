---
title: Kit de visión de brazo robótico SO-ARM101
category: robot
description: Kit de visión SO-ARM101 de Juxi Technology — montaje muñeca/lateral/cenital, cámara 60FPS fija o 30FPS autofoco zoom, compatible ACT/Smolvla/Pi0/GR00T
keywords: [kit de visión, soporte de cámara, so-arm101, visión robótica]
---

# Kit de visión de brazo robótico SO-ARM101

> **[Comprar en la tienda](https://www.juxitech.com/es/products/so-arm101-wrist-camera-mount)**

## Descripción general

El kit de visión SO-ARM101 es un accesorio de cámara diseñado para brazos robóticos, con dos opciones: **60FPS de focal fija** y **30FPS autofoco zoom**. Compatible con SO-ARM101, LeKiwi y XLerobot, y con los frameworks de IA corporizada **ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5**.

**Características clave**:

- Tres posiciones de montaje: **muñeca / lateral / cenital**
- Cámara dual: 60FPS fija (movimiento rápido) / 30FPS autofoco zoom (visión flexible)
- Compatible con SO-ARM101 sin modificaciones
- Almohadillas antideslizantes incluidas

## Especificaciones

| Categoría | Especificación |
|------|------|
| Plataformas | SO-ARM101, LeKiwi, XLerobot, compatibles con orificios M3 |
| Montaje | Muñeca / lateral / cenital |
| Cámara | 60FPS fija / 30FPS autofoco zoom |
| Frameworks | ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5 |

## Comparación de cámaras

| Cámara | Uso |
|------|---------|
| **60FPS fija** | Alta cadencia, imagen estable, movimiento rápido, distancia fija |
| **30FPS autofoco zoom** | Enfoque flexible, distancia variable |

## Inicio rápido

### 1. Elegir posición

- **Muñeca**: perspectiva de agarre (recomendada)
- **Lateral**: perspectiva global
- **Cenital**: perspectiva de escritorio (ideal para recolección)

### 2. Montaje

Fijar el módulo de cámara al soporte y conectar por USB al host (Jetson/Raspberry Pi).

### 3. Integración de frameworks

Ejemplo de recolección LeRobot:

```bash
# 查找相机
python -m lerobot.find_cameras

# 采集带视觉数据
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0, width: 640, height: 480} }' \
  --dataset.repo_id=juxi/vision_test \
  --dataset.num_episodes=50
```
## Preguntas frecuentes

**P: ¿Qué cámara elegir?**
Movimiento rápido (agarre): 60FPS fija; distancia variable: 30FPS autofoco zoom.

**P: ¿Qué frameworks soporta?**
ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5 — los principales frameworks de IA corporizada.

**P: ¿Otros brazos robóticos?**
SO-ARM101, LeKiwi, XLerobot y plataformas compatibles M3.

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Comentarios](https://github.com/Juxi-Technology/wiki-documents/issues)
