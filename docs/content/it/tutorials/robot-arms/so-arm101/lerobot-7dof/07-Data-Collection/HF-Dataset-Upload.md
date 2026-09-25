---
title: "Caricare il dataset su HuggingFace (opzionale)"
description: "Due metodi per caricare il dataset su HuggingFace: caricamento locale lento oppure tramite piattaforma GPU cloud, con script dedicato alla pubblicazione."
---

# Caricare il dataset su HuggingFace (opzionale)

# Metodo 1: caricamento locale (non consigliato, velocità di caricamento bassa)

- Caricamento automatico

Durante la raccolta del dataset imposta `push_to_hub=true`; al termine della raccolta il caricamento avverrà automaticamente

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

- Caricamento manuale

Durante la raccolta del dataset imposta `push_to_hub=false`; al termine della raccolta carica manualmente

```Shell
hf upload Tommymy/lerobot_my_dataset_a /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_a / --repo-type=dataset
```



Sia con il caricamento automatico sia con quello manuale, la velocità di caricamento è molto bassa (cento KB al secondo)

Perché i server di HuggingFace si trovano all'estero

# Metodo 2: caricamento tramite piattaforma GPU cloud (consigliato)

## Accedere alla piattaforma GPU cloud Featurize

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

Di' al servizio clienti di essere un fan di Tongji Zihao Xiong per ricevere un buono sconto

## Avviare un'istanza GPU cloud

## Caricare l'archivio compresso del dataset in `dataset`

## Copiare il comando di download dell'istanza

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

## Eseguire dalla riga di comando dell'istanza GPU cloud

```Shell
pip install httpx

unzip lerobot_my_dataset_a.zip

hf auth login
```

## Caricare il dataset su HuggingFace

Crea il file `upload_dataset.py` con il seguente contenuto

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

Eseguire il file

```Shell
python upload_dataset.py
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/3.png)

- Un altro metodo di caricamento (non consigliato)

```Shell
hf upload Tommymy/lerobot_my_dataset_a lerobot_my_dataset_a / --repo-type=dataset
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/4.png)

# Visualizzare il dataset su HuggingFace

https://huggingface\.co/datasets/Tommymy/lerobot\_my\_dataset\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



