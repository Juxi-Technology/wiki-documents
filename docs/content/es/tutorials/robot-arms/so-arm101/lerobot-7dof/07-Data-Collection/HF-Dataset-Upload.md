---
title: "Subir el conjunto de datos a HuggingFace (opcional)"
description: "Sube el conjunto de datos a HuggingFace mediante la subida local o desde una instancia de GPU en la nube, y verifica el resultado en la plataforma."
---

# Subir el conjunto de datos a HuggingFace (opcional)

# Método 1: subida local (no recomendado, velocidad de subida lenta)

- Subida automática

Al recopilar el conjunto de datos, establece `push_to_hub=true`; tras finalizar la recopilación se sube automáticamente

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

- Subida manual

Al recopilar el conjunto de datos, establece `push_to_hub=false`; tras finalizar la recopilación se sube manualmente

```Shell
hf upload Tommymy/lerobot_my_dataset_a /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_a / --repo-type=dataset
```



Tanto la subida automática como la manual son muy lentas (cien KB por segundo)

Porque los servidores de HuggingFace están en el extranjero

# Método 2: subida desde la plataforma de GPU en la nube (recomendado)

## Iniciar sesión en la plataforma de GPU en la nube Featurize

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

Dile al servicio de atención al cliente que eres seguidor de Tongji Zihao y podrás reclamar un cupón

## Iniciar una instancia de GPU en la nube

## Subir el paquete comprimido del conjunto de datos a `Conjuntos de datos`

## Copiar el comando de descarga de la instancia

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

## Ejecutar en la línea de comandos de la instancia de GPU en la nube

```Shell
pip install httpx

unzip lerobot_my_dataset_a.zip

hf auth login
```

## Subir el conjunto de datos a HuggingFace

Crea el archivo `upload_dataset.py` con el siguiente contenido

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

Ejecutar el archivo

```Shell
python upload_dataset.py
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/3.png)

- Otro método de subida (no recomendado)

```Shell
hf upload Tommymy/lerobot_my_dataset_a lerobot_my_dataset_a / --repo-type=dataset
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/4.png)

# Ver el conjunto de datos en HuggingFace

https://huggingface\.co/datasets/Tommymy/lerobot\_my\_dataset\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



