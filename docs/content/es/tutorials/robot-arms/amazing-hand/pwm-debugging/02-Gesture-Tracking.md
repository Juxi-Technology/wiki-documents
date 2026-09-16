---
title: "02-Tutorial de seguimiento de gestos"
description: "Seguimiento de gestos — Tutorial de uso (versión con servos PWM)"
---

# 02-Tutorial de seguimiento de gestos

**Seguimiento de gestos — Tutorial de uso (versión con servos PWM)**

Este directorio proporciona **seguimiento de gestos**: la cámara reconoce tu mano y la mano diestra la sigue en tiempo real (cadena IK completa).

> Cadena: cámara → esqueleto de la mano de mediapipe → MuJoCo+IK → 8 ángulos de articulación → ESP32 → servos PWM

> Aplicable a: ESP32-S3 + 8 servos PWM. Para la grabación del firmware, consulte `..\03_firmware_docs`.

## I. Requisitos previos

1. **Hardware**: ESP32-S3 + 8 servos PWM con alimentación, USB conectado y cámara disponible.

2. **Firmware**: ya grabado (consulte el manual de usuario de `..\03_firmware_docs`).

3. **Primer despliegue** (solo una vez, véase más abajo).

## II. Primer despliegue

### 2.1 Instalación del entorno

Entre en `Demo\Windows_Scripts_CN\` (para sistemas en inglés use `Windows_Deploy_Scripts\`) y haga doble clic por orden numérico:

```Plaintext
1-安装环境.bat   → 安装 Rust / uv / dora(几分钟)
```

Después de la instalación, **cierre el terminal y vuelva a abrirlo** una vez.

### 2.2 Despliegue del Demo

```Plaintext
3-部署代码.bat   → 创建 Python 环境 + 编译 AHControl + 安装依赖(几分钟)
```

## III. Ejecutar el seguimiento de gestos (cada vez)

### 3.1 Doble clic para ejecutar el script

Entre en `Demo\Windows_Scripts_CN\` y haga doble clic en `4-运行代码.bat`:

```Plaintext
Select a run mode:
   1 - 模拟仿真（摄像头手势追踪）
   2 - 真实硬件（SCS0009 总线舵机）
   3 - PWM 舵机（ESP32 直驱）    ← 选 3
```

A continuación, elija el tipo de mano:

```Plaintext
PWM 舵机（ESP32 直驱）- 请选择灵巧手：
   1 - 右手          ← 选 1
   2 - 左手          ← 选 2
```

### 3.2 Empezar a usar

1. El script ejecuta automáticamente `dora build` + `dora run`.

2. Se abre la ventana de la cámara y aparecen los dedos de la simulación 3D.

3. Coloque la mano en la imagen y mueva los dedos → **la simulación 3D sigue → la mano diestra sigue**.

4. Detener: Ctrl+C (o cerrar la ventana).

> Sistema Linux: use `Demo\Linux_Scripts_CN\` (chino) o `Linux_Deploy_Scripts\` (inglés); los nombres de script llevan `.sh` y hay que ejecutarlos con `bash nombre_del_script` o añadiendo permisos de ejecución.

## IV. Cómo confirmar que funciona correctamente

En la ventana de ejecución, el nodo AHControl mostrará:

```Plaintext
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N` (p. ej. `sent 300 frames, ESP32 acked 300 frames`)→ **normal**, el enlace con los servos funciona.

- `M = 0` → el ESP32 no recibe datos; compruebe el puerto serie/alimentación (véase más abajo).

Mientras esta línea siga creciendo, significa que el enlace con los servos es normal; lo que queda es solo la cuestión de si la cámara puede seguir el ritmo.

## V. Cambiar entre mano derecha e izquierda

Basta con elegir el tipo de mano en el menú de ejecución. Tras el cambio, el script se reconstruye automáticamente; espere a que termine la compilación antes de operar.

## VI. Preguntas frecuentes

|Síntoma|Solución|
|---|---|
|Los servos no se mueven en absoluto|Compruebe la alimentación (5V 3A), el puerto COM y el cableado; si en el registro `acked M frames` es 0|
|La cámara no muestra imagen|Conceda el permiso de cámara (Configuración→Privacidad→Cámara)|
|La mano no sigue / responde con lentitud|Buena iluminación, mano completamente dentro de la imagen, moverla más despacio y con mayor amplitud|
|La forma de la mano está invertida / la dirección del pulgar al revés|¿Ha elegido correctamente la mano izquierda/derecha en el menú? Pruebe con la otra|
|Tras cambiar el puerto USB no encuentra el puerto serie|Vuelva a ejecutar `2-配置串口.bat` y seleccione una vez el nuevo puerto COM|

## VII. Usuarios de servos de bus SCS0009

Este Demo también admite los **servos de bus SCS0009** oficiales. Seleccione en el menú `2 - 真实硬件(SCS0009 总线舵机)`; para la configuración y las explicaciones, consulte `Demo\双版本舵机并存说明.md` y el tutorial oficial.

## Descripción de directorios

|Ruta|Contenido|
|---|---|
|`Demo\AHControl`|Programa de control de servos en Rust (código fuente, se compila automáticamente durante el despliegue)|
|`Demo\AHSimulation`|Simulación MuJoCo + resolución de IK|
|`Demo\HandTracking`|Seguimiento de manos MediaPipe|
|`Demo\Windows_Scripts_CN` / `Windows_Deploy_Scripts`|Scripts de un clic para Windows (chino/inglés)|
|`Demo\Linux_Scripts_CN` / `Linux_Deploy_Scripts`|Scripts de un clic para Linux (chino/inglés)|
|`Demo\dataflow_*_pwm.yml`|Flujo de datos de la versión PWM (velocidad en baudios 115200 ya incorporada)|

