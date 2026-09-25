---
title: "Téléverser le modèle sur HuggingFace (facultatif)"
description: "Téléversez le modèle entraîné sur HuggingFace, automatiquement pendant l'entraînement ou manuellement après, avec gestion des checkpoints intermédiaires."
---

# Téléverser le modèle sur HuggingFace (facultatif)

## Créer un Model Repo

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/4.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/3.png)

## Consulter le Model Repo

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

Il est vide pour l'instant

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

## Téléverser le modèle

Créez le fichier `upload_model.py` avec le contenu suivant

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

Exécuter

```Shell
python upload_model.py
```

![be7686a3cbc9caffe00ffcba6b82b2e7\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/7686390068227.png)

## Consulter le Model Repo

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/2.png)

Le modèle est maintenant présent



