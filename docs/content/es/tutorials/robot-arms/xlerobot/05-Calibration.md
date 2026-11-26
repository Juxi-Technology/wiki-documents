---
title: "Calibración de los brazos robóticos"
description: "Calibración XLeRobot de ambos brazos y la cabeza: comandos lerobot-calibrate para Windows / macOS / Linux, posición media, comprobación de límites y verificación de los brazos izquierdo/derecho."
---

# Calibración de los brazos robóticos

![Procedimiento de calibración de ambos brazos y la cabeza](/images/tutorials/robot-arms/xlerobot/05-calibration/01.png)

## Procedimiento de calibración de ambos brazos y la cabeza

> Ejecute el comando correspondiente a su sistema operativo. `port1` es la placa de control del brazo izquierdo y `port2` la del brazo derecho; confirme antes los puertos reales con `lerobot-find-port`.
>
> En Linux, muestre los puertos rápidamente con `ls /dev/ttyACM*`.

**Windows**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=COM3 \
    --robot.port2=COM4
```

**macOS**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=/dev/tty.usbmodem58546521551 \
    --robot.port2=/dev/tty.usbmodem58546521552
```

**Linux**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=/dev/ttyACM0 \
    --robot.port2=/dev/ttyACM1
```

Tras iniciar el comando de calibración, el terminal solicita primero Middle Position. Coloque los brazos en la posición media —mordaza móvil arriba, mordaza fija abajo— y pulse Enter. Después, mueva cada articulación hasta sus límites máximo y mínimo.

> Antes de pulsar Enter para iniciar la calibración, coloque el brazo robótico en la posición media: cada articulación en el centro de su rango utilizable.
>
> Observe los valores mínimo y máximo de cada articulación. Si un mínimo cruza 0 y empieza a decrecer desde 4095, o un máximo supera 4095 y empieza a crecer desde 0, realice una calibración de posición media con el software de PC de Feetech y vuelva a calibrar el brazo robótico.

Los dos servos de la torre de cámara funcionan igual: gírelos una vez hasta sus límites máximo y mínimo.

Cuando aparezca la siguiente línea, comienza la calibración del brazo izquierdo y la cabeza:

![Procedimiento de calibración de ambos brazos y la cabeza](/images/tutorials/robot-arms/xlerobot/05-calibration/02.png)

![Procedimiento de calibración de ambos brazos y la cabeza](/images/tutorials/robot-arms/xlerobot/05-calibration/03.png)

Cuando aparezca la siguiente línea, comienza la calibración del brazo derecho. Las ruedas de la base no necesitan calibración.

![Procedimiento de calibración de ambos brazos y la cabeza](/images/tutorials/robot-arms/xlerobot/05-calibration/04.png)

![Procedimiento de calibración de ambos brazos y la cabeza](/images/tutorials/robot-arms/xlerobot/05-calibration/05.png)
