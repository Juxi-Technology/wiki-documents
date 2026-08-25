---
title: Tutorial de depuración de la mano hábil (servo TTL)
description: "Primero descargue el paquete comprimido «灵巧手调试.zip» y extráigalo; luego use el documento «使用arduio程序调试灵巧手过程（TTL舵机）» para configurar IDs de servos, calibrar, alinear el centro y ejecutar la demo, o consulte el código de código abierto oficial."
---

# Tutorial de depuración de la mano hábil (servo TTL)

> **[Comprar en la tienda](https://www.juxitech.com/es/products/amazinghand)**


Primero descargue el paquete comprimido «[灵巧手调试.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc)» y extráigalo. Luego, mediante el documento «使用arduio程序调试灵巧手过程（TTL舵机）», puede configurar IDs de servos, calibrar, alinear la posición central y ejecutar el programa demo, o consultar el [código de código abierto oficial](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample).

**Sin desmontar el producto terminado** (IDs de servos, calibración y posición central ya ajustados de fábrica) puede saltar directamente al **[punto 6: ejecutar «02 演示程序»](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188003&from=from_node_link)** y al punto 7 **[seguimiento de la mano](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188027&from=from_node_link)**.

## 1. Conexión para depurar la mano

Una opción es usar el PC con software host como Python (software host Feetech o código Python).
La otra es usar un microcontrolador como MEGA328P o una placa de desarrollo/controlador comprada.

Conexión de la siguiente manera:
(1) Conexión para depurar con Python (solo placa driver de servos):
(2) Conexión para depurar con MEGA328P (placa driver de servos + placa 328P):

**¡Observe bien las posiciones de los pines de la placa MEGA328P!**

A continuación, el proceso de depuración con el microcontrolador. El microcontrolador ejecuta el programa demo en bucle; basta desconectar el cable de datos para detenerlo.

## 2. Configurar IDs de servos

Una mano usa 8 servos: mano derecha ID 1-8, mano izquierda ID 11-18

Posición central de fábrica: derecha [451,571,451,571,451,571,451,571], izquierda [571,451,571,451,571,451,571,451]

1. Conexión: conectar **cada** servo con la placa driver, uno a uno.
2. Usar el software host FD1.9.8.2 del fabricante de servos para la configuración
[FD.rar]

## 3. **Fijar el servo horn**

1. Subir el programa «安装白色伺服喇叭时使用» a la placa de desarrollo

Función del programa: llevar el engranaje del servo a una posición aproximadamente central; los ángulos posteriores se basan en esta posición central.

(1) Instalar el software arduino, según su sistema consulte el [tutorial de instalación](https://blog.csdn.net/weixin_35509395/article/details/156188274); antes de compilar, instale en el gestor de bibliotecas las bibliotecas FTServo y SCServo
(2) Tipo de placa: elegir «Arduino Nano»

2. Depurar servos 1, 2
(1) Editar: según el ID del servo a depurar (p. ej., índice → ID 1, 2)
(2) Subir el programa a la placa
(3) Conectar: placa + placa driver + **servos 1, 2** – se escucha el engranaje girar un ángulo y detenerse.
(4) Montar el servo horn en el engranaje, lo más paralelo posible

3. Depurar servos 3, 4
(1) **Desconectar el cableado entre la placa 328P y la placa driver (si no, no se puede subir)**
(2) Editar: ID 3, 4
(3) Subir el programa
(4) Conectar: placa + placa driver + **servos 3, 4**
(5) Montar el servo horn, lo más paralelo posible

4. Servos 5, 6 – mismos pasos
5. Servos 7, 8 – mismos pasos

## 4. **Ajustar finamente los valores medios**

1. Subir el programa «01 微调MiddlePos值时使用» a la placa

2. Con los dedos en posición cerrada, detener el programa inmediatamente (desconectar el cable de datos) y comprobar si los servo horns están alineados (ver figura). Si no, ajustar los valores de MiddlePos_1 y MiddlePos_2 hasta que queden alineados. Anotar esos valores (8 valores para 8 servos) – se usan en el programa final.

## 5. **Ejecutar el programa de prueba**

1. Rellenar los valores MiddlePos_1 y MiddlePos_2 guardados en el siguiente array y descargar el programa.

## 6. **Ejecutar «02 演示程序»**

(1) Instalar arduino según su sistema: [tutorial de instalación](https://blog.csdn.net/weixin_35509395/article/details/156188274)
(2) En `灵巧手调试\00 TTL串口舵机\arduino程序（MEGA328P开发板）\02 演示程序`, abrir el archivo ino correspondiente a mano izquierda o derecha
(3) Antes de compilar, instalar las bibliotecas FTServo y SCServo en el gestor de bibliotecas
(4) Tipo de placa: «Arduino Nano»
(5) Compilar y subir

Atención: el PC está conectado solo a la placa de desarrollo; la placa aún no se conecta a la placa driver (es decir, no a la mano).

Tras subir con éxito, conectar la placa a la placa driver con tres cables jumper y los servos a la placa driver. Consulte [la conexión del debug con MEGA328P](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link).

La mano ejecuta **«02 演示程序»** en bucle.

Resultado:

## [7. Seguimiento de la mano](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)
