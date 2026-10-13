---
title: "Etapa 6: Coleta por demonstração — Handshake 200"
description: "Exemplo completo de coleta: crie primeiro um repositório Dataset no Hugging Face e depois grave 200 episódios de aperto de mão com uma câmera usando o lerobot-record, com os controles de teclado e o diretório de salvamento."
---

# Etapa 6: Coleta por demonstração — Handshake 200

## Criar um Repositório de Dataset no HuggingFace

https://huggingface.co/new-dataset

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-01.png)

## Excluir Qualquer Conjunto de Dados Existente com o Mesmo Nome (Se Houver)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Coleta do Conjunto de Dados Shake200

Uma câmera, coletando um conjunto de dados - computador Mac

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

## Durante a Coleta

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-03.png)

Controles pelas teclas de seta do teclado:
→ (Seta para a direita) Encerra o episódio atual antecipadamente; passa para o próximo episódio.
← (Seta para a esquerda) Cancela o episódio atual; grava-o novamente.
ESC, para imediatamente, codifica o vídeo e envia o conjunto de dados.

## Coleta Concluída — Diretório de Salvamento do Conjunto de Dados

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

<RelatedProducts slugs="so-arm101" />
