---
title: "Cuenta de Hugging Face (opcional)"
description: "Configura el espejo de HuggingFace para China, crea el Token de acceso, vincula la sesión con la línea de comandos y crea el repositorio del conjunto de datos."
---

# Cuenta de Hugging Face (opcional)

## Configurar un espejo de HuggingFace para China

- Ubuntu

```Shell
sudo nano ~/.bashrc

# Añadir al final del archivo
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# Salida
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# Añadir al final del archivo
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# Salida
# https://hf-mirror.com
```



## Crear el Token

https://huggingface\.co/settings/tokens

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/5.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## Anotar el Token

Por ejemplo, el mío es:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Vincular el Token

```Shell
hf auth login

hf auth whoami
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

## Crear un Dataset Repo

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)









