---
title: "Comando de treinamento-smolvla (recomendado para avançar)"
description: "Comando de treinamento do algoritmo SmolVLA: escolha entre o ajuste fino a partir de um modelo pré-treinado e o treinamento do zero, e veja o tamanho do pacote."
---

# Comando de treinamento\-smolvla (recomendado para avançar)

## Documentação de referência

https://huggingface\.co/docs/lerobot/smolvla

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy\_smolvla\_README\.md

## Instalar o ambiente

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## Ajuste fino a partir de um modelo pré-treinado (recomendado)

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

## Treinamento do zero

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

## Baixar o modelo

O pacote compactado do modelo smolvla tem cerca de 1 GB



