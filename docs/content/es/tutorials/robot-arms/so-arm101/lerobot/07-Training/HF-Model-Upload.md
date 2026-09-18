---
title: "Paso 7: Subir el modelo (opcional)"
description: "Sube el modelo entrenado a HuggingFace, de forma automática durante el entrenamiento o manual al terminar, para respaldarlo o usarlo en otra máquina."
---

# Paso 7: Subir el modelo (opcional)

> Este paso es opcional. Una vez terminado el entrenamiento, el modelo queda guardado en tu ordenador o en la instancia de GPU en la nube, y puedes llevarlo directamente a la inferencia sin ningún problema. Solo cuando necesites **respaldar el modelo, usar otra máquina para la inferencia o compartir el modelo con otras personas** tendrás que subirlo a HuggingFace.

## Marcadores de posición en los comandos

Este artículo sigue la convención de marcadores de posición de los capítulos anteriores; sustitúyelos por tu propia información y, al hacerlo, **elimina también los corchetes angulares**:

- `<usuario>`: el nombre de tu cuenta de HuggingFace
- `<usuario>`: el nombre de usuario del sistema de tu ordenador; puedes consultarlo escribiendo `whoami` en la terminal

## Método 1: Subida automática durante el entrenamiento

Añade dos líneas de parámetros al comando de entrenamiento y, al terminar el entrenamiento, el modelo se subirá automáticamente:

```Shell
  --policy.push_to_hub=true \
  --policy.repo_id=<usuario>/shake_act_a \
```

**Estas dos líneas deben aparecer juntas; si escribes solo `push_to_hub=true`, dará error.** `repo_id` es el nombre del repositorio que le das a este modelo, con la forma `账号名/模型名`; si el repositorio no existe, LeRobot lo creará automáticamente.

Por ejemplo, el comando completo de ACT queda así:

```Shell
lerobot-train \
  --dataset.repo_id=<usuario>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=~/output_lerobot_train/shake/act/ \
  --job_name=shake_act_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=true \
  --policy.repo_id=<usuario>/shake_act_a \
  --steps=20000 \
  --batch_size=8
```

Siguiendo lo explicado en la sección anterior, cuando termine esta versión del entrenamiento el modelo aparecerá en `https://huggingface.co/<usuario>/shake_act_a`.

### Quieres subir también los checkpoints intermedios

Durante el entrenamiento se guarda un checkpoint cada `save_freq` (20000 pasos por defecto). Si quieres subir también estos checkpoints intermedios (por ejemplo, si el entrenamiento va a durar mucho y quieres disponer en cualquier momento de un modelo intermedio), añade esta línea:

```Shell
  --policy.save_checkpoint_to_hub=true \
```

Al subirlos, cada checkpoint se etiqueta con un nombre igual a su número de pasos (por ejemplo `010000`); más adelante, al cargar el modelo, basta con indicar esta etiqueta para obtener la versión correspondiente a ese número de pasos. Consulta "Cargar un modelo subido" más abajo para más detalles.

### Algunos parámetros opcionales

Añádelos según necesites:

| Parámetro | Descripción |
|---|---|
| `--policy.private=true` | Marca el repositorio como privado para que otros no puedan verlo |
| `--policy.tags=act,so101` | Añade etiquetas al modelo para facilitar su búsqueda |
| `--policy.license=mit` | Especifica la licencia de código abierto |

## Método 2: Subida manual una vez terminado el entrenamiento

Esta es la forma más habitual: durante el entrenamiento escribe como siempre `--policy.push_to_hub=false` y, cuando termine y confirmes que el resultado es satisfactorio, sube el modelo manualmente.

### 1. Iniciar sesión

Si ya has vinculado un Token puedes saltarte este paso; si no lo has hecho, consulta [Registrar una cuenta de Hugging Face (opcional)](/es/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account).

```Shell
hf auth login
hf auth whoami
```

### 2. Subir

Supongamos que el directorio de salida del entrenamiento de ACT es `~/output_lerobot_train/shake/act/`:

```Shell
export HF_USER=<usuario>

hf upload ${HF_USER}/shake_act_a \
  ~/output_lerobot_train/shake/act/checkpoints/last/pretrained_model
```

No hace falta crear el repositorio del modelo de antemano; si `hf upload` detecta que no existe, creará uno automáticamente.

### 3. Subir el checkpoint de un número de pasos concreto

Si solo quieres subir un checkpoint intermedio en lugar del último:

```Shell
CKPT=005000
hf upload ${HF_USER}/shake_act_a_${CKPT} \
  ~/output_lerobot_train/shake/act/checkpoints/${CKPT}/pretrained_model
```

### 4. Subir desde la página web

Si el modelo no es grande y no quieres escribir comandos, también puedes hacerlo directamente en la web de HuggingFace: crea un nuevo repositorio de tipo Model y arrastra a él los archivos del directorio `pretrained_model`.

## Cargar un modelo subido

Una vez subido el modelo, en el despliegue basta con apuntar `--policy.path` a él; no necesitas descargarlo antes a tu equipo:

```Shell
  --policy.path=<usuario>/shake_act_a \
```

Esto es más cómodo que apuntar a una ruta local: puedes cambiar de ordenador, o cualquier persona que conozca tu nombre de cuenta puede usarlo directamente. Ten en cuenta que, para obtener el modelo desde HuggingFace, es necesario poder conectarse a sus servidores; en entornos de red de China se recomienda configurar antes el espejo tal como se describe en [Registrar una cuenta de Hugging Face (opcional)](/es/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account).

Si has subido varios checkpoints y quieres indicar cuál usar, añade el número de versión:

```Shell
  --policy.pretrained_revision=005000 \
```

`005000` es el número de pasos del checkpoint que subiste.

## Notas

- El nombre del repositorio del modelo (`repo_id`) no tiene relación con `--output_dir` ni con `--job_name` del comando de entrenamiento; es independiente, así que basta con elegir un nombre fácil de reconocer
- Todos los comandos de entrenamiento del tutorial escriben `--policy.push_to_hub=false`; si quieres usar la subida automática, cambia esta línea a `true` y añade `--policy.repo_id`, y no puede faltar ninguna de las dos

<RelatedProducts slugs="so-arm101" />
