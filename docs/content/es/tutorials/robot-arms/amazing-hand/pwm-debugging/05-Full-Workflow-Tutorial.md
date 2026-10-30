---
title: "AmazingHand PWM — Mano diestra: tutorial de uso completo"
description: "Tutorial completo de la versión PWM de AmazingHand: desde el firmware PWM del ESP32-S3 y los comandos gestuales del PC anfitrión hasta el seguimiento de gestos por GUI / dora."
---

# AmazingHand PWM — Mano diestra: tutorial de uso completo

> **Paquete de entrega incluido:** [delivery_package.zip](/downloads/delivery_package.zip)


> Tutorial de uso integral, desde los **comandos gestuales del PC anfitrión** hasta el **seguimiento de gestos**.
> Hardware aplicable: ESP32-S3 + 8 canales de servos PWM (accionamiento diferencial).
>
> Versión: 2026-08-20 · Firmware incluido: versión por componentes ESP-IDF (`AmazingHand_Serial`)

---

## Capítulo 0: Navegación del tutorial

Este tutorial está organizado **en orden secuencial**. Primero identifique qué ruta quiere seguir y luego vaya al capítulo correspondiente.

| Ruta | Uso | Requisitos previos | Capítulos |
|------|------|----------|------|
| **A. Comandos gestuales del PC anfitrión** | Pulsar botones o escribir comandos para que la mano robótica haga gestos (piedra/tijera/papel/pulgar arriba…) | Python + firmware grabado | Capítulos 1-4 |
| **B. Seguimiento de gestos integrado en la GUI** | La cámara sigue los movimientos de la mano y la mano robótica los reproduce en tiempo real (versión simplificada, sin IK) | A + Python de 64 bits + mediapipe | Capítulos 1-4 + 5.1 |
| **C. Seguimiento IK oficial de dora** | Cadena oficial completa: cámara → IK → 8 ángulos de articulación → servos (versión completa) | A + Rust + uv + dora | Capítulos 1-4 + 5.2 |

**Rutas recomendadas**:
- Primer uso → siga la **A** y confirme primero que el firmware y el cableado estén bien.
- Si quiere ver rápidamente el seguimiento por cámara → siga la **B** (ligera, se instala en pocos minutos).
- Si necesita un seguimiento formal y completo → siga la **C** (cadena oficial, máxima precisión).

Las tres rutas comparten el hardware; solo la **ruta C** requiere instalar Rust/uv/dora adicionalmente.

---

## Capítulo 1: Preparación del entorno

Instale en orden secuencial. **Las rutas A/B solo necesitan la sección 1.1; la ruta C también necesita la sección 1.2.**

### 1.1 Entorno del PC anfitrión (necesario para las rutas A/B)

#### ① Python 3.12 de 64 bits

> **Obligatorio 64 bits**. mediapipe 0.10.14 solo ofrece wheels de 64 bits para Windows; en 32 bits no se puede instalar;
> esta es también una causa habitual de que la GUI se cierre al hacer doble clic.

- Se recomienda instalarlo en `D:\Python312-64bit` (esta máquina ya tiene esa ruta).
- Durante la instalación, marque **Add to PATH**.
- Verificación (64 bits):

```bash
py -3.12-64 -c "import sys; print('64bit' if sys.maxsize > 2**32 else '32bit')"
# 输出: 64bit
```

#### ② Instalación de las dependencias del PC anfitrión

Directorio raíz del proyecto (el directorio que contiene `hand_gui.py`):

```bash
pip install -r requirements.txt     # 只需 pyserial
```

#### ③ Dependencias adicionales de seguimiento (para la ruta B)

Ejecute en el directorio raíz del proyecto:

```bash
setup_tracking.bat
```

Automáticamente: busca Python de 64 bits → crea el entorno virtual `tracking_env` → instala `requirements-tracking.txt`
(mediapipe==0.10.14, numpy<2, scipy, opencv, Pillow, pyserial) → verifica mediapipe.

