---
title: Preguntas frecuentes (FAQ)
description: FAQ de productos Juxi Technology — brazos robóticos, sensores, accesorios
keywords: [faq, solución de problemas]
---

# Preguntas frecuentes (FAQ)

Preguntas frecuentes por categoría de producto.

---

## Brazos robóticos · SO-ARM101

**Q: ¿El puerto no se detecta?**

**A:** Comprobar con `lerobot-find-port`. Revisar las conexiones USB. En Linux: `sudo chmod 666 /dev/ttyACM*`.

**Q: Error `Could not connect on port "/dev/ttyACM0"`?**

**A:** Verificar que `/dev/ttyACM*` existe y que los permisos son correctos, y reintentar.

**Q: `Magnitude 30841 exceeds 2047` durante la calibración?**

**A:** Apagar y encender el brazo robótico y volver a calibrar.

**Q: Error de servo `ConnectionError: Failed to sync read 'Present_Position' on ids=[1,...,6]`?**

**A:** Comprobar que el brazo de ese puerto tiene alimentación y que los servos de bus están bien conectados.

**Q: `Motor 'gripper' was not found`?**

**A:** Revisar los cables de comunicación de los servos y la tensión de alimentación.

**Q: ¿GPU no disponible con PyTorch?**

**A:** Ver [Incompatibilidades de PyTorch en Jetson Orin](/es/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

---

## Sensores · IMU

**Q: ¿Los datos del IMU derivan?**

**A:** Ejecutar primero la [calibración completa](/es/tutorials/sensors/imu/calibration); confirmar que el módulo está bien fijado; añadir calibración de temperatura ante cambios térmicos grandes.

**Q: ¿Valores del magnetómetro incorrectos?**

**A:** Ejecutar la calibración del magnetómetro — girar lentamente por todas las orientaciones, lejos de motores e imanes.

**Q: ¿Sin datos en los topics ROS?**

**A:** Revisar los permisos serie (`sudo chmod 666 /dev/ttyUSB*`) y los parámetros de puerto en tu archivo launch.

---

## Accesorios · Reconocimiento de voz KWS

**Q: ¿El módulo de voz no responde?**

**A:** Confirmar que el firmware de fábrica está grabado. Ver [descarga de firmware](/es/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words).

**Q: ¿Sin datos por comunicación serie?**

**A:** Verificar que la velocidad en baudios coincide con el tutorial y que el cableado es correcto (RX/TX cruzados).

---

## Accesorios · Sensor de frecuencia cardíaca y SpO2

**Q: ¿Falla la inicialización (init fail)?**

**A:** Revisar el cableado: dirección I2C por defecto 0x57; UART a 9600 baudios.

**Q: ¿Lecturas inestables?**

**A:** Asegurar un buen contacto sensor-piel; mantener el dedo quieto.

---

## Accesorios · Cámaras USB / CSI

**Q: ¿Cámara no detectada?**

**A:** Revisar cable y puertos USB; ejecutar `ls /dev/video*` y `v4l2-ctl --list-devices`.

**Q: ¿Cámara CSI no reconocida?**

**A:** Revisar la orientación del cable plano (contactos metálicos hacia la placa), conectar **con el equipo apagado**; verificar JetPack ≥ 5.0.

**Q: ¿Error de pipeline GStreamer?**

**A:** Confirmar JetPack ≥ 5.0; revisar `apt list --installed | grep nvarguscamerasrc`.

---

## Accesorios · Otros

**Q: ¿La capturadora HDMI 4K muestra pantalla negra?**

**A:** Verificar el tipo de interfaz HDMI (HDMI/Micro HDMI/adaptador DP) y usar el conversor adecuado.

**Q: ¿La pantalla OLED no se enciende?**

**A:** Revisar el cableado I2C (SCL/SDA); un cortocircuito de pines puede dañar la placa host.

**Q: ¿Tarjeta de sonido USB no detectada?**

**A:** Dispositivo plug-and-play; verificar la alimentación USB; cambiar el dispositivo de salida de audio predeterminado.

**Q: ¿Los servos del cardán 2-DOF no responden?**

**A:** Revisar la alimentación de los servos (los servos SCS necesitan 6–8,4 V externos).

---

## General

**Q: ¿Los enlaces de Feishu de los tutoriales no se abren?**

**A:** Los documentos de Feishu son solo para personal interno/colaboradores. Usa este wiki o contacta con support@juxitech.com.

**Q: ¿Qué plataformas son compatibles?**

**A:** PC (Linux/Windows), Jetson, Raspberry Pi — consulta los «requisitos del sistema» en cada tutorial.

**Q: ¿Cómo obtener soporte?**
**A:**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)

---

## Enlaces relacionados

- [Guía de selección de brazos robóticos](/es/tutorials/robot-arms/select-guide)
- [Centro de descargas](/es/downloads/)
- [Casos de éxito de usuarios](/es/cases/)
