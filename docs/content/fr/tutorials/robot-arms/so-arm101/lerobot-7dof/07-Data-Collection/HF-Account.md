---
title: "Créer un compte Hugging Face (facultatif)"
description: "Créez un compte Hugging Face et un jeton d'accès : miroir chinois, génération du token, connexion depuis le terminal et création d'un dépôt de données."
---

# Créer un compte Hugging Face (facultatif)

## Configurer le miroir chinois de HuggingFace

- Ubuntu

```Shell
sudo nano ~/.bashrc

# Ajouter à la fin du fichier
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# Sortie
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# Ajouter à la fin du fichier
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# Sortie
# https://hf-mirror.com
```



## Créer un Token

https://huggingface\.co/settings/tokens

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/5.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## Noter votre Token

Par exemple, le mien est :

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Lier le Token

```Shell
hf auth login

hf auth whoami
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

## Créer un Dataset Repo

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)









