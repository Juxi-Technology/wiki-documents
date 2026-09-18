---
title: "Archivos URDF y referencias de materiales"
description: "Referencias de materiales del brazo robótico: el archivo URDF oficial de LeRobot, la herramienta URDF Studio, la interfaz LeLab y el control desde el móvil."
---

# Archivos URDF y referencias de materiales

## [Archivo URDF](https://github.com/TheRobotStudio/SO-ARM100/blob/main/Simulation/SO101/so101_new_calib.urdf) oficial de Lerbot

### URDF Studio

https://urdf.d-robotics.cc/

### Control de simulación ROS2 (puedes implementarlo tú mismo)

https://github.com/holmsslk/so-arm-moveit-hardware

### Interfaz gráfica oficial de LeRobot

https://github.com/huggingface/leLab

LeLab es una aplicación web que integra todo el flujo de trabajo de LeRobot —calibración, teleoperación, grabación, entrenamiento, reproducción— en una única interfaz de navegador. Solo tienes que conectar el brazo robótico, abrir la aplicación y empezar a operar. Sin engorrosas operaciones de línea de comandos ni entrada por teclado.

🤗 La entrada web nativa de LeRobot, diseñada para que los nuevos usuarios completen en pocos minutos todo el proceso, desde “desembalar” hasta “entrenar su primera póliza”.

🤗 Solo se necesita un comando para instalar y ejecutar todos los programas.

## Controlar el brazo seguidor con el teléfono móvil

https://huggingface.co/docs/lerobot/main/en/phone_teleop

### Desarrollo de robots en la nube: implementación de la simulación y el flujo de datos de Lerobot con dispositivos ROS 2 e Isaac Sim basados en AWS

https://github.com/ti/ti.github.io/blob/95261efa4f8bdb4c8571920762318a532e58c7fd/%E5%BC%80%E5%8F%91/isaac/aws-ros2-isaac.md

### Configurar el ID del servomotor y la calibración de posición central desde la web

https://bambot.org/feetech.js?lang=zh

1、Según el modelo de servomotor, introduce 0 o 1 y haz clic en “连接”

![截图_20260413125622.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/1.png)

2、Escanea los servomotores con ID 1~6; puedes confirmar el servomotor con el ID correspondiente según el FOUND del resultado del escaneo. Por ejemplo, en la imagen se ha escaneado el servomotor con ID 1

![截图_20260413125712.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/2.png)

3、Configuración del ID y calibración de posición central

① Introduce como ID de servomotor actual el ID del servomotor escaneado

② Introduce un número en “ID管理” y haz clic en “更改ID” para establecer el ID

③ Calibración de posición central (la posición central del servomotor STS3215 es 2047 y la del servomotor SCS0009 es 511)

Servomotor STS: introduce 2047 en “位置控制” y haz clic en “Set”

Servomotor SCS: introduce 511 en “位置控制” y haz clic en “Set”

![截图_20260413125748.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/3.png)

<RelatedProducts slugs="so-arm101" />
