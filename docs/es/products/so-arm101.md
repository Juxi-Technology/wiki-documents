---
title: Kit desarrollador SO-ARM101
description: Brazo doble 6-DOF open source, ecosistema LeRobot, teleoperación
keywords: [so-arm101]
---

# Kit desarrollador SO-ARM101

> **[Comprar en tienda](https://www.juxitech.com/es/products/so-arm101-developers-kit)**

## Resumen

Kit de desarrollo de brazo doble 6-DOF profundamente integrado con LeRobot. Teleoperación leader-follower, recolección de datos para aprendizaje por imitación.

## Especificaciones

| カテゴリ | 仕様 |
|------|------|
| Tipo | Robot teleoperado de brazo doble |
| DOF | 6 DOF por brazo |
| Accionamiento | Servos de bus Feetech |
| Host | PC (Linux) / Jetson |
| Ecosistema | LeRobot, ROS 2 |

## Inicio rápido

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

---

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio web: [www.juxitech.com](https://www.juxitech.com)
