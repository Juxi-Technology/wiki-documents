---
title: "Etapa 7: Comando de treinamento — WALL-OSS"
description: "Treine a policy WALL-OSS (wall_x) no SO-ARM101: instalação do ambiente, comando lerobot-train completo com pesos pré-treinados e modelo de aproximadamente 7,2 GB."
---

# Etapa 7: Comando de treinamento — WALL-OSS

## Documentação de referência

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/walloss.mdx

## Instale o ambiente

```Shell
cd lerobot
pip install -e ".[feetech,wallx]"
```

## Linha de comando de treinamento

```Shell
python lerobot/src/lerobot/scripts/lerobot_train.py \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
    --dataset.root=~/lerobot_my_dataset_shake_hands \
    --policy.type=wall_x \
    --output_dir=~/output_lerobot_train/shake/wallx_A \
    --job_name=shake_wallx_a \
    --policy.pretrained_name_or_path=x-square-robot/wall-oss-flow \
    --policy.prediction_mode=diffusion \
    --policy.attn_implementation=eager \
    --policy.push_to_hub=false \
    --wandb.enable=true \
    --wandb.project=Lerobot_my_Project \
    --steps=30000 \
    --policy.device=cuda \
    --batch_size=8
```

O arquivo do modelo tem cerca de 7.2G

<RelatedProducts slugs="so-arm101" />
