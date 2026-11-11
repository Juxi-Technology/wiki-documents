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

- [Tutoriales del brazo robótico SO-ARM101](./so-arm101/index.md)
- [Tutorial SO-ARM101](./so-arm101/SO-ARM101-Tutorial.md)
- [Montaje SO-ARM101](./so-arm101/SO-ARM101-Assembly.md)
- [Compatibilidad PyTorch Jetson Orin SO-ARM101](./so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility.md)
- [Teleoperación inalámbrica SO-ARM101 (versión ESP32-NanoCam)](./so-arm101/SO-ARM101-NanoCam-Wireless-Teleop.md)
- [Tutorial de doble brazo (doble brazo seguidor) del SO-ARM101](./so-arm101/SO-ARM101-Bi-Arm-Tutorial.md)
- [Herramienta de calibración de servos de la serie SoARM](./so-arm101/SO-ARM101-Servo-Calibration-Tool.md)
- [Serie So-ARM: calibración de servos STS3215 – versión web](./so-arm101/SO-ARM101-Web-Calibration.md)

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
- [Paso 6: Recopilación por demostración — Handshake 200](./so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording-Handshake-200.md)
- [Paso 6: Ver y reproducir un conjunto de datos](./so-arm101/lerobot/06-Data-Collection/Browse-and-Replay.md)
- [Paso 6: Notas de la recopilación de datos](./so-arm101/lerobot/06-Data-Collection/Collection-Notes.md)
- [Paso 6: Cuenta de Hugging Face (opcional)](./so-arm101/lerobot/06-Data-Collection/HF-Account.md)
- [Paso 6: Subir el conjunto de datos (opcional)](./so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload.md)
- [Paso 7 (simulación): Recopilar un conjunto de datos — teleoperación Lightwheel LeIsaac](./so-arm101/lerobot/06-Data-Collection/LeIsaac-Sim.md)

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
- [Paso 7: Comando de entrenamiento Diffusion](./so-arm101/lerobot/07-Training/Command-Diffusion.md)
- [Paso 7: Comando de entrenamiento WALL-OSS](./so-arm101/lerobot/07-Training/Command-Wall-OSS.md)
- [Paso 7: Línea de comandos de entrenamiento](./so-arm101/lerobot/07-Training/Train-CLI.md)
- [Paso 7: Recomendaciones de parámetros de entrenamiento](./so-arm101/lerobot/07-Training/Training-Parameters.md)
- [Paso 7: Algoritmos de aprendizaje por imitación compatibles con LeRobot](./so-arm101/lerobot/07-Training/Imitation-Learning-Algorithms.md)

#### 8. Inferencia
- [Paso 8: Descripción de la línea de comandos](./so-arm101/lerobot/08-Inference/CLI-Reference.md)
- [Paso 8: Bugs comunes y soluciones](./so-arm101/lerobot/08-Inference/Common-Bugs.md)
- [Paso 8: Comando de despliegue ACT](./so-arm101/lerobot/08-Inference/Command-ACT.md)
- [Paso 8: Comando de despliegue pi0](./so-arm101/lerobot/08-Inference/Command-pi0.md)
- [Paso 8: Comando de despliegue pi0.5](./so-arm101/lerobot/08-Inference/Command-pi0.5.md)
- [Paso 8: Comando de despliegue smolvla](./so-arm101/lerobot/08-Inference/Command-smolvla.md)
- [Paso 8: Comando de despliegue Diffusion](./so-arm101/lerobot/08-Inference/Command-Diffusion.md)
- [Paso 8: Comando de despliegue WALL-OSS](./so-arm101/lerobot/08-Inference/Command-Wall-OSS.md)
- [Paso 8: Inferencia en NVIDIA DGX Spark](./so-arm101/lerobot/08-Inference/DGX-Spark.md)
- [Paso 8: Inferencia en D-Robotics RDK S100](./so-arm101/lerobot/08-Inference/RDK-S100.md)

