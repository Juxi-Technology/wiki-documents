---
title: "Etapa 6: Registar uma conta Hugging Face (opcional)"
description: "Registo de conta no Hugging Face: configuração do espelho de rede, criação do token de acesso e registo do token para associar a conta."
---

# Etapa 6: Registar uma conta Hugging Face (opcional)

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

https://huggingface.co/settings/tokens

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/4.png)

## Registar o seu próprio Token

Após a criação, a página mostrará uma sequência de chave começada por `hf_`; copie-a e guarde-a bem, pois será necessária mais tarde para associar a conta. O aspeto é o seguinte (isto é apenas uma sequência de marcadores de posição; considere válido o que estiver na sua própria página):

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Associar o Token

```Shell
hf auth login

hf auth whoami
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/5.png)

> Use as teclas para cima e para baixo para controlar e escolha colar a chave
> 
> 

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/6.png)

> Interface de sucesso
> 
> 

## Criar um Repo de Dataset

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/7.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/8.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/9.png)

<RelatedProducts slugs="so-arm101" />
