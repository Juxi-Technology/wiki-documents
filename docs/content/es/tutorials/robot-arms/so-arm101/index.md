---
title: "Tutoriales del brazo robótico SO-ARM101"
description: "Página de inicio del tutorial del SO-ARM101: qué son la inteligencia encarnada y LeRobot, el brazo, la configuración de ordenador necesaria y qué significa el aprendizaje por imitación (VLA), con la navegación completa del curso."
---

# Tutoriales del brazo robótico SO-ARM101

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/so-arm101-index/d02-03.png)

## ¿Qué es la inteligencia encarnada?

Inteligencia con un cuerpo. Conecta la IA con diversas entidades de hardware físicas, como:

Perros robots cuadrúpedos, robots humanoides bípedos, robots con ruedas y patas, drones, coches autónomos

## ¿Qué es LeRobot?

LeRobot es el `marco de software de robots inteligentes encarnados` de código abierto de HuggingFace

Dirección de GitHub: https://github.com/huggingface/lerobot

Reduce la barrera de entrada para la **recopilación de datos, el entrenamiento de algoritmos y el despliegue de inferencia** en aprendizaje por refuerzo y **aprendizaje por imitación (VLA)**, con el **aprendizaje por imitación (VLA)** como foco principal

- ¿Qué robots se pueden desarrollar con LeRobot?

Desde el brazo robótico SO-ARM 101 y el carrito LeKiwi, de gama de miles de yuanes, hasta el brazo AgileX piper, de decenas de miles de yuanes, el brazo StarAI de Huaxinjing y la mano diestra Hope-JR, y llegando al robot humanoide Unitree G1, de cientos de miles de yuanes. LeRobot se ha convertido en el estándar para la recopilación de datos y el entrenamiento de algoritmos en la industria de la inteligencia encarnada.

También puedes adaptar tu propio robot al marco LeRobot.

- Conjuntos de datos y modelos de LeRobot

LeRobot define su propio formato de conjunto de datos para aprendizaje por imitación. Puedes ver, usar, descargar y entrenar con todos los conjuntos de datos y modelos públicos de HuggingFace, y también puedes subir tus propios conjuntos de datos a HuggingFace.

## ¿Qué es el brazo robótico SO-ARM 101?

Este tutorial toma como ejemplo el brazo robótico SO-ARM 101; utiliza piezas estructurales impresas en 3D y servos Feetech, con un coste muy bajo.

Es un cuerpo de inteligencia encarnada que incluso un estudiante sin recursos puede permitirse, y es uno de los cuerpos recomendados oficialmente por LeRobot.

El brazo consta de dos brazos: un brazo Leader y un brazo Follower. Cada brazo tiene 5 grados de libertad más 1 grado de libertad de la pinza.

## ¿Qué configuración de equipo necesito?

Un portátil Windows normal puede con todo hasta el entrenamiento.

Un Mac normal puede con todo.

Una máquina Ubuntu con una GPU NVIDIA puede con todo.

En este tutorial usamos una [plataforma de GPU en la nube](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1) para entrenar modelos, así que tu propio ordenador no necesita una configuración de gama alta.

## ¿Qué es el **aprendizaje por imitación y VLA**?

Los humanos arrastran el robot para demostrar y recopilar un conjunto de datos. Ese conjunto de datos se usa después para entrenar un algoritmo de aprendizaje por imitación, que finalmente se despliega en el robot, permitiéndole imitar acciones humanas de forma autónoma y generalizar al entorno real. No se necesita teleoperación ni control remoto.

Por ejemplo, en el vídeo de arriba, una persona arrastra el brazo robótico SO-ARM para agarrar un cangrejo de río, mojarlo en condimento y dejarlo caer en aceite caliente, y el brazo acaba realizando esta acción por sí solo. Incluso con un cangrejo nuevo, puede reaccionar y completar la acción en cualquier momento.

El aprendizaje por imitación también tiene un nombre moderno y de vanguardia: VLA (modelo grande de Visión-Lenguaje-Acción). Este es además el campo de investigación de inteligencia encarnada que se desarrolla más rápido en la actualidad, que atrae las inversiones más candentes, que vive la competencia entre China y Estados Unidos más feroz, que disfruta del ecosistema de código abierto más próspero, que atrae una intensa atención mediática y que arrastra a innumerables estudiantes de máster y doctorado.

Los algoritmos que LeRobot adapta principalmente son los de aprendizaje por imitación, como ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS y otros.

