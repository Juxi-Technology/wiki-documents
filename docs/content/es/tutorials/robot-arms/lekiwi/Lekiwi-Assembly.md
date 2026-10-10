---
title: Tutorial de ensamblaje del robot móvil Lekiwi
description: "En Fusion360 CAD en línea se pueden visualizar las posiciones exactas de los componentes."
---

# Tutorial de ensamblaje del robot móvil Lekiwi

> **[Comprar en la tienda](https://www.juxitech.com/es/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

[*En el CAD en línea de Fusion360*](https://a360.co/4k1P8yO)* puede visualizar las posiciones exactas de los componentes.*

[Archivo URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Vista previa del URDF en línea https://urdf.d-robotics.cc/

## 1. Montaje de los módulos de rueda (3 por robot)

1. Utilice 12 tornillos autorroscantes **M2x6** para fijar el motor de accionamiento al soporte del motor. (Incluidos con la caja del servo.)

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-01.png)
![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-02.png)

2. Utilice 12 tornillos **M3x16** y 12 **tuercas M3** para fijar los servos a la placa base con los soportes del motor de accionamiento.

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-03.jpg)

3. Retire los tornillos y las tuercas de las ruedas omnidireccionales de 82 mm.

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-04.png)

4. Utilice tornillos m3\*6 para fijar el cuerno del servo al servo.

![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-05.png)

5. Instale 4 tuercas de seguridad en el acoplamiento. Primero, utilice 4 tornillos m3\*6 para fijar el acoplamiento al cuerno del servo.

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-06.png)
![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-07.png)

6. Utilice tornillos m3\*25 y tuercas de seguridad para fijar las ruedas omnidireccionales de 82 mm al acoplamiento.



Una vez instaladas las tres ruedas en la placa base:

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-09.jpg)

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-10.png)

## 2. Montaje de la placa base

1. Inserte 2 tuercas M3 en los orificios de la placa controladora de servos y el soporte de la batería. Utilice 4 tornillos hexagonales M3x12 para fijar ambos a la placa base.

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-11.png)
![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-12.png)

2. Utilice 2 tornillos hexagonales M3\*12 y 2 tuercas M3 para instalar la placa controladora de servos y conectarla a los 3 servos.

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-13.png)

Conexiones de los cables de la fuente de alimentación portátil

- La **entrada de alimentación** se conecta directamente a la fuente de alimentación

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-14.png)
![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-15.png)

- La interfaz **USB-C** suministra alimentación de 5 V a la Raspberry Pi
- Si utiliza un **brazo robótico de 12 V**, alimente la **placa controladora de servos** directamente con el **distribuidor de alimentación de CC**

![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-16.png)
![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-17.png)

Los cables se pueden conectar como se muestra en la figura siguiente:

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-18.png)

## 3. Montaje de la placa superior

1. Coloque la Raspberry Pi 5 en la parte inferior de la carcasa de la Raspberry Pi y, a continuación, encaje la parte superior de la carcasa.

2. Utilice dos tornillos hexagonales M3x16 y dos tuercas M3 para fijar la Raspberry Pi a la placa base superior, y utilice cuatro tornillos M4x25 y cuatro tuercas M4 para instalar la base del brazo robótico SO-101.

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-19.png)

## 4.

1. Pase el cable USB-C a USB-A de la placa controladora de servos, el cable de alimentación USB-C de 5 V y los cables de los servos por los orificios de la placa superior.

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-20.png)

2. Utilice 8 tornillos m3x16 y 4 tuercas m3 para instalar la placa superior en los soportes del motor.

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-21.png)



## 5. Instalación de las cámaras

*Nota: el soporte que hemos diseñado está adaptado a la cámara que hemos seleccionado. Los distintos módulos de cámara pueden requerir modificaciones.*

## (Opción 1) Instalación de la cámara frontal

①Utilice 4 tornillos separadores m2\*5\*5 para fijar el módulo de cámara

②Utilice 2 tornillos m3\*12 y 2 tuercas m3 para instalar el soporte de la cámara frontal en la placa base

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-22.webp)
![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-23.webp)

## (Opción 2) Instalación de la cámara montada en el brazo

Utilice 4 tornillos separadores m2\*5\*5 para fijar el módulo de cámara

Este soporte admite cámaras con una distancia entre orificios de 24\*25 mm o 28\*28 mm

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-24.png)

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-25.png)

## 6. Conexión de la alimentación y cableado

Conecte el adaptador de conector de barril de CC a la **placa controladora de servos**;

Conecte el conector USB-C de 5 V a la **Raspberry Pi 5** para alimentar la electrónica;

Los cables de datos USB de la placa controladora de servos y de las cámaras se pueden conectar directamente a la Raspberry Pi.

![image – 26](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-26.png)
