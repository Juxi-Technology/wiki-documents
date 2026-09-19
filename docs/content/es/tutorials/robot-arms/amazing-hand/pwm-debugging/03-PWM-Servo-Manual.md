---
title: "03-Versión con servos PWM - Manual de uso"
description: "Este firmware se ejecuta en la placa de desarrollo ESP32-S3 y controla 8 servos mediante señales PWM para que la mano diestra ejecute gestos."
---

# 03-Versión con servos PWM - Manual de uso

## Índice

1. Descripción general

2. Cableado del hardware

3. Compilación y grabación del firmware

4. Protocolo de comunicación por puerto serie

5. Referencia de comandos

6. Tutorial de uso del PC anfitrión

7. Seguimiento de gestos

8. Ajuste fino de los parámetros de gestos

9. Preguntas frecuentes

---

## 1. Descripción general

Este firmware se ejecuta en la placa de desarrollo **ESP32-S3** y controla 8 servos mediante señales PWM para que la mano diestra ejecute gestos. El PC anfitrión (PC/Raspberry Pi/otro MCU) envía tramas binarias de comandos a través del puerto serie USB; el ESP32 las analiza, ejecuta el gesto correspondiente y devuelve una respuesta.

El proyecto ofrece dos implementaciones de firmware:

|Firmware|Directorio|Características|
|---|---|---|
|**Versión ESP-IDF** (recomendada)|`esp-idf/AmazingHand_Serial/`|Estructura de proyecto por componentes, doble tarea FreeRTOS, lista para producción|

> Los dos firmwares comparten el **mismo protocolo de puerto serie** y el **mismo conjunto de comandos**, y los parámetros de gestos pueden consultarse mutuamente.

### Gestos admitidos (11 comandos de gestos)

|Gesto|Comando|Descripción|
|---|---|---|
|Piedra|0x01|Piedra, papel o tijera: todos los dedos cerrados en puño|
|Tijera|0x02|Piedra, papel o tijera: índice+corazón extendidos formando una V|
|Papel|0x03|Piedra, papel o tijera: todos los dedos extendidos|
|Pulgar arriba|0x04|Pulgar levantado, el resto en puño|
|Burla 1|0x05|Agitar el índice ("no, no, no")|
|Burla 2|0x06|El anular se extiende y oscila (sustituye al meñique)|
|Abrir|0x07|Todos los dedos extendidos|
|Puño|0x08|Todos los dedos cerrados|
|OK|0x09|Gesto OK|
|Pellizco|0x0A|Gesto de pellizco|
|Señalar|0x0C|El índice se extiende haciendo el gesto de "señalar"|
|Accionamiento directo|0xF0|Control directo del ángulo de los 8 servos|
|Configurar lado|0xF1|Cambiar entre modo mano izquierda/mano derecha|
|Repetir|0xFE|Repetir la ejecución del último gesto|
|Detener|0xFF|Terminar de inmediato el gesto actual|
|NOP|0x00|Prueba de enlace|

> Nota: el comando 0x0B está deshabilitado (el antiguo "pulgar hacia abajo" se repetía con la acción de "pulgar arriba" y se ha eliminado).

---

## 2. Cableado del hardware

### Hardware aplicable

|Elemento|Modelo|
|---|---|
|Controlador principal|Placa de desarrollo **ESP32-S3** (Youxin YX-ESP32-S3 o similar)|
|Servos|8 servos analógicos PWM (SG90 o similar)|
|Placa adaptadora|Placa adaptadora para servos PWM|

La placa de desarrollo ESP32-S3 tiene dos interfaces Type-C:

- **USB Serial/JTAG integrado**: se conecta directamente al controlador USB integrado en el chip ESP32-S3

- **FT232 externo**: comunicación a través del chip conversor a puerto serie FT232

> Ambas interfaces pueden utilizarse para la comunicación por puerto serie; basta con elegir una. El PC anfitrión selecciona el nombre del dispositivo de puerto serie correspondiente.

