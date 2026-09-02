---
title: Preguntas frecuentes (FAQ)
description: FAQ de productos Juxi Technology — brazos robóticos, sensores, accesorios
keywords: [faq, solución de problemas]
---

# Preguntas frecuentes (FAQ)

Preguntas frecuentes por categoría de producto.

## Brazos robóticos · SO-ARM101

**Q: ¿El puerto no se detecta?**

**A:** Comprobar con `lerobot-find-port`. En Linux: `sudo chmod 666 /dev/ttyACM*`.

**Q: Error `Could not connect on port "/dev/ttyACM0"`?**

**A:** Verificar que `/dev/ttyACM*` existe y los permisos son correctos.

## Sensores · IMU

**Q: ¿Los datos del IMU derivan?**

**A:** Ejecutar la [calibración](/es/tutorials/sensors/imu/calibration). Verificar la fijación.

## Accesorios · KWS

**Q: ¿El módulo de voz no responde?**

**A:** Verificar el flasheo del firmware. Ver [descarga de firmware](/es/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words).

## General

**Q: ¿Cómo obtener soporte?**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)