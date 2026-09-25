---
title: "Enviar o conjunto de dados para o HuggingFace (opcional)"
description: "Envie o conjunto de dados coletado para o Hugging Face: compare o envio local, mais lento, com o envio pela plataforma de GPU na nuvem e confira o resultado."
---

# Enviar o conjunto de dados para o HuggingFace (opcional)

# Método 1: envio local (não recomendado, velocidade de upload lenta)

- Envio automático

Ao coletar o conjunto de dados, defina `push_to_hub=true`; após a coleta, o envio é feito automaticamente

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

- Envio manual

Ao coletar o conjunto de dados, defina `push_to_hub=false`; após a coleta, faça o envio manualmente

```Shell
hf upload Tommymy/lerobot_my_dataset_a /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_a / --repo-type=dataset
```



Tanto no envio automático quanto no manual, a velocidade de upload é muito lenta (cem KB por segundo)

Porque o servidor do HuggingFace está no exterior

# Método 2: envio pela plataforma de GPU na nuvem (recomendado)

## Fazer login na plataforma de GPU na nuvem Featurize

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

Diga ao atendimento que você é fã do Zihao Xiong, da Tongji, para receber um cupom de crédito

## Iniciar uma instância de GPU na nuvem

## Enviar o pacote compactado do conjunto de dados para `Conjuntos de dados`

## Copiar o comando de download da instância

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

## Executar na linha de comando da instância de GPU na nuvem

```Shell
pip install httpx

unzip lerobot_my_dataset_a.zip

hf auth login
```

## Enviar o conjunto de dados para o HuggingFace

Crie um arquivo `upload_dataset.py` com o seguinte conteúdo

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

Executar o arquivo

```Shell
python upload_dataset.py
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/3.png)

- Outro método de envio (não recomendado)

```Shell
hf upload Tommymy/lerobot_my_dataset_a lerobot_my_dataset_a / --repo-type=dataset
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/4.png)

# Ver o conjunto de dados no HuggingFace

https://huggingface\.co/datasets/Tommymy/lerobot\_my\_dataset\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



