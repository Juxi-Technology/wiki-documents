---
title: "Comando di addestramento-pi0 (risultati migliori)"
description: "Comando di addestramento pi0 su GPU cloud: macchina consigliata, installazione delle dipendenze, parametri principali e avvio su un dataset di esempio."
---

# Comando di addestramento\-pi0 (risultati migliori)

## Documentazione di riferimento

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0\.mdx

## Istanza GPU cloud consigliata

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## Installazione dell'ambiente

```Shell
conda create -y -n lerobot-pi python=3.10 -y
conda activate lerobot-pi
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y

cd lerobot
pip install -e ".[pi]"
```

## Comandi

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

L'addestramento inizia davvero solo dopo 20 minuti dall'esecuzione del comando

L'archivio del modello è di circa 5 GB, che diventano 7 GB una volta decompresso



