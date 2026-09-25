---
title: "Trainingsbefehl-pi0.5"
description: "Beschreibt den Trainingsbefehl für die verbesserte pi0-Version: eigene Umgebungsinstallation, vortrainiertes Basismodell und der Befehl zum Feintuning."
---

# Trainingsbefehl\-pi0\.5

## Referenzdokumentation

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0\.mdx

https://www\.pi\.website/blog/pi05

## Empfohlene Cloud\-GPU\-Instanz

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## Umgebung installieren

```Shell
cd lerobot
pip install -e ".[pi0]"
```

## Befehl

- Dateien unter output löschen, die durch einen zuvor unterbrochenen Trainingslauf entstanden sind

```Shell
sudo rm -rf output_lerobot_train/shake/pi05_A
```

- Training

```Shell
lerobot-train \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
    --dataset.root=~/lerobot_my_dataset_shake_hands \
    --dataset.revision=v0.1.0 \
    --policy.type=pi05 \
    --output_dir=~/output_lerobot_train/shake/pi05_A \
    --job_name=shake_pi05_A \
    --policy.pretrained_path=lerobot/pi05_base \
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

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/3.png)

Nach dem Ausführen des Befehls startet das Training erst nach 20 Minuten wirklich

Das Modellarchiv umfasst etwa 5G, nach dem Entpacken 7G

