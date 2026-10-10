---
title: Solución de problemas
---

# Solución de problemas

> **[Comprar en la tienda](https://www.juxitech.com/es/products/2-dof-servo-pan-tilt-unit)**

Este capítulo recopila los problemas frecuentes y sus soluciones para ayudarte a identificar y resolver rápidamente todo tipo de problemas durante el uso.

---

## Problemas de hardware

### El servo no responde

**Posibles causas:**
1. La alimentación del servo no está conectada
2. Conexión deficiente entre el servo y la placa controladora
3. Fallo de conexión del puerto serie
4. El servo no está habilitado
**Soluciones:**
1. Comprueba que la alimentación del servo esté bien conectada y reciba corriente
2. Comprueba que los cables entre el servo y la placa controladora estén bien sujetos
3. Ejecuta `examples/diagnostic.py` para ver la información de diagnóstico
4. Asegúrate de haber pulsado `C` para conectar el cardán y de que el servo esté habilitado

### El servo se mueve en la dirección opuesta

**Posibles causas:**
- La dirección de montaje del servo o los parámetros de control del programa deben ajustarse
**Soluciones:**
Modifica el método `calculate_move` en `src/trackers/tracking_controller.py` e invierte el signo del parámetro correspondiente:

# Si la dirección izquierda-derecha está invertida

```python
delta_pan = -int(self.kp_pan * err_x)
```

# Si la dirección arriba-abajo está invertida

```python
delta_tilt = -int(self.kp_tilt * err_y)
```

### El servo vibra

**Posibles causas:**
- Parámetros de seguimiento demasiado sensibles
- Zona muerta demasiado pequeña
- Carga excesiva sobre el servo o alimentación insuficiente
**Soluciones:**
1. Aumenta el parámetro `dead_zone`
2. Aumenta `min_move_interval`
3. Reduce `kp_pan` y `kp_tilt`
4. Comprueba que el voltaje de la alimentación sea correcto

### Fallo de conexión del puerto serie

**Posibles causas:**
- Controlador no instalado
- Número de puerto serie incorrecto
- Puerto serie ocupado por otro programa
- Cable de conexión defectuoso
**Soluciones:**
1. En Windows, comprueba el Administrador de dispositivos y confirma que el controlador esté instalado correctamente
2. Ejecuta `examples/list_ports.py` para encontrar el puerto serie correcto
3. Cierra otros programas que puedan estar ocupando el puerto serie
4. Prueba a cambiar el puerto USB o el cable de datos

---

## Problemas de software

### La cámara no se puede abrir

**Posibles causas:**
- Índice de la cámara incorrecto
- Cámara ocupada por otro programa
- Problema de conexión física de la cámara
- Problema del controlador de la cámara
**Soluciones:**
1. Ejecuta `examples/list_cameras.py` para ver los índices de las cámaras disponibles
2. Cierra otros programas que puedan estar usando la cámara
3. Comprueba que la conexión de la cámara sea correcta
4. Prueba a cambiar el puerto USB

### Error de OpenCV

**Posibles causas:**
- Problema con la versión de OpenCV
- Instalación incompleta de las bibliotecas de dependencias
- Anomalía en el hardware de la cámara
**Soluciones:**
1. Prueba a reinstalar las bibliotecas de dependencias:

```python
pip install --upgrade opencv-python numpy
```

1. Comprueba que la versión de Python cumpla los requisitos (>=3.8)
2. Revisa la traza del error para localizar el código problemático

### Fallo al instalar las dependencias

**Posibles causas:**
- Versión de pip demasiado antigua
- Problema de conexión de red
- Problema de permisos
**Soluciones:**
1. Primero actualiza pip:

```python
pip install --upgrade pip
```

1. Usa un espejo nacional para acelerar la instalación:

```python
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

1. Comprueba que la conexión de red sea correcta

### El programa tarda en iniciarse

**Posibles causas:**
- No se usa DSHOW en Windows
- La inicialización del hardware de la cámara requiere tiempo
**Soluciones:**
1. Confirma que el código use `cv2.CAP_DSHOW` como backend de la cámara
2. Comprueba si otro programa está usando la cámara
3. Espera unos segundos; la inicialización de la cámara suele tardar un poco

---

## Problemas de seguimiento

### El reconocimiento del objetivo no es preciso

**Durante el seguimiento de color:**
- Comprueba que el contraste entre el color del objetivo y el fondo sea evidente
- Ajusta los parámetros de color (en `src/detectors/color_detector.py`)
- Asegúrate de que la iluminación sea suficiente y uniforme
**Durante el seguimiento facial:**
- La iluminación debe ser suficiente; evita la contraluz
- El rostro debe estar de frente a la cámara
- Mantén una distancia adecuada

### El cardán no se mueve durante el seguimiento

**Posibles causas:**
1. No se ha conectado el cardán
2. No se ha bloqueado el objetivo
3. El objetivo está dentro de la zona muerta
4. Error en el programa
**Soluciones:**
1. Confirma que hayas pulsado `C` para conectar el cardán
2. Confirma que hayas pulsado `T` para bloquear el objetivo
3. Revisa la salida de la consola en busca de mensajes de error
4. Comprueba si el objetivo está dentro del rango de `dead_zone`

### La dirección del seguimiento está invertida

**Soluciones:**
Consulta la solución del apartado "El servo se mueve en la dirección opuesta".

### Vibración durante el seguimiento

**Soluciones:**
Consulta la solución del apartado "El servo vibra".

### Fallo al bloquear el objetivo

**Posibles causas:**
1. En el momento del bloqueo, el objetivo no está en el centro de la imagen
2. El objetivo es demasiado pequeño o su color no es evidente
3. No se ha detectado el objetivo
**Soluciones:**
1. Asegúrate de que el objetivo esté en el centro de la imagen al bloquearlo
2. El tamaño del objetivo debe ser adecuado para que se detecte correctamente
3. Revisa la salida de la consola para confirmar si el objetivo se detecta
4. Vuelve a ajustar la posición del objetivo y bloquéalo de nuevo

---

## Uso de la herramienta de diagnóstico

### Usar el programa de diagnóstico

El sistema incluye una herramienta de diagnóstico completa que permite probar todo el hardware del sistema:

```python
python examples/diagnostic.py --camera 0 --port COM3
```

El programa de diagnóstico probará sucesivamente:
1. Si la cámara funciona correctamente
2. Si el puerto serie puede conectarse correctamente
3. Si el servo responde correctamente
Al finalizar el diagnóstico se mostrarán los resultados de las pruebas, lo que ayuda a localizar el problema.

### Consultar la salida de depuración

Cuando el programa se ejecuta, la consola muestra información de depuración relevante, que incluye:
- Información del objetivo detectado
- Coordenadas del objetivo
- Valor del error
- Instrucciones de movimiento del cardán
- Cualquier mensaje de error
Observa con atención estas salidas; te ayudarán a localizar el problema rápidamente.

---

## Métodos de recuperación

### Devolver el cardán a una posición segura

- Pulsa `R` para centrar el cardán
- O llama a `gimbal.return_to_center()`

### Restablecer todos los ajustes

- Pulsa `S` para detener el seguimiento
- Pulsa `R` para centrar
- Vuelve a bloquear el objetivo

### Volver a calibrar

Si el efecto del seguimiento es claramente deficiente, puedes:
1. Ajustar los parámetros de seguimiento
2. Volver a bloquear el objetivo
3. Reiniciar el programa si es necesario
4. Comprobar las conexiones del hardware

---

## Obtener ayuda

Si los métodos anteriores no resuelven el problema, registra la siguiente información:
- Información del sistema operativo
- Versión de Python
- Mensajes de error detallados
- Pasos para reproducir el problema
- Resultado de ejecutar diagnostic
