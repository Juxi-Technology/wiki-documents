---
title: "Registar uma conta Hugging Face (opcional)"
description: "Registo de conta no Hugging Face: configuração do espelho de rede, criação do token de acesso e registo do token para associar a conta."
---

# Registar uma conta Hugging Face (opcional)

## Configurar o espelho nacional do HuggingFace

- Ubuntu

```Shell
sudo nano ~/.bashrc

# Adicionar no final do ficheiro
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

# Adicionar no final do ficheiro
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

## Registar o Token

Por exemplo, o meu é:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Associar o Token

```Shell
hf auth login

hf auth whoami
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

## Criar um Dataset Repo

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)


