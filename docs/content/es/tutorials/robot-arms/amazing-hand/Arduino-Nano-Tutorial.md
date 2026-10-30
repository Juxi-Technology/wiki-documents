---
title: "Tutorial de uso de Arduino Nano"
description: "Ejecutar el «programa de demostración 02» de AmazingHand con un Arduino Nano (328P) y la placa controladora de servos: cableado, instalación de bibliotecas, compilación, carga y resultado de ejecución."
---

# Tutorial de uso de Arduino Nano

## Cableado (placa controladora de servos + placa Nano)

**¡Comprobar bien la posición de los pines de la placa Nano (es decir, la placa de desarrollo 328P)!**

![Ilustración](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/01.png)

![Ilustración](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/02.png)

![Ilustración](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/03.png)

![Ilustración](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/04.png)

A continuación se describe el proceso de depuración con el microcontrolador. El propio microcontrolador ejecuta el programa de demostración en un bucle continuo; basta con desconectar el cable de datos para detenerlo.

## Ejecutar el «programa de demostración 02»

1. Instalar Arduino IDE por cuenta propia.

2. Según sea la **mano izquierda o la mano derecha**, abrir el archivo `.ino` correspondiente.

   ![Ilustración](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/05.png)

3. Antes de compilar y cargar el programa de Arduino en la placa Nano, instalar la **biblioteca FTServo** y la **biblioteca SCServo** en el «Administrador de bibliotecas».

   ![Ilustración](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/06.png)

4. Seleccionar el tipo de placa Nano «**Arduino Nano**».

   ![Ilustración](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/07.png)

5. Compilar y cargar.

> **Atención:** en este momento el ordenador está conectado únicamente a la placa Nano; la placa Nano no debe estar conectada todavía a la placa controladora de servos (es decir, no conectada a la mano diestra).

Tras una carga correcta, conectar la placa Nano a la placa controladora de servos mediante tres cables de puente, y conectar los servos a la placa controladora de servos; consultar el [modo de cableado para la depuración de la placa MEGA328P Nano](https://juxitech.feishu.cn/wiki/Wt46wtt26imdWkkQlxTcL87qnHd#share-HdS4dNgwyo2seVxRZ9PcZ1R3nuc).

La mano diestra ejecutará el «programa de demostración 02» en un bucle continuo; el resultado de ejecución es el siguiente:

![Ilustración](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/08.png)
