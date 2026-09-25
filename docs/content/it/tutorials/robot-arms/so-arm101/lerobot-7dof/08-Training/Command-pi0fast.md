---
title: "Comando di addestramento-pi0fast"
description: "Comando di addestramento pi0fast con inferenza rapida: installazione dei pacchetti, parametri con chunk e token di azione e avvio su GPU cloud."
---

# Comando di addestramento\-pi0fast

## Documentazione di riferimento

https://huggingface\.co/docs/lerobot/pi0fast

## Issue

https://github\.com/huggingface/lerobot/pull/2203

## Istanza GPU cloud consigliata

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## Installazione dell'ambiente

```Shell
cd lerobot
pip install -e ".[pi0]"
pip install "lerobot[pi]@git+https://github.com/huggingface/lerobot.git"
```

## Comandi

- Eliminare i file presenti nella directory output di un addestramento precedente interrotto

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_fast_A
```

- Addestramento

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





## Contenuti precedenti

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









Dopo l'esecuzione, l'addestramento inizia davvero solo dopo circa 10 minuti

L'archivio del modello è di circa 5 GB, che diventano 7 GB una volta decompresso



