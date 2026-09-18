---
title: "Étape 6 : Téléverser le jeu de données (facultatif)"
description: "Téléversez votre jeu de données sur HuggingFace : téléversement local automatique ou manuel selon la vitesse, ou méthode rapide via la plateforme cloud."
---

# Étape 6 : Téléverser le jeu de données (facultatif)

## Méthode 1 : téléversement local (non recommandé, débit de téléversement lent)

- Téléversement automatique

Lors de la collecte du jeu de données, définissez `push_to_hub=true` pour téléverser automatiquement une fois la collecte terminée

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/1.jpg)

- Téléversement manuel

Lors de la collecte du jeu de données, définissez `push_to_hub=false` pour téléverser manuellement une fois la collecte terminée

```Shell
hf upload <用户名>/lerobot_my_dataset_a /Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a / --repo-type=dataset
```

Que ce soit en téléversement automatique ou manuel, le débit est très lent (cent Ko par seconde)

Car les serveurs HuggingFace sont à l'étranger

## Méthode 2 : téléversement via la plateforme de GPU cloud (recommandé)

### Se connecter à la plateforme de GPU cloud Featurize

https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1

### Lancer une instance de GPU cloud

### Téléverser l'archive du jeu de données dans `数据集`

### Copier la commande de téléchargement de l'instance

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/2.jpg)

### Exécuter dans la ligne de commande de l'instance de GPU cloud

```Shell
pip install httpx

unzip your_datasets.zip

hf auth login
```

### Téléverser le jeu de données sur HuggingFace

Créez le fichier `upload_dataset.py` avec le contenu suivant

```Python
from huggingface_hub import HfApi

api = HfApi()

api.upload_folder(
    folder_path="~/lerobot_my_dataset_a",
    repo_id="<用户名>/lerobot_my_dataset_a",
    repo_type="dataset"
)

api.create_tag("<用户名>/lerobot_my_dataset_a", tag="v0.4.0", repo_type="dataset")
```

Exécuter le fichier

```Shell
python upload_dataset.py
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/3.png)

- Autre méthode de téléversement (non recommandée)

```Shell
hf upload <用户名>/lerobot_my_dataset_a lerobot_my_dataset_a / --repo-type=dataset
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/4.png)

## Consulter le jeu de données sur HuggingFace

https://huggingface.co/datasets/Juxi-Technology/soarm_amazing_hand_pick

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/5.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/6.png)

<RelatedProducts slugs="so-arm101" />
