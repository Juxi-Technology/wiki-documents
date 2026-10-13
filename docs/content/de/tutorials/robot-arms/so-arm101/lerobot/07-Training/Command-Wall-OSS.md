---
title: "Schritt 7: Trainingsbefehl für WALL-OSS"
description: "Die WALL-OSS-Policy (wall_x) auf dem SO-ARM101 trainieren: Umgebungsinstallation, vollständiger lerobot-train-Befehl mit vortrainierten Gewichten und das ca. 7,2 GB große Modell."
---

# Schritt 7: Trainingsbefehl für WALL-OSS

## Referenzdokumentation

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/walloss.mdx

## Umgebung installieren

```Shell
cd lerobot
pip install -e ".[feetech,wallx]"
```

## Trainings-Kommandozeile

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

Das Modellarchiv ist etwa 7,2G groß

<RelatedProducts slugs="so-arm101" />
