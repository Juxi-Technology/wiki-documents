---
title: Comandos de LeRobot original
---

# Comandos de LeRobot original

> **Pertenece a:** [lerobot/](01-Operation.md) — un solo brazo SO-101 / SO-100, LeKiwi
> **Requisito previo:** lea primero [deployment/](../deployment/01-Overview.md) y entre en el contenedor
> **El otro camino:** [xlerobot/](../xlerobot/01-Operation.md) (XLeRobot completo)
> **Siguiente:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

Use la línea de comandos `lerobot-*` para operar **un solo brazo SO-101 / SO-100** o un **LeKiwi**.

> ⚠️ Para ejecutar el **XLeRobot completo**, vaya a [xlerobot/](../xlerobot/01-Operation.md).
> Estas herramientas de línea de comandos **no admiten `xlerobot`**; el motivo
> está en la sección 0.

---

## 0. Cuándo seguir esta ruta

| Su hardware | Qué ruta seguir | Por qué |
|---|---|---|
| **Un solo brazo SO-101 / SO-100** | ✅ **Esta página** (CLI `lerobot-*`) | Las herramientas originales lo admiten directamente |
| **LeKiwi** | ✅ **Esta página** (CLI `lerobot-*`) | Las herramientas originales lo admiten directamente |
| **XLeRobot completo** (dos brazos + chasis) | ❌ Vaya a [04](../xlerobot/01-Operation.md) | `xlerobot` no está en la lista blanca de la CLI |

**Por qué se dividen en dos rutas**: herramientas de línea de comandos como
`lerobot-calibrate` llevan escrita en el código fuente una lista fija de
robots que importan (14 robots originales; la lista completa está en la
sección 11), **en la que no está `xlerobot`**. Si se fuerza, dará el error:

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

A la inversa, los scripts de `examples/` están escritos para el XLeRobot
completo y no sirven para un brazo único.

**Las dos rutas comparten el mismo entorno**: el paquete instalado en la
imagen se llama `lerobot`, y XLeRobot solo añade tres piezas de código al
directorio `robots/`. Por eso **puede cambiar de una a otra en cualquier
momento sin reinstalar nada**, y ambos pueden importarse juntos en el mismo
proceso.

---

## 1. Flujo completo

```
Preparar      Calibrar      Usar           Entrenar   Desplegar
────────      ────────      ────           ────────   ─────────
find-port  →  calibrate  →  teleoperate  ┐
find-cameras              record        ┴→  train  →  rollout
                          replay
```

Cada paso es un comando; a continuación los repasamos uno por uno.

---

## 2. Preparación: buscar el puerto serie y las cámaras

```bash
lerobot-find-port          # Interactivo: siga las indicaciones para desconectar y reconectar el cable de los servos; muestra el nombre del puerto
lerobot-find-cameras opencv   # Prueba las cámaras una a una y hace capturas
```

`lerobot-find-cameras` guarda las capturas en `outputs/captured_images/`; si
puede ver la imagen, la cámara funciona. **Probado y funcional** (detecta
`/dev/video0` y captura correctamente).

> Los dos comandos son **interactivos**; si ejecuta `--help` directamente
> dará un EOF, lo cual es normal.

---

## 3. Primera vez con servos nuevos: escribir el ID

Los servos nuevos vienen de fábrica con el ID 1; hay que cambiarlos uno a uno
a un ID del 1 al 6 para poder encadenarlos en el mismo bus:

```bash
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

Le pedirá que «conecte un solo servo y pulse Intro»; cuando termine con uno,
conecte el siguiente.

> Solo hace falta al montar el brazo por primera vez o al cambiar un servo.
> Si el brazo ya se comunica con normalidad, sáltese este paso.

---

## 4. Calibración

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_arm
```

- **Si no hay archivo de calibración** → entra en la guía: primero coloque el
  brazo en el punto medio de su recorrido y pulse Intro, y después recorra
  cada articulación a lo largo de todo su recorrido
- **Si ya hay archivo de calibración** → le pregunta si restaurar o recalibrar

El archivo de calibración está en
`~/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_arm.json`.
**El contenedor se inicia con `-v ~/.cache/huggingface` montado** (véase
[03-Deployment](../deployment/03-Deployment.md)), así que al reiniciar el contenedor no se
pierde.