#### Conceptos básicos
- [Conocer LeRobot y la inteligencia encarnada](./so-arm101/basics/Understanding-LeRobot.md)
- [Conjuntos de datos de LeRobot en HuggingFace](./so-arm101/basics/HF-Datasets.md)
- [Materiales para el entrenamiento de modelos](./so-arm101/basics/Training-Resources.md)
- [Archivos oficiales de impresión 3D del SO-ARM 100](./so-arm101/basics/Official-3D-Print-Files.md)
- [Archivos URDF y referencias de materiales](./so-arm101/basics/URDF-Reference.md)
- [Soportes y monturas de cámara recomendados](./so-arm101/basics/Camera-Mounts-Recommended.md)

#### Extras y avanzado
- [Control de simulación en ROS2](./so-arm101/ROS2-Simulation-Control.md)
- [Instalación de la pinza de dedos paralelos](./so-arm101/Parallel-Finger-Gripper-Installation.md)

#### Tutorial de LeLab
- [1 · Descripción general](./so-arm101/lelab/01-Overview.md)
- [2 · Instalar y ejecutar](./so-arm101/lelab/02-Install.md)
- [3 · Conectar y calibrar](./so-arm101/lelab/03-Calibration.md)
- [4 · Teleoperación](./so-arm101/lelab/04-Teleoperation.md)
- [5 · Grabar un dataset](./so-arm101/lelab/05-Record-Dataset.md)
- [6 · Entrenar y ejecutar la inferencia](./so-arm101/lelab/06-Train-and-Inference.md)
- [7 · Solución de problemas](./so-arm101/lelab/07-Troubleshooting.md)
,#### Tutorial de simulación MuJoCo,- [SO-ARM101 × MuJoCo tutorial completo (índice)](./so-arm101/mujoco/index.md),- [01 · Preparación del entorno](./so-arm101/mujoco/01-Environment.md),- [02 · Verificación del modelo de simulación (carga y accionamiento de MJCF)](./so-arm101/mujoco/02-Sim-Model-Verification.md),- [03 · Conexión del robot real y calibración](./so-arm101/mujoco/03-Hardware-Calibration.md),- [04 · Teleoperación por teclado](./so-arm101/mujoco/04-Keyboard-Teleop.md),- [05 · Gemelo digital del brazo líder (el brazo físico acciona el brazo simulado)](./so-arm101/mujoco/05-Leader-Digital-Twin.md),- [06 · Grabación y reproducción de datos](./so-arm101/mujoco/06-Record-and-Replay.md),- [07 · Preguntas frecuentes y experiencias](./so-arm101/mujoco/07-Troubleshooting.md),- [08 · Hoja de ruta](./so-arm101/mujoco/08-Roadmap.md),- [09 · Tutorial de uso completo (arrancar el brazo → dataset → ver vídeos → entrenar → desplegar)](./so-arm101/mujoco/09-Usage-Tutorial.md)


### Tutorial del brazo robótico SO-ARM101 de 7 ejes

