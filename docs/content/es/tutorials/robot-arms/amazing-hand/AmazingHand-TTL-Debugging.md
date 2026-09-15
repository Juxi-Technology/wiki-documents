---
title: Tutorial de depuración de la mano hábil (servo TTL)
description: "Primero descargue el paquete comprimido «灵巧手调试.zip» y extráigalo; luego use el documento «使用arduio程序调试灵巧手过程（TTL舵机）» para configurar IDs de servos, calibrar, alinear el centro y ejecutar la demo, o consulte el código de código abierto oficial."
---

# Tutorial de depuración de la mano hábil (servo TTL)

> **[Comprar en la tienda](https://www.juxitech.com/es/products/amazinghand)**


Primero descargue el paquete comprimido «[灵巧手调试.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc)» y extráigalo. Luego, mediante el documento «使用arduio程序调试灵巧手过程（TTL舵机）», puede configurar IDs de servos, calibrar, alinear la posición central y ejecutar el programa demo, o consultar el [código de código abierto oficial](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample).

**Sin desmontar el producto terminado** (IDs de servos, calibración y posición central ya ajustados de fábrica) puede saltar directamente al **[punto 6: ejecutar «02 演示程序»](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188003&from=from_node_link)** y al punto 7 **[seguimiento de la mano](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188027&from=from_node_link)**.

![imagen – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTQ0NjE2ZmE3MmFlM2ZkMGQ5YmE2MmY3NTUyZDdjMWRfZjY1YjhhN2Q4ZjhhOWQ0NGE5ZWM4YWRjZDY3N2EwYjZfSUQ6NzYzODkzOTYxMTI1MDc4OTMzM18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 1. Conexión para depurar la mano

Una opción es usar el PC con software host como Python (software host Feetech o código Python).
La otra es usar un microcontrolador como MEGA328P o una placa de desarrollo/controlador comprada.

Conexión de la siguiente manera:
(1) Conexión para depurar con Python (solo placa driver de servos):

![1. Conexión para depurar la mano – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTdmMjBiMGQzMTI2ODllOWMzYTU2N2ZkYWZlMzVkODdfNjNlZTQ2OTI4M2M3Mzg2NmZmZDNiYjI5Zjc3NDg0MjZfSUQ6NzYzODkzOTYxMTQ4OTg0ODI5MV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) Conexión para depurar con MEGA328P (placa driver de servos + placa 328P):

**¡Observe bien las posiciones de los pines de la placa MEGA328P!**

![1. Conexión para depurar la mano – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjFjYzRiMGQ0ZGNjN2M0MmUyMTY1MjNiMjQ4MzQ4NmZfM2JmYWU5NmZjNDQyY2Y1MGZkNzExYTJiMDg1OGRlMjlfSUQ6NzYzODkzOTYwOTIwNDM5NDk2NV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Conexión para depurar la mano – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzIxZTg3NzMxNzZiYTRhMWMzNmM5ODJhMzZhNTE2YzZfNDY1MTNkNTI3YTVmYzBkY2U2YjViZTQzZDU2YmI5NzBfSUQ6NzYzODkzOTYxMDQxMjE0MTUzNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Conexión para depurar la mano – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmYwNzM3ZjRiZjk3Njg1M2UyOGMwNzM0NmJhNjliMDNfNGE0NmRlYTI3MDY4ZDA1M2IwNTI3NTczZDE3NTBhNzhfSUQ6NzYzODkzOTYwOTU2NDkwODUwNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Conexión para depurar la mano – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTUwM2U2Nzc0MjVhNzczODJiMGUwNjA0YTdjZWM0YTVfYWU4ZTQzOWRjOTlkOWU4NjhlNWFlOGJiODViNzNjNDRfSUQ6NzYzODkzOTYwNzY5MDk3MjEwOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

A continuación, el proceso de depuración con el microcontrolador. El microcontrolador ejecuta el programa demo en bucle; basta desconectar el cable de datos para detenerlo.

## 2. Configurar IDs de servos

Una mano usa 8 servos: mano derecha ID 1-8, mano izquierda ID 11-18

Posición central de fábrica: derecha [451,571,451,571,451,571,451,571], izquierda [571,451,571,451,571,451,571,451]

1. Conexión: conectar **cada** servo con la placa driver, uno a uno.

![2. Configurar IDs de servos – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWM0NTY2YjdjZWU5ZmNiNmJhZWRhODg0NjgwZDJiZjlfNjMzNGZmNzY1NTg3YmM5ZTMyNGRlYzk4YzdiMmZhYmNfSUQ6NzYzODkzOTYwNzUzOTQzNjUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2. Usar el software host FD1.9.8.2 del fabricante de servos para la configuración
FD.rar

![2. Configurar IDs de servos – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmI3MTMyZTFlMjRmM2U1OTY3M2JkN2ZlYWYwM2MyMzdfYjA0NzhmZDNjODMyYjNiNmYyZjBkN2Q2NzJkNDUxMmVfSUQ6NzYzODkzOTYwODM0OTAxOTA5MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![2. Configurar IDs de servos – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGJmNWE2MGEwZGU4ZGUxMWU4ZDA2YWIwYWFkMDk3YzJfMjcxOGRlZTE2Mjg3MDQ0OWExNjJmODU1OTBmYTBhZDRfSUQ6NzYzODkzOTYxMDcyNjY4MTU3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![2. Configurar IDs de servos – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmQyNGIyMTQwOTExYzM3YzJhNGY2ZWQwMGZkOGI5NjdfZWJiYTYwZDZjNDlmNzY1OGRjYjEwMmRhMGEzMWZkZDBfSUQ6NzYzODkzOTYwODAxMzQ0MTk4MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 3. **Fijar el servo horn**

1. Subir el programa «安装白色伺服喇叭时使用» a la placa de desarrollo

Función del programa: llevar el engranaje del servo a una posición aproximadamente central; los ángulos posteriores se basan en esta posición central.

(1) Instalar el software arduino, según su sistema consulte el [tutorial de instalación](https://blog.csdn.net/weixin_35509395/article/details/156188274); antes de compilar, instale en el gestor de bibliotecas las bibliotecas FTServo y SCServo

![3. Fijar el servo horn – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjU0NGRjM2VhZDU4NGViMmU4YjBkNjQ3OGRmYzMxOGFfMzYxMzAxMDM1NmFhYjFjM2ZhMTlmODMwNDBiOWUwMzlfSUQ6NzYzODkzOTYwNzU1MjI4MTUzOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) Tipo de placa: elegir «Arduino Nano»

![3. Fijar el servo horn – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjdiYmNjMzFjMjE3OTZkNjAzYjZkM2RhZDRiZDY5MDFfZTVjNTAyZGU5ZGFmYmJmYzgwNDI3YzMyOWNmMjljYzVfSUQ6NzYzODkzOTYxMTUyMzQ1MTg1NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2. Depurar servos 1, 2
(1) Editar: según el ID del servo a depurar (p. ej., índice → ID 1, 2)

![3. Fijar el servo horn – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2UyYzFjYmJiNjA3YTZkMjY4MWZkYjdhMzFhMDNkZDlfMjQ4NjdlY2M4ZjI2ZjcxNjJlNDc5YmQyNGNmNGZhYzVfSUQ6NzYzODkzOTYwNzYyMzQwNDUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) Subir el programa a la placa
(3) Conectar: placa + placa driver + **servos 1, 2** – se escucha el engranaje girar un ángulo y detenerse.

![3. Fijar el servo horn – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2U4MTBhZWY4YmY0Y2MzOWU5MzhiODA0ZDZhODc4MzRfZGEzZjM4ODdkOWQ1MTJmZjNiYmQxNTMyMjQ2ZDQ0MDZfSUQ6NzYzODkzOTYwNzkzNTY4MzU1OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(4) Montar el servo horn en el engranaje, lo más paralelo posible

![3. Fijar el servo horn – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTUyMDI0ODVjYjhhNDBjZDJkZmQ1YjNmMzA2NDc5ZTlfNTUxNmQ2MWQwOTdmYzdjOTM2YTNkZTkxYzYzYjI5YmVfSUQ6NzYzODkzOTYwODAxMzQ1ODM2NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

3. Depurar servos 3, 4
(1) **Desconectar el cableado entre la placa 328P y la placa driver (si no, no se puede subir)**
(2) Editar: ID 3, 4

![3. Fijar el servo horn – 6](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2RlNzE0MzI1ZDYxY2I2YjE4Y2YyNWZkYjM0MTgyOGFfZTI2MWI2MmQ0NmJlNTgwOTEzZDAzN2U4OGRmOTkwNDFfSUQ6NzYzODkzOTYxMTI0NjY2MDU3OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(3) Subir el programa
(4) Conectar: placa + placa driver + **servos 3, 4**
(5) Montar el servo horn, lo más paralelo posible

4. Servos 5, 6 – mismos pasos
5. Servos 7, 8 – mismos pasos

## 4. **Ajustar finamente los valores medios**

1. Subir el programa «01 微调MiddlePos值时使用» a la placa

2. Con los dedos en posición cerrada, detener el programa inmediatamente (desconectar el cable de datos) y comprobar si los servo horns están alineados (ver figura). Si no, ajustar los valores de MiddlePos_1 y MiddlePos_2 hasta que queden alineados. Anotar esos valores (8 valores para 8 servos) – se usan en el programa final.

![4. Ajustar finamente los valores medios – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmExMWZhZTY2NTUxMWE0OGJkMjg5OWJjM2QwNjcwMmJfNDE3MzY4ODI3OGRjNTU0YjlhMDA3ZDViMGNkZmUxNjZfSUQ6NzYzODkzOTYxMTE5MjAxOTkyMF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![4. Ajustar finamente los valores medios – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmY0ZTAyNTRkNGQ5OGQyMTAyZTkwNDk0Y2RmNDAzMjRfZGRjODE0NjQwODBlOTJkY2Q5NzUwN2M3OTZmYjEwZjlfSUQ6NzYzODkzOTYwODEwMzQ1NTY5NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 5. **Ejecutar el programa de prueba**

1. Rellenar los valores MiddlePos_1 y MiddlePos_2 guardados en el siguiente array y descargar el programa.

![5. Ejecutar el programa de prueba – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzA4ZmVjODQzYzU3ZjIwMjU2NGQ1NjQ4YzFkZjFjZDdfMmU3ZDU0NGJiODU3OWI4ZDQzNDNiNzY0YjNkYzllYWZfSUQ6NzYzODkzOTYxMTI2MzQzNzc2Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 6. **Ejecutar «02 演示程序»**

(1) Instalar arduino según su sistema: [tutorial de instalación](https://blog.csdn.net/weixin_35509395/article/details/156188274)
(2) En `灵巧手调试\00 TTL串口舵机\arduino程序（MEGA328P开发板）\02 演示程序`, abrir el archivo ino correspondiente a mano izquierda o derecha

![6. Ejecutar «02 演示程序» – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGU3YzRlZWM2ZDRiNWZmYjNjMWQ3MmQzNGVkOTYxNTNfNzE3NWFjMGY4MGY4ZjJkYmJhMGY1NjhiMDAxNTFlMmVfSUQ6NzYzODkzOTYwODAxMzQ5MTEzMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(3) Antes de compilar, instalar las bibliotecas FTServo y SCServo en el gestor de bibliotecas

![6. Ejecutar «02 演示程序» – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzgwNjdhZWY4ZjAzNmIzNzMyYmIzMGZkYzE0OTNiMTBfNmU3ODBjZTA2ODMwMzc5MWJhMDJmNDkzMDU3MmY1MjlfSUQ6NzYzODkzOTYwNzk0NjU3ODg3Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(4) Tipo de placa: «Arduino Nano»

![6. Ejecutar «02 演示程序» – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTc0YjYyYjRjMTY4NGI5NzIxN2RhNjA0MTQ5YzE3OTRfYjYzZGYyNjkwMzY5ZTM3MjIzZWIxNmI4MWUzMGMxNmZfSUQ6NzYzODkzOTYxMTUwMjQxNDgwMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(5) Compilar y subir

Atención: el PC está conectado solo a la placa de desarrollo; la placa aún no se conecta a la placa driver (es decir, no a la mano).

Tras subir con éxito, conectar la placa a la placa driver con tres cables jumper y los servos a la placa driver. Consulte [la conexión del debug con MEGA328P](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link).

La mano ejecuta **«02 演示程序»** en bucle.

Resultado:

![6. Ejecutar «02 演示程序» – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTY0NzA2NGI2OTBjNzkwODE4ZGFhNGM2ZDFkNjhhMzFfZDMxNjlmZWZhNmMxYjQ0YTNhMjZhZWEzYWU0OGY2YzBfSUQ6NzYzODkzOTYwOTI1NDY0NDY3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## [7. Seguimiento de la mano](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)
