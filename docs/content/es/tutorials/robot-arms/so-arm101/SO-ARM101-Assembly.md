---
title: Guía de montaje del brazo robótico Lerobot
description: "Versión Pro: brazo líder 5V6A, brazo seguidor 12V5A"
---

# Guía de montaje del brazo robótico Lerobot

> **[Comprar en la tienda](https://www.juxitech.com/es/products/so-arm101-developers-kit)**

![image – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

**La versión Pro del brazo activo usa un adaptador de alimentación de 5V6A, mientras que el brazo pasivo usa un adaptador de alimentación de 12V5A**

La configuración del ID de los servos, la calibración del ángulo de los servos y el montaje deben completarse con antelación; puede consultar el [tutorial de ensamblaje oficial](https://huggingface.co/docs/lerobot/so101)

# Paso 1: Configurar el ID del servo e instalar la cruceta del servo (excepto el servo n.º 5)

![image – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.png)

Una vez más, asegúrese de que el ID de articulación de los servos y la relación de engranajes correspondan estrictamente a los del **SO-ARM101**.

Cada motor del bus tiene un ID único. Los motores nuevos suelen venir con un ID predeterminado `1`. Para garantizar una comunicación normal entre el motor y el controlador, primero debemos asignar un ID único a cada motor. Además, la velocidad de transmisión de datos en el bus está determinada por la tasa de baudios. Para poder comunicarse entre sí, el controlador y todos los motores deben configurarse con la misma tasa de baudios, y la tasa de baudios de los servos de este brazo robótico es de 100000.

Para ello, primero debemos conectar el controlador a cada motor por separado para configurarlo. Como estos parámetros se escriben en el área no volátil de la memoria interna del motor (EEPROM), solo se requiere una operación.

Si planea reutilizar motores de otros robots, es posible que también deba realizar este paso, ya que el ID y la tasa de baudios pueden no coincidir.

El siguiente video muestra los pasos secuenciales para configurar el ID del motor.

## Sistema Windows

[飞特舵机上位机.zip]

Use el controlador de servos Feite para configurar el ID del servo y calibrar el punto medio. ¡El rango de configuración del ID va de 1 a 6!

[机械臂舵机设置ID-Windows系统.mp4]

## Sistema Linux/Ubuntu

Para el programa de host de FTServo, consulte https://gitee.com/ftservo/FTServo_Linux

Primero siga el [Tutorial del manipulador LeRobot](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc) hasta **C. Manipulator Control**, dentro de **Port Authorization → Run Script to Find Port**.

Conecte la placa del controlador de servos del brazo esclavo a la computadora con un cable de datos USB y encienda la alimentación. Luego, ejecute el siguiente comando. Modifique `--robot.port=/dev/ttyACM0` en el comando por el número de puerto encontrado. Si el puerto encontrado es /dev/ttyACM1, cámbielo a `--robot.port=/dev/ttyACM1`.

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

Verá la siguiente salida.

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

Conecte el servo de la pinza (gripper) según las instrucciones. Asegúrese de que sea el único servo conectado a la placa del controlador de servos y de que este servo no esté conectado a ningún otro servo. Después de pulsar la tecla **[Enter]**, el script configurará automáticamente el ID y la tasa de baudios de este servo, ¡asignando los ID de 6 a 1!

Después, debería ver el siguiente mensaje:

```Python
'gripper' motor id set to 6
```

A continuación, la salida del siguiente elemento es:

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**Nota**: repita las operaciones anteriores para cada servo siguiendo las instrucciones.

Igual que con el servo anterior, asegúrese de que sea el único servo conectado a la placa del controlador y de que el servo no esté conectado a ningún otro servo.

Antes de cada pulsación de la tecla **Enter**, asegúrese de revisar las conexiones de los cables. Por ejemplo, al manipular la placa, el cable de alimentación puede desconectarse.

Después de completar todos los pasos, el script finalizará automáticamente y los servos estarán listos para usar. Ahora puede conectar el conector de 3 pines de cada servo en secuencia y conectar el cable del primer servo (el servo "shoulder pan" con ID 1) a la placa del controlador. Ahora la placa del controlador puede instalarse en la base del brazo robótico.

Repita los mismos pasos para el brazo activo.

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

[机械臂舵机设置ID-Linux系统.mp4]

# Paso 2: Montaje

- Los pasos de montaje del brazo seguidor son básicamente los mismos que los del brazo activo. La única diferencia es que, a partir del Paso 12, el método de instalación del efector final (pinza y mango) es diferente.

[SO-ARM101机械臂组装教程.mp4]

Instalación de la placa del controlador de servos: primero instale 4 pilares de cobre y luego fije la placa del controlador con cuatro tornillos M2.5\*8

![Sistema Linux/Ubuntu – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

![Sistema Linux/Ubuntu – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

![Sistema Linux/Ubuntu – 3](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.png)

**La versión Pro del brazo activo negro usa un adaptador de alimentación de 5V6A, mientras que el brazo pasivo blanco usa un adaptador de alimentación de 12V5A**

<RelatedProducts slugs="so-arm101,servo-driver-board,overhead-camera-mount" />
