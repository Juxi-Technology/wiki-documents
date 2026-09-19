---
title: Accesorios robóticos
description: "Inicio de tutoriales de accesorios de Juxi Technology — KWS voz, ESP32-NanoCam, servos Feetech, cámaras, tarjetas de sonido"
---

# Accesorios robóticos

¡Bienvenidos a los tutoriales de accesorios! Guías de uso para accesorios y periféricos robóticos.

---

## Lista de productos

- [Cámara USB con enfoque automático](./usb-auto-focus-camera.md)
- [Cámara CSI Jetson](./jetson-csi-camera.md)

- [Cardán 2-DOF](./2dof-camera-gimbal.md)

- [Sensor de frecuencia cardíaca y SpO2](./heart-rate-spo2.md)

### Módulo de reconocimiento de voz KWS

Tarjeta de sonido de activación IA — activación por voz sin conexión, palabras de activación personalizadas, bajo consumo.

- [Inicio del módulo KWS](./KWS-speech-recognition-module/index.md)
- [Comunicación serie Jetson Nano](./KWS-speech-recognition-module/Jetson-Nano-serial-communication.md)
- [Comunicación serie Jetson](./KWS-speech-recognition-module/Jetson-serial-communication.md)
- [Comunicación serie PC](./KWS-speech-recognition-module/PC-serial-communication.md)
- [Visualización ROS2 RViz2](./KWS-speech-recognition-module/ROS2-rviz2-visualization.md)
- [Grabación de firmware chino/inglés](./KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words.md)
- [Comunicación serie Raspberry Pi](./KWS-speech-recognition-module/raspberry-pi-serial-communication.md)

### Módulo de transmisión de vídeo ESP32-NanoCam

Módulo de transmisión de vídeo y visión IA ESP32-S3, compatible con 8 modos de IA, transmisión en modo dual AP+STA e interacción por voz.

- [Inicio rápido](./esp32-nanocam/ESP32-NanoCam-Quick-Start.md)
- [Especificaciones de hardware](./esp32-nanocam/ESP32-NanoCam-Hardware-Spec.md)
- [Manual del protocolo serie](./esp32-nanocam/ESP32-NanoCam-Serial-Protocol.md)
- [Tutorial de visión IA, capítulo 1: configuración del entorno](./esp32-nanocam/Ch01-Environment-Setup.md)

#### Tutorial de visión IA (11 capítulos)
- [Capítulo 3: Fundamentos de la cámara](./esp32-nanocam/Ch03-Camera-Basics.md)
- [Capítulo 4: Detección de rostros](./esp32-nanocam/Ch04-Face-Detection.md)
- [Capítulo 5: Detección de caras de gatos](./esp32-nanocam/Ch05-Cat-Face-Detection.md)
- [Capítulo 6: Reconocimiento de colores](./esp32-nanocam/Ch06-Color-Recognition.md)
- [Capítulo 7: Escaneo de códigos QR](./esp32-nanocam/Ch07-QR-Code-Scanning.md)
- [Capítulo 8: Reconocimiento facial](./esp32-nanocam/Ch08-Face-Recognition.md)
- [Capítulo 9: Conversación de voz](./esp32-nanocam/Ch09-Voice-Chat.md)
- [Capítulo 10: Comprensión visual con IA](./esp32-nanocam/Ch10-AI-Vision-Understanding.md)
- [Capítulo 11: Control por voz ESP-Claw](./esp32-nanocam/Ch11-ESP-Claw-Voice-Control.md)

### Tutoriales de cámara CSI

Guías completas para cámaras CSI de Jetson/Raspberry Pi, cámaras con autofoco, JetCam y Jupyter Lab.

- [Configuración de cámara CSI en Jetson](./csi-camera/01-Jetson-CSI-Setup.md)
- [Uso de la cámara con autofoco](./csi-camera/02-Auto-Focus-Camera.md)
- [Uso de Jupyter Lab](./csi-camera/03-JupyterLab.md)
- [Uso de JetCam](./csi-camera/04-JetCam.md)
- [IMX219 en Raspberry Pi](./csi-camera/05-IMX219-RaspberryPi.md)

### Módulo de interacción de voz IA

Tutoriales del módulo de voz offline CI1302: inicio rápido, grabación de firmware, edición de palabra de activación, protocolos y comunicación multiplaca (serie + IIC).

- [Inicio rápido](./ai-voice-module/Quick-Start.md)
- [Información del producto](./ai-voice-module/Product-Info.md)
- [Grabación de firmware](./ai-voice-module/Firmware-Flashing.md)
- [Editar palabra de activación y comandos](./ai-voice-module/Wake-Word-Commands-Edit.md)
- [Entradas de protocolo personalizadas](./ai-voice-module/Custom-Protocol-Entries.md)
- [Interacción de voz ROS1](./ai-voice-module/ROS1-Voice-Interaction.md)
- [Interacción de voz ROS2](./ai-voice-module/ROS2-Voice-Interaction.md)
- [Protocolo serie](./ai-voice-module/Serial-Protocol.md)
- [Protocolo IIC](./ai-voice-module/IIC-Protocol.md)
- [Comunicación PC](./ai-voice-module/PC-Communication.md)
- [Arduino: Serie](./ai-voice-module/Arduino-Serial-Communication.md)
- [Arduino: IIC](./ai-voice-module/Arduino-IIC-Communication.md)
- [Jetson: Serie](./ai-voice-module/Jetson-Serial-Communication.md)
- [Jetson: IIC](./ai-voice-module/Jetson-IIC-Communication.md)
- [RDK: Serie](./ai-voice-module/RDK-Serial-Communication.md)
- [RDK: IIC](./ai-voice-module/RDK-IIC-Communication.md)
- [Raspberry Pi: Serie](./ai-voice-module/RaspberryPi-Serial-Communication.md)
- [Raspberry Pi: IIC](./ai-voice-module/RaspberryPi-IIC-Communication.md)

### Otros accesorios

- [Tutorial de pantalla OLED 0.91"](./0.91-oled-screen-tutorial.md)
- [Tutorial de captura HDMI 4K](./4k-hdmi-capture-tutorial.md)
- [Tutorial del conmutador KVM](./kvm-switch-tutorial.md)
- [Tutorial de tarjeta de sonido USB](./usb-audio-card-tutorial.md)

---

#### Servos Feetech
- [Tutorial de depuración STS3215 & SCS0009](./feetech/Feetech-STS3215&SCS0009-Tutorial.md)
- [Protocolo de comunicación SCS](./feetech/Feetech-SCS_Communication_Protocol.md)
- [Tabla de memoria del servo STS con encoder magnético](./feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis.md)
- [Tabla de memoria del servo SCSCL con potenciómetro](./feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis.md)
- [Tutorial de uso de la herramienta de depuración del servo SCS0009](./feetech/SCS0009-Debug-Tool.md)

## Soporte

Si tiene preguntas, contáctenos:

- 📧 Correo: support@juxitech.com
- 💬 GitHub Issues: [Comentarios](https://github.com/Juxi-Technology/wiki-documents/issues)
