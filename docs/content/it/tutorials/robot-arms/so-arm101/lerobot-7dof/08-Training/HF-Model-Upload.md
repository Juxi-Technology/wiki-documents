---
title: "Caricare il modello su HuggingFace (opzionale)"
description: "Caricare il modello addestrato su HuggingFace: modalità automatica o manuale, checkpoint intermedi, parametri opzionali e uso diretto senza download."
---

# Caricare il modello su HuggingFace (opzionale)

## Creare un Model Repo

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/4.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/3.png)

## Visualizzare il Model Repo

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

Al momento è vuoto

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

## Caricare il modello

Crea il file `upload_model.py` con il seguente contenuto

```Python
from huggingface_hub import HfApi

api = HfApi()

repo_id = "TommyZihao/lerobot_zihao_model_shake_hands"

api.upload_folder(
    folder_path="~/output_lerobot_train/b/checkpoints/last/pretrained_model",
    repo_id=repo_id,
    repo_type="model"
)

api.create_tag(repo_id, tag="v0.1.0", repo_type="model")
```

Esegui

```Shell
python upload_model.py
```

![be7686a3cbc9caffe00ffcba6b82b2e7\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/7686390068227.png)

## Visualizzare il Model Repo

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/2.png)

Ora il file del modello è presente



