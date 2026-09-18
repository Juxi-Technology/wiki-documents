---
title: "Schritt 6: Datensatz auf HuggingFace hochladen (optional)"
description: "Vergleicht den langsamen lokalen Upload eines Datensatzes zu Hugging Face mit dem empfohlenen Weg über die Cloud-GPU-Plattform Featurize samt Skript."
---

# Schritt 6: Datensatz auf HuggingFace hochladen (optional)

## Methode 1：Lokaler Upload (nicht empfohlen, Upload-Geschwindigkeit ist langsam)

- Automatischer Upload

Beim Erfassen des Datensatzes `push_to_hub=true` setzen, nach Abschluss der Erfassung erfolgt der Upload automatisch

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/1.jpg)

- Manueller Upload

Beim Erfassen des Datensatzes `push_to_hub=false` setzen, nach Abschluss der Erfassung erfolgt der Upload manuell

```Shell
hf upload <用户名>/lerobot_my_dataset_a /Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a / --repo-type=dataset
```

Ob automatischer oder manueller Upload, die Upload-Geschwindigkeit ist sehr langsam (einhundert KB pro Sekunde)

Weil die HuggingFace-Server im Ausland stehen

## Methode 2：Upload über die Cloud-GPU-Plattform (empfohlen)

### Anmeldung auf der Cloud-GPU-Plattform Featurize

https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1

### Eine Cloud-GPU-Instanz starten

### Datensatz-ZIP-Archiv nach `数据集` hochladen

### Kopieren Sie den Download-Befehl der Instanz

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/2.jpg)

### Im Kommandozeilenfenster der Cloud-GPU-Instanz ausführen

```Shell
pip install httpx

unzip your_datasets.zip

hf auth login
```

### Datensatz auf HuggingFace hochladen

Erstellen Sie die Datei `upload_dataset.py` mit folgendem Inhalt

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

Datei ausführen

```Shell
python upload_dataset.py
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/3.png)

- Eine andere Upload-Methode (nicht empfohlen)

```Shell
hf upload <用户名>/lerobot_my_dataset_a lerobot_my_dataset_a / --repo-type=dataset
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/4.png)

## Datensatz auf HuggingFace ansehen

https://huggingface.co/datasets/Juxi-Technology/soarm_amazing_hand_pick

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/5.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/6.png)

<RelatedProducts slugs="so-arm101" />
