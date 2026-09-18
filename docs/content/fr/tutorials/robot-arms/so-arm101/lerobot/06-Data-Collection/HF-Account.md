---
title: "Étape 6 : Créer un compte Hugging Face (facultatif)"
description: "Créez un compte Hugging Face et un jeton d'accès : miroir chinois, génération du token, connexion depuis le terminal et création d'un dépôt de données."
---

# Étape 6 : Créer un compte Hugging Face (facultatif)

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

https://huggingface.co/settings/tokens

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/4.png)

## Noter votre propre Token

Une fois la création terminée, la page affiche une clé commençant par `hf_` ; copiez-la et conservez-la précieusement, elle sera nécessaire plus tard pour lier le compte. Voici un exemple (il s'agit d'un simple espace réservé, référez-vous à votre propre page) :

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Lier le Token

```Shell
hf auth login

hf auth whoami
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/5.png)

> Utilisez les flèches haut et bas pour choisir de coller la clé
> 
> 

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/6.png)

> Écran de réussite
> 
> 

## Créer un Dataset Repo

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/7.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/8.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/9.png)

<RelatedProducts slugs="so-arm101" />