Si usa un par de brazos maestro-esclavo, calibre **una vez cada uno**, el
brazo esclavo y el brazo maestro:

```bash
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower
lerobot-calibrate --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

---

## 5. Teleoperación

### Mover el brazo esclavo con el maestro (modo maestro-esclavo)

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

### ¿No tiene brazo maestro? Use el teclado

`--teleop.type` incluye `keyboard`, y no necesita un segundo tipo de hardware:

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard
```

También puede usar `--teleop.type=gamepad` para conectar un mando de Xbox
(requiere `pip install "lerobot[gamepad]"`).

### Con cámara para ver la imagen

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --display_data=true --display_mode=rerun
```

> Para usar la visualización de rerun también hay que instalar antes las dos
> bibliotecas X11; véase la sección 1 de
> [xlerobot/](../xlerobot/01-Operation.md).

---

## 6. Recopilar datos de demostración

```bash
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --dataset.repo_id=<tu-usuario>/<mi-primer-dataset> \
  --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"
```

**Descripción de los parámetros:**

| Parámetro | Función |
|---|---|
| `--robot.cameras` | Configuración de las cámaras, con **sintaxis de diccionario anidado**: `nombre: {type: opencv, index_or_path: ..., width/height/fps}` |
| `--dataset.repo_id` | ID del conjunto de datos en Hugging Face (también se puede subir tras grabarlo en local) |
| `--dataset.num_episodes` | Cuántos episodios grabar |
| `--dataset.single_task` | Descripción de la tarea; útil para el entrenamiento |
| `--dataset.root` | Añádalo si quiere guardar en otro directorio; por defecto se guarda en el directorio de caché |

**Teclas durante la grabación** (el terminal se lo irá indicando):

| Tecla | Acción |
|---|---|
| `→` (flecha derecha) | Terminar antes de tiempo el episodio actual y pasar a la fase de reinicio |
| `←` (flecha izquierda) | Descartar el episodio actual y volver a grabarlo |
| `Esc` | Detener toda la grabación |

Al terminar, los datos ya se pueden usar en local. Para subirlos al Hub:

```bash
--dataset.push_to_hub=true
```

(Recuerde que al iniciar el contenedor se añadió
`-e HF_ENDPOINT=https://hf-mirror.com`.)

---

## 7. Comprobación por reproducción

Después de grabar, reprodúzcalo una vez para comprobar que los datos están
bien antes de entrenar:

```bash
lerobot-replay \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<tu-usuario>/<mi-primer-dataset> \
  --dataset.episode=0
```

---

## 8. Entrenamiento

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<tu-usuario>/<mi-primer-dataset>
```

> `lerobot-train` **no necesita `robot.type`** (solo acepta el conjunto de
> datos y el tipo de política), así que este comando es **compartido** con la
> ruta de XLeRobot: los datos de XLeRobot que grabe también se pueden
> entrenar así.
>
> El entrenamiento consume muchos recursos. En CPU solo se puede entrenar a
> escala minúscula; para que resulte práctico se necesita la GPU de una
> Jetson.

Políticas disponibles (`--policy.type`): `act` (la más habitual), `diffusion`,
`smolvla`, `pi0` / `pi05` / `pi0_fast`, `groot`, `tdmpc`, `vqbet`, etc.

---

## 9. Despliegue en el robot real: ejecutar una política entrenada

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<tu-usuario>/<mi-modelo> \
  --strategy.type=base
```

| Parámetro | Descripción |
|---|---|
| `--policy.path` | La política entrenada (ID en el Hub o ruta local) |
| `--strategy.type` | `base` es la más habitual; también existen `sentry`, `highlight`, `episodic` y `dagger` |
| `--inference.type` | `sync` (predeterminado) o `rtc` |

> ⚠️ **No use `lerobot-eval` en el robot real**: está pensado para
> **benchmarks de simulación**
> (`--env.type=aloha/pusht/libero/metaworld...`), no para desplegar en un
> robot real. Para el robot real, use `lerobot-rollout`.

---

## 10. Tabla completa de herramientas de línea de comandos

