---
title: "Registrar conta no Hugging Face (opcional)"
description: "Tutorial opcional para registrar uma conta no Hugging Face: configure o espelho de rede, crie o token de acesso e prepare o repositório do conjunto de dados."
---

# Registrar conta no Hugging Face (opcional)

## Configurar um espelho doméstico do HuggingFace

- Ubuntu

```Shell
sudo nano ~/.bashrc

# Adicionar no final do arquivo
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# Saída
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# Adicionar no final do arquivo
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# Saída
# https://hf-mirror.com
```



## Criar um Token

https://huggingface\.co/settings/tokens

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/5.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## Anotar o seu próprio Token

Por exemplo, o meu é:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Vincular o Token

```Shell
hf auth login

hf auth whoami
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

## Criar um Dataset Repo

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)









