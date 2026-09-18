---
title: "Paso 8: Bugs comunes y soluciones"
description: "Soluciones a los fallos más habituales durante la inferencia: errores de conexión de la cámara, desconexiones y problemas de comunicación de los servomotores."
---

# Paso 8: Bugs comunes y soluciones

## Fallo al obtener la cámara

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/1.png)

Comprueba si el cableado de la cámara de muñeca está flojo, especialmente el cable del extremo próximo a la cámara, que tiende mucho a hacer mal contacto

## Desconexión de la cámara

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/2.png)

Reinicia la línea de comandos

## Problema de comunicación del servo 1

ConnectionError: Failed to sync read 'Present_Position' on ids=[1, 2, 3, 4, 5, 6] after 1 tries. [TxRxResult] There is no status packet!

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/3.png)

Solución: en el código de `lerobot/src/lerobot/motors/motors_bus.py`, cambia todos los `num_retry` a 99, especialmente el correspondiente a la línea del error

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/4.png)

## Problema de comunicación del servo 2

ConnectionError: Failed to write 'Torque_Enable' on id_=1 with '0' after 6 tries. [TxRxResult] There is no status packet!

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/5.png)

![53823bc8797beb0cd2899d6c65ee9f63.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/6.png)

Solución: recalibrar el brazo robótico

<RelatedProducts slugs="so-arm101" />
