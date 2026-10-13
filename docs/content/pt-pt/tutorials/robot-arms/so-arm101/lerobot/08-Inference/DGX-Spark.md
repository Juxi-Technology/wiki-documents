---
title: "Etapa 8: Inferência NVIDIA DGX Spark"
description: "Inferência no NVIDIA DGX Spark: instale o PyTorch cu130 e ajuste as dependências, limpe os conjuntos de dados rollout antigos e use os exemplos de comando de ACT, SmolVLA e pi0."
---

# Etapa 8: Inferência NVIDIA DGX Spark

## Instalar o Ambiente

- PyTorch

Instale o PyTorch separadamente a partir do sítio oficial, usando a versão CUDA 13.0

```Shell
pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu130
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-DGX-Spark/d66-01.png)

- Em seguida, comente o torch isoladamente no ficheiro pyproject.toml

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-DGX-Spark/d66-02.png)

Depois execute pip install -e .

- Nota: na linha de comandos de inferência, altere o caminho policy.path para o caminho real do modelo dentro do Spark

## Eliminar o conjunto de dados existente com o prefixo eval (se existir)

```Shell
sudo chmod 666 /dev/ttyACM*
```

```Shell
sudo rm -rf /home/apx103/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

## ACT

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --policy.path=/home/apx103/Downloads/lerobot_output/shake/ACT/5K/pretrained_model
```

## SmolVLA

- Instalar o Ambiente

```Shell
conda activate base
conda create -y -n lerobot-smolvla python=3.10 -y
conda activate lerobot-smolvla
conda install ffmpeg=7.1.1 -c conda-forge -y

pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu130

cd lerobot
pip install -e ".[feetech,smolvla]"
```

- Inferência

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --policy.path=/home/apx103/Downloads/lerobot_output/shake/smolvla/40K/pretrained_model
```

## WALL-OSS

- Instalar o Ambiente

```Shell
cd lerobot
pip install -e ".[feetech,wallx]"
```

- Adicionar o código

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-DGX-Spark/d66-03.png)

```Shell
lerobot-record  \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --policy.path=/home/apx103/Downloads/lerobot_output/shake/wallx/30K/pretrained_model \
  --dataset.push_to_hub=false \
  --robot.type=so101_follower \
  --robot.id=my_follower_arm \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --display_data=false \
  --dataset.episode_time_s=1000
```

## pi0

- Instalar o Ambiente

```Shell
conda create -y -n lerobot-pi python=3.10 -y
conda activate lerobot-pi
conda install ffmpeg=7.1.1 -c conda-forge -y

cd lerobot
pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu130
pip install -e ".[feetech,pi]"
```

- Inferência

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --dataset.push_to_hub=false \
  --policy.path=/home/apx103/Downloads/lerobot_output/shake/pi0/50K/pretrained_model
```

<RelatedProducts slugs="so-arm101" />
