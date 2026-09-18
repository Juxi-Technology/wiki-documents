---
title: "Paso 6: Recopilación de datos por enseñanza"
description: "Recopila el conjunto de datos por enseñanza en el brazo real: sustituciones de marcadores, uso de una o dos cámaras y control con las teclas de dirección."
---

# Paso 6: Recopilación de datos por enseñanza

## Los marcadores de posición en los comandos: sustitúyelos primero por tu propia información

El tutorial describe pasos de operación generales, por lo que a partir de este paso se usarán dos marcadores de posición en los comandos, que representan información que solo tú tienes. Sustitúyelos según las explicaciones siguientes y, al hacerlo, **elimina también los corchetes angulares**:

| Marcador de posición | Qué representa | Cómo sustituirlo |
|---|---|---|
| `<你的用户名>` | El nombre de usuario del sistema de tu computadora, es decir, el nombre del directorio personal | Escríbelo `whoami` en el terminal y podrás verlo |
| `<用户名>` | El nombre de tu cuenta de HuggingFace | Tras iniciar sesión en HuggingFace, mira el nombre de la cuenta junto al avatar en la esquina superior derecha |

Por ejemplo. Supongamos que la salida de `whoami` en el terminal es `zhangsan`, y tu nombre de cuenta de HuggingFace también es `zhangsan`; entonces

- `/Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/` debería escribirse como `/Users/zhangsan/.cache/huggingface/lerobot/zhangsan/`
- `<用户名>/lerobot_my_dataset_a` debería escribirse como `zhangsan/lerobot_my_dataset_a`

> Los dos marcadores de posición de todos los comandos siguientes también se sustituyen de la misma manera.

> **Atención**: el primer comando a continuación es `sudo rm -rf`, cuya función es eliminar un directorio. Asegúrate de que la ruta ya se ha sustituido por la tuya antes de pulsar Intro.

## Eliminar el conjunto de datos con el mismo nombre que ya existía antes (si lo hay)

```Shell
sudo rm -rf /Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a
```

## Una cámara, recopilar el conjunto de datos-Computadora Mac

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<用户名>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## Dos cámaras, recopilar el conjunto de datos-Computadora Mac

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<用户名>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## Recopilando

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/1.jpg)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/2.jpg)

Operación con las teclas de dirección del teclado:
→ (flecha derecha) termina anticipadamente el episode actual; pasa al siguiente episode.
← (flecha izquierda) cancela el episode actual; vuelve a grabarlo.
ESC, detiene inmediatamente, codifica el vídeo y sube el conjunto de datos.

## Recopilación finalizada: directorio donde se guarda el conjunto de datos

```Shell
/Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a
```

## Apretón de manos

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
    --dataset.num_episodes=30 \
    --dataset.single_task="Shanke Hands" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=12 \
    --dataset.reset_time_s=1
```

Una vez finalizada la recopilación, el conjunto de datos del apretón de manos se guardará en:

```Shell
/Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_shake_hands
```

## Acerca de los dos conjuntos de datos utilizados en el tutorial

Este artículo muestra dos tareas, cada una con un uso diferente:

- **Agarrar naranjas `lerobot_my_dataset_a`**: corresponde a los dos comandos de recopilación anteriores "una cámara" y "dos cámaras", y también es el ejemplo que se usa en el artículo [Entrenamiento local en Ubuntu](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu)
- **Apretón de manos `lerobot_my_dataset_shake_hands`**: corresponde al comando "apretón de manos" anterior. Desde el entrenamiento del séptimo paso hasta el despliegue del octavo paso, el tutorial lo usa de forma unificada como ejemplo, por lo que verás que `--dataset.repo_id` y `--dataset.root` en los comandos de entrenamiento apuntan a él

Es decir, **el conjunto de datos del apretón de manos es el ejemplo principal de la segunda mitad del tutorial**; recopílalo según él. En cuanto a parámetros como `--dataset.num_episodes=30` y `--dataset.episode_time_s=12` en los comandos, ajústalos según tu propia tarea.

## Algunos puntos a tener en cuenta durante la recopilación

- El brazo líder no debe aparecer en la imagen, de lo contrario el modelo aprenderá también el brazo líder como una característica; consulta [Notas sobre la recopilación del conjunto de datos](/es/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes)
- Tras cada ronda de recopilación, devuelve el objeto a su punto de partida y mantén las acciones lo más consistentes posible; la consistencia del conjunto de datos es más importante que la cantidad
- **Los parámetros de la cámara (resolución, fps, relación de aspecto) durante la recopilación y la inferencia deben ser exactamente iguales**. La resolución se escribirá en los metadatos del conjunto de datos y se verificará durante el entrenamiento y la inferencia; si no coinciden, se producirá un error directamente. Incluso sin error, una resolución diferente también implica un campo de visión (rango de encuadre) diferente, y el mundo que ve el modelo no coincidirá con el de tu enseñanza. Este tutorial utiliza de forma unificada `1280×720@30`; si quieres cambiarlo por otro valor, debes modificar juntos los tres comandos: recopilación, teleoperación y despliegue
- Al salir a mitad de camino, no te detengas en la fase reset, de lo contrario esta ronda fallará al guardarse por no tener ningún fotograma (no afecta a los datos ya recopilados)
- Si sales a mitad de camino y quieres seguir recopilando, usa `--resume=true`, y `--dataset.root` y `--dataset.repo_id` deben ser exactamente iguales que la primera vez

## Una vez finalizada la recopilación

Los datos se guardan por defecto en `~/.cache/huggingface/lerobot/<用户名>/`. A continuación:

1. Si quieres hacer una copia de seguridad del conjunto de datos en la nube, consulta [Subir el conjunto de datos a HuggingFace (opcional)](/es/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload)
2. Si estás listo para empezar a entrenar, continúa con [Paso 7: Entrenar el modelo](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU); ese artículo primero te guiará para subir los datos en la plataforma de GPU en la nube y dejar listo el entorno

<RelatedProducts slugs="so-arm101" />