### Servo → placa adaptadora

Los conectores de 3 patillas de los 8 servos se insertan según el número de ID en los pines de servo 1-8 de la placa adaptadora.

### Placa adaptadora → ESP32-S3

|Placa adaptadora|GPIO del ESP32-S3|Descripción|
|---|---|---|
|PWM1|**4**|Índice, articulación 1|
|PWM2|**5**|Índice, articulación 2|
|PWM3|**6**|Corazón, articulación 1|
|PWM4|**7**|Corazón, articulación 2|
|PWM5|**15**|Anular, articulación 1|
|PWM6|**16**|Anular, articulación 2|
|PWM7|**17**|Pulgar, articulación 1|
|PWM8|**18**|Pulgar, articulación 2|
|5V|5V|Alimentación (tomada de la placa adaptadora)|
|GND|GND|**Debe compartirse la masa; conectar al menos un cable**|

> La mano izquierda y la derecha comparten el mismo mapeo de GPIO. Al cambiar al modo "mano izquierda", el firmware invierte la dirección de movimiento del pulgar dentro del gesto, sin cambiar los pines.

### Alimentación

La placa adaptadora tiene dos grupos de puertos de alimentación 5V/GND:

- Un grupo se saca mediante un cable Type-C y se conecta a un adaptador de alimentación de **5V 3A**

- El otro grupo se saca para alimentar el pin **5V** del ESP32-S3 (la placa de desarrollo ya no necesita alimentarse a través de Type-C)

---

## 3. Compilación y grabación del firmware

### 3.1 Versión ESP-IDF (recomendada)

> **Advertencia: requisito de ruta**: la compilación con ESP-IDF no admite rutas en chino. Asegúrese de que la ruta donde se encuentra el proyecto sea totalmente en inglés (incluidas la carpeta de usuario y los directorios superiores).

#### Estructura del proyecto

```Plaintext
esp-idf/AmazingHand_Serial/
├── CMakeLists.txt              # Configuración del proyecto de nivel superior
├── sdkconfig.defaults          # Configuración predeterminada de Kconfig
├── main/
│   ├── CMakeLists.txt
│   └── main.c                  # FreeRTOS de doble tarea + inicialización (capa de enlace)
└── components/
    ├── hand_servo/             # Controlador de servos (LEDC PWM + datos de calibración)
    ├── hand_gestures/          # Macros de parámetros de gestos + funciones de gestos + control de mano izquierda/derecha
    └── hand_protocol/          # Análisis de tramas del puerto serie + distribución de comandos
```

#### Entorno de compilación

- ESP-IDF **v6.0.1**

- Chip objetivo: **ESP32-S3**

- Variable de entorno `idf.py` ya configurada

#### Compilación y grabación

```Bash
cd esp-idf/AmazingHand_Serial

# 1. Configurar el chip de destino (la primera vez o al cambiar de chip)
idf.py set-target esp32s3

# 2. Compilar
idf.py build

# 3. Flashear (Windows: usar el puerto COM, por ejemplo COM3)
idf.py -p COM3 flash

# 4. Monitorización del puerto serie (opcional, velocidad en baudios 115200)
idf.py -p COM3 monitor
```

> Tras modificar cualquier código fuente bajo `components/` o `main/`, basta con volver a ejecutar `idf.py build && idf.py -p COM3 flash`.

### 3.3 Calibración (opcional, recomendada para el primer uso)

La posición central y el ancho de pulso de los servos deben calibrarse según el mecanismo real. Hay dos formas:

- **Versión ESP-IDF**: edite `middle_pos[8]` (línea 40) y `min_pw/mid_pw/max_pw[8]` (líneas 45-47) en `components/hand_servo/hand_servo.c`

Tras la calibración hay que volver a compilar y grabar.

---

## 4. Protocolo de comunicación por puerto serie

### 4.1 Capa física