> O instálelo manualmente:
> ```bash
> D:\Python312-64bit\python.exe -m pip install -r requirements-tracking.txt
> ```

### 1.2 Entorno IK oficial de dora (necesario para la ruta C)

**Instalación para el cliente**: haga doble clic en `..\02_hand_tracking\Demo\Windows_Scripts_CN\1-安装环境.bat` (la versión en inglés es `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\1-Install_Env.bat`); instala automáticamente todas las dependencias:
cadena de herramientas Rust, uv (gestor de paquetes de Python) y dora-cli.

> Al terminar, **cierre y vuelva a abrir la terminal** una vez para que PATH surta efecto.
> Las dependencias detalladas (versiones, instalación manual) figuran en el documento de mantenimiento; el cliente no necesita ocuparse de ello.

---

## Capítulo 2: Cableado del hardware

### 2.1 Lista del hardware

| Hardware | Descripción |
|------|------|
| Placa de desarrollo ESP32-S3 | YX-ESP32-S3 o similar |
| 8 servos PWM | Servos analógicos, accionamiento diferencial |
| Placa adaptadora de servos | Servos → 8 salidas PWM |
| Fuente de alimentación 5V independiente | **Mínimo 5V 3A**; los servos tienen picos de corriente transitoria elevados |
| Cable de datos USB | ESP32-S3 Type-C → PC |
| Cámara | Cámara integrada o USB (para el seguimiento) |

### 2.2 Asignación de GPIO

Placa adaptadora PWM1-8 → GPIO del ESP32-S3:

| Placa adaptadora | GPIO | Dedo |
|--------|------|------|
| PWM1 | 4 | Índice, articulación 1 |
| PWM2 | 5 | Índice, articulación 2 |
| PWM3 | 6 | Corazón, articulación 1 |
| PWM4 | 7 | Corazón, articulación 2 |
| PWM5 | 15 | Anular, articulación 1 |
| PWM6 | 16 | Anular, articulación 2 |
| PWM7 | 17 | Pulgar, articulación 1 |
| PWM8 | 18 | Pulgar, articulación 2 |

> **La mano izquierda y la derecha comparten la misma asignación de GPIO**. El cambio de mano izquierda/derecha se hace por software (capítulo 4); no hay que cambiar el cableado.

### 2.3 Requisitos de alimentación

- Utilice una **fuente de alimentación 5V independiente** (al menos 3A) para los servos; no dependa solo de la alimentación USB.
- Un pico de corriente instantáneo de los servos puede resetear el ESP32 (síntoma: el ESP32 se reinicia repetidamente). En ese caso, **corte la alimentación y reinicie** el ESP32.

### 2.4 Pasos de cableado

1. 8 servos → placa adaptadora PWM1-8
2. Placa adaptadora → GPIO correspondiente del ESP32-S3 (tabla anterior)
3. ESP32-S3 Type-C → PC
4. Cámara conectada al PC (para el seguimiento)

> Para el cableado y el esquema de circuito detallados, consulte el directorio `ESP32开发板电路图/`.

---

## Capítulo 3: Requisito previo: grabación del firmware