El aprendizaje por imitación de este tutorial es exclusivamente VLA.


## Navegación de tutoriales

### Cursos completos

- [Curso completo de LeRobot](/es/tutorials/robot-arms/so-arm101/lerobot/)
- [Tutorial del brazo robótico SO-ARM101 de 7 ejes](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/)

### Tutoriales de montaje y ampliación

- [Tutorial del brazo robótico LeRobot](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Guía de montaje del brazo robótico Lerobot](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Soporte de brazo y kit de cámara ambiental SO-ARM100&101 – Tutorial de instalación](/es/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation)
- [Instalación del soporte de cámara superior](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation)
- [Instalación de la pinza de dedos paralelos](/es/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation)
- [Tutorial de doble brazo (doble brazo seguidor) del SO-ARM101](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial)
- [Teleoperación inalámbrica SO-ARM101 (versión ESP32-NanoCam)](/es/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)
- [Solución de problemas de teleoperación](/es/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting)
- [Tutorial de uso de la herramienta de calibración de servos de la serie SoARM](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool)
- [Control de simulación en ROS2](/es/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control)
- [Incompatibilidad de PyTorch en Jetson Orin](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility)

### Conceptos básicos

- [Conocer LeRobot y la inteligencia encarnada](/es/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot)
- [Conjuntos de datos de LeRobot en HuggingFace](/es/tutorials/robot-arms/so-arm101/basics/HF-Datasets)
- [Materiales para el entrenamiento de modelos](/es/tutorials/robot-arms/so-arm101/basics/Training-Resources)
- [Archivos oficiales de impresión 3D del SO-ARM 100](/es/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files)
- [Archivos URDF y referencias de materiales](/es/tutorials/robot-arms/so-arm101/basics/URDF-Reference)
- [Soportes y monturas de cámara recomendados](/es/tutorials/robot-arms/so-arm101/basics/Camera-Mounts-Recommended)

### Tutorial de LeLab

- [1 · Descripción general](/es/tutorials/robot-arms/so-arm101/lelab/01-Overview)
- [2 · Instalar y ejecutar](/es/tutorials/robot-arms/so-arm101/lelab/02-Install)
- [3 · Conectar y calibrar](/es/tutorials/robot-arms/so-arm101/lelab/03-Calibration)
- [4 · Teleoperación](/es/tutorials/robot-arms/so-arm101/lelab/04-Teleoperation)
- [5 · Grabar un dataset](/es/tutorials/robot-arms/so-arm101/lelab/05-Record-Dataset)
- [6 · Entrenar y ejecutar la inferencia](/es/tutorials/robot-arms/so-arm101/lelab/06-Train-and-Inference)
- [7 · Solución de problemas](/es/tutorials/robot-arms/so-arm101/lelab/07-Troubleshooting)
,### Tutorial de simulación MuJoCo,,- [SO-ARM101 × MuJoCo tutorial completo (índice)](/es/tutorials/robot-arms/so-arm101/mujoco/),- [01 · Preparación del entorno](/es/tutorials/robot-arms/so-arm101/mujoco/01-Environment),- [02 · Verificación del modelo de simulación (carga y accionamiento de MJCF)](/es/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification),- [03 · Conexión del robot real y calibración](/es/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration),- [04 · Teleoperación por teclado](/es/tutorials/robot-arms/so-arm101/mujoco/04-Keyboard-Teleop),- [05 · Gemelo digital del brazo líder (el brazo físico acciona el brazo simulado)](/es/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin),- [06 · Grabación y reproducción de datos](/es/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay),- [07 · Preguntas frecuentes y experiencias](/es/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting),- [08 · Hoja de ruta](/es/tutorials/robot-arms/so-arm101/mujoco/08-Roadmap),- [09 · Tutorial de uso completo (arrancar el brazo → dataset → ver vídeos → entrenar → desplegar)](/es/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)

### Tutorial de la imagen Docker de XLeRobot

- [Tutorial de XLeRobot Docker — Kit de desarrollo Jetson AGX Orin](/es/tutorials/jetson-agx-orin/xlerobot-docker/deployment/01-Overview)
- [Tutorial de XLeRobot Docker — Kit de desarrollo Jetson Orin Nano Super](/es/tutorials/jetson-orin-nano/xlerobot-docker/deployment/01-Overview)

<RelatedProducts slugs="so-arm101" />
