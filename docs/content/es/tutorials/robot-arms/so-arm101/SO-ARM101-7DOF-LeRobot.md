---
title: Tutorial de conversión a 7-DOF del SO-ARM101 y uso con LeRobot
description: "Correspondencia de ID de servos tras convertir el SO-ARM101 de 6 servos a 7 grados de libertad (nuevo wrist_yaw), cambios de código y método de sustitución, notas sobre la calibración y uso con LeRobot."
---

# Tutorial de conversión a 7-DOF del SO-ARM101 y uso con LeRobot

> **[Comprar en la tienda](https://www.juxitech.com/es/products/so-arm101-developers-kit)**

Este tutorial está dirigido a quienes han convertido el **SO-ARM101 de 6 servos a 7 servos** y quieren ejecutar el flujo completo con LeRobot (calibración → grabación → entrenamiento → despliegue). El código de la versión modificada se basa en una copia del código fuente oficial de LeRobot adaptada al **brazo robótico SO-ARM101 de 7 grados de libertad** (7 servos STS3215).

**Diferencias clave con el SO-101 oficial (6 servos):**

| ID de servo | Nombre de articulación | SO-101 oficial (6-DOF) | Descripción |
| :---: | :--- | :--- | :--- |
| 1 | `shoulder_pan` | shoulder_pan | Rotación horizontal del hombro |
| 2 | `shoulder_lift` | shoulder_lift | Elevación del hombro |
| 3 | `elbow_flex` | elbow_flex | Flexión del codo |
| 4 | `wrist_flex` | wrist_flex | Inclinación de la muñeca (flexión arriba/abajo) |
| 5 | `wrist_yaw` | — (nuevo) | Guiñada de la muñeca (rotación izquierda/derecha de unos 90°), **el servo nuevo de esta conversión** (insertado entre los antiguos n.º 4 y n.º 5) |
| 6 | `wrist_roll` | wrist_roll (ID 5→6) | Balanceo de la muñeca; es el antiguo motor de balanceo n.º 5, la pieza impresa no cambia ni tampoco el nombre |
| 7 | `gripper` | gripper (ID 6→7) | Pinza; antes ID=6, tras la conversión pasa a 7 |

> ⚠️ Nota: **los datos, los archivos de calibración y los modelos ya entrenados de la versión de 6 servos son incompatibles con la conversión a 7-DOF**; hay que rehacer todo el proceso siguiendo este tutorial.

## Orden de los datos de las articulaciones

Tras la grabación, el orden de las dimensiones de las articulaciones en `action` / `observation.state` dentro del Parquet es:

`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`

## Cambios en el montaje mecánico

Entre el antiguo n.º 4 (`wrist_flex`) y el n.º 5 (`wrist_roll`) se inserta el nuevo servo `wrist_yaw` junto con una pieza impresa, y los motores posteriores se desplazan una posición: el antiguo motor de balanceo n.º 5 pasa a la posición 6 y la pinza a la posición 7 (las piezas impresas de estos dos motores no cambian).

## Cambios principales en el código

1. **La definición de motores pasa a 7**: se añade `wrist_yaw(5)` (rotación izquierda/derecha); el antiguo motor `wrist_roll` se traslada al **ID 6** (sigue siendo el balanceo y conserva el nombre); la pinza `gripper(6)` → `gripper(7)`. La pinza sigue usando `RANGE_0_100` (apertura 0~100) y el resto de articulaciones usa `DEGREES`.
   - `src/lerobot/robots/so_follower/so_follower.py`
   - `src/lerobot/teleoperators/so_leader/so_leader.py`
2. **La calibración ya no define una "articulación de vuelta completa"**: el código original fijaba `wrist_roll` como articulación de vuelta completa (0~4095); tras la conversión a 7-DOF, la guiñada y el balanceo de la muñeca tienen topes mecánicos y no pueden girar por completo, por lo que la calibración pasa a usar `record_ranges_of_motion()` para registrar el rango de movimiento real de **todas** las articulaciones.
   - `src/lerobot/robots/so_follower/so_follower.py` (`calibrate()`)
   - `src/lerobot/teleoperators/so_leader/so_leader.py` (`calibrate()`)

## Usar el repositorio modificado o sustituir los archivos manualmente

Si ha clonado el repositorio oficial de código, debe sustituir o modificar los siguientes archivos.

### Opción A: usar directamente el repositorio modificado (recomendado)

Use directamente el repositorio de código ya adaptado a 7-DOF, sin ninguna modificación manual.

### Opción B: sustitución manual tras clonar el lerobot oficial

Copie del repositorio modificado **3 archivos** sobre el clon oficial:

| Archivo del repositorio modificado (origen) | Se copia sobre (destino) |
| :--- | :--- |
| `src/lerobot/robots/so_follower/so_follower.py` | El archivo del mismo nombre del clon oficial |
| `src/lerobot/teleoperators/so_leader/so_leader.py` | El archivo del mismo nombre del clon oficial |
| `src/lerobot/robots/so_follower/robot_kinematic_processor.py` | El archivo del mismo nombre del clon oficial (**solo corrección de comentarios**; no afecta a la funcionalidad, se puede omitir) |

```bash
cp src/lerobot/robots/so_follower/so_follower.py          <官方clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <官方clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> Requisito: que su clon oficial tenga la misma estructura que la base del repositorio modificado (versión de lerobot de 2026-08). Si las versiones difieren mucho, **no sobrescriba archivos enteros**: aplique en su lugar los dos cambios de la sección "Modificación manual" siguiente.

### Modificación manual si las versiones no coinciden (solo dos cambios)

**① Diccionario de motores** (una copia en `so_follower.py` y otra en `so_leader.py`, con el mismo contenido) — el bloque original

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

se cambia por

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # 新增舵机,左右旋转
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # 原 5 号滚动电机,ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② Lógica de calibración** (el `calibrate()` de cada uno de los dos archivos) — elimine el caso especial de la "articulación de vuelta completa" y sustituya

```python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

por una sola línea que registra el rango real de todas las articulaciones:

```python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

El motivo y los riesgos de esta modificación se explican en la siguiente sección, "Notas sobre la calibración".

## Notas sobre la calibración

- **Ya no hay "articulación de vuelta completa"**: el código oficial original fijaba el rango completo de `wrist_roll` (balanceo alrededor del eje del antebrazo) como si pudiera girar por completo (0~4095). Tras la conversión a 7-DOF, las articulaciones de muñeca n.º 5 y n.º 6 (`wrist_yaw` / `wrist_roll`) tienen topes mecánicos y no pueden girar por completo.
- **Descripción del riesgo**: si se mantiene el valor fijo de vuelta completa del código oficial, el código enviará comandos de articulación a ángulos que el mecanismo no puede alcanzar, con riesgo de daños; por eso la calibración pasa a registrar manualmente el mínimo/máximo real de cada motor (corresponde al cambio de código ② anterior).
- **Los archivos de calibración de la versión de 6 servos son incompatibles con 7-DOF**; tras la conversión hay que volver a calibrar desde cero.
- Para el proceso de calibración y uso del doble brazo (doble brazo seguidor), consulte el [Tutorial de doble brazo (doble brazo seguidor) del SO-ARM101](./SO-ARM101-Bi-Arm-Tutorial.md).

## Nota sobre el doble brazo (bi_so_follower)

`bi_so_follower` / `bi_so_leader` (`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`) solo envuelven el brazo individual añadiendo los prefijos `left_`/`right_` y **no contienen definiciones de motores**. Basta con modificar los archivos del brazo individual anteriores para que los comandos de doble brazo (`--robot.type=bi_so_follower`) sean automáticamente 7-DOF. Para el flujo completo de doble brazo (calibración, teleoperación, grabación del dataset, entrenamiento, despliegue), consulte el [Tutorial de doble brazo (doble brazo seguidor) del SO-ARM101](./SO-ARM101-Bi-Arm-Tutorial.md).

<RelatedProducts slugs="so-arm101" />
