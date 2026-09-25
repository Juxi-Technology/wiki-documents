---
title: "Carregar dados para o HuggingFace (opcional)"
description: "Dois métodos para carregar o conjunto de dados para o HuggingFace, começando pela plataforma de GPU na nuvem recomendada no tutorial."
---

# Carregar dados para o HuggingFace (opcional)

# Método 1: carregamento local (não recomendado, velocidade de carregamento lenta)

- Carregamento automático

Ao recolher o conjunto de dados, defina `push_to_hub=true`; após a recolha, o carregamento é automático

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

- Carregamento manual

Ao recolher o conjunto de dados, defina `push_to_hub=false`; após a recolha, o carregamento é manual

```Shell
hf upload Tommymy/lerobot_my_dataset_a /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_a / --repo-type=dataset
```



Quer seja carregamento automático ou manual, a velocidade de carregamento é muito lenta (cem KB por segundo)

Porque o servidor do HuggingFace está no estrangeiro

# Método 2: carregamento através da plataforma de GPU na nuvem (recomendado)

## Iniciar sessão na plataforma de GPU na nuvem Featurize

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

Diga ao apoio ao cliente que é fã de Tongji Zihao e receba um vale de desconto

## Abrir uma instância de GPU na nuvem

## Carregar o pacote comprimido do conjunto de dados para `Conjuntos de dados`

## Copiar o comando de descarregamento da instância

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

## Executar na linha de comandos da instância de GPU na nuvem

```Shell
pip install httpx

unzip lerobot_my_dataset_a.zip

hf auth login
```

## Carregar o conjunto de dados para o HuggingFace

Crie o ficheiro `upload_dataset.py` com o seguinte conteúdo

```Python
from huggingface_hub import HfApi

api = HfApi()

api.upload_folder(
    folder_path="~/lerobot_my_dataset_a",
    repo_id="Tommymy/lerobot_my_dataset_a",
    repo_type="dataset"
)

api.create_tag("Tommymy/lerobot_my_dataset_a", tag="v0.4.0", repo_type="dataset")
```

Executar o ficheiro

```Shell
python upload_dataset.py
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/3.png)

- Outro método de carregamento (não recomendado)

```Shell
hf upload Tommymy/lerobot_my_dataset_a lerobot_my_dataset_a / --repo-type=dataset
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/4.png)

# Ver o conjunto de dados no HuggingFace

https://huggingface\.co/datasets/Tommymy/lerobot\_my\_dataset\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)


