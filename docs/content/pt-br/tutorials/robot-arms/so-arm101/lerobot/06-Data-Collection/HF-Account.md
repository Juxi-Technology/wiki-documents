---
title: "Etapa 6: Registrar conta no Hugging Face (opcional)"
description: "Tutorial opcional para registrar uma conta no Hugging Face: configure o espelho de rede, crie o token de acesso e prepare o repositório do conjunto de dados."
---

# Etapa 6: Registrar conta no Hugging Face (opcional)

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

https://huggingface.co/settings/tokens

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/4.png)

## Anote o seu próprio Token

Após a criação, a página exibirá uma chave que começa com `hf_`; copie-a e guarde-a bem, pois será usada mais adiante ao vincular a conta. O formato é o seguinte (esta é apenas uma sequência de placeholder; considere como base o que aparece na sua própria página):

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Vincular o Token

```Shell
hf auth login

hf auth whoami
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/5.png)

> Use as teclas de seta para cima e para baixo e escolha colar a chave
> 
> 

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/6.png)

> Tela de sucesso
> 
> 

## Criar um Dataset Repo

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/7.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/8.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/9.png)

<RelatedProducts slugs="so-arm101" />
