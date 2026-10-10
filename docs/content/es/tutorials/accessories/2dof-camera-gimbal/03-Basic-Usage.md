---
title: Uso básico
---

# Uso básico

> **[Comprar en la tienda](https://www.juxitech.com/es/products/2-dof-servo-pan-tilt-unit)**

Este capítulo describe en detalle los métodos básicos de control del cardán y su flujo de uso, para ayudarte a familiarizarte con las operaciones básicas.

---

## Resumen de los modos de control

El sistema del cardán admite dos modos principales de control:
1. Control por teclado: controlar manualmente el movimiento del cardán con las teclas del teclado
2. Seguimiento automático: el sistema detecta y sigue el objetivo automáticamente

---

## Control por teclado

### Descripción de los atajos de teclado

Estos son los atajos de teclado disponibles en el programa principal:

|Tecla|Función|
|---|---|
|Tecla de flecha ←|Girar el cardán a la izquierda|
|Tecla de flecha →|Girar el cardán a la derecha|
|Tecla de flecha ↑|Inclinar el cardán hacia arriba|
|Tecla de flecha ↓|Inclinar el cardán hacia abajo|
|C|Conectar o desconectar el cardán|
|R|Centrar el cardán (volver a la posición inicial)|
|1|Cambiar al modo de seguimiento facial|
|2|Cambiar al modo de seguimiento de color|
|T|Bloquear/iniciar el seguimiento del objetivo|
|S|Detener el seguimiento|
|X|Modo de color: seguir objetos rojos|
|Y|Modo de color: seguir objetos verdes|
|Z|Modo de color: seguir objetos azules|
|Q|Salir del programa|


### Ejemplo independiente de control por teclado

También puedes practicar con el programa de control por teclado independiente:

```python
python examples/keyboard_control.py --port COM3
```

Este programa solo ofrece funciones básicas de control del cardán; es ideal para principiantes.

---

## Flujo de operaciones básicas

### Inicio y conexión

1. Inicia el programa principal con el siguiente comando:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3
```

1. Una vez iniciado el programa, pulsa `C` para conectar el cardán
2. Observa si el servo responde con normalidad; si hay algún problema, consulta el capítulo de solución de problemas

### Práctica de control manual

1. Pulsa las teclas de flecha y observa si el movimiento del cardán coincide con lo esperado
2. Practica mover el cardán a distintas posiciones con las teclas de flecha
3. Pulsa `R` para centrar el cardán
4. Familiarízate con los límites de posición mínima y máxima del cardán
Se recomienda realizar los siguientes ejercicios:
- Ejercicio 1: mueve el cardán a las cuatro posiciones extremas (más a la izquierda, más a la derecha, más arriba y más abajo) para familiarizarte con el rango de posición
- Ejercicio 2: centra el cardán desde cualquier posición y observa si el retorno al centro es fluido
- Ejercicio 3: prueba los ajustes finos para familiarizarte con la precisión de movimiento del servo

---

## Programas de ejemplo básicos

El proyecto ofrece varios programas de ejemplo progresivos para que aprendas:

### Solo mostrar la cámara

```python
python examples/01_camera_only.py --camera 0
```

Este programa solo abre la cámara y muestra la imagen en tiempo real, sin control del cardán. Es ideal para verificar si la cámara funciona correctamente.

### Solo controlar el cardán

```python
python examples/02_gimbal_only.py --port COM3
```

Este programa solo ofrece control del cardán, sin cámara. Es ideal para verificar si la conexión entre el servo y la placa controladora es correcta.

### Cámara y cardán combinados

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

Este programa combina la visualización de la cámara con el control del cardán, para observar el efecto conjunto de la imagen y el cardán.

---

## Precauciones de uso

Durante el uso, ten en cuenta los siguientes puntos:
1. Después de conectar el cardán, confirma que la alimentación del servo esté enchufada
2. Durante el control manual, evita permanecer mucho tiempo en las posiciones extremas
3. Evita golpear o forzar el soporte del cardán durante la manipulación
4. Si el servo vibra de forma anómala o emite ruidos extraños, corta la alimentación de inmediato y revísalo
5. Si no vas a usarlo durante mucho tiempo, se recomienda desconectar la alimentación
