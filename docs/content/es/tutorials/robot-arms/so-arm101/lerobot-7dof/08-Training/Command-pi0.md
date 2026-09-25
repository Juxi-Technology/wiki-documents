---
title: "Línea de comandos de entrenamiento-pi0 (el de mejores resultados)"
description: "Comando de entrenamiento con el algoritmo pi0, el de mejor resultado y mayor consumo de memoria, con la instalación del entorno y los parámetros principales."
---

# Línea de comandos de entrenamiento\-pi0 (el de mejores resultados)

## Documentación de referencia

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0\.mdx

## Instancia de GPU en la nube recomendada

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## Instalar el entorno

```Shell
conda create -y -n lerobot-pi python=3.10 -y
conda activate lerobot-pi
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y

cd lerobot
pip install -e ".[pi]"
```

## Línea de comandos

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_A

lerobot-train \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0 \
  --output_dir=~/output_lerobot_train/shake/pi0_A \
  --job_name=shake_pi0_A \
  --policy.pretrained_path=lerobot/pi0_base \
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

El entrenamiento no empieza de verdad hasta 20 minutos después de ejecutar la línea de comandos

El paquete comprimido del modelo ocupa unos 5 GB y, una vez descomprimido, 7 GB