> Para que los servos respondan, primero hay que grabar el firmware. El firmware se encuentra en `esp-idf\AmazingHand_Serial\`.

### 3.1 Compilación de la versión ESP-IDF (recomendada)

Abra el proyecto `AmazingHand_Serial` con Espressif IDE:

1. Configure el chip de destino (la primera vez):
   ```
   idf.py set-target esp32s3
   ```
2. Compile:
   ```
   idf.py build
   ```
3. Grabe el firmware (en Windows, use el puerto COM, por ejemplo COM3):
   ```
   idf.py -p COM3 flash
   ```

### 3.2 Verificación tras la grabación

Monitorización del puerto serie (velocidad en baudios **115200**):

```
idf.py -p COM3 monitor
```

Debería ver el registro de arranque:

```
AmazingHand Serial Control Ready (ESP-IDF)
Protocol: 115200-8N1 [0xAA CMD LEN DATA CKSUM]
```

> La velocidad en baudios del puerto serie ya está configurada de forma unificada por el firmware/los scripts (115200); el cliente no necesita configurarla manualmente.

> Nota: normalmente el firmware ya viene grabado en el dispositivo entregado; este paso solo se realiza con firmware nuevo o al volver a grabar.

---

## Capítulo 4: Primera ejecución: comandos gestuales del PC anfitrión

> Requisitos previos: firmware grabado (capítulo 3), ESP32 alimentado y cable serie conectado. Compruebe primero en el Administrador de dispositivos el puerto COM.

### 4.1 GUI visual (recomendada)

#### Modo A: ejecutar el exe empaquetado

Haga doble clic en `dist/AmazingHand控制台.exe` (**sin seguimiento**; para el seguimiento se necesita la ejecución desde el código fuente).

#### Modo B: ejecutar desde el código fuente

```bash
# 项目根目录,先激活追踪环境(装了 mediapipe)或任意带 pyserial 的 Python
tracking_env\Scripts\python hand_gui.py
```

#### Pasos de uso de la GUI

1. **Seleccionar el puerto serie**: en la lista desplegable superior, seleccione el puerto COM del ESP32.
2. **Pulse «Conectar»**: la luz de estado se pone verde, el registro muestra «Conectado» y se envía automáticamente una prueba de enlace NOP.
3. **Comandos de gestos**: pulse «Piedra», «Tijera», «Papel», «Pulgar arriba», «OK», «Pellizco», «Señalar», etc., y la mano robótica los ejecuta.
4. **Mano derecha/izquierda**: marque «Mano derecha» / «Mano izquierda» para cambiar la dirección de espejo del pulgar.
5. **Accionamiento directo de servos**: arrastre los 8 controles deslizantes para controlar en tiempo real el ángulo de cada servo (0-180°).
6. **Control diferencial de dedos** (recomendado): dos barras de progreso por cada dedo: «Flexionar◀▶Estirar» en diferencial inverso y «Girar a la derecha◀▶Girar a la izquierda» en oscilación del mismo sentido. Los dos grados de libertad son independientes y se accionan de forma sincronizada.
7. **Repetir / Detener**: repite el último gesto / interrumpe de inmediato.
8. **Registro de comunicación**: en la parte inferior se muestran en tiempo real las tramas enviadas/recibidas y las respuestas.

### 4.2 Prueba por línea de comandos (serial_test.py)

Directorio raíz del proyecto:

```bash
# 链路测试(先确认能通)
python serial_test.py COM3 nop

# 手势
python serial_test.py COM3 rock         # 石头
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 张开
python serial_test.py COM3 close        # 握拳

# 单舵机直驱
python serial_test.py COM3 servo 1 90   # 舵机1 → 90°

# 全部归中
python serial_test.py COM3 mid

