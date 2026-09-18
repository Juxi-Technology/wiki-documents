---
title: "Passo 6: Caricare il dataset su HuggingFace (opzionale)"
description: "Due metodi per caricare il dataset su HuggingFace: caricamento locale lento oppure tramite piattaforma GPU cloud, con script dedicato alla pubblicazione."
---

# Passo 6: Caricare il dataset su HuggingFace (opzionale)

## Metodo 1: caricamento locale (non consigliato, velocità di caricamento bassa)

- Caricamento automatico

Durante la raccolta del dataset imposta `push_to_hub=true`; al termine della raccolta il caricamento avverrà automaticamente

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/1.jpg)

- Caricamento manuale

Durante la raccolta del dataset imposta `push_to_hub=false`; al termine della raccolta carica manualmente

```Shell
hf upload <nome-utente>/lerobot_my_dataset_a /Users/<nome-utente>/.cache/huggingface/lerobot/<nome-utente>/lerobot_my_dataset_a / --repo-type=dataset
```

Sia con il caricamento automatico sia con quello manuale, la velocità di caricamento è molto bassa (cento KB al secondo)

Perché i server di HuggingFace si trovano all'estero

## Metodo 2: caricamento tramite piattaforma GPU cloud (consigliato)

### Accedere alla piattaforma GPU cloud Featurize

https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1

### Avviare un'istanza GPU cloud

### Caricare l'archivio compresso del dataset in `dataset`

### Copiare il comando di download dell'istanza

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/2.jpg)

### Eseguire dalla riga di comando dell'istanza GPU cloud

```Shell
pip install httpx

unzip your_datasets.zip

hf auth login
```

### Caricare il dataset su HuggingFace

Crea il file `upload_dataset.py` con il seguente contenuto

```Python
from huggingface_hub import HfApi

api = HfApi()

api.upload_folder(
    folder_path="~/lerobot_my_dataset_a",
    repo_id="<nome-utente>/lerobot_my_dataset_a",
    repo_type="dataset"
)

api.create_tag("<nome-utente>/lerobot_my_dataset_a", tag="v0.4.0", repo_type="dataset")
```

Eseguire il file

```Shell
python upload_dataset.py
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/3.png)

- Un altro metodo di caricamento (non consigliato)

```Shell
hf upload <nome-utente>/lerobot_my_dataset_a lerobot_my_dataset_a / --repo-type=dataset
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/4.png)

## Visualizzare il dataset su HuggingFace

https://huggingface.co/datasets/Juxi-Technology/soarm_amazing_hand_pick

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/5.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/6.png)

<RelatedProducts slugs="so-arm101" />
