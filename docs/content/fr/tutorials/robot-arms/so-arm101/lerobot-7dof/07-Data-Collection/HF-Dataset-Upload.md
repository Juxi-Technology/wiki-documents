---
title: "Téléverser le dataset sur HuggingFace (facultatif)"
description: "Téléversez votre jeu de données sur HuggingFace : téléversement local automatique ou manuel selon la vitesse, ou méthode rapide via la plateforme cloud."
---

# Téléverser le dataset sur HuggingFace (facultatif)

# Méthode 1 : téléversement local (non recommandé, débit de téléversement lent)

- Téléversement automatique

Lors de la collecte du dataset, définissez `push_to_hub=true` pour téléverser automatiquement une fois la collecte terminée

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

- Téléversement manuel

Lors de la collecte du dataset, définissez `push_to_hub=false` pour téléverser manuellement une fois la collecte terminée

```Shell
hf upload Tommymy/lerobot_my_dataset_a /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_a / --repo-type=dataset
```



Que ce soit en téléversement automatique ou manuel, le débit est très lent (cent Ko par seconde)

Car les serveurs HuggingFace sont à l'étranger

# Méthode 2 : téléversement via la plateforme de GPU cloud (recommandé)

## Se connecter à la plateforme de GPU cloud Featurize

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

Dites au service client que vous êtes fan de Tongji Zihao pour recevoir un bon d'achat

## Lancer une instance de GPU cloud

## Téléverser l'archive du dataset dans `Jeux de données`

## Copier la commande de téléchargement de l'instance

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

## Exécuter dans la ligne de commande de l'instance de GPU cloud

```Shell
pip install httpx

unzip lerobot_my_dataset_a.zip

hf auth login
```

## Téléverser le dataset sur HuggingFace

Créez le fichier `upload_dataset.py` avec le contenu suivant

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

Exécuter le fichier

```Shell
python upload_dataset.py
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/3.png)

- Autre méthode de téléversement (non recommandée)

```Shell
hf upload Tommymy/lerobot_my_dataset_a lerobot_my_dataset_a / --repo-type=dataset
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/4.png)

# Consulter le dataset sur HuggingFace

https://huggingface\.co/datasets/Tommymy/lerobot\_my\_dataset\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



