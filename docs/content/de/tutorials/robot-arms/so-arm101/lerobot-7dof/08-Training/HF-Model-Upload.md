---
title: "Modell zu HuggingFace hochladen (optional)"
description: "Beschreibt beide Wege, ein trainiertes Modell zu Hugging Face hochzuladen: automatisch während des Trainings oder manuell danach, samt einzelner Checkpoints."
---

# Modell zu HuggingFace hochladen (optional)

## Modell\-Repo erstellen

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/4.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/3.png)

## Modell\-Repo ansehen

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

Derzeit noch leer

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

## Modell hochladen

Erstellen Sie die Datei `upload_model.py` mit folgendem Inhalt

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

Ausführen

```Shell
python upload_model.py
```

![be7686a3cbc9caffe00ffcba6b82b2e7\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/7686390068227.png)

## Modell\-Repo ansehen

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/2.png)

Jetzt sind Modelldateien vorhanden



