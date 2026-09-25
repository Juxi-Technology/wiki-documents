---
title: "Recopilación del conjunto de datos por enseñanza-Apretón de manos 200"
description: "Ejemplo práctico: cree un repositorio de conjuntos de datos en Hugging Face y grabe 200 episodes de apretón de manos con lerobot-record en el brazo de 7 ejes."
---

# Recopilación del conjunto de datos por enseñanza\-Apretón de manos 200

## Crear un Dataset Repo en HuggingFace

https://huggingface\.co/new\-dataset

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## Eliminar el conjunto de datos con el mismo nombre que ya existía antes (si lo hay)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Recopilación del conjunto de datos Shake200

Una cámara, recopilar el conjunto de datos\-Computadora Mac

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_shake200 \
    --dataset.num_episodes=200 \
    --dataset.single_task="Shanke Hands" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=12 \
    --dataset.reset_time_s=1
```

## Recopilando

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

Operación con las teclas de dirección del teclado:
→ (flecha derecha) termina anticipadamente el episode actual; pasa al siguiente episode.
← (flecha izquierda) cancela el episode actual; vuelve a grabarlo.
ESC, detiene inmediatamente, codifica el vídeo y sube el conjunto de datos.

## Recopilación finalizada: directorio donde se guarda el conjunto de datos

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```



