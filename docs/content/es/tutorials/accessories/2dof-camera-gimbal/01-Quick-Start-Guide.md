---
title: Guía de inicio rápido
---

# Guía de inicio rápido

> **[Comprar en la tienda](https://www.juxitech.com/es/products/2-dof-servo-pan-tilt-unit)**

> Dirigido a usuarios que ya tienen el hardware montado y desean probar las funciones rápidamente

---

## Paso 0: Buscar dispositivos disponibles

Antes de empezar, necesitas encontrar la cámara y el puerto serie correctos.

### Buscar cámaras disponibles

```python
python examples/list_cameras.py
```

El programa listará todas las cámaras disponibles y sus índices; anota el índice que necesitas usar (normalmente 0).

### Buscar puertos serie disponibles

```python
python examples/list_ports.py
```

El programa listará todos los puertos serie disponibles: en Windows son COM3, COM4, etc.; en Linux, /dev/ttyUSB0, etc.

---

## Paso 1: Instalar las dependencias

```python
pip install -r requirements.txt
```

---

## Paso 2: Ejecutar los tutoriales paso a paso en orden (opcional pero recomendado)

Para comprender mejor el sistema, se recomienda ejecutar estos programas en orden:
1. **01_camera_only.py** - Solo muestra la imagen de la cámara, sin conectar el cardán

```python
python examples/01_camera_only.py --camera 0
```

Función: verificar si la cámara funciona correctamente
1. **02_gimbal_only.py** - Solo controla el cardán, sin conectar la cámara

```python
python examples/02_gimbal_only.py --port COM3
```

Función: verificar si la conexión entre el servo y la placa controladora es correcta
1. **03_simple_gimbal_camera.py** - Cámara y cardán combinados

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

Función: controlar manualmente el cardán mientras se visualiza la imagen de la cámara
1. **04_color_track_simple.py** - Seguimiento de color simple (sin bloqueo)

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

Función: la demostración más básica de seguimiento automático

---

## Paso 3: Ejecutar el programa completo

Cuando te familiarices con las funciones básicas, ejecuta el programa completo de seguimiento automático:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

---

## Atajos de teclado del programa completo


|Tecla|Función|
|---|---|
|1|Cambiar al modo de seguimiento facial|
|2|Cambiar al modo de seguimiento de color|
|C|Conectar el cardán|
|R|Centrar el cardán|
|T|Bloquear/iniciar el seguimiento del objetivo|
|S|Detener el seguimiento|
|X|Modo de color: rojo|
|Y|Modo de color: verde|
|Z|Modo de color: azul|
|Q|Salir del programa|


---

## Flujo de prueba rápida

### Prueba del seguimiento de color

1. Pulsa `C` para conectar el cardán
2. Pulsa `2` para entrar en el modo de seguimiento de color
3. Coloca el objeto rojo (u otro color) en el centro de la imagen
4. Pulsa `T` para bloquear el objetivo
5. Mueve el objeto y observa cómo el cardán lo sigue

### Prueba del seguimiento facial

1. Pulsa `C` para conectar el cardán
2. Pulsa `1` para entrar en el modo de seguimiento facial
3. Coloca el rostro en el centro de la imagen
4. Pulsa `T` para bloquear el objetivo
5. Mueve el rostro y observa cómo el cardán lo sigue

---

## Respuestas rápidas a preguntas frecuentes

P: ¿El programa indica que no encuentra el número de puerto serie?
R: Ejecuta `list_ports.py` para ver los puertos serie disponibles y especifica el puerto con el parámetro `--port`.
P: ¿La cámara no se abre?
R: Ejecuta `list_cameras.py` para ver las cámaras disponibles y especifica el índice con el parámetro `--camera`.
P: ¿El cardán no se mueve?
R: Comprueba que hayas pulsado `C` para conectar el cardán y que la alimentación del servo esté conectada.
P: ¿La dirección del seguimiento está invertida?
R: Consulta el capítulo de solución de problemas.
