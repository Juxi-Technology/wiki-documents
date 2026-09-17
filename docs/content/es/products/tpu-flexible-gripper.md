---
title: Pinza flexible TPU SO-ARM101
category: robot
description: "Pinza flexible TPU SO-ARM101 de Juxi Technology — agarre seguro de objetos irregulares/frágiles, cámara en brazo, zoom 30FPS o fija 60FPS"
keywords: [pinza, tpu, flexible, so-arm101, agarre]
---

# Pinza flexible TPU SO-ARM101

> **[Comprar en la tienda](https://www.juxitech.com/es/products/so-arm101-tpu-flexible-gripper)**

## Descripción general

Esta pinza flexible TPU SO-ARM101 está diseñada para el brazo XLerobot y acepta el soporte/kit de cámara de brazo SO-ARM101. El **TPU blando** agarra objetos irregulares y frágiles sin dañarlos. Con cámara opcional (zoom 30FPS / fija 60FPS) para desarrollo de agarre y visión guiada.

**Características clave**:

- Montaje directo en el brazo XLerobot, sin modificaciones
- TPU blando: flexible, resistente a la abrasión, antideslizante
- Compatible soporte/kit de cámara SO-ARM101 (agarre guiado)
- Fijación por tornillos, plug-and-play, sin cableado complejo

## Especificaciones

| Categoría | Especificación |
|------|------|
| Brazo compatible | SO-ARM101 (serie XLerobot) |
| Material | TPU blando (flexible, resistente, antideslizante) |
| Accionamiento | Servo |
| Cámara opcional | Zoom 30FPS / fija 60FPS |
| Montaje | Tornillos directos, plug-and-play |

## Contenido del kit

| Kit | Contenido |
|------|------|
| **Pinza básica** | 1× pinza flexible TPU |
| **Kit cámara zoom** | Pinza + cámara zoom autofoco 30FPS |
| **Kit cámara fija** | Pinza + cámara fija 60FPS |

## Inicio rápido

1. Alinear los orificios de tornillo con el efector del brazo
2. Fijación por tornillos (sin cambiar el cableado)
3. Añadir el soporte de cámara SO-ARM101 para visión guiada

### Agarre guiado por visión

Con cámara de brazo y LeRobot:

```bash
# 录制视觉抓取数据
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0} }' \
  --dataset.repo_id=juxi/gripper_test \
  --dataset.num_episodes=50
```
## Preguntas frecuentes

**P: ¿Por qué también agarra objetos irregulares/frágiles?**
El TPU blando se adapta a la forma del objeto y reparte la fuerza — sin daños.

**P: ¿Qué cámara elegir?**
Zoom 30FPS: enfoque flexible; fija 60FPS: alta cadencia.

**P: ¿Qué plataformas?**
Serie SO-ARM101 / XLerobot, compatible con ACT, Smolvla, Pi0, etc.

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Comentarios](https://github.com/Juxi-Technology/wiki-documents/issues)