|Parámetro|Valor|
|---|---|
|Interfaz|USB Serial (UART0)|
|Velocidad en baudios|**115200**|
|Bits de datos|8|
|Bit de paridad|Ninguna (None)|
|Bits de parada|1|
|Control de flujo|Ninguno|

### 4.2 Formato de trama

#### Host → ESP32 (trama de comando)

```Plaintext
┌────────┬────────┬──────────┬────────────────┬──────────┐
│  0xAA  │ CMD_ID │ DATA_LEN │ DATA[0 .. N-1] │ CHECKSUM │
│ 1 Byte │ 1 Byte │  1 Byte  │    N Bytes     │  1 Byte  │
└────────┴────────┴──────────┴────────────────┴──────────┘
 帧头      命令ID    数据长度      数据负载         校验和
```

- **Cabecera de trama**: fija en `0xAA`; marca el inicio de una trama

- **CMD_ID**: número de comando (véase Referencia de comandos)

- **DATA_LEN**: número de bytes de la carga útil de datos (0-8; las tramas con más de 8 no son válidas)

- **DATA**: carga útil de datos, cuya longitud viene determinada por DATA_LEN

- **CHECKSUM**: `CMD_ID ^ DATA_LEN ^ DATA[0] ^ ... ^ DATA[N-1]` (verificación XOR)

> Si DATA_LEN = 0, entonces CHECKSUM = CMD_ID.

#### ESP32 → host (trama de respuesta)

```Plaintext
┌────────┬────────┬────────┬──────────┐
│  0xBB  │ CMD_ID │ STATUS │ CHECKSUM │
│ 1 Byte │ 1 Byte │ 1 Byte │  1 Byte  │
└────────┴────────┴────────┴──────────┘
 帧头      命令ID    状态码    校验和
```

- **Cabecera de trama**: fija en `0xBB`

- **CMD_ID**: número de comando original

- **STATUS**: código de estado (véase la tabla siguiente)

- **CHECKSUM**: `CMD_ID ^ STATUS`

#### Códigos de estado

|STATUS|Significado|Descripción|
|---|---|---|
|0x00|OK|Comando aceptado, comienza la ejecución|
|0x01|Comando no válido|CMD_ID no está en la tabla de comandos|
|0x02|Error de parámetro|Longitud o contenido de los datos incorrectos|
|0x03|Ocupado|Gesto en ejecución; no se aceptan nuevos comandos por ahora|
|0x10|Completado|El gesto ha terminado de ejecutarse|

### 4.3 Sincronización de la comunicación

```Plaintext
主机                          ESP32
 │                              │
 │──── [AA 01 00 01] ────────→│  发送"石头"命令
 │                              │
 │←─── [BB 01 00 01] ─────────│  ACK: 命令已接受
 │                              │
 │                      (执行手势中)
 │                              │
 │←─── [BB 01 10 11] ─────────│  完成: 手势执行完毕
 │                              │
 │──── [AA 02 00 02] ────────→│  发送"剪刀"命令
 │                              │
 │←─── [BB 02 00 02] ─────────│  ACK
 │                              │
```

### 4.4 Detener el gesto & tiempo de espera de trama

- Enviar `[AA FF 00 FF]` permite interrumpir en cualquier momento el gesto que se está ejecutando

- Si el ESP32 no completa una trama en 200 ms, la descarta automáticamente (para evitar que la pérdida de bytes provoque una desincronización permanente)

- Las tramas cuya suma de verificación no coincida se descartan silenciosamente; el PC anfitrión debe implementar el reenvío por tiempo de espera

### 4.5 Modo mano derecha/izquierda

Por defecto, modo mano derecha. Envíe `[AA F1 01 02 F2]` para cambiar a mano izquierda y `[AA F1 01 01 F1]` para volver a mano derecha. La mano izquierda/derecha afecta a la dirección de movimiento del pulgar (gestos que incluyen el pulgar, como piedra/tijera/pulgar arriba/OK/pellizco).

---

## 5. Referencia de comandos

