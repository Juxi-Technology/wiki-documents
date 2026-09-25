---
title: "Comando de treino-pi0fast"
description: "Linha de comando de treino com o modelo pi0fast, que privilegia a velocidade da inferência, com notas sobre o conjunto de dados."
---

# Comando de treino\-pi0fast

## Documentação de referência

https://huggingface\.co/docs/lerobot/pi0fast

## Issue

https://github\.com/huggingface/lerobot/pull/2203

## Instância de GPU na nuvem recomendada

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## Instalar o ambiente

```Shell
cd lerobot
pip install -e ".[pi0]"
pip install "lerobot[pi]@git+https://github.com/huggingface/lerobot.git"
```

## Linha de comando

- Eliminar os ficheiros da pasta de saída de um treino interrompido anteriormente

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_fast_A
```

- Treinar

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





## Conteúdo anterior

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









Cerca de 10 minutos depois da execução, o treino só então começa efetivamente

O pacote comprimido do modelo tem cerca de 5 GB, e 7 GB depois de descomprimido