- [Tutorial del brazo robótico SO-ARM101 de 7 ejes](/tutorials/robot-arms/so-arm101/lerobot-7dof/)
- **1. Instalar LeRobot**
  - [Equipo Ubuntu](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
  - [Equipo Windows](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
  - [Equipo MAC](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)
- **2. Sustituir los archivos (adaptación a 7DOF)**
  - [Sustituir los archivos (adaptación a 7DOF)](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- **3. Puerto serie**
  - [Ubuntu](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
  - [Equipo Windows](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
  - [Equipo MAC](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)
- **4. Calibración**
  - [Equipo Ubuntu](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
  - [Equipo Windows](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
  - [Equipo Mac](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)
- **5. Teleoperación**
  - [Equipo Ubuntu](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
  - [Equipo Windows](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
  - [Equipo Mac](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)
- **6. Cámara y teleop.**
  - [Equipo Ubuntu](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
  - [Equipo Windows](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
  - [Equipo Mac](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)
- **7. Conjunto de datos**
  - [Revisar y reproducir el conjunto de datos](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
  - [Notas de la recopilación del conjunto de datos](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
  - [Cuenta de Hugging Face (opcional)](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
  - [Subir el conjunto de datos a HuggingFace (opcional)](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
  - [Recopilación del conjunto de datos por enseñanza-Apretón de manos 200](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
  - [Recopilación del conjunto de datos por enseñanza](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)
- **8. Entrenamiento**
  - [Configuración del entorno de entrenamiento con GPU en la nube](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
  - [Línea de comandos de entrenamiento-ACT (recomendado para empezar)](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
  - [Línea de comandos de entrenamiento-Diffusion](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
  - [Línea de comandos de entrenamiento-pi0.5](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
  - [Línea de comandos de entrenamiento-pi0 (el de mejores resultados)](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
  - [Línea de comandos de entrenamiento-pi0fast](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
  - [Línea de comandos de entrenamiento-smolvla (recomendado para nivel avanzado)](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
  - [Subir el modelo a HuggingFace (opcional)](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
  - [Algoritmos de aprendizaje por imitación compatibles con LeRobot](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
  - [Entrenamiento local en Ubuntu](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
  - [Obtener el archivo de pesos del modelo](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
  - [Recomendaciones de parámetros de entrenamiento](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
  - [Curvas de entrenamiento en tiempo real con wandb](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)
- **9. Inferencia**
  - [Descripción de la línea de comandos](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
  - [Línea de comandos de inferencia-ACT](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
  - [Línea de comandos de inferencia-Diffusion](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
  - [Línea de comandos de inferencia-pi0.5](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
  - [Línea de comandos de inferencia-pi0](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
  - [Línea de comandos de inferencia-smolvla](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
  - [Bugs comunes y soluciones](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
  - [Inferencia en NVIDIA DGX Spark](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
  - [Inferencia en D-Robotics RDK S100](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)

### Descripción general de los tutoriales de AmazingHand

Punto de entrada unificado a los tutoriales de AmazingHand: selección de producto, cableado de hardware, inicio rápido, control web, aplicación de escritorio, seguimiento de manos, depuración de servos y FAQ para las versiones con servos de bus serie SCS0009 y con servos PWM.

- [Índice del tutorial (incl. URL antiguas)](./amazing-hand/index.md)
- [Descripción general de los tutoriales de AmazingHand](./amazing-hand/README.md)
- [Información del producto AmazingHand](./amazing-hand/00-product/product-info.md)
- [Comparación y selección entre las versiones SCS0009 y PWM](./amazing-hand/00-product/version-comparison.md)
- [Descargas y recursos](./amazing-hand/00-product/downloads.md)
- [Descripción general del hardware: estructura, CAD y montaje](./amazing-hand/01-hardware/overview.md)
- [Cableado, ID y alimentación SCS0009](./amazing-hand/01-hardware/scs0009.md)
- [Cableado, GPIO y alimentación PWM](./amazing-hand/01-hardware/pwm.md)
- [Instalación del kit de cámara de entorno](./amazing-hand/01-hardware/camera-kit.md)
- [Inicio rápido con SCS0009](./amazing-hand/02-quick-start/scs0009.md)
- [Inicio rápido con PWM](./amazing-hand/02-quick-start/pwm.md)
- [Control web de AmazingHand](./amazing-hand/03-web-control/README.md)
- [Control web SCS0009](./amazing-hand/03-web-control/scs0009.md)
- [Control web PWM](./amazing-hand/03-web-control/pwm.md)
- [Aplicación de escritorio SCS0009 (GUI y CLI)](./amazing-hand/04-desktop/scs0009.md)
- [Aplicación de escritorio PWM (GUI Tkinter)](./amazing-hand/04-desktop/pwm.md)
- [Seguimiento de manos SCS0009 (Demo oficial dora)](./amazing-hand/05-hand-tracking/scs0009.md)
- [Seguimiento de manos PWM (MediaPipe integrado en la GUI)](./amazing-hand/05-hand-tracking/pwm.md)
- [Depuración y calibración de servos SCS0009](./amazing-hand/06-servo-tuning/scs0009.md)
- [Protocolo, comandos y calibración de los servos PWM](./amazing-hand/06-servo-tuning/pwm.md)
- [Tutorial de uso de Arduino Nano](./amazing-hand/07-arduino/arduino-nano.md)
- [Ejemplos de Arduino y Python](./amazing-hand/07-arduino/examples.md)
- [Preguntas frecuentes (FAQ)](./amazing-hand/08-faq/faq.md)

### Lekiwi

Robot móvil totalmente open source, compatible con LeRobot imitation learning y brazo SO101.

- [Tutorial Lekiwi](./lekiwi/Lekiwi-Tutorial.md)
- [Montaje Lekiwi](./lekiwi/Lekiwi-Assembly.md)
- [Información del producto](./lekiwi/Lekiwi-Product-Info.md)

### Tutorial del robot auto-enderezante SR-Support

Tutorial completo del dispositivo auto-enderezante SR-Support de 2 GDL, desde los conceptos básicos y la preparación del entorno hasta el flasheo, el montaje, el punto cero, la calibración, el uso del auto-enderezamiento y la resolución de problemas.

- [Tutorial del robot auto-enderezante SR-Support](./sr-support/index.md)
- [01 Conceptos básicos](./sr-support/01-basics.md)
- [02 Preparación del entorno (venv, herramientas de flasheo y firmware)](./sr-support/02-environment.md)
- [03 Flashear el firmware principal](./sr-support/03-build-flash.md)
- [04 Montaje: imprimir, construir, cablear](./sr-support/04-assembly.md)
- [05 Calibración de punto cero (teclas de flecha; obligatorio para montajes DIY)](./sr-support/05-zero-tool.md)
- [06 Depuración y calibración](./sr-support/06-debug-and-calibrate.md)
- [07 Uso y monitorización del auto-enderezamiento](./sr-support/07-self-righting.md)
- [08 Página de estado WiFi y aprovisionamiento](./sr-support/08-wifi.md)
- [09 Simulación MuJoCo y el gemelo en vivo](./sr-support/09-mujoco.md)
- [10 Resolución de problemas](./sr-support/10-troubleshooting.md)
- [11 Referencia: modelo, parámetros y licencias](./sr-support/11-reference.md)

### Curso SO-ARM101 + AmazingHand

Flujo completo SO-ARM101 + AmazingHand: configuración, calibración, teleoperación, recolección de datos, entrenamiento y despliegue (Windows / Linux).

- [Resumen del curso](./so-arm-amazinghand/index.md)

#### Linux

- [Etapa 1: configuración del entorno (Linux)](./so-arm-amazinghand/01-Environment-Setup-Linux.md)
- [Etapa 2: calibración de mano y brazos (Linux)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Linux.md)
- [Etapa 3: teleoperación (Linux)](./so-arm-amazinghand/03-Teleoperation-Linux.md)
- [Etapa 4: recolección de datos (Linux)](./so-arm-amazinghand/04-Data-Collection-Linux.md)
- [Etapa 5: entrenamiento del modelo (Linux)](./so-arm-amazinghand/05-Model-Training-Linux.md)
- [Etapa 6: despliegue del modelo (Linux)](./so-arm-amazinghand/06-Model-Deployment-Linux.md)

#### Windows

- [Etapa 1: configuración del entorno (Windows)](./so-arm-amazinghand/01-Environment-Setup-Windows.md)
- [Etapa 2: calibración de mano y brazos (Windows)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Windows.md)
- [Etapa 3: teleoperación (Windows)](./so-arm-amazinghand/03-Teleoperation-Windows.md)
- [Etapa 4: recolección de datos (Windows)](./so-arm-amazinghand/04-Data-Collection-Windows.md)
- [Etapa 5: entrenamiento del modelo (Windows)](./so-arm-amazinghand/05-Model-Training-Windows.md)
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
- [Tutorial de XLeRobot Docker — Kit de desarrollo Jetson AGX Orin](/es/tutorials/jetson-agx-orin/xlerobot-docker/deployment/01-Overview)
- [Tutorial de XLeRobot Docker — Kit de desarrollo Jetson Orin Nano Super](/es/tutorials/jetson-orin-nano/xlerobot-docker/deployment/01-Overview)

---

## Soporte

Si tiene preguntas, contáctenos:

- 📧 Correo: support@juxitech.com
- 💬 GitHub Issues: [Comentarios](https://github.com/Juxi-Technology/wiki-documents/issues)
