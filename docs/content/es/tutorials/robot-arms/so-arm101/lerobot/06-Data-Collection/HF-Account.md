---
title: "Paso 6: Cuenta de Hugging Face (opcional)"
description: "Configura el espejo de HuggingFace para China, crea el Token de acceso, vincula la sesión con la línea de comandos y crea el repositorio del conjunto de datos."
---

# Paso 6: Cuenta de Hugging Face (opcional)

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

https://huggingface.co/settings/tokens

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/4.png)

## Anota tu propio Token

Una vez creado, la página mostrará una cadena de clave que comienza con `hf_`; cópiala y guárdala bien, ya que la necesitarás después al vincular la cuenta. El formato es el siguiente (esto es solo una cadena de marcador de posición; guíate por lo que aparezca en tu propia página):

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Vincular el Token

```Shell
hf auth login

hf auth whoami
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/5.png)

> Usa las teclas arriba y abajo para moverte y elegir pegar la clave
> 
> 

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/6.png)

> Interfaz de éxito
> 
> 

## Crear un Dataset Repo

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/7.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/8.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/9.png)

<RelatedProducts slugs="so-arm101" />