### 5.1 Enviar comandos de gestos (0x01-0x0A, 0x0C)

Estos comandos no necesitan carga útil de datos (DATA_LEN=0); el ESP32 ejecuta inmediatamente el gesto correspondiente al recibirlos.

|Comando|Trama HEX|Respuesta|Descripción|
|---|---|---|---|
|Piedra|`AA 01 00 01`|`BB 01 00 01` → `BB 01 10 11`|Todos los dedos cerrados en puño|
|Tijera|`AA 02 00 02`|`BB 02 00 02` → `BB 02 10 12`|Índice+corazón extendidos|
|Papel|`AA 03 00 03`|`BB 03 00 03` → `BB 03 10 13`|Todos los dedos extendidos|
|Pulgar arriba|`AA 04 00 04`|`BB 04 00 04` → `BB 04 10 14`|Pulgar levantado|
|Burla 1|`AA 05 00 05`|`BB 05 00 05` → `BB 05 10 15`|Agitar el índice (aprox. 2.5s)|
|Burla 2|`AA 06 00 06`|`BB 06 00 06` → `BB 06 10 16`|Oscilar el anular (aprox. 2.5s)|
|Abrir|`AA 07 00 07`|`BB 07 00 07` → `BB 07 10 17`|Todos los dedos extendidos|
|Puño|`AA 08 00 08`|`BB 08 00 08` → `BB 08 10 18`|Todos los dedos cerrados|
|OK|`AA 09 00 09`|`BB 09 00 09` → `BB 09 10 19`|Gesto OK|
|Pellizco|`AA 0A 00 0A`|`BB 0A 00 0A` → `BB 0A 10 1A`|Gesto de pellizco|
|Señalar|`AA 0C 00 0C`|`BB 0C 00 0C` → `BB 0C 10 1C`|El índice se extiende haciendo el gesto de "señalar"|

### 5.2 Comando de accionamiento directo (0xF0)

Controla directamente el ángulo de los 8 servos; los 8 bytes de datos corresponden respectivamente a los servos 1-8, y cada byte tiene un rango de valores de 0-180.

**Ejemplo: todos los servos a la posición central (90°)**

```Plaintext
发送: AA F0 08 5A 5A 5A 5A 5A 5A 5A 5A F8
       │  │  │  └── 8 个 0x5A (90°) ──┘  │
       │  │  │                            └── CHECKSUM
       │  │  └── DATA_LEN = 8
       │  └── CMD_DIRECT_DRIVE
       └── 帧头
```

Suma de verificación = `F0 ^ 08 ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A` = `F8`

> Los 8 valores 0x5A idénticos combinados de dos en dos con XOR dan 0x00 y, finalmente, `0xF0 ^ 0x08 ^ 0x00 = 0xF8`

**Ejemplo: índice extendido (servo 1 = 170°, servo 2 = 10°) y el resto a la posición central (90°)**

```Plaintext
发送: AA F0 08 AA 0A 5A 5A 5A 5A 5A 5A 58
               └─170°  └─10°
```

### 5.3 Configurar mano derecha/izquierda (0xF1)

1 byte de datos: `0x01` = mano derecha, `0x02` = mano izquierda.

```Plaintext
设右手: AA F1 01 01 F1
设左手: AA F1 01 02 F2
```

### 5.4 Comandos de control

|Comando|Trama HEX|Descripción|
|---|---|---|
|NOP|`AA 00 00 00`|Prueba de enlace; devuelve inmediatamente `BB 00 00 00`|
|Repetir|`AA FE 00 FE`|Repetir la ejecución del último gesto|
|Detener|`AA FF 00 FF`|Terminar de inmediato el gesto actual|

### 5.5 Consulta rápida de respuestas

Al recibir un comando no válido (tomando como ejemplo el comando inexistente 0xFC):

```Plaintext
发送: AA FC 00 FC
响应: BB FC 01 FD    （STATUS=0x01 无效命令）
```

