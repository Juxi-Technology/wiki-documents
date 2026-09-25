---
title: "Comando de treino-smolvla (recomendado para avançados)"
description: "Linha de comando de treino com o modelo smolvla, com ajuste fino a partir de um modelo pré-treinado ou treino a partir do zero."
---

# Comando de treino\-smolvla (recomendado para avançados)

## Documentação de referência

https://huggingface\.co/docs/lerobot/smolvla

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy\_smolvla\_README\.md

## Instalar o ambiente

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## Ajuste fino com base num modelo pré-treinado (recomendado)

```Shell
lerobot-train \
  *--policy.path*=lerobot/smolvla_base \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## Treino do zero

```Shell
lerobot-train \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## Descarregar o modelo

O pacote comprimido do modelo smolvla tem cerca de 1 GB


