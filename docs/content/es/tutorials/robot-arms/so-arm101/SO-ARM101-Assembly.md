---
title: Guía de montaje del brazo robótico Lerobot
description: "Versión Pro: brazo líder 5V6A, brazo seguidor 12V5A"
---

# Guía de montaje del brazo robótico Lerobot

> **[Comprar en la tienda](https://www.juxitech.com/es/products/so-arm101-developers-kit)**

![Image](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)


**Versión Pro: brazo líder (negro) 5V6A, brazo seguidor (blanco) 12V5A**

Configuración de ID de servo, calibración de ángulo y montaje con antelación. Ver [guía oficial](https://huggingface.co/docs/lerobot/so101).

## Paso 1: Configurar IDs de servo, montar piñones (excepto n.º 5)
![Image](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.png)


**Atención**: los IDs de articulación y la relación de engranajes deben coincidir exactamente con el **SO-ARM101**.

Cada motor del bus necesita un ID único (nuevo: `1` por defecto). Baudrate: 100000.

### Windows

[Software de servo Feetech.zip] — definir IDs (1-6) y calibrar posición central.

### Linux/Ubuntu

```
lerobot-setup-motors \\
    --robot.type=so101_follower \\
    --robot.port=/dev/ttyACM0
```

Conectar primero el servo gripper, definir IDs (6→1):

```
'gripper' motor id set to 6
```

**Solo 1 servo a la vez**. Tras terminar, conectar los cables de 3 pines desde el ID 1.

Mismos pasos para el brazo líder:

```
lerobot-setup-motors \\
    --teleop.type=so101_leader \\
    --teleop.port=/dev/ttyACM0
```

## Paso 2: Montaje

Brazo seguidor como el líder (diferencia: montaje del efector tras el paso 12).