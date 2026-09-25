---
title: "Registrare un account Hugging Face (opzionale)"
description: "Registrare un account Hugging Face: configurare il mirror cinese, creare e annotare il token di accesso, associarlo e preparare il repository del dataset."
---

# Registrare un account Hugging Face (opzionale)

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

https://huggingface\.co/settings/tokens

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/5.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## Annotare il proprio Token

Ad esempio, il mio è:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Associare il Token

```Shell
hf auth login

hf auth whoami
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

## Creare un Dataset Repo

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)









