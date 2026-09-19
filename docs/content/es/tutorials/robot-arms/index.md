---
title: Serie de brazos robóticos
description: "Inicio de tutoriales de brazos robóticos de Juxi Technology — SO-ARM101, AmazingHand, Lekiwi, XLeRobot"
---

# Serie de brazos robóticos

¡Bienvenidos a los tutoriales de la serie de brazos robóticos! Guías completas para brazos robóticos open source y manos diestras.

---

## Lista de productos

- [Guía de selección](./select-guide.md)

### SO-ARM101

Brazo robótico de escritorio open source de 6 ejes, compatible con frameworks de IA como LeRobot.

- [Tutorial SO-ARM101](./so-arm101/SO-ARM101-Tutorial.md)
- [Montaje SO-ARM101](./so-arm101/SO-ARM101-Assembly.md)
- [Compatibilidad PyTorch Jetson Orin SO-ARM101](./so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility.md)
- [Teleoperación inalámbrica SO-ARM101 (versión ESP32-NanoCam)](./so-arm101/SO-ARM101-NanoCam-Wireless-Teleop.md)
- [Tutorial de doble brazo (doble brazo seguidor) del SO-ARM101](./so-arm101/SO-ARM101-Bi-Arm-Tutorial.md)
- [Tutorial de conversión a 7-DOF del SO-ARM101 y uso con LeRobot](./so-arm101/SO-ARM101-7DOF-LeRobot.md)
- [Herramienta de calibración de servos de la serie SoARM](./so-arm101/SO-ARM101-Servo-Calibration-Tool.md)

#### Serie SO-ARM101
- [Soporte de brazo y kit de cámara ambiental SO-ARM100&101 – Tutorial de instalación](./so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation.md)
- [Instalación del soporte de cámara superior](./so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation.md)

#### 1. Instalar LeRobot
- [Paso 1: Instalar el entorno de LeRobot (Ubuntu)](./so-arm101/lerobot/01-Environment-Setup/Ubuntu.md)
- [Paso 1: Instalar el entorno de LeRobot (Windows)](./so-arm101/lerobot/01-Environment-Setup/Windows.md)
- [Paso 1: Instalar el entorno de LeRobot (macOS)](./so-arm101/lerobot/01-Environment-Setup/MacOS.md)

#### 2. Puerto serie
- [Paso 2: Ver el puerto del dispositivo serie (Ubuntu)](./so-arm101/lerobot/02-Serial-Port/Ubuntu.md)
- [Paso 2: Ver el puerto del dispositivo serie (Windows)](./so-arm101/lerobot/02-Serial-Port/Windows.md)
- [Paso 2: Ver el puerto del dispositivo serie (macOS)](./so-arm101/lerobot/02-Serial-Port/MacOS.md)

#### 3. Calibración
- [Paso 3: Calibrar el brazo robótico (Ubuntu)](./so-arm101/lerobot/03-Calibration/Ubuntu.md)
- [Paso 3: Calibrar el brazo robótico (Windows)](./so-arm101/lerobot/03-Calibration/Windows.md)
- [Paso 3: Calibrar el brazo robótico (macOS)](./so-arm101/lerobot/03-Calibration/MacOS.md)

#### 4. Teleoperación
- [Paso 4: Teleoperación (Ubuntu)](./so-arm101/lerobot/04-Teleoperation/Ubuntu.md)
- [Paso 4: Teleoperación (Windows)](./so-arm101/lerobot/04-Teleoperation/Windows.md)
- [Paso 4: Teleoperación (macOS)](./so-arm101/lerobot/04-Teleoperation/MacOS.md)

#### 5. Cámara y teleop.
- [Paso 5: Teleoperación con cámara (Ubuntu)](./so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu.md)
- [Paso 5: Teleoperación con cámara (Windows)](./so-arm101/lerobot/05-Camera-Teleoperation/Windows.md)
- [Paso 5: Teleoperación con cámara (macOS)](./so-arm101/lerobot/05-Camera-Teleoperation/MacOS.md)