> Verificación de la suma de verificación: `FC ^ 00 = FC`, respuesta `FC ^ 01 = FD`

---

## 6. Tutorial de uso del PC anfitrión

El directorio raíz del proyecto proporciona dos herramientas de PC anfitrión:

|Herramienta|Archivo|Tipo|Uso|
|---|---|---|---|
|**Interfaz gráfica**|`hand_gui.py` / exe empaquetado|Visualización|Hacer gestos con botones, accionamiento directo con deslizadores, registro|
|**Prueba por línea de comandos**|`serial_test.py`|Por instrucciones|Enviar gestos/servo individual/barrido, pruebas automatizadas|

> Ambas solo dependen de `pyserial`. Instalación: `pip install -r requirements.txt`

### 6.1 GUI visual (recomendada)

#### Opción A: ejecutar el exe empaquetado (para el cliente)

1. Obtenga `AmazingHand控制台.exe` (o el directorio descomprimido)

2. **Haga doble clic en el exe** para ejecutarlo directamente, sin necesidad de instalar Python

3. Conecte y utilice según los pasos siguientes

#### Opción B: ejecutar desde el código fuente

```Bash
# 1. Instalar las dependencias
pip install -r requirements.txt

# 2. Ejecutar
python hand_gui.py
```

#### Pasos de uso de la GUI

1. **Seleccionar el puerto serie**: en la lista desplegable superior, seleccione el puerto COM correspondiente al ESP32 (ver en el Administrador de dispositivos de Windows)

2. **Haga clic en "Conectar"**: la luz de estado se pone verde, el área de registro muestra "Conectado" y se envía automáticamente la prueba de enlace NOP

3. **Comandos de gestos**: haga clic en botones como «Piedra», «Tijera», «Papel», «Pulgar arriba», «OK», etc., y la mano robótica ejecuta el gesto correspondiente

4. **Mano derecha/izquierda**: marque «Mano derecha» / «Mano izquierda» para cambiar la dirección de espejo del pulgar

5. **Accionamiento directo de servos**: arrastre los 8 deslizadores para controlar en tiempo real el ángulo de cada servo (0-180°)

6. **Control diferencial de dedos** (recomendado): dos barras de progreso por cada dedo——**flexionar/estirar** controla el diferencial inverso de los dos servos de ese dedo (flexión y extensión), y **girar a la derecha/girar a la izquierda** controla la oscilación en el mismo sentido. Los dos grados de libertad son independientes y se accionan de forma sincronizada

7. **Repetir / Detener**: repetir el último gesto / interrumpir de inmediato el gesto actual

8. **Registro de comunicación**: en la parte inferior se muestran en tiempo real las tramas enviadas y recibidas y el estado de las respuestas

### Descripción del control diferencial de dedos

Cada dedo está **accionado de forma diferencial por dos servos**, con dos grados de libertad ortogonales:

|Barra de progreso|Función|Efecto mecánico|
|---|---|---|
|**Flexionar◀▶Estirar**|Los dos servos giran en sentido inverso (diferencial)|El dedo se flexiona o se estira|
|**Girar a la derecha◀▶Girar a la izquierda**|Los dos servos giran en el mismo sentido|El dedo oscila de izquierda a derecha|

- El deslizador **flexionar/estirar** tiene un rango de -70 ~ +70 (0 = neutro, +70 = totalmente extendido, -70 = totalmente flexionado)

- El deslizador **oscilación izquierda/derecha** tiene un rango de 60 ~ 120 (90 = neutro, 60 = hacia la derecha, 120 = hacia la izquierda)

- Ángulo del servo = `摆动 ± 弯曲`; los dos servos se actualizan **de forma sincronizada** y envían el comando de accionamiento directo

> Ejemplo (índice GPIO4/5): con el deslizador de flexión en +70 y la oscilación en 90 → servo 4 = 160°, servo 5 = 20° (totalmente extendido); con la flexión en -70 → servo 4 = 20°, servo 5 = 160° (totalmente flexionado).

