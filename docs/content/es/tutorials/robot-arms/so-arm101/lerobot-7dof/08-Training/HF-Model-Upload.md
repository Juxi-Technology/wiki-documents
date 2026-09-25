---
title: "Subir el modelo a HuggingFace (opcional)"
description: "Sube el modelo entrenado a HuggingFace, de forma automática durante el entrenamiento o manual al terminar, para respaldarlo o usarlo en otra máquina."
---

# Subir el modelo a HuggingFace (opcional)

## Crear un Model Repo

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/4.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/3.png)

## Ver el Model Repo

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

Ahora está vacío

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

## Subir el modelo

Crea el archivo `upload_model.py` con el siguiente contenido

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

Ejecutar

```Shell
python upload_model.py
```

![be7686a3cbc9caffe00ffcba6b82b2e7\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/7686390068227.png)

## Ver el Model Repo

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/2.png)

Ahora ya tiene el archivo del modelo



