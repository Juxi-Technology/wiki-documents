---
title: Kit de desarrollo SO-ARM101
description: Kit de robótica de doble brazo open source de Juxi Technology — brazos de 6 DOF, ecosistema LeRobot, teleoperación/aprendizaje por imitación
keywords: [so-arm101, brazo robótico, leRobot, teleoperación, doble brazo]
---

# Kit de desarrollo SO-ARM101

> **[Comprar en la tienda](https://www.juxitech.com/es/products/so-arm101-developers-kit)**

## Descripción general

El SO-ARM101 es el kit de desarrollo robótico de doble brazo 6-DOF open source de Juxi Technology, profundamente integrado con el ecosistema **LeRobot**. Brazo líder negro + brazo seguidor blanco, listo para teleoperación, recolección de datos de aprendizaje por imitación y entrenamiento de políticas.

**Características clave**:

- Dos brazos, 6 DOF cada uno, servos de bus
- Integración profunda con LeRobot (HuggingFace) — políticas ACT/Diffusion/Pi0
- Soporte Jetson / PC (Linux)
- Hardware totalmente de código abierto (esquemas/CAD/firmware)

## Especificaciones

| Categoría | Especificación |
|------|------|
| Tipo | Robot de teleoperación de doble brazo |
| DOF | 6 DOF por brazo |
| Accionamiento | Servos de bus Feetech |
| Host | PC (Linux) / Jetson |
| Ecosistema | LeRobot, ROS 2, ROS 1 |
| Alimentación | Líder 5V6A / Seguidor 12V5A |
| Carga útil | 500g |
| Repetibilidad | ±0.1mm |
| Radio de trabajo | 520mm |
| Comunicación | USB-C |

## Inicio rápido

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## Tutoriales

- [Tutorial SO-ARM101](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Montaje SO-ARM101](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Guía de selección de brazos robóticos](/es/tutorials/robot-arms/select-guide)
- [Introducción a la IA corporizada (LeRobot)](/es/topics/embodied-ai-intro)

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
