---
title: "Etapa 6: Recolha por demonstração — Handshake 200"
description: "Exemplo completo de recolha: crie primeiro um repositório Dataset no Hugging Face e depois grave 200 episódios de aperto de mão com uma câmara através do lerobot-record, com os controlos de teclado e a pasta de gravação."
---

# Etapa 6: Recolha por demonstração — Handshake 200

## Criar um repositório de conjunto de dados no HuggingFace

https://huggingface.co/new-dataset

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-01.png)

## Eliminar qualquer conjunto de dados existente com o mesmo nome (se existir)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Recolha do conjunto de dados Shake200

Uma câmara, a recolher um conjunto de dados - computador Mac

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

## Durante a recolha

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-03.png)

Controlos das setas do teclado:
→ (seta para a direita) Termina o episódio atual antecipadamente; avança para o episódio seguinte.
← (seta para a esquerda) Cancela o episódio atual; volta a gravá-lo.
ESC, para imediatamente, codifica o vídeo e carrega o conjunto de dados.

## Recolha concluída — Diretório de gravação do conjunto de dados

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

<RelatedProducts slugs="so-arm101" />
