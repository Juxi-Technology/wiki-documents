---
title: "Enviar o modelo para o HuggingFace (opcional)"
description: "Envio do modelo treinado para o HuggingFace, com o método automático durante o treino e o envio manual depois de confirmar o resultado."
---

# Enviar o modelo para o HuggingFace (opcional)

## Criar um Repo de modelo

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/4.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/3.png)

## Ver o Repo do modelo

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

De momento está vazio

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

## Enviar o modelo

Crie o ficheiro `upload_model.py` com o seguinte conteúdo

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

Executar

```Shell
python upload_model.py
```

![be7686a3cbc9caffe00ffcba6b82b2e7\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/7686390068227.png)

## Ver o Repo do modelo

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/2.png)

Agora já tem os ficheiros do modelo


