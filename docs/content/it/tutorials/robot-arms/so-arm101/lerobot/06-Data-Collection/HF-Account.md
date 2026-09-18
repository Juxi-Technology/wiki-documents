---
title: "Passo 6: Registrare un account Hugging Face (opzionale)"
description: "Registrare un account Hugging Face: configurare il mirror cinese, creare e annotare il token di accesso, associarlo e preparare il repository del dataset."
---

# Passo 6: Registrare un account Hugging Face (opzionale)

## Impostare il mirror cinese di HuggingFace

- Ubuntu

```Shell
sudo nano ~/.bashrc

# Aggiungi in fondo al file
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# Output
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# Aggiungi in fondo al file
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# Output
# https://hf-mirror.com
```

## Creare un Token

https://huggingface.co/settings/tokens

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/4.png)

## Annotare il proprio Token

Una volta creata, la pagina mostrerà una stringa di chiavi che inizia con `hf_`; copiala e conservala bene, servirà in seguito per associare l'account. Il formato è il seguente (questa è solo una stringa segnaposto, fai riferimento a quella presente sulla tua pagina):

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Associare il Token

```Shell
hf auth login

hf auth whoami
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/5.png)

> Usa i tasti su e giù per muoverti, seleziona incolla chiave
> 
> 

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/6.png)

> Schermata di successo
> 
> 

## Creare un Dataset Repo

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/7.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/8.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/9.png)

<RelatedProducts slugs="so-arm101" />
