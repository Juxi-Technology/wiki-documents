---
title: "Enviar o modelo para o HuggingFace (opcional)"
description: "Envie o modelo treinado para o Hugging Face, de forma automática durante o treinamento ou manual depois da conclusão, e veja como carregá-lo na inferência."
---

# Enviar o modelo para o HuggingFace (opcional)

## Criar um Repo de modelo

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/4.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/3.png)

## Ver o Repo do modelo

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

Agora está vazio

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

## Enviar o modelo

Crie um arquivo `upload_model.py` com o seguinte conteúdo

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

Agora há arquivos de modelo