### 6.2 Prueba por instrucciones (serial_test.py)

#### Uso desde la línea de comandos

```Bash
# Ver la ayuda
python serial_test.py

# Prueba del enlace
python serial_test.py COM3 nop

# Enviar gesto
python serial_test.py COM3 rock        # Piedra
python serial_test.py COM3 thumbs_up    # Pulgar arriba
python serial_test.py COM3 index        # Señalar
python serial_test.py COM3 open         # Abrir
python serial_test.py COM3 close        # Puño

# Accionamiento directo de un solo servo
python serial_test.py COM3 servo 1 90   # Servo 1 → 90°

# Centrar todo
python serial_test.py COM3 mid

# Configurar mano izquierda/derecha
python serial_test.py COM3 hand L       # Mano izquierda
python serial_test.py COM3 hand R       # Mano derecha

# Barrido de frecuencia / autocomprobación
python serial_test.py COM3 sweep 1      # Barrido del servo 1
python serial_test.py COM3 test         # Probar todos los servos uno a uno
```

#### Modo interactivo

```Bash
python serial_test.py COM3
```

Entra en el REPL; introduzca directamente comandos abreviados (como `servo 3 180`, `rock`, `mid`, `quit`).

### 6.3 Prueba manual con herramientas de puerto serie (opcional)

**CoolTerm** (macOS/Windows/Linux):

1. Abra CoolTerm, `Options` → configure la velocidad en baudios 115200, 8N1

2. `Connection` → `Send String` → seleccione `Hex`

3. Introduzca `AA 01 00 01` → enviar → la mano robótica ejecuta "piedra"

4. Observe cómo el área de respuesta muestra `BB 01 00 01 ... BB 01 10 11`

**SerialTool** (macOS):

```Bash
brew install serialtool
echo -ne '\xAA\x01\x00\x01' > /dev/cu.usbserial-0001
```

### 6.4 Script de control en Python (desarrollo personalizado)

```Python
#!/usr/bin/env python3
"""灵巧手串口控制 - Python 上位机示例"""
import serial
import time

SERIAL_PORT = "/dev/cu.usbserial-0001"  # Modificar al puerto real
BAUD_RATE   = 115200

# Definición de comandos (coincide con el conjunto de comandos del firmware)
CMD = {
    "nop":       0x00,
    "rock":      0x01,
    "scissors":  0x02,
    "paper":     0x03,
    "thumbs_up": 0x04,
    "taunt1":    0x05,
    "taunt2":    0x06,
    "open":      0x07,
    "close":     0x08,
    "ok":        0x09,
    "pinch":     0x0A,
    "index":     0x0C,
    "direct":    0xF0,
    "set_side":  0xF1,
    "repeat":    0xFE,
    "stop":      0xFF,
}

def calc_checksum(cmd_id, data=b""):
    """计算 XOR 校验和 (CMD ^ LEN ^ DATA[0..N])"""
    result = cmd_id ^ len(data)
    for b in data:
        result ^= b
    return result & 0xFF

def send_command(ser, cmd_id, data=b""):
    """发送命令帧，返回 (ack_status, completion_status)"""
    data_len = len(data)
    checksum = calc_checksum(cmd_id, data)
    frame = bytes([0xAA, cmd_id, data_len]) + data + bytes([checksum])
    ser.write(frame)
    print(f"发送: {frame.hex(' ').upper()}")

def read_response(ser, timeout=1.0):
    """读取一个响应帧 [0xBB CMD STATUS CKSUM]"""
    ser.timeout = timeout
    while True:
        b = ser.read(1)
        if not b:
            return None
        if b[0] == 0xBB:
            buf = ser.read(3)
            if len(buf) == 3:
                expected = buf[0] ^ buf[1]
                if expected == buf[2]:
                    return bytes([0xBB]) + buf
    return None

def set_side(ser, side):
    """设置左右手: side='R' 右手, side='L' 左手"""
    val = 0x01 if side.upper() == 'R' else 0x02
    send_command(ser, CMD["set_side"], bytes([val]))

def direct_drive(ser, angles):
    """直驱 8 路舵机: angles 为 8 个 0-180 的角度列表"""
    data = bytes([min(180, max(0, a)) for a in angles[:8]])
    send_command(ser, CMD["direct"], data)

# ===== Ejemplo de uso =====
if __name__ == "__main__":
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    time.sleep(1)  # Esperar a que el ESP32 complete el reinicio

# 1. Prueba del enlace
    print("=== NOP 链路测试 ===")
    send_command(ser, CMD["nop"])

# 2. Juego de piedra, papel o tijera
    print("\n=== 猜拳: 石头 → 剪刀 → 布 ===")
    for name in ["rock", "scissors", "paper"]:
        send_command(ser, CMD[name])
        time.sleep(0.5)

# 3. Gesto de pulgar arriba
    print("\n=== 真棒 ===")
    send_command(ser, CMD["thumbs_up"])

# 4. Detener la prueba
    print("\n=== 停止测试 ===")
    send_command(ser, CMD["taunt1"])  # Empezar a mover el dedo índice
    time.sleep(0.3)
    send_command(ser, CMD["stop"])    # Detener inmediatamente

# 5. Modo de accionamiento directo: centrar todo
    print("\n=== 直驱: 归中 ===")
    direct_drive(ser, [90] * 8)

    ser.close()
```

