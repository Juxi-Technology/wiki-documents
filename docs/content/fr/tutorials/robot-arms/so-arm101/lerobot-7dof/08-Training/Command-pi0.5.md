---
title: "Commande d'entraînement - pi0.5"
description: "Lancez l'entraînement pi0.5 sur cloud GPU à partir du modèle de base, avec la commande complète et le nettoyage du répertoire de sortie."
---

# Commande d'entraînement \- pi0\.5

## Documentation de référence

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0\.mdx

https://www\.pi\.website/blog/pi05

## Instance cloud GPU recommandée

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## Installation de l'environnement

```Shell
cd lerobot
pip install -e ".[pi0]"
```

## Ligne de commande

- Supprimer les fichiers du répertoire output de l'entraînement précédent interrompu

```Shell
sudo rm -rf output_lerobot_train/shake/pi05_A
```

- Entraînement

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

L'entraînement ne commence réellement que 20 minutes après le lancement de la ligne de commande

L'archive du modèle fait environ 5 Go, et 7 Go une fois décompressée

