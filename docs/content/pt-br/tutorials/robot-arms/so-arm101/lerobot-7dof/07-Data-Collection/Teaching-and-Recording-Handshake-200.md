---
title: "Coleta de dados por demonstração-Aperto de mão 200"
description: "Exemplo prático: crie um repositório de dataset no Hugging Face e grave 200 episódios de aperto de mão no braço de 7 eixos com o lerobot-record."
---

# Coleta de dados por demonstração\-Aperto de mão 200

## Criar um Dataset Repo no HuggingFace

https://huggingface\.co/new\-dataset

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## Excluir o conjunto de dados com o mesmo nome já existente (se houver)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Coleta do conjunto de dados Shake200

Uma câmera, coletar o conjunto de dados\-Computador Mac

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

## Coletando

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

Operações com as teclas de seta do teclado:
→ (seta para a direita) encerra antecipadamente o episode atual; avança para o próximo episode.
← (seta para a esquerda) cancela o episode atual; grava novamente.
ESC, para imediatamente, codifica o vídeo e envia o conjunto de dados.

## Coleta concluída, diretório de salvamento do conjunto de dados

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```



