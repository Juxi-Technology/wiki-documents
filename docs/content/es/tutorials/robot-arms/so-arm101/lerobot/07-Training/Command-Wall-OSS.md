---
title: "Paso 7: Comando de entrenamiento WALL-OSS"
description: "Entrena la política WALL-OSS (wall_x) en el SO-ARM101: instalación del entorno, comando lerobot-train completo con pesos preentrenados y un modelo de ~7,2 GB."
---

# Paso 7: Comando de entrenamiento WALL-OSS

## Documentación de referencia

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/walloss.mdx

## Instala el entorno

```Shell
cd lerobot
pip install -e ".[feetech,wallx]"
```

## Línea de comandos de entrenamiento

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

El archivo del modelo ocupa unos 7.2G

<RelatedProducts slugs="so-arm101" />
