---
title: Hardware y preparación del entorno
---

# Hardware y preparación del entorno

> **[Comprar en la tienda](https://www.juxitech.com/es/products/2-dof-servo-pan-tilt-unit)**

Este capítulo describe en detalle el proceso completo de montaje del hardware, conexión y configuración del entorno.

---

## Lista de hardware

Antes de empezar a usar el producto, verifica que dispones de los siguientes componentes:

|Componente|Modelo/Especificaciones|Cantidad|
|---|---|---|
|Servo|SCS009|2|
|Soporte del cardán|Estructura del cardán 2-DOF|1|
|Placa controladora de servos|Placa controladora con chip CH343|1|
|Cámara USB|Resolución mínima de 640x480|1|
|Fuente de alimentación del servo|Rango de voltaje 4-7,4 V, se recomienda 6 V|1|
|Cable de datos serie|Conecta la placa controladora con el ordenador|1|


---

## Descripción de los parámetros del servo


|Parámetro|Servo n.º 1 (rotación izquierda-derecha)|Servo n.º 2 (inclinación arriba-abajo)|
|---|---|---|
|Rango de posición|220-802|220-511|
|Posición central|511|511|
|Valor mínimo|220 corresponde a la posición más a la izquierda|220 corresponde a la posición más arriba|
|Valor máximo|802 corresponde a la posición más a la derecha|511 corresponde a la posición central|


---

## Conexión del hardware

### Paso 1: Montar los servos y el soporte del cardán

1. Instala el servo n.º 1 (para la rotación izquierda-derecha) en la posición designada del soporte inferior del cardán y aprieta los tornillos para asegurarlo
2. Instala el servo n.º 2 (para la inclinación arriba-abajo) en el soporte superior del cardán y fíjalo de la misma manera
3. Instala la estructura de fijación de la cámara siguiendo las instrucciones

### Paso 2: Conectar los servos a la placa controladora

1. Conecta los cables de datos de ambos servos a los puertos de servo de la placa controladora
2. Presta atención al orden de conexión de los cables del servo; los colores suelen ser rojo (alimentación), negro (tierra) y blanco/amarillo (señal)
3. Asegúrate de conectar cada servo al ID correspondiente: el servo con ID 1 para izquierda-derecha y el servo con ID 2 para arriba-abajo

### Paso 3: Conectar la alimentación y el puerto serie

1. Conecta la fuente de alimentación del servo al puerto de alimentación de la placa controladora
2. Usa el cable de datos serie para conectar la placa controladora al puerto USB del ordenador
3. Conecta la cámara al ordenador

---

## Requisitos del sistema y del entorno

### Sistemas operativos compatibles

- Windows 10/11
- Distribuciones de Linux (como Ubuntu 20.04 o superior)

### Versión de Python

Python 3.8 o superior

---

## Instalación de controladores y dependencias

### Instalar el controlador del puerto serie

#### Windows

1. Visita el sitio web oficial del fabricante del chip CH343 y descarga el instalador del controlador para tu versión de Windows
Instalación del controlador CH343 (instalar como administrador)
https://www.wch.cn/downloads/CH343SER_EXE.html

>
> Si en el Administrador de dispositivos aparece reconocido como dispositivo desconocido "usb single serial" o "usb serial", haz clic derecho sobre él y desinstálalo primero, ¡y luego instala el controlador!

1. Ejecuta el instalador y sigue las instrucciones para completar la instalación del controlador
2. Conecta la placa controladora de servos al ordenador; en el Administrador de dispositivos debería aparecer el dispositivo de puerto serie

#### Linux

La mayoría de las distribuciones de Linux ya incluyen el controlador de puerto serie CH343, por lo que no es necesario instalarlo por separado. Si tienes problemas, puedes intentar:
1. Comprobar si el kernel ha cargado el controlador `lsmod | grep ch343`
2. Si no está cargado, vuelve a conectar el dispositivo o reinicia el sistema

### Instalar las dependencias de Python

Ejecuta en el directorio raíz del proyecto:

```python
pip install -r requirements.txt
```

Las principales dependencias del proyecto incluyen:
- opencv-python: adquisición y procesamiento de imágenes
- numpy: biblioteca de cálculo numérico
- pyserial: biblioteca de comunicación por puerto serie

---

## Verificar la conexión del hardware

Antes de iniciar el programa oficial, puedes usar las herramientas para verificar la conexión del hardware.

### Buscar cámaras disponibles

Ejecuta el siguiente comando para listar las cámaras disponibles:

```python
python examples/list_cameras.py
```

El programa detectará y listará todas las cámaras disponibles; anota el índice de la cámara que necesitas usar.

### Buscar puertos serie disponibles

Ejecuta el siguiente comando para listar los puertos serie disponibles:

```python
python examples/list_ports.py
```

Anota el nombre del dispositivo de puerto serie que vas a usar.

### Diagnóstico del hardware

Si necesitas realizar una comprobación completa del hardware, puedes ejecutar la herramienta de diagnóstico:

```python
python examples/diagnostic.py --camera 0 --port COM3
```

El programa de diagnóstico probará sucesivamente la cámara, el puerto serie y el cardán.

---

## Avisos de seguridad

Durante el uso, ten en cuenta las siguientes precauciones de seguridad:
1. La alimentación del servo debe estar dentro del rango especificado (4-7,4 V) para evitar dañarlo
2. Evita que el servo permanezca largo tiempo en posiciones extremas para prolongar su vida útil
3. Antes de cortar la alimentación, se recomienda centrar el cardán para reducir la carga en el próximo arranque