---

## 7. Seguimiento de gestos

Mediante la **cámara se reconoce la palma en tiempo real** y se accionan la flexión/extensión y la oscilación izquierda-derecha de los dedos de la mano diestra. Basado en el algoritmo de seguimiento de manos de la AmazingHand oficial (21 puntos clave de MediaPipe + rotación a coordenadas de mundo 3D).

### 7.1 Principio

- La cámara se orienta a la palma → MediaPipe reconoce 21 puntos clave de la mano

- Se construye el sistema de coordenadas local de la mano y se calculan los vectores 3D de las puntas de los 4 dedos

- Vector de la punta del dedo → parámetros diferenciales (flex, base) de cada dedo → se reutiliza el protocolo de accionamiento directo para enviarlos a los servos

### 7.2 Requisitos del entorno

El seguimiento de gestos depende de **Python de 64 bits + mediapipe 0.10.14** (la API antigua de solutions; solo esta puede trabajar con coordenadas de mundo 3D):

|Dependencia|Versión|
|---|---|
|Python|64 bits 3.12|
|mediapipe|0.10.14|
|numpy|<2.0|
|scipy|>=1.9|
|opencv-python|>=4.10|
|Pillow|>=10.0|

> **Atención**: el entorno predeterminado actual es Python de 32 bits y no puede instalar mediapipe. Hay que instalar aparte Python 3.12 de 64 bits (instalado en el disco D, por ejemplo `D:\Python312-64`, totalmente compatible y sin conflictos con el actual de 32 bits).

### 7.3 Despliegue en un clic