#### 6. Conjunto de datos
- [Paso 6: Recopilación de datos por enseñanza](./so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording.md)
- [Paso 6: Notas de la recopilación de datos](./so-arm101/lerobot/06-Data-Collection/Collection-Notes.md)
- [Paso 6: Cuenta de Hugging Face (opcional)](./so-arm101/lerobot/06-Data-Collection/HF-Account.md)
- [Paso 6: Subir el conjunto de datos (opcional)](./so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload.md)

#### 7. Entrenamiento
- [Paso 7: Entrenamiento local en Ubuntu](./so-arm101/lerobot/07-Training/Local-Ubuntu.md)
- [Paso 7: Entorno de entrenamiento con GPU en la nube](./so-arm101/lerobot/07-Training/Cloud-GPU.md)
- [Paso 7: Curvas de entrenamiento con wandb](./so-arm101/lerobot/07-Training/WandB-Curves.md)
- [Paso 7: Subir el modelo (opcional)](./so-arm101/lerobot/07-Training/HF-Model-Upload.md)
- [Paso 7: Obtener los pesos del modelo](./so-arm101/lerobot/07-Training/Model-Weights.md)
- [Paso 7: Comando de entrenamiento ACT](./so-arm101/lerobot/07-Training/Command-ACT.md)
- [Paso 7: Comando de entrenamiento pi0](./so-arm101/lerobot/07-Training/Command-pi0.md)
- [Paso 7: Comando de entrenamiento pi0.5](./so-arm101/lerobot/07-Training/Command-pi0.5.md)
- [Paso 7: Comando de entrenamiento pi0fast](./so-arm101/lerobot/07-Training/Command-pi0fast.md)
- [Paso 7: Comando de entrenamiento smolvla](./so-arm101/lerobot/07-Training/Command-smolvla.md)

#### 8. Inferencia
- [Paso 8: Descripción de la línea de comandos](./so-arm101/lerobot/08-Inference/CLI-Reference.md)
- [Paso 8: Bugs comunes y soluciones](./so-arm101/lerobot/08-Inference/Common-Bugs.md)
- [Paso 8: Comando de despliegue ACT](./so-arm101/lerobot/08-Inference/Command-ACT.md)
- [Paso 8: Comando de despliegue pi0](./so-arm101/lerobot/08-Inference/Command-pi0.md)
- [Paso 8: Comando de despliegue pi0.5](./so-arm101/lerobot/08-Inference/Command-pi0.5.md)
- [Paso 8: Comando de despliegue smolvla](./so-arm101/lerobot/08-Inference/Command-smolvla.md)

#### Conceptos básicos
- [Conocer LeRobot y la inteligencia encarnada](./so-arm101/basics/Understanding-LeRobot.md)
- [Conjuntos de datos de LeRobot en HuggingFace](./so-arm101/basics/HF-Datasets.md)
- [Materiales para el entrenamiento de modelos](./so-arm101/basics/Training-Resources.md)
- [Archivos oficiales de impresión 3D del SO-ARM 100](./so-arm101/basics/Official-3D-Print-Files.md)
- [Archivos URDF y referencias de materiales](./so-arm101/basics/URDF-Reference.md)

#### Extras y avanzado
- [Control de simulación en ROS2](./so-arm101/ROS2-Simulation-Control.md)
- [Instalación de la pinza de dedos paralelos](./so-arm101/Parallel-Finger-Gripper-Installation.md)

### AmazingHand

Mano diestra open source con manipulación multi-dedo de alta precisión.

- [Control de interfaz AmazingHand](./amazing-hand/AmazingHand-Interface-Control.md)
- [Ejemplo oficial AmazingHand](./amazing-hand/AmazingHand-Official-Example.md)
- [Depuración TTL AmazingHand](./amazing-hand/AmazingHand-TTL-Debugging.md)

#### AmazingHand
- [Material de producto de la mano diestra AmazingHand](./amazing-hand/product-info.md)

