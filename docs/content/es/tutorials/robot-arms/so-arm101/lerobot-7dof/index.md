---
title: "Tutorial del brazo robótico SO-ARM101 de 7 ejes"
description: "Antes de empezar el curso de 7 ejes: confirme el mapeo de servos y articulaciones, vea qué cambia del brazo de 6 servos y elija cómo sustituir los archivos."
---

# Tutorial del brazo robótico SO\-ARM101 de 7 ejes

# SO\-ARM101 7\-DOF · Preparación previa

> Esta guía está dirigida a quienes, tras convertir el **SO\-ARM101 de 6 servos a 7 servos**, quieren ejecutar el flujo completo con LeRobot (calibración → grabación → entrenamiento → despliegue).
> Código correspondiente: este repositorio (`lerobot-7dof`), un fork del lerobot oficial en el que solo se han modificado las configuraciones de motores relacionadas con SO.
> 
> 

---

## 0\. Confirma primero tu brazo robótico

7 servos (todos STS3215); correspondencia entre los ID de servo y las articulaciones:

|**ID de servo**|**Nombre de articulación**|**Descripción**|
|---|---|---|
|1|`shoulder_pan`|Rotación horizontal del hombro|
|2|`shoulder_lift`|Elevación del hombro|
|3|`elbow_flex`|Flexión del codo|
|4|`wrist_flex`|Inclinación de la muñeca (flexión arriba/abajo)|
|5|`wrist_yaw`|Guiñada de la muñeca (rotación izquierda/derecha de unos 90°) · **el servo nuevo de esta conversión** (insertado entre los antiguos n.º 4 y n.º 5)|
|6|`wrist_roll`|Balanceo de la muñeca · el antiguo motor de balanceo n.º 5, ID 5→6, la pieza impresa no cambia ni tampoco el nombre|
|7|`gripper`|Pinza · antes ID=6, tras la conversión pasa a 7|

Orden de los datos de las articulaciones (orden de las dimensiones de las articulaciones en `action` / `observation.state` dentro del Parquet tras la grabación):
`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`.

⚠️ Nota: **los datos, los archivos de calibración y los modelos ya entrenados de la versión de 6 servos son incompatibles con este repositorio**; hay que rehacer todo el proceso siguiendo lo indicado a continuación.

---

## 1\. Si has clonado el repositorio oficial de código, qué archivos hay que sustituir o modificar

### Opción A: usar directamente el código de este repositorio (recomendado)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opción B: sustitución manual tras clonar el lerobot oficial

Copiar de este repositorio **3 archivos** sobre el clon oficial:

|Archivo de este repositorio (origen)|Se copia sobre (destino)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|El archivo del mismo nombre del clon oficial|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|El archivo del mismo nombre del clon oficial|
|`src/lerobot/robots/so_follower/robot_kinematic_processor.py`|El archivo del mismo nombre del clon oficial (**solo corrección de comentarios**; no afecta a la funcionalidad, se puede omitir)|

```Bash
cp src/lerobot/robots/so_follower/so_follower.py          <clon oficial>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <clon oficial>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> Requisito: que tu clon oficial tenga la misma estructura que la base de este repositorio (versión de lerobot 2026\-08). Si las versiones difieren mucho, **no sobrescribas archivos enteros**; aplica en su lugar los dos cambios de la sección "Modificación manual" que aparece a continuación.
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

`bi_so_follower / bi_so_leader（src/lerobot/robots/bi_so_follower/、src/lerobot/teleoperators/bi_so_leader/）solo envuelven el brazo individual añadiendo los prefijos left_/right_, `**`no contienen definiciones de motores`**`. Basta con modificar`**`los archivos del brazo individual anteriores`**`para que los comandos de doble brazo (--robot.type=bi_so_follower) sean automáticamente 7-DOF.`

## 1. Instalar LeRobot

- [Equipo Ubuntu](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
- [Equipo Windows](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
- [Equipo MAC](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)

## 2. Sustituir los archivos (adaptación a 7DOF)

- [Sustituir los archivos (adaptación a 7DOF)](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)

## 3. Puerto serie

- [Ubuntu](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
- [Equipo Windows](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
- [Equipo MAC](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)

## 4. Calibración

- [Equipo Ubuntu](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
- [Equipo Windows](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
- [Equipo Mac](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)

## 5. Teleoperación

- [Equipo Ubuntu](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
- [Equipo Windows](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
- [Equipo Mac](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)

## 6. Cámara y teleop.

- [Equipo Ubuntu](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
- [Equipo Windows](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
- [Equipo Mac](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)

## 7. Conjunto de datos

- [Revisar y reproducir el conjunto de datos](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
- [Notas de la recopilación del conjunto de datos](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
- [Cuenta de Hugging Face (opcional)](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
- [Subir el conjunto de datos a HuggingFace (opcional)](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
- [Recopilación del conjunto de datos por enseñanza-Apretón de manos 200](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
- [Recopilación del conjunto de datos por enseñanza](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)

## 8. Entrenamiento

- [Configuración del entorno de entrenamiento con GPU en la nube](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
- [Línea de comandos de entrenamiento-ACT (recomendado para empezar)](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
- [Línea de comandos de entrenamiento-Diffusion](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
- [Línea de comandos de entrenamiento-pi0.5](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
- [Línea de comandos de entrenamiento-pi0 (el de mejores resultados)](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
- [Línea de comandos de entrenamiento-pi0fast](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
- [Línea de comandos de entrenamiento-smolvla (recomendado para nivel avanzado)](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
- [Subir el modelo a HuggingFace (opcional)](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
- [Algoritmos de aprendizaje por imitación compatibles con LeRobot](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
- [Entrenamiento local en Ubuntu](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
- [Obtener el archivo de pesos del modelo](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
- [Recomendaciones de parámetros de entrenamiento](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
- [Curvas de entrenamiento en tiempo real con wandb](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)

## 9. Inferencia

- [Descripción de la línea de comandos](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
- [Línea de comandos de inferencia-ACT](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
- [Línea de comandos de inferencia-Diffusion](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
- [Línea de comandos de inferencia-pi0.5](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
- [Línea de comandos de inferencia-pi0](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
- [Línea de comandos de inferencia-smolvla](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
- [Bugs comunes y soluciones](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
- [Inferencia en NVIDIA DGX Spark](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
- [Inferencia en D-Robotics RDK S100](/es/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)