# 设左右手
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# 扫频/自检
python serial_test.py COM3 sweep 1      # 舵机1 扫频
python serial_test.py COM3 test         # 全部舵机逐个测试
```

### 4.3 Verificación

- Tras pulsar un gesto, los servos deben ejecutar la acción correspondiente; el registro del puerto serie devuelve `ACK` y `DONE`.
- Códigos de respuesta: `0x00=OK`, `0x01=comando no válido`, `0x02=parámetro erróneo`, `0x03=ocupado`, `0x10=completado`.
- Si los servos no se mueven en absoluto: consulte las preguntas frecuentes del capítulo 6 (compruebe primero alimentación/puerto serie).

> Para la referencia rápida completa de comandos de gestos y protocolo serie, consulte el capítulo 7.

---

## Capítulo 5: Tutorial avanzado: seguimiento de gestos

> Requisitos previos: capítulos 1-4 completados (firmware grabado, control por puerto serie operativo, cámara lista).
> Este capítulo ofrece dos opciones; elija una.

### 5.1 Seguimiento integrado en la GUI (versión ligera)

**Adecuado para**: demostraciones rápidas, sin instalar dora. Cámara → asignación directa a los servos diferenciales, sin IK.

#### Requisitos previos

- Python de 64 bits + `setup_tracking.bat` (sección 1.1).
- Cámara disponible.

#### Ejecución

```bash
# 项目根目录,用追踪环境启动 GUI
tracking_env\Scripts\python hand_gui.py
```

1. Seleccione el puerto serie → «Conectar».
2. Desplácese hasta el panel «Seguimiento de gestos (cámara MediaPipe)».
3. Seleccione el número de cámara (por defecto 0) → pulse «Iniciar seguimiento».
4. Coloque la mano en la imagen; la mano robótica seguirá la flexión/estirado de la mano.

#### Principio

- mediapipe 0.10.14 extrae los vectores 3D de las puntas de los 4 dedos (en el sistema de coordenadas de la mano).
- La función `tips_to_angles()` de `hand_tracking.py` asigna a cada dedo un ángulo diferencial:
  - flex (flexión/estirado): para los tres dedos se usa la componente z; para el pulgar, la componente y;
  - base (oscilación izquierda/derecha): fija en 90 (la oscilación izquierda/derecha aún no está implementada).
- La GUI incorpora suavizado EMA (alpha=0.4) + limitación a 60 ms para evitar el temblor.

#### Limitaciones

- **Sin IK**: asigna directamente las puntas de los dedos a ángulos; la precisión es inferior a la de la cadena oficial.
- **Oscilación izquierda/derecha pospuesta**: base fija en 90, sin oscilación lateral.
- Adecuado para demostraciones/prototipos; para uso formal se recomienda 5.2.

### 5.2 Seguimiento IK oficial de dora (versión completa)

**Adecuado para**: uso formal. Cadena oficial: cámara → mediapipe → IK MuJoCo+mink → 8 ángulos de articulación → AHControl (Rust) → ESP32 → servos PWM.

#### Requisitos previos

- Entorno completo (Rust + uv + dora, sección 1.2).
- Firmware grabado (capítulo 3).
- El yml del flujo de datos ya incluye la velocidad en baudios PWM (115200); no hace falta modificarlo manualmente.

#### Paso 1: despliegue (script de un clic recomendado)

Haga doble clic en `..\02_hand_tracking\Demo\Windows_Scripts_CN\3-部署代码.bat` (la versión en inglés es `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\3-Deploy_Demo.bat`); realiza automáticamente:
creación del entorno de Python, compilación de AHControl (Rust) e instalación de AHSimulation/HandTracking (mediapipe).

> El primer despliegue tarda unos minutos. El script ya incorpora la gestión de variables de entorno; no hace falta configurarlas manualmente.

#### Paso 2: ejecución

Haga doble clic en `..\02_hand_tracking\Demo\Windows_Scripts_CN\4-运行代码.bat` (la versión en inglés es `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\4-Run_Demo.bat`) y elija en el menú:

```
1 - 模拟仿真（摄像头手势追踪）
2 - 真实硬件（SCS0009 总线舵机）
3 - PWM 舵机（ESP32 直驱）   ← 选 3
```

Después, elija el tipo de mano: `1 右手` / `2 左手`. El script ejecuta automáticamente `dora build` + `dora run`.

- Se abre la ventana de la cámara; coloque la mano en la imagen → los dedos de la simulación 3D siguen → la mano robótica sigue.
- Detención: Ctrl+C (o cierre la ventana).

#### Cambio de mano izquierda/derecha

Basta con seleccionar el tipo de mano en el menú de ejecución (paso 2 de la sección 5.2): elija `1 右手` o `2 左手`.

> Tras el cambio, el script reconstruye automáticamente el flujo de datos correspondiente; espere a que termine la compilación antes de seguir con las operaciones frente a la cámara.

#### Cómo leer el registro de ejecución

En la ventana de ejecución, el nodo AHControl emite registros de forma continua. Fíjese especialmente en esta línea:

```
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N` (por ejemplo, `sent 300 frames, ESP32 acked 300 frames`) → normal; el ESP32 recibe todas las tramas.
- `M = 0` → el ESP32 no recibe datos; compruebe el puerto serie y la alimentación (véase el capítulo 6).

Mientras esta línea crezca con normalidad, la cadena de servos está operativa; lo que queda es solo si la cámara puede seguir el ritmo o no.

---

## Capítulo 6: Preguntas frecuentes (durante el funcionamiento)

> Esta sección solo enumera los problemas **más frecuentes y resolubles por uno mismo** durante el uso. Localícelos rápidamente por el síntoma.

### 6.1 Los servos no se mueven en absoluto

Compruebe en orden:

1. **Alimentación**: ¿los servos están conectados a una fuente independiente (5V 3A o más)? Si solo se alimentan por USB, los servos pueden no moverse o el ESP32 reiniciarse repetidamente. → Corte la alimentación y reinicie el ESP32.
2. **Puerto serie**: ¿se ha seleccionado el puerto COM correcto? En Administrador de dispositivos → Puertos (COM y LPT), consulte el puerto correspondiente al ESP32. ¿Lo ocupa otro programa (por ejemplo, un asistente de puerto serie)? → Cierre el programa que lo ocupa.
3. **Cableado**: ¿están conectados correctamente los GPIO de PWM1-8 de la placa adaptadora? ¿Los cables de señal de los servos están bien insertados?

### 6.2 La cámara no muestra imagen

- La primera ejecución en Windows solicita permiso de cámara → pulse «Permitir».
- Si antes se seleccionó «No»: Configuración → Privacidad y seguridad → Cámara → Permitir que las aplicaciones de escritorio accedan a la cámara, y vuelva a ejecutar.

### 6.3 La cámara muestra imagen, pero la mano no sigue / sigue con retraso

- Confirme que la cámara esté **de frente** a la mano, con luz suficiente y la mano completamente visible en la imagen.
- Muévase más despacio y con mayor amplitud. Si es demasiado rápido o de amplitud pequeña, el seguimiento puede no seguir el ritmo.
- ¿Se mueven los dedos en la ventana de simulación 3D?
  - **Sí**: la cadena de seguimiento está bien; el problema está en los servos/puerto serie; véase 6.1.
  - **No**: el nodo de seguimiento no detecta la mano; ajuste la postura/iluminación y vuelva a intentarlo.

### 6.4 La forma de la mano está invertida / el pulgar apunta en dirección contraria

- ¿Se ha seleccionado mal la mano izquierda/derecha? Seleccione el tipo de mano correspondiente en el menú de ejecución.
- En la GUI del PC anfitrión, marque «Mano derecha» / «Mano izquierda» para cambiar.

### 6.5 El cambio de mano no surte efecto

- Tras cambiar el tipo de mano, `dora` debe reconstruir el flujo de datos: al elegir el tipo de mano en el menú de ejecución se ejecuta automáticamente `dora build`; espere a que termine.

### 6.6 La imagen se congela / el registro se detiene durante la ejecución

- Puede que otro programa esté usando la cámara (videoconferencia, otro script); ciérrelo y vuelva a intentarlo.
- O pulse `Ctrl+C` para detener y vuelva a ejecutar.

### 6.7 Tras cambiar de puerto USB / reiniciar el PC, no se encuentra el puerto serie

- El número de puerto COM puede haber cambiado. Confirme el nuevo número COM en el Administrador de dispositivos, vuelva a ejecutar `2-配置串口.bat` (o `2-Setup_Serial.bat`) para seleccionar el puerto y ejecute de nuevo.

### 6.8 ¿Sigue sin funcionar?

- Envíe al equipo de mantenimiento una captura de pantalla del registro del terminal de ejecución e indique: en qué paso, qué operación y qué fenómeno se observó.
- Registros clave: la línea `[CONFIG]` del arranque y la línea `[ACK-STATS]` en ejecución (si la M de `ESP32 acked M frames` se acerca a N).

---

## Capítulo 7: Referencia rápida de comandos (apéndice)

> La descripción completa del protocolo está en `用户手册.md`, en el mismo directorio. Aquí se ofrece la tabla de referencia rápida.

### 7.1 Comandos de gestos

| Gesto | HEX | ACK | DONE |
|------|-----|-----|------|
| NOP | `AA 00 00 00` | `BB 00 00 00` | — |
| Piedra | `AA 01 00 01` | `BB 01 00 01` | `BB 01 10 11` |
| Tijera | `AA 02 00 02` | `BB 02 00 02` | `BB 02 10 12` |
| Papel | `AA 03 00 03` | `BB 03 00 03` | `BB 03 10 13` |
| Pulgar arriba | `AA 04 00 04` | `BB 04 00 04` | `BB 04 10 14` |
| Burla 1 (agitar el índice) | `AA 05 00 05` | `BB 05 00 05` | `BB 05 10 15` |
| Burla 2 (anular) | `AA 06 00 06` | `BB 06 00 06` | `BB 06 10 16` |
| Abrir | `AA 07 00 07` | `BB 07 00 07` | `BB 07 10 17` |
| Puño | `AA 08 00 08` | `BB 08 00 08` | `BB 08 10 18` |
| OK | `AA 09 00 09` | `BB 09 00 09` | `BB 09 10 19` |
| Pellizco | `AA 0A 00 0A` | `BB 0A 00 0A` | `BB 0A 10 1A` |
| Señalar | `AA 0C 00 0C` | `BB 0C 00 0C` | `BB 0C 10 1C` |

### 7.2 Comandos de control

| Comando | HEX | Descripción |
|------|-----|------|
| Repetir | `AA FE 00 FE` | Repite el último gesto |
| Detener | `AA FF 00 FF` | Interrumpe de inmediato |
| Configurar mano derecha | `AA F1 01 01 F1` | — |
| Configurar mano izquierda | `AA F1 01 02 F2` | — |
| Accionamiento directo | `AA F0 08 [8×角度] CKSUM` | 8 bytes de ángulo |

### 7.3 Formato de trama

```
帧头(0xAA) + 命令(CMD) + 长度(LEN) + 数据(DATA) + 校验和(CKSUM)
CKSUM = CMD ^ LEN ^ DATA[0] ^ ... ^ DATA[N-1]
响应: 帧头(0xBB) + CMD + STATUS + (CMD^STATUS)
```

### 7.4 Herramientas del PC anfitrión

| Herramienta | Comando | Uso |
|------|------|------|
| GUI | `tracking_env\Scripts\python hand_gui.py` | Gestos visuales + accionamiento directo + diferencial + seguimiento |
| exe empaquetado | `dist/AmazingHand控制台.exe` | Visualización sin instalar Python (sin seguimiento) |
| Línea de comandos | `python serial_test.py COMx <cmd>` | Pruebas automatizadas |

### 7.5 Archivos de flujo de datos de seguimiento (versión PWM)

| Uso | Archivo |
|------|------|
| Seguimiento PWM mano izquierda | `dataflow_tracking_real_left_pwm.yml` |
| Seguimiento PWM mano derecha | `dataflow_tracking_real_right_pwm.yml` |
| Configuración PWM mano izquierda | `AHControl/config/l_hand_pwm.toml` |
| Configuración PWM mano derecha | `AHControl/config/r_hand_pwm.toml` |
