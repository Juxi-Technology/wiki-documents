---
title: "01-Control visual por GUI"
description: "Control visual por GUI de la mano AmazingHand con ESP32-S3: ejecuta gestos y controla los 8 servos PWM desde el PC, con programa empaquetado o código fuente."
---

# 01-Control visual por GUI

Comandos de gestos visuales — Tutorial de uso

Este directorio proporciona una **herramienta de control de PC anfitrión**: tras conectar el ESP32, la computadora permite hacer clic en botones o escribir comandos para que la mano diestra ejecute gestos.

> Aplicable a: ESP32-S3 + 8 servos PWM (accionamiento diferencial). Para la grabación del firmware, consulte las instrucciones de `..\03_firmware_docs`.

## I. Dos modos de uso

|Modo|Requisitos|Adecuado para|
|---|---|---|
|**Programa empaquetado** (recomendado)|Doble clic en `AmazingHand控制台.exe`|Sin instalar Python, listo para usar|
|**Ejecución desde el código fuente**|Python 3.12 de 64 bits|Se necesita seguimiento de gestos o personalización|

## II. Modo 1: doble clic en el exe

1. Doble clic en `AmazingHand控制台.exe`.

2. **Seleccionar el puerto serie**: en la lista desplegable superior, seleccione el puerto COM del ESP32 (ver en el Administrador de dispositivos).

3. Haga clic en **«Conectar»**: la luz de estado se pone verde y el registro muestra "Conectado".

4. Haga clic en los botones de gestos: **piedra / tijera / papel / pulgar arriba / OK / pellizco / señalar / abrir / puño**, la mano diestra los ejecuta.

5. **Mano derecha/izquierda**: marque «Mano derecha» / «Mano izquierda» para cambiar (la dirección de espejo del pulgar es distinta).

6. **Accionamiento directo de servos**: arrastre los 8 controles deslizantes para controlar en tiempo real el ángulo de cada servo (0-180°).

7. **Control diferencial de dedos**: dos barras de progreso por cada dedo——

    - **Flexionar◀▶Estirar**: el dedo se flexiona o se estira (rango -70 ~ +70).

    - **Girar a la derecha◀▶Girar a la izquierda**: el dedo oscila de izquierda a derecha (rango 60 ~ 120, 90 = neutro).

8. **Repetir / Detener**: repite el último gesto / interrumpe de inmediato.

## III. Modo 2: ejecución desde el código fuente

### Instalación de dependencias

Se requiere **Python 3.12 de 64 bits** (mediapipe solo admite 64 bits).

```Bash
# 1. Instalar las dependencias básicas
pip install -r requirements.txt

# 2. Instalar las dependencias de seguimiento (cuando se requiera seguimiento de gestos, crea automáticamente un entorno virtual)
setup_tracking.bat
```

### Ejecución

```Bash
# Iniciar con el entorno de seguimiento (incluye mediapipe)
tracking_env\Scripts\python hand_gui.py
```

> O directamente `python hand_gui.py` (cualquier Python con pyserial).

### Seguimiento de gestos integrado en la GUI

La GUI incluye su propio panel de **seguimiento de gestos** (la cámara sigue los movimientos de la mano):

1. Tras conectar el puerto serie, desplácese hasta el panel «Seguimiento de gestos (cámara MediaPipe)».

2. Seleccione el número de cámara (por defecto 0) y haga clic en **«Iniciar seguimiento»**.

3. Coloque la mano dentro de la imagen de la cámara y la mano diestra seguirá la flexión/estirado.

> El seguimiento requiere que `setup_tracking.bat` haya instalado mediapipe. El exe sin instalación no incluye la función de seguimiento.

## IV. Prueba por línea de comandos (serial_test.py)

```Bash
# Prueba del enlace (confirmar primero que se puede conectar)
python serial_test.py COM3 nop

# Gesto
python serial_test.py COM3 rock         # 石头
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 张开
python serial_test.py COM3 close        # 握拳

# Accionamiento directo de un solo servo
python serial_test.py COM3 servo 1 90   # 舵机1 → 90°

# Centrar todo
python serial_test.py COM3 mid

# Configurar mano izquierda/derecha
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# Barrido de frecuencia/autocomprobación
python serial_test.py COM3 sweep 1      # 舵机1 扫频
python serial_test.py COM3 test         # 全部舵机逐个测试
```

## V. Preguntas frecuentes

|Síntoma|Solución|
|---|---|
|El servo no se mueve|Compruebe la alimentación (fuente independiente de 5V 3A), el puerto COM y el cableado|
|El exe se cierra inesperadamente|Ejecútelo desde el código fuente (la versión empaquetada puede carecer de dependencias)|
|La cámara no muestra imagen|Conceda el permiso de cámara (Configuración→Privacidad→Cámara)|
|La forma de la mano está invertida|Marque la mano derecha/izquierda contraria|

> Para el protocolo completo y la descripción de comandos, consulte `..\03_firmware_docs\用户手册.md`.

