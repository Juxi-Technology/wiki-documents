---
title: "Paso 2: Sustituir los archivos (adaptación a 7DOF)"
description: "Qué archivos sustituir o modificar para convertir un clon oficial de lerobot en la versión de 7 ejes: opción A con este repositorio u opción B manual."
---

# Paso 2: Sustituir los archivos (adaptación a 7DOF)

## 1\. Si has clonado el repositorio oficial de código, qué archivos hay que sustituir o modificar

### Opción A: usar directamente el código de este repositorio (recomendado)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opción B: sustitución manual tras clonar el lerobot oficial

Copiar de este repositorio **3 archivos** sobre el clon oficial:

|Archivo de este repositorio (origen)|Se copia sobre (destino)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|El archivo del mismo nombre del clon oficial|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|El archivo del mismo nombre del clon oficial|

[so\_follower\.py](/downloads/so_follower.py)

[so\_leader\.py](/downloads/so_leader.py)

> Requisito: que tu clon oficial tenga la misma estructura que la base de este repositorio (versión de lerobot 2026\-09).
> 
> Si las versiones difieren mucho, **no sobrescribas el archivo entero**; aplica en su lugar los dos cambios de la sección "Modificación manual" que aparece a continuación.
> 
> 

### Modificación manual si las versiones no coinciden (solo dos cambios)

**① Diccionario de motores** (una copia en `so_follower.py` y otra en `so_leader.py`, con el mismo contenido) —— el bloque original

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

se cambia por

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # Servo nuevo, rotación izquierda/derecha
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # Antiguo motor de balanceo n.º 5, ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② Lógica de calibración** (el `calibrate()` de cada uno de los dos archivos) —— elimina el caso especial de la "articulación de vuelta completa": el bloque

```Python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

se sustituye por una sola línea que registra el rango real de todas las articulaciones:

```Python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

> Por qué: la versión original fijaba `wrist_roll` (balanceo alrededor del eje del antebrazo) como una articulación capaz de girar una vuelta completa (0\~4095) y codificaba su rango completo de forma rígida. Tras la conversión a 7\-DOF, las articulaciones de muñeca n.º 5 y n.º 6 (yaw / roll) **tienen topes mecánicos y no pueden girar por completo**; fijar una vuelta completa haría que el código enviara comandos de articulación a ángulos que el mecanismo no puede alcanzar, con riesgo de daños. Ahora, durante la calibración, se registra manualmente el mínimo/máximo real de cada motor.
> 
> 

### Nota sobre el doble brazo seguidor

`bi_so_follower` / `bi_so_leader` (`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`) solo envuelven el brazo individual añadiendo los prefijos `left_`/`right_`, **no contienen definiciones de motores**. Basta con modificar **los archivos del brazo individual anteriores** para que los comandos de doble brazo (`--robot.type=bi_so_follower`) sean automáticamente 7\-DOF.