1. Instale Python 3.12 de 64 bits (descargue el installer de 64 bits desde [python.org](https://www.python.org/downloads/) e instálelo en `D:\Python312-64`)

2. Haga doble clic para ejecutar **`setup_tracking.bat`** en el directorio raíz del proyecto

    - Busca automáticamente Python de 64 bits

    - Crea el entorno virtual `tracking_env`

    - Instala dependencias como mediapipe 0.10.14

    - Verifica la instalación

### 7.4 Pasos de uso

1. Inicie la GUI con el entorno de seguimiento:

```Plaintext
tracking_env\Scripts\python hand_gui.py
```

2. Conecte el puerto serie (seleccione el puerto COM correspondiente al ESP32)

3. En el panel "Seguimiento de gestos", seleccione el número de cámara (por defecto 0)

4. Haga clic en **"Iniciar seguimiento"** → la imagen de la cámara se muestra en el panel

5. Oriente la palma hacia la cámara:

    - **Flexionar/estirar los dedos** → los dedos correspondientes de la mano diestra se flexionan/estiran

    - **Girar la palma a izquierda/derecha** → los dedos de la mano diestra oscilan de izquierda a derecha

6. Haga clic en **"Detener seguimiento"** para finalizar

> Si no se detecta una mano, el panel muestra "未检测到手"; una vez detectada, muestra "检测到手: Right/Left".

### 7.5 Calibración de parámetros

Los coeficientes de mapeo están al final de `hand_tracking.py` (`FLEX_SCALE` / `BASE_SCALE`):

```Python
FLEX_SCALE = 80.0    # Componente z de la punta del dedo → flexión/extensión (flex)
BASE_SCALE = 30.0    # Componente x de la punta del dedo → balanceo izquierda/derecha (base)
```

Si la amplitud de flexión/extensión no es suficiente o la dirección está invertida, ajuste `FLEX_SCALE`; si la amplitud de la oscilación izquierda/derecha no es suficiente o está invertida, ajuste `BASE_SCALE` (el signo positivo o negativo ajusta la dirección).

---

## 8. Ajuste fino de los parámetros de gestos

### 8.1 Ubicación de los parámetros

El desplazamiento angular de cada gesto se define con macros `#define`; **no es necesario modificar el código lógico**, solo ajustar los valores.

- **Versión ESP-IDF**: en la zona "手势参数（用户可调）" al principio de `components/hand_gestures/hand_gestures.c`

### 8.2 Significado de los parámetros

```C
// Ejemplo: gesto de piedra
#define ROCK_IDX_OFF1    70    // Desplazamiento de la articulación 1 del índice
#define ROCK_IDX_OFF2   -70    // Desplazamiento de la articulación 2 del índice
```

- **Valor positivo = flexionar y cerrar**, **valor negativo = extender y abrir**

- Cada dedo tiene 2 desplazamientos, relativos a `middle_pos` (90° por defecto)

- Estructura diferencial: la diferencia entre los desplazamientos de los dos servos = extensión/contracción; la componente en el mismo sentido = desviación izquierda/derecha

### 8.3 Pasos de ajuste

1. Localice la macro `#define` del gesto correspondiente

2. Modifique el valor (aumentar → mayor amplitud; reducir → menor amplitud)

3. Vuelva a compilar y grabar, y pruebe el efecto con el PC anfitrión

4. Ajuste repetidamente hasta que el movimiento resulte natural

---

## 9. Preguntas frecuentes

### Q1: ¿El PC anfitrión no puede conectarse al puerto serie?

1. Confirme que el ESP32 está conectado al ordenador mediante Type-C

2. Compruebe si el número de puerto COM del Administrador de dispositivos coincide con el seleccionado en la GUI

3. Confirme la velocidad en baudios 115200

4. Desconecte otro software que esté ocupando el puerto serie

### Q2: ¿Al enviar un comando no hay reacción?

1. Envíe primero `AA 00 00 00` (NOP); debería recibir `BB 00 00 00`

2. Confirme que el firmware está grabado y que el chip objetivo es ESP32-S3

3. Compruebe el cableado (si el GND comparte masa)

### Q3: ¿La amplitud del movimiento del gesto no es correcta o la dirección está invertida?

Acceda al ajuste fino de los parámetros de gestos (véase la sección 7) y ajuste la macro correspondiente.

### Q4: ¿A qué gestos afecta el modo mano derecha/izquierda?

A los gestos **que incluyen el pulgar**, como piedra/tijera/pulgar arriba/OK/pellizco; tras cambiar de mano, la dirección del pulgar se invierte.

### Q5: ¿El dedo se queda atascado y no se extiende?

Antes de ejecutar cualquier gesto de contracción se "extiende toda la mano y luego se cierra" automáticamente, para evitar que los dedos queden bloqueados por el gesto anterior. Si aun así se atasca, compruebe el montaje mecánico o reduzca la amplitud de contracción.