| Comando | Función | ¿Necesita `robot.type`? |
|---|---|---|
| `lerobot-find-port` | Buscar el puerto serie | No |
| `lerobot-find-cameras` | Buscar cámaras | No |
| `lerobot-setup-motors` | Escribir el ID de servos nuevos | Sí |
| `lerobot-calibrate` | Calibrar | Sí |
| `lerobot-teleoperate` | Teleoperar | Sí |
| `lerobot-record` | Grabar conjuntos de datos | Sí |
| `lerobot-replay` | Reproducir datos | Sí |
| `lerobot-train` | Entrenar políticas | **No** (compartido con XLeRobot) |
| `lerobot-rollout` | Desplegar políticas en el **robot real** | Sí |
| `lerobot-eval` | Evaluación de **benchmarks de simulación** | No (usa `--env.type`) |
| `lerobot-edit-dataset` | Editar conjuntos de datos | No |
| `lerobot-dataset-viz` | Visualización de conjuntos de datos | No |
| `lerobot-info` | Imprimir información del entorno y las versiones | No |

---

## 11. Tipos de robot compatibles con la CLI (lista completa)

Estos son **todos los tipos que la línea de comandos `lerobot-*` reconoce
realmente** (leídos de la lista blanca del código fuente). **No hay
`xlerobot`**; por eso el tutorial se divide en dos rutas.

**Robots (`--robot.type`) — 14 tipos:**

```
openarm_follower      bi_openarm_follower     rebot_b601_follower
bi_rebot_b601_follower so100_follower         so101_follower
bi_so_follower        hope_jr_hand            hope_jr_arm
koch_follower         lekiwi                  lekiwi_client
omx_follower          unitree_g1
```

**Teleoperadores (`--teleop.type`) — incluye:**

```
so101_leader      so100_leader      bi_so_leader      koch_leader
openarm_leader    omx_leader        rebot_102_leader  unitree_g1
keyboard          gamepad           homunculus_arm    homunculus_glove
```

> La lista completa definitiva es la que muestre el `--help` de su propia
> imagen; según la versión puede haber añadidos o eliminados.

---

## 12. Un ejemplo completo (de cero a funcionar)

```bash
# 1. Buscar los dispositivos
lerobot-find-port                          # Apunte el puerto serie; abajo se usa /dev/ttyACM0
lerobot-find-cameras opencv                # Apunte la cámara; abajo se usa /dev/video0

# 2. Escribir el ID de los servos nuevos (solo hace falta en brazos recién montados)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 3. Calibrar
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# 4. Probar con el teclado si se mueve
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# 5. Grabar 10 episodios
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<tu-usuario>/my-first-dataset \
  --dataset.num_episodes=10 --dataset.single_task="pick up the cube"

# 6. Entrenar
lerobot-train --policy.type=act --dataset.repo_id=<tu-usuario>/my-first-dataset

# 7. Dejar que el brazo funcione solo
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<tu-usuario>/my-first-dataset --strategy.type=base
```

---

## Resultados de verificación

Los comandos de esta página se **ejecutaron realmente** en la imagen
`chenyang310/xlerobot:jetson` con JetPack 7.2:

| Elemento | Resultado |
|---|---|
| Análisis de los 14 `--robot.type` originales | ✅ Correcto |
| Análisis de `--teleop.type` (incluido `keyboard`) | ✅ Correcto |
| Cadena completa de `lerobot-calibrate` | ✅ Llega hasta abrir el puerto serie y ahí se detiene (en ese momento no había servos conectados) |
| Cadena completa de `lerobot-teleoperate --teleop.type=keyboard` | ✅ Igual que el anterior |
| `lerobot-find-cameras opencv` | ✅ **Con hardware real**: detectó `/dev/video0` y capturó imágenes correctamente |
| Análisis de la sintaxis anidada de `--robot.cameras` | ✅ Correcto |
| Robots originales y XLeRobot **coexistiendo en el mismo proceso** | ✅ 8 tipos registrados a la vez |

Como no había ningún brazo conectado, **la verificación a nivel de movimiento
aún no se ha hecho**. Cuando conecte su SO-101, ejecute la sección 12 de
principio a fin y avíseme si algún paso falla.

---

> **Siguiente:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md) — Consulte aquí si algo va mal
