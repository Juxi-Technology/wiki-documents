---
title: "Tutorial de uso de SO-ARM101 + AmazingHand"
description: "Tutorial de SO-ARM101 con AmazingHand: guía completa de teleoperación, recolección de datos, entrenamiento de políticas y despliegue, en Linux y Windows."
---


# Tutorial de uso de SO-ARM101 + AmazingHand

Este tutorial está orientado a reproducir el flujo completo de teleoperación, recolección de datos y entrenamiento de **SO-ARM101 brazo esclavo + mano diestra AmazingHand**, basado en LeRobot (versión personalizada del repositorio oficial).

El tutorial está organizado por **fases**; cada fase constituye un directorio independiente y, en su interior, se divide por sistema operativo en dos documentos: `win.md` (Windows) y `linux.md` (Linux). Selecciona el documento correspondiente según tu sistema operativo.

---

## Descripción general del hardware y el software

|Dispositivo|Puerto serie (ejemplo, debe reemplazarse)|Modelo de servomotor|Descripción|
|---|---|---|---|
|Brazo maestro (Leader)|`COM54` / `/dev/ttyACM1`|Modelo mixto<br>`sts3125-C001、sts3215-C044、sts3215-C046`|Entrada de teleoperación, conserva la pinza n.º 6|
|Brazo esclavo (Follower)|`COM58` / `/dev/ttyACM0`|`sts3215-C018` (n.º 1-5)|Extremo de ejecución, se retira la pinza n.º 6|
|Mano diestra AmazingHand|`COM11` / `/dev/ttyACM2`|`scs0009` (8 unidades, ID 1-8)|Extremo del brazo esclavo, puerto serie independiente|

> **⚠️ El nombre del puerto serie varía según la máquina**: la tabla anterior es solo un ejemplo. El número COM/ruta del dispositivo es distinto en cada computadora; es imprescindible usar `lerobot-find-port` para confirmar los valores reales de tu equipo y reemplazar todos los parámetros de marcador de posición en los comandos.

> Los tres dispositivos deben tener **cada uno un puerto serie independiente y alimentación independiente**. SCS0009 (protocolo 1) y STS3215 (protocolo 0) no son compatibles en el mismo bus.

---

## Estructura del directorio del tutorial

```Plaintext
tutorials/
├── README.md                          # Este archivo (visión general)
├── 01-environment/                    # Fase uno: preparación del entorno
│   ├── win.md                         #   Preparación del entorno en Windows
│   └── linux.md                       #   Preparación del entorno en Linux
├── 02-calibration/                    # Fase dos: calibración
│   ├── win.md
│   └── linux.md
├── 03-teleoperation/                  # Fase tres: teleoperación
│   ├── win.md
│   └── linux.md
├── 04-data-collection/                # Fase cuatro: recolección de datos
│   ├── win.md
│   └── linux.md
├── 05-training/                       # Fase cinco: entrenamiento del modelo
│   ├── win.md
│   └── linux.md
└── 06-deployment/                     # Fase seis: despliegue y evaluación
    ├── win.md
    └── linux.md
```

---

## Ruta de lectura recomendada

|Paso|Fase|Windows|Linux|
|---|---|---|---|
|1|Preparación del entorno|01-environment/win.md|01-environment/linux.md|
|2|Calibración|02-calibration/win.md|02-calibration/linux.md|
|3|Teleoperación|03-teleoperation/win.md|03-teleoperation/linux.md|
|4|Recolección de datos|04-data-collection/win.md|04-data-collection/linux.md|
|5|Entrenamiento del modelo|05-training/win.md|05-training/linux.md|
|6|Despliegue y evaluación|06-deployment/win.md|06-deployment/linux.md|

---

## Consulta rápida de las diferencias clave entre fases

|Aspecto|Windows|Linux|
|---|---|---|
|Entorno de Python|Miniconda + `conda create -n lerobot python=3.12`|Miniforge + el mismo comando|
|Nombre del puerto serie|`COM54` / `COM58` / `COM11` (ejemplo)|`/dev/ttyACM0/1/2` (ejemplo)|
|Permisos del puerto serie|No requiere configuración especial|Requiere `sudo chmod 666 /dev/ttyACM*` o reglas udev|
|Invocación de comandos|`lerobot-xxx` tras activar conda|`lerobot-xxx` tras activar conda|
|Entrenamiento con CUDA|Requiere instalar manualmente torch con CUDA|Soporte oficial, resolución fluida|

---

## Consideraciones generales

1. **Primero completa la fase uno y luego pasa a las fases siguientes**: el entorno es el requisito previo para todos los comandos posteriores.

2. **Cada computadora debe recalibrarse**: especialmente los ángulos de la mano (`lerobot-calibrate-amazing-hand`); los ángulos del config son los valores predeterminados genéricos oficiales de AmazingHand y solo sirven como respaldo; si existe `hand_angles.json`, se cargan con prioridad los valores medidos en tu equipo.

3. **Ubicación de los archivos de calibración**: `~/.cache/huggingface/lerobot/calibration/`; al cambiar de máquina es necesario migrarlos o recalibrar.

4. **En la primera teleoperación verifica siempre la dirección**: apertura de la pinza ↔ apertura de la mano, pinzado ↔ cierre de la mano.

5. Los archivos `win.md` / `linux.md` de cada fase incluyen **consideraciones específicas de esa plataforma**; léelos por completo.

---

## Punto de entrada para la solución de problemas

Los documentos de cada fase incluyen tablas de solución de problemas por plataforma. Problemas comunes:

- conda no inicializado/comando no encontrado

- permisos insuficientes del puerto serie (Linux)

- error en el mapeo de dirección mano/brazo

- ángulos de la mano sin calibrar que provocan una apertura/cierre anómalos

Consulta los documentos de cada fase para más detalles.

## Enlaces relacionados

- [Tutorial de uso de la mano diestra AmazingHand](https://juxitech.feishu.cn/wiki/PR1JwkQxaiDAn1k85e2cZIi5nTf)
- [Tutorial del brazo robótico SO-ARM101](https://juxitech.feishu.cn/wiki/NOWXw9NOJiDTs2kRr7RcdIrKnvg)

<RelatedProducts slugs="so-arm101,amazinghand" />
