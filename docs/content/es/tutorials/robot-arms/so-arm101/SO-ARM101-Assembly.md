---
title: Guía de montaje del brazo robótico Lerobot
description: "Guía de montaje del brazo SO-ARM101 versión Pro: configuración de IDs y baudios de los servos, calibración y ensamblaje del brazo líder y el seguidor."
---

# Guía de montaje del brazo robótico Lerobot

Nota: si el brazo robótico ya está montado, omite este tutorial

## Piezas impresas en 3D del brazo esclavo

![IMG_20251229_141748.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

## Piezas impresas en 3D del brazo maestro

![IMG_20251229_141533.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.jpg)

El brazo maestro y el brazo esclavo son muy similares; solo el extremo es diferente

El brazo maestro tiene un mango y un gatillo; el brazo esclavo tiene una pinza

## Retirar los soportes residuales de las piezas impresas en 3D

Revisa cada orificio, hueco, ranura y rejilla, especialmente los cinco orificios similares al "cinco de círculos" del mahjong

Este paso es muy importante; de lo contrario, después no podrás atornillar los tornillos

## Distinción de los cuatro tipos de servos

|Modelo grande|Modelo pequeño|Voltaje (V)|Relación de reducción|Articulación del brazo|Cantidad|
|---|---|---|---|---|---|
|STS-3215|C001|7.4|1:345|Brazo maestro 2|1|
||C044|7.4|1:191|Brazo maestro 1, 3|2|
||C046|7.4|1:147|Brazo maestro 4, 5, 6|3|
||C047|12|1:345|Todas las articulaciones del brazo esclavo|6|

> La relación de reducción es el cociente entre "la velocidad del motor y la velocidad del eje de salida del servo"; por ejemplo, 1:345 significa que el motor gira 345 vueltas para que el eje de salida del servo gire 1 vuelta.
> 
> Una relación de reducción grande amplifica el par mediante el tren de engranajes, por lo que puede mover cargas más pesadas (por ejemplo, el brazo esclavo)
> 
> Pero al mismo tiempo, la velocidad de rotación del eje de salida será más lenta (porque se ha "reducido")
> 
> Si arrastras la articulación, costará más esfuerzo
> 
> 

A continuación se muestran los modelos y las relaciones de reducción de todos los servos de este proyecto; el subrayado indica su número

![12月30日(7).png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/3.jpg)

![IMG_20260108_145707.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/4.jpg)

## Cómo distinguir los adaptadores de corriente de los dos voltajes

Adaptador de corriente de 5V 6A 30W: alimenta los servos de 7.4V (brazo maestro), negro

Adaptador de corriente de 12V 5A 60W: alimenta los servos de 12V (brazo esclavo), blanco

## Descargar la herramienta de depuración de servos de Feetech

### Ordenador Windows

https://gitee.com/ftservo/fddebug

Descarga [`FD1.9.8.5(250729).7z`](https://gitee.com/ftservo/fddebug/blob/master/FD1.9.8.5(250729).7z), descomprímelo y ejecuta el programa exe que contiene

### Ordenador Ubuntu y ordenador Mac (el archivo comprimido incluye el tutorial)

[Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip)

![Lerobot 101机械臂.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/5.jpg)

**En la versión Pro, el brazo maestro utiliza un adaptador de corriente de 5V6A y el brazo esclavo un adaptador de corriente de 12V5A**

La configuración del ID de los servos, la calibración de los ángulos de los servos y el ensamblaje deben realizarse con antelación; puedes consultar el [tutorial de ensamblaje oficial](https://huggingface.co/docs/lerobot/so101)

## Paso 1: Configurar el ID de los servos e instalar los discos de servo (excepto el servo n.º 5)

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/6.png)

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

1. Abre la herramienta de depuración de PC de Feetech, selecciona el número de puerto COM, establece la velocidad en baudios en un millón y haz clic en "Abrir"

2. Haz clic en "Buscar"; cuando aparezca "STS3215", haz clic en "Detener" y luego en "STS3215"

3. Selecciona "Depurar" en la parte superior: puedes arrastrar el control deslizante para hacer girar el servo, o hacer clic en "Escanear" para que el servo se mueva alternativamente. Confirma que el servo funciona correctamente

4. Selecciona "Programar" en la parte superior

5. Haz clic en "Calibración de posición central" para establecer la posición actual del eje de rotación del servo como posición central (0-4095)

6. Haz clic en "ID", establece en la esquina inferior derecha el número de ID correspondiente del servo y haz clic en "Guardar". Ten en cuenta que el número debe ser puramente arábigo, sin letras.

7. Desconecta el cable que une el servo con la placa de control

8. Conecta el cable del servo al servo

El servo n.º 1 lleva dos cables; los demás servos, de momento, solo uno

![截图_20260115151626.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

Recordatorio de nuevo: asegúrate de que el ID de la articulación del servo y la relación de engranajes correspondan estrictamente a los del **SO-ARM101**.

Cada motor del bus tiene un ID único. Los motores nuevos suelen traer un ID predeterminado `1`. Para garantizar una comunicación correcta entre los motores y el controlador, primero debemos asignar a cada motor un ID único. Además, la velocidad de transmisión de datos en el bus viene determinada por la velocidad en baudios. Para poder comunicarse entre sí, el controlador y todos los motores deben configurarse con la misma velocidad en baudios; la velocidad en baudios de los servos de este brazo robótico es 100000.

Para ello, primero debemos conectar el controlador a cada motor por separado para poder realizar la configuración. Como estos parámetros se escriben en una zona no volátil de la memoria interna del motor (EEPROM), basta con hacerlo una sola vez.

Si vas a reutilizar motores de otro robot, es posible que también necesites realizar este paso, ya que el ID y la velocidad en baudios podrían no coincidir.

El siguiente vídeo muestra la secuencia de pasos para configurar el ID de los motores.

### Sistema Windows

[Herramienta de PC para servos Feetech.zip](/downloads/飞特舵机上位机.zip)

Utiliza la herramienta de PC para servos Feetech para configurar el ID de los servos y calibrar la posición central; ¡la configuración de IDs es de 1 a 6!

**Configuración del ID de los servos del brazo robótico-Sistema Windows.mp4**（机械臂舵机设置ID-Windows系统.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

### Sistema Linux/Ubuntu y ordenador Mac

Si necesitas la herramienta de PC para servos Feetech, puedes consultar la [herramienta de depuración de servos de Feetech](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g#share-Jvk1dRRl8oY0Skxrt2VczA9jnNb) que aparece arriba

Primero sigue la página de [instalación oficial del entorno LeRobot](https://huggingface.co/docs/lerobot/installation) para completar el despliegue del entorno

Recuerda activar el entorno virtual y entrar en el directorio src/lerobot correspondiente

conda activate lerobot

cd lerobot/src/lerobot

1. Buscar el puerto USB correspondiente al brazo robótico. Para encontrar el puerto correcto de cada brazo robótico, ejecuta el script de utilidad dos veces:

```Plain Text
lerobot-find-port
```

Salida de ejemplo al identificar el puerto del brazo Leader (por ejemplo, en Mac es `/dev/tty.usbmodem575E0031751`, o en Linux puede ser `/dev/ttyACM0`):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

Salida de ejemplo al identificar el puerto del brazo Follower (por ejemplo, `/dev/tty.usbmodem575E0032081`, o en Linux puede ser `/dev/ttyACM1`):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

Recuerda desconectar el conector USB; de lo contrario, no se detectará la interfaz.

2. Conecta el ordenador a la placa de control de servos del brazo esclavo con un cable de datos USB y enciende la alimentación. Después, ejecuta el siguiente comando. Sustituye --robot.port=/dev/ttyACM0 del comando por el número de puerto encontrado. Si el puerto encontrado es /dev/ttyACM1, cámbialo por --robot.port=/dev/ttyACM1

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

Verás la siguiente salida.

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

Sigue las indicaciones y conecta el servo de la pinza. Asegúrate de que sea el único servo conectado a la placa de control de servos y de que este servo aún no esté conectado a ningún otro. Cuando pulses la tecla **[Enter]**, el script configurará automáticamente el ID y la velocidad en baudios de ese servo; ¡la configuración de IDs es de 6 a 1!

Después, deberías ver la siguiente información:

```Python
'gripper' motor id set to 6
```

A continuación, la siguiente salida es:

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**Nota **Sigue las indicaciones y repite la operación anterior para cada servo.

Igual que con los servos anteriores, asegúrate de que sea el único servo conectado a la placa de control y de que el servo en sí no esté conectado a ningún otro servo.

Antes de pulsar la tecla **Enter** cada vez, asegúrate de comprobar las conexiones de los cables. Por ejemplo, al manipular la placa, el cable de alimentación podría desconectarse.

Cuando hayas completado todos los pasos, el script finalizará automáticamente y los servos estarán listos para usarse. Ahora puedes conectar en cadena los conectores de 3 pines de cada servo y conectar el cable del primer servo (el servo "shoulder pan" con ID 1) a la placa de control. Ahora ya puedes instalar la placa de control en la base del brazo robótico.

Repite los mismos pasos para el brazo maestro.

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

**Configuración del ID de los servos del brazo robótico-Sistema Linux.mp4**（机械臂舵机设置ID-Linux系统.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

## Paso 2: Ensamblaje

- Los pasos de ensamblaje del brazo esclavo son básicamente los mismos que los del brazo maestro. La única diferencia es que, a partir del paso 12, la forma de instalar el efector final (pinza y mango) es distinta.

**Tutorial de ensamblaje del brazo robótico SO-ARM101.mp4**（SO-ARM101机械臂组装教程.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

Instalación de la placa de control de servos: primero instala los 4 postes de cobre y después fija la placa de control con cuatro tornillos M2.5*8

![1768467962506.webp](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.webp)

![1768467970234.webp](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/10.webp)

![截图_20260115170850.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/11.png)

**En la versión Pro, el brazo maestro negro utiliza un adaptador de corriente de 5V6A y el brazo esclavo blanco un adaptador de corriente de 12V5A**

## Configurar el ID del servo y la calibración de la posición central desde la web

https://bambot.org/feetech.js?lang=zh

1. Según el modelo del servo, introduce 0 o 1 y haz clic en "Conectar"

![截图_20260413125622.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/12.png)

2. Escanea los servos con ID 1~6; puedes confirmar el servo con el ID correspondiente según el FOUND del resultado del escaneo. Por ejemplo, en la imagen se ha escaneado el servo con ID 1

![截图_20260413125712.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/13.png)

3. Configuración del ID y calibración de la posición central

①El ID de servo actual que se introduce es el ID del servo escaneado

②Introduce un número en "Gestión de ID" y haz clic en "Cambiar ID" para configurar el ID

③Calibración de la posición central (la posición central del servo STS3215 es 2047 y la del servo SCS0009 es 511)

Servo STS: introduce 2047 en "Control de posición" y haz clic en "Set"

Servo SCS: introduce 511 en "Control de posición" y haz clic en "Set"

![截图_20260413125748.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/14.png)
