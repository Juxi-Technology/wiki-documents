---
title: Funciones avanzadas y seguimiento
---

# Funciones avanzadas y seguimiento

> **[Comprar en la tienda](https://www.juxitech.com/es/products/2-dof-servo-pan-tilt-unit)**

Este capítulo describe en detalle las funciones de seguimiento automático del sistema, incluidos el seguimiento de color, el seguimiento facial y el seguimiento de códigos QR, así como el mecanismo de bloqueo de objetivo y el ajuste de parámetros.

---

## Resumen de los modos de seguimiento automático

El sistema admite tres modos de seguimiento automático:
1. Seguimiento de color: seguir objetos de un color específico
2. Seguimiento facial: seguir rostros
3. Seguimiento de códigos QR: seguir códigos QR

---

## Seguimiento de color

### Selección de color

El sistema admite el seguimiento de varios colores:
- Rojo
- Verde
- Azul
En el programa puedes cambiar de color con las teclas:
- `X`: seleccionar rojo
- `Y`: seleccionar verde
- `Z`: seleccionar azul

### Flujo de uso del seguimiento de color

1. Pulsa `C` para conectar el cardán
2. Pulsa `2` para entrar en el modo de seguimiento de color
3. Coloca el objeto del color objetivo en el centro de la imagen
4. Pulsa `T` para bloquear el objetivo
5. Mueve el objetivo y observa el efecto de seguimiento del cardán

### Ejemplo simple de seguimiento de color

También puedes usar el programa de ejemplo de seguimiento de color simple:

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

Este programa ofrece la función de seguimiento de color más básica; es ideal para aprender.

---

## Seguimiento facial

### Principio del seguimiento facial

El sistema utiliza el clasificador en cascada Haar de OpenCV para la detección de rostros. Tras detectar un rostro, el sistema calcula automáticamente la posición del objetivo y controla el cardán para que lo siga.

### Flujo de uso del seguimiento facial

1. Pulsa `C` para conectar el cardán
2. Pulsa `1` para entrar en el modo de seguimiento facial
3. Coloca el rostro en el centro de la imagen
4. Pulsa `T` para bloquear el objetivo
5. Mueve el rostro y el cardán lo seguirá automáticamente

### Consejos para mejorar la tasa de éxito de la detección de rostros

- Mantén una iluminación suficiente y evita la contraluz
- El rostro debe estar de frente a la cámara
- Mantén una distancia adecuada (se recomienda 1-3 metros)
- Evita escenas con varios rostros, o usa el mecanismo de bloqueo para fijar el objetivo del seguimiento

---

## Seguimiento de códigos QR

El modo de seguimiento de códigos QR utiliza el QRCodeDetector de OpenCV para el reconocimiento y la localización de códigos QR. El uso es similar a los dos modos anteriores:
1. Conecta el cardán y entra en el modo de seguimiento de códigos QR
2. Coloca el código QR en el centro de la imagen y pulsa `T` para bloquearlo
3. Mueve el código QR y observa el efecto de seguimiento del cardán

---

## Mecanismo de bloqueo de objetivo

### Función del bloqueo

El mecanismo de bloqueo de objetivo es una función clave del sistema; sus funciones incluyen:
- Registrar la posición central y el tamaño del objetivo en el momento del bloqueo
- Cuando aparecen varios objetivos, priorizar el más cercano al punto de bloqueo
- Evitar saltos frecuentes entre objetivos y mantener la estabilidad del seguimiento

### Flujo de bloqueo

1. Coloca el objeto objetivo en el centro de la imagen
2. Pulsa `T` para bloquearlo
3. Una vez bloqueado, el sistema dará prioridad al objetivo más similar al del momento del bloqueo
4. Pulsa `S` para cancelar el bloqueo y detener el seguimiento

### Lógica de selección al bloquear

Tras el bloqueo, el sistema tiene en cuenta dos factores al seleccionar el objetivo:
- Distancia: lejanía del centro del objetivo respecto al punto de bloqueo (peso 70%)
- Tamaño: similitud del tamaño del objetivo con el del momento del bloqueo (peso 30%)
- El sistema elige para el seguimiento el objetivo con la puntuación global más alta

---

## Ajuste de los parámetros de control del seguimiento

En `src/trackers/tracking_controller.py` hay los siguientes parámetros ajustables:

|Parámetro|Valor predeterminado|Descripción|
|---|---|---|
|kp_pan|0.08|Ganancia proporcional del seguimiento izquierda-derecha|
|kp_tilt|0.12|Ganancia proporcional del seguimiento arriba-abajo|
|dead_zone|30|Zona muerta (píxeles); dentro de este rango el cardán no se mueve|
|min_move_interval|0.15|Intervalo mínimo de movimiento (segundos); limita la frecuencia de movimiento del cardán|


### Cómo ajustar los parámetros

- **Seguimiento demasiado lento**: aumenta `kp_pan` y `kp_tilt`
- **Seguimiento demasiado sensible que provoca vibración**: reduce `kp_pan` y `kp_tilt`, aumenta `min_move_interval` o aumenta `dead_zone`
- **Ajustes finos frecuentes que provocan vibración**: aumenta `dead_zone`
- **Dirección invertida**: cambia el signo de `delta_pan` o `delta_tilt` en el método `calculate_move`

---

## Ejemplo completo de uso del seguimiento

A continuación se muestra un ejemplo completo del flujo de uso:
1. Inicia el programa:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

1. Pulsa `C` para conectar el cardán
2. Pulsa `2` para seleccionar el modo de seguimiento de color
3. Coloca el objeto rojo en el centro de la imagen
4. Pulsa `T` para bloquear el objetivo
5. Mueve el objeto y observa el efecto de seguimiento del cardán
6. Si quieres cambiar a verde, pulsa `Y` y vuelve a pulsar `T` para bloquear
7. Pulsa `S` para detener el seguimiento y `R` para centrar
8. Pulsa `Q` para salir

---

## Consejos para desarrollo avanzado

Si necesitas personalizar funciones o desarrollar sobre el proyecto, puedes consultar:
- `src/sc_servo.py`: capa de bajo nivel de comunicación del servo
- `src/gimbal.py`: control del cardán
- `src/trackers/tracking_controller.py`: controlador de seguimiento
- `src/detectors/`: diversos detectores de objetivos
