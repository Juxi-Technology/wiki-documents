---
title: Tutorial de ensamblaje del robot móvil Lekiwi
description: "En Fusion360 CAD en línea se pueden visualizar las posiciones exactas de los componentes."
---

# Tutorial de ensamblaje del robot móvil Lekiwi

> **[Comprar en la tienda](https://www.juxitech.com/es/products/lekiwi-embodied-intelligence-mobile-robotic-car)**


[*Fusion360 CAD en línea*](https://a360.co/4k1P8yO)*permite visualizar las posiciones exactas de los componentes.*
[Archivo URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)
Vista previa URDF en línea https://urdf.d-robotics.cc/

## 1. Montar el módulo de rueda (3 por robot)

1. Fijar el motor de accionamiento al soporte del motor con 12 tornillos autorroscantes **M2x6** (incluidos con la caja del servo).

![image – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/1.jpg)

![image – 2](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/10.jpg)





2. Fijar el soporte del motor a la placa base con 12 **tornillos de máquina M3x16 y 12** .

![image – 3](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/11.jpg)



3. Retirar los tornillos y tuercas de la rueda omnidireccional de 82 mm

![image – 4](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/12.jpg)



4. Fijar el servo horn al servo con tornillos m3*6

![image – 5](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/13.jpg)



5. Insertar 4 contratuercas en el acoplamiento y fijar el acoplamiento al servo horn con 4 tornillos m3*6

![image – 6](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/14.jpg)

![image – 7](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/15.jpg)





6. Fijar la rueda omnidireccional de 82 mm al acoplamiento con tornillos de máquina m3*25 y contratuercas

Tras montar las tres ruedas en la placa base:

![image – 8](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/16.jpg)

![image – 9](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/17.jpg)

![image – 10](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/18.jpg)







## 2. Ensamblaje de la placa base

1. Insertar las tuercas M3 en los orificios de la placa driver de servos y del soporte de batería. Fijar ambos a la placa base con 4 tornillos M3x12.

![image – 11](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/19.jpg)

![image – 12](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/2.jpg)





2. Montar la placa driver de servos con cuatro separadores de latón M2.5*6.5 y cuatro tornillos M2.5*8, y conectarla a los 3 servos.



Conexión de cables de la batería externa

- **Entrada de alimentación** directamente a la fuente





- **USB-C** suministra 5 V al Raspberry Pi
- Con **brazo robótico de 12 V**, alimentar directamente la **placa de motores de servos** mediante el **divisor de alimentación DC**





Los cables se conectan como se muestra:

![image – 13](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/20.jpg)

![image – 14](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/21.jpg)

![image – 15](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/22.jpg)

![image – 16](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/3.jpg)

![image – 17](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/4.jpg)

![image – 18](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/5.jpg)



## 3. Ensamblaje de la placa superior

1. Colocar el Raspberry Pi 5 en la parte inferior de la carcasa y encajar la tapa superior.
2. Fijar el Raspberry Pi a la placa superior con dos tornillos M3x12 y dos contratuercas M3, y montar la base del brazo SO-101 con cuatro tornillos M4x25 y cuatro contratuercas M4. Se puede usar nuestra base SO-101 mejorada o la original: la placa tiene orificios para ambas.

![image – 19](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/6.jpg)



## 4.

1. Pasar el cable USB-C a USB-A de la placa driver, el cable de alimentación USB-C de 5 V y el cable del servo SO0-101 por los orificios de la placa superior.

![image – 20](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/7.jpg)



2. Fijar la placa superior al soporte del motor con 6 tornillos m3x12 y 6 contratuercas m3.

![image – 21](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/8.jpg)



3. Unir placa superior y placa base con 6 separadores de latón M3*50 y 6 tornillos de máquina M3*

## 5. Instalar la cámara

*Nota: nuestro soporte está diseñado específicamente para la cámara elegida. Otros módulos de cámara pueden requerir modificaciones.*

### (Opción 1) Instalar la cámara frontal

Montar el soporte de cámara frontal en la placa base con 3 tornillos m3*12 y tres tuercas m3
Fijar el módulo de cámara con 4 tornillos separadores m2*5*5

### (Opción 2) Instalar la cámara montada en el brazo

Fijar el módulo de cámara con 4 tornillos separadores m2*5*5

## 6. Conectar la alimentación

Insertar el adaptador cilíndrico DC en la placa driver y el conector USB-C de 5 V en el Raspberry Pi 5 para alimentar la electrónica. Los cables de datos USB de la placa driver y de la cámara se conectan directamente al Raspberry Pi.


![Option 2 Install an arm-mounted camera – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/9.jpg)



