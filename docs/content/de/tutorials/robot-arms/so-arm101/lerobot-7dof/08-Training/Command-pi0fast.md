---
title: "Trainingsbefehl-pi0fast"
description: "Beschreibt den Trainingsbefehl für pi0fast mit schnellerer Inferenz: nötige Zusatzinstallation, Training direkt vom Hugging-Face-Hub und wichtige Parameter."
---

# Trainingsbefehl\-pi0fast

## Referenzdokumentation

https://huggingface\.co/docs/lerobot/pi0fast

## Issue

https://github\.com/huggingface/lerobot/pull/2203

## Empfohlene Cloud\-GPU\-Instanz

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## Umgebung installieren

```Shell
cd lerobot
pip install -e ".[pi0]"
pip install "lerobot[pi]@git+https://github.com/huggingface/lerobot.git"
```

## Befehl

- Dateien unter output löschen, die durch einen zuvor unterbrochenen Trainingslauf entstanden sind

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_fast_A
```

- Training

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





## Vorherige Inhalte

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









Etwa 10 Minuten nach dem Start beginnt das Training wirklich

Das Modellarchiv umfasst etwa 5G, nach dem Entpacken 7G



