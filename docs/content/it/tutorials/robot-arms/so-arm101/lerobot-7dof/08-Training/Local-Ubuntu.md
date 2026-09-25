---
title: "Addestramento su Ubuntu locale"
description: "Addestramento di un modello LeRobot su Ubuntu locale con scheda NVIDIA: dataset di esempio, parametri del comando e indicazioni sui percorsi di output."
---

# Addestramento su Ubuntu locale

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot\_train\.py

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

- Nota

Prima di `\` può esserci un solo spazio, dopo non deve esserci alcuno spazio

`--dataset.split` ha come valore predefinito `train`, cioè si usa l'intero dataset come set di addestramento

Il dataset è in locale, `--dataset.streaming` deve essere `false`, poiché il dataset è già in locale e non è necessaria la lettura in streaming

```Shell
lerobot-train \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
  --dataset.root=/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_a \
  --dataset.revision=v0.4.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=output_lerobot_train/a \
  --job_name=orange_job \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=300000 \
  --batch_size=8
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)