#### Depuración servo PWM
- [01-Control visual por GUI](./amazing-hand/pwm-debugging/01-GUI-Visual-Control.md)
- [02-Tutorial de seguimiento de gestos](./amazing-hand/pwm-debugging/02-Gesture-Tracking.md)
- [03-Versión con servos PWM - Manual de uso](./amazing-hand/pwm-debugging/03-PWM-Servo-Manual.md)
- [04-Versión con servos de puerto serie - Instrucciones de uso](./amazing-hand/pwm-debugging/04-Serial-Servo-Guide.md)

#### Seguimiento de gestos
- [Despliegue y ejecución en Linux (Ubuntu) en un clic](./amazing-hand/gesture-tracking/01-Ubuntu.md)
- [Despliegue y ejecución en Windows en un clic](./amazing-hand/gesture-tracking/02-Windows.md)
- [Despliegue y ejecución en Mac en un clic](./amazing-hand/gesture-tracking/03-macOS.md)

### Lekiwi

Robot móvil totalmente open source, compatible con LeRobot imitation learning y brazo SO101.

- [Tutorial Lekiwi](./lekiwi/Lekiwi-Tutorial.md)
- [Montaje Lekiwi](./lekiwi/Lekiwi-Assembly.md)

### Curso SO-ARM101 + AmazingHand

Flujo completo SO-ARM101 + AmazingHand: configuración, calibración, teleoperación, recolección de datos, entrenamiento y despliegue (Windows / Linux).

- [Resumen del curso](./so-arm-amazinghand/index.md)
- [Etapa 1: configuración del entorno (Linux)](./so-arm-amazinghand/01-Environment-Setup-Linux.md)
- [Etapa 1: configuración del entorno (Windows)](./so-arm-amazinghand/01-Environment-Setup-Windows.md)
- [Etapa 2: calibración de mano y brazos (Linux)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Linux.md)
- [Etapa 2: calibración de mano y brazos (Windows)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Windows.md)
- [Etapa 3: teleoperación (Linux)](./so-arm-amazinghand/03-Teleoperation-Linux.md)
- [Etapa 3: teleoperación (Windows)](./so-arm-amazinghand/03-Teleoperation-Windows.md)
- [Etapa 4: recolección de datos (Linux)](./so-arm-amazinghand/04-Data-Collection-Linux.md)
- [Etapa 4: recolección de datos (Windows)](./so-arm-amazinghand/04-Data-Collection-Windows.md)
- [Etapa 5: entrenamiento del modelo (Linux)](./so-arm-amazinghand/05-Model-Training-Linux.md)
- [Etapa 5: entrenamiento del modelo (Windows)](./so-arm-amazinghand/05-Model-Training-Windows.md)
- [Etapa 6: despliegue del modelo (Linux)](./so-arm-amazinghand/06-Model-Deployment-Linux.md)
- [Etapa 6: despliegue del modelo (Windows)](./so-arm-amazinghand/06-Model-Deployment-Windows.md)

### Tutoriales de XLeRobot

Tutoriales de XLeRobot: configuración, despliegue de archivos y montaje (kit ensamblado/piezas).

- [Resumen de tutoriales](./xlerobot/index.md)
- [Configuración (macOS)](./xlerobot/01-Environment-Setup-macOS.md)
- [Configuración (Ubuntu)](./xlerobot/01-Environment-Setup-Ubuntu.md)
- [Configuración (Windows)](./xlerobot/01-Environment-Setup-Windows.md)
- [Mover archivos de XLeRobot](./xlerobot/02-Move-Xlerobot-Files.md)
- [Montaje del kit ensamblado](./xlerobot/03-Assembly-Assembled-Kit.md)
- [Montaje del kit de piezas](./xlerobot/04-Assembly-Parts-Kit.md)

---

## Soporte

Si tiene preguntas, contáctenos:

- 📧 Correo: support@juxitech.com
- 💬 GitHub Issues: [Comentarios](https://github.com/Juxi-Technology/wiki-documents/issues)
