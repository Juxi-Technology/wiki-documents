---
title: "Línea de comandos de entrenamiento-pi0fast"
description: "Comando de entrenamiento con el algoritmo pi0fast, de inferencia más rápida, con la instalación del entorno y los parámetros principales del entrenamiento."
---

# Línea de comandos de entrenamiento\-pi0fast

## Documentación de referencia

https://huggingface\.co/docs/lerobot/pi0fast

## Issue

https://github\.com/huggingface/lerobot/pull/2203

## Instancia de GPU en la nube recomendada

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## Instalar el entorno

```Shell
cd lerobot
pip install -e ".[pi0]"
pip install "lerobot[pi]@git+https://github.com/huggingface/lerobot.git"
```

## Línea de comandos

- Eliminar los archivos que hay bajo output de un entrenamiento anterior interrumpido

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_fast_A
```

- Entrenar

```Shell
lerobot-train \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
    --dataset.revision=v0.1.0 \
    --policy.type=pi0_fast \
    --output_dir=output_lerobot_train/shake/pi0_fast_A \
    --job_name=shake_pi0_fast_A \
    --policy.pretrained_path=lerobot/pi0_fast_base \
    --policy.dtype=bfloat16 \
    --policy.gradient_checkpointing=true \
    --policy.chunk_size=10 \
    --policy.n_action_steps=10 \
    --policy.max_action_tokens=256 \
    --steps=50000 \
    --batch_size=8 \
    --policy.device=cuda \
    --policy.push_to_hub=false \
    --wandb.enable=true \
    --wandb.project=Lerobot_my_Project
```





## Contenido anterior

```Shell
lerobot-train \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0_fast \
  --output_dir=output_lerobot_train/shake/pi0_fast_A \
  --job_name=shake_pi0_fast_A \
  --policy.pretrained_path=lerobot/pi0_fast_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --policy.freeze_vision_encoder=false \
  --policy.train_expert_only=false \
  --steps=50000 \
  --policy.device=cuda \
  --policy.push_to_hub=false \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --batch_size=8
```









El entrenamiento no empieza de verdad hasta unos 10 minutos después de ejecutarlo

El paquete comprimido del modelo ocupa unos 5 GB y, una vez descomprimido, 7 GB



